Dưới đây là bản **so sánh chi tiết giữa `register` và `<Controller>` trong React Hook Form** khi kết hợp với AlignUI, để bạn có thể chọn cách phù hợp nhất theo từng trường hợp thực tế:

---

### ✅ **TÓM TẮT NHANH**

| Tiêu chí chính                      | `register`                                       | `<Controller>`                                           |
| ----------------------------------- | ------------------------------------------------ | -------------------------------------------------------- |
| **Hiệu năng (performance)**         | ✅ Tốt nhất — dùng `ref`, không trigger re-render | ❌ Chậm hơn — controlled, gây re-render nhiều hơn         |
| **Form lớn / phức tạp**             | ✅ Rất phù hợp                                    | ❌ Cần tối ưu kỹ, phức tạp hơn                            |
| **Khả năng maintain / mở rộng**     | ✅ Dễ với form đơn giản                           | ✅ Tốt hơn nếu input phức tạp hoặc tái sử dụng            |
| **Dễ viết & dễ hiểu**               | ✅ Cực kỳ dễ                                      | ❌ Verbose — render prop, phức tạp hơn                    |
| **Phù hợp với Align UI**            | ✅ Nếu input hỗ trợ `ref`, `name`, `onChange`     | ✅ Nếu là component phức tạp, dùng Slot                   |
| **Tái sử dụng component FormField** | ❌ Khó hơn nếu muốn gộp logic validation + UI     | ✅ Tốt — dễ đóng gói 1 component input có validation + UI |
| **Bắt buộc dùng khi...**            | Component hỗ trợ `ref`                           | Component là **controlled** hoặc **không expose `ref`**  |

---

### 💡 Khi nào **nên dùng `register`**?

> Khi input là `<input>`, `<select>`, `<textarea>` **hoặc component AlignUI expose được ref**.

**Ví dụ:**

```tsx
<input {...register("email")} />
```

**Ưu điểm:**

* Không re-render.
* Gọn, dễ đọc.
* Tốt cho performance khi nhiều field.

---

### 💡 Khi nào **nên dùng `<Controller>`**?

> Khi bạn dùng component **controlled**, như `AlignUI.Input`, `react-select`, `date-picker`, `AUI.Input` có nhiều lớp Slot.

**Ví dụ:**

```tsx
<Controller
  name="email"
  control={form.control}
  render={({ field }) => (
    <Input.Root>
      <Input.Wrapper>
        <input {...field} />
      </Input.Wrapper>
    </Input.Root>
  )}
/>
```

**Ưu điểm:**

* Linh hoạt với component không expose `ref`.
* Tốt nếu bạn cần xử lý giá trị dạng custom, complex, formatting,…

---

### 🔍 Ví dụ kết hợp AUI + RHF gợi ý

#### ✅ Trường hợp dùng được `register`:

```tsx
<Input.Root>
  <Input.Wrapper>
    <input {...register("email")} />
  </Input.Wrapper>
</Input.Root>
```

#### ❌ Nếu AUI không hoạt động với `register`, dùng:

```tsx
<Controller
  name="email"
  control={form.control}
  render={({ field }) => (
    <Input.Root>
      <Input.Wrapper>
        <input {...field} />
      </Input.Wrapper>
    </Input.Root>
  )}
/>
```

---

### 📦 Gợi ý cách viết component tái sử dụng

> Nếu bạn muốn làm 1 component `FormInput` dùng chung:

```tsx
type FormInputProps = {
  control: Control<any>;
  name: string;
  label?: string;
};

const FormInput = ({ control, name, label }: FormInputProps) => (
  <Controller
    name={name}
    control={control}
    render={({ field, fieldState }) => (
      <div>
        {label && <label>{label}</label>}
        <Input.Root>
          <Input.Wrapper>
            <input {...field} />
          </Input.Wrapper>
        </Input.Root>
        {fieldState.error && <p className="text-red-500 text-sm">{fieldState.error.message}</p>}
      </div>
    )}
  />
);
```

→ Rất tiện khi bạn có 20+ input và muốn quản lý form clean.

---

### ✅ Tổng kết

| Loại form                        | Nên dùng gì?         |
| -------------------------------- | -------------------- |
| Form đơn giản (input thường)     | ✅ `register`         |
| Form nhiều trường, custom input  | ✅ `Controller`       |
| Form dùng AlignUI Slot / Wrapper | ✅ `Controller`       |
| Form cần performance tối đa      | ✅ `register` ưu tiên |

---

Nếu bạn muốn, mình có thể giúp bạn tạo template `FormField` kết hợp `Controller`, `AUI.Input`, và `Zod`/Yup để tái sử dụng. Bạn cần không?
