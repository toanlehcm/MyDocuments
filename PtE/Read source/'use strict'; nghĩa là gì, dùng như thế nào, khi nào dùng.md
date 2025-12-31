# `'use strict';` - JavaScript Strict Mode

## 📘 `'use strict';` là gì?

**`'use strict';`** là một **directive** (chỉ thị) trong JavaScript để kích hoạt **strict mode** - chế độ nghiêm ngặt giúp viết code an toàn hơn bằng cách bắt lỗi và ngăn chặn các cú pháp không tốt.

---

## 🎯 Dùng để làm gì?

### **1. Prevent common coding mistakes:**

```javascript
'use strict';

// ❌ WITHOUT strict mode - Creates global variable accidentally
function test() {
    myVar = 10;  // No error, creates window.myVar
}

// ✅ WITH strict mode - Throws error
function test() {
    myVar = 10;  // ❌ ReferenceError: myVar is not defined
}
```

---

### **2. Catch silent errors:**

```javascript
'use strict';

// ❌ WITHOUT strict mode - Silently fails
var obj = {};
Object.defineProperty(obj, 'x', { value: 42, writable: false });
obj.x = 9;  // Silently fails, obj.x still = 42

// ✅ WITH strict mode - Throws error
var obj = {};
Object.defineProperty(obj, 'x', { value: 42, writable: false });
obj.x = 9;  // ❌ TypeError: Cannot assign to read only property
```

---

### **3. Prevent unsafe actions:**

```javascript
'use strict';

// ❌ WITHOUT strict mode - Deletes variable
var x = 10;
delete x;  // Returns false, but no error

// ✅ WITH strict mode - Throws error
var x = 10;
delete x;  // ❌ SyntaxError: Delete of an unqualified identifier
```

---

## 📊 What strict mode does:

### **1. Variables must be declared:**

```javascript
'use strict';

// ❌ Error: Must use var/let/const
myVariable = 10;  // ReferenceError

// ✅ Correct
var myVariable = 10;
let anotherVar = 20;
const constant = 30;
```

---

### **2. Cannot delete undeletable properties:**

```javascript
'use strict';

delete Object.prototype;  // ❌ TypeError
delete window;            // ❌ TypeError
```

---

### **3. Duplicate parameter names not allowed:**

```javascript
'use strict';

// ❌ Error in strict mode
function sum(a, a, c) {  // SyntaxError: Duplicate parameter name
    return a + a + c;
}

// ✅ Correct
function sum(a, b, c) {
    return a + b + c;
}
```

---

### **4. Octal literals not allowed:**

```javascript
'use strict';

var x = 010;  // ❌ SyntaxError: Octal literals are not allowed

// ✅ Use decimal or hex
var x = 8;     // Decimal
var x = 0o10;  // ES6 octal syntax
var x = 0x08;  // Hex
```

---

### **5. `with` statement not allowed:**

```javascript
'use strict';

// ❌ Error in strict mode
with (Math) {  // SyntaxError: Strict mode code may not include a with statement
    x = cos(2);
}

// ✅ Use explicit references
var x = Math.cos(2);
```

---

### **6. `this` is undefined in functions:**

```javascript
'use strict';

function test() {
    console.log(this);  // undefined (not window)
}
test();

// WITHOUT strict mode:
function test() {
    console.log(this);  // window object
}
test();
```

---

### **7. Cannot assign to read-only properties:**

```javascript
'use strict';

var obj = {};
Object.defineProperty(obj, 'x', { value: 10, writable: false });

obj.x = 20;  // ❌ TypeError: Cannot assign to read only property
```

---

## 🎯 Khi nào dùng?

### **1. At the top of a file (global scope):**

```javascript
'use strict';  // ✅ Applies to entire file

angular
  .module('PtEMobile')
  .config(function ($routeProvider, $locationProvider) {
    // All code in this file is in strict mode
    $routeProvider
      .when('/', {
        templateUrl: 'views/login/loginATP.html',
        controller: 'UserloginATPCtrl'
      });
  });
```

