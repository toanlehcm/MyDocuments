Trong `react-hook-form`, khi bạn viết TypeScript để **type-safe** form, bạn có thể dùng `Path` và `UseFormRegister` để:

---

### ✅ Mục tiêu:

* Giúp autocomplete gợi ý đúng field name
* Báo lỗi sớm nếu dùng sai tên field
* Tăng khả năng tái sử dụng các **form component** như `TextInput`, `Select`, v.v.

---

## 🔍 1. `Path<T>`

### 📌 Định nghĩa:

```ts
type Path<T> = keyof T | nested keys of T
```

### ✅ Mục đích:

`Path<T>` giới hạn các tên field (`name`) chỉ được là key hợp lệ của `T`.

### 🔧 Ví dụ:

```ts
type FormValues = {
  email: string
  age: number
}
```

```ts
type Props = {
  name: Path<FormValues>
}

const Input = ({ name }: Props) => {
  return <input name={name} />
}
```

```ts
<Input name="email" /> ✅ OK  
<Input name="username" /> ❌ Error — vì `username` không nằm trong `FormValues`
```

---

## 🔍 2. `UseFormRegister<T>`

### 📌 Định nghĩa:

Type của hàm `register` được trả về từ `useForm<T>()`.

### ✅ Mục đích:

Nếu bạn truyền `register` vào component con, bạn nên dùng `UseFormRegister<T>` để:

* **Type-safe** cho field name và props
* **Tự động bind** các thuộc tính cần thiết cho `<input>` (onChange, ref, ...)

### 🔧 Ví dụ:

```ts
type FormValues = {
  email: string
}

type Props = {
  name: Path<FormValues>
  register: UseFormRegister<FormValues>
}

const TextInput = ({ name, register }: Props) => (
  <input {...register(name)} />
)
```

---

## ✅ Tổng kết:

| Công cụ              | Công dụng chính                                                  |
| -------------------- | ---------------------------------------------------------------- |
| `Path<T>`            | Giới hạn và gợi ý `name` field chính xác từ type schema `T`      |
| `UseFormRegister<T>` | Định nghĩa type chính xác cho `register()` để truyền xuống props |

---

## 📘 Tài liệu chính thức:

* 🔗 [`Path<T>` – RHF Docs](https://react-hook-form.com/ts/#Path)
* 🔗 [`UseFormRegister<T>` – RHF Docs](https://react-hook-form.com/ts/#UseFormRegister)

---

Nếu bạn cần ví dụ thực tế hoàn chỉnh để tạo custom `<TextInput />` dùng `Path` và `UseFormRegister`, mình có thể viết cho bạn. Bạn muốn dùng với `zod` hay `yup` không?
