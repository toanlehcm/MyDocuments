# Session Memory — PTE-7569: More menu persists beside popup

> 🤖 **Dành cho AI Agent đọc khi restore context.**  
> User chỉ cần nói: "Đọc file session-ticket-[ID].md và nhớ lại context bug này."

---

## 📋 TICKET INFO
- **Ticket ID:** PTE-7569
- **Type:** Bug
- **Title:** [Documents/Payments/Claims] - Able to see More menu beside popup
- **Status:** In Progress (Done for Documents, Pending Payments/Claims)

---

## 🐛 STEPS TO REPRODUCE
1. Go to Documents (or Payments/Claims) tab.
2. Select document.
3. Select More > Fax/Print/Preview.

**Expected:** NOT able to see More menu beside selected popup.
**Actual:** Able to see More menu beside selected popup.

---

## 🔍 ROOT CAUSE
The "More" dropdown is managed by Bootstrap (`dropdown-menu__slow-hidden`). Clicking a menu item fires the Angular function to open a dialog (`$mdDialog` or `printJS`), which creates an overlay/backdrop. This backdrop blocks the document-level click event from reaching Bootstrap's listener, so Bootstrap never removes the `.show` class, keeping the menu visible on screen.

---

## ✅ SOLUTION
Trigger a manual close of the Bootstrap menu immediately when the action function is called, BEFORE the async logic initializes the dialog. For `documentsATP.js`, this was done by calling `$('#btn-more').click()` at the start of `viewPDF`, `printPDF`, and `downloadPDF`.

---

## 📁 FILES ĐÃ SỬA (Fixed Files)

| File | Đường dẫn đầy đủ | Vai trò | Thay đổi gì |
|------|------------------|---------|-------------|
| `documentsATP.js` | `Client/app/scripts/controllers/patientDashboard/documentsATP.js` | Controller | Thêm lệnh đóng menu thủ công trước khi mở popup. |

### Chi tiết từng file:

#### `documentsATP.js`
- **Function bị ảnh hưởng:** `viewPDF()`, `printPDF()`, `downloadPDF()`
- **Logic cũ (sai):**
```javascript
$scope.printPDF = function (data) {
    if (!data || !data._id) { ...
```
- **Logic mới (đúng):**
```javascript
$scope.printPDF = function (data) {
    $('#btn-more').click() // PTE-7569: close More dropdown before printing
    if (!data || !data._id) { ...
```

---

## 🧭 WORKFLOW (Luồng dữ liệu của ticket này)

```
[User Click Action] → [ng-click handler in Controller]
                                    ↓
                 [PTE-7569 FIX: Force Close Dropdown via jQuery]
                                    ↓
              [API call: getFilePDFDocument with global spinner]
                                    ↓
                 [Show Dialog ($mdDialog / printJS modal)]
```

---

## ⚠️ SIDE EFFECTS & RISKS
- Dùng `$('#btn-more').click()` là trick gắn liền với ID element trong View. Nếu View đổi cấu trúc ID của thẻ `btn-more` (như trong Payments tab không có ID này), ta phải dùng cách chọn element linh hoạt hơn như `$('.dropdown.show [data-toggle="dropdown"]').dropdown('hide')`.
- Cần chú ý Payments và Claims tab có thể không xài Bootstrap mà xài `$mdMenu`, lúc đó sẽ cần `$mdMenu.hide()`.
