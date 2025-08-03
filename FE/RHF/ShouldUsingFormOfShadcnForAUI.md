❌ **Không nên dùng `form` của ShadCN UI để wrap các component `Input` của AlignUI** — nếu bạn **không hiểu rõ cách chúng hoạt động nội bộ** và không customize kỹ.

---

## 🔍 Vì sao?

### 1. **`form` của ShadCN UI** là wrapper sử dụng:

* `react-hook-form`
* * `Zod`
* * `FormField`, `FormItem`, `FormControl`, `FormLabel`, `FormMessage` (**đã styling sẵn** theo Tailwind).

👉 Nó được **thiết kế cho các input tuân theo hệ thống UI của ShadCN**, ví dụ:

```tsx
<FormField
  control={form.control}
  name="email"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Email</FormLabel>
      <FormControl>
        <Input {...field} />  // ShadCN Input component
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>
```

Nếu bạn thay `Input` ở đây thành **AlignUI `Input`**, thì:

### ⚠️ Bạn sẽ gặp vấn đề như:

* Không tương thích với `field` từ RHF do cần `ref`, `name`, `onChange`, `onBlur`.
* Style có thể **lệch theme hoặc không đồng nhất** giữa `FormLabel`, `FormControl` (ShadCN) và `Input` (AlignUI).
* Không kiểm soát được cấu trúc layout (AlignUI input có thể bọc nhiều lớp `Input.Root`, `Input.Wrapper`, ...).

---

## ✅ Khi nào **nên dùng**?

Chỉ dùng `Form` của ShadCN nếu:

* Bạn dùng **toàn bộ input components cũng của ShadCN**.
* Hoặc bạn đã **custom AlignUI Input để tương thích** với `field` props từ RHF và đảm bảo style đồng nhất với ShadCN.

---

## ✅ Giải pháp khuyên dùng nếu bạn dùng AlignUI:

**Tự xây form như sau:**

```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import * as Input from '@/components/ui/input'; // của AlignUI

const schema = z.object({
  email: z.string().email()
});

const MyForm = () => {
  const form = useForm({
    resolver: zodResolver(schema)
  });

  const { register, handleSubmit, formState } = form;

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input.Root>
        <Input.Wrapper>
          <input
            type="email"
            placeholder="Email"
            {...register('email')}
          />
        </Input.Wrapper>
      </Input.Root>

      {formState.errors.email && (
        <span>{formState.errors.email.message}</span>
      )}

      <button type="submit">Submit</button>
    </form>
  );
};
```

---

## ✅ Tổng kết

| **Tiêu chí**                      | **ShadCN Form**     | **AlignUI + RHF Custom** |
| --------------------------------- | ------------------- | ------------------------ |
| Dùng được ngay                    | ✅ Với ShadCN Input  | ❌ Phải tự cấu hình       |
| Dùng với AlignUI input            | ❌ Không khuyên dùng | ✅ Tự custom tốt hơn      |
| Dễ mở rộng / giữ style thống nhất | ✅ Nếu theo ShadCN   | ✅ Nếu theo AlignUI       |
| Học RHF core                      | ❌ Ít thấy rõ logic  | ✅ Thấy rõ flow RHF       |

---

Nếu bạn dùng AlignUI cho toàn bộ UI system, hãy **tránh mix ShadCN form layout**, trừ khi bạn rất rành React Hook Form, Slot API và có thời gian kiểm thử.

Bạn muốn mình giúp tạo component `InputField` dùng AlignUI + RHF đúng chuẩn?
