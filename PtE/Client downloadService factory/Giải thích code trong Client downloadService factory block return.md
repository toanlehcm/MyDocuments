# Giải thích code trong Client downloadService factory block return

# 🔍 Giải thích chi tiết function `download()` - Tiếng Việt dễ hiểu

## 📋 Tổng quan

Function này **download file từ server** về thiết bị, nhưng **trước đó xóa hết PDF cũ** trong thư mục để tránh đầy bộ nhớ.

---

## 🎯 Workflow tổng quát

```
1. Quét thư mục lưu file
2. Xóa tất cả file PDF cũ
3. Validate _fileTransfer và _saveDirectory
4. (iOS only) Xóa toàn bộ thư mục và tạo lại
5. Download file mới từ server
6. Trả về đường dẫn file
```

---

## 📝 Giải thích từng dòng code

### **Dòng 1-2: Return object với method download**

```javascript
return {
    download: function (url, fileName) {
```

**Giải thích:**
- Service trả về một **object** có method `download`
- Method nhận 2 tham số:
  - `url`: Đường dẫn file trên server (string)
  - `fileName`: Tên file sau khi download (string)

**Usage:**
```javascript
downloadService.download('http://...', 'report.pdf');
```

---

### **Dòng 3: Return Promise**

```javascript
return $q(function (resolve, reject) {
```

**Giải thích:**
- `$q`: AngularJS Promise service (tương tự ES6 Promise)
- `resolve`: Function gọi khi thành công
- `reject`: Function gọi khi thất bại

**Tương đương ES6:**
```javascript
return new Promise((resolve, reject) => {
    // code
});
```

---

### **Dòng 4: Kiểm tra File System API**

```javascript
if (window && typeof window.resolveLocalFileSystemURL === 'function') {
```

**Giải thích:**

```javascript
window                                    // ⬅️ Check window object tồn tại
&&                                        // ⬅️ AND
typeof window.resolveLocalFileSystemURL   // ⬅️ Check kiểu dữ liệu
=== 'function'                            // ⬅️ Phải là function
```

**`resolveLocalFileSystemURL` là gì?**
- API của Cordova File Plugin
- Dùng để **truy cập thư mục/file** trên thiết bị
- Chuyển đổi URL string → FileEntry/DirectoryEntry object

**Ví dụ:**
```javascript
window.resolveLocalFileSystemURL(
    'file:///storage/documents/',
    function(dirEntry) {
        // dirEntry = DirectoryEntry object
        // Có thể đọc, ghi, xóa files
    }
);
```

---

### **Dòng 5: Truy cập thư mục lưu file**

```javascript
window.resolveLocalFileSystemURL(_saveDirectory, function (fileSystem) {
```

**Giải thích:**

**Input:** `_saveDirectory`
- iOS: `cordova.file.syncedDataDirectory`
- Android: `cordova.file.dataDirectory`
- Ví dụ: `file:///data/data/com.app/files/`

**Callback:** `function (fileSystem)`
- `fileSystem`: **DirectoryEntry** object đại diện cho thư mục
- Có thể thao tác với files/folders bên trong

**Cấu trúc DirectoryEntry:**
```javascript
{
    isFile: false,           // Là thư mục
    isDirectory: true,       // Không phải file
    name: "files",
    fullPath: "/files/",
    filesystem: FileSystem,
    nativeURL: "file:///...",
    
    // Methods
    createReader(),          // Tạo reader để đọc files
    getFile(),               // Lấy file
    getDirectory(),          // Lấy thư mục con
    removeRecursively()      // Xóa toàn bộ
}
```

---

### **Dòng 6: Tạo DirectoryReader**

```javascript
var reader = fileSystem.createReader();
```

**Giải thích:**
- `createReader()`: Tạo object để **đọc danh sách files/folders** trong thư mục
- Giống như `fs.readdir()` trong Node.js

**DirectoryReader có method:**
```javascript
reader.readEntries(successCallback, errorCallback)
```

---

### **Dòng 7: Đọc danh sách files**

```javascript
reader.readEntries(function (entries) {
```

**Giải thích:**
- `readEntries()`: Đọc tất cả entries (files + folders) trong thư mục
- **Callback nhận `entries`**: Mảng các FileEntry/DirectoryEntry objects

