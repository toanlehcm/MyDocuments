# File cordova.js - Cordova JavaScript Bridge

## 📘 cordova.js là gì?

**cordova.js** là **core JavaScript library** của Apache Cordova - cầu nối (bridge) giữa JavaScript code và native mobile code (iOS/Android).

---

## 🎯 Dùng để làm gì?

### **1. Bridge between JavaScript ↔ Native Code:**

```javascript
// JavaScript (your app code)
navigator.camera.getPicture(success, error);
       ↓
// cordova.js translates to native call
       ↓
// Native iOS/Android camera API
       ↓
// Result comes back through cordova.js
       ↓
// success() callback executed
```

---

### **2. Main responsibilities:**

```javascript
// 1. Module system (require/define)
var camera = require('cordova-plugin-camera');

// 2. Event management
document.addEventListener('deviceready', function() {
    // App is ready
});

// 3. Plugin loader
// Loads all plugins from cordova_plugins.js

// 4. Native bridge (exec)
cordova.exec(success, error, 'Service', 'action', [args]);
```

---

## 📊 File structure breakdown:

### **Your file: cordova.js version 6.0.0 for iOS**

```javascript
// Platform: ios
// Version: 6.0.0

;(function() {
var PLATFORM_VERSION_BUILD_LABEL = '6.0.0';
```

---

### **1. Module System (AMD-like):**

```javascript
// Define a module
define("cordova/channel", function(require, exports, module) {
    // Module code
    module.exports = channel;
});

// Require a module
var channel = require('cordova/channel');
```

**Purpose:** Organize Cordova code into reusable modules

---

### **2. Core Cordova Object:**

```javascript
var cordova = {
    version: '6.0.0',
    platformId: 'ios',
    
    // Execute native commands
    exec: function(success, error, service, action, args) { ... },
    
    // Fire events
    fireDocumentEvent: function(type, data) { ... },
    
    // Callback management
    callbacks: {},
    callbackId: Math.floor(Math.random() * 2000000000)
};
```

---

### **3. Event Channels:**

```javascript
// Cordova lifecycle events
channel.createSticky('onDOMContentLoaded');
channel.createSticky('onNativeReady');
channel.createSticky('onCordovaReady');
channel.createSticky('onPluginsReady');
channel.createSticky('onDeviceReady');  // ← Most important!
channel.create('onResume');
channel.create('onPause');
```

**Event flow:**
```
1. onDOMContentLoaded  → DOM is ready
2. onNativeReady       → Native iOS code is ready
3. onCordovaReady      → Cordova objects created
4. onPluginsReady      → All plugins loaded
5. onDeviceReady       → ✅ App can use Cordova APIs
```

---

### **4. iOS-specific exec bridge:**

```javascript
// iOS uses WKWebView message handler
var iOSExec = function() {
    // ...
    var command = [callbackId, service, action, actionArgs];
    window.webkit.messageHandlers.cordova.postMessage(command);
};
```

**How it works:**
```
JavaScript:
navigator.camera.getPicture()
       ↓
cordova.exec('Camera', 'getPicture', [options])
       ↓
window.webkit.messageHandlers.cordova.postMessage()
       ↓
iOS Native Code (Objective-C/Swift)
       ↓
Camera plugin opens camera
       ↓
Result sent back to JavaScript
       ↓
callback() executed
```

---

### **5. Plugin Loader:**

```javascript
// Load plugins from cordova_plugins.js
pluginloader.load(function() {
    channel.onPluginsReady.fire();
});
```

**What it does:**
```
1. Read cordova_plugins.js (list of installed plugins)
2. Load each plugin's JavaScript file
3. Register plugin in global namespace
   (e.g., navigator.camera, cordova.plugins.printer)
4. Fire 'onPluginsReady' event
```

---

## 🔄 Complete workflow:

### **App startup sequence:**

```javascript
// 1. Page loads
<script src="cordova.js"></script>

// 2. cordova.js executes
;(function() {
    // Set up require/define
    // Create cordova object
    // Set up channels
    
    // 3. Listen for DOMContentLoaded
    document.addEventListener('DOMContentLoaded', function() {
        channel.onDOMContentLoaded.fire();
    });
    
    // 4. iOS platform bootstrap
    platform.bootstrap = function() {
        // Set up iOS-specific features
        channel.onNativeReady.fire();
    };
    
    // 5. Load plugins
    pluginloader.load(function() {
        channel.onPluginsReady.fire();
    });
    
    // 6. Wait for all ready channels
    channel.join(function() {
        // Fire deviceready!
        cordova.fireDocumentEvent('deviceready');
    }, [onNativeReady, onPluginsReady, onDOMContentLoaded]);
})();

// 7. Your app code
document.addEventListener('deviceready', function() {
    // ✅ Now you can use Cordova APIs
    navigator.camera.getPicture(...);
}, false);
```

---

## 🎯 Khi nào dùng?

### **1. Always loaded in Cordova app:**

```html
<!-- index.html -->
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>PTE App</title>
    
    <!-- ✅ Must load before your app code -->
    <script type="text/javascript" src="cordova.js"></script>
</head>
<body>
    <!-- Your app content -->
    
    <!-- ✅ Your code loads after cordova.js -->
    <script src="scripts/app.js"></script>
</body>
</html>
```

