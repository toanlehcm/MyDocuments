Câu này hay nè — vì nó đụng tới **JS execution vs React element identity** 👇

---

## 🧠 Trước tiên: JSX thực chất là gì?

JSX này:

```jsx
<div className="animate-pulse h-20 bg-gray-200" />
```

KHÔNG phải HTML. Nó được compile thành:

```js
React.createElement("div", {
  className: "animate-pulse h-20 bg-gray-200",
});
```

👉 Tức là **mỗi lần chạy lại dòng này là tạo một object mới**

---

## ❌ Khi để trong component

```jsx
function LoadingSkeleton() {
  return <div className="animate-pulse h-20 bg-gray-200" />;
}
```

Mỗi lần `Container` re-render:

1. React gọi lại `LoadingSkeleton()`
2. Dòng JSX chạy lại
3. `React.createElement(...)` tạo **object mới**
4. React phải so sánh element mới với element cũ

➡️ Element bị **recreate mỗi render**

---

## ✅ Khi hoist ra ngoài

```jsx
const loadingSkeleton = <div className="animate-pulse h-20 bg-gray-200" />;
```

Dòng này chạy **một lần duy nhất khi module được load**

Tức là:

- `loadingSkeleton` là **một object cố định trong memory**
- Mỗi lần render, React chỉ nhận lại **cùng một reference**

```js
prevChild === nextChild; // true
```

React thấy:

> “Ủa cái element này y chang cái trước → khỏi diff sâu nữa”

➡️ Không tạo element mới
➡️ Không cần so sánh props
➡️ Ít việc cho reconciliation

---

## 🔍 So sánh trực quan

### Không hoist

```js
render 1 → element A (object ref 0x001)
render 2 → element B (object ref 0x002) ❌ khác ref
render 3 → element C (object ref 0x003) ❌ khác ref
```

### Hoist

```js
module load → element S (ref 0xAAA)

render 1 → dùng ref 0xAAA
render 2 → dùng ref 0xAAA
render 3 → dùng ref 0xAAA
```

---

## ⚡ React tối ưu được gì?

React reconciliation dựa nhiều vào **reference equality**

Khi child là cùng object:

- Không cần recreate fiber cho subtree đó
- Skip diff props
- Skip diff children

Lợi ích nhỏ thôi, nhưng trong list lớn hoặc UI lặp lại nhiều lần thì cộng dồn đáng kể.

---

## ❗ Lưu ý quan trọng

Chỉ hoist được khi element **truly static**

### ❌ Không hoist nếu có props thay đổi

```jsx
const skeleton = <Skeleton width={width} />; // ❌ width thay đổi
```

### ✅ Hoist được khi không phụ thuộc props/state

```jsx
const divider = <hr className="border-gray-200" />;
```

---

## 🎯 Tóm gọn để bạn giải thích lại

> “JSX tạo ra object mới mỗi lần render. Nếu element đó không phụ thuộc props hay state, ta có thể tạo nó một lần bên ngoài component để React tái sử dụng cùng một object, giảm bớt công việc so sánh và tạo lại element.”

Nói đơn giản hơn:

> “Viết trong component → mỗi render tạo đồ mới.
> Viết ngoài component → dùng lại đồ cũ.”

---

## 🧠 Câu nhớ nhanh

👉 **Static JSX nên sống ngoài component để khỏi bị tạo lại mỗi lần render.**

---

Nếu bạn muốn, mình giải thích tiếp tại sao cách này còn giúp **React.memo children** hoạt động hiệu quả hơn nữa không?

---

```
function LoadingSkeleton() {
  return <div className="animate-pulse h-20 bg-gray-200" />
}

const loadingSkeleton = (
  <div className="animate-pulse h-20 bg-gray-200" />
)

react xử lý bên dưới cho hai cách viết này khác nhau như thế nào khi hiển thị trên UI?
tại sao cách thứ 2 dùng biến thì được cho là tối ưu hơn so với cách 1 dùng function?
```

Nice câu hỏi này đúng kiểu “đào tới lõi React” luôn 🔥

Bề ngoài UI **giống hệt nhau**, nhưng **cách React xử lý phía sau khác đáng kể**.

---

# 1️⃣ Cách 1 – Component function

```jsx
function LoadingSkeleton() {
  return <div className="animate-pulse h-20 bg-gray-200" />;
}
```

Khi render:

```jsx
{
  loading && <LoadingSkeleton />;
}
```

### Mỗi lần parent re-render, React làm gì?

1. Tạo **React element** mới cho component:

```js
{
  type: LoadingSkeleton,
  props: {}
}
```

2. Vì `type` là **function component**, React phải:
   - Tạo fiber cho component này
   - **Gọi function `LoadingSkeleton()`**
   - Nhận lại JSX `<div ... />`
   - Tạo tiếp 1 React element cho `<div>`
   - Diff `<div>` này với `<div>` cũ

➡️ Tức là có **2 bước render**:

- Render component
- Render DOM element bên trong

Dù UI không đổi, React **vẫn phải gọi lại function mỗi lần**.

---

# 2️⃣ Cách 2 – Hoisted JSX element

```jsx
const loadingSkeleton = <div className="animate-pulse h-20 bg-gray-200" />;
```

