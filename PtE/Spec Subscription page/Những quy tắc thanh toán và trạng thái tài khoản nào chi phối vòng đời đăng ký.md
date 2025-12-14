# Những quy tắc thanh toán và trạng thái tài khoản nào chi phối vòng đời đăng ký?

Vòng đời đăng ký được chi phối bởi các quy tắc nghiêm ngặt về thời điểm tính phí, cách xử lý các thay đổi gói (nâng cấp/hạ cấp), và các trạng thái tài khoản khác nhau trong trường hợp thanh toán thất bại hoặc hủy bỏ.

Dưới đây là những quy tắc thanh toán và trạng thái tài khoản cốt lõi chi phối vòng đời đăng ký:

### I. Trạng thái Tài khoản của Phòng khám (Clinic Status)

Trạng thái tài khoản của phòng khám xác định quyền truy cập và tình trạng hợp lệ của gói đăng ký hiện tại.

| Trạng thái | Mô tả | Quyền truy cập |
| :--- | :--- | :--- |
| **`no_subscription`** | Phòng khám mới tạo, không có gói đăng ký hợp lệ hoặc thông tin dùng thử. | Có thể truy cập, nhưng cần đăng ký. |
| **`trial`** | Phòng khám đang trong thời gian dùng thử, chưa có phương thức thanh toán hoặc gói đăng ký nào được lưu trữ. | Có thể truy cập. |
| **`active`** | Phòng khám đang sử dụng một gói đăng ký hợp lệ. | Có thể truy cập. |
| **`active_upcoming`** | Phòng khám đang dùng gói đăng ký hiện tại nhưng có một gói khác sắp có hiệu lực (thường do hạ cấp thủ công hoặc tự động nâng cấp từ Starter lên Standard). | Có thể truy cập. |
| **`active_cancelled`** | Phòng khám đã yêu cầu hủy (do SA thực hiện) nhưng vẫn đang trong chu kỳ thanh toán hiện tại. | Vẫn hoạt động cho đến hết chu kỳ thanh toán. |
| **`failed_payment`** | Thanh toán cho chu kỳ mới thất bại, nhưng phòng khám **vẫn trong thời gian ân hạn 3 tuần** và vẫn có thể truy cập tài khoản. | Có thể truy cập. |
| **`suspended_due`** | Gói đăng ký bị tạm ngưng và còn nợ. Điều này xảy ra khi thanh toán thất bại, thời gian ân hạn 3 tuần đã kết thúc và phòng khám chưa thanh toán khoản nợ. | **Không thể truy cập** tài khoản.
| **`suspended`** | Gói đăng ký mới nhất đã bị tạm ngưng, nhưng phòng khám đã thanh toán hết tất cả các khoản nợ. | **Không thể truy cập** (bị khóa) và phải đăng ký gói mới để tiếp tục. |
| **`trial_expired`** | Thời gian dùng thử đã hết hạn. Người dùng bị chặn truy cập và phải đăng ký để tiếp tục. | **Không thể truy cập** (bị khóa). |
| **`inactive`** | Phòng khám đã bị Quản trị viên Hỗ trợ (SA) vô hiệu hóa. | **Không thể truy cập**. |

### II. Quy tắc Thanh toán và Thay đổi Gói (Billing and Change Rules)

Các quy tắc này xác định thời điểm tính phí và hiệu lực của việc thay đổi gói đăng ký:

#### 1. Thời điểm Tính phí (Charge Timing)

*   **Nâng cấp, Tăng số lượng, Kéo dài Chu kỳ:** Các thay đổi này (như nâng cấp gói, tăng số lượng người dùng, chọn chu kỳ thanh toán dài hơn, hoặc thêm add-on) sẽ được **tính theo tỷ lệ (prorate) ngay lập tức** (phí/tín dụng) và phòng khám được chuyển sang gói mới ngay lập tức.
*   **Hạ cấp, Giảm số lượng, Rút ngắn Chu kỳ:** Các thay đổi này (như hạ cấp gói, giảm số lượng người dùng, chọn chu kỳ thanh toán ngắn hơn, hoặc xóa add-on) sẽ **có hiệu lực vào chu kỳ thanh toán tiếp theo** (không tính tỷ lệ giữa kỳ).
*   **Thanh toán Định kỳ:** Khoản thanh toán định kỳ sẽ được tạo và thực hiện tự động vào **ngày bắt đầu của mỗi chu kỳ thanh toán**.

#### 2. Quy trình Xử lý Thanh toán Thất bại (Failed Payment Flow)

Khi thanh toán tự động định kỳ thất bại, một quy trình 4 bước sẽ diễn ra trong vòng 22 ngày:

*   **Thất bại lần 1:** Trạng thái gói chuyển sang **`Failed Payment`**.
*   **Thử lại Tự động:** Hệ thống sẽ thử lại thanh toán tự động vào các ngày thứ **8, 15, và 22** sau lần thanh toán đầu tiên thất bại.
*   **Khóa Tài khoản:** Nếu lần thử lại thứ tư (ngày thứ 22) thất bại, trạng thái gói sẽ chuyển sang **`Suspended`**, và người dùng sẽ bị **khóa quyền truy cập** vào tài khoản.
*   **Yêu cầu Khôi phục:** Đối với các tài khoản bị khóa, người dùng phải thanh toán hết tất cả các khoản nợ (khoản phí phát sinh trong thời gian ân hạn 3 tuần) trước khi bắt đầu đăng ký gói mới.

#### 3. Quy tắc Nâng cấp và Hủy bỏ Đặc biệt

*   **Nâng cấp Tự động:** Nếu một phòng khám sử dụng gói **Starter** và vượt quá giới hạn **20 lượt truy cập mỗi tháng** (không tính lượt bị hủy hoặc vắng mặt), gói **Standard** sẽ được áp dụng trong chu kỳ thanh toán tiếp theo.
*   **Hủy Đăng ký:** Người dùng **không thể tự hủy** đăng ký; họ phải yêu cầu hỗ trợ từ Quản trị viên Hỗ trợ (SA). Sau khi SA hủy, gói hiện tại vẫn duy trì trạng thái **`active`** cho đến khi kết thúc chu kỳ thanh toán.
*   **Xung đột Gói Sắp tới (Upcoming Plan):** Nếu gói sắp tới (`Upcoming plan`) không hợp lệ (ví dụ: số lượng người dùng hoạt động thực tế vượt quá giới hạn của gói sắp tới) vào Ngày Lên lịch, gói sắp tới sẽ bị **Terminated**, và gói hiện tại sẽ được gia hạn cho chu kỳ tiếp theo.

#### 4. Quy tắc Ngày Bắt đầu Chu kỳ Thanh toán Tiếp theo

*   **Chu kỳ Hàng tháng:** Ngày Bắt đầu Chu kỳ Tiếp theo là cùng ngày của tháng tiếp theo. Nếu ngày đó không tồn tại trong tháng tiếp theo, Ngày Bắt đầu sẽ là ngày cuối cùng của tháng đó (ví dụ: 31/1 sẽ chuyển thành 29/2 nếu 29 là ngày cuối cùng).
*   **Chu kỳ Hàng năm:** Ngày Bắt đầu Chu kỳ Tiếp theo là cùng ngày của năm tiếp theo. Nếu là ngày 29 tháng 2 và năm tiếp theo không phải là năm nhuận, Ngày Bắt đầu sẽ là ngày 28 tháng 2.