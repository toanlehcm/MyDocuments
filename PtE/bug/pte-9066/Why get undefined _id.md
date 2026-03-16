Checked paymentFactoryPtE getInvoiceById. Now investigating undefined invoice _id issue.

Searched for "getInvoiceByIdPtE"
Viewed v2_PaitentInvoice.js:2150-2173

Found missing inputs definition in v4GetInvoiceByIdPtE action

Anh ơi, em đã tìm ra nguyên nhân và lý do tại sao lúc nãy lỗi này lại xuất hiện.

Lỗi này **chắc chắn 100% là do thiếu định nghĩa `inputs` trong file Action**.

Anh hãy nhìn file `d:\Sources\pteverywhere\Server\actions\v2_PaitentInvoice.js` đoạn định nghĩa API `v4GetInvoiceByIdPtE`:

```javascript
exports.v4GetInvoiceByIdPtE = class v4GetInvoiceByIdPtE extends Action {
    constructor() {
        super();
        this.name = 'v4GetInvoiceByIdPtE';
        this.description = 'get All Patient Invoices by type';
        this.inputs = {}; // ❌ LỖI Ở ĐÂY LÀ DO NÓ RỖNG
    }

    async executeFunction(data) {
        console.log("getInvoiceByIdPtE-data", data);
        return new Promise(resolve =>
            api.v2_patientInvoice.getInvoiceByIdPtE(
                data.TokenUserInfo.Client,
                data.connection.params.invoiceId, // ❌ data.connection.params.invoiceId LÀ UNDEFINED
                // ...
            )
        );
    }
}
```

### Tại sao lại bị undefined?
1. Framework **ActionHero** có cơ chế Validation và Input Filtering rất chặt chẽ.
2. Khi Client gọi API và truyền param `{ invoiceId: "123" }` lên Server.
3. Nếu anh không khai báo `invoiceId` trong property `this.inputs = {}` của Action class (nó đang là một cục `{}` rỗng), thì ActionHero sẽ coi `invoiceId` là một parameter **không hợp lệ (unregistered parameter)** và nó sẽ **tự động cắt bỏ (strip out)** param này đi trước khi chui vào hàm `executeFunction`.
4. Hậu quả là `data.connection.params.invoiceId` biến thành `undefined`.
5. Tham số `undefined` này được truyền vào `getInvoiceByIdPtE` -> truyền xuống hàm `getAllInvoicesByInvoiceAsync` -> Mongo truy vấn `{ _id: undefined }` -> Lỗi 502 như lúc nãy anh gặp.

### Giải pháp (Solution)
Anh chỉ cần khai báo `invoiceId` vào trong `this.inputs` để ActionHero biết nó là param hợp pháp và cho phép pass qua:

Anh sửa lại constructor trong `d:\Sources\pteverywhere\Server\actions\v2_PaitentInvoice.js`:

```javascript
    constructor() {
        super();
        this.name = 'v4GetInvoiceByIdPtE';
        this.description = 'get All Patient Invoices by type';
        this.inputs = {
            invoiceId: { required: true } // ✅ THÊM DÒNG NÀY ĐỂ ACTIONHERO CHO PHÉP PARAM đi qua
        };
    }
```

Anh sửa đúng chỗ này thì vĩnh viễn không bao giờ bị dính bệnh undefined `_id` ở API này nữa ạ. Mấy cái Action kiểu này rất hay bị thiếu `inputs` vì lúc copy code từ chỗ khác quên mang theo.