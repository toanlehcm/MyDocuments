# Thiết kế & implementation chi tiết — Intake Form (6 tabs)

Tóm tắt ngắn: tôi sẽ đưa ra **kiến trúc component**, **luồng dữ liệu**, **mẹo performance**, **cách kết hợp RHF + zod + react-query**, auto-save/draft, SSR/CSR pattern cho Next.js app-router v15, và **mã mẫu** để bạn copy/paste. Mỗi đoạn code có comment rõ ràng.

---

## Tổng quan kiến trúc (high-level)

* **Server page (SSR)**: chịu trách nhiệm lấy `initial` props (token, prefill data) — `page.tsx` sẽ `await searchParams` rồi gọi API server-side (nếu cần) hoặc chỉ truyền token xuống client.
* **Client shell**: một Client Component (ví dụ `IntakeFormClient`) chứa form UI, state local, react-query hooks, RHF provider.
* **FormProvider / useForm**: tạo 1 `FormProvider` (RHF) duy nhất cho toàn bộ intake form. Các tab là **child components** dùng `useFormContext()` hoặc `Controller`.
* **Tabs**: mỗi tab (BasicInformations, FertilityHistory, ...) là 1 component nhỏ, chỉ render các field liên quan -> dễ maintain.
* **Auto-save / Draft**: hook `useAutoSave` dùng debounce, gửi mutation save-draft qua react-query; đồng thời giữ trạng thái `isSaving`.
* **Submit flow**: dùng react-query mutation; trước khi submit, validate toàn bộ form (zod), show progress, disable inputs.
* **Optimistic UI / Cache**: khi cần cập nhật entities ngoài form (appointment parent), dùng `queryClient.invalidateQueries` hoặc `setQueryData` để cập nhật nhanh. Nếu ID parent không xác định khi đóng drawer, dùng `staleTime: 0` / hoặc `removeQueries` khi Drawer đóng (tùy use-case).
* **File uploads**: xử lý riêng (chunked / presigned) và maintain upload status in separate state / react-query mutation.

---

## File structure đề xuất (atomic, dễ mở rộng)

```
/app/[locale]/intake-form/page.tsx          // Server route -> truyền token / prefetch data
/components/
  /intake/
    IntakeFormClient.tsx                    // Client shell
    FormProviderWrapper.tsx                 // wraps useForm + FormProvider
    useAutoSave.ts                          // auto-save hook (debounced)
    /tabs/
      BasicInformations.tsx
      FertilityHistory.tsx
      MedicalHistory.tsx
      Lifestyle.tsx
      PartnerInformation.tsx
      Review.tsx
    /fields/
      TextInput.tsx                         // AlignUI-based input wrapper
      SelectAutocomplete.tsx
      CheckboxItem.tsx
      FileUploader.tsx
/lib/
  hooks/                                    // react-query hooks (useGet..., useSaveDraft, useSubmit)
  validators/                               // zod schemas
  api/                                      // axios/fetch helpers
/stores/
  intakeStore.ts                            // zustand or simple context if needed
```

---

## SSR / CSR pattern (Next.js app-router v15)

**page.tsx (Server Component)** — only await `searchParams` and optionally prefetch data (server-side) then pass to client:

```tsx
// app/[locale]/intake-form/page.tsx (Server Component)
import IntakeFormClient from './IntakeFormClient';

export default async function Page({ searchParams }: { searchParams: Promise<Record<string,string|undefined>> }) {
  const params = await searchParams;
  const token = params?.token ?? null;

  // Optionally: fetch initial data server-side if allowed (e.g. patient prefill)
  // const prefill = await fetchServerSidePrefill(token);

  return <IntakeFormClient initialToken={token} /* initialData={prefill} */ />;
}
```

**Lý do**: tránh truy cập `window` / client API trên server; tận dụng SSR để lấy token và giảm flicker.

---

## RHF + zod + react-query — flow chi tiết

### 1) Schema (zod)

