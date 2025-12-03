# What is window.cordova

`window.cordova` là một đối tượng toàn cục (global object) được thêm vào trình duyệt hoặc WebView khi ứng dụng của bạn chạy trong môi trường **Apache Cordova** (hoặc các framework dựa trên Cordova như Ionic).

### Giải thích đơn giản

- **Cordova** là một nền tảng giúp bạn xây dựng ứng dụng di động bằng HTML, CSS, JavaScript.
- Khi app chạy trên thiết bị thật (Android/iOS) qua Cordova, nó sẽ inject đối tượng `cordova` vào `window`.
- Đối tượng này cung cấp các API để truy cập các chức năng của thiết bị như camera, GPS, file system, v.v.

### Ví dụ sử dụng

```typescript
if (window.cordova) {
  // App đang chạy trong môi trường Cordova
  // Có thể dùng các plugin Cordova, ví dụ:
  window.cordova.plugins.camera.getPicture(...);
}
```

### **Lưu ý**
- Nếu bạn chạy app trên trình duyệt thông thường (không phải Cordova), `window.cordova` sẽ **không tồn tại**.
- Nên kiểm tra trước khi sử dụng để tránh lỗi.

---

**Tóm lại:**  
`window.cordova` là "cửa ngõ" để app web của bạn truy cập các chức năng native trên thiết bị di động thông qua Cordova.

######################

# Dưới đây là giải thích chi tiết về kỹ thuật `window.cordova` trong phát triển ứng dụng di động với Apache Cordova, kèm liên kết tài liệu chính thức cho từng mục:

---

### 1. **Nó là gì?**
- `window.cordova` là một đối tượng JavaScript toàn cục, được inject vào môi trường trình duyệt của ứng dụng khi chạy trên nền tảng Cordova.
- Nó là "cửa ngõ" để truy cập các API native của thiết bị thông qua các plugin Cordova.
- [Tài liệu chính thức: Cordova Global Objects](https://cordova.apache.org/docs/en/latest/guide/platforms/android/index.html#global-objects)

---

### 2. **Tại sao lại tạo ra nó?**
- Mục đích: Giúp ứng dụng web (HTML/JS/CSS) có thể truy cập các chức năng phần cứng (camera, GPS, file, v.v.) mà trình duyệt thông thường không hỗ trợ.
- Cordova tạo ra đối tượng này để các developer có thể gọi các plugin native một cách đơn giản.
- [Tài liệu: Cordova Plugins](https://cordova.apache.org/docs/en/latest/guide/hybrid/plugins/index.html)

---

### 3. **Nó hoạt động như thế nào?**
- Khi app được build và chạy trên thiết bị qua Cordova, framework sẽ inject `window.cordova` vào global scope.
- Các plugin Cordova cũng được gắn vào `window.cordova.plugins`.
- Khi gọi các hàm trong plugin, Cordova sẽ chuyển lệnh từ JavaScript sang native code (Android/iOS) và trả kết quả về cho JS.
- [Tài liệu: Plugin Architecture](https://cordova.apache.org/docs/en/latest/guide/hybrid/plugins/index.html#plugin-architecture)

---

### 4. **Điều gì sẽ xảy ra nếu không sử dụng nó?**
- Nếu không dùng `window.cordova`, app web sẽ **không thể truy cập** các chức năng native như camera, GPS, file system, v.v.
- App chỉ hoạt động như một web app thông thường, bị giới hạn bởi API của trình duyệt.
- [Tài liệu: Limitations of Web Apps](https://cordova.apache.org/docs/en/latest/guide/overview/index.html#limitations-of-web-apps)

---

### 5. **Điều gì sẽ xảy ra nếu sử dụng nó?**
- App có thể truy cập các chức năng native của thiết bị thông qua các plugin Cordova.
- Có thể xây dựng ứng dụng di động đa nền tảng chỉ với HTML/JS/CSS.
- [Tài liệu: Cordova Overview](https://cordova.apache.org/docs/en/latest/guide/overview/index.html)

---

### 6. **Cách sử dụng nó?**
- Kiểm tra sự tồn tại của `window.cordova` để xác định app đang chạy trong môi trường Cordova.
- Gọi các plugin qua `window.cordova.plugins`.
- Ví dụ:
  ```javascript
  if (window.cordova) {
    window.cordova.plugins.camera.getPicture(successCallback, errorCallback, options);
  }
  ```
- [Tài liệu: Camera Plugin Usage](https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-camera/)

---

### 7. **Có thể thay thế bằng cách khác không? So sánh rõ ràng?**
- **Thay thế:** Có thể dùng các framework khác như [Capacitor](https://capacitorjs.com/) (Ionic), [React Native](https://reactnative.dev/), [Flutter](https://flutter.dev/).
- **So sánh:**
  - **Cordova:** Dễ dùng, nhiều plugin, code web thuần, nhưng chậm hơn và ít tối ưu cho native UI.
  - **Capacitor:** Hiện đại hơn Cordova, hỗ trợ tốt cho các app hybrid, dễ tích hợp với Ionic.
  - **React Native/Flutter:** Viết code bằng JS/Dart, render UI native, hiệu năng tốt hơn, nhưng không dùng webview.
- [Tài liệu: Capacitor vs Cordova](https://capacitorjs.com/docs/v3/cordova/why-capacitor)
- [Tài liệu: React Native vs Cordova](https://reactnative.dev/docs/comparison-with-other-cross-platform-frameworks)

---

### 8. **Ví dụ thực tế cụ thể**
- **Chụp ảnh bằng camera:**
  ```javascript
  document.addEventListener('deviceready', function() {
    window.cordova.plugins.camera.getPicture(
      function(imageData) { /* xử lý ảnh */ },
      function(error) { /* xử lý lỗi */ },
      { quality: 50, destinationType: window.cordova.plugins.camera.DestinationType.DATA_URL }
    );
  }, false);
  ```
- [Tài liệu: Camera Plugin Example](https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-camera/#example)

---

### 9. **Khi nào nên dùng loại nào?**
- **Dùng Cordova/Capacitor:** Khi bạn muốn phát triển app di động đa nền tảng bằng web (HTML/JS/CSS), cần truy cập chức năng native nhưng không cần hiệu năng UI cao.
- **Dùng React Native/Flutter:** Khi cần hiệu năng tốt, UI native, hoặc app phức tạp về giao diện.
- [Tài liệu: Choosing a Framework](https://ionicframework.com/docs/intro/capacitor-vs-cordova)

---

Nếu bạn muốn hiểu sâu hơn về từng framework hoặc có ví dụ cụ thể về plugin nào, hãy hỏi tiếp nhé!