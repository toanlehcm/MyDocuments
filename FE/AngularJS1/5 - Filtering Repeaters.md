# 5 - Filtering Repeaters

Dưới đây là **tóm tắt trọng tâm AngularJS Tutorial Step 05** theo kiểu bạn cần để **làm việc trong project thật** và **giải thích cho người khác dễ hiểu**, kèm theo **các câu hỏi đúng bạn nên đặt khi đọc docs AngularJS** 👇

---

## 📌 AngularJS Tutorial Step 05 nói về **gì**

**Step 05 trong tutorial AngularJS** tập trung vào **lọc dữ liệu trong repeater** (filtering) — tức là cách bạn lấy các item từ một danh sách và chỉ hiển thị những item thỏa điều kiện tìm kiếm/lọc. Điều này giúp list UI phản ứng theo **input người dùng** mà không cần viết thủ công vòng lặp hay filter bằng JavaScript. ([AngularJS Documentation][1])

---

## 📋 Bạn cần nắm được gì sau khi đọc xong

### 🎯 1. **Filter dữ liệu trong `ng-repeat`**

Angular cho phép dùng **filter ngay trong template** để lọc list theo điều kiện. Ví dụ:

```html
<li ng-repeat="phone in phones | filter:query">
  {{phone.name}}
</li>
```

👉 Khi `query` thay đổi → list tự update. ([AngularJS Documentation][1])

---

### 🎯 2. **Kết hợp lọc + data binding**

* `ng-model="query"` gắn input với biến
* `filter:query` gắn filter với repeater
* Không cần viết JS vòng lặp → Angular tự xử lý

---

### 🎯 3. **Hiểu lọc không ảnh hưởng dữ liệu gốc**

* Filter chỉ “hiển thị subset”
* Không thay đổi **array gốc** trong controller

---

## 📌 Cốt lõi của feature này là gì?

> **Tạo những danh sách hiển thị động dựa trên dữ liệu và input người dùng, mà không cần viết code thủ công để cập nhật DOM hay lọc mảng.**

* Angular thực hiện lọc “declaratively” qua syntax `| filter:` trong template.
* Đây là cách **reactive UI** hoạt động trong AngularJS.

---

## 🧠 Dùng trong trường hợp thực tế nào?

| Case                           | Ví dụ                             |
| ------------------------------ | --------------------------------- |
| Tìm kiếm trong list            | Tìm phone, user, product realtime |
| Lọc theo category              | Filter items theo loại            |
| Auto lọc UI khi input thay đổi | Form dashboard, filter bảng       |

👉 Rất thường dùng trong **SPA** để tạo UI “tương tác ngay” mà không cần reload page.

---

## ⚠️ Dùng sai thì lỗi thường gặp là gì?

### ❌ 1. Filter trực tiếp cả object quá lớn

Filter trong repeater có thể gây **chậm** nếu list đông (hàng trăm/ nghìn item)

### ❌ 2. Không tách logic

* Viết quá nhiều logic filter trong template → khó maintain
* Nên chuyển logic lọc phức tạp vào **controller / custom filter**

### ❌ 3. Nhầm biến query

Nếu `query` chưa set → list hiển thị sai/ không update

---

## 🚀 Có ảnh hưởng performance không?

✅ Với danh sách nhỏ → không đáng kể
⚠️ Với list lớn → filter trong view chạy mỗi digest cycle → **giảm hiệu năng**

💡 Khi performance quan trọng:

* Sử dụng **limitTo**
* Viết **custom filter**
* Tối ưu dữ liệu trước khi binding

---

## 🔍 Khi debug thì nhìn vào đâu?

| What to check                      | Why                        |
| ---------------------------------- | -------------------------- |
| Input `ng-model` value             | Biến truy vấn filter       |
| List biến nguồn                    | Dữ liệu list gốc           |
| Expression `filter:` có đúng field | Sai field → không lọc được |
| Console logs trong controller      | Kiểm tra data thay đổi     |

---

## 🔥 20% cốt lõi để nắm 80% vận dụng

✅ AngularJS filter là **công cụ UI để lọc danh sách trong template**
➡️ Binding input + filter = UI tương tác realtime
➡️ Không cần JS vòng lặp để render list
➡️ Filter không thay đổi dữ liệu gốc
➡️ Đoạn filter nằm ngay trong `ng-repeat | filter:query`

---

## 📌 Các kiến thức liên quan bạn **nên nắm thêm** (chưa hỏi nhưng rất cần)

### 🔹 1. **Custom Filter**

Không chỉ filter string, bạn có thể tạo filter riêng để pass logic phức tạp.

### 🔹 2. **Performance của $digest**

Filter trong repeater chạy mỗi lần digest — càng nhiều watcher = chậm UI.

### 🔹 3. **`orderBy` và `limitTo`**

Các filter hữu ích để sort & paginate kết quả.

---

## 📘 Cách đặt câu hỏi khi đọc tài liệu AngularJS

Để đọc tài liệu **hiệu quả + áp dụng được ngay**, hãy hỏi theo mẫu sau:

---

### ✔️ Câu hỏi “hiểu feature”

* Feature này làm **cái gì?**
* Dữ liệu nào tham gia?
* Nó thay đổi DOM hay thay đổi data?

---

### ✔️ Câu hỏi “thực tế”

* Dùng feature này cho **case nào trong project thật?**
* Nó có tác động gì đến **UX/ hiệu năng**?

---

### ✔️ Câu hỏi “debug”

* VS code: xem biến nào liên quan?
* Biến data có đúng không?
* UI có bị rerender quá nhiều?

---

### ✔️ Câu hỏi “best practice”

* Khi nào nên dùng template filter?
* Khi nào nên move logic vào controller/custom filter?

---

## 📌 Tóm lại cho người khác (nói nhanh)

> *Step 05 trong AngularJS tutorial dạy bạn cách **lọc một danh sách động trong template** bằng `filter`. Bạn kết hợp `ng-model` với input để người dùng gõ là list tự thu nhỏ mà không cần viết vòng lặp hay DOM manipulation. Đó là cách AngularJS làm UI reactive thật sự đơn giản.* ([AngularJS Documentation][1])

---

Nếu bạn muốn, mình có thể tiếp tục với:
✅ Ví dụ code thực tế Step 05
✅ Cách viết **custom filter** theo yêu cầu dự án
Chỉ cần nói 👍

[1]: https://docs.angularjs.org/tutorial/step_05?utm_source=chatgpt.com "AngularJS: Tutorial: 5 - Filtering Repeaters"
