**Trong React Hook Form (RHF)**:

---

## 1️⃣ **`FieldValues` là gì?**

* `FieldValues` là **một kiểu dữ liệu (type)** được **React Hook Form** định nghĩa sẵn.

* Nó đại diện cho **tập hợp tất cả các giá trị của form** – nói cách khác, nó là **object chứa dữ liệu mà form quản lý**.

* Định nghĩa trong source code RHF (đơn giản hóa):

  ```ts
  // react-hook-form/types
  export type FieldValues = Record<string, any>;
  ```

  ➡️ Tức là một object có key kiểu `string` và value có thể là bất kỳ kiểu dữ liệu nào.

* **Vai trò**:

  * Là kiểu mặc định khi bạn không xác định cụ thể dữ liệu form của mình.
  * Dùng để ràng buộc generic cho các hàm như `useForm`, `Controller`, `useWatch`, `useFormContext`…

---

## 2️⃣ **Ví dụ cơ bản**

```tsx
import { useForm, FieldValues } from "react-hook-form";

const { register, handleSubmit } = useForm<FieldValues>(); 
// Ở đây FieldValues là kiểu mặc định => bạn có thể gõ bất kỳ field nào

const onSubmit = (data: FieldValues) => {
  console.log(data.username); // Không có autocomplete
};

<form onSubmit={handleSubmit(onSubmit)}>
  <input {...register("username")} />
  <input type="number" {...register("age")} />
  <button type="submit">Submit</button>
</form>
```

➡ **Nhược điểm**: Vì `FieldValues` quá "rộng" (chỉ là `Record<string, any>`), TypeScript **không thể gợi ý hoặc kiểm tra key** của form.

---

## 3️⃣ **So sánh với kiểu cụ thể**

```tsx
// ✅ Khai báo kiểu cụ thể
interface MyFormValues {
  username: string;
  age: number;
}

const { register, handleSubmit } = useForm<MyFormValues>();

const onSubmit = (data: MyFormValues) => {
  console.log(data.username.toUpperCase()); // TS biết username là string
};
```

➡ **Lợi ích**: Có autocomplete và kiểm tra kiểu chặt chẽ.

---

## 4️⃣ **FieldValues không phải là một API**

* **FieldValues chỉ là một type**, **không có phương thức (API) nào kèm theo**.
* Bạn không thể gọi `FieldValues.something()`.
* Nó chỉ được dùng như **kiểu dữ liệu generic** để mô tả dữ liệu form.

---

## 5️⃣ **Tóm tắt những nơi dùng `FieldValues` trong RHF**

| Sử dụng                 | Ví dụ                                                         |
| ----------------------- | ------------------------------------------------------------- |
| `useForm`               | `useForm<FieldValues>()` – Nếu bạn không có interface cụ thể. |
| `Controller`            | `Controller<FieldValues, "fieldName">`                        |
| `useFormContext`        | `const methods = useFormContext<FieldValues>();`              |
| `handleSubmit` callback | `(data: FieldValues) => { … }`                                |
| `useWatch`              | `useWatch<FieldValues>({ name: "field" });`                   |

---

## ✅ **Kết luận**

* **`FieldValues`** = `Record<string, any>` (một object chứa giá trị form).
* **Không có API riêng** – chỉ là một type hỗ trợ generic.
* **Best practice**: Nên định nghĩa một interface riêng cho dữ liệu form thay vì luôn dùng `FieldValues` để:

  * Tận dụng autocomplete.
  * Đảm bảo an toàn kiểu khi form phức tạp.
  * Giảm bug khi refactor.
