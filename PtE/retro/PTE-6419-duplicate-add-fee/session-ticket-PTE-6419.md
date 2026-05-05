# Session Memory — PTE-6419: Duplicate "Add fee for paid by package" ledger

> 🤖 **Dành cho AI Agent đọc khi restore context.**  
> User chỉ cần nói: "Đọc file session-ticket-PTE-6419.md và nhớ lại context bug này."

---

## 📋 TICKET INFO
- **Ticket ID:** PTE-6419
- **Type:** Bug
- **Title:** Duplicate "Add fee for paid by package" ledger in PDF Invoices (Single & Batch)
- **Status:** Done

---

## 🐛 STEPS TO REPRODUCE
1. Patient pays an invoice using a Package (creates an "Add fee" transaction).
2. The package payment is refunded.
3. The patient pays again using a Package (creates a second "Add fee" transaction).
4. View the PDF invoice via Preview, Batch Print, or Batch Download.

**Expected:** Only the latest "Add fee" (after the refund) is shown on the PDF.
**Actual:** Both the old, refunded "Add fee" and the new one are shown, creating duplicate lines.

---

## 🔍 ROOT CAUSE
The PDF rendering engine (specifically `printPDFInvoicePatientATP` for single invoices and `transformInvoiceContentToTemplate` for batch processing) lacked the historical filtering logic present in the frontend UI. It iterated over all transactions and rendered every "Add fee" it found, ignoring the fact that previous refunds invalidated the older fees.

---

## ✅ SOLUTION
Implemented a watermark filter using `_.findLastIndex` to locate the index of the most recent package refund (`idxRefundPkg`). Updated the transaction rendering loop to only include "Add fee" entries whose index is strictly greater than `idxRefundPkg`. Added null-safety fallbacks for amount calculations to prevent `NaN` errors. Applied this fix to both rendering paths.

---

## 📁 FILES ĐÃ SỬA (Fixed Files)

| File | Đường dẫn đầy đủ | Vai trò | Thay đổi gì |
|------|------------------|---------|-------------|
| `v2_PatientInvoiceLogic.js` | `d:\Sources\pteverywhere\Server\logicMongo\v2_PatientInvoiceLogic.js` | Core Logic | Added `idxRefundPkg` filter and null guards to `printPDFInvoicePatientATP` and `transformInvoiceContentToTemplate`. |

### Chi tiết từng file:

#### `v2_PatientInvoiceLogic.js`
- **Function bị ảnh hưởng:** `transformInvoiceContentToTemplate` (lines 7399-7427) and `printPDFInvoicePatientATP` (lines 5755)
- **Logic cũ (sai):**
```javascript
if (invoiceData.Transactions[jindex].TransactionType == 'Upcharge' || invoiceData.Transactions[jindex].Description == 'Add fee for paid by package'){
    // render html
}
```
- **Logic mới (đúng):**
```javascript
const idxRefundPkg = _.findLastIndex(invoiceData.Transactions, function(refundTxn) {
    return refundTxn.TransactionType == 'Other' && refundTxn.IsRefundTransaction && refundTxn.TransactionMethod == 'Package'
})
for (var jindex = 0; jindex < invoiceData.Transactions.length; jindex++){
    const txn = invoiceData.Transactions[jindex];
    const isPackageFee = txn.Description == 'Add fee for paid by package' && jindex > idxRefundPkg
    if (txn.TransactionType == 'Upcharge' || isPackageFee){
        // render html with null guards: (txn.NewRemainAmount || 0)
    }
}
```

---

## 🧭 WORKFLOW (Luồng dữ liệu của ticket này)

```
[UI Batch Print Click] → [v4BatchPrintPDFInvoicePatientWithTermATP] → [batchPrintPDFAllInvoicePatientWithTermATP]
                                                                                ↓
                                                                  [transformInvoiceContentToTemplate]
                                                                                ↓
                                                                     [Fix applied here: Filter outdated fees]
```

---

## 🔗 LIÊN KẾT
- **Full knowledge:** `03-full-knowledge.md`
- **Code reading guide:** `04-code-reading-guide.md`
- **Interview prep:** `02-interview-version.md`
