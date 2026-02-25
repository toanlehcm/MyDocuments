```
ví dụ, t có account figma pro plain.
caes 1: t có 1 file design figma của t với dev seat cho account của t, nên t có thể dùng mcp để generate code cho file này
case 2: nhưng t có 1 file design figma của team với view seat cho account của t, nên t không thể dùng mcp để generate code cho file này mặc dù account của t là pro plain, nếu t muốn dùng mcp thì phải yêu cầu team leader cấp dev seat cho account của t.

phải vậy không?
```
Đúng hướng rồi — nhưng mình chỉnh lại cho **chính xác 100%** vì trong Figma có 2 tầng quyền:

```
1) Plan của workspace
2) Seat của bạn trong workspace đó
```

MCP phụ thuộc vào **workspace chứa file**, không phải chỉ account của bạn.

(Theo cơ chế của Figma)

---

# Nguyên tắc quan trọng nhất

MCP hoạt động khi:

```
Workspace chứa file = Paid plan
+
Bạn có Dev seat hoặc Full seat trong workspace đó
```

Không liên quan đến việc account cá nhân bạn “từng mua Pro ở chỗ khác”.

---

# Phân tích 2 case bạn đưa

## Case 1

> File design của bạn
> Workspace Pro
> Bạn có Dev seat

→ ✅ MCP hoạt động
→ Generate code bình thường

✔ Đúng.

---

## Case 2

> File thuộc team
> Workspace team là Pro
> Bạn chỉ có Viewer seat

→ ❌ MCP KHÔNG hoạt động

Dù account của bạn có Pro ở workspace khác,
nhưng trong workspace này bạn chỉ là Viewer.

✔ Bạn phải yêu cầu team lead:

```
Assign Dev seat
hoặc
Assign Full seat
```

→ Khi đó MCP mới dùng được cho file đó.

✔ Bạn hiểu đúng.

---

# Ví dụ dễ hiểu hơn

Bạn có:

```
Workspace A (của bạn)
Plan: Pro
Seat: Full
```

và

```
Workspace B (team công ty)
Plan: Pro
Seat: Viewer
```

File nằm ở Workspace B.

→ MCP kiểm tra Workspace B
→ thấy bạn là Viewer
→ block.

---

# Một tình huống nữa (hay bị nhầm)

Nếu:

```
Workspace team = Free plan
Bạn có Dev seat ở workspace khác
```

→ Vẫn KHÔNG dùng MCP cho file team free.

Vì plan của workspace chứa file là Free.

---

# Bảng tổng kết rõ ràng

| Workspace Plan | Seat của bạn | MCP |
| -------------- | ------------ | --- |
| Free           | Full         | ❌   |
| Pro            | Viewer       | ❌   |
| Pro            | Dev          | ✅   |
| Pro            | Full         | ✅   |

---

# Kết luận cho câu hỏi của bạn

Bạn nói:

> nếu muốn dùng mcp thì phải yêu cầu team leader cấp dev seat cho account của t.

→ ✅ Chính xác.

Hoặc Full seat cũng được.

---

# Câu kết luận gọn nhất

MCP phụ thuộc vào:

```
Plan của workspace chứa file
+
Seat của bạn trong workspace đó
```

Không phụ thuộc vào việc account bạn có Pro ở nơi khác.

---

Nếu bạn muốn, mình có thể chỉ bạn cách kiểm tra 30 giây xem một file cụ thể có đủ điều kiện MCP hay không.