**`entries` array:**
```javascript
[
    {
        isFile: true,
        name: "report_old.pdf",
        fullPath: "/files/report_old.pdf",
        remove() { ... }
    },
    {
        isFile: true,
        name: "invoice.pdf",
        fullPath: "/files/invoice.pdf",
        remove() { ... }
    },
    {
        isDirectory: true,
        name: "images",
        fullPath: "/files/images/"
    }
]
```

---

### **Dòng 8-9: Bắt đầu try-catch block**

```javascript
try{
    for (var i = 0; i < entries.length; i++) {
```

**Giải thích:**
- `try-catch`: Bắt lỗi có thể xảy ra khi xóa files
- `for loop`: Duyệt qua **TẤT CẢ entries** trong thư mục

**Mục đích:** Xóa tất cả PDF cũ trước khi download file mới

---

### **Dòng 10: Kiểm tra entry là file**

```javascript
if(entries[i].isFile){
```

**Giải thích:**
- `isFile`: Property boolean
- `true` = File
- `false` = Folder

**Tại sao check?**
- Chỉ xóa **files**, không xóa **folders**
- Folder có thể chứa data quan trọng khác

---

### **Dòng 11: Kiểm tra file có phải PDF**

```javascript
if(entries[i].name.toUpperCase().indexOf('.PDF') > -1){
```

**Giải thích từng phần:**

```javascript
entries[i].name          // ⬅️ Tên file, vd: "report_OLD.pdf"
.toUpperCase()           // ⬅️ Chuyển thành chữ HOA: "REPORT_OLD.PDF"
.indexOf('.PDF')         // ⬅️ Tìm vị trí của ".PDF"
> -1                     // ⬅️ Nếu tìm thấy (không phải -1)
```

**Logic:**
```javascript
"report.pdf".toUpperCase().indexOf('.PDF')  // Returns: 6 (tìm thấy)
"report.txt".toUpperCase().indexOf('.PDF')  // Returns: -1 (không tìm thấy)

6 > -1   // true  → Xóa file
-1 > -1  // false → Giữ file
```

**Tại sao dùng `.toUpperCase()`?**
- Case-insensitive matching
- `report.PDF` ✅
- `report.pdf` ✅
- `report.Pdf` ✅

---

### **Dòng 12-16: Xóa file PDF**

```javascript
entries[i].remove(
    function (success) {},
    function (error) {
        console.log(JSON.stringify(error));
        reject(JSON.stringify(error));
    }
);
```

**Giải thích:**

**`remove()` method:**
- Xóa file khỏi file system
- Async operation (non-blocking)

**Success callback:**
```javascript
function (success) {}  // ⬅️ Empty function, không làm gì
```

**Error callback:**
```javascript
function (error) {
    console.log(JSON.stringify(error));  // ⬅️ Log error object
    reject(JSON.stringify(error));       // ⬅️ Reject Promise
}
```

**Error object có thể:**
```javascript
{
    code: 1,              // NOT_FOUND_ERR
    message: "File not found"
}
// hoặc
{
    code: 7,              // INVALID_MODIFICATION_ERR
    message: "Permission denied"
}
```

---

### **Dòng 17-21: Catch block**

```javascript
} catch (e) {
    console.log(e);
    reject(JSON.stringify(e.message));
}
```

**Giải thích:**
- Bắt lỗi JavaScript (không phải File API errors)
- Ví dụ:
  - `TypeError`: entries[i] is undefined
  - `ReferenceError`: Variable không tồn tại

**`e.message` examples:**
```javascript
"Cannot read property 'name' of undefined"
"entries is not defined"
```

---

### **Dòng 23-25: Validate FileTransfer**

```javascript
if (!_fileTransfer) {
    reject('error.noTransfer');
}
```

**Giải thích:**
- Check biến global `_fileTransfer` đã được khởi tạo chưa
- Nếu `null`/`undefined` → Reject với message key

**Tại sao có thể null?**
```javascript
// Trong deviceready event:
_fileTransfer = window.FileTransfer && new FileTransfer();
                ↑
                Nếu window.FileTransfer không tồn tại
                → _fileTransfer = undefined
```

**Error message:**
```javascript
'error.noTransfer'  // Translation key, not literal message
```

---

### **Dòng 26-28: Validate Save Directory**

