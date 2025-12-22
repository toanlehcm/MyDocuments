# Phân tích: Cordova Plugin Print Preview HTML trên iOS

## ❌ **KHÔNG, không có plugin Cordova nào cho phép print preview HTML trực tiếp trên iOS mà không cần file conversion**

---

## Lý do kỹ thuật:

### 1. **iOS Print Architecture Limitation**

```objectivec
// iOS Native Printing API
UIPrintInteractionController.shared
    ├── printingItem (property)
    │   ├── ✅ NSData (PDF/Image binary)
    │   ├── ✅ NSURL (file:// only)
    │   ├── ✅ UIImage
    │   └── ❌ HTML String (NOT SUPPORTED)
    │
    └── printFormatter (alternative)
        ├── ✅ UIMarkupTextPrintFormatter
        ├── ✅ UISimpleTextPrintFormatter
        └── ✅ UIViewPrintFormatter (from WKWebView)
```

**Apple Documentation:**
- https://developer.apple.com/documentation/uikit/uiprintinteractioncontroller
- Property `printingItem` **KHÔNG** nhận HTML string

---

## Các plugin Cordova hiện có:

### **1. cordova-plugin-printer** (Most Popular)

**Repository:** https://github.com/katzer/cordova-plugin-printer

**iOS Implementation:**
```objectivec
// APPPrinter.m (iOS native code)
- (void)print:(CDVInvokedUrlCommand*)command {
    NSString* content = [command.arguments objectAtIndex:0];
    
    // iOS chỉ xử lý được:
    if ([content hasPrefix:@"file://"]) {
        // ✅ File path
        NSURL *url = [NSURL URLWithString:content];
        printController.printingItem = url;
    } 
    else if ([content hasPrefix:@"<html"]) {
        // ❌ HTML string - KHÔNG thể print trực tiếp
        // Phải convert qua WKWebView
        [self printHTML:content withController:printController];
    }
}

- (void)printHTML:(NSString*)html withController:(UIPrintInteractionController*)controller {
    // Tạo WKWebView ẩn
    WKWebView *webView = [[WKWebView alloc] initWithFrame:CGRectZero];
    
    // Load HTML vào WebView
    [webView loadHTMLString:html baseURL:nil];
    
    // Đợi WebView load xong (DELAY)
    dispatch_after(dispatch_time(DISPATCH_TIME_NOW, 2 * NSEC_PER_SEC), dispatch_get_main_queue(), ^{
        // Lấy printFormatter từ WebView
        controller.printFormatter = webView.viewPrintFormatter;
        
        // Hiển thị print dialog
        [controller presentAnimated:YES completionHandler:nil];
    });
}
```

**Vấn đề:**
- ❌ Cần delay để WebView render HTML
- ❌ Không có "preview" thực sự (chỉ có print dialog)
- ❌ Phức tạp với HTML có CSS/images

---

### **2. cordova-plugin-html2pdf**

**Repository:** https://github.com/martinotin/cordova-plugin-html2pdf

**Workflow:**
```javascript
// Client-side
cordova.plugins.html2pdf.convertToPDF({
    html: htmlString,
    fileName: 'document.pdf'
}, function(pdfPath) {
    // pdfPath = file:///path/to/document.pdf
    cordova.plugins.printer.print(pdfPath); // Vẫn phải dùng printer plugin
});
```

**Vẫn phải:**
1. Convert HTML → PDF (tạo file)
2. Dùng printer plugin để in file

---

### **3. @ionic-native/printer** (Wrapper)

```typescript
import { Printer } from '@ionic-native/printer/ngx';

this.printer.print(htmlString).then(() => {
    // Internally vẫn phải convert HTML
});
```

**Bản chất:** Wrapper của `cordova-plugin-printer`, không thay đổi logic

---

## So sánh các approach:

| Method | Preview | Direct Print | No File | iOS Support |
|--------|---------|--------------|---------|-------------|
| **Native UIPrintInteractionController** | ✅ | ✅ | ❌ (need file) | ✅ |
| **cordova-plugin-printer** | ❌ (dialog only) | ✅ | ❌ (convert via WebView) | ⚠️ Limited |
| **WKWebView + printFormatter** | ✅ | ✅ | ✅ (in-memory) | ✅ |
| **HTML → PDF → Print** | ✅ | ✅ | ❌ (temp file) | ✅ |

---

## ✅ Giải pháp tối ưu: Custom Plugin với WKWebView

### **Tạo custom Cordova plugin:**

````javascript
// Plugin.xml
<?xml version="1.0" encoding="UTF-8"?>
<plugin id="cordova-plugin-html-printer" version="1.0.0">
    <name>HTML Printer</name>
    <js-module src="www/HTMLPrinter.js" name="HTMLPrinter">
        <clobbers target="cordova.plugins.HTMLPrinter" />
    </js-module>
    
    <platform name="ios">
        <source-file src="src/ios/HTMLPrinter.swift" />
    </platform>
