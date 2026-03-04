```
bạn là 1 senior FE 10 năm kinh nghiệm.
để sử dụng AI agent tối ưu công việc phát triển project, bạn hãy đề xuất cho t các yêu cầu mà AI agent cần nhớ để khi t prompt thì không cần phải lặp đi lặp lại hoặc mất context:
ví dụ: yêu cầu AI agent tạo file skill.md để đảm bảo clean code, chuẩn product code, không bị lỗi null exception, không crash app, maintainable, các convention name, rule,....
- tạo file structure.md để nhớ cấu trúc source, các component, biết sử dụng lại các component để đồng nhất hệ thống.
- các file cần thiết khác trong quá trình phát triển, fix bug cho dự án.
- cho t các link, blog, document để dẫn chứng và t có thể tham khảo các team khác có những bộ agent skill nào, đặt tên từng file agent skill như thế nào để đúng chuẩn trên thế giới, không bị thiếu sót khi cung cấp thông tin huấn luyện cho AI agent của tôi.
```

# 🧠 AI Agent Memory System cho Senior FE

Dựa trên 10 năm kinh nghiệm, đây là **bộ file "brain" chuẩn** mà AI agent cần để không bao giờ mất context và luôn code đúng chuẩn:

---

## 📁 Cấu trúc thư mục đề xuất

```
.brain/
├── 📋 CORE CONTEXT
│   ├── structure.md        # Kiến trúc source, components map
│   ├── tech-stack.md       # Tech stack, versions, dependencies
│   └── domain-glossary.md  # Thuật ngữ business domain
│
├── 🎯 CODE STANDARDS
│   ├── conventions.md      # Naming, file structure conventions
│   ├── code-style.md       # Code style rules (ESLint, Prettier config)
│   ├── patterns.md         # Design patterns đang dùng
│   └── anti-patterns.md    # Các lỗi phổ biến cần tránh
│
├── 🛡️ QUALITY GATES
│   ├── skill-null-safety.md     # Null/undefined safety rules
│   ├── skill-error-handling.md  # Error boundary, try/catch patterns
│   ├── skill-performance.md     # Performance rules (memo, lazy load...)
│   └── skill-accessibility.md   # A11y standards
│
├── 🔧 PROJECT SPECIFIC
│   ├── api-contracts.md    # API endpoints, response shapes
│   ├── state-management.md # State structure (Redux/Zustand/Context)
│   ├── routing.md          # Route map, guards, layouts
│   └── known-issues.md     # Bug đã biết, workarounds
│
└── 🚀 WORKFLOW
    ├── git-workflow.md     # Branch strategy, commit convention
    ├── review-checklist.md # PR review checklist
    └── deploy-runbook.md   # Deploy steps, rollback plan
```

---

## 📄 Nội dung từng file quan trọng

### 1. `structure.md` — Source Map

```markdown
# Project Structure

## Tech Stack
- Framework: Next.js 14 (App Router)
- UI: shadcn/ui + Tailwind CSS
- State: Zustand
- API: tRPC / React Query

## Folder Structure
src/
├── app/              # Next.js pages (App Router)
├── components/
│   ├── ui/           # Base components (Button, Input, Modal...)
│   ├── features/     # Feature-specific components
│   └── layouts/      # Layout components
├── hooks/            # Custom hooks
├── stores/           # Zustand stores
├── services/         # API calls
├── types/            # TypeScript types
└── utils/            # Pure utility functions

## Component Inventory (tránh tạo trùng!)
| Component | Path | Props |
|-----------|------|-------|
| Button    | components/ui/Button.tsx | variant, size, onClick |
| DataTable | components/ui/DataTable.tsx | columns, data, pagination |
| Modal     | components/ui/Modal.tsx | isOpen, onClose, title |
```

### 2. `conventions.md` — Naming Rules

```markdown
# Naming Conventions

## Files
- Components: PascalCase → `UserProfile.tsx`
- Hooks: camelCase + use prefix → `useUserData.ts`
- Utils: camelCase → `formatDate.ts`
- Types: PascalCase → `UserProfile.ts` (trong /types)
- Constants: SCREAMING_SNAKE → `MAX_RETRY_COUNT`

## Code
- Variables: camelCase → `userName`
- Functions: camelCase, verb prefix → `getUserById()`
- Boolean: is/has/should prefix → `isLoading`, `hasError`
- Event handlers: handle prefix → `handleSubmit()`
- CSS classes: BEM nếu dùng CSS modules

## Components
- Luôn có default export
- Props interface đặt trên component: `interface Props {}`
- Không dùng React.FC (prefer function declaration)
```

### 3. `skill-null-safety.md` — Tránh Crash

