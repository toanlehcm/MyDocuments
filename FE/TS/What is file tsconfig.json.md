# what is file tsconfig.json có vai trò gì trong workflow? tại sao cần thêm code:
```tsx
"baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
    }
```

**Giải thích chi tiết về tsconfig.json:**

---

## **tsconfig.json là gì?**

**Định nghĩa:** File cấu hình của **TypeScript compiler** (tsc).

**Vai trò:** Quy định cách TypeScript:
- Kiểm tra lỗi (type checking)
- Compile TypeScript → JavaScript
- Resolve imports
- Báo lỗi trong IDE (VS Code)

---

## **Vai trò trong workflow:**

### **Giai đoạn 1: Khi bạn viết code (Real-time)**

```
Developer viết code:
  import { MainLayout } from '@/core/components';
              ↓
    VS Code đọc tsconfig.json
              ↓
    TypeScript Language Server chạy:
              ↓
    1. Kiểm tra syntax (cú pháp đúng không?)
    2. Kiểm tra types (kiểu dữ liệu đúng không?)
    3. Resolve alias @ → ./src
    4. Tìm file: ./src/core/components/index.ts
    5. Kiểm tra export có tồn tại không?
              ↓
    Nếu có lỗi → Gạch chân đỏ trong editor
    Nếu đúng → Autocomplete/IntelliSense hoạt động
```

---

### **Giai đoạn 2: Build time (npm run build)**

```
Vite build code:
              ↓
    Vite KHÔNG dùng tsc để compile
    (Vite dùng esbuild - nhanh hơn)
              ↓
    Nhưng Vite VẪN ĐỌC tsconfig.json:
    - Lấy thông tin về paths alias
    - Hiểu cách resolve imports
              ↓
    esbuild transform TypeScript → JavaScript
              ↓
    Output vào dist/
```

**Lưu ý quan trọng:**
- tsconfig.json chủ yếu cho **type checking** và **IDE support**.
- Vite/esbuild **không dùng** tất cả options trong tsconfig.json khi build.
- Nên chạy `tsc --noEmit` để kiểm tra lỗi type trước khi build.

---

## **Tại sao cần thêm `baseUrl` và `paths`?**

### **Vấn đề:**

Không có alias:
```typescript
// File: src/modules/dashboard/pages/DashboardPage.tsx
import { MainLayout } from '../../../core/components/layouts/MainLayout';
import { Button } from '../../../core/components/ui/Button';
import { api } from '../../../core/services/api';
```

❌ **Khó đọc, khó maintain**
❌ **Khi di chuyển file, phải sửa lại tất cả imports**

---

Có alias `@`:
```typescript
// File: src/modules/dashboard/pages/DashboardPage.tsx
import { MainLayout } from '@/core/components/layouts/MainLayout';
import { Button } from '@/core/components/ui/Button';
import { api } from '@/core/services/api';
```

✅ **Rõ ràng, dễ đọc**
✅ **Di chuyển file không ảnh hưởng imports**

---

### **Code giải thích:**

```jsonc
"baseUrl": ".",
"paths": {
  "@/*": ["./src/*"],
}
```

| Option | Giải thích |
|--------|------------|
| `"baseUrl": "."` | Đặt thư mục gốc là `.` (thư mục chứa tsconfig.json) |
| `"@/*"` | Pattern để match (khi thấy import bắt đầu bằng `@/`) |
| `["./src/*"]` | Thay thế bằng `./src/*` (relative to `baseUrl`) |

---

### **Cách hoạt động:**

```typescript
import { MainLayout } from '@/core/components';
              ↓
TypeScript thấy '@/' ở đầu
              ↓
Áp dụng rule: "@/*" → ["./src/*"]
              ↓
Thay '@/' bằng './src/'
              ↓
Kết quả: './src/core/components'
              ↓
Kết hợp baseUrl: . + ./src/core/components
              ↓
Đường dẫn cuối: d:\Sources\pte-demo\src\core\components
              ↓
TypeScript tìm file: 
- d:\Sources\pte-demo\src\core\components\index.ts
- d:\Sources\pte-demo\src\core\components.ts
              ↓
Tìm thấy → Type checking thành công
```

