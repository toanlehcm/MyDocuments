Đây là điểm rất nhiều dev bị nhầm trong Figma: **Plan ≠ Seat**. Mình giải thích đúng theo hệ thống pricing mới của Figma và cách dùng MCP server.

---

# 1. Plan vs Seat là gì?

## Plan = cấp độ workspace

Plan là gói tổng thể của workspace/team.

Ví dụ:

* Free
* Professional
* Organization
* Enterprise

Plan quyết định:

```text
• Có Dev Mode hay không
• Có team libraries
• Có branching
• Có API / MCP / advanced inspect
```

---

## Seat = vai trò bạn mua trong Plan đó

Seat là **loại license gán cho từng user** trong workspace.

Có 3 loại chính:

| Seat        | Dùng để làm gì                 |
| ----------- | ------------------------------ |
| Viewer seat | chỉ xem                        |
| Dev seat    | inspect, Dev Mode, export code |
| Full seat   | thiết kế, edit                 |

---

# 2. Quan trọng: Plan KHÔNG tự động bao gồm Dev seat

Ví dụ:

Professional plan có thể có:

```text
User A → Full seat
User B → Dev seat
User C → Viewer seat
```

Seat được assign riêng cho từng user.

---

# 3. Account free của bạn hiện tại là gì?

Nếu bạn dùng free account cá nhân:

```text
Plan: Starter (Free)
Seat: Full seat (limited)
```

NHƯNG:

```text
Free plan KHÔNG có Dev seat thật
Dev Mode chỉ là preview
KHÔNG có desktop MCP server
```

Đây là lý do bạn thấy lỗi:

```text
The desktop server is available on a Dev or Full seat for all paid plans
```

Keyword quan trọng là:

```text
paid plans
```

Free plan bị loại.

---

# 4. Cách kiểm tra Plan và Seat của bạn

## Cách 1 – nhanh nhất

Mở:

```text
Figma → góc trái → click avatar
→ Settings
→ Plans & billing
```

Bạn sẽ thấy:

```text
Plan: Starter / Professional / Organization
```

---

## Cách 2 – kiểm tra seat

Mở:

```text
Figma → workspace
→ Admin settings
→ Members
```

Bạn sẽ thấy cột:

```text
Seat type:
Viewer
Dev
Full
```

---

## Cách 3 – dấu hiệu nhận biết nhanh

Nếu bạn thấy:

```text
Inspect tab only
Dev Mode nhưng không có code connect / MCP
```

→ bạn KHÔNG có Dev seat thật.

---

# 5. MCP server yêu cầu gì?

Theo doc chính thức của Figma:

```text
Requirements:
Paid plan
+
Dev seat OR Full seat
+
Desktop app
```

---

# 6. Bạn có cần mua Pro plan không?

## Câu trả lời ngắn:

👉 Có, bạn cần:

```text
Professional plan
+
Dev seat
```

---

## Chi tiết hơn:

Professional plan KHÔNG tự cấp Dev seat.

Bạn phải:

```text
Upgrade workspace → Professional
+
Assign Dev seat cho user
```

---

# 7. Chi phí thực tế (2026)

Khoảng:

```text
Professional plan: ~$12 / editor / month
Dev seat: ~$12 / month
```

Nếu bạn chỉ cần Dev seat:

→ tạo workspace Professional
→ assign yourself Dev seat
→ không cần Full seat

→ tiết kiệm hơn.

---

# 8. Cấu hình đúng để dùng MCP

Cấu hình tối thiểu:

```text
Plan: Professional
Seat: Dev seat
App: Figma Desktop
MCP server: enabled
```

---

# 9. Cấu hình KHÔNG hoạt động (case của bạn hiện tại)

```text
Plan: Starter (Free)
Seat: Full seat (free)
```

→ MCP server bị block.

---

# 10. Kiến trúc đúng cho dev dùng MCP (khuyến nghị)

```text
Workspace: Professional
Seat: Dev seat
Tool: VSCode + Figma MCP
```

---

# 11. Kết luận rõ ràng cho case của bạn

Bạn hiện tại:

```text
Plan: Starter (Free)
Seat: free full seat
```

Bạn cần upgrade:

```text
Professional plan
+
Dev seat
```

THÌ mới dùng được:

```text
Figma MCP server
Generate React code tự động
```

---

# 12. Nếu bạn muốn tiết kiệm nhất (best option cho solo dev)

Mình recommend:

```text
Professional plan
+
Dev seat only
```

Không cần Full seat.

---

# Nếu bạn muốn, mình có thể hướng dẫn từng bước upgrade + enable MCP server đúng cách (5 phút setup).
