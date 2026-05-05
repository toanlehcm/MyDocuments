# Interview Version — PTE-6419: Duplicate "Add fee for paid by package" ledger

## STAR Format (Situation → Task → Action → Result):

**S (Situation):** In our clinic management application, patients paying by "package" have fee transactions recorded. If a package is refunded and re-applied, multiple historical "Add fee" entries remain in the database ledger. While the web UI correctly filtered these, the server-side PDF generator (used for both single previews and batch downloads) did not, causing duplicate fees to appear on printed invoices.

**T (Task):** I needed to fix the PDF generation logic so that it matches the UI and only displays the current, valid fee, preventing patient confusion over duplicate charges.

**A (Action):** I traced the PDF rendering pipeline and identified two shared functions lacking the filter. I implemented a robust index-based filtering mechanism using `_.findLastIndex` to dynamically locate the most recent package refund, and then filtered the rendering loop to only include "Add fee" entries occurring after that watermark. I also took the opportunity to harden the code by adding null-coalescing fallbacks for amount calculations to prevent potential `NaN` rendering issues.

**R (Result):** The PDF invoices for both individual and bulk exports now accurately reflect only the active fees, eliminating duplicates and improving the reliability of our billing documents.

## Câu trả lời gộp lại (1–4 câu tự nhiên):
In our clinic app, the PDF invoice generator was mistakenly showing duplicate fee entries for refunded packages because it lacked the filtering logic used by the frontend UI. I traced the issue to the backend rendering engine and implemented an index-based filter to dynamically locate the last refund transaction, ensuring only subsequent valid fees are displayed. I applied this fix across both single and batch PDF export functions, while also adding null-safety guards. This resolved the data discrepancy and ensured our billing documents were accurate.

## Câu hỏi phỏng vấn FE/BE liên quan:
- Q: How do you handle cases where frontend UI logic differs from backend reporting logic?
  A: It's a common source of bugs. The best approach is to identify the shared business rules and extract them into a single source of truth, or ensure both layers implement the exact same constraints. In this case, I replicated the UI's chronological filtering logic into the backend PDF rendering engine.