```ts
// lib/validators/intake.schema.ts
import { z } from 'zod';

export const BasicInfoSchema = z.object({
  firstName: z.string().min(1, 'error.firstName.required'),
  lastName: z.string().optional(),
  dob: z.string().optional(),
  // ...other fields
});

export const IntakeSchema = z.object({
  basic: BasicInfoSchema,
  fertility: z.object({
    previousPregnancies: z.boolean().optional(),
    numberOfPregnancies: z.number().nullable(),
  }),
  // other sections...
});

// export Type
export type IntakeFormValues = z.infer<typeof IntakeSchema>;
```

### 2) FormProvider wrapper (centralize useForm options)

```tsx
// components/intake/FormProviderWrapper.tsx
import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { IntakeSchema, IntakeFormValues } from '@/lib/validators/intake.schema';

export default function FormProviderWrapper({
  children,
  defaultValues
}: {
  children: React.ReactNode;
  defaultValues?: Partial<IntakeFormValues>;
}) {
  const methods = useForm<IntakeFormValues>({
    resolver: zodResolver(IntakeSchema),
    mode: 'onChange',
    defaultValues: defaultValues ?? {} as IntakeFormValues,
    shouldUnregister: false // keep all values mounted -> good for multi-tab
  });

  return <FormProvider {...methods}>{children}</FormProvider>;
}
```

**Giải thích**: `shouldUnregister: false` quan trọng cho multi-step form (nếu bạn unmount tab components khi chuyển tab). Nếu muốn tự remove values khi unmount, set true.

### 3) IntakeFormClient (client shell)

```tsx
// components/intake/IntakeFormClient.tsx
'use client'
import React from 'react';
import FormProviderWrapper from './FormProviderWrapper';
import { usePrefetchOrQuery } from '@/lib/hooks'; // giả sử có hook lấy prefill
import IntakeBody from './IntakeBody';

export default function IntakeFormClient({ initialToken }: { initialToken: string | null }) {
  // initialData có thể từ SSR props nếu bạn prefetch server-side
  const initialData = null; // hoặc props

  return (
    <FormProviderWrapper defaultValues={initialData ?? undefined}>
      <IntakeBody initialToken={initialToken} />
    </FormProviderWrapper>
  );
}
```

### 4) IntakeBody (render tabs + auto-save + submit)

```tsx
// components/intake/IntakeBody.tsx
'use client'
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useAutoSave } from './useAutoSave';
import { useSubmitIntake, useSaveDraft } from '@/lib/hooks';
import TabsNav from './TabsNav';
import BasicInformations from './tabs/BasicInformations';
import FertilityHistory from './tabs/FertilityHistory';
// ...

export default function IntakeBody({ initialToken }: { initialToken: string | null }) {
  const { watch, handleSubmit, reset, formState } = useFormContext();
  const values = watch();

  // Auto-save hook: debounce + only save when dirty
  useAutoSave(values, formState.isDirty);

  const submit = useSubmitIntake({
    onSuccess: () => {
      // clear local draft etc.
    }
  });

  const onSubmit = (data) => submit.mutate(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex gap-4">
      <aside>{/* progress / nav */}<TabsNav /></aside>
      <main>
        {/* render active tab */}
        <BasicInformations />
        {/* ... */}
        <div className="mt-6">
          <button type="submit" disabled={submit.isLoading}>Submit</button>
        </div>
      </main>
    </form>
  );
}
```

---

## useAutoSave (debounced, race-safe)

```tsx
// components/intake/useAutoSave.ts
import { useEffect, useRef } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { useSaveDraft } from '@/lib/hooks';

export function useAutoSave(values: any, isDirty: boolean) {
  const saveDraft = useSaveDraft();
  const lastValuesRef = useRef<any>(null);

  const debounced = useDebouncedCallback((v) => {
    // don't save if identical
    if (JSON.stringify(lastValuesRef.current) === JSON.stringify(v)) return;
    lastValuesRef.current = v;
    saveDraft.mutate(v);
  }, 1500); // 1.5s debounce

  useEffect(() => {
    if (isDirty) debounced(values);
    // cleanup on unmount
    return () => debounced.cancel();
  }, [values, isDirty, debounced]);
}
```

**Giải thích**: debounce tránh spam request; comparing lastValues tránh gửi dữ liệu giống hệt; mutations handled by react-query ensure dedupe/retries.

---

## React-query patterns (draft, submit, invalidation)

