## dhtmlxScheduler là gì?

### Tổng quan
**dhtmlxScheduler** là một thư viện JavaScript dùng để tạo **lịch hẹn / lịch sự kiện** (calendar/scheduler) trên web — tương tự Google Calendar.

---

### Chức năng chính

| Tính năng | Mô tả |
|-----------|-------|
| **Hiển thị lịch** | Day / Week / Month / Timeline view |
| **Tạo sự kiện** | Drag & drop, click để thêm event |
| **Block thời gian** | Chặn các khung giờ không cho đặt lịch |
| **Giới hạn ngày** | Chỉ cho phép đặt lịch trong khoảng thời gian nhất định |
| **Recurring events** | Sự kiện lặp lại (hàng ngày, hàng tuần...) |
| **Tích hợp backend** | Kết nối server để load/save dữ liệu |

---

### Trong project này dùng để làm gì?

Dựa vào file dhtmlxscheduler_limit.js và calendarAppointmentPtE.js:

> ✅ Dùng để hiển thị **lịch đặt hẹn (Appointment)**, có tính năng:
> - **Block giờ** không khả dụng (`blockTime`)
> - **Kiểm tra overlap** khi đặt lịch trùng giờ (`checkInMarkedTimespan`)
> - **Giới hạn view** theo ngày cho phép

---

### File extension dhtmlxscheduler_limit.js
Đây là **plugin mở rộng** (không phải core), chuyên xử lý:
```javascript
scheduler.config.check_limits = true;  // bật kiểm tra giới hạn
scheduler.blockTime(days, zones);      // block khung giờ
scheduler.checkInMarkedTimespan(ev);   // kiểm tra event có bị block không
```