# Giải thích Android platform version

## Không phải vậy! Có sự nhầm lẫn về version này:

### `cordova-android 14.0.1` là gì?

- **Không phải** Android OS version (Android 14)
- Đây là **version của Cordova Android platform** (công cụ build)
- Nó cho phép build app Cordova cho Android

### Vậy app support Android version nào?

Cordova Android platform **14.0.1** thực tế support:

```
Minimum Android version: Android 6.0 (API 23)
Target Android version: Android 14 (API 34)
```

### Kiểm tra chính xác trong config.xml

Xem trong file config.xml của bạn, tìm các dòng như:

````xml
<platform name="android">
    <preference name="android-minSdkVersion" value="23" />
    <preference name="android-targetSdkVersion" value="34" />
</platform>
````

- `minSdkVersion`: Android version **tối thiểu** để cài app
- `targetSdkVersion`: Android version mà app được tối ưu hóa

### Để xem chi tiết:

````powershell
cd D:\Sources\NewCordova\trunk

# Xem config hiện tại
Get-Content config.xml | Select-String "android"

# Hoặc xem trong platforms/android/app/build.gradle
Get-Content platforms/android/app/build.gradle | Select-String "Sdk"
````

### Tóm lại:

- ✅ **cordova-android 14.0.1** = Version của công cụ Cordova Android
- ✅ App của bạn có thể chạy trên **Android 6.0 trở lên** (thường là default)
- ✅ **Không phải** chỉ support Android 14 trở lên

Muốn kiểm tra chính xác, hãy xem file config.xml hoặc `platforms/android/app/build.gradle` của bạn!