Phân tích 3 cấp độ tải lại trang (Reload) cho FE Dev

Thay vì tìm kiếm sự khác biệt không tồn tại giữa Ctrl + F5 và Ctrl + Shift + F5, đây là bức tranh toàn cảnh xác đáng nhất về cách trình duyệt tải lại dữ liệu.

1. Mức độ 1: Normal Reload (F5 hoặc Ctrl + R)

Đây là cách người dùng bình thường (End-user) hay dùng.

Cơ chế hoạt động: Trình duyệt sẽ hỏi Server: "Ê, cái file CSS này từ hôm qua tới giờ có thay đổi gì không?" (Sử dụng header If-Modified-Since hoặc ETag).

Phản hồi của Server: * Nếu file chưa đổi: Server trả về mã 304 Not Modified. Trình duyệt sẽ lấy file từ Cache trong ổ cứng ra dùng tiếp -> Load cực nhanh.

Nếu file đã đổi: Server trả về mã 200 OK kèm file mới.

Hạn chế đối với Dev: Rất hay bị "lừa". Đôi khi bạn đã sửa code, nhưng cấu hình cache của Server/CDN quá mạnh khiến nó luôn ép trình duyệt dùng bản cũ.

2. Mức độ 2: Hard Reload (Ctrl + F5 hoặc Ctrl + Shift + R)

Đây là vũ khí tiêu chuẩn của Frontend Developer.

Cơ chế hoạt động: Trình duyệt bỏ qua hoàn toàn các file đang lưu trong Cache. Nó gửi một request với header cực gắt: Cache-Control: no-cache. Câu này ép Server: "Không cần biết có thay đổi hay không, bắt buộc phải gửi lại toàn bộ file mới nhất cho tôi!".

Phản hồi của Server: Luôn luôn trả về 200 OK và tải lại toàn bộ HTML, CSS, JS, Image từ đầu.

Hạn chế đối với Dev: Mặc dù mạnh, nhưng nó KHÔNG XÓA bộ nhớ Cache của trang web đó trong trình duyệt. Nó chỉ tạm thời phớt lờ cache cho lần tải này thôi. Ngoài ra, nếu web bạn dùng Service Worker (PWA), Ctrl + F5 đôi khi vẫn bị vô hiệu hóa vì Service Worker can thiệp vào request trước khi nó tới Server.

3. Mức độ 3: Empty Cache and Hard Reload (Click chuột phải vào nút Reload khi mở F12)

Đây là "vũ khí hủy diệt hàng loạt", mạnh nhất và triệt để nhất.

Cơ chế hoạt động: 1. Nó XÓA SẠCH VẬT LÝ toàn bộ cache của trang web đó khỏi ổ cứng của bạn (giống như bức ảnh Setting bạn chụp ở câu hỏi trước, nhưng chỉ áp dụng cho tab này).
2. Sau đó, nó thực hiện một cú Hard Reload.

Sức mạnh: Đánh bay mọi loại Cache cứng đầu nhất, clear cả state bị kẹt, ép Service Worker cập nhật.

🎯 KHI NÀO NÊN DÙNG CÁCH NÀO? (Checklist cho FE Dev)

👉 Đang code logic nhẹ, muốn xem thay đổi (Live Server / Hot Reload đã lo phần lớn): Dùng F5 hoặc cứ để trình duyệt tự động reload.

👉 Vừa sửa một đoạn CSS/JS, lên trình duyệt không thấy nhận code mới: Lập tức bấm Ctrl + F5 (hoặc Ctrl + Shift + R). Đây là thao tác dùng nhiều nhất ngày.

👉 Đã bấm Ctrl + F5 nát bàn phím mà code vẫn không nhận / Đang dev PWA (Progressive Web App) / Đang fix lỗi liên quan đến File tĩnh trên CDN: Mở F12 lên, click chuột phải vào nút Reload và chọn Empty Cache and Hard Reload.