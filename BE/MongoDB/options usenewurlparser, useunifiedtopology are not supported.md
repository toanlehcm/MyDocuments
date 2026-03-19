Edited index.js

A ha, bắt được bệnh rồi anh ơi! 🐛 

Lỗi `MongoParseError: options usenewurlparser, useunifiedtopology are not supported` xuất hiện là do anh đang sử dụng phiên bản **Mongoose mới** (từ bản 6.x trở lên).

Trong các phiên bản cũ thì mình bắt buộc phải truyền 2 tuỳ chọn đó vào. Còn trên phiên bản mới, Mongoose đã coi 2 tuỳ chọn đó là mặc định và **bỏ hoàn toàn**, nên nếu mình vẫn cố truyền vào thì nó sẽ báo lỗi không hỗ trợ (not supported).

🪄 **Em đã chủ động vào file bỏ đi 2 tùy chọn đó giúp anh rồi.** Code bây giờ chỉ đơn giản và gọn gàng thế này thôi:

```javascript
// d:\Sources\node-expressjs-f8\src\app\config\db\index.js
await mongoose.connect('mongodb://127.0.0.1:27017/education_dev');
```

▶️ Bây giờ anh quay lại Terminal, gõ lại lệnh **`npm start`** để xem server đã báo dòng chữ `Connect successfully!!!` chưa nhé.

Nếu anh vẫn bị kẹt ở đâu hoặc gặp lỗi tiếp thì anh cứ gửi lên đây cho em nha!