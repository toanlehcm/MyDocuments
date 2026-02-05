# 3.2 Avoid Duplicate Serialization in RSC Props

Impact: LOW (reduces network payload by avoiding duplicate serialization)

RSC→client serialization deduplicates by object reference, not value. Same reference = serialized once; new reference = serialized again. Do transformations (.toSorted(), .filter(), .map()) in client, not server.

Incorrect: duplicates array

// RSC: sends 6 strings (2 arrays × 3 items)
<ClientList usernames={usernames} usernamesOrdered={usernames.toSorted()} />
Correct: sends 3 strings

// RSC: send once
<ClientList usernames={usernames} />

// Client: transform there
'use client'
const sorted = useMemo(() => [...usernames].sort(), [usernames])

RSC nghĩa là gì?
Skill "Avoid Duplicate Serialization in RSC Props" có tác dụng gì trong thực tế?

Ngon, câu này đụng đúng **React + Next.js performance thực chiến** luôn 👇

---

## 🧩 RSC là gì?

**RSC = React Server Components**

Hiểu đơn giản:

> Đây là component React **chạy trên server**, không chạy trong browser.

Trong Next.js App Router:

- File **không có** `"use client"` → mặc định là **RSC**
- Nó render trên server → gửi **dữ liệu đã serialize** xuống client cho các Client Component

👉 RSC **không gửi cả component xuống**, nó gửi:

- HTML đã render
- - **props (dữ liệu) cho Client Component**

---

## 🚚 Vấn đề xảy ra ở bước "gửi props từ RSC → Client"

Khi bạn làm:

```jsx
<ClientList usernames={usernames} usernamesOrdered={usernames.toSorted()} />
```

Server phải **serialize 2 mảng** để gửi xuống browser:

| Prop             | Nội dung                                 |
| ---------------- | ---------------------------------------- |
| usernames        | ["a", "b", "c"]                          |
| usernamesOrdered | ["a", "b", "c"] (nhưng là **array mới**) |

💥 Dù giá trị giống nhau, **reference khác nhau → serialize 2 lần**

React chỉ **dedupe theo reference**, không theo value.

---

## 🎯 Skill này giúp gì trong thực tế?

### ✅ 1. Giảm kích thước dữ liệu gửi từ server xuống client

Ví dụ thực tế:

| Trường hợp                              | Data gửi xuống    |
| --------------------------------------- | ----------------- |
| Gửi 1 mảng 1000 items                   | serialize 1 lần   |
| Gửi mảng gốc + mảng sort/filter/map lại | serialize 2–3 lần |

➡ Với list lớn (user, product, order…)
➡ Payload có thể tăng **gấp 2–3 lần** chỉ vì transform trên server

📉 Ảnh hưởng:

- Tăng thời gian load
- Tăng TTFB
- Tăng JS hydration cost

---

### ✅ 2. Tối ưu cho kiến trúc RSC đúng cách

**Nguyên tắc của RSC:**

| Server làm           | Client làm             |
| -------------------- | ---------------------- |
| Fetch data           | UI interaction         |
| Chuẩn bị data thô    | Transform cho hiển thị |
| Không nên clone data | Sort/filter/map        |

Skill này nhắc AI (và dev):

> ❌ Đừng tạo bản sao data trên server
> ✅ Gửi 1 bản duy nhất, transform ở client

---

## 📌 So sánh dễ hiểu

### ❌ Sai (tốn băng thông)

```jsx
// Server Component
<ClientList users={users} activeUsers={users.filter((u) => u.active)} />
```

➡ Gửi toàn bộ `users`
➡ Gửi thêm 1 array mới `activeUsers` (gần như trùng data)

---

### ✅ Đúng (tối ưu)

```jsx
// Server
<ClientList users={users} />
```

```jsx
// Client Component
"use client";
const activeUsers = useMemo(() => users.filter((u) => u.active), [users]);
```

➡ Server chỉ serialize **1 lần**
➡ Client tự xử lý, không tốn network

---

## 💡 Khi nào skill này QUAN TRỌNG nhất?

| Tình huống                      | Mức độ lợi ích        |
| ------------------------------- | --------------------- |
| List nhỏ (5–10 items)           | Gần như không đáng kể |
| List lớn (100–10,000 items)     | Rất đáng kể           |
| Data có nhiều field (object to) | Rất đáng kể           |
| App dashboard / table / CRM     | Cực kỳ nên áp dụng    |

---

## 🧠 Tóm gọn 1 câu dễ nhớ

> **Skill này giúp tránh gửi cùng một dữ liệu nhiều lần từ server xuống client chỉ vì bạn biến đổi nó trên server.**

➡ Gửi **1 bản gốc**
➡ Sort / filter / map ở **client**

---

Nếu bạn muốn, mình có thể soi 1 đoạn code Next.js của bạn và chỉ ra **chỗ nào đang vi phạm rule này** luôn.
