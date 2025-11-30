# Eslint bắt lỗi gì? typeScript bắt lỗi gì? Cà 2 có giống nhau không?

Dưới đây là câu trả lời **ngắn – rõ – dễ hiểu – đúng bản chất** để bạn phân biệt ESLint và TypeScript khi bắt lỗi **null pointer / undefined / type / runtime**.

---

# 🟥 1. ESLint bắt lỗi gì?

## 🔍 ESLint = BẮT LỖI “CODE STYLE + LOGIC” Ở MỨC ĐỘ JAVASCRIPT

ESLint không hiểu type thật như TypeScript.

### ✔ ESLint bắt được:

- Code smell (mùi lỗi)
- Lỗi logic đơn giản
- Lỗi syntax
- Lỗi JSX sai
- Lỗi biến không dùng
- Lỗi undefined variable (không tồn tại trong scope)
- Lỗi so sánh `==` thay vì `===`
- Lỗi import sai format
- Lỗi `console.log`
- Lỗi duplicate key trong object
- Lỗi React missing key
- Lỗi async không await
- Lỗi unused import

### ⚠️ ESLint KHÔNG BẮT ĐƯỢC

- null pointer thực sự
  (vd `a.b.c` nhưng `a` có thể là `null`)
- sai type (vd truyền string vào hàm đòi number)
- lỗi dữ liệu runtime

👉 ESLint chỉ “PHỎNG ĐOÁN” điều kiện bằng rule:

```js
"@typescript-eslint/no-unnecessary-condition": "error"
```

Nhưng nó **không biết type thật**.

---

# 🟦 2. TypeScript bắt lỗi gì?

## 🔍 TypeScript = BẮT LỖI “TYPE + NULL + UNDEFINED” TRƯỚC KHI CHẠY CODE

TS phân tích kiểu dữ liệu, giúp detect lỗi mà ESLint không thấy được.

### ✔ TypeScript bắt được:

- `null / undefined` có khả năng xảy ra
- sai type khi truyền vào function
- object không có field
  (vd obj.name nhưng obj không có name)
- biến có thể undefined nhưng vẫn sử dụng
- thiếu return value
- function trả về kiểu sai
- lỗi Promise không đúng type
- lỗi optional chaining cần thiết
- lỗi index safety

Ví dụ:

```ts
const user: User | null = null;

console.log(user.name); // TS ERROR
```

→ ESLint KHÔNG báo lỗi, nhưng TypeScript báo.

### ✔ TS cũng bắt cả lỗi build render trong React:

- props sai type
- component không nhận đúng dữ liệu
- sai kiểu của state/hook
- sai generic type

---

# 🟩 3. ESLint và TypeScript có giống nhau không?

## 🚫 KHÔNG GIỐNG

→ Chúng **bổ trợ** nhau.

| Tiêu chí               | ESLint       | TypeScript           |
| ---------------------- | ------------ | -------------------- |
| Bắt lỗi code style     | ✔            | ✖                    |
| Bắt lỗi logic JS       | ✔            | ✖                    |
| Bắt lỗi type           | ✖            | ✔                    |
| Bắt lỗi null/undefined | ⚠️ đoán      | ✔ chính xác          |
| Bắt lỗi React hook     | ✔            | ✖                    |
| Bắt lỗi runtime        | ✖            | ✖                    |
| Mục tiêu               | Quy tắc code | An toàn kiểu dữ liệu |

---

# 🟨 4. Kết luận dễ nhớ

- **ESLint** = Quy tắc code, hạn chế bug logic → giúp code “đẹp và đúng”.
- **TypeScript** = Bảo vệ type, tránh null pointer → giúp code “an toàn và không crash”.

👉 Cả 2 **không trùng nhau**,
👉 nhưng “khi cấu hình đúng” → chúng bổ trợ để **giảm 99% null pointer runtime**.

---

Nếu bạn muốn, mình có thể tạo cho bạn:

✅ Full config ESLint + TS strict
✅ Bắt tối đa null/undefined
✅ Tích hợp vào NextJS
✅ File mẫu copy vào chạy liền
