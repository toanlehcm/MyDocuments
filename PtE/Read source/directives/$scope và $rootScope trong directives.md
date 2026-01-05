$scope và $rootScope có phải là props từ bên ngoài truyền vào?
$scope và $rootScope được khởi tạo ở đâu và như thế nào?
Làm sao biết được $scope và $rootScope có các thuộc tính gì? các thuộc tính này được khởi tạo ở đâu, lấy value ở đâu? VD $scope.randomId, $rootScope.appType
nếu so sánh với reactjs thì $scope và $rootScope có giống với props giữa các component hoặc các thuộc tính trong store của redux phải không? Cái nào là so sánh gần giống nhất?

## Giải thích về `$scope` và `$rootScope` trong AngularJS

### 1. **`$scope` và `$rootScope` KHÔNG phải là props từ bên ngoài**

Chúng là **dependency injection** của AngularJS - được framework tự động inject vào controller/directive.

### 2. **Cách khởi tạo**

````javascript
// AngularJS tự động inject khi bạn khai báo trong function parameters
.controller('MyController', function($scope, $rootScope) {
    // $scope và $rootScope đã sẵn sàng để dùng
    // AngularJS framework tự động khởi tạo và inject chúng
})

.directive('myDirective', function($rootScope) {
    return {
        controller: function($scope, $rootScope) {
            // Cả $scope và $rootScope đều được inject tự động
        }
    }
})
````

### 3. **Phân biệt `$scope` và `$rootScope`**

#### **`$scope` (Local Scope)**
- Mỗi controller/directive có `$scope` riêng
- Chỉ tồn tại trong phạm vi component đó
- Khi component bị destroy, `$scope` cũng bị destroy
- **Scope hierarchy**: Child scope kế thừa từ parent scope

````javascript
// Controller A
.controller('ControllerA', function($scope) {
    $scope.name = "Controller A"; // Chỉ tồn tại trong ControllerA
})

// Controller B 
.controller('ControllerB', function($scope) {
    $scope.name = "Controller B"; // Scope riêng, không ảnh hưởng ControllerA
})
````

#### **`$rootScope` (Global Scope)**
- **Chỉ có DUY NHẤT 1 instance** trong toàn bộ app
- Giống như global state, tồn tại suốt vòng đời app
- Mọi `$scope` đều kế thừa từ `$rootScope`
- Dùng để share data giữa các component

````javascript
// Anywhere in app
.controller('CtrlA', function($rootScope) {
    $rootScope.appType = 'MOBILE'; // Set global state
})

// Another place
.controller('CtrlB', function($rootScope) {
    console.log($rootScope.appType); // 'MOBILE' - truy cập được
})
````

### 4. **Thuộc tính được khởi tạo ở đâu?**

#### Trong code của bạn:

````javascript
controller: function ($scope, $rootScope, $q, api, $element, $mdMenu, $timeout, commonService) {
    // CÁC THUỘC TÍNH CỦA $scope được khởi tạo NGAY TẠI ĐÂY:
    
    // 1. Khởi tạo thuộc tính mới
    $scope.randomId = Math.random().toString(36).slice(2, 7);
    $scope.dropdownId = Math.random().toString(36).slice(2, 7);
    $scope.menuContentUniqueClass = Math.random().toString(36).slice(2, 7);
    
    // 2. Khởi tạo từ directive scope (được truyền từ HTML)
    // Những thuộc tính này được định nghĩa trong directive scope config:
    scope: {
        ngModel: "=",
        ngChange: "=",
        itemSources: "=",
        // ...
    }
    // Sau đó có thể truy cập: $scope.ngModel, $scope.itemSources, etc.
    
    // 3. $rootScope.appType - được khởi tạo ở nơi khác (thường là app.js hoặc main controller)
    if ($rootScope.appType === AppTypeConst.APP) {
        // Giá trị này được set ở file khác, có thể là:
        // - app.js: $rootScope.appType = 'APP';
        // - Một controller cha nào đó
    }
}
````

#### Để tìm nơi khởi tạo `$rootScope.appType`:

1. **Search trong project**: `Ctrl+Shift+F` → tìm `$rootScope.appType =`
2. **Thường ở các file**:
   - `app.js` hoặc `main.js`
   - App config hoặc run block
   - Root controller

````javascript
// Ví dụ có thể ở: d:\SVN\PTE-9300\Client\app\scripts\app.js
angular.module('PtEMobile')
    .run(function($rootScope) {
        // Khởi tạo global state
        $rootScope.appType = AppTypeConst.APP;
        $rootScope.currentUser = {};
        // ...
    });
````

### 5. **So sánh với ReactJS**

#### **`$scope` ≈ Component State + Props (kết hợp)**

````javascript
// AngularJS
$scope.randomId = '123';
$scope.itemSources = [...]; // từ directive scope config

// React equivalent
const [randomId] = useState('123');
const { itemSources } = props; // từ parent component
````

#### **`$rootScope` ≈ Redux Store (gần nhất)**

| AngularJS `$rootScope` | React equivalent |
|----------------------|------------------|
| Global state | Redux store / Context API |
| `$rootScope.appType` | `store.getState().appType` |
| Tự động sync giữa components | `useSelector()` hoặc `connect()` |
| Mọi component đều truy cập được | Provider bọc toàn app |

````javascript
// AngularJS
$rootScope.appType = 'MOBILE';
// Mọi controller tự động thấy thay đổi

// React + Redux
dispatch({ type: 'SET_APP_TYPE', payload: 'MOBILE' });
// Components dùng useSelector() để lấy
const appType = useSelector(state => state.appType);
````

### 6. **Cách biết `$scope` có thuộc tính gì?**

#### **Phương pháp 1: Đọc code**
````javascript
controller: function ($scope) {
    // Đọc từ trên xuống, tìm các dòng gán:
    $scope.randomId = ...;      // ✓ Có thuộc tính randomId
    $scope.dropdownId = ...;    // ✓ Có thuộc tính dropdownId
    $scope.changeItem = ...;    // ✓ Có method changeItem
}
````

#### **Phương pháp 2: Debug trong browser**
````javascript
controller: function ($scope) {
    console.log('$scope properties:', Object.keys($scope));
    console.log('$rootScope properties:', Object.keys($rootScope));
    
    // Hoặc dùng debugger
    debugger; // Dừng ở đây và inspect trong DevTools
}
````

#### **Phương pháp 3: Dùng AngularJS Batarang Extension**
- Chrome extension để inspect scope hierarchy
- Xem tất cả properties của `$scope` và `$rootScope`

### 7. **Điểm khác biệt quan trọng với React**

| Feature | AngularJS | React |
|---------|-----------|-------|
| **Auto-binding** | ✅ Two-way binding tự động | ❌ Phải setState() thủ công |
| **Global state** | `$rootScope` built-in | ❌ Cần Redux/Context |
| **Dependency Injection** | ✅ Framework inject tự động | ❌ Phải import/props drilling |
| **Prototype chain** | ✅ Child scope kế thừa parent | ❌ Props chỉ đi xuống |

### **Kết luận:**

- `$scope` ≈ **Component state + props** (gần nhất với `useState` + `props`)
- `$rootScope` ≈ **Redux store** (global state pattern)
- Nhưng AngularJS có **two-way binding** và **prototype inheritance** nên không giống 100%
- So sánh GẦN NHẤT: **`$rootScope` = Redux store**, **`$scope` = component instance với state và props kết hợp**