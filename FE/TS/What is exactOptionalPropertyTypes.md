# What is exactOptionalPropertyTypes

**Giải thích `exactOptionalPropertyTypes`:**

---

## **`exactOptionalPropertyTypes` là gì?**

Là một TypeScript compiler option **kiểm soát chặt chẽ** cách xử lý **optional properties** (`?:`).

---

## **So sánh `true` vs `false`:**

### **Khi `false` (default, lỏng lẻo hơn):**

```typescript
interface User {
  name?: string; // Tương đương: string | undefined
}

// ✅ Cho phép tất cả:
const user1: User = { name: 'John' };
const user2: User = { name: undefined }; // ✅ OK
const user3: User = {};                   // ✅ OK
```

**Vấn đề:**
- `name?: string` được hiểu là `name?: string | undefined`
- Có thể **vô tình** pass `undefined` mà không nhận ra

---

### **Khi `true` (strict, an toàn hơn):**

```typescript
interface User {
  name?: string; // CHỈ string, KHÔNG bao gồm undefined
}

// ✅ OK:
const user1: User = { name: 'John' };
const user3: User = {};

// ❌ ERROR:
const user2: User = { name: undefined }; 
// Type 'undefined' is not assignable to type 'string'
```

**Để fix:**
```typescript
interface User {
  name?: string | undefined; // Phải explicit nếu muốn accept undefined
}

const user2: User = { name: undefined }; // ✅ Now OK
```

---

## **Ví dụ thực tế trong project:**

### **Case 1: Component Props**

#### **❌ Khi `false` - có thể gây bug:**

```tsx
interface ButtonProps {
  label?: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ label, onClick }) => {
  return <button onClick={onClick}>{label}</button>;
};

// ⚠️ Với exactOptionalPropertyTypes: false
<Button label={undefined} onClick={undefined} /> 
// TypeScript không báo lỗi, nhưng runtime có thể crash
```

---

#### **✅ Khi `true` - type-safe:**

```tsx
interface ButtonProps {
  label?: string;
  onClick?: () => void;
}

// ❌ TypeScript sẽ báo lỗi:
<Button label={undefined} onClick={undefined} />
// Error: Type 'undefined' is not assignable to type 'string'

// ✅ Phải làm thế này:
<Button /> // Không truyền gì cả
<Button label="Click me" onClick={() => {}} />
```

---

### **Case 2: StatisticCard Props**

#### **❌ Với `false`:**

```tsx
interface StatisticCardProps {
  prefix?: string;
  suffix?: string;
}

const data = {
  prefix: undefined,  // ⚠️ Không báo lỗi
  suffix: undefined,  // ⚠️ Không báo lỗi
};

<StatisticCard {...data} /> // Runtime bug tiềm ẩn
```

---

#### **✅ Với `true`:**

```tsx
interface StatisticCardProps {
  prefix?: string;
  suffix?: string;
}

const data = {
  prefix: undefined,  // ❌ TypeScript báo lỗi
  suffix: undefined,  // ❌ TypeScript báo lỗi
};

// Phải fix:
const data = {
  prefix: '$',        // ✅ Truyền giá trị thật
  suffix: '%',
};
// hoặc
const data = {};      // ✅ Không truyền gì
```

---

## **Tại sao nên set `true`?**

### **1. Tránh bugs tiềm ẩn:**

```typescript
// exactOptionalPropertyTypes: false
interface Config {
  timeout?: number;
}

function fetchData(config: Config) {
  const timeout = config.timeout ?? 5000; // Fallback
  // ...
}

// ⚠️ Bug tiềm ẩn:
fetchData({ timeout: undefined }); 
// timeout = undefined, không phải 5000!
```

```typescript
// exactOptionalPropertyTypes: true
fetchData({ timeout: undefined }); // ❌ TypeScript error
fetchData({});                     // ✅ OK, timeout = 5000
```

---

### **2. Code rõ ràng hơn:**

```typescript
// ❌ Không rõ ràng (false):
interface Props {
  name?: string; // Có thể là string hoặc undefined?
}

// ✅ Rõ ràng (true):
interface Props {
  name?: string;           // CHỈ string, không có undefined
  age?: number | undefined; // CÓ THỂ undefined (explicit)
}
```

---

### **3. Catch lỗi sớm hơn:**

```typescript
// exactOptionalPropertyTypes: false
function updateUser(updates: { name?: string }) {
  // ⚠️ Lỗi runtime nếu updates.name = undefined
  const upperName = updates.name.toUpperCase(); 
}

updateUser({ name: undefined }); // ⚠️ No TypeScript error, runtime crash

// exactOptionalPropertyTypes: true
updateUser({ name: undefined }); // ❌ TypeScript error (caught early!)
```

---

## **Khi nào cần `| undefined`?**

### **Scenario: API response có thể null/undefined:**

```typescript
interface ApiResponse {
  data?: {
    name: string;
    email: string | undefined; // API có thể trả về undefined
  };
}

const response: ApiResponse = {
  data: {
    name: 'John',
    email: undefined, // ✅ OK vì có | undefined
  },
};
```

---

### **Scenario: Component có thể nhận undefined:**

```tsx
interface InputProps {
  value?: string | undefined; // Cho phép controlled component với undefined
  defaultValue?: string;      // Không cho phép undefined
}

// ✅ OK:
<Input value={undefined} />
<Input defaultValue="Hello" />

// ❌ Error:
<Input defaultValue={undefined} />
```

---

## **Migration guide nếu project cũ set `false`:**

### **Bước 1: Set `true` trong tsconfig.json:**

```json
{
  "compilerOptions": {
    "exactOptionalPropertyTypes": true
  }
}
```

---

### **Bước 2: Fix tất cả errors:**

**Error pattern:**
```typescript
// ❌ Before:
interface Props {
  name?: string;
}
const props = { name: undefined };

// ✅ After:
interface Props {
  name?: string | undefined; // Explicit undefined
}
const props = { name: undefined };

// Or:
const props = {}; // Không truyền gì
```

---

### **Bước 3: Update component patterns:**

```tsx
// ❌ Before:
<MetricCard
  prefix={data.prefix}     // có thể undefined
  suffix={data.suffix}     // có thể undefined
/>

// ✅ After Option 1: Conditional spreading
<MetricCard
  {...(data.prefix && { prefix: data.prefix })}
  {...(data.suffix && { suffix: data.suffix })}
/>

// ✅ After Option 2: Update interface
interface MetricCardProps {
  prefix?: string | undefined;
  suffix?: string | undefined;
}
```

---

## **Recommendation cho project:**

### **✅ Nên giữ `true` vì:**

1. **Type safety tốt hơn** - Catch bugs sớm
2. **Code rõ ràng hơn** - Explicit intent
3. **Best practice** - Theo chuẩn TypeScript strict mode
4. **Tránh runtime errors** - Undefined handling

### **❌ Chỉ set `false` khi:**

1. Migrate project cũ (tạm thời)
2. Work với legacy code
3. Third-party library không compatible

---

## **Tóm tắt:**

| Setting | Behavior | Khuyến nghị |
|---------|----------|-------------|
| `"exactOptionalPropertyTypes": true` | `name?: string` = chỉ string, **không** bao gồm undefined | ⭐⭐⭐⭐⭐ Recommended |
| `"exactOptionalPropertyTypes": false` | `name?: string` = `string \| undefined` | ⭐⭐ Legacy projects only |

**Best practice: Giữ `true` và explicit `| undefined` khi cần thiết! 🚀**