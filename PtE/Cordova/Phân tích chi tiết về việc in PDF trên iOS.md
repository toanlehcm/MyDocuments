# Phân tích chi tiết về việc in PDF trên iOS

1. IOS cần phải download về rồi mới print được, đó là bắt buộc của thiết bị hay sao?
2. vậy có cách nào để IOS print trực tiếp giống android không?
VD: dùng plugin khác của cordova hoặc dùng thư viện khác mà không dùng cordova?

## 1. iOS có BẮT BUỘC phải download về không?

**Có, đây là requirement bắt buộc từ iOS system**, KHÔNG PHẢI do Cordova plugin.

### Lý do kỹ thuật:

```javascript
// iOS Printing Architecture
UIKit Framework (iOS native)
    └── UIPrintInteractionController
        └── YÊU CẦU: file URL hoặc printable data object
        └── KHÔNG HỖ TRỢ: HTML string trực tiếp
```

**Kiến trúc iOS:**
- iOS sử dụng `UIPrintInteractionController` để xử lý in ấn
- Controller này chỉ nhận:
  - **File URL** (local file path)
  - **Printable objects**: UIImage, NSData, PDF data
  - **KHÔNG nhận**: HTML string, remote URL trực tiếp

**So sánh với Android:**
```javascript
// Android có WebView engine mạnh hơn
Android WebView → render HTML → in trực tiếp ✅
iOS WKWebView   → cần convert → file → in ❌
```

## 2. Có cách nào để iOS in trực tiếp như Android không?

### ❌ **KHÔNG THỂ** hoàn toàn giống Android, NHƯNG có thể tối ưu workflow:

---

## Các giải pháp thay thế:

### **Option 1: In-Memory Processing (Khuyến nghị)**

Không cần lưu file vật lý, xử lý PDF trong RAM:

````javascript
$scope.printPDF = function (data) {
    getFilePDFDocument(data._id, 'PRINT_PDF').then(function(dataResponse) {
        if ($rootScope.appType === AppTypeConst.APP) {
            if ($rootScope.DeviceType === 'android') {
                $cordovaPrinter.print(dataResponse);
            } else {
                // iOS: Xử lý PDF trong memory
                var pdfUrl = $rootScope.host + 'api/v2ViewNoteFilePDF?type=view&pathPDFFile=' + dataResponse;
                
                // Download vào temporary storage (tự động xóa)
                downloadService.downloadToTemp(pdfUrl).then(function(tempURI) {
                    $cordovaPrinter.print(tempURI);
                    // File tự động xóa sau khi in
                });
            }
        } else {
            // Web browser
            var pdfFileName = dataResponse;
            var urlPdf = $rootScope.host + 'api/v2ViewNoteFilePDF?type=view&pathPDFFile=' + pdfFileName;
            printJS({ printable: urlPdf, type: 'pdf', showModal: true });
        }
    });
}
````

---

### **Option 2: Sử dụng Base64 Encoding**

Convert PDF sang base64, tránh file I/O:

````javascript
// Server-side (Node.js)
// filepath: d:\SVN\Pte-7275\Server\logicMongo\v2_UserNoteLogic.js

v2_UserNoteLogic.printPDFTreatmentNote = function(treatmentNoteId, clientId, documentType, coverInfo, next, optionalParams) {
    // ... existing code ...
    
    if (optionalParams && optionalParams.returnBase64) {
        // Đọc PDF dưới dạng base64
        const pdfBase64 = fs.readFileSync(pdfPath, 'base64');
        return next(null, {
            type: 'base64',
            data: pdfBase64,
            filename: pdfFileName
        });
    }
    
    // ... existing code ...
}
````

````javascript
// Client-side
$scope.printPDF = function (data) {
    getFilePDFDocument(data._id, 'PRINT_PDF').then(function(response) {
        if (response.type === 'base64') {
            // iOS: Convert base64 to blob
            const blob = base64ToBlob(response.data, 'application/pdf');
            const blobUrl = URL.createObjectURL(blob);
            
            $cordovaPrinter.print(blobUrl, {
                name: response.filename
            }).then(() => {
                URL.revokeObjectURL(blobUrl); // Cleanup
            });
        }
    });
}

function base64ToBlob(base64, contentType) {
    const byteCharacters = atob(base64);
    const byteArrays = [];
    
    for (let i = 0; i < byteCharacters.length; i++) {
        byteArrays.push(byteCharacters.charCodeAt(i));
    }
    
    return new Blob([new Uint8Array(byteArrays)], { type: contentType });
}
````

