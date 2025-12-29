# File error.js - Error Page Controller

## 📘 error.js là gì?

**error.js** là một **AngularJS controller** để xử lý **error page** (trang lỗi) trong ứng dụng PTE Mobile.

---

## 🎯 Dùng để làm gì?

### **1. Hiển thị error page khi có lỗi:**

```javascript
// Controller for error page
.controller('ErrorCtrl', function($scope, $route, $rootScope, ...) {
    // Handle error display
})
```

**Purpose:**

- Show error message to user
- Provide "Try Again" button
- Handle navigation after error

---

### **2. Main functionalities:**

```javascript
// ✅ Hide/show navigation based on where error came from
$rootScope.hideNav = false;

var reqFrom = null;
if ($routeParams.reqFrom) reqFrom = $routeParams.reqFrom;

// If error from login page, hide navigation
if (reqFrom == "login") $rootScope.hideNav = true;
```

**Explanation:**

- If error happens on login page → hide navigation bar
- If error happens elsewhere → show navigation bar

---

### **3. "Try Again" functionality:**

```javascript
$scope.tryAgainClick = function () {
  // ✅ Show loading spinner
  $rootScope.spinnerCounter++;

  // ✅ Hide spinner after 500ms
  $timeout(function () {
    $rootScope.spinnerCounter--;
  }, 500);

  // ✅ Navigate back to where error came from
  if (reqFrom) $location.path("/" + reqFrom); // Go back to original page
  else $location.path("main"); // Go to main page
};
```

---

## 🔄 Workflow:

### **User Journey:**

```
1. User is on login page
   ↓
2. Network error / API fails
   ↓
3. App redirects to: /error?reqFrom=login
   ↓
4. ErrorCtrl loads
   ↓
5. Shows error page (navigation hidden because from=login)
   ↓
6. User clicks "Try Again"
   ↓
7. Redirects back to: /login
```

---

## 🎯 Khi nào dùng?

### **1. Network errors:**

```javascript
// In any service/controller
api.getData().then(
  function (response) {
    // Success
  },
  function (error) {
    // ✅ Redirect to error page
    $location.path("/error?reqFrom=" + currentPage);
  }
);
```

---

### **2. API failures:**

```javascript
// Example: Login fails
sessionFactory.login(username, password).catch(function (error) {
  console.error("Login failed:", error);

  // ✅ Show error page
  $location.path("/error?reqFrom=login");
});
```

---

### **3. Unexpected errors:**

```javascript
// Global error handler
$rootScope.$on("$routeChangeError", function (event, current, previous, rejection) {
  console.error("Route change error:", rejection);

  // ✅ Redirect to error page
  $location.path("/error?reqFrom=" + previous.$$route.originalPath);
});
```

---

## 📊 Error page structure:

### **Route configuration (probably in app.js):**

```javascript
// app.js
$routeProvider.when("/error", {
  templateUrl: "errors/error.html", // Error page template
  controller: "ErrorCtrl", // This controller
  controllerAs: "error",
});
```

---

### **Template (errors/error.html):**

```html
<!-- errors/error.html -->
<div class="error-page" ng-controller="ErrorCtrl">
  <div ng-hide="hideNav">
    <!-- Show navigation if not from login -->
    <nav>...</nav>
  </div>

  <div class="error-content">
    <h1>Oops! Something went wrong</h1>
    <p>We're sorry, but an error occurred.</p>

    <!-- Try Again button -->
    <button ng-click="tryAgainClick()">Try Again</button>
  </div>
</div>
```

---

## 🚨 Issues in current code:

### **1. No null checks:**

```javascript
// ❌ Problem: No validation
var reqFrom = null;
if ($routeParams.reqFrom) reqFrom = $routeParams.reqFrom;

// What if $routeParams is undefined?
```

### **2. Using == instead of ===:**

```javascript
// ❌ Problem: Loose equality
if(reqFrom == 'login')

// ✅ Should be:
if(reqFrom === 'login')
```

### **3. No error handling in tryAgainClick:**

```javascript
// ❌ Problem: What if $location.path() fails?
$scope.tryAgainClick = function () {
  // No try-catch
  if (reqFrom) $location.path("/" + reqFrom);
  else $location.path("main");
};
```

---

## ✅ Improved version with null checks:

```javascript
"use strict";

/**
 * @ngdoc function
 * @name PtEMobile.controller:ErrorCtrl
 * @description
 * # ErrorCtrl
 * Controller for error page in PtEMobile app
 */
angular.module("PtEMobile").controller("ErrorCtrl", function ($scope, $route, $rootScope, $http, $location, $translate, $routeParams, $timeout) {
  // ✅ Validate dependencies
  if (!$rootScope || !$location || !$timeout) {
    console.error("ErrorCtrl: Missing required dependencies");
    return;
  }

  // Initialize
  this.awesomeThings = ["HTML5 Boilerplate", "AngularJS", "Karma"];

  // ✅ Default: show navigation
  $rootScope.hideNav = false;

  // ✅ Get the page where error came from
  var reqFrom = null;
  if ($routeParams && $routeParams.reqFrom) {
    reqFrom = $routeParams.reqFrom;
    console.log("Error occurred from:", reqFrom);
  }

  // ✅ Hide navigation if error from login page
  if (reqFrom === "login") {
    $rootScope.hideNav = true;
  }

  /**
   * Handle "Try Again" button click
   * Redirects user back to original page or main page
   */
  $scope.tryAgainClick = function () {
    try {
      // ✅ Show loading spinner
      if ($rootScope.spinnerCounter !== undefined) {
        $rootScope.spinnerCounter++;

        $timeout(function () {
          if ($rootScope.spinnerCounter > 0) {
            $rootScope.spinnerCounter--;
          }
        }, 500);
      }

      // ✅ Navigate to appropriate page
      if (reqFrom && typeof reqFrom === "string") {
        console.log("Redirecting to:", reqFrom);
        $location.path("/" + reqFrom);
      } else {
        console.log("Redirecting to main page");
        $location.path("/main");
      }
    } catch (error) {
      console.error("ErrorCtrl.tryAgainClick: Navigation failed -", error);

      // ✅ Fallback: reload page
      if (window && window.location) {
        window.location.reload();
      }
    }
  };

  /**
   * Optional: Add back button
   */
  $scope.goBack = function () {
    try {
      if (window && window.history && window.history.length > 1) {
        window.history.back();
      } else {
        $location.path("/main");
      }
    } catch (error) {
      console.error("ErrorCtrl.goBack: Failed -", error);
      $location.path("/main");
    }
  };
});
```

---

## 🎯 Usage Examples:

### **Example 1: API call fails**

```javascript
// In any controller
downloadService.download(url, fileName).then(
  function (fileUri) {
    // Success
    $cordovaPrinter.print(fileUri);
  },
  function (error) {
    console.error("Download failed:", error);

    // ✅ Redirect to error page
    $location.path("/error").search({ reqFrom: "treatment-notes" });
  }
);
```

---

### **Example 2: Session expires**

```javascript
// In sessionFactory
function checkSession() {
  if (!sessionData || isExpired(sessionData)) {
    console.error("Session expired");

    // ✅ Redirect to error page from current location
    var currentPath = $location.path().replace("/", "");
    $location.path("/error").search({ reqFrom: currentPath });
  }
}
```

---

### **Example 3: Print fails**

```javascript
// In printService
$cordovaPrinter.print(fileUri).then(
  function () {
    console.log("Print success");
  },
  function (error) {
    console.error("Print failed:", error);

    // ✅ Show error page
    $location.path("/error").search({
      reqFrom: "treatment-notes",
      errorType: "print-failed",
    });
  }
);
```

---

## 📊 Summary:

| Question            | Answer                                                                                                             |
| ------------------- | ------------------------------------------------------------------------------------------------------------------ |
| **error.js là gì?** | AngularJS controller for error page                                                                                |
| **Dùng để làm gì?** | Display error page + provide "Try Again" functionality                                                             |
| **Khi nào dùng?**   | Network errors, API failures, unexpected errors                                                                    |
| **Flow**            | Error occurs → Redirect to /error?reqFrom=X → Show error page → User clicks "Try Again" → Go back to original page |
| **Issues**          | No null checks, uses loose equality (==), no error handling                                                        |

---

**error.js is the error handler/recovery page for the entire application!**
