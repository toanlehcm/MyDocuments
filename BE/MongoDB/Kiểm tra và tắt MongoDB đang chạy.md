# Kiểm tra và tắt MongoDB đang chạy

Bạn đang dùng **Windows** 👍
Trước khi chạy lệnh:

```bash
mongod --replSet rs0 --bind_ip localhost --port 27017 --dbpath "C:\mongodb\rs1"
```

👉 **BẮT BUỘC** phải chắc chắn **MongoDB hiện tại đã tắt**, nếu không sẽ bị lỗi **port 27017 already in use** hoặc **dbpath locked**.

Dưới đây là **các cách kiểm tra CHUẨN + nhanh nhất** 👇

---

# ✅ CÁCH 1 (KHUYẾN NGHỊ) — Kiểm tra MongoDB service (Windows Service)

### 1️⃣ Mở Services

* Nhấn **Win + R**
* Gõ:

```text
services.msc
```

### 2️⃣ Tìm các service:

* `MongoDB`
* `MongoDB Server`
* `MongoDB Server (MongoDB)`

### 3️⃣ Kiểm tra trạng thái

* **Running** → MongoDB đang chạy ❌
* **Stopped** → MongoDB đã tắt ✅

👉 Nếu đang **Running**:

* Right click → **Stop**

📌 **Cực kỳ quan trọng**:
MongoDB cài bằng MSI **luôn chạy dạng service**, dù bạn không mở terminal.

---

# ✅ CÁCH 2 — Kiểm tra bằng port 27017 (RẤT CHUẨN)

MongoDB mặc định dùng **port 27017**.

### Mở Command Prompt (Run as Admin)

```bash
netstat -ano | findstr :27017
```

### Kết quả:

#### ❌ MongoDB đang chạy

```
TCP    127.0.0.1:27017    0.0.0.0:0    LISTENING    12345
```

➡️ Có PID → MongoDB đang chiếm port ❌

#### ✅ MongoDB đã tắt

```
(không có output)
```

---

### Muốn biết process nào đang chiếm port:

```bash
tasklist | findstr 12345
```

---

# ✅ CÁCH 3 — Kiểm tra process mongod.exe

```bash
tasklist | findstr mongod
```

* Có `mongod.exe` → MongoDB đang chạy ❌
* Không có → MongoDB đã tắt ✅

---

# ✅ CÁCH 4 — Dùng PowerShell (ngắn gọn)

```powershell
Get-Process mongod -ErrorAction SilentlyContinue
```

* Có output → MongoDB đang chạy ❌
* Không có → đã tắt ✅

---

# 🛑 CÁCH TẮT MongoDB (nếu đang chạy)

## 1️⃣ Tắt service (khuyên dùng)

```powershell
net stop MongoDB
```

Hoặc trong `services.msc`

---

## 2️⃣ Kill process (chỉ dùng khi cần)

```bash
taskkill /F /IM mongod.exe
```

⚠️ Không khuyến nghị nếu đang có data quan trọng.

---

# ⚠️ LỖI THƯỜNG GẶP KHI CHƯA TẮT

| Lỗi                      | Nguyên nhân                |
| ------------------------ | -------------------------- |
| `address already in use` | Port 27017 đang bị chiếm   |
| `dbpath is locked`       | Mongod khác đang dùng data |
| Replica set init fail    | Có instance khác chạy      |

---

# 🧠 20% cốt lõi (đủ dùng 80%)

✔ MongoDB trên Windows **thường chạy dạng service**
✔ Check **services.msc** là nhanh & chắc nhất
✔ Port 27017 là dấu hiệu rõ nhất
✔ Phải tắt MongoDB cũ trước khi chạy replica set
✔ Không tắt = 100% lỗi khi run mongod mới

---

Nếu bạn muốn, mình có thể:

* ✔ Viết **script kiểm tra + tắt MongoDB tự động**
* ✔ Hướng dẫn setup **replica set rs0 (1–3 node)** chuẩn
* ✔ Giải thích từng flag `--replSet --bind_ip --dbpath`

👉 nói tiếp là mình làm cho bạn ngay 👍
