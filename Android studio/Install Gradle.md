# Huong dan install Gradle trong terminal cua android studio

PS D:\Sources\NewCordova\trunk\platforms\android> java -version
openjdk version "17.0.17" 2025-10-21
OpenJDK Runtime Environment Temurin-17.0.17+10 (build 17.0.17+10)
OpenJDK 64-Bit Server VM Temurin-17.0.17+10 (build 17.0.17+10, mixed mode, sharing)
PS D:\Sources\NewCordova\trunk\platforms\android> javac -version
javac 17.0.17
PS D:\Sources\NewCordova\trunk\platforms\android> avdmanager list target
[=======================================] 100% Fetch remote repository...       
Available Android targets:
----------
id: 1 or "android-34"
     Name: Android API 34, extension level 7
     Type: Platform
     API level: 34
     Revision: 3
----------
id: 2 or "android-35"
     Name: Android API 35, extension level 13
     Type: Platform
     API level: 35
     Revision: 2
----------
id: 3 or "android-36"
     Name: Android API 36, extension level 17
     Type: Platform
     API level: 36
     Revision: 2
PS D:\Sources\NewCordova\trunk\platforms\android> cordova requirements android

Requirements check results for android:
Java JDK: installed 17.0.17
Android SDK: installed true
Android target: installed android-36,android-35,android-34
Gradle: not installed 
Could not find an installed version of Gradle either in Android Studio,
or on your system to install the gradle wrapper. Please include gradle                                                                                                                                                             
in your path, or install Android Studio                                                                                                                                                                                            
Some of requirements check failed
PS D:\Sources\NewCordova\trunk\platforms\android> cd ../../
PS D:\Sources\NewCordova\trunk> cordova requirements android

Requirements check results for android:
Java JDK: installed 17.0.17
Android SDK: installed true
Android target: installed android-36,android-35,android-34
Gradle: not installed 
Could not find an installed version of Gradle either in Android Studio,
or on your system to install the gradle wrapper. Please include gradle                                                                                                                                                             
in your path, or install Android Studio                                                                                                                                                                                            
Some of requirements check failed
PS D:\Sources\NewCordova\trunk> cordova run android --emulator
cordova-plugin-androidx-adapter: Processed 133 source files in 1018ms
cordova-plugin-firebasex: Preparing Firebase on Android
Checking Java JDK and Android SDK versions
ANDROID_HOME=C:\Users\daniel.toan.le\AppData\Local\Android\Sdk (recommended setting)
ANDROID_SDK_ROOT=C:\Users\daniel.toan.le\AppData\Local\Android\sdk (DEPRECATED)
Using Android SDK: C:\Users\daniel.toan.le\AppData\Local\Android\Sdk
Could not find an installed version of Gradle either in Android Studio,
or on your system to install the gradle wrapper. Please include gradle 
in your path, or install Android Studio

huong dan install Gradle trong terminal cua android studio

--------------

Tuyệt vời 🎯
Bạn đã **vượt qua toàn bộ các chướng ngại khó** rồi.
Giờ **CHỈ CÒN 1 VIỆC CUỐI CÙNG: GRADLE** → làm đúng là **Cordova chạy ngay**.

---

# 🔴 VẤN ĐỀ CUỐI CÙNG

```
Gradle: not installed
Could not find an installed version of Gradle
```

👉 Cordova **không tìm thấy Gradle**:

* Không thấy **Gradle của Android Studio**
* Không thấy **Gradle trong PATH**

---

# ✅ GIẢI PHÁP CHUẨN (KHUYÊN DÙNG)

## 🎯 NGUYÊN TẮC

> Cordova **KHÔNG cần Gradle global**
> 👉 **Chỉ cần Gradle Wrapper (`gradlew`) trong project**

Nhưng:

* Project Cordova cũ → **chưa có wrapper**
* Cordova không tự tạo vì không thấy Gradle

👉 Ta **cài Gradle global 1 lần** để bootstrap

---

# 🥇 CÁCH 1 — CÀI GRADLE GLOBAL (NHANH – ỔN ĐỊNH)

## 1️⃣ TẢI GRADLE

👉 Vào:

```
https://gradle.org/releases/
```

Chọn:

```
Gradle 8.7 (Binary-only)
```

Giải nén vào:

```
C:\Gradle\gradle-8.7
```

---

## 2️⃣ SET BIẾN MÔI TRƯỜNG

### System Variables

### GRADLE_HOME

```
Name: GRADLE_HOME
Value: C:\Gradle\gradle-8.7
```

### Path → Add:

```
%GRADLE_HOME%\bin
```

---

## 3️⃣ RESTART ANDROID STUDIO + TERMINAL

⚠️ BẮT BUỘC

---

## 4️⃣ TEST GRADLE

```powershell
gradle -v
```

### ✅ KẾT QUẢ ĐÚNG:

```
Gradle 8.7
JVM: 17.x
```

---

## 5️⃣ CHẠY LẠI CORDOVA

```powershell
cordova requirements android
cordova run android --emulator
```

---

# 🥈 CÁCH 2 — DÙNG GRADLE CỦA ANDROID STUDIO (KHÔNG CÀI RIÊNG)

Nếu bạn **muốn tận dụng Gradle sẵn có của Android Studio**:

### 1️⃣ Kiểm tra đường dẫn:

```
C:\Program Files\Android\Android Studio\gradle
```

Hoặc:

```
C:\Users\daniel.toan.le\.gradle\wrapper\dists
```

### 2️⃣ Add vào PATH (khó hơn, không khuyên)

👉 Vì mỗi project dùng version khác → dễ lỗi

---

# 🧠 TẠI SAO GRADLE LÀ BƯỚC CUỐI?

| Thành phần     | Trạng thái |
| -------------- | ---------- |
| Java           | ✅          |
| Android SDK    | ✅          |
| Android target | ✅          |
| Emulator       | ✅          |
| **Gradle**     | ❌ → BLOCK  |

👉 Không có Gradle
→ Cordova **không generate gradlew**
→ Build không bắt đầu

---

# 🚀 SAU KHI GRADLE OK

Khi chạy:

```powershell
cordova run android --emulator
```

Lần đầu:

* Download dependencies (hơi lâu)
* Build APK
* Install lên emulator
* **App bật lên** 🎉

---

# 🎯 CHECKPOINT CUỐI

👉 Làm xong gửi mình output:

```powershell
gradle -v
cordova run android --emulator
```

Nếu có lỗi mới → mình debug tiếp **tới khi app lên màn hình** 🔥
