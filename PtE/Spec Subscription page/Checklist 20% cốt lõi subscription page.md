# Checklist 20% cốt lõi, bắt buộc nắm rõ trong tài liệu này là gì? để có thể làm việc mà không gây ra lỗi trên production.

Đây là danh sách kiểm tra (checklist) 20% cốt lõi, bắt buộc phải nắm rõ để có thể làm việc liên quan đến hệ thống quản lý đăng ký thuê bao (Subscription) mà không gây ra lỗi trên môi trường production, dựa trên các tài liệu đã cung cấp.

Danh sách này tập trung vào các **Quy tắc Kinh doanh (BR - Business Rules)** và **Trạng thái Hệ thống/Luồng chính (System Status/Flow)** vì đây là các yếu tố quan trọng nhất ảnh hưởng trực tiếp đến việc tính phí và truy cập của người dùng.

### A. Quy tắc Tính phí và Người dùng (Pricing & User Rules - BR)

Việc nắm rõ cách hệ thống tính phí và phân loại người dùng là cốt lõi để tránh lỗi thanh toán và sai sót trong cấp phép truy cập:

1.  **Giá Cơ Bản (Base Price):** Giá niêm yết của gói Starter (\$49/tháng), Standard (\$149/tháng), và Pro (\$199/tháng) **chỉ áp dụng cho người dùng Trị liệu viên đầu tiên**.
2.  **Định nghĩa Người dùng Trị liệu viên (Therapist User):** Người dùng có vai trò ("role") là "Provider" và loại ("type") là "Physical Therapist", "Occupational Therapist", "Speech Therapist", hoặc "Other Therapist".
3.  **Định nghĩa Người dùng Không phải Trị liệu viên (Non-Therapist User):** Người dùng có vai trò "Assistant" hoặc "Other non-Therapist".
4.  **Giới hạn Người dùng Không phải Trị liệu viên:** Số lượng Người dùng Không phải Trị liệu viên (Non-Therapists) **không được lớn hơn** số lượng Người dùng Trị liệu viên (Therapists) (Non-Therapists $\le$ Therapists).
5.  **Trường hợp Đặc biệt - Clinic Admin (CA):**
    *   CA có tùy chọn **"Disable Admin Schedule" = TẮT** sẽ được tính là **Trị liệu viên**.
    *   CA có tùy chọn **"Disable Admin Schedule" = BẬT** sẽ được tính là **Admin** (miễn phí).
6.  **Quy tắc Giảm giá Hàng năm:** Gói hàng năm được **giảm giá 1 tháng** cho chu kỳ thanh toán hàng năm đầu tiên cho mỗi tài khoản người dùng.
7.  **Quy tắc Nâng cấp Tự động:** Nếu phòng khám đang sử dụng gói **Starter** và **vượt quá giới hạn 20 lượt truy cập/tháng**, gói **Standard** sẽ được áp dụng trong chu kỳ thanh toán tiếp theo. (Lượt truy cập *Cancelled* và *No Show* không được tính vào giới hạn này).
8.  **Proration (Tính toán theo tỷ lệ):**
    *   **Nâng cấp, tăng số lượng, chu kỳ thanh toán dài hơn, hoặc thêm add-on** sẽ được **áp dụng (charge/credit) ngay lập tức** (prorate immediately).
    *   **Hạ cấp, giảm số lượng, chu kỳ thanh toán ngắn hơn, hoặc xóa add-on** sẽ **có hiệu lực vào chu kỳ thanh toán tiếp theo** (no mid-term proration).
9.  **Ngày Bắt đầu Chu kỳ Thanh toán Tiếp theo:**
    *   Đối với gói **hàng tháng**, Ngày Bắt đầu Chu kỳ Tiếp theo là cùng ngày của tháng tiếp theo. Nếu ngày đó không có (ví dụ: 31/1), Ngày Bắt đầu sẽ là ngày cuối cùng của tháng đó (ví dụ: 29/2).
    *   Đối với gói **hàng năm**, Ngày Bắt đầu Chu kỳ Tiếp theo là cùng ngày của năm tiếp theo (trường hợp 29/2 sẽ chuyển thành 28/2 nếu năm tiếp theo không phải năm nhuận).

### B. Luồng Thanh toán và Trạng thái Tài khoản (Payment Flow & Status)

Việc hiểu các trạng thái của phòng khám và quy trình xử lý thanh toán lỗi là rất quan trọng để quản lý truy cập và thu hồi nợ:

1.  **Trạng thái Tài khoản Quan trọng:**
    *   **`active`:** Phòng khám đang sử dụng gói đăng ký hợp lệ.
    *   **`failed_payment`:** Phòng khám đang trong chu kỳ đăng ký nhưng thanh toán chu kỳ mới thất bại; vẫn trong **thời gian ân hạn (grace period)** và **vẫn có thể truy cập** tài khoản.
    *   **`suspended_due`:** Thanh toán thất bại, **thời gian ân hạn đã kết thúc**, người dùng **không thể truy cập** tài khoản, và phòng khám chưa thanh toán khoản nợ.
    *   **`trial_expired`:** Hết hạn dùng thử, người dùng bị **chặn truy cập** vào ứng dụng (phải đăng ký để tiếp tục).
2.  **Quy trình Thanh toán Định kỳ Thất bại:**
    *   Lần thanh toán tự động thất bại lần đầu tiên, trạng thái chuyển sang **`Failed Payment`**.
    *   Hệ thống sẽ thử lại thanh toán tự động vào ngày thứ **8, 15, và 22** sau lần thanh toán đầu tiên thất bại (+7, +14, +21 ngày).
    *   Nếu thử lại thất bại lần thứ tư (ngày thứ 22), trạng thái sẽ chuyển thành **`Suspended`** và **khóa người dùng khỏi tài khoản**.
3.  **Yêu cầu Hủy (Cancellation):** Người dùng **không thể tự hủy** đăng ký, họ phải yêu cầu hỗ trợ (SA). Sau khi SA hủy, gói hiện tại vẫn **`active`** cho đến hết chu kỳ thanh toán.
4.  **Kiểm tra và Xác thực Người dùng Tối thiểu khi Điều chỉnh Kế hoạch:**
    *   Số lượng người dùng trị liệu viên (Therapist users) cho gói mới **không được nhỏ hơn** số lượng người dùng trị liệu viên đang hoạt động hiện tại.
    *   Số lượng người dùng không phải trị liệu viên (Non-Therapist users) cho gói mới **không được nhỏ hơn** số lượng người dùng không phải trị liệu viên đang hoạt động hiện tại.
    *   Số lượng người dùng không phải trị liệu viên **phải nhỏ hơn hoặc bằng** số lượng người dùng trị liệu viên.

### C. Ghi nhận và Lưu trữ Thanh toán (Invoice & Charges)

1.  **Recalculation (Tính toán lại):** Số tiền được tính phí lại nếu mã khuyến mãi được sử dụng hết hoặc hết hạn vào chu kỳ thanh toán tiếp theo.
2.  **Prorated Charge khi Nâng cấp:** Khi nâng cấp (upgrade), thanh toán sẽ được xử lý ngay lập tức, áp dụng phí prorated cho phần còn lại của chu kỳ thanh toán. Ngược lại, hạ cấp (downgrade) sẽ có hiệu lực vào chu kỳ thanh toán tiếp theo.

***
Việc nắm vững 9 quy tắc tính phí/người dùng và các quy tắc về trạng thái tài khoản/luồng thanh toán này sẽ đảm bảo độ chính xác của dữ liệu người dùng và thanh toán, từ đó giảm thiểu rủi ro gây ra lỗi nghiêm trọng trên production.