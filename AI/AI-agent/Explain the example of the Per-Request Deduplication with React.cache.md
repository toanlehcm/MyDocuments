Ok, skill này **rất hay bị hiểu sai**, mình làm ví dụ sát project web/app thật cho bạn luôn 👇

---

# 🧠 React.cache() đang giải quyết chuyện gì?

Trong **1 request từ browser lên server**, rất nhiều chỗ có thể cần **cùng 1 dữ liệu**.

Ví dụ khi user mở trang Dashboard:

* Layout cần: thông tin user
* Navbar cần: thông tin user
* Trang Dashboard cần: thông tin user

➡ Nếu không cache → query DB **3 lần trong cùng 1 request**

---

# 🧩 React.cache() dùng để làm gì?

`React.cache()` giúp:

> Trong **cùng 1 request**, nếu gọi cùng 1 hàm nhiều lần → chỉ chạy **1 lần thật**, còn lại lấy kết quả đã nhớ.

---

## 📦 Ví dụ thực tế trong project

### ❌ Chưa dùng cache

```ts
export async function getCurrentUser() {
  const session = await auth()
  if (!session?.user?.id) return null

  return await db.user.findUnique({
    where: { id: session.user.id }
  })
}
```

Trong 1 lần load trang:

```ts
// layout.tsx
const user = await getCurrentUser()

// navbar.tsx
const user = await getCurrentUser()

// page.tsx
const user = await getCurrentUser()
```

💥 Kết quả: **3 query DB giống hệt nhau**

---

### ✅ Dùng React.cache()

```ts
import { cache } from 'react'

export const getCurrentUser = cache(async () => {
  const session = await auth()
  if (!session?.user?.id) return null

  return await db.user.findUnique({
    where: { id: session.user.id }
  })
})
```

Bây giờ trong **cùng request**:

| Lần gọi | Điều xảy ra   |
| ------- | ------------- |
| Lần 1   | Query DB thật |
| Lần 2   | Lấy từ cache  |
| Lần 3   | Lấy từ cache  |

➡ DB chỉ bị hit **1 lần**

---

# ❗ Vì sao “inline object” làm hỏng cache?

React.cache() so sánh tham số bằng:

```
Object.is(a, b)  → so sánh reference, không phải giá trị
```

---

### ❌ Sai (luôn cache miss)

```ts
const getUser = cache(async (params: { uid: number }) => {
  return db.user.findUnique({ where: { id: params.uid } })
})

getUser({ uid: 1 }) // object mới
getUser({ uid: 1 }) // object mới khác → cache MISS
```

Mỗi `{ uid: 1 }` là 1 object khác trong bộ nhớ.

---

### ✅ Đúng (cache hit)

```ts
const params = { uid: 1 }

getUser(params) // Query DB
getUser(params) // Cache hit
```

Hoặc tốt hơn:

```ts
const getUser = cache(async (uid: number) => {
  return db.user.findUnique({ where: { id: uid } })
})

getUser(1)
getUser(1) // cache hit vì number so sánh theo value
```

---

# 📌 Khi nào skill này QUAN TRỌNG?

| Tình huống                               | Lợi ích    |
| ---------------------------------------- | ---------- |
| Auth user                                | Rất cao    |
| Layout + Page cùng cần data              | Rất cao    |
| Nhiều component server cùng fetch 1 data | Rất cao    |
| API route phức tạp                       | Trung bình |

---

# 🚫 Skill này KHÔNG làm gì?

Nó **không cache giữa các request**
➡ User F5 lại trang → chạy lại từ đầu

Muốn cache giữa request → dùng **LRU / Redis**

---

# 🧠 Tóm tắt cực ngắn để bạn giải thích cho người khác

> **React.cache() giúp tránh gọi lại cùng một query nhiều lần trong cùng một request render.**

✔ Dùng cho auth, user info, config
✔ Chỉ hiệu lực trong 1 request
❌ Không cache giữa các lần user reload trang

📌 Nhớ kỹ:

> Đừng truyền object tạo inline → cache sẽ không hoạt động vì khác reference

---

Nếu bạn muốn, mình có thể chỉ luôn **những hàm nào trong app Next.js nên bọc bằng React.cache() trước tiên** để tối ưu rõ rệt.