* `useSaveDraft` — mutation that saves partial form state to `POST /intake/draft`. Should be *idempotent*.
* `useSubmitIntake` — final submit; onSuccess => `queryClient.invalidateQueries(['patient', patientId])` (refresh parent data), show toast.
* For drawer behavior (open/close): if you want to **force re-fetch** when Drawer re-opens, you can:

  * Set `staleTime: 0` on `useQuery` so when mount -> will refetch (React Query will refetch on mount if data is stale).
  * Or on drawer close, call `queryClient.removeQueries(queryKey)` to avoid stale cache.
  * Prefer `staleTime: 0` + `refetchOnMount: true` for stable behavior. `refetchOnMount` can be inconsistent based on `cacheTime` and `mountCount`; `staleTime` is more deterministic.

**Example mutation:**

```ts
// lib/hooks/useSubmitIntake.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postSubmitIntake } from '@/lib/api';

export function useSubmitIntake(opts) {
  const qc = useQueryClient();
  return useMutation(postSubmitIntake, {
    onSuccess: (res) => {
      qc.invalidateQueries(['intake', res.patientId]);
      opts?.onSuccess?.(res);
    },
    ...opts
  });
}
```

---

## Tabs splitting — why & how

**Tại sao chia nhỏ:**

* Giảm bundle size mỗi tab (dynamic import)
* Giảm rerender: mỗi tab subscribes only to its fields (via `useFormContext` + `Controller`).
* Dễ test/maintain/feature-expand.

**Cách implement (example BasicInformations):**

```tsx
// components/intake/tabs/BasicInformations.tsx
import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import TextInput from '../fields/TextInput';
import SelectAutocomplete from '../fields/SelectAutocomplete';

export default function BasicInformations() {
  const { control, register } = useFormContext();

  return (
    <section>
      <div className="grid grid-cols-2 gap-4">
        <Controller
          name="basic.firstName"
          control={control}
          render={({ field }) => (
            <TextInput label="First Name" required {...field} />
          )}
        />
        <Controller
          name="basic.lastName"
          control={control}
          render={({ field }) => (
            <TextInput label="Last Name" {...field} />
          )}
        />
      </div>
    </section>
  );
}
```

**Tip**: dùng `Controller` cho custom inputs; `register` cho simple inputs.

---

## TextInput (AlignUI wrapper) — best practice

* **Expose** `inputProps?: React.ComponentProps<typeof Input>` (i.e. `React.ComponentProps<typeof Input.Input>`). Bạn có `Input.Input` (forwardRef) in AlignUI.
* Accept props: `label`, `hint`, `error`, `required`, `inputProps` so consumers can pass `disabled`, `onChange`, `value`, etc.
* Internally, pass `...inputProps` to `<Input.Input {...inputProps} />`. That way you don't re-declare every HTML attribute.

**Example signature (TypeScript):**

```ts
type AlignInputProps = React.ComponentProps<typeof Input.Input>; // inherits <input> attributes + size/hasError props
interface TextInputProps {
  label?: string;
  hint?: string;
  error?: string;
  inputProps?: AlignInputProps;
  // other custom options...
}
```

**Important**: because AlignUI's Input is `React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement> & InputSharedProps>`, `React.ComponentProps<typeof Input.Input>` gives you the correct types.

---

## File upload handling

* Put file upload outside main form values (store file IDs / URLs only).
* Upload with presigned URLs or chunked upload, each upload has its own mutation + optimistic UI (file list).
* On final submit, include uploaded `fileIds` array.

---

## Performance & re-render tips

* Use `FormProvider` + `useFormContext()`; avoid passing `watch()` results to many children (use `useWatch` per-field).
* `React.memo` on pure presentational components (labels, hints).
* Dynamic import for heavy tabs: `const MedicalHistory = dynamic(() => import('./MedicalHistory'), { ssr: false })` if it contains heavy libs.
* Avoid inline object/array literals in props that cause child re-renders; memoize with `useMemo`.
* Use `Controller` with `shouldUnregister: false` when you want to keep values even if tab unmounts.
* Use `useFieldArray` for repeating groups.

---

## Accessibility & UX

