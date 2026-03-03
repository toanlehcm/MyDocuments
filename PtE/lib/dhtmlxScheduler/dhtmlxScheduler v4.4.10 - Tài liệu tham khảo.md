## dhtmlxScheduler v4.4.10 - Tài liệu tham khảo

### 🔗 Links chính thức

| Loại | Link |
|------|------|
| **Official Docs** | https://docs.dhtmlx.com/scheduler/ |
| **API Reference** | https://docs.dhtmlx.com/scheduler/api__index.html |
| **Samples** | https://docs.dhtmlx.com/scheduler/samples/ |
| **GitHub** | https://github.com/DHTMLX/scheduler |

---

### ⚠️ Lưu ý quan trọng về version

File đang dùng là **v4.4.10 (Professional)** — khá cũ.  
Docs hiện tại của DHTMLX là **v7.x**, có thể có **một số API thay đổi**.

---

### 📖 Tìm docs đúng version v4.x

Truy cập link này để xem docs **archive version 4.x**:
```
https://docs.dhtmlx.com/scheduler/api__scheduler_checkinmarkedtimespan.html
```

Hoặc search Google:
```
dhtmlxScheduler 4.4 checkInMarkedTimespan site:docs.dhtmlx.com
```

---

### 📌 Các API liên quan đến file dhtmlxscheduler_limit.js

```javascript
// Block thời gian
scheduler.blockTime(days, zones, sections)
scheduler.unblockTime(days, zones, sections)

// Kiểm tra overlap
scheduler.checkInMarkedTimespan(ev, timespan_type, on_overlap)

// Config
scheduler.config.limit_start   // giới hạn ngày bắt đầu
scheduler.config.limit_end     // giới hạn ngày kết thúc
scheduler.config.limit_view    // ẩn các ngày ngoài giới hạn
scheduler.config.check_limits  // bật/tắt kiểm tra giới hạn
```