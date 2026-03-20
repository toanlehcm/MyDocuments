Code đã clean và đúng rules rồi anh. Em review lần cuối:

**✅ `common.uploadByDevice` — PASS**

| Kiểm tra | Kết quả |
|---|---|
| Guard `!file \|\| !file.imageUri` | ✅ Có, return sớm + gọi onError |
| Guard `!signature \|\| !signature.params` | ✅ Có, return sớm + gọi onError |
| `file.imageUri` sau guards | ✅ An toàn, không cần `?.` |
| `file?.type?.startsWith('video/')` | ✅ Chuẩn optional chaining |
| `options?.fileName` | ⚠️ Thừa — `options` luôn tồn tại (vừa được `new FileUploadOptions()` tạo ra bên trên), bỏ `?.` cho gọn: `options.fileName` |

**✅ [uploadFileByDevice](cci:1://file:///d:/Sources/pteverywhere/Client/app/scripts/controllers/patientDashboard/treamentNoteATP.js:10614:4-10636:5) — PASS**

| Kiểm tra | Kết quả |
|---|---|
| `$rootScope.spinnerCounter--` khi API lỗi | ✅ Có |
| `$rootScope.spinnerCounter--` khi upload lỗi | ✅ Có |
| `$rootScope.spinnerCounter--` khi signature null | ✅ Có |
| Dùng `bootbox.alert` thay `alert` | ✅ Đúng rule |
| Dùng `commonService.showToast` cho signature fail | ✅ Đúng rule |

**✅ [onSuccessTakePhoto](cci:1://file:///d:/Sources/pteverywhere/Client/app/scripts/controllers/message/messageATP.js:659:8-684:9) — PASS**

| Kiểm tra | Kết quả |
|---|---|
| Guard `!imageUri` | ✅ Có return sớm |
| Error callback cho `resolveLocalFileSystemURI` | ✅ Có, tắt spinner |
| Error callback cho `fileEntry.file` | ✅ Có, tắt spinner |
| Guard `signature && signature.public_url` | ✅ Có |

---

Chỉ còn 1 điểm nhỏ cần sửa trong `common.uploadByDevice`, dòng:

```js
// Thừa ?.
if (file?.type?.startsWith('video/') || /\.(mp4|mov|avi)$/i.test(options?.fileName)) {
```
Sửa thành:
```js
if (file?.type?.startsWith('video/') || /\.(mp4|mov|avi)$/i.test(options.fileName)) {
```

`options` chắc chắn không null vì vừa được khởi tạo bằng `new FileUploadOptions()`. Còn `file?.type` giữ nguyên là đúng vì `file.type` có thể undefined (trường hợp ảnh chụp từ camera trên Android mà anh đã gặp).