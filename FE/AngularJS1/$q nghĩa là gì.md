# $q nghĩa là gì? tại sao t thấy nhiều chỗ đặt $q? có phải là 1 convention?

function _confirmPrintWithEob(claimId, action) {
      return $q (function (resolve, reject) {

# Giải thích `$q` trong AngularJS

## 📝 `$q` là gì?

**`$q`** là **Promise/Deferred service** của AngularJS, tương tự như `Promise` trong ES6 JavaScript.

```javascript
// $q là Angular service để xử lý bất đồng bộ
function _confirmPrintWithEob(claimId, action) {
    return $q(function (resolve, reject) {
        // Async logic here
        if (success) {
            resolve(data);  // Thành công
        } else {
            reject(error);  // Thất bại
        }
    });
}
```

---

## 🎯 Tại sao đặt tên `$q`?

### **1. Angular Naming Convention** ✅

```javascript
// Tất cả Angular built-in services đều có prefix $
$scope     // Scope service
$http      // HTTP service  
$timeout   // Timeout service
$q         // Promise service (q = queue/query)
$rootScope // Root scope service
```

### **2. Lịch sử đặt tên:**

- **`q`** viết tắt của **"queue"** hoặc **"query"**
- Lấy cảm hứng từ thư viện [Kris Kowal's Q](https://github.com/kriskowal/q) (Promise library cho Node.js)
- Angular team chọn tên này để **tương thích** với Q library

---

## 🔍 So sánh `$q` vs ES6 Promise:

| Feature | `$q` (AngularJS) | `Promise` (ES6) |
|---------|-----------------|-----------------|
| **Syntax** | `$q(function(resolve, reject){})` | `new Promise((resolve, reject)=>{})` |
| **Digest cycle** | ✅ Auto trigger `$scope.$apply()` | ❌ Cần manual trigger |
| **Chaining** | `.then()`, `.catch()`, `.finally()` | `.then()`, `.catch()`, `.finally()` |
| **Create resolved** | `$q.resolve(value)` | `Promise.resolve(value)` |
| **Create rejected** | `$q.reject(reason)` | `Promise.reject(reason)` |
| **All promises** | `$q.all([p1, p2])` | `Promise.all([p1, p2])` |

---

## 💡 Ví dụ sử dụng `$q`:

### **Pattern 1: Wrapper cho callback-based API**

```javascript
/**
 * Wrapper function để convert callback thành Promise
 * @param {string} claimId - ID của claim
 * @param {string} action - Hành động (print/download)
 * @returns {Promise}
 */
function _confirmPrintWithEob(claimId, action) {
    // Tạo deferred object
    return $q(function (resolve, reject) {
        // Kiểm tra input
        if (!claimId) {
            reject('Invalid claimId');
            return;
        }
        
        // Hiển thị confirmation dialog
        $mdDialog.show({
            controller: 'ConfirmDialogCtrl',
            templateUrl: 'views/dialogs/confirmPrintWithEob.html',
            locals: {
                claimId: claimId,
                action: action
            }
        }).then(
            function(result) {
                // User chọn Yes → resolve
                resolve(result);
            },
            function() {
                // User chọn No → reject
                reject('User cancelled');
            }
        );
    });
}
```

### **Pattern 2: Chain nhiều async operations**

```javascript
/**
 * In Insurance Claim với EOB
 * @param {string} claimId
 * @returns {Promise}
 */
function _printClaimWithEob(claimId) {
    // Bước 1: Confirm với user
    return _confirmPrintWithEob(claimId, 'print')
        .then(function(confirmed) {
            // Bước 2: Lấy data từ server
            if (!confirmed) {
                return $q.reject('User cancelled');
            }
            return _getClaimData(claimId);
        })
        .then(function(claimData) {
            // Bước 3: Generate PDF
            return _generatePDF(claimData);
        })
        .then(function(pdfUrl) {
            // Bước 4: Print PDF
            return _printPdf(pdfUrl);
        })
        .catch(function(error) {
            // Xử lý lỗi ở bất kỳ bước nào
            console.log('printClaimWithEob failed:', error);
            messageAlert.error('Failed to print claim');
        });
}
```

### **Pattern 3: Multiple promises với `$q.all()`**

```javascript
/**
 * Tải nhiều documents cùng lúc
 * @param {Array} documentIds - Mảng các document IDs
 * @returns {Promise}
 */
function downloadMultipleDocuments(documentIds) {
    // Validate input
    if (!documentIds || !documentIds.length) {
        return $q.reject('No documents to download');
    }
    
    // Tạo array of promises
    var promises = documentIds.map(function(docId) {
        return getFilePDFDocument(docId, 'DOWNLOAD');
    });
    
    // Chờ tất cả promises complete
    return $q.all(promises).then(
        function(results) {
            console.log('All documents downloaded:', results);
            return results;
        },
        function(error) {
            console.log('Some downloads failed:', error);
            return $q.reject(error);
        }
    );
}
```

### **Pattern 4: Immediate resolve/reject**

```javascript
/**
 * Validate document data
 * @param {Object} data
 * @returns {Promise}
 */
function validateDocument(data) {
    // Nếu valid → resolve ngay lập tức
    if (data && data._id && data.patientId) {
        return $q.resolve(data);
    }
    
    // Nếu invalid → reject ngay lập tức
    return $q.reject('Invalid document data');
}

// Usage
validateDocument(documentData)
    .then(function(validData) {
        console.log('Document is valid:', validData);
    })
    .catch(function(error) {
        console.log('Validation failed:', error);
    });
```

---

## 🎯 Convention trong codebase:

### ✅ **Nên dùng `$q` khi:**

1. **Wrap callback-based APIs** thành Promise
```javascript
function getLocation() {
    return $q(function(resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
}
```

2. **Cần trigger Angular digest cycle**
```javascript
// $q auto trigger $scope.$apply()
$q(function(resolve) {
    setTimeout(function() {
        resolve('Updated!'); // UI tự động update
    }, 1000);
});
```

3. **Chain nhiều Angular services**
```javascript
return $http.get('/api/data')
    .then(function(response) {
        return $q.when(processData(response.data));
    })
    .then(function(processed) {
        return api.call('saveData', processed);
    });
```

### ⚠️ **Không nên:**

```javascript
// ❌ SAI: Không cần $q nếu đã có Promise
function getData() {
    return $q(function(resolve, reject) {
        $http.get('/api/data').then(resolve, reject);
    });
}

// ✅ ĐÚNG: $http đã trả về Promise
function getData() {
    return $http.get('/api/data');
}
```

---

## 📊 Common `$q` methods:

```javascript
// 1. Create new promise
var promise = $q(function(resolve, reject) {
    // async logic
});

// 2. Resolve immediately
var resolved = $q.resolve(value);
var resolved2 = $q.when(value); // Alias

// 3. Reject immediately  
var rejected = $q.reject(reason);

// 4. Wait for multiple promises
$q.all([promise1, promise2, promise3]).then(function(results) {
    // results = [result1, result2, result3]
});

// 5. Race (first one wins)
$q.race([promise1, promise2]).then(function(winner) {
    // First resolved promise
});

// 6. Deprecated: Deferred pattern (old style)
var deferred = $q.defer();
deferred.resolve(value);
deferred.reject(reason);
return deferred.promise;
```

---

## 💡 Best Practices:

### ✅ **DO:**

```javascript
// 1. Luôn return promise từ function
function loadData() {
    return $q(function(resolve, reject) {
        api.call('getData').then(resolve, reject);
    });
}

// 2. Handle errors với .catch()
loadData()
    .then(function(data) { /* success */ })
    .catch(function(error) { /* error */ });

// 3. Chain promises
return loadUser()
    .then(loadUserPosts)
    .then(loadPostComments)
    .catch(handleError);
```

### ❌ **DON'T:**

```javascript
// 1. Không quên return promise
function loadData() {
    $q(function(resolve) {
        // ❌ Forgot return
        api.call('getData').then(resolve);
    });
}

// 2. Không nest promises (callback hell)
loadUser().then(function(user) {
    loadPosts(user).then(function(posts) {
        loadComments(posts).then(function(comments) {
            // ❌ Too nested!
        });
    });
});

// ✅ Better: Chain
loadUser()
    .then(loadPosts)
    .then(loadComments);
```

---

## 🎯 Tổng kết:

| Câu hỏi | Trả lời |
|---------|---------|
| **`$q` là gì?** | AngularJS Promise service |
| **Tại sao `$q`?** | Convention: `$` = Angular built-in, `q` = queue/query |
| **Khi nào dùng?** | Wrap callbacks, chain async, cần Angular digest |
| **Pattern?** | ✅ `return $q(function(resolve, reject){})` |
| **Best practice?** | ✅ Always return, handle errors, chain don't nest |

**Trong code của bạn:**
```javascript
function _confirmPrintWithEob(claimId, action) {
    return $q(function (resolve, reject) {
        // Convert dialog callback thành Promise
        // Để dễ dàng chain với other operations
    });
}
```

Đây là **best practice** để làm code **readable, maintainable, và chainable**! ✅