```javascript
if (!_saveDirectory) {
    reject('error.noDirectory');
}
```

**Giải thích:**
- Check biến global `_saveDirectory` đã được set chưa
- Nếu empty → Cannot save file

**Tại sao có thể empty?**
- Plugin chưa load
- Platform không được hỗ trợ
- `deviceready` event chưa fire

---

### **Dòng 30-31: Tạo đường dẫn file đầy đủ**

```javascript
var fileURL = _saveDirectory + fileName;
var uri = encodeURI(url);
```

**Giải thích:**

**Line 1: Concat path**
```javascript
_saveDirectory = 'file:///data/data/com.app/files/'
fileName = 'report.pdf'
fileURL = 'file:///data/data/com.app/files/report.pdf'
```

**Line 2: Encode URL**
```javascript
url = 'http://server.com/api/file?name=report 2024.pdf'
uri = 'http://server.com/api/file?name=report%202024.pdf'
                                           ↑
                                    Space → %20
```

**Tại sao cần `encodeURI()`?**
- URL không được chứa spaces, special characters
- `encodeURI()` chuyển đổi:
  - Space → `%20`
  - `é` → `%C3%A9`
  - `中` → `%E4%B8%AD`

---

### **Dòng 32: Kiểm tra nếu là iOS**

```javascript
if (device.platform === 'iOS') {
```

**Giải thích:**
- Chỉ chạy đoạn code này trên **iOS**
- Android **KHÔNG** chạy đoạn này

**Tại sao iOS special case?**
- iOS có file system caching issues
- Cần xóa thư mục hoàn toàn và tạo lại

---

### **Dòng 33-34: Request File System trên iOS**

```javascript
window.requestFileSystem(window.PERSISTENT, 0, function(fileSystem) {
    var entry = fileSystem.root;
```

**Giải thích:**

**`window.requestFileSystem(type, size, successCallback, errorCallback)`**

**Parameters:**
```javascript
window.PERSISTENT    // ⬅️ Type: PERSISTENT (không bị xóa) vs TEMPORARY (có thể bị xóa)
0                    // ⬅️ Size: 0 bytes (không giới hạn)
function(fileSystem) // ⬅️ Success callback
```

**`fileSystem.root`:**
- Root directory của file system
- Dùng để truy cập thư mục con

---

### **Dòng 36-41: Xóa thư mục đệ quy (iOS)**

```javascript
entry.getDirectory(_saveDirectory, {
        create: true,
        exclusive: false
    },
    function(entry) {
        entry.removeRecursively(function() {
            console.log("Remove Recursively Succeeded");
        });
    });
```

**Giải thích:**

**Step 1: Get/Create directory**
```javascript
entry.getDirectory(
    _saveDirectory,          // ⬅️ Đường dẫn thư mục
    {
        create: true,        // ⬅️ Tạo nếu chưa tồn tại
        exclusive: false     // ⬅️ Không throw error nếu đã tồn tại
    },
    successCallback
)
```

**Step 2: Remove everything**
```javascript
entry.removeRecursively(callback)
// ⬅️ Xóa TẤT CẢ files + subfolders
// ⬅️ Giống như: rm -rf directory/
```

**⚠️ WARNING:**
```javascript
// Xóa toàn bộ:
- Tất cả files
- Tất cả subfolders
- Mọi thứ bên trong

// Không thể undo!
```

**Console output:**
```
Remove Recursively Succeeded
```

---

### **Dòng 45-47: Bắt đầu download**

```javascript
_fileTransfer.download(
    uri,
    fileURL,
```

**Giải thích:**

**`_fileTransfer.download()` signature:**
```javascript
download(
    source,           // ⬅️ URL nguồn (server)
    target,           // ⬅️ Đường dẫn lưu file (local)
    successCallback,
    errorCallback,
    trustAllHosts,    // ⬅️ Accept self-signed SSL?
    options           // ⬅️ Headers, etc.
)
```

**Parameters trong code:**
```javascript
uri = 'http://server.com/api/file?name=report.pdf'
fileURL = 'file:///data/data/com.app/files/report.pdf'
```

---

### **Dòng 48-51: Success callback**

```javascript
function (entry) {
    console.log('entry ' + entry);
    resolve(fileURL);
},
```

