<dropdown-list-multiple-pte 
class="form-control intl-tel-input d-block full-width-phone custom-dropdown-multiple-pte"
                            ng-class="" id="clinic-status" 
                            item-sources="clinicSearchCriteria.clinicStatus" 
                            has-search-box="false"
                            placeholder="'Clinic Status'">
                          </dropdown-list-multiple-pte>
t không thấy class và ng-class khai báo trong dropdownListMultiplePtE.js
làm sao dropdown-list-multiple-pte hiểu được class và ng-class?

## Giải thích về `class` và `ng-class` trong Custom Directive

### **TL;DR**: Class và ng-class được áp dụng TỰ ĐỘNG lên element directive, không cần khai báo trong directive definition.

---

## 1. **Cách AngularJS xử lý attributes trên directive**

Khi bạn sử dụng directive như này:

```html
<dropdown-list-multiple-pte 
    class="form-control custom-dropdown"
    ng-class="{'active': isActive}"
    id="clinic-status">
</dropdown-list-multiple-pte>
```

AngularJS tự động:
1. ✅ **Giữ nguyên** các attributes chuẩn như `class`, `id`, `style`
2. ✅ **Compile** các directive attributes như `ng-class`, `ng-if`, `ng-show`
3. ✅ **Áp dụng** tất cả lên element thật của directive

---

## 2. **Cơ chế hoạt động**

### **Bước 1: Directive compile**

```javascript
angular
  .module("PtEMobile")
  .directive("dropdownListMultiplePte", function () {
    return {
      restrict: "E",
      scope: { /* isolated scope */ },
      templateUrl: "views/templateDirectives/dropdownListMultiplePtE.html",
      // AngularJS TỰ ĐỘNG xử lý class, ng-class từ HTML gọi directive
      // KHÔNG CẦN khai báo trong directive definition
    };
  });
```

### **Bước 2: AngularJS render**

````html
<!-- HTML bạn viết -->
<dropdown-list-multiple-pte 
    class="form-control custom-dropdown"
    ng-class="{'active': isActive}"
    id="clinic-status">
</dropdown-list-multiple-pte>

<!-- AngularJS compile và render thành -->
<dropdown-list-multiple-pte 
    class="form-control custom-dropdown active"  <!-- class + ng-class được merge -->
    id="clinic-status">
    
    <!-- Nội dung từ templateUrl được insert vào đây -->
    <div class="dropdown-wrapper">
        <!-- ... template content ... -->
    </div>
    
</dropdown-list-multiple-pte>
````

---

## 3. **Template của directive nhận class như thế nào?**

### **Template file:**

````html
<div class="dropdown-list-multiple-pte-wrapper">
    <!-- Content của directive -->
    <button class="dropdown-list__toggle" ng-click="showDropdownList($mdMenu, $event)">
        {{itemObject.selectedText || placeholder}}
    </button>
    
    <md-menu-content class="{{menuContentUniqueClass}}">
        <!-- Dropdown items -->
    </md-menu-content>
</div>
````

### **Kết quả cuối cùng trong DOM:**

````html
<dropdown-list-multiple-pte 
    class="form-control intl-tel-input d-block full-width-phone custom-dropdown-multiple-pte"
    id="clinic-status">
    
    <!-- Template được insert vào đây -->
    <div class="dropdown-list-multiple-pte-wrapper">
        <button class="dropdown-list__toggle">
            Clinic Status
        </button>
        <md-menu-content>...</md-menu-content>
    </div>
    
</dropdown-list-multiple-pte>
````

---

## 4. **Nếu muốn truy cập class từ bên trong directive?**

### **Cách 1: Sử dụng `$element`**

```javascript
controller: function ($scope, $element) {
    // Lấy danh sách class từ element directive
    var classes = $element.attr('class');
    console.log('Classes:', classes);
    // Output: "form-control intl-tel-input d-block full-width-phone custom-dropdown-multiple-pte"
    
    // Kiểm tra có class cụ thể không
    var hasFormControl = $element.hasClass('form-control');
    console.log('Has form-control:', hasFormControl); // true
    
    // Thêm class từ controller
    $element.addClass('my-custom-class');
}
```

### **Cách 2: Thêm class vào scope config (nếu cần)**

```javascript
angular
  .module("PtEMobile")
  .directive("dropdownListMultiplePte", function () {
    return {
      restrict: "E",
      scope: {
        ngModel: "=",
        customClass: "@", // Nhận class từ attribute
        // ...existing scope properties
      },
      link: function(scope, element, attrs) {
        // Thêm custom class từ attribute
        if (scope.customClass) {
          element.addClass(scope.customClass);
        }
      }
    };
  });
```

Sử dụng:

```html
<dropdown-list-multiple-pte 
    class="form-control"
    custom-class="my-special-class"
    item-sources="data">
</dropdown-list-multiple-pte>
```

---

## 5. **So sánh với React**

| AngularJS Directive | React Component |
|---------------------|-----------------|
| `class` tự động apply lên element | Phải manually spread `className` prop |
| `ng-class` tự động compile | Phải tự xử lý conditional classes |
| Element directive giữ nguyên trong DOM | Component render thành div/span |

### **React equivalent:**

```jsx
// React Component
function DropdownMultiple({ className, ...props }) {
    // Phải MANUALLY handle className
    return (
        <div className={`dropdown-wrapper ${className || ''}`}>
            {/* component content */}
        </div>
    );
}

// Usage
<DropdownMultiple 
    className="form-control custom-dropdown"
    itemSources={data}
/>
```

### **AngularJS tự động hơn:**

```html
<!-- AngularJS - TỰ ĐỘNG apply class -->
<dropdown-list-multiple-pte 
    class="form-control custom-dropdown"
    item-sources="data">
</dropdown-list-multiple-pte>
```

---

## 6. **Debugging - Xem class được apply như thế nào**

### **Chrome DevTools:**

1. Mở DevTools (F12)
2. Inspect element `<dropdown-list-multiple-pte>`
3. Xem tab **Elements** → Classes được list đầy đủ
4. Tab **Styles** → Xem các CSS rules được apply

### **Code debug:**

```javascript
link: function(scope, element, attrs) {
    console.log('Element classes:', element.attr('class'));
    console.log('All attributes:', attrs);
    console.log('ng-class value:', attrs.ngClass);
    
    // Watch ng-class changes
    scope.$watch(function() {
        return element.attr('class');
    }, function(newClasses) {
        console.log('Classes changed to:', newClasses);
    });
}
```

---

## **Kết luận:**

✅ **`class` và `ng-class` KHÔNG CẦN khai báo** trong directive definition  
✅ **AngularJS tự động áp dụng** tất cả attributes lên element directive  
✅ **Directive template** được insert VÀO TRONG element, không thay thế element  
✅ **Muốn truy cập class** → dùng `$element` trong controller/link function  

**AngularJS xử lý attributes tự động, khác với React phải manual handle props!**