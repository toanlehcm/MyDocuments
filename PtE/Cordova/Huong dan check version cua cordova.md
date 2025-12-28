# Check Cordova Version

## 🔍 Method 1: Command Line (Recommended)

### **A. Check Cordova CLI version:**
```bash
cordova --version
# or
cordova -v
```

**Expected output:**
```
12.0.0
```

---

### **B. Check Cordova platform version:**
```bash
# Check all platforms
cordova platform list

# Check specific platform
cordova platform version android
cordova platform version ios
```

**Expected output:**
```
Installed platforms:
  android 12.0.0
  ios 7.0.1
Available platforms:
  browser ~6.0.0
```

---

### **C. Check in project directory:**
```bash
cd D:\Sources\NewCordova\trunk
cordova platform list
```

---

## 🔍 Method 2: Check Package Files

### **A. Check `package.json`:**
```bash
# View Cordova dependencies
cat package.json | grep cordova
# or on Windows PowerShell:
Get-Content package.json | Select-String cordova
```

**Look for:**
```json
{
  "dependencies": {
    "cordova": "^12.0.0",
    "cordova-android": "^12.0.0",
    "cordova-ios": "^7.0.0"
  },
  "devDependencies": {
    "cordova": "^12.0.0"
  }
}
```

---

### **B. Check `config.xml`:**
```bash
cat config.xml | grep engine
# or on Windows PowerShell:
Get-Content config.xml | Select-String engine
```

**Look for:**
```xml
<engine name="android" spec="^12.0.0" />
<engine name="ios" spec="^7.0.0" />
```

---

### **C. Check `platforms/android/cordova/version`:**
```bash
# For Android
cat platforms/android/cordova/version

# For iOS
cat platforms/ios/cordova/version
```

---

## 🔍 Method 3: Check Plugin Version

### **Check printer plugin version:**
```bash
cordova plugin list | grep printer
# or
cordova plugin list
```

**Expected output:**
```
cordova-plugin-printer 0.8.0 "Printer"
```

---

### **Check specific plugin info:**
```bash
# List all plugins with versions
cordova plugin list

# Check plugin details
npm list cordova-plugin-printer
```

---

## 🔍 Method 4: Check in VS Code

### **A. View `package.json` in VS Code:**
```
Ctrl+P → type "package.json" → Enter
```

**Look for:**
```json
{
  "name": "pte-everywhere",
  "version": "1.0.0",
  "dependencies": {
    "cordova": "^12.0.0",
    "cordova-android": "^12.0.0",
    "cordova-plugin-printer": "^0.8.0"
  }
}
```

---

### **B. Check installed plugins in `plugins/` folder:**
```bash
# List plugin directories
ls plugins/

# Check fetch.json for versions
cat plugins/fetch.json
```

---

## 🔍 Method 5: Check in Chrome DevTools

### **Run in device console:**
```javascript
// Check Cordova version
console.log('Cordova version:', cordova.version);

// Check device info
console.log('Device platform:', device.platform);
console.log('Device version:', device.version);
console.log('Device cordova:', device.cordova);

// Check printer plugin
console.log('Printer plugin:', cordova.plugins.printer);
console.log('Window printer:', window.plugin.printer);
```

**Run this after `deviceready` event:**
```javascript
document.addEventListener('deviceready', function() {
    console.log('=== Cordova Info ===');
    console.log('Cordova version:', cordova.version);
    console.log('Device:', {
        platform: device.platform,
        version: device.version,
        cordova: device.cordova,
        model: device.model,
        manufacturer: device.manufacturer
    });
    console.log('Printer plugin available:', !!cordova.plugins.printer);
}, false);
```

---

## 📊 Summary Commands:

```bash
# Quick check (run in project root)
cd D:\Sources\NewCordova\trunk

# 1. Cordova CLI version
cordova --version

# 2. Platform versions
cordova platform list

# 3. Plugin versions
cordova plugin list

# 4. Check package.json
cat package.json | grep cordova

# 5. Check config.xml
cat config.xml | grep engine
```

---

## 🎯 Expected Output Example:

```bash
PS D:\Sources\NewCordova\trunk> cordova --version
12.0.0

PS D:\Sources\NewCordova\trunk> cordova platform list
Installed platforms:
  android 12.0.0
  ios 7.0.1

PS D:\Sources\NewCordova\trunk> cordova plugin list
cordova-plugin-printer 0.8.0 "Printer"
cordova-plugin-file 8.0.0 "File"
cordova-plugin-file-transfer 2.0.0 "File Transfer"
cordova-plugin-device 2.1.0 "Device"
cordova-plugin-whitelist 1.3.5 "Whitelist"
cordova-plugin-android-permissions 1.1.5 "Permissions"
```

---

## 🚨 Common Issues:

### **If `cordova` command not found:**
```bash
# Install Cordova CLI globally
npm install -g cordova

# Check installation
cordova --version
```

### **If version mismatch:**
```bash
# Update Cordova CLI
npm update -g cordova

# Update platform
cordova platform update android@12.0.0

# Update plugin
cordova plugin remove cordova-plugin-printer
cordova plugin add cordova-plugin-printer@0.8.0
```

---

**Run these commands and share the output to help diagnose the print crash issue!**