# [3 - Components](https://docs.angularjs.org/tutorial/step_03)

Mình **tổng hợp nội dung chính Step 03 của AngularJS Tutorial** theo kiểu “làm việc thật + giải thích cho người khác dễ hiểu + 20% cốt lõi nắm 80% công năng”, dựa trên hướng dẫn AngularJS PhoneCat Tutorial (Step 03) và tài liệu liên quan 👍([docs.angularjs.org][1])

---

## 📌 Step 03 nói về **cái gì**

**Step 03 trong AngularJS PhoneCat tutorial** dạy bạn cách **góc thành phần code Angular như module + controller + dữ liệu + phân chia template thành thành phần có thể tái sử dụng**.
Ở bước này bạn bắt đầu xây dựng “application structure” thực tế hơn, tạo module Angular, định nghĩa controller riêng, tổ chức code dạng module/JS riêng biệt và tái sử dụng các phần template trong ứng dụng.([docs.angularjs.org][1])

👉 Nói đơn giản:
➡️ Step 03 “biến một trang HTML tĩnh thành một app Angular có cấu trúc tốt, tách file JavaScript ra, dùng **module + controller + template** để code sạch + maintain được”.([GitHub][2])

---

## 🧠 Tóm tắt bạn cần nắm sau khi đọc

### 1) **Angular Module (angular.module)**

* Đây là **khối xây dựng chính của app AngularJS**
* Module định nghĩa group các controller, service, directive, v.v.
* App AngularJS chỉ biên dịch trong phạm vi module bạn khai báo.([GitHub][2])

📌 Bạn cần hiểu:

```js
var app = angular.module('phonecatApp', []);
```

→ Tạo app Angular tên `phonecatApp`.([GitHub][2])

---

### 2) **Controller**

* Controller là nơi “glue” giữa **data (model)** và **view (HTML)**
* Nguyên tắc: **không dùng DOM trong controller**, chỉ thay đổi dữ liệu, Angular tự render.([GitHub][2])

Ví dụ:

```js
app.controller('PhoneListCtrl', function($scope) {
  $scope.phones = [ ... ];
});
```

→ Tạo controller tên `PhoneListCtrl`.([GitHub][2])

---

### 3) **Tách file & tổ chức code**

Step 03 đưa bạn từ code HTML toàn bộ sang:

* `app.js` — khai báo Angular module
* `controllers.js` — chứa controller
* `index.html` — chỉ chứa template + directive

➡️ Đây là cách viết **có cấu trúc**, giống những project thật ngoài đời.([GitHub][2])

---

## 📌 Cốt lõi của feature này là gì?

➡️ **Tách ứng dụng thành các thành phần rõ ràng (module → controller → view) để code có tổ chức & dễ scale**.([docs.angularjs.org][1])

* Module là “khối” ứng dụng
* Controller chứa logic trình bày dữ liệu
* Template HTML chỉ còn chứa UI và Angular binding
* Dữ liệu không nằm rải rác trong HTML

---

## 🧩 Dùng trong case thực tế nào?

| Case thực tế              | Ví dụ                                       |
| ------------------------- | ------------------------------------------- |
| Xây SPA có nhiều view     | Danh sách → chi tiết → form                 |
| App cần test được dễ dàng | Module + controller riêng dễ viết unit test |
| Team làm việc nhóm        | Mã tách rõ ràng, không chồng logic vào HTML |

👉 Gần như mọi dự án AngularJS lớn đều dùng kiến trúc **module + controller**.([GitHub][2])

---

## ⚠️ Dùng sai thì lỗi thường gặp là gì?

### ❌ 1) **Không dùng module → ng-app không tìm được**

→ Angular không khởi động app.
Angular sẽ *im lặng* hoặc không chạy binding nếu module sai/không match.([GitHub][2])

### ❌ 2) **Đặt logic DOM trong controller**

