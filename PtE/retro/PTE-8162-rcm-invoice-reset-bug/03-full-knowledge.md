# Full Knowledge Base — PTE-8162: [RCM -> Invoice] Reset button working wrong

## 1. Tóm tắt bug
- **Ticket:** PTE-8162
- **Symptom:** 
  - Phase 1: Nút Reset khôi phục sai trạng thái (restore cột đã xóa).
  - Phase 2: Nút Apply/Reset không resize/reflow lại bảng dữ liệu (table column layout vỡ hoặc chồng chéo).
- **Root Cause:**
  - **Data Side:** Sử dụng stale closure variable (`oldView`) thay vì fetch latest server data.
  - **UI Side:** Logic detect thay đổi số cột bằng `$watch` bị lệch pha race condition. Dùng `setTimeout` thuần ko sync được với Angular digest lifecycle, dẫn đến dispatch DOM event `change-number-of-column` sai thời điểm.
- **Files bị ảnh hưởng:** `invoicePtE.js`, global `common.js` usage.

## 2. Kiến thức FE (AngularJS / JS / DOM)

### 2.1 Khái niệm cốt lõi liên quan
- **Cache-Based Change Detection**: Lưu cache trạng thái hiển thị cũ và so sánh trực tiếp trong flow xử lý data mới, tránh phụ thuộc watcher.
- **Framework Tick Awareness**: Dùng `$timeout` để đảm bảo logic callback chạy sau khi digest hiện tại đã update view, đồng thời tự trigger digest mới nếu cần.
- **Safe Digest Trigger**: Dùng custom wrapper (như `common.applyChanges`) để kiểm tra trạng thái `$$phase` trước khi gọi `$scope.$apply()`, ngăn chặn crash `$apply already in progress`.

### 2.2 Pattern đúng vs sai

| ❌ Sai | ✅ Đúng | Lý do |
|--------|---------|-------|
| Dùng `setTimeout(() => {...}, delay)` thuần. | Dùng `$timeout(() => {...}, delay)`. | Tự động hooking vào digest cycle, quản lý cleanup an toàn hơn. |
| Phụ thuộc `$watch` để set flag UI resize. | Tự compare `cacheHeader` vs `currentHeader` trong fetch handler. | Deterministic logic, chạy đúng thời điểm data cập bến, không bị race condition của watcher. |
| Reset spinner loading trong `.then()` và `.catch()`. | Reset loading và trigger render trong block `.finally()`. | DRY code, đảm bảo spinner LUÔN biến mất dù API success hay failed. Tránh treo UI overlay. |

### 2.3 AngularJS-specific gotchas
- Việc dispatch custom window event (`window.dispatchEvent`) trong Single Page App cần cẩn thận: DOM element thực sự phải tồn tại và được Angular vẽ xong data mới có hiệu quả. 
- Giải pháp scale độ trễ: `delay = pageSize == 50 ? 1000 : pageSize == 20 ? 700 : 300;` tối ưu giữa performance và độ mượt animation.

## 3. Kiến thức BE (N/A cho bug này - Frontend logic dominant)

## 4. Quy trình debug đã dùng
1. **Trace logic data:** Phát hiện `_resetView` dùng local state cũ thay vì query DB.
2. **Trace rendering logic:** Quan sát UI debugger và thấy event resize/change-column không bắn hoặc bắn trước khi DOM kịp apply data mới.
3. **Pattern Match:** So sánh controller `invoicePtE.js` và model controller hoàn hảo `insuranceClaimManagementATP.js`.
4. **Hybrid Solution Selection:** Tích hợp cách comparison cache (`cacheHeaderColumnVisible`) của Claim module sang Invoice module.

## 5. Design Decision (Tại sao code như vậy?)
- Chọn pattern **Cache Detection + Dynamic Timeout**: 
  - Triệt tiêu flakiness của asynchronous event.
  - Tương thích tốt với paging size khác nhau (hạn chế lag giật).
- Chọn **Safe Wrapper `common.applyChanges` trong `.finally()`**: Tránh crash $apply đồng thời đảm bảo Spinner Cleanup tuyệt đối an toàn.

## 6. Dấu hiệu nhận biết bug tương tự
- Table bị vỡ layout, thiếu scrollbar hoặc column dồn lại một chỗ khi resize filter panel hoặc chuyển view -> Nghĩ ngay tới việc timer bắn Event Resize bị sai pha.
- Spinner quay mãi không tắt khi bị API lỗi 500 -> Nghĩ ngay tới việc quên `.finally()` cleanup.

## 7. Test cases cần check sau khi fix
- [ ] Reset view -> Verify table columns and viewport scaling.
- [ ] Thay đổi PageSize (10 -> 50) -> Check xem timer 1000ms có chạy êm không, ko vỡ layout.
- [ ] Bấm Apply liên tục (spam) -> Check xem spinner có bật/tắt nhất quán ko.
- [ ] Force API timeout/Error -> Verify loader disappears.
