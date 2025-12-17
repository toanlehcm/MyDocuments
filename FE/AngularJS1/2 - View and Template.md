# 2-View and Template

-----
t nên đặt câu hỏi ntn để có được đầy đủ kiến thức khi đọc các danh mục trong document của angularJS?
https://docs.angularjs.org/tutorial/step_02
nội dung này nói về cái gì?
t cần nắm được gì sau khi đọc xong?

*Cốt lõi của feature này là gì?*
*Dùng trong case thực tế nào?*
*Dùng sai thì lỗi thường gặp là gì?*
*Có ảnh hưởng performance không?*
*Khi debug thì nhìn vào đâu?*

tóm tắt 20% cốt lõi nội dung này để t có thể làm việc trong project thật và giải thích cho người khác dễ hiểu
trong nội dung này t cần nắm thêm những kiến thức nào mà t chưa hỏi bạn?
t nên đặt câu hỏi ntn để có được đầy đủ kiến thức trong document này? 
VD: tóm tắt 20% cốt lõi để nắm được 80% vận dụng thực tế.
-----

👉 **AngularJS Tutorial – Step 02** nói về **AngularJS Templates & Data Binding**
(Link bạn gửi: step_02)

Mình tóm gọn cho bạn theo đúng kiểu **đọc xong là dùng được trong project thật + giải thích lại cho người khác** 👇

---

## 1️⃣ Nội dung này nói về cái gì?

**Step 02 giới thiệu “linh hồn” của AngularJS:**

> **Binding dữ liệu giữa JavaScript và HTML thông qua template**

Cụ thể:

* HTML **không còn là HTML tĩnh**
* AngularJS cho phép:

  * Gắn **dữ liệu (model)** trực tiếp vào HTML
  * HTML **tự động cập nhật** khi dữ liệu thay đổi

---

## 2️⃣ Sau khi đọc xong, bạn cần nắm được gì?

Bạn cần hiểu **3 khái niệm cốt lõi**:

### ✅ 1. AngularJS Template là gì?

HTML có thêm **directive** và **expression** của AngularJS

Ví dụ:

```html
<p>{{name}}</p>
```

➡️ `{{ }}` = **Angular expression**
➡️ Không phải JS thuần, Angular sẽ xử lý

---

### ✅ 2. Data Binding (Two-way binding)

Dữ liệu:

* Từ **JS → HTML**
* Và **HTML → JS**

Ví dụ:

```html
<input ng-model="query">
<p>{{query}}</p>
```

➡️ Gõ vào input
➡️ Text bên dưới **tự đổi theo, không cần JS**

💡 Đây là thứ làm AngularJS khác jQuery

---

### ✅ 3. Directives cơ bản

AngularJS mở rộng HTML bằng **directive**

Trong step này bạn thấy các directive quan trọng:

| Directive   | Ý nghĩa                         |
| ----------- | ------------------------------- |
| `ng-app`    | Khởi động AngularJS app         |
| `ng-model`  | Gắn dữ liệu vào input           |
| `ng-repeat` | Lặp danh sách                   |
| `ng-bind`   | Bind dữ liệu (thay cho `{{ }}`) |

Ví dụ:

```html
<li ng-repeat="phone in phones">
  {{phone.name}}
</li>
```

➡️ Angular tự render list
➡️ Không cần loop JS thủ công

---

## 3️⃣ 20% cốt lõi giúp làm được 80% công việc (quan trọng nhất)

Nếu chỉ nhớ **20%**, hãy nhớ **4 ý này**:

---

### 🔥 1. HTML + Angular = View động

HTML không còn tĩnh nữa
Nó phản ứng theo dữ liệu

---

### 🔥 2. `{{ }}` là cách hiển thị dữ liệu

```html
{{variable}}
```

➡️ Angular sẽ thay bằng giá trị thật
➡️ Tự update khi data đổi

---

### 🔥 3. `ng-model` tạo liên kết 2 chiều

```html
<input ng-model="query">
```

➡️ Gõ → data đổi
➡️ Data đổi → UI đổi

---

### 🔥 4. `ng-repeat` = vòng lặp UI

```html
<div ng-repeat="item in items">
```

➡️ Rất hay dùng trong project thật:

* List user
* Table
* Menu
* Dropdown

---

## 4️⃣ Giải thích cho người khác sao cho dễ hiểu

Bạn có thể nói như này 👇

> *“Step 02 dạy cách AngularJS biến HTML thành giao diện động bằng data binding.
> Thay vì viết JS để update DOM, mình chỉ cần bind dữ liệu vào HTML, Angular tự lo phần còn lại.”*

Hoặc ví dụ đời thường:

> *“Angular giống như Google Sheets:
> bạn đổi dữ liệu ở 1 ô → mọi chỗ liên quan tự cập nhật.”*

---

## 5️⃣ Liên hệ với project thật (Cordova / WebView / SPA)

Trong project AngularJS thật:

* 90% code UI là:

  * `ng-repeat`
  * `ng-model`
  * `{{ }}`

Nếu **chưa hiểu Step 02** 👉

* Code khó debug
* Không hiểu vì sao UI tự đổi
* Dễ quay về dùng jQuery sai cách

---

Nếu bạn muốn 👉
👉 **Mình tóm tiếp Step 03–05 theo kiểu “đi làm thực tế”**
👉 Hoặc **map Step 02 với code trong project của bạn**

Chỉ cần nói 👍

----------------------------------////////////////////////////-------------------------------------------------------------

Mình trả lời theo **góc “đọc doc để đi làm thật”**, không lặp lại những gì bạn đã hỏi trước đó, mà tập trung vào **những kiến thức ẩn trong Step 02 mà người mới rất hay bỏ sót** + **cách đặt câu hỏi đúng khi đọc AngularJS docs**.