→ Sai tư duy Angular → khó test, code rối.
Controller chỉ nên xử lý **data**, không sửa DOM trực tiếp.([GitHub][2])

### ❌ 3) **Không tách code file**

→ Code nhanh rối, khó tìm bug/test.
Tách file module/controller/template là best practice.([GitHub][2])

---

## 🚀 Ảnh hưởng performance không?

📉 **Không đáng kể trực tiếp.**
Module + controller chỉ là cách tổ chức code → không tác động runtime.

⚠️ Performance giảm khi bạn:

* tạo quá nhiều watchers
* lặp filter/ng-repeat khổng lồ
  → Những điều đó nằm ở Step 04/05 hơn là Step 03.([Wikipedia][3])

---

## 🐞 Khi debug thì nên nhìn vào đâu?

🔍 **1) Module khai báo đúng chưa?**
Check `angular.module('phonecatApp', […] )`

🔍 **2) Controller gắn đúng chưa?**
HTML `<div ng-controller="PhoneListCtrl"> … </div>`

🔍 **3) Scope có data không?**
Console inspect:

```js
angular.element($0).scope()
```

🔍 **4) Kiểm tra lỗi loading file JS**
Network tab → app.js / controllers.js load không? Nếu không → Angular không tìm được controller.

---

## 📌 20% cực quan trọng bạn cần nhớ để dùng 80% công năng

1️⃣ **Angular module = tổng của mọi thành phần app**
2️⃣ **Controller = nơi chứa logic → supply dữ liệu cho view**
3️⃣ **View = template chứa binding + directives**
4️⃣ **Ng-app xác định Angular bắt đầu ở đâu**
5️⃣ **Tách file JS khỏi HTML để code maintainable/testable**
→ Đây là cấu trúc code kiểu production (không phải demo).([GitHub][2])

---

## 🧠 Bạn cần nắm thêm những kiến thức sau (chưa hỏi)

✔ **Dependency Injection (DI)**
Angular tự inject `$scope`, `$http`, `$routeParams`… vào controller.
Hiểu DI để viết controller/service tốt hơn.([Stack Overflow][4])

✔ **ControllerAs syntax**
Một style khác để viết controller đẹp hơn.([GitHub][2])

✔ **Best practice: services vs controller logic**
Logic xử lý dữ liệu nên vào service (tách concern).([GitHub][5])

---

## 🧠 Cách đặt câu hỏi khi đọc tài liệu để hiểu sâu

> ❓ *Feature này xử lý **data flow** như thế nào?*
> ❓ *Đâu là entry point của Angular app này?*
> ❓ *Đâu là boundary giữa UI và logic?*
> ❓ *Nếu Angular không render, lỗi thường đến từ đâu?*
> ❓ *Cách debug / test component này ra sao?*

---

## 📘 Giải thích nhanh cho người khác

> *“Step 03 dạy cách tổ chức một ứng dụng AngularJS bằng việc tách app thành module + controller riêng, tách code JavaScript ra file rõ ràng, dùng Angular để supply data vào template HTML. Đây là cách viết code AngularJS production-ready.”*([GitHub][2])

---

Nếu bạn muốn, mình có thể **viết ví dụ đầy đủ Step 03 với code (file separation, dữ liệu, controller)** để bạn paste vào project và chạy được luôn 👍

[1]: https://docs.angularjs.org/tutorial/step_03?utm_source=chatgpt.com "Tutorial: 3 - Components"
[2]: https://github.com/angular/angular-phonecat?utm_source=chatgpt.com "Tutorial on building an angular application."
[3]: https://en.wikipedia.org/wiki/AngularJS?utm_source=chatgpt.com "AngularJS"
[4]: https://stackoverflow.com/questions/19238191/understanding-angular-js-controller-parameters?utm_source=chatgpt.com "Understanding Angular.js controller parameters"
[5]: https://github.com/learning-zone/angularjs-basics?utm_source=chatgpt.com "learning-zone/angularjs-basics"
