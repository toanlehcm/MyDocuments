# OK, mình giải thích **đúng trọng tâm lỗi + hướng dẫn để CHẠY ĐƯỢC MÁY ẢO** cho project **Cordova Android** của bạn 👇
(đây là lỗi rất **kinh điển** khi mở Cordova bằng Android Studio)

---

# 🔴 VẤN ĐỀ GỐC (root cause)

Lỗi chính:

```
No installed build tools found.
Please install the Android build tools version 35.0.0
```

👉 **Cordova đang yêu cầu Android Build Tools 35.0.0**
👉 Nhưng **SDK của bạn chưa cài version này**

📌 Android Studio **không tự động cài Build Tools cho Cordova**

---

# 🧠 Vì sao Cordova lại yêu cầu 35.0.0?

Trong file:

```
platforms/android/CordovaLib/cordova.gradle
```

Có logic:

```groovy
doFindLatestInstalledBuildTools(minBuildToolsVersion)
```

và:

```groovy
minBuildToolsVersion = 35.0.0
```

➡️ Nếu **không tìm thấy build-tools >= 35.0.0**
➡️ → **FAIL ngay ở Gradle sync**

---

# ✅ CÁCH FIX ĐÚNG (100% chạy được)

## 1️⃣ Cài Android Build Tools 35.0.0

### Cách chuẩn nhất (GUI)

1. Mở **Android Studio**
2. `File → Settings`
3. `Appearance & Behavior → System Settings → Android SDK`
4. Chuyển tab **SDK Tools**
5. Tick:

   * ✅ **Android SDK Build-Tools 35.0.0**
   * ✅ Android SDK Platform-Tools
   * ✅ Android SDK Command-line Tools (latest)
6. Click **Apply → OK**

⏳ Đợi download xong

---

### Kiểm tra đã cài chưa

Vào thư mục:

```
C:\Users\daniel.toan.le\AppData\Local\Android\Sdk\build-tools\
```

Bạn PHẢI thấy:

```
35.0.0\
```

👉 Nếu **không có → Cordova chắc chắn fail**

---

## 2️⃣ Sync lại Gradle

Sau khi cài xong Build Tools:

* Click **Try Again**
  hoặc
* `File → Sync Project with Gradle Files`

👉 Nếu hết lỗi đỏ → **OK**

---

# 🚀 CHẠY MÁY ẢO ANDROID (AVD)

Sau khi **Gradle sync thành công**, làm tiếp:

---

## 3️⃣ Tạo Android Emulator (AVD)

### Bước 1: Device Manager

```
Tools → Device Manager
```

---

### Bước 2: Create Virtual Device

* Category: **Phone**
* Chọn: `Pixel 5` (hoặc Pixel 6)
* Next

---

### Bước 3: Chọn System Image

Khuyến nghị (ổn định cho Cordova):

| Android    | API    |
| ---------- | ------ |
| Android 13 | API 33 |
| Android 12 | API 31 |

📌 Chọn:

* **x86_64**
* **Google APIs**

👉 Download nếu chưa có → Finish

---

## 4️⃣ Run app Cordova lên máy ảo

### Cách 1 – Android Studio (GUI)

1. Chọn device:

   ```
   Pixel 5 API 33
   ```
2. Click ▶ **Run**

---

### Cách 2 – Cordova CLI (rất hay dùng)

Mở terminal tại root project Cordova:

```bash
cordova platform rm android
cordova platform add android
cordova build android
cordova run android
```

👉 Emulator sẽ tự mở nếu chưa mở

---

# ⚠️ Lỗi thường gặp & cách xử lý nhanh

## ❌ Emulator không start

👉 Kiểm tra CPU:

```
Task Manager → Performance
Virtualization: Enabled
```

---

## ❌ Lỗi Java / JDK

Cordova thường ổn với:

* **JDK 11** (an toàn nhất)
* **JDK 17** (chỉ khi project mới)

👉 Kiểm tra:

```
java -version
```

---

## ❌ Build tools mismatch

Nếu project quá cũ → không support 35.0.0
👉 Fix tạm (chỉ khi cần):

Trong `cordova.gradle`:

```groovy
minBuildToolsVersion = "34.0.0"
```

⚠️ Không khuyến nghị nếu không hiểu rõ

---

# ✅ CHECKLIST CUỐI (tick là chạy được)

✅ SDK path đúng
✅ Build-tools **35.0.0** đã cài
✅ Gradle sync OK
✅ Có AVD
✅ Run thành công

---

# 🧠 TÓM TẮT 1 CÂU (để nhớ lâu)

> **Cordova KHÔNG tự cài Android Build Tools → bạn phải cài tay đúng version mà nó yêu cầu**

---

Nếu bạn muốn, mình có thể:

* 🔧 Fix **Cordova version ↔ Android SDK version**
* 🧩 Giải thích **Cordova build flow**
* 🚀 Tối ưu emulator chạy nhẹ cho máy yếu

👉 Bạn đang dùng **Cordova version bao nhiêu** (`cordova -v`)?
