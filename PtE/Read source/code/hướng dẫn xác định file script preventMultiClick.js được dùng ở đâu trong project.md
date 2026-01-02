# Hướng dẫn xác định file preventMultiClicks.js được dùng ở đâu

## 📘 File này là gì?

**preventMultiClicks.js** là một **decorator** (trang trí) cho directive `ng-click` của AngularJS - tự động **ngăn chặn double-click** (nhấp đúp) trên TẤT CẢ các nút trong toàn bộ app.

---

## 🎯 Cách hoạt động:

### **1. Decorator pattern:**

```javascript
angular.module('PtEMobile')
  .config(['$provide', function ($provide) {
    // Decorate (modify) existing ngClickDirective
    $provide.decorator('ngClickDirective', ...);
  }])
```

**Meaning:** "Wrap" (bọc) directive `ng-click` có sẵn với logic mới

---

### **2. What it does:**

```javascript
// Original ng-click behavior:
<button ng-click="save()">Save</button>
// User can click multiple times rapidly → save() called multiple times

// After decorator applied:
<button ng-click="save()">Save</button>
// User clicks → save() called
// User clicks again within 500ms → BLOCKED!
// After 500ms → Can click again
```

**Purpose:** Prevent duplicate API calls, form submissions, etc.

---

## 🔍 Cách xác định file này được dùng ở đâu:

### **Method 1: Check `index.html` (QUAN TRỌNG NHẤT)**

```bash
# Search in index.html for script include
grep -i "preventMultiClicks" app/index.html
```

**Expect to find:**
```html
<!DOCTYPE html>
<html>
<head>
  <!-- ... -->
</head>
<body>
  <!-- App content -->
  
  <!-- Load decorator BEFORE controllers -->
  <script src="scripts/decorator/preventMultiClicks.js"></script>
  
  <!-- Then controllers -->
  <script src="scripts/controllers/patientDashboard/treamentNoteATP.js"></script>
  <!-- ... -->
</body>
</html>
```

---

### **Method 2: Check build configuration (Gruntfile.js/webpack)**

```bash
# Search in Gruntfile.js
grep -i "preventMultiClicks" Gruntfile.js
```

**Expect to find:**
```javascript
// Gruntfile.js
concat: {
  dist: {
    src: [
      'app/scripts/app.js',
      'app/scripts/decorator/preventMultiClicks.js',  // ✅ Included in build
      'app/scripts/controllers/**/*.js',
      // ...
    ]
  }
}
```

---

### **Method 3: Search cho `ng-click` usage trong codebase**

```bash
# Count how many ng-click in project
grep -r "ng-click" app/views/ | wc -l
grep -r "ng-click" app/scripts/ | wc -l
```

**Result:** Decorator applies to ALL `ng-click` directives automatically!

---

### **Method 4: Check `app.js` dependencies**

```bash
# Check if decorator is required in app.js
grep -i "preventMultiClicks" app/scripts/app.js
```

**Note:** Decorator doesn't need explicit import, it's loaded via `index.html`

---

## 📊 File này được dùng ở đâu? **EVERYWHERE!**

### **Vì đây là decorator, nó tự động apply cho:**

```
✅ ALL ng-click directives in entire app
   - All buttons with ng-click
   - All links with ng-click
   - All elements with ng-click
```

**Examples:**

```html
<!-- Treatment Notes -->
<button ng-click="saveNote()">Save</button>
<!-- ✅ Decorator automatically applies -->

<!-- Patient Dashboard -->
<button ng-click="printPDF()">Print</button>
<!-- ✅ Decorator automatically applies -->

<!-- Document Templates -->
<button ng-click="saveTemplate()">Save Template</button>
<!-- ✅ Decorator automatically applies -->

<!-- Appointments -->
<button ng-click="bookAppointment()">Book</button>
<!-- ✅ Decorator automatically applies -->
```

---

## 🔍 Tìm tất cả nơi có ng-click:

### **Command 1: Find all ng-click in HTML views**

```bash
# Windows Command Prompt
cd d:\SVN\Pte-7275\Client\app
findstr /s /i "ng-click" views\*.html

# Git Bash / Linux / Mac
grep -r "ng-click" app/views/ --include="*.html"
```

**Output example:**
```
views/patientDashboard/treamentNoteATP.html:245:  <button ng-click="saveNote()">Save</button>
views/patientDashboard/treamentNoteATP.html:567:  <button ng-click="printPDF()">Print</button>
views/accountSettings/documentTemplatesATP.html:89:  <button ng-click="saveTemplate()">Save</button>
... (hundreds of results)
```

---

### **Command 2: Count ng-click usage**

```bash
# Count total ng-click in views
grep -r "ng-click" app/views/ --include="*.html" | wc -l

# Count by file
grep -r "ng-click" app/views/ --include="*.html" | cut -d: -f1 | sort | uniq -c | sort -rn
```