---

### **Option 3: Native iOS Plugin Custom**

Tạo plugin riêng xử lý in từ remote URL:

````javascript
// Custom Cordova Plugin (Objective-C/Swift)
// RemotePDFPrinter.swift

@objc(RemotePDFPrinter)
class RemotePDFPrinter: CDVPlugin {
    @objc(print:)
    func print(command: CDVInvokedUrlCommand) {
        let pdfUrl = command.arguments[0] as! String
        
        // Download PDF vào NSTemporaryDirectory()
        URLSession.shared.downloadTask(with: URL(string: pdfUrl)!) { localURL, response, error in
            guard let localURL = localURL else { return }
            
            // In trực tiếp từ temp file
            let printController = UIPrintInteractionController.shared
            printController.printingItem = localURL
            
            printController.present(animated: true) { (controller, completed, error) in
                // Tự động xóa temp file
                try? FileManager.default.removeItem(at: localURL)
            }
        }.resume()
    }
}
````

Sử dụng:

````javascript
$scope.printPDF = function (data) {
    var pdfUrl = $rootScope.host + 'api/v2ViewNoteFilePDF?type=view&pathPDFFile=' + dataResponse;
    
    if ($rootScope.DeviceType === 'ios') {
        cordova.plugins.RemotePDFPrinter.print(pdfUrl);
    }
}
````

---

### **Option 4: Sử dụng Capacitor (Modern Alternative)**

Capacitor có API tốt hơn Cordova:

````javascript
// Cài đặt
npm install @capacitor/filesystem
npm install @capacitor-community/printer

// Usage
import { Filesystem } from '@capacitor/filesystem';
import { Printer } from '@capacitor-community/printer';

async function printPDF(pdfUrl) {
    // Download to cache
    const response = await fetch(pdfUrl);
    const blob = await response.blob();
    const base64 = await blobToBase64(blob);
    
    // Write to temp file
    const file = await Filesystem.writeFile({
        path: 'temp.pdf',
        data: base64,
        directory: Directory.Cache
    });
    
    // Print
    await Printer.print({ 
        url: file.uri 
    });
    
    // Cleanup
    await Filesystem.deleteFile({
        path: 'temp.pdf',
        directory: Directory.Cache
    });
}
````

---

## So sánh các giải pháp:

| Giải pháp | Pros | Cons | Recommend |
|-----------|------|------|-----------|
| **Option 1: In-Memory** | Đơn giản, không cần plugin mới | Vẫn phải download | ⭐⭐⭐⭐ |
| **Option 2: Base64** | Nhanh, không cần file I/O | Tăng memory usage | ⭐⭐⭐ |
| **Option 3: Custom Plugin** | Tối ưu nhất | Phức tạp, cần native code | ⭐⭐⭐⭐⭐ |
| **Option 4: Capacitor** | Modern, maintainable | Phải migrate từ Cordova | ⭐⭐⭐⭐ |

---

## Code đề xuất cuối cùng:

````javascript
$scope.printPDF = function (data) {
    getFilePDFDocument(data._id, 'PRINT_PDF').then(function(dataResponse) {
        if ($rootScope.appType === AppTypeConst.APP) {
            var pdfUrl = $rootScope.host + 'api/v2ViewNoteFilePDF?type=view&pathPDFFile=' + dataResponse;
            
            // Unified approach cho cả Android và iOS
            downloadService.downloadToTemp(pdfUrl, dataResponse).then(function(fileURI) {
                $cordovaPrinter.print(fileURI, {
                    name: dataResponse,
                    duplex: 'long', // optional
                    orientation: 'portrait' // optional
                }).finally(function() {
                    // Cleanup temp file
                    downloadService.deleteTempFile(fileURI);
                });
            });
        } else {
            // Web browser
            var urlPdf = $rootScope.host + 'api/v2ViewNoteFilePDF?type=view&pathPDFFile=' + dataResponse;
            printJS({ printable: urlPdf, type: 'pdf', showModal: true });
        }
    });
}
````

**Kết luận:** iOS BẮT BUỘC phải có file local, KHÔNG THỂ tránh khỏi bước download. Tuy nhiên có thể tối ưu bằng temporary storage và auto-cleanup.