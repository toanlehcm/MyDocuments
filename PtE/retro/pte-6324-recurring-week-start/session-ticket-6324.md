# Session Memory — PTE-6324: Recurring Appointment Week-Start Bug

> 🤖 **Dành cho AI Agent đọc khi restore context.**  
> User chỉ cần nói: "Đọc file session-ticket-6324.md và nhớ lại context bug này."

---

## 📋 TICKET INFO

| Field | Value |
|-------|-------|
| **Ticket ID** | PTE-6324 |
| **Type** | Bug |
| **Title** | [Bug][Schedule] Repeat Appointment always shows Sunday as the start of the week |
| **Status** | ✅ Done |
| **Assignee** | Daniel |
| **Date fixed** | 2026-04-17 |
| **Platform** | PtEverywhere — Clinic Scheduling Module |

---

## 🐛 STEPS TO REPRODUCE

1. Vào **Clinic Settings → General** → Set **"Start of Week"** = `Monday` (hoặc bất kỳ ngày nào không phải Sunday).
2. Vào **Calendar → Create Appointment**.
3. Chọn loại appointment là **Recurring (Weekly)**.
4. Mở popup **"Create Recurring Appointments"**.

**Expected:** Popup hiển thị tuần bắt đầu từ **Monday** (theo Clinic Settings). Ngày cuối cùng hiển thị đúng với config.  
**Actual:** Popup luôn hiển thị tuần bắt đầu từ **Sunday** bất kể cài đặt. Last Date bị tính sai.

---

## 🔍 ROOT CAUSE

**3 vấn đề đồng thời:**

### BE - Root Cause #1 (Generator — `AppointmentUtil.js`):
Hàm `initAppointmentData()` hard-code `startOf('isoWeek')` để tính `minDate` — `isoWeek` luôn = Monday theo ISO standard, nhưng không theo config của clinic. Khi clinic set Sunday hoặc Saturday, tuần tính ra vẫn bắt đầu từ Monday.

### BE - Root Cause #2 (Validator — `v2_AppointmentLogic.js`):
Hàm `_validateBookingDataPtE()` có logic tương tự nhưng dùng weekday index khác — tính `minDate`/`maxDate` không sync với Generator. Dẫn đến **false conflict detection**: Generator tạo appointment trong tuần [A], Validator check conflict trong tuần [B].

### FE - Root Cause #3 (Calendar Controller — `calendarAppointmentPtE.js`):
Hàm `_showAppointmentPopup()` thiếu **Guard Pattern** khi sort array `DaysOfWeek` theo `$rootScope.startWeekDay`. Nếu `DaysOfWeek` không phải array hoặc có element null → crash UI.

---

## ✅ SOLUTION

### Công thức cốt lõi (áp dụng cho cả Generator và Validator):

```javascript
// Bước 1: Map clientDoc.DateStart (STRING) → number
var _dayNameToNumber = { 'Sunday': 0, 'Monday': 1, 'Tuesday': 2, 'Wednesday': 3, 'Thursday': 4, 'Friday': 5, 'Saturday': 6 }
var _weekStartDay = _dayNameToNumber[clientDoc.DateStart] !== undefined
  ? _dayNameToNumber[clientDoc.DateStart]
  : 0 // fallback Sunday

// Bước 2: Convert UTC → Clinic timezone TRƯỚC KHI tính ngày
var _apptRefDay = moment(appointment.StartDateTime).tz(clientDoc.TimeZoneValue)

// Bước 3: Modular arithmetic để tính diff về ngày đầu tuần
var _currentDayNo = _apptRefDay.day()  // 0=Sun..6=Sat (locale-independent)
var _diffToWeekStart = (_currentDayNo - _weekStartDay + 7) % 7  // +7 tránh số âm

// Bước 4: Tính window
let minDate = _apptRefDay.clone().subtract(_diffToWeekStart, 'days').startOf('day').endOf('day')
let maxDate = minDate.clone().add(6, 'days').endOf('day')
```

**Nguyên tắc bất biến:** Generator và Validator phải dùng **cùng formula** để tính `minDate`/`maxDate` — nếu khác nhau sẽ sinh ra false conflict hoặc bỏ sót conflict.

### FE Fix — Guard Pattern:
```javascript
var sortedDaysOfWeek = angular.copy(DaysOfWeek)
if ($rootScope.startWeekDay && Array.isArray(sortedDaysOfWeek)) {
    var startDayIndex = sortedDaysOfWeek.findIndex(function(d) {
        return d && d.text === $rootScope.startWeekDay // guard d trước
    })
    if (startDayIndex > 0) {
        var firstPart = sortedDaysOfWeek.splice(0, startDayIndex)
        sortedDaysOfWeek = sortedDaysOfWeek.concat(firstPart)
    }
}
```

