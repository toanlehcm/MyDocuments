# Folder `cordova-js-src` - Cordova JavaScript Source Files

## 📘 `cordova-js-src` là gì?

**`cordova-js-src`** là folder chứa **source code** (mã nguồn) để **build ra file cordova.js**. Đây là nơi các developer của Apache Cordova viết code, chứ **KHÔNG phải** nơi bạn dùng trong app.

---

## 🎯 Dùng để làm gì?

### **1. Build cordova.js từ source:**

```
cordova-js-src/           ← Source files (multiple .js files)
       ↓
  Build process
       ↓
cordova.js                ← Compiled single file (used in app)
```

**Analogy:**
```
cordova-js-src/  =  Source code (.java files)
cordova.js       =  Compiled app (.apk file)
```

---

### **2. Structure of cordova-js-src:**

```
cordova-js-src/
├── android/              ← Android-specific implementations
│   ├── exec.js          ← Android bridge
│   ├── platform.js      ← Android platform code
│   └── promptbasednativeapi.js
├── ios/                  ← iOS-specific implementations
│   ├── exec.js          ← iOS bridge (WKWebView)
│   └── platform.js      ← iOS platform code
├── browser/              ← Browser platform (for testing)
├── common/               ← Shared code across all platforms
│   ├── argscheck.js     ← Argument validation
│   ├── builder.js       ← Object builder utility
│   ├── channel.js       ← Event channel system
│   ├── exec.js          ← Base exec function
│   ├── init.js          ← Initialization code
│   ├── modulemapper.js  ← Module mapping (clobbers/merges)
│   ├── pluginloader.js  ← Plugin loading system
│   └── urlutil.js       ← URL utilities
└── scripts/              ← Build scripts
    └── require.js       ← Module loader (AMD)
```

---

## 📊 How cordova.js is built:

### **Build process:**

```bash
# In Apache Cordova repository:
npm install
npm run build

# What happens:
1. Read all files in cordova-js-src/
2. Combine common/ files (shared code)
3. Add platform-specific files (ios/ or android/)
4. Wrap in module system (require/define)
5. Minify and optimize
6. Output: cordova.js
```

**Result:**
```javascript
// cordova.js (single file, ~20,000 lines)
;(function() {
    // All code from cordova-js-src/ combined here
    
    // common/channel.js content
    define("cordova/channel", function(...) { ... });
    
    // common/exec.js content
    define("cordova/exec", function(...) { ... });
    
    // ios/exec.js content (if building for iOS)
    define("cordova/ios/exec", function(...) { ... });
    
    // ... all other modules
    
    // Bootstrap code
    require('cordova/init');
})();
```

---

## 🔍 Key source files explained:

### **1. `common/channel.js`:**

**Purpose:** Event channel system for Cordova lifecycle

```javascript
// cordova-js-src/common/channel.js
var channel = {
    createSticky: function(type) {
        // Create event channel that remembers state
    },
    
    onDeviceReady: createSticky('deviceready'),
    onResume: create('resume'),
    onPause: create('pause')
};
```

**Used for:**
```javascript
// In your app:
document.addEventListener('deviceready', function() {
    // This event comes from channel.js
});
```

---

### **2. `common/exec.js`:**

**Purpose:** Base implementation for calling native code

```javascript
// cordova-js-src/common/exec.js
var exec = function(success, fail, service, action, args) {
    // Queue the command
    // Platform-specific exec will handle it
};
```

---

### **3. `ios/exec.js`:**

**Purpose:** iOS-specific bridge to native code

```javascript
// cordova-js-src/ios/exec.js
var iOSExec = function() {
    // Use WKWebView message handler
    var command = [callbackId, service, action, args];
    window.webkit.messageHandlers.cordova.postMessage(command);
};

module.exports = iOSExec;
```

**This is the code that enables:**
```javascript
// Your app code:
navigator.camera.getPicture(...)
       ↓
// Becomes native iOS call via ios/exec.js
```

---

### **4. `android/exec.js`:**

**Purpose:** Android-specific bridge to native code

```javascript
// cordova-js-src/android/exec.js
var androidExec = function() {
    // Use prompt() bridge or JavaScriptInterface
    if (bridgeMode === jsToNativeModes.PROMPT) {
        return prompt(argsJson, 'gap:' + JSON.stringify([callbackId, service, action]));
    }
};

module.exports = androidExec;
```

---

### **5. `common/pluginloader.js`:**

**Purpose:** Load all plugins from cordova_plugins.js

```javascript
// cordova-js-src/common/pluginloader.js
exports.load = function(callback) {
    var plugins = require('cordova/plugin_list').slice(0);
    
    // Load each plugin
    plugins.forEach(function(plugin) {
        require(plugin.file);
        modulemapper.clobbers(plugin.id, plugin.clobbers);
    });
    
    callback();
};
```

