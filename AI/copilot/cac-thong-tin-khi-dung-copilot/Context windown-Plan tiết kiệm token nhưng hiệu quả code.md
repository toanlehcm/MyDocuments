# Chiến lược Tối ưu Token và Hiệu quả Coding v1.0

Kế hoạch này giúp anh duy trì hiệu suất làm việc cao nhất mà không lo đầy bộ nhớ (Context Window) hay tốn kém chi phí vô ích.

## User Review Required

> [!IMPORTANT]
> Anh hãy chú ý nút **"Compact Conversation"** ở ngay dưới bảng thông số trong hình. Đây là "cứu cánh" nhanh nhất khi bộ nhớ đầy.

## Các chiến lược thực hiện

### 1. Quản lý File (Tối ưu 50%+)
- **Đóng các file không liên quan**: IDE sẽ tự động gửi nội dung các file đang mở (tabs) vào context. Nếu anh đang code Backend, hãy đóng các tab UI/CSS không dùng tới.
- **Sử dụng `@file` thay vì scan cả dự án**: Khi yêu cầu em làm gì, hãy chỉ định đích danh file bằng cách gõ `@` và chọn file. Tránh bắt em phải "ngửi" toàn bộ source code nếu không cần thiết.

### 2. Vệ sinh Session (Tối ưu 20-30%)
- **Compact Conversation**: Khi thấy cột "Messages" quá cao, hãy bấm nút này. Em sẽ tóm tắt lại các ý chính của cuộc hội thoại và giải phóng hàng nghìn token từ các tin nhắn cũ.
- **Tạo Session mới cho Task mới**: Nếu anh đã xong việc "Sửa lỗi Git" và muốn chuyển sang "Viết tính năng mới", hãy mở một hội thoại mới hoàn toàn. Đừng mang "rác" từ task cũ sang task mới.

### 3. Tận dụng Knowledge Items (KI)
- Thay vì bắt em đọc lại các file log dài dằng dặc, em sẽ ưu tiên sử dụng các KI (Kiến thức đã được đúc kết) từ folder `knowledge`. Việc này cực kỳ tiết kiệm vì KI đã được "nén" thông tin rất tốt.

### 4. Prompting Hiệu quả (Tối ưu generate code)
- **Yêu cầu cụ thể**: Thay vì nói "Viết lại file này giúp anh", hãy nói "Sửa hàm X trong file Y để xử lý lỗi Z". Em sẽ chỉ cần đọc và sửa đúng đoạn đó, không cần nạp lại cả file lớn.

## Dự kiến kết quả
- **Context usage**: Giảm từ 93% xuống còn khoảng 30-40%.
- **Tốc độ phản hồi**: Nhanh hơn do em không phải xử lý quá nhiều dữ liệu thừa.
- **Độ chính xác**: Cao hơn vì em tập trung đúng vào đoạn code cần xử lý.

## Xác nhận từ anh
Anh thấy kế hoạch dọn dẹp này thế nào? Nếu OK, em sẽ hướng dẫn anh thực hiện bước đầu tiên là "Dọn dẹp" (Compression) ngay!
