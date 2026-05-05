# Code Reading Guide — PTE-6419: Duplicate "Add fee for paid by package" ledger

## Mục tiêu
Hiểu luồng xử lý PDF rendering cho Batch Print và Single Preview trong file `v2_PatientInvoiceLogic.js`.

---

## FILE: `v2_PatientInvoiceLogic.js`

### 🗺️ Bản đồ file (tổng quan)
- **Vai trò trong hệ thống:** Core logic file handling all invoice-related operations: creation, updates, payment processing, and PDF/HTML generation for receipts and reports.
- **Tổng số dòng:** ~30,000 dòng. (Massive legacy controller).

### 🏗️ Cấu trúc cấp cao (Top-level structure)
- **Functions `printPDFInvoicePatientATP` / `getPatientInvoiceByIdForPrintPDFATP`:** Handles generating the PDF for a *single* invoice. Contains inline HTML string building.
- **Function `batchPrintPDFAllInvoicePatientWithTermATP`:** Orchestrates fetching multiple invoices for a date range/status.
- **Function `transformInvoiceContentToTemplate`:** A massive shared helper function (lines 6889–7500+) used by the batch functions to convert invoice JSON data into the HTML string required for the PDF template.

### 🔍 Điểm bug nằm ở đâu?
- **Function liên quan:** `transformInvoiceContentToTemplate` (lines 7399-7427) and `printPDFInvoicePatientATP` (lines 5755).
- **Logic trước khi fix:** Iterated through `invoiceData.Transactions` and blindly added HTML table rows for any transaction where `Description == 'Add fee for paid by package'`.
- **Logic sau khi fix:** First calculates `idxRefundPkg` using `_.findLastIndex` to find the last time a package was refunded. Then, during iteration, checks `isPackageFee = ... && jindex > idxRefundPkg` to ignore old fees.

### 📖 Chiến lược đọc file lớn nhanh (>1000 dòng)
1. **Tìm Entry Point:** When debugging batch print, look for `batchPrint` in the function name.
2. **Trace the mapping:** Notice that the batch print function iterates over invoices and passes them to `transformInvoiceContentToTemplate`.
3. **Use specific keywords:** Search for the exact string appearing on the PDF (e.g., `'Add fee for paid by package'`) to jump directly to the rendering block.

### 🧭 Workflow trong file (dùng bug này làm ví dụ)
```
[Client Batch Print]
        ↓
[Action: v4BatchPrintPDFInvoicePatientWithTermATP]
        ↓
[Logic: batchPrintPDFAllInvoicePatientWithTermATP]
        ↓
For each invoice:
    [Logic: transformInvoiceContentToTemplate]  <-- BUG LOCATED HERE
        ↓ builds HTML string
    [commonLogic.printPage] (generates PDF)
```
