# [Error handling](https://redux-saga.js.org/docs/basics/ErrorHandling)

Đây là bản tóm tắt ghi chú chuẩn hóa (A4) về **Xử lý lỗi (Error Handling)** trong Redux-Saga, dựa trên các nguồn được cung cấp.

### Summary Ghi Chú Chuẩn Hóa (A4) về Xử lý lỗi trong Redux-Saga

#### 1. Tóm tắt 5 câu trong 5 gạch đầu dòng

*   Sagas xử lý lỗi khi một Promise bị reject (ví dụ: từ `Api.fetch`) bằng cách sử dụng cú pháp `try/catch` quen thuộc.
*   Khi lỗi xảy ra trong quá trình `yield call`, Generator sẽ bị ngắt và chuyển thực thi sang block `catch`.
*   Trong block `catch`, Saga nên `yield put` một action thất bại (ví dụ: `PRODUCTS_REQUEST_FAILED`) để cập nhật Store,.
*   Để kiểm thử trường hợp lỗi, cần sử dụng phương thức `.throw(error)` của Generator, điều này buộc Generator thực thi block `catch`.
*   Lỗi trong các tác vụ forked sẽ lan truyền (bubble up) lên các Saga cha, và nếu nó đến Root Saga, **toàn bộ cây Saga sẽ bị chấm dứt**.

#### 2. Từ khóa quan trọng (10–15 từ)

Error handling, try/catch, Promise rejection, `yield call`, `yield put`, Generator `.throw()`, API wrapper, error bubbling, Root Saga, terminated, `onError` hook.

#### 3. Core Workflow (Xử lý lỗi API)

*   Worker Saga đặt lệnh `yield call(Api.fetch, ...)` bên trong block `try`.
*   Nếu lời gọi API thất bại (Promise bị reject), lỗi sẽ được ném vào trong Generator, khiến dòng chảy chuyển sang block `catch`,.
*   Block `catch` nhận đối tượng lỗi.
*   Saga `yield put` action thất bại (`PRODUCTS_REQUEST_FAILED`) cùng với thông tin lỗi.

#### 4. Hiểu sâu (Concept → Why → How)

| Yếu tố | Giải thích dựa trên nguồn |
| :--- | :--- |
| **Concept (Khái niệm)** | Cơ chế bắt và xử lý các lỗi bất đồng bộ (thường là Promise rejection) trong Sagas. |
| **Why (Tại sao cần)** | Cần phải bắt lỗi để có thể cập nhật trạng thái ứng dụng một cách tường minh, ví dụ: dispatch action `PRODUCTS_REQUEST_FAILED`. |
| **How (Cách thực hiện)** | **Cách 1 (Try/Catch):** Dùng `try/catch` bao bọc `yield call`. **Cách 2 (API Wrapper):** Viết một hàm dịch vụ API để tự bắt Promise rejection và ánh xạ nó thành một đối tượng thông thường có cờ lỗi (`{ response }` hoặc `{ error }`). |

#### 5. Checklist áp dụng thực tế

*   Khi xử lý logic bất đồng bộ có nguy cơ thất bại, **luôn bao bọc `yield call` trong `try/catch`** hoặc đảm bảo hàm API được bao bọc để trả về lỗi dưới dạng giá trị thông thường,.
*   Trong trường hợp `try/catch`, luôn `yield put` một action thông báo thất bại trong block `catch`.
*   Trong kiểm thử đơn vị, sử dụng phương thức **`iterator.throw(error)`** để đảm bảo block `catch` của bạn hoạt động đúng và yield đúng `put` Effect.
*   Nếu lỗi được lan truyền đến Root Saga, **toàn bộ cây Saga sẽ bị chấm dứt**, vì vậy phải đảm bảo bắt lỗi ở cấp thấp hơn.
*   Chỉ sử dụng **`onError` hook** như một phương sách cuối cùng để báo cáo các lỗi **không mong đợi** hoặc các lỗi lan truyền đến Root Saga, không nên dùng nó làm bộ xử lý lỗi toàn cục.

#### 6. Ví dụ code tự viết lại