**Giải thích:**

**`entry` parameter:**
- **FileEntry** object đại diện cho file vừa download
- Chứa metadata về file

**FileEntry structure:**
```javascript
{
    isFile: true,
    name: "report.pdf",
    fullPath: "/files/report.pdf",
    nativeURL: "file:///data/data/com.app/files/report.pdf",
    filesystem: FileSystem,
    
    // Methods
    file(callback),        // Get file metadata
    remove(callback),      // Delete file
    moveTo(parent, name)   // Move file
}
```

**Console output:**
```
entry [object FileEntry]
```

**`resolve(fileURL)`:**
- Promise thành công
- Trả về đường dẫn file: `file:///...report.pdf`
- Controller nhận được `fileURL` để print

---

### **Dòng 52-55: Error callback**

```javascript
function (error) {
    console.log('error ' + error);
    reject(error);
},
```

**Giải thích:**

**`error` object structure:**
```javascript
{
    code: 3,                           // FileTransferError code
    source: "http://server.com/...",   // URL nguồn
    target: "file:///data/...",        // Đường dẫn target
    http_status: 404,                  // HTTP status code
    body: "Not Found",                 // Response body
    exception: "Connection refused"    // Exception message
}
```

**Error codes:**
```javascript
1 = FILE_NOT_FOUND_ERR      // File không tồn tại
2 = INVALID_URL_ERR         // URL không hợp lệ
3 = CONNECTION_ERR          // Lỗi kết nối network
4 = ABORT_ERR               // Download bị hủy
5 = NOT_MODIFIED_ERR        // File không thay đổi
```

**Console output examples:**
```
error [object FileTransferError]
error {"code":3,"source":"http://...","target":"file://..."}
```

**`reject(error)`:**
- Promise thất bại
- Controller nhận error để hiển thị message

---

### **Dòng 56: trustAllHosts parameter**

```javascript
true
```

**Giải thích:**
- `true`: Chấp nhận **self-signed SSL certificates**
- `false`: Chỉ chấp nhận SSL certificates hợp lệ

**Use cases:**
```javascript
true  → Development/Testing với localhost
false → Production với SSL certificate chính thức
```

**⚠️ Security warning:**
```javascript
// Development
_fileTransfer.download(url, path, success, error, true);  // OK

// Production
_fileTransfer.download(url, path, success, error, false); // Better
```

---

### **Dòng 57-61: Error callback của readEntries**

```javascript
},
function (error) {
    console.log('readEntries error : ' + error);
    reject(error);
}
```

**Giải thích:**
- Error callback của `reader.readEntries()`
- Được gọi khi **không thể đọc thư mục**

**Lỗi có thể:**
```javascript
{
    code: 1,              // NOT_FOUND_ERR
    message: "Directory not found"
}
// hoặc
{
    code: 7,              // INVALID_MODIFICATION_ERR
    message: "Permission denied"
}
```

**Console output:**
```
readEntries error : [object FileError]
```

---

## 🎯 Flow Chart chi tiết

```
download(url, fileName) được gọi
        ↓
Return Promise
        ↓
Check: window.resolveLocalFileSystemURL exists?
        ↓ YES
Truy cập _saveDirectory
        ↓
Tạo DirectoryReader
        ↓
Đọc danh sách files (readEntries)
        ↓
┌─────────────────────────────────┐
│ TRY BLOCK                       │
│                                 │
│ FOR each entry:                │
│   ├─ Is file?                  │
│   │   └─ Is PDF?               │
│   │       └─ DELETE file ❌    │
│   │                            │
│   └─ Is folder? → Skip         │
└─────────────────────────────────┘
        ↓
Validate _fileTransfer exists?
        ↓ YES
Validate _saveDirectory exists?
        ↓ YES
Build fileURL = _saveDirectory + fileName
Encode URI
        ↓
┌─────────────────────────────────┐
│ IF iOS ONLY:                    │
│   Request FileSystem            │
│   Get root directory            │
│   Get _saveDirectory            │
│   removeRecursively() 🗑️       │
└─────────────────────────────────┘
        ↓
START DOWNLOAD 📥
_fileTransfer.download(uri, fileURL, ...)
        ↓
    ┌───────┴───────┐
  SUCCESS        FAILURE
    ↓               ↓
Log entry      Log error
resolve(fileURL)  reject(error)
    ↓               ↓
Controller    Controller
receives      receives
fileURL       error
```

