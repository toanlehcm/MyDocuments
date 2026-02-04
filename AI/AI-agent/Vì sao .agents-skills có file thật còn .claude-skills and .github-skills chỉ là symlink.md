Chuẩn luôn, bạn đang nhìn **đúng bản chất thiết kế của hệ thống agent skills** đó 👍

## 🧠 Vì sao `.agents/skills` có file thật còn `.claude/skills` & `.github/skills` chỉ là symlink?

### 🗂️ 1️⃣ `.agents/skills` = **nguồn gốc (source of truth)**

Đây là nơi tool `npx skills add` **tải toàn bộ nội dung skill thật về máy bạn**.

Bên trong có đầy đủ:

```
SKILL.md
AGENTS.md
rules/
...
```

👉 Đây là **thư mục thật**, nên bạn mở ra đọc file bình thường.

---

### 🔗 2️⃣ `.claude/skills` và `.github/skills` = **lối tắt cho từng AI dùng**

Hai thư mục này **không chứa nội dung thật**.
Chúng chỉ chứa **symlink trỏ về `.agents/skills`**

Ví dụ:

```
.github/skills/vercel-react-best-practices
   → ../../.agents/skills/vercel-react-best-practices
```

Mục đích:

| Thư mục          | Dùng cho AI nào        |
| ---------------- | ---------------------- |
| `.claude/skills` | Claude Code            |
| `.github/skills` | GitHub Copilot Agents  |
| `.agents/skills` | Kho skill gốc trên máy |

➡️ Tức là **một bộ skill dùng chung cho nhiều AI**, tránh tải 3 lần.

---

## 💡 Ví dụ dễ hiểu

Hãy tưởng tượng:

* `.agents/skills` = **Ổ cứng chứa sách gốc**
* `.github/skills` = **Lối tắt trên desktop**
* `.claude/skills` = **Lối tắt trong Start Menu**

Xóa lối tắt vẫn còn sách
Nhưng mất ổ cứng thì mọi lối tắt đều hỏng

---

## ❓ Vì sao GitHub repo của bạn chỉ thấy symlink?

Vì tool được thiết kế để:

✅ Skill dùng chung cho nhiều project trên cùng máy
❌ Không làm repo nặng
❌ Không commit hàng trăm file rules vào Git

Nên Git chỉ lưu:

```
.github/skills/vercel-react-best-practices (symlink)
```

chứ không lưu nội dung thật.

---

## 🧩 Vì sao VS Code vẫn mở được file từ `.agents`?

VS Code hiểu symlink và tự nhảy về thư mục thật, nên bạn tưởng như file nằm trong repo.

Nhưng thực tế là bạn đang đọc file ở:

```
C:\Users\<you>\.agents\skills\...
```

---

## 🎯 Kết luận ngắn gọn

| Thư mục          | Có file thật không | Mục đích                    |
| ---------------- | ------------------ | --------------------------- |
| `.agents/skills` | ✅ Có               | Nơi chứa skill gốc trên máy |
| `.claude/skills` | ❌ Không (symlink)  | Cho Claude dùng             |
| `.github/skills` | ❌ Không (symlink)  | Cho Copilot/GitHub Agents   |

---

## 🚀 Khi sang máy khác phải làm gì?

Chỉ cần chạy lại:

```bash
npx skills add vercel-labs/agent-skills
```

để tạo lại **nguồn gốc `.agents/skills`**, symlink sẽ tự hoạt động lại.

---

Nếu bạn muốn mình chỉ cách **biến skill này thành thư mục thật trong repo để cả team dùng mà không cần cài lại trên mỗi máy**, mình hướng dẫn luôn — cái này rất hợp khi làm team/company.
