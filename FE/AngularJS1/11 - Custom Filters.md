# [11 - Custom Filters](https://docs.angularjs.org/tutorial/step_11)

Dưới đây là **tóm tắt 20% cốt lõi nội dung Step 11 của AngularJS Tutorial** (đặc biệt là PhoneCat tutorial), để bạn **hiểu nhanh và vận dụng trong project thực tế**, kèm theo **câu trả lời chi tiết cho từng câu hỏi bạn đặt ra** 👇 ([AngularJS Documentation][1])

---

## 🧠 Nội dung Step 11 nói về cái gì?

**Step 11 trong AngularJS tutorial là về “Custom Filters”** — tức là cách viết **filter riêng của bạn** để xử lý/biến đổi dữ liệu trước khi hiển thị trong template.
Trong ví dụ PhoneCat, bạn **tạo một filter `checkmark`** để hiển thị dữ liệu boolean kiểu đẹp hơn, và **dùng filter này trong view**, kèm theo **unit test cho filter đó**. ([AngularJS Documentation][1])

---

## 🎯 Sau khi đọc xong, bạn cần nắm được gì?

### 1) **Khái niệm filter trong AngularJS**

- Filters là những hàm dùng để **biến đổi giá trị trước khi hiển thị trong Angular templates**.
- Bạn có thể dùng filter với cú pháp: `{{ value | filterName:param }}`. ([AngularJS Documentation][2])

### 2) **Cách tự tạo custom filter**

- Dùng `app.filter('name', function(){ return function(input){ ... } })`.
- Filter này `return` kết quả mới từ `input`. ([Medium][3])

### 3) **Nó giúp template “sạch” hơn**

- Logic xử lý dữ liệu được tách ra khỏi controller/template.
- Template chỉ còn nhiệm vụ hiển thị. ([AngularJS Documentation][1])

### 4) **Unit test filter**

- Bạn nên viết **test** đảm bảo filter hoạt động đúng. ([GitHub][4])

---

## 🧱 Cốt lõi của feature Custom Filters là gì?

**Filter = một hàm biến đổi giá trị trước khi hiển thị, dùng trong template & controller, giúp bạn tái sử dụng logic transformation ở nhiều nơi + làm code sạch hơn.** ([AngularJS Documentation][2])

---

## 💼 Dùng trong case thực tế nào?

Bạn sẽ dùng Custom Filters khi:

✔ Cần format/định dạng dữ liệu trong view (ví dụ: boolean → biểu tượng ✔/✘). ([AngularJS Documentation][1])
✔ Hiển thị giá trị theo rule business riêng (ví dụ: currency theo region, shorten text).
✔ Tái sử dụng logic formatter ở nhiều template của app.

---

## ⚠ Dùng sai thì lỗi thường gặp là gì?

🚫 Filter viết ở module không đăng ký đúng → Angular không tìm thấy → lỗi runtime.
🚫 Filter logic chậm → nếu field lớn dữ liệu → performance chậm (hàm gọi mỗi digest). ([Medium][3])
🚫 Không test → bug khi dùng ở nhiều chỗ.

---

## 📊 Có ảnh hưởng performance không?

Yes — nếu filter:
✅ chạy phức tạp (loop nặng)
❗ chạy mỗi lần Angular digest (rất thường xuyên)
→ **performance chịu ảnh hưởng**.

**Giải pháp:**
✔ Giảm logic nặng trong filter
✔ Cache nếu cần
✔ Dùng filter nhẹ hoặc compute trong controller khi dữ liệu không đổi.

---

## 🐞 Khi debug thì nhìn vào đâu?

✔ **Console lỗi Angular** nếu filter không tồn tại.
✔ **View template** nơi dùng filter (`{{ … | filterName }}`).
✔ **Filter function code**: xem input/out.
✔ **Unit tests** confirm filter trả giá trị đúng.

---

## 📌 Tóm tắt 20% cốt lõi để lướt hiểu 80% thực tế

| Điểm cần nhớ         | Nội dung nhanh                | Ví dụ dùng                     |               |
| -------------------- | ----------------------------- | ------------------------------ | ------------- |
| Filter là gì?        | Hàm biến đổi dữ liệu cho view | `{{ true                       | checkmark }}` |
| Custom Filter        | Tự định nghĩa                 | `app.filter('checkmark', ...)` |               |
| Tách logic khỏi view | View ngắn gọn, logic ở JS     | Cleaner templates              |               |
| Test filter          | Viết unit test                | Ràng buộc đầu vào/ra           |               |
| Performance          | Đừng nặng trong filter        | Pool nhỏ, careful              |               |

---

## 💡 Trong nội dung này, bạn còn nên nắm thêm kiến thức nào?

❓ Bạn cần hỏi/hiểu:

- AngularJS **how filters are invoked in digest cycle**
- Khi nào nên dùng filter vs computed property trong controller?
- Cách viết filter có **thêm tham số**
- Sự khác nhau giữa filter và directive (cách dùng mỗi cái)

---

## 🧠 Bạn nên đặt câu hỏi tự kiểm tra kiến thức kiểu này:

1. **Filters trong AngularJS là gì và hoạt động như thế nào?**
2. **Cách tạo custom filter? Viết ví dụ `reverseString` filter?**
3. **Filter dùng ở đâu trong template?**
4. **Tại sao filter ảnh hưởng performance?**
5. **Nếu filter không được Angular tìm thấy thì lỗi gì?**
6. **Khi nào filter tốt hơn xử lý trong controller?**

---

## 📘 Một số câu hỏi “kiểm tra đã hiểu chưa” dạng checklist

✔ Bạn có thể viết filter X để biến true/false thành icon?
✔ Dùng filter trong ng-repeat có ảnh hưởng gì?
✔ Bạn có test filter được không?
✔ Hiểu khi nào không nên dùng filter?

---

## 🔎 Gợi ý đọc thêm trong AngularJS docs

📌 AngularJS Developer Guide – Filters
👉 Giải thích sâu hơn cách dùng trong expressions, controllers… ([AngularJS Documentation][2])

---

### 💡 Nói ngắn gọn để giải thích cho người khác

> **Custom Filters** là một cách trong AngularJS để **biến đổi dữ liệu trước khi hiển thị ở view**, giữ logic tách biệt và tái sử dụng được trong HTML templates. Mỗi filter là một hàm nhận input → trả output đã format. ([AngularJS Documentation][1])

---

Bạn có thể hỏi mình tiếp như:

🔹 _“Show me sample code of the `checkmark` filter and how it’s used”_
🔹 _“How to test custom filters with Jasmine/Karma?”_
🔹 _“Explain performance implications of AngularJS filters in ng-repeat”_

Nếu cần, mình có thể viết ví dụ code minh họa step-11 luôn.

[1]: https://docs.angularjs.org/tutorial/step_11?utm_source=chatgpt.com "Tutorial: 11 - Custom Filters"
[2]: https://docs.angularjs.org/guide/filter?utm_source=chatgpt.com "Developer Guide: Filters"
[3]: https://medium.com/%40vinita23/how-to-create-custom-filters-in-angularjs-645e28740e59?utm_source=chatgpt.com "How to Create Custom Filters in AngularJS? | by Vinita"
[4]: https://github.com/angular/angular-phonecat/blob/master/README.md?utm_source=chatgpt.com "angular-phonecat/README.md at master"
