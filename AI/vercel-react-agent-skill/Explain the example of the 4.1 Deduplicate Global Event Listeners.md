Skill này nói về 1 vấn đề rất âm thầm nhưng hay gặp trong app lớn:
👉 **mỗi component tự gắn global event listener → app càng nhiều component càng nặng**

---

## 🧨 Vấn đề thực tế trong project

Giả sử bạn có app quản lý công việc.

Nhiều chỗ đều muốn:

* Nhấn **Ctrl + S** để lưu
* Nhấn **Esc** để đóng modal
* Nhấn **/ ** để focus search

Bạn viết 1 hook tiện lợi:

```ts
function useGlobalKey(key: string, fn: () => void) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === key) fn()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [key, fn])
}
```

Rồi dùng khắp nơi:

```ts
function TaskModal() {
  useGlobalKey('Escape', closeModal)
}

function Editor() {
  useGlobalKey('s', saveDraft)
}

function SearchBox() {
  useGlobalKey('/', focusSearch)
}
```

### ❌ Điều gì xảy ra?

Nếu trang có **20 component** dùng hook này:

➡ Trình duyệt có **20 listeners keydown**

Mỗi lần bấm phím:

* Browser phải gọi 20 hàm
* Mỗi hàm lại tự check điều kiện
* Tốn CPU không cần thiết

📌 Đây gọi là **duplicate global listeners**

---

## ✅ Cách đúng: Chỉ 1 listener toàn app

Ta dùng 1 listener duy nhất, rồi phân phối callback.

### Ý tưởng

* Chỉ có **1 window.addEventListener**
* Các component chỉ **đăng ký callback** vào 1 Map dùng chung

---

### Code đơn giản hơn SWR (để bạn dễ hiểu)

```ts
// global store
const keyMap = new Map<string, Set<() => void>>()

// chỉ chạy 1 lần khi app load
if (typeof window !== 'undefined') {
  window.addEventListener('keydown', (e) => {
    const set = keyMap.get(e.key)
    if (set) {
      set.forEach(fn => fn())
    }
  })
}
```

### Hook cho component dùng

```ts
function useGlobalKey(key: string, fn: () => void) {
  useEffect(() => {
    if (!keyMap.has(key)) keyMap.set(key, new Set())
    keyMap.get(key)!.add(fn)

    return () => {
      const set = keyMap.get(key)
      set?.delete(fn)
      if (set?.size === 0) keyMap.delete(key)
    }
  }, [key, fn])
}
```

Bây giờ:

| Số component dùng | Số event listener thật |
| ----------------- | ---------------------- |
| 1                 | 1                      |
| 10                | 1                      |
| 50                | 1                      |

🔥 Hiệu năng ổn định dù app to lên

---

## 🧠 Vậy useSWRSubscription giúp gì?

`useSWRSubscription` đảm bảo đoạn “subscribe global event” chỉ được tạo **1 lần cho toàn bộ key dùng chung**, dù hook được gọi ở nhiều component khác nhau.

Nó đóng vai trò như **shared subscription manager**.

---

## 📌 Khi nào skill này có ích?

| Trường hợp                  | Có nên dùng không |
| --------------------------- | ----------------- |
| Keyboard shortcut toàn app  | ✅ Rất nên         |
| window resize listener      | ✅                 |
| scroll listener             | ✅                 |
| online/offline status       | ✅                 |
| local click trong component | ❌ Không cần       |

---

## 🧠 Tóm tắt siêu ngắn để bạn giải thích cho người khác

> Bình thường mỗi component gắn 1 event listener vào window → app lớn sẽ có rất nhiều listener trùng nhau.

**Skill này giúp:**

✔ Chỉ dùng **1 global listener**
✔ Các component chỉ đăng ký callback
✔ Giảm số listener, giảm CPU, mượt hơn khi app lớn

📌 Áp dụng cho: keyboard shortcut, resize, scroll, network status…

---

Nếu bạn muốn, mình có thể chỉ luôn cách áp dụng pattern này cho **resize + responsive layout** — cái đó trong dashboard app rất đáng tối ưu.

```ts
function useGlobalKey(key: string, fn: () => void) {
  useEffect(() => {
    if (!keyMap.has(key)) keyMap.set(key, new Set())
    keyMap.get(key)!.add(fn)

    return () => {
      const set = keyMap.get(key)
      set?.delete(fn)
      if (set?.size === 0) keyMap.delete(key)
    }
  }, [key, fn])
}
```
Ok mổ xẻ từng dòng cho dễ nuốt nhé 👇
Hook này dùng để **đăng ký 1 callback vào hệ thống phím tắt dùng chung toàn app**.

---

```ts
function useGlobalKey(key: string, fn: () => void) {
```

🔹 Tạo custom hook

* `key`: phím cần lắng nghe (vd: `'Escape'`, `'s'`)
* `fn`: hàm sẽ chạy khi phím đó được bấm

---

```ts
  useEffect(() => {
```

🔹 Dùng `useEffect` để:

* Đăng ký callback khi component mount
* Gỡ callback khi component unmount hoặc deps thay đổi

---

```ts
    if (!keyMap.has(key)) keyMap.set(key, new Set())
```

🔹 `keyMap` là biến global kiểu:

```ts
const keyMap = new Map<string, Set<() => void>>()
```

