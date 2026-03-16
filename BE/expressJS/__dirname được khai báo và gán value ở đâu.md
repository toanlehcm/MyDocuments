Listed directory node-expressjs-f8

Chào anh! Câu hỏi về `__dirname` rất hay, vì đây là "biến ma" mà anh không thấy khai báo ở đâu nhưng vẫn dùng được. 👻

### ❓ `__dirname` là gì và lấy từ đâu?

Trong Node.js (phiên bản dùng `require`), **`__dirname` không phải là biến toàn cục (global)**, mà là một biến cục bộ được Node.js tự động "tiêm" (inject) vào mỗi file khi nó chạy.

*   **Nguồn gốc:** Khi anh chạy một file, Node.js sẽ bọc code của anh trong một hàm (gọi là *Module Wrapper*). Hàm này có dạng:
    ```javascript
    (function(exports, require, module, __filename, __dirname) {
        // Code của anh nằm ở đây!
    });
    ```
*   **Giá trị:** `__dirname` chứa **đường dẫn tuyệt đối** đến thư mục chứa file hiện tại (`src/`).

Vì vậy, anh không cần khai báo `const __dirname = ...`, Node.js đã làm việc đó cho anh rồi!

---

### 📂 Giải thích dòng code mới của anh:

```javascript
app.use(express.static(path.join(__dirname, 'public')))
```

1.  **`path.join(__dirname, 'public')`**: Tạo ra đường dẫn tuyệt đối đến thư mục `public`. Ví dụ: `/Users/toanle/.../node-expressjs-f8/src/public`.
2.  **`express.static(...)`**: Đây là một *middleware* giúp Express hiểu rằng: "Những file nằm trong thư mục này là file tĩnh (hình ảnh, CSS, JS trình duyệt), cứ cho khách xem thoải mái mà không cần viết Route".
3.  **`app.use(...)`**: Áp dụng cài đặt này cho toàn bộ ứng dụng.

> [!IMPORTANT]
> **Lưu ý:** Em kiểm tra thì thấy anh **chưa có thư mục `public`** trong dự án. Để dòng code này có tác dụng (ví dụ để chứa file CSS hay ảnh), anh nên tạo thư mục đó nhé!

---

### ❓ **TRUNG TÂM TRỢ GIÚP AWF**

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🏁 **BẮT ĐẦU**
┌─────────────────────────────────────┐
│ /init       → Tạo dự án mới        │
│ /brainstorm → Bàn ý tưởng          │
└─────────────────────────────────────┘

📝 **LẬP KẾ HOẠCH**
┌─────────────────────────────────────┐
│ /plan       → Lên kế hoạch chi tiết│
│ /visualize  → Thiết kế giao diện   │
└─────────────────────────────────────┘

💻 **VIẾT CODE**
┌─────────────────────────────────────┐
│ /code       → Bắt đầu code         │
│ /run        → Chạy thử app         │
│ /debug      → Tìm và sửa lỗi       │
│ /test       → Kiểm tra code        │
└─────────────────────────────────────┘

⚙️ **CÀI ĐẶT**
┌─────────────────────────────────────┐
│ /customize  → Tùy chỉnh AI         │
│ /awf-update → Cập nhật AI          │
└─────────────────────────────────────┘

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💡 **GỢI Ý CHO ANH:**

Anh đang cấu hình Middleware cho dự án. Có thể anh sẽ cần:
• Tạo thư mục `public` và thêm file CSS? → Gõ `/code`
• Kiểm tra xem server có nhận file tĩnh chưa? → Gõ `/run`
• Muốn hỏi thêm về các Middleware khác? → Cứ hỏi em nhé!

Hỏi em bất cứ điều gì nếu anh thấy cần giải thích thêm nha! 😊