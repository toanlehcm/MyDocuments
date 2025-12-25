# So sánh 2 cách khai báo function trong AngularJS

## 📝 Phân tích 2 cách viết:

### **Cách 1: Function Expression (Anonymous Function)**
```javascript
$scope.printPDF = function(data) {
    if (!data || !data._id) {
        console.error('print_PDF: Invalid treatment note data');
        return;
    }
    // ...
}
```

### **Cách 2: Function Declaration (Named Function)**
```javascript
function isSafari_On_Device() {
    return common.isSafari_On_Device();
}
```

---

## 🔍 Đặc điểm từng loại:

| Tiêu chí | Function Expression | Function Declaration |
|----------|-------------------|---------------------|
| **Hoisting** | ❌ KHÔNG hoisting | ✅ CÓ hoisting (có thể gọi trước khi khai báo) |
| **Scope** | Gán vào biến/object | Function scope/Global scope |
| **Named/Anonymous** | Thường anonymous | Luôn có tên |
| **Use case** | Public API (gắn vào [`$scope`]treamentNoteATP.js )) | Private helper function |
| **Stack trace** | Khó debug (anonymous) | ✅ Dễ debug (có tên rõ ràng) |

---

## ✅ Khi nào dùng Function Expression (`$scope.function`):

### **Use case:**
```javascript
// 1. Public methods - expose cho View (HTML) sử dụng
$scope.printPDF = function(data) { /*...*/ }
$scope.downloadPDF = function(data) { /*...*/ }
$scope.selectTreatmentNote = function(note) { /*...*/ }

// 2. Event handlers
$scope.onClickButton = function() { /*...*/ }
$scope.handleChange = function(data) { /*...*/ }

// 3. Callback functions
var successCallback = function(response) { /*...*/ }
```

### **Ưu điểm:**
- ✅ Rõ ràng là **public API** (dùng trong View)
- ✅ Kiểm soát được **scope** chặt chẽ
- ✅ Dễ test (mock [`$scope`]treamentNoteATP.js ) object)
- ✅ Angular convention

### **Nhược điểm:**
- ❌ Không hoisting → phải khai báo trước khi dùng
- ⚠️ Anonymous → khó debug stack trace

---

## ✅ Khi nào dùng Function Declaration (`function name()`):

### **Use case:**
```javascript
// 1. Private helper functions (không expose ra View)
function isSafari_On_Device() {
    return common.isSafari_On_Device();
}

function validateInput(data) {
    return data && data._id;
}

function formatDate(date) {
    return moment(date).format('DD/MM/YYYY');
}

// 2. Utility functions dùng nhiều lần
function getFilePDFDocument(documentId, mode, coverInfo) {
    // ...
}

// 3. Recursive functions
function traverseTree(node) {
    if (node.children) {
        node.children.forEach(traverseTree);
    }
}
```

### **Ưu điểm:**
- ✅ Hoisting → có thể gọi ở bất kỳ đâu trong scope
- ✅ **Named function** → dễ debug, stack trace rõ ràng
- ✅ Self-documenting code
- ✅ Tốt cho recursive

### **Nhược điểm:**
- ⚠️ Nếu không cẩn thận có thể gây **global namespace pollution**

---

## 🎯 Best Practice cho Angular Controller:

