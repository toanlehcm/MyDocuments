# Giải thích tại sao config như vậy lại không bị lỗi và import không cần đuôi mở rộng: "module": "esnext", "moduleResolution": "bundler".

**Giải thích chi tiết:**

### 1. **`"module": "esnext"`**
- Cho phép TypeScript sử dụng cú pháp module ES6+ mới nhất (`import`/`export`).
- Không ép buộc phải ghi đuôi file trong import.

### 2. **`"moduleResolution": "bundler"`**
- Đây là tùy chọn **mới** trong TypeScript 5.0+, được thiết kế cho các **bundler** (webpack, Vite, esbuild, Parcel, etc.).
- Bundler sẽ tự động resolve đuôi file (`.ts`, `.tsx`, `.js`, `.jsx`) nên **không cần ghi rõ đuôi file** khi import.
- Khác với `"moduleResolution": "node16"` hoặc `"nodenext"`, chế độ này **không ép buộc** phải viết đuôi file như `.js`.

---

### **Tại sao không bị lỗi?**

- Với `"moduleResolution": "bundler"`, TypeScript **giả định** rằng bundler sẽ xử lý việc resolve file.
- Khi bạn viết:
  ```ts
  import App from './App';
  ```
  TypeScript sẽ **không báo lỗi** vì nó tin rằng bundler (ví dụ: Vite, webpack) sẽ tự tìm file `App.tsx` hoặc `App.ts`.

---

### **So sánh các `moduleResolution`:**

| `moduleResolution` | Cần ghi đuôi file? | Dùng cho |
|--------------------|-------------------|----------|
| `"node"`           | ❌ Không          | Node.js (deprecated) |
| `"node10"`         | ❌ Không          | Node.js cũ |
| `"node16"`         | ✅ Có            | Node.js ESM (strict) |
| `"nodenext"`       | ✅ Có            | Node.js ESM (strict) |
| `"bundler"`        | ❌ Không          | Webpack, Vite, esbuild, Parcel |

---

### **Kết luận:**

- Config hiện tại (`"moduleResolution": "bundler"`) là **đúng** cho dự án React + Vite/Webpack.
- **Không cần ghi đuôi file** vì bundler sẽ tự resolve.
- Nếu dùng Node.js thuần (không có bundler), nên đổi sang `"node16"` hoặc `"nodenext"` và **phải ghi đuôi file** `.js` khi import.