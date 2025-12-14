# Giải thích overall layout trong dashboard module

Dựa trên tài liệu "Dashboard (version 2)", dưới đây là giải thích về bố cục tổng thể (`Overall layout`) của mô-đun Dashboard:

Bố cục của mô-đun Dashboard bao gồm ba thành phần chính: **các tab Dashboard**, **Thanh Bộ lọc & Điều khiển (Filters & Controls Bar)**, và **Nội dung Dashboard (Dashboard content)**, cùng với các thông tin hiển thị cố định ở đầu trang.

### 1. Các Tab Dashboard (Dashboard Tabs)

Có **3 tab dashboard cố định** được đặt ở phần tiêu đề (header) của mô-đun, cho phép người dùng chuyển đổi giữa các nhóm phân tích khác nhau.

Khi nhấp vào một tab, bảng điều khiển được chọn sẽ được **đánh dấu (highlighted)**.

| Tab Dashboard | Mục đích | Các Widgets chính được theo dõi |
| :--- | :--- | :--- |
| **Practice Executive Summary** | Cung cấp cái nhìn tổng quan toàn diện về **sức khỏe tài chính** của phòng khám. Nó kết hợp các chỉ số về chu kỳ doanh thu với tóm tắt cấp cao, giúp lãnh đạo đưa ra quyết định sáng suốt. Tab này theo dõi các xu hướng về doanh thu, thanh toán và tài chính. | Revenue, Payments/Collections, AR, Unpaid Claims, Charge Lag, Appointment Fill Rate. |
| **Front-End Analytics** | Tập trung vào các khía cạnh **tương tác với bệnh nhân** (patient-facing). Cung cấp thông tin chi tiết về nhân khẩu học bệnh nhân, lập lịch hẹn và thời gian chờ đợi. Nhân viên lâm sàng và lễ tân có thể sử dụng tab này để tối ưu hóa trải nghiệm bệnh nhân và hợp lý hóa các hoạt động. | Encounters, Appointment Fill Rate, Panel Size, Revenue, Payment / Collection, Time-of-Service Collections, Provider Productivity, Frozen Slots Rate, Payer Mix. |
| **Back-End Analytics** | Đi sâu vào **hiệu quả hoạt động** và sử dụng tài nguyên. Bao gồm các lĩnh vực như năng suất nhà cung cấp dịch vụ (provider productivity) và hiệu suất nhân viên. Bằng cách phân tích các quy trình back-end, mục tiêu là tăng cường quy trình làm việc của phòng khám, giảm chi phí, tối ưu hóa thanh toán và đảm bảo chu kỳ doanh thu lành mạnh. | AR, Unpaid Claims, Rejection Reason, Referral. |

**Quyền truy cập:** Chỉ hiển thị những dashboard mà người dùng có quyền truy cập.

### 2. Thanh Bộ lọc & Điều khiển (Filters & Controls Bar)

Thanh này nằm ở **phần trên** của mỗi dashboard. Thanh này cho phép người dùng lọc và điều chỉnh dữ liệu hiển thị:

*   **Các bộ lọc chính:** Bao gồm các bộ lọc cố định như **Date** (Phạm vi thời gian), **Location** (Địa điểm), **Provider** (Nhà cung cấp dịch vụ), và **Service** (Dịch vụ).
*   **Thao tác Bộ lọc:** Người dùng có thể **[Apply Filter]** (Áp dụng Bộ lọc), **[Clear Filters]** (Xóa Bộ lọc), và **[Save Filters]** (Lưu Bộ lọc) để sử dụng lại.
*   **Kiểm soát Khác:** Bao gồm nút **[Refresh Dashboard]** (Làm mới Dashboard) và hiển thị thông tin về **lần cập nhật gần nhất** ("Last updated \{...\} ago").
*   **Bộ lọc Đã Lưu (Saved Filter):** Cho phép chọn các mẫu bộ lọc đã được tạo trước đó.

### 3. Nội dung Dashboard (Dashboard Content)

Phần nội dung bao gồm các **widget được xác định trước**.

*   **Widget (Khối chức năng):** Mỗi widget đại diện cho một chỉ số kinh doanh hoặc hiệu suất cụ thể (ví dụ: Revenue, Account Receivables, Appointment Fill Rate).
*   **Chế độ xem chi tiết (Detailed View):** Người dùng có thể chuyển đổi giữa chế độ **thu gọn (collapse view)** (mặc định là TẮT) và **chế độ mở rộng (expanded view)** (nếu có sẵn) cho tất cả các widget.

### 4. Các Yếu tố Khác

Ngoài các thành phần trên, bố cục cũng bao gồm:

*   **Header cố định:** Hiển thị tên phòng khám (ví dụ: PLE GIIS Ahmedab...), mũi tên chuyển đổi, tiêu đề "Dashboard", ngôn ngữ (English), và các bộ lọc nhanh ở hàng đầu tiên (Date, Location, Provider, Service).
*   **Cấu hình Footer:** Mô-đun Dashboard có thể được kiểm soát để hiển thị trên chân trang web (Web footer), chân trang di động (Mobile footer) và trong danh sách thả xuống (Drop-down list) của menu Home. Mặc định, Dashboard được bật hiển thị trên tất cả các vị trí này cho mọi người dùng phòng khám thuộc gói Pro và Ultimate.
*   **Phạm vi Gói:** Mô-đun Dashboard chỉ khả dụng cho các gói **Pro và Ultimate**.