Dưới đây là **so sánh cốt lõi** giữa `React.ReactNode`, `React.ReactElement`, và `JSX.Element` trong TypeScript/React, kèm cách dùng, ví dụ, và link tài liệu chính thức:

---

## 1️⃣ **React.ReactNode**

### 📌 **Định nghĩa**

* Là **kiểu tổng quát nhất** đại diện **bất kỳ thứ gì React có thể render**.
* Bao gồm: `string`, `number`, `boolean` (null), `undefined`, `ReactElement`, `Fragment`, mảng các node, v.v.
* **Tài liệu**: [DefinitelyTyped – ReactNode](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/react/index.d.ts#L115)

### 🛠 **Ví dụ**

```tsx
type Props = {
  children: React.ReactNode;
};

const Wrapper = ({ children }: Props) => <div>{children}</div>;

<Wrapper>
  <h1>Hello</h1>
  Text
  {false && 'Hidden'}
</Wrapper>;
```

➡️ Ở đây `children` có thể là chuỗi, số, `JSX.Element`, mảng JSX, hoặc `null`.

---

## 2️⃣ **React.ReactElement**

### 📌 **Định nghĩa**

* Đại diện **một phần tử React cụ thể** được trả về bởi JSX hoặc `React.createElement`.
* Chỉ bao gồm **một cấu trúc React hợp lệ** (không chấp nhận chuỗi, số, hoặc mảng trực tiếp).
* **Tài liệu**: [DefinitelyTyped – ReactElement](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/react/index.d.ts#L119)

### 🛠 **Ví dụ**

```tsx
type Props = {
  icon: React.ReactElement; // Chỉ nhận duy nhất một phần tử React
};

const IconWrapper = ({ icon }: Props) => <span>{icon}</span>;

<IconWrapper icon={<svg width="20" height="20"></svg>} />; // ✅
<IconWrapper icon="Home" />; // ❌ Lỗi: string không phải ReactElement
```

---

## 3️⃣ **JSX.Element**

### 📌 **Định nghĩa**

* Là kiểu **cụ thể hơn của ReactElement** được TypeScript sinh ra khi bạn viết JSX.
* Thường dùng cho **kiểu trả về của component**.
* **Tài liệu**: [TypeScript – JSX](https://www.typescriptlang.org/docs/handbook/jsx.html)

### 🛠 **Ví dụ**

```tsx
const Button = (): JSX.Element => {
  return <button>Click</button>;
};

const element: JSX.Element = <Button />; // ✅
```

➡️ Khi bạn viết JSX, TypeScript ngầm hiểu kiểu trả về của component là `JSX.Element`.

---

## 4️⃣ **So sánh trực quan**

| Đặc điểm            | **React.ReactNode**                                                                                     | **React.ReactElement**                                                                                     | **JSX.Element**                                              |
| ------------------- | ------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| Định nghĩa          | Bất kỳ thứ gì React có thể render                                                                       | Một phần tử React cụ thể                                                                                   | Kết quả JSX của component                                    |
| Chấp nhận `string`? | ✅                                                                                                       | ❌                                                                                                          | ❌                                                            |
| Chấp nhận mảng?     | ✅                                                                                                       | ❌                                                                                                          | ❌                                                            |
| Chấp nhận `null`?   | ✅                                                                                                       | ❌                                                                                                          | ❌                                                            |
| Dùng làm `children` | ✅ (linh hoạt nhất)                                                                                      | Thường không                                                                                               | Không thường                                                 |
| Dùng làm return     | ✅ (ít dùng, JSX.Element phổ biến hơn)                                                                   | Có thể nhưng không cần                                                                                     | ✅ (chuẩn nhất)                                               |
| Tài liệu            | [ReactNode](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/react/index.d.ts#L115) | [ReactElement](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/react/index.d.ts#L119) | [JSX](https://www.typescriptlang.org/docs/handbook/jsx.html) |

---

## 5️⃣ **Khi nào nên dùng loại nào**

### ✅ **Dùng `React.ReactNode`**

* Khi prop/children có thể nhận **bất kỳ nội dung React hợp lệ nào**.
* Ví dụ: Wrapper, Layout, Modal…

```tsx
type ModalProps = { children: React.ReactNode };
```

### ✅ **Dùng `React.ReactElement`**

* Khi bạn muốn nhận **một phần tử React cụ thể**, ví dụ icon hoặc custom component duy nhất.
* Không cho phép chuỗi hoặc số.

```tsx
type IconButtonProps = { icon: React.ReactElement };
```

### ✅ **Dùng `JSX.Element`**

* Khi khai báo **kiểu trả về** của component.
* Giúp rõ ràng hơn rằng component luôn trả về một phần tử React hợp lệ.

```tsx
const App = (): JSX.Element => <div>Hello</div>;
```

---

## 6️⃣ **Ví dụ minh họa đầy đủ**

```tsx
import React from 'react';

// ReactNode cho children
type CardProps = { children: React.ReactNode };
const Card = ({ children }: CardProps): JSX.Element => <div>{children}</div>;

// ReactElement cho icon duy nhất
type IconButtonProps = { icon: React.ReactElement; label: string };
const IconButton = ({ icon, label }: IconButtonProps): JSX.Element => (
  <button>
    {icon} {label}
  </button>
);

const App = (): JSX.Element => {
  return (
    <Card>
      Text content {/* ✅ ReactNode */}
      <IconButton icon={<span>⭐</span>} label="Star" /> {/* ✅ ReactElement */}
    </Card>
  );
};
```

---

### 🔗 **Tài liệu chính thức**

1. **ReactNode**: [DefinitelyTyped – ReactNode](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/react/index.d.ts#L115)
2. **ReactElement**: [DefinitelyTyped – ReactElement](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/react/index.d.ts#L119)
3. **JSX.Element**: [TypeScript Handbook – JSX](https://www.typescriptlang.org/docs/handbook/jsx.html)

---

### 🏁 **Kết luận**

* **`React.ReactNode`** → Linh hoạt nhất, nhận mọi thứ React có thể render → Dùng cho `children` hoặc prop đa dạng.
* **`React.ReactElement`** → Ràng buộc chặt, chỉ nhận một phần tử React → Dùng cho icon hoặc component duy nhất.
* **`JSX.Element`** → Kiểu trả về của component React → Dùng để định nghĩa return type.
  → Đây là **cách clean code và đảm bảo type safety** khi thiết kế component reusable.
