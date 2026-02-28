```
@workspace /fix
tại sao figma mcp không tự download được svg, font và css responsive mà developer phải lập trình bằng tay sau khi phát hiện bug.
mong muốn: figma mcp phải tự động download được svg, font từ link design figma trong prompt và generate được css responsive đầy đủ ở các thiết bị khác nhau.
```

**Giải thích lý do MCP không tự động download SVG, font, và generate CSS responsive:**

---

### 1. **SVG**

- **Figma MCP** chỉ lấy thông tin layout, text, màu, spacing từ node Figma qua API.
- SVG trong Figma thường là một node riêng biệt, nhưng MCP chỉ lấy được thông tin cơ bản (không phải file SVG gốc).
- Để lấy SVG chuẩn, cần export trực tiếp từ Figma (chuột phải → Export as SVG), hoặc dùng Figma API chuyên biệt cho vector.
- MCP chưa hỗ trợ tự động lấy SVG file và nhúng vào code.

---

### 2. **Font**

- Figma dùng font cục bộ hoặc font web, nhưng API chỉ trả về tên font (ví dụ: "Inter"), không trả về file font hoặc link Google Fonts.
- MCP không thể tự động import font vào dự án, developer phải tự thêm link Google Fonts hoặc file font vào HTML/CSS.
- Nếu font không được import, trình duyệt sẽ fallback sang font mặc định → font bị sai.

---

### 3. **CSS Responsive**

- Figma chỉ lưu layout ở kích thước thiết kế (thường là desktop).
- MCP chỉ generate CSS đúng với kích thước gốc, không tự động sinh media queries cho các breakpoint khác nhau.
- Để có responsive, cần có nhiều frame/variant trong Figma cho từng thiết bị, hoặc developer phải tự viết media queries.

---

### **Mong muốn của bạn:**

- MCP tự động download SVG, font, và generate CSS responsive đầy đủ.

### **Hiện tại:**

- MCP chưa hỗ trợ các tính năng này do giới hạn của Figma API và logic MCP.
- Developer phải tự export SVG, import font, và viết CSS responsive.

---

### **Giải pháp đề xuất:**

- Đề xuất với đội ngũ MCP/Figma:
  - Hỗ trợ export SVG gốc từ node vector.
  - Tự động nhận diện font và import link Google Fonts nếu có.
  - Cho phép chọn nhiều frame/variant để generate CSS responsive.
- Trong lúc chờ, developer vẫn cần tự xử lý các bước này để đảm bảo UI chuẩn.

---

**Tóm lại:**  
MCP không tự động download SVG, font, và generate CSS responsive do giới hạn API và logic hiện tại. Developer cần tự xử lý các bước này để đảm bảo sản phẩm đúng thiết kế.