---

## 🐛 Common Errors và giải thích

### **Error 1: "readEntries error"**
```javascript
// Nguyên nhân:
- Thư mục không tồn tại
- Không có quyền truy cập
- File system bị corrupt

// Fix:
- Check permissions
- Reinstall app
- Clear app data
```

### **Error 2: "error.noTransfer"**
```javascript
// Nguyên nhân:
- FileTransfer plugin chưa load
- deviceready chưa fire
- Plugin không được install

// Fix:
cordova plugin add cordova-plugin-file-transfer
```

### **Error 3: Download failed (code: 3)**
```javascript
// Nguyên nhân:
- No internet connection
- Server down
- Firewall blocking

// Fix:
- Check network
- Verify server URL
- Check firewall settings
```

---

## ⚠️ Issues trong code hiện tại

### **Issue 1: Race condition khi xóa files**

```javascript
// Problem:
for (var i = 0; i < entries.length; i++) {
    entries[i].remove(success, error);  // ⬅️ Async!
}
// Download starts NGAY LẬP TỨC, không đợi xóa xong

// Fix: Dùng Promise.all()
var removePromises = entries
    .filter(e => e.isFile && e.name.toUpperCase().includes('.PDF'))
    .map(e => new Promise((resolve, reject) => {
        e.remove(resolve, reject);
    }));

Promise.all(removePromises).then(() => {
    // Bây giờ mới download
    _fileTransfer.download(...);
});
```

### **Issue 2: iOS xóa thư mục nhưng không chờ hoàn thành**

```javascript
// Problem:
entry.removeRecursively(function() {
    console.log("Remove Recursively Succeeded");
});
// Download starts luôn, không đợi removeRecursively xong

// Fix: Wrap trong Promise
function removeDirectoryIOS() {
    return new Promise((resolve, reject) => {
        window.requestFileSystem(window.PERSISTENT, 0, function(fs) {
            fs.root.getDirectory(_saveDirectory, {create: true}, function(entry) {
                entry.removeRecursively(resolve, reject);
            }, reject);
        }, reject);
    });
}

// Usage:
if (device.platform === 'iOS') {
    await removeDirectoryIOS();
}
_fileTransfer.download(...);
```

### **Issue 3: Không có progress tracking**

```javascript
// Add progress callback:
_fileTransfer.onprogress = function(progressEvent) {
    if (progressEvent.lengthComputable) {
        var percentage = (progressEvent.loaded / progressEvent.total) * 100;
        console.log('Download progress:', percentage.toFixed(0) + '%');
    }
};
```

---

## 💡 Best Practices để improve

### **1. Add timeout**
```javascript
_fileTransfer.download(
    uri,
    fileURL,
    success,
    error,
    true,
    {
        headers: { ... },
        timeout: 30000  // 30 seconds
    }
);
```

### **2. Add retry logic**
```javascript
function downloadWithRetry(url, fileName, maxRetries = 3) {
    let attempt = 0;
    
    function attemptDownload() {
        return downloadService.download(url, fileName)
            .catch(error => {
                attempt++;
                if (attempt < maxRetries) {
                    console.log(`Retry ${attempt}/${maxRetries}`);
                    return attemptDownload();
                }
                throw error;
            });
    }
    
    return attemptDownload();
}
```

### **3. Add file size validation**
```javascript
function (entry) {
    entry.file(function(file) {
        if (file.size === 0) {
            reject(new Error('Downloaded file is empty'));
        } else if (file.size < 1024) {
            console.warn('File size is very small:', file.size);
        }
        resolve(fileURL);
    });
}
```

---

## 🎓 Tóm tắt

```
INPUT:  url (string) + fileName (string)

PROCESS:
1. Quét thư mục → Xóa PDF cũ
2. (iOS) Xóa toàn bộ thư mục
3. Download file mới
4. Save vào _saveDirectory + fileName

OUTPUT: 
✅ Success: fileURL (string)
❌ Failure: error object

ISSUES:
⚠️ Race conditions (không đợi xóa xong)
⚠️ No progress tracking
⚠️ No timeout handling
⚠️ No retry logic
```