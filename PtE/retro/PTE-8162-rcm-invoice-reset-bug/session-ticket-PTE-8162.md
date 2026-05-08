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
- **Date fixed:** 2026-05-07

---

## 🐛 STEPS TO REPRODUCE
1. Open RCM -> Invoice tab.
2. Select a Quick View.
3. Remove a column (e.g., `DOS`) and click **Save**.
4. Modify the view again (e.g., add column X) to make `isEdited = true` (Reset button appears).
5. Click **Reset**.

**Expected:** The view reverts to the last saved state (without `DOS`).
**Actual:** The `DOS` column reappears because the Reset button used stale data.

---

## 🔍 ROOT CAUSE
The bug was caused by two synchronization failures in `invoicePtE.js`:
1. **Stale `quickViewList`**: In `_saveView()`, the local view object in the list was only updated with the `Name`, missing `Filters` and `DisplayColumns`.
2. **Stale `oldView` Closure**: The `_resetView()` function relied on the `oldView` variable, which captured a snapshot of the view when the panel was first rendered. This snapshot was not refreshed after a successful save.

---

## ✅ SOLUTION
1. **Data Sync in `_saveView`**: Updated the function to map `Filters` and `DisplayColumns` from the server response into the local `quickViewList` entry.
2. **API-driven Reset**: Refactored `_resetView` to fetch the latest view details from the server using a new helper `_getView(viewId)` instead of relying on the local `oldView` snapshot.
3. **Enhanced UI Processing**: Updated `_processSelectQuickView` to accept an optional `viewData` parameter, allowing the UI to render from fresh server data bypass the local list.

---

## 📁 FILES ĐÃ SỬA (Fixed Files)

| File | Đường dẫn đầy đủ | Vai trò | Thay đổi gì |
|------|------------------|---------|-------------|
| invoicePtE.js | `Client/app/scripts/controllers/insurance/invoicePtE.js` | Controller | Refactored `_resetView`, added `_getView`, updated `_processSelectQuickView` and `_saveView` |

### Chi tiết từng file:

#### invoicePtE.js
- **Function bị ảnh hưởng:** 
    - `_saveView()`: Added sync for `Filters` and `DisplayColumns`.
    - `_resetView()`: Changed from using `oldView` to using `_getView()` API.
    - `_processSelectQuickView(view, viewData)`: Added `viewData` param to prioritize server data.
    - `_getView(viewId)`: New helper function to call `v4GetCustomViewDetail`.

---

## 📁 FILES LIÊN QUAN (Related Files)

| File | Đường dẫn | Vai trò trong workflow | Lý do liên quan |
|------|-----------|------------------------|-----------------|
| insuranceClaimManagementATP.js | `Client/app/scripts/controllers/insuranceSettingModule/insuranceClaimManagementATP.js` | Reference Controller | Served as the standard pattern for view management and reset logic. |

---

## 🧭 WORKFLOW

```
User Action (Save) → _saveView() → API Call → Update quickViewList (Fixed)
                                    ↓
User Action (Reset) → _resetView() → _getView() API (Fixed) → _processSelectQuickView(view, res)
```

---

## ⚠️ SIDE EFFECTS & RISKS
- Adding an extra API call on Reset introduces a slight delay (with spinner) but ensures data accuracy.
- `_processSelectQuickView` now handles an optional second parameter, which is backward compatible with other calls.

---

## 🔗 LIÊN KẾT
- **Full knowledge:** `03-full-knowledge.md`
- **Code reading guide:** `04-code-reading-guide.md`
- **Interview prep:** `02-interview-version.md`
