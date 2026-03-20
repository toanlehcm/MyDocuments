Edited SiteController.js

Dạ em đã sửa code trực tiếp vào file [SiteController.js](cci:7://file:///Users/toanle/Documents/DEV/BE/node-expressjs-f8/src/app/controllers/SiteController.js:0:0-0:0) giúp anh rồi đó ạ! 

### 💡 Tại sao phải thêm dòng `.map(course => course.toObject())`?

Lý do là vì một bản cập nhật "bảo mật" của thư viện `express-handlebars` (từ version `4.6.0` trở lên).

*   **Vấn đề:** Khi anh lấy dữ liệu từ MongoDB qua Mongoose (`Course.find()`), nó trả về một mảng chứa các **Mongoose Document**. Các document này có rất nhiều thuộc tính ngầm (prototype) của Mongoose. Handlebars bản mới cho rằng việc truy cập trực tiếp vào các thuộc tính ngầm này là **không an toàn** (lỗi bảo mật) nên nó chặn lại, không chịu in data ra màn hình HTML.
*   **Giải pháp:** Lệnh `.map(course => course.toObject())` sẽ chạy qua từng khóa học trong mảng, lột bỏ cái lớp vỏ Document phức tạp đi, và trả về một **Object JavaScript thuần túy (Plain Object)**. Handlebars rất thích Object thuần túy nên nó in ra ngay tắp lự.

Ngoài ra, vì tên biến chứa giá trị trùng với tên key (`courses: courses`), nên em đã viết gọn lại thành `{ courses }` nhìn cho "pro" hơn nha anh!

---

### ❓ **ANH CẦN GIÚP GÌ TIẾP THEO?**

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💡 **GỢI Ý CHO ANH:**

• Anh ra ngoài trình duyệt tải lại trang xem danh sách khóa học đã hiện lên chưa?
• Nếu hiện rồi mà giao diện bị vỡ, anh cần em giúp chỉnh CSS không? → Gõ `/code`
• Anh có muốn em tạo một file `/recap` để tổng hợp lại những gì anh em mình làm hôm nay không?

Anh chạy thử có lỗi gì thì nhắn em sửa liền nha! 🚀