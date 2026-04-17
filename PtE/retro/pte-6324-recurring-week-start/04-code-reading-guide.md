# Code Reading Guide — PTE-6324: Recurring Appointment Week-Start Bug

## Mục tiêu
Hiểu 3 file liên quan (tổng ~30,000 dòng) trong **< 20 phút mỗi file** mà không cần đọc từng dòng.

---

## 📖 CHIẾN LƯỢC ĐỌC FILE LỚN (áp dụng cho mọi file >500 dòng)

```
Bước 1 — Đọc top 50-100 dòng (2 phút)
  → Thấy: module name, imports, constants, pattern tổng thể

Bước 2 — Tìm tất cả function/section headers (3 phút)
  → Ctrl+F: "function " hoặc ".controller(" hoặc "var _" hoặc "// ======="
  → Tạo mental map: file có bao nhiêu function, tên là gì

Bước 3 — Đọc function signatures (không đọc body) (3 phút)
  → Tên hàm, tham số, comment trên đầu hàm
  → Hiểu AI làm gì, nhận gì, trả gì

Bước 4 — Trace bug: symptom → function chain (5 phút)
  → Từ UI action → tìm event handler → follow call stack
  → Chỉ đọc kỹ phần liên quan đến bug

Bước 5 — Đọc comments (2 phút)
  → Comments = WHY (tại sao code như vậy)
  → Code = HOW (làm như thế nào)
  → // PTE-XXXX trong comment → ticket liên quan
```

---

## FILE 1: `AppointmentUtil.js`

### 🗺️ Bản đồ file
- **Vị trí:** `Server/logicMongo/utils/AppointmentUtil.js`
- **Tổng dòng:** ~8,016 dòng
- **Vai trò:** **GENERATOR** — Utility module sinh data object cho Appointments (recurring, block, standard)
- **Ai gọi file này?** `v2_AppointmentLogic.js` gọi `AppointmentUtil.initAppointmentData()` khi tạo recurring appointment
- **File này gọi ai?** `commonUtil`, `moment-timezone`, Mongoose models

### 🏗️ Cấu trúc cấp cao

```
AppointmentUtil.js (~8016 dòng)
│
├── [dòng 1-50]     Imports: moment, commonUtil, mongoose models
│
├── [dòng 51-500]   initAvailableBlock() — Tạo available time block
│
├── [dòng 501-950]  initAppointmentClass() — Tạo class appointment
│
├── [dòng 951-1100] ⭐ initAppointmentData() — TẠORA RECURRING APPOINTMENT
│                   → ĐÂY LÀ HÀM LIÊN QUAN ĐẾN BUG 6324
│
├── [dòng 1101-...]  Các helper functions khác
│   ├── calcAvailableSlots()
│   ├── mergeAppointmentBlocks()
│   └── ...
│
└── module.exports = { initAppointmentData, ... }
```

### 🔍 Điểm bug nằm ở đâu trong file này

```javascript
// Hàm: initAppointmentData()
// Dòng: ~997-1004 (sau fix)

// BUG ở đây (trước fix):
let minDate = moment(appointment.StartDateTime).startOf('isoWeek') // ← startOf('isoWeek') = always Monday!
let maxDate = minDate.clone().add(6, 'days').endOf('day')

// SAU FIX — đọc clientDoc.DateStart:
var _dayNameToNumber = { 'Sunday': 0, 'Monday': 1, ... }
var _weekStartDay = _dayNameToNumber[clientDoc.DateStart] !== undefined
  ? _dayNameToNumber[clientDoc.DateStart] : 0
var _apptRefDay = moment(appointment.StartDateTime).tz(clientDoc.TimeZoneValue)
var _diffToWeekStart = (_apptRefDay.day() - _weekStartDay + 7) % 7
let minDate = _apptRefDay.clone().subtract(_diffToWeekStart, 'days').startOf('day').endOf('day')
let maxDate = minDate.clone().add(6, 'days').endOf('day')
```

### ⚠️ Những chỗ dễ gây confused trong file này

1. **Nhiều hàm `init*`** — Tên giống nhau (`initAppointmentData`, `initAppointmentClass`, `initAvailableBlock`) → Ctrl+F chính xác tên hàm cần tìm
2. **`clientDoc` là gì?** → MongoDB document của Client (phòng khám), chứa `DateStart`, `TimeZoneValue`, v.v. — được truyền vào từ caller
3. **`appointment` vs `newAppointment`** — `appointment` = input object, `newAppointment` = object được tạo ra và push vào list
4. **`while (minDate.valueOf() <= maxDate.valueOf())`** — Vòng lặp qua từng ngày trong tuần, kiểm tra ngày đó có nằm trong `weekDay` config của appointment không

### 🧭 Workflow trong file (bug 6324)