Nó lưu dạng:

```
'Escape' → Set( callback1, callback2 )
's'      → Set( callback3 )
```

Dòng này có nghĩa:
👉 Nếu chưa có nhóm callback cho phím này → tạo 1 Set rỗng

---

```ts
    keyMap.get(key)!.add(fn)
```

🔹 Thêm callback của component hiện tại vào danh sách callback của phím đó

Ví dụ có 3 component cùng nghe `'Escape'`
→ Set sẽ có 3 hàm khác nhau

---

```ts
    return () => {
```

🔹 Đây là **cleanup function** của `useEffect`
Chạy khi:

* Component bị unmount
* Hoặc `key` / `fn` thay đổi

---

```ts
      const set = keyMap.get(key)
```

🔹 Lấy danh sách callback của phím này

---

```ts
      set?.delete(fn)
```

🔹 Xoá callback của component hiện tại khỏi danh sách
👉 Tránh memory leak
👉 Tránh callback cũ vẫn chạy dù component đã unmount

---

```ts
      if (set?.size === 0) keyMap.delete(key)
```

🔹 Nếu không còn component nào nghe phím này nữa
→ Xoá luôn key khỏi Map cho gọn bộ nhớ

---

```ts
    }
  }, [key, fn])
```

🔹 Effect sẽ chạy lại nếu:

* Phím thay đổi
* Hoặc callback function thay đổi

📌 Vì vậy trong thực tế nên bọc `fn` bằng `useCallback` để tránh re-register liên tục.

---

## 🧠 Tổng kết dễ nhớ

Hook này **KHÔNG tự add event listener vào window**
Nó chỉ:

> “Component A nói: khi nhấn phím X thì gọi tôi nhé”

Còn 1 listener global duy nhất ở nơi khác sẽ làm nhiệm vụ:

```ts
window.addEventListener('keydown', e => {
  keyMap.get(e.key)?.forEach(fn => fn())
})
```

---

## 🔥 Lợi ích

| Không dùng skill            | Dùng skill này            |
| --------------------------- | ------------------------- |
| 20 component = 20 listeners | 20 component = 1 listener |
| Tốn CPU mỗi lần bấm phím    | Nhẹ và ổn định            |
| Khó kiểm soát               | Tập trung 1 chỗ           |

---

Nếu bạn hiểu đoạn này rồi thì bạn đã nắm được **pattern chia sẻ global subscription** — dùng được cho scroll, resize, websocket, media query… chứ không chỉ keyboard đâu 😉

Dấu `!` trong `keyMap.get(key)!.add(fn)` là **non-null assertion operator** trong TypeScript.

### 👉 Nó có nghĩa là:

> “Tôi **cam kết** giá trị này **không phải null hoặc undefined**, cứ cho tôi dùng tiếp đi.”

---

### Cụ thể trong dòng này:

```ts
keyMap.get(key)!.add(fn)
```

* `keyMap.get(key)` có kiểu:

  ```ts
  Set<() => void> | undefined
  ```

  Vì có thể Map chưa có `key`

* Nhưng ở dòng trên ta đã đảm bảo:

```ts
if (!keyMap.has(key)) keyMap.set(key, new Set())
```

=> Sau đoạn này **chắc chắn `keyMap.get(key)` tồn tại**

Vì vậy dev thêm `!` để TypeScript **ngừng cảnh báo lỗi**:

> ❌ Object is possibly 'undefined'

---

### Nếu KHÔNG có `!`

Bạn sẽ phải viết dài hơn:

```ts
const set = keyMap.get(key)
if (set) {
  set.add(fn)
}
```

---

### ⚠️ Lưu ý quan trọng

`!` **chỉ có tác dụng với TypeScript**,
**KHÔNG bảo vệ runtime**.

Nếu logic phía trên sai và `keyMap.get(key)` thật sự là `undefined`
→ app vẫn crash như thường:

```
Cannot read properties of undefined (reading 'add')
```

---

### 🧠 Tóm gọn dễ nhớ

| Ký hiệu      | Ý nghĩa                                |
| ------------ | -------------------------------------- |
| `!` sau biến | “Tin tôi đi, nó không null đâu”        |
| Dùng khi     | Bạn **chắc chắn 100%** giá trị tồn tại |
| Không phải   | Toán tử phủ định logic                 |

---

Trong ví dụ này dùng `!` là **hợp lý** vì ta vừa `set()` ngay phía trên 👍

In TypeScript, the ! operator is known as the Non-null Assertion Operator. It is a syntax used to tell the TypeScript compiler that a specific variable or expression is not null or undefined, even if its type definition suggests it could be. 
Here is a breakdown of how it works:
Context: It is placed after an expression (e.g., value!) to assert that the value is present.
Purpose: It bypasses strict null checks, preventing TypeScript from raising an error when you know for sure (better than the compiler) that a value is not nullish.
Compilation: It is removed entirely during the compilation from TypeScript to JavaScript.
Example: If you have let name: string | null = null;, trying to call name.toLowerCase() will cause a compiler error. Using name!.toLowerCase() asserts that name is not null, silencing the error. 
Warning: Using the ! operator is a way to say "trust me" to the compiler. If you are wrong and the value is null or undefined at runtime, your code will throw a runtime error. 