# Code Reading Guide — PTE-9503: imageFactory.js

## Mục tiêu
Hiểu luồng xử lý ảnh trước khi upload trong AngularJS client của dự án.

---

## FILE: `Client/app/scripts/factory/imageFactory.js`

### 🗺️ Bản đồ file (tổng quan)
- **Vai trò trong hệ thống:** Xử lý file ảnh trước khi upload: đọc EXIF, xoay ảnh đúng chiều, resize/compress để giảm dung lượng.
- **Ai gọi file này?** Rất nhiều controllers: `messageATP.js`, `patientDashboardPtE.js`, `userProfileATP.js`, v.v.
- **File này gọi ai?** Thuần JavaScript APIs (`FileReader`, `DataView`, `Image`, `Canvas`).
- **Tổng số dòng:** ~230 dòng.

### 🏗️ Cấu trúc cấp cao (Top-level structure)
- `getOrientation()`: Dùng `DataView` đọc raw binary header để lấy thẻ EXIF 0x0112.
- `resetOrientation()`: Core function để vẽ ảnh lên canvas, xoay (rotate) và nén (scale) theo `sizeLimit`.
- `resetDeviceOrientation()`: Phiên bản tương tự nhưng bắt exception tốt hơn, ít dùng hơn.

### 🔍 Điểm bug nằm ở đâu?
- **Function liên quan:** `resetOrientation()` — từ dòng 35 đến 132.
- **Logic trước khi fix:** Đọc `srcOrientation`, nếu nằm trong khoảng [5, 8] (cần swap width/height), code sẽ set lại canvas dimension và chạy lệnh `ctx.transform` mù quáng.
- **Logic sau khi fix:** Thêm check `browserAlreadyRotated = (height > width)`. Nếu browser đã tự làm rồi, set `orientationForTransform = 1` để bypass lệnh xoay.

### 📖 Chiến lược đọc file lớn nhanh (>1000 dòng)
1. Bỏ qua logic tính byte/binary phức tạp trong `getOrientation`. Chỉ cần hiểu nó trả về số từ 1-8.
2. Tập trung vào `resetOrientation`: tìm `img.onload` -> `canvas` -> `ctx.drawImage` -> `canvas.toDataURL` -> `new Blob()`.

### 💡 Mental model để nhớ file này
"Nhà máy tái chế ảnh": Nhận nguyên liệu thô (ảnh có thể bị méo/nặng), qua băng chuyền `Canvas` để gọt giũa (xoay đúng chiều, nén nhỏ lại), và xuất ra thành phẩm (`Blob`) sẵn sàng giao lên mây (S3).
