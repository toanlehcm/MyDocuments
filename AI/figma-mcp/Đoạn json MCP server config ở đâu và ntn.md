```json
{
  "mcpServers": {
    "figma": {
      "env": {
        "FIGMA_ACCESS_TOKEN": "your_token_here"
      }
    }
  }
}
```

# Đoạn json này config ở đâu và ntn?

Ok, giờ mình nói rõ phần nhiều người bị rối nhất 👇

Đoạn JSON đó **không phải cấu hình của Figma**.
Nó là **config của MCP client trong VS Code**.

Tức là:
👉 Bạn cấu hình nó ở phía AI extension / MCP client
👉 Không cấu hình trong Figma
👉 Không cấu hình trong VS Code settings mặc định

---

# 🎯 Bước 1: Xác định bạn đang dùng MCP client nào trong VS Code

VS Code bản gốc KHÔNG hỗ trợ MCP.

Bạn phải dùng một trong các tool sau:

- Cursor
- Claude Desktop
- Extension hỗ trợ MCP protocol
- Hoặc tool có file `mcp.json`

👉 Bạn đang dùng tool nào?

---

# 🧠 Nếu bạn dùng Claude Desktop (phổ biến nhất với MCP)

File config nằm ở:

### MacOS:

```
~/Library/Application Support/Claude/claude_desktop_config.json
```

Bạn mở file đó và thêm:

```json
{
  "mcpServers": {
    "figma": {
      "command": "npx",
      "args": ["@figma/mcp-server"],
      "env": {
        "FIGMA_ACCESS_TOKEN": "your_real_token_here"
      }
    }
  }
}
```

Sau đó restart Claude.

---

# 🧠 Nếu bạn dùng Cursor

Cursor có config MCP riêng (thường trong Settings → MCP).

Hoặc file:

```
.cursor/mcp.json
```

Cấu hình tương tự:

```json
{
  "mcpServers": {
    "figma": {
      "command": "npx",
      "args": ["@figma/mcp-server"],
      "env": {
        "FIGMA_ACCESS_TOKEN": "your_real_token_here"
      }
    }
  }
}
```

Restart Cursor.

---

# 🧠 Nếu bạn dùng VS Code thuần

VS Code mặc định KHÔNG có MCP.

Bạn cần:

- Cài extension hỗ trợ MCP
- Hoặc dùng AI client riêng (Claude Desktop, Cursor)

---

# 🚨 Quan trọng

Phần này:

```json
"command": "npx",
"args": ["@figma/mcp-server"]
```

Có nghĩa là client sẽ chạy Figma MCP server thông qua npm package.

Nếu bạn chưa cài node/npm → sẽ lỗi.

---

# 🔎 Kiểm tra Node

Chạy:

```
node -v
npm -v
```

Nếu chưa có → cài Node.js trước.

---

# 🔥 Cách đơn giản nhất cho bạn (cá nhân)

Nếu bạn chỉ muốn:

> Figma → Generate React code trong VS Code

Mình khuyên:

👉 Dùng Cursor
Hoặc
👉 Dùng Claude Desktop + VS Code song song

Vì VS Code thuần + MCP setup phức tạp hơn.

---

# 🎯 Tóm lại

Đoạn JSON đó nằm trong:

| Tool           | Vị trí config                       |
| -------------- | ----------------------------------- |
| Claude Desktop | claude_desktop_config.json          |
| Cursor         | mcp.json hoặc settings              |
| VS Code thuần  | Không hỗ trợ nếu không có extension |

---

Bây giờ cho mình biết:

👉 Bạn đang dùng AI nào trong VS Code?
(Copilot? Claude? Cursor? Extension gì?)

Mình sẽ đưa bạn đường config đúng 100% theo tool của bạn 🚀
