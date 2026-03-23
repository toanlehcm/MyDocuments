Function `$root.viewAssociatedTasks()` được định nghĩa trong file [d:\Sources\pteverywhere\Client\app\scripts\app.js](cci:7://file:///d:/Sources/pteverywhere/Client/app/scripts/app.js:0:0-0:0).

Cụ thể, nó được gắn vào `$rootScope` ở khoảng **dòng 457**:
```javascript
$rootScope.viewAssociatedTasks = viewAssociatedTasks;
```

Và nội dung chi tiết của function nằm ở khoảng **dòng 4962**:
```javascript
function viewAssociatedTasks(patientId, relatedTo, relatedToRef) {
    console.log('viewAssociatedTasks...', patientId, relatedTo, relatedToRef);
    commonService.openInternalLink(`/tasks/${patientId}/${relatedTo}/${relatedToRef}`, true);
}
```

Như đã phân tích ở trên, function này gọi `commonService.openInternalLink`, và bên trong [_openInternalLink](cci:1://file:///d:/Sources/pteverywhere/Client/app/scripts/service/commonService.js:1921:4-1933:5) có đoạn `$mdDialog.hide()` nhưng không đóng `bootbox` (chính là nguyên nhân gây đơ màn hình khi gọi từ trong cái dropdown/popup của Contact Log hay Schedule).

Để fix triệt để issue đơ màn hình, anh có thể sửa hàm [_openInternalLink](cci:1://file:///d:/Sources/pteverywhere/Client/app/scripts/service/commonService.js:1921:4-1933:5) trong [d:\Sources\pteverywhere\Client\app\scripts\service\commonService.js](cci:7://file:///d:/Sources/pteverywhere/Client/app/scripts/service/commonService.js:0:0-0:0) (khoảng dòng 1922) bằng cách thêm dòng ẩn bootbox như sau:

```javascript
function _openInternalLink(link, isBlankTab = true, isClearGlobalSearch = false) {
    if ($rootScope.appType === AppTypeConst.APP
        || $rootScope.screenType == ScreenTypeConst.Phone
        || !isBlankTab) {
        $location.path(link);
        $mdDialog.hide();
    } else {
        // Thêm đoạn này để đóng các bootbox modal đang mở trước khi mở tab mới
        try {
            $('.bootbox').modal('hide');
        } catch (e) {
            console.log(e);
        }
        
        if (isClearGlobalSearch) {
          $rootScope.$emit("clearGlobalSearch", {});
        }
        $window.open(link, isBlankTab ? "_blank" : "_self");
    }
}
```