---

## 📁 FILES ĐÃ SỬA (Fixed Files)

| File | Đường dẫn đầy đủ | Vai trò | Thay đổi |
|------|-----------------|---------|---------|
| `AppointmentUtil.js` | `d:\Sources\pteverywhere\Server\logicMongo\utils\AppointmentUtil.js` | **Generator** — sinh danh sách recurring appointments | Thay `startOf('isoWeek')` bằng dynamic formula đọc `clientDoc.DateStart` |
| `v2_AppointmentLogic.js` | `d:\Sources\pteverywhere\Server\logicMongo\v2_AppointmentLogic.js` | **Validator** — kiểm tra conflict | Sync formula với Generator, xóa debug logs |
| `calendarAppointmentPtE.js` | `d:\Sources\pteverywhere\Client\app\scripts\controllers\PtE_calendarAppointment\calendarAppointmentPtE.js` | **AngularJS Controller** — UI Calendar | Thêm guard pattern cho DaysOfWeek sort |

### Chi tiết thay đổi:

#### `AppointmentUtil.js` — `initAppointmentData()` — dòng ~997–1004

**Logic cũ (sai):**
```javascript
let minDate = moment(appointment.StartDateTime).startOf('isoWeek') // luôn = Monday
let maxDate = minDate.clone().add(6, 'days').endOf('day')
```

**Logic mới (đúng):**
```javascript
var _dayNameToNumber = { 'Sunday': 0, 'Monday': 1, 'Tuesday': 2, 'Wednesday': 3, 'Thursday': 4, 'Friday': 5, 'Saturday': 6 }
var _weekStartDay = _dayNameToNumber[clientDoc.DateStart] !== undefined ? _dayNameToNumber[clientDoc.DateStart] : 0
var _apptRefDay = moment(appointment.StartDateTime).tz(clientDoc.TimeZoneValue)
var _currentDayNo = _apptRefDay.day()
var _diffToWeekStart = (_currentDayNo - _weekStartDay + 7) % 7
let minDate = _apptRefDay.clone().subtract(_diffToWeekStart, 'days').startOf('day').endOf('day')
let maxDate = minDate.clone().add(6, 'days').endOf('day')
```

#### `v2_AppointmentLogic.js` — `_validateBookingDataPtE()` — dòng ~17987–17994

**Logic mới:** Hoàn toàn giống `AppointmentUtil.js` ở trên — đây là **invariant bắt buộc**.

#### `calendarAppointmentPtE.js` — `_showAppointmentPopup()` — dòng ~14362–14371

**Thêm:** `Array.isArray(sortedDaysOfWeek)` guard + `d && d.text` null check trong `findIndex`.

---

## 📁 FILES LIÊN QUAN (Related — không sửa nhưng cùng workflow)

| File | Đường dẫn | Vai trò trong workflow | Lý do liên quan |
|------|-----------|------------------------|----------------|
| `bookAppointmentHanlderPtE` (function) | `v2_AppointmentLogic.js` dòng ~17900 | Entry point HTTP handler nhận request tạo recurring appointment | Gọi cả Generator và Validator — trace từ đây để hiểu toàn bộ flow |
| `PopupRecurringAppointmentController` | `calendarAppointmentPtE.js` dòng ~14500+ | Popup controller nhận `sortedDaysOfWeek` và hiển thị UI | Nơi user chọn ngày lặp lại — nhận data từ `_showAppointmentPopup` |
| `environment.js` | `d:\Sources\pteverywhere\Client\app\scripts\config\environment.js` | Config server host | Đã switch từ localhost → beta server trong session này (không liên quan trực tiếp đến bug) |

---

## 🗄️ MONGODB — Collections & Queries liên quan

| Collection | Mục đích | Fields quan trọng | Query pattern |
|------------|----------|-------------------|---------------|
| `clients` | Lưu thông tin phòng khám (Clinic) | `DateStart` (STRING: "Monday"/"Sunday"...), `TimeZoneValue` (STRING: "US/Central"...) | `Client.findOne({ _id: clientId }).lean()` |
| `appointments` | Lưu lịch hẹn | `StartDateTime`, `EndDateTime`, `weekDay` (array), `RepeatData`, `RepeatNumber`, `IsRecurring` | `Appointment.find({ StartDateTime: { $gte: minDate, $lte: maxDate } }).lean()` |