---

# I. Trong Step 02, còn những kiến thức QUAN TRỌNG nào bạn chưa hỏi tới?

Ngoài **data binding, ng-repeat, ng-model**, bạn **cần nắm thêm 5 ý sau** (rất hay bị bỏ qua nhưng cực quan trọng khi làm project thật).

---

## 1️⃣ AngularJS **không thao tác DOM trực tiếp**

📌 Step 02 **ngầm dạy** điều này

Trong tutorial:

* Không có `document.getElementById`
* Không có `innerHTML`
* Không có jQuery update UI

👉 AngularJS dùng:

* **Model → View**
* UI tự render lại

💡 Khi đi làm:

> ❌ Viết JS sửa DOM = sai tư duy AngularJS
> ✅ Thay đổi data = UI tự đổi

👉 Đây là nền tảng để:

* Debug dễ
* Code maintain được

---

## 2️⃣ Expression `{{ }}` KHÔNG phải JavaScript thuần

Rất nhiều người hiểu sai.

Ví dụ:

```html
{{ 1 + 2 }}
```

👉 Đây là **Angular Expression**, không phải JS trong `<script>`

❌ Không dùng được:

* `if`
* `for`
* `window`
* `document`

✔️ Dùng được:

* toán tử
* filter
* property access

💡 Khi đọc doc, phải tự hỏi:

> “Cái này chạy ở đâu? JS engine hay Angular engine?”

---

## 3️⃣ Scope (ngầm xuất hiện nhưng chưa nói rõ)

Trong Step 02:

```js
$scope.phones = [...]
```

👉 Nhưng tutorial **chưa giải thích kỹ `$scope`**

📌 Bạn cần tự nhận ra:

* `$scope` = nơi Angular **lưu data cho View**
* HTML chỉ thấy được những gì nằm trong scope

💡 Nếu không hiểu scope:

* Không hiểu vì sao `{{variable}}` không hiển thị
* Không debug được binding lỗi

---

## 4️⃣ Thứ tự khởi động AngularJS

Step 02 ngầm cho bạn thấy flow này:

1. Browser load HTML
2. `ng-app` kích hoạt AngularJS
3. Angular parse HTML
4. Angular bind data → render UI

💡 Khi gặp lỗi:

* `{{ }}` hiện nguyên text
  → 90% là Angular **chưa bootstrap**

---

## 5️⃣ Tư duy “HTML = View logic”

AngularJS cho phép:

```html
<li ng-repeat="phone in phones | filter:query">
```

👉 Logic **nằm trong HTML**

Điều này:

* ❌ Tốt cho project nhỏ
* ⚠️ Nguy hiểm cho project lớn nếu lạm dụng

💡 Step 02 là lần đầu bạn thấy:

> “Logic có thể nằm trong template”

---

# II. 20% cốt lõi BỔ SUNG (ngoài những gì bạn đã hỏi)

Nếu phải bổ sung thêm **20% quan trọng nhất** trong Step 02 thì là:

---

### 🔥 1. AngularJS = Data-driven UI

Không phải event-driven như jQuery

---

### 🔥 2. Không đụng DOM, chỉ đụng data

Muốn UI đổi → đổi data

---

### 🔥 3. HTML có logic nhưng phải kiểm soát

Template mạnh nhưng dễ bị lạm dụng

---

### 🔥 4. `$scope` là cầu nối View ↔ Controller

Không có scope → không có binding

---

# III. Khi đọc AngularJS docs, BẠN NÊN ĐẶT CÂU HỎI NHƯ THẾ NÀO?

Đây là phần **quan trọng nhất** bạn hỏi 👍
👉 Cách đặt câu hỏi quyết định bạn hiểu **20% hay 80%**

---

## 🧠 Bộ câu hỏi “chuẩn senior” khi đọc MỖI STEP

### 1️⃣ Cái này thay thế thứ gì trong JS truyền thống?

> “Nếu không có AngularJS thì mình phải viết bao nhiêu JS?”

---

### 2️⃣ Dữ liệu nằm ở đâu? Ai sở hữu?

> “Data này thuộc controller, scope hay view?”

---

### 3️⃣ Khi data đổi, chuyện gì xảy ra?

> “Angular update UI bằng cách nào?”

---

### 4️⃣ Cái này có chạy mỗi lần digest không?

(ng-repeat, filter, expression)

> “Có ảnh hưởng performance không?”

---

### 5️⃣ Trong project lớn, cái này nên dùng hay hạn chế?

> “Best practice hay chỉ demo?”

---

## IV. Mẫu câu hỏi 20% → 80% (bạn có thể dùng y nguyên)

Khi đọc **bất kỳ danh mục nào trong AngularJS docs**, hãy hỏi:

> 🔹 *Cốt lõi của feature này là gì?*
> 🔹 *Dùng trong case thực tế nào?*
> 🔹 *Dùng sai thì lỗi thường gặp là gì?*
> 🔹 *Có ảnh hưởng performance không?*
> 🔹 *Khi debug thì nhìn vào đâu?*

---

## V. Gợi ý lộ trình đọc AngularJS đúng cách

| Step    | Câu hỏi trọng tâm                  |
| ------- | ---------------------------------- |
| Step 02 | View + Binding                     |
| Step 03 | Controller làm gì, KHÔNG làm gì    |
| Step 04 | Filter có nên dùng trong template? |
| Step 05 | Routing ảnh hưởng kiến trúc app    |

---

Nếu bạn muốn 👉
➡️ Mình có thể **viết sẵn checklist câu hỏi cho từng Step AngularJS**
➡️ Hoặc **so sánh Step 02 với code AngularJS trong Cordova project của bạn**

Chỉ cần nói tiếp 👍