</plugin>
````

````swift
// src/ios/HTMLPrinter.swift
import UIKit
import WebKit

@objc(HTMLPrinter)
class HTMLPrinter: CDVPlugin {
    
    var currentWebView: WKWebView?
    var currentCommand: CDVInvokedUrlCommand?
    
    @objc(print:)
    func print(command: CDVInvokedUrlCommand) {
        let htmlContent = command.arguments[0] as! String
        
        DispatchQueue.main.async {
            // Tạo WKWebView ẩn
            let webView = WKWebView(frame: .zero)
            self.currentWebView = webView
            self.currentCommand = command
            
            // Set delegate để detect load complete
            webView.navigationDelegate = self
            
            // Load HTML
            webView.loadHTMLString(htmlContent, baseURL: nil)
        }
    }
}

extension HTMLPrinter: WKNavigationDelegate {
    func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
        // HTML đã load xong, hiển thị print dialog
        let printInfo = UIPrintInfo(dictionary: nil)
        printInfo.outputType = .general
        printInfo.jobName = "Document"
        
        let printController = UIPrintInteractionController.shared
        printController.printInfo = printInfo
        
        // ✅ SỬ DỤNG printFormatter từ WebView (KHÔNG cần file)
        printController.printFormatter = webView.viewPrintFormatter
        
        // Hiển thị print preview dialog
        printController.present(animated: true) { (controller, completed, error) in
            var result: CDVPluginResult
            
            if completed && error == nil {
                result = CDVPluginResult(status: CDVCommandStatus_OK)
            } else {
                result = CDVPluginResult(
                    status: CDVCommandStatus_ERROR,
                    messageAs: error?.localizedDescription
                )
            }
            
            self.commandDelegate.send(result, callbackId: self.currentCommand?.callbackId)
            
            // Cleanup
            self.currentWebView = nil
        }
    }
    
    func webView(_ webView: WKWebView, didFail navigation: WKNavigation!, withError error: Error) {
        let result = CDVPluginResult(
            status: CDVCommandStatus_ERROR,
            messageAs: error.localizedDescription
        )
        self.commandDelegate.send(result, callbackId: self.currentCommand?.callbackId)
    }
}
````

````javascript
// www/HTMLPrinter.js
var exec = require('cordova/exec');

var HTMLPrinter = {
    print: function(htmlContent, successCallback, errorCallback) {
        exec(successCallback, errorCallback, "HTMLPrinter", "print", [htmlContent]);
    }
};

module.exports = HTMLPrinter;
````

---

### **Sử dụng trong project:**

````javascript
$scope.printPDF = function (data) {
    getFilePDFDocument(data._id, 'PRINT_PDF').then(function(dataResponse) {
        if ($rootScope.appType === AppTypeConst.APP) {
            if ($rootScope.DeviceType === 'ios') {
                // ✅ iOS: Print HTML trực tiếp, có preview dialog
                cordova.plugins.HTMLPrinter.print(dataResponse, 
                    function() {
                        console.log('Print success');
                    }, 
                    function(error) {
                        console.error('Print error:', error);
                    }
                );
            } else {
                // Android: Print HTML trực tiếp
                $cordovaPrinter.print(dataResponse);
            }
        } else {
            // Web
            var urlPdf = $rootScope.host + 'api/v2ViewNoteFilePDF?type=view&pathPDFFile=' + dataResponse;
            printJS({ printable: urlPdf, type: 'pdf', showModal: true });
        }
    });
}
````

---

## Ưu/Nhược điểm:

### ✅ **Ưu điểm:**
- In HTML trực tiếp trên iOS
- Có print preview dialog (native iOS UI)
- Không cần tạo file vật lý
- Xử lý trong memory

### ❌ **Nhược điểm:**
- Phải viết custom plugin
- Có delay nhỏ (WebView render time)
- HTML phức tạp có thể render sai
- Cần maintain native code

---

## Kết luận:

**Câu trả lời:** 
1. ❌ **KHÔNG** có plugin Cordova sẵn có cho print preview HTML trực tiếp trên iOS
2. ✅ **CÓ THỂ** tạo custom plugin sử dụng WKWebView + printFormatter
3. ⚠️ Approach tốt nhất vẫn là: **Backend trả về PDF filename → Download → Print** (như code hiện tại trong `treamentNoteATP.js`)

**Code hiện tại của bạn trong documentsATP.js SAI vì:**
```javascript
cordova.plugins.printer.print(dataResponse, options, function (res) {
    // dataResponse là HTML string hoặc filename
    // iOS KHÔNG thể print trực tiếp
});
```

**Nên sửa thành:**
```javascript
var pdfUrl = $rootScope.host + 'api/v2ViewNoteFilePDF?type=download&pathPDFFile=' + dataResponse;
downloadService.download(pdfUrl, dataResponse).then(function(fileURI) {
    cordova.plugins.printer.print(fileURI, options);
});
```