**Output example:**
```
156 app/views/patientDashboard/treamentNoteATP.html
89 app/views/accountSettings/documentTemplatesATP.html
67 app/views/scheduler/schedulerATP.html
...
```

---

### **Command 3: Find ng-click in controllers**

```bash
# Some controllers use ng-click dynamically
grep -r "ng-click" app/scripts/controllers/ --include="*.js"
```

---

## 📊 Specific examples từ codebase:

### **Example 1: Treatment Notes (treamentNoteATP.html)**

```html
<!-- Multiple buttons protected by decorator -->
<button ng-click="$ctrl.printPDF(note)">
  Print PDF
</button>

<button ng-click="$ctrl.saveNote()">
  Save Note
</button>

<button ng-click="$ctrl.signNote()">
  Sign Note
</button>

<!-- ✅ All automatically protected from double-click -->
```

---

### **Example 2: Document Templates (documentTemplatesATP.html)**

```html
<button ng-click="saveTemplate()">
  Save Template
</button>

<button ng-click="deleteTemplate()">
  Delete Template
</button>

<button ng-click="duplicateTemplate()">
  Duplicate
</button>

<!-- ✅ All automatically protected -->
```

---

### **Example 3: Patient Dashboard (mainDashboardATP.html)**

```html
<button ng-click="loadPatientData()">
  Refresh
</button>

<button ng-click="exportToCSV()">
  Export
</button>

<!-- ✅ All automatically protected -->
```

---

## 🚨 Bypass double-click prevention:

### **For specific buttons that NEED rapid clicks:**

```html
<!-- Use bypass attribute -->
<button 
  ng-click="increment()"
  bypass-double-click-prevention>
  +
</button>

<!-- This button can be clicked rapidly -->
```

**Code in decorator checks for this:**
```javascript
if (evt.target.attributes["bypass-double-click-prevention"]) {
  return;  // Skip prevention
}
```

---

## 📊 How to verify decorator is working:

### **Method 1: Console log**

```javascript
// Decorator already has console.log
console.log('prevent multiClick')
```

**Test:**
```
1. Open DevTools (F12)
2. Click any button with ng-click rapidly
3. See console logs:
   prevent multiClick
   prevent multiClick (blocked)
   prevent multiClick (blocked)
```

---

### **Method 2: Network tab**

```
1. Open DevTools → Network tab
2. Click "Save" button rapidly
3. See only ONE API request (not multiple)
```

---

### **Method 3: Add custom logging**

```javascript
// Modify preventMultiClicks.js temporarily
function onElementClick(evt) {
  console.log('Button clicked:', element[0].innerText);
  console.log('Disabled:', disabled);
  
  if (disabled) {
    console.log('❌ CLICK BLOCKED');
    evt.preventDefault();
    evt.stopImmediatePropagation();
  } else {
    console.log('✅ CLICK ALLOWED');
    disabled = true;
    $timeout(function () { 
      console.log('⏰ Re-enabled after 500ms');
      disabled = false; 
    }, delay, false);
  }
}
```

---

## 📊 Summary:

| Question | Answer |
|----------|--------|
| **File này dùng ở đâu?** | **EVERYWHERE** - All ng-click directives in entire app |
| **Tự động apply?** | ✅ YES - No need to add anything, just include script |
| **Làm sao tìm usage?** | Search for `ng-click` in HTML views |
| **Có thể bypass?** | ✅ YES - Use `bypass-double-click-prevention` attribute |
| **Delay time** | 500ms (0.5 seconds) between clicks |
| **Có cần import?** | ❌ NO - Just include in index.html |

---

## ✅ Complete search commands:

````bash
# 1. Check if included in index.html
grep -i "preventMultiClicks" app/index.html

# 2. Find all ng-click in views
grep -r "ng-click" app/views/ --include="*.html" > ng-click-usage.txt

# 3. Count ng-click per file
grep -r "ng-click" app/views/ --include="*.html" | cut -d: -f1 | sort | uniq -c | sort -rn

# 4. Find buttons with ng-click
grep -r '<button.*ng-click' app/views/ --include="*.html"

# 5. Find links with ng-click
grep -r '<a.*ng-click' app/views/ --include="*.html"

# 6. Find bypass usage
grep -r "bypass-double-click-prevention" app/views/ --include="*.html"

# 7. Check Gruntfile for build inclusion
grep -i "preventMultiClicks" Gruntfile.js
````

---

## 🎯 Kết luận:

**File preventMultiClicks.js không được "dùng" ở một nơi cụ thể - nó là một GLOBAL decorator tự động áp dụng cho TẤT CẢ các `ng-click` trong toàn bộ ứng dụng!**

**To find where it's applied:**
```
1. ✅ Check index.html (script include)
2. ✅ Search for ALL ng-click directives
3. ✅ Every ng-click = decorator applies
```

**It protects these common scenarios:**
- ✅ Duplicate form submissions
- ✅ Multiple API calls from one action
- ✅ Accidental double-clicks on save/delete/print buttons
- ✅ Rapid clicking on navigation buttons