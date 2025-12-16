# 20% hoc core kiến thức AngularJS

OK 👍
Vì bạn đang **học AngularJS 1** và muốn áp dụng **nguyên lý 20/80**, mình sẽ **chắt lọc đúng phần “sống còn”** để bạn **làm được ~80% task thực tế trong project AngularJS 1**, **không lan man**.

---

# 🎯 Mục tiêu

* **Hiểu đúng cách AngularJS 1 vận hành**
* **Đọc – sửa – thêm feature** trong codebase cũ
* **Không cần master hết tutorial**, chỉ cần **core để làm việc**

---

# 🧠 Bức tranh tổng thể (rất quan trọng – đọc trước)

AngularJS 1 xoay quanh **4 trục chính**:

1. **Data Binding** (View ↔ Model)
2. **Controller + $scope**
3. **Directive (HTML mở rộng)**
4. **Service + DI (logic & API)**

👉 80% công việc thực tế =

> **Binding dữ liệu + xử lý sự kiện + gọi API + hiển thị UI**

---

# 🧩 20% CORE KIẾN THỨC (lọc từ danh mục tutorial)

Từ danh sách bạn gửi, đây là **những mục BẮT BUỘC**, theo đúng thứ tự nên học 👇

---

## 🔥 CORE #1 – Static Template + Binding

📚 (Tutorial 1, 5, 6)

### Bạn cần học:

* `{{ expression }}`
* `ng-model`
* `ng-repeat`
* `ng-if`, `ng-show`, `ng-hide`
* Two-way binding

### Ví dụ:

```html
<input ng-model="user.name">
<p>Hello {{ user.name }}</p>

<ul>
  <li ng-repeat="item in items">
    {{ item.title }}
  </li>
</ul>
```

### ❓ Tại sao đây là core?

* 90% màn hình = **hiển thị data**
* Nếu không hiểu binding → **không debug được bug UI**

---

## 🔥 CORE #2 – Controller & $scope

📚 (Tutorial 3, 11)

### Bạn cần học:

* `ng-controller`
* `$scope`
* function trong `$scope`
* lifecycle cơ bản

### Ví dụ:

```js
app.controller('UserCtrl', function($scope) {
  $scope.count = 0;

  $scope.increase = function () {
    $scope.count++;
  };
});
```

```html
<div ng-controller="UserCtrl">
  <button ng-click="increase()">+</button>
  {{ count }}
</div>
```

### ❓ Tại sao?

* AngularJS 1 **không có hooks**
* `$scope` là **trung tâm dữ liệu**
* 80% bug AngularJS = `$scope` sai / không update

---

## 🔥 CORE #3 – Event Handlers (User Interaction)

📚 (Tutorial 12)

### Cần nắm:

* `ng-click`
* `ng-change`
* `ng-submit`

### Ví dụ:

```html
<form ng-submit="save()">
  <input ng-model="user.email">
  <button type="submit">Save</button>
</form>
```

### ❓ Tại sao?

* Toàn bộ CRUD = **event → function → API**
* Không hiểu event = không làm được form

---

## 🔥 CORE #4 – Services + Dependency Injection

📚 (Tutorial 7, 13)

### Cần nắm:

* `service`, `factory`
* Inject vào controller
* `$http`

### Ví dụ:

```js
app.service('UserService', function($http) {
  this.getUsers = function() {
    return $http.get('/api/users');
  };
});
```

```js
app.controller('UserCtrl', function($scope, UserService) {
  UserService.getUsers().then(res => {
    $scope.users = res.data;
  });
});
```

### ❓ Tại sao?

* **Logic không được viết trong controller**
* API, business logic đều nằm ở Service
* Đây là **xương sống project thật**

---

## 🔥 CORE #5 – Routing (Single Page App)

📚 (Tutorial 9)

### Cần nắm:

* `ngRoute`
* `$routeProvider`
* `ng-view`

### Ví dụ:

```js
app.config(function($routeProvider) {
  $routeProvider
    .when('/users', {
      templateUrl: 'users.html',
      controller: 'UserCtrl'
    });
});
```

### ❓ Tại sao?

* Project AngularJS 1 **luôn là SPA**
* Không hiểu routing = **lạc trong codebase**

---

## 🔥 CORE #6 – Custom Directive (chỉ mức cơ bản)

📚 (Tutorial 3, 11)

⚠️ **KHÔNG cần master** directive phức tạp

### Chỉ cần:

* directive dạng element
* `scope` đơn giản

### Ví dụ:

```js
app.directive('userCard', function() {
  return {
    restrict: 'E',
    scope: {
      user: '='
    },
    template: `<div>{{ user.name }}</div>`
  };
});
```

### ❓ Tại sao?

* Rất nhiều project cũ dùng directive để build UI
* Bạn cần **đọc hiểu**, không cần viết nâng cao

---

# ❌ 80% KHÔNG CẦN HỌC NGAY

| Mục                | Lý do                  |
| ------------------ | ---------------------- |
| Animations         | Ít dùng, tốn thời gian |
| Custom Filters     | Dễ thay bằng function  |
| XHR sâu            | `$http` là đủ          |
| Advanced directive | Hiếm khi phải viết     |

---

# 🪜 LỘ TRÌNH HỌC TỪNG BƯỚC (7–10 ngày)

## Ngày 1–2

✔ Binding
✔ ng-repeat
✔ ng-model

👉 Viết **1 màn hình list + search**

---

## Ngày 3

✔ Controller
✔ $scope
✔ ng-click

👉 CRUD giả bằng array

---

## Ngày 4–5

✔ Service
✔ $http
✔ Inject

👉 Call API thật / mock

---

## Ngày 6

✔ Routing

👉 2 page: list → detail

---

## Ngày 7

✔ Đọc directive có sẵn
✔ Viết directive đơn giản

---

# 🧠 Vì sao cách này hiệu quả?

1. AngularJS 1 **đã cũ**
2. Project thực tế:

   * ❌ không clean
   * ❌ nhiều legacy
3. Bạn cần:

   * **đọc code**
   * **sửa bug**
   * **thêm feature nhỏ**

👉 **20% kiến thức trên = sống sót + làm việc được**

---

Nếu bạn muốn, mình có thể:

* ✅ Chuyển tutorial này thành **mindmap**
* ✅ Cho **bài tập thực tế giống project công ty**
* ✅ So sánh AngularJS 1 ↔ React để dễ nhớ

👉 Bạn muốn tiếp theo theo hướng nào?
