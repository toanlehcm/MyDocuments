# Full Knowledge Base — PTE-9503: Double Rotation Bug in Image Upload

## 1. Tóm tắt bug
- **Ticket:** PTE-9503
- **Symptom:** Ảnh chụp dọc (portrait) trên điện thoại (đặc biệt Samsung/Android WebView) bị lật ngang khi upload.
- **Root Cause:** Xung đột xoay ảnh 2 lần (Double Rotation). Trình duyệt hiện đại (Chrome 81+) tự động xoay ảnh theo EXIF orientation. Code cũ của dự án (hàm `resetOrientation`) không nhận biết được điều này nên tiếp tục dùng Canvas xoay thêm 90 độ nữa.
- **Files bị ảnh hưởng:** `Client/app/scripts/factory/imageFactory.js`

## 2. Kiến thức FE (AngularJS / JS / Browser)

### 2.1 Khái niệm cốt lõi liên quan
- **EXIF Orientation:** Thẻ metadata số `0x0112` trong file JPEG, chỉ định cách camera được cầm khi chụp (1-8). Portrait thường là 6 (xoay 90 độ CW) hoặc 8 (xoay 270 độ CW).
- **Browser Auto-rotation:** Kể từ Safari 13.4 và Chrome 81, trình duyệt tự động xoay ảnh theo EXIF khi hiển thị qua thẻ `<img>` hoặc vẽ lên `<canvas>`.
- **Canvas API:** Sử dụng `ctx.transform` để xoay, lật pixel data.

### 2.2 Pattern đúng vs sai
| ❌ Sai | ✅ Đúng | Lý do |
|--------|---------|-------|
| Luôn xoay Canvas dựa trên EXIF orientation mà không kiểm tra trạng thái thực tế của ảnh. | Kiểm tra `img.height > img.width` sau khi `img.onload`. Nếu ảnh đã dọc, bỏ qua xoay. | Đảm bảo tính tương thích ngược. Trình duyệt cũ chưa xoay thì mình xoay, trình duyệt mới đã xoay thì mình skip. |

### 2.3 Gotchas
- `img.onload` là callback async. `img.src = base64` trigger load, và khi vào `onload`, các thuộc tính `img.width` và `img.height` đã phản ánh kích thước SAU KHI browser xử lý auto-rotation.

## 3. Quy trình debug đã dùng
1. Dùng `console.log` kiểm tra `getOrientation` (trả về đúng 6).
2. Kiểm tra `img.width` và `img.height` trong `img.onload` (phát hiện ảnh đã là portrait 3456x4608 dù chưa transform).
3. Đặt giả thuyết: Browser tự xoay + Canvas tự xoay = Xoay 2 lần.
4. Đưa ra giải pháp: So sánh kích thước thực tế với EXIF để biết browser đã xoay chưa.

## 4. Design Decision (Tại sao code như vậy?)
- **Tại sao không dùng thư viện ngoài?** Tránh phình to bundle size chỉ vì một lỗi xử lý logic nhỏ.
- **Tại sao không User Agent sniffing?** UA sniffing rất dễ lỗi thời và không chính xác. Dimension-based detection là phương pháp an toàn và đáng tin cậy nhất.
- **Tại sao không tách hàm `resetOrientation`?** Hàm này đang được gọi ở hơn 30 vị trí trong 15 file khác nhau. Đổi signature sẽ gây rủi ro regression diện rộng. Fix tại chỗ là an toàn nhất cho một bug-fix khẩn cấp.

## 5. Dấu hiệu nhận biết bug tương tự
- Nếu ảnh tải về từ mạng (không có EXIF) hiển thị bình thường, nhưng ảnh chụp trực tiếp từ camera bị lật ngang → Gần như chắc chắn 100% là do xử lý sai EXIF Orientation.

## 6. Test cases cần check sau khi fix
- [x] Upload ảnh portrait chụp từ camera điện thoại (Android WebView).
- [x] Upload ảnh landscape chụp từ camera điện thoại.
- [x] Upload ảnh screenshot/download từ mạng (không có EXIF).
- [x] Upload ảnh trên trình duyệt cũ (nếu có môi trường test).