**This is what loads your plugins:**
```javascript
// cordova_plugins.js defines:
{
    "id": "cordova-plugin-camera.camera",
    "clobbers": ["navigator.camera"]
}
       ↓
// pluginloader.js creates:
navigator.camera = { ... };
```

---

### **6. `common/modulemapper.js`:**

**Purpose:** Map modules to global namespace

```javascript
// cordova-js-src/common/modulemapper.js
exports.clobbers = function(moduleName, symbolPath) {
    // navigator.camera = require('cordova-plugin-camera')
};

exports.merges = function(moduleName, symbolPath) {
    // Object.assign(window, require('module'))
};
```

---

## 🎯 Khi nào dùng?

### **1. ❌ You DON'T use this folder:**

```
cordova-js-src/  ← For Cordova core developers only
       ↓
   NOT FOR YOU
```

**You use:**
```javascript
<!-- In your app -->
<script src="cordova.js"></script>  ← Use compiled file
```

---

### **2. ✅ When you see it (rare cases):**

**Case A: Debugging Cordova itself**
```javascript
// Want to understand how deviceready works?
// Read: cordova-js-src/common/channel.js

// Want to understand iOS bridge?
// Read: cordova-js-src/ios/exec.js
```

---

**Case B: Contributing to Cordova**
```bash
# Clone Cordova repository
git clone https://github.com/apache/cordova-js.git

# Edit source files in cordova-js-src/
cd cordova-js-src/common/
vim channel.js

# Build cordova.js
npm run build

# Test changes
```

---

**Case C: Custom Cordova build (advanced)**
```bash
# Rare: Building custom cordova.js with modifications
# Example: Add custom logging to exec calls

# Edit: cordova-js-src/common/exec.js
function exec(success, fail, service, action, args) {
    console.log('CUSTOM LOG:', service, action);  // Add logging
    // ... rest of code
}

# Rebuild cordova.js
npm run build

# Use custom cordova.js in your app
```

---

## 📊 Comparison:

| Folder/File | For | Use Case |
|-------------|-----|----------|
| **`cordova-js-src/`** | Cordova core developers | Build cordova.js from source |
| **cordova.js** | App developers (YOU) | Use in your app |
| **`cordova_plugins.js`** | Generated by Cordova | Lists installed plugins |
| **`plugins/`** | Plugin source code | Individual plugin implementations |

---

## 🔍 Example: How deviceready event works

### **In cordova-js-src (source):**

```javascript
// cordova-js-src/common/channel.js
channel.onDeviceReady = channel.createSticky('deviceready');

// cordova-js-src/common/init.js
channel.join(function() {
    // All channels ready
    cordova.fireDocumentEvent('deviceready');
}, [channel.onDOMContentLoaded, channel.onNativeReady, channel.onPluginsReady]);
```

---

### **In cordova.js (compiled):**

```javascript
// Compiled into cordova.js
define("cordova/channel", function(require, exports, module) {
    var channel = {
        createSticky: function(type) { ... },
        onDeviceReady: createSticky('deviceready')
    };
    module.exports = channel;
});

define("cordova/init", function(require, exports, module) {
    var channel = require('cordova/channel');
    channel.join(function() {
        cordova.fireDocumentEvent('deviceready');
    }, [channel.onDOMContentLoaded, channel.onNativeReady, channel.onPluginsReady]);
});
```

---

### **In your app (usage):**

```javascript
// You just use the result:
document.addEventListener('deviceready', function() {
    console.log('Device ready!');
}, false);
```

---

## 📊 Summary:

| Question | Answer |
|----------|--------|
| **`cordova-js-src` là gì?** | Source code folder for building cordova.js |
| **Dùng để làm gì?** | Build/compile cordova.js from modular source files |
| **Khi nào dùng?** | ❌ You DON'T use it (for Cordova core developers only) |
| **Where is it?** | In Apache Cordova repository (github.com/apache/cordova-js) |
| **You need it?** | ❌ NO - You use compiled cordova.js |
| **Can modify?** | ⚠️ Advanced users only (requires rebuilding cordova.js) |

---

## ✅ What YOU should know:

### **As an app developer:**

```javascript
// ✅ You work with these:
<script src="cordova.js"></script>          // Compiled file
document.addEventListener('deviceready', ...); // Events it provides
navigator.camera.getPicture(...);              // APIs it enables

// ❌ You DON'T need to know:
cordova-js-src/                              // Internal source
How cordova.js is built                      // Build process
```

---

### **When to care about cordova-js-src:**

```
1. Debugging Cordova core functionality
   → Read source to understand behavior

2. Contributing to Apache Cordova
   → Submit pull requests to improve Cordova

3. Learning Cordova internals
   → Study how bridge works

4. Building custom Cordova version
   → Rare, advanced use case
```

---

**`cordova-js-src` is the kitchen where cordova.js is cooked - you don't need to go into the kitchen, you just enjoy the meal (cordova.js) that comes out!**