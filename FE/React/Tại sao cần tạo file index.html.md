# Tại sao cần tạo file index.html

**Giải thích tại sao cần tạo file index.html ở thư mục gốc khi dùng Vite:**

### **1. Kiến trúc khác nhau giữa CRA và Vite:**

| Create React App | Vite |
|-----------------|------|
| File index.html nằm trong thư mục public | File index.html nằm ở **thư mục gốc** (root) |
| Webpack xử lý và inject script tự động | Vite dùng index.html làm **entry point** |
| `%PUBLIC_URL%` để tham chiếu assets | Dùng `/` để tham chiếu assets |

---

### **2. Vite dùng index.html làm entry point:**

- Trong **Vite**, file index.html ở **thư mục gốc** là điểm khởi đầu của ứng dụng.
- Bạn phải **tự thêm tag `<script>`** để load file TypeScript/JavaScript:
  ```html
  <script type="module" src="/src/index.tsx"></script>
  ```
- Vite sẽ tự động:
  - Compile TypeScript/JSX
  - Hot Module Replacement (HMR)
  - Bundle code khi build production

---

### **3. Tại sao không dùng index.html như CRA?**

- **Create React App**: Webpack copy index.html và inject script tự động.
- **Vite**: Không có cơ chế tự động inject, nên file index.html phải ở **thư mục gốc** và bạn phải tự khai báo entry point.

---

### **4. Ví dụ file index.html cho Vite:**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>PTE Demo</title>
  </head>
  <body>
    <div id="root"></div>
    <!-- Vite sẽ load file này và compile -->
    <script type="module" src="/src/index.tsx"></script>
  </body>
</html>
```

---

### **Kết luận:**

- **Vite yêu cầu** file index.html ở **thư mục gốc**, không phải public.
- File này là **entry point** và phải tự khai báo `<script type="module">` để load React app.
- Đây là **khác biệt lớn nhất** giữa CRA và Vite về cấu trúc dự án.