Render:

```jsx
{
  loading && loadingSkeleton;
}
```

### Mỗi lần parent re-render, React làm gì?

React nhận lại **chính xác cùng object**:

```js
{
  type: "div",
  props: { className: "animate-pulse h-20 bg-gray-200" }
}
```

Và quan trọng nhất:

```js
prevChild === nextChild; // true
```

👉 React thấy **reference giống hệt**
→ Không cần gọi component
→ Không cần tạo element mới
→ Không cần chạy diff sâu

➡️ Nó gần như nói:
**“À cái này y chang lần trước, bỏ qua luôn.”**

---

# 🔬 So sánh nội bộ (Fiber work)

|                                     | Function Component | Hoisted JSX                    |
| ----------------------------------- | ------------------ | ------------------------------ |
| Có gọi function mỗi render?         | ✅ Có              | ❌ Không                       |
| Có tạo React element mới?           | ✅ Có              | ❌ Không                       |
| Có tạo fiber cho component?         | ✅ Có              | ❌ Không (chỉ là host element) |
| React diff phải làm việc nhiều hơn? | ✅ Có              | 🚫 Rất ít                      |
| UI kết quả                          | Giống nhau         | Giống nhau                     |

---

# 🧠 Vì sao cách 2 “tối ưu” hơn?

### 🔹 1. Không tạo object mới

JSX trong function:

```js
React.createElement("div", ...)
```

→ chạy lại mỗi render → object mới → React phải kiểm tra

Hoisted JSX:

→ object được tạo **1 lần khi load file**

---

### 🔹 2. Không có component lifecycle

Function component dù đơn giản vẫn là một **layer trừu tượng** mà React phải xử lý.

Hoisted JSX chỉ là:

```
HostComponent (div)
```

Không có:

- render phase cho component
- hooks check
- props resolution

---

### 🔹 3. React bailout sớm hơn

React có cơ chế:

```js
if (oldChild === newChild) return; // bailout
```

Cách 2 thỏa điều kiện này.
Cách 1 thì không bao giờ thỏa vì mỗi lần là `<LoadingSkeleton />` mới.

---

# 🎯 Tóm gọn để bạn nói lại cho người khác

> “Dùng component function thì mỗi lần render React phải gọi lại function để tạo ra JSX mới.
> Hoist JSX ra biến bên ngoài thì React dùng lại cùng một object, khỏi phải tạo lại hay diff nhiều → nhẹ hơn.”

Phiên bản siêu ngắn:

> **Function component = React phải render lại**
> **Hoisted JSX = React tái sử dụng, khỏi render lại**

---

# 🚀 Khi nào khác biệt thấy rõ?

Bình thường thì lợi ích nhỏ.
Nhưng nếu:

- Nằm trong list 1000 items
- UI render liên tục (animation, input typing)
- Deep tree

→ tiết kiệm được **hàng ngàn lần function call + diff**

---

Nếu bạn thích style tối ưu kiểu Vercel/Next.js performance mindset, skill này thường đi chung với:

- `memo`
- `useMemo`
- static object hoisting
- stable callbacks

Muốn mình vẽ sơ đồ flow render của 2 cách cho dễ hình dung không?

---

"Hoisted JSX" in React generally refers to two distinct but related concepts: the JavaScript engine's hoisting behavior within a React component's scope, and a best practice of manually hoisting static JSX elements to optimize performance.
JavaScript Hoisting in React Components
Hoisting is a core JavaScript mechanism where variable and function declarations are moved to the top of their containing scope during the compilation phase. This behavior applies within a React component function.
Function Declarations: Functions declared using the function keyword are fully hoisted (both the declaration and definition). This allows a function to be called before it appears in the code, which is why helper functions can be defined after they are used in the main return's JSX.
var Variables: Declarations using var are hoisted to the top of their scope but are initialized with undefined until the assignment line is reached.
let and const: Variables declared with let and const are also hoisted, but they remain uninitialized and are in a "temporal dead zone" until their declaration is reached. Accessing them before their declaration results in a ReferenceError.
Function Expressions/Arrow Functions: These behave like variables (typically declared with const) and are not fully hoisted. They cannot be used before their declaration line.
Manual JSX Hoisting (Performance Optimization)
A common React best practice (often recommended by linters or the official docs for performance) involves moving static JSX elements outside of a component's render function.
Purpose: This prevents the element from being recreated in memory on every re-render of the parent component. This is particularly useful for complex or static content like SVG icons or loading skeletons.
Mechanism: The static JSX is assigned to a const variable outside the component function. The component then references this pre-defined constant.
Example:
jsx
const loadingSkeleton = (

  <div className="animate-pulse h-20 bg-gray-200" />
); // Hoisted outside the component

function Container() {
// ... component logic ...
return (

<div>
{isLoading && loadingSkeleton} {/_ Uses the hoisted constant _/}
</div>
);
}
Note: If your project uses the React Compiler, this optimization is often handled automatically by the compiler, making manual hoisting less necessary.
Lifting State Up
The term "hoisting" is sometimes informally used to describe "lifting state up," which is the process of moving the state from a child component to a common parent component to coordinate data flow and shared logic. This is a fundamental React pattern but is distinct from the JavaScript hoisting mechanism.
