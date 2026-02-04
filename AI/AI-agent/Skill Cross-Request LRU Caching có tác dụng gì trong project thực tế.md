Ngon, đây là **skill rất “đáng tiền” trong app thật** chứ không phải lý thuyết suông 🔥

---

## 🧠 LRU nghĩa là gì?

**LRU = Least Recently Used**

👉 Nghĩa là:

> Khi cache đầy, **xóa dữ liệu lâu không được dùng nhất** để nhường chỗ cho dữ liệu mới.

Ví dụ:

| Thứ tự truy cập      | Cache chứa                        |
| -------------------- | --------------------------------- |
| A → B → C            | A, B, C                           |
| Truy cập lại A       | B, C, A (A mới dùng gần nhất)     |
| Thêm D (cache max=3) | ❌ B bị xóa (lâu không dùng nhất) |

➡ Cache luôn giữ lại **data “nóng” (hay được dùng)**

---

## 🚨 Vấn đề mà skill này giải quyết

Mặc định trong React Server Components:

```ts
import { cache } from "react";
```

`React.cache()` chỉ cache **trong 1 request duy nhất**

Tức là:

| User action                                         | Kết quả                 |
| --------------------------------------------------- | ----------------------- |
| Click trang A → gọi DB                              | ❌ Query DB             |
| Click sang trang B (ngay sau đó) → cũng cần data đó | ❌ Query DB lại lần nữa |

💥 Dù user vừa load xong data 2 giây trước → vẫn query lại DB

---

## 💡 Cross-Request LRU Caching làm gì?

Nó tạo **cache sống lâu hơn 1 request**, để các request sau dùng lại.

```ts
const cache = new LRUCache({
  max: 1000,
  ttl: 5 * 60 * 1000,
});
```

➡ Lưu kết quả DB vào RAM
➡ Request sau trong vài phút tới → lấy từ cache, **không đụng DB**

---

## 📦 Trong thực tế project, nó giúp gì?

### ⚡ 1. Giảm cực mạnh số lần gọi database

Ví dụ app dashboard:

| Hành động user              | Data cần        |
| --------------------------- | --------------- |
| Mở trang User               | getUser(id)     |
| Mở trang Orders của user đó | getUser(id) lại |
| Mở trang Settings           | getUser(id) lại |

Không có cache:

```
DB hit: 3 lần
```

Có LRU cache:

```
DB hit: 1 lần → 2 lần sau lấy từ RAM (cực nhanh)
```

➡ Giảm tải DB
➡ Giảm chi phí
➡ Giảm latency

---

### ⚡ 2. Làm app “nhanh tức thì” khi user điều hướng

User thường thao tác liên tục trong vài giây:

- Click A → B → C
- Mở modal → đóng → mở lại
- Xem list → xem detail → quay lại list

Những data này **thường trùng nhau**

LRU cache giúp:

- Trang sau load gần như tức thì
- Server response nhanh hơn nhiều

---

### ⚡ 3. Cực hợp với Vercel (Fluid Compute)

Trên Vercel (Fluid mode):

➡ Nhiều request có thể dùng **cùng 1 server instance**
➡ Cache nằm trong RAM của instance
➡ Các request sau **thấy được cache của request trước**

💥 Không cần Redis vẫn có hiệu quả cache thật sự

---

### ⚠️ Nếu không dùng LRU cache thì sao?

| Hệ quả          | Mô tả                      |
| --------------- | -------------------------- |
| DB bị spam      | Mỗi click lại query lại    |
| Tốn tiền        | DB read nhiều              |
| Response chậm   | Query DB luôn chậm hơn RAM |
| Không scale tốt | Tải tăng là DB nghẹt       |

---

## 🧩 Khi nào NÊN dùng skill này?

| Trường hợp                                       | Có nên dùng?         |
| ------------------------------------------------ | -------------------- |
| Data ít thay đổi (profile, config, product info) | ✅ Rất nên           |
| User chuyển trang liên tục                       | ✅ Rất nên           |
| Data cực realtime (stock price từng giây)        | ⚠️ Cân nhắc TTL ngắn |
| App dùng Next.js / RSC / API routes              | ✅ Cực hợp           |

---

## 🧠 Tóm gọn 1 câu dễ nhớ

> **Skill này giúp server nhớ lại dữ liệu vừa lấy thay vì hỏi database lại mỗi lần user bấm sang trang khác.**

➡ Ít query DB hơn
➡ App nhanh hơn
➡ Server rẻ hơn
➡ UX mượt hơn

---

Nếu bạn muốn, mình có thể chỉ bạn **những hàm trong project Next.js nào nên bọc bằng LRU cache** để tối ưu ngay.
