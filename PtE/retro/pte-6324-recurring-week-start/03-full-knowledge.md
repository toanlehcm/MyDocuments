# Full Knowledge Base — PTE-6324: Recurring Appointment Week-Start Bug

## 1. Tóm tắt bug

| Field | Value |
|-------|-------|
| **Ticket** | PTE-6324 |
| **Symptom** | Recurring Appointment popup luôn hiển thị ngày kết thúc theo tuần bắt đầu từ Sunday, bất kể Clinic Settings cấu hình ngày nào |
| **Root Cause** | `AppointmentUtil.js` (Generator) và `v2_AppointmentLogic.js` (Validator) cứng nhắc giả định `weekStartDay = 0` (Sunday) thay vì đọc `clientDoc.DateStart` |
| **Files bị ảnh hưởng** | `Server/logicMongo/utils/AppointmentUtil.js`, `Server/logicMongo/v2_AppointmentLogic.js`, `Client/app/scripts/controllers/PtE_calendarAppointment/calendarAppointmentPtE.js` |

---

## 2. Kiến thức FE — AngularJS / JavaScript

### 2.1 Khái niệm cốt lõi: AngularJS Controller & `$rootScope`

**`$rootScope` là gì?**
- Singleton scope chia sẻ toàn bộ AngularJS app
- Clinic settings (`startWeekDay`, `dateFormat`, `timeFormat`) được load một lần vào `$rootScope` khi login
- Tất cả controller con đều có thể đọc `$rootScope.startWeekDay` mà không cần truyền prop

**Ví dụ thực tế trong bug này:**
```javascript
// $rootScope.startWeekDay = "Monday" (được load từ Clinic Settings)
// DaysOfWeek = [{text: "Sunday", value: 0}, {text: "Monday", value: 1}, ...]

// ❌ Trước fix — KHÔNG check Array.isArray, KHÔNG guard null element
var sortedDaysOfWeek = angular.copy(DaysOfWeek);
if ($rootScope.startWeekDay) {                    // startWeekDay có thể là "" → falsy
    var startDayIndex = sortedDaysOfWeek.findIndex(function(d) {
        return d.text === $rootScope.startWeekDay; // d có thể là null → crash
    });
}

// ✅ Sau fix — Guard pattern đầy đủ
var sortedDaysOfWeek = angular.copy(DaysOfWeek);
if ($rootScope.startWeekDay && Array.isArray(sortedDaysOfWeek)) {
    var startDayIndex = sortedDaysOfWeek.findIndex(function(d) {
        return d && d.text === $rootScope.startWeekDay; // guard d trước
    });
    if (startDayIndex > 0) {
        var firstPart = sortedDaysOfWeek.splice(0, startDayIndex);
        sortedDaysOfWeek = sortedDaysOfWeek.concat(firstPart);
    }
}
```

### 2.2 Pattern: Array Rotation (xoay mảng)

**Bài toán:** Sắp xếp danh sách ngày trong tuần bắt đầu từ ngày do người dùng chỉ định.

```
Input:  [Sun, Mon, Tue, Wed, Thu, Fri, Sat]  (startWeekDay = "Wednesday")
Output: [Wed, Thu, Fri, Sat, Sun, Mon, Tue]
```

**Kỹ thuật Array Rotation:**
```javascript
// Tìm index của phần tử cần đưa lên đầu
var startDayIndex = arr.findIndex(el => el.text === targetDay); // returns 3 for Wed

// Tách mảng thành 2 phần và nối lại
var firstPart = arr.splice(0, startDayIndex); // [Sun, Mon, Tue]
arr = arr.concat(firstPart);                  // [Wed, Thu, Fri, Sat] + [Sun, Mon, Tue]
```

> **Lưu ý `splice()` mutates mảng gốc!** Phải dùng `angular.copy()` hoặc spread `[...arr]` để tạo copy trước.

### 2.3 AngularJS-specific Gotchas

