# [Beginner Tutorial](https://redux-saga.js.org/docs/introduction/BeginnerTutorial)

t đang dùng notebookLM để học https://redux-saga.js.org/docs/introduction/BeginnerTutorial
cho t 5 câu prompt để nắm được 20% cốt lõi, có thể làm được 80% công việc.
hiểu sâu và áp dụng được ngay trong dự án thực tế.
đảm bảo clean code, performance, maintain, develop, security, product-code.

## A. Summary ghi chú chuẩn hóa (A4) để học nhanh: 

1. Tóm tắt 5 câu trong 5 gach dau dong. 
2. Từ khóa quan trọng (10–15 từ)
3. Core Workflow (gạch đầu dòng)
4. Hiểu sâu (Concept → Why → How)
5. Checklist áp dụng thực tế
6. Ví dụ code tự viết lại
7. Sai lầm thường gặp
8. 3 điều quan trọng nhất

**A. Tóm tắt ghi chú chuẩn hóa (A4) để học nhanh Redux-Saga**

### 1. Tóm tắt 5 câu trong 5 gạch đầu dòng

*   Hướng dẫn này giới thiệu về Redux-Saga bằng cách sử dụng ứng dụng Counter cơ bản để minh họa các khái niệm mà không bị lạc trong chi tiết quá mức.
*   Một Saga được tạo ra dưới dạng một hàm Generator (có dấu `*`) và cần được chạy thông qua `sagaMiddleware`, middleware này phải được kết nối với Redux store bằng `applyMiddleware`,,.
*   Redux-Saga xử lý các lời gọi bất đồng bộ bằng cách sử dụng các *Effects*, là các đối tượng JavaScript thuần túy chứa hướng dẫn cho middleware,.
*   Để xử lý tác vụ bất đồng bộ, Saga có thể bị tạm dừng (suspend) bằng cách *yield* một Promise (hoặc một Effect như `call`) và được tiếp tục khi Promise đó hoàn tất,.
*   Việc sử dụng các Effects như `put` và `call` tách biệt việc tạo chỉ thị với việc thực thi, cho phép kiểm thử logic bên trong Saga một cách dễ dàng bằng cách so sánh sâu (deepEqual) các đối tượng Effect được trả về,,.

### 2. Từ khóa quan trọng (10–15 từ)

Redux-Saga, Generator functions, Middleware, Asynchronous, Effects, `yield`, `put`, `call`, `takeEvery`, `rootSaga`, Testability.

### 3. Core Workflow (Gạch đầu dòng)

*   **Thiết lập:** Cài đặt middleware bằng `createSagaMiddleware`,.
*   **Kết nối:** Áp dụng middleware vào Redux Store bằng `applyMiddleware`,.
*   **Định nghĩa Sagas:** Tạo hàm Generator (ví dụ: `helloSaga` hoặc `incrementAsync`),.
*   **Xử lý Async (Worker Saga):** Sử dụng `yield call(delay, 1000)` để tạm dừng 1 giây, sau đó dùng `yield put({ type: 'INCREMENT' })` để gửi hành động,.
*   **Lắng nghe Action (Watcher Saga):** Sử dụng `yield takeEvery('ACTION_TYPE', workerSaga)` để theo dõi hành động và khởi tạo Worker Saga,.
*   **Khởi chạy:** Tạo `rootSaga` để sử dụng `yield all([...])` nhằm khởi động song song tất cả các Sagas cần thiết,.
*   **Thực thi:** Chạy điểm vào duy nhất bằng `sagaMiddleware.run(rootSaga)`.

### 4. Hiểu sâu (Concept → Why → How)

| Concept | Why | How |
| :--- | :--- | :--- |
| **Sagas là Generator Functions** | Hàm Generator cho phép Saga bị tạm dừng khi nó `yield` một đối tượng (chỉ thị/Effect) và được middleware điều khiển tiếp tục,. | Saga sử dụng cú pháp `function* name() { yield value; }`, và việc gọi `gen.next()` sẽ trả về giá trị được yield,. |
| **Sử dụng Effects (`put`, `call`)** | Để tách biệt việc tạo ra chỉ thị với việc thực thi. `put` và `call` chỉ trả về các đối tượng JavaScript thuần túy chứa hướng dẫn, chứ không tự thực hiện việc dispatch hay gọi hàm bất đồng bộ,. | Middleware kiểm tra loại Effect được `yield` (ví dụ: `PUT` hoặc `CALL`) và quyết định cách hoàn thành Effect đó (ví dụ: dispatch action hoặc gọi hàm). |
| **Khả năng kiểm thử (Testable Code)** | Khi Saga gọi hàm bất đồng bộ trực tiếp (ví dụ: `yield delay(1000)`), nó trả về một Promise khó kiểm thử đơn giản bằng so sánh bằng nhau. | Bằng cách sử dụng `yield call(delay, 1000)`, Saga trả về một đối tượng Effect thuần túy (`{ CALL: {fn: delay, args: }}`), cho phép sử dụng `assert.deepEqual` trong kiểm thử để đảm bảo đúng chỉ thị được tạo ra,,. |

### 5. Checklist áp dụng thực tế

1.  **Cài đặt:** Đã tạo `sagaMiddleware` và kết nối nó với Redux Store.
2.  **Khởi tạo:** Đã gọi `sagaMiddleware.run(rootSaga)`.
3.  **Bất đồng bộ:** Thay thế các lời gọi bất đồng bộ trực tiếp bằng `yield call(fn, args)` để duy trì khả năng kiểm thử,.
4.  **Tác vụ:** Worker Sagas có thực hiện logic bất đồng bộ và sử dụng `put` để dispatch hành động Redux không,.
5.  **Lắng nghe:** Watcher Sagas có sử dụng các helper như `takeEvery` để phản ứng lại các hành động cụ thể (ví dụ: `INCREMENT_ASYNC`) không.
6.  **Hợp nhất:** Tất cả các Sagas đã được tổng hợp và chạy song song trong `rootSaga` bằng `yield all([...])` chưa.
7.  **Kiểm thử:** Đã viết unit test bằng cách lặp qua Generator và kiểm tra các Effect được `yield` bằng `deepEqual` chưa.

### 6. Ví dụ code tự viết lại (Tập trung vào Worker Saga và Effects)

```javascript
import { put, call } from 'redux-saga/effects'

// Hàm trợ giúp tạo Promise để mô phỏng độ trễ
const delay = (ms) => new Promise(res => setTimeout(res, ms))

// Worker Saga: Thực hiện tác vụ bất đồng bộ
export function* incrementAsync() {
    // Chỉ thị 1: Yêu cầu middleware gọi hàm delay(1000)
    // Yield trả về một Effect ({ CALL: {fn: delay, args: }}), giúp dễ dàng kiểm thử.
    yield call(delay, 1000),

    // Chỉ thị 2: Yêu cầu middleware dispatch action INCREMENT
    yield put({ type: 'INCREMENT' }),
}

// Watcher Saga: Lắng nghe action và khởi chạy Worker
import { takeEvery } from 'redux-saga/effects'

export function* watchIncrementAsync() {
    // Lắng nghe mọi action 'INCREMENT_ASYNC' và chạy incrementAsync
    yield takeEvery('INCREMENT_ASYNC', incrementAsync),
}
```

### 7. Sai lầm thường gặp

*   **Yielding Promise trực tiếp:** Sử dụng `yield delay(1000)` thay vì `yield call(delay, 1000)`. Việc yield một Promise trực tiếp khiến Saga khó kiểm thử hơn vì bạn không thể thực hiện so sánh đối tượng đơn giản trên Promises,.
*   **Thiếu cấu hình Middleware:** Quên gọi `applyMiddleware(sagaMiddleware)` trước khi gọi `sagaMiddleware.run(rootSaga)`.
*   **Không sử dụng Root Saga:** Chạy riêng lẻ nhiều Sagas thay vì tổng hợp chúng vào một `rootSaga` duy nhất bằng cách sử dụng `all` để chạy song song, làm cho điểm khởi đầu phức tạp hơn,.
*   **Action không phải là Plain Object:** Redux-Saga khuyến khích Component dispatch *plain object action* (như `INCREMENT_ASYNC`) thay vì các thunk, để Saga có thể lắng nghe chúng.

### 8. 3 điều quan trọng nhất

1.  **Effects là Đối tượng Hướng dẫn:** Các lệnh được `yield` như `put` và `call` chỉ là các đối tượng JavaScript thuần túy (`{ PUT: ... }`, `{ CALL: ... }`), đóng vai trò là *chỉ thị* để middleware thực thi, chứ bản thân chúng không thực hiện I/O hay dispatch,.
2.  **Khả năng kiểm thử đến từ Sự tách biệt:** Khả năng kiểm thử cao của Redux-Saga đạt được nhờ việc tách rời logic của Saga (dưới dạng hàm Generator) khỏi việc thực thi các tác vụ bất đồng bộ (do middleware đảm nhiệm thông qua các Effect thuần túy),.
3.  **Generator Suspense:** Saga là hàm Generator có thể bị tạm dừng (suspend) khi nó gặp `yield` và chỉ được tiếp tục khi chỉ thị (Effect hoặc Promise) hoàn thành,.

## B. Tra loi cac cau hoi sau:

1. Hãy tóm tắt nội dung chính của Redux-Saga Beginner Tutorial theo dạng “80/20”: chỉ giữ lại 20% kiến thức quan trọng nhất nhưng giúp xử lý 80% tình huống thực tế. Hãy giải thích từng khái niệm bằng ví dụ siêu ngắn gọn và cho biết vai trò của chúng trong workflow thực tế.
2. Hãy giải thích chi tiết workflow chạy của Redux-Saga từ lúc dispatch action → watcher saga → worker saga → store update. Diễn giải như engine hoạt động phía sau, mô tả từng bước theo thời gian, ưu tiên sự rõ ràng và logic hơn lý thuyết.
3. Tổng hợp và giải thích 5 hiệu ứng quan trọng nhất trong Redux-Saga (take, call, put, fork, takeLatest). Với mỗi hiệu ứng, hãy trả lời 3 câu: “Khi nào dùng?”, “Sai lầm thường gặp?”, “Ảnh hưởng performance hay bug nào nếu dùng sai?”.
4. So sánh sâu sắc takeEvery, takeLatest, takeLeading kèm ví dụ thực tế. Hãy chỉ ra lỗi phổ biến của dev junior và hướng dùng đúng trong dự án production.
5. Giải thích concurrency trong Redux-Saga bằng các tình huống thực tế: debounce, throttle, cancel request, chống spam API. Loại bỏ các phần trừu tượng khó hiểu, chỉ tập trung vào cách implement đúng và clean code.
6. Hãy cho biết các cách debug Redux-Saga hiệu quả nhất: quan sát Saga Monitor, log effect, đo workflow, kiểm tra race/overlapping tasks. Mỗi cách phải kèm ví dụ và checklist debug nhanh.
7. Hãy đề xuất cấu trúc folder và cách tách file Saga chuẩn clean code cho dự án thực tế. Giải thích vì sao nên tách watcher – worker, cách đặt tên action, và cách tránh “god saga”.
8. Liệt kê 15 lỗi phổ biến mà lập trình viên hay gặp khi dùng Redux-Saga (takeLatest không chạy, race điều kiện sai, saga không cancel,…). Với mỗi lỗi hãy giải thích nguyên nhân + cách fix.

Tôi xin trả lời các câu hỏi của bạn dựa trên các đoạn trích từ tài liệu "Redux-Saga Beginner Tutorial" đã được cung cấp.

### 1. Tóm tắt nội dung chính của Redux-Saga Beginner Tutorial theo dạng “80/20”

20% kiến thức quan trọng nhất giúp xử lý 80% tình huống thực tế trong Redux-Saga bao gồm việc hiểu về **Sagas**, **Saga Middleware**, **Effects** (`put`, `call`), **TakeEvery** và **Root Saga**.

| Khái niệm (20%) | Ví dụ siêu ngắn gọn | Vai trò trong Workflow thực tế |
| :--- | :--- | :--- |
| **Sagas (Generator Functions)** | `export function* incrementAsync()` | Là nơi chứa logic xử lý, bao gồm các bước bất đồng bộ. Saga được triển khai dưới dạng hàm Generator (có dấu `*`). |
| **Saga Middleware Setup** | `createSagaMiddleware()` và `sagaMiddleware.run(rootSaga)` | Tạo cầu nối để kết nối logic Saga với Redux Store. Bắt buộc phải chạy để khởi động tất cả các Sagas. |
| **Effects** | `put`, `call` | Là các đối tượng JavaScript thuần túy chứa hướng dẫn để middleware diễn giải và thực hiện. Saga bị tạm dừng cho đến khi Effect được hoàn thành. |
| **`put` Effect** | `yield put({type: 'INCREMENT'})` | **Hướng dẫn** middleware dispatch một action đến Store. Dùng để thông báo cho Reducer về kết quả của một tác vụ (thành công/thất bại). |
| **`call` Effect** | `yield call(delay, 1000)` | **Hướng dẫn** middleware gọi một hàm (thường là bất đồng bộ) với các đối số đã cho. Điều này giúp logic bất đồng bộ trở nên dễ kiểm tra hơn. |
| **`takeEvery` (Watcher Saga)** | `yield takeEvery('ACTION', workerSaga)` | Một hàm trợ giúp được sử dụng để lắng nghe các action được dispatch và khởi động một tác vụ (`worker Saga`) mới cho mỗi action phù hợp. Đây là cách Saga "bắt" các action từ Store. |
| **`all` (Root Saga)** | `yield all([saga1(), saga2()])` | Dùng để nhóm và khởi động nhiều Sagas (như watcher Sagas) **song song**. Đảm bảo tất cả các điểm lắng nghe đều hoạt động ngay từ đầu. |

---

### 2. Giải thích chi tiết workflow chạy của Redux-Saga

Workflow chạy của Redux-Saga được minh họa rõ nhất qua ví dụ `INCREMENT_ASYNC` như một "engine" hoạt động phía sau:

#### Bước 1: Kích hoạt (Dispatch) Action Thô
Khi người dùng nhấp vào nút "Increment after 1 second" trên UI, component sẽ gọi hàm callback tương ứng, dẫn đến việc **Store dispatch một action là đối tượng thuần túy** có type `'INCREMENT_ASYNC'`.

#### Bước 2: Watcher Saga "Bắt" Action
**Saga Middleware** đang chạy, và **Watcher Saga** (`watchIncrementAsync`) cũng đang chạy nhờ `rootSaga`.
Bên trong Watcher Saga có dòng lệnh `yield takeEvery('INCREMENT_ASYNC', incrementAsync)`.
*   Khi action `'INCREMENT_ASYNC'` được dispatch, `takeEvery` sẽ nhận diện action này.
*   `takeEvery` ngay lập tức **sinh ra (spawn) một tác vụ mới** (task) và chạy Worker Saga (`incrementAsync`) để xử lý yêu cầu.

#### Bước 3: Worker Saga Xử lý Bất đồng bộ
Saga Worker (`incrementAsync`) bắt đầu chạy:
1.  **Chờ đợi (Suspension):** Nó gặp lệnh `yield call(delay, 1000)`. `call` tạo ra một **Effect** (`{ CALL: {fn: delay, args: }}`).
2.  **Thực thi:** Middleware nhận Effect `CALL`, diễn giải nó và thực hiện gọi hàm `delay(1000)` (trả về một Promise).
3.  **Tạm dừng:** Saga `incrementAsync` bị **treo (suspend)** và chờ đợi cho đến khi Promise đó hoàn thành (sau 1 giây).

#### Bước 4: Tiếp tục và Dispatch Action Kết quả
1.  **Tiếp tục (Resumption):** Sau 1 giây, Promise resolve, và Middleware **tiếp tục (resume)** Saga `incrementAsync`.
2.  **Tạo Effect `PUT`:** Saga gặp lệnh tiếp theo: `yield put({type: 'INCREMENT'})`. `put` tạo ra một **Effect** (`{ PUT: {type: 'INCREMENT'}}`).

#### Bước 5: Cập nhật Store (Store Update)
1.  **Dispatch Action Cuối cùng:** Middleware nhận Effect `PUT`, diễn giải nó và **dispatch action `'INCREMENT'`** (lúc này là action thuần túy để cập nhật trạng thái) đến Redux Store.
2.  **Reducer chạy:** Reducer xử lý action `'INCREMENT'`, cập nhật state của ứng dụng. UI sẽ được render lại dựa trên state mới.
3.  **Saga kết thúc:** Sau khi thực hiện xong `put`, Worker Saga (`incrementAsync`) kết thúc (`done: true`).

Quá trình tách biệt giữa việc **tạo ra Effect** (Saga trả về một đối tượng mô tả hướng dẫn) và **thực thi Effect** (Middleware diễn giải và thực hiện) là cốt lõi, giúp Sagas dễ kiểm tra và quản lý hơn.

---

### 3. Tổng hợp và giải thích 5 hiệu ứng quan trọng nhất trong Redux-Saga

Các nguồn cung cấp thông tin chi tiết về **`put`**, **`call`**, và hàm trợ giúp **`takeEvery`**.

**Lưu ý quan trọng:** Các nguồn được cung cấp **không** đề cập đến các Effect `take`, `fork`, hay hàm trợ giúp `takeLatest`. Do đó, tôi chỉ có thể cung cấp thông tin về những khái niệm có trong nguồn:

| Hiệu ứng/Helper | Khi nào dùng? | Sai lầm thường gặp? | Ảnh hưởng performance/Bug nếu dùng sai? |
| :--- | :--- | :--- | :--- |
| **`put` (Effect)** | Khi Saga đã hoàn thành logic (ví dụ: gọi API) và cần **dispatch một action** đến Store để cập nhật state thông qua Reducer. | (Không có thông tin trong nguồn) | (Không có thông tin trong nguồn) |
| **`call` (Effect)** | Khi cần gọi một hàm (thường là hàm bất đồng bộ, trả về Promise) **một cách gián tiếp**. Việc sử dụng `call` thay vì gọi hàm trực tiếp giúp Saga trở thành chuỗi các đối tượng thuần túy, dễ dàng kiểm tra. | (Không có thông tin trong nguồn) | (Không có thông tin trong nguồn) |
| **`takeEvery` (Helper)** | Được sử dụng trong Watcher Saga để **lắng nghe** các action cụ thể được dispatch từ Store, và chạy Worker Saga tương ứng **mỗi lần** action đó xảy ra. | (Không có thông tin trong nguồn) | (Không có thông tin trong nguồn) |

---

### 4. So sánh sâu sắc takeEvery, takeLatest, takeLeading

**Lưu ý quan trọng:** Các nguồn được cung cấp **chỉ giới thiệu và sử dụng `takeEvery`**. Chúng **không đề cập, giải thích hay so sánh** với `takeLatest` và `takeLeading`. Do đó, tôi không thể thực hiện so sánh chuyên sâu, đưa ra ví dụ thực tế hay chỉ ra lỗi phổ biến của developer junior dựa trên nội dung nguồn.

Theo nguồn, `takeEvery` có nhiệm vụ là lắng nghe action và **sinh ra một task mới** cho mỗi lần action đó được dispatch.

*   **Ví dụ thực tế dựa trên nguồn (`takeEvery`):**
    `yield takeEvery('INCREMENT_ASYNC', incrementAsync)`.
    Nếu người dùng nhấn nút "Increment after 1 second" hai lần liên tiếp (trong vòng 1 giây), `takeEvery` sẽ khởi động **hai** tác vụ `incrementAsync` song song. Cả hai tác vụ này đều sẽ chờ 1 giây rồi dispatch `'INCREMENT'`. Kết quả là counter tăng lên 2 đơn vị sau 1 giây.

-----

## Dưới đây là **10 câu prompt chất lượng cao**, tối ưu cho **NotebookLM** giúp bạn nắm **20% cốt lõi của Redux-Saga** → làm được **80% công việc** trong dự án thực tế.

TẤT CẢ prompt đều viết sẵn, bạn chỉ cần copy–paste.

---

# ✅ **10 PROMPT HỌC REDUX-SAGA (TỐI ƯU CHO NOTEBOOKLM)**

---

## **1️⃣ – Hiểu toàn cảnh (Bird-view)**

**Prompt 1:**

> Hãy tóm tắt nội dung chính của Redux-Saga Beginner Tutorial theo dạng “80/20”: chỉ giữ lại 20% kiến thức quan trọng nhất nhưng giúp xử lý 80% tình huống thực tế. Hãy giải thích từng khái niệm bằng ví dụ siêu ngắn gọn và cho biết vai trò của chúng trong workflow thực tế.

---

## **2️⃣ – Hiểu sâu workflow chạy dưới nắp máy**

**Prompt 2:**

> Hãy giải thích chi tiết workflow chạy của Redux-Saga từ lúc dispatch action → watcher saga → worker saga → store update. Diễn giải như engine hoạt động phía sau, mô tả từng bước theo thời gian, ưu tiên sự rõ ràng và logic hơn lý thuyết.

---

## **3️⃣ – Nhận diện 5 hiệu ứng cốt lõi**

**Prompt 3:**

> Tổng hợp và giải thích 5 hiệu ứng quan trọng nhất trong Redux-Saga (take, call, put, fork, takeLatest). Với mỗi hiệu ứng, hãy trả lời 3 câu: “Khi nào dùng?”, “Sai lầm thường gặp?”, “Ảnh hưởng performance hay bug nào nếu dùng sai?”.

---

## **4️⃣ – Phân biệt rõ takeEvery vs takeLatest vs takeLeading**

**Prompt 4:**

> So sánh sâu sắc takeEvery, takeLatest, takeLeading kèm ví dụ thực tế. Hãy chỉ ra lỗi phổ biến của dev junior và hướng dùng đúng trong dự án production.

---

## **5️⃣ – Hiểu concurrency (đồng thời) theo cách thực tế**

**Prompt 5:**

> Giải thích concurrency trong Redux-Saga bằng các tình huống thực tế: debounce, throttle, cancel request, chống spam API. Loại bỏ các phần trừu tượng khó hiểu, chỉ tập trung vào cách implement đúng và clean code.

---

## **6️⃣ – Debug như senior**

**Prompt 6:**

> Hãy cho biết các cách debug Redux-Saga hiệu quả nhất: quan sát Saga Monitor, log effect, đo workflow, kiểm tra race/overlapping tasks. Mỗi cách phải kèm ví dụ và checklist debug nhanh.

---

## **7️⃣ – Clean Code với Saga**

**Prompt 7:**

> Hãy đề xuất cấu trúc folder và cách tách file Saga chuẩn clean code cho dự án thực tế. Giải thích vì sao nên tách watcher – worker, cách đặt tên action, và cách tránh “god saga”.

---

## **8️⃣ – Phân tích lỗi phổ biến của Redux-Saga**

**Prompt 8:**

> Liệt kê 15 lỗi phổ biến mà lập trình viên hay gặp khi dùng Redux-Saga (takeLatest không chạy, race điều kiện sai, saga không cancel,…). Với mỗi lỗi hãy giải thích nguyên nhân + cách fix.

---

## **9️⃣ – Tạo bản tóm tắt để ôn trong 5 phút**

**Prompt 9:**

> Tạo một bản ghi chú dạng flashcard / tóm tắt 1 trang A4 giúp ôn Redux-Saga Essentials trong 5 phút: hiệu ứng quan trọng, flow, tips thực tế, cấu trúc code, checklist khi viết saga.

---

## **🔟 – Ứng dụng vào dự án thật**

**Prompt 10:**

> Hãy tạo hướng dẫn step-by-step để tích hợp Redux-Saga vào một project React + Redux Toolkit thật. Bao gồm: cấu trúc folder, tạo rootSaga, watcher/worker mẫu, fetch API flow, xử lý lỗi và loading, improve performance.

---

# 🎁 Bonus — Template Note (copy-paste vào NotebookLM)

---

## **📘 Redux-Saga Learning Note – Template**

### **1. Tóm tắt 80/20 (Điền nội dung)**

* …
* …

### **2. Workflow Saga chạy dưới nắp máy**

1. …
2. …
3. …

### **3. 5 hiệu ứng cốt lõi**

* `take` → …
* `call` → …
* `put` → …
* `fork` → …
* `takeLatest` → …

### **4. Comparator**

| Khái niệm   | Dùng khi | Không dùng khi | Lưu ý |
| ----------- | -------- | -------------- | ----- |
| takeEvery   | …        | …              | …     |
| takeLatest  | …        | …              | …     |
| takeLeading | …        | …              | …     |

### **5. Debug Checklist**

* [ ] Saga không chạy → kiểm tra rootSaga
* [ ] takeLatest không trigger → kiểm tra action type
* [ ] Worker không nhận param → kiểm tra action.payload
* [ ] …

### **6. Clean Code Checklist**

* [ ] Tách watcher/worker
* [ ] Tên action rõ ràng
* [ ] Group saga theo domain
* [ ] …

---

Nếu bạn muốn, mình có thể tạo thêm:

✅ Mindmap Redux-Saga 1 trang A4
✅ Roadmap học 7 ngày → làm được dự án thật
✅ Starter boilerplate chuẩn clean code + performance

Chỉ cần bảo mình: **“Làm giúp t mindmap”** hoặc **“Cho nguồn code chuẩn”**.
