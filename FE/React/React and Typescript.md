Dưới đây là phần giải thích chi tiết về các kỹ thuật / types trong React + TypeScript mà bạn hỏi. Mình sẽ trả lời từng phần theo cấu trúc:

> • Nó là gì?
> • Tại sao lại tạo ra nó?
> • Nó hoạt động như thế nào?
> • Điều gì sẽ xảy ra nếu **không** sử dụng nó?
> • Điều gì sẽ xảy ra nếu **sử dụng** nó?
> • Cách sử dụng nó?
> • Ví dụ thực tế cụ thể
> • Khi nào nên dùng loại nào?
> • Có thể thay thế bằng cách khác không? So sánh rõ ràng

Mình sẽ làm cho mỗi mục cho 9 kỹ thuật/types mà bạn liệt kê:

1. `React.forwardRef`
2. `React.PropsWithChildren`
3. `React.ComponentProps`
4. `React.ComponentPropsWithRef`
5. `React.ComponentPropsWithoutRef`
6. `React.ComponentRef`
7. `React.ButtonHTMLAttributes`
8. `React.HTMLAttributes`
9. `React.ElementType`

Vì lượng khá lớn, mình chia thành các phần nhỏ để bạn dễ theo dõi.

---

## 1. React.forwardRef

### Nó là gì?

`React.forwardRef` là một API của React cho phép bạn “forward” (chuyển tiếp) một `ref` từ parent qua một component con, để parent có thể tham chiếu tới node DOM hoặc instance bên trong component con.

### Tại sao lại tạo ra nó?

* Khi bạn viết một functional component bao bọc một phần tử DOM (ví dụ `<input>`), nếu parent muốn lấy ref tới `<input>`, bạn cần cách để component wrapper cho phép nhận `ref` và gán nó xuống DOM thực. Mặc định functional component **không** nhận prop `ref`.
* `forwardRef` giúp làm điều đó: nó cho phép component nhận một argument `ref` và bạn có thể đính `ref` này vào một phần tử DOM bên trong, hoặc tiếp tục chuyển tiếp (forward) tới con của nó.

### Nó hoạt động như thế nào?

* Bạn dùng `React.forwardRef` với một render function có hai tham số: `props`, `ref`.
* Component trả về từ `forwardRef` sẽ nhận prop `ref` từ parent.
* Bên trong, bạn gán `ref` đó vào một phần tử DOM (hoặc một component/class nếu cần).

Ví dụ từ docs:

```tsx
const FancyButton = React.forwardRef<HTMLButtonElement, { children: React.ReactNode }>(
  function FancyButton(props, ref) {
    return <button ref={ref} className="FancyButton">{props.children}</button>
  }
);

const ref = React.createRef<HTMLButtonElement>();
<FancyButton ref={ref}>Click me</FancyButton>;
```

### Điều gì sẽ xảy ra nếu không sử dụng nó?

* Nếu bạn không dùng `forwardRef`, component của bạn sẽ không nhận được prop `ref`. Nếu parent đặt `<YourComponent ref={someRef} />`, `someRef.current` sẽ **null** hoặc React sẽ cảnh báo (nếu functional).
* Bạn sẽ không thể từ parent làm việc như “focus”, “scrollIntoView”, “measure”, etc. đối với phần tử DOM bên trong component con wrapper.

### Điều gì sẽ xảy ra nếu sử dụng nó?

* Cho phép component wrapper cung cấp “hụi” hoặc “ổ cắm” (hook) tới phần tử DOM bên trong.
* Tăng khả năng tái sử dụng component trong thư viện UI, vì người dùng có thể lấy ref tới DOM khi cần.

### Cách sử dụng nó?

```tsx
import React, { forwardRef, useRef } from 'react';

type FancyInputProps = {
  placeholder?: string;
};

const FancyInput = forwardRef<HTMLInputElement, FancyInputProps>(function FancyInput(props, ref) {
  return <input {...props} ref={ref} />;
});

function Parent() {
  const inputRef = useRef<HTMLInputElement>(null);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <>
      <FancyInput ref={inputRef} placeholder="Type here" />
      <button onClick={focusInput}>Focus the input</button>
    </>
  );
}
```

### Ví dụ thực tế cụ thể

