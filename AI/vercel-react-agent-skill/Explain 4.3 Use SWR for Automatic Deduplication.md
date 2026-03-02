Ok cái skill này **rất đáng tiền trong app thật**, nhất là dashboard, admin, SaaS — nơi nhiều component cùng cần 1 API.

Bạn chưa dùng SWR nên mình lấy ví dụ cực đời thường 👇

---

## 🎯 Bài toán thực tế

Trang **User Management** có:

* `<UserTable />` — bảng danh sách user
* `<UserStats />` — tổng số user, active user
* `<UserFilter />` — dropdown filter user

👉 Cả 3 component đều cần gọi:

```
GET /api/users
```

---

## ❌ KHÔNG dùng SWR (fetch tay)

Mỗi component tự fetch:

```tsx
function UserTable() {
  const [users, setUsers] = useState([])
  useEffect(() => {
    fetch('/api/users').then(r => r.json()).then(setUsers)
  }, [])
}
```

```tsx
function UserStats() {
  const [users, setUsers] = useState([])
  useEffect(() => {
    fetch('/api/users').then(r => r.json()).then(setUsers)
  }, [])
}
```

### 🚨 Điều gì xảy ra khi page load?

| Component  | Gửi request |
| ---------- | ----------- |
| UserTable  | 1 request   |
| UserStats  | 1 request   |
| UserFilter | 1 request   |

➡️ **3 request giống hệt nhau cùng lúc**

Hậu quả:

* Tốn băng thông
* API server bị load dư thừa
* Có thể data lệch nhau nếu response về lệch thời gian
* UI load chậm hơn vì mỗi thằng đợi riêng

---

## ✅ DÙNG SWR (tự động dedupe)

```tsx
import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then(r => r.json())

function UserTable() {
  const { data: users } = useSWR('/api/users', fetcher)
}
```

```tsx
function UserStats() {
  const { data: users } = useSWR('/api/users', fetcher)
}
```

```tsx
function UserFilter() {
  const { data: users } = useSWR('/api/users', fetcher)
}
```

### 🧠 Điều SWR làm phía sau:

| Component mount | SWR xử lý                              |
| --------------- | -------------------------------------- |
| UserTable gọi   | 🔵 Gửi request thật                    |
| UserStats gọi   | 🟡 Thấy request đang chạy → dùng chung |
| UserFilter gọi  | 🟡 Dùng chung luôn                     |

➡️ **Chỉ có 1 request duy nhất được gửi đi**

Các component còn lại **subscribe chung vào cache**.

---

## 🎁 Lợi ích thấy rõ trong thực tế

| Không dùng SWR                | Dùng SWR                            |
| ----------------------------- | ----------------------------------- |
| 3 request giống nhau          | 1 request duy nhất                  |
| Tốn API quota                 | Tiết kiệm                           |
| UI có thể render lệch data    | Data đồng bộ                        |
| Mỗi component tự quản loading | SWR quản lý luôn loading + error    |
| Không có cache                | Có cache → quay lại page load nhanh |

---

## ⚡ Ví dụ dễ thấy nhất

### Trường hợp: Mở modal sau khi page load

1. Page đã load user list bằng SWR
2. Bạn mở modal "Assign User"
3. Modal cũng gọi `useSWR('/api/users')`

👉 **KHÔNG có request mới**
Vì data đã có sẵn trong cache rồi → modal hiện data **ngay lập tức**

Nếu fetch tay → lại gọi API lần nữa.

---

## 🔄 Bonus: Tự revalidate

SWR còn tự:

* Refetch khi user quay lại tab
* Refetch khi mạng reconnect
* Giữ UI không bị trắng trong lúc load lại

Fetch tay = bạn phải tự code hết đống này.

---

## 🧠 Tóm gọn kiến thức để bạn giải thích cho người khác

> **SWR giúp nhiều component dùng chung một request API thay vì mỗi thằng gọi riêng.**

### Một câu dễ hiểu:

🗣️

> Không dùng SWR: mỗi component tự đi mua nước → tốn 3 chuyến
> Dùng SWR: một người mua → cả nhà uống chung

---

## 📌 Khi nào skill này cực kỳ hữu ích?

* Dashboard nhiều widget
* Layout + Page cùng gọi user/session
* Modal, dropdown, sidebar cùng cần 1 data
* App có nhiều component reuse cùng API

---

Nếu bạn muốn, mình chỉ luôn **khi nào KHÔNG nên dùng SWR** để khỏi lạm dụng (ví dụ form input realtime).
