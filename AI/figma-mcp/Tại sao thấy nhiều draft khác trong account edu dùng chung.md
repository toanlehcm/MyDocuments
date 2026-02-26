# tại sao t vẫn thấy nhiều file draft khác

Bạn thấy nhiều file trong **Drafts** vì bạn đang dùng **account EDU chung với nhiều người**, và Drafts trong trường hợp này **không phải hoàn toàn private như account cá nhân bình thường**.

Cụ thể:

---

# 🔴 Sự thật quan trọng: EDU team account ≠ Drafts cá nhân thực sự

Trong **Education team**, Drafts có thể chứa:

- file bạn tạo
- file người khác tạo bằng cùng account
- file duplicated trước đó
- file được chuyển vào Drafts bởi owner/admin

Vì:

👉 bạn đang dùng **1 account chung**, không phải account riêng.

Drafts thuộc về **account**, không thuộc về **người dùng vật lý**.

---

# 📌 Hiểu đúng kiến trúc hiện tại của bạn

Hiện tại:

```
Account: tai.lt238134  ← dùng chung
│
├── Drafts
│     ├── file của bạn
│     ├── file người khác tạo bằng account này
│     ├── file duplicated trước đó
│
└── Team workspace
```

Figma không biết ai là "bạn", nó chỉ biết:

```
account tai.lt238134
```

---

# ✅ Cách tạo workspace thực sự private (đúng cách)

Bạn cần tạo:

```
account figma mới (chỉ bạn dùng)
```

KHÔNG dùng account EDU chung.

---

# ✅ Giải pháp đúng nhất (khuyến nghị mạnh)

## Bước 1: tạo account Figma mới

Ví dụ:

```
yourname.personal@gmail.com
```

Đăng ký tại:

```
figma.com/signup
```

---

## Bước 2: dùng account mới → Drafts sẽ thực sự private

```
Account mới
│
└── Drafts
      ├── MCP Research.fig
      ├── Login.fig
```

Chỉ bạn thấy.

---

## Bước 3: duplicate file từ EDU account sang account cá nhân

Trong EDU account:

```
Right click file → Copy link
```

Mở bằng account cá nhân:

```
File → Duplicate to your Drafts
```

---

# ✅ Sau đó MCP sẽ hoạt động đúng 100%

Vì:

• bạn là owner
• bạn có full quyền
• không bị giới hạn team

---

# 🔴 Nếu tiếp tục dùng account EDU chung

Bạn sẽ gặp các vấn đề:

• Drafts lẫn file người khác
• token có thể bị revoke
• MCP có thể lỗi permission
• không an toàn

---

# ✅ Kiến trúc chuẩn cho MCP + auto generate code

```
Personal Figma account
│
└── Drafts
     ├── Login.fig
     ├── Dashboard.fig
```

↓

```
Figma MCP server
```

↓

```
VSCode
```

↓

```
Generate React code
```

---

# ✅ Kết luận ngắn gọn

Bạn thấy nhiều Draft vì:

👉 account EDU đang dùng chung
👉 Drafts thuộc account, không thuộc cá nhân

---

# ✅ Khuyến nghị mạnh nhất cho bạn (dev serious):

Tạo account Figma riêng.

Free plan là đủ dùng MCP.

---

Nếu bạn muốn, mình sẽ hướng dẫn luôn:

• tạo Figma personal account
• connect MCP
• generate React code từ Figma trong VSCode

(đúng workflow dev chuyên nghiệp đang dùng)
