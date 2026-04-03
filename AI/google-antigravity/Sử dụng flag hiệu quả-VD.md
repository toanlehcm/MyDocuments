```
<!-- Search Patient-->
                        <div class="col-12">
                            <div class="form-group form-group--strong-style mb-2 filter-line">
                                <h6 class="title-columns">{{'Task.PatientName'|translate}}</h6>
                                <md-contact-chips
                                    ng-model="filterModel.Patients"
                                    ng-change="onChangePatients()"
                                    filter-selected="true" 
                                    md-contact-image="AvatarUrl"
                                    md-contacts="searchPatients($query)"
                                    md-contact-name="Fullname"
                                    md-require-match="true"
                                    md-highlight-flags="i"
                                    placeholder="{{'Task.EnterPatient'|translate}}">
                                </md-contact-chips>
                            </div>
                        </div>
ví dụ t investigate tới đoạn code trên:
- nếu comment bỏ thì không bị freeze.
- nếu để vào right panel thì bị freeze, như hình.
- t đang thắc mắc liệu có phải md-contact-chips là root cause dẫn đến freeze hay không?
Hướng dẫn t prompt và dùng flag hiệu quả như bạn vừa nói, step by step chi tiết, cụ thể.
đảm bảo nhớ rule communication vừa tạo.
```

Dưới đây là Guideline thực chiến step-by-step để anh điều hướng AI Agent xử lý triệt để bug `md-contact-chips` này, tuân thủ tuyệt đối 10 rules giao tiếp (đặc biệt là Rule 7: Context Economy và Rule 9: Assume High Competency).

### Step 1: Cô lập và Ép AI phân tích Core Framework (`/debug`)
Anh hãy copy chính xác Prompt này dán vào hệ thống:

> `/debug Phát hiện UI freeze (Main thread bị block) tại màn hình Tasks. Đã isolate được node gây lỗi: thẻ <md-contact-chips> trong tasksManagementPtE.html. Khi comment node này, không còn hiện tượng freeze. Yêu cầu bật mode Detective: Nghiên cứu cấu trúc source code của md-contact-chips (Angular Material 1.x). Phân tích số lượng active $watch ngầm được sinh ra và chi phí DOM Layout Thrashing khi mount component này. Đưa ra 3 giả thuyết (kèm % xác suất) giải thích cơ chế gây nghẽn Digest Cycle dẫn tới Freeze UI.`

**💡 Tại sao Prompt này cực mạnh?**
Nó khóa chặt scope của AI. Thay vì AI đề xuất vớ vẩn như "kiểm tra lại tên hàm `searchPatients`", các từ khóa `Digest Cycle`, `Layout Thrashing`, và `Active $watch` ép AI phải phân tích sâu vào Rendering Pipeline của AngularJS.

### Step 2: Rào chắn bằng Thiết kế Kiến trúc (`/plan`)
Sau khi AI in ra 3 giả thuyết (VD: `md-contact-chips` tính toán bounding box quá nặng lúc init, hoặc query search trigger infinite digest loop), **chưa cho phép AI code ngay**. Anh chạy tiếp cờ này:

> `/plan Chốt root cause do overhead của md-contact-chips. Hãy lập Implementation Plan đề xuất 2 phương án Workaround ở cấp độ View/Controller (Ví dụ: Defer rendering bằng ng-if kết hợp $timeout, hoặc áp dụng one-time binding. TUYỆT ĐỐI không can thiệp sửa source core của Angular Material). Đánh giá Trade-off về UX và Time Complexity của từng phương án để tôi review.`

**💡 Tại sao Prompt này cực mạnh?**
Code của Angular Material là Blackbox. Nếu để AI tự xử (`/code` trực tiếp), nó thường thọc tay sửa bậy file của thư viện bên thứ 3. `/plan` ép nó tuân thủ *Rule 8 (Tôn trọng kiến trúc)* bằng cách đưa ra giải pháp bọc (Wrapper/Defer) ở tầng Business Logic.

### Step 3: Thực Thi & Xác Thực Tuần Tự (`/code` + Iterative Verification)
Sau khi anh đọc plan và chốt phương án (VD: chọn phương án Lazy-rendering bằng `$timeout`), yêu cầu AI code:

> `/code Thực thi phương án [Lazy-rendering ng-if]. Chỉ sửa file tasksManagementPtE.html và tasksManagementPtE.js. Sau khi xong, hướng dẫn tôi cách verify (Performance profile test) để chứng minh main thread đã nhả block.`

**💡 Tại sao Prompt này cực mạnh?**
Tuân thủ *Rule 10 (Iterative Verification)*. Ép AI không chỉ xả code ra mà phải cung cấp method/metric để anh tự test bằng công cụ Performance tab (F12) của browser.

### Step 4: Khóa Kiến Thức Ngăn Tái Phát (`/save-brain`)
Khi test đã mượt, UI hết freeze, gõ lệnh cuối cùng để lưu lại kinh nghiệm máu xương này cho Project:

> `/save-brain Lưu rule mới cho Frontend: "Khi sử dụng md-contact-chips (hoặc các core component nặng của Material) ở trong các panel hoặc popup, phải mặc định sinh kèm cơ chế defer mount ($timeout + ng-if) để tránh nghẽn main thread gây freeze UI".`

**💡 Tại sao Prompt này cực mạnh?**
Bất kỳ khi nào anh gọi AI tạo tính năng mới có xài `md-contact-chips` trong tương lai, nó sẽ ngầm tự động chèn `$timeout` bảo vệ UI mà anh không cần phải dặn lại. I/O lúc này đạt trạng thái tối ưu tuyệt đối.