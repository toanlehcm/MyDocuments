Trong ngữ cảnh bạn đưa ra (đặc tả tính năng / yêu cầu hệ thống), **VR** là viết tắt của:

## ✅ **VR = Validation Rule**

---

## 🔍 Giải thích dễ hiểu

**Validation Rule** = **quy tắc kiểm tra / xác thực dữ liệu**

👉 Dùng để mô tả:

* Hệ thống **kiểm tra điều kiện gì**
* **Khi nào cho phép / không cho phép**
* **Thông báo lỗi hiển thị ra sao**

---

## 📌 Áp dụng vào ví dụ của bạn

> **Allow user to manually input promotion for clinic**

Các dòng:

* **VR1**
* **VR2**
* **VR3**

chính là **các quy tắc kiểm tra khi người dùng nhập mã khuyến mãi**

---

### 🧩 Phân tích từng VR

### 🔹 **VR1 – Validation Rule 1**

> If the code has expired, the code cannot be applied and shows the error text
> **“Promotion code has expired.”**

➡ Kiểm tra **ngày hết hạn**

---

### 🔹 **VR2 – Validation Rule 2**

> If the code has been used up, the code cannot be applied and shows the error text
> **“Promotion code has reached usage limit.”**

➡ Kiểm tra **số lần sử dụng**

---

### 🔹 **VR3 – Validation Rule 3**

> If the users input an unknown code or disable code, show text:
> **“Promotion code not found.”**

➡ Kiểm tra **mã tồn tại & trạng thái**

---

### 🔹 **Visibility**

> only display when “Manual Input” is chosen

➡ Quy tắc **hiển thị UI** (Display rule), không phải validation logic

---

## 🧠 So sánh VR với các thuật ngữ liên quan

| Viết tắt    | Nghĩa                       | Dùng khi nào             |
| ----------- | --------------------------- | ------------------------ |
| **VR**      | Validation Rule             | Kiểm tra dữ liệu đầu vào |
| **BR**      | Business Rule               | Quy tắc nghiệp vụ        |
| **ER**      | Error Rule / Error Response | Thông báo lỗi            |
| **UI Rule** | UI Visibility Rule          | Quy tắc hiển thị         |
| **AC**      | Acceptance Criteria         | Điều kiện chấp nhận (QA) |

---

## 🎯 Cách viết VR chuẩn (best practice)

```text
VRx:
Condition → System behavior → Error message
```

Ví dụ:

> VR1: If the promotion code is expired, the system must reject the code and display “Promotion code has expired.”

---

## ✅ Tóm tắt nhanh

> **VR = Validation Rule = Quy tắc kiểm tra dữ liệu**

Dùng để:

* Dev implement đúng logic
* QA test đúng case
* PO/BA kiểm soát yêu cầu rõ ràng

Nếu bạn muốn, mình có thể:

* Chuẩn hoá VR theo **format BA / Jira**
* Chuyển VR → **Test case**
* Tách VR vs BR cho feature này

👉 nói mình làm tiếp nhé 👍
