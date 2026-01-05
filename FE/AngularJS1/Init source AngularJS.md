# Hướng dẫn khởi tạo AngularJS 1.x đơn giản

Dựa vào cấu trúc project hiện tại của bạn, tôi sẽ hướng dẫn setup AngularJS 1.x:

## Bước 1: Cập nhật package.json

```json
{
  "name": "angularjsweb",
  "version": "1.0.0",
  "description": "AngularJS 1.x Learning Project",
  "main": "index.js",
  "scripts": {
    "start": "live-server app/ --port=3000"
  },
  "dependencies": {
    "angular": "^1.8.2",
    "angular-route": "^1.8.2"
  },
  "devDependencies": {
    "live-server": "^1.2.2"
  }
}
```

## Bước 2: Cài đặt packages

```bash
npm install
```

## Bước 3: Tạo cấu trúc thư mục

```
AngularjsWeb/
├── app/
│   ├── index.html
│   ├── app.js
│   ├── controllers/
│   │   └── main.controller.js
│   ├── services/
│   └── css/
│       └── style.css
├── node_modules/
└── package.json
```

## Bước 4: Tạo file index.html

```html
<!DOCTYPE html>
<html ng-app="myApp">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>AngularJS Learning</title>
    <link rel="stylesheet" href="css/style.css" />
  </head>
  <body>
    <div ng-controller="MainController">
      <h1>{{ title }}</h1>

      <div>
        <input type="text" ng-model="name" placeholder="Nhập tên của bạn" />
        <p>Xin chào, {{ name }}!</p>
      </div>

      <div>
        <h2>Danh sách Todo:</h2>
        <input type="text" ng-model="newTodo" placeholder="Thêm todo mới" />
        <button ng-click="addTodo()">Thêm</button>

        <ul>
          <li ng-repeat="todo in todos">
            {{ todo }}
            <button ng-click="removeTodo($index)">Xóa</button>
          </li>
        </ul>
      </div>
    </div>

    <!-- AngularJS Library -->
    <script src="../node_modules/angular/angular.min.js"></script>

    <!-- App Files -->
    <script src="app.js"></script>
    <script src="controllers/main.controller.js"></script>
  </body>
</html>
```

## Bước 5: Tạo file app.js (module chính)

```javascript
// Khởi tạo AngularJS module
angular.module("myApp", []);
```

## Bước 6: Tạo controller

```javascript
angular.module("myApp").controller("MainController", [
  "$scope",
  function ($scope) {
    // Khởi tạo data
    $scope.title = "Học AngularJS 1.x";
    $scope.name = "Bạn";
    $scope.todos = ["Học AngularJS", "Làm bài tập", "Thực hành"];
    $scope.newTodo = "";

    // Thêm todo
    $scope.addTodo = function () {
      if ($scope.newTodo) {
        $scope.todos.push($scope.newTodo);
        $scope.newTodo = "";
      }
    };

    // Xóa todo
    $scope.removeTodo = function (index) {
      $scope.todos.splice(index, 1);
    };
  },
]);
```

## Bước 7: Tạo CSS cơ bản

```css
body {
  font-family: Arial, sans-serif;
  max-width: 800px;
  margin: 50px auto;
  padding: 20px;
  background: #f5f5f5;
}

h1 {
  color: #dd0031;
}

input {
  padding: 10px;
  margin: 10px 0;
  width: 300px;
}

button {
  padding: 10px 20px;
  background: #dd0031;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background: #c50028;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  background: white;
  margin: 10px 0;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
```

## Bước 8: Chạy project

```bash
npm start
```

Truy cập: `http://localhost:3000`

---

## Các khái niệm cơ bản cần nhớ:

- **ng-app**: Khai báo AngularJS application
- **ng-controller**: Định nghĩa controller
- **ng-model**: Two-way data binding
- **ng-click**: Xử lý sự kiện click
- **ng-repeat**: Lặp qua array
- **{{ }}**: Hiển thị data (interpolation)

Chúc bạn học tốt! 🚀
