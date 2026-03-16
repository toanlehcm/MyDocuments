Em đã đọc source code [globalSearch.js](cci:7://file:///d:/Sources/pteverywhere/Client/app/scripts/directives/globalSearch.js:0:0-0:0) rồi. Giải thích như sau:

---

### `$rootScope.$emit("clearGlobalSearch", {})` là gì?

Đây là một **event bus** trong AngularJS. Khi emit sự kiện này, directive `globalSearch` lắng nghe và chạy hàm `$scope.clear()`:

```javascript
// globalSearch.js - line 63
$rootScope.$on("clearGlobalSearch", function() {
    $scope.clear(); // ← cái này được gọi
});

$scope.clear = function(item) {
    $scope.preQuery = '';
    $scope.preQueryResult = [];
    $scope.selectPatient = null;       // xóa patient đang chọn
    $scope.ngModel = null;
    $rootScope.working = { Patient: null };  // reset working patient
    localStorage.removeItem(SessionConst.WORKING_PATIENT); // xóa trong localStorage
};
```

Tóm lại: **nó xóa Patient đang được chọn trên thanh tìm kiếm Global Search ở header.**

---

### Tại sao chỉ Web mới cần?

Trên **Web browser**, khi user mở hóa đơn bằng `$window.open(..., "_blank")`, tab mới được bật ra nhưng **tab cũ vẫn còn**. Tab cũ vẫn hiển thị thanh Global Search với patient cũ đang được chọn. Nếu không clear, thanh tìm kiếm ở tab cũ sẽ vẫn "giữ" patient không cần thiết — gây nhầm lẫn khi user quay lại.

Trên **Mobile App**, `$location.path(...)` làm thay đổi route **trong cùng một webview**. Màn hình mới được load vào trong chính app đó (không có tab mới), và khi sang màn hình invoice, context hiện tại sẽ tự reset theo route mới — không cần clear thủ công.

Nói ngắn gọn:

| Môi trường | Hành động | Cần clear Global Search? |
|---|---|---|
| **Web** | Mở tab mới, tab cũ vẫn hiển thị | ✅ Cần, vì tab cũ còn sống |
| **Mobile App** | Chuyển màn hình trong cùng app | ❌ Không cần, màn hình thay thế nhau |