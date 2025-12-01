# 1. Phân biệt React.ReactNode và (() => React.ReactNode) khi gán type cho 1 props.

# ví dụ: children: React.ReactNode | (() => React.ReactNode)

# 2. khi nào nên dùng cái nào? vì sao?

Dưới đây là **giải thích rõ ràng – dễ hiểu – sát thực tế** về sự khác nhau giữa **React.ReactNode** và **() => React.ReactNode**, và **khi nào nên dùng từng loại**.

---

# 1. **React.ReactNode vs `() => React.ReactNode`**

### ✅ **React.ReactNode**

- Là **giá trị JSX trực tiếp**.
- Là _kết quả_ render, không phải _hàm_.
- Ví dụ các dạng hợp lệ:

  ```tsx
  <div>Hi</div>;
  ("text");
  123;
  null;
  undefined;
  false[((<A />), (<B />))];
  ```

📌 **Nếu prop là React.ReactNode → Component nhận thẳng JSX.**

---

### ✅ **`() => React.ReactNode`**

- Là **một hàm** mà **khi gọi mới trả về JSX**.
- Tức là “render prop”.
- Ví dụ:

  ```tsx
  () => <div>Hi</div>;
  ```

- Bản thân prop không phải JSX mà là **callback trả về JSX**.

📌 **Nếu prop là `() => React.ReactNode` → Component phải gọi hàm đó để lấy JSX.**

---

# 2. **Khi nào nên dùng cái nào?**

## ✔️ **Dùng React.ReactNode khi:**

- Bạn chỉ muốn truyền JSX bình thường.
- Nội dung **ko cần tính toán**, **ko phụ thuộc state trong component cha**.
- Ví dụ react components thông thường: `children`, `icon`, `header`, …

**Ví dụ:**

```tsx
<Modal>
  <p>Hello</p>
</Modal>
```

Trong `Modal`:

```ts
interface ModalProps {
  children: React.ReactNode;
}
```

**Nên dùng khi:** Đây là trường hợp phổ biến nhất.

---

## ✔️ **Dùng `() => React.ReactNode` khi:**

### Trường hợp 1: **Cần lazy rendering**

Chỉ muốn render nội dung nếu thực sự cần — ví dụ modal chưa open hoặc tab chưa active.

```tsx
interface TabProps {
  renderContent: () => React.ReactNode;
}
```

- Không gọi → không render → tiết kiệm performance.

---

### Trường hợp 2: **Render prop pattern**

Bạn muốn component cha **quyết định cách render**, và component con **chủ động gọi** hàm để lấy JSX.

Ví dụ với tooltip:

```tsx
interface TooltipProps {
  content: () => React.ReactNode;
}
```

- Component con gọi `props.content()` khi cần hiển thị tooltip.

---

### Trường hợp 3: **Cần truyền callback để lấy dữ liệu nội bộ**

Ví dụ khi component con muốn truyền parameters vào render:

```tsx
children: (item: Item) => React.ReactNode;
```

Parent:

```tsx
<MyList>{(item) => <Row item={item} />}</MyList>
```

Child:

```tsx
props.children(item);
```

---

# 3. **Vậy nên dùng cái nào?**

| Trường hợp                           | Dùng `React.ReactNode` | Dùng `() => React.ReactNode` |
| ------------------------------------ | ---------------------- | ---------------------------- |
| Truyền JSX đơn giản                  | ✅                     | ❌                           |
| Render ngay lập tức                  | ✅                     | ❌                           |
| Lazy rendering                       | ❌                     | ✅                           |
| Render prop pattern                  | ❌                     | ✅                           |
| Truyền function để component con gọi | ❌                     | ✅                           |
| Children là static                   | ✅                     | ❌                           |
| Children tùy thuộc dữ liệu runtime   | ❌                     | ✅                           |

---

# 4. Ví dụ cực dễ hiểu

### ⚡ Nếu bạn viết component Modal:

**ReactNode version:**

```tsx
<Modal>
  <HeavyComponent /> // render ngay cả khi Modal chưa mở
</Modal>
```

**Callback version:**

```tsx
<Modal renderContent={() => <HeavyComponent />} />
```

Trong Modal:

```ts
open ? renderContent() : null;
```

