# Giải thích code trong Client downloadService factory block function

D:\SVN\Pte-7275\Client\app\scripts\factory\downloadService.js

# 🔍 Giải thích chi tiết code - Tiếng Việt dễ hiểu

## 📱 Tổng quan

Code này **khởi tạo service download** khi app mobile (Cordova) sẵn sàng, và **xác định thư mục lưu file** theo từng nền tảng (iOS/Android).

---

## 🔄 Giải thích từng dòng

### **Dòng 1-2: Lắng nghe sự kiện 'deviceready'**

```javascript
$document[0].addEventListener('deviceready', function () {
```

**Giải thích:**
- `$document[0]`: Lấy DOM element gốc (document) từ AngularJS wrapper
- `.addEventListener('deviceready', ...)`: Đăng ký lắng nghe sự kiện
- **`deviceready`**: Sự kiện đặc biệt của Cordova, được trigger khi:
  - ✅ Native plugins đã load xong
  - ✅ Device APIs sẵn sàng sử dụng
  - ✅ App có thể gọi Cordova plugins

**Tương tự như:**
```javascript
// Trong web thông thường
document.addEventListener('DOMContentLoaded', function() {
    // Code chạy khi DOM sẵn sàng
});

// Trong Cordova
document.addEventListener('deviceready', function() {
    // Code chạy khi Cordova plugins sẵn sàng
});
```

---

### **Dòng 2: Khởi tạo FileTransfer**

```javascript
_fileTransfer = window.FileTransfer && new FileTransfer();
```

**Giải thích:**
- `window.FileTransfer`: Check xem plugin FileTransfer có tồn tại không
- `&&`: Toán tử AND - chỉ tạo instance nếu plugin tồn tại
- `new FileTransfer()`: Tạo object để download/upload files

**Tương đương:**
```javascript
// Cách viết dài
if (window.FileTransfer) {
    _fileTransfer = new FileTransfer();
} else {
    _fileTransfer = undefined; // Plugin không có
}
```

**Lưu ý:**
- `_fileTransfer` là biến global của service
- Dùng để download file sau này: `_fileTransfer.download(url, path, ...)`

---

### **Dòng 3: Kiểm tra nền tảng iOS**

```javascript
if (device && device.platform && device.platform.toLowerCase() == "ios") {
```

**Giải thích từng phần:**

```javascript
device                    // ⬅️ Object chứa thông tin thiết bị (từ cordova-plugin-device)
device.platform           // ⬅️ Tên nền tảng: "iOS", "Android", etc.
.toLowerCase()            // ⬅️ Chuyển thành chữ thường: "iOS" → "ios"
== "ios"                  // ⬅️ So sánh với chuỗi "ios"
```

**Giá trị `device.platform` có thể:**
- `"iOS"` - iPhone/iPad
- `"Android"` - điện thoại Android
- `"browser"` - chạy trên web browser

**Safe check:**
```javascript
device              // Check device object tồn tại
&&                  // AND
device.platform     // Check platform property tồn tại
&&                  // AND
device.platform.toLowerCase() == "ios"  // Check là iOS
```

---

### **Dòng 4: Thiết lập thư mục lưu cho iOS**

```javascript
_saveDirectory = cordova.file.syncedDataDirectory;
```

**Giải thích:**

**`cordova.file.syncedDataDirectory`** là gì?
- Thư mục **tự động sync với iCloud**
- Đường dẫn: `/Library/Application Support/`
- Dùng để lưu files quan trọng

**Các options thư mục trên iOS:**

| Directory | Path | Sync iCloud? | Backup? |
|-----------|------|--------------|---------|
| `documentsDirectory` | `/Documents/` | ❌ | ✅ |
| `syncedDataDirectory` | `/Library/Application Support/` | ✅ | ✅ |
| `tempDirectory` | `/tmp/` | ❌ | ❌ |
| `cacheDirectory` | `/Library/Caches/` | ❌ | ❌ |

**Ví dụ đường dẫn:**
```
file:///var/mobile/Containers/Data/Application/[APP-ID]/Library/Application Support/
```

---

### **Dòng 5-6: Kiểm tra nền tảng Android**

```javascript
else if (device && device.platform && device.platform.toLowerCase() == "android") {
    var permissions = cordova.plugins.permissions;
```

**Giải thích:**
- Nếu **KHÔNG phải iOS** → check xem có phải Android không
- `cordova.plugins.permissions`: Plugin quản lý quyền trên Android
- Lưu vào biến `permissions` để dùng sau

**Android permissions:**
- Từ Android 6.0+: Cần **xin quyền runtime**
- Không tự động có quyền như iOS

---

### **Dòng 7-8: Kiểm tra plugin permissions**

```javascript
if(permissions){
    permissions.hasPermission(permissions.WRITE_EXTERNAL_STORAGE, function( status ){
```