```
initAppointmentData(appointment, clientDoc, callback)
    │
    ├── Parse RepeatData: repeatNumber, repeatInterval, repeatType
    │
    ├── ⭐ Tính minDate/maxDate (CHỖ BUG)
    │   → Đọc clientDoc.DateStart → convert sang số
    │   → Tính _diffToWeekStart bằng modular arithmetic
    │   → minDate = ngày đầu tuần theo config
    │   → maxDate = minDate + 6 ngày
    │
    ├── while (minDate <= maxDate):
    │   └── Nếu weekday này nằm trong appointment.weekDay:
    │       └── for i in [0..repeatNumber]:
    │           └── Tạo newAppointment với startDateTime = base + i * interval
    │               └── push vào appointmentList
    │
    └── callback(null, appointmentList)
```

### 💡 Mental model để nhớ file này

> "AppointmentUtil.js như một **nhà máy sản xuất lịch hẹn** — bạn cho nó biết muốn lịch kiểu gì (weekly, daily, class...), nó đẻ ra một đống object lịch hẹn theo đúng pattern."

---

## FILE 2: `v2_AppointmentLogic.js`

### 🗺️ Bản đồ file
- **Vị trí:** `Server/logicMongo/v2_AppointmentLogic.js`
- **Tổng dòng:** ~23,313 dòng
- **Vai trò:** **VALIDATOR** — Module xử lý toàn bộ business logic của Appointments (validate, create, update, delete, check conflicts)
- **Ai gọi file này?** ActionHero Actions (HTTP handlers)
- **File này gọi ai?** `AppointmentUtil`, DAL modules, MongoDB via Mongoose

### 🏗️ Cấu trúc cấp cao (cách đọc file 23k dòng)

```
v2_AppointmentLogic.js (~23,313 dòng)
│
├── [dòng 1-200]       Imports và shared constants
│
├── [dòng 201-2000]    Functions cho Standard Appointment (create, update, delete)
│
├── [dòng 2001-5000]   Functions cho Block/Available Appointment
│
├── [dòng 5001-10000]  Functions cho Class Appointment
│
├── [dòng 10001-15000] Validate functions (overlap check, permission check)
│
├── [dòng 15001-18000] Recurring Appointment functions
│   ├── bookAppointmentHanlderPtE()   ← Entry point
│   ├── _validateBookingDataPtE()     ← ⭐ CHỖ BUG 6324
│   └── _createRecurringAppointments()
│
├── [dòng 18001-21000] Update/Cancel recurring functions
│
└── [dòng 21001-23313] Export, helper utils
```

> **Mẹo đọc file 23k dòng:** Tìm tên function bằng Ctrl+F `"function _validateBookingDataPtE"` hoặc `"bookAppointmentHanlderPtE"`. Không cần đọc từ đầu.

### 🔍 Điểm bug nằm ở đâu

```
Hàm: _validateBookingDataPtE()
Dòng: ~17987-17994 (sau fix)

Logic tương tự AppointmentUtil.js — cùng công thức tính minDate/maxDate
Đây là Validator — check xem recurring appointments có overlap không
```

### 🧭 Workflow recurring appointment (file này)

```
HTTP POST /bookRecurringAppointment
    ↓
ActionHero Action (Action class)
    ↓
v2_AppointmentLogic.bookAppointmentHanlderPtE(params, callback)
    │
    ├── Load clientDoc từ MongoDB (có DateStart, TimeZoneValue)
    ├── Load appointment data
    ├── Gọi AppointmentUtil.initAppointmentData() → tạo list appointments
    │
    └── _validateBookingDataPtE(appointmentList, clientDoc, callback)
        │
        ├── ⭐ Tính minDate/maxDate (CHỖ BUG — phải sync với AppointmentUtil)
        │
        ├── Query DB: tìm appointments overlap trong window
        ├── So sánh từng appointment với list overlap
        └── callback(overlappedList)
```

### ⚠️ Những chỗ dễ gây confused trong file này

1. **Tên hàm dạng `_camelCase`** (có dấu `_` đầu) = private function trong module
2. **Tên hàm dạng `camelCasePtE`** (hậu tố `PtE`) = function dành cho PtEverywhere platform (phân biệt với ATP)
3. **Callback hell** — Nhiều hàm dùng `callback(err, data)` pattern lồng 3-4 cấp → trace từng callback để hiểu flow
4. **`appointment` khác với `appointmentList`** — `appointment` = 1 object, `appointmentList` = array nhiều objects
5. **`clientDoc` được pass qua nhiều hàm** — Đây là MongoDB document của phòng khám, không phải của patient

### 💡 Mental model để nhớ file này

> "v2_AppointmentLogic.js như **bộ não của hệ thống lịch hẹn** — nó biết mọi quy tắc nghiệp vụ: ai được đặt lịch, khi nào bị conflict, lịch nào được tạo ra, cái nào bị hủy. Nếu có gì sai với appointment, lỗi nằm ở đây."

---

## FILE 3: `calendarAppointmentPtE.js`

### 🗺️ Bản đồ file
- **Vị trí:** `Client/app/scripts/controllers/PtE_calendarAppointment/calendarAppointmentPtE.js`
- **Tổng dòng:** ~22,685 dòng
- **Vai trò:** **AngularJS Controller** — Điều khiển toàn bộ Calendar UI, từ hiển thị scheduler đến popup appointment
- **Ai gọi file này?** AngularJS router (khi user vào `/calendar`)
- **File này gọi ai?** `SchedulerProviderRepository`, `schedulerProviderFactory`, `$mdDialog`, `actionheroFactory`

