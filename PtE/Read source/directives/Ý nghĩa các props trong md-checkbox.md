## Giải thích từng property của `md-checkbox`:

### **1. `class="custom-form-control m-0 mb-2 mb-sm-0 mr-3 d-block font-weight-600 text-black"`**

**Ý nghĩa:** CSS classes để styling

| Class | Ý nghĩa | Cần thiết? |
|-------|---------|------------|
| `custom-form-control` | Custom styling cho form control | ✅ Cần (nếu có CSS custom) |
| `m-0` | margin: 0 | ✅ Cần (reset margin mặc định) |
| `mb-2` | margin-bottom: 0.5rem (mobile) | ✅ Cần (spacing mobile) |
| `mb-sm-0` | margin-bottom: 0 (≥576px) | ✅ Cần (remove spacing desktop) |
| `mr-3` | margin-right: 1rem | ✅ Cần (spacing giữa checkboxes) |
| `d-block` | display: block | ⚠️ Không cần thiết (md-checkbox mặc định là block) |
| `font-weight-600` | font-weight: 600 | ❌ KHÔNG TỒN TẠI trong Bootstrap 4 |
| `text-black` | color: black | ⚠️ Tùy chọn (nếu muốn override color) |

---

### **2. `aria-label="not-converted"`**

**Ý nghĩa:** Accessibility label cho screen readers

```html
aria-label="not-converted"
```

**Cần thiết?** ✅ **CÓ** - Quan trọng cho accessibility
- Screen reader đọc: "not-converted checkbox"
- Giúp người khuyết tật hiểu được mục đích của checkbox

**Best practice:**
```html
aria-label="Not Converted Subscription Filter"
```

---

### **3. `ng-true-value="'not_converted'"`**

**Ý nghĩa:** Giá trị khi checkbox được TICK

```javascript
// Khi tick checkbox
$scope.filterData.subscription.notConverted = 'not_converted'
```

**Cần thiết?** ✅ **CÓ** - Nếu muốn giá trị khác `true`

**Lưu ý:** Phải có **quotes kép ngoài, quotes đơn trong**
```html
ng-true-value="'not_converted'"  ✅ Đúng
ng-true-value="not_converted"     ❌ Sai (sẽ tìm biến not_converted)
```

---

### **4. `ng-false-value="undefined"`**

**Ý nghĩa:** Giá trị khi checkbox bị UNTICK

```javascript
// Khi untick checkbox
$scope.filterData.subscription.notConverted = undefined
```

**Cần thiết?** ⚠️ **TÙY CHỌN**
- Mặc định `ng-false-value` là `false`
- Dùng `undefined` để có thể check `if (value)` dễ hơn

**Alternative:**
```html
ng-false-value="false"    <!-- Boolean false -->
ng-false-value="''"       <!-- Empty string -->
ng-false-value="null"     <!-- Null -->
```

---

### **5. `ng-model="filterData.subscription.notConverted"`**

**Ý nghĩa:** Two-way data binding với scope variable

```javascript
$scope.filterData = {
    subscription: {
        notConverted: undefined  // Value lưu ở đây
    }
};
```

**Cần thiết?** ✅ **BẮT BUỘC** - Không có `ng-model` thì checkbox không hoạt động

---

### **6. `ng-change="updateSubscriptionFilter()"`**

**Ý nghĩa:** Function được gọi khi checkbox thay đổi (tick/untick)

```javascript
$scope.updateSubscriptionFilter = function() {
    console.log('Checkbox changed!');
    // Update filter logic
};
```

**Cần thiết?** ⚠️ **TÙY CHỌN** - Chỉ cần nếu muốn trigger action ngay lập tức

**Alternative:** Không dùng `ng-change`, chỉ submit khi click button "Apply"

---

## **Thay đổi để `not-converted` có value là `null` khi submit:**

### **Problem:**
```javascript
// Current code
ng-true-value="'not_converted'"

// Khi tick → value = 'not_converted' (string)
// Nhưng server cần null
```

