# Full Knowledge Base — PTE-6419: Duplicate "Add fee for paid by package" ledger

## 1. Tóm tắt bug
- **Ticket:** PTE-6419
- **Symptom:** PDF invoices (single preview, batch print, and batch download) displayed duplicate "Add fee for paid by package" line items if the patient had previously refunded and re-paid using a package.
- **Root Cause:** The server-side PDF rendering logic (`printPDFInvoicePatientATP` and `transformInvoiceContentToTemplate`) iterated over all historical transactions without filtering out outdated fees from before a refund occurred. The UI handled this correctly, but the backend PDF engine did not.
- **Files bị ảnh hưởng:** `d:\Sources\pteverywhere\Server\logicMongo\v2_PatientInvoiceLogic.js`

## 2. Kiến thức FE (AngularJS / JS / CSS / Browser)

### 2.1 Khái niệm cốt lõi liên quan
Not primarily a frontend bug, but the issue was discovered when comparing the AngularJS UI (which filtered correctly) against the generated PDF.

## 3. Kiến thức BE (ActionHero / Node / MongoDB)

### 3.1 Khái niệm cốt lõi liên quan
- **PDF Generation Data Prep:** Before sending HTML to a PDF generator (like `html-pdf`), the data must be accurately formatted. Business logic rules (like ignoring refunded fees) must be applied during this HTML string building phase.
- **Underscore.js (`_.findLastIndex`):** Extremely useful for chronological transaction ledgers when you need to find the *most recent* occurrence of an event (like a refund) to act as a watermark.

### 3.2 Pattern đúng vs sai
| ❌ Sai | ✅ Đúng | Lý do |
|--------|---------|-------|
| Rendering all transactions of a certain type without checking historical invalidation events. | Finding a "watermark" index (like the last refund) and only rendering transactions that occurred after it. | In an append-only ledger system, old transactions shouldn't be deleted, but they need to be filtered out of current state representations. |
| `formatCurrency(NewAmount - Amount)` | `formatCurrency((NewAmount \|\| 0) - (Amount \|\| 0))` | Prevents `NaN` from appearing on PDFs if data is missing or corrupted. |

## 4. Quy trình debug đã dùng
1. Identified that the single PDF preview lacked the filter. Implemented `idxRefundPkg` filter in `printPDFInvoicePatientATP`.
2. User reported the same issue in Batch Print / Batch Download.
3. Traced the client-side API call `v4BatchPrintPDFInvoicePatientWithTermATP` to the server action.
4. Traced the action to the logic layer `batchPrintPDFAllInvoicePatientWithTermATP`.
5. Discovered that batch printing uses a shared helper function `transformInvoiceContentToTemplate`.
6. Confirmed the same missing logic in `transformInvoiceContentToTemplate` and applied the identical fix.

## 5. Design Decision (Tại sao code như vậy?)
I chose to replicate the `idxRefundPkg` logic directly into both `printPDFInvoicePatientATP` and `transformInvoiceContentToTemplate` (Option A inline fix) rather than refactoring into a shared helper function immediately. This was chosen to minimize regression risk in the complex legacy PDF rendering pipeline while ensuring the bug was quickly and safely resolved. A future refactor can extract this into a `_buildUpchargeFeeHtml` helper.

## 6. Dấu hiệu nhận biết bug tương tự
- Nếu UI hiển thị đúng số lượng item nhưng file xuất ra (PDF/Excel) lại dư thừa → Nghĩ ngay đến việc Backend thiếu logic filter đang được áp dụng ở Frontend.
- Nếu thấy field tính toán hiển thị `NaN` trên giao diện hoặc file export → Nghĩ ngay đến việc thiếu fallback `|| 0` khi làm toán với dữ liệu có thể null.

## 7. Test cases cần check sau khi fix
- [x] Single Invoice Preview with refund/repay scenario.
- [x] Batch Print containing an invoice with refund/repay scenario.
- [x] Batch Download containing an invoice with refund/repay scenario.
- [x] Invoices with normal upcharges (no packages) render correctly.
