Skill này nghe nhỏ nhưng trong app lớn (dashboard, chat, admin…) nó giúp **giảm re-render vô ích** rõ rệt.

---

## 🎯 Bối cảnh thực tế

Trang có URL như sau:

```
/chat/123?ref=facebook&utm_campaign=sale
```

Bạn có nút:

👉 **Share Chat**

Khi bấm mới cần lấy `ref` từ URL để gửi kèm khi share.

---

## ❌ Cách 1 — Dùng `useSearchParams()` (subscribe liên tục)

```tsx
import { useSearchParams } from 'next/navigation'

function ShareButton({ chatId }) {
  const searchParams = useSearchParams() // 👈 SUBSCRIBE URL CHANGES

  const handleShare = () => {
    const ref = searchParams.get('ref')
    shareChat(chatId, { ref })
  }

  return <button onClick={handleShare}>Share</button>
}
```

### 🚨 Điều gì xảy ra?

Mỗi khi URL query thay đổi:

* `?tab=info`
* `?page=2`
* `?filter=unread`

➡️ **Component này re-render lại dù không cần**

Trong trang có 20 button giống vậy:

👉 Mỗi lần đổi filter → **20 component re-render vô ích**

---

## ✅ Cách 2 — Chỉ đọc khi bấm nút

```tsx
function ShareButton({ chatId }) {
  const handleShare = () => {
    const params = new URLSearchParams(window.location.search)
    const ref = params.get('ref')
    shareChat(chatId, { ref })
  }

  return <button onClick={handleShare}>Share</button>
}
```

### 🔥 Khác biệt

| useSearchParams            | URLSearchParams                 |
| -------------------------- | ------------------------------- |
| React hook                 | Web API thuần                   |
| **Subscribes** khi URL đổi | **Không subscribe**             |
| Gây re-render              | Không re-render                 |
| Dùng khi UI PHỤ THUỘC URL  | Dùng khi chỉ cần đọc lúc action |

---

## 🧠 Ví dụ dễ thấy trong project thật

### Trang Dashboard có:

* Filter theo `?status=open`
* Sort theo `?sort=date`
* Pagination `?page=3`

Nhưng nút **Export CSV** chỉ cần đọc `?ref` khi bấm.

### Nếu dùng `useSearchParams`

👉 Mỗi lần đổi page / sort / filter
👉 Nút Export CSV cũng re-render theo
👉 Ở trang lớn = lag nhẹ + render thừa

### Nếu dùng `URLSearchParams` trong onClick

👉 Nút **không re-render**
👉 Chỉ đọc URL đúng **khoảnh khắc user bấm**

---

## 🎯 Khi nào dùng cái nào?

| Trường hợp                                     | Dùng gì                                       |
| ---------------------------------------------- | --------------------------------------------- |
| UI phải thay đổi khi URL đổi (VD: tab, filter) | `useSearchParams()`                           |
| Chỉ cần đọc 1 lần khi user bấm nút             | `new URLSearchParams(window.location.search)` |

---

## 💥 So sánh bằng 1 câu dễ hiểu

> `useSearchParams()` = bạn ngồi nghe ngóng mọi thay đổi của URL
> `URLSearchParams` = bạn chỉ nhìn URL khi thật sự cần

---

## 🧠 Tóm gọn kiến thức để giải thích cho người khác

> Nếu giá trị từ URL **không ảnh hưởng đến việc render UI**,
> đừng subscribe bằng hook.
> Hãy đọc trực tiếp từ `window.location` khi cần để tránh re-render thừa.

---

Skill này đặc biệt quan trọng trong:

* Dashboard nhiều filter
* App có nhiều component nhỏ
* Trang có query thay đổi liên tục

---

Nếu bạn muốn, mình chỉ tiếp **các hook khác dễ gây subscribe thừa** mà dev hay không để ý 👀
