```
5.10 Use Lazy State Initialization
Impact: MEDIUM (wasted computation on every render)

Pass a function to useState for expensive initial values. Without the function form, the initializer runs on every render even though the value is only used once.

Incorrect: runs on every render

function FilteredList({ items }: { items: Item[] }) {
// buildSearchIndex() runs on EVERY render, even after initialization
const [searchIndex, setSearchIndex] = useState(buildSearchIndex(items))
const [query, setQuery] = useState('')

// When query changes, buildSearchIndex runs again unnecessarily
return <SearchResults index={searchIndex} query={query} />
}

Correct: runs only once

function FilteredList({ items }: { items: Item[] }) {
// buildSearchIndex() runs ONLY on initial render
const [searchIndex, setSearchIndex] = useState(() => buildSearchIndex(items))
const [query, setQuery] = useState('')

return <SearchResults index={searchIndex} query={query} />
}

tại sao khi viết useState(() => buildSearchIndex(items)) thì chỉ run 1 lần ở lần render đầu tiên?
cho t ví dụ trong project thực tế để thấy sự khác biệt?
tóm gọn kiến thức để t giải thích cho người khác dễ hiểu?
```

---

Câu này hay nè, vì rất nhiều người **dùng useState sai mà không biết** 😄

---

## 🔥 Vì sao `useState(() => buildSearchIndex(items))` chỉ chạy 1 lần?

React có **2 cách khởi tạo state**:

### ❌ Cách 1 – truyền giá trị trực tiếp

```ts
useState(buildSearchIndex(items));
```

👉 JavaScript sẽ **chạy `buildSearchIndex(items)` ngay lập tức**
→ rồi mới truyền **kết quả** vào `useState`

⛔ Điều này xảy ra **mỗi lần component render lại**

> React KHÔNG kiểm soát được việc bạn đã chạy hàm này rồi — vì nó chỉ nhận **giá trị trả về**, không biết bạn tính nó kiểu gì.

---

### ✅ Cách 2 – truyền **function initializer**

```ts
useState(() => buildSearchIndex(items));
```

Lúc này bạn **không truyền kết quả**, mà truyền **một function**

React hiểu đây là:

> “À, đây là hàm khởi tạo state, chỉ gọi khi cần giá trị ban đầu”

👉 React sẽ **chỉ gọi function này ở lần render đầu tiên**
Những lần re-render sau, React dùng lại state cũ → **không gọi lại nữa**

📌 React docs gọi đây là: **Lazy Initial State**

---

## 🧠 So sánh dễ hiểu

| Viết kiểu                 | Ai gọi hàm? | Gọi khi nào         |
| ------------------------- | ----------- | ------------------- |
| `useState(build())`       | JavaScript  | MỌI render          |
| `useState(() => build())` | React       | CHỈ render đầu tiên |

---

## 🚨 Ví dụ thực tế trong project

### 🎯 Case: Build search index cho danh sách 10.000 sản phẩm

```ts
function buildSearchIndex(products) {
  console.log("BUILDING INDEX...");
  // Giả lập xử lý nặng
  return products.map((p) => ({
    id: p.id,
    keywords: (p.name + p.description).toLowerCase(),
  }));
}
```

---

### ❌ Không dùng lazy init

```ts
const [index] = useState(buildSearchIndex(products));
const [query, setQuery] = useState("");
```

👎 Khi user gõ vào ô search:

```
BUILDING INDEX...
BUILDING INDEX...
BUILDING INDEX...
BUILDING INDEX...
```

Mỗi lần gõ 1 ký tự → component re-render → index bị build lại
💥 Lag UI
💥 Tốn CPU
💥 Tốn pin laptop

---

### ✅ Dùng lazy init

```ts
const [index] = useState(() => buildSearchIndex(products));
const [query, setQuery] = useState("");
```

Console:

```
BUILDING INDEX...   // chỉ 1 lần duy nhất
```

User gõ bao nhiêu ký tự cũng không build lại index nữa
🚀 UI mượt hẳn

---

## 🧩 Khi nào skill này quan trọng?

Rất đáng dùng khi initial state là:

- Xử lý mảng lớn
- Parse JSON lớn từ localStorage
- Tính toán phức tạp (filter/sort/group)
- Tạo map/dictionary từ data

Ví dụ phổ biến:

```ts
const [settings] = useState(() => {
  const raw = localStorage.getItem("settings");
  return raw ? JSON.parse(raw) : defaultSettings;
});
```

Nếu không dùng function → mỗi render đều parse JSON lại 😵

---

