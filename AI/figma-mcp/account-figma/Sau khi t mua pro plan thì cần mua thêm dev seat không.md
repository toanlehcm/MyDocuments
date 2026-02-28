**Trả lời ngắn gọn: KHÔNG cần mua thêm Dev seat nếu bạn đã có Full seat trong Pro plan.**

Nhưng cần hiểu rõ logic của Figma:

---

# 1. Sau khi mua Professional plan, có 2 trường hợp

## Trường hợp 1 — bạn là owner và có Full seat → ✅ dùng MCP được luôn

Professional plan thường sẽ assign cho bạn:

```text
Seat: Full seat
```

Full seat có quyền:

```text
✔ Dev Mode
✔ Inspect
✔ MCP server
✔ Code generation
✔ Desktop MCP server
```

→ KHÔNG cần mua Dev seat thêm.

---

## Trường hợp 2 — bạn chỉ có Viewer seat → ❌ không dùng MCP được

Viewer seat không có:

```text
✘ MCP server
✘ Dev Mode đầy đủ
```

Lúc này cần upgrade seat → Dev hoặc Full.

---

# 2. Quyền MCP theo seat

| Seat      | MCP server |
| --------- | ---------- |
| Viewer    | ❌ No       |
| Dev seat  | ✅ Yes      |
| Full seat | ✅ Yes      |

---

# 3. Quan trọng nhất: MCP cần

```text
Paid plan
+
Dev seat OR Full seat
```

Không cần cả hai. Chỉ cần một trong hai.

---

# 4. Với bạn (solo dev), sau khi mua Professional plan sẽ là:

```text
Plan: Professional
Seat: Full seat (automatic)
```

→ dùng MCP OK luôn
→ không cần mua thêm gì.

---

# 5. Cách kiểm tra nhanh sau khi upgrade

Vào:

```text
Figma → Workspace → Members
```

Nếu thấy:

```text
Seat: Full
```

→ OK, MCP hoạt động.

---

# 6. Kết luận cho case của bạn

Sau khi mua Professional plan:

```text
KHÔNG cần mua thêm Dev seat
```

vì bạn đã có:

```text
Full seat
```

→ MCP server sẽ hoạt động.

---

# 7. Sau khi upgrade, bạn cần làm thêm 1 bước quan trọng

Restart:

```text
VSCode
Figma Desktop app
```

để MCP detect lại quyền mới.

---

Nếu bạn muốn, mình có thể đưa checklist 3 bước để verify MCP đang hoạt động 100%.
