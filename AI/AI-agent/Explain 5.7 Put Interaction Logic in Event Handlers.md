Skill này nhìn qua tưởng “chỉ là đổi chỗ code”, nhưng thực tế nó **tránh bug rất khó chịu + tránh gọi API dư thừa**.

---

## 🎯 Bản chất vấn đề

**Một hành động do người dùng bấm nút**
→ phải chạy **ngay trong event handler**

**KHÔNG nên**:
Bấm nút → set state → `useEffect` nghe state đó → chạy logic

Vì `useEffect` sẽ chạy lại khi **bất kỳ dependency nào đổi**, không chỉ khi user bấm.

---

## ❌ Ví dụ SAI trong project thực tế

Form đăng ký:

```tsx
function RegisterForm() {
  const [submitted, setSubmitted] = useState(false)
  const theme = useTheme() // đổi khi user đổi dark/light mode

  useEffect(() => {
    if (submitted) {
      post('/api/register')
      showToast('Registered!', theme)
    }
  }, [submitted, theme]) // ⚠️ theme nằm trong deps
  

  return <button onClick={() => setSubmitted(true)}>Register</button>
}
```

### Chuyện gì có thể xảy ra ngoài đời?

1. User bấm **Register**
   → `submitted = true`
   → API gọi 1 lần ✅

2. Sau đó user đổi **Dark/Light mode**
   → `theme` đổi
   → `useEffect` chạy lại ❌
   → **API bị gọi LẠI lần nữa**
   → Toast hiện lại lần nữa

🚨 Bạn vừa tạo ra **duplicate request + duplicate side effect** mà không hề biết.

---

## ✅ Ví dụ ĐÚNG

```tsx
function RegisterForm() {
  const theme = useTheme()

  function handleRegister() {
    post('/api/register')
    showToast('Registered!', theme)
  }

  return <button onClick={handleRegister}>Register</button>
}
```

### Giờ thì:

| Hành động           | API có bị gọi lại không? |
| ------------------- | ------------------------ |
| Bấm Register        | ✅ Có                     |
| Đổi theme           | ❌ Không                  |
| Re-render component | ❌ Không                  |

👉 Logic chỉ chạy khi **user thật sự bấm**

---

## 🧠 Ví dụ khác dễ thấy hơn (giỏ hàng)

### ❌ Sai

```tsx
const [checkout, setCheckout] = useState(false)
const cart = useCart()

useEffect(() => {
  if (checkout) {
    sendOrder(cart.items)
  }
}, [checkout, cart]) // cart đổi là gọi lại
```

User bấm Checkout → gửi đơn
Sau đó thêm 1 sản phẩm vào giỏ → `cart` đổi
→ **Order bị gửi lại lần nữa** 💥

---

### ✅ Đúng

```tsx
function handleCheckout() {
  sendOrder(cart.items)
}
```

---

## 📌 Khi nào dùng `useEffect` đúng?

`useEffect` dành cho:

✔ Đồng bộ với bên ngoài do **state thay đổi tự nhiên**
Ví dụ:

* Theo dõi vị trí scroll
* Kết nối WebSocket khi component mount
* Sync title trang theo state

❌ Không dùng cho:

* Submit form
* Click button
* Drag & drop
* Thanh toán
* Gửi email

Những cái này là **user action cụ thể → để trong handler**

---

## 🔥 Tóm gọn để bạn giải thích cho người khác

> Nếu một side effect xảy ra vì **người dùng bấm nút**, hãy chạy nó trực tiếp trong event handler.
> Đừng set state rồi để `useEffect` xử lý, vì effect sẽ chạy lại khi các dependency khác thay đổi → dễ gây gọi API lặp, bug logic và khó debug.

---

## 🧠 Nhớ 1 câu là đủ

**User action → event handler
State change tự nhiên → useEffect**

---

Nếu bạn muốn, mình chỉ tiếp skill kế bên kiểu này (toàn mấy lỗi React rất nhiều dev senior vẫn dính).

------

```
"Nếu một side effect xảy ra vì người dùng bấm nút, hãy chạy nó trực tiếp trong event handler.
Đừng set state rồi để useEffect xử lý, vì effect sẽ chạy lại khi các dependency khác thay đổi → dễ gây gọi API lặp, bug logic và khó debug."

side effect trong ngữ cảnh này là gì? cho ví dụ thực tế?
t thường nghe mọi người dùng từ side effect khi fix bug, điều này có ý nghĩa gì? t cần để ý những gì?
VD: fix bug này thì để ý các side effect của nó
```
Câu hỏi này **rất “đúng chất dev”** luôn 😄
Vì “side effect” là từ mà ai cũng dùng… nhưng ít người giải thích rõ.

