```
"AI Credits will be used until your quota refreshes. See available AI credits in the ."
1. tại sao t không thể dùng model claude sonnet và opus mặc dù đã switch account google khác để có 100% request như cũ?
2. Tại sao t đã chuyển account khác nhưng không thể dùng model claude sonnet và opus.
3. Hướng dẫn t config dùng claude sonnet và opus trong account mới.
```

Chào anh, đây là một thắc mắc rất phổ biến khi sử dụng Antigravity. Dựa trên hình ảnh anh cung cấp, em xin giải thích cơ chế Quota của hệ thống như sau:

### 1 & 2. Tại sao đổi account Google vẫn không dùng được Claude Sonnet/Opus?

Lý do là vì Antigravity phân loại Model thành 2 nhóm khác nhau:
*   **Nhóm Request Quota (Free):** Bao gồm các model Gemini (3.1 Pro, Flash...). Nhóm này dùng hạn mức (quota) trực tiếp từ account Google của anh. Khi anh đổi account Google, hạn mức này sẽ được reset về 100%.
*   **Nhóm Premium Model (Tính phí Credit):** Bao gồm **Claude Sonnet, Claude Opus** và **GPT-OSS**. Các model này không chạy bằng "hạn mức request" của Google mà chạy bằng **AI Credits**. 

**Tại sao đổi account không tác dụng?** Vì **AI Credits** thường được cấp theo thiết bị hoặc theo gói đăng ký Antigravity cụ thể của anh, chứ không đi kèm với tài khoản Gmail cá nhân. Việc anh đổi Gmail chỉ giúp anh có thêm lượt dùng Gemini, còn Claude vẫn đang "đói" Credit.

### 3. Cách config để dùng được Claude trong Account mới

Anh nhìn vào dấu **tam giác vàng (⚠️)** cạnh tên Claude Sonnet/Opus trong hình của anh: Nó báo hiệu rằng model này đang ở trạng thái **Over quota** hoặc yêu cầu **AI Credits**.

Để dùng được, anh cần kiểm tra các bước sau:
1.  **Bật "Using AI Credit Overages":** Ở góc dưới cùng bên phải (cạnh tên Model), anh sẽ thấy dòng chữ *Using AI Credit Overages*. Anh hãy click vào đó để cho phép hệ thống sử dụng Credit bù vào nếu quota mặc định đã hết.
2.  **Manage Groups:** Anh bấm vào nút **"Manage Groups"** trên màn hình Quota Monitor. Tại đây, anh hãy kiểm tra xem `Claude 3.5 Sonnet` hoặc `Claude 3 Opus` đã được gán vào một Group nào có Credit còn xanh (100%) hay chưa.
3.  **Hết Credits hoàn toàn:** Nếu như tổng AI Credits của anh đã hết (về 0), thì dù anh có đổi 100 account Gmail, hệ thống vẫn sẽ lock các model Claude lại. Anh sẽ phải đợi đến kỳ reset Credit tiếp theo hoặc phải nạp thêm Credit để tiếp tục dùng Claude.

**Lời khuyên:** Trong lúc chờ reset Credit cho Claude, anh hãy dùng **Gemini 3.Pro (High)**. Vì anh đã đổi sang account mới nên Gemini đang có 100% quota, sức mạnh của Gemini 3.1 Pro hiện tại cũng rất đáng gờm và hoàn toàn miễn phí (không tốn Credit) đấy anh!

Anh có cần em hỗ trợ kiểm tra thêm phần nào trong `Manage Groups` không ạ?