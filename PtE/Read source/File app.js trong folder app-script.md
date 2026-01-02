# File app.js - AngularJS Application Entry Point

## 📘 File app.js là gì?

**app.js** là file **chính (main/entry point)** của ứng dụng AngularJS - nơi **khởi tạo module, cấu hình, và định nghĩa các function toàn cục** cho toàn bộ ứng dụng.

---

## 🎯 Dùng để làm gì?

### **1. Khởi tạo AngularJS module chính:**

```javascript
angular.module('PtEMobile', [
    // Dependencies (các module cần thiết)
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'pascalprecht.translate',
    'apiService',                    // Custom services
    'PendoService',
    'commonService',
    'actionheroFactory',             // WebSocket factory
    'urlFactory',
    'imageFactory',
    'sessionFactory',
    'downloadService',
    'SpeechService',
    'RecordingService',
    // ... many more modules
])
```

**Meaning:** Đây là **main module** tên là `PtEMobile`, phụ thuộc vào tất cả các modules trong mảng

---

### **2. Configuration (`.config()`):**

```javascript
.config(function($mdThemingProvider, $compileProvider) {
    // Configure Material Design theme
    $mdThemingProvider.theme('default');
    
    // Allow blob: URLs for download/print
    $compileProvider.aHrefSanitizationWhitelist(
        /^\s*(https?|blob|ftp|mailto|javascript):/
    );
})
.config(function(ipnConfig) {
    // Configure international phone number
    ipnConfig.defaultCountry = 'us';
    ipnConfig.preferredCountries = ['us', 'uk', 'ca'];
    ipnConfig.skipUtilScriptDownload = true;
})
```

**Purpose:** Cấu hình app TRƯỚC KHI app chạy

---

### **3. Application Initialization (`.run()`):**

```javascript
.run(function($rootScope, $window, actionheroFactory, $location, 
              $sce, $translate, api, $http, $mdToast, sessionFactory, 
              viewerService, $mdDateLocale, $mdDialog, $timeout, 
              $interval, messageAlert, $route, downloadService, $q, 
              $document, urlFactory, $mdBottomSheet, commonService, 
              PaymentFactory, UserMFAFactory) {
    
    console.log('================== app starting run ===================');
    
    // Initialize app when it starts
    initializer();
    
    function initializer() {
        initializerHandler();
        
        // Set global variables
        $rootScope.hideNav = true;
        $rootScope.hideHeaderLogin = false;
        $rootScope.readOnlyMode = false;
        $rootScope.screenHeight = $window.innerHeight;
        $rootScope.screenWidth = $window.innerWidth;
        $rootScope.appType = Environment.clientPlatform;
        $rootScope.autoSaveTreatmentNote = true;
        
        // ... hundreds of initializations
    }
})
```

**Purpose:** Chạy code NGAY KHI app khởi động (trước khi load bất kỳ controller nào)

---

## 🎯 Khi nào dùng app.js?

### **Use Case 1: Khởi tạo global variables**

```javascript
// In app.js .run()
$rootScope.clientId = '';
$rootScope.userId = '';
$rootScope.token = '';
$rootScope.fullName = '';
$rootScope.timeZoneValue = 'Asia/Ho_Chi_Minh';
$rootScope.notificationNumber = null;
$rootScope.messageNumber = null;
$rootScope.spinnerCounter = 0;

// These variables are accessible in ALL controllers
```

**Usage in any controller:**
```javascript
angular.module('PtEMobile').controller('PatientCtrl', 
    function($scope, $rootScope) {
        // Access global variables
        console.log($rootScope.userId);
        console.log($rootScope.token);
        console.log($rootScope.fullName);
    }
);
```

---

### **Use Case 2: Define global functions**

```javascript
// In app.js .run()
$rootScope.gotoLogOut = function() {
    // Logout logic
    clearSession();
    gotoHomePage();
};

$rootScope.gotoAccountSetting = function() {
    $location.path('/accountsettings');
};

$rootScope.showToast = function(message) {
    $mdToast.show(
        $mdToast.simple()
            .textContent(message)
            .position('top right')
            .hideDelay(3000)
    );
};

$rootScope.formatCurrencyNumber = formatCurrencyNumber;
$rootScope.convertDateClinicToLocal = convertDateClinicToLocal;
$rootScope.validatePermission = validatePermission;
```

