Chào anh, em giải thích 2 đoạn code này nhé. Cả hai đoạn này đều dùng để điều hướng (navigate) user tới màn hình chi tiết Invoice / Payment, nhưng cách thức hoạt động và trường hợp sử dụng (use case) hoàn toàn khác nhau.

### 1. Đoạn code `$scope.$parent.selectTab`

```javascript
$scope.$parent.selectTab(TabNameConst.PAYMENT, invoiceId, {
    redirectFromDependent: true,
    isUpdatePath: true
});
```

**Hoạt động:**
Đoạn code này gọi hàm `selectTab` ở scope cha (`$parent`) để **chuyển tab ngay trên cùng một trang hiện tại**. Nó không load lại trang web hay mở tab mới trên trình duyệt. Ví dụ, trong màn hình Patient Dashboard có nhiều tab ngang (Profile, Claims, Payment, Treatment...), lệnh này sẽ force UI chuyển vùng hiển thị sang tab Payment và truyền `invoiceId` vào đó.

**Khi nào dùng:**
- Dùng khi giao diện hiện tại được thiết kế theo dạng **Tabbed UI** (chuyển qua lại các chức năng mà không rời khỏi màn hình tổng thể của Patient đó).
- Giúp trải nghiệm mượt mà hơn (không cần load lại toàn bộ app), phù hợp khi luồng công việc của user cần xem lướt qua nhiều thông tin của cùng một bệnh nhân một lúc (ví dụ: đang ở tab Claims, ấn vào invoice thì nhảy sang thẳng tab Payment bên cạnh).

---

### 2. Đoạn code `$location.path` và `$window.open`

```javascript
if ($rootScope.appType === AppTypeConst.APP) {
    // Môi trường Mobile App (Cordova/Capacitor)
    $location.path(`patient_invoice/${patientId}/${invoiceId}`);
} else {
    // Môi trường Web Browser
    $rootScope.$emit("clearGlobalSearch", {});
    $window.open(`patient_invoice/${patientId}/${invoiceId}`, "_blank");
}
```

**Hoạt động:**
Đoạn code này kiểm tra môi trường chạy của ứng dụng để đưa ra cách mở trang web phù hợp:
- **Nếu là Mobile App (`AppTypeConst.APP`):** App mobile thường chỉ có một cửa sổ (webview) duy nhất, không có khái niệm "Tab trình duyệt". Do đó, nó dùng `$location.path` để chuyển đổi route (chuyển màn hình) bên trong chính app đó.
- **Nếu là Web Browser:** Nó dùng `$window.open(..., "_blank")` để ép trình duyệt bật ra một **Tab mới hoàn toàn** trên Chrome/Firefox/Safari.

**Khi nào dùng:**
- Dùng thiết kế màn hình độc lập (Standalone page). Người dùng đang ở màn hình danh sách (ví dụ: Insurance Claims) và muốn xem chi tiết một hóa đơn cụ thể.
- Việc mở ở tab trình duyệt mới (`_blank`) trên Web giúp người dùng **không bị mất bộ lọc (filter) hoặc vị trí trang** ở màn hình danh sách cũ. Họ có thể xử lý hóa đơn ở tab mới, sau đó tắt đi và quay lại tab danh sách làm việc tiếp. 

---

### Tóm lại:
- **Dùng cách 1 (`selectTab`)**: Khi anh muốn user chuyển đổi View ngay trong nội bộ trang hiện tại (chuyển Tab UI).
- **Dùng cách 2 (`$window.open / $location.path`)**: Khi anh muốn điều hướng user sang một phân hệ độc lập hoàn toàn, và đặc biệt trên Web thì bật ra Tab trình duyệt mới để không phá hỏng màn hình danh sách hiện tại của họ. 

Anh đang muốn áp dụng hành vi (behavior) số 2 cho bảng dữ liệu Invoices để giữ lại được màn hình danh sách phải không ạ? Có cần em check lỗi hay chỉnh sửa gì thêm không?