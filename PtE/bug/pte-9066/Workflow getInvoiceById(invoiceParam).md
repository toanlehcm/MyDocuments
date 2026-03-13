Checked getInvoiceById in paymentFactoryPtE

Searched for "getInvoiceById("

Checked getInvoiceById in paymentFactoryPtE and server

Dạ, em giải thích phần luồng hoạt động của hàm `getInvoiceById(invoiceParam)` này nhé:

### 1. Hàm `getInvoiceById(invoiceParam)` lấy `invoiceParam` từ đâu?
Hàm này nằm trong `paymentFactoryPtE.js` (tầng Factory của AngularJS Component). Nó không tự chạy mà **được gọi bởi các Controller** khác trong ứng dụng khi cần lấy dữ liệu chi tiết của 1 hóa đơn. 
Tham số `invoiceParam` thực chất chính là **`invoiceId`** (ID của hóa đơn trong database).

Như em vừa search nhanh trong code, có rất nhiều chỗ gọi hàm này với truyền `invoiceId` vào, ví dụ:
- `PaymentFactory.getInvoiceById(patientInvoice._id)` (trong `claimForm.js`)
- `PaymentFactory.getInvoiceById(data.invoiceId)` (trong `popupViewEligibilityInformationPtE.js`)
- `PaymentFactory.getInvoiceById($scope.activeItem._id)` (trong `paymentPatientATP.js`)

**→ Tức là:** Khi user thao tác trên UI (ví dụ click vào nút "Xem chi tiết" của 1 dòng hóa đơn), Controller sẽ lấy cái ID của dòng đó và truyền vào hàm `getInvoiceById(ID_hóa_đơn)`.

---

### 2. Workflow của hàm này diễn ra như thế nào?

Luồng đi của dữ liệu từ Client xuống Server và vòng về như sau:

**Bước 1: Client (AngularJS) gọi API**
- Khi hàm được gọi, nó sử dụng class `api` của ActionHero Client để gửi một request HTTP GET.
- Tên API được gọi là: `'v4GetInvoiceByIdPtE'` (định nghĩa trong file router/config).
- Payload gửi kèm theo là: `{ invoiceId: invoiceParam }` (chính là cái ID ta truyền vào).

**Bước 2: Server (Node.js/ActionHero) nhận Request**
- Request sẽ route đến file Action `v2_PaitentInvoice.js` (chỗ anh vừa đặt `console.log("getInvoiceByIdPtE-data", data)`).
- Action này sẽ trích xuất `invoiceId` từ request (`data.connection.params.invoiceId`).
- Sau đó, nó gọi tiếp xuống tầng Logic/LogicMongo bằng hàm: `api.v2_patientInvoice.getInvoiceByIdPtE(...)`.

**Bước 3: Server chui vào Database (MongoDB)**
- Hàm Logic sẽ dùng `invoiceId` đó để query database (bằng biến DAL - Data Access Layer như `v2_PatientInvoiceDAL`).
- Tại đây, nó sử dụng hàm như `getAllInvoicesByInvoiceAsync` (cái mà trước đây anh sửa lỗi undefined `_id` đó ạ) để Mongoose tìm ra đúng cục JSON của hóa đơn đó.

**Bước 4: Trả dữ liệu về Client**
- Server tìm thấy dữ liệu → Trả về response JSON cho Client (đoạn `.then(function (response)`).
- Hàm nhận được `response.data`, sau đó gọi một hàm private `_parseInvoice(response.data)` để xào nấu/chuẩn hóa cấu trúc dữ liệu trước khi dùng (_parse này cũng nằm trong paymentFactory_).
- Cuối cùng, nó gọi `resolve(invoiceDetail)` để báo cho cái Controller đang đợi (bằng Promise) là: "Có data hóa đơn rồi nè, lấy hiện lên UI đi!".
- Nếu lỗi mạng hoặc Server crash, nó nhảy vào `{ reject() }` để báo lỗi.

**Tóm tắt ngắn gọn:**
`Controller có ID -> Đưa cho Factory -> Factory gọi API Server -> Server chui DB lấy Data -> Server trả JSON -> Factory parse JSON -> Trả ngược cho Controller xài.`

Anh cần em đi sâu vào cụ thể file Controller nào đang gọi nó không ạ?