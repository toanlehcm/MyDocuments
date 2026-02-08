```
t muốn biết cụ thể hơn.
nếu useState(expensiveComputation()) thì useState làm gì bên dưới mà tính toán lại mỗi lần render.
nếu useState(() => expensiveComputation()) thì useState làm gì bên dưới mà chỉ tính toán 1 lần ở lần render khởi tạo đầu tiên, các lần sau không tính toán lại.
t cần 1 dẫn chứng thực tế chứng minh.
cho t link blog hoặc document của react nói về Lazy state initialization
```

Dưới đây là **chứng minh từ tài liệu chính thức của React** nói về cơ chế _lazy state initialization_ mà bạn đang hỏi 👇

---

## 📌 Tài liệu chính thức: React Docs – Hooks API Reference

React docs có hẳn 1 đoạn nói về _lazy initial state_ trong `useState`:

> _“If the initial state is the result of an expensive computation, you may provide a function instead, which will be executed **only on the initial render**.”_ ([typeerror.org][1])

👉 Đây là nguyên lí React sử dụng khi bạn viết:

```js
const [state, setState] = useState(() => expensiveComputation());
```

➡ React **chỉ gọi hàm `expensiveComputation()` một lần duy nhất khi component được mount.** ([typeerror.org][1])

---

## 🧠 Còn nếu bạn viết như thế này:

```js
useState(expensiveComputation());
```

Thì JavaScript sẽ **chạy hàm ngay lập tức tại chỗ**, trước khi React xử lý hook:

➡ `expensiveComputation()` chạy **mỗi lần component render**

➡ React sau đó chỉ “lấy kết quả đó” làm initial state _mà không quan tâm đến kết quả đó nữa_ ở các render sau — nhưng **bạn vẫn đã tốn tài nguyên tính toán mỗi lần render**. ([eslint-react.xyz][2])

---

## 📌 Vì sao React làm thế?

React **lưu trữ giá trị state sau render đầu tiên** cho hook này trong bộ nhớ nội bộ của hook system. Cách React lưu và khôi phục state cho hook là:

1. Khi component mount:
   - Gọi `initialState` hoặc nếu là function initializer → gọi function

2. Sau đó mỗi render sau:
   - React chỉ **lấy state cũ từ bộ nhớ hook**
   - React **không gọi lại initializer function nữa** ([typeerror.org][1])

👉 Vì vậy:

```js
useState(() => expensiveComputation());
```

chỉ chạy hàm **1 lần trên mount**, còn

```js
useState(expensiveComputation());
```

chạy hàm **mỗi lần render (do JavaScript chứ không phải React)** ([eslint-react.xyz][2])

---

## 🧠 Ví dụ thực tế để chứng minh

Giả sử bạn có một hàm rất nặng:

```js
function buildSearchIndex(items) {
  console.log("🔨 buildSearchIndex running");
  return; /* big computation */
}
```

### ❌ Không viết lazy initializer

```js
const [searchIndex] = useState(buildSearchIndex(items));
```

Khi component render lại (ví dụ lúc user gõ ký tự trong input):

```
🔨 buildSearchIndex running
🔨 buildSearchIndex running
🔨 buildSearchIndex running
```

Bạn sẽ thấy log **xuất hiện mỗi lần render** — tức là tiêu tốn CPU O(n) mỗi lần render 😞

---

### ✅ Viết lazy initializer

```js
const [searchIndex] = useState(() => buildSearchIndex(items));
```

Login console:

```
🔨 buildSearchIndex running   // chỉ 1 lần
```

👉 Sau đó, dù component render 10–20 lần do state, context, props thay đổi:

🔥 bạn **không thấy log nữa**
🔥 hàm không chạy nữa
🔥 React reuse state đã lưu ([DEV Community][3])

---

## 🧠 Tóm gọn nguyên lí để giải thích người khác

**`useState(initialValue)`**
👉 JavaScript tính toán `initialValue` ngay tại chỗ
👉 Component render mấy lần thì tính mấy lần
✘ Không hiệu quả nếu computation nặng

**`useState(() => initialValue)`**
👉 Truyền **function initializer** cho React
👉 React chỉ **chạy function này 1 lần** khi component mount
✔ Giảm wasted computation trên re-render ([typeerror.org][1])

---

## 📌 Link tài liệu React chính thức

👉 **React Hooks API Reference: useState — lazy initial state**
[https://reactjs.org/docs/hooks-reference.html#lazy-initial-state](https://reactjs.org/docs/hooks-reference.html#lazy-initial-state) ([typeerror.org][1])

---

## 🧠 Để bạn hiểu nhanh bằng một câu

> **Nếu bạn truyền một function cho `useState`, React sẽ gọi function đó _chỉ một lần khi component mount_, và _bỏ qua nó hoàn toàn ở các render sau_.**

---

Nếu bạn muốn mình chỉ thêm **ví dụ đo hiệu năng bằng console.log hoặc profiler** để chứng minh rõ hơn trong app thật, mình có thể làm luôn 👍

[1]: https://typeerror.org/docs/react/hooks-reference?utm_source=chatgpt.com "Hooks API Reference - React Documentation - TypeError"
[2]: https://www.eslint-react.xyz/docs/rules/prefer-use-state-lazy-initialization?utm_source=chatgpt.com "prefer-use-state-lazy-initialization | ESLint React"
[3]: https://dev.to/davidecannerozzi/react-usestate-lazy-initialization-a-complete-guide-1bck?utm_source=chatgpt.com "🚀 React useState Lazy Initialization: A Complete Guide - DEV Community"
