Chuẩn luôn — **VSCode tự nó KHÔNG hề đọc mấy file `SKILL.md`, `AGENTS.md`, hay `rules/*.md`** đâu ❌

Chỉ khi bạn dùng **AI agent / extension có hỗ trợ “agent skills”** thì mấy file đó mới có tác dụng.

---

## 🧠 Vậy hiện tại chuyện gì đang xảy ra?

Bạn thấy AI review code được → điều đó **không có nghĩa** VSCode hiểu skill.

Khả năng cao là:

* Bạn đang dùng **AI chat extension (Copilot Chat / Claude / Cursor-style agent / Continue…)**
* Extension đó mới là thằng đọc thư mục `.agents/skills`
* Nó lấy nội dung trong đó làm **ngữ cảnh (context injection)** khi trả lời

👉 VSCode chỉ là cái IDE hiển thị code thôi.

---

## 🔍 Làm sao biết AI đã thực sự dùng Vercel Skill?

Có 5 cách check thực tế nè:

---

### ✅ Cách 1 — Hỏi thẳng AI (cách nhanh nhất)

Trong chat của extension bạn đang dùng, hỏi:

> **"Are you using the Vercel React best practices skill from my project?"**
> hoặc
> **"Which skills or rules are you applying when reviewing this component?"**

Nếu agent có đọc skill → nó sẽ trả lời kiểu:

* “Based on the Vercel React performance rules…”
* “According to the render optimization rule…”

Nếu nó trả lời chung chung → chưa load skill ❌

---

### ✅ Cách 2 — Cố tình viết code SAI theo rule trong skill

Ví dụ trong Vercel skill có rule:

> ❌ Không tạo inline object/func trong JSX props

Bạn viết thử:

```jsx
<MyComp style={{ color: 'red' }} />
```

Rồi hỏi AI:

> “Code này có vấn đề performance không?”

Nếu AI nói đúng kiểu:

> “This violates render optimization best practices about unstable props…”

➡️ 99% là nó đã đọc rule từ skill

Nếu chỉ nói chung chung “có thể gây re-render” → chưa chắc dùng skill

---

### ✅ Cách 3 — Xem log của extension (QUAN TRỌNG)

Một số AI extension có log kiểu:

| Extension               | Xem ở đâu             |
| ----------------------- | --------------------- |
| Continue                | Output → Continue     |
| Cursor                  | Settings → Agent logs |
| Copilot Workspace/Agent | DevTools console      |
| Claude Dev              | Agent debug panel     |

Bạn tìm dòng như:

```
Loaded 3 skills from .agents/skills
Injecting rules from vercel-react-best-practices
```

Có dòng này = chắc chắn nó đang dùng skill ✅

---

### ✅ Cách 4 — Test bằng rule cực cụ thể

Trong folder rules có mấy rule rất đặc trưng như:

* `render-after-nonblocking`
* `server-cache-react`
* `render-use-transition-loading`

Bạn hỏi:

> “Component này có nên dùng useTransition không?”

Nếu AI chủ động đề xuất:

> “useTransition is recommended for non-urgent updates (see rendering-use-transition-loading rule)”

➡️ Nó đang dùng skill thật

---

### ✅ Cách 5 — Xóa tạm folder `.agents/skills` rồi hỏi lại

1. Rename `.agents` → `_agents_temp`
2. Reload VSCode
3. Hỏi lại AI cùng 1 câu review

Nếu câu trả lời **ít chi tiết hơn / không nhắc tới best practice sâu**
→ trước đó nó thực sự có dùng skill

---

## ❗ Nếu AI KHÔNG dùng skill thì sao?

Thì mấy file đó chỉ là… tài liệu markdown thôi 📄
AI sẽ trả lời dựa vào kiến thức chung, không theo chuẩn Vercel.

---

## 🎯 Kết luận quan trọng nhất

> **VSCode không dùng skill. AI agent extension mới là thứ dùng skill.**

Và cách biết chắc nhất là:

✔ Kiểm tra **agent logs**
✔ Hỏi trực tiếp AI nó đang dùng rule nào
✔ Viết code sai theo rule rồi xem AI có bắt đúng “luật” không

---

Nếu bạn nói mình biết bạn đang dùng extension nào (Copilot Chat, Continue, Cursor, Claude Dev…), mình chỉ luôn cách bật **skill debug mode** cho đúng tool đó 👌
