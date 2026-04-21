# Full Knowledge Base — PTE-6359: Can't update State of Location

## 1. Tóm tắt bug
- **Ticket:** PTE-6359
- **Symptom:** Người dùng không thể lưu thông tin State trong Location. Mongoose báo lỗi CastError.
- **Root Cause:** Logic cũ tự động tìm `CountryId`/`StateId` dựa trên text và gán vào payload. Nếu text không match trong DB, ID bị set thành `null`, gây lỗi Mongoose CastError. Ngoài ra, code cũ skip việc validate State nếu không nhập Country.
- **Files bị ảnh hưởng:** `Client\app\scripts\controllers\clinicSettingModule\locationManagementATP.js`

## 2. Kiến thức FE (AngularJS / JS / CSS / Browser)

### 2.1 Khái niệm cốt lõi liên quan
- **Payload Sanitization:** Làm sạch dữ liệu trước khi gọi API bằng cách xóa các field không cần thiết (để backend không bị lỗi parse Mongoose).
- **Null-safety:** Luôn kiểm tra sự tồn tại của object (guard pattern) trước khi truy cập hoặc thực thi `delete` property.

### 2.2 Pattern đúng vs sai
| ❌ Sai | ✅ Đúng | Lý do |
|--------|---------|-------|
| Gán `null` cho ObjectId payload: `locationData.StateId = null` | Xóa hẳn khỏi payload: `delete locationData.StateId` | Mongoose Schema không báo lỗi CastError với field bị thiếu, nhưng sẽ lỗi nếu nhận giá trị không đúng định dạng ObjectId (như null/empty string). |
| Viết lặp logic validate trong 2 nhánh `if (Country)` và `else` | Tách check Country riêng, gom chung validate State/City/ZipCode ra ngoài (Flat logic). | Dễ bảo trì, code ngắn gọn, tránh thiếu sót logic khi sửa một trong hai nhánh. |

## 3. Kiến thức BE (ActionHero / Node / MongoDB)

### 3.1 Khái niệm cốt lõi liên quan
- **Mongoose ObjectId CastError:** Xảy ra khi MongoDB schema định nghĩa type là `Schema.Types.ObjectId` nhưng client lại gửi string rỗng `""` hoặc `null` mà database layer không tự động cast được thành ObjectId hợp lệ.

## 4. Quy trình debug đã dùng
1. Trace flow save location: Xem console network payload được gửi lên có gì.
2. Phát hiện `CountryId` và `StateId` mang giá trị `null` do lookup tự động rớt.
3. Check Server Schema (`v2_ClinicLocation.js`) xác nhận 2 field này là ObjectId.
4. Test bỏ ID khỏi payload -> Server lưu thành công (Mongoose tự skip field không có).
5. Review lại validation logic khi không có Country -> Phát hiện bug bỏ qua required của State -> Refactor lại thành flat logic.

## 5. Design Decision (Tại sao code như vậy?)
Tại sao chọn dùng `delete` thay vì gán `undefined`?
Trong JS, toán tử `delete` sẽ gỡ bỏ hẳn property khỏi đối tượng, đảm bảo khi JSON.stringify payload gửi đi, key đó hoàn toàn biến mất. Mongoose khi nhận object sẽ bỏ qua các key không tồn tại thay vì cố gắng ghi đè giá trị cũ bằng giá trị null rác.

## 6. Dấu hiệu nhận biết bug tương tự
Nếu API Mongoose trả về lỗi `Cast to ObjectId failed` tại các form edit có chức năng lookup ID từ text → Kiểm tra ngay payload đang gửi lên có chứa chuỗi rỗng hay null cho các trường tham chiếu ID không.

## 7. Test cases cần check sau khi fix
- [x] Nhập Country + State: Save thành công.
- [x] Để rỗng Country + Nhập State: Save thành công.
- [x] Để rỗng Country + Để rỗng State: Báo lỗi yêu cầu State (chặn ở client).
- [x] Nhập State/Country ngoài danh sách DB: Save thành công dưới dạng free-text.
