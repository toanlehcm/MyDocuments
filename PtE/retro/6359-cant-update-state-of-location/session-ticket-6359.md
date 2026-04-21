# Session Memory — PTE-6359: Can't update State of Location

> 🤖 **Dành cho AI Agent đọc khi restore context.**  
> User chỉ cần nói: "Đọc file session-ticket-6359.md và nhớ lại context bug này."

---

## 📋 TICKET INFO
- **Ticket ID:** 6359
- **Type:** Bug
- **Title:** Can't update State of Location
- **Status:** Done

---

## 🐛 STEPS TO REPRODUCE
1. Vào màn hình Clinic Settings -> Edit Location.
2. Xóa Country hoặc nhập State/Country tự do (free text).
3. Bấm Save.
**Expected:** Lưu được thông tin địa chỉ dưới dạng text.
**Actual:** Save thất bại do Mongoose ném lỗi CastError (hoặc lọt validation cho submit form khi State rỗng nếu Country rỗng).

---

## 🔍 ROOT CAUSE
Hệ thống cố gắng đồng bộ `CountryId` và `StateId` bằng cách tìm text trong mảng master data. Khi user để trống hoặc nhập text tự do, code set ID thành `null`, gây ra lỗi CastError từ Mongoose Schema khi gửi lên BE. Ngoài ra, validation logic bị lồng nhau sai sót, khiến việc kiểm tra required State bị bỏ lỡ nếu Country rỗng.

---

## ✅ SOLUTION
1. **Cho phép State/Country là free text:** Hủy bỏ chức năng tìm kiếm ID, dùng `delete` để loại bỏ `CountryId` và `StateId` khỏi request payload (ngăn lỗi CastError từ Mongoose).
2. **Nới lỏng rule Country:** Cho phép Country rỗng (`CountryErr = false`).
3. **Siết chặt rule State:** Đưa logic validate State, City, ZipCode ra một flow tuyến tính (flat structure), đảm bảo luôn chạy kể cả khi Country rỗng. Khi Country rỗng, ZipCode và State mặc định validate theo rules của US.

---

## 📁 FILES ĐÃ SỬA (Fixed Files)

| File | Đường dẫn đầy đủ | Vai trò | Thay đổi gì |
|------|------------------|---------|-------------|
| locationManagementATP.js | `Client\app\scripts\controllers\clinicSettingModule\locationManagementATP.js` | Controller | Flatten validation logic, xóa logic ID lookup, thêm sanitization bằng `delete`. |

### Chi tiết từng file:

#### `locationManagementATP.js`
- **Function bị ảnh hưởng:** `saveLocation()`
- **Logic cũ (sai):**
```javascript
// Nếu không nhập Country thì skip validate luôn State/City/Zipcode
if (Country) { validate State/City/Zip... } else { CountryErr = true; } 

// Gắn null gây CastError trên Mongoose
locationData.AddressDetails.CountryId = matchedCountry ? matchedCountry._id : null
```
- **Logic mới (đúng):**
```javascript
// Đã flat cấu trúc validation
locationData.AddressDetails.CountryErr = false; // Optional
if (State) { validate... } else { StateErr = true; error = true; } // Luôn chặn
// ... (tương tự cho City, ZipCode)

// Sanitize trước khi gửi API (để free-text)
if (locationData && locationData.AddressDetails) {
    delete locationData.AddressDetails.CountryId
    delete locationData.AddressDetails.StateId
}
```

---

## 🗄️ MONGODB — Collections & Queries liên quan
- **Collection:** `ClinicLocations`
- Schema của collection này (tại `v2_ClinicLocation.js`) định nghĩa `CountryId` và `StateId` là `Schema.Types.ObjectId`, do đó nó rất nhạy cảm với dữ liệu kiểu string rỗng hay null không hợp lệ được truyền từ Client.

---

## 🧭 WORKFLOW (Luồng dữ liệu của ticket này)

```
[Màn hình Edit Location] → [saveLocation()] → [Validation (Flat flow)] → [Sanitize Payload (delete IDs)] → [API v3SaveLocationOfClinic]
                                                                        ↓
                                                [Fix bug: Loại bỏ Mongoose CastError và State empty bypass]
```

---

## ⚠️ SIDE EFFECTS & RISKS
- Đã check thêm phần `BillingAddress` (chung file), phần này cũng có Country/State validation nhưng yêu cầu ticket tập trung vào `AddressDetails` của Location. Nếu sau này `BillingAddress` cũng cần làm free-text thì áp dụng pattern `delete ID` và `flat validation` tương tự.