**Field quan trọng nhất cần nhớ:**
- `clientDoc.DateStart` — **STRING** không phải số. Phải map qua `_dayNameToNumber` trước khi dùng với Moment.js.
- `clientDoc.TimeZoneValue` — VD: `"US/Central"`, `"US/Eastern"`. Dùng với `moment().tz(clientDoc.TimeZoneValue)`.
- `appointment.weekDay` — Array các số ngày lặp lại (0=Sun..6=Sat). VD: `[1, 3]` = Monday & Wednesday.

**Sample query debug đã dùng:**
```javascript
// Check clinic settings
db.clients.findOne({ _id: ObjectId("...") }, { DateStart: 1, TimeZoneValue: 1 })

// Check appointments trong window
db.appointments.find({
  ClientId: ObjectId("..."),
  StartDateTime: { $gte: ISODate("2026-04-12"), $lte: ISODate("2026-04-18") },
  IsDeleted: { $ne: true }
}).lean()
```

---

## 📦 THƯ VIỆN / DEPENDENCIES liên quan

| Library | Dùng trong | Mục đích | Gotcha quan trọng |
|---------|-----------|----------|-------------------|
| `moment-timezone` | Server (Node.js) | Convert UTC → clinic local timezone, tính ngày | `.tz()` phải gọi TRƯỚC mọi phép tính ngày. `moment()` thuần dùng UTC của server, không phải local time của clinic |
| `moment` | Server + Client | Tính toán ngày tháng chung | `.day()` = 0-6 locale-independent ✅. `.weekday()` = relative to locale ⚠️. `.clone()` bắt buộc khi dùng moment mutable |
| `angular` (AngularJS 1.6) | Client | `angular.copy()` = deep clone. `$rootScope` = shared state | `angular.copy()` thay vì `[...arr]` trong AngularJS 1.x context. `$rootScope.startWeekDay` = Clinic start day |

---

## 🧭 WORKFLOW (Luồng dữ liệu đầy đủ)

```
[User tạo Recurring Appointment trên UI]
    ↓
calendarAppointmentPtE.js: createAppointment()
    ↓
calendarAppointmentPtE.js: _showAppointmentPopup()
    ├── ⭐ Sort DaysOfWeek theo $rootScope.startWeekDay [FE FIX]
    └── $mdDialog.show(PopupRecurringAppointmentController)
          ↓ User chọn ngày, confirm
calendarAppointmentPtE.js: _appointmentCreationBuilder()
    ↓
HTTP POST → ActionHero Action → bookAppointmentHanlderPtE()
    ↓
v2_AppointmentLogic.js: bookAppointmentHanlderPtE()
    ├── Load clientDoc (có DateStart, TimeZoneValue)
    ├── AppointmentUtil.initAppointmentData(appointment, clientDoc)  [BE FIX - Generator]
    │       → Tính minDate/maxDate theo clinic config
    │       → Sinh appointmentList (danh sách objects)
    └── _validateBookingDataPtE(appointmentList, clientDoc)          [BE FIX - Validator]
            → Tính minDate/maxDate (phải giống Generator!)
            → Query DB: appointments trong window
            → Check overlap
            ↓
        Save to MongoDB (nếu không có conflict)
```

---

## ⚠️ SIDE EFFECTS & RISKS

- **Các clinic đang dùng Sunday start** không bị ảnh hưởng (fallback = 0 = Sunday).
- **Test bắt buộc với nhiều timezone:** US/Central (-5h) có thể bị lệch ngày so với UTC khi appointment là cuối ngày.
- **`appointment.weekDay` dùng `moment().weekday()` ở nơi khác trong file** — nếu có bug tương tự với weekday index thì check pattern này trong các file khác.
- **Chưa kiểm tra:** Các recurring appointment type khác (Monthly, Custom) — chỉ Weekly được test trong bug này.

---

## 🔗 LIÊN KẾT

| File | Mục đích |
|------|----------|
| `03-full-knowledge.md` | FE/BE deep knowledge, gotchas đầy đủ |
| `04-code-reading-guide.md` | Hướng dẫn navigate 3 file lớn nhanh |
| `02-interview-version.md` | STAR format + Q&A phỏng vấn |
| `01-cv-version.md` | Mô tả cho CV/LinkedIn |

---

*Session memory generated: 2026-04-17 | PtEverywhere | Bug PTE-6324*
