# Giải thích `_saveDirectory` và Cordova File Paths trên Android

## 📝 `_saveDirectory` là gì?

**`_saveDirectory`** là biến lưu đường dẫn thư mục để save file downloaded trên thiết bị mobile.

---

## 📊 `cordova.file.dataDirectory` là gì?

### **Definition:**
`cordova.file.dataDirectory` là constant từ **cordova-plugin-file** trỏ đến app's private data directory.

### **Characteristics:**
- ✅ **Private** - Chỉ app có thể access
- ✅ **Persistent** - Không bị xóa khi clear cache
- ✅ **Backed up** - Được backup (iOS iCloud, Android auto-backup)
- ❌ **Not accessible** - User không thể access trực tiếp

---

## 🤖 `cordova.file.dataDirectory` trên Android:

### **Path format:**
```javascript
cordova.file.dataDirectory
// → "file:///data/user/0/com.somotsoft.pteverywhere/files/"
```

### **Breakdown:**
```
file:///data/user/0/com.somotsoft.pteverywhere/files/
│      │    │    │  │                               │
│      │    │    │  └─ App package name             └─ Files directory
│      │    │    └─ User ID (0 = primary user)
│      │    └─ Multi-user support
│      └─ Internal storage
└─ File URI scheme
```

### **Full path example:**
```javascript
var fileURL = cordova.file.dataDirectory + "document.pdf";
// → "file:///data/user/0/com.somotsoft.pteverywhere/files/document.pdf"
```

---

## 📊 Cordova File Directories Comparison:

| Directory | Android Path | User Accessible? | Persistent? | Use Case |
|-----------|--------------|------------------|-------------|----------|
| **`dataDirectory`** | `/data/user/0/[app]/files/` | ❌ NO | ✅ YES | **App data** (recommended) |
| **`cacheDirectory`** | `/data/user/0/[app]/cache/` | ❌ NO | ❌ NO | Temporary files |
| **`externalDataDirectory`** | `/sdcard/Android/data/[app]/files/` | ⚠️ LIMITED | ✅ YES | Shareable files |
| **`externalRootDirectory`** | `/sdcard/` | ✅ YES | ✅ YES | Public storage |
| **Download folder** | `/sdcard/Download/` | ✅ YES | ✅ YES | User downloads |

---

## 🚨 Vấn đề:  URI không work với Android Print

### **Problem:**
```javascript
// Downloaded file
var fileURI = "file:///data/user/0/com.somotsoft.pteverywhere/files/document.pdf";

// Try to print
$cordovaPrinter.print(fileURI);
// ❌ FAILS: "Webpage not available" or "ERR_ACCESS_DENIED"
```

**Why?**
- Android 7.0+ **FileUriExposedException** - Cannot share  URI between apps
- Print service runs in separate process → Cannot access app's private storage

---

## ✅ Solution: **KHÔNG CẦN** hardcode `content://` URI

### **Recommended approach:**

````javascript
'use strict';

