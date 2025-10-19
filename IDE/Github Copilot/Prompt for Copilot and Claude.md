Tuyệt vời 😎 — bạn đang đi đúng hướng của **một Senior Frontend Engineer hiện đại**, tận dụng *Copilot Pro Plus + Claude Sonnet 4.1* như **AI pair engineer cấp cao**.
Mình sẽ giúp bạn có **50 prompt “đẳng cấp senior”** tập trung 3 mục tiêu:

> 🧩 **Debug chính xác** → 🧠 **Fix tối ưu** → ⚙️ **Refactor bền vững & có khả năng mở rộng.**

---

# ⚡️50 PROMPT MẠNH NHẤT DÀNH CHO SENIOR FRONTEND DEV

*(Tối ưu cho Copilot Pro Plus + Claude Sonnet 4.1)*

## 🧭 I. HIỂU CẤU TRÚC & LOGIC TOÀN DỰ ÁN

1. `@workspace Explain the entire project architecture. Describe folder purposes, core logic flow, and dependencies between modules.`
2. `@workspace Map the data flow in this project — from API request → state management → UI rendering.`
3. `@workspace Identify the most critical files that affect rendering performance.`
4. `@workspace Find duplicated logic or components across the project that could be refactored into reusable utilities.`
5. `@workspace Analyze the dependency tree and list potential circular imports.`
6. `@workspace Summarize how form validation works across this app (RHF + Zod).`
7. `@workspace Review our custom hooks and identify which ones can be generalized or simplified.`
8. `@workspace Detect architectural smells violating Atomic Design principles.`
9. `@workspace List components that don’t follow AlignUI conventions.`
10. `@workspace Summarize common API calling patterns and suggest a unified abstraction layer.`

---

## 🪲 II. DEBUGGING (ERROR IDENTIFICATION & ROOT CAUSE ANALYSIS)

11. `@workspace Find all places where state updates might cause infinite re-renders.`
12. `@workspace Detect potential memory leaks in React components (unsubscribed listeners, timers, effects).`
13. `@workspace Explain why this component re-renders multiple times — identify which props or states are triggering it.`
14. `@workspace Analyze this error log and explain the real root cause, not just the surface issue.`
15. `Explain how this “Cannot read properties of undefined” error happens and propose robust null-safe code.`
16. `@terminal Explain this stack trace step-by-step and pinpoint the failing logic.`
17. `Find incorrect usage of React Query hooks (wrong query keys, missing dependencies, or misuse of stale data).`
18. `Locate any form validation bugs where Zod schema and RHF defaultValues mismatch.`
19. `Identify broken async flows (unawaited promises, race conditions, or missing error handling).`
20. `Review axios interceptors and find potential token refresh or 401 loop bugs.`

---

## 🔧 III. FIX BUG – CLEAN, SAFE, AND MAINTAINABLE

21. `Fix this bug with a minimal change while keeping the existing architecture and typing consistent.`
22. `Propose a bug fix that improves readability and testability, not just a patch.`
23. `Fix this issue but ensure the solution is reusable for similar cases.`
24. `Apply defensive coding to prevent this error in the future.`
25. `Fix this problem using proper AlignUI and React best practices.`
26. `Ensure the fix adheres to Atomic Design and doesn’t break existing layers.`
27. `Fix this function with performance in mind — avoid redundant computations or re-renders.`
28. `Resolve this RHF + Zod form validation issue ensuring consistent error messages.`
29. `Fix this data fetching logic so React Query cache remains valid and avoids unnecessary refetches.`
30. `Fix this bug but ensure backward compatibility with existing components.`

---

## ⚙️ IV. REFACTOR – CLEAN CODE, PERFORMANCE, REUSE, MAINTAINABILITY

31. `Refactor this component to follow SOLID principles and Atomic Design conventions.`
32. `Refactor to separate UI concerns (AlignUI + Tailwind) from business logic (hooks, query).`
33. `Refactor to remove prop drilling using Context or custom hooks cleanly.`
34. `Refactor repetitive fetch logic into a unified React Query + Axios service pattern.`
35. `Simplify complex conditional rendering with clear logic blocks or extracted functions.`
36. `Refactor this function to reduce cognitive complexity while keeping functionality intact.`
37. `Extract reusable UI molecules from this file that can be shared across the app.`
38. `Refactor to use composition over inheritance — make code more modular and testable.`
39. `Replace useEffect side-effects with proper custom hooks to make components pure.`
40. `Refactor Tailwind classes for consistency, readability, and reuse through shared style utilities.`