**Giải thích:**

**`permissions.hasPermission()`**: Kiểm tra app đã có quyền chưa

```javascript
permissions.hasPermission(
    permissions.WRITE_EXTERNAL_STORAGE,  // ⬅️ Quyền muốn check
    function( status ) {                  // ⬅️ Callback nhận kết quả
        // status.hasPermission = true/false
    }
)
```

**`WRITE_EXTERNAL_STORAGE` là gì?**
- Quyền **ghi file vào bộ nhớ ngoài** (SD card/shared storage)
- Cần thiết để lưu PDF vào thư mục Download
- Manifest permission trong AndroidManifest.xml:
  ```xml
  <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
  ```

---

### **Dòng 9-11: Xử lý khi ĐÃ CÓ quyền**

```javascript
if ( status.hasPermission ) {
    console.log("Yes hasPermission");
}
```

**Giải thích:**
- `status.hasPermission = true`: User đã cấp quyền trước đó
- Chỉ log ra console
- **Không cần làm gì thêm** vì đã có quyền

**Console output:**
```
Yes hasPermission
```

---

### **Dòng 12-21: Xử lý khi CHƯA CÓ quyền**

```javascript
else {
    console.log("No hasPermission");
    permissions.requestPermission(
        permissions.WRITE_EXTERNAL_STORAGE, 
        function success( status ) {
            if( !status.hasPermission ) 
                console.log("No requestPermission");
        }, 
        function error() {
            console.log('WRITE_EXTERNAL_STORAGE permission is not turned on');
        }
    );
}
```

**Giải thích chi tiết:**

#### **Bước 1: Log ra console**
```javascript
console.log("No hasPermission");  // App chưa có quyền
```

#### **Bước 2: Hiện popup xin quyền**
```javascript
permissions.requestPermission(
    permissions.WRITE_EXTERNAL_STORAGE,  // ⬅️ Quyền cần xin
    successCallback,                      // ⬅️ User cho phép
    errorCallback                         // ⬅️ User từ chối hoặc lỗi
)
```

**Popup trên Android:**
```
┌──────────────────────────────────────┐
│  Allow PTE Everywhere to access      │
│  photos, media, and files on your    │
│  device?                              │
│                                       │
│  [ DENY ]           [ ALLOW ]        │
└──────────────────────────────────────┘
```

#### **Bước 3a: Success callback (User cho phép)**
```javascript
function success( status ) {
    if( !status.hasPermission ) {
        console.log("No requestPermission");
        // ⬆️ Weird case: User vừa cho phép nhưng vẫn không có quyền?
        //    Có thể do bug hoặc restrictions từ device admin
    }
}
```

#### **Bước 3b: Error callback (User từ chối)**
```javascript
function error() {
    console.log('WRITE_EXTERNAL_STORAGE permission is not turned on');
    // ⬆️ User clicked "Deny" hoặc có lỗi hệ thống
}
```

---

### **Dòng 24-26: Thiết lập thư mục lưu cho Android**

```javascript
// _saveDirectory = 'file:///storage/emulated/0/Download/';// cordova.file.externalApplicationStorageDirectory;
_saveDirectory = cordova.file.dataDirectory
console.log('_saveDirectory'  + _saveDirectory)
```

**Giải thích:**

#### **Dòng đã comment (không dùng):**
```javascript
// _saveDirectory = 'file:///storage/emulated/0/Download/';
```
- Thư mục **Download** của hệ thống (shared storage)
- **Lý do không dùng:** Cần quyền `WRITE_EXTERNAL_STORAGE`
- User có thể thấy file trong app Files/Downloads

```javascript
// cordova.file.externalApplicationStorageDirectory;
```
- Thư mục riêng của app trên SD card
- **Lý do không dùng:** Không chắc chắn có SD card

#### **Dòng đang dùng:**
```javascript
_saveDirectory = cordova.file.dataDirectory
```

**`cordova.file.dataDirectory` là gì?**
- Thư mục **riêng tư** của app (internal storage)
- Đường dẫn: `/data/data/com.yourapp/files/`
- **KHÔNG CẦN xin quyền** (private storage)
- User **KHÔNG THỂ thấy** file qua app Files
- File bị xóa khi uninstall app

**Ví dụ đường dẫn:**
```
file:///data/data/com.somotsoft.pte/files/
```

#### **Log ra console:**
```javascript
console.log('_saveDirectory' + _saveDirectory)
// Output: _saveDirectory file:///data/data/com.somotsoft.pte/files/
```

---

### **Dòng 27-29: Platform khác (fallback)**

```javascript
else {
    _saveDirectory = cordova.file.dataDirectory;
}
```

**Giải thích:**
- Nếu **không phải iOS** và **không phải Android**
- Ví dụ: Windows Phone, Browser platform
- Dùng thư mục mặc định: `dataDirectory`