angular.module('downloadService', [])
    .factory('downloadService', ['$document', '$q',
    function ($document, $q) {
        var _saveDirectory = '';
        var _fileTransfer;
        
        // Set attributes from Cordova plugins
        $document[0].addEventListener('deviceready', function () {
            _fileTransfer = window.FileTransfer && new FileTransfer();
            
            if (device && device.platform && device.platform.toLowerCase() == "ios") {
                // iOS: Use synced data directory (backed up to iCloud)
                _saveDirectory = cordova.file.syncedDataDirectory;
                console.log('iOS _saveDirectory:', _saveDirectory);
            }
            else if (device && device.platform && device.platform.toLowerCase() == "android") {
                var permissions = cordova.plugins.permissions;
                
                // Request storage permissions
                if(permissions){
                    permissions.hasPermission(permissions.WRITE_EXTERNAL_STORAGE, function( status ){
                        if ( status.hasPermission ) {
                            console.log("Yes hasPermission");
                        }
                        else {
                            console.log("No hasPermission");
                            permissions.requestPermission(permissions.WRITE_EXTERNAL_STORAGE, 
                                function success( status ) {
                                    if( !status.hasPermission ) 
                                        console.log("No requestPermission");
                                }, 
                                function error() {
                                    console.log('WRITE_EXTERNAL_STORAGE permission is not turned on');
                                }
                            );
                        }
                    });
                }
                
                // ✅ RECOMMENDED: Use externalDataDirectory
                // This directory is:
                // - Accessible by external apps (like print service)
                // - Persistent (not cleared on cache clear)
                // - Backed up (Android auto-backup)
                // - Removed when app is uninstalled
                _saveDirectory = cordova.file.externalDataDirectory;
                // → "file:///storage/emulated/0/Android/data/com.somotsoft.pteverywhere/files/"
                
                // ❌ AVOID: dataDirectory (private storage)
                // _saveDirectory = cordova.file.dataDirectory;
                // → "file:///data/user/0/com.somotsoft.pteverywhere/files/"
                // Cannot be accessed by print service
                
                // ⚠️ ALTERNATIVE: Download folder (public storage)
                // _saveDirectory = cordova.file.externalRootDirectory + 'Download/';
                // → "file:///storage/emulated/0/Download/"
                // User can see and delete files
                
                console.log('Android _saveDirectory:', _saveDirectory);
            }
            else {
                _saveDirectory = cordova.file.dataDirectory;
            }

        }, false);

        return {
            /**
             * Download file to device storage
             * @param {string} url - URL to download
             * @param {string} fileName - File name to save
             * @param {boolean} isEncodeURI - Whether to encode URI (default: true)
             * @returns {Promise<string>} Promise resolves with local file URL
             */
            download: function (url, fileName, isEncodeURI) {
                // Default isEncodeURI to true if not provided
                if (isEncodeURI === undefined || isEncodeURI === null) {
                    isEncodeURI = true;
                }
                
                return $q(function (resolve, reject) {
                    if (window && typeof window.resolveLocalFileSystemURL === 'function') {
                        window.resolveLocalFileSystemURL(_saveDirectory, function (fileSystem) {
                            var reader = fileSystem.createReader();
                            reader.readEntries(function (entries) {
                                    try{
                                        // Clean up old PDF files
                                        for (var i = 0; i < entries.length; i++) {
                                            if(entries[i].isFile){
                                                if(entries[i].name.toUpperCase().indexOf('.PDF') > -1){
                                                    entries[i].remove(function (success) {
                                                        console.log('Removed old PDF file');
                                                    },
                                                    function (error) {
                                                        console.log('Error removing old PDF:', JSON.stringify(error));
                                                    });
                                                }
                                            }
                                        }
                                    } catch (e) {
                                        console.log('Error cleaning old PDFs:', e);
                                        reject(JSON.stringify(e.message));
                                    }

                                    if (!_fileTransfer) {
                                        reject('error.noTransfer');
                                        return;
                                    }
                                    if (!_saveDirectory) {
                                        reject('error.noDirectory');
                                        return;
                                    }
                                    
                                    var fileURL = _saveDirectory + fileName;
                                    
                                    // Conditional encoding based on isEncodeURI parameter
                                    var uri = isEncodeURI ? encodeURI(url) : url;
                                    
                                    console.log('Download params:', {
                                        originalUrl: url,
                                        encodedUri: uri,
                                        isEncodeURI: isEncodeURI,
                                        fileName: fileName,
                                        saveDirectory: _saveDirectory,
                                        fullFilePath: fileURL
                                    });
                                    
                                    // iOS: Clean up old files
                                    if (device.platform === 'iOS') {
                                        window.requestFileSystem(window.PERSISTENT, 0, function(fileSystem) {
                                            var entry = fileSystem.root;
                                            
                                            entry.getDirectory(_saveDirectory, {
                                                    create: true,
                                                    exclusive: false
                                                },
                                                function(entry) {
                                                    entry.removeRecursively(function() {
                                                        console.log("Remove Recursively Succeeded");
                                                    });
                                                });
                                        });
                                    }
                                    
                                    // Start download
                                    _fileTransfer.download(
                                        uri,
                                        fileURL,
                                        function (entry) {
                                            console.log('Download success');
                                            console.log('Entry:', entry);
                                            console.log('File URL:', fileURL);
                                            console.log('Entry URL:', entry.toURL());
                                            
                                            // ✅ Return entry.toURL() for better compatibility
                                            resolve(entry.toURL());
                                        },
                                        function (error) {
                                            console.log('Download error:', error);
                                            console.log('Error code:', error.code);
                                            console.log('Error source:', error.source);
                                            console.log('Error target:', error.target);
                                            reject(error);
                                        },
                                        true // trustAllHosts
                                    );
                                },
                                function (error) {
                                    console.log('readEntries error:', error);
                                    reject(error);
                                }
                            );
                        }, function(error) {
                            console.log('resolveLocalFileSystemURL error:', error);
                            reject(error);
                        });
                    } else {
                        reject('File system API not available');
                    }
                });
            }
        };
    }]);
