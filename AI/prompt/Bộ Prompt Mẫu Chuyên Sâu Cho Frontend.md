Tuyệt vời 👏 — bạn đang có một **stack frontend hiện đại và chuẩn enterprise**:
ReactJS + NextJS + Tailwind + AlignUI + Atomic Design + RHF + Zod + Axios + React Query.

Mình sẽ giúp bạn xây dựng **bộ prompt mẫu chuyên sâu** cho GitHub Copilot Pro Plus, được chia theo **5 nhóm thực chiến**:

> 👉 *Component Development – Form Handling – API Integration – State Management – Code Quality / Review.*

---

# 🧠 Bộ Prompt Mẫu Chuyên Sâu Cho Frontend (React + Next + Tailwind + AlignUI)

## ⚙️ I. Component Development (AlignUI + Atomic Design + Tailwind)

### 🧩 1. Component Cơ Bản (Atoms)

```text
@workspace
Create an AlignUI Button component following Atomic Design (Atom level).  
- Accept props: `variant`, `size`, `disabled`, `loading`.  
- Use Tailwind for styling.  
- Follow AlignUI design conventions from `/components/ui/`.  
- Include ARIA attributes and clean code comments.
```

### 🧱 2. Component Tổ Hợp (Molecules)

```text
@workspace
Build an InputField molecule using AlignUI + RHF integration.  
- Props: `label`, `name`, `placeholder`, `required`, `subLabel`.  
- Use Zod schema validation integrated with RHF.  
- Show error messages using AlignUI's form feedback style.  
- Follow Atomic Design principles.
```

### 🧮 3. Component Phức Tạp (Organisms)

```text
@workspace
Implement a ModalForm organism using AlignUI Modal.  
- Contains multiple InputField molecules (name, email, status).  
- Connect with RHF form control + Zod schema validation.  
- Add `onSubmit` handler that triggers Axios POST.  
- Follow clean code and AlignUI visual hierarchy.
```

---

## 📋 II. Form Handling (RHF + Zod)

### 🧾 1. Tạo Form Chuẩn Zod

```text
Generate a TypeScript Zod schema for a user registration form  
with fields: name, email, password, confirmPassword, role.  
Ensure email format validation, password min 8 chars, and confirmPassword matches password.
```

### ⚙️ 2. Kết Nối RHF + AlignUI

```text
Integrate RHF with AlignUI form components using Controller.  
Make sure to show validation error below each field using AlignUI’s error message style.  
Use Tailwind for spacing and alignment.
```

### 🧠 3. Form Reusability

```text
Refactor this form into a reusable FormContainer component that:  
- Accepts `schema`, `defaultValues`, and `onSubmit`.  
- Handles RHF setup internally.  
- Supports children as render props.
```

---

## 🌐 III. API Integration (Axios + React Query)

### 🔌 1. API Setup

```text
Create an Axios instance with baseURL from environment variables.  
Add request and response interceptors for token handling and error logging.  
Export reusable methods: get, post, put, delete.
```

### 🔄 2. React Query Hook

```text
Generate a React Query hook `useFetchMeters` that:  
- Fetches meter list from `/api/meters`.  
- Uses Axios instance.  
- Supports query key caching and error retries.  
- Returns data, isLoading, isError.
```

### 🧠 3. Mutation Hook

```text
Create a React Query mutation hook `useUpdateMeterStatus`.  
- Calls PUT `/api/meters/:id` with new status.  
- Shows success/error toast using AlignUI Notification.  
- Invalidate meter list query on success.
```

---

## 🧰 IV. State Management & Workflow (Atomic + Query + Context)

### ⚙️ 1. Context Tích Hợp Query

```text
Build a MeterProvider context using React Context API.  
- Manage selected meters, current command, and API loading states.  
- Use React Query inside context to fetch and mutate meters.  
- Expose context via custom hook `useMeterContext()`.
```

### 🧩 2. Local State + Server Sync

```text
Refactor this component to separate local UI state (modal open/close, form step)  
from server state (data from query).  
Use RHF for form and React Query for data fetching.  
Ensure clear naming: `localState` vs `serverState`.
```

---

## 🔍 V. Code Review, Clean Code & Optimization

### 🧹 1. Clean Code Refactor

```text
Refactor this component for readability and reusability.  
- Reduce nested logic.  
- Extract subcomponents.  
- Remove inline functions in JSX.  
- Add TypeScript types for all props and states.  
Follow Atomic Design and AlignUI conventions.
```

### 💬 2. Review Code Chất Lượng

```text
@workspace
Review this file for clean code and architecture consistency.  
- Check Atomic Design layer (atom/molecule/organism).  
- Validate Tailwind class naming clarity.  
- Ensure RHF + Zod integration is correct.  
- Suggest improvements if any.
```

### 🚀 3. Hiệu Năng

```text
Analyze performance bottlenecks in this React component.  
- Identify unnecessary re-renders or heavy computations.  
- Suggest memoization or useCallback/useMemo usage.  
- Optimize rendering for large data lists.
```

---

## 🧭 Gợi Ý Kết Hợp Copilot

| Tình huống           | Cú pháp hiệu quả                                                                          |
| -------------------- | ----------------------------------------------------------------------------------------- |
| Hỏi nhanh trong file | `Ctrl + I` → “Explain this code and suggest improvements.”                                |
| Gợi ý toàn dự án     | `@workspace` → “Find components using similar form logic and refactor into shared hooks.” |
| Giải thích lỗi build | `@terminal` → “Explain this build error and suggest fix.”                                 |
| Sinh tài liệu        | “Generate concise JSDoc and prop description for this component.”                         |

---

## ⚡ Bonus: Prompt Generator Cho Team

Nếu bạn muốn Copilot học đúng phong cách team, hãy tạo file:

```
/prompts/frontend.prompt.md
```

và thêm:

```md
You are an expert frontend engineer.  
Follow these conventions:
- Framework: React 18 + Next.js
- UI: AlignUI + Tailwind
- Architecture: Atomic Design
- Form: RHF + Zod
- Data: Axios + React Query
- Use functional components and TypeScript
- Write clean, reusable, and documented code
```

👉 Sau đó, trong prompt, bạn chỉ cần viết:

> “@workspace Follow our team prompt in `/prompts/frontend.prompt.md` and implement a reusable table component.”

---

Mình có thể giúp bạn tiếp theo bằng cách:

1. 🗂 **Tạo thư mục `prompts/` chuẩn cho team**, với file `.prompt.md` cho từng use case (component, form, API, review).
2. 🧭 **Tạo “Copilot Cheat Sheet”** – tóm tắt 30 prompt mạnh nhất để bạn dán trong VS Code sidebar.

👉 Bạn muốn mình làm **bộ thư mục `prompts/` mẫu cho team** hay **cheat sheet Copilot frontend** trước?
