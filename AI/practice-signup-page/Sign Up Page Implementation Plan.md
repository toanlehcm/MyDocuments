# **Sign Up Page Implementation Plan**

## **Goal Description**

Xây dựng trang Sign Up theo chuẩn thiết kế Figma được bóc tách thành các component tái sử dụng. Tuân thủ strict rules của React 18, đảm bảo Error Handling, Null Safety theo nội dung trong

.agents/rules/agent-context.md. Mục tiêu là đạt chuẩn

**PRODUCTION**

.

## **User Review Required**

**WARNING**

Figma MCP Server đang bị lỗi `connection closed` không thể lấy tự động mã thiết kế chi tiết (design context). Để làm đúng **Pixel-Perfect** (màu hex, margin, background gradient, svg cong...), anh cần copy một hình ảnh (hoặc SVG Background nếu có) từ link Figma dán vào chat để em implement chính xác nhất. Tạm thời kết cấu sẽ được dựng sẵn theo barebone structure.

## **Proposed Changes**

### **Component Architecture & Structure**

Sẽ tạo thư mục `src/components/signup-page/` và bóc tách thành các file sau:

### **[NEW] `src/components/signup-page/SignUpPage.jsx`**

- Component Wrapper cha bao bọc tất cả.
- Quản lý layout chính, background SVG nội tuyến (nếu có).
- Gọi các component con: Header, Form, Social Login, Footer.

### **[NEW] `src/components/signup-page/SignUpPage.css`**

- Vanilla CSS áp dụng theo chuẩn BEM (`.signup-page-*`).
- Font chữ, màu sắc, responsive breakpoints (375px, 768px).
- Styling cho Grid/Flex layout theo Figma.

### **[NEW] `src/components/signup-page/SignUpHeader.jsx`**

- Hiển thị Text Logo/Image.
- Tiêu đề "Create an account" và câu giới thiệu phụ.

### **[NEW] `src/components/signup-page/SignUpForm.jsx`**

- Sử dụng React 18 Hooks (`useState` quản lý form data `name`, `email`, `password`).
- Input Validation:
    - Name không được bỏ trống.
    - Email phải đúng chuẩn định dạng regex.
    - Password dài ít nhất 6-8 ký tự.
- Chứa nút Submit đăng ký với state `loading`.
- Giả lập hàm `handleSubmit(e)`: `e.preventDefault()`, kiểm tra lỗi và `console.log()` payload.

### **[NEW] `src/components/signup-page/SocialLogin.jsx`**

- Khu vực chứa các button "Sign up with Google/Facebook/Apple".
- Layout dạng list/grid buttons icon.

### **[NEW] `src/components/signup-page/SignUpFooter.jsx`**

- Chứa text link chuyển hướng sang LoginPage: "Already have an account? Log in".

## **Verification Plan**

### **Automated Tests**

- Chạy `npm run build:css` (theo package.json tailwind script, dù ở đây dùng Vanilla CSS thì có thể không cần thiết, nhưng cần đảm bảo không phá vỡ layout cũ).
- Linter checks (đảm bảo không còn use của React 17 DOM thay bằng React 18 `createRoot`).

### **Manual Verification**

- Render thử `<SignUpPage />` trực tiếp trong **App** (thay vì LoginPage) để kiểm thử trực quan trên web.
- Test responsive shrinking window xuống mobile view.
- Test validation logic bằng cách bấm "Submit" khi form trống và kiểm tra xem có báo đỏ / lỗi không.