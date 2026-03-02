```
@workspace /fix 
Cách 1:
function _initKeyboardPluginOnce() {
            if (_keyboardPluginInitialized) return;
            if ($rootScope.appType !== AppTypeConst.APP) return;

            try {
                var keyboardPlugin = window.cordova
                    && window.cordova.plugins
                    && window.cordova.plugins.Keyboard;

                if (!keyboardPlugin) {
                    console.log('[KB] cordova.plugins.Keyboard not available');
                    return;
                }

                keyboardPlugin.shrinkView(true);
                // keyboardPlugin.disableScrollingInShrinkView(false);
                // keyboardPlugin.hideFormAccessoryBar(true);

                _keyboardPluginInitialized = true;
                console.log('[KB] Keyboard plugin initialized: shrinkView=true');
            } catch (e) {
                console.log('[KB] initKeyboardPlugin error: ' + e);
            }
        }

        $scope.onFocusMessage = function() {
            console.log('[KB] FOCUS triggered');
            _initKeyboardPluginOnce();
        };
Cách 2
$scope.onFocusMessage = function() {
            console.log('[KB] FOCUS triggered');
            if (_keyboardPluginInitialized) return;
                        if ($rootScope.appType !== AppTypeConst.APP) return;
            
                        try {
                            var keyboardPlugin = window.cordova
                                && window.cordova.plugins
                                && window.cordova.plugins.Keyboard;
            
                            if (!keyboardPlugin) {
                                console.log('[KB] cordova.plugins.Keyboard not available');
                                return;
                            }
            
                            keyboardPlugin.shrinkView(true);
                            // keyboardPlugin.disableScrollingInShrinkView(false);
                            // keyboardPlugin.hideFormAccessoryBar(true);
            
                            _keyboardPluginInitialized = true;
                            console.log('[KB] Keyboard plugin initialized: shrinkView=true');
                        } catch (e) {
                            console.log('[KB] initKeyboardPlugin error: ' + e);
                        }
        };
so sánh ưu nhược điểm 2 cách viết code?
tại sao bạn khuyến khích t viết cách 1?
tóm gọn kiến thức để t giải thích cho leader dễ hiểu và thuyết phục.
```

## So sánh Cách 1 vs Cách 2

### Cách 2 - Inline code trong `onFocusMessage`
**Nhược điểm:**
- Vi phạm **DRY** (Don't Repeat Yourself) - nếu cần gọi logic này ở nơi khác, phải copy/paste
- Hàm `onFocusMessage` làm quá nhiều việc - vi phạm **Single Responsibility Principle**
- Khó test độc lập
- Khó maintain - sửa 1 chỗ nhưng nếu có copy ở nơi khác thì miss

---

### Cách 1 - Tách thành hàm riêng `_initKeyboardPluginOnce()`
**Ưu điểm:**
- **Reusable**: Có thể gọi từ nhiều nơi (blur, resume event, v.v.)
- **Readable**: Tên hàm tự mô tả chức năng
- **Testable**: Test riêng `_initKeyboardPluginOnce()` không cần trigger focus event
- **Separation of Concerns**: `onFocusMessage` chỉ xử lý focus event, không quan tâm logic keyboard

---

### 💬 Giải thích ngắn gọn cho Leader

> *"Cách 1 tách riêng logic khởi tạo keyboard thành một hàm độc lập `_initKeyboardPluginOnce()`. Điều này giúp code dễ đọc hơn, tái sử dụng được nếu sau này cần trigger từ event khác, và dễ debug/test hơn. Đây là nguyên tắc **Single Responsibility** - mỗi hàm chỉ làm một việc."*

---

**Kết luận:** Cách 1 là **best practice** vì tách biệt concerns, dễ mở rộng và maintain về lâu dài.