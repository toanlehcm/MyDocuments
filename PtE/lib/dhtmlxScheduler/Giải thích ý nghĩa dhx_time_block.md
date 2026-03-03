```
@workspace /explain 
var checkAvailabel = scheduler.checkInMarkedTimespan($scope.updateEvent, "dhx_time_block");
- giải thích ý nghĩa "dhx_time_block"?
- $scope.updateEvent được khai báo ở đâu? những chỗ nào làm thay đổi giá trị?
- $scope.updateEvent phải ntn thì scheduler.checkInMarkedTimespan return true và ntn thì return false?
```

## Giải thích chi tiết

### 1. Ý nghĩa `"dhx_time_block"`

Đây là **tên định danh (type)** của vùng thời gian bị block, được khai báo trong dhtmlxscheduler_limit.js:

```javascript
var dhx_time_block = "dhx_time_block"; // tên mặc định cho vùng bị block
```

Khi gọi `scheduler.blockTime(...)`, nội bộ nó gán type = `"dhx_time_block"`:

```javascript
scheduler.blockTime = function(days, zones, sections) {
    // ...tạo timespan với type = "dhx_time_block"
}
```

> ✅ Tóm lại: `"dhx_time_block"` = **nhãn nhận dạng** cho các khung giờ đã bị block bởi `scheduler.blockTime()`

---

### 2. `$scope.updateEvent` khai báo ở đâu?

Cần search trong calendarAppointmentPtE.js các pattern sau:

```javascript
// Khai báo ban đầu
$scope.updateEvent = {}
$scope.updateEvent = null

// Gán giá trị khi click vào event
scheduler.attachEvent("onEventSelected", function(id) {
    $scope.updateEvent = scheduler.getEvent(id);
});

// Gán khi mở form edit
$scope.updateEvent = event;

// Reset sau khi save/cancel
$scope.updateEvent = null;
```

> 💡 Object `$scope.updateEvent` phải có cấu trúc:
```javascript
{
    start_date: Date,  // BẮT BUỘC - ngày giờ bắt đầu
    end_date: Date,    // BẮT BUỘC - ngày giờ kết thúc
    id: "...",
    text: "..."
}
```

---

### 3. Khi nào return `true` / `false`?

#### ✅ Return `true` — Event **NẰM TRONG** vùng bị block

```
Timeline:
Block zone:   |----9h----12h----|
Event:              |10h--11h|
→ Overlap → return TRUE (bị block)
```

Ví dụ cụ thể:
```javascript
// Block zone: 9:00 - 12:00
scheduler.blockTime([1,2,3,4,5], [[540, 720]]); // 540=9h*60, 720=12h*60

$scope.updateEvent = {
    start_date: new Date('2024-01-15 10:00'),
    end_date:   new Date('2024-01-15 11:00')
}
// → checkInMarkedTimespan = TRUE (bị block)
```

---

#### ❌ Return `false` — Event **KHÔNG NẰM TRONG** vùng bị block

```
Timeline:
Block zone:   |----9h----12h----|
Event:                           |13h--14h|
→ Không overlap → return FALSE (không bị block)
```

Ví dụ cụ thể:
```javascript
$scope.updateEvent = {
    start_date: new Date('2024-01-15 13:00'),
    end_date:   new Date('2024-01-15 14:00')
}
// → checkInMarkedTimespan = FALSE (không bị block)
```

---

### Tóm tắt công thức kiểm tra overlap

$$\text{return TRUE} = (sz < em) \text{ AND } (ez > sm)$$

| Biến | Ý nghĩa |
|------|---------|
| $sm$ | Phút bắt đầu của `$scope.updateEvent` trong ngày |
| $em$ | Phút kết thúc của `$scope.updateEvent` trong ngày |
| $sz$ | Phút bắt đầu của block zone |
| $ez$ | Phút kết thúc của block zone |