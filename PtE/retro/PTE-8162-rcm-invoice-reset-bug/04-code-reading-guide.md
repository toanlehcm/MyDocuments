# Code Reading Guide — PTE-8162: [RCM -> Invoice] Reset button working wrong

## Mục tiêu
Hiểu file `invoicePtE.js` liên quan đến Quick View, API Fetching, và Render lifecycle trong tối đa 5 phút.

---

## FILE: `Client/app/scripts/controllers/insurance/invoicePtE.js`

### 🗺️ Bản đồ file (tổng quan)
- **Vai trò trong hệ thống:** Bàn điều khiển trung tâm (Dashboard) quản lý tab RCM Invoice, Filter panel và Data Table Rendering.
- **Tác nhân kích hoạt:** Router loading page -> $onInit -> _getInvoices().
- **Tổng số dòng:** ~4500 dòng.

### 🏗️ Cấu trúc cấp cao (Section Key Flows)
- `_resetView()` & `_saveView()`: Xử lý State Management/Persistence layer.
- `_getInvoices()`: Xử lý Data Access & View Update. Nơi bug Phase 2 cư ngụ.
- DOM Event Section: Nơi trigger resize window events.

### 🔍 Điểm bug nằm ở đâu?
- **Location 1: Closure Vars (Line ~395)**
  - `let cacheHeaderColumnVisible; let cachePageSize;` -> Dùng lưu vết trạng thái cũ để comparison.
- **Location 2: `_getInvoices()` logic (Line ~1450)**
  - Trước đây: Dựa vào outer flag, timer native legacy.
  - Sau fix: Explicit cache check, comparison string mapping `Key` array, dynamic `$timeout` trigger event.
  - Dùng `.finally()` wrap spinner toggle & safety digest.

### 📖 Chiến lược đọc logic Rendering Flow
1. **Kiểm tra đầu vào**: Hàm `_getInvoices` nhận param `pageSize`, `pageIndex`, và `calculateTableSize`.
2. **Kiểm tra Data parsing**: Hàm `_parseDataForView` convert JSON server thành view models (link, formatting).
3. **Kiểm tra UI Post-process**: Tìm `#region 8162` (hoặc cụm cache check), đây là nơi quyết định xem grid table có cần "reflow" lại hay không sau khi data được nạp.

### ⚠️ Những chỗ dễ gây confused trong file này
- Sự khác biệt giữa `calculateTableSize` (được truyền từ caller qua prop) và `isChangeDisplayColumns` (được tự detect thông qua cache comparisons). Cả hai đều có quyền trigger `change-number-of-column`.
- Logic callback timing: AngularJS render grid theo batch, nên DOM Event phải được schedule qua `$timeout` để đợi render hoàn tất mới resize chính xác.

### 🧭 Workflow trong file
```
User Action (Apply/Reset)
      ↓
_getInvoices() calls API
      ↓
Promise Resolution -> Save result to Scope -> Trigger Data parsing
      ↓
Cache Check Logic (Is Dirty?) -> Setup $timeout delay based on PageSize
      ↓
Promise finally() -> Disable Spinner -> common.applyChanges() (Apply data to DOM)
      ↓
(Timeout fires after digest) -> window.dispatchEvent('resize' / 'change-number-of-column') -> Browser reflows table structure
```

### 💡 Mental model để nhớ file này
"Hãy hình dung file này là một đạo diễn rạp xiếc. `_getInvoices` nạp đạo cụ (data), layout stage. Nhưng nó cần một chiếc đồng hồ bấm giờ (`$timeout`) để đảm bảo các tấm rèm sân khấu được kéo lên (resize event) CHÍNH XÁC khi các đạo cụ đã đặt xong chỗ, nếu sớm quá sẽ đập vào đầu diễn viên."
