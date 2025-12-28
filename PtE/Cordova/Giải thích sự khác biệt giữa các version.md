# Giải thích sự khác biệt giữa các version

## 1. `cordova -v` => 13.0.0
**Cordova CLI (Command Line Interface) version**
- Đây là version của **công cụ dòng lệnh Cordova** đã cài trên máy bạn
- Dùng để tạo project, thêm platform, build app, etc.
- Giống như version của "Visual Studio Code" - là công cụ để làm việc

## 2. `cordova platform version` => android 14.0.1
**Cordova Android Platform version**
- Đây là version của **thư viện/platform Cordova Android** trong project
- Là engine thực tế để build app Cordova thành Android app
- Giống như version của "compiler" - là engine biên dịch code

**Quan hệ giữa 1 và 2:**
```
Cordova CLI 13.0.0 (công cụ)
    ↓ sử dụng
Cordova Android 14.0.1 (engine build)
    ↓ tạo ra
Android APK/AAB file
```

## 3. `android-targetSdkVersion` và `android-minSdkVersion`
**Android SDK API Level** - Đây là version của Android OS

````xml
<preference name="android-targetSdkVersion" value="35" />
<preference name="android-minSdkVersion" value="29" />
````

### `android-minSdkVersion="29"` (Android 10)
- **Yêu cầu tối thiểu**: App chỉ cài được trên Android 10 trở lên
- Thiết bị có Android 9 trở xuống **KHÔNG thể** cài app của bạn

### `android-targetSdkVersion="35"` (Android 15)
- **Tối ưu hóa cho**: App được tối ưu và test cho Android 15
- Google Play yêu cầu target SDK mới để publish app

**Mapping Android version:**
```
API 29 = Android 10
API 30 = Android 11
API 31 = Android 12
API 32 = Android 12L
API 33 = Android 13
API 34 = Android 14
API 35 = Android 15
```

## 4. Tóm lại: NewCordova support Android từ version nào đến version nào?

### ✅ Kết luận:

```
App NewCordova của bạn:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Minimum: Android 10 (API 29)
Target:  Android 15 (API 35)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ CÓ THỂ cài trên: Android 10, 11, 12, 13, 14, 15 trở lên
❌ KHÔNG THỂ cài trên: Android 9, 8, 7, 6... trở xuống
```

## Bảng so sánh tổng hợp:

| Loại Version | Giá trị | Ý nghĩa |
|-------------|---------|---------|
| **Cordova CLI** | 13.0.0 | Công cụ dòng lệnh Cordova |
| **Cordova Android Platform** | 14.0.1 | Engine build Android app |
| **Min SDK** | 29 (Android 10) | Version Android **tối thiểu** để cài app |
| **Target SDK** | 35 (Android 15) | Version Android được **tối ưu hóa** |

## Lưu ý quan trọng:

- 📱 **minSdkVersion** quyết định ai có thể cài app
- 🎯 **targetSdkVersion** quyết định app tuân theo API/rule của Android version nào
- 🔧 **Cordova Android platform** phải support được cả min và target SDK