### **Solution: Update `ng-true-value`**

````html
<md-checkbox class="custom-form-control m-0 mb-2 mb-sm-0 mr-3 d-block" 
    aria-label="Not Converted Subscription Filter" 
    ng-true-value="null"
    ng-false-value="undefined"
    ng-model="filterData.subscription.notConverted"
    ng-change="updateSubscriptionFilter()">
    {{'SystemAdmin.ConvertSubscription.NotConverted' | translate}}
</md-checkbox>
````

### **Controller update:**

````javascript
// Initialize
$scope.filterData = {
    subscription: {
        notConverted: undefined,  // null or 'not_converted'
        converted: undefined,     // 'converted'
        allNew: undefined         // 'all_new'
    }
};

// Update filter function
$scope.updateSubscriptionFilter = function() {
    var values = [];
    
    // Check each checkbox value
    if ($scope.filterData.subscription.notConverted === null) {
        values.push(null);  // ✓ Push null for not-converted
    }
    if ($scope.filterData.subscription.converted === 'converted') {
        values.push('converted');
    }
    if ($scope.filterData.subscription.allNew === 'all_new') {
        values.push('all_new');
    }
    
    // Store result
    $scope.clinicSearchCriteria.subscriptionStatus = values;
    
    console.log('Selected filters:', values);
    // Examples:
    // [] - nothing selected
    // [null] - only not-converted
    // ['converted'] - only converted
    // [null, 'converted', 'all_new'] - all selected
};
````

---

## **Recommended final HTML:**

````html
<!-- Not Converted: value = null -->
<md-checkbox class="custom-form-control m-0 mb-2 mb-sm-0 mr-3" 
    aria-label="Not Converted Subscription Filter" 
    ng-true-value="null"
    ng-false-value="undefined"
    ng-model="filterData.subscription.notConverted"
    ng-change="updateSubscriptionFilter()">
    <span class="checkbox-label">{{'SystemAdmin.ConvertSubscription.NotConverted' | translate}}</span>
</md-checkbox>

<!-- Converted: value = 'converted' -->
<md-checkbox class="custom-form-control m-0 mb-2 mb-sm-0 mr-3" 
    aria-label="Converted Subscription Filter" 
    ng-true-value="'converted'"
    ng-false-value="undefined"
    ng-model="filterData.subscription.converted"
    ng-change="updateSubscriptionFilter()">
    <span class="checkbox-label">{{'SystemAdmin.ConvertSubscription.Converted' | translate}}</span>
</md-checkbox>

<!-- All New: value = 'all_new' -->
<md-checkbox class="custom-form-control m-0 mb-2 mb-sm-0" 
    aria-label="All New Subscription Filter" 
    ng-true-value="'all_new'"
    ng-false-value="undefined"
    ng-model="filterData.subscription.allNew"
    ng-change="updateSubscriptionFilter()">
    <span class="checkbox-label">{{'SystemAdmin.ConvertSubscription.AllNew' | translate}}</span>
</md-checkbox>
````

---

## **Summary Table:**

| Property | Cần thiết? | Mục đích | Notes |
|----------|------------|----------|-------|
| `class` | ✅ Có | Styling | Bỏ `font-weight-600` (không tồn tại BS4) |
| `aria-label` | ✅ Có | Accessibility | Dùng label rõ ràng |
| `ng-true-value` | ✅ Có | Giá trị khi tick | **Dùng `null` cho not-converted** |
| `ng-false-value` | ⚠️ Tùy chọn | Giá trị khi untick | `undefined` or `false` |
| `ng-model` | ✅ BẮT BUỘC | Data binding | Phải có để checkbox hoạt động |
| `ng-change` | ⚠️ Tùy chọn | Trigger function | Chỉ cần nếu update ngay lập tức |

---

**Kết luận:** Thay `ng-true-value="'not_converted'"` thành `ng-true-value="null"` để submit value `null` lên server!