| Gotcha | Mô tả | Cách tránh |
|--------|--------|------------|
| `angular.copy()` vs `[...arr]` | Trong AngularJS project cũ, nên dùng `angular.copy()` để deep clone — tương thích hơn `spread` với AngularJS 1.x | Dùng `angular.copy()` cho object/array trong AngularJS context |
| `$rootScope` watch | Nếu `$rootScope.startWeekDay` thay đổi SAU khi controller init, UI không tự update trừ khi có `$watch` | Đặt sort logic trong function, không chỉ trong `$onInit` |
| `splice()` side effect | `splice()` trả về phần đã bị xóa VÀ mutate mảng gốc — khác `slice()` | Nhớ: `splice = mutate`, `slice = không mutate` |

---

## 3. Kiến thức BE — ActionHero / Node.js / Moment.js / MongoDB

### 3.1 Khái niệm cốt lõi: Generator-Validator Pattern

Trong PtEverywhere, recurring appointment có 2 bước server:

```
Client Request
     ↓
[AppointmentUtil.initAppointmentData()] ← GENERATOR
     → Sinh danh sách appointment objects theo tuần
     → Dùng minDate/maxDate để xác định phạm vi tuần
     ↓
[v2_AppointmentLogic._validateBookingDataPtE()] ← VALIDATOR  
     → Check overlap với appointments đã tồn tại
     → Cũng dùng minDate/maxDate để query DB
     ↓
[Lưu vào MongoDB]
```

**Nếu Generator và Validator dùng formula khác nhau:**
- Generator tạo appointment cho ngày X trong tuần [Mon-Sun]
- Validator check overlap trong tuần [Sun-Sat]
- → Có thể báo conflict ảo (false positive) hoặc bỏ sót conflict thật

### 3.2 Moment.js — Timezone-aware Date Arithmetic

**Cách đúng để tính ngày đầu tuần theo config:**

```javascript
// clientDoc.DateStart = "Monday" (STRING từ MongoDB)
// appointment.StartDateTime = ISO string (UTC)

// Bước 1: Map string → number
var _dayNameToNumber = {
  'Sunday': 0, 'Monday': 1, 'Tuesday': 2, 'Wednesday': 3,
  'Thursday': 4, 'Friday': 5, 'Saturday': 6
}
var _weekStartDay = _dayNameToNumber[clientDoc.DateStart] !== undefined
  ? _dayNameToNumber[clientDoc.DateStart]
  : 0 // fallback Sunday nếu không có config

// Bước 2: Convert UTC → Clinic timezone TRƯỚC KHI tính ngày
var _apptRefDay = moment(appointment.StartDateTime).tz(clientDoc.TimeZoneValue)
// Không thể dùng moment() plain vì server ở UTC, clinic ở US/Central → ngày khác!

// Bước 3: Tính diff bằng modular arithmetic
var _currentDayNo = _apptRefDay.day()        // 0=Sun, 1=Mon, ..., 6=Sat
var _diffToWeekStart = (_currentDayNo - _weekStartDay + 7) % 7
// +7 để đảm bảo không âm (JS % có thể trả về âm nếu _currentDayNo < _weekStartDay)

// Bước 4: Tính minDate/maxDate
let minDate = _apptRefDay.clone().subtract(_diffToWeekStart, 'days').startOf('day').endOf('day')
let maxDate = minDate.clone().add(6, 'days').endOf('day')
```

### 3.3 Pattern Đúng vs Sai

| ❌ Sai (trước fix) | ✅ Đúng (sau fix) | Lý do |
|---------------------|-------------------|-------|
| `let minDate = moment(appointment.StartDateTime).startOf('isoWeek')` | `let minDate = _apptRefDay.clone().subtract(_diffToWeekStart, 'days').startOf('day')` | `startOf('isoWeek')` luôn = Monday theo ISO standard, không theo Clinic config |
| Tính ngày trong UTC | Tính ngày sau `.tz(clientDoc.TimeZoneValue)` | US/Central -5h → Wednesday UTC có thể là Tuesday local |
| Không có fallback cho `DateStart` | `!== undefined ? ... : 0` | Nếu clinic chưa set DateStart → không crash |
| Chỉ sửa Generator | Sửa cả Generator + Validator | 2 module dùng cùng window → phải sync |

### 3.4 Moment.js Gotchas