---

## ✅ Side effect là gì?

**Side effect = một hành động làm thay đổi thế giới bên ngoài component**

Nó **không chỉ tính toán rồi trả về giá trị**, mà gây ra **tác động phụ**.

### So sánh cho dễ hiểu

| Loại code                   | Có side effect không? | Vì sao                            |
| --------------------------- | --------------------- | --------------------------------- |
| `const total = price * qty` | ❌ Không               | Chỉ tính toán                     |
| `setState(...)`             | ⚠️ Có                 | Làm UI thay đổi                   |
| `fetch('/api')`             | ✅ Có                  | Gọi ra ngoài server               |
| `localStorage.setItem()`    | ✅ Có                  | Ghi dữ liệu trình duyệt           |
| `console.log()`             | ✅ (nhẹ)               | Tác động ra môi trường ngoài      |
| `showToast()`               | ✅                     | Hiển thị UI ngoài logic tính toán |

---

## 🎯 Trong React, side effect thường là

* Gọi API
* Ghi localStorage / sessionStorage
* Thay đổi URL
* Hiển thị toast / modal
* Đăng ký event listener
* WebSocket connect
* Timer (`setTimeout`, `setInterval`)
* Gửi analytics
* In ra console khi debug

👉 Tất cả những cái này **không chỉ tính toán**, mà **tạo ra ảnh hưởng bên ngoài**

---

## 📌 Ví dụ thực tế rất rõ

### ❌ Sai cách (side effect bị trigger nhiều lần)

```tsx
const [saved, setSaved] = useState(false)

useEffect(() => {
  if (saved) {
    fetch('/api/save-profile')   // 🚨 side effect
    showToast('Saved!')          // 🚨 side effect
  }
}, [saved, theme]) // theme đổi cũng làm chạy lại
```

User bấm Save → OK
User đổi theme → ❌ API gọi lại + Toast hiện lại

---

### ✅ Đúng cách

```tsx
function handleSave() {
  fetch('/api/save-profile')   // side effect
  showToast('Saved!')          // side effect
}
```

Chỉ chạy khi user bấm. Không phụ thuộc re-render.

---

## 🤔 Vì sao dev hay nói "coi chừng side effect"?

Khi fix bug, bạn sửa 1 chỗ… nhưng vô tình kích hoạt **hậu quả dây chuyền**.

### Ví dụ đời thực

Bạn sửa logic:

```tsx
useEffect(() => {
  fetchUser()
}, [userId])
```

Sau khi refactor, `userId` đổi thường xuyên hơn
→ API bị gọi liên tục
→ App lag, bị rate limit

👉 Đây gọi là **side effect ngoài ý muốn**

---

## 🧨 Ví dụ khác: Fix bug UI nhưng gây side effect

Bạn thêm:

```tsx
useEffect(() => {
  document.title = "Dashboard"
})
```

Không có dependency array → chạy mỗi render
→ Mỗi khi gõ input → render → đổi title → browser tốn tài nguyên

---

## 🧠 Khi dev nói:

> "Fix bug này nhớ coi side effect"

Nghĩa là:

👉 Sửa chỗ này có làm:

* API bị gọi thêm?
* Event listener bị đăng ký 2 lần?
* localStorage bị ghi đè?
* Toast bị hiện 2 lần?
* Modal tự mở lại?
* Scroll bị nhảy?
* Animation bị chạy lại?

---

## 📌 Checklist khi sửa bug (rất thực tế)

Hỏi bản thân:

1. Có thêm `useEffect` không?
2. Có thêm dependency vào effect không?
3. Có setState trong effect không?
4. Có gọi API trong effect không?
5. Effect này có thể chạy lại vì re-render không?
6. Có đăng ký event listener không? Có cleanup không?

---

## 💬 Cách giải thích ngắn gọn cho người khác

> Side effect là những hành động làm thay đổi bên ngoài logic thuần túy, như gọi API, lưu dữ liệu, hiển thị thông báo.
> Khi sửa code, phải coi chừng side effect vì nó có thể vô tình chạy nhiều lần và gây bug dây chuyền.

---

## 🧠 Nhớ câu này là đủ dùng cả sự nghiệp

> **Render để hiển thị UI
> Effect để đồng bộ với bên ngoài
> Event handler để xử lý hành động người dùng**

---

Nếu bạn muốn, mình chỉ tiếp cách nhận diện **side effect ẩn** trong code React mà nhiều dev không để ý 👀

