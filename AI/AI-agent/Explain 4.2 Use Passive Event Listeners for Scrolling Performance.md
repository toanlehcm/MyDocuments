Chuẩn bài performance web luôn 👌 Skill này nghe nhỏ nhưng ảnh hưởng **trực tiếp tới độ mượt khi scroll**.

---

## 🔥 Vấn đề thực tế nếu KHÔNG dùng `passive: true`

Giả sử trong project bạn có:

* Trang **dashboard dài**
* Có **chart**, **table**, **infinite scroll**
* Bạn thêm listener để:

  * track scroll position
  * zoom chart bằng wheel
  * swipe trên mobile

```ts
useEffect(() => {
  const onWheel = (e: WheelEvent) => {
    // chỉ log thôi, KHÔNG preventDefault
    console.log(e.deltaY)
  }

  window.addEventListener('wheel', onWheel)

  return () => window.removeEventListener('wheel', onWheel)
}, [])
```

### 🧠 Điều gì xảy ra trong trình duyệt?

Vì listener **có khả năng gọi `e.preventDefault()`**, nên browser phải:

> ⛔ **TẠM DỪNG SCROLL**
> để đợi JS chạy xong xem bạn có chặn scroll không

Kết quả:

| Thiết bị            | Hiện tượng                       |
| ------------------- | -------------------------------- |
| Laptop cấu hình yếu | Scroll bị khựng nhẹ              |
| Mobile              | Vuốt bị trễ, cảm giác “dính tay” |
| Trang nhiều JS      | FPS tụt khi cuộn                 |

Chrome DevTools còn có cảnh báo:

> **"Added non-passive event listener to a scroll-blocking event"**

---

## ✅ Sau khi thêm `passive: true`

```ts
window.addEventListener('wheel', onWheel, { passive: true })
```

### 🧠 Browser hiểu rằng:

> “OK thằng này **cam kết KHÔNG gọi preventDefault()**,
> vậy tao **cho scroll chạy ngay lập tức**, không cần chờ JS”

Kết quả thực tế:

| Trước                         | Sau                      |
| ----------------------------- | ------------------------ |
| Scroll delay vài ms mỗi frame | Scroll mượt ngay lập tức |
| Jank khi vừa scroll vừa load  | Mượt hơn rõ trên mobile  |
| Main thread bị block          | Ít bị block hơn          |

---

## 📱 Ví dụ rất đời thường trong project

### Case: Sticky Header đổi màu khi scroll

```ts
useEffect(() => {
  const onScroll = () => {
    if (window.scrollY > 50) {
      setScrolled(true)
    }
  }

  window.addEventListener('scroll', onScroll) // ❌ thiếu passive

  return () => window.removeEventListener('scroll', onScroll)
}, [])
```

Header chỉ đổi màu, **không hề chặn scroll**
→ Nhưng browser vẫn phải đợi mỗi lần người dùng cuộn 😭

### Fix đúng:

```ts
window.addEventListener('scroll', onScroll, { passive: true }) // ✅
```

➡️ Cảm giác cuộn trên mobile mượt hơn thấy rõ.

---

## ❗ Khi nào KHÔNG dùng passive?

Khi bạn **cần chặn hành vi mặc định**:

```ts
const onTouchMove = (e: TouchEvent) => {
  e.preventDefault() // chặn scroll để làm custom swipe
}

el.addEventListener('touchmove', onTouchMove, { passive: false }) // bắt buộc
```

Nếu để `passive: true` mà gọi `preventDefault()` → browser bỏ qua luôn.

---

## 🧠 Tóm gọn kiến thức để bạn giải thích cho người khác

> **Passive event listener giúp trình duyệt scroll mượt hơn bằng cách nói trước rằng JS sẽ không chặn hành vi cuộn.**

### Một câu dễ hiểu:

🗣️

> Bình thường browser phải đợi JS xử lý xong mới cho scroll,
> còn `passive: true` nói rằng: *"Cứ scroll ngay đi, tao không cản đâu."*

---

## 📌 Nhớ nhanh

| Event nên dùng passive     | Vì                                  |
| -------------------------- | ----------------------------------- |
| `scroll`                   | Không bao giờ cần preventDefault    |
| `wheel`                    | Thường chỉ để đọc delta             |
| `touchstart` / `touchmove` | Nếu chỉ tracking, không chặn scroll |

---

Nếu bạn muốn, mình chỉ bạn cách **dùng Chrome DevTools để nhìn thấy scroll bị block** luôn — xem xong là hiểu liền tại sao skill này đáng tiền 💡