### 🏗️ Cấu trúc cấp cao

```
calendarAppointmentPtE.js (~22,685 dòng)
│
├── [dòng 1-215]      Filter definitions + BottomSheetAppointmentCtrl
│
├── [dòng 216-500]    CalendarAppointmentPtECtrl definition
│   └── sessionFactory() → init controller khi session valid
│
├── [dòng 501-2000]   Init functions: load therapists, locations, scheduler config
│
├── [dòng 2001-8000]  Scheduler event handlers (click, drag, resize, ...)
│
├── [dòng 8001-13000] Appointment display functions (render, colors, tooltips)
│
├── [dòng 13001-14500] CRUD handlers
│   ├── createAppointment()
│   ├── ⭐ _showAppointmentPopup()    ← CHỖ BUG CLIENT 6324 (dòng ~14362)
│   ├── _appointmentCreationBuilder()
│   └── _appointmentUpdateBuilder()
│
├── [dòng 14501-18000] Popup controllers (PopupAppointmentController, PopupRecurringAppointmentController)
│
├── [dòng 18001-22685] Utility functions, watchers, cleanup
│
└── Inline: PopupAppointmentController, PopupRecurringAppointmentController
    (Nested controllers dùng cho $mdDialog popups)
```

### 🔍 Điểm bug nằm ở đâu

```javascript
// Hàm: _showAppointmentPopup()
// Dòng: ~14362-14371

// VẤN ĐỀ: Không guard null trước khi gọi Array methods
// SAU FIX:
var sortedDaysOfWeek = angular.copy(DaysOfWeek); // DaysOfWeek là constant từ nơi khác
if ($rootScope.startWeekDay && Array.isArray(sortedDaysOfWeek)) {
    var startDayIndex = sortedDaysOfWeek.findIndex(function(d) {
        return d && d.text === $rootScope.startWeekDay;
    });
    // rotate array...
}
```

### ⚠️ Những chỗ dễ gây confused trong file này

1. **Controllers lồng nhau**: File có `CalendarAppointmentPtECtrl` (outer) và `PopupAppointmentController` (inner, dùng cho `$mdDialog`). Scope của outer controller KHÔNG tự động accessible trong popup — phải truyền qua `data: { ... }`
2. **`DaysOfWeek` constant** — Được defined ở đâu đó ngoài file này (có thể là app constants). Trong bug này, nó là array `[{text: "Sunday", value: 0}, ...]`
3. **`scheduler.` prefix** — Refers to dhtmlxScheduler (library lịch), không phải AngularJS service
4. **Nhiều `console.log`** — File có nhiều debug log còn sót → tìm lỗi bằng F12 Console rất hiệu quả
5. **`$mdDialog.show()`** — Mở popup như một dialog controller mới, có scope riêng

### 🧭 Workflow client (bug 6324)

```
User click "Create Appointment" button
    ↓
createAppointment()
    ↓
_showAppointmentPopup(mode = CREATE)
    │
    ├── ⭐ Sort DaysOfWeek theo startWeekDay (CHỖ FIX CLIENT)
    │   → Rotate array để đầu tuần đúng
    │
    └── $mdDialog.show({
            data: { daysOfWeek: sortedDaysOfWeek }
        })
        ↓
        PopupAppointmentController (popup scope)
            ↓
            User chọn ngày lặp lại → User confirm
            ↓
        _appointmentCreationBuilder() → handleCreateEvent()
            ↓
        HTTP POST → v2_AppointmentLogic.bookAppointmentHanlderPtE()
```

### 💡 Mental model để nhớ file này

> "calendarAppointmentPtE.js là **bộ điều khiển của cả trang Calendar** — nó là 'director' điều khiển scheduler library, mở/đóng popup, nhận kết quả từ popup, rồi gọi API backend. Khi có bug UI calendar, đây là file đầu tiên cần mở."

---

## 🎯 TÓM TẮT: Workflow đọc code khi có bug scheduling

```
1. Đọc bug report → Xác định: Bug ở UI hay logic hay cả 2?

2. Client side:
   Ctrl+F "createAppointment" hoặc "showPopup" trong calendarAppointmentPtE.js
   → Tìm hàm xử lý UI action của user
   → Theo dõi data flow vào $mdDialog

3. Server side - Generator:
   Ctrl+F "initAppointmentData" trong AppointmentUtil.js
   → Đây là nơi tạo recurring appointment list
   → Check: Có đọc clientDoc.DateStart không?

4. Server side - Validator:
   Ctrl+F "_validateBookingDataPtE" trong v2_AppointmentLogic.js
   → Đây là nơi check conflict
   → Check: Formula có giống Generator không?

5. So sánh minDate/maxDate giữa Generator và Validator
   → Nếu khác nhau → ĐÂY LÀ BUG

6. Fix → Clean debug logs → Test các timezone và startWeekDay khác nhau
```