---

## **Mối quan hệ với vite.config.ts:**

### **TypeScript (tsconfig.json):**
```jsonc
"paths": {
  "@/*": ["./src/*"]
}
```
→ **Chỉ để TypeScript hiểu** (type checking, IDE autocomplete)

### **Vite (vite.config.ts):**
```typescript
resolve: {
  alias: {
    '@': path.resolve(__dirname, './src'),
  },
}
```
→ **Để Vite resolve imports thực tế** khi build/dev

**Cần CẢ HAI config:**
- tsconfig.json: TypeScript không báo lỗi trong editor
- vite.config.ts: Vite resolve đúng khi chạy/build

---

## **Giải thích các options quan trọng khác:**

### **1. `"target": "esnext"`**
```jsonc
"target": "esnext",
```
- **Chức năng:** JavaScript version mà TypeScript compile ra.
- **`esnext`**: ES version mới nhất (ES2024+).
- **Tại sao dùng `esnext`?**: Vite/esbuild sẽ tự transform xuống version cũ hơn nếu cần.

---

### **2. `"module": "ESNext"`**
```jsonc
"module": "ESNext",
```
- **Chức năng:** Module system sử dụng.
- **`ESNext`**: Dùng `import`/`export` ES6+ (không phải `require`/`module.exports`).

---

### **3. `"moduleResolution": "bundler"`**
```jsonc
"moduleResolution": "bundler",
```
- **Chức năng:** Cách TypeScript resolve imports.
- **`bundler`**: Giả định có bundler (Vite/webpack) xử lý imports.
- **Lợi ích**: Không cần ghi đuôi file (`.ts`, `.tsx`) khi import.

---

### **4. `"jsx": "react-jsx"`**
```jsonc
"jsx": "react-jsx",
```
- **Chức năng:** Cách compile JSX.
- **`react-jsx`**: Dùng JSX transform mới của React 17+ (không cần `import React`).

**Ví dụ:**
```tsx
// Bạn viết:
<div>Hello</div>

// TypeScript compile thành:
import { jsx as _jsx } from 'react/jsx-runtime';
_jsx('div', { children: 'Hello' });
```

---

### **5. `"strict": true`**
```jsonc
"strict": true,
```
- **Chức năng:** Bật tất cả strict type checking.
- **Bao gồm:**
  - `strictNullChecks`: `null`/`undefined` phải khai báo rõ ràng
  - `strictFunctionTypes`: Kiểm tra function types chặt chẽ
  - `noImplicitAny`: Không cho phép `any` ngầm định

---

## **Workflow tổng thể:**

### **Development:**
```
1. Developer viết code:
   import { MainLayout } from '@/core/components';

2. VS Code đọc tsconfig.json:
   - Resolve @ → ./src
   - Type checking
   - Autocomplete

3. Vite dev server đọc vite.config.ts:
   - Resolve @ → ./src (thực tế)
   - Transform code
   - Serve to browser
```

### **Build:**
```
1. (Optional) Chạy type check:
   tsc --noEmit
   → TypeScript kiểm tra lỗi (dùng tsconfig.json)

2. Vite build:
   - Đọc vite.config.ts (resolve alias)
   - esbuild transform TypeScript → JavaScript
   - Bundle & minify
   - Output vào dist/
```

---

## **Tóm tắt cho người khác:**

> **tsconfig.json**: File cấu hình TypeScript compiler.  
> **Vai trò**:
> - ✅ Type checking trong editor (real-time)
> - ✅ IDE autocomplete/IntelliSense
> - ✅ Quy định cách resolve imports (alias `@`)
> - ❌ KHÔNG compile code khi build (Vite/esbuild làm việc này)
>
> **Tại sao cần `baseUrl` và `paths`?**
> - Tạo alias `@` để import ngắn gọn, dễ đọc
> - Thay vì `../../../core/components` → `@/core/components`
>
> **Quan trọng**: Cần config CẢ HAI:
> - tsconfig.json (cho TypeScript/IDE)
> - vite.config.ts (cho Vite build tool)