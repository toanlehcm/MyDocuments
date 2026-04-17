# Full Knowledge Base — PTE-7569: More menu persists beside popup

## 1. Tóm tắt bug
- **Ticket:** PTE-7569
- **Symptom:** Bấm action (Print, Fax...) trong More menu, popup mở lên nhưng More menu vẫn còn nằm bên cạnh.
- **Root Cause:** Backdrop của `$mdDialog` chặn event `click` nổi lên `document`, khiến Bootstrap không nhận được sự kiện để xoá class `.show`. Đồng thời class `.dropdown-menu__slow-hidden` set `display: block` vĩnh viễn nên Bootstrap không thể dùng `display: none` để ẩn menu.
- **Files bị ảnh hưởng:** `documentsATP.js` (và tiếp theo sẽ là `paymentATP.html` / `paymentPatientATP.js`, `claimsPatientATP.js`)

## 2. Kiến thức FE (AngularJS / JS / CSS / Browser)

### 2.1 Khái niệm cốt lõi liên quan
- **Event Delegation & Document Click Handler:** Bootstrap sử dụng event gắn trên `document` để phát hiện user click ra ngoài menu.
- **Backdrop & Z-Index:** Khi `$mdDialog` mở, một lớp `div` backdrop bao phủ màn hình. Click chuột sẽ trúng backdrop này thay vì các thành phần bên dưới.
- **Race Condition in UI:** Sự kiện AngularJS `ng-click` gọi logic mở dialog nhanh hơn là quá trình CSS transition đóng menu hoàn tất.

### 2.2 Pattern đúng vs sai
| ❌ Sai | ✅ Đúng | Lý do |
|--------|---------|-------|
| Gọi `$mdDialog.show()` thẳng từ menu action | Gọi `$('#btn-more').click()` (hoặc `$('.dropdown').removeClass('open')`) TRƯỚC KHI mở dialog | Trả lại trạng thái sạch cho DOM trước khi một overlay mới xuất hiện chặn mọi events. |

### 2.3 AngularJS-specific gotchas (nếu có)
- Trộn lẫn Bootstrap (jQuery-based) và Angular Material (AngularJS-based) rất dễ sinh bug vì hai bên quản lý DOM state độc lập với nhau. Material không biết Bootstrap đang mở menu, và Bootstrap không biết Material vừa rải một tấm backdrop.

## 4. Quy trình debug đã dùng
1. Xác định cách menu được mở: Phân tích view HTML, thấy Bootstrap `data-toggle="dropdown"`.
2. Kiểm tra CSS: Phát hiện class `.dropdown-menu__slow-hidden` ép cứng `display: block`.
3. Kiểm tra code JS của action: Thấy `faxPDF` có dòng `$('#btn-more').click()` và KHÔNG bị lỗi. `printPDF` không có dòng này và BỊ lỗi.
4. Đặt giả thuyết: `$mdDialog` chặn event.
5. Thử nghiệm: Áp dụng dòng code đóng thủ công vào `printPDF` → Lỗi biến mất.

## 5. Design Decision (Tại sao code như vậy?)
Thay vì viết một rule CSS global để đè z-index (có thể gây ảnh hưởng đến các menu dropdown khác trong hệ thống khi có dialog mở), tôi chọn cách đóng menu trực tiếp tại hàm xử lý action (Solution A - Quick Fix). Việc này an toàn hơn, localize rủi ro ở đúng chức năng đang fix, và có precedent (đã từng làm ở `faxPDF`).

## 6. Dấu hiệu nhận biết bug tương tự
- Khi dùng cả Bootstrap dropdown và một loại Modal/Popup overlay trên cùng một action.
- Triệu chứng: "Cái bóng" của UI cũ vẫn còn dính lại khi UI mới (popup) đè lên trên.

## 7. Test cases cần check sau khi fix
- [ ] Mở document → Chọn Fax → Menu đóng, dialog hiện. Đóng dialog → Menu không tự bật lại.
- [ ] Mở document → Chọn Print → Menu đóng, modal printJS hiện.
- [ ] Mở document → Chọn Download → Menu đóng, trình duyệt tải file.
