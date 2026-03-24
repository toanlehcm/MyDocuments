Để phân tích bug này, em cần đọc một số file liên quan trước.

Searched for "viewAssociatedTasks"
Viewed tasksManagementPtE.html:1-332
Viewed app.js:4583-5382
Searched for "openInternalLink"
Viewed commonService.js:1547-2346

Em đã tìm được nguyên nhân có thể gây ra bug này. Đây là phân tích chi tiết:

### 🔍 Root Cause Analysis

**Vấn đề cốt lõi nằm ở hàm [_openInternalLink](cci:1://file:///d:/Sources/pteverywhere/Client/app/scripts/service/commonService.js:1921:4-1933:5) trong [commonService.js](cci:7://file:///d:/Sources/pteverywhere/Client/app/scripts/service/commonService.js:0:0-0:0) dòng 1922-1934:**

```javascript
function _openInternalLink(link, isBlankTab = true, isClearGlobalSearch = false) {
    if ($rootScope.appType === AppTypeConst.APP
        || $rootScope.screenType == ScreenTypeConst.Phone
        || !isBlankTab) {
        $location.path(link);
        $mdDialog.hide(); // ← ĐÂY LÀ VẤN ĐỀ
    } else {
        ...
        $window.open(link, isBlankTab ? "_blank" : "_self");
    }
}
```

Khi user click **"View Associated Tasks"** từ trong một **bootbox dialog** (ví dụ: Contact Log dropdown, Schedule dropdown appointment...), hàm này gọi `$mdDialog.hide()` để đóng các `mdDialog` đang mở. Nhưng **bootbox không phải là `$mdDialog`** — bootbox dùng backdrop của Bootstrap riêng, không được track bởi Angular Material.

Luồng lỗi (không phải lúc nào cũng xảy ra vì phụ thuộc lúc nào có dialog đang mở):

```
Click "View Associated Tasks" từ Contact Log dropdown (trong bootbox)
→ $window.open('/tasks/...', '_blank')  ← mở tab mới ✅
→ Tab mới load xong
→ Backdrop Bootstrap (modal-backdrop) của popup cũ vẫn còn trong DOM
   vì bootbox không được đóng trước khi mở tab ← ❌ APP BỊ ĐÔNG
```

**Tại sao không phải lúc nào cũng bị?** Vì chỉ xảy ra khi View Associated Tasks được gọi từ bên trong một **bootbox dialog đang mở** (contact log dropdown, appointment popup...). Nếu click từ ngoài dialog thì không bị.

### ✅ Giải pháp đề xuất

Trước khi mở tab mới, cần đóng tất cả các bootbox đang mở:

```javascript
function _openInternalLink(link, isBlankTab = true, isClearGlobalSearch = false) {
    if ($rootScope.appType === AppTypeConst.APP
        || $rootScope.screenType == ScreenTypeConst.Phone
        || !isBlankTab) {
        $location.path(link);
        $mdDialog.hide();
    } else {
        // Close any open bootbox modals before opening a new tab
        // to prevent stale Bootstrap modal-backdrop from blocking the UI
        $('.bootbox').modal('hide');
        
        if (isClearGlobalSearch) {
            $rootScope.$emit("clearGlobalSearch", {});
        }
        $window.open(link, isBlankTab ? "_blank" : "_self");
    }
}
```

> **Lưu ý:** Dòng `$('.bootbox').modal('hide')` sẽ đóng **tất cả các bootbox dialog đang mở** trước khi mở tab mới. Điều này là safe vì khi user đã chủ đích click sang tab mới thì dialog cũ đó cũng không cần thiết nữa.