---

### **2. Wait for deviceready:**

```javascript
// ❌ DON'T DO THIS (too early, Cordova not ready)
navigator.camera.getPicture(...);

// ✅ DO THIS (wait for deviceready)
document.addEventListener('deviceready', function() {
    navigator.camera.getPicture(...);
}, false);
```

---

### **3. Plugin calls automatically use it:**

```javascript
// When you call any Cordova plugin:
navigator.camera.getPicture(success, error, options);

// Behind the scenes, plugin uses cordova.js:
cordova.exec(
    success,                    // Success callback
    error,                      // Error callback
    'Camera',                   // Plugin name
    'takePicture',             // Action
    [options]                   // Arguments
);

// cordova.js sends to native iOS code
// Result comes back through cordova.js
```

---

## 📊 Important modules in cordova.js:

### **1. `cordova/channel`:**

```javascript
// Event channel system
var channel = require('cordova/channel');

// Create sticky channel (fires once, remembers state)
channel.createSticky('onDeviceReady');

// Subscribe to channel
channel.onDeviceReady.subscribe(function() {
    console.log('Device ready!');
});

// Fire channel
channel.onDeviceReady.fire();
```

---

### **2. `cordova/exec`:**

```javascript
// Execute native code
var exec = require('cordova/exec');

exec(
    function(result) {
        console.log('Success:', result);
    },
    function(error) {
        console.error('Error:', error);
    },
    'Camera',        // Plugin service
    'takePicture',   // Action
    [options]        // Arguments
);
```

---

### **3. `cordova/pluginloader`:**

```javascript
// Load all plugins
pluginloader.load(function() {
    // All plugins loaded
    console.log('Plugins ready');
});
```

---

### **4. `cordova/platform` (iOS-specific):**

```javascript
module.exports = {
    id: 'ios',
    bootstrap: function() {
        // Attach iOS-specific features
        require('cordova/modulemapper').clobbers(
            'cordova/plugin/ios/console',
            'window.console'
        );
        
        // Fire native ready
        channel.onNativeReady.fire();
    }
};
```

---

## 🚨 Important notes:

### **1. ❌ Never edit cordova.js manually:**

```
This file is auto-generated by Cordova build process:
- cordova prepare
- cordova build

Manual edits will be LOST!
```

---

### **2. ✅ Platform-specific:**

```
Different cordova.js for each platform:
- platforms/ios/www/cordova.js       ← iOS version
- platforms/android/app/src/main/assets/www/cordova.js  ← Android version
- app/cordova.js                     ← Development version (usually iOS)
```

---

### **3. ⚠️ Version matters:**

```javascript
// Your file: Cordova 6.0.0
var PLATFORM_VERSION_BUILD_LABEL = '6.0.0';

// This is OLD (2016)
// Latest Cordova is 12.x (2024)

// Check version:
console.log('Cordova version:', cordova.version);
// Output: "6.0.0"
```

---

### **4. 🔍 Debugging:**

```javascript
// Check if Cordova loaded
if (window.cordova) {
    console.log('Cordova version:', cordova.version);
    console.log('Platform:', cordova.platformId);
    console.log('Available plugins:', cordova.require('cordova/plugin_list'));
} else {
    console.error('Cordova not loaded!');
}

// Listen to all Cordova events
document.addEventListener('deviceready', function() {
    console.log('✅ deviceready fired');
});

document.addEventListener('pause', function() {
    console.log('⏸ App paused');
});

document.addEventListener('resume', function() {
    console.log('▶️ App resumed');
});
```

---

## 📊 Summary:

| Question | Answer |
|----------|--------|
| **cordova.js là gì?** | Core JavaScript bridge between web code and native mobile APIs |
| **Dùng để làm gì?** | Enable JavaScript to call native device features (camera, files, etc.) |
| **Khi nào dùng?** | Always loaded in Cordova apps, automatically used by plugins |
| **Có thể edit không?** | ❌ NO - Auto-generated, edits will be lost |
| **Có commit lên Git?** | ⚠️ Usually YES in `app/` but NO in `platforms/` |
| **Platform-specific?** | ✅ YES - Different for iOS/Android |

---

## ✅ Real-world usage in your app:

### **Your treamentNoteATP.js example:**

```javascript
// Your code (from earlier):
$scope.printPDF = function(data){
    getFilePDFTreatmentNote(data._id,'PRINT_PDF').then(function(dataResponse){
        if (isApp && isAndroid) {
            // ✅ This uses cordova.js behind the scenes
            $cordovaPrinter.print(dataResponse);
            
            // Which internally calls:
            // cordova.exec(success, error, 'Printer', 'print', [dataResponse]);
            //       ↓
            // cordova.js sends to native code
            //       ↓
            // Android printer opens
        }
    });
}
```

**Flow:**
```
1. User clicks "Print"
2. $cordovaPrinter.print() called
3. ng-cordova wrapper calls cordova.exec()
4. cordova.js (this file) sends message to native
5. Native Android code receives message
6. Printer dialog opens
7. Result sent back through cordova.js
8. Success/error callback executed
```

---

**cordova.js is the heart of your Cordova app - it makes web code talk to native mobile features!**