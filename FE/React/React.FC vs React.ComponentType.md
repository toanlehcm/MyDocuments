Dưới đây là giải thích **cốt lõi** và so sánh **React.FC** và **React.ComponentType** trong TypeScript, kèm liên kết tài liệu chính thức, ví dụ thực tế, và hướng dẫn chọn loại phù hợp cho bài toán icon tùy biến của bạn:

---

## 1️⃣ **React.FC là gì?**

* **Định nghĩa**: `React.FC` (Function Component) là **type helper** trong React để định nghĩa một **functional component**.
* **Tài liệu**: [React TypeScript Cheatsheets – React.FC](https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/function_components/)
* **Tác dụng**: Nó giúp:

  * Tự động thêm kiểu cho `children`.
  * Giúp IntelliSense hiển thị rõ props của component.

---

## 2️⃣ **React.ComponentType là gì?**

* **Định nghĩa**: `React.ComponentType<P>` là một **union type** đại diện **bất kỳ component React nào** (function hoặc class) nhận props kiểu `P`.
* **Tài liệu**: [TypeScript – ComponentType](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/react/index.d.ts#L650)
* **Tác dụng**:

  * Cho phép bạn nhận **bất kỳ component nào** làm prop.
  * Không tự động thêm `children`.

---

## 3️⃣ **Tại sao tạo ra chúng?**

| Mục đích                                                               | React.FC | React.ComponentType |
| ---------------------------------------------------------------------- | -------- | ------------------- |
| Tối ưu gõ kiểu cho **function component** và `children`                | ✅        | ❌                   |
| Cho phép truyền **bất kỳ component nào** (class/function) như một prop | ❌        | ✅                   |
| Hỗ trợ IntelliSense, type safety                                       | ✅        | ✅                   |

---

## 4️⃣ **Cách hoạt động**

* `React.FC<Props>`: Compiler hiểu rằng bạn đang tạo **function component**, sẽ kiểm tra props và tự thêm `children?: ReactNode`.
* `React.ComponentType<Props>`: Compiler hiểu rằng đây có thể là **class** hoặc **function** component, sẽ kiểm tra props nhưng **không thêm children** mặc định.

---

## 5️⃣ **Điều gì xảy ra nếu không dùng**

* **Không dùng**:

  * Bạn có thể dùng `(props: Props) => JSX.Element`, nhưng mất tiện ích như tự động thêm `children`.
  * Với prop nhận component (như Icon), nếu dùng `any`, bạn **mất type checking**: người dùng có thể truyền giá trị không phải component.

* **Dùng**:

  * Có type checking mạnh mẽ, IDE gợi ý tốt.
  * Code dễ đọc, dễ bảo trì, dễ reuse.

---

## 6️⃣ **Cách sử dụng**

### ✅ **React.FC** – Định nghĩa component:

```tsx
import React from 'react';

type ButtonProps = {
  label: string;
};

const Button: React.FC<ButtonProps> = ({ label, children }) => (
  <button>
    {label}
    {children}
  </button>
);
```

### ✅ **React.ComponentType** – Nhận component làm prop:

```tsx
import React from 'react';

type IconProps = React.SVGProps<SVGSVGElement>;

interface IconButtonProps {
  icon: React.ComponentType<IconProps>; // nhận bất kỳ component icon nào
  label: string;
}

const IconButton: React.FC<IconButtonProps> = ({ icon: Icon, label }) => (
  <button>
    <Icon className="w-5 h-5 text-green-500" />
    {label}
  </button>
);

// Sử dụng với RemixIcon:
import { RiHomeLine } from 'react-icons/ri';
<IconButton icon={RiHomeLine} label="Home" />;
```

---

## 7️⃣ **Thay thế bằng cách khác? So sánh rõ ràng**

| Cách viết                       | Ưu điểm                                  | Nhược điểm                                     | Khi nên dùng                            |
| ------------------------------- | ---------------------------------------- | ---------------------------------------------- | --------------------------------------- |
| `(props: Props) => JSX.Element` | Ngắn gọn, không thêm `children` mặc định | Không tự động gõ kiểu `children`               | Khi muốn kiểm soát chặt props           |
| `React.FC<Props>`               | Tự thêm `children`, gợi ý tốt            | Thêm `children` kể cả khi không cần            | Khi tạo function component thông thường |
| `React.ComponentType<P>`        | Dùng để nhận component động (icon, UI)   | Không thêm `children`, cần tự định nghĩa Props | Khi props cần component động            |

---

## 8️⃣ **Ví dụ thực tế – Truyền icon tùy biến (RemixIcon)**

```tsx
import React from 'react';
import { RiEyeLine, RiEyeOffLine } from 'react-icons/ri';

// Props của icon: SVGProps<SVGSVGElement> để user custom class, size, color
type IconProps = React.SVGProps<SVGSVGElement>;

interface PasswordFieldProps {
  IconShow: React.ComponentType<IconProps>;
  IconHide: React.ComponentType<IconProps>;
}

const PasswordField: React.FC<PasswordFieldProps> = ({ IconShow, IconHide }) => {
  const [show, setShow] = React.useState(false);
  const Icon = show ? IconHide : IconShow;

  return (
    <div>
      <input type={show ? 'text' : 'password'} className="border p-2" />
      <button type="button" onClick={() => setShow((s) => !s)}>
        <Icon className="w-5 h-5 text-gray-600 hover:text-black" />
      </button>
    </div>
  );
};

// Sử dụng
<PasswordField IconShow={RiEyeLine} IconHide={RiEyeOffLine} />;
```

---

## 9️⃣ **Khi nào nên dùng loại nào (cho bài toán icon)**

* **Dùng `React.ComponentType<React.SVGProps<SVGSVGElement>>`**:

  * Khi **user cần truyền bất kỳ icon nào** (RemixIcon, HeroIcons, custom SVG).
  * Cho phép họ custom `className`, `width`, `height`, `color`, … mà vẫn an toàn kiểu.

* **Dùng `React.FC`**:

  * Khi bạn định nghĩa **component của chính bạn** (ví dụ: `PasswordField`, `IconButton`).
  * Không dùng `FC` để định nghĩa prop nhận icon — thay vào đó dùng `ComponentType`.

---

## 🔗 **Tài liệu tham khảo chính thức**

1. React.FC:

   * [React TypeScript Cheatsheets – Function Components](https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/function_components/)
2. React.ComponentType:

   * [DefinitelyTyped – ComponentType Definition](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/react/index.d.ts#L650)
3. SVG Props:

   * [TypeScript React – SVGProps](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/react/index.d.ts#L2104)

---

### ✅ **Kết luận**

* **React.FC**: Dùng cho **component bạn định nghĩa**.
* **React.ComponentType**: Dùng khi **nhận component động từ bên ngoài** (như icon).
* Với mục tiêu của bạn (RemixIcon + custom class/size), **`React.ComponentType<React.SVGProps<SVGSVGElement>>`** là lựa chọn chuẩn nhất.
* Kết hợp với RHF, bạn có thể truyền icon vào input component mà vẫn đảm bảo **clean code**, **reuse**, **performance**, và **type safety**.
