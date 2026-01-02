# Folder `lib/` - Third-party Libraries

## 📘 `lib/` là gì?

**`lib/`** (viết tắt của **libraries**) là folder chứa **third-party JavaScript libraries** (thư viện của bên thứ 3) mà app sử dụng - những thư viện không được cài qua npm/bower hoặc cần custom version.

---

## 🎯 Dùng để làm gì?

### **1. Store external libraries manually:**

```
lib/
├── actionhero/          ← Custom library
├── angular-daterangepicker/  ← Date picker UI
├── angular-location-update/  ← Location service
├── appsignal/          ← Error tracking (custom build)
├── audioRecorder/      ← Audio recording utility
├── bootstrap-daterangepicker/
├── ckeditor/           ← Rich text editor
├── clientjs/           ← Browser fingerprinting
├── DateJS/             ← Date manipulation
├── dhtmlxlst_v51_std/  ← Grid/list component
├── dump/               ← Debug utilities
├── fontawesome-pro-*/  ← Icon fonts
├── fonts/              ← Custom fonts
├── google-api/         ← Google APIs
├── icheck/             ← Checkbox/radio styling
├── intl-tel-input/     ← Phone number input
├── ion-icon/           ← Icon library
├── jquery-ui-*/        ← jQuery UI
├── lodash/             ← Utility functions
├── md-date-range-picker/ ← Material date picker
├── mdr-angular-select2/ ← Select2 dropdown
├── moment/             ← Date/time library
├── pdf/                ← PDF utilities
├── popper/             ← Tooltip positioning
└── Printjs/            ← Print functionality
```

---

## 📊 Why use `lib/` folder?

### **Comparison with npm/bower:**

| Method | Location | Use Case |
|--------|----------|----------|
| **npm/bower** | `node_modules/`, `bower_components/` | Standard packages |
| **lib/** | `app/lib/` | Custom builds, modified versions, unavailable on npm |

**Reasons to use `lib/`:**

```
✅ Library not available on npm/bower
✅ Need custom/modified version
✅ Need specific old version
✅ Vendor provided custom build
✅ Large files (don't want in node_modules)
✅ Non-standard distribution
```

---

## 🔍 Key libraries in your `lib/` folder:

### **1. `appsignal/` - Error tracking**

```javascript
// lib/appsignal/appsignal-init.js
import Appsignal from "@appsignal/javascript"
import { plugin } from "@appsignal/plugin-breadcrumbs-console"

const appsignal = new Appsignal({
  key: "your-frontend-api-key"
})

appsignal.use(plugin({}))
```

**Usage in app:**
```javascript
// Track errors
try {
  someFunction();
} catch (error) {
  appsignal.sendError(error);
}
```

---

### **2. `ckeditor/` - Rich text editor**

```html
<!-- Include in index.html -->
<script src="lib/ckeditor/ckeditor.js"></script>
```

**Usage:**
```javascript
// In treatment notes, SOAP notes, etc.
CKEDITOR.replace('textarea-id', {
  height: 300,
  toolbar: 'Basic'
});
```

---

### **3. `moment/` - Date/time manipulation**

```javascript
// lib/moment/moment.js
```

**Usage in controllers:**
```javascript
// Format dates
var formatted = moment(date).format('MM/DD/YYYY');

// Calculate date differences
var days = moment(endDate).diff(moment(startDate), 'days');

// Add/subtract dates
var nextWeek = moment().add(7, 'days');
```

---

### **4. `lodash/` - Utility functions**

```javascript
// lib/lodash/lodash.min.js
```

**Usage:**
```javascript
// Deep clone objects
var cloned = _.cloneDeep(originalObject);

// Find in array
var found = _.find(patients, { id: patientId });

// Group by
var grouped = _.groupBy(appointments, 'status');

// Debounce function
var debouncedSearch = _.debounce(searchFunction, 300);
```

---

### **5. `intl-tel-input/` - Phone number input**

```html
<!-- International phone input with country flags -->
<input type="tel" id="phone">
```

```javascript
// lib/intl-tel-input/js/intlTelInput.js
var input = document.querySelector("#phone");
window.intlTelInput(input, {
  initialCountry: "us",
  preferredCountries: ['us', 'ca']
});
```

---

### **6. `angular-daterangepicker/` - Date range picker**

```javascript
// lib/angular-daterangepicker/angular-daterangepicker.js
angular.module('app').directive('daterangepicker', ...);
```

**Usage:**
```html
<!-- In treatment note filters -->
<input type="text" 
       ng-model="dateRange" 
       daterangepicker 
       options="datePickerOptions">
```

---

### **7. `jquery-ui-1.12.1.custom/` - jQuery UI**

```javascript
// lib/jquery-ui-1.12.1.custom/jquery-ui.min.js
```

**Usage:**
```javascript
// Datepicker
$('#date-input').datepicker({
  dateFormat: 'mm/dd/yy'
});

// Autocomplete
$('#search').autocomplete({
  source: patientNames
});

// Dialog
$('#dialog').dialog({
  modal: true,
  width: 500
});
```

---

### **8. `fontawesome-pro-*/` - Icon fonts**

```html
<!-- Include in index.html -->
<link rel="stylesheet" href="lib/fontawesome-pro-6.4.0-web/css/all.css">
```

**Usage:**
```html
<!-- Icons throughout the app -->
<i class="fas fa-user"></i>
<i class="fas fa-calendar"></i>
<i class="fas fa-file-medical"></i>
```

---

### **9. `Printjs/` - Print functionality**

```javascript
// lib/Printjs/print.min.js
```

**Usage in your treamentNoteATP.js:**
```javascript
$scope.printPDF = function(data){
  getFilePDFTreatmentNote(data._id,'PRINT_PDF').then(function(dataResponse){
    if (!isApp) {
      // ✅ Uses PrintJS from lib/
      const urlPdf = $rootScope.host + 'api/v2ViewPDF?type=view&pathPDFFile=' + dataResponse;
      printJS({
        printable: urlPdf, 
        type: 'pdf', 
        showModal: true
      });
    }
  });
}
```

---

### **10. `audioRecorder/` - Audio recording**

```javascript
// lib/audioRecorder/audioRecorder.js
```

**Usage:**
```javascript
// Record voice notes in treatment documentation
var recorder = new AudioRecorder();
recorder.start();
// ... record audio
recorder.stop();
var audioBlob = recorder.getBlob();
```

---

## 🎯 Khi nào dùng?

### **1. Include in `index.html`:**

```html
<!DOCTYPE html>
<html>
<head>
  <!-- ✅ Load libraries from lib/ -->
  <script src="lib/moment/moment.min.js"></script>
  <script src="lib/lodash/lodash.min.js"></script>
  <script src="lib/ckeditor/ckeditor.js"></script>
  <script src="lib/Printjs/print.min.js"></script>
  
  <!-- App scripts -->
  <script src="scripts/app.js"></script>
