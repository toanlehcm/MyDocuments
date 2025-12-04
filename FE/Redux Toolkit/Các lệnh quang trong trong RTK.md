- configureStore(): wraps createStore to provide simplified configuration options and good defaults. It can automatically combine your slice reducers, adds whatever Redux middleware you supply, includes redux-thunk by default, and enables use of the Redux DevTools Extension.
- createReducer(): that lets you supply a lookup table of action types to case reducer functions, rather than writing switch statements. In addition, it automatically uses the immer library to let you write simpler immutable updates with normal mutative code, like state.todos[3].completed = true.
- createAction(): generates an action creator function for the given action type string.
- createSlice(): accepts an object of reducer functions, a slice name, and an initial state value, and automatically generates a slice reducer with corresponding action creators and action types.
- combineSlices(): combines multiple slices into a single reducer, and allows "lazy loading" of slices after initialisation.
- createAsyncThunk: accepts an action type string and a function that returns a promise, and generates a thunk that dispatches pending/fulfilled/rejected action types based on that promise
- createEntityAdapter: generates a set of reusable reducers and selectors to manage normalized data in the store
The createSelector utility from the Reselect library, re-exported for ease of use.

# Giải thích tiếng Việt dễ hiểu các thuộc tính trên. cho ví dụ thực tế của từng thuộc tính.

Chào bạn, dưới đây là giải thích chi tiết và dễ hiểu bằng tiếng Việt cho các hàm (API) cốt lõi của **Redux Toolkit (RTK)**, kèm theo ví dụ thực tế.

Redux Toolkit được sinh ra để giải quyết vấn đề "code quá dài dòng" của Redux thuần, giúp bạn viết code ngắn hơn, dễ đọc hơn và ít lỗi hơn.

-----

### 1\. `configureStore()`

**Giải thích:**
Đây là phiên bản nâng cấp của `createStore` trong Redux cũ. Nó giúp bạn tạo **Store** (nơi lưu trữ dữ liệu toàn cục) cực kỳ nhanh chóng.

  * **Tự động:** Gộp các reducers lại với nhau.
  * **Có sẵn:** Tích hợp sẵn `redux-thunk` (để gọi API) và Redux DevTools (để debug trên trình duyệt) mà không cần cài đặt thêm.

**Ví dụ:**
Tạo một store chứa dữ liệu người dùng (`user`) và bài viết (`posts`).

```javascript
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import postsReducer from './postsSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    posts: postsReducer,
  },
});

export default store;
```

-----

### 2\. `createReducer()`

**Giải thích:**
Hàm này dùng để tạo Reducer (nơi xử lý logic thay đổi dữ liệu).

  * **Không cần `switch/case`:** Dùng bảng tra cứu (lookup table) gọn gàng hơn.
  * **Viết code kiểu "đột biến" (mutable):** Bình thường trong Redux, bạn phải copy state cũ rồi mới sửa (`...state`). Nhưng với hàm này (nhờ thư viện **Immer** tích hợp sẵn), bạn cứ viết như đang sửa trực tiếp vào state (ví dụ `state.value = 1`), nó sẽ tự động xử lý việc copy dữ liệu an toàn cho bạn.

**Ví dụ:**
Một reducer đếm số, cho phép cộng trực tiếp vào state.

```javascript
import { createReducer } from '@reduxjs/toolkit';
import { increment, decrement } from './actions';

const counterReducer = createReducer({ value: 0 }, (builder) => {
  builder
    .addCase(increment, (state, action) => {
      // Viết như này là SAI trong Redux cũ, nhưng ĐÚNG và AN TOÀN ở đây
      state.value++; 
    })
    .addCase(decrement, (state, action) => {
      state.value--;
    });
});
```

-----

### 3\. `createAction()`

**Giải thích:**
Đơn giản là tạo ra một hàm bắn tín hiệu (action creator). Thay vì phải viết thủ công một object `{ type: 'INCREMENT', payload: ... }`, hàm này tự sinh ra cho bạn.

**Ví dụ:**

```javascript
import { createAction } from '@reduxjs/toolkit';

// Tạo action
const increment = createAction('counter/increment');

// Khi sử dụng:
increment(5); // Kết quả trả về: { type: 'counter/increment', payload: 5 }
```

-----

### 4\. `createSlice()` (Quan trọng nhất)

**Giải thích:**
Đây là hàm "All-in-one" (tất cả trong một) và được dùng nhiều nhất. Nó gộp cả `createAction` và `createReducer` lại.
Bạn chỉ cần khai báo tên, giá trị khởi tạo và các hàm xử lý. Nó sẽ **tự động** sinh ra actions và reducer tương ứng.

**Ví dụ:**
Quản lý danh sách việc cần làm (Todos).

```javascript
import { createSlice } from '@reduxjs/toolkit';

const todoSlice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {
    addTodo: (state, action) => {
      // Chỉ cần push trực tiếp vào mảng
      state.push({ id: Date.now(), text: action.payload, completed: false });
    },
    toggleTodo: (state, action) => {
      const todo = state.find(t => t.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    }
  }
});

// Tự động có actions để dùng ở Component
export const { addTodo, toggleTodo } = todoSlice.actions;
// Tự động có reducer để ném vào Store
export default todoSlice.reducer;
```

-----

### 5\. `combineSlices()`

**Giải thích:**
Dùng để gộp nhiều slice lại thành một reducer lớn. Tính năng đặc biệt của nó là **"Lazy loading"** (tải chậm). Nghĩa là bạn có thể tiêm (inject) thêm slice vào store sau khi ứng dụng đã chạy, giúp ứng dụng khởi động nhanh hơn vì không phải tải tất cả reducer ngay từ đầu.

**Ví dụ:**

```javascript
import { combineSlices } from '@reduxjs/toolkit';
import { userSlice } from './userSlice';

// Khởi tạo rootReducer với userSlice
const rootReducer = combineSlices(userSlice);

// ... Sau này khi người dùng vào trang Admin, mới nạp thêm adminSlice
// rootReducer.inject(adminSlice);
```

-----

### 6\. `createAsyncThunk`

**Giải thích:**
Chuyên dùng để xử lý **gọi API** (bất đồng bộ).
Nó nhận vào một hàm trả về Promise (như `fetch` hoặc `axios`). Nó sẽ tự động sinh ra 3 trạng thái action để bạn xử lý trong reducer:

1.  `pending`: Đang tải.
2.  `fulfilled`: Tải thành công.
3.  `rejected`: Tải thất bại.

**Ví dụ:**
Lấy thông tin người dùng từ Server.

```javascript
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// 1. Tạo thunk gọi API
export const fetchUser = createAsyncThunk('user/fetchById', async (userId) => {
  const response = await fetch(`https://api.example.com/users/${userId}`);
  return response.json();
});

// 2. Xử lý 3 trạng thái trong Slice
const userSlice = createSlice({
  name: 'user',
  initialState: { entity: {}, loading: 'idle' },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = 'loading';
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.entity = action.payload; // Dữ liệu từ API
      });
  },
});
```

-----

### 7\. `createEntityAdapter`

**Giải thích:**
Dùng để quản lý dữ liệu dạng **danh sách** (như list users, list products) một cách chuẩn hóa (normalized).
Thay vì lưu mảng `[{id: 1, ...}, {id: 2, ...}]`, nó lưu dạng object `{ ids: [1, 2], entities: { 1: {...}, 2: {...} } }`.

  * **Lợi ích:** Tìm kiếm, thêm, sửa, xóa cực nhanh theo ID mà không cần duyệt mảng.
  * Nó cung cấp sẵn các hàm như `addOne`, `removeOne`, `upsertMany`...

**Ví dụ:**

```javascript
import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

const usersAdapter = createEntityAdapter();

const usersSlice = createSlice({
  name: 'users',
  initialState: usersAdapter.getInitialState(), // { ids: [], entities: {} }
  reducers: {
    userAdded: usersAdapter.addOne, // Tự động thêm user vào state
    userUpdated: usersAdapter.updateOne, // Tự động update user
  },
});
```

-----

### 8\. `createSelector` (từ thư viện Reselect)

**Giải thích:**
Dùng để lấy dữ liệu từ Store nhưng có tính năng **Ghi nhớ (Memoization)**.
Nếu dữ liệu đầu vào không thay đổi, nó sẽ trả về kết quả đã tính toán trước đó ngay lập tức mà không tính toán lại. Giúp tăng hiệu năng cho ứng dụng, đặc biệt khi phải lọc hoặc tính toán danh sách lớn.

**Ví dụ:**
Lọc ra danh sách các công việc đã hoàn thành.

```javascript
import { createSelector } from '@reduxjs/toolkit';

const selectTodos = state => state.todos;

const selectCompletedTodos = createSelector(
  [selectTodos],
  (todos) => {
    console.log("Đang tính toán..."); // Dòng này chỉ chạy khi todos thay đổi
    return todos.filter(todo => todo.completed === true);
  }
);
```

-----

### Tổng kết nhanh

  * **Dùng thường xuyên nhất:** `configureStore`, `createSlice` (bao gồm cả reducer & action).
  * **Khi gọi API:** Dùng `createAsyncThunk`.
  * **Khi cần tối ưu hiệu năng:** Dùng `createSelector`, `createEntityAdapter`.

**Bạn có muốn tôi viết một đoạn code mẫu hoàn chỉnh kết hợp `createSlice` và `createAsyncThunk` để quản lý người dùng không?**