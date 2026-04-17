# Interview Version — PTE-6324: Recurring Appointment Week-Start Bug

## STAR Format

**S (Situation):**  
Tôi đang làm việc trên hệ thống quản lý phòng khám vật lý trị liệu (PtEverywhere). Hệ thống cho phép tạo lịch hẹn lặp lại (Recurring Appointment) theo tuần. Mỗi phòng khám có thể cấu hình ngày bắt đầu tuần trong Clinic Settings (Sunday / Monday / Saturday...).

**T (Task):**  
Bug PTE-6324: Popup tạo lịch hẹn lặp lại luôn hiển thị Sunday là ngày đầu tuần, bất kể cài đặt của từng phòng khám là gì. Dẫn đến ngày cuối cùng được hiển thị bị sai, gây nhầm lẫn cho nhân viên phòng khám.

**A (Action):**  
Tôi trace workflow bằng cách đặt debug logs và so sánh output giữa 2 file server — `AppointmentUtil.js` (Generator: sinh danh sách lịch) và `v2_AppointmentLogic.js` (Validator: kiểm tra xung đột). Phát hiện cả 2 đang hard-code giả định tuần bắt đầu từ Sunday (weekday = 0), không đọc `clientDoc.DateStart`. Tôi thay thế bằng công thức modular arithmetic động:  
`_diffToWeekStart = (_currentDayNo - _weekStartDay + 7) % 7`  
rồi đồng bộ formula này vào cả Generator lẫn Validator để tránh lệch ngày dẫn đến false conflict. Phía Client (AngularJS), bổ sung guard pattern `Array.isArray()` để tránh null exception khi sort danh sách ngày trong tuần theo cài đặt.

**R (Result):**  
Lịch hẹn lặp lại hiển thị đúng ngày bắt đầu/kết thúc theo cài đặt của từng phòng khám. Không còn false overlap, cả 3 file đã được clean (bỏ debug logs), tuân thủ StandardJS và null-safety rules.

---

## Câu trả lời gộp lại (1–4 câu, đọc tự nhiên)

> "Trong một dự án healthcare SaaS, tôi gặp bug trong tính năng tạo lịch hẹn lặp lại theo tuần: hệ thống luôn coi Sunday là đầu tuần dù cài đặt phòng khám có thể là Monday hay Saturday. Sau khi trace qua 2 module server (Generator và Validator), tôi phát hiện cả hai đều hard-code logic tính ngày, không đọc config của clinic. Tôi sửa bằng cách thống nhất một công thức modular arithmetic động vào cả hai module, đồng thời bổ sung guard pattern phía AngularJS client để tránh null exception. Kết quả là lịch hiển thị chính xác với mọi timezone và cấu hình ngày bắt đầu tuần."

---

## Câu hỏi phỏng vấn FE/BE liên quan

### Frontend (AngularJS)

**Q: Trong AngularJS 1.x, sự khác biệt giữa `angular.copy()` và gán trực tiếp là gì?**  
A: `angular.copy()` tạo deep clone — thay đổi clone không ảnh hưởng object gốc. Gán trực tiếp (`=`) chỉ copy reference, thay đổi sẽ mutate object gốc và trigger watch không mong muốn.

**Q: Null-safety trong JavaScript — khi nào dùng `Array.isArray()` thay vì `truthy check`?**  
A: `Array.isArray()` chính xác hơn vì `truthy check` (`if (arr)`) vẫn pass với `{}`, `""`, `0`. Khi cần gọi array methods (`.findIndex`, `.map`...) mà không chắc variable là array, phải dùng `Array.isArray()` trước.

**Q: AngularJS `$rootScope` vs `$scope` — khi nào dùng cái nào?**  
A: `$rootScope` là singleton, dùng cho data share toàn app (clinic settings, user info). `$scope` là per-controller, dùng cho UI state cục bộ. Lạm dụng `$rootScope` làm app khó maintain và dễ memory leak.

### Backend (Node.js / Moment.js / ActionHero)

**Q: Moment.js `.day()` vs `.weekday()` — khác nhau thế nào?**  
A: `.day()` trả về 0 (Sunday) đến 6 (Saturday) — **locale-independent**. `.weekday()` trả về số ngày tương đối theo locale/setting, có thể thay đổi nếu `moment.locale()` khác. Khi cần consistent cross-timezone calculation, dùng `.day()`.

**Q: Tại sao cần sửa cùng một logic ở 2 file server khác nhau?**  
A: Pattern Generator-Validator: Generator tạo danh sách lịch theo một công thức, Validator kiểm tra conflict bằng công thức tương tự. Nếu 2 công thức lệch nhau → Validator sẽ check sai ngày → báo conflict ảo hoặc bỏ sót conflict thật. Consistency là bắt buộc.

**Q: Modular arithmetic `(a - b + 7) % 7` dùng trong scheduling — ý nghĩa là gì?**  
A: Tính số ngày cần lùi để về ngày đầu tuần. `+ 7` đảm bảo kết quả không âm (JavaScript `%` có thể trả về số âm). Ví dụ: hôm nay Wednesday (3), tuần bắt đầu Monday (1) → diff = (3-1+7)%7 = 2 → lùi 2 ngày về Monday.
