Chào anh! Lại là em, **An Guide** đây. 😊

Ba lệnh này là "bộ khung" cơ bản nhất của một ứng dụng Express. Để em giải thích theo cách dễ hiểu nhất dựa trên code anh đang viết nhé:

### 1. `app.set(name, value)` - "Thiết lập cấu hình"
Dùng để lưu trữ các biến hoặc cài đặt hệ thống mà Express sẽ sử dụng.
*   **Dùng để làm gì?** Để báo cho Express biết các thông số quan trọng như: thư mục chứa giao diện ở đâu, dùng engine nào...
*   **Ví dụ trong code của anh (Dòng 15-16):**
    ```javascript
    app.set('view engine', 'hbs'); // Thiết lập: dùng hbs làm bộ máy hiển thị
    app.set('views', path.join(__dirname, 'resources/views')); // Thiết lập: thư mục chứa views nằm ở đây
    ```

### 2. `app.get()` - Có 2 ý nghĩa (rất quan trọng!)
Tùy vào số lượng tham số anh truyền vào mà nó sẽ làm việc khác nhau:
*   **Loại 1 tham số `app.get(name)`:** Dùng để **lấy ra** giá trị mà anh đã cài bằng `app.set()` trước đó.
*   **Loại 2 tham số `app.get(path, callback)`:** Dùng để **định nghĩa một tuyến đường (Route)**. Khi người dùng truy cập vào địa chỉ (path) bằng phương thức GET, hàm callback sẽ chạy.
    *   **Ví dụ trong code của anh (Dòng 19):**
        ```javascript
        app.get('/', (req, res) => { res.render('home') }) // Khi vào trang chủ, thì hiện trang home
        ```

### 3. `app.listen(port, callback)` - "Mở cửa đón khách"
Dùng để khởi động server và bắt đầu lắng nghe các kết nối từ trình duyệt.
*   **Dùng để làm gì?** Nếu không có lệnh này, code của anh chỉ là một file văn bản bình thường, server sẽ không chạy.
*   **Ví dụ trong code của anh (Dòng 28):**
    ```javascript
    app.listen(port, () => { console.log(...) }); // Bật server tại cổng 3000
    ```

---

### 📋 Tóm tắt: Khi nào dùng cái nào?

| Lệnh | Khi nào dùng? |
| :--- | :--- |
| **`app.set()`** | Khi anh muốn **cài đặt** thông số (như cấu hình thư mục, engine). |
| **`app.get()`** | Khi anh muốn **tạo một trang mới** (ví dụ: trang `/contact`, trang `/about`). |
| **`app.listen()`** | Chỉ dùng **1 lần duy nhất** ở cuối file để chạy ứng dụng. |

---

### ❓ **ANH CẦN GIÚP GÌ TIẾP THEO?**

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💡 **GỢI Ý CHO ANH:**

• Muốn tạo thử một trang mới (ví dụ trang Liên hệ)? → Gõ `/code`
• Muốn em kiểm tra xem code hiện tại có lỗi gì không? → Gõ `/debug`
• Muốn biết cách tổ chức thư mục sao cho chuẩn? → Cứ hỏi em nhé!

Anh cứ hỏi em bất cứ điều gì nếu thấy chỗ nào chưa rõ nha! 🚀