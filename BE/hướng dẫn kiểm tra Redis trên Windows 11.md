# Dưới đây là **hướng dẫn kiểm tra Redis trên Windows 11** + giải thích lỗi bạn đang gặp, theo cách **dễ hiểu – làm theo từng bước – áp dụng được ngay**.

---

## 1️⃣ Hiểu nhanh lỗi bạn đang gặp

```
MaxRetriesPerRequestError: Reached the max retries per request limit (20)
```

👉 Nghĩa là:

* Ứng dụng **không kết nối được tới Redis**
* Redis **chưa chạy / chạy sai port / sai host**
* App thử kết nối 20 lần → thất bại → throw error

⚠️ **Đây KHÔNG phải lỗi code**, mà là **lỗi môi trường (Redis server)**.

---

## 2️⃣ Kiểm tra: Redis có đang chạy không?

### 🔹 Cách 1: Kiểm tra bằng Command Prompt / PowerShell

Mở **PowerShell (Run as Administrator)** và chạy:

```powershell
netstat -ano | findstr 6379
```

📌 Port mặc định của Redis là **6379**

#### 👉 Nếu KHÔNG thấy dòng nào

➡️ Redis **chưa chạy**

#### 👉 Nếu thấy dạng:

```
TCP    127.0.0.1:6379     LISTENING     <PID>
```

➡️ Redis **đang chạy**

---

### 🔹 Cách 2: Kiểm tra Redis service (nếu cài dạng service)

```powershell
services.msc
```

Tìm:

* `Redis`
* hoặc `Redis Server`

✔ Status: **Running**
❌ Status: **Stopped** → Start lên

---

## 3️⃣ Kiểm tra: Redis có cài chưa?

### 🔹 Kiểm tra redis-cli

```powershell
redis-cli --version
```

#### ❌ Nếu báo:

```
'recognized as internal or external command'
```

➡️ Redis **chưa cài** hoặc **chưa add PATH**

---

## 4️⃣ Cách chạy Redis trên Windows 11 (3 cách phổ biến)

---

## ✅ CÁCH 1 (Khuyên dùng): Redis qua Docker 🐳

### Bước 1: Chạy Redis container

```bash
docker run -d --name redis -p 6379:6379 redis
```

### Bước 2: Test Redis

```bash
docker exec -it redis redis-cli
```

```redis
PING
```

👉 Kết quả:

```
PONG
```

✔ Redis OK

---

## ✅ CÁCH 2: Redis trên Windows (bản unofficial)

> Redis **KHÔNG chính thức hỗ trợ Windows**, nhưng vẫn dùng được cho dev.

### Bước 1: Tải Redis for Windows

* Repo phổ biến:
  [https://github.com/tporadowski/redis/releases](https://github.com/tporadowski/redis/releases)

Tải file dạng:

```
Redis-x64-xxx.msi
```

### Bước 2: Cài đặt

* Tick:

  * ✔ Install as Windows Service
  * ✔ Add to PATH

### Bước 3: Start Redis

```powershell
redis-server
```

Hoặc:

```powershell
redis-cli ping
```

---

## ✅ CÁCH 3: Redis trong WSL (Linux inside Windows)

Nếu bạn dùng **WSL2 + Ubuntu**:

```bash
sudo apt update
sudo apt install redis-server
sudo service redis-server start
```

Test:

```bash
redis-cli ping
```

---

## 5️⃣ Kiểm tra Redis hoạt động OK chưa

Sau khi Redis chạy, test nhanh:

```bash
redis-cli
```

```redis
PING
```

✔ `PONG` → Redis OK

```redis
SET test 123
GET test
```

✔ `123`

---

## 6️⃣ Kiểm tra config Redis trong code

Ví dụ Node.js (ioredis / redis):

```ts
const redis = new Redis({
  host: '127.0.0.1',
  port: 6379,
  maxRetriesPerRequest: 20
})
```

👉 Kiểm tra:

* host đúng chưa?
* port đúng chưa?
* Redis có chạy không?

---

## 7️⃣ Debug nhanh khi gặp lỗi này (Checklist)

✔ Redis server đang chạy
✔ Port 6379 không bị chiếm
✔ App connect đúng host/port
✔ Không bị firewall block
✔ Không dùng `localhost` sai (thử `127.0.0.1`)

---

## 8️⃣ Nếu muốn tránh crash app (best practice)

```ts
const redis = new Redis({
  maxRetriesPerRequest: null, // tránh crash
  enableReadyCheck: true,
})
```

Hoặc catch error khi init Redis.

---

## 🎯 KẾT LUẬN NGẮN GỌN

| Vấn đề                    | Nguyên nhân                               |
| ------------------------- | ----------------------------------------- |
| MaxRetriesPerRequestError | Redis **không chạy / không connect được** |
| Không phải bug code       | Là lỗi **môi trường**                     |
| Cách fix nhanh            | Chạy Redis (Docker / Service / WSL)       |

---

Nếu bạn muốn, mình có thể:

* ✔️ Check **config Redis trong project của bạn**
* ✔️ Hướng dẫn setup Redis **chuẩn production**
* ✔️ Giải thích **Redis lifecycle trong app backend**

Chỉ cần gửi mình:

* Stack (Node/Nest/Express…)
* Redis lib đang dùng (`redis`, `ioredis`, …)