````

---

## 📊 Directory Comparison on Android:

### **1. `cordova.file.dataDirectory` (Internal Private)**
```javascript
_saveDirectory = cordova.file.dataDirectory;
// → "file:///data/user/0/com.somotsoft.pteverywhere/files/"
```

**Pros:**
- ✅ Secure (app-only access)
- ✅ Fast (internal storage)

**Cons:**
- ❌ **Cannot print** (FileUriExposedException)
- ❌ Cannot share with other apps
- ❌ User cannot access

**Use case:**
- Sensitive data storage
- Database files
- Configuration files

---

### **2. `cordova.file.externalDataDirectory` (External App-Specific)**
```javascript
_saveDirectory = cordova.file.externalDataDirectory;
// → "file:///storage/emulated/0/Android/data/com.somotsoft.pteverywhere/files/"
```

**Pros:**
- ✅ **Can print** (accessible by print service)
- ✅ Persistent (not cleared on cache clear)
- ✅ Backed up (Android auto-backup)
- ✅ Auto-removed on app uninstall

**Cons:**
- ⚠️ Requires WRITE_EXTERNAL_STORAGE permission (Android < 10)
- ⚠️ Slower than internal storage

**Use case:**
- ✅ **PDF files for printing** (RECOMMENDED)
- ✅ Documents to share
- ✅ Media files

---

### **3. Download Folder (Public Storage)**
```javascript
_saveDirectory = cordova.file.externalRootDirectory + 'Download/';
// → "file:///storage/emulated/0/Download/"
```

**Pros:**
- ✅ User can access files
- ✅ Files persist after app uninstall
- ✅ Can print easily

**Cons:**
- ❌ User can delete files
- ❌ Files clutter user's Downloads
- ❌ Security concern (public access)

**Use case:**
- User-initiated downloads
- Files user wants to keep
- Files to share with other apps

---

## 🎯 Recommendation for Print:

### **Best practice:**

````javascript
// ...existing code...

else if (device && device.platform && device.platform.toLowerCase() == "android") {
    var permissions = cordova.plugins.permissions;
    
    if(permissions){
        permissions.hasPermission(permissions.WRITE_EXTERNAL_STORAGE, function( status ){
            if ( status.hasPermission ) {
                console.log("Yes hasPermission");
            }
            else {
                console.log("No hasPermission");
                permissions.requestPermission(permissions.WRITE_EXTERNAL_STORAGE, 
                    function success( status ) {
                        if( !status.hasPermission ) 
                            console.log("No requestPermission");
                    }, 
                    function error() {
                        console.log('WRITE_EXTERNAL_STORAGE permission is not turned on');
                    }
                );
            }
        });
    }
    
    // ✅ RECOMMENDED: Use externalDataDirectory for print files
    _saveDirectory = cordova.file.externalDataDirectory;
    
    console.log('Android _saveDirectory:', _saveDirectory);
}

