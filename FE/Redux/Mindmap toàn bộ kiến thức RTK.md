# 📘 Checklist 10 ngày hoàn thành Redux Toolkit Essentials
# 🧩 Mindmap toàn bộ kiến thức RTK

Dưới đây là **📘 Checklist 10 ngày Redux Toolkit Essentials** + **🧩 Mindmap toàn bộ kiến thức RTK** mà bạn có thể dùng để học mỗi ngày, rất phù hợp cho người muốn đi nhanh – đúng trọng tâm – không lan man.

---

# 📘 **CHECKLIST 10 NGÀY REDUX TOOLKIT ESSENTIALS**

## **🗓 Ngày 1 — Khái niệm nền tảng**

✔ Hiểu state management là gì
✔ Tại sao cần Redux
✔ Redux dùng để giải quyết vấn đề nào
✔ Hiểu 3 nguyên tắc của Redux
✔ Flow: UI → dispatch → reducer → state mới → UI

**Bài tập:** Giải thích flow Redux trong 5 câu.

---

## **🗓 Ngày 2 — Redux Toolkit Overview**

✔ RTK là gì
✔ Tại sao RTK là tiêu chuẩn của Redux hiện đại
✔ createSlice, configureStore, Immer
✔ So sánh Redux cũ vs Redux Toolkit

**Bài tập:** Viết lại counter reducer bằng RTK và bằng Redux cũ để thấy sự khác biệt.

---

## **🗓 Ngày 3 — Store & Slice**

✔ Tạo store với `configureStore()`
✔ Tạo slice với `createSlice()`
✔ Reducers
✔ Actions auto-generated
✔ Mutating state an toàn

**Bài tập:** Tạo 2 slice: `counter`, `theme`.

---

## **🗓 Ngày 4 — useSelector & useDispatch**

✔ Kết nối React với Redux
✔ useSelector đọc state
✔ useDispatch gửi action
✔ Tạo hook `useAppDispatch`, `useAppSelector`

**Bài tập:** Counter app hoàn chỉnh.

---

## **🗓 Ngày 5 — Redux DevTools**

✔ Tìm hiểu “state diff”
✔ Action trace
✔ Time travel debugging
✔ Hiểu mỗi action đang làm gì

**Bài tập:** Chụp action log của một flow UI → API → update state.

---

## **🗓 Ngày 6 — Async với createAsyncThunk**

✔ createAsyncThunk dùng làm gì
✔ pending / fulfilled / rejected
✔ Loading state
✔ Error handling
✔ Extra reducers

**Bài tập:** Fetch users từ JSONPlaceholder.

---

## **🗓 Ngày 7 — Extra Reducers Nâng Cao**

✔ Tách reducer logic khỏi UI
✔ Xử lý nhiều async actions trong một slice
✔ Xử lý nested request
✔ Standard.apiStatus pattern

**Bài tập:** CRUD Users (create – update – delete).

---

## **🗓 Ngày 8 — RTK Query Overview**

✔ RTK Query khác gì createAsyncThunk
✔ Tự động caching
✔ Tự động refetch
✔ Tự động cleanup
✔ Dễ dùng hơn React Query nếu dùng Redux

**Bài tập:** Set up base query + query đầu tiên.

---

## **🗓 Ngày 9 — RTK Query Query + Mutation**

✔ endpoints.query
✔ endpoints.mutation
✔ invalidateTags
✔ update cache
✔ optimistic updates
✔ polling + streaming (optional)

**Bài tập:** Products API (list + detail + update).

---

## **🗓 Ngày 10 — Best Practices & Architecture**

✔ Folder structure chuẩn
✔ Feature-based architecture
✔ Khi nào dùng slice, khi nào dùng RTK Query
✔ Normalizing state (createEntityAdapter)
✔ Tránh anti-pattern
✔ Hiệu năng (selector tùy chỉnh)

**Bài tập:** Build 1 mini-project hoàn chỉnh: Auth + Products + Cart.

---

# 🧩 **MINDMAP TOÀN BỘ KIẾN THỨC REDUX TOOLKIT (BẢN FULL)**

Dạng text để bạn copy vào Whimsical, Miro hoặc XMind:

```
Redux Toolkit
│
├── Core Concepts
│   ├── Store
│   ├── Reducer
│   ├── Actions
│   ├── Dispatch
│   ├── Selector
│   └── Immutable State
│
├── Redux Toolkit Core APIs
│   ├── configureStore()
│   │   ├── reducer
│   │   ├── middleware
│   │   ├── devTools
│   │   └── preloadedState
│   │
│   ├── createSlice()
│   │   ├── name
│   │   ├── initialState
│   │   ├── reducers
│   │   ├── extraReducers
│   │   └── actions generated
│   │
│   ├── createAsyncThunk()
│   │   ├── pending
│   │   ├── fulfilled
│   │   └── rejected
│   │
│   ├── createEntityAdapter()
│   │   ├── ids
│   │   ├── entities
│   │   └── selectors
│   │
│   └── combineSlices() (RTK 2.0+)
│
├── React Integration
│   ├── Provider
│   ├── useSelector()
│   ├── useDispatch()
│   ├── useAppSelector()
│   ├── useAppDispatch()
│   └── Typed Hooks (TS)
│
├── RTK Query
│   ├── createApi()
│   │   ├── baseQuery
│   │   ├── endpoints
│   │   └── reducerPath
│   │
│   ├── Query Endpoints
│   │   ├── fetching
│   │   ├── caching
│   │   ├── polling
│   │   └── refetchOnMount
│   │
│   ├── Mutation Endpoints
│   │   ├── POST/PUT/PATCH/DELETE
│   │   ├── invalidateTags
│   │   ├── optimistic update
│   │   └── updateQueryData
│   │
│   ├── Auto-generated hooks
│   └── Error handling
│
├── Architecture
│   ├── Feature-based structure
│   ├── Slice organization
│   ├── Reusable hooks
│   ├── Normalized state
│   └── Loadable / Entity patterns
│
└── Best Practices
    ├── Keep state minimal
    ├── Derive data via selectors
    ├── Avoid storing UI state in Redux
    ├── Avoid nested state
    ├── Prefer RTK Query over async thunk
    ├── Avoid unnecessary re-renders
    └── Co-locate slice with features
```

---

# Bạn muốn mình tặng thêm:

📘 “Template Redux Toolkit chuẩn Enterprise” (folder + file mẫu)?
🎯 Bộ bài tập 30 days Redux?
🧪 Bộ test Jest + RTK Query?

Chỉ cần nói *“Cho mình template”* hoặc *“Cho mình bài tập”*!
