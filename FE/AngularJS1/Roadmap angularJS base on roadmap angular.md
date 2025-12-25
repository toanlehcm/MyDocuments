# [Roadmap angularJS base on roadmap angular](https://roadmap.sh/angular). Dựa vào roadmap angular, cho t roadmap angularJS 1 có format như vậy

Dưới đây là **AngularJS 1 Roadmap** được **tổ chức giống với roadmap.sh style** — tức là từng bước từ cơ bản tới nâng cao, rõ ràng, đầy đủ để bạn “biết mình đang đi đâu và cần học gì tiếp theo”.
Tập trung vào **những thứ bạn cần để làm việc thực tế trong dự án AngularJS 1**.

---

# 🚀 AngularJS 1 Roadmap (version roadmap.sh style)

---

## 🧰 1. Fundamentals — Cốt lõi bạn phải biết

### 🔹 Setup & Tools

* Tải AngularJS 1 (bản 1.5–1.8)
* Cách include AngularJS bằng `<script>`
* DevTools basics (Console, Elements, Network)

### 🔹 App Structure

* Modules: `angular.module(...)`
* Bootstrapping app: `ng-app`

### 🔹 Data Binding

* Interpolation: `{{ value }}`
* One-way vs Two-way binding (`ng-bind`, `ng-model`)

### 🔹 Scope

* `$scope` basics
* Controller scoping
* Nested scopes

### 🔹 Controllers

* Define controller
* Attach to DOM with `ng-controller`
* Functions on `$scope`

---

## 📊 2. Core Features — Dùng hàng ngày

### 🔹 Directives (built-in)

* `ng-repeat`
* `ng-if`, `ng-show`, `ng-hide`
* `ng-class`, `ng-style`
* `ng-click`, `ng-change`

### 🔹 Forms & Validation

* `ng-model`
* Built-in validation states
* `ng-submit`

### 🔹 Filters

* Built-in (`currency`, `date`, `uppercase`)
* How to use: `{{ value | filterName }}`

### 🔹 Services & DI (Dependency Injection)

* `$http`
* `$q` (promise)
* Custom services (`factory`, `service`, `value`)

---

## 📍 3. Application Architecture — tổ chức code

### 🔹 Routing

* `ngRoute` or `ui-router`
* `ng-view`, `$routeProvider`

### 🔹 Component Structure

* Emulation of components
* Custom directives

### 🔹 Communication Patterns

* Shared services for cross-controller communication
* Events (`$emit`, `$broadcast`, `$on`)

---

## ⚙️ 4. Advanced Features — 20% nâng cao (80% task)

### 🔹 Custom Directives

* `restrict` (E, A)
* Isolate scope
* Template/templateUrl

### 🔹 Custom Filters

* Write and register
* Use in views & controllers

### 🔹 Promises & Async

* `$http` + `$q`
* Promise chaining

### 🔹 Performance

* One-time binding (`::`)
* `track by` in `ng-repeat`

---

## 🧪 5. Testing — quality & maintainability

### 🔹 Unit Testing

* Jasmine basics
* Test controllers
* Test filters
* Mock services

### 🔹 End-to-End Testing

* Protractor basics
* Running e2e tests

---

## 🧰 6. Build & Tooling (optional but useful)

### 🔹 Task Runners

* Grunt / Gulp

### 🔹 Package Management

* Bower (common in AngularJS worlds)
* npm integration

### 🔹 Module Bundlers

* Browserify / Webpack (optional)

---

## 📚 7. Migration & Legacy

### 🔹 AngularJS 1 Lifecycle

* How digest cycle works
* Watchers & performance

### 🔹 Upgrade paths

* ngUpgrade (if integrating AngularJS with Angular)
* Strategies for migrating to Angular / React / Vue

---

# 🧠 WHY THESE STEPS?

| Stage            | Why it matters                       |
| ---------------- | ------------------------------------ |
| Fundamentals     | Làm được view + data cơ bản          |
| Core Features    | 80% UI interaction bạn gặp hàng ngày |
| App Architecture | Giúp bạn tổ chức code lớn            |
| Advanced         | Giải quyết tình huống phức tạp       |
| Testing          | Giữ code ổn định                     |
| Tooling          | Làm việc chuyên nghiệp               |
| Migration        | Dự án lâu dài                        |

---

# 🎯 20% kiến thức **cốt lõi nhất** để làm 80% công việc AngularJS 1

* **Data binding**
* **Controllers & $scope**
* **Directives built-in**
* **Services & $http**
* **Routing**
* **Custom directives**
* **One-time binding & performance**
* **Module structure + DI**
* **Basic testing**

👉 Sau khi nắm được những thứ này, bạn có thể:

* Xây layout + form
* Call API
* Build SPA navigation
* Debug UI / data issues
* Maintain existing codebase

---

# 🧠 Những khái niệm liên quan bạn nên đọc thêm

* AngularJS digest cycle & watchers
* Scopes hierarchy & prototypal inheritance
* Difference between directive types (`E`, `A`, `C`)
* Differences between `controller` và component pattern
* How AngularJS ng-repeat track by improves performance

---

# ✍️ Cách tự kiểm tra kiến thức

Bạn có thể tự hỏi / kiểm tra:

✔ Viết controller + bind form data
✔ Viết custom directive with isolate scope
✔ Call API with `$http` + show results
✔ Configure routes with multiple views
✔ Explain how digest cycle updates view
✔ Identify performance bottleneck in ng-repeat
✔ Write unit test for controller / filter

---

## 🧠 Tips để giải thích cho người khác

➡ **AngularJS là MVW framework**, nơi:

* **Model** (data) bind → **View** (UI) tự động cập nhật
* **Controller** xử lý logic
* **Directive** mở rộng HTML
* **Service** giữ business logic / API

---

Nếu bạn muốn, mình có thể:
👉 Tạo **mind-map visual** cho roadmap này
👉 Cho **checklist quiz** để đánh giá kỹ năng
👉 So sánh **AngularJS 1 vs Angular (2+)** theo từng chủ đề

Chỉ cần nói “generate checklist/quiz” nhé!
