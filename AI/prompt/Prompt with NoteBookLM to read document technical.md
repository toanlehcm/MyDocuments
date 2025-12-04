# https://redux.js.org/tutorials/essentials/part-3-data-flow

# cho t các câu prompt để dùng NotebookLM như công cụ hỗ trợ học tập, ghi nhớ, hiểu nội dung của link trên.

# Mục tiêu: hiểu rõ cốt lõi, workflow chạy bên dưới, có thể áp dụng ngay vào project, có khả năng debug, develop, maintain, clean code.

Dưới đây là một số **câu prompt** mà bạn có thể copy → paste vào NotebookLM để **học / hiểu / ghi nhớ** nội dung của trang Redux Toolkit — phần _Part 3: Basic Redux Data Flow_ (với mục tiêu: hiểu rõ cốt lõi, workflow chạy dưới hood, sẵn sàng áp dụng project, debug, maintain, clean-code).

Bạn có thể dùng mỗi prompt như một “task” nhỏ. Sau khi NotebookLM trả lời, bạn nên **so sánh với doc gốc** để kiểm tra độ chính xác → giúp “memorize + hiểu sâu”.

---

## 🔎 Bộ prompt gợi ý

```
1. “Explain in simple words the Redux data flow as described in Redux Essentials Part 3 — what happens when a component dispatches an action to the store, step by step, until the UI updates.”

2. “List the minimal setup steps to integrate Redux Toolkit into a React app — include store setup, Provider, slice creation, useSelector/useDispatch hooks.”

3. “Given a slice created by createSlice (with some initialState and reducers), describe what happens internally when I call dispatch(someSlice.actions.someAction(payload)).”

4. “Why is it recommended to keep only global data in Redux store, and keep temporary / UI-local state in React component state? What problems arise if you misuse Redux for UI state?”

5. “Write out a minimal example (in TypeScript) of: store.ts, hooks.ts, a slice file (e.g. postsSlice.ts), a React component that reads from store via useSelector and dispatches action via useAppDispatch.”

6. “What are common mistakes or anti-patterns when using Redux data flow, and how does Redux Toolkit (with createSlice + Immer) help avoid them?”

7. “Explain how Redux DevTools help debugging Redux flow — what information you expect to see (action history, state diff, state tree), and how that corresponds to the code (reducers, actions, store).”

8. “If I have multiple slices (e.g. authSlice, postsSlice, cartSlice), describe how store state tree will look like; show how to type RootState and use useSelector to get a nested piece.”

9. “In React + Redux + RTK, when should I create a slice vs when should I create a separate normal React state (useState/useReducer) — what’s the decision guideline?”

10. “Summarize redux-toolkit + react-redux + basic data flow in 5 bullet points — enough to onboard a junior dev quickly.”
```

---

## 🎯 Cách dùng tối ưu:

- Với mỗi prompt, yêu cầu NotebookLM: **“explain like I’m 5 (ELI5)”** → nếu bạn muốn hiểu thật đơn giản.
- Hoặc: **“explain as a senior dev would write doc”** → nếu bạn cần reference để share với team.
- Sau khi NotebookLM trả lời — **so sánh** với doc gốc để xem có sai lệch/thiếu sót gì không.
- Nếu có phần chưa hiểu → sửa prompt: “Explain again but with code example,” hoặc “What happens if I forget to wrap Provider around App?”

---

Nếu bạn muốn — mình có thể giúp bạn **viết sẵn 15–20 prompt** hoàn chỉnh + **template note** (tiêu đề + checklist + chỗ để fill) — copy paste vào NotebookLM rất tiện để học và nhớ lâu. Muốn mình làm file đó luôn cho bạn?
