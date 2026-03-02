Ngắn gọn: **KHÔNG dùng được đầy đủ** nếu máy đó **không có thư mục `.agents/skills` chứa nội dung thật**.

Các folder `.claude/skills` và `.github/skills` chỉ là **symlink (lối tắt)**. Không có “ổ cứng gốc” thì AI không có gì để đọc.

---

## Điều gì xảy ra nếu bạn *không* chạy lại lệnh?

| Thành phần                        | Kết quả                  |
| --------------------------------- | ------------------------ |
| Symlink trong repo                | Vẫn thấy                 |
| File `SKILL.md` thật              | ❌ Không tồn tại trên máy |
| Claude / Copilot đọc skill        | ❌ Không đọc được         |
| AI hiểu best practices của Vercel | ❌ Không                  |

👉 Tức là AI vẫn chạy, **nhưng mất toàn bộ kiến thức từ bộ skill đó**. Nó trở lại “AI mặc định”.

---

## Vì sao bắt buộc phải chạy lại?

Lệnh này:

```bash
npx skills add vercel-labs/agent-skills
```

sẽ:

1. Tải nội dung thật về máy
2. Tạo thư mục:

   ```
   ~/.agents/skills/vercel-react-best-practices
   ```
3. Symlink trong project mới có đích để trỏ tới

Không có bước này = symlink trỏ vào khoảng không 🫥

---

## Khi nào *có thể* không cần chạy lại?

Chỉ khi bạn làm **một trong 2 cách này**:

### ✅ Cách 1 — Commit luôn skill thật vào repo (cho team)

Copy từ:

```
~/.agents/skills/vercel-react-best-practices
```

vào repo, ví dụ:

```
/ai-skills/vercel-react-best-practices
```

→ Lúc đó AI đọc trực tiếp từ repo, không cần `.agents`

---

### ✅ Cách 2 — Dùng lại đúng máy cũ

Máy đã từng cài rồi thì không cần cài lại.

---

## 🧠 Kết luận

| Tình huống                  | Có dùng được skill không  |
| --------------------------- | ------------------------- |
| Máy mới, chưa từng cài      | ❌ Không                   |
| Không chạy `npx skills add` | ❌ Không                   |
| Có thư mục `.agents/skills` | ✅ Có                      |
| Commit skill thật vào repo  | ✅ Có (team-friendly nhất) |

---

Nếu bạn đang làm việc giữa **máy cá nhân ↔ máy công ty**, cách tốt nhất là mình chỉ bạn cách **đưa bộ skill vào repo luôn** để cả team dùng chung, không phụ thuộc máy nào nữa.
