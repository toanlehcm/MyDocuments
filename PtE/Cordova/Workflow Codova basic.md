# Dưới đây là workflow thực tế về **sử dụng Cordova plugin** trong React + TypeScript, dựa trên hook `useCordova` của bạn.

---

## **Use case: Lưu dữ liệu vào NativeStorage trên thiết bị di động**

### **1. Người dùng thao tác trên app**
- Ví dụ: Người dùng nhấn nút "Lưu thông tin" trên app.

### **2. Component gọi hàm lưu dữ liệu**
- Component sử dụng hook `useCordova` để kiểm tra môi trường Cordova và lấy plugin NativeStorage.

```typescript
const { isCordova, nativeStorage } = useCordova();

const handleSave = () => {
  if (isCordova && nativeStorage) {
    nativeStorage.setItem(
      'userInfo',
      { name: 'Alice', age: 25 },
      () => alert('Lưu thành công!'),
      (error) => alert('Lỗi: ' + error.code)
    );
  } else {
    alert('Chỉ lưu được trên thiết bị di động!');
  }
};
```

### **3. Hook kiểm tra môi trường và cung cấp plugin**
- Khi app chạy trên thiết bị thật, hook sẽ phát hiện `window.cordova` và lấy `window.NativeStorage` từ `window.cordova.plugins`.

### **4. Plugin NativeStorage thực hiện lưu dữ liệu**
- Dữ liệu được lưu vào bộ nhớ native của thiết bị (không phải localStorage của trình duyệt).

### **5. Người dùng nhận thông báo thành công hoặc lỗi**

---

### **Tóm tắt workflow**

1. Người dùng thao tác trên app.
2. Component gọi hàm sử dụng plugin Cordova qua hook.
3. Hook kiểm tra môi trường, cung cấp plugin.
4. Plugin thực hiện chức năng native (lưu dữ liệu).
5. Người dùng nhận kết quả.

---

**Lưu ý:**  
- Nếu chạy trên trình duyệt web, workflow sẽ bỏ qua bước sử dụng plugin và báo lỗi/thông báo phù hợp.
- Bạn có thể áp dụng tương tự cho các plugin khác như Camera, Geolocation, v.v.

Nếu muốn ví dụ với plugin khác, hãy hỏi nhé!