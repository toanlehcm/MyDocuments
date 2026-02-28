# Cần chọn checkbox nào trong figma generate new token

Rồi, phần này quan trọng 👇
Bạn **không cần tick hết** — chỉ chọn scope đủ dùng cho MCP + generate React code.

---

# 🎯 Với mục tiêu của bạn:

Figma → VS Code → đọc design → generate React code

👉 Bạn cần AI đọc:

- Cấu trúc node
- Layout (Auto Layout)
- Text styles
- Color styles
- Component
- Variant

---

# ✅ NÊN tick các scope sau

## 🔹 Files

✔ `file_content:read`
→ Quan trọng nhất (đọc structure & layout)

✔ `file_metadata:read`
→ Đọc info file

✔ `file_versions:read` (optional nhưng nên có)
→ Tránh lỗi khi file có versioning

---

## 🔹 Design systems (nếu bạn dùng library/component)

✔ `library_content:read`
✔ `library_assets:read` (optional)

Nếu bạn dùng design system → nên tick.

---

# ❌ KHÔNG cần tick

## Users

- `current_user:read` ❌ (không cần)

## Comments

- `file_comments:read` ❌
- `file_comments:write` ❌

Bạn không generate comment nên không cần.

---

# 🎯 Tóm lại cho bạn (project cá nhân)

Chỉ cần tick:

```
file_content:read
file_metadata:read
library_content:read (nếu dùng component library)
```

Là đủ.

---

# 🔐 Nguyên tắc bảo mật

> Chỉ cấp quyền tối thiểu cần thiết (Principle of Least Privilege)

Không tick write nếu không cần.

---

Nếu bạn gửi mình ảnh sau khi tick, mình check giúp bạn đã đủ để MCP hoạt động chưa 🚀
