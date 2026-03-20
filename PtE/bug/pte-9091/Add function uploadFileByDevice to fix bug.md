Để em trace flow cho anh:

---

### 🔍 Câu 1: Tại sao spinner không ẩn sau khi send hình thành công?

Trace flow [takePhoto](cci:1://file:///d:/Sources/pteverywhere/Client/app/scripts/controllers/message/messageATP.js:650:8-658:10) → [onSuccessTakePhoto](cci:1://file:///d:/Sources/pteverywhere/Client/app/scripts/controllers/message/messageATP.js:660:8-680:9) → [uploadFileByDevice](cci:1://file:///d:/Sources/pteverywhere/Client/app/scripts/controllers/message/messageATP.js:682:8-707:9) → [sendMessage](cci:1://file:///d:/Sources/pteverywhere/Client/app/scripts/controllers/message/messageATP.js:1518:8-1604:9):

```
takePhoto()
  └─ onSuccessTakePhoto(imageUri)
       ├─ $scope.showSpinner = true  ✅ (bật spinner)
       └─ uploadFileByDevice($scope.dataMedia, onSuccess, onError)
            ├─ $rootScope.spinnerCounter++  ⚠️ (tăng counter lên, NHƯNG KHÔNG BAO GIỜ --)
            ├─ common.uploadByDevice(file, signature, success, error)
            │    └─ success callback:
            │         ├─ $scope.showSpriner = false  ❌ LỖI CHÍNH TẢ! Phải là "showSpinner"
            │         └─ onSuccess(signature)
            │              └─ sendMessage(chatter)
            │                   └─ $scope.showSpinner = false  ✅ (tắt spinner)
            └─ error callback:
                 └─ $scope.showSpriner = false  ❌ CŨNG LỖI CHÍNH TẢ!
```

**Root cause chính: `$rootScope.spinnerCounter++` mà không bao giờ `--`**

Trong function [uploadFileByDevice](cci:1://file:///d:/Sources/pteverywhere/Client/app/scripts/controllers/message/messageATP.js:682:8-707:9), dòng đầu tiên là `$rootScope.spinnerCounter++`. Biến này được dùng trong app để hiện global spinner. Khi upload thành công, **không có dòng nào gọi `$rootScope.spinnerCounter--`**, nên spinner toàn cục (cái vòng xoay vàng trong screenshot) sẽ **không bao giờ tắt**.

Ngoài ra còn có lỗi phụ: `$scope.showSpriner = false` — thiếu chữ "n", đúng ra phải là `$scope.showSpinner`. Tuy nhiên lỗi này không gây ảnh hưởng nghiêm trọng vì [sendMessage](cci:1://file:///d:/Sources/pteverywhere/Client/app/scripts/controllers/message/messageATP.js:1518:8-1604:9) callback cuối cùng cũng set `$scope.showSpinner = false` đúng chính tả.

**Fix cần làm trong [uploadFileByDevice](cci:1://file:///d:/Sources/pteverywhere/Client/app/scripts/controllers/message/messageATP.js:682:8-707:9):**

```js
// Trong success callback của common.uploadByDevice:
common.uploadByDevice(file, signature, function(){
    $rootScope.spinnerCounter--;       // ← THÊM DÒNG NÀY
    $scope.showSpinner = false;        // ← SỬA CHÍNH TẢ
    onSuccess(signature);
}, function(err){
    $rootScope.spinnerCounter--;       // ← THÊM DÒNG NÀY
    $scope.showSpinner = false;        // ← SỬA CHÍNH TẢ
    // ... error handling
});
```

---

### 🔍 Câu 2: `file?.type?.startsWith('video/')` có ảnh hưởng các nơi khác không?

**Không ảnh hưởng.** Đây là thay đổi an toàn:

- **Trước fix:** `file.type.startsWith('video/')` → nếu `file.type` là `undefined` hoặc `null` → **crash app** (TypeError).
- **Sau fix:** `file?.type?.startsWith('video/')` → nếu `file.type` là `undefined` → trả về `undefined` (falsy) → **skip vào [if](cci:1://file:///d:/Sources/pteverywhere/Server/logicMongo/v2_CommonLogic.js:2120:0-2204:1)** → mimeType giữ nguyên `"image/jpeg"`.

Behavior logic **không thay đổi gì**:
| Trường hợp | Trước fix | Sau fix |
|---|---|---|
| `file.type = "video/mp4"` | mimeType = "video/mp4" | mimeType = "video/mp4" ✅ |
| `file.type = "image/jpeg"` | mimeType = "image/jpeg" | mimeType = "image/jpeg" ✅ |
| `file.type = undefined` | **💥 CRASH** | mimeType = "image/jpeg" ✅ |

Tất cả các nơi gọi `common.uploadByDevice` sẽ được hưởng lợi từ fix này — không còn crash khi file object thiếu property `type`.