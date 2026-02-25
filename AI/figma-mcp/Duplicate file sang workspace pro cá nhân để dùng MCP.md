```
nếu t mua pro plan cho account của t, 
mặc dù workspace của team là free, seat của t trong workspace team là view.
nhưng t tạo workspace pro cho riêng mình, sau đó duplicate file design của team vào workspace của t, thì t dùng mcp để auto generate code của file này trong workspace của t được không?
```

**Có. Và đây chính là cách đúng nhất để dùng MCP khi workspace team là Free.**

Nhưng phải đảm bảo **3 điều kiện quan trọng** dưới đây.

---

# ✅ Kết luận ngắn gọn

Scenario của bạn:

* Account: **Professional plan**
* Workspace team: **Free plan**, bạn có **View seat** ❌ MCP không dùng được
* Workspace riêng của bạn: **Professional plan**, bạn là **Full seat** ✅ MCP dùng được
* Bạn **duplicate file sang workspace Professional của bạn** → ✅ MCP hoạt động

👉 **Kết quả: MCP sẽ generate code được bình thường.**

---

# 🧠 Vì sao duplicate sang workspace riêng thì MCP dùng được?

MCP kiểm tra quyền theo:

```text
Workspace chứa file
NOT workspace gốc
NOT workspace team
NOT workspace creator
```

Nó kiểm tra:

```text
Plan của workspace chứa file
+
Seat của bạn trong workspace đó
```

---

# 📊 So sánh rõ ràng

| File nằm ở workspace | Plan         | Seat của bạn | MCP |
| -------------------- | ------------ | ------------ | --- |
| Workspace team       | Free         | View         | ❌   |
| Workspace team       | Free         | Full         | ❌   |
| Workspace riêng      | Professional | Full         | ✅   |
| Workspace riêng      | Professional | Dev          | ✅   |

---

# ✅ Workflow đúng bạn nên làm

## Bước 1 — tạo workspace Professional riêng

Figma → avatar → Settings → Create workspace

Plan: Professional

Bạn sẽ tự động là **Full seat**

---

## Bước 2 — duplicate file vào workspace đó

Trong file design:

```
Right click file
→ Duplicate
→ chọn workspace Professional của bạn
```

Hoặc:

```
File → Move file → chọn workspace Professional
```

---

## Bước 3 — đảm bảo file nằm đúng workspace

URL vẫn dạng:

```
https://www.figma.com/file/FILE_KEY/...
```

Nhưng workspace chứa file là workspace Professional.

---

## Bước 4 — dùng MCP prompt

Prompt:

```
Generate pixel-perfect React component using TailwindCSS.

Requirements:
- exact spacing
- exact colors
- exact font sizes
- exact layout

Figma node:
https://www.figma.com/file/FILE_KEY?node-id=xxx
```

→ MCP sẽ hoạt động

---

# ✅ Cách verify chắc chắn MCP sẽ work

Trong Figma:

Click file → Share

Phải thấy:

```
Workspace: Your Workspace Name
Plan: Professional
```

---

# ❌ MCP sẽ KHÔNG work nếu bạn chỉ duplicate trong Free workspace

Sai:

```
Team workspace (Free)
  └ duplicate → still Free workspace
```

Đúng:

```
Your workspace (Professional)
  └ duplicate → Professional workspace
```

---

# 🎯 Kiểm tra nhanh bằng dấu hiệu này

Nếu MCP hoạt động, VSCode sẽ log:

```
Discovered XX tools
```

và

```
get_design_context success
```

---

# 🎯 Tóm tắt workflow chuẩn cho bạn

```text
Upgrade → Professional plan
Create → Professional workspace
Duplicate file → into Professional workspace
Use MCP → generate code
```

---

# 🎯 Best practice (senior dev workflow)

```text
Company workspace (Free/View)
        ↓ duplicate
Personal workspace (Professional/Full)
        ↓ MCP
Generate React code
        ↓
Commit to project
```

---

Nếu bạn muốn, mình có thể kiểm tra link Figma của bạn và xác nhận 100% MCP sẽ generate được trước khi bạn upgrade plan.