---

## 🚀 V. PERFORMANCE OPTIMIZATION

41. `Identify re-render bottlenecks in this component and propose useMemo/useCallback optimizations.`
42. `Detect expensive operations in render and suggest memoization or virtualization.`
43. `Profile data-fetching performance and suggest caching or pagination improvements.`
44. `Optimize bundle size by identifying unused imports or large dependencies.`
45. `Detect blocking synchronous operations and suggest async alternatives.`
46. `Propose lazy loading or code-splitting strategies for large pages.`
47. `Review animation logic (Framer Motion or AlignUI) for potential performance overhead.`
48. `Optimize React Query configuration (staleTime, cacheTime, retry) for user experience.`
49. `Detect layout shifts or hydration mismatches in Next.js pages and suggest fixes.`
50. `Propose end-to-end optimizations from API to rendering for faster first paint and interactivity.`

---

# 🧠 CÁCH DÙNG ĐỂ PHÁT HUY SỨC MẠNH CỦA COPILOT PRO + CLAUDE SONNET 4.1

| Tình huống                     | Cách dùng                                                                                                |
| ------------------------------ | -------------------------------------------------------------------------------------------------------- |
| 🔍 Kiểm tra toàn dự án         | `@workspace` → “Analyze project-wide issue regarding...”                                                 |
| 🧩 Debug chi tiết file         | Chọn vùng code → `Ctrl + I` → “Explain and fix root cause cleanly.”                                      |
| ⚙️ Fix nhanh trong terminal    | `@terminal` → “Explain and fix build/test error with minimal impact.”                                    |
| 🧠 Claude hỗ trợ phân tích sâu | Dán file lỗi → “Explain this bug as a senior frontend engineer, then propose a stable and scalable fix.” |
| 🔄 Kết hợp Copilot + Claude    | Copilot để **đọc code và viết fix**, Claude để **phân tích kiến trúc và logic cấp cao**.                 |

---

# 🧭 BONUS — Chiến Lược Dùng Claude Sonnet 4.1 Hiệu Quả

**Prompt Template 1: “Senior Debug Analyzer”**

```text
You are a senior frontend engineer with 10+ years of experience.
Analyze the following code from a React + Next.js + AlignUI + Atomic Design project.
1. Identify all bugs and architectural issues.
2. Explain why they happen in simple but technical terms.
3. Propose fixes that are clean, reusable, and performance-safe.
4. Ensure compatibility with RHF + Zod + React Query setup.
```

**Prompt Template 2: “Smart Refactorer”**

```text
Refactor the following component:
- Follow Atomic Design structure (Atom → Molecule → Organism).
- Keep the AlignUI styling and Tailwind conventions.
- Ensure the logic remains pure and testable.
- Optimize for performance and readability.
- Explain what changed and why.
```

**Prompt Template 3: “System-Wide Optimizer”**

```text
You have access to the entire workspace structure.
Identify performance issues across the project related to rendering, network, or architecture.
Suggest practical, senior-level fixes that improve maintainability and scalability.
```

---

# ✅ KẾT LUẬN

Với **Copilot Pro Plus + Claude Sonnet 4.1**, combo chiến lược mạnh nhất là:

1. **Dùng Copilot Inline + Workspace Mode** để **đọc & gợi ý fix tự động.**
2. **Dùng Claude** để **phân tích logic, phát hiện bug gốc, đề xuất refactor chuẩn clean code.**
3. **Lưu prompt mẫu vào thư mục** `/prompts/debug.prompt.md` để tái sử dụng.

---

Nếu bạn muốn, mình có thể giúp tạo:

* 📂 **Bộ thư mục `prompts/` cho team FE**, gồm `debug.prompt.md`, `refactor.prompt.md`, `review.prompt.md`, `optimize.prompt.md`.
* 📘 **Cheat Sheet Copilot + Claude dành riêng cho bug fix & code review**, format sẵn để dán vào VS Code sidebar.

👉 Bạn muốn mình làm **bộ thư mục `prompts/`** hay **cheat sheet tổng hợp** trước?
