Câu này **rất thực tế** luôn, đặc biệt khi bạn dùng `React.memo` mà vẫn thấy component… **cứ render hoài không hiểu vì sao** 😅

---

## 🎯 Vấn đề thật sự là gì?

`React.memo` chỉ giúp **không re-render khi props KHÔNG đổi (so sánh ===)**.

Nhưng:

```ts
{ onClick = () => {} }
```

👉 Mỗi lần render **tạo ra 1 function mới**
👉 Function mới ≠ function cũ (khác reference)
👉 `memo()` nghĩ: "Props đổi rồi!" → **Re-render**

---

## ❌ Ví dụ KHÔNG áp dụng skill

```tsx
const UserAvatar = React.memo(function UserAvatar({ onClick = () => {} }) {
  console.log('UserAvatar render')
  return <img src="/avatar.png" onClick={onClick} />
})

function Parent() {
  const [count, setCount] = useState(0)

  return (
    <>
      <button onClick={() => setCount(c => c + 1)}>Increase</button>
      <UserAvatar /> {/* không truyền onClick */}
    </>
  )
}
```

### Điều gì xảy ra?

Bạn bấm **Increase** (chỉ làm đổi state của Parent)

👉 `Parent` re-render
👉 `UserAvatar` cũng re-render theo
👉 Console in lại `"UserAvatar render"` ❌

**Vì mỗi lần Parent render → default `() => {}` mới được tạo**

---

## ✅ Ví dụ ÁP DỤNG skill

```tsx
const NOOP = () => {}

const UserAvatar = React.memo(function UserAvatar({ onClick = NOOP }) {
  console.log('UserAvatar render')
  return <img src="/avatar.png" onClick={onClick} />
})
```

Giữ nguyên `Parent`.

### Giờ chuyện gì xảy ra?

Bạn bấm **Increase**

👉 `Parent` re-render
👉 `UserAvatar` **KHÔNG render lại** ✅
👉 Console không in gì thêm

Vì:

```
onClick = NOOP
NOOP === NOOP  ✅ cùng 1 reference
```

Memo hoạt động lại bình thường.

---

## 🔥 So sánh trực tiếp

| Cách viết            | Mỗi lần render có tạo giá trị mới? | Memo còn hiệu quả? |
| -------------------- | ---------------------------------- | ------------------ |
| `onClick = () => {}` | ✅ Có                               | ❌ Không            |
| `onClick = NOOP`     | ❌ Không                            | ✅ Có               |

---

## 🧠 Ví dụ thực tế trong project

Component Button dùng khắp app:

```tsx
const Button = memo(function Button({
  onClick = () => {},
  style = {},
  items = []
}) {
  ...
})
```

👉 App có 50 Button
👉 Parent re-render nhẹ
👉 **50 Button re-render theo** vì mỗi prop default đều là **object/array/function mới**

Sau khi fix:

```tsx
const NOOP = () => {}
const EMPTY_OBJ = {}
const EMPTY_ARR: any[] = []

const Button = memo(function Button({
  onClick = NOOP,
  style = EMPTY_OBJ,
  items = EMPTY_ARR
}) {
  ...
})
```

👉 Parent re-render
👉 Button **không render lại** nếu props không đổi
👉 Cải thiện performance thấy rõ trong DevTools Profiler

---

## ❓ Khác nhau giữa

### `onClick = () => {}`

* Mỗi lần gọi component → tạo function mới
* Reference khác → memo fail

### `onClick = NOOP`

* Luôn dùng **cùng 1 function duy nhất**
* Reference giống nhau → memo hoạt động

---

## 🧠 Tóm gọn để giải thích cho người khác

> Khi dùng `React.memo`, đừng đặt default prop là `() => {}`, `{}`, `[]` trực tiếp trong parameter.
> Vì mỗi render sẽ tạo object/function mới → React tưởng props đổi → re-render vô ích.
> Hãy đưa default đó ra **constant bên ngoài component** để giữ cùng reference.

---

## 📌 Nhớ nhanh 1 câu

**Default non-primitive prop + memo = phải dùng constant**

---

Nếu bạn muốn, mình chỉ tiếp luôn **các lỗi phổ biến khác làm React.memo vô tác dụng** (rất nhiều team dính)
