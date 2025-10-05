À, mình thấy rõ vấn đề 👇

---

### ❌ Nguyên nhân lỗi

```tsx
<DigitInputCmp digitProps={digitProps} />
```

* `DigitInputCmp` được định nghĩa như sau:

```ts
export const DigitInputCmp = (digitProps?: DigitInputProps): JSX.Element => { ... }
```

Điều này có nghĩa là **prop duy nhất** của component này **chính là `digitProps`** (loại `DigitInputProps | undefined`).
Nó **không phải object có key `digitProps`**, mà bản thân props *chính là* `digitProps`.

Khi bạn viết `<DigitInputCmp digitProps={digitProps} />`, React hiểu rằng bạn đang truyền một prop có tên là `digitProps` vào, nhưng component lại không khai báo prop đó → lỗi TS:

> Property 'digitProps' does not exist...

---

### ✅ Cách fix clean code

Bạn nên sửa component `DigitInputCmp` để props rõ ràng hơn, thay vì overload kiểu function param như hiện tại.

#### Cách 1: Đặt prop đúng nghĩa (gọn, type-safe)

```tsx
export interface IDigitInputCmpProps {
  digitProps?: DigitInputProps
}

export const DigitInputCmp = ({ digitProps }: IDigitInputCmpProps): JSX.Element => {
  const { onChange, ...restProps } = digitProps ?? {}
  const handleChange = onChange ?? (() => {})

  return <DigitInput.Root {...restProps} onChange={handleChange} />
}
```

👉 Bây giờ dùng:

```tsx
<DigitInputCmp digitProps={digitProps} />
```

→ Không còn lỗi.

---

#### Cách 2: Cho component act như một wrapper trực tiếp (props spread thẳng vào `DigitInput.Root`)

Nếu bạn không muốn wrap thêm 1 layer `digitProps`, có thể để props thẳng:

```tsx
export const DigitInputCmp = (props: DigitInputProps): JSX.Element => {
  const { onChange, ...restProps } = props ?? {}
  const handleChange = onChange ?? (() => {})

  return <DigitInput.Root {...restProps} onChange={handleChange} />
}
```

👉 Bây giờ dùng:

```tsx
<DigitInputCmp {...digitProps} />
```

---

### 🔑 Best practice

* Nếu muốn **consistency** với `TextInput` (nơi bạn đã để `digitProps` trong `ITextInputExtraProps`) → chọn **Cách 1**.
* Nếu muốn **simple wrapper**, không cần lồng thêm prop → chọn **Cách 2** (gọn hơn, dễ tái sử dụng).

---

👉 Theo mình, trong trường hợp của bạn (đã có `digitProps` trong `ITextInputExtraProps`) → **Cách 1** sẽ clean, dễ maintain hơn.

Bạn muốn mình refactor luôn toàn bộ `DigitInputCmp` + `TextInputComponent` theo **Cách 1 chuẩn** để đồng bộ không?

<!-- ------------------------ -->
Hiểu rồi 👍. Nếu chỉ được chỉnh ở `DigitInputCmp.tsx` thì cách **clean code nhất** là đảm bảo `onChange` luôn tồn tại trước khi truyền xuống `DigitInput`.

Bạn có thể viết gọn như sau:

```tsx
// DigitInputCmp.tsx
import React from 'react'
import { DigitInput } from '.'
import { DigitInputProps } from './DigitInput'

export const DigitInputCmp = (props: DigitInputProps): JSX.Element => {
  return (
    <DigitInput
      {...props}
      onChange={props.onChange ?? (() => {})} // đảm bảo luôn có onChange
    />
  )
}

DigitInputCmp.displayName = 'DigitInputCmp'
```

### Vì sao cách này clean code?

* Không đụng vào file gốc `DigitInput`.
* Không cần destructuring + tạo thêm biến `handleChange` thừa.
* Giữ API của `DigitInputCmp` giống hệt `DigitInput` nhưng loại bỏ lỗi type ngay tại đây.
* Khi người dùng **có `onChange`** → dùng hàm đó.
  Khi người dùng **không truyền `onChange`** → fallback hàm rỗng.

---

Bạn có muốn mình viết lại type cho `DigitInputCmp` luôn (ví dụ nới lỏng `onChange?: ...`) để developer thấy rõ có thể bỏ qua prop này không, thay vì để TS báo lỗi từ `DigitInputProps` gốc?
