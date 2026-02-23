Bạn đang gặp lỗi này vì **@figma/mcp-server KHÔNG tồn tại trên npm registry**, nên `npx` không thể tải về.

Log quan trọng:

```
npm error 404 Not Found - GET https://registry.npmjs.org/@figma%2fmcp-server
npm error 404 '@figma/mcp-server@*' is not in this registry.
```

→ Nghĩa là package này không có trên npm.

---

# 🎯 Nguyên nhân thật sự

Figma MCP server KHÔNG được distribute qua npm như:

```
npx @figma/mcp-server ❌ (sai)
```

Thay vào đó, Figma cung cấp:

```
Remote MCP server (hosted by Figma) ✅
```

URL chính thức:

```
https://mcp.figma.com/mcp
```

---

# ✅ Cách fix đúng (khuyến nghị chính thức từ Figma)

Bạn KHÔNG chạy local server.
Bạn dùng remote MCP server.

---

# ✅ Sửa lại `.vscode/mcp.json`

Thay toàn bộ file bằng:

```json
{
  "servers": {
    "figma": {
      "type": "http",
      "url": "https://mcp.figma.com/mcp"
    }
  }
}
```

---

# 🧭 Giải thích từng dòng

```
"type": "http"
```

→ dùng remote MCP server

```
"url": "https://mcp.figma.com/mcp"
```

→ MCP server chính thức của Figma

```
"Authorization": "Bearer TOKEN"
```

→ dùng Personal Access Token bạn đã tạo

---

# ✅ Sau đó làm các bước sau

## 1. Save file

```
.vscode/mcp.json
```

---

## 2. Restart VS Code

```
Cmd + Shift + P
→ Reload Window
```

---

## 3. Start MCP server

Command Palette:

```
MCP: List Servers
```

Bạn sẽ thấy:

```
figma
```

Click:

```
Start Server
```

---

## 4. Nếu thành công, log sẽ là:

```
Connection state: Running
```

KHÔNG có npm error nữa.

---

# 🎯 Test ngay

Mở Copilot Chat → Agent mode

Paste:

```
Open this Figma file and generate React code:
https://www.figma.com/file/xxxxx
```

---

# 📌 Vì sao không dùng local server?

Hiện tại Figma MCP server:

- KHÔNG public npm package
- KHÔNG intended để chạy local bằng npx
- Chỉ intended để dùng qua remote endpoint

---

# 🔥 Tóm tắt ngắn gọn

Sai:

```json
"command": "npx",
"args": ["@figma/mcp-server"]
```

Đúng:

```json
{
  "servers": {
    "figma": {
      "type": "http",
      "url": "https://mcp.figma.com/mcp",
      "headers": {
        "Authorization": "Bearer YOUR_TOKEN"
      }
    }
  }
}
```

---

# Nếu bạn muốn, mình sẽ hướng dẫn luôn cách dùng Copilot Agent để:

- select frame trong Figma
- generate React component
- generate Tailwind
- generate pixel-perfect layout
