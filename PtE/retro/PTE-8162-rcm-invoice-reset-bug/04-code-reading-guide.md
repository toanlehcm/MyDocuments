# Code Reading Guide — PTE-8162: [RCM -> Invoice] Reset button working wrong

## Mục tiêu
Hiểu file `invoicePtE.js` liên quan đến logic Quick View trong tối đa 5 phút.

---

## FILE: `Client/app/scripts/controllers/insurance/invoicePtE.js`

### 🗺️ Bản đồ file (tổng quan)
- **Vai trò trong hệ thống:** Quản lý giao diện và logic của tab RCM Invoice (Hóa đơn bảo hiểm).
- **Ai gọi file này?** UI Routing khi user truy cập màn hình Claims/Invoices.
- **Tổng số dòng:** ~4500 dòng (file cực lớn).

### 🏗️ Cấu trúc cấp cao (View Management Section)
- `_renderViewToPanelFilter()`: Vẽ dữ liệu view lên panel bên phải.
- `_processSelectQuickView()`: Xử lý khi user chọn một view từ list.
- `_saveView()`: Lưu cấu hình view hiện tại (Filters + Columns) xuống DB.
- `_resetView()`: Khôi phục trạng thái view ban đầu.
- `_getView()`: (New) Fetch chi tiết một view từ server.

### 🔍 Điểm bug nằm ở đâu?
- **Function liên quan:** `_resetView()` và `_saveView()`.
- **Logic trước khi fix:** `_resetView` dùng biến `oldView` (local variable) để render lại panel. Biến này bị cũ sau khi Save.
- **Logic sau khi fix:** `_resetView` gọi API `_getView` để lấy data mới nhất, sau đó truyền vào `_processSelectQuickView(oldView.view, res)`.

### 📖 Chiến lược đọc file lớn nhanh (>4000 dòng)
1. **Tìm từ khóa**: Đừng đọc từ đầu. Ctrl+F tìm `quickView` hoặc `searchTerms` để khoanh vùng logic bộ lọc.
2. **Tìm Entry Points**: Các function `$scope.xxx = _xxx` ở đầu file là nơi UI trigger vào.
3. **Trace Workflow**: Đi từ `_saveView` -> xem nó update cái gì -> `_resetView` -> xem nó revert cái gì.

### ⚠️ Những chỗ dễ gây confused trong file này
- Biến `oldView`: Là một object dùng để lưu tạm trạng thái trước khi edit. Nó được định nghĩa ở cấp controller scope nên rất dễ bị stale nếu không cẩn thận.
- Logic sync giữa `quickViewList` (danh sách view) và `searchTerms` (dữ liệu đang hiển thị trên panel).

### 🧭 Workflow trong file (dùng bug này làm ví dụ)
```
User Click Save → _saveView() → API Update → local view object updated
                                                  ↓ (Reset action)
User Click Reset → _resetView() → _getView() API → _processSelectQuickView(view, freshData) → UI Render
```

### 💡 Mental model để nhớ file này
"File này như một 'bàn điều khiển' (Dashboard) — nó nhận các thiết lập filter của user, gửi đi search, và quản lý việc lưu/phục hồi các thiết lập đó."