## 🧠 Tóm gọn để bạn giải thích cho người khác

> **Lazy state initialization** là cách truyền một hàm vào `useState` để React chỉ tính giá trị ban đầu **một lần duy nhất** khi component mount.
> Nếu truyền kết quả trực tiếp, phép tính sẽ bị chạy lại ở **mọi lần render**, gây lãng phí hiệu năng khi giá trị khởi tạo tốn tài nguyên.

📌 Viết đúng:

```ts
useState(() => expensiveComputation());
```

📌 Tránh viết:

```ts
useState(expensiveComputation());
```

Nếu bạn muốn, mình có thể chỉ luôn **khi nào nên dùng `useMemo` thay vì lazy init** — vì 2 cái này hay bị nhầm lắm.

---

```
tại sao khi viết function trong useState thì react không render lại?
có phải function là tham chiếu, react thấy tham chiếu không thay đổi nên không tính lại mỗi lần component render phải không?
```

Câu hỏi này chứng tỏ bạn đang bắt đầu nhìn React theo cách **bên trong nó hoạt động**, rất tốt 👌

Câu trả lời ngắn gọn là:
👉 **Không phải vì function là reference nên React không chạy lại**
👉 Mà vì **React có cơ chế đặc biệt cho `useState(initializerFn)`**

---

## 🧠 React thực sự làm gì?

Khi bạn viết:

```ts
const [value] = useState(() => expensiveComputation());
```

React hiểu đây là **lazy initializer function**, không phải “giá trị là function”.

### Bên trong React (đơn giản hóa)

Lần render đầu tiên:

```ts
if (isFirstRender) {
  state = initializerFn(); // React CHỦ ĐỘNG gọi hàm
} else {
  state = storedState; // React bỏ qua initializerFn
}
```

Những lần render sau:

👉 React **KHÔNG gọi lại function đó nữa**
👉 React dùng lại state đã lưu trong bộ nhớ nội bộ (fiber hook state)

📌 Vậy nên: **hàm không được chạy lại không phải vì reference giống nhau**, mà vì React **chỉ dùng nó để khởi tạo state lần đầu**

---

## ❗ Nếu React dùng reference để quyết định thì sao?

Giả sử React so sánh reference function như bạn nghĩ:

```ts
useState(() => expensive());
```

Mỗi lần render lại, function `() => expensive()` là **function mới**, reference **khác hoàn toàn**.

Nếu React dựa vào reference:
➡️ Nó phải chạy lại initializer mỗi lần
➡️ Nhưng thực tế **nó không chạy lại**

=> Chứng minh: React **không dùng reference equality ở đây**

---

## 🧩 React phân biệt 2 trường hợp

| Bạn truyền gì            | React hiểu là gì              | Có gọi lại sau render đầu không |
| ------------------------ | ----------------------------- | ------------------------------- |
| `useState(123)`          | Giá trị thường                | ❌ Không                        |
| `useState(someFunction)` | **Giá trị state là function** | ❌ Không                        |
| `useState(() => 123)`    | **Initializer function**      | ❌ Không (chỉ gọi lần đầu)      |

💡 Điểm đặc biệt:
React **chỉ coi function là initializer khi nó được truyền trực tiếp vào useState**, không phải return từ đâu đó.

---

## Ví dụ để thấy rõ

```ts
const [fn] = useState(() => console.log("hello"));
```

👉 React sẽ **KHÔNG in "hello" mỗi render**
Vì React **không gọi function này**, nó chỉ lưu function đó làm state

Nhưng:

```ts
const [value] = useState(() => {
  console.log("init");
  return 42;
});
```

👉 "init" chỉ log **1 lần duy nhất**

---

## 🔥 Kết luận chính xác

> React không chạy lại function initializer vì nó **chỉ dùng function đó để tính state ban đầu trong lần render đầu tiên**, sau đó bỏ qua hoàn toàn ở các render sau.
> Đây là **cơ chế đặc biệt của useState**, không liên quan đến việc function có cùng reference hay không.

---

## 🧠 Câu tóm gọn để bạn giải thích cho người khác

> Khi truyền function vào `useState`, React coi đó là **hàm khởi tạo state** và chỉ gọi nó **một lần khi component mount**. Những lần render sau React dùng lại state đã lưu, nên hàm không bị gọi lại. Điều này là cơ chế của React, không phải do so sánh reference của function.

---

Nếu bạn hiểu được chỗ này, bạn đã nắm được một phần cách **React Hooks lưu state theo thứ tự render** rồi đó. Muốn mình vẽ sơ đồ cơ chế hook chạy theo index không?
