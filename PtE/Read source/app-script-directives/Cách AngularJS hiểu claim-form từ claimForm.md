# Cách AngularJS hiểu `<claim-form>` từ claimForm.js

## 📘 Giải thích:

**AngularJS tự động convert component name từ camelCase sang kebab-case!**

---

## 🎯 Automatic Name Conversion:

### **Component definition (camelCase):**

```javascript
angular.module("PtEMobile").component("claimForm", {  // ✅ camelCase
  templateUrl: "views/insurance/claimFormPtE.html",
  bindings: {
    data: "="
  },
  controller: [...]
});
```

---

### **HTML usage (kebab-case):**

```html
<claim-form 
    class="d-flex w-100 overflow-x-hidden scrollbar-version-two" 
    data="claimData">
</claim-form>
<!-- ✅ kebab-case - AngularJS automatically converts -->
```

---

## 📊 AngularJS Naming Convention Rules:

### **Component/Directive name conversion:**

```javascript
// JavaScript (camelCase) → HTML (kebab-case)

"claimForm"           → <claim-form>
"audioRecorder"       → <audio-recorder>
"customPagination"    → <custom-pagination>
"dateRangePicker"     → <date-range-picker>
"preventMultiClicks"  → <prevent-multi-clicks>
```

**Rule:** 
- Each capital letter becomes a hyphen + lowercase letter
- First letter stays lowercase

---

## 🔍 Step-by-step conversion:

### **Example: `claimForm` → `claim-form`**

```
claimForm
  ↓
c + laim + F + orm
  ↓
claim + F → claim-f
  ↓
claim-form
```

**Process:**
1. Start: `claimForm`
2. Find capital letter: `F`
3. Add hyphen before it: `claim-Form`
4. Convert to lowercase: `claim-form`

---

## 📊 More examples from your project:

### **1. Audio Recorder:**

```javascript
// Component definition
angular.module('PtEMobile').directive('audioRecorder', function() {
  return { ... };
});
```

**HTML usage:**
```html
<audio-recorder 
    id="note-audio"
    audio-model="note.audio">
</audio-recorder>
```

---

### **2. Custom Pagination:**

```javascript
// Component definition
angular.module('PtEMobile').component('customPagination', {
  bindings: { ... }
});
```

**HTML usage:**
```html
<custom-pagination 
    page-size="pageSizeInsuranceClaim" 
    total="totalPageInsuranceClaim">
</custom-pagination>
```

---

### **3. Date Range Picker:**

```javascript
// Directive definition
angular.module('PtEMobile').directive('dateRangePicker', function() {
  return { ... };
});
```

**HTML usage:**
```html
<date-range-picker 
    ng-model="dateRange"
    options="dateOptions">
</date-range-picker>
```

---

## 🎯 Why this works:

### **AngularJS normalization process:**

```
When AngularJS sees: <claim-form>

1. Normalizes HTML tag to camelCase:
   claim-form → claimForm

2. Looks up registered components:
   angular.module('PtEMobile').component('claimForm', ...)
   
3. Finds match!
   ✅ Component found: claimForm

4. Renders component
   Uses templateUrl: "views/insurance/claimFormPtE.html"
   Uses controller
   Binds data
```

---

## 📊 Complete flow for your `<claim-form>`:

### **Step 1: Component registration (claimForm.js)**

```javascript
angular.module("PtEMobile").component("claimForm", {
  templateUrl: "views/insurance/claimFormPtE.html",
  bindings: {
    data: "="  // Two-way binding for claimData
  },
  controller: function($scope, $rootScope, ...) {
    // Component logic
  }
});
```

---

### **Step 2: Load script in index.html**

```html
<script src="scripts/directives/claimForm.js"></script>
```

---

### **Step 3: Use in HTML (multiple places)**

```html
<!-- 1. In claimsATP.html (Patient Dashboard) -->
<div ng-if="isOpenClaimForm">
  <claim-form 
      class="d-flex w-100 overflow-x-hidden scrollbar-version-two" 
      data="claimData">
  </claim-form>
</div>

<!-- 2. In insurancePtE.html (Insurance Module) -->
<div ng-if="isOpenClaimForm">
  <claim-form 
      class="d-flex w-100 overflow-x-hidden p-3" 
      data="claimData" 
      callback="">
  </claim-form>
</div>
```