* Use `Label.Root` from AlignUI to tie label -> input (use `htmlFor` and `id`).
* Show loading spinners when `isSaving` or `isSubmitting`.
* Show toast/snackbar for save success/failure.
* Keyboard nav for multi-step (Enter to next, Esc to cancel).
* Progressive disclosure: collapse optional sections.

---

## Example — minimal working TextInput wrapper compatible with RHF

```tsx
// components/intake/fields/TextInput.tsx
import React from 'react';
import { Label, Hint, Input } from '@/components/atoms';
import { cn } from '@/utils/cn';

type AlignInputProps = React.ComponentProps<typeof Input.Input>;

export interface TextInputProps extends Partial<AlignInputProps> {
  label?: string;
  hint?: string;
  error?: string | null;
  required?: boolean;
  // all raw input HTML props passed by consumer:
  inputProps?: AlignInputProps;
}

export default function TextInput({
  label, hint, error, required, inputProps, ...rest
}: TextInputProps) {
  const hasError = Boolean(error);

  return (
    <div className="w-full flex flex-col gap-1">
      {label && (
        <Label.Root>
          <span>{label}</span>
          {required && <Label.Asterisk />}
        </Label.Root>
      )}

      <Input.Wrapper>
        <Input.Input {...inputProps} {...rest} aria-invalid={hasError} />
      </Input.Wrapper>

      {error && <div className="text-red-500 text-xs">{error}</div>}
      {hint && <Hint.Root>{hint}</Hint.Root>}
    </div>
  );
}
```

**Cách dùng với RHF:**

```tsx
// example in tab
<Controller name="basic.firstName" control={control} render={({ field }) => (
  <TextInput label="First name" inputProps={{ ...field, placeholder: 'First' }} />
)} />
```

`field` chứa `{ value, onChange, ref, name }` nên truyền nguyên vào `inputProps` giữ RHF binding.

---

## Testing & monitoring

* Unit tests: test zod schema, field validation.
* E2E: Cypress / Playwright for multi-step flows (drafts, resume, file upload).
* Logging: Sentry for submit errors.

---

## Checklist / Best practices (quick)

* [x] Single `FormProvider` for the whole multi-step form.
* [x] `shouldUnregister: false` if you unmount tabs but want values persisted.
* [x] `Controller` for custom inputs (AlignUI inputs).
* [x] Auto-save debounce + compare to avoid duplicate saves.
* [x] React Query: stash drafts in server; set `staleTime` appropriately for read queries.
* [x] Upload files separately; store ids in form.
* [x] Use `React.memo`, `useMemo`, `useCallback` to avoid unnecessary render.
* [x] Accessibility: label + `aria-invalid`.
* [x] Error handling: show field-level and global errors.

---

## Tài liệu tham khảo (chính thức)

* React Hook Form: [https://react-hook-form.com/docs/overview](https://react-hook-form.com/docs/overview)
* zod + RHF resolver: [https://github.com/react-hook-form/resolvers#zod](https://github.com/react-hook-form/resolvers#zod)
* TanStack Query (react-query): [https://tanstack.com/query/latest/docs/react/overview](https://tanstack.com/query/latest/docs/react/overview)
* Next.js App Router (searchParams message & server/client): [https://nextjs.org/docs/app/building-your-application/routing/router-handlers#searchparams](https://nextjs.org/docs/app/building-your-application/routing/router-handlers#searchparams)
* AlignUI (nếu internal) — follow its component patterns (Slot + forwardRef) — your code shows similar.

---

## Kết luận & Next steps

1. Triển khai `FormProviderWrapper` + `IntakeBody` như mẫu trên.
2. Tạo `useAutoSave` và server endpoint `save-draft`.
3. Viết `useSubmitIntake` mutation.
4. Chia từng tab thành components nhỏ, dùng `Controller` để bind inputs.
5. Thêm file upload component riêng.

Nếu bạn muốn, tôi có thể:

* Viết một **full-working minimal example repository** (tsx) cho 1 tab + auto-save + submit.
* Hoặc **viết mã chi tiết** cho `useSaveDraft`, `useSubmitIntake`, hoặc `TextInput` wrapper đầy đủ (kèm typescript types).

Bạn muốn tôi tạo tiếp đoạn code nào cụ thể (ví dụ: `useSaveDraft` + API mock **hoặc** full `BasicInformations` tab + tests)?
