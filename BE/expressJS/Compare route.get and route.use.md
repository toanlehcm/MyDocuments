Chào anh! Câu hỏi này cực kỳ quan trọng để anh làm chủ được hệ thống định tuyến (Routing) trong Express. Để em giúp anh phân biệt "kẻ tám lạng, người nửa cân" này nhé. 🥊

---

### 1. `router.get(path, callback)`
*   **Chỉ khớp với phương thức GET:** Nó chỉ chạy khi trình duyệt gửi một yêu cầu GET (ví dụ: người dùng nhập địa chỉ vào thanh trình duyệt).
*   **Khớp chính xác (Exact Match):** Nếu anh để là `'/'`, nó chỉ khớp đúng địa chỉ đó. Nó sẽ không khớp với `/contact`, `/about`, v.v.

### 2. `router.use(path, callback)`
*   **Khớp với MỌI phương thức:** Dù là GET, POST, PUT, hay DELETE, nó đều "nhận hết".
*   **Khớp theo tiền tố (Prefix Match):** Đây là điểm khác biệt lớn nhất. Nếu anh để là `'/'`, nó sẽ khớp với **mọi đường dẫn bắt đầu bằng `/`**. Tức là `/news`, `/contact`, `/san-pham/123`... đều bị nó "tóm" hết.

---

### ❓ Khi nào nên dùng cái nào?

| Trường hợp | Nên dùng | Tại sao? |
| :--- | :--- | :--- |
| **Định nghĩa 1 trang cụ thể** (vd: Trang chủ, Trang tin tức) | **`router.get()`** | Anh chỉ muốn hiện trang đó khi người dùng "truy cập" (GET) đúng địa chỉ đó. Tránh việc các phương thức khác (như POST) vô tình nhảy vào. |
| **Cấu hình Middleware** (vd: Kiểm tra đăng nhập, nén dữ liệu, log...) | **`router.use()`** | Anh muốn đoạn code đó chạy cho **tất cả** các trang bên dưới hoặc cho mọi loại yêu cầu (GET/POST/...). |
| **Gắn Sub-router** (vd: `app.use('/news', newsRouter)`) | **`router.use()`** | Để mọi đường dẫn bắt đầu bằng `/news` đều được chuyển vào cho `newsRouter` xử lý tiếp. |

---

### 💡 Tại sao trong code của anh nên đổi sang `.get()`?

Trước đó anh viết:
```javascript
router.get('/:slug', newsController.show);
router.use('/', newsController.index); // (1)
```

Nếu để `router.use('/')` ở dòng (1), nó đóng vai trò như một cái "lưới vét". Vì mọi đường dẫn đều bắt đầu bằng `/`, nên nếu anh để nó ở trên cùng, nó sẽ chặn sạch các route bên dưới. 

Khi anh đổi thành `router.get('/')`, nó trở nên **tường minh** hơn: "Tôi chỉ muốn xử lý yêu cầu GET tại đúng địa chỉ gốc của Router này". Điều này giúp code của anh an toàn hơn và tránh những lỗi logic khó tìm sau này.

---

### ❓ **ANH CẦN GIÚP GÌ TIẾP THEO?**

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💡 **GỢI Ý CHO ANH:**

• Anh muốn thử tạo thêm một Route `POST` để gửi dữ liệu lên server không? → Gõ `/code`
• Anh muốn em kiểm tra xem hệ thống Router hiện tại đã tối ưu chưa? → Gõ `/review` hoặc `/audit`
• Muốn hỏi thêm về các loại Router nâng cao khác? → Cứ hỏi em nhé!

Hy vọng giải thích này giúp anh thấy "sáng" hơn về Routing! 😊🚀