Câu hỏi hay 👌

Bạn thấy trong input thường mình viết:

```tsx
<TextInput
  {...configProps}
  {...field}   // <-- spread luôn field
  baseInputProps={{ ... }}
/>
```

nhưng với `DigitInput` thì mình lại không dùng `...field` mà phải tự map `value` và `onChange`.

---

### 🔎 Nguyên nhân

`react-hook-form` khi gọi `useController` sẽ trả về `field` có dạng:

```ts
field = {
  value: any
  onChange: (event: any) => void
  onBlur: (event: any) => void
  name: string
  ref: (instance: any) => void
}
```

* Với `<input />` chuẩn (text, number, email, ...), `field.onChange` nhận **event** (`e.target.value`).
* Với `<DigitInput />` (OTP), `onChange` của nó lại yêu cầu **string trực tiếp** (vd `"1234"`), **không phải event**.

👉 Nếu bạn làm `...field` thì:

```tsx
<DigitInputCmp {...digitProps} {...field} />
```

sẽ truyền `onChange(event)` vào, khiến `DigitInput` crash vì nó không biết xử lý `event`.

---

### 🔧 Giải pháp

Ta phải **chuyển đổi** `field.onChange` sang callback OTP-compatible:

```tsx
digitProps={{
  ...configProps.digitProps,
  value: field.value,                // lấy từ RHF
  onChange: (val: string) => {       // val = OTP string
    field.onChange(val)              // update form state
    onChangeHandle?.(val)            // callback ngoài
  }
}}
```

---

### ✅ Kết luận

* Không thể `...field` trực tiếp cho `DigitInput` vì `react-hook-form` mặc định thiết kế cho `<input />` chuẩn.
* Với custom input như OTP → cần “adapter” để map lại `field.onChange` cho đúng signature.

---

Bạn có muốn mình viết cho bạn một **InputAdapter** generic (kiểu `ControllerAdapter`) để bạn không phải viết `if (DIGIT)` thủ công mỗi lần nữa không?
