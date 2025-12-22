# cordovaPrinter.print for android and ios

# Phân tích sự khác biệt giữa Android và iOS trong việc in PDF

## Nguyên nhân gốc rễ

`$cordovaPrinter.print()` trên **Android và iOS xử lý input khác nhau**:

### Android
- **Chấp nhận cả HTML string và file path**
- `dataResponse` là HTML string → Android render HTML thành PDF rồi in trực tiếp
- Không cần file vật lý, xử lý in-memory

### iOS  
- **Chỉ chấp nhận file path (file URI)**
- Phải có file PDF thực sự trên thiết bị
- Không thể render HTML string như Android

## So sánh cụ thể

| Tiêu chí | Android | iOS |
|----------|---------|-----|
| Input type | HTML string hoặc file path | **Chỉ file path** |
| Xử lý HTML | Tự động render HTML → PDF | **Không hỗ trợ** |
| File requirement | Không bắt buộc | **Bắt buộc phải có file** |
| Memory handling | In-memory processing | File-based processing |

## Tại sao iOS phải gọi thêm API?

```javascript
// Android - WORKS
$cordovaPrinter.print(dataResponse); // dataResponse có thể là HTML

// iOS - FAILS nếu dataResponse là HTML
$cordovaPrinter.print(dataResponse); // ❌ Lỗi

// iOS - WORKS
var urlPdf = $rootScope.host + 'api/v2ViewPDF?type=download&pathPDFFile=' + pdfFileName;
downloadService.download(urlPdf, pdfFileName).then(function(fileURI) {
    $cordovaPrinter.print(fileURI); // ✅ OK với file path
});
```

## Quy trình chi tiết

### Android
1. `getFilePDFTreatmentNote()` → trả về HTML/path
2. `$cordovaPrinter.print(dataResponse)` → In luôn

### iOS
1. `getFilePDFTreatmentNote()` → trả về `pdfFileName` (tên file trên server)
2. Gọi API `v2ViewPDF` → Download PDF về thiết bị
3. `downloadService.download()` → Lưu file, trả về `fileURI` (đường dẫn local)
4. `$cordovaPrinter.print(fileURI)` → In file local

## Có phải tất cả iOS phải gọi thêm API không?

**Có**, nếu:
- Server trả về HTML string hoặc remote path
- Chưa có file PDF vật lý trên thiết bị iOS

**Không**, nếu:
- Đã có file path local trên thiết bị (ví dụ: đã download trước đó)

## Khuyến nghị

Nên xử lý thống nhất cho cả 2 platform:

````javascript
if ($rootScope.appType === AppTypeConst.APP) {
    var pdfFileName = dataResponse;
    var urlPdf = $rootScope.host + 'api/v2ViewPDF?type=download&pathPDFFile=' + pdfFileName;
    
    downloadService.download(urlPdf, pdfFileName).then(function(fileURI) {
        $cordovaPrinter.print(fileURI); // Works cho cả Android và iOS
    });
}
````

**Lý do:** Code nhất quán, dễ maintain, tránh bug platform-specific.