Dùng `try/catch` để xử lý lỗi API:

```javascript
import { call, put } from 'redux-saga/effects'
import Api from './path/to/api'

function * fetchProducts () {
    try {
        const products = yield call(Api.fetch, '/products') // Có thể ném lỗi
        yield put({ type: 'PRODUCTS_RECEIVED', products })
    } catch (error) {
        // Bắt lỗi và dispatch action thất bại
        yield put({ type: 'PRODUCTS_REQUEST_FAILED', error }) 
    }
}
```

#### 7. Sai lầm thường gặp

*   **Bỏ qua xử lý lỗi:** Không sử dụng `try/catch` hoặc API wrapper. Hậu quả là lỗi lan truyền (error bubbling) lên các tác vụ cha, và nếu lỗi đó đến Root Saga, nó sẽ **chấm dứt** toàn bộ ứng dụng.
*   **Sử dụng `onError` sai mục đích:** Coi `onError` hook là giải pháp xử lý lỗi toàn cục. `onError` chỉ nên được coi là phương sách cuối cùng để xử lý các lỗi bất ngờ, vì khi nó được kích hoạt, cây Saga đã bị chấm dứt.

#### 8. 3 điều quan trọng nhất

1.  **Sử dụng `try/catch` là cơ chế chính** để bắt các Promise rejection khi sử dụng `yield call`.
2.  Khả năng kiểm thử trường hợp lỗi được đảm bảo thông qua việc sử dụng **`iterator.throw(error)`** trong kiểm thử Generator.
3.  Lỗi lan truyền đến Root Saga sẽ gây **chấm dứt** toàn bộ cây Saga, yêu cầu phải bắt lỗi một cách cẩn thận ở cấp tác vụ.

---
**Metaphor:**
Việc xử lý lỗi trong Redux-Saga giống như việc đặt các tấm chắn an toàn và hệ thống báo cháy trong một tòa nhà. `try/catch` là tấm chắn an toàn ngay tại nơi xảy ra sự cố (lời gọi API). Nếu bạn không bắt lỗi, lỗi sẽ lan truyền lên các tầng trên (Sagas cha). Nếu nó đến tầng thượng (Root Saga), hệ thống sẽ kích hoạt `onError` hook, nhưng lúc đó, **toàn bộ tòa nhà (cây Saga) đã bị đóng cửa (terminated)**.

---------

Tôi xin trả lời các câu hỏi của bạn dựa trên các đoạn trích từ tài liệu "Error Handling | Redux-Saga".

### 1. Giải thích toàn bộ cơ chế Error Handling trong Redux-Saga

Cơ chế xử lý lỗi trong Redux-Saga dựa trên cú pháp `try/catch` của JavaScript, được mở rộng để hoạt động với các Generator và các tác vụ bất đồng bộ do Effects tạo ra.

#### Workflow thực thi từng bước:

1.  **Saga bắt đầu:** Một Worker Saga (`fetchProducts`) được khởi chạy, bao bọc logic bất đồng bộ trong khối `try`.
2.  **Thực thi Effect:** Saga `yield call(Api.fetch, '/products')`. Lệnh này tạo ra một Effect mô tả lời gọi API.
3.  **Lỗi xảy ra (Promise Rejection):** Redux-Saga Middleware thực thi lời gọi API. Nếu `Api.fetch` trả về một Promise bị **reject** (tức là remote fetch thất bại), lỗi đó sẽ được ném (throw) vào Generator.
4.  **`try/catch` hoạt động:** Việc lỗi bị ném vào sẽ khiến Generator **ngắt dòng chảy hiện tại** trong khối `try` và chuyển ngay lập tức đến khối `catch`.
5.  **Xử lý lỗi:** Trong khối `catch`, Saga nhận đối tượng `error` và ngay lập tức `yield put({ type: 'PRODUCTS_REQUEST_FAILED', error })` để dispatch action thất bại đến Redux Store.

#### Lỗi khi `yield` Effect và Propagation:

*   **Lỗi khi `yield call()`:** Khi một Promise bị reject do `yield call()`, lỗi đó sẽ được ném vào Generator và được xử lý cục bộ bằng `try/catch`.
*   **Propagation (Lan truyền):** Nếu lỗi xảy ra trong một **tác vụ được tạo ra bởi `fork`** và không được bắt bởi `try/catch` cục bộ, lỗi đó sẽ **lan truyền (bubble up)** lên các Saga cha (parents).
*   **Saga Crash (Chấm dứt):** Nếu lỗi lan truyền đến **Root Saga** (Saga gốc), thì **toàn bộ cây Saga sẽ bị chấm dứt (`terminated`)**.
*   **Root Saga Restart:** Nguồn không đề cập đến việc Root Saga tự động restart. Thay vào đó, nếu lỗi lan truyền đến Root Saga, nó được coi là lỗi **không mong đợi (`unexpected`)**, và cách tiếp cận được ưu tiên là sử dụng **`onError` hook** để báo cáo lỗi và kết thúc ứng dụng một cách duyên dáng.

---

### 2. Ba Pattern Clean nhất để xử lý lỗi API

Nguồn cung cấp hai pattern cơ bản để xử lý lỗi API: **Try/Catch** và **API Wrapper**. Tôi sẽ dựa vào hai pattern này và một kiến thức nền về sự cần thiết của việc thông báo lỗi (`notify`) để đưa ra các mẫu sau:

#### Pattern 1: Try/Catch Tường minh (Explicit Try/Catch)

| Tiêu chí | Mô tả | Code Mẫu |
| :--- | :--- | :--- |
| **Cơ chế** | Sử dụng cú pháp `try/catch` quen thuộc để bắt lỗi Promise rejection ngay trong Worker Saga. | `function * fetchProducts () { try { ... } catch (error) { yield put({ type: 'PRODUCTS_REQUEST_FAILED', error }) } }` |
| **Ưu điểm** | **Dễ đọc**, rõ ràng về nơi lỗi được xử lý. Dễ dàng `put` action thất bại ngay lập tức. |
| **Nhược điểm** | Cần lặp lại khối `try/catch` cho mọi Worker Saga. |
| **Best Practice** | Tối ưu cho hiệu năng và dễ maintain đối với các Sagas đơn giản, nơi logic xử lý lỗi cục bộ là đủ. |

#### Pattern 2: API Wrapper (Error as Value)

| Tiêu chí | Mô tả | Code Mẫu |
| :--- | :--- | :--- |
| **Cơ chế** | API service tự bắt Promise rejection và **trả về một đối tượng giá trị thông thường** có chứa cờ lỗi (`{ error }`). Worker Saga kiểm tra sự tồn tại của lỗi đó. | `function * fetchProducts () { const { response, error } = yield call(fetchProductsApi); if (response) { ... } else { yield put({ type: 'PRODUCTS_REQUEST_FAILED', error }) } }` |
| **Ưu điểm** | Giữ cho Worker Saga **không cần `try/catch`**, làm cho code sạch hơn. Cho phép kiểm tra lỗi bằng lệnh `if` thông thường, dễ dàng kiểm thử hơn. |
| **Nhược điểm** | Logic bắt lỗi bị chuyển sang hàm wrapper, có thể làm hàm đó phức tạp hơn. |
| **Best Practice** | Tối ưu cho các project lớn, nơi việc **kiểm tra lỗi bằng `if`** được ưu tiên hơn việc sử dụng `try/catch` bên trong Generator.

#### Pattern 3: Notify/Fallback (Kết hợp Error Handling và Thông báo)

(Pattern này là một phần mở rộng của Pattern 1 hoặc 2, tập trung vào hành động sau khi lỗi được bắt. Nguồn không cung cấp chi tiết về `fallback` hay `retry`.)

*Sau khi lỗi được bắt bằng Pattern 1 hoặc 2:*

1.  **Fallback:** Sau khi `put(FAILURE_ACTION)`, Worker Saga có thể `put` một action khác để UI hiển thị dữ liệu đã lưu trong cache (fallback data).
2.  **Notify:** Worker Saga có thể `yield call(NotificationService.showError, error)` để hiển thị thông báo lỗi cho người dùng hoặc `yield call(Logger.error, error)` để log lỗi.

