PHÂN TÍCH: NÊN TÁCH HAY GỘP COMPONENT?
📊 TRADE-OFF ANALYSIS
Option 1: Tách riêng (Container + Presentational)
✅ PROS:
- Clear separation of concerns
- Easier to test (presentational component là pure function)
- FormFields có thể memoize dễ dàng
- Reusable FormFields cho nhiều contexts

❌ CONS:
- Thêm 1 layer (có thể thấy "over-engineering" với form đơn giản)
- Props drilling (phải pass formData, handleChange xuống)

Option 2: Gộp chung (Single Component)
✅ PROS:
- Ít files hơn, đơn giản hơn
- Không props drilling
- Dễ đọc flow từ đầu đến cuối

❌ CONS:
- Logic + UI mixed → Khó test
- Khó tái sử dụng UI part
- Re-render toàn component khi state thay đổi (nếu không optimize)

KHUYẾN NGHỊ: GỘP CHUNG NHƯNG OPTIMIZE
Lý do:
SOAP Note Form đơn giản - Chỉ 4 fields, không có nested sections phức tạp
Không cần reuse UI - FormFields chỉ dùng trong SOAP Note, không share với forms khác
Dynamic Structure - Vì render từ API structure, việc tách riêng không giúp ích nhiều
NHƯNG: Phải optimize kỹ để tránh re-render dư thừa!