| Gotcha | Mô tả |
|--------|-------|
| `.day()` vs `.weekday()` | `.day()` = 0-6 luôn, `.weekday()` = relative to locale. Dùng `.day()` cho consistency |
| `.startOf('isoWeek')` | Luôn trả về Monday — ISO 8601 standard, không theo Clinic config |
| `.clone()` là bắt buộc | `moment` objects mutable — không clone sẽ mutate minDate khi tính maxDate |
| `.tz()` cần import | `moment-timezone` phải được import riêng, không có sẵn trong `moment` |
| `.endOf('day')` vs `.startOf('day')` | Dùng `.endOf('day')` cho minDate để include toàn bộ ngày đầu tiên trong query |

---

## 4. Quy trình debug đã dùng

1. **Đọc bug report** → "Always shows Sunday" → suspect hardcoded weekday
2. **Tìm entry point**: Tìm từ popup UI → `bookAppointmentHanlderPtE` → `AppointmentUtil.initAppointmentData`
3. **Đặt debug logs** tại cả 2 file, log: `_weekStartDay`, `_apptRefDay`, `_diffToWeekStart`, `minDate`, `maxDate`
4. **So sánh output**: Generator log và Validator log — phát hiện cả 2 đều ra `_weekStartDay = 0` dù clinic config = Monday
5. **Tìm chỗ đọc config**: `clientDoc.DateStart` → tìm từ `clientDoc` (MongoDB document) → thấy `DateStart = "Monday"` (string)
6. **Phát hiện missing map**: Không có code chuyển string → number
7. **Fix + sync cả 2 file** → remove debug logs → verify

---

## 5. Design Decision (Tại sao code như vậy?)

**Câu hỏi của leader:** "Tại sao phải sửa cả 2 file với logic giống hệt nhau?"

**Trả lời:**
> Hai file đảm nhiệm 2 vai trò khác nhau trong cùng workflow nhưng phải dùng cùng "window" tuần. `AppointmentUtil` (Generator) quyết định lịch nào được tạo ra. `v2_AppointmentLogic` (Validator) quyết định lịch nào bị báo conflict. Nếu Generator tạo ra "tuần bắt đầu Monday" nhưng Validator check conflict trong "tuần bắt đầu Sunday" → overlap detection bị sai hoàn toàn. Đây là invariant: **Generator window = Validator window**.

**Tại sao không extract thành shared util?**  
> Trong codebase legacy với 20k+ dòng, refactor extract shared util có rủi ro regression. Approach an toàn hơn là duplicate formula có comment rõ ràng và đảm bảo test 2 path độc lập.

---

## 6. Dấu hiệu nhận biết bug tương tự

| Nếu thấy... | Nghĩ đến... |
|-------------|-------------|
| Scheduling logic dùng `startOf('isoWeek')` | Có thể không theo Clinic config — check `clientDoc.DateStart` |
| `weekDay = 0` hardcoded | Suspect Sunday assumption — kiểm tra có multi-locale không |
| Generator và Validator trong 2 file khác nhau | Luôn so sánh formula tính date window — chúng phải giống nhau |
| Date tính sai 1 ngày | Check timezone conversion — server UTC ≠ clinic local |
| `_dayNameToNumber` không có fallback | Có thể crash nếu `DateStart` là null/undefined |
| `.splice()` trên mảng gốc | Check có copy trước không — AngularJS hay mutate shared state |

---

## 7. Test cases cần check sau khi fix

- [ ] Clinic config Sunday → recurring appointment hiển thị tuần Sun-Sat đúng
- [ ] Clinic config Monday → recurring appointment hiển thị tuần Mon-Sun đúng
- [ ] Clinic config Saturday → recurring appointment hiển thị tuần Sat-Fri đúng
- [ ] Clinic ở timezone US/Central (UTC-5) → ngày không bị lệch so với UTC
- [ ] Clinic ở timezone US/Eastern (UTC-4) → ngày không bị lệch
- [ ] Appointment vào thứ Hai khi startWeekDay = Monday → diff = 0 (minDate = Monday)
- [ ] Appointment vào Chủ Nhật khi startWeekDay = Monday → diff = 6 (minDate = tuần trước)
- [ ] Không có conflict ảo khi tạo recurring appointment Weekly trong 1 tuần
- [ ] Ngày cuối popup ("Last Date") đúng với maxDate được tính
- [ ] `clientDoc.DateStart = undefined` → fallback Sunday, không crash