</head>
<body>
  <!-- App content -->
</body>
</html>
```

---

### **2. Load dynamically when needed:**

```javascript
// Load CKEditor only when editing treatment notes
$scope.editNote = function() {
  // Check if CKEditor already loaded
  if (typeof CKEDITOR === 'undefined') {
    // Dynamically load
    var script = document.createElement('script');
    script.src = 'lib/ckeditor/ckeditor.js';
    script.onload = function() {
      initEditor();
    };
    document.head.appendChild(script);
  } else {
    initEditor();
  }
};
```

---

### **3. Import in build process:**

```javascript
// Gruntfile.js or webpack.config.js
module.exports = {
  entry: './app/scripts/app.js',
  resolve: {
    alias: {
      'moment': path.resolve(__dirname, 'app/lib/moment/moment.js'),
      'lodash': path.resolve(__dirname, 'app/lib/lodash/lodash.js')
    }
  }
};
```

---

## 📊 Library categories in your project:

### **UI Components:**

```javascript
✅ angular-daterangepicker   - Date range selection
✅ bootstrap-daterangepicker - Bootstrap date picker
✅ ckeditor                  - Rich text editor
✅ icheck                    - Styled checkboxes/radios
✅ intl-tel-input            - Phone number input
✅ md-date-range-picker      - Material date picker
✅ mdr-angular-select2       - Select2 dropdown
```

---

### **Date/Time:**

```javascript
✅ moment                    - Date manipulation
✅ DateJS                    - Date parsing
```

---

### **Icons & Fonts:**

```javascript
✅ fontawesome-pro-6.4.0-web - Font Awesome Pro
✅ fontawesome-pro-6.5.1-web - Updated version
✅ ion-icon                  - Ionic icons
✅ fonts/                    - Custom fonts
```

---

### **Utilities:**

```javascript
✅ lodash                    - Utility functions
✅ dump                      - Debug helpers
✅ clientjs                  - Browser fingerprinting
```

---

### **Data/Grid:**

```javascript
✅ dhtmlxlst_v51_std         - Data grid component
```

---

### **APIs:**

```javascript
✅ google-api                - Google APIs
✅ actionhero                - Custom API client
```

---

### **Media:**

```javascript
✅ audioRecorder             - Audio recording
✅ pdf                       - PDF utilities
✅ Printjs                   - Print functionality
```

---

### **Forms:**

```javascript
✅ angular-location-update   - Location autocomplete
✅ jquery-ui-1.12.1.custom   - jQuery UI widgets
```

---

### **Monitoring:**

```javascript
✅ appsignal                 - Error tracking & APM
```

---

## 🚨 Common patterns:

### **Pattern 1: Check if library loaded**

```javascript
// Check before using
if (typeof moment !== 'undefined') {
  var formatted = moment().format('MM/DD/YYYY');
} else {
  console.error('Moment.js not loaded');
}

