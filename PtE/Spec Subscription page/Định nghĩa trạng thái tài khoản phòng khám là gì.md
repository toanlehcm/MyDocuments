# Định nghĩa trạng thái tài khoản phòng khám là gì?

Trạng thái tài khoản phòng khám (`Clinic Status`) là trạng thái gói đăng ký hiện tại của phòng khám, xác định liệu người dùng có thể truy cập vào tài khoản và tình trạng hợp lệ của gói đăng ký đó.

Dưới đây là định nghĩa các trạng thái đăng ký mà một tài khoản phòng khám có thể có:

### I. Trạng thái Không có/Chưa kích hoạt Gói

| Trạng thái | Định nghĩa |
| :--- | :--- |
| **`no_subscription`** | Phòng khám không có gói hợp lệ. Trạng thái này thường áp dụng khi phòng khám mới được tạo và chưa có thông tin dùng thử. Nếu phòng khám không thuộc bất kỳ trạng thái nào khác, trạng thái này sẽ được sử dụng. |
| **`trial`** | Phòng khám đang trong thời gian dùng thử và chưa có phương thức thanh toán hoặc gói đăng ký nào được lưu trữ. Phòng khám có thể đăng ký ngay lập tức bằng cách thêm phương thức thanh toán và xác nhận gói. Thanh toán thành công sẽ kết thúc thời gian dùng thử ngay lập tức và chuyển sang trạng thái `active`. |
| **`trial_expired`** | Thời gian dùng thử đã hết hạn và phòng khám không có phương thức thanh toán hoặc gói đăng ký nào được lưu trữ. Người dùng bị **chặn truy cập** vào trang Đăng ký và phải đăng ký để tiếp tục. |
| **`inactive`** | Phòng khám bị Quản trị viên Hỗ trợ (SA) vô hiệu hóa, và **không có người dùng nào** có thể truy cập vào tài khoản phòng khám (kể cả trang đăng ký). |

### II. Trạng thái Gói Đang Hoạt động

| Trạng thái | Định nghĩa |
| :--- | :--- |
| **`active`** | Phòng khám đang sử dụng một gói đăng ký. |
| **`active_upcoming`** | Phòng khám đang sử dụng một gói đăng ký hiện tại nhưng có một gói khác sắp có hiệu lực trong tương lai (thường do hạ cấp thủ công hoặc nâng cấp tự động từ Starter lên Standard). |
| **`active_cancelled`** | Phòng khám đã yêu cầu hủy bỏ gói đăng ký (do SA thực hiện) nhưng gói vẫn còn trong chu kỳ thanh toán hiện tại. |

### III. Trạng thái Thanh toán Lỗi hoặc Tạm ngưng

| Trạng thái | Định nghĩa |
| :--- | :--- |
| **`failed_payment`** | Phòng khám đang sử dụng một gói đăng ký nhưng thanh toán cho chu kỳ thanh toán mới đã thất bại. Phòng khám **vẫn trong thời gian ân hạn** và **vẫn có thể truy cập** vào tài khoản. |
| **`suspended_due`** | Gói đăng ký gần nhất bị tạm ngưng và có khoản nợ tồn đọng (`due amount`). Điều này xảy ra khi thanh toán thất bại, thời gian ân hạn đã kết thúc, người dùng **không thể truy cập** vào tài khoản, và phòng khám chưa thanh toán khoản nợ. |
| **`suspended`** | Gói đăng ký gần nhất đã bị tạm ngưng, nhưng phòng khám **đã thanh toán hết** tất cả các khoản nợ. |
| **`cancelled`** | Gói đăng ký gần nhất đã bị Quản trị viên Hỗ trợ (SA) hủy thủ công. |
| **`terminated`** | Gói sắp tới (`upcoming plan`) đã trở thành gói `active` và gói cũ bị chuyển thành `terminated`. Trạng thái này cũng áp dụng cho các gói đã kết thúc trong quá khứ. |