```ts
const SignupForm = () => {
  // Notice that we have to initialize ALL of fields with values. These
  // could come from props, but since we don't want to prefill this form,
  // we just use an empty string. If you don't do this, React will yell
  // at you.

  // Pass the useFormik() hook initial form values and a submit function that will
  // be called when the form is submitted
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
    },
    validate,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const buildSearchIndex = (items) => {
    console.log("🔨 buildSearchIndex running");
    return; /* big computation */
  };

  const [searchIndex] = useState(buildSearchIndex(1));

  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="firstName">First Name</label>
      <input id="firstName" name="firstName" type="text" onChange={formik.handleChange} value={formik.values.firstName} />
      {formik.errors.firstName ? <div>{formik.errors.firstName}</div> : null}

      <label htmlFor="lastName">Last Name</label>
      <input id="lastName" name="lastName" type="text" onChange={formik.handleChange} value={formik.values.lastName} />
      {formik.errors.lastName ? <div>{formik.errors.lastName}</div> : null}

      <label htmlFor="email">Email Address</label>
      <input id="email" name="email" type="email" onChange={formik.handleChange} value={formik.values.email} />
      {formik.errors.email ? <div>{formik.errors.email}</div> : null}

      <button type="submit">Submit</button>
    </form>
  );
};

t muốn áp dụng lazy initializer vào SignupForm.
mỗi lần user typing firstName thì function buildSearchIndex bị gọi lại
typing 1 lần thì log ra 1 lần
```

Chuẩn bài luôn 👍
Bạn đang **chứng minh đúng 100% vấn đề mà skill “Use Lazy State Initialization” nói tới**.

Mình đi từng bước, rất cụ thể, gắn chặt vào **SignupForm của bạn**.

---

## 1️⃣ Vì sao hiện tại `buildSearchIndex` bị gọi mỗi lần user gõ?

### Code hiện tại của bạn

```js
const [searchIndex] = useState(buildSearchIndex(1));
```

👉 Đây là mấu chốt.

### Điều thực sự xảy ra khi React render

React **KHÔNG** gọi `buildSearchIndex` ở đây.
👉 **JavaScript gọi trước**.

Mỗi lần component render:

```js
buildSearchIndex(1); // ← JS chạy ngay
useState(result); // ← React chỉ nhận kết quả
```

Khi user gõ vào `firstName`:

- Formik update state
- Component re-render
- JS chạy lại toàn bộ function body
- 👉 `buildSearchIndex(1)` chạy lại
- 👉 `console.log` in ra **mỗi lần gõ**

📌 **React không sai – bạn gọi hàm trước khi đưa cho React**

---

## 2️⃣ Áp dụng Lazy Initializer đúng cách cho SignupForm

### ✅ Cách sửa DUY NHẤT cần làm

```js
const [searchIndex] = useState(() => buildSearchIndex(1));
```

### Code đầy đủ (đã sửa đúng)

```js
const SignupForm = () => {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
    },
    validate,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const buildSearchIndex = (items) => {
    console.log("🔨 buildSearchIndex running");
    return; // expensive computation
  };

  // ✅ Lazy initialization
  const [searchIndex] = useState(() => buildSearchIndex(1));

  return (
    <form onSubmit={formik.handleSubmit}>
      <input name="firstName" onChange={formik.handleChange} value={formik.values.firstName} />
      <input name="lastName" onChange={formik.handleChange} value={formik.values.lastName} />
      <input name="email" onChange={formik.handleChange} value={formik.values.email} />
      <button type="submit">Submit</button>
    </form>
  );
};
```

---

## 3️⃣ Sau khi sửa → hành vi thực tế thay đổi thế nào?

### ❌ Trước khi sửa

User gõ `John`:

```
🔨 buildSearchIndex running
🔨 buildSearchIndex running
🔨 buildSearchIndex running
🔨 buildSearchIndex running
```

→ **1 ký tự = 1 lần chạy hàm nặng**

---

### ✅ Sau khi sửa

Khi component mount:

```
🔨 buildSearchIndex running
```

User gõ bao nhiêu cũng **KHÔNG LOG THÊM LẦN NÀO**.

🔥 Đây là **bằng chứng thực tế rõ ràng nhất**.

---

## 4️⃣ React làm gì “bên dưới” để đạt được điều này?

### Khi bạn viết

```js
useState(() => buildSearchIndex(1));
```

React hiểu:

> “À, initialState là **một function**, vậy chỉ gọi nó **ở lần render đầu tiên**”

Pseudo-behavior (đơn giản hóa):

```js
if (isFirstRender) {
  state = initializer();
} else {
  state = previousState;
}
```

📌 Các render sau:

- React **bỏ qua hoàn toàn function**
- Không gọi lại
- Không quan tâm reference có đổi hay không

➡ Đây **KHÔNG** phải vì function là reference
➡ Mà vì **React có rule riêng cho function initializer**

---

## 5️⃣ Trả lời thẳng câu hỏi của bạn

### ❓ “Có phải function là tham chiếu nên React không tính lại?”

❌ **Không phải lý do chính**

✔ **Lý do đúng**:

- React **chỉ gọi function initializer ở render đầu tiên**
- Sau đó React **cache state value**
- Các render sau **bỏ qua initializer**

---

## 6️⃣ Khi nào BẮT BUỘC dùng lazy initializer?

Dùng khi:

- Hàm:
  - Tốn CPU
  - Loop lớn
  - Build index
  - Parse data

- State:
  - Không cần tính lại theo mỗi render
  - Chỉ cần lúc mount

### Ví dụ rất thực tế

- Build search index
- Parse JSON lớn
- Normalize API data
- Create Map / Set lớn
- Init Web Worker config

---

## 7️⃣ Tóm gọn để bạn giải thích cho người khác (1 phút)

> ❝ `useState(expensive())` → hàm chạy mỗi lần render
> `useState(() => expensive())` → React chỉ chạy hàm **1 lần lúc mount** ❞

Hoặc ngắn hơn:

> **Lazy initializer giúp tránh chạy lại logic nặng khi component re-render vì state không liên quan.**

---

Nếu bạn muốn, bước tiếp theo mình có thể:

- Gắn **React Profiler** để thấy thời gian render giảm
- So sánh `useState` vs `useMemo`
- Chỉ ra **khi nào KHÔNG nên dùng lazy initializer**

Cứ nói 👌
