# [Summary Redux Essentials, Part 2 Redux Toolkit App Structure](https://redux.js.org/tutorials/essentials/part-2-app-structure)

(Saved responses are view only)
Chào bạn, tôi hiểu rằng tài liệu về cấu trúc ứng dụng Redux Toolkit có thể phức tạp. Dưới đây là phần tóm tắt ngắn gọn, súc tích và tập trung vào các khái niệm cốt lõi, có thể áp dụng ngay vào dự án của bạn.
Tất cả các thông tin này đều được trích dẫn từ tài liệu bạn cung cấp.
--------------------------------------------------------------------------------
Tóm Tắt Redux Essentials, Part 2: Redux Toolkit App Structure
Nội dung này trình bày cấu trúc tiêu chuẩn của một ứng dụng React + Redux Toolkit, tập trung vào cách các thành phần Redux (Store, Slice, Thunk) và React (Component, Hooks) tương tác với nhau.
1. Cấu Trúc Ứng Dụng (Application Contents)
Một ứng dụng Redux Toolkit điển hình được tổ chức theo cấu trúc sau, giúp phân chia logic rõ ràng:
Thư mục/Tệp
Mục đích chính
app/store.ts
Tạo Redux Store (Nơi lưu trữ trạng thái toàn cục).
app/hooks.ts
Xuất các hooks React-Redux đã được định kiểu (typed hooks) cho TypeScript.
features/counter/counterSlice.ts
Slice (Logic Redux) cho tính năng counter. Bao gồm trạng thái ban đầu, reducers và actions.
features/counter/Counter.tsx
React Component (Giao diện người dùng) cho tính năng counter.

2. Tạo Redux Store (Creating the Redux Store)
• API Chính: Sử dụng hàm configureStore từ Redux Toolkit trong tệp app/store.ts.
• Cách làm: Truyền vào một đối tượng reducer chứa tất cả các slice reducers của ứng dụng (ví dụ: {counter: counterReducer}).
• Lợi ích của RTK: configureStore tự động thiết lập các cài đặt tốt mặc định, bao gồm việc thêm Redux Thunk (để xử lý logic bất đồng bộ) và cấu hình Redux DevTools Extension (để gỡ lỗi).
3. Redux Slices (Tạo Logic Redux)
• Định nghĩa: Slice là tập hợp logic reducer và action cho một tính năng đơn lẻ trong ứng dụng, thường được định nghĩa trong một tệp duy nhất (ví dụ: counterSlice.ts).
• API Chính: Sử dụng hàm createSlice từ Redux Toolkit.
• Đầu vào của createSlice:
    ◦ name: Tên của slice (ví dụ: 'counter'). Tên này được dùng làm tiền tố cho loại hành động (action type).
    ◦ initialState: Trạng thái ban đầu của slice.
    ◦ reducers: Các hàm reducer. createSlice tự động tạo chuỗi action type (ví dụ: "counter/increment") và các hàm tạo action tương ứng (action creators).
4. Quy tắc Reducers và Cập nhật Bất Biến (Immutable Updates)
Đây là phần quan trọng nhất của Redux:
Quy tắc Bắt buộc
Chi tiết quan trọng
Tính thuần khiết (Pure)
Reducers chỉ được tính toán trạng thái mới dựa trên đối số state và action. Không được chứa logic bất đồng bộ (side effects).
Cập nhật Bất Biến (Immutable)
Tuyệt đối không được thay đổi (mutate) trạng thái gốc. Phải luôn tạo bản sao (copy) của trạng thái hiện tại và chỉ thay đổi bản sao đó.
• Giải pháp của RTK (Immer): createSlice sử dụng thư viện Immer bên trong.
    ◦ Điều này cho phép bạn viết logic "thay đổi" (mutating) trông có vẻ như đang thay đổi trạng thái trực tiếp (ví dụ: state.value += 1).
    ◦ Immer sẽ tự động phát hiện các thay đổi này và tạo ra một trạng thái mới bất biến (immutable) một cách an toàn, giúp bạn tránh được lỗi phổ biến nhất trong Redux.
5. Logic Bất Đồng Bộ (Async Logic) với Thunks
Vì reducers phải đồng bộ, logic bất đồng bộ (như gọi API) cần được xử lý bằng Thunks.
• Thunk là gì: Một loại hàm đặc biệt có thể chứa logic đồng bộ hoặc bất đồng bộ. Thunk được dispatch giống như một action thông thường.
• Thành phần: Thunk có quyền truy cập vào dispatch (để gửi các actions khác) và getState (để đọc trạng thái hiện tại).
• Sử dụng RTK: Redux Toolkit cung cấp createAsyncThunk để xử lý các tác vụ bất đồng bộ phổ biến (như fetch dữ liệu).
    ◦ createAsyncThunk tự động gửi các actions pending (đang chờ), fulfilled (hoàn thành) hoặc rejected (thất bại).
    ◦ Bạn xử lý các actions này trong trường extraReducers của createSlice.
6. Kết nối React với Redux (React-Redux Connection)
Để component React có thể tương tác với Redux Store:
1. Cung cấp Store: Trong tệp khởi động (main.tsx), bạn phải bọc ứng dụng bằng component <Provider store={store}> để cung cấp store cho tất cả các component con.
2. Đọc Trạng thái: Sử dụng hook useSelector để đọc các giá trị từ Redux store.
    ◦ Bạn truyền vào useSelector một hàm selector (ví dụ: selectCount) để trích xuất dữ liệu cần thiết từ trạng thái gốc (state).
3. Gửi Actions: Sử dụng hook useDispatch để lấy ra hàm dispatch từ store.
    ◦ Khi người dùng tương tác (ví dụ: click nút), bạn gọi dispatch(actionCreator()) để gửi action và kích hoạt quá trình cập nhật trạng thái.
4. TypeScript: Sử dụng các hooks đã được định kiểu trước (useAppDispatch và useAppSelector) được định nghĩa trong app/hooks.ts để tối ưu hóa việc sử dụng TypeScript trong component.
7. Trạng thái Toàn cục vs. Trạng thái Component (Local vs. Global State)
• Quy tắc chung:
    ◦ Redux Store (Global State): Dành cho dữ liệu cần thiết trên toàn bộ ứng dụng, cần lưu trữ cache, cần gỡ lỗi "du hành thời gian" (time-travel debugging), hoặc dùng để dẫn động nhiều component khác nhau.
    ◦ React Component State (useState) (Local State): Dành cho dữ liệu chỉ liên quan đến component đó (ví dụ: trạng thái mở/đóng của dropdown, giá trị nhập liệu tạm thời trong form).
• Lưu ý về Forms: Hầu hết trạng thái form (khi đang chỉnh sửa) không nên lưu trong Redux. Chỉ dispatch action để cập nhật Redux Store khi người dùng hoàn tất (ví dụ: nhấn nút gửi).
--------------------------------------------------------------------------------
Infographic/Sơ đồ Tư duy (Text-Based Visualization)
Vì tôi không thể vẽ hình ảnh trực tiếp, dưới đây là sơ đồ tư duy dựa trên luồng dữ liệu chính của một ứng dụng Redux Toolkit, tập trung vào mối quan hệ giữa các thành phần.
graph TD
    subgraph START_APP
        A[main.tsx] --> B{<Provider store={store}>};
    end

    subgraph REDUX_STORE_SETUP
        B --> C(app/store.ts);
        C -- configureStore() --> D[Redux Store Root State];
        D -- combineReducers() --> E[Slice Reducer 1];
        D -- combineReducers() --> F[Slice Reducer 2];
    end

    subgraph REACT_COMPONENT
        G[features/counter/Counter.tsx] --> H{useAppSelector};
        G --> I{useAppDispatch};
        H -- Read State --> D;
        I -- Dispatch Action --> J[Action];
    end

    subgraph SLICE_LOGIC
        E[counterSlice.ts] -- createSlice() --> K[Action Creators];
        E --> L[Initial State];
        E -- Uses Immer/Draft State --> M{Reducers (Sync Logic)};
    end

    subgraph DATA_FLOW_SYNC
        J -- {type: "slice/actionName"} --> M;
        M -- Immutable Update --> D;
    end

    subgraph DATA_FLOW_ASYNC
        I -- Dispatch Thunk --> N[Thunk (Async Logic)];
        N -- API Call / Logic (has dispatch/getState access) --> O[Dispatch Async Actions];
        O -- pending/fulfilled/rejected --> P[extraReducers in Slice];
        P -- Immutable Update --> D;
    end

    style D fill:#f9f,stroke:#333,stroke-width:2px
    style G fill:#ccf,stroke:#333,stroke-width:2px
    style E fill:#ffa,stroke:#333,stroke-width:2px

    %% Flow connections
    K --> I;
    I --> N;

Giải thích Sơ đồ:
1. Khởi động (START_APP): Ứng dụng khởi động tại main.tsx và cấp quyền truy cập Store cho các component bằng <Provider>.
2. Thiết lập Store (REDUX_STORE_SETUP): configureStore tạo Store và kết hợp các Slice Reducer thành một trạng thái gốc (Root State).
3. Component React (REACT_COMPONENT):
    ◦ Sử dụng useAppSelector để đọc dữ liệu từ Store.
    ◦ Sử dụng useAppDispatch để gửi Actions (tác động).
4. Logic Slice (SLICE_LOGIC):
    ◦ createSlice tạo ra Reducers và Action Creators.
    ◦ Reducers sử dụng Immer để viết các cập nhật trạng thái "có vẻ" như thay đổi trực tiếp (mutating) nhưng vẫn đảm bảo tính bất biến (Immutable Update).
5. Luồng Dữ liệu Đồng bộ (DATA_FLOW_SYNC): Component gửi Action (J) → Reducer (M) xử lý → Trạng thái Store (D) được cập nhật.
6. Luồng Dữ liệu Bất đồng bộ (DATA_FLOW_ASYNC): Component gửi Thunk (N) → Thunk thực hiện logic async → Thunk gửi Async Actions (pending, fulfilled, rejected) (O) → extraReducers (P) xử lý kết quả → Trạng thái Store (D) được cập nhật.
--------------------------------------------------------------------------------
Tóm lại bằng một phép ẩn dụ đơn giản:
Nếu Redux Store là một Ngân hàng dữ liệu khổng lồ (Root State), thì Slice giống như một chi nhánh chuyên quản lý một loại tài khoản (tính năng) cụ thể. createSlice là máy in séc tự động in ra các Phiếu Giao dịch (Actions). Khi bạn gửi Phiếu Giao dịch, Reducers (nhân viên ngân hàng) sẽ nhận nó, nhưng họ không bao giờ được phép sửa sổ sách gốc (trạng thái bất biến). Thay vào đó, họ dùng Immer như một phần mềm kế toán tự động cho phép họ thay đổi "bản nháp" của sổ sách, sau đó phần mềm sẽ tự động tạo ra một Sổ sách mới hoàn toàn (Immutable Update) để đảm bảo mọi giao dịch đều minh bạch và có thể truy ngược.