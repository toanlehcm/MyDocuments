# 1️⃣ Windows x64 vs Windows ARM64 khác nhau ở đâu?

Khác nhau ở **kiến trúc CPU (processor architecture)**.

---

## 🖥 Windows x64

* Dùng CPU kiến trúc **x86-64**
* Phổ biến nhất hiện nay
* Chạy trên:

  * Intel Core i3/i5/i7/i9
  * AMD Ryzen
* 99% laptop/PC Windows truyền thống dùng loại này

👉 Nếu bạn mua laptop Windows bình thường → gần như chắc chắn là x64.

---

## 💻 Windows ARM64

* Dùng CPU kiến trúc ARM
* Tiết kiệm pin, giống điện thoại
* Thường thấy trên:

  * Surface Pro X
  * Snapdragon X Elite
  * Một số laptop mới dùng chip Qualcomm

👉 ARM không chạy trực tiếp app x64 (phải qua giả lập).

---

# 2️⃣ So sánh nhanh

|                            | Windows x64  | Windows ARM64  |
| -------------------------- | ------------ | -------------- |
| CPU                        | Intel / AMD  | Qualcomm ARM   |
| Phổ biến                   | Rất phổ biến | Ít hơn         |
| Hiệu năng app truyền thống | Native       | Có thể giả lập |
| Pin                        | Bình thường  | Tốt hơn        |
| Dev tools compatibility    | Tốt nhất     | Có thể hạn chế |

---

# 3️⃣ Làm sao biết máy bạn thuộc loại nào?

### Cách 1 (nhanh nhất)

Nhấn:

```id="8ds0mk"
Windows + I
→ System
→ About
```

Tìm dòng:

```
System type
```

Bạn sẽ thấy:

* ✅ `64-bit operating system, x64-based processor`
* hoặc
* ✅ `64-bit operating system, ARM-based processor`

---

### Cách 2 (PowerShell)

Mở PowerShell và gõ:

```powershell
systeminfo | findstr /B /C:"System Type"
```

Hoặc:

```powershell
echo %PROCESSOR_ARCHITECTURE%
```

Kết quả:

* `AMD64` → x64
* `ARM64` → ARM

---

# 4️⃣ Trường hợp của bạn (khả năng cao)

Vì bạn là frontend dev dùng VSCode, Copilot, MCP workflow…

👉 99% bạn đang dùng **Windows x64**.

ARM Windows hiện còn khá mới trong dev ecosystem.

---

# 5️⃣ Bạn nên tải bản nào cho Google Antigravity?

Nếu System type là:

* `x64-based processor` → tải **Download for x64**
* `ARM-based processor` → tải **Download for ARM64**

---

# 6️⃣ Lưu ý quan trọng cho dev

Nếu bạn dùng:

* Docker
* Node native module
* Python C-extension
* AI local model

→ x64 vẫn tương thích rộng hơn.

ARM có thể gặp issue build native dependency.

---

Nếu bạn gửi mình dòng “System type” trong máy bạn, mình xác nhận giúp luôn bạn nên tải bản nào cho Google Antigravity nhé 🚀
