Chào anh! Em là **An Guide** đây. 

Lỗi này rất phổ biến khi mới bắt đầu chạy MongoDB.

### 🐛 Nguyên nhân lỗi:
Mặc định khi anh chạy lệnh `mongod`, MongoDB sẽ cố gắng tìm thư mục `/data/db` (ở thư mục gốc của ổ cứng) để lưu trữ dữ liệu. Vì thư mục này không tồn tại trên máy Mac của anh, nên nó báo lỗi: `NonExistentPath: Data directory /data/db not found`.

### 🛠️ Cách khắc phục:
Như anh đã chuẩn bị sẵn thư mục lưu data là `/Users/toanle/Documents/DEV/BE/MongoDB/test-mongodb-data/data`, anh chỉ cần "báo" cho MongoDB biết đường dẫn đó bằng cách thêm cờ `--dbpath` vào lệnh khởi động.

Anh hãy chạy lệnh này trong Terminal nhé:

```bash
mongod --dbpath /Users/toanle/Documents/DEV/BE/MongoDB/test-mongodb-data/data
```

Lệnh này có nghĩa là: *"Khởi động MongoDB và lưu toàn bộ dữ liệu vào đường dẫn này giúp tôi"*.

> [!TIP]
> **Mẹo nhỏ:** Để sau này không phải gõ lại đường dẫn dài ngoằng này, anh có thể lưu câu lệnh trên vào một file script, hoặc tạo alias trong Terminal. Nhưng trước mắt cứ chạy trực tiếp để kiểm tra xem server DB đã lên chưa nhé!

---

### ❓ **ANH CẦN GIÚP GÌ TIẾP THEO?**

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💡 **GỢI Ý CHO ANH:**

• Cơ sở dữ liệu chạy lên rồi, anh muốn em kiểm tra code kết nối (Connect DB) trong `src/config/db/index.js` xem chuẩn chưa không? → Gõ `/code`
• Anh muốn test xem thêm mới khóa học (Create Course) đã lưu thành công vào Database chưa? → Gõ `/run`
• Có phần nào trong Mongoose anh thấy chưa rành? → Cứ hỏi em nhé!

Anh thử chạy lệnh trên xem có báo `Waiting for connections` (nghĩa là thành công) không nha! 🚀