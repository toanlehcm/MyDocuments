Trong **React Hook Form (RHF)**, khái niệm **controlled** và **uncontrolled** khá quan trọng vì nó quyết định cách bạn kết nối form field với RHF.

---

### 🔹 Uncontrolled Component trong RHF

* **Đặc điểm**: RHF **ưu tiên uncontrolled** vì nó nhẹ, hiệu năng cao (ít re-render).
* Field không cần state riêng trong React, giá trị được quản lý trực tiếp trên DOM input.
* Kết nối bằng `register()`.

**Ví dụ**:

```tsx
import { useForm } from "react-hook-form";

export default function Form() {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data: any) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Uncontrolled - quản lý qua ref */}
      <input {...register("username")} placeholder="Username" />
      <button type="submit">Submit</button>
    </form>
  );
}
```

👉 Bạn không cần `useState`, RHF sẽ đọc `ref` từ DOM để lấy value.

---

### 🔹 Controlled Component trong RHF

* **Đặc điểm**: Field tự quản lý state qua `useState` hoặc `Controller`.
* Dùng khi cần component **custom** (không phải native input), ví dụ: `MUI Select`, `React-Select`, `DatePicker`.
* Bắt buộc wrap bằng `Controller` để RHF đồng bộ value.

**Ví dụ**:

```tsx
import { useForm, Controller } from "react-hook-form";
import { TextField } from "@mui/material";

export default function Form() {
  const { control, handleSubmit } = useForm();
  const onSubmit = (data: any) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Controlled - dùng Controller */}
      <Controller
        name="email"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField {...field} label="Email" />
        )}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
```

👉 `Controller` giúp RHF và component controlled trao đổi `value` + `onChange`.

---

### ✅ So sánh nhanh

| Tiêu chí         | Uncontrolled (register)                   | Controlled (Controller)                               |
| ---------------- | ----------------------------------------- | ----------------------------------------------------- |
| **Cách binding** | `register()` + ref                        | `Controller` + `field`                                |
| **Hiệu năng**    | Tốt (ít re-render)                        | Tốn hơn (theo state)                                  |
| **Hỗ trợ**       | Input gốc (`input`, `textarea`, `select`) | Component UI phức tạp (MUI, React-Select, DatePicker) |
| **Code**         | Ngắn, đơn giản                            | Dài hơn, linh hoạt                                    |

---

👉 Kết luận:

* **Ưu tiên dùng uncontrolled (`register`)** cho các input HTML cơ bản.
* **Dùng controlled (`Controller`)** khi tích hợp component ngoài (custom UI library).

---

Bạn có muốn mình viết 1 đoạn **best practice guideline**: khi nào chọn uncontrolled, khi nào bắt buộc controlled, để bạn dễ maintain codebase lâu dài không?
