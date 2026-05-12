# Session Memory — PTE-8162: [RCM -> Invoice] Reset button working wrong

> 🤖 **Dành cho AI Agent đọc khi restore context.**  
> User chỉ cần nói: "Đọc file session-ticket-PTE-8162.md và nhớ lại context bug này."

---

## 📋 TICKET INFO
- **Ticket ID:** PTE-8162
- **Type:** Bug
- **Title:** [RCM -> Invoice] Reset button working wrong
- **Status:** Done
- **Reporter:** Daniel Toan Le
- **Assignee:** Daniel Toan Le
- **Date fully fixed:** 2026-05-12 (Including UI Reflow fixes)

---

## 🐛 STEPS TO REPRODUCE

### Part 1: State Sync Bug
1. Mở tab RCM -> Invoice.
2. Chọn một Quick View, bỏ chọn 1 cột (ví dụ `DOS`) -> Click **Save**.
3. Modify tiếp (làm hiện nút Reset) -> Click **Reset**.
**Expected:** Trả về state đã lưu (không có `DOS`).
**Actual:** Cột `DOS` bất ngờ hiện lại (do cache closure cũ).

### Part 2: Apply Button & UI Reflow Bug
1. Mở Filter Panel. Thay đổi cột. Click **Apply**.
**Expected:** Bảng dữ liệu tái tạo lại độ rộng các cột (reflow) vừa khít màn hình.
**Actual:** UI layout không resize lại kịp, hoặc bảng bị vỡ/tràn vì sự kiện `change-number-of-column` không được dispatch chính xác.

---

## 🔍 ROOT CAUSE
Bug bao gồm hai tầng nguyên nhân logic và rendering:
1. **Stale Closures:** `_resetView()` dùng snapshot lưu tạm thay vì fetch fresh data API.
2. **Race Conditions in Digest Cycle:** Dùng watcher ngoài controller để set flag column changed, khiến controller chạy query không biết data thay đổi. Dùng `setTimeout` native nằm ngoài luồng kiểm soát của AngularJS, dẫn đến dispatch DOM resize event bị sai lệch timing so với chu trình re-render của bảng.

---

## ✅ SOLUTION

### Phase 1: Data Persistence (2026-05-07)
- Refactor `_resetView` gọi helper function mới `_getView(viewId)` để fetch trực tiếp từ API backend thay vì rely vào snapshot `oldView`.
- Sync proper data structures mapping back into `quickViewList` sau khi lưu.

### Phase 2: Frontend UI Reflow (2026-05-12)
- **Cache comparison algorithm:** Tích hợp 2 closure vars mới `cacheHeaderColumnVisible` và `cachePageSize`. Trong handler `_getInvoices`, map array keys của cache vs scope hiện tại để chủ động phát hiện thay đổi cột, ko qua watcher trung gian.
- **Framework Timing migration:** Đổi `setTimeout` -> `$timeout`.
- **Dynamic Latency scale:** Tự động tính delay timing (300ms / 700ms / 1000ms) tùy thuộc vào `pageSize` (10 / 20 / 50), để Browser có đủ thời gian vẽ DOM khối lượng lớn trước khi trigger Resize Event.
- **Lifecycle Resilience:** Di chuyển code tắt spinner vào block `.finally()`, kết hợp invoke `common.applyChanges($scope)` để trigger cycle an toàn và triệt để.

---

## 📁 FILES ĐÃ SỬA (Fixed Files)

| File | Đường dẫn đầy đủ | Vai trò | Thay đổi gì |
|------|------------------|---------|-------------|
| invoicePtE.js | `Client/app/scripts/controllers/insurance/invoicePtE.js` | Controller | 1. Refactored reset view to query API. 2. Injected cache-comparison logic in `_getInvoices`. 3. Migrated timers to `$timeout`. 4. Integrated safe digest. |

### Chi tiết code thay đổi (Phase 2 highlights):

#### invoicePtE.js (Closure)
```javascript
let isChangeDisplayColumns = false;
let cacheHeaderColumnVisible;
let cachePageSize;
```

#### invoicePtE.js (`_getInvoices`)
```javascript
// Comparison Logic
let isChangeDisplayColumns = false;
const columnBefore = (cacheHeaderColumnVisible || []).map(i => i.Key).join('');
const columnAfter = ($scope.invoiceTable.headerDisplayColumns || []).map(i => i.Key).join('');
if (columnBefore !== columnAfter) isChangeDisplayColumns = true;
if (String(cachePageSize) != String(pageSize)) isChangeDisplayColumns = true;

// Dynamic Timers
if (calculateTableSize || isChangeDisplayColumns) {
  $timeout(() => { window.dispatchEvent(new Event("change-number-of-column")); },
  pageSize == 50 ? 1000 : pageSize == 20 ? 700 : 300);
}

// Safe Cleanup
.finally(() => {
  $scope.getInvoiceSpinnerLoading = false;
  common.applyChanges($scope);
});
```

---

## 📁 FILES LIÊN QUAN (Related Files)

| File | Đường dẫn | Lý do liên quan |
|------|-----------|-----------------|
| insuranceClaimManagementATP.js | `.../insuranceClaimManagementATP.js` | Controller mẫu có code chuẩn về cache comparison và dynamic timer logic. |
| common.js | `.../common.js` | Cung cấp global definition cho `common.applyChanges($scope)` check phase. |

---

## 🧭 WORKFLOW (Unified)

```
Apply/Reset Triggered 
     ↓
Call _getInvoices() -> Fetch API Server
     ↓
Data Returned -> Parse HTML models -> Compare Cache vs Current Head -> Set Timer Logic
     ↓
Run `.finally()` -> Render scope to DOM via `common.applyChanges()`
     ↓
Browser paints grid layout
     ↓
$timeout completes -> Dispatches "change-number-of-column" event
     ↓
Table successfully resizes gracefully with new data.
```

---

## ⚠️ SIDE EFFECTS & RISKS
- Dynamic timeout thresholds (1000ms) prevent UI jank but user might experience a 1s wait before final column expansion on massive data loads (50 items). This is deliberate for visual smoothness.
- `common.applyChanges` will trigger an extra check on root phase, which overhead is negligible.