**Result:** Strict mode applies to **entire file**

---

### **2. At the top of a function (function scope):**

```javascript
function myFunction() {
  'use strict';  // ✅ Applies only to this function
  
  // Strict mode active here
  var x = 10;
}

function anotherFunction() {
  // NOT in strict mode
  y = 20;  // Creates global variable (bad, but no error)
}
```

**Result:** Strict mode applies only to **that function**

---

### **3. In AngularJS controllers:**

```javascript
'use strict';

angular.module('PtEMobile')
  .controller('TreamentNoteATPCtrl', function($scope, $rootScope, ...) {
    // ✅ Strict mode catches errors like:
    
    // ❌ Typo creates global variable
    patientName = 'John';  // ReferenceError (caught!)
    
    // ✅ Must declare properly
    var patientName = 'John';
  });
```

---

### **4. In factory/service:**

```javascript
'use strict';

angular.module('PtEMobile')
  .factory('downloadService', function($q, $cordovaFileTransfer) {
    
    return {
      download: function(url, fileName) {
        // ✅ Strict mode ensures quality code
        
        // ❌ Would throw error if forgot 'var'
        var targetPath = cordova.file.dataDirectory + fileName;
        
        return $cordovaFileTransfer.download(url, targetPath);
      }
    };
  });
```

---

## 📊 Real-world examples from your code:

### **Example 1: route.js**

```javascript
'use strict';  // ✅ Protects entire routing config

angular
  .module('PtEMobile')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/login/loginATP.html',
        controller: 'UserloginATPCtrl'
      })
      .when('/patient_dashboard/:userId', {
        templateUrl: 'views/patientDashboard/mainDashboardATP.html',
        controller: 'PatientDashboardATPCtrl'
      });
  });
```

**Benefits:**
```javascript
// ❌ Without 'use strict' - typo creates global variable
.when('/patient_dashboard', {
  controler: 'PatientDashboardATPCtrl'  // Typo, but no error
})

// ✅ With 'use strict' - catches typos early
// (though this particular typo wouldn't throw in strict mode,
//  it helps catch OTHER typos like undefined variables)
```

---

### **Example 2: Controller with strict mode**

```javascript
'use strict';

angular.module('PtEMobile')
  .controller('PatientDashboardATPCtrl', function($scope, $routeParams) {
    
    // ❌ Typo without 'var' - caught by strict mode!
    userId = $routeParams.userId;  // ❌ ReferenceError
    
    // ✅ Correct
    var userId = $routeParams.userId;
    
    // ❌ Another common mistake - caught!
    for (i = 0; i < patients.length; i++) {  // ❌ 'i' not declared
      // ...
    }
    
    // ✅ Correct
    for (var i = 0; i < patients.length; i++) {
      // ...
    }
  });
```

---

### **Example 3: Service with strict mode**

```javascript
'use strict';

angular.module('PtEMobile')
  .factory('downloadService', function($q) {
    
    return {
      download: function(url, fileName) {
        // ✅ Strict mode ensures we don't accidentally create globals
        
        return $q(function(resolve, reject) {
          // ❌ Would throw error without 'var'
          fileTransfer = new FileTransfer();  // ReferenceError
          
          // ✅ Correct
          var fileTransfer = new FileTransfer();
          
          fileTransfer.download(url, targetPath, resolve, reject);
        });
      }
    };
  });
```

---

## 🚨 Common mistakes caught by strict mode:

### **Mistake 1: Forgetting `var`/`let`/`const`**

```javascript
'use strict';

function calculateTotal(items) {
  total = 0;  // ❌ ReferenceError: total is not defined
  
  for (var i = 0; i < items.length; i++) {
    total += items[i].price;
  }
  
  return total;
}

// ✅ Fix:
function calculateTotal(items) {
  var total = 0;  // Declared properly
  
  for (var i = 0; i < items.length; i++) {
    total += items[i].price;
  }
  
  return total;
}
```

