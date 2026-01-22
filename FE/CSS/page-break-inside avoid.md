.question, .info-holder, .border-table {
            page-break-inside: avoid !important;  // ← GÂY TRẮNG TRANG
        }
giải thích code trên

Đoạn CSS này **liên quan trực tiếp tới việc in (print CSS)** và đúng như comment của bạn ghi:
👉 **nó có thể gây hiện tượng TRẮNG TRANG khi in**.

Mình giải thích **từ cơ bản → nguyên nhân → khi nào nên / không nên dùng → cách sửa an toàn**.

---

## 1️⃣ Giải thích từng phần của đoạn code

```css
.question, .info-holder, .border-table {
    page-break-inside: avoid !important;
}
```

### 🔹 `.question, .info-holder, .border-table`

* Áp dụng CSS cho **3 loại element**
* Thường là:

  * `.question`: câu hỏi
  * `.info-holder`: block thông tin
  * `.border-table`: bảng có border

---

### 🔹 `page-break-inside: avoid;`

👉 **Quy tắc dành riêng cho chế độ in (print)**

Ý nghĩa:

> **Không cho phép ngắt trang ở bên trong element này khi in**

📌 Ví dụ:

* Nếu `.border-table` dài
* CSS này yêu cầu **toàn bộ bảng phải nằm trọn trong 1 trang**

---

### 🔹 `!important`

* Ép trình duyệt **phải áp dụng**, kể cả khi có rule khác ghi đè
* Rất “cứng tay”

---

## 2️⃣ Vì sao nó gây TRẮNG TRANG khi in?

### ⚠️ Nguyên nhân cốt lõi

> Khi element **dài hơn khoảng trống còn lại của trang hiện tại**
> và **không được phép ngắt bên trong**, trình duyệt sẽ:

➡️ **Đẩy toàn bộ element sang trang mới**

Nếu:

* Trang mới **vẫn không đủ chỗ**
* hoặc element **cao hơn 1 trang**

👉 Trình duyệt có thể:

* Tạo **1 trang trống**
* Hoặc đẩy content sang trang kế tiếp nữa

📌 Kết quả:

```
Trang N   → TRẮNG
Trang N+1 → Content
```

---

### 🔥 Các case gây lỗi rất phổ biến

| Case                          | Giải thích                           |
| ----------------------------- | ------------------------------------ |
| Table cao hơn 1 trang         | Không thể tránh break → browser loạn |
| `!important`                  | Không cho browser fallback           |
| Nhiều block `avoid` liên tiếp | Không còn chỗ để layout              |
| PDF / mobile print            | Engine in yếu hơn desktop            |

---

## 3️⃣ Khi nào nên dùng `page-break-inside: avoid`?

### ✅ NÊN dùng cho:

* Header
* Footer
* Small card
* Block ngắn

```css
.header, .footer {
  page-break-inside: avoid;
}
```

---

### ❌ KHÔNG nên dùng cho:

* Table dài
* List nhiều item
* Nội dung dynamic

📛 Vì không thể đảm bảo chiều cao

---

## 4️⃣ Cách sửa để KHÔNG bị trắng trang

### ✅ Cách 1: Chỉ áp dụng trong print + bỏ `!important`

```css
@media print {
  .question, .info-holder {
    page-break-inside: avoid;
  }
}
```

❌ Không áp dụng cho table dài

---

### ✅ Cách 2: Cho phép table break nhưng tránh break ở row

```css
@media print {
  table {
    page-break-inside: auto;
  }
  tr {
    page-break-inside: avoid;
  }
}
```

👉 Cách chuẩn nhất cho bảng

---

### ✅ Cách 3: Dùng CSS mới (khuyến nghị)

```css
@media print {
  .question, .info-holder, .border-table {
    break-inside: avoid;
  }
}
```

📌 `break-inside` là chuẩn mới (thay cho `page-break-inside`)

---

### ✅ Cách 4: Chủ động chia block

```css
.page-break {
  page-break-before: always;
}
```

```html
<div class="question page-break">...</div>
```

👉 Bạn kiểm soát việc xuống trang

---

## 5️⃣ Cách debug nhanh khi gặp TRẮNG TRANG

1. Comment dần các rule `page-break-inside`
2. Bắt đầu từ **table**
3. In preview (Print Preview)
4. Kiểm tra:

   * Block nào cao hơn 1 trang
   * Block nào dùng `!important`

---

## 6️⃣ TL;DR – Tóm tắt 20% cốt lõi

> `page-break-inside: avoid` buộc element không bị cắt khi in.
> Nếu element dài hoặc layout chật, browser sẽ đẩy cả block sang trang khác → gây TRẮNG TRANG.
> Không nên dùng cho table dài, càng không nên dùng với `!important`.

---

Nếu bạn muốn, mình có thể:

* ✅ Fix CSS in PDF cụ thể cho case của bạn
* ✅ So sánh Chrome / Android / iOS print behavior
* ✅ Viết **print CSS chuẩn cho Cordova / WebView**

Chỉ cần gửi **HTML structure** hoặc **ảnh print preview** 👍
