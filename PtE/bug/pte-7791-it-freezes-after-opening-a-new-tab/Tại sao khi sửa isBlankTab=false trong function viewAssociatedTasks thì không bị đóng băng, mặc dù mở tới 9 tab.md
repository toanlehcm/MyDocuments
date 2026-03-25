```js
D:\Sources\pteverywhere\Client\app\scripts\app.js
function viewAssociatedTasks(patientId, relatedTo, relatedToRef) {
            console.log('viewAssociatedTasks...', patientId, relatedTo, relatedToRef);
            commonService.openInternalLink(`/tasks/${patientId}/${relatedTo}/${relatedToRef}`, false);
        }

D:\Sources\pteverywhere\Client\app\scripts\service\commonService.js
    function _openInternalLink(link, isBlankTab = true, isClearGlobalSearch = false) {
      if ($rootScope.appType === AppTypeConst.APP
        || $rootScope.screenType == ScreenTypeConst.Phone
        || !isBlankTab) {
        $location.path(link);
        $mdDialog.hide(); // when open link from popup => hide popup
      } else {
        if (isClearGlobalSearch) {
          $rootScope.$emit("clearGlobalSearch", {});
        }
        $window.open(link, isBlankTab ? "_blank" : "_self");
      }
    }
tại sao khi sửa isBlankTab=false trong function viewAssociatedTasks thì không bị đóng băng, mặc dù mở tới 9 tab?
có phải root cause là khi _blank new tab, nó bị cache của current tab?
```

Đây là phát hiện **rất quan trọng** — anh vừa tìm ra đúng root cause thật sự!

### Không phải cache, mà là Chrome Background Tab Throttling

Khi `isBlankTab = true` → `$window.open(link, "_blank")`:

```
Tab 1: Calendar (AngularJS app đang chạy) ← background
Tab 2: Tasks    (AngularJS app đang chạy) ← background  
Tab 3: Tasks    (AngularJS app đang chạy) ← background
...
Tab 9: Tasks    (AngularJS app đang chạy) ← ACTIVE
```

**Mỗi tab là một instance AngularJS HOÀN TOÀN RIÊNG**, mỗi tab có:
- Digest cycle riêng
- `$animate` service riêng  
- `requestAnimationFrame` (rAF) callbacks riêng
- `$timeout` / `setInterval` riêng

**Chrome throttle policy cho background tabs:**
- [setTimeout](cci:1://file:///d:/Sources/pteverywhere/Client/app/scripts/app.js:2564:8-2569:9) / `setInterval` → giới hạn **1 lần/giây**
- `requestAnimationFrame` → **TẮT HOÀN TOÀN** trong background tabs
- Tất cả tabs cùng origin (`localhost:9002`) **chia sẻ chung throttling budget**

**Flow gây freeze:**
1. Mở 6+ tabs cùng `localhost:9002` bằng `$window.open("_blank")`
2. Click "+ Task" → `$mdDialog.show()` → `$animate.enter()` 
3. `$animate` gọi `requestAnimationFrame` để theo dõi CSS transition kết thúc
4. Chrome **tắt rAF** vì tab đang bị throttle (quá nhiều tabs cùng origin)
5. `$animate` **chờ vĩnh viễn** → callback không bao giờ fire → **UI freeze**

---

Khi `isBlankTab = false` → `$location.path(link)`:

```
Tab 1: Calendar → redirect sang Tasks (CÙNG tab)
```

- **Không tạo tab mới** → tổng số tabs không tăng
- Không bị Chrome throttle vì ít tabs
- `$animate` hoạt động bình thường

---

### Kết luận Root Cause

| | `_blank` (new tab) | `_self` (same tab) |
|---|---|---|
| Tạo tab mới | ✅ Có | ❌ Không |
| Tăng instance AngularJS | ✅ Có | ❌ Không |
| Chrome throttle rAF | ✅ Khi 6+ tabs | ❌ Không |
| UI freeze khi show dialog | ✅ **BỊ** | ❌ Không |

### Giải pháp đúng

Anh có **2 hướng**:

1. **Giữ `_blank` + disable `$animate`** (đã code trong [app.js](cci:7://file:///d:/Sources/pteverywhere/Client/app/scripts/app.js:0:0-0:0)):
   ```javascript
   $animate.enabled(false);
   $mdDialog.show({...}).then(() => $animate.enabled(true));
   ```
   → Vẫn mở tab mới, nhưng dialog không phụ thuộc rAF

2. **Chuyển sang `$location.path()`** cho viewAssociatedTasks (như anh vừa test):
   → Đơn giản nhất, không cần hack `$animate`

Anh muốn đi hướng nào?