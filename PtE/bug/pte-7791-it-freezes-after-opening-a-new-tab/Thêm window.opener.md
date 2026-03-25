```
- $location.path() là mở tại current tab, không mở new tab phải không?
- vì hệ thống đang mở new tab nên t muốn giữ logic mở new tab. Ngoài thêm $animate.enabled(false); thì còn cách nào hiệu quả, fix được root cause hơn không?
```

Viewed commonService.js:1531-2330

Đúng vậy anh:
- `$location.path()`: Đổi URL của tab hiện tại (không mở tab mới).
- `$window.open(..., '_blank')`: Mở một tab mới hoàn toàn.

### Tại sao giữ `_blank` lại gây ra Root Cause?
Khi anh dùng `$window.open(link, "_blank")` (thiếu tham số bảo mật chặn liên kết process), Chrome sẽ ngầm định **gộp tab mới và các tab cũ vào CÙNG MỘT PROCESS (cùng chạy chung 1 luồng xử lý Javascript/Event Loop)** để tab con có thể gọi ngược lại `window.opener` (bảo lưu context của tab mẹ).

Hậu quả là: 
Khi anh có 1 tab Active và 6 tab Background, Chrome bóp nghẹt (Throttle) performance của các thẻ background. Nhưng vì **chúng dùng chung 1 Process** với thẻ Active, sự bóp nghẹt này vạ lây sang cả tab Active! Hàm `requestAnimationFrame` của Angular `$animate` ở tab Active bị cấm chạy (như đang ở background) → Gây freeze.

---

### Giải pháp triệt để hơn: Tách Process (Process Isolation)

Nếu anh vẫn muốn giữ logic mở thẻ mới bằng `_blank` nhưng **vẫn giải quyết gốc rễ vấn đề**, anh hãy thêm cờ `noopener,noreferrer` vào `$window.open`. 

Cờ này báo cho Chrome biết: *"Tab mới này không dính dáng gì tới tab cũ (không cần `window.opener`)"*. Khi đó Chrome sẽ **cấp cho tab mới một Process hoàn toàn độc lập**.

Anh có thể sửa Dòng 1932 trong [commonService.js](cci:7://file:///d:/Sources/pteverywhere/Client/app/scripts/service/commonService.js:0:0-0:0) thành:

```javascript
// D:\Sources\pteverywhere\Client\app\scripts\service\commonService.js
function _openInternalLink(link, isBlankTab = true, isClearGlobalSearch = false) {
      if ($rootScope.appType === AppTypeConst.APP
        || $rootScope.screenType == ScreenTypeConst.Phone
        || !isBlankTab) {
        $location.path(link);
        $mdDialog.hide(); // when open link from popup => hide popup
      } else {
        if (isClearGlobalSearch) {
          $rootScope.$emit("clearGlobalSearch", {});
        }
        // Thêm tính năng cách ly Process con
        var windowFeatures = isBlankTab ? "noopener,noreferrer" : "";
        $window.open(link, isBlankTab ? "_blank" : "_self", windowFeatures);
      }
}
```

**Sự khác biệt khi kết hợp 2 giải pháp:**
1. **$animate.enabled(false)** (ở bài trước): Là "đai an toàn" cho riêng `$mdDialog`, đảm bảo Dialog không bao giờ bị dính các lỗi deadlock queue animation.
2. **noopener,noreferrer** (trong [_openInternalLink](cci:1://file:///d:/Sources/pteverywhere/Client/app/scripts/service/commonService.js:1921:4-1933:5)): Là fix triệt để Core Performance của App, giúp các tab mới mở không bị chạy chậm rề rề khi user mởi 5-10 tab từ Calendar.

Anh nên giữ cả 2 fix này vì nó tốt cho Performance chung của toàn hệ thống PtEverywhere trên Desktop Browser! Anh có muốn em tự động update lại [commonService.js](cci:7://file:///d:/Sources/pteverywhere/Client/app/scripts/service/commonService.js:0:0-0:0) theo đoạn code trên không?

Edited commonService.js
Edited app.js