// Check jQuery UI
if ($.fn.datepicker) {
  $('#date').datepicker();
}

// Check lodash
if (typeof _ !== 'undefined') {
  var cloned = _.cloneDeep(obj);
}
```

---

### **Pattern 2: Lazy loading**

```javascript
// Load library only when needed
$scope.openEditor = function() {
  if (!window.CKEDITOR) {
    loadScript('lib/ckeditor/ckeditor.js').then(function() {
      CKEDITOR.replace('editor');
    });
  } else {
    CKEDITOR.replace('editor');
  }
};

function loadScript(url) {
  return new Promise(function(resolve, reject) {
    var script = document.createElement('script');
    script.src = url;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}
```

---

### **Pattern 3: Version management**

```javascript
// Multiple versions of same library
lib/
├── fontawesome-pro-6.4.0-web/   ← Old version
└── fontawesome-pro-6.5.1-web/   ← New version

// Load specific version
<link rel="stylesheet" href="lib/fontawesome-pro-6.5.1-web/css/all.css">
```

---

## 📊 Best practices:

### **1. Document library versions:**

````markdown
# Third-Party Libraries

## Date/Time
- **moment.js** v2.29.4 - Date manipulation
  - Source: https://momentjs.com/
  - License: MIT
  - Why in lib/: Need specific version for compatibility

## UI Components
- **CKEditor** v4.16.2 - Rich text editor
  - Source: https://ckeditor.com/
  - License: GPL/Commercial
  - Why in lib/: Custom build with specific plugins

## Icons
- **Font Awesome Pro** v6.5.1 - Icon library
  - Source: https://fontawesome.com/
  - License: Commercial
  - Why in lib/: Pro version not on npm

## Error Tracking
- **AppSignal** v1.6.1 - APM & Error tracking
  - Source: https://appsignal.com/
  - Why in lib/: Custom browserify bundle
  - Build: `npm run bundle:appsignal`
````

---

### **2. Keep libraries updated:**

```bash
# Check for updates
cd app/lib/moment
# Download new version
# Replace old files

# Update documentation
echo "Updated moment.js to v2.30.0" >> CHANGELOG.md
```

---

### **3. Minimize library count:**

```javascript
// ❌ DON'T: Multiple similar libraries
lib/moment/
lib/date-fns/
lib/dayjs/

// ✅ DO: Pick one
lib/moment/  // Choose one date library
```

---

## 🔍 Check what libraries are used:

### **Method 1: Check index.html:**

```bash
grep -r "<script src=\"lib/" app/index.html
grep -r "<link.*lib/" app/index.html
```

---

### **Method 2: Search in code:**

```bash
# Find moment usage
grep -r "moment(" app/scripts/

# Find lodash usage
grep -r "_\." app/scripts/

# Find CKEditor usage
grep -r "CKEDITOR" app/scripts/
```

---

### **Method 3: Check Gruntfile.js:**

```javascript
// Gruntfile.js - Libraries included in build
concat: {
  dist: {
    src: [
      'lib/moment/moment.min.js',
      'lib/lodash/lodash.min.js',
      'scripts/**/*.js'
    ]
  }
}
```

---

## 📊 Summary:

| Question | Answer |
|----------|--------|
| **`lib/` là gì?** | Folder for third-party libraries not installed via npm/bower |
| **Dùng để làm gì?** | Store custom builds, modified versions, unavailable packages |
| **Khi nào dùng?** | Load in index.html or dynamically when needed |
| **Có commit lên Git?** | ✅ YES - Team needs same library versions |
| **Có thể xóa?** | ❌ NO - App depends on these libraries |
| **Update như thế nào?** | Download new version, replace files, test thoroughly |

---

## ✅ Usage example from your code:

### **In your treamentNoteATP.js:**

```javascript
// Uses multiple lib/ libraries:

// 1. Moment.js for dates
var appointmentDate = moment(appointment.date).format('MM/DD/YYYY');

// 2. Lodash for utilities
var uniquePatients = _.uniqBy(patients, 'id');

// 3. PrintJS for printing
if (!isApp) {
  printJS({
    printable: pdfUrl,
    type: 'pdf',
    showModal: true
  });
}

// 4. CKEditor for rich text (if editing notes)
CKEDITOR.replace('note-content', {
  height: 300
});
```

---

**`lib/` is your toolbox of external libraries that aren't managed by npm/bower - keep them organized, documented, and updated!**