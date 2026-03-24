Đây là bằng chứng rất quan trọng! Anh quan sát chuẩn — nếu Related To, Notified To hiện khi chưa chọn Patient thì `ng-show="checkFieldVisible('RelatedTo')"` **KHÔNG ĐƯỢC EVALUATE**, nghĩa là **Angular digest cycle đã chết** trước khi popup render xong. Em cần xem init flow của `PopupAddEditTaskCtrl` kỹ hơn.

User discovered that RelatedTo/NotifiedTo fields appear visible when Patient is not selected, which means `ng-show` is not being evaluated. This indicates Angular digest cycle crashed during popup initialization. Now investigating what causes the crash.

Viewed popupAddEditTaskPtE.js:1-200
Viewed popupAddEditTaskPtE.js:200-400
Viewed popupAddEditTaskPtE.js:400-493

Now I see the CRITICAL issue. Let me trace the exact crash path:

Completed full code review of `PopupAddEditTaskCtrl`. Found the crash: Line 278 [_detectChangedEmailPhonePatient(patientInfoNew)](cci:1://file:///d:/Sources/pteverywhere/Client/app/scripts/controllers/tasks/popupAddEditTaskPtE.js:276:8-281:9) accesses `patientDataView._id` (line 279), but `patientDataView` is `undefined` when called from [showPopupAddEditTask](cci:1://file:///d:/Sources/pteverywhere/Client/app/scripts/controllers/tasks/tasksManagementPtE.js:794:8-800:9) in [app.js](cci:7://file:///d:/Sources/pteverywhere/Client/app/scripts/app.js:0:0-0:0) without a `patientDataView` parameter. Also line 137: when `taskEdit` exists but has no `_id` (create from entity mode, like from Schedule's viewAssociatedTasks), the code sets `$scope.taskModel.Patient = taskEdit.Patient` (which is a patientId string, truthy), making [checkFieldVisible](cci:1://file:///d:/Sources/pteverywhere/Client/app/scripts/controllers/tasks/popupAddEditTaskPtE.js:373:8-383:9) return true — BUT the dropdown shows 'Select Patient' because the patient name hasn't loaded yet from the async [getPatientDetail](cci:1://file:///d:/Sources/pteverywhere/Client/app/scripts/factory/taskFactoryPtE.js:213:8-222:9) call. The key crash happens when [viewPatientDetail()](cci:1://file:///d:/Sources/pteverywhere/Client/app/scripts/factory/taskFactoryPtE.js:281:16-285:18) is called later — `patientDataView` is always cloned from `data.patientDataView` which may be `undefined`.


## 🔥 Phát hiện mới — JS CRASH trong PopupAddEditTaskCtrl

Anh nói đúng: **app đang crash trước khi digest cycle chạy**, nên `ng-show` không hoạt động.

Em đã đọc toàn bộ `popupAddEditTaskPtE.js`. Đây là chain of events dẫn đến crash:

---

### Timeline khi bug xảy ra

**Bước 1:** User ở Schedule → click "View Associated Tasks" → gọi:
```javascript
// app.js dòng 4964
commonService.openInternalLink(`/tasks/${patientId}/Appointment/${appointmentId}`, true);
```
→ Mở tab mới với URL `/tasks/patientId/Appointment/appointmentId`

**Bước 2:** Tab mới load SPA → `TasksManagementCtrl` init → **dòng 24-26:**
```javascript
if ($routeParams.patientIds) {
    $rootScope.taskRouteParams = _.clone($routeParams);
    return $location.path('/tasks');  // ← REDIRECT → controller init LẦN 2
}
```
→ Controller bị init **2 LẦN** (redirect từ URL có params sang URL không params).

**Bước 3:** User click "+ Task" hoặc click Edit → gọi `showPopupAddEditTask`:
```javascript
// tasksManagementPtE.js dòng 795-800
$scope.showPopupAddEditTask = function ($event, task, mode) {
    $rootScope.showPopupAddEditTask(task, mode, result => { ... })
    // ← KHÔNG truyền patientDataView (tham số thứ 4)
}
```

**Bước 4:** `PopupAddEditTaskCtrl` init → **dòng 66:**
```javascript
const patientDataView = _.cloneDeep(data.patientDataView); 
// data.patientDataView = undefined → patientDataView = undefined
```

**Bước 5:** Nếu user click "View Patient Detail" (icon mắt cạnh Patient Name) → **dòng 269:**
```javascript
_detectChangedEmailPhonePatient(patientInfoNew);
```
→ **Dòng 279:**
```javascript
function _detectChangedEmailPhonePatient(patientInfoNew) {
    if (patientInfoNew._id === patientDataView._id && ...)
    //                        ^^^^^^^^^^^^^^^^^^^^^^^^
    //         💥 TypeError: Cannot read property '_id' of undefined
}
```

**→ JS CRASH! Digest cycle chết. Tất cả `ng-show`, `ng-click` ngừng hoạt động. UI đóng băng.**

---

### Nhưng chờ — screenshot cho thấy Related To hiện khi chưa chọn Patient lúc mở popup lần đầu

Đúng — có thêm 1 path crash **NGAY LÚC INIT** không cần click gì:

**Khi create task từ entity** (ví dụ từ Schedule "Create Task"):
```javascript
// app.js dòng 4967-4970
function createTask(patientId, relatedTo, relatedToRef) {
    const task = { Patient: patientId, RelatedTo: relatedTo, RelatedToRef: { Id: relatedToRef } };
    showPopupAddEditTask(task, 'create')  // ← KHÔNG truyền patientDataView
}
```

Controller init vào nhánh **dòng 137-156** ("create from entity"):
```javascript
else if (taskEdit && !taskEdit._id) {
    $scope.taskModel = {
        Type: 'Task',
        Patient: taskEdit.Patient,  // ← patientId string (TRUTHY!)
        RelatedTo: taskEdit.RelatedTo,
        RelatedToRef: taskEdit.RelatedToRef,
    };
    
    taskFactory.getPatientDetail(taskEdit.Patient).then(patient => {
        // ← ASYNC: patient name load SAU khi popup render
    });
}
```

→ `$scope.taskModel.Patient` = patientId string (truthy) → `checkFieldVisible('RelatedTo')` = `true` → **fields hiện ra trước khi patient name load xong**. Đó là lý do trong screenshot thấy "Select Patient" nhưng Related To vẫn hiện.

---

### Tổng hợp — Tại sao "có máy bị thì bị hoài"?

| Điều kiện | Kết quả |
|---|---|
| User mở Tasks page từ sidebar (gotoTasks) | `patientDataView` = undefined, nhưng ko click "View Patient" → chưa crash |
| User mở từ Schedule "View Associated Tasks" → Edit Task → click "View Patient Detail" | 💥 **Crash tại dòng 279** — `patientDataView` undefined |
| User mở từ Schedule "Create Task" (trực tiếp) | `Patient` = truthy → fields hiện sai, nếu click View Patient → 💥 crash |
| Máy chậm / network lag | `getPatientDetail` promise chưa resolve → popup render không đúng → user click vào dropdown khi data chưa sẵn → **JS error hoặc empty dropdown** |

---

### 🛠️ Fix đề xuất

**1. Fix crash — null safety cho `patientDataView` (dòng 279):**
```javascript
function _detectChangedEmailPhonePatient(patientInfoNew) {
    if (!patientDataView) return;  // ← guard
    if (patientInfoNew._id === patientDataView._id && ...) {
        $rootScope.$broadcast("reloadProfile", {});
    }
}
```

**2. Fix `showPopupAddEditTask` — truyền `patientDataView` khi gọi từ Tasks page:**
```javascript
// tasksManagementPtE.js dòng 798
$rootScope.showPopupAddEditTask(task, mode, result => {
    result && loadTasks();
}, patientDataView)  // ← truyền thêm nếu có
```

**3. Thêm `multiple: true` (giữ fix cũ)** — vẫn cần để tránh animation conflict giữa `md-select` và `md-dialog`.

---

Anh muốn em trình bày root cause + solution bằng EN ngắn gọn cho leader không?