---

### 3. Phân tích và viết lại Error Handling theo kiến trúc sản phẩm

**Lưu ý:** Nguồn không cung cấp thông tin về **central error handler, classify error, log bằng middleware, hay tổ chức folder structure**. Do đó, phần trả lời này sẽ dựa trên các nguyên tắc cơ bản của Redux-Saga và kiến thức về kiến trúc phần mềm, đồng thời làm rõ rằng thông tin này không có trong nguồn.

#### Central Error Handler

Thay vì xử lý lỗi cục bộ trong mọi Worker Saga, ta có thể tạo một **Error Handler Saga** trung tâm.

*   **Cơ chế:** Khi lỗi xảy ra trong Worker Saga, thay vì `put` action thất bại, nó **`put` một action lỗi chung** (ví dụ: `ERROR_REPORTED`, kèm theo loại lỗi và payload) hoặc **`yield call`** đến một hàm xử lý lỗi.

#### Classify Error (Phân loại lỗi)

Worker Saga nên cố gắng phân loại lỗi trước khi gửi đi:

*   **Network Errors:** (Không kết nối)
*   **Server Errors:** (4xx, 5xx)
*   **Client Errors:** (Lỗi dữ liệu đầu vào)

#### Log bằng Middleware (Logging)

*   **Saga Worker:** Sau khi bắt lỗi, Worker Saga `yield call(Logger.log, classifiedError)`.
*   **Redux Middleware (Không phải Saga):** Redux middleware có thể lắng nghe action lỗi (`ERROR_REPORTED`) và thực hiện logging ra các dịch vụ bên ngoài (Sentry, Google Analytics) trước khi action đến Reducer.

#### Tổ chức Folder Structure (Ví dụ)

*   `src/sagas/`: Chứa các Sagas.
    *   `src/sagas/product/product.saga.js`: Chứa `fetchProducts` (Worker) và `watchProducts` (Watcher).
    *   `src/sagas/error/error.saga.js`: Chứa Error Handler Saga trung tâm.
*   `src/services/`: Chứa các hàm hỗ trợ và API wrappers.
    *   `src/services/api.js`: Chứa hàm `fetchProductsApi` (API Wrapper, Pattern 2).

---

### 4. Tóm tắt Best Practices về Xử lý lỗi (Security & Product Apps)

**Lưu ý:** Nguồn chỉ đề cập đến việc sử dụng `try/catch` và `put` action thất bại kèm theo đối tượng `error`. Nguồn không cung cấp thông tin cụ thể về **security (token, sensitive info)** hay **sanitizing message**. Dưới đây là checklist dựa trên logic suy luận từ việc xử lý lỗi trong môi Wng Redux-Saga, làm rõ rằng những điểm này không được hỗ trợ trực tiếp bởi nguồn.

1.  **Không bao giờ `put` Error Object trực tiếp:** Tránh `yield put({ type: 'FAILURE', error })` nếu `error` chứa thông tin nhạy cảm. Chỉ trích xuất thông tin cần thiết (`message`, `status code`).
2.  **Sanitize Error Message:** Trước khi hiển thị lỗi cho người dùng cuối, đảm bảo thông báo lỗi không chứa chi tiết server hoặc lỗi cơ sở dữ liệu.
3.  **Log An toàn:** Khi log lỗi, không bao gồm các token, mật khẩu, hoặc dữ liệu nhạy cảm khác. Logs chỉ nên chứa metadata (ID người dùng, thời gian, loại lỗi).
4.  **Bắt Lỗi Sớm:** Luôn bắt lỗi cục bộ bằng `try/catch` hoặc API Wrapper để ngăn lỗi lan truyền và làm **chấm dứt toàn bộ cây Saga**.
5.  **Sử dụng `onError` Hợp lý:** Chỉ dùng `onError` hook như một **phương sách cuối cùng** cho các lỗi không mong đợi, không phải là bộ xử lý lỗi toàn cục.
6.  **Kiểm tra Null/Undefined:** Trước khi truy cập thuộc tính của `error` hoặc `response`, hãy kiểm tra sự tồn tại của chúng (đặc biệt khi sử dụng API Wrapper).
7.  **Định nghĩa Action Lỗi Rõ ràng:** Đảm bảo mỗi action thất bại có type rõ ràng (`PRODUCT_FETCH_FAILED`) để Reducer có thể phản ứng chính xác.
8.  **Tách Biệt Logic Xử lý:** Giữ cho Sagas (chỉ `put` action lỗi) tách biệt khỏi logic thông báo hoặc log lỗi (sử dụng `call` đến các service bên ngoài).
9.  **Kiểm thử Trường hợp Thất bại:** Luôn viết kiểm thử cho block `catch` bằng cách sử dụng `iterator.throw(error)`.
10. **Tùy chỉnh Xử lý Lỗi:** Xem xét việc sử dụng **Safe Wrapper** để ngăn lỗi forked task lan truyền nếu không muốn lỗi bubble up.

