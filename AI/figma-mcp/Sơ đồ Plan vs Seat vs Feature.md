```
Vẽ sơ đồ rõ ràng giựa Plan vs Seat vs Feature, để không bao giờ bị nhầm giữa 3 cái này nữa.
```

Dưới đây là sơ đồ rõ ràng nhất để bạn không bao giờ nhầm giữa **Plan vs Seat vs Feature** trong Figma:

---

# 🧠 Sơ đồ tổng thể: Plan → Seat → Feature

```
Figma Account
│
├── Workspace (Plan)
│     ├── Starter (Free)
│     ├── Professional (Paid)
│     ├── Organization (Paid)
│     └── Enterprise (Paid)
│
│     ↓ quyết định feature nào được phép tồn tại
│
├── Seat (vai trò của bạn trong workspace)
│     ├── View seat
│     ├── Dev seat
│     └── Full seat
│
│     ↓ quyết định bạn có được dùng feature đó không
│
└── Feature (Dev Mode, MCP, Inspect, etc)
```

---

# 🎯 Mối quan hệ thực tế (QUAN TRỌNG NHẤT)

```
Feature usable = Plan cho phép
                 AND
                 Seat cho phép
```

Phải đúng cả 2 điều kiện.

---

# 📊 Bảng đầy đủ: Plan vs Seat vs Feature

| Plan           | Seat | Dev Mode | Inspect CSS | MCP server | Generate code |
| -------------- | ---- | -------- | ----------- | ---------- | ------------- |
| Starter (Free) | View | ❌        | ❌           | ❌          | ❌             |
| Starter (Free) | Full | ❌        | ❌           | ❌          | ❌             |
| Starter (Free) | Dev  | ❌        | ❌           | ❌          | ❌             |
| Professional   | View | ❌        | ❌           | ❌          | ❌             |
| Professional   | Dev  | ✅        | ✅           | ✅          | ✅             |
| Professional   | Full | ✅        | ✅           | ✅          | ✅             |
| Organization   | Dev  | ✅        | ✅           | ✅          | ✅             |
| Organization   | Full | ✅        | ✅           | ✅          | ✅             |

---

# 🔥 Ví dụ thực tế đúng với case của bạn

Hiện tại bạn:

```
Plan = Starter (Free)
Seat = Full seat (free)
```

Result:

```
Dev Mode = ❌
MCP server = ❌
Inspect = ❌
```

Dù bạn là owner file.

---

# 🔥 Ví dụ sau khi upgrade Professional

```
Plan = Professional
Seat = Full seat
```

Result:

```
Dev Mode = ✅
MCP server = ✅
Inspect = ✅
Generate code = ✅
```

---

# 🔥 Ví dụ Professional nhưng chỉ View seat

```
Plan = Professional
Seat = View seat
```

Result:

```
Dev Mode = ❌
MCP = ❌
Inspect = ❌
```

---

# 🧠 Sơ đồ logic đơn giản nhất

```
             Plan = Free
                  │
                  └── ALL Dev features LOCKED


             Plan = Professional+
                  │
                  ├── View seat → LOCKED
                  │
                  └── Dev / Full seat → UNLOCKED
```

---

# 🎯 Điều kiện để MCP hoạt động

Phải có đủ cả 2:

```
Plan = Professional+
AND
Seat = Dev or Full
```

---

# 🎯 Case tốt nhất cho cá nhân (recommended)

Chỉ cần:

```
Professional plan
+
Full seat
```

KHÔNG cần mua thêm Dev seat riêng.

Full seat đã đủ.

---

# 🎯 Tóm tắt 1 câu dễ nhớ nhất

```
Plan quyết định feature tồn tại hay không
Seat quyết định bạn có được dùng feature đó không
```

---

# 🎯 Áp dụng trực tiếp cho mục tiêu của bạn (generate React từ Figma)

Bạn cần:

```
Professional plan
+
Full seat
+
File nằm trong workspace đó
```

→ MCP hoạt động
→ VSCode generate React pixel-perfect

---

Nếu bạn muốn, mình sẽ hướng dẫn luôn workflow chuẩn mà senior dev dùng:

```
Figma → MCP → VSCode → Generate → Refactor → Production-ready
```

để build UI nhanh hơn 5–10 lần.
