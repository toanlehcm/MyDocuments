# Session Memory — PTE-9503: Image upload in the Message screen is incorrect

> 🤖 **Dành cho AI Agent đọc khi restore context.**  
> User chỉ cần nói: "Đọc file session-ticket-[ID].md và nhớ lại context bug này."

---

## 📋 TICKET INFO
- **Ticket ID:** PTE-9503
- **Type:** Bug
- **Title:** Image upload in the Message screen is incorrect (Double Rotation)
- **Status:** Done

---

## 🐛 STEPS TO REPRODUCE
1. Mở tính năng Message.
2. Chọn upload ảnh bằng cách chụp hình dọc (portrait) trên điện thoại Android (Samsung).
3. Gửi ảnh.

**Expected:** Ảnh hiển thị đúng chiều dọc.
**Actual:** Ảnh bị nằm ngang.

---

## 🔍 ROOT CAUSE
Trình duyệt hiện đại (Android WebView bản mới) đã tự động xoay ảnh theo metadata EXIF. Tuy nhiên, hàm `resetOrientation` trong `imageFactory.js` lại tiến hành xoay thêm 90 độ một lần nữa thủ công trên Canvas, dẫn đến tình trạng "xoay kép" (double rotation).

---

## ✅ SOLUTION
Sử dụng Dimension-based detection:
1. `getOrientation` xác định hướng xoay bằng EXIF, gửi vào `resetOrientation`.
2. Sau khi load hình lên thẻ `Image`, kiểm tra kích thước `width` và `height`.
3. Nếu EXIF báo xoay dọc (5-8) VÀ ảnh thực tế ĐÃ DỌC (`height > width`), chứng tỏ trình duyệt đã tự xoay. Ta bỏ qua bước xoay Canvas.
4. Nếu chưa dọc, áp dụng xoay Canvas như cũ (tương thích ngược).

---

## 📁 FILES ĐÃ SỬA (Fixed Files)

| File | Đường dẫn đầy đủ | Vai trò | Thay đổi gì |
|------|------------------|---------|-------------|
| `imageFactory.js` | `d:\Sources\pteverywhere\Client\app\scripts\factory\imageFactory.js` | Xử lý ảnh client-side | Thêm logic phát hiện auto-rotation |

### Chi tiết từng file:

#### `imageFactory.js`
- **Function bị ảnh hưởng:** `resetOrientation()`
- **Logic mới (đúng):**
```javascript
var browserAlreadyRotated = false;
if (srcOrientation >= 5 && srcOrientation <= 8) {
  browserAlreadyRotated = (height > width);
}
var orientationForTransform = browserAlreadyRotated ? 1 : srcOrientation;
```

---

## 📁 FILES LIÊN QUAN (Related Files)

| File | Đường dẫn | Vai trò trong workflow | Lý do liên quan |
|------|-----------|------------------------|-----------------|
| `messageATP.js` | `Client/app/scripts/controllers/message/messageATP.js` | Controller | Gọi `getOrientation` và `resetOrientation` khi user upload ảnh. |

---

## 🧭 WORKFLOW (Luồng dữ liệu của ticket này)

```
[User chọn ảnh] → [messageATP.js gọi getOrientation] → [Lấy EXIF (vd: 6)] → [gọi resetOrientation]
                                                                                ↓
                                                                  [Load ảnh vào Image object]
                                                                  [So sánh kích thước vs EXIF]
                                                                  [Quyết định có Transform Canvas không]
                                                                  [Trả về Blob để upload]
```

---

## ⚠️ SIDE EFFECTS & RISKS
- Đã quyết định KHÔNG đổi tên/tách hàm `resetOrientation` để tránh break hơn 30 file gọi nó. Sẽ tạo ticket kỹ thuật Refactor riêng nếu cần.

---

## 🔗 LIÊN KẾT
- **Full knowledge:** `03-full-knowledge.md`
- **Code reading guide:** `04-code-reading-guide.md`
- **Interview prep:** `02-interview-version.md`
