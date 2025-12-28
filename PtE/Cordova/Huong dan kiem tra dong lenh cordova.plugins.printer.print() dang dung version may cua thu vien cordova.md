# Kiểm tra version của cordova-plugin-printer

## 🔍 Method 1: Check Plugin Version via Command Line

### **A. Check installed plugin version:**
```bash
cd D:\Sources\NewCordova\trunk

# List all plugins with versions
cordova plugin list

# Or search specifically for printer plugin
cordova plugin list | findstr printer
```

**Expected output:**
```
cordova-plugin-printer 0.8.0 "Printer"
```

---

### **B. Check plugin details:**
```bash
# View detailed plugin info
npm list cordova-plugin-printer

# Or check in plugins directory
cat plugins/fetch.json | findstr printer
```

---

## 🔍 Method 2: Check in Project Files

### **A. Check `config.xml`:**
```bash
# Search for printer plugin declaration
Get-Content config.xml | Select-String printer
```

**Look for:**
```xml
<plugin name="cordova-plugin-printer" spec="^0.8.0" />
```

---

### **B. Check `plugins/fetch.json`:**
```bash
Get-Content plugins/fetch.json
```

**Look for:**
```json
{
    "cordova-plugin-printer": {
        "source": {
            "type": "registry",
            "id": "cordova-plugin-printer@0.8.0"
        },
        "is_top_level": true,
        "variables": {}
    }
}
```

---

### **C. Check plugin package.json:**
```bash
Get-Content plugins/cordova-plugin-printer/package.json | Select-String version
```

---

## 🔍 Method 3: Check in Chrome DevTools (Runtime)

### **Add debug code to check version at runtime:**

````javascript
// Add this in your controller initialization
document.addEventListener('deviceready', function() {
    console.log('=== Printer Plugin Info ===');
    
    // Check if plugin exists
    if (cordova.plugins && cordova.plugins.printer) {
        console.log('✅ cordova.plugins.printer available');
        console.log('Plugin object:', cordova.plugins.printer);
        
        // Check available methods
        console.log('Available methods:', Object.keys(cordova.plugins.printer));
        
        // Check plugin version (if available)
        if (cordova.plugins.printer.version) {
            console.log('Plugin version:', cordova.plugins.printer.version);
        }
    } else {
        console.log('❌ cordova.plugins.printer NOT available');
    }
    
    // Check window.plugin.printer (old API)
    if (window.plugin && window.plugin.printer) {
        console.log('✅ window.plugin.printer available (legacy)');
        console.log('Plugin object:', window.plugin.printer);
    }
    
    // Check Cordova version
    console.log('Cordova version:', cordova.version);
    console.log('Device platform:', device.platform);
    console.log('Device version:', device.version);
}, false);
````

---

## 🔍 Method 4: Check Plugin API Compatibility

### **Test which API is available:**

````javascript
// Add test function
$scope.testPrinterPlugin = function() {
    console.log('=== Testing Printer Plugin APIs ===');
    
    // Test 1: New API (cordova.plugins.printer)
    if (typeof cordova !== 'undefined' && 
        cordova.plugins && 
        cordova.plugins.printer && 
        typeof cordova.plugins.printer.print === 'function') {
        console.log('✅ New API available: cordova.plugins.printer.print');
        
        // Check if check() method exists (v0.8.0+)
        if (typeof cordova.plugins.printer.check === 'function') {
            console.log('✅ cordova.plugins.printer.check available (v0.8.0+)');
            
            cordova.plugins.printer.check(function(available, count) {
                console.log('Printer available:', available);
                console.log('Printer count:', count);
            });
        }
        
        // Check if canPrintItem() exists (v0.8.0+)
        if (typeof cordova.plugins.printer.canPrintItem === 'function') {
            console.log('✅ cordova.plugins.printer.canPrintItem available (v0.8.0+)');
        }
    } else {
        console.log('❌ New API NOT available');
    }
    
    // Test 2: Legacy API (window.plugin.printer)
    if (typeof window !== 'undefined' && 
        window.plugin && 
        window.plugin.printer && 
        typeof window.plugin.printer.print === 'function') {
        console.log('✅ Legacy API available: window.plugin.printer.print');
    } else {
        console.log('❌ Legacy API NOT available');
    }
    
    // Test 3: Check for specific v0.8.0 features
    if (cordova.plugins && cordova.plugins.printer) {
        var v08Features = [
            'print',
            'check',
            'canPrintItem',
            'pick'
        ];
        
        console.log('=== Checking v0.8.0 Features ===');
        v08Features.forEach(function(method) {
            var available = typeof cordova.plugins.printer[method] === 'function';
            console.log(method + ':', available ? '✅' : '❌');
        });
    }
};
````

---

## 🔍 Method 5: Check GitHub/NPM for version differences

### **Compare your code with plugin documentation:**

**v0.8.0 API (Latest):**
```javascript
// New API
cordova.plugins.printer.print(content, options, callback);

// Available methods in v0.8.0:
cordova.plugins.printer.check(callback);
cordova.plugins.printer.print(content, options, callback);
cordova.plugins.printer.canPrintItem(content, callback);
cordova.plugins.printer.pick(callback);
```

**v0.7.x API (Older):**
```javascript
// Legacy API
window.plugin.printer.print(content, options, callback);

// Limited methods
window.plugin.printer.isAvailable(callback);
window.plugin.printer.print(content, options, callback);
```

---

## 📊 Quick Version Detection:

````javascript
// Add this to detect plugin version
document.addEventListener('deviceready', function() {
    if (cordova.plugins && cordova.plugins.printer) {
        // Check for v0.8.0+ features
        if (typeof cordova.plugins.printer.check === 'function') {
            console.log('📦 Printer Plugin: v0.8.0 or higher');
        } else if (typeof cordova.plugins.printer.print === 'function') {
            console.log('📦 Printer Plugin: v0.7.x');
        }
    } else if (window.plugin && window.plugin.printer) {
        console.log('📦 Printer Plugin: Legacy version (< v0.7.0)');
    } else {
        console.log('❌ Printer Plugin: NOT INSTALLED');
    }
}, false);
````

---

## 🎯 Summary Commands:

```bash
# Run in PowerShell at project root
cd D:\Sources\NewCordova\trunk

# 1. Quick check
cordova plugin list | findstr printer

# 2. Detailed info
Get-Content config.xml | Select-String printer
Get-Content plugins/fetch.json | Select-String printer

# 3. Check plugin package
Get-Content plugins/cordova-plugin-printer/package.json | Select-String version

# 4. List all plugin files
dir plugins/cordova-plugin-printer/
```

---

## 🎯 Expected Results:

### **If v0.8.0:**
```
cordova-plugin-printer 0.8.0 "Printer"

Available APIs:
✅ cordova.plugins.printer.print
✅ cordova.plugins.printer.check
✅ cordova.plugins.printer.canPrintItem
✅ cordova.plugins.printer.pick
```

### **If v0.7.x:**
```
cordova-plugin-printer 0.7.x "Printer"

Available APIs:
✅ window.plugin.printer.print
✅ window.plugin.printer.isAvailable
❌ cordova.plugins.printer.check (not available)
```

---

**Run `cordova plugin list` first and share the output to confirm your version!**