# Full Knowledge Base — PTE-8162: [RCM -> Invoice] Reset button working wrong

## 1. Tóm tắt bug
- **Ticket:** PTE-8162
- **Symptom:** Nút Reset trong Quick View không khôi phục đúng trạng thái đã lưu. Nó hiển thị lại các cột đã bị xóa trước đó.
- **Root Cause:**
    - Thiếu đồng bộ `DisplayColumns` và `Filters` sau khi Save thành công trong `_saveView`.
    - Hàm `_resetView` sử dụng biến closure `oldView` (snapshot cũ) thay vì lấy data mới nhất từ server.
- **Files bị ảnh hưởng:** `invoicePtE.js`

## 2. Kiến thức FE (AngularJS / JS)

### 2.1 Khái niệm cốt lõi liên quan
- **State Management**: Quản lý trạng thái cục bộ vs Trạng thái server.
- **Closure Staleness**: Biến closure trong AngularJS Controller có thể bị cũ nếu không được cập nhật sau các action thay đổi dữ liệu trên server.

### 2.2 Pattern đúng vs sai
| ❌ Sai | ✅ Đúng | Lý do |
|--------|---------|-------|
| Dùng local snapshot (`oldView`) để Reset. | Gọi API (`_getView`) để lấy data fresh từ server khi Reset. | Server là nguồn dữ liệu chuẩn nhất. |
| Chỉ update `Name` sau khi Save view. | Update toàn bộ object (Filters, Columns) từ server response. | Đảm bảo local state khớp hoàn toàn với DB. |

### 2.3 AngularJS-specific gotchas
- Việc binding dữ liệu qua các biến closure (`let oldView = ...`) rất dễ dẫn đến bug "stale data" nếu controller tồn tại lâu và không có cơ chế update snapshot sau khi save.

## 3. Kiến thức BE (N/A cho bug này - Client side logic)

## 4. Quy trình debug đã dùng
1. Trace hàm `_resetView` để xem nó lấy data từ đâu (phát hiện lấy từ `oldView`).
2. Kiểm tra hàm `_saveView` xem có cập nhật `oldView` không (phát hiện không có).
3. So sánh pattern với file `insuranceClaimManagementATP.js` (file mẫu chuẩn) để tìm cách fix tối ưu.

## 5. Design Decision (Tại sao code như vậy?)
Chọn cách **Fetch data từ server khi Reset** (Pattern ATP) thay vì chỉ sync local snapshot. Lý do:
- Triệt tiêu hoàn toàn rủi ro stale data.
- Đồng bộ kiến trúc giữa các module trong hệ thống (consistency).

## 6. Dấu hiệu nhận biết bug tương tự
- Nếu thấy nút "Undo" hoặc "Reset" hiển thị dữ liệu cũ rích hoặc dữ liệu đã xóa, hãy kiểm tra ngay xem nó đang dùng local cache hay fetch từ server.

## 7. Test cases cần check sau khi fix
- [ ] Save view mới -> Edit -> Reset.
- [ ] Edit view cũ -> Save -> Edit tiếp -> Reset.
- [ ] Reset khi không có view ID (Untitled View).
