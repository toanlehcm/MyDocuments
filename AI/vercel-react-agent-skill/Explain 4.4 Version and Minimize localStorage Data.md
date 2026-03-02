Ok skill này nghe “hơi backend” nhưng **frontend dính đòn rất nhiều** nếu không làm 😄
Mình lấy ví dụ cực thực tế trong app thật cho bạn thấy sự khác biệt.

---

## 🎯 Bối cảnh thực tế

App có **User Settings** lưu vào `localStorage` để:

* Ghi nhớ theme (dark/light)
* Ngôn ngữ
* Bật/tắt thông báo

---

## ❌ KHÔNG version + lưu cả object

### Code cũ

```ts
// Lưu toàn bộ object user từ API
localStorage.setItem('userConfig', JSON.stringify(user))
```

User object từ server:

```json
{
  "id": 1,
  "name": "Toan",
  "email": "toan@company.com",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "preferences": {
    "darkMode": true,
    "lang": "vi",
    "notifications": true
  },
  "role": "admin",
  "internalFlags": { "betaUser": true }
}
```

### 🚨 Vấn đề sẽ xảy ra

#### 1️⃣ **Lỗi khi app update schema**

Version app mới đổi cấu trúc:

```ts
// App mới đọc kiểu mới
const config = JSON.parse(localStorage.getItem('userConfig')!)
console.log(config.theme) // ❌ undefined
```

Vì config cũ lưu `preferences.darkMode`, không phải `theme`.

➡️ User mở app sau khi deploy → **UI lỗi, theme sai, crash ngầm**

---

#### 2️⃣ **Lộ dữ liệu nhạy cảm**

Bạn vô tình đã lưu:

* token đăng nhập
* role admin
* internal flags

👉 localStorage đọc được bằng JS → nếu có XSS là lộ hết.

---

#### 3️⃣ **Tốn dung lượng vô ích**

localStorage chỉ có khoảng **5MB**
Mỗi user object có thể vài KB → nhiều lần save → nhanh đầy quota → **setItem ném lỗi**.

---

## ✅ CÓ version + chỉ lưu field cần thiết

### Code mới

```ts
const VERSION = 'v2'

function saveConfig(config: { theme: string; language: string }) {
  try {
    localStorage.setItem(`userConfig:${VERSION}`, JSON.stringify(config))
  } catch {}
}
```

Chỉ lưu:

```json
{
  "theme": "dark",
  "language": "vi"
}
```

---

## 🔥 Khác biệt thấy rõ trong thực tế

| Không áp dụng skill                    | Áp dụng skill                            |
| -------------------------------------- | ---------------------------------------- |
| App update → config cũ làm app lỗi     | Version mới đọc key mới → không xung đột |
| Lưu cả token, role, internal data      | Chỉ lưu theme, language → an toàn        |
| Dữ liệu nặng → nhanh đầy quota         | Dữ liệu nhỏ gọn                          |
| Không migrate được dữ liệu cũ          | Có thể viết hàm migrate                  |
| Dễ bị bug “máy tao chạy, máy user lỗi” | Hành vi ổn định giữa các version         |

---

## 🧨 Case bug có thật ngoài đời

1. App v1 lưu:

   ```json
   { "darkMode": true }
   ```

2. App v2 đổi thành:

   ```json
   { "theme": "dark" }
   ```

3. Không version → app v2 đọc nhầm config v1 → UI nhảy light mode → user tưởng app bị lỗi.

Chỉ cần:

```ts
localStorage.setItem('userConfig:v2', ...)
```

Là v2 **bỏ qua config v1** → không lỗi.

---

## 🧠 Tóm gọn kiến thức để bạn giải thích cho người khác

> **Version localStorage giống version API — để app mới không đọc nhầm dữ liệu cũ.**
> **Minimize data để tránh lưu nhầm dữ liệu nhạy cảm và giảm lỗi đầy bộ nhớ.**

### Một câu dễ hiểu:

🗣️

> Đừng lưu cả cái tủ lạnh khi bạn chỉ cần chai nước.
> Và nhớ dán nhãn version để biết chai này của năm nào.

---

## 📌 Khi nào bắt buộc dùng skill này

* Lưu settings người dùng
* Lưu cache API
* Lưu feature flags
* App có nhiều lần update schema theo thời gian

---

Nếu bạn muốn, mình chỉ luôn **mẫu helper chuẩn** cho project React/Next để dùng localStorage an toàn + version hóa luôn.
