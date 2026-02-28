# T không thấy Personal Access Tokens trong settings của figma app trên macbook M2

Chuẩn rồi — vì bạn đang mở **Figma Desktop App trên macOS**, còn **Personal Access Token không nằm trong app**.

👉 Nó chỉ có trong **Figma Web (trình duyệt)**.

---

# ✅ Cách tạo Personal Access Token đúng chỗ

## Bước 1 — Mở Figma trên web

Vào:

```
https://www.figma.com
```

Đăng nhập bằng account của bạn.

---

## Bước 2 — Vào Settings trên Web

Góc trên bên trái → click avatar → **Settings**

Hoặc truy cập trực tiếp:

```
https://www.figma.com/settings
```

---

## Bước 3 — Cuộn xuống phần “Personal access tokens”

Ở gần cuối trang bạn sẽ thấy:

> Personal access tokens

Nhấn:

**Generate new token**

---

## ⚠️ Vì sao không thấy trong app?

Figma Desktop App:

- Không hiển thị token management
- Chỉ là wrapper cho web app
- Không có phần API token UI

Token chỉ quản lý ở web vì:

- Liên quan bảo mật
- Liên quan API access
- Không phải feature của design UI

---

# 🎯 Sau khi có token

Bạn dùng nó trong MCP config kiểu:

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

---

# 🔥 Nếu bạn vẫn không thấy mục Personal Access Tokens

Có 3 khả năng:

1. Account thuộc Organization bị admin disable token
2. Bạn đang ở Education plan
3. Bạn đang dùng SSO bị hạn chế

---

# 💡 Cách kiểm tra nhanh

Truy cập trực tiếp link này khi đã login:

```
https://www.figma.com/settings#personal-access-tokens
```

Nếu vẫn không thấy, chụp màn hình web settings gửi mình, mình check giúp bạn.

---

Bạn đang dùng:

- Figma Free?
- Figma Professional?
- Team plan?

Cho mình biết plan để mình hướng dẫn tiếp cho đúng case của bạn 🚀