* Khi bạn làm form với React Hook Form / tập trung vào input sau khi lỗi validation, bạn muốn input nhận `focus`. Nếu input wrapper không forwardRef, thì `ref` parent không thể `.focus()`.
* Khi bạn làm animation / scroll: mở modal, muốn scroll tới phần tử bên trong modal, bạn cần ref tới DOM node. Nếu modal wrapper không forwardRef, khó làm.

### Khi nào nên dùng loại này?

* Khi component của bạn wrapper một phần tử DOM hoặc component cần ref bên trong và muốn expose ref cho parent.
* Khi bạn làm UI library, component reusable muốn hỗ trợ ref (ví dụ Input, Button, Modal, Tooltip, v.v.).
* Khi React version bạn dùng vẫn cần forwardRef — hiện React 19 thay đổi behavior, nhưng vẫn tốt khi bạn cần tương thích.

### Có thể thay thế bằng cách khác không? So sánh rõ ràng

* Thay thế:

  * Bạn có thể không dùng wrapper component, parent trực tiếp sử dụng DOM element / component hỗ trợ ref. Nhưng nếu bạn muốn wrapper để thêm styles / layout / logic, thì bạn cần `forwardRef`.
  * Có thể dùng “callback refs” (`ref={el => { ... }}`) để “chộp” DOM element. Nhưng callback ref vẫn cần element mà `ref` được gán — nếu wrapper không cung cấp `ref` đến DOM, callback ref không tới được.

* Ưu nhược:

  * Ưu: linh hoạt, khả năng reuse.
  * Nhược: code có chút phức tạp hơn, type trong TS phải đảm bảo đúng.

### Liên kết tham khảo chính thức

