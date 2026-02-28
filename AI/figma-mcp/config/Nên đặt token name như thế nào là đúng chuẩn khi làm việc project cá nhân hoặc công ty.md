# Nên đặt token name như thế nào là đúng chuẩn khi làm việc project cá nhân hoặc công ty?

Câu này rất đúng mindset chuyên nghiệp 👍
Token name không ảnh hưởng kỹ thuật, nhưng ảnh hưởng **quản lý, audit và bảo mật**.

---

# 🎯 Nguyên tắc đặt tên token chuẩn

Một token tốt nên thể hiện rõ:

```
[Environment] - [Tool] - [Project] - [Owner] - [Date]
```

Hoặc tối thiểu:

```
[Tool] - [Purpose] - [Env]
```

---

# 🧑‍💻 1️⃣ Project cá nhân

Đơn giản, dễ nhớ:

### Ví dụ tốt:

```
vscode-mcp-local
figma-react-gen-dev
mcp-personal-macbook
```

Nếu bạn có nhiều máy:

```
mcp-macbook-m2
mcp-home-pc
```

Nếu bạn có nhiều project:

```
mcp-portfolio-site
mcp-saas-dashboard
```

---

# 🏢 2️⃣ Project công ty (chuẩn chuyên nghiệp)

Ở môi trường công ty, token nên thể hiện:

- Ai tạo
- Dùng cho tool gì
- Dùng cho môi trường nào
- Thuộc project nào

### Format đề xuất:

```
company-project-tool-env-owner
```

### Ví dụ:

```
acme-dashboard-mcp-dev-nam
acme-designsystem-ci-prod
acme-vscode-figma-staging
```

---

# 🔐 3️⃣ Nếu làm production / CI

Nên rõ environment:

```
mcp-prod-ci
mcp-staging-build
mcp-dev-local
```

Tránh đặt kiểu:

```
token1
mytoken
figma123
```

Vì sau 6 tháng bạn sẽ không biết nó là gì.

---

# 📅 Có nên thêm ngày không?

Nếu token có expiration ngắn → nên thêm:

```
mcp-dev-2026-02
```

Nếu long-term → không cần.

---

# 🔥 Best Practice thực tế trong team lớn

Họ thường:

- Mỗi environment 1 token riêng
- Không share token cá nhân
- Không dùng 1 token cho nhiều tool
- Rotate token định kỳ

---

# 🚨 Cực kỳ quan trọng

KHÔNG:

- Commit token lên GitHub
- Đặt token trong source code
- Share token qua Slack

LUÔN:

- Đặt trong `.env`
- Hoặc secret manager

---

# 🎯 Cho trường hợp của bạn (VS Code + MCP)

Nếu là cá nhân:

```
vscode-figma-mcp-dev
```

Nếu là công ty:

```
companyname-figma-mcp-dev-yourname
```

---

Nếu bạn nói rõ:

- Bạn đang làm cá nhân hay team?
- Có nhiều môi trường không (dev/staging/prod)?

Mình sẽ đề xuất naming convention chuẩn luôn cho setup của bạn 🚀

---

Ok 👍 project cá nhân + chỉ có **dev env** thì làm đơn giản nhưng vẫn “chuẩn chỉnh” để sau này scale không rối.

---

# 🎯 Naming gợi ý cho bạn

Vì:

- Cá nhân
- Chỉ dev
- Dùng cho VS Code + MCP
- Kết nối Figma

👉 Mình khuyên đặt theo format:

```
figma-mcp-vscode-dev
```

Hoặc ngắn hơn:

```
mcp-vscode-dev
```

Hoặc nếu bạn có nhiều project cá nhân:

```
mcp-portfolio-dev
mcp-saas-dev
mcp-dashboard-dev
```

---

# 🧠 Tại sao vẫn nên có “dev”?

Vì:

- Sau này bạn có thể thêm:
  - CI token
  - Staging
  - Production

- Hoặc dùng token cho tool khác (Claude, Cursor…)

Nếu hôm nay đặt:

```
figma-token
```

6 tháng sau bạn sẽ không nhớ nó dùng cho cái gì 😅

---

# 🚀 Setup sạch cho cá nhân (best practice)

1️⃣ Tạo token:

```
figma-mcp-vscode-dev
```

2️⃣ Lưu vào `.env`:

```
FIGMA_ACCESS_TOKEN=xxxxx
```

3️⃣ Thêm `.env` vào `.gitignore`

4️⃣ Không reuse token cho tool khác

---

# 🔐 Extra tip (ít người để ý)

Vì bạn chỉ dev local:

- Set expiration 30–90 ngày
- Đừng để “No expiration”
- Khi hết hạn → rotate token

Giúp tránh rủi ro nếu lỡ lộ token.

---

# 🎯 Kết luận cho case của bạn

👉 Đặt:

```
figma-mcp-vscode-dev
```

Là gọn, rõ, chuẩn, đủ chuyên nghiệp cho cá nhân.

---

Nếu bạn muốn mình check luôn config MCP trong VS Code để đảm bảo generate React code mượt nhất, gửi mình config bạn đang dùng nhé 🚀