```markdown
# Null Safety Rules

## ALWAYS do:
- Optional chaining: `user?.profile?.avatar`
- Nullish coalescing: `name ?? 'Anonymous'`
- Array check trước khi .map(): `items?.map() ?? []`
- Kiểm tra empty state trước render
- Validate API response với Zod/TypeScript

## NEVER do:
- Truy cập property trực tiếp mà không check: `user.name` (❌)
- Dùng `!` non-null assertion: `user!.name` (❌ trừ khi chắc 100%)
- Assume array luôn có element: `items[0].id` (❌)

## Pattern chuẩn:
// ✅ Safe render pattern
function UserCard({ user }: { user?: User }) {
  if (!user) return <Skeleton />
  
  return (
    <div>
      <h2>{user.name ?? 'Unknown'}</h2>
      <p>{user.email}</p>
    </div>
  )
}
```

### 4. `skill-error-handling.md`

```markdown
# Error Handling Patterns

## API Calls
- Luôn dùng try/catch với async/await
- Log error chi tiết ở service layer
- Show user-friendly message ở UI layer
- Phân biệt: Network Error vs Business Error

## React Error Boundaries
- Wrap mỗi major section với ErrorBoundary
- Có fallback UI, không để màn trắng

## Pattern:
// Service layer - log chi tiết
async function fetchUser(id: string) {
  try {
    const res = await api.get(`/users/${id}`)
    return { data: res.data, error: null }
  } catch (err) {
    logger.error('fetchUser failed', { id, err })
    return { data: null, error: 'Không tải được thông tin user' }
  }
}

// UI layer - show friendly message
const { data, error } = await fetchUser(userId)
if (error) return <ErrorAlert message={error} />
```

---

## 🌍 Tham khảo từ cộng đồng thế giới

### 📚 Blogs & Documentation chuẩn

| Resource | Link | Nội dung |
|----------|------|----------|
| **Cursor Rules** (community) | [cursor.directory](https://cursor.directory) | Thousands of curated `.cursorrules` (= skill của Cursor AI) |
| **Awesome CursorRules** | [github.com/PatrickJS/awesome-cursorrules](https://github.com/PatrickJS/awesome-cursorrules) | Tổng hợp rules theo framework |
| **Claude.md patterns** | [github.com/anthropics/anthropic-cookbook](https://github.com/anthropics/anthropic-cookbook) | Anthropic's cookbook cho AI context |
| **GitHub Copilot Instructions** | [docs.github.com/copilot/customizing-copilot](https://docs.github.com/en/copilot/customizing-copilot/adding-repository-custom-instructions-for-github-copilot) | `.github/copilot-instructions.md` standard |
| **Aider conventions** | [aider.chat/docs/usage/conventions.html](https://aider.chat/docs/usage/conventions.html) | `CONVENTIONS.md` pattern |

### 🏷️ Tên file chuẩn theo thế giới

| Tool | File chuẩn | Tương đương AWF skill |
|------|-----------|----------------------|
| GitHub Copilot | `.github/copilot-instructions.md` | conventions.md |
| Cursor AI | `.cursorrules` hoặc `.cursor/rules/*.mdc` | skill-*.md |
| Aider | `CONVENTIONS.md` | conventions.md + patterns.md |
| Claude/Anthropic | `CLAUDE.md` | brain.json + skills |
| Windsurf | `.windsurfrules` | skill-*.md |
| Continue.dev | `.continueignore` + `config.json` | context files |

> **💡 Insight:** Hầu hết tools đều converge về pattern: **1 file global context** + **nhiều file rules theo domain**. AWF đang đi đúng hướng này.

### 🔗 Repos tham khảo thực tế

```
# Cursor Rules hay nhất theo tech:
- Next.js + TypeScript: https://cursor.directory/nextjs-typescript
- React Native: https://cursor.directory/react-native
- Clean Code rules: https://cursor.directory/clean-code

# Awesome lists:
- https://github.com/PatrickJS/awesome-cursorrules
- https://github.com/Bhartendu-Kumar/rules_template (template có cấu trúc)

# Nghiên cứu cách Vercel team dùng AI:
- https://vercel.com/blog/ai-sdk-3-4

# Google's AI-assisted coding guide:
- https://ai.google.dev/gemini-api/docs/code-guide
```

---

## ✅ Priority: Tạo file theo thứ tự này

```
Week 1 (Critical):
[ ] structure.md      → Không bao giờ hỏi "file này ở đâu?"
[ ] conventions.md    → Code nhất quán 100%
[ ] tech-stack.md     → Đúng version, đúng import

Week 2 (Quality):
[ ] skill-null-safety.md   → Không crash production
[ ] skill-error-handling.md → UX không bị broken
[ ] anti-patterns.md       → Tránh lặp lỗi cũ

Week 3 (Workflow):
[ ] api-contracts.md       → Không cần hỏi BE
[ ] state-management.md    → Hiểu data flow
[ ] review-checklist.md    → PR quality gate
```

---

> **🎯 Bottom line:** Đầu tư 1 tuần viết các file này → tiết kiệm **hàng giờ prompt lặp lại** và AI sẽ hiểu project như người trong team. Cursor.directory là nơi tốt nhất để tham khảo cách người khác viết rules cho từng tech stack cụ thể.
