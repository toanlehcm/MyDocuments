# Làm sao config copilot như 1 pair programmer. Liên tục check code, review code khi tôi làm việc. Đảm bảo clean code, product-code, performance, maintain, develop, reuse. Phát hiện lỗi tìm ẩn

Rất hay — bạn đang muốn **biến GitHub Copilot Pro+ trong VS Code thành một “AI Pair Programmer” thật sự**, tức là:
👉 **nó tự động hiểu codebase, theo dõi code bạn viết, phát hiện bug, đề xuất refactor, và đảm bảo clean code & performance.**

Dưới đây là hướng dẫn **chi tiết từ setup → config → cách tương tác hiệu quả**, giúp Copilot hoạt động như một **senior dev đồng hành** trong dự án React/Next/Tailwind/RHF/Zod của bạn.

---

## 🧩 1. Cấu hình cơ bản cần có

### ⚙️ File `.vscode/settings.json`

Tạo hoặc cập nhật:

```json
{
  // 🔹 Bật toàn bộ khả năng Copilot
  "github.copilot.inlineSuggest.enable": true,
  "github.copilot.editor.enableAutoCompletions": true,
  "github.copilot.chat.experimental": true,
  "github.copilot.inlineSuggest.showButton": true,

  // 🔹 Tối ưu hiệu năng & không lag
  "typescript.tsserver.maxTsServerMemory": 4096,
  "files.watcherExclude": {
    "**/node_modules": true,
    "**/.next": true,
    "**/dist": true
  },
  "search.exclude": {
    "**/node_modules": true,
    "**/.next": true,
    "**/dist": true
  },

  // 🔹 Format, lint chuẩn product-code
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.organizeImports": true,
    "source.fixAll.eslint": true
  },
  "eslint.validate": ["javascript", "javascriptreact", "typescript", "typescriptreact"],

  // 🔹 Cho phép Copilot hiểu ngữ cảnh dài
  "github.copilot.chat.context": "workspace",
  "github.copilot.chat.experimental.openEditorContext": true,

  // 🔹 Giảm overload khi gõ
  "editor.quickSuggestions": { "strings": false }
}
```

---

## 🧠 2. Thiết lập “Pair Programming Mode” trong Copilot Chat

### 🔸 Cài thêm extension:

* ✅ **GitHub Copilot**
* ✅ **GitHub Copilot Chat**
* ✅ **ESLint**
* ✅ **Prettier**
* ✅ **Error Lens** (hiển thị lỗi trực tiếp trên dòng code)

---

### 🔸 Kích hoạt Copilot Chat workspace agent

Trong VS Code, mở Copilot Chat (`Ctrl + I`) và chạy lệnh:

```
@workspace /explain
```

Copilot sẽ đọc toàn bộ workspace và hiểu project structure.
👉 Đây là bước để Copilot có **ngữ cảnh toàn dự án**, giống như đồng nghiệp nắm kiến trúc codebase.

---

## 🚀 3. Biến Copilot thành “AI Reviewer” theo thời gian thực

### Tạo file: `.github/copilot-instructions.md`

Đây là nơi bạn định nghĩa cách Copilot hành xử như reviewer:

```markdown
# Copilot Developer Guide

You are my AI pair programmer.
Your goals:
- Continuously analyze my code for readability, maintainability, and performance.
- Suggest fixes for potential bugs or anti-patterns.
- Enforce clean code, atomic design, and reusable component structure.
- Optimize React/Next.js components for rendering performance.
- Follow best practices for Tailwind, Zod, and React Hook Form.
- Warn about hidden async bugs, re-render loops, and memory leaks.

When I write code, always:
1. Explain possible issues or improvements.
2. Suggest cleaner or more reusable patterns.
3. Identify potential performance bottlenecks.
4. Help refactor functions or hooks for better scalability.
```

> ⚙️ Copilot Chat Pro+ sẽ tự động đọc file này và điều chỉnh “hành vi gợi ý” của nó.

---

## 💬 4. Cách giao tiếp với Copilot như 1 senior dev đồng hành

Sử dụng prompt trực tiếp trong **Copilot Chat (Ctrl+I)** hoặc command palette.

### 🔹 Prompt mẫu debug/review liên tục:

```bash
@workspace /fix 
Review my currently open files and detect any potential bugs, re-renders, or performance issues.
Ensure clean code and scalability.
```

### 🔹 Khi commit code:

```bash
@workspace /explain
Explain what changed in my current file and check if the code follows clean code and atomic design principles.
```

### 🔹 Khi nghi ngờ có lỗi tiềm ẩn:

```bash
@workspace /fix
Find possible hidden bugs or logic mistakes in this component and propose safer alternatives.
```

### 🔹 Định kỳ check toàn project:

```bash
@workspace /tests
Generate or validate unit tests for all critical functions to ensure reliability.
```

---

## ⚡ 5. Kết hợp Claude / Cursor / GPT song song (tối ưu Copilot Pro+)

* Dùng **Copilot Pro+** cho **in-context & inline review** (AI viết và sửa trực tiếp trong code).
* Dùng **Claude Sonnet 4.1 / GPT-5** để **phân tích chuyên sâu và refactor module lớn** (qua file context).
* Dùng **Cursor IDE hoặc n8n workflow** nếu bạn muốn **AI tự động trigger code review hoặc test mỗi lần commit.**

---

## 🧩 6. Tips chuyên sâu

| Mục tiêu        | Hành động                                                                                         |
| --------------- | ------------------------------------------------------------------------------------------------- |
| Giảm lag        | Disable “Copilot Chat” khi chỉ code thuần                                                         |
| Performance     | Dùng `useMemo`, `useCallback`, và kiểm tra render bằng React Profiler                             |
| Clean Code      | Thêm ESLint rules như `eslint-plugin-react-hooks`, `eslint-plugin-import`                         |
| Review tự động  | Tạo GitHub Action: “Copilot Review Bot” chạy khi PR mở                                            |
| Ghi nhớ pattern | Thêm prompt tùy chỉnh vào `.copilot/instructions.md` như “follow AlignUI design system structure” |

---

Nếu bạn muốn, mình có thể tạo sẵn:

> 🔧 **bộ config VS Code + Copilot Pro+ + Claude Sonnet “Pair Programming Setup”**
> gồm:

* `settings.json`
* `.copilot-instructions.md`
* ESLint ruleset
* Prompt mẫu theo từng hành động (debug, refactor, optimize, fix hidden bug)

Bạn có muốn mình tạo full package này không (có thể copy-paste trực tiếp vào dự án)?