---

### **Dòng 31: Đóng event listener**

```javascript
}, false);
```

**Giải thích:**
- Đóng function callback của `addEventListener`
- `false`: **useCapture** = false (event bubbling phase)

**Event phases:**
```javascript
addEventListener('event', callback, useCapture)
                                    ↓
                            true = Capturing phase (từ trên xuống)
                            false = Bubbling phase (từ dưới lên)
```

---

## 📊 Flow Chart tổng quan

```
App khởi động
     ↓
Cordova plugins load xong
     ↓
📢 Sự kiện 'deviceready' được trigger
     ↓
┌────────────────────────────────┐
│ Khởi tạo FileTransfer object   │
└────────────────────────────────┘
     ↓
   Check platform
     ↓
     ├─── iOS? ──────────────────────────┐
     │                                    ↓
     │               Set directory = syncedDataDirectory
     │               (iCloud sync enabled)
     │
     ├─── Android? ───────────────────────┐
     │                                    ↓
     │               Check permission plugin exists?
     │                    ↓
     │                  YES
     │                    ↓
     │               Has WRITE_EXTERNAL_STORAGE?
     │                    ↓
     │         ┌──────────┴──────────┐
     │       YES                    NO
     │         ↓                      ↓
     │    Log "Yes"          Show permission popup
     │                              ↓
     │                    ┌─────────┴──────────┐
     │                 ALLOW                DENY
     │                    ↓                    ↓
     │              Check again           Log error
     │                    ↓
     │               Set directory = dataDirectory
     │               (Internal storage, no permission needed)
     │
     └─── Other platform? ────────────────┐
                                          ↓
                            Set directory = dataDirectory
                            (Fallback option)
```

---

## 🎯 Directories so sánh

### **iOS:**
```javascript
cordova.file.syncedDataDirectory
// ✅ Sync với iCloud
// ✅ Được backup
// ⚠️ User có thể thấy trên iCloud Drive
```

### **Android:**
```javascript
cordova.file.dataDirectory
// ✅ KHÔNG CẦN xin quyền
// ✅ Private, secure
// ❌ User KHÔNG THỂ truy cập
// ❌ Bị xóa khi uninstall

// Alternative (commented out):
'file:///storage/emulated/0/Download/'
// ✅ User CÓ THỂ truy cập
// ✅ Không bị xóa khi uninstall
// ❌ CẦN xin quyền WRITE_EXTERNAL_STORAGE
```

---

## 🐛 Potential Issues

### **Issue 1: Permission denied trên Android**
```javascript
// Nguyên nhân:
// - User từ chối cấp quyền
// - Chưa khai báo permission trong AndroidManifest.xml

// Fix: Thêm vào config.xml
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
```

### **Issue 2: File không tìm thấy sau download**
```javascript
// Nguyên nhân:
// - Dùng dataDirectory (private storage)
// - User không thể thấy file qua File Manager

// Fix: Dùng externalDataDirectory hoặc Download folder
_saveDirectory = cordova.file.externalDataDirectory;
```

### **Issue 3: iOS không sync với iCloud**
```javascript
// Nguyên nhân:
// - User tắt iCloud sync
// - App chưa config iCloud entitlements

// Fix: Check trong Xcode capabilities
```

---

## 💡 Best Practices

### **1. Thêm error handling:**
```javascript
$document[0].addEventListener('deviceready', function () {
    try {
        _fileTransfer = window.FileTransfer && new FileTransfer();
        
        if (!device || !device.platform) {
            console.error('Device info not available');
            _saveDirectory = cordova.file.dataDirectory; // Fallback
            return;
        }
        
        // ... rest of code
    } catch (error) {
        console.error('Error initializing download service:', error);
    }
}, false);
```

### **2. Promise-based permission request:**
```javascript
function requestPermission() {
    return new Promise((resolve, reject) => {
        permissions.requestPermission(
            permissions.WRITE_EXTERNAL_STORAGE,
            (status) => {
                if (status.hasPermission) {
                    resolve(true);
                } else {
                    reject(new Error('Permission denied'));
                }
            },
            (error) => reject(error)
        );
    });
}
```

### **3. Log directory path:**
```javascript
console.log('📁 Save directory initialized:', {
    platform: device.platform,
    directory: _saveDirectory,
    timestamp: new Date().toISOString()
});
```

---

## 🎓 Tóm tắt

```
Mục đích: Khởi tạo service và xác định thư mục lưu file

iOS:      → syncedDataDirectory (iCloud sync)
Android:  → dataDirectory (private, no permission)
Others:   → dataDirectory (fallback)

Permissions:
- iOS: Không cần xin quyền
- Android: Xin quyền WRITE_EXTERNAL_STORAGE (nếu dùng external storage)
```