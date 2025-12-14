# Người dùng quản lý các thay đổi gói, phương thức thanh toán và hóa đơn ra sao?

Người dùng có quyền quản trị tại phòng khám (Clinic Admin/Admin) và Quản trị viên Hỗ trợ (SA) quản lý các thay đổi gói, phương thức thanh toán và hóa đơn thông qua trang **Subscription Details** và các màn hình liên quan.

Dưới đây là cách người dùng quản lý từng mục:

### 1. Quản lý Thay đổi Gói Đăng ký (Plan Changes)

Người dùng quản lý các thay đổi gói thông qua nút **[Change Plan]** trên màn hình Chi tiết Đăng ký (Subscription Details),.

#### A. Quy trình Nâng cấp (Upgrade)

*   **Hiệu lực:** Nâng cấp gói hoặc tăng số lượng người dùng sẽ được **tính phí theo tỷ lệ (prorate) ngay lập tức**, và phòng khám sẽ được chuyển sang gói mới ngay lập tức,.
*   **Thao tác:** Khi xác nhận nâng cấp trên màn hình Tính toán Giá (Pricing calculation), hệ thống sẽ hiển thị pop-up "Upgrade Subscription Plan".
*   **Thanh toán:** Người dùng cần nhấp **[Pay Now & Upgrade]** để tiến hành thanh toán ngay lập tức cho khoản phí tỷ lệ prorated. Nếu thanh toán thành công, gói hiện tại (và gói sắp tới nếu có) sẽ bị chấm dứt, và gói mới sẽ được tạo.

#### B. Quy trình Hạ cấp (Downgrade)

*   **Hiệu lực:** Hạ cấp gói, giảm số lượng người dùng, hoặc áp dụng mã khuyến mãi mới mà không thay đổi gói hiện tại sẽ **có hiệu lực vào chu kỳ thanh toán tiếp theo** (không tính phí prorate giữa kỳ),,.
*   **Thao tác:** Khi xác nhận hạ cấp, hệ thống hiển thị pop-up "Downgrade Subscription Plan".
*   **Lịch trình:** Người dùng nhấp **[Schedule Downgrade]** để tạo một gói sắp tới (Upcoming plan),. Gói hiện tại vẫn **`active`** cho đến hết chu kỳ thanh toán đó.

#### C. Quản lý Gói Sắp tới (Upcoming Plan)

*   **Bắt đầu Ngay (Start Now):** Người dùng có quyền quản trị có thể chọn **[Start Now]** trên gói sắp tới. Điều này sẽ chấm dứt gói hiện tại ngay lập tức và tính phí cho gói mới.
*   **Hủy Hạ cấp (Cancel Downgrade):** Người dùng có thể sử dụng **[Cancel Downgrade]** để loại bỏ một kế hoạch hạ cấp đã được lên lịch thủ công, giữ gói hiện tại tiếp tục trong chu kỳ tiếp theo,.
*   **Tiếp tục Gói (Resume Plan):** Nút **[Resume Plan]** hiển thị trên gói `Active` đã được yêu cầu hủy (trạng thái `active_cancelled`) để người dùng có thể quay lại flow **[Change Plan]**.

### 2. Quản lý Phương thức Thanh toán (Payment Method Management)

Người dùng có thể quản lý phương thức thanh toán của mình qua các điểm truy cập khác nhau:

| Mục tiêu | Nút/Biểu tượng | Màn hình/Trạng thái |
| :--- | :--- | :--- |
| **Thay đổi thông thường** | **[Change Payment Method]** (Biểu tượng) | Hiển thị trên gói `Active` hoặc `Upcoming`,. |
| **Cập nhật thanh toán lỗi** | **[Update Payment Method]** (Nút) | Hiển thị trên gói `Failed Payment` hoặc `Suspended` còn nợ (Due Amount),. |
| **Thêm/Thay đổi khi đăng ký mới** | **[Add/Change Payment Method]** | Hiển thị trên màn hình "Pricing calculation" khi chọn gói mới. |

**Quy trình Xác thực:**
*   Khi thêm hoặc thay đổi phương thức thanh toán, hệ thống sẽ cố gắng **xác minh thẻ** bằng cách thực hiện ủy quyền (authorization) 0 đô la hoặc 1 đô la (có hoàn lại) để kiểm tra tính hợp lệ và hạn mức tín dụng.
*   Nếu thẻ được **chấp thuận**, phương thức thanh toán sẽ được cập nhật và người dùng nhận được thông báo thành công,.
*   Nếu thẻ bị **từ chối** (Declined) khi đang thực hiện thay đổi, hệ thống giữ lại phương thức thanh toán hiện tại và hiển thị pop-up,.

**Thanh toán Khoản nợ (Due Amount):**
*   Nếu phòng khám đang ở trạng thái `Failed Payment` hoặc `Suspended` còn nợ (due amount), người dùng sử dụng nút **[Update & Pay Now]** trên màn hình Change Payment Method. Thao tác này sẽ cập nhật phương thức thanh toán mới và **tự động thu thập khoản nợ tồn đọng**. Nếu thanh toán thành công, phòng khám sẽ có thể đăng ký gói mới.

### 3. Quản lý Hóa đơn (Invoice Management)

Người dùng truy cập lịch sử hóa đơn qua nút **[Invoice History]**.

*   **Xem Lịch sử:** Màn hình Invoice History hiển thị danh sách các hóa đơn theo Ngày Phát hành (Issued Date), Gói đăng ký, **Trạng thái (Paid, Unpaid)** và Tổng Thanh toán (Total Payments),.
*   **Tải xuống:** Người dùng có thể **[Download]** tệp PDF của hóa đơn.
*   **Chi tiết Hóa đơn:** Hóa đơn PDF bao gồm thông tin về người thanh toán (Billed To), thông tin của PtEverywhere, chi tiết gói đăng ký, và bảng các mục tính phí (Therapist users, RCM add-on, v.v.), cùng với các khoản giảm giá, thuế, và khoản prorated (nếu có),,,.