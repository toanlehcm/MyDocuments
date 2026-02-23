# Muốn dùng Figma với vsCode để generate React code từ design figma, đảm bảo giống 100%

Ok, mình nói thẳng trước một câu quan trọng:

> ❗ Không có tool nào đảm bảo “100% giống Figma” khi auto-generate React code.
> Bạn chỉ có thể đạt ~90–95% nếu setup đúng cách và design tuân thủ system rõ ràng.

Giờ mình hướng dẫn bạn cách làm đúng hướng với **Figma + VS Code + MCP** để đạt độ chính xác cao nhất.

---

# 🎯 Mục tiêu của bạn

Figma → VS Code → Generate React code → Pixel-perfect nhất có thể

---

# 🧩 Kiến trúc đúng sẽ là:

```
Figma file
   ↓
Figma MCP Server
   ↓
MCP Client (VS Code extension)
   ↓
AI đọc node tree + styles
   ↓
Generate React component
```

---

# ✅ Bước 1 – Kết nối Figma với VS Code

Bạn cần:

- VS Code
- MCP-compatible extension (ví dụ AI coding assistant hỗ trợ MCP)
- Figma access token

Trong VS Code, bạn sẽ cấu hình MCP server endpoint của Figma.

(Phần này nằm trong “Connect Figma to top MCP clients”)

---

# ✅ Bước 2 – Chuẩn hóa Figma để code ra chuẩn 1:1

Đây là phần QUAN TRỌNG NHẤT nếu bạn muốn giống 100%.

## 1️⃣ Không dùng absolute positioning bừa bãi

Dùng:

- Auto Layout
- Hug / Fill
- Constraint rõ ràng

Nếu không → AI sẽ generate div lồng div vô nghĩa.

---

## 2️⃣ Dùng component + variants

Ví dụ:

- Button (Primary / Secondary / Disabled)
- Input (Error / Focus / Default)

Nếu bạn design bằng frame thường → AI không biết đó là reusable component.

---

## 3️⃣ Dùng Design Tokens

Tạo:

- Color styles
- Text styles
- Spacing system

Ví dụ:

```
Primary / 500
Text / Body / Medium
Spacing / 16
```

Nếu bạn không dùng style → AI sẽ hardcode màu hex → rất xấu.

---

# ✅ Bước 3 – Prompt đúng cách trong VS Code

Ví dụ prompt nên viết như sau:

```
Generate a production-ready React component using:
- TypeScript
- Tailwind CSS
- Semantic HTML
- Responsive layout
- Extract reusable components
- Use flexbox based on Figma auto layout
```

Nếu không chỉ định → AI có thể generate inline style hoặc div lộn xộn.

---

# 🧠 Vì sao không bao giờ đạt 100%?

Vì Figma và browser khác nhau:

| Figma              | Browser            |
| ------------------ | ------------------ |
| Vector engine      | CSS layout engine  |
| Perfect math       | Subpixel rendering |
| Auto layout        | Flexbox/Grid       |
| Fixed width canvas | Responsive layout  |

Một số khác biệt không tránh khỏi:

- Font rendering
- Letter spacing
- Line height rounding
- SVG rendering
- Box model khác Figma

---

# 🚀 Cách đạt “gần 100% nhất”

## 🔥 Công thức chuẩn

1. Figma dùng Auto Layout 100%
2. Dùng component + variant đầy đủ
3. Dùng design tokens
4. Dùng Tailwind mapping với token
5. Generate theo từng section nhỏ
6. Refactor lại sau khi generate

---

# 🎯 Thực tế trong team chuyên nghiệp

Flow thường là:

1. AI generate base layout
2. Dev chỉnh lại spacing / edge case
3. QA pixel check
4. Fix lại CSS

Không ai dùng AI và expect code deploy production ngay.

---

# 💡 Nếu bạn muốn tối ưu thật sự

Cho mình biết:

- Bạn dùng CSS gì? (Tailwind / CSS Module / Styled Components?)
- Design của bạn có Auto Layout 100% không?
- Bạn muốn output là:
  - Pure React?
  - Next.js?
  - Có design system riêng không?

Mình sẽ đưa bạn checklist cụ thể để đạt mức pixel-perfect cao nhất có thể 🚀