````javascript
angular.module('PtEMobile')
.controller('TreatmentNoteATPCtrl', function (
    $scope,
    $rootScope,
    api,
    // ... dependencies
) {
    // =============================================
    // 1. PRIVATE HELPER FUNCTIONS (Đầu tiên)
    // =============================================
    
    /**
     * Kiểm tra device có phải Safari không
     * @returns {boolean}
     */
    function isSafari_On_Device() {
        return common.isSafari_On_Device();
    }
    
    /**
     * Validate dữ liệu treatment note
     * @param {Object} data - Treatment note data
     * @returns {boolean}
     */
    function validateTreatmentNote(data) {
        return data && data._id;
    }
    
    /**
     * Xuất PDF document
     * @param {string} documentId
     * @param {string} mode
     * @param {Object} coverInfo
     * @returns {Promise}
     */
    function getFilePDFDocument(documentId, mode, coverInfo) {
        return $q(function (resolve, reject) {
            if (!documentId) {
                reject('Invalid documentId');
                return;
            }
            
            var options = {
                spinner: true,
                requestType: requestType.POST,
                reqFrom: $rootScope.page
            };
            
            var param = {
                documentId: documentId
            };
            
            var isApp = $rootScope.appType === AppTypeConst.APP;
            var isWeb = $rootScope.appType === AppTypeConst.WEB;
            var isAndroid = $rootScope.DeviceType === 'android';
            var isSafari = isSafari_On_Device();
            
            if (mode === 'PRINT_PDF') {
                if (isApp) {
                    param.documentType = isAndroid ? "html" : "print_app";
                } else if (isWeb && (isSafari || isAndroid)) {
                    param.documentType = "print_app";
                }
            }
            
            if (mode === "COPY_DOCUMENT") {
                param.documentType = "content_html";
            }
            
            if (coverInfo) {
                param.coverInfo = coverInfo;
            }
            
            api.call('v2ExportToDocumentFileATP', param, options).then(
                function (response) {
                    if (response.errorCode) {
                        reject(response.errorCode);
                        return;
                    }
                    
                    if (response.data) {
                        resolve(response.data);
                    } else {
                        reject("No data in response");
                    }
                },
                function (errorCode) {
                    console.log("getFilePDFDocument: API call failed -", errorCode);
                    reject(errorCode);
                }
            );
        });
    }
    
    // =============================================
    // 2. PUBLIC API METHODS (Expose to View)
    // =============================================
    
    /**
     * In PDF treatment note
     * @param {Object} data - Treatment note data
     */
    $scope.printPDF = function(data) {
        // Validate input
        if (!validateTreatmentNote(data)) {
            console.log('printPDF: Invalid treatment note data');
            return;
        }
        
        // Gọi helper function
        getFilePDFDocument(data._id, 'PRINT_PDF').then(function (dataResponse) {
            if (!dataResponse) {
                console.log('printPDF: Invalid response from server');
                return;
            }
            
            var pdfFileName = dataResponse;
            var isApp = $rootScope.appType === AppTypeConst.APP;
            var isAndroid = $rootScope.DeviceType === 'android';
            
            if (isApp) {
                if (isAndroid) {
                    $cordovaPrinter.print(pdfFileName);
                } else {
                    var urlPdf = $rootScope.host + 'api/v2ViewNoteFilePDF?type=download&pathPDFFile=' + pdfFileName;
                    
                    downloadService.download(urlPdf, pdfFileName).then(
                        function (fileURI) {
                            if (fileURI) {
                                $cordovaPrinter.print(fileURI);
                            } else {
                                console.log('printPDF: Download success but fileURI is empty');
                            }
                        },
                        function (error) {
                            console.log('printPDF: Download failed -', error);
                        }
                    );
                }
            } else {
                var urlPdf = $rootScope.host + 'api/v2ViewNoteFilePDF?type=view&pathPDFFile=' + pdfFileName;
                
                printJS({
                    printable: urlPdf,
                    type: 'pdf',
                    showModal: true
                });
            }
        }).catch(function(error) {
            console.log('printPDF: Failed to get PDF document -', error);
        });
    };
    
    /**
     * Download PDF treatment note
     * @param {Object} data - Treatment note data
     */
    $scope.downloadPDF = function(data) {
        if (!validateTreatmentNote(data)) {
            console.log('downloadPDF: Invalid treatment note data');
            return;
        }
        
        // Implementation...
    };
    
    // =============================================
    // 3. INITIALIZATION
    // =============================================
    
    function init() {
        // Load data, setup...
    }
    
    init();
});
````

---

## 📊 Tổng kết Best Practice:

### ✅ **Function Declaration** (Named Function) cho:

1. **Private helper functions** không expose ra View
2. **Utility functions** dùng nhiều lần
3. **Complex logic** cần tách riêng
4. Khi cần **hoisting** (gọi trước khi khai báo)
5. Khi cần **named function** cho debugging

```javascript
function isSafari_On_Device() { /*...*/ }
function validateInput(data) { /*...*/ }
function getFilePDFDocument() { /*...*/ }
```

### ✅ **Function Expression** (gán vào `$scope`) cho:

1. **Public API** - methods dùng trong View (HTML)
2. **Event handlers** - `ng-click`, `ng-change`
3. **Angular convention** - rõ ràng là public

```javascript
$scope.printPDF = function(data) { /*...*/ }
$scope.downloadPDF = function(data) { /*...*/ }
$scope.onClickButton = function() { /*...*/ }
```

---

## 💡 Code Quality Checklist:

| Tiêu chí | Function Declaration | Function Expression |
|----------|---------------------|-------------------|
| **Clean Code** | ✅ Named, self-documenting | ⚠️ Cần named cho debug |
| **Product Code** | ✅ Stable, tested | ✅ Stable, tested |
| **Null Safety** | ✅ Với proper validation | ✅ Với proper validation |
| **Performance** | ✅ Tương đương | ✅ Tương đương |
| **Maintainable** | ✅ Dễ tìm, dễ sửa | ✅ Rõ ràng scope |
| **Developable** | ✅ Flexible | ✅ Angular convention |
| **Reusable** | ✅ Dễ extract thành service | ⚠️ Tied to controller |
| **Best Practice** | ✅ For utilities | ✅ For public API |

---

## 🎯 Kết luận:

**Trong Angular Controller:**

```javascript
// ✅ ĐÚNG
function isSafari_On_Device() {           // Private helper
    return common.isSafari_On_Device();
}

$scope.printPDF = function(data) {        // Public API
    if (!validateTreatmentNote(data)) return;
    // ...
}

// ❌ SAI
$scope.isSafari_On_Device = function() {  // Không cần expose
    return common.isSafari_On_Device();
}

function printPDF(data) {                 // Không thể dùng trong View
    // ...
}
```

**Best Practice:**
- ✅ **Private helpers** → Function Declaration (đầu file)
- ✅ **Public API** → Function Expression gán vào [`$scope`]treamentNoteATP.js )
- ✅ Luôn có **JSDoc comments**
- ✅ Luôn **validate input**
- ✅ **Named function** cho debugging
- ✅ **Consistent error handling**