* React docs: Forwarding refs — [React official docs](https://legacy.reactjs.org/docs/forwarding-refs.html) ([React][1])
* React + TS Cheatsheet: forwardRef / createRef part ([react-typescript-cheatsheet.netlify.app][2])

---

## 2. React.PropsWithChildren

### Nó là gì?

* `React.PropsWithChildren<Props>` là một utility type trong React + TypeScript. Nó nhận một type `Props` rồi thêm field `children?: React.ReactNode` vào đó.

### Tại sao lại tạo ra nó?

* Để giảm phải viết tay `children?: React.ReactNode` trong props của mỗi component nếu component đó sử dụng `children`.
* Giúp định nghĩa props dễ đọc hơn, tránh trùng lặp.

### Nó hoạt động như thế nào?

* Ví dụ, nếu bạn có:

```ts
interface MyProps {
  label: string;
}

type MyPropsWithChildren = React.PropsWithChildren<MyProps>;
```

→ Như vậy `MyPropsWithChildren` ≈ `{ label: string; children?: React.ReactNode }`.

### Điều gì sẽ xảy ra nếu không sử dụng nó?

* Bạn phải tự định nghĩa `children?: React.ReactNode` trong `interface props` mỗi lần component có children.
* Có thể mắc lỗi nếu bạn quên định nghĩa `children`, TypeScript sẽ báo lỗi khi dùng `<Component>some child</Component>`.

### Điều gì sẽ xảy ra nếu sử dụng nó?

* Props có sẵn `children`, linh hoạt hơn khi component cần receive children.
* Giảm boilerplate.

### Cách sử dụng nó?

```ts
interface BoxProps {
  color?: string;
}

type BoxPropsWithChildren = React.PropsWithChildren<BoxProps>;

function Box(props: BoxPropsWithChildren) {
  const { color, children } = props;
  return <div style={{ color }}>{children}</div>;
}
```

### Ví dụ thực tế

* Component layout wrapper, ví dụ `Card`, `Modal` nơi bạn muốn chèn nội dung trong giữa.
* Bạn muốn viết component:

```tsx
type CardProps = React.PropsWithChildren<{ title: string }>;
function Card({ title, children }: CardProps) {
  return <div className="card"><h2>{title}</h2>{children}</div>;
}
```

### Khi nào nên dùng loại này?

* Khi component sẽ nhận `children`.
* Khi bạn muốn định nghĩa props mà không muốn viết `children` riêng mỗi lần.

### Có thể thay thế bằng cách khác không? So sánh

* Thay thế: Viết `children?: React.ReactNode` trong interface props.
* So sánh: `PropsWithChildren` làm type rõ ràng hơn, chuẩn hơn, tránh lỗi quên.

### Liên kết tham khảo chính thức

* React TypeScript Cheatsheet — Utility Types — phần “PropsWithChildren” ([react-typescript-cheatsheet.netlify.app][3])

---

## 3. React.ComponentProps

### Nó là gì?

* `React.ComponentProps<T>` là một utility type trong TypeScript dành cho React. Khi `T` là một React component type hoặc một intrinsic element (như `"button"`, `"input"`), `ComponentProps<T>` sẽ lấy tất cả các `props` mà component `T` nhận.

### Tại sao lại tạo ra nó?

* Để dễ dàng “mượn” type props của một component / của một HTML element mà không phải định nghĩa lại.
* Giúp wrapper component hoặc component generic có thể kế thừa props của component con.

### Nó hoạt động như thế nào?

* Nếu `T` là một React component hoặc intrinsic tag, TypeScript trích type của `T`’s props.

Ví dụ: `type InputProps = React.ComponentProps<'input'>` → InputProps là tất cả props của HTML `<input>` (type, value, onChange, etc.)

### Điều gì sẽ xảy ra nếu không sử dụng nó?

* Bạn sẽ phải viết type props tay cho mỗi component wrapper nếu muốn support đủ các props của component gốc. Nhiều khả năng lỗi thiếu props hoặc sai type.

### Điều gì sẽ xảy ra nếu sử dụng nó?

* Component wrapper sẽ có props giống như component gốc, dễ dàng pass-through.
* Dễ dàng giữ tính nhất quán với component base / UI library.

### Cách sử dụng nó?

```ts
type ButtonProps = React.ComponentProps<'button'>;

function MyButton(props: ButtonProps) {
  return <button {...props} />;
}
```

### Ví dụ thực tế

* Wrapper `Button`, bạn muốn component `MyButton` support mọi props của `<button>`, bạn dùng `ComponentProps<'button'>` để lấy type sẵn.

### Khi nào nên dùng loại này?

* Khi bạn làm wrapper component muốn kế thừa props của một component gốc / HTML element.
* Khi component bạn wrap **không** cần `ref` đặc biệt hoặc bạn không forward ref.

### Có thể thay thế bằng cách khác không? So sánh

* `React.ButtonHTMLAttributes<HTMLButtonElement>` (see phần 7) có tác dụng tương tự khi bạn wrap `<button>`.
* `ComponentProps<'button'>` vs `ButtonHTMLAttributes`: có sự khác nhau nhỏ về việc có bao gồm `ref` hay không, và một số props.

### Liên kết tham khảo chính thức

* React TypeScript Cheatsheet — Component Props ([react-typescript-cheatsheet.netlify.app][3])

---

## 4. React.ComponentPropsWithRef

### Nó là gì?

* `React.ComponentPropsWithRef<T>` là type tương tự `ComponentProps<T>` nhưng bao gồm prop `ref` nếu component `T` hỗ trợ ref.

### Tại sao lại tạo ra nó?

* Khi wrapper component **forwardRef** hoặc khi component gốc hỗ trợ nhận `ref`, bạn muốn wrapper component cũng nhận `ref` đúng type.

### Nó hoạt động như thế nào?

* Nếu `T` là một component / intrinsic tag hỗ trợ ref, `ComponentPropsWithRef<T>` lấy props + `ref` prop tương ứng.

Ví dụ: `ComponentPropsWithRef<'input'>` bao gồm mọi prop của `<input>` + `ref?: React.Ref<HTMLInputElement>`

### Điều gì sẽ xảy ra nếu không sử dụng nó?

* Wrapper component nếu muốn nhận `ref` từ parent sẽ không có type đúng → TypeScript cảnh báo hoặc parent không thể gán ref.

### Điều gì sẽ xảy ra nếu sử dụng nó?

* Wrapper component có type chuẩn hơn, hỗ trợ `ref` gán từ parent nếu component gốc cho phép.

### Cách sử dụng nó?

```ts
type InputWithRefProps = React.ComponentPropsWithRef<'input'>;

const MyInput = React.forwardRef<HTMLInputElement, InputWithRefProps>(function MyInput(props, ref) {
  return <input {...props} ref={ref} />;
});
```

### Ví dụ thực tế

* InputItem / TextInput wrapper: nếu muốn hỗ trợ parent dùng `ref` để `focus()`, bạn sẽ sử dụng `forwardRef` + `ComponentPropsWithRef`.

### Khi nào nên dùng loại này?

* Khi component bạn viết **forward ref** hoặc muốn hỗ trợ ref từ parent.
* Khi component gốc hỗ trợ ref (ví dụ input, textarea, button).

### Có thể thay thế bằng cách khác không? So sánh

* Bạn có thể dùng `ComponentPropsWithoutRef`, nhưng sẽ không bao gồm `ref`.
* Nếu bạn không cần ref thì không cần “withRef”.

### Liên kết tham khảo chính thức

* React TypeScript Cheatsheet — Forwarding Refs / ComponentPropsWithRef vs WithoutRef ([react-typescript-cheatsheet.netlify.app][3])

---

## 5. React.ComponentPropsWithoutRef

### Nó là gì?

* Type lấy props của component `T` **không** bao gồm `ref`. Dùng khi bạn wrap component mà không forwardRef / không cần nhận `ref`.

### Tại sao lại tạo ra nó?

* Để tránh lấy vào `ref` nếu component wrapper không support/forward nó, tránh lỗi type.

### Nó hoạt động như thế nào?

* TypeScript loại bỏ phần prop `ref` nếu có từ component gốc.

Ví dụ `ComponentPropsWithoutRef<'div'>` sẽ lấy props của `<div>` mà **không có** `ref`.

### Điều gì sẽ xảy ra nếu không sử dụng nó?

* Nếu wrapper component không forward `ref` mà bạn dùng `ComponentPropsWithRef`, TypeScript có thể cảnh báo hoặc `ref` sẽ bị undefined.

### Điều gì sẽ xảy ra nếu sử dụng nó?

* Wrapper component props sẽ hợp lệ mà không có `ref`, type an toàn hơn trong trường hợp không cần.

### Cách sử dụng nó?

```ts
type MyDivProps = React.ComponentPropsWithoutRef<'div'>;

function MyDiv(props: MyDivProps) {
  return <div {...props} />;
}
```

### Ví dụ thực tế

* Nếu bạn viết component `Container` wrapper `<div>` chỉ để sắp xếp layout, không cần ref, bạn dùng loại này.

### Khi nào nên dùng loại này?

* Khi bạn wrap element mà không forward ref.
* Khi bạn muốn loại props sạch, không chứa `ref`.

### Có thể thay thế bằng cách khác không? So sánh

* `ComponentProps<'div'>` thường bao gồm `ref` ? Thực ra `ComponentProps<'div'>` tương đương `ComponentPropsWithRef<'div'>` vì HTML intrinsic elements hỗ trợ `ref`, nhưng rõ ràng hơn khi dùng `WithoutRef` nếu bạn muốn loại bỏ.

* `HTMLAttributes<HTMLDivElement>` cũng là cách, nhưng không bao gồm event handlers cụ thể như `onClick`, `aria` có thể khác tùy.

---

## 6. React.ComponentRef

### Nó là gì?

* `React.ComponentRef<T>` là một utility type để lấy type ref tới component `T` (nếu `T` là class component hoặc intrinsic).

### Tại sao lại tạo ra nó?

* Khi bạn muốn khai báo `ref` variable có đúng type.

### Nó hoạt động như thế nào?

* Ví dụ `React.ComponentRef<'input'>` sẽ là `HTMLInputElement` hoặc `null`.

### Điều gì sẽ xảy ra nếu không sử dụng nó?

* Bạn phải tự viết `Ref<HTMLInputElement>` hoặc `Ref<any>` không rõ ràng.

### Điều gì sẽ xảy ra nếu sử dụng nó?

* Type rõ ràng hơn, an toàn với TypeScript.

### Cách sử dụng nó?

```ts
const inputRef = React.useRef<React.ComponentRef<'input'>>(null);

// hoặc
function MyInput(props, ref: React.Ref<React.ComponentRef<'input'>>) { ... }
```

### Ví dụ thực tế

* Khi làm `forwardRef`, bạn muốn định nghĩa `ref` đúng loại:

```ts
const MyInput = React.forwardRef<React.ComponentRef<'input'>, MyProps>((props, ref) => {
  return <input {...props} ref={ref} />;
});
```

### Khi nào nên dùng loại này?

* Khi dùng `forwardRef` hoặc khi bạn cần khai báo `useRef` tới loại của component/intrinsic.

### Có thể thay thế bằng cách khác không? So sánh

* Bạn có thể trực tiếp dùng `HTMLInputElement` nếu biết chắc component là `input`.
* `ComponentRef<'input'>` làm generic hơn, nếu sau này thay đổi `as` hoặc component bạn tạo polymorphic hoặc wrapper.

---

## 7. React.ButtonHTMLAttributes

### Nó là gì?

* `React.ButtonHTMLAttributes<T>` là một interface của React TypeScript định nghĩa tất cả các thuộc tính HTML hợp lệ trên phần tử `<button>` HTML (ví dụ `disabled`, `onClick`, `type`, `aria-*`, etc.).

### Tại sao lại tạo ra nó?

* Để bạn dễ mở rộng props của component button wrapper bằng cách “kế thừa” những thuộc tính HTML chuẩn.

### Nó hoạt động như thế nào?

* Nếu bạn viết:

```ts
interface MyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  customProp: string;
}
```

→ `MyButtonProps` sẽ có mọi prop như button thường (onClick, disabled...) + `customProp`.

### Điều gì sẽ xảy ra nếu không sử dụng nó?

* Bạn sẽ chỉ định mỗi prop button thủ công, thiếu một số event, aria, style props, hoặc phải copy lại nhiều lần.

### Điều gì sẽ xảy ra nếu sử dụng nó?

* Component wrapper nhận được mọi prop hợp lệ của `<button>`, dễ sử dụng hơn, less boilerplate.

### Cách sử dụng nó?

```ts
interface MyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

function MyButton({ variant, ...rest }: MyButtonProps) {
  return <button className={variant === 'primary' ? 'btn-primary' : ''} {...rest} />;
}
```

### Ví dụ thực tế

* Wrapper `Button` trong thư viện UI của bạn.

### Khi nào nên dùng loại này?

* Khi bạn wrap `<button>`. Nếu component bạn làm không render `button` nhưng dùng tình trạng giống `button`, không dùng.

### Có thể thay thế bằng cách khác không? So sánh

* `ComponentProps<'button'>` hay `ComponentPropsWithRef<'button'>` tương đương với `ButtonHTMLAttributes` + `ref` nếu cần.

---

## 8. React.HTMLAttributes

### Nó là gì?

* `React.HTMLAttributes<T>` là interface định nghĩa các thuộc tính HTML phổ biến cho bất kỳ phần tử HTML nào (div, span, p, etc.), như className, style, events như onClick, onMouseEnter, etc.

### Tại sao lại tạo ra nó?

* Khi bạn viết component wrapper render một phần tử HTML tổng quát (không phải input/button specifically), bạn muốn hỗ trợ các props HTML chung như className, style, event handlers.

### Nó hoạt động như thế nào?

* Nếu component wrapper `Container` render `<div>`, bạn dùng:

```ts
interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  customProp?: string;
}
```

→ `ContainerProps` sẽ có className, style, events, aria-\*, etc.

### Điều gì sẽ xảy ra nếu không sử dụng nó?

* Bạn sẽ chỉ định các props HTML phổ biến bằng tay, dễ thiếu, mất consistency.

### Điều gì sẽ xảy ra nếu sử dụng nó?

* Wrapper component linh hoạt hơn, người dùng có thể pass className, onClick, style...

### Cách sử dụng nó?

```ts
interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  padding?: string;
}

function Container({ padding, style, children, ...rest }: ContainerProps) {
  return <div style={{ padding, ...style }} {...rest}>{children}</div>;
}
```

### Ví dụ thực tế

* Bạn có component `Card` render `<div>` → dùng HTMLAttributes để hỗ trợ className, style, onClick, etc.

### Khi nào nên dùng loại này?

* Khi component render phần tử HTML tổng quát như `div`, `span`, `section`, etc.

### Có thể thay thế bằng cách khác không? So sánh

* `ComponentProps<'div'>` tương đương `HTMLAttributes<HTMLDivElement>` + một số props riêng.
* `React.DetailedHTMLProps<..., ...>` cũng là cách khác.

---

## 9. React.ElementType

### Nó là gì?

* `React.ElementType` là một type alias trong React TypeScript đại diện cho “loại component” có thể là: một intrinsic HTML tag name (string) như `"div"` hoặc một React component function/class.

### Tại sao lại tạo ra nó?

* Để làm component có tính `polymorphic` (“có props `as` hoặc kiểu component render thay đổi”) — bạn muốn component có thể render thành `<div>`, `<button>`, hoặc component khác tùy tham số.

### Nó hoạt động như thế nào?

* Khi bạn sử dụng `as?: React.ElementType`, type generic có thể dùng `ComponentProps<ElementType>` hoặc `ComponentPropsWithRef<ElementType>` để infer props tương thích.

### Điều gì sẽ xảy ra nếu không sử dụng nó?

* Component bạn làm không linh hoạt: nếu cố gắng support `as` prop, bạn sẽ phải viết nhiều overload hoặc switch-case thủ công.

### Điều gì sẽ xảy ra nếu sử dụng nó?

* Tạo được các component polymorphic — linh hoạt hơn, reuse cao hơn.

### Cách sử dụng nó?

```ts
type PolymorphicCompProps<C extends React.ElementType> = {
  as?: C;
  // custom props
} & React.ComponentPropsWithoutRef<C>;

function PolymorphicComp<C extends React.ElementType = 'div'>(
  { as, children, ...rest }: PolymorphicCompProps<C>,
  ref: React.Ref<any>
) {
  const Component = as || 'div';
  return <Component {...(rest as any)}>{children}</Component>;
}
```

### Ví dụ thực tế

* Thư viện UI như Chakra UI, Styled Components, Tailwind component có `as` prop để bạn đổi component render.

### Khi nào nên dùng loại này?

* Khi bạn làm UI library hoặc các component wrapper cần linh hoạt render thành loại phần tử khác nhau.

### Có thể thay thế bằng cách khác không? So sánh

* Nếu không dùng polymorphic component, bạn sẽ code nhiều component khác nhau cho `div, button, span` etc.
* Cách khác là truyền component vào props, nhưng type safety kém nếu không dùng `ElementType` + `ComponentPropsWithoutRef/WithRef`.

---

## ✅ Bảng tóm tắt so sánh

| Type / API                    | Bao gồm ref?                            | Dùng cho Component wrapper có forwarding ref?    | Khi không dùng ref                            | Có `children` mặc định? |
| ----------------------------- | --------------------------------------- | ------------------------------------------------ | --------------------------------------------- | ----------------------- |
| `forwardRef`                  | tạo component có khả năng forward `ref` | ✔                                                | —                                             | phải tự define nếu cần  |
| `PropsWithChildren`           | —                                       | —                                                | —                                             | thêm `children` prop    |
| `ComponentProps<T>`           | bao gồm ref nếu T hỗ trợ                | tốt nếu T hỗ trợ ref                             | nếu T không hỗ trợ, `ref` sẽ không hợp lệ     |                         |
| `ComponentPropsWithRef<T>`    | ✔                                       | khi component forwardRef hoặc muốn nhận ref      | nếu wrapper không support ref, avoid dùng     |                         |
| `ComponentPropsWithoutRef<T>` | ✘                                       | nếu không cần ref                                | nếu cần ref, loại này thiếu                   |                         |
| `ComponentRef<T>`             | type ref của component T                | khi muốn khai báo ref đúng type                  | nếu không dùng ref, không cần                 |                         |
| `ButtonHTMLAttributes`        | ✘ (có type for HTML <button>)           | wrapper elements <button>                        | nếu bạn wrap <button> và muốn pass HTML props |                         |
| `HTMLAttributes<T>`           | ✘                                       | wrapper any HTML element                         | nếu wrapper render HTML element cơ bản        |                         |
| `ElementType`                 | —                                       | dùng khi bạn làm polymorphic component (as prop) | nếu component luôn render fixed element       |                         |

---

Nếu muốn mình có ví dụ code cụ thể kết hợp nhiều loại này (ví dụ `TextInput` polymorphic + forwardRef + Extract props HTML + children), mình có thể soạn cho bạn. Bạn muốn mình làm ví dụ đó không?

[1]: https://legacy.reactjs.org/docs/forwarding-refs.html?utm_source=chatgpt.com "Forwarding Refs - React"
[2]: https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/forward_and_create_ref/?utm_source=chatgpt.com "forwardRef/createRef - React TypeScript Cheatsheets"
[3]: https://react-typescript-cheatsheet.netlify.app/docs/advanced/patterns_by_usecase/?utm_source=chatgpt.com "Useful Patterns by Use Case - React TypeScript Cheatsheets - Netlify"
