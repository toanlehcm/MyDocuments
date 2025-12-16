# Hướng dẫn install cordova trong AS

Rất rõ ràng 👍
👉 **KHÔNG phải lỗi Android Studio**, mà là **Cordova CHƯA được cài hoặc chưa vào PATH**.

Dù bạn mở **terminal của Android Studio hay PowerShell ngoài Windows** thì **bản chất như nhau** → hệ thống **không tìm thấy lệnh `cordova`**.

Giờ mình hướng dẫn **từng bước, không sót bước nào**.

---

# ❌ VÌ SAO BỊ LỖI NÀY?

```
cordova : The term 'cordova' is not recognized
```

👉 Nghĩa là:

* ❌ Cordova CLI **chưa được cài**
  **hoặc**
* ❌ Đã cài nhưng **Node / npm chưa vào PATH**

---

# ✅ BƯỚC 1 – KIỂM TRA NODE.JS (BẮT BUỘC)

Cordova chạy trên **Node.js**.

Trong terminal (ở đâu cũng được):

```powershell
node -v
npm -v
```

## ❌ Nếu báo không nhận lệnh

→ bạn **chưa cài Node.js**

### 👉 Cài Node.js (LTS)

[https://nodejs.org](https://nodejs.org)

* Chọn **LTS**
* Cài `.msi`
* Next → Next → Finish
* Restart máy (khuyên làm)

---

## ✅ Nếu có version

Ví dụ:

```
v18.x.x
9.x.x
```

→ sang bước 2

---

# ✅ BƯỚC 2 – CÀI CORDOVA CLI (GLOBAL)

```powershell
npm install -g cordova
```

⏳ Chờ install xong

---

# 🔍 BƯỚC 3 – KIỂM TRA CORDOVA

```powershell
cordova -v
```

Phải ra version, ví dụ:

```
12.0.0
```

👉 Nếu OK → 90% xong

---

# ⚠️ NẾU VẪN KHÔNG NHẬN `cordova`

### Kiểm tra PATH npm:

```powershell
npm config get prefix
```

Ví dụ ra:

```
C:\Users\daniel.toan.le\AppData\Roaming\npm
```

👉 Đảm bảo thư mục này **có trong PATH**

---

# 🧭 CORDOVA + ANDROID STUDIO TERMINAL

📌 Terminal Android Studio **chỉ là PowerShell**
→ Không có gì đặc biệt
→ Nếu `cordova` không chạy ở ngoài Windows
→ trong Android Studio **cũng không chạy**

---

# 🚀 BƯỚC 4 – RUN APP (SAU KHI CORDOVA OK)

Quay lại thư mục:

```powershell
cd D:\Sources\NewCordova\trunk
cordova platform ls
cordova run android --emulator
```

---

# 🧠 TÓM TẮT LOGIC (để nhớ lâu)

| Công cụ     | Cần          |
| ----------- | ------------ |
| Node.js     | chạy Cordova |
| npm         | cài Cordova  |
| Cordova CLI | build + run  |
| Android SDK | build APK    |
| Emulator    | chạy app     |

👉 Thiếu **Node / Cordova** → lỗi bạn đang gặp

---

# ❓ CÂU HỎI QUAN TRỌNG

Bạn trả lời giúp mình **1 dòng** thôi:

```powershell
node -v
```

Mình sẽ nói tiếp **bước chính xác tiếp theo**, không dư thừa.