---

### **Step 4: AngularJS renders component**

```
1. Parses HTML: <claim-form data="claimData">
   ↓
2. Normalizes: claimForm
   ↓
3. Finds: angular.module("PtEMobile").component("claimForm", ...)
   ↓
4. Loads: views/insurance/claimFormPtE.html
   ↓
5. Binds: data="claimData" → ctrl.data = $scope.claimData
   ↓
6. Executes: controller logic
```

---

## 🚨 Common mistakes:

### **❌ Wrong: Using camelCase in HTML**

```html
<!-- DON'T DO THIS -->
<claimForm data="claimData"></claimForm>

<!-- HTML is case-insensitive -->
<!-- Browser converts to lowercase: <claimform> -->
<!-- AngularJS can't match: claimform ≠ claimForm -->
```

---

### **✅ Correct: Use kebab-case in HTML**

```html
<!-- DO THIS -->
<claim-form data="claimData"></claim-form>

<!-- AngularJS normalizes: claim-form → claimForm -->
<!-- Finds registered component ✅ -->
```

---

## 📊 Binding attribute conversion:

### **Same rule applies to attributes:**

```javascript
// Component definition
bindings: {
  claimData: "=",         // camelCase in JS
  onSaveComplete: "&",    // camelCase in JS
  showButtons: "<?",      // camelCase in JS
  maxAmount: "@"          // camelCase in JS
}
```

**HTML usage:**
```html
<claim-form 
    claim-data="claimData"           
    on-save-complete="handleSave()"  
    show-buttons="true"              
    max-amount="1000">               
</claim-form>
```

**Conversion:**
```
claim-data       → claimData
on-save-complete → onSaveComplete
show-buttons     → showButtons
max-amount       → maxAmount
```

---

## 🔍 How to verify:

### **Method 1: Check DevTools Elements tab**

```
1. Open Chrome DevTools (F12)
2. Go to Elements tab
3. Find: <claim-form>
4. See AngularJS scope data attached
```

---

### **Method 2: AngularJS Batarang extension**

```
1. Install AngularJS Batarang (Chrome extension)
2. Open DevTools → AngularJS tab
3. See all components and their scopes
```

---

### **Method 3: Console check**

```javascript
// In browser console
angular.element(document.querySelector('claim-form')).scope()

// Output: Scope object with ctrl.data
```

---

## 📊 Summary:

| Question | Answer |
|----------|--------|
| **Component name?** | `claimForm` (camelCase in JavaScript) |
| **HTML tag?** | `<claim-form>` (kebab-case in HTML) |
| **Who converts?** | AngularJS automatically |
| **Rule?** | Capital letter → hyphen + lowercase |
| **Where defined?** | claimForm.js |
| **How loaded?** | `<script>` tag in `index.html` |

---

## ✅ Complete example:

````javascript
'use strict';

angular.module('PtEMobile').component('myCustomComponent', {
  //                                   ↑ camelCase here
  templateUrl: 'views/myCustomComponent.html',
  bindings: {
    myData: '=',        // ← camelCase
    onComplete: '&',    // ← camelCase
    showTitle: '<'      // ← camelCase
  },
  controller: function() {
    var ctrl = this;
    
    ctrl.$onInit = function() {
      console.log('Component initialized with data:', ctrl.myData);
    };
  }
});
````

**Usage in HTML:**
````html
<my-custom-component
    my-data="someData"
    on-complete="handleComplete()"
    show-title="true">
</my-custom-component>
<!--  ↑ kebab-case here -->
````

---

## 🎯 Key takeaway:

**AngularJS has built-in normalization:**

```
JavaScript:  claimForm        (camelCase)
    ↕ (automatic conversion)
HTML:        <claim-form>     (kebab-case)
```

**You DON'T need to manually declare `claim-form` - AngularJS does it automatically when you register `claimForm` component!**