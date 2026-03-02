```
t chưa hình dung được từ 'serialization' trong skill này là sẽ làm những gì ở server nextjs? cho t 1 ví dụ thực tế để thấy sự khác biệt khi áp dụng SKILL này? VD: khi user vào trang client list nếu <ClientList usernames={usernames} /> thì server trả về file html đã generate sẵn nhanh hơn, thời gian hiển thị nhanh hơn vì chỉ có data là usernames. nếu <ClientList usernames={usernames} usernamesOrdered={usernames.toSorted()} /> thì server trả về file html đã generate sẵn chậm hơn, thời gian hiển thị chậm hơn vì data gồm có usernames và usernames.toSorted(). hay chỉ đơn giản là {usernames.toSorted()} không cần thiết xử lý ở phía server component, chứ thực chất thì để server component xử lý {usernames.toSorted()} cũng không có vấn đề gì? t cần 1 chứng minh cụ thể trong thực tế. tóm gọn kiến thức cốt lõi ngắn gọn để t giải thích cho người khác dễ hiểu
```

Ok, mình làm cho bạn **nhìn thấy bằng tư duy thực tế**, không lý thuyết suông nữa 👇

---

# 1️⃣ “Serialization” trong RSC thực sự là gì?

Trong **Next.js + React Server Components (RSC)**:

Server **không chỉ gửi HTML**.
Nó còn gửi một **gói dữ liệu đặc biệt (RSC Payload)** chứa:

* Props của Client Component
* Dữ liệu cần để React "hydrate" phía client

👉 **Serialization = quá trình chuyển props thành JSON-like format để gửi từ server → browser**

Ví dụ server có:

```js
const usernames = ['anna', 'bob', 'carol']
```

Khi render:

```jsx
<ClientList usernames={usernames} />
```

Server phải gửi xuống browser dạng kiểu như:

```json
{
  "usernames": ["anna", "bob", "carol"]
}
```

Đó chính là **serialized payload**.

---

# 2️⃣ Vấn đề xảy ra khi bạn tạo “bản sao” của data

```jsx
<ClientList 
  usernames={usernames} 
  usernamesOrdered={usernames.toSorted()} 
/>
```

Bây giờ server phải gửi:

```json
{
  "usernames": ["anna", "bob", "carol"],
  "usernamesOrdered": ["anna", "bob", "carol"]
}
```

💥 Hai mảng này **giống giá trị nhưng khác reference**
➡ React **không biết chúng giống nhau**
➡ Nó serialize **cả hai mảng riêng biệt**

---

# 3️⃣ Ví dụ thực tế với data lớn

Giả sử hệ thống CRM có:

```js
const users = await db.user.findMany() // 2000 users
```

Mỗi user ~ 500 bytes JSON
➡ 2000 users ≈ **1 MB**

---

### ❌ Bạn làm ở Server Component:

```jsx
<ClientTable 
  users={users}
  activeUsers={users.filter(u => u.active)}
/>
```

Giả sử 60% user active → 1200 users

Server phải gửi:

| Prop        | Size        |
| ----------- | ----------- |
| users       | ~1 MB       |
| activeUsers | ~600 KB     |
| **Tổng**    | **~1.6 MB** |

➡ Tăng **60% payload**
➡ TTFB tăng
➡ Hydration nặng hơn
➡ Mobile load chậm rõ rệt

---

### ✅ Làm đúng theo SKILL

```jsx
<ClientTable users={users} />
```

Client:

```js
const activeUsers = useMemo(
  () => users.filter(u => u.active),
  [users]
)
```

Server gửi:

| Prop     | Size      |
| -------- | --------- |
| users    | ~1 MB     |
| **Tổng** | **~1 MB** |

➡ Giảm 600 KB network
➡ Giảm JSON parse time trên browser
➡ Giảm memory clone trong React

**Đây là khác biệt THỰC TẾ.**

---

# 4️⃣ Vậy server có chậm hơn vì `.toSorted()` không?

❗ **Không đáng kể về CPU**
Sort/filter vài nghìn phần tử trên server là chuyện nhỏ.

⚠️ **Vấn đề KHÔNG phải là CPU server**
Mà là:

> ❌ Bạn làm tăng kích thước dữ liệu gửi qua mạng
> ❌ Tăng chi phí hydrate ở client

---

# 5️⃣ Khi nào ảnh hưởng NHIỀU nhất?

| Data                              | Ảnh hưởng        |
| --------------------------------- | ---------------- |
| 5–10 items                        | Không đáng kể    |
| 100–500 items                     | Bắt đầu thấy     |
| 1000+ items                       | Ảnh hưởng rõ     |
| Object lớn (user, product, order) | Ảnh hưởng rất rõ |

---

# 6️⃣ Hiểu sai phổ biến (và câu trả lời đúng)

> “Chỉ là sort thôi mà, làm ở server cũng đâu sao?”

✔ Đúng về mặt logic
❌ Sai về mặt **kiến trúc RSC & performance**

RSC được thiết kế để:

* Server gửi **data gốc**
* Client xử lý **presentation logic**

---

# 7️⃣ Tóm gọn cốt lõi để bạn giải thích cho người khác

👉 **Serialization trong RSC là quá trình server đóng gói props để gửi sang client.**

👉 React chỉ gộp dữ liệu giống nhau nếu **cùng reference**, không phải cùng giá trị.

👉 Nếu bạn tạo mảng/object mới ở server (filter, map, sort…)
➡ React sẽ gửi thêm 1 bản sao qua mạng
➡ Tăng payload
➡ Tăng thời gian load
➡ Tăng chi phí hydrate

✅ Best practice:

> **Server gửi data gốc 1 lần. Transform ở Client Component.**

---

📌 Một câu dễ nhớ:

> **Đừng gửi cùng một dữ liệu hai lần chỉ vì bạn đã sort hoặc filter nó ở server.**

---

Nếu bạn muốn, mình có thể vẽ sơ đồ **RSC Data Flow** để bạn dùng giải thích cho team luôn.
