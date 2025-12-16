# Không thấy android SDK trong system settings

OK 👍 mình thấy rõ vấn đề rồi.
**Bạn KHÔNG thấy “Android SDK” trong System Settings là hoàn toàn đúng trong trường hợp này**, và mình sẽ giải thích **vì sao + cách mở đúng chỗ + fix triệt để** để bạn **chạy được máy ảo**.

---

# ❓ Vì sao bạn không thấy Android SDK?

Bạn đang tìm ở:

```
Appearance & Behavior → System Settings
```

📌 **Android SDK KHÔNG nằm ở đây** ❌
(ảnh bạn gửi là đúng màn hình… nhưng sai mục)

👉 **Android SDK nằm ở:**

```
Languages & Frameworks → Android SDK
```

---

# ✅ CÁCH MỞ ANDROID SDK ĐÚNG

## Cách 1 (nhanh nhất – khuyên dùng)

1. Android Studio
2. Nhấn:

   ```
   Ctrl + Alt + S
   ```
3. Ở ô Search (góc trên trái) gõ:

   ```
   SDK
   ```
4. Chọn:

   ```
   Android SDK
   ```

👉 Bạn sẽ thấy màn hình:

* **Android SDK Location**
* Tabs:

  * SDK Platforms
  * SDK Tools

---

## Cách 2 (đi theo menu)

1. `File → Settings`
2. Mở:

   ```
   Languages & Frameworks
     → Android SDK
   ```

📌 Nếu **KHÔNG thấy “Android SDK” ở đây** → đọc tiếp mục dưới 👇

---

# ⚠️ NẾU VẪN KHÔNG THẤY ANDROID SDK

👉 99% là do **Android plugin chưa được bật / bị disable**

## Fix ngay:

1. `File → Settings`
2. `Plugins`
3. Tìm:

   ```
   Android
   ```
4. Kiểm tra:

   * ✅ Enabled
5. Nếu vừa enable → **Restart Android Studio**

---

# 🧩 SAU KHI MỞ ĐƯỢC ANDROID SDK → FIX LỖI CORDOVA

## 1️⃣ Cài Build Tools 35.0.0

Trong **Android SDK**:

### Tab: SDK Tools

Tick:

* ✅ Android SDK Build-Tools **35.0.0**
* ✅ Android SDK Platform-Tools
* ✅ Android SDK Command-line Tools (latest)

👉 Apply → OK

---

## 2️⃣ Kiểm tra SDK path

Trong cùng màn hình:

```
Android SDK Location:
C:\Users\daniel.toan.le\AppData\Local\Android\Sdk
```

Nếu khác → sửa lại

---

# 🚀 CHẠY MÁY ẢO (AVD)

## Mở Device Manager

Menu:

```
Tools → Device Manager
```

### Nếu thấy danh sách device → OK

### Nếu chưa có → Create Virtual Device

---

# 🧠 TÓM TẮT NGẮN GỌN

| Bạn đang làm              | Trạng thái               |
| ------------------------- | ------------------------ |
| Tìm SDK ở System Settings | ❌ Sai chỗ                |
| Android SDK               | ✅ Languages & Frameworks |
| Không thấy Android SDK    | ❌ Android plugin         |
| Cordova lỗi build-tools   | ✅ Cài 35.0.0             |

---

# ❗ LƯU Ý QUAN TRỌNG (Cordova)

> **Không nên mở project Cordova như project Android thuần**

✔ Đúng cách:

* Build / run bằng **cordova CLI**
* Android Studio chỉ dùng để:

  * Cài SDK
  * Tạo emulator
  * Debug khi cần

---

Nếu bạn muốn, mình có thể:

* 📍 Chỉ ra **Android SDK Manager bằng ảnh từng bước**
* 🧠 Giải thích **Cordova ↔ Gradle ↔ Android SDK**
* ⚙️ Fix project Cordova **cho Android Studio đọc mượt**

👉 Bạn xác nhận giúp mình:
**Menu `Languages & Frameworks` của bạn có mục Android không?**