---

### **Mistake 2: Typo in loop variable**

```javascript
'use strict';

var patients = [...];

// ❌ Forgot to declare 'i'
for (i = 0; i < patients.length; i++) {  // ReferenceError
  console.log(patients[i].name);
}

// ✅ Fix:
for (var i = 0; i < patients.length; i++) {
  console.log(patients[i].name);
}
```

---

### **Mistake 3: Deleting variables**

```javascript
'use strict';

var patientData = { name: 'John' };

delete patientData;  // ❌ SyntaxError

// ✅ Fix: Set to null or undefined instead
patientData = null;
```

---

### **Mistake 4: Duplicate parameters**

```javascript
'use strict';

// ❌ Duplicate parameter names
function savePatient(patient, patient) {  // SyntaxError
  // ...
}

// ✅ Fix: Use unique names
function savePatient(patient, options) {
  // ...
}
```

---

## 📊 Browser compatibility:

```
✅ All modern browsers support strict mode:
- Chrome: All versions
- Firefox: All versions
- Safari: All versions
- Edge: All versions
- IE: 10+ (partial support in IE9)

✅ Safe to use in production
```

---

## 🔍 How to check if strict mode is active:

```javascript
function isStrictMode() {
  return !this;  // In strict mode, 'this' is undefined in functions
}

console.log(isStrictMode());  // true if strict mode active
```

**Or:**

```javascript
function isStrictMode() {
  'use strict';
  try {
    // In strict mode, this throws an error
    x = 10;
    return false;
  } catch (e) {
    return true;
  }
}

console.log(isStrictMode());  // true
```

---

## 📊 Summary:

| Question | Answer |
|----------|--------|
| **`'use strict';` là gì?** | Directive to enable JavaScript strict mode |
| **Dùng để làm gì?** | Catch errors, prevent bad practices, make code safer |
| **Khi nào dùng?** | At top of file (global) or top of function (local) |
| **Có bắt buộc không?** | ❌ NO, but highly recommended |
| **Có tốn performance?** | ❌ NO, actually slightly faster |
| **Nên dùng không?** | ✅ YES, especially in large projects |

---

## ✅ Best practices:

### **1. Always use at file level:**

```javascript
// ✅ GOOD: At top of file
'use strict';

angular.module('PtEMobile')
  .controller('MyCtrl', function() {
    // All code in strict mode
  });
```

---

### **2. Use in all your JavaScript files:**

```
app/scripts/
├── app.js                      'use strict'; ✅
├── config/
│   └── route.js               'use strict'; ✅
├── controllers/
│   └── patientDashboard/
│       └── treamentNoteATP.js 'use strict'; ✅
├── factory/
│   └── downloadService.js     'use strict'; ✅
└── services/
    └── sessionFactory.js      'use strict'; ✅
```

---

### **3. Enable in ESLint/JSHint:**

```javascript
// .eslintrc or .jshintrc
{
  "rules": {
    "strict": ["error", "global"]  // Require 'use strict'
  }
}
```

---

### **4. Combine with linting:**

```javascript
// With ESLint + 'use strict', catch errors before runtime:

'use strict';

function calculateTotal() {
  total = 0;  // ❌ ESLint error: 'total' is not defined
              // ❌ Runtime error: ReferenceError
  
  return total;
}
```

---

## 🎯 Why your code uses it:

**In route.js:**

```javascript
'use strict';  // ✅ Prevents accidental global variables in routing config

angular
  .module('PtEMobile')
  .config(function ($routeProvider) {
    // 500+ lines of route definitions
    // Without 'use strict', typos could create global variables
    // With 'use strict', errors are caught immediately
  });
```

**Benefits in large files:**
- Catches typos in route definitions
- Prevents accidental global variable creation
- Makes debugging easier
- Ensures code quality

---

**`'use strict';` is like a safety net - it catches bugs before they cause problems in production!**