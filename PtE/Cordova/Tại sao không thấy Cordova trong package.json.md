# Tại sao không thấy Cordova trong `package.json`?

## 🔍 Lý do phổ biến:

### **1. Cordova không được quản lý bởi npm**
```bash
# Check if Cordova is installed globally
cordova --version

# If installed globally, it won't be in package.json
npm list -g cordova
```

**Cordova thường được cài đặt global:**
```bash
npm install -g cordova
```

---

### **2. Project sử dụng Cordova CLI trực tiếp**
```bash
# Cordova CLI không cần phải có trong package.json
# Chỉ cần có trong global environment

# Check in project root
ls -la
# Should see:
# - config.xml (Cordova config)
# - platforms/ (Android, iOS)
# - plugins/ (Cordova plugins)
# - www/ (App source)
```

---

### **3. Dependencies nằm ở `config.xml` thay vì `package.json`**

**Check `config.xml`:**
```xml
<?xml version='1.0' encoding='utf-8'?>
<widget id="com.somotsoft.pteverywhere" version="1.0.0">
    <name>PTE Everywhere</name>
    
    <!-- ✅ Cordova platform versions here -->
    <engine name="android" spec="^12.0.0" />
    <engine name="ios" spec="^7.0.0" />
    
    <!-- ✅ Cordova plugins here -->
    <plugin name="cordova-plugin-printer" spec="^0.8.0" />
    <plugin name="cordova-plugin-file" spec="^8.0.0" />
    <plugin name="cordova-plugin-file-transfer" spec="^2.0.0" />
    <plugin name="cordova-plugin-device" spec="^2.1.0" />
    <plugin name="cordova-plugin-whitelist" spec="^1.3.5" />
    <plugin name="cordova-plugin-android-permissions" spec="^1.1.5" />
</widget>
```

---

### **4. Check plugin versions trong `plugins/fetch.json`:**

````bash
# View installed plugins
cat plugins/fetch.json
````

**Example output:**
```json
{
    "cordova-plugin-printer": {
        "source": {
            "type": "registry",
            "id": "cordova-plugin-printer@0.8.0"
        },
        "is_top_level": true,
        "variables": {}
    },
    "cordova-plugin-file": {
        "source": {
            "type": "registry",
            "id": "cordova-plugin-file@8.0.0"
        },
        "is_top_level": true,
        "variables": {}
    }
}
```

---

## 🎯 Verify Cordova Setup:

### **Run these commands in your project:**

```bash
# 1. Check Cordova CLI version
cordova --version

# 2. Check installed platforms
cordova platform list

# 3. Check installed plugins
cordova plugin list

# 4. Check config.xml
cat config.xml | grep -E "(engine|plugin)"

# 5. Check plugins directory
ls plugins/
```

---

## 📊 Expected Structure:

```
D:\Sources\NewCordova\trunk\
├── config.xml              ✅ Cordova config (has platform/plugin versions)
├── package.json            ❓ May not have cordova (normal for Cordova projects)
├── platforms/
│   ├── android/           ✅ Android platform
│   └── ios/               ✅ iOS platform
├── plugins/
│   ├── cordova-plugin-printer/
│   ├── cordova-plugin-file/
│   └── fetch.json         ✅ Plugin versions here
└── www/                   ✅ Your app code
    └── ...
```

---

## 🚨 If you want Cordova in `package.json`:

### **Add Cordova as dev dependency:**

```bash
# Add to package.json
npm install --save-dev cordova
npm install --save-dev cordova-android
npm install --save-dev cordova-ios
```

**This will add to `package.json`:**
```json
{
  "devDependencies": {
    "cordova": "^12.0.0",
    "cordova-android": "^12.0.0",
    "cordova-ios": "^7.0.0"
  }
}
```

---

## 🎯 Back to your Print Crash Issue:

### **Your current code:**
```javascript
print: function (doc, options) {
    var q = $q.defer();
    if ($rootScope.DeviceType === 'android') {
        try {
            alert('popup--- Printing document: ' + doc + 'options' + JSON.stringify(options));
            $window.plugin.printer.print(doc, options, function () {
                q.resolve();
            });    
        } catch (error) {
            alert('popup--- Printing error: ' + error.message);
        }
    } else {
        cordova.plugins.printer.print(doc, options, function () {
            q.resolve();
        });
    }
    return q.promise;
}
```

### **Problem:**
- ✅ Code is correct
- ❌ `doc` parameter receives **wrong URI** from `downloadService`

### **Current flow:**
```
downloadService.download() 
→ Returns: http://localhost:9002/__cdvfile_cache__/file.pdf (WRONG)
→ print(wrongURI) 
→ CRASH
```

### **Fixed flow (already provided earlier):**
```
downloadService.download() 
→ Use: cordova.file.externalCacheDirectory
→ Returns: file:///storage/emulated/0/Android/data/com.app/cache/file.pdf (CORRECT)
→ print(correctURI) 
→ SUCCESS
```

---

## 🎯 Summary:

| Question | Answer |
|----------|--------|
| **Tại sao không thấy cordova trong package.json?** | Normal - Cordova CLI installed globally, config in `config.xml` |
| **Cordova có đang work không?** | YES - plugins loaded, printer plugin available |
| **Vấn đề crash do đâu?** | Wrong URI from downloadService (localhost URL instead of file:// URI) |
| **Fix nào?** | Change `downloadService.js` to use `externalCacheDirectory` + `nativeURL` |

**The fix is in `downloadService.js`, not in package.json or print function!**