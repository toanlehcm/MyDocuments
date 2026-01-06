# AngularJS Tutorial Step 0 - Bootstrapping

## Nội dung chính của Step 00

Step 0 hướng dẫn thiết lập môi trường và tạo ứng dụng AngularJS đầu tiên với cấu trúc cơ bản.

## Hướng dẫn chi tiết từng bước

### Bước 1: Cài đặt môi trường

```bash
# Cài đặt Node.js và npm (nếu chưa có)
# Kiểm tra version
node --version
npm --version
```

### Bước 2: Tạo cấu trúc thư mục

```
angular-phonecat/
├── app/
│   ├── index.html
│   ├── app.js
│   └── app.css
├── package.json
└── bower.json (hoặc dùng npm)
```

### Bước 3: Cài đặt AngularJS

```bash
# Sử dụng npm
npm install angular
```

### Bước 4: Tạo file HTML cơ bản

````html
<!DOCTYPE html>
<html ng-app>
  <head>
    <meta charset="UTF-8" />
    <title>AngularJS Phone Catalog App</title>
    <link rel="stylesheet" href="app.css" />
  </head>
  <body>
    <p>Nothing here {{'yet' + '!'}}</p>

    <!-- AngularJS Library -->
    <script src="../node_modules/angular/angular.min.js"></script>
  </body>
</html>
````

### Bước 5: Chạy ứng dụng

```bash
# Cài đặt http-server
npm install -g http-server

# Chạy server
cd app
http-server -o
```

### Bước 6: Thêm tính năng động

````html
<!DOCTYPE html>
<html ng-app>
  <head>
    <meta charset="UTF-8" />
    <title>AngularJS Phone Catalog App</title>
    <link rel="stylesheet" href="app.css" />
  </head>
  <body>
    <h1>AngularJS Phone Catalog</h1>
    
    <!-- Two-way data binding demo -->
    <div>
      <label>Name:</label>
      <input type="text" ng-model="yourName" placeholder="Enter a name here">
      <hr>
      <h2>Hello {{yourName}}!</h2>
    </div>

    <!-- AngularJS Library -->
    <script src="../node_modules/angular/angular.min.js"></script>
  </body>
</html>
````

### Bước 7: Thêm CSS (tùy chọn)

````css
body {
  font-family: Arial, sans-serif;
  padding: 20px;
}

h1 {
  color: #333;
}

input {
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
````

---

## 20% Cốt lõi để giải thích (Tóm tắt)

### 🎯 3 Điểm Quan Trọng Nhất:

1. **`ng-app` directive**: Khai báo ứng dụng AngularJS
   - Đặt ở thẻ `<html>` hoặc `<body>`
   - Khởi tạo AngularJS framework

2. **`ng-model` directive**: Two-way data binding
   - Liên kết input với biến trong scope
   - Tự động cập nhật khi dữ liệu thay đổi

3. **`{{ }}` - Expression binding**: Hiển thị dữ liệu
   - In giá trị biến ra HTML
   - Tự động cập nhật khi biến thay đổi

### 📝 Code tối giản để demo:

```html
<!DOCTYPE html>
<html ng-app>
  <head>
    <script src="angular.min.js"></script>
  </head>
  <body>
    <input ng-model="name">
    <p>Hello {{name}}!</p>
  </body>
</html>
```

### 💡 Giải thích cho người khác:

> "AngularJS Step 0 dạy 3 thứ cơ bản: 
> 1. Thêm `ng-app` để bật AngularJS
> 2. Dùng `ng-model` để liên kết input với dữ liệu
> 3. Dùng `{{}}` để hiển thị dữ liệu
> 
> Khi gõ vào ô input, chữ tự động hiện ra bên dưới - đó là two-way binding!"