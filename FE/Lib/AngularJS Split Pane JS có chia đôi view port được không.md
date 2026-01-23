**Ngắn gọn, chốt luôn:**

👉 **CÓ**, **AngularJS Split Pane (v1.3.0)** **làm được** tính năng **chia đôi viewport** trong project **AngularJS 1.7 / 1.8**.

---

### Vì sao làm được?

* Đây là **directive dành riêng cho AngularJS 1.x** → **tương thích trực tiếp** với 1.7 & 1.8
* Cơ chế hoạt động:

  * Layout bằng **CSS (flex / absolute positioning)**
  * Có **divider** để kéo resize
  * Pane chiếm **100% kích thước container**
* Khi container đặt:

  ```css
  width: 100vw;
  height: 100vh;
  ```

  → viewport bị **chia đôi đúng nghĩa**

---

### Hiểu đúng để không kỳ vọng sai

✔ Chia trái/phải hoặc trên/dưới
✔ Resize bằng kéo chuột
✔ Phù hợp layout web app / admin / IDE-style UI

❌ Không phải split view native của Chrome hay OS
❌ Không kéo tab / không quản lý window

---

### Kết luận 1 dòng

> **AngularJS Split Pane v1.3.0 hoàn toàn làm được chia đôi viewport trên AngularJS 1.7–1.8**, vì nó chỉ xử lý layout + resize ở mức DOM/CSS và được thiết kế đúng cho AngularJS 1.x.

Nếu bạn muốn, mình có thể gửi **ví dụ HTML tối giản** chạy được ngay trên AngularJS 1.8 👍
