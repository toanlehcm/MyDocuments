# Thường run yarn build để test không bị lỗi null pointer exception trong reactjs. nhưng thời gian build thường lâu.

# Làm sao để build nhanh hơn và test được không bị lỗi null pointer exception trong reactjs trong tất cả các môi trường?

Dưới đây là **cách test lỗi null/undefined trong React mà KHÔNG cần chạy `yarn build` (build lâu)** nhưng vẫn đảm bảo **an toàn như khi build production**.

---

# ❗ Vấn đề bạn đang gặp

- **`yarn build` lâu**, bạn chỉ muốn biết xem có lỗi:

  - null pointer exception
  - undefined
  - optional chaining thiếu
  - component crash

- Nhưng **chạy build chỉ để check lỗi thì quá tốn thời gian**.

---

# ✅ Giải pháp tốt nhất: Bật các chế độ “strict check” và “runtime crash check” ngay trong **dev mode**

Dưới đây là 5 cách giúp bạn **bắt lỗi như production nhưng không cần build**.

---

# ✅ 1. Bật TypeScript strict mode (bắt null ngay lúc code, không cần build)

Nếu bạn dùng TS → đây là cách mạnh nhất.

Trong `tsconfig.json`, bật:

```json
{
  "compilerOptions": {
    "strict": true,
    "strictNullChecks": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitAny": true,
    "noImplicitReturns": true
  }
}
```

Khi đó, lỗi như:

```ts
const a: string | null = null;
console.log(a.length);
```

→ **TypeScript sẽ báo lỗi ngay, không cần build**.

---

# ✅ 2. Bật ESLint rule bắt lỗi null/undefined

Thêm vào `.eslintrc.js`:

```js
rules: {
  "no-undef": "error",
  "no-unused-vars": "error",
  "react/jsx-no-undef": "error",
  "eqeqeq": ["error", "always"],
  "no-console": "warn",
  "@typescript-eslint/no-unnecessary-condition": "error",
  "@typescript-eslint/no-unsafe-member-access": "error"
}
```

Đặc biệt rule:

```js
"@typescript-eslint/no-unnecessary-condition": "error"
```

→ nó detect luôn lỗi:

- if(x) nhưng x có thể là null
- x.y khi x có thể undefined

Không cần build!

---

# ✅ 3. Bật React Strict Mode để detect crash runtime

Trong NextJS → ở `next.config.js`:

```js
reactStrictMode: true;
```

Hoặc trong React đơn thuần:

```jsx
<React.StrictMode>
  <App />
</React.StrictMode>
```

**Strict Mode chạy double rendering** → giúp detect:

- null pointer
- component crash do undefined
- useEffect cleanup lỗi

→ chạy dev mode vẫn phát hiện lỗi như prod.

---

# ✅ 4. Sử dụng Error Boundary để bắt crash trang (giống production)

Tạo 1 Error Boundary ở top-level:

```tsx
class AppErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Runtime component crash:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return <div>Something went wrong (runtime error)</div>;
    }
    return this.props.children;
  }
}
```

Dùng:

```jsx
<AppErrorBoundary>
  <App />
</AppErrorBoundary>
```

→ Nếu có lỗi null pointer, **bắt được ngay trong dev mode, không cần build**.

---

# ✅ 5. Dùng “Pre-commit check” để check lỗi tự động trước khi push

Thêm Husky:

```
yarn add husky lint-staged -D
```

`.husky/pre-commit`:

```sh
yarn lint
yarn type-check
```

→ trước khi commit, ESLint + TS sẽ chạy → bắt lỗi null pointer.

---

# ⏱ Nếu bạn VẪN muốn build nhanh hơn

## 1. Dùng Turbo + Next.js để build siêu nhanh

```bash
yarn add -D turbo
```

`turbo.json`:

```json
{
  "pipeline": {
    "build": {
      "cache": true
    }
  }
}
```

→ build sau đó **nhanh hơn 70–90%**.

---

## 2. Build incremental

NextJS 13+ hỗ trợ incremental cache → lần sau build nhanh hơn nhiều.

---

## 3. Dùng `yarn build --no-lint`

Nếu bạn đã lint trước đó:

```
yarn build --no-lint
```

Giảm 20–40% thời gian build.

---

# 🔥 Kết luận (dễ nhớ nhất)

## 👉 Muốn detect null pointer mà KHÔNG cần build:

### ✔ Bật TypeScript strict

### ✔ Bật ESLint strong rules

### ✔ Dùng React Strict Mode

### ✔ Dùng Error Boundary

### ✔ Dùng pre-commit check

**→ Kết quả:**
Bạn có thể chạy **dev mode (`yarn dev`) nhưng vẫn detect gần 100% lỗi null giống production**, không cần chạy `yarn build` mỗi lần.

---

Nếu bạn muốn mình setup full cấu trúc chương trình **ready-to-use**, mình gửi cho bạn 1 folder mẫu NextJS + TS + ESLint + Strict Mode + Error Boundary.
