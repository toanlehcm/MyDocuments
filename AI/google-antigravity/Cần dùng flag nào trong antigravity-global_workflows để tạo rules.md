Em chào anh, để em giải thích rõ mục đích của các "flag" (lệnh/workflow) này và cách để anh tự tạo ra các rule tương tự cho riêng mình nhé.

### 1. Giải thích mục đích các lệnh (Workflow Flags)

Mỗi lệnh bắt đầu bằng `/` là một quy trình làm việc (workflow) đã được đóng gói sẵn để giúp AI thực hiện các nhiệm vụ phức tạp một cách chuẩn xác:

| Lệnh | Mục đích chính | Khi nào nên dùng? |
| :--- | :--- | :--- |
| **`/help`** | **Trung tâm trợ giúp.** Hiển thị menu, hướng dẫn cách dùng các lệnh khác hoặc giải đáp thắc mắc khi anh bị "stuck". | Khi quên lệnh hoặc không biết bước tiếp theo nên làm gì. |
| **`/plan`** | **Lập kế hoạch.** AI sẽ hỏi 3 câu hỏi cốt lõi để hiểu ý tưởng của anh, sau đó chia nhỏ công việc thành các Phase (Giai đoạn). | Khi bắt đầu một tính năng mới (Feature) hoặc một dự án mới. |
| **`/design`** | **Thiết kế chi tiết.** Vẽ sơ đồ Database, thiết kế luồng đi của dữ liệu (API), và viết Checklist kiểm tra (Acceptance Criteria). | Sau khi đã có Plan, dùng để định hình kỹ thuật "xây như thế nào" trước khi viết code. |
| **`/review`** | **Quét và Đánh giá.** Phân tích toàn bộ code hiện tại để báo cáo "sức khỏe" dự án, điểm tốt và các rủi ro cần cải thiện. | Khi anh tiếp nhận dự án cũ hoặc muốn kiểm tra lại chất lượng code trước khi bàn giao. |
| **`/save-brain`** | **Lưu bộ nhớ vĩnh viễn.** Ghi lại toàn bộ kiến thức, các quyết định quan trọng và tiến độ vào file `.brain` để lần sau AI không bị quên context. | **Bắt buộc** chạy khi kết thúc một buổi làm việc hoặc sau khi hoàn thành một task lớn. |

---

### 2. Cách yêu cầu em tạo file rule mới giống như `retrospective.md`

Để yêu cầu em tạo một file rule mới nằm trong thư mục `global_workflows`, anh không cần dùng "flag" đặc biệt nào cả, mà chỉ cần **ra lệnh trực tiếp** cho em. 

Tuy nhiên, nếu anh muốn em hiểu rằng anh đang muốn tạo một **AWF Workflow mới** (giống như cách em vừa tạo file `retrospective.md`), anh có thể dùng cấu trúc câu như sau:

> *"Hãy tạo cho anh một **AWF Workflow** mới tên là `ten-workflow.md` lưu vào thư mục `global_workflows`. Mục đích là để [mô tả mục đích của anh]. Hãy viết chi tiết persona, trigger phrases và các giai đoạn thực hiện."*

**Lưu ý về quyền hạn:** 
Em có công cụ `write_to_file` nên em có thể tự tạo file trực tiếp vào đường dẫn:
`C:\Users\daniel.toan.le\.gemini\antigravity\global_workflows\`

**Gợi ý cho anh:**
Nếu anh muốn tạo một rule để em tự động kiểm tra code theo chuẩn riêng của công ty (ví dụ chuẩn naming v2_, v4_ của PtE), anh có thể yêu cầu:
> *"Tạo AWF Workflow `/check-style` để mỗi khi anh nói 'Check code này' thì em sẽ đối chiếu với file conventions.md của dự án."*

Anh đang muốn tạo rule cho mục đích gì cụ thể không? Nói em biết em viết cho anh luôn nhé!