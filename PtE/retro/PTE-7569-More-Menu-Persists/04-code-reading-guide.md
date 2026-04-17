# Code Reading Guide — PTE-7569: More menu persists beside popup

## Mục tiêu
Hiểu luồng sự kiện khi click các action PDF (Print, Fax, View) trong file `documentsATP.js`.

---

## FILE: `Client/app/scripts/controllers/patientDashboard/documentsATP.js`

### 🗺️ Bản đồ file (tổng quan)
- **Vai trò trong hệ thống:** Controller quản lý tab Documents trên Dashboard của Patient. Quản lý danh sách tài liệu, hiển thị, upload, và các hành động liên quan đến file PDF.
- **Ai gọi file này?** Route của Patient Dashboard trỏ tới controller này khi user chuyển sang tab Documents.
- **File này gọi ai?** Các API services (`api.call`), `commonService`, `$mdDialog`, `printJS`, thư viện cordova.
- **Tổng số dòng:** ~6300 dòng

### 🏗️ Cấu trúc cấp cao (Top-level structure)
- Khởi tạo Data & Config, Pagination.
- Các hàm quản lý NoteFile (Add, Edit, Delete).
- Các hàm tương tác với PDF: `viewPDF`, `printPDF`, `faxPDF`, `downloadPDF`.
- Khối code xử lý share file, gán task...

### 🔍 Điểm bug nằm ở đâu?
- **Function liên quan:** `viewPDF()`, `printPDF()`, `downloadPDF()` (khoảng dòng 3866 - 4030).
- **Logic trước khi fix:** Click gọi thẳng hàm async `getFilePDFDocument()`.
- **Logic sau khi fix:** Chèn `$('#btn-more').click()` ngay đầu function để trigger Bootstrap đóng menu dropdown ngay lập tức.

### 📖 Chiến lược đọc file lớn nhanh (>1000 dòng)
1. Controller này quá khổng lồ. Không nên cuộn chuột từ trên xuống.
2. Dùng Ctrl+F tìm tên hàm được bind trên view (ví dụ `ng-click="printPDF(data)"`).
3. Focus vào 3-4 hàm chung một chủ đề (xử lý PDF).

### ⚠️ Những chỗ dễ gây confused trong file này
- **Hỗn hợp nền tảng:** Có code phân nhánh xử lý riêng cho Web, Android, iOS (ví dụ: dùng `$cordovaPrinter` nếu là App, dùng `printJS` nếu là Web).
- **Hardcode UI selector:** Dùng jQuery ID như `$('#btn-more')` bên trong AngularJS Controller là một anti-pattern, nhưng lại là cách nhanh nhất để giao tiếp với Bootstrap plugin đang quản lý menu đó.

### 🧭 Workflow trong file (dùng bug này làm ví dụ)
```
View: Click `Print` trong More menu
                    ↓
Controller: `$scope.printPDF(data)`
                    ↓
[FIX] `$('#btn-more').click()` đóng menu 
                    ↓
`getFilePDFDocument(id)`: Lấy dữ liệu file (hiện global spinner)
                    ↓
Success Promise → Web: `printJS()` mở UI in tài liệu.
```

### 💡 Mental model để nhớ file này
"Quản gia của giấy tờ" — mọi thao tác xem, sửa, in, fax tài liệu bệnh án đều chạy qua đây.
