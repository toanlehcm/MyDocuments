```
t đang dùng account edu chung với người khác hướng dẫn t tạo project cá nhân chỉ 1 mình t thấy và vào xem, chỉnh sửa được, người khác không thấy hoặc không thể vào xem, chỉnh sửa được. mục tiêu: tạo project cá nhân để nghiên cứu figma mcp server + vscode để auto generate code, tối ưu công việc.
```

Bạn đang dùng **account edu chung trong team**, nên mặc định mọi project tạo trong **team workspace** đều có thể bị owner/admin hoặc member khác thấy. Muốn tạo **project cá nhân hoàn toàn riêng tư để dùng với MCP + VSCode**, bạn phải tạo trong **Drafts (workspace cá nhân)**, KHÔNG tạo trong team.

Dưới đây là hướng dẫn chuẩn, đảm bảo chỉ mình bạn thấy:

---

# ✅ Cách tạo project cá nhân PRIVATE trong Figma

## Cách 1 (Khuyến nghị): dùng Drafts (100% private)

### Bước 1: vào Drafts

Ở sidebar trái → click:

```
Drafts
```

KHÔNG chọn:

```
tai.lt238134's team
```

Drafts = workspace cá nhân, chỉ mình bạn thấy.

---

### Bước 2: tạo file mới

Click:

```
New design file
```

hoặc

```
+ → Design file
```

File này sẽ nằm trong:

```
Drafts
```

KHÔNG nằm trong team.

---

### Bước 3: kiểm tra quyền riêng tư

Click nút:

```
Share
```

Bạn sẽ thấy:

```
Only you have access
```

Nếu đúng dòng này → file hoàn toàn private.

---

# ✅ Cách 2: tạo Project folder cá nhân trong Drafts

Drafts không có Project thật sự, nhưng bạn có thể giả lập bằng cách:

```
Drafts
  ├── MCP Research
  │    ├── Login.fig
  │    ├── Dashboard.fig
```

Chỉ cần đặt tên file theo prefix:

```
[MCP] Login
[MCP] Dashboard
```

hoặc

```
MCP/Login
MCP/Dashboard
```

---

# 🚫 KHÔNG làm cách này (vì sẽ không private)

KHÔNG tạo trong:

```
tai.lt238134's team
```

vì:

Owner/admin có thể thấy.

---

# ✅ Cách duplicate file team → private

Nếu muốn copy design team sang private workspace:

### Bước 1

Mở file team

### Bước 2

Click:

```
File → Duplicate to your Drafts
```

---

Sau đó file nằm ở:

```
Drafts
```

PRIVATE hoàn toàn.

---

# ✅ Sau khi ở Drafts → MCP sẽ dùng được

MCP chỉ cần:

• bạn có quyền edit file
• file nằm trong workspace bạn sở hữu

Drafts đáp ứng điều này.

Bạn KHÔNG cần Dev seat nếu:

• bạn dùng MCP qua Personal access token
• và file thuộc Drafts

---

# ✅ Workflow chuẩn để dùng MCP + VSCode

```
Team file
   ↓ Duplicate
Drafts (private)
   ↓
Figma MCP Server
   ↓
VSCode
   ↓
Generate React code
```

---

# ✅ Cách kiểm tra chắc chắn file private

Mở file → click Share

Nếu thấy:

```
Only you have access
```

→ OK

Nếu thấy:

```
tai.lt238134's team
```

→ NOT private

---

# ✅ Kiến trúc đúng cho bạn

```
Account (edu)
│
├── Drafts   ← PRIVATE (use this)
│     ├── MCP Login
│     ├── MCP Dashboard
│
└── tai.lt238134's team  ← SHARED (avoid)
      ├── Team project
```

---

# ✅ Kết luận

Bạn nên dùng:

```
Drafts
```

để:

• private 100%
• dùng MCP
• generate code
• test thoải mái

KHÔNG ai thấy.

---

# Nếu muốn, mình có thể hướng dẫn luôn:

• Cài Figma MCP server
• Connect VSCode
• Generate React code từ Figma trong 10 giây
