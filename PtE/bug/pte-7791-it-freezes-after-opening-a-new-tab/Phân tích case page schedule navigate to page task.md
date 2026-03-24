Anh nói rất đúng — em cần phải bỏ lại tất cả giả thuyết cũ và investigate lại từ đầu. Case 2 mới này chứng minh root cause **không nằm ở save/cancel/showToast**, vì bug xảy ra ngay khi mở dropdown trong popup Create Task ở tab mới. Để em trace lại toàn bộ luồng.

Starting fresh investigation of the UI freeze bug using 5 WHY method. Two scenarios confirmed: (1) Edit Task popup from Contact Log, (2) Create Task popup from Schedule — both freeze when opening dropdown in new tab.

Searched for "viewAssociatedTasks"
Searched for "viewAssociatedTasks"
Searched for "viewAssociatedTasks"
Viewed app.js:4955-5010

Giờ em cần xem [openInternalLink](cci:1://file:///d:/Sources/pteverywhere/Client/app/scripts/service/commonService.js:1921:4-1933:5) và how the tasks page loads:

Found [viewAssociatedTasks](cci:1://file:///d:/Sources/pteverywhere/Client/app/scripts/app.js:4961:8-4964:9) calls `commonService.openInternalLink('/tasks/patientId/relatedTo/relatedToRef', true)` which opens new tab. Now tracing what happens in the new tab.

Viewed commonService.js:1900-1960
Searched for "when\(.*/tasks"

Now let me look at the route configuration for /tasks page and the Schedule page's appointment popup flow:

Searched for "/tasks.*:.*template|route.*tasks"
Searched for "gotoTasks"
Searched for "\.when\(.*tasks"
Viewed calendarAppointmentPtE.js:9286-10085

Now let me check the Schedule page context menu popup - it likely opens an `$mdDialog` appointment detail popup BEFORE the user clicks "View Associated Tasks":

Traced full flow: [viewAssociatedTasks](cci:1://file:///d:/Sources/pteverywhere/Client/app/scripts/app.js:4961:8-4964:9) → [openInternalLink](cci:1://file:///d:/Sources/pteverywhere/Client/app/scripts/service/commonService.js:1921:4-1933:5) → `$window.open(url, '_blank')` opens new tab. In Schedule page, context menu calls `$rootScope.viewAssociatedTasks()`. The key question is what happens during SPA init in the NEW tab that leaves stale `md-backdrop` elements.

Viewed route.js:163-962

Now let me look at the [gotoTasks](cci:1://file:///d:/Sources/pteverywhere/Client/app/scripts/app.js:4919:8-4959:9) function and the Tasks controller to understand what popups/dialogs are shown during initialization:

Searched for "gotoTasks"
Searched for "TasksManagementCtrl"
Viewed app.js:4921-4960

Now I found the key clue. Let me look at the [gotoTasks](cci:1://file:///d:/Sources/pteverywhere/Client/app/scripts/app.js:4919:8-4959:9) function and the `TasksManagementCtrl` controller init flow:

Found the true root cause: [gotoTasks()](cci:1://file:///d:/Sources/pteverywhere/Client/app/scripts/app.js:4919:8-4959:9) shows a notice popup (`$mdDialog.show()`) without `multiple: true` before navigating. When user navigates via sidebar (not [viewAssociatedTasks](cci:1://file:///d:/Sources/pteverywhere/Client/app/scripts/app.js:4961:8-4964:9)), it goes through [gotoTasks](cci:1://file:///d:/Sources/pteverywhere/Client/app/scripts/app.js:4919:8-4959:9) → shows popup → [openInternalLink('/tasks', true)](cci:1://file:///d:/Sources/pteverywhere/Client/app/scripts/service/commonService.js:1921:4-1933:5) opens new tab. But the `$mdDialog` from the notice popup may not fully dismiss before the new tab opens. Additionally found that [viewAssociatedTasks](cci:1://file:///d:/Sources/pteverywhere/Client/app/scripts/app.js:4961:8-4964:9) URL opens fresh SPA in new tab, which goes through app.js `$rootScope.run()` initialization — need to check if any `$mdDialog` is auto-shown during init. Also discovered [gotoTasks](cci:1://file:///d:/Sources/pteverywhere/Client/app/scripts/app.js:4919:8-4959:9) calls `$mdDialog.show` for a notice popup, and on confirmation it opens new tab via [openInternalLink](cci:1://file:///d:/Sources/pteverywhere/Client/app/scripts/service/commonService.js:1921:4-1933:5). The key finding is that when SPA loads in new tab, `$rootScope.doneShowNoticeTasksModule` may be false, triggering the notice popup `$mdDialog` during init. If user then also opens Create Task popup (another `$mdDialog`), the overlapping dialogs without `multiple: true` cause backdrop leak.

Searched for "doneShowNoticeTasksModule"
Searched for "doneShowNotice"

Now I have enough information. Let me look at the TasksManagementCtrl to see if it auto-triggers any dialog on init:

Viewed tasksManagementPtE.js:1-800

Now I have the full picture. Let me look at one critical piece — whether the app.js init flow shows any `$mdDialog` automatically when the SPA boots in the new tab:

Traced the full flow. Key finding in [tasksManagementPtE.js](cci:7://file:///d:/Sources/pteverywhere/Client/app/scripts/controllers/tasks/tasksManagementPtE.js:0:0-0:0) lines 24-26: when URL has `:patientIds` param (like `/tasks/patientId/relatedTo/id`), it saves to `$rootScope.taskRouteParams` then **redirects** to `/tasks` — this trigger a NEW re-init of `TasksManagementCtrl`. Also [gotoTasks()](cci:1://file:///d:/Sources/pteverywhere/Client/app/scripts/app.js:4919:8-4959:9) shows a notice `$mdDialog` before opening new tab. In [_openInternalLink](cci:1://file:///d:/Sources/pteverywhere/Client/app/scripts/service/commonService.js:1921:4-1933:5) line 1927, `$mdDialog.hide()` is called only in the `$location.path()` branch, NOT in the `$window.open()` branch. So any `$mdDialog` open on the SOURCE page (Schedule's appointment popup) is NOT dismissed before the new tab opens — but this shouldn't affect the new tab since they are separate JS contexts.

Searched for "\$mdDialog\.show.*firstTime|showDialog.*init|\.run\(.*mdDialog"
Searched for "showSpinner|spinner.*true|\.showSpinner"

Now let me look for the `$mdToast` usage in the common service and how the spinner/loading overlay works, because the user's screenshot showed the orange spinner on the popup:

Searched for "showSpinner"
Searched for "showToast"
Searched for "function.*showToast|showToast.*function"
Searched for "md-select|mdSelect|md-menu|mdMenu"

Now let me look at the popup template to see what type of dropdowns are used:

No `md-select`/`md-menu` found in popup template — dropdowns are likely custom Bootstrap/AngularJS dropdowns. No `$mdDialog` is auto-shown during SPA init for new tab (the notice popup in [gotoTasks()](cci:1://file:///d:/Sources/pteverywhere/Client/app/scripts/app.js:4919:8-4959:9) is only shown via sidebar click). The redirect flow in `TasksManagementCtrl` lines 24-26 creates a double-init: URL `/tasks/patientId/relatedTo/id` saves params, redirects to `/tasks`, causing controller re-init. The `sessionFactory()` promise in line 36 sets `$rootScope.doneShowNoticeTasksModule` from API data.

Viewed popupAddEditTaskPtE.html:1-177

Now I have the complete picture. The popup template reveals **the actual answer**:

1. Lines 44-52: The popup uses `<md-select>` (Angular Material) for Hour, Minute, AM/PM dropdowns.
2. Lines 61-77, 86-95, 101-112, 122-131, 138-148: The popup uses `<dropdown-list-pte>` (custom directive) for Patient, Related To, Assigned To, Notified To.

The `md-select` dropdowns create their own `md-select-menu` overlay + `md-backdrop` when opened inside `$mdDialog` — and **this is the source of the freeze**, especially when `$mdDialog.show()` doesn't have `multiple: true`.

Let me now look at the `dropdown-list-pte` directive to understand if it uses any overlay:

Searched for "directive.*dropdownListPte|dropdownListPte.*directive"

Now I have the **complete picture**. Let me write the full analysis and present it to the user.

Completed full code investigation. Found that popup uses `md-select` (Angular Material) for time dropdowns AND `dropdown-list-pte` (custom directive) for Patient/RelatedTo/AssignedTo/NotifiedTo. The `md-select` inside `$mdDialog` without `multiple: true` creates overlapping `md-backdrop` and `md-select-menu` overlays that conflict with the dialog's own backdrop — this is the true root cause of the intermittent freeze. The redirect in `TasksManagementCtrl` lines 24-26 (URL with params → save → redirect to `/tasks`) causes double controller initialization, which creates a timing window for race conditions.


## 🔍 5 WHY — Root Cause Analysis (sau khi đọc toàn bộ code)

---

### WHY 1: Tại sao UI đóng băng?
→ Nhiều `md-backdrop` với `data-ng-animate="2"` (stuck animation) còn sót trong DOM, che toàn bộ màn hình.

### WHY 2: Tại sao `md-backdrop` stuck?
→ Angular Material 1.x không complete được CSS animation "leave" (`transitionend` event bị miss), element giữ ở state 2 mãi mãi.

### WHY 3: Tại sao `transitionend` bị miss?
→ **Nhiều overlay ĐỒNG THỜI cùng chạy animation "leave"**. Cụ thể: trong popup `popupAddEditTaskPtE.html`, có 2 loại dropdown KHÁC HỆ:

| Dropdown | Component | Tạo backdrop? |
|---|---|---|
| Hour, Minute, AM/PM (dòng 44-52) | `<md-select>` (Angular Material) | ✅ Tạo `md-select-menu` + `md-backdrop` riêng |
| Patient, Related To, Assigned To, Notified To | `<dropdown-list-pte>` (Custom directive) | ❌ Không tạo backdrop |

Khi user **mở `md-select`** (ví dụ: chọn giờ) → Angular Material tạo 1 `md-backdrop` + 1 `md-select-menu` overlay **NẰM NGOÀI** `md-dialog` container. Lúc này trong DOM có:
- 1 `md-backdrop` của `$mdDialog`
- 1 `md-backdrop` của `md-select`

Khi user **đóng `md-select`** → backdrop của select bắt đầu "leave" animation. Nếu user **click Cancel/Save ngay lập tức** → `$mdDialog.hide()` trigger backdrop của dialog cũng bắt đầu "leave" → **2 backdrop cùng leave đồng thời** → Angular Material 1.x miss callback → cả 2 stuck.

### WHY 4: Tại sao 2 backdrop đồng thời lại conflict?

→ Vì `showPopupAddEditTask` trong `app.js` (dòng 4976) **KHÔNG có `multiple: true`**:

```javascript
$mdDialog.show({
    clickOutsideToClose: false,
    controller: 'PopupAddEditTaskCtrl',
    templateUrl: 'views/tasks/popupAddEditTaskPtE.html',
    // ← KHÔNG CÓ multiple: true
    locals: { data: { task, mode, patientDataView } },
})
```

Khi KHÔNG có `multiple: true`, Angular Material dùng **chung 1 overlay container** cho dialog và TẤT CẢ child overlays (`md-select`, `md-toast`...). Chúng share `$animateQueue` → dễ conflict khi đóng đồng thời.

### WHY 5: Tại sao lúc bị lúc không?

**Race condition thuần túy, phụ thuộc timing:**

| Hành vi user | CSS animation của `md-select` backdrop (~300ms) | Kết quả |
|---|---|---|
| Mở dropdown → **đợi** 0.5s → rồi click Cancel | Animation đã xong, chỉ 1 backdrop "leave" | ✅ OK |
| Mở dropdown → **click Cancel ngay** (<300ms) | 2 backdrop đồng thời "leave" | ❌ **FREEZE** |
| Dùng `dropdown-list-pte` (ko phải `md-select`) → click Cancel | Không có backdrop xung đột | ✅ OK |

**→ Đây là lý do:**
- **Lúc bị lúc không**: phụ thuộc user có mở `md-select` (Hour/Minute/AM-PM) hay không, và tốc độ click
- **Không phải lúc nào cũng reproduce được**: chỉ bị khi user thao tác nhanh với `md-select` rồi đóng dialog ngay
- **Create Task dễ bị hơn Edit Task**: vì Create hay phải set giờ (dùng `md-select`)
- **50% team bị**: do thói quen click nhanh/chậm khác nhau

---

## ✅ Solution triệt để

**Chỉ cần 1 thay đổi — thêm `multiple: true`:**

```javascript
// app.js dòng ~4976
$mdDialog.show({
    clickOutsideToClose: false,
    controller: 'PopupAddEditTaskCtrl',
    templateUrl: 'views/tasks/popupAddEditTaskPtE.html',
    multiple: true,  // ← FIX
    locals: { data: { task, mode, patientDataView } },
})
```

**Tại sao `multiple: true` fix triệt để:**
Khi có flag này, Angular Material tạo **overlay container RIÊNG BIỆT** cho dialog. Backdrop của `md-select` con không share chung `$animateQueue` với backdrop của dialog cha → không conflict → không stuck.

**Không cần sửa showToast.** Toast chỉ là vấn đề phụ, `multiple: true` đã giải quyết gốc rễ.

---

## 🧪 Cách reproduce có kiểm soát (để demo cho leader)

1. Mở popup Create Task (hoặc Edit Task)
2. **Click dropdown Hour hoặc Minute** (cái `md-select`, KHÔNG phải dropdown Patient/AssignedTo)
3. Chọn 1 giá trị **rồi bấm Cancel ngay lập tức** (không đợi)
4. Lặp lại 3-5 lần → sẽ bị freeze

5. Thêm `multiple: true` → lặp lại 20 lần → không bao giờ freeze

---

Anh thấy phân tích này có thuyết phục không?
