Trong các phương pháp hay nhất (best practices) của Vercel AI Agent React, các tệp SKILL.md, AGENTS.md và các tệp tin .md khác trong thư mục rules phục vụ các mục đích khác nhau liên quan đến việc cung cấp ngữ cảnh (context) và khả năng chuyên biệt (specialized capabilities) cho các tác nhân AI (AI agents). 
Khi nào cần dùng các file này:
1. Các file *.md trong folder rules (ví dụ: performance.md, accessibility.md, v.v.) 
Mục đích: Các tệp này chứa các quy tắc hoặc hướng dẫn chi tiết, riêng lẻ về các phương pháp hay nhất trong một lĩnh vực cụ thể (ví dụ: tối ưu hóa hiệu suất, khả năng truy cập, quy ước mã hóa).
Khi nào dùng:
Để tổ chức các quy tắc một cách modular, dễ quản lý và cộng tác (ví dụ: trong một kho lưu trữ mã nguồn mở như agent-skills của Vercel).
Chúng được thiết kế để biên dịch (compile) tự động thành một tài liệu AGENTS.md thống nhất, cho phép các nhóm áp dụng các quyết định nhất quán trên toàn bộ codebase. 
2. File AGENTS.md
Mục đích: AGENTS.md là một tài liệu tổng hợp duy nhất cung cấp ngữ cảnh rộng, nền tảng cho tác nhân AI trên mọi tác vụ. Nó đóng vai trò như một tập hợp hướng dẫn cốt lõi mà tác nhân luôn có quyền truy cập.
Khi nào dùng:
Đặt tệp này ở thư mục gốc của dự án để cung cấp các tiêu chuẩn mã hóa, quy ước dự án, hoặc các quyết định kiến trúc cốt lõi, những thông tin luôn liên quan đến bất kỳ tác vụ nào mà tác nhân thực hiện.
Sử dụng cho các ngữ cảnh "nằm ngang" (horizontal context) - thông tin áp dụng chung cho toàn bộ dự án (ví dụ: "luôn sử dụng memo cho các component hiệu năng cao").
Nó đảm bảo tính nhất quán cao vì nội dung được tải vào lời nhắc hệ thống (system prompt) trên mọi lượt tương tác, không yêu cầu tác nhân phải "quyết định" xem có nên tải nó hay không. 
3. File SKILL.md
Mục đích: SKILL.md là tệp định nghĩa cốt lõi của một "kỹ năng" (skill) - một khả năng chuyên biệt, có thể tái sử dụng, giúp tác nhân thực hiện các quy trình nhiều bước hoặc các tác vụ cụ thể, sâu sắc hơn.
Khi nào dùng:
Sử dụng khi bạn cần tác nhân thực hiện các tác vụ chuyên biệt, theo chiều dọc (vertical, action-specific tasks) mà người dùng có thể kích hoạt rõ ràng (ví dụ: "di chuyển sang App Router", "tối ưu hóa gói", "tạo release notes từ git history").
Kỹ năng có thể bao gồm các script có thể thực thi (Python, bash) để tự động hóa các tác vụ phức tạp, điều mà các tệp .md thông thường không làm được.
SKILL.md chứa metadata và hướng dẫn cho tác nhân biết khi nào cần kích hoạt kỹ năng đó, cho phép tải ngữ cảnh chuyên biệt chỉ khi cần thiết, giúp tiết kiệm bối cảnh chung. 
Tóm lại, các file .md trong thư mục rules là các mảnh ghép nhỏ xây dựng nên AGENTS.md (ngữ cảnh nền tảng, luôn có sẵn), trong khi SKILL.md định nghĩa các khả năng chuyên biệt, có thể kích hoạt theo yêu cầu cho các tác vụ phức tạp, tự động hóa cao. 

# Khi nào cần dùng file SKILL, AGENTS và các file trong folder rules
Câu hỏi này hay nè — vì hiểu 3 loại file này là bạn đang hiểu **cách AI agent “học luật chơi” trong project** đó 🔥

Nhìn structure của bạn:

```
.agents/
 └─ skills/
     └─ vercel-react-best-practices/
         ├─ AGENTS.md
         ├─ SKILL.md
         └─ rules/
             ├─ *.md
```

Nó hoạt động theo **3 tầng vai trò khác nhau**:

---

# 🧠 1️⃣ `SKILL.md` = **Bộ não kiến thức (Knowledge Base)**

### 👉 Dùng để làm gì?

Chứa **best practices, kỹ thuật, guideline chuyên môn**

Ví dụ trong Vercel React skill:

* Cách tối ưu Server Component
* Tránh re-render
* Cách dùng cache
* Hydration đúng cách

📌 Đây là **“nên code như thế nào”**

### AI dùng khi nào?

Khi bạn hỏi:

* “tối ưu component này giúp tôi”
* “đoạn này có performance issue không”
* “refactor theo best practice Vercel”

➡ AI sẽ đọc `SKILL.md` để **áp dụng kiến thức kỹ thuật**

🧩 Giống như: *giáo trình chuyên môn*

---

# 🤖 2️⃣ `AGENTS.md` = **Hướng dẫn cách AI hành xử**

### 👉 Dùng để làm gì?

Dạy AI **cách sử dụng SKILL này**

Ví dụ nội dung thường có:

* Khi nào nên áp dụng skill này
* Nên ưu tiên rule nào
* Không nên làm gì
* Phạm vi áp dụng (React, Next.js, v.v.)

📌 Đây là **“AI nên suy nghĩ và hành động ra sao”**

### AI dùng khi nào?

Khi AI chuẩn bị trả lời hoặc sửa code, nó đọc file này để biết:

> “À, với skill này mình phải ưu tiên performance trước, rồi mới tới readability”

🧩 Giống như: *brief dành cho nhân viên mới*

---

# 📏 3️⃣ Folder `rules/*.md` = **Luật cụ thể để ra quyết định**

Mỗi file trong `rules/` là **một luật rất cụ thể và có thể áp dụng trực tiếp vào code**

Ví dụ:

| File rule                   | Ý nghĩa                         |
| --------------------------- | ------------------------------- |
| `server-cache-react.md`     | Khi nào dùng React.cache        |
| `render-memo.md`            | Khi nào bắt buộc dùng memo      |
| `client-event-listeners.md` | Tránh duplicate event listeners |

📌 Đây là **“nếu gặp tình huống X → phải làm Y”**

### AI dùng khi nào?

Khi nó phân tích code của bạn, nó match với rule:

> “Ồ component này đang fetch 2 lần → rule `client-swr-dedupe` áp dụng được”

🧩 Giống như: *bộ luật if-else cho AI*

---

# 🔥 Tóm tắt cực dễ nhớ

| File           | Vai trò               | Cho AI biết                  |
| -------------- | --------------------- | ---------------------------- |
| **SKILL.md**   | Kiến thức chuyên môn  | “Code tốt trông như thế nào” |
| **AGENTS.md**  | Cách AI sử dụng skill | “Khi nào và ưu tiên gì”      |
| **rules/*.md** | Luật áp dụng cụ thể   | “Gặp case này thì xử lý sao” |

---

# 🕒 Khi nào bạn cần chỉnh / dùng từng loại?

| Bạn muốn làm gì                                              | Sửa file nào                    |
| ------------------------------------------------------------ | ------------------------------- |
| Thêm best practice mới                                       | `SKILL.md`                      |
| Muốn AI ưu tiên performance hơn readability                  | `AGENTS.md`                     |
| Muốn AI bắt lỗi cụ thể (vd: cấm inline function trong props) | Tạo rule mới trong `rules/`     |
| Muốn AI hiểu chuẩn code của team bạn                         | Cả 3 (tạo skill riêng cho team) |

---

# 💡 Ví dụ thực tế

Bạn nói với AI:

> “Review giúp tôi component này có tối ưu chưa”

AI sẽ:

1. Đọc **AGENTS.md** → hiểu phải review theo performance rules
2. So code với từng file trong **rules/**
3. Dùng kiến thức trong **SKILL.md** để đề xuất cách sửa

---

# 🎯 Kết luận một câu

> **SKILL = kiến thức, AGENTS = cách dùng kiến thức, RULES = luật để áp dụng kiến thức vào code.**

---

Nếu bạn muốn, mình có thể giúp bạn **tạo một skill riêng cho team frontend của bạn** (chuẩn code, naming, structure, performance…) để AI review code đúng style team luôn 😎
