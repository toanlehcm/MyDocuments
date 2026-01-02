# Giải thích Controller Declaration - AdminDocumentTemplatesCtrl

## 📘 Đoạn code này là gì?

Đây là **declaration** (khai báo) của một **AngularJS Controller** có tên `AdminDocumentTemplatesCtrl` - controller quản lý **Document Templates** (mẫu tài liệu) trong module Account Settings.

---

## 🎯 Cấu trúc và giải thích:

### **1. Module Declaration:**

```javascript
angular.module('PtEMobile')
```

**Meaning:** Lấy module `PtEMobile` đã được định nghĩa (trong `app.js`)

**Equivalent to:**
```javascript
var app = angular.module('PtEMobile');
app.controller('AdminDocumentTemplatesCtrl', ...);
```

---

### **2. Controller Declaration:**

```javascript
.controller('AdminDocumentTemplatesCtrl', function(...) {
  // Controller code here
})
```

**Meaning:** Định nghĩa một controller với tên `AdminDocumentTemplatesCtrl`

**Purpose:** Quản lý logic cho trang Document Templates (tạo, sửa, xóa, share templates)

---

### **3. Dependency Injection (17 dependencies):**

```javascript
function (
  $mdToast,           // Material Design toast notifications
  $scope,             // AngularJS scope object
  $rootScope,         // Global scope
  $routeParams,       // URL route parameters
  $http,              // HTTP service
  $location,          // URL manipulation
  $window,            // Browser window object
  $timeout,           // Timeout service (like setTimeout)
  $sce,               // Strict Contextual Escaping (HTML sanitization)
  $translate,         // i18n translation service
  api,                // Custom API service (backend calls)
  SchedulerRepository,// Scheduler data repository
  $mdDialog,          // Material Design dialog/modal
  $q,                 // Promise service
  $cordovaPrinter,    // Cordova printer plugin (mobile)
  downloadService,    // Custom file download service
  viewerService,      // Document viewer service
  commonService       // Common utility service
) {
  // Controller logic
}
```

---

## 📊 Chi tiết từng dependency:

### **1. `$mdToast` - Toast Notifications:**

```javascript
// Show success message
$mdToast.show(
  $mdToast.simple()
    .textContent('Template saved successfully!')
    .position('top right')
    .hideDelay(3000)
);
```

**Use case:** Show success/error notifications khi save/delete template

---

### **2. `$scope` - Controller Scope:**

```javascript
// Expose functions to view
$scope.saveTemplate = function() { ... };
$scope.deleteTemplate = function() { ... };

// Expose data to view
$scope.listMyDocumentCategories = [];
$scope.currentTemplate = {};
```

**Use case:** Bridge giữa controller logic và HTML view

---

### **3. `$rootScope` - Global Scope:**

```javascript
// Access global data
var userId = $rootScope.userId;
var clientId = $rootScope.clientId;
var deviceType = $rootScope.DeviceType;

// Check if mobile app
if ($rootScope.appType === AppTypeConst.APP) {
  // Mobile-specific code
}
```

**Use case:** Access user info, device info, global settings

---

### **4. `$routeParams` - URL Parameters:**

```javascript
// URL: /document-templates/:templateId
var templateId = $routeParams.templateId;

// URL: /document-templates?category=intake-forms
var category = $routeParams.category;
```

**Use case:** Get template ID from URL (if editing specific template)

---

### **5. `$http` - HTTP Requests:**

```javascript
// Direct HTTP call (less common, usually use 'api' service)
$http.post('/api/save-template', { templateData: data })
  .then(function(response) {
    console.log('Saved:', response.data);
  });
```

**Use case:** Backup for direct API calls (though `api` service is preferred)

---

### **6. `$location` - URL Navigation:**

```javascript
// Navigate to template list
$location.path('/document-templates');

// Navigate to edit template
$location.path('/document-templates/' + templateId);

// Get current path
var currentPath = $location.path(); // "/document-templates"
```

**Use case:** Navigate between pages, change URL

---

### **7. `$window` - Browser Window:**

```javascript
// Reload page
$window.location.reload();

// Open new window
$window.open(pdfUrl, '_blank');

// Get window size
var width = $window.innerWidth;
```

