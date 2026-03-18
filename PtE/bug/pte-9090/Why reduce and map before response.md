## Tại sao cần `reduce` + `map` trước khi response?

### Mục đích: **Column Filtering — Chỉ gửi những fields client cần**

Mỗi invoice document trong MongoDB có **rất nhiều fields**:

```javascript
// Invoice document thực tế từ DB có thể có ~50-100 fields:
{
  _id, PatientId, Patient, Type, Status, PaymentStatus,
  Claims, Transactions, ServiceInfo, Membership,
  FaxedInfo, PrivateNotes, ReferringProviderId,
  CreatedAt, UpdatedAt, CreatedBy, UpdatedBy,
  InternalNotes, BillingNotes, AuditLog,
  // ... ~50 fields khác không cần thiết cho UI
}
```

Nhưng client chỉ cần hiển thị một số cột nhất định:

```javascript
const requestedColumns = ['_id', 'PatientId', 'Type', 'PaymentStatus', ...displayColumns];

// map + reduce → filter chỉ giữ lại fields trong requestedColumns
const mappedDocs = docs.map(
  doc => requestedColumns.reduce((item, colName) => {
    item[colName] = doc[colName]; // chỉ copy field nếu có trong requestedColumns
    return item;
  }, {}) // bắt đầu từ object rỗng {}
);
```

---

### Nếu KHÔNG có `map` + `reduce`, response sẽ như thế này:

```javascript
// ❌ Không filter → gửi TOÀN BỘ fields về client
return { data: { ...result, docs: result.docs } };

// Response payload ~500KB mỗi page:
{
  docs: [
    {
      _id: "...",
      PatientId: "...",
      Claims: [ /* nested array lớn */ ],
      Transactions: [ /* nested array lớn */ ],
      AuditLog: [ /* không cần, nhưng vẫn gửi */ ],
      InternalNotes: "...",  // không cần
      // ... 50 fields khác thừa
    },
    // x200 documents
  ]
}
```

### Nếu CÓ `map` + `reduce`, response gọn hơn nhiều:

```javascript
// ✅ Có filter → chỉ gửi fields cần thiết
// Response payload ~50KB mỗi page:
{
  docs: [
    {
      _id: "...",
      PatientId: "...",
      Type: "normal",
      PaymentStatus: "paid",
      // chỉ ~15-20 fields client thực sự dùng
    },
    // x200 documents
  ]
}
```

---

### Tóm lại

| | Không filter | Có filter |
|---|---|---|
| **Payload size** | ~500KB/page | ~50KB/page |
| **Network** | Chậm | Nhanh hơn ~10x |
| **Security** | Lộ data nhạy cảm (`AuditLog`, `InternalNotes`) | Chỉ expose fields cần thiết |
| **Client parsing** | Phải xử lý nhiều data thừa | Gọn, chỉ có data cần dùng |

> 💡 Pattern này gọi là **"Projection tại Application Layer"** — tương tự `SELECT col1, col2` trong SQL thay vì `SELECT *`.