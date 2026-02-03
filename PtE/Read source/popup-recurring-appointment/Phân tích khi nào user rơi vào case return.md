@workspace /explain 
function handleCreateEvent(isInternal = false) {
    $scope.disableButtonCreatedRecurringAppointment = true;
    // ... các check khác ...
    if (!isInternal && !$scope.popupRecurringUUID) {
        console.log('Popup already used for create, prevent duplicate.');
        return;
    }
    // ... phần còn lại ...
}

phân tích khi nào user rơi vào case return

Khi gọi `handleCreateEvent(isInternal = false)`, đoạn code sau sẽ kiểm tra điều kiện:

```javascript
if (!isInternal && !$scope.popupRecurringUUID) {
    console.log('Popup already used for create, prevent duplicate.');
    return;
}
```

### Phân tích khi nào user rơi vào case `return` này:

- **`isInternal` là `false`** (tức là hàm được gọi từ thao tác của user, ví dụ: click nút "Create" trên UI).
- **`$scope.popupRecurringUUID` là falsy** (có thể là `null`, `undefined`, `''`, hoặc đã bị xóa).

#### Khi nào `$scope.popupRecurringUUID` bị falsy?
- Khi popup vừa được mở, biến này sẽ được khởi tạo (thường là một giá trị duy nhất, ví dụ: `String(Date.now())`).
- Sau khi tạo appointment thành công, hoặc khi đóng popup, bạn sẽ set `$scope.popupRecurringUUID = null;` để ngăn user thao tác tiếp.
- Nếu user cố gắng click lại nút "Create" sau khi popup đã bị vô hiệu hóa (do đã tạo thành công hoặc đã đóng), thì biến này sẽ là `null` và điều kiện trên sẽ đúng.

### **Tóm lại:**
User sẽ rơi vào case `return` này khi:
- Họ click nút "Create" **sau khi popup đã được dùng để tạo appointment một lần** (và biến `$scope.popupRecurringUUID` đã bị set về `null` hoặc giá trị falsy).
- Điều này giúp **ngăn không cho user tạo appointment trùng lặp** từ cùng một popup.

**Luồng thực tế:**  
1. Mở popup → `$scope.popupRecurringUUID` được khởi tạo.
2. User click "Create" lần đầu → đi qua check, gọi API.
3. Sau khi thành công hoặc đóng popup → `$scope.popupRecurringUUID = null`.
4. User click lại "Create" → bị chặn bởi điều kiện trên, không gọi API nữa.