**Use case:** Browser operations, window management

---

### **8. `$timeout` - Delayed Execution:**

```javascript
// Wait 500ms before executing
$timeout(function() {
  $scope.showMessage = false;
}, 500);

// Cancel timeout
var timer = $timeout(...);
$timeout.cancel(timer);
```

**Use case:** Delay UI updates, debounce actions

---

### **9. `$sce` - HTML Sanitization:**

```javascript
// Trust HTML content (from rich text editor)
$scope.templateContent = $sce.trustAsHtml(htmlContent);

// Use in template:
// <div ng-bind-html="templateContent"></div>
```

**Use case:** Display HTML from CKEditor safely

---

### **10. `$translate` - Translations:**

```javascript
// Get translated text
var message = $translate.instant('ConfirmDeleteTemplate');
// Result: "Are you sure you want to delete this template?"

// Use in bootbox
bootbox.confirm($translate.instant('ConfirmDeleteTemplate'), ...);
```

**Use case:** Multi-language support (English, Vietnamese, etc.)

---

### **11. `api` - Backend API Service:**

```javascript
// Call backend API
var options = {
  spinner: true,
  requestType: requestType.POST,
  reqFrom: $rootScope.page
};

api.call('v4GetDocumentTemplatePtE', {
  templateId: templateId
}, options).then(
  function(response) {
    $scope.template = response.data;
  },
  function(error) {
    console.error('API error:', error);
  }
);
```

**Use case:** ALL backend API calls (get, save, delete templates)

**API endpoints used:**
```javascript
'v4GetDocumentCategoriesPtE'           // Get all categories
'v4GetDocumentTemplatePtE'             // Get single template
'v4GetTemplatesDataPtE'                // Get multiple templates
'v3SaveNoteFileTemplateByUser'         // Save template
'v3UpdateQuestionDocumentTemplate'     // Update question in template
'v4CreateUserDocumentCategoryPtE'      // Create category
'v4CreateClinicDocumentCategoryPtE'    // Create clinic category
```

---

### **12. `SchedulerRepository` - Scheduler Data:**

```javascript
// Access scheduler data (if needed)
var schedulerData = SchedulerRepository.getData();
```

**Use case:** (Possibly unused in this controller, leftover from copy-paste)

---

### **13. `$mdDialog` - Material Dialogs:**

```javascript
// Show dialog/modal
$mdDialog.show({
  controller: PopupController,
  templateUrl: 'views/popup.html',
  fullscreen: true,
  clickOutsideToClose: true,
  locals: { data: templateData }
}).then(
  function(result) {
    // User clicked confirm
    console.log('Result:', result);
  },
  function() {
    // User clicked cancel or closed dialog
  }
);
```

**Use case:** Show popups for:
- Add/Edit category
- Add intake form template
- Confirm delete
- Preview template

---

### **14. `$q` - Promises:**

```javascript
// Create promise
function getFilePDF(documentId) {
  return $q(function(resolve, reject) {
    // Async operation
    downloadService.download(url, fileName).then(
      function(fileUri) {
        resolve(fileUri);
      },
      function(error) {
        reject(error);
      }
    );
  });
}

// Use promise
getFilePDF(templateId).then(
  function(pdfUri) {
    $cordovaPrinter.print(pdfUri);
  },
  function(error) {
    console.error('Download failed:', error);
  }
);
```

**Use case:** Handle async operations (download → print flow)

---

### **15. `$cordovaPrinter` - Mobile Print:**

```javascript
// Print PDF (mobile only)
$scope.printPDF = function(templateId) {
  getFilePDF(templateId).then(function(fileUri) {
    if (isApp) {
      // ✅ Mobile app: Use Cordova printer
      $cordovaPrinter.print(fileUri);
    }
  });
};
```

**Use case:** Print templates on mobile devices

---

### **16. `downloadService` - File Downloads:**

```javascript
// Download file
downloadService.download(
  url,           // File URL
  fileName       // Local file name
).then(
  function(fileUri) {
    console.log('Downloaded to:', fileUri);
  },
  function(error) {
    console.error('Download failed:', error);
  }
);
```

**Use case:** Download PDF templates before printing/viewing

---

### **17. `commonService` - Common Utilities:**

