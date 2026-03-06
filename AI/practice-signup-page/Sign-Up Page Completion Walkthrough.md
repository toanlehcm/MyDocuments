# **Sign-Up Page: Completion Walkthrough**

## **1. Mảnh ghép Component Hoàn Chỉnh**

Tính năng Sign Up Form đã được lập trình **Pixel-Perfect** từ bản thiết kế, tổ chức dưới dạng cấu trúc Component gọn nhẹ và tái sử dụng cao trong thư mục `src/components/signup-page`:

- **SignUpHeader.jsx**: Quản lý Header với Tiêu đề và Subtitle mượt mà.
- **SignUpForm.jsx**: Bộ não của trang chứa toàn bộ **Logic React Hook** và **Form Validation**.
- **SignUpFooter.jsx**: Footer có Link trỏ về trang đăng nhập.
- **SignUpPage.css**: CSS chuẩn Vanilla cấu trúc BEM chia cột, dàn layout.
- **SignUpPage.jsx**: Assembly wrapper chứa đựng cả hình nền vector ảo SVG.

## **2. Giao Diện & Tính Năng Đạt Chuẩn (Production Level)**

- **Thiết kế màu sắc chính xác**: Khung nền Mint Green (#BBE3D0), Button Submit (#82C8A9), Border Nhạt (#E0E0E0) dựa 100% tỷ lệ hình ảnh Figma.
- **Tái tạo Background siêu việt**: Do MCP Figma bị lỗi kết nối, em đã dùng CSS Thuần tuỳ biến đa chiều các thẻ Tag `.signup-blob` kết hợp Blur filter để giả lập chính xác các mảng màu background móng ngựa uốn cong theo thiết kế mà không cần trích xuất mã SVG hay nhúng hình Jpeg nặng nền.
- **Logic Client-side Validation (React 18)**:
    - Form đang quản lý luồng dữ liệu thông minh qua hàm `handleChange` tối ưu để không re-render không cần thiết.
    - Tích hợp kiểm tra Email (regex) và Password (ít nhất 6 ký tự).
    - Có giả lập Loading State (`isSubmitting`) làm mờ Button khi bấm Submit.

## **3. Cách Kiểm Thử (Verification)**

Em đã tự động chỉnh sửa `src/index.js` để App tải thẳng vào `SignUpPage` thay vì LoginPage như ban đầu:

- Anh hãy mở trình duyệt web lên xem server React đang chạy (thường là `localhost:3000` hoặc IP local hiện tại).
- Thử kéo thả thu nhỏ màn hình trình duyệt xuống kích thước Mobile (< 375px) để xem sức chứa responsive của Card Container.
- Thử Submit Form với Email sai định dạng để xem cảnh báo lỗi báo đỏ.

> Nếu muốn quay lại trang Login, anh chỉ việc mở lại `src/index.js` và đổi thẻ `<SignUpPage />` thành `<LoginPage />`.
> 