👉 Không mở modal → không render HeavyComponent → **tối ưu hiệu năng**.

---

# Kết luận ngắn gọn

- **React.ReactNode** = JSX **được render ngay**.
- **() => React.ReactNode** = JSX **được render khi nào bạn muốn**, ideal cho **lazy rendering**, **render props**, hoặc **tùy biến bằng function**.

---

Nếu bạn muốn mình demo nhanh 1 component sử dụng cả hai cách (ví dụ `Table`, `Modal`, `Tabs`), chỉ cần nói mình biết bạn đang dùng case nào nhé!

---

# Dưới đây là **3 ví dụ thực tế nhất** trong dự án React/TS—gặp thường xuyên, rõ ràng lý do vì sao phải dùng **`() => React.ReactNode` thay vì ReactNode**.

---

# 🟦 **1. Modal lazy render nội dung để tăng hiệu năng**

## ✅ **Tại sao dùng `() => React.ReactNode`?**

Vì nội dung bên trong Modal nặng → chỉ render khi Modal mở → tránh lag UI.

### **Parent**

```tsx
<Modal open={open} renderContent={() => <HeavyReportChart />} />
```

### **Child (Modal.tsx)**

```tsx
interface ModalProps {
  open: boolean;
  renderContent: () => React.ReactNode;
}

export function Modal({ open, renderContent }: ModalProps) {
  return <div className="modal">{open ? renderContent() : null}</div>;
}
```

👉 **HeavyReportChart không render nếu Modal chưa open.**
Nếu bạn truyền `ReactNode` trực tiếp thì nó render ngay lập tức.

---

# 🟩 **2. Render Props Pattern (Component con cần gọi callback để render)**

Ví dụ: list component gọi children(item) để component cha quyết định UI từng item.

### **Parent**

```tsx
<List items={users}>{(user) => <UserCard user={user} />}</List>
```

### **Child (List.tsx)**

```tsx
interface ListProps<T> {
  items: T[];
  children: (item: T) => React.ReactNode;
}

export function List<T>({ items, children }: ListProps<T>) {
  return <div>{items.map((item) => children(item))}</div>;
}
```

👉 Component cha quyết định render UI cho mỗi item → linh hoạt, tái sử dụng cực tốt.

---

# 🟧 **3. Tooltip/Dropdown chỉ render khi show (on hover/click)**

### **Parent**

```tsx
<Tooltip content={() => <span>My tooltip content</span>}>
  <button>Hover me</button>
</Tooltip>
```

### **Child (Tooltip.tsx)**

```tsx
interface TooltipProps {
  content: () => React.ReactNode;
  children: React.ReactNode;
}

export function Tooltip({ content, children }: TooltipProps) {
  const [open, setOpen] = useState(false);

  return (
    <div onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      {children}
      {open && <div className="tooltip-box">{content()}</div>}
    </div>
  );
}
```

👉 Tooltip chỉ render content khi hover → không render background.

---

# 🟦 **Bonus: Ví dụ trong thư viện lớn (React Table, React Query, MUI)**

- **React Table**: `Cell: (cell) => React.ReactNode`
- **React Query**: `select: (data) => React.ReactNode`
- **MUI**: `renderValue` trong Select → `(selected) => React.ReactNode`
- **Antd Table**: `render: (text, record) => React.ReactNode`

Ví dụ Ant Design Table:

```tsx
{
  title: 'Name',
  dataIndex: 'name',
  render: (value) => <b>{value}</b>
}
```

👉 Đây chính là `() => React.ReactNode` trong thực tế.

---

# 🟣 **Tóm tắt nhanh**

| Use Case                  | Yêu cầu             | Dùng `() => React.ReactNode`? |
| ------------------------- | ------------------- | ----------------------------- |
| Lazy rendering            | tránh render trước  | ✅                            |
| Render props              | cần truyền function | ✅                            |
| UI phụ thuộc dữ liệu item | map items → JSX     | ✅                            |
| Nội dung tĩnh, đơn giản   | JSX bình thường     | ❌                            |

---

Nếu bạn muốn mình viết **một component thật trong dự án của bạn** dùng `() => React.ReactNode` (VD: Sidebar, Table, State Control…), cứ gửi yêu cầu nhé!