```javascript
// Show confirmation popup
commonService.popupMessage(
  'Notice',                    // Title
  'Are you sure?',            // Message
  function() {                 // Confirm callback
    deleteTemplate();
  },
  function() {                 // Cancel callback
    console.log('Cancelled');
  },
  {
    popupSize: 'medium',
    cancelLabel: 'No'
  }
);
```

**Use case:** Common UI operations (popups, validations, formatting)

---

## 🔄 Controller workflow overview:

### **When page loads:**

```javascript
// 1. Controller initializes
initializer();
  ↓
// 2. Set up default values
initializeDefaultValues();
  ↓
// 3. Get all templates from backend
getAllTemplate();
  ↓
// 4. Get default customer experience template
getDefaultCustomerExperienceTemplate();
```

---

### **User actions:**

```javascript
// User clicks "Add Category"
$scope.addMyTemplateCategory()
  ↓
// Show add category form
$scope.addMyTemplateCategoryMode = true
  ↓
// User enters name and clicks save
$scope.saveMyTemplateCategory(categoryName)
  ↓
// Call API to create category
api.call('v4CreateUserDocumentCategoryPtE', { category: categoryName })
  ↓
// Refresh template list
getAllTemplate()
```

---

### **Edit template flow:**

```javascript
// User clicks "Edit" on template
$scope.editNoteFileTemplate(templateItem)
  ↓
// Get template details from backend
api.call('v4GetDocumentTemplatePtE', { templateId: templateItem._id })
  ↓
// Show edit form
$scope.mode = 'intake-form-template-edit'
$scope.currentIntakeFormTemplate = response.data
  ↓
// User makes changes and clicks save
$scope.saveIntakeFormTemplate()
  ↓
// Upload images (if any)
_handleUploadQuestionsImageToS3()
  ↓
// Save to backend
api.call('v3SaveNoteFileTemplateByUser', { noteFileTemplateData })
  ↓
// Show success message
$mdToast.show('Template saved!')
```

---

## 📊 Summary:

| Dependency | Purpose | Example Usage |
|------------|---------|---------------|
| **$mdToast** | Notifications | Show success/error messages |
| **$scope** | View binding | `$scope.templates = []` |
| **$rootScope** | Global data | `$rootScope.userId` |
| **$routeParams** | URL params | `$routeParams.templateId` |
| **$http** | HTTP calls | Direct API calls (rare) |
| **$location** | Navigation | `$location.path('/templates')` |
| **$window** | Browser window | `$window.open(url)` |
| **$timeout** | Delays | Debounce, delayed actions |
| **$sce** | HTML sanitization | Trust HTML content |
| **$translate** | i18n | Multi-language support |
| **api** | Backend API | All server communication |
| **SchedulerRepository** | Scheduler data | (Unused?) |
| **$mdDialog** | Modals/popups | Show dialogs |
| **$q** | Promises | Async operations |
| **$cordovaPrinter** | Mobile printing | Print on iOS/Android |
| **downloadService** | File downloads | Download PDFs |
| **commonService** | Utilities | Common UI operations |

---

## ✅ Key functions in this controller:

```javascript
// Category management
addMyTemplateCategory()           // Add personal category
addClinicTemplateCategory()       // Add clinic-wide category
saveMyTemplateCategory()          // Save personal category
saveClinicTemplateCategory()      // Save clinic category
deleteMyDocumentCategory()        // Delete personal category
deleteClinicDocumentCategory()    // Delete clinic category

// Template management
selectNoteFileTemplate()          // Open template for viewing
editNoteFileTemplate()            // Edit template
saveIntakeFormTemplate()          // Save template
removeNoteFileTemplate()          // Delete template
duplicateNoteFileTemplate()       // Copy template
changeSharedFile()                // Share/unshare template

// Template operations
addQuestionCallback()             // Add question to template
updateQuestionCallback()          // Update question
removeQuestionCallback()          // Delete question
cloneQuestionCallback()           // Duplicate question

// Print/Download
printingIntakeFormTemplate()      // Print template (mobile/web)
downloadIntakeFormTemplate()      // Download PDF
```

---

**This controller is the brain of the Document Templates page - it manages all template operations from creating categories to editing questions to printing PDFs!**