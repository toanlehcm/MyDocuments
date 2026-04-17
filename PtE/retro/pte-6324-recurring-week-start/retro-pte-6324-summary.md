# 🔁 Retrospective — PTE-6324 (Done)

> Bug: Recurring Appointment always shows Sunday as start of week

---

## ✅ 4 Files đã tạo tại `d:\Sources\MyDocuments\PtE\retro\pte-6324-recurring-week-start\`

| File | Mục đích | Dùng khi nào |
|------|----------|-------------|
| [01-cv-version.md](file:///d:/Sources/MyDocuments/PtE/retro/pte-6324-recurring-week-start/01-cv-version.md) | Ghi vào CV / LinkedIn | Cập nhật hồ sơ |
| [02-interview-version.md](file:///d:/Sources/MyDocuments/PtE/retro/pte-6324-recurring-week-start/02-interview-version.md) | STAR format cho phỏng vấn | Trước khi phỏng vấn |
| [03-full-knowledge.md](file:///d:/Sources/MyDocuments/PtE/retro/pte-6324-recurring-week-start/03-full-knowledge.md) | Kiến thức FE + BE đầy đủ | Đọc để hiểu sâu, hotfix |
| [04-code-reading-guide.md](file:///d:/Sources/MyDocuments/PtE/retro/pte-6324-recurring-week-start/04-code-reading-guide.md) | Hướng dẫn đọc 3 file lớn nhanh | Khi cần navigate code |

---

## 🧠 AWF Rule mới: `/retrospective`

**Workflow file:** `C:\Users\daniel.toan.le\.gemini\antigravity\global_workflows\retrospective.md`

**Trigger phrases (nói bất kỳ câu nào → AI tự động tạo 4 files):**
- `Retro bug vừa done`
- `Retrospective bug vừa done`
- `Retro task vừa done`
- `Retrospective task vừa done`
- `Retro bug-[mã số]` (ví dụ: `Retro bug-6324`)
- `Retrospective bug-[mã số]`

---

## 💡 Key Learnings — Bug PTE-6324

### Frontend (AngularJS)
- **Array rotation pattern:** `splice(0, startIdx)` + `concat()` để xoay mảng ngày trong tuần
- **Guard pattern bắt buộc:** `Array.isArray()` trước khi gọi `.findIndex()`, `d && d.text` trong callback
- **`angular.copy()` vs spread:** Dùng `angular.copy()` trong AngularJS 1.x để deep clone
- **`$rootScope.startWeekDay`:** Clinic settings được load vào `$rootScope` — luôn đọc từ đây, không hardcode

### Backend (Node.js / Moment.js)
- **Generator-Validator invariant:** Hai module tính cùng một `minDate/maxDate` window → BẮT BUỘC phải dùng cùng formula
- **`.day()` không theo locale** — Luôn 0=Sun..6=Sat, dùng thay vì `.weekday()`
- **`+ 7) % 7` trick** — Đảm bảo modular arithmetic không trả về số âm trong JavaScript
- **`.tz()` trước khi tính ngày** — Server UTC ≠ Clinic local time → phải convert timezone TRƯỚC
- **`clientDoc.DateStart` là STRING** — Phải map sang số bằng lookup object, có fallback

### Đọc code file lớn (>1000 dòng)
1. Đọc top 50 dòng → pattern chung
2. Ctrl+F tìm function headers → mental map
3. Đọc signatures, không đọc body
4. Trace theo bug từ symptom
5. Comments = WHY, code = HOW

---

## 📋 Test Cases cần verify

- [ ] Sunday start → tuần Sun-Sat đúng
- [ ] Monday start → tuần Mon-Sun đúng
- [ ] Saturday start → tuần Sat-Fri đúng
- [ ] US/Central timezone → ngày không lệch
- [ ] `DateStart = undefined` → fallback Sunday, không crash