// ...existing code...
````

---

## 🚨 KHÔNG CẦN hardcode `content://` URI

### **Why?**

1. **Cordova FileTransfer automatically handles URI conversion**
   - Returns proper URI format for each platform
   - `entry.toURL()` returns correct URI

2. **Android Print Service accepts  from external storage**
   - `file:///storage/emulated/0/Android/data/[app]/files/` ✅ Works
   - `file:///data/user/0/[app]/files/` ❌ Doesn't work

3. **No need for FileProvider**
   - External storage is accessible without FileProvider
   - Internal storage requires FileProvider (complex setup)

---

## 💡 How to get correct Android path:

### **Method 1: Use Cordova constants (Recommended)**

```javascript
// ✅ BEST: Let Cordova handle paths
var saveDir = cordova.file.externalDataDirectory;
// → Automatically resolves to correct path for device
```

### **Method 2: Check at runtime**

```javascript
$document[0].addEventListener('deviceready', function () {
    console.log('Available directories:');
    console.log('dataDirectory:', cordova.file.dataDirectory);
    console.log('cacheDirectory:', cordova.file.cacheDirectory);
    console.log('externalDataDirectory:', cordova.file.externalDataDirectory);
    console.log('externalRootDirectory:', cordova.file.externalRootDirectory);
    console.log('externalCacheDirectory:', cordova.file.externalCacheDirectory);
    console.log('documentsDirectory:', cordova.file.documentsDirectory);
    console.log('syncedDataDirectory:', cordova.file.syncedDataDirectory);
});

// Output on Android:
// dataDirectory: file:///data/user/0/com.somotsoft.pteverywhere/files/
// cacheDirectory: file:///data/user/0/com.somotsoft.pteverywhere/cache/
// externalDataDirectory: file:///storage/emulated/0/Android/data/com.somotsoft.pteverywhere/files/
// externalRootDirectory: file:///storage/emulated/0/
// ...
```

### **Method 3: Test file accessibility**

```javascript
function testFileAccess(fileURI) {
    window.resolveLocalFileSystemURL(fileURI, 
        function(fileEntry) {
            fileEntry.file(function(file) {
                console.log('✅ File accessible:', {
                    path: fileURI,
                    name: file.name,
                    size: file.size
                });
            });
        },
        function(error) {
            console.log('❌ File NOT accessible:', {
                path: fileURI,
                error: error
            });
        }
    );
}
```

---

## 🎯 Final Code Summary:

### **Key changes:**

1. ✅ **Change Android save directory:**
   ```javascript
   // Before
   _saveDirectory = cordova.file.dataDirectory;
   
   // After
   _saveDirectory = cordova.file.externalDataDirectory;
   ```

2. ✅ **Return `entry.toURL()` instead of `fileURL`:**
   ```javascript
   // Before
   resolve(fileURL);
   
   // After
   resolve(entry.toURL());
   ```

3. ✅ **Enhanced logging:**
   ```javascript
   console.log('Download params:', {
       originalUrl: url,
       encodedUri: uri,
       isEncodeURI: isEncodeURI,
       fileName: fileName,
       saveDirectory: _saveDirectory,
       fullFilePath: fileURL
   });
   ```

---

## 🎯 Tổng kết:

| Question | Answer |
|----------|--------|
| **`_saveDirectory` là gì?** | Biến lưu path để save downloaded files |
| **`cordova.file.dataDirectory` là gì?** | App's private internal storage directory |
| **Path trên Android?** | `file:///data/user/0/[app]/files/` |
| **Cần hardcode `content://`?** | ❌ **KHÔNG** - Use `externalDataDirectory` instead |
| **Làm sao lấy đúng path?** | ✅ Use `cordova.file.externalDataDirectory` |
| **Best practice for print?** | ✅ `externalDataDirectory` (accessible by print service) |

**Code đã ready để fix Android print issue!** ✅