**Usage in any view:**
```html
<!-- Any HTML template can call these functions -->
<button ng-click="gotoLogOut()">Logout</button>
<button ng-click="gotoAccountSetting()">Settings</button>
<span>{{formatCurrencyNumber(123.45)}}</span>
```

**Usage in any controller:**
```javascript
angular.module('PtEMobile').controller('SomeCtrl', 
    function($scope, $rootScope) {
        // Call global functions
        $rootScope.showToast('Operation successful!');
        
        var formattedPrice = $rootScope.formatCurrencyNumber(99.99);
        
        if ($rootScope.validatePermission('editPatient')) {
            // Allow edit
        }
    }
);
```

---

### **Use Case 3: Setup WebSocket connection**

```javascript
// In app.js .run()
$rootScope.actionheroFactory = actionheroFactory;

// Listen for messages globally
actionheroFactory.onNewMessage(function(msgObj) {
    console.log('New message received:', msgObj);
    
    // Handle different message types
    if (msgObj.ContextType === 'newmessage') {
        $rootScope.messageNumber++;
        $rootScope.$broadcast('new-message', msgObj);
    }
    
    if (msgObj.ContextType === 'webnotification') {
        $rootScope.notificationNumber++;
        $rootScope.$broadcast('webNotification', msgObj);
    }
});

// Listen for system messages
actionheroFactory.onSystemMessage(function(msgObj) {
    console.log('System message:', msgObj);
    systemMessage(msgObj);
});
```

**Usage in controllers:**
```javascript
// Controller 1 - Messages
$scope.$on('new-message', function(event, message) {
    console.log('New message:', message);
    $scope.messages.push(message);
});

// Controller 2 - Notifications
$scope.$on('webNotification', function(event, notification) {
    console.log('New notification:', notification);
    $scope.notifications.push(notification);
});
```

---

### **Use Case 4: Setup event listeners**

```javascript
// In app.js .run()

// Listen for location changes (route changes)
$rootScope.$on('$locationChangeStart', function(event, current, previous) {
    console.log('Navigating from', previous, 'to', current);
    
    // Check if user is logged in
    if (!$rootScope.token && !isPublicRoute(current)) {
        event.preventDefault();
        $location.path('/login');
    }
});

// Listen for upload progress
$rootScope.$on('uploadExerciseProgress', function(event, args) {
    console.log('Upload progress:', args.progress + '%');
    $rootScope.itemUploadProgess = args.progress;
});

// Listen for notification events
$rootScope.$on('webNotification', function(event, message) {
    console.log('Web notification:', message);
    getNumberNotification();
    
    // Update badge number on app icon
    _handleSetBadgeNumber($rootScope.notificationNumber);
});

// Listen for browser close
window.onbeforeunload = function(e) {
    if ($rootScope.isLogOut) {
        return undefined;
    }
    
    // Show warning if unsaved changes
    if (hasUnsavedChanges()) {
        return 'You have unsaved changes. Are you sure you want to leave?';
    }
};
```

---

### **Use Case 5: Initialize external services**

```javascript
// In app.js .run()

// Initialize Pendo analytics
if (window.pendo && $rootScope.userData) {
    window.pendo.initialize({
        visitor: {
            id: $rootScope.userId,
            email: $rootScope.userData.Email,
            full_name: $rootScope.fullName
        },
        account: {
            id: $rootScope.clientId,
            name: $rootScope.userData.ClientName
        }
    });
}

// Initialize AppSignal error tracking
if (window.appSignal) {
    window.appSignal.initialize({
        key: Environment.appSignalKey,
        namespace: Environment.environment
    });
}

// Initialize CardConnect payment gateway
getCardConnectHost(function(host) {
    $rootScope.cardConnectHost = host;
    console.log('CardConnect host:', host);
});
```

---

### **Use Case 6: Setup keyboard shortcuts**

```javascript
// In app.js .run()
jQuery(document).bind("keyup keydown", function(e) {
    // Detect Ctrl/Cmd key
    if (e.which === 91 || e.which === 17 || e.which === 224) {
        $rootScope.isControlPress = (e.type === "keydown");
    }
    
    // Ctrl+S to save
    if ($rootScope.isControlPress && e.which === 83) {
        e.preventDefault();
        $rootScope.$broadcast('ctrl-s-pressed');
    }
    
    // Escape to close dialogs
    if (e.which === 27) {
        $rootScope.$broadcast('escape-pressed');
    }
});
```

---

## 📊 Structure of app.js:

```javascript
// 1. MODULE DECLARATION
angular.module('PtEMobile', [
    // Dependencies
])

// 2. CONFIGURATION PHASE (runs first)
.config(function($mdThemingProvider, $compileProvider) {
    // Configure app before it runs
})

// 3. VALUE/CONSTANT DEFINITIONS
.value('THROTTLE_MILLISECONDS', 250)

// 4. RUN PHASE (runs when app starts)
.run(function($rootScope, $window, ...) {
    
    // A. Initialize global variables
    $rootScope.userId = '';
    $rootScope.token = '';
    
    // B. Define global functions
    $rootScope.gotoLogOut = function() { ... };
    $rootScope.showToast = function(msg) { ... };
    
    // C. Setup event listeners
    $rootScope.$on('$locationChangeStart', function() { ... });
    window.onbeforeunload = function() { ... };
    
    // D. Initialize external services
    actionheroFactory.init();
    
    // E. Setup watchers
    $rootScope.$watch('token', function(newVal) { ... });
})

// 5. CONTROLLERS (if needed)
.controller('ToastCtrl', function($scope, $mdToast, ...) {
    // Controller for toast notifications
});
```

---

## 🚨 Important sections in your app.js:

### **1. Global Constants:**

```javascript
var _bucketName = 'pteverywhere-useast1';
var _s3Domain = 's3.amazonaws.com';
var _bucketUrl = 'https://' + _bucketName + '.' + _s3Domain + '/setting/image/';
var _defaultThumbnailExerciseId = 'default_thumbnail_exercise.png';
var _defaultAvatarId = 'default_avatar_user.png';
var _defaultLogoId = 'default_logo_client.png';

$rootScope.defaultThumbnailExerciseUrl = _bucketUrl + _defaultThumbnailExerciseId;
$rootScope.defaultAvatarUrl = _bucketUrl + _defaultAvatarId;
$rootScope.defaultLogoUrl = _bucketUrl + _defaultLogoId;
```

---

### **2. Environment Variables:**

```javascript
$rootScope.appType = Environment.clientPlatform;
$rootScope.versionName = Environment.versionName;
$rootScope.actionheroOptions = {
    url: Environment.serverHost,
    apiPath: '/api',
    timeout: 60 * 60 * 1000
};
$rootScope.videoHostName = Environment.videoHostName;
$rootScope.defaultHost = Environment.serverHost;
```

---

### **3. Session Management:**

```javascript
$rootScope.clientId = '';
$rootScope.userId = '';
$rootScope.token = '';
$rootScope.userRoleSelected = '';
$rootScope.loginId = '';
$rootScope.fullName = '';
$rootScope.firstName = '';
$rootScope.lastName = '';

function clearSession() {
    $rootScope.clientId = '';
    $rootScope.userId = '';
    $rootScope.token = '';
    localStorage.clear();
    sessionStorage.clear();
}
```

---

### **4. Timeout Timer:**

```javascript
$rootScope.timerTimeout = null;
$rootScope.timeoutMinutes = 30 * 60 * 1000; // 30 minutes

function timeoutTimer(remainTime) {
    stopTimer();
    $rootScope.timerTimeout = $timeout(function() {
        console.log('Session timeout!');
        clearSession();
        gotoHomePage();
    }, remainTime);
}

function resetTimeoutTimer(resetTime) {
    stopTimer();
    timeoutTimer(resetTime);
}

function stopTimer() {
    if ($rootScope.timerTimeout) {
        $timeout.cancel($rootScope.timerTimeout);
    }
}

// Reset timer on user activity
angular.element(document).on('click keypress scroll', function() {
    if ($rootScope.token) {
        resetTimeoutTimer($rootScope.timeoutMinutes);
    }
});
```

---

### **5. Notification System:**

```javascript
$rootScope.notificationNumber = null;
$rootScope.messageNumber = null;

function getNumberNotification() {
    api.call('v4GetCounterNotification', {}).then(
        function(response) {
            $rootScope.notificationNumber = response.data.count;
            _handleSetBadgeNumber($rootScope.notificationNumber);
        }
    );
}

$rootScope.$on('webNotification', function(event, message) {
    console.log('New notification:', message);
    getNumberNotification();
    
    // Show toast for important notifications
    if (message.NotificationType === 'urgent') {
        $rootScope.showToast(message.Message);
    }
});
```

---

### **6. Privacy Mode (PTE-4810):**

```javascript
$rootScope.privacyMode = false;
$rootScope.blurStyle = {};
$rootScope.disabledStyle = {};
$rootScope.urlsAppliedBlurringEffect = {
    'patient_dashboard': true,
    'patient_document': true,
    'patient_treatment': true,
    'patient_invoice': true,
    'patient_claims': true
};

function togglePrivacyMode(event) {
    $rootScope.privacyMode = !$rootScope.privacyMode;
    
    if ($rootScope.privacyMode) {
        $rootScope.blurStyle = { 'filter': 'blur(5px)' };
        $rootScope.disabledStyle = { 'pointer-events': 'none' };
    } else {
        $rootScope.blurStyle = {};
        $rootScope.disabledStyle = {};
    }
}
```

---

## 📊 Common patterns in app.js:

### **Pattern 1: Global navigation functions**

```javascript
$rootScope.gotoLogOut = function() {
    clearSession();
    gotoHomePage();
};

$rootScope.gotoAccountSetting = function() {
    $location.path('/accountsettings');
};

$rootScope.gotoDashboard = function() {
    $location.path('/patientdashboard');
};

$rootScope.gotoClinicSetting = function() {
    $location.path('/clinicsettings');
};
```

**Usage in any template:**
```html
<button ng-click="gotoLogOut()">Logout</button>
<button ng-click="gotoAccountSetting()">Settings</button>
<button ng-click="gotoDashboard()">Dashboard</button>
```

---

### **Pattern 2: Global utilities**

```javascript
$rootScope.formatCurrencyNumber = function(number, hidecurrency, decimal) {
    return '$' + number.toFixed(decimal || 2);
};

$rootScope.formatPhoneNumber = function(value) {
    if (!value) return '';
    value = value.replace(/\D/g, '');
    return value.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
};

$rootScope.convertDateClinicToLocal = function(datetime) {
    return moment.tz(datetime, $rootScope.timeZoneValue).local();
};
```

---

### **Pattern 3: Permission checks**

```javascript
function validatePermission(action) {
    var hasPermission = $rootScope.listPermission.includes(action);
    if (!hasPermission) {
        $rootScope.showToast('You do not have permission for this action');
    }
    return hasPermission;
}

$rootScope.validatePermission = validatePermission;
```

**Usage:**
```javascript
// In controller
if ($rootScope.validatePermission('editPatient')) {
    // Allow edit
    $scope.editPatient();
}
```

---

## 📊 Summary:

| Question | Answer |
|----------|--------|
| **app.js là gì?** | Main entry point của AngularJS app |
| **Dùng để làm gì?** | Initialize app, define global vars/functions, setup listeners |
| **Khi nào chạy?** | Chạy ĐẦU TIÊN khi app load (trước tất cả controllers) |
| **Scope?** | GLOBAL - accessible từ mọi nơi trong app |
| **Common uses?** | Global variables, navigation, utilities, event listeners, WebSocket |

---

## ✅ Best practices:

### **1. Keep app.js organized:**

```javascript
// Good structure:
.run(function(...) {
    // 1. Initialize variables
    initializeVariables();
    
    // 2. Define global functions
    defineGlobalFunctions();
    
    // 3. Setup event listeners
    setupEventListeners();
    
    // 4. Initialize services
    initializeServices();
});
```

---

### **2. Use `$rootScope` sparingly:**

```javascript
// ❌ BAD: Too many global variables
$rootScope.var1 = '';
$rootScope.var2 = '';
$rootScope.var3 = '';
// ... 100 more variables

// ✅ GOOD: Group related variables
$rootScope.session = {
    userId: '',
    token: '',
    fullName: ''
};

$rootScope.ui = {
    notificationCount: 0,
    messageCount: 0,
    spinnerActive: false
};
```

---

### **3. Document global functions:**

```javascript
/**
 * Format currency with proper decimal places
 * @param {number} number - Amount to format
 * @param {boolean} hidecurrency - Hide currency symbol
 * @param {number} decimal - Number of decimal places
 * @returns {string} Formatted currency string
 */
$rootScope.formatCurrencyNumber = function(number, hidecurrency, decimal) {
    return '$' + number.toFixed(decimal || 2);
};
```

---

**app.js is the heart of your AngularJS application - it initializes everything, defines global utilities, and sets up the foundation that all other components build upon! 🎯**