---

### 5. Cheatsheet kiểm thử và debug lỗi trong Redux-Saga

#### Phân biệt Lỗi trong Saga

| Loại Lỗi | Mô tả | Cách Debug/Kiểm thử |
| :--- | :--- | :--- |
| **Lỗi Asynchronous (Từ Effect)** | Lỗi xảy ra khi Middleware thực thi một Effect (ví dụ: Promise rejection từ `call`). | Lỗi này được ném vào Generator, xử lý bằng `try/catch`. Kiểm thử bằng `iterator.throw(error)`. |
| **Lỗi Synchronous (Từ Worker/Watcher)** | Lỗi JavaScript thông thường trong thân hàm Generator (ví dụ: truy cập biến `undefined`). | Lỗi này cũng bị ném và có thể được bắt bằng `try/catch` bên ngoài logic bất đồng bộ (nếu có). |
| **Lỗi từ Worker Saga** | Lỗi không được bắt trong Worker Saga, lan truyền lên tác vụ cha. | Theo dõi chuỗi `yield call` và đảm bảo `try/catch` bao bọc logic rủi ro. |
| **Lỗi từ Watcher Saga** | Lỗi trong Watcher (thường là logic đồng bộ) có thể gây ảnh hưởng nghiêm trọng hơn nếu không được bắt. | Lỗi trong tác vụ forked sẽ lan truyền lên Watcher. Nếu Watcher không bắt, nó tiếp tục lan truyền lên Root Saga và **chấm dứt** cây. |

#### Cách mô phỏng lỗi khi `yield call(fn)` (Ví dụ Jest)

Phương pháp chuẩn để kiểm thử trường hợp thất bại là sử dụng phương thức `.throw()` của Generator:

```javascript
// Sử dụng thư viện kiểm thử như Jest/Mocha
describe('fetchProducts Saga Failure', () => {
    it('should handle API failure and dispatch PRODUCTS_REQUEST_FAILED', () => {
        const iterator = fetchProducts();
        
        // 1. Bước 1: Kiểm tra Effect call
        // Saga yield call(Api.fetch, '/products')
        expect(iterator.next().value).toEqual(
            call(Api.fetch, '/products')
        );

        // 2. Bước 2: Mô phỏng lỗi
        const fakeError = { message: 'Network error' };
        
        // Sử dụng .throw(error) để buộc Generator chạy block 'catch'
        // Giá trị trả về phải là Effect put() trong block catch
        expect(iterator.throw(fakeError).value).toEqual(
            put({ type: 'PRODUCTS_REQUEST_FAILED', error: fakeError })
        );
        
        // 3. Bước 3: Đảm bảo Saga kết thúc
        expect(iterator.next().done).toBe(true);
    });
});
```

**Mô tả:** Khi ta gọi `iterator.throw(fakeError)`, ta đang mô phỏng việc Redux-Saga Middleware ném lỗi vào Generator sau khi `call(Api.fetch)` thất bại. Điều này kiểm tra chính xác rằng block `catch` được thực thi và yield đúng action thất bại.