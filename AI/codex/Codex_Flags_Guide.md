# 🚀 Hướng dẫn Toàn tập về Slash Commands & Flags trong Codex

Chào anh! Đây là cẩm nang giúp anh tận dụng tối đa các tính năng trong bảng điều khiển Codex để vừa code nhanh, vừa tiết kiệm token.

---

## 🛠️ Giải thích chi tiết các Flag (Slash Commands)

Dưới đây là ý nghĩa của các lệnh xuất hiện trong "bảng điều khiển" của anh:

| Lệnh / Flag | Ý nghĩa & Chức năng |
| :--- | :--- |
| **🔍 Code review** | Thừa lệnh cho AI duyệt qua các file đang mở hoặc các thay đổi vừa thực hiện. AI sẽ tìm lỗi logic, hổng bảo mật (security) và gợi ý tối ưu code. |
| **⚡ Fast** | Chế độ "Mì ăn liền". Khi bật, AI sẽ trả lời cực nhanh bằng cách dùng các luồng xử lý ưu tiên hoặc model nhẹ hơn. Phù hợp cho câu hỏi ngắn, đơn giản. |
| **💬 Feedback** | Gửi phản hồi về câu trả lời của AI hoặc báo cáo lỗi cho đội ngũ phát triển. |
| **👁️ IDE context** | **CỰC KỲ QUAN TRỌNG.** <br> - **Bật:** AI "nhìn" thấy toàn bộ project (biến, hàm, cấu trúc file). <br> - **Tắt:** AI chỉ biết những gì anh gõ trong chat. (Dùng khi muốn tiết kiệm token). |
| **🔌 MCP (Model Context Protocol)** | Hiển thị trạng thái kết nối với các "phụ kiện" bên ngoài (như database, bộ tài liệu riêng, hoặc công cụ quản lý file). |
| **🧠 Model** | Chọn "Bộ não" cho AI (như GPT-5.2, Claude, v.v.). Model càng cao cấp thì càng thông minh nhưng có thể tốn nhiều credit hơn. |
| **👤 Personality** | Tùy chỉnh "tính cách" hoặc "vai trò" của AI (Ví dụ: Chuyên gia bảo mật, Chuyên gia Frontend, Guide thân thiện...). |
| **📋 Plan mode** | Khi bật, AI sẽ KHÔNG code ngay. Nó sẽ đi nghiên cứu dự án, lên kế hoạch từng bước rồi mới hỏi anh có đồng ý thực hiện không. Tránh việc AI sửa code lung tung. |
| **🤔 Reasoning** | Quyết định AI sẽ suy nghĩ "sâu" đến mức nào (Low/Medium/High). Reasoning càng cao, AI càng ít sai logic nhưng trả lời sẽ chậm hơn một chút. |
| **📊 Status** | Cho anh xem "Bảng táp lô" gồm: ID hội thoại, lượng Token đã dùng (cái bảng 93% lúc nãy) và giới hạn lượt chat còn lại. |

---

## 🎯 Tip sử dụng hiệu quả (Hà's Strategy)

Để vừa làm việc hiệu quả vừa tiết kiệm, chị Hà khuyên anh:

### 1. Khi nào nên TẮT "IDE Context"?
- Khi anh chỉ muốn hỏi một câu lý thuyết suông (VD: "Mảng trong JS là gì?").
- Khi anh đã copy-paste đoạn code cần hỏi vào chat rồi. 
- **Lợi ích:** Tiết kiệm đến 50-70% token vì AI không cần nạp lại toàn bộ cấu trúc folder vào đầu.

### 2. "Plan Mode" là người bạn tốt nhất
- Trước khi thực hiện một thay đổi lớn (như Refactor cả một module), hãy bật **Plan mode**.
- AI sẽ vẽ ra sơ đồ các file sẽ bị ảnh hưởng, anh duyệt xong rồi nó mới làm. Điều này giúp anh giữ quyền kiểm soát 100%.

### 3. Điều chỉnh "Reasoning" theo task
- **Task khó (Sửa bug logic phức tạp):** Để **High/Full Reasoning**. Đợi lâu một chút nhưng đỡ phải sửa đi sửa lại.
- **Task dễ (Viết comment, đổi tên biến, code HTML/CSS):** Để **Low/Medium**. AI sẽ phản hồi gần như tức thì.

### 4. Dùng "Code Review" định kỳ
- Trước khi `git push` (nhớ vụ lộ Secret lần trước chứ anh?), hãy chạy **Code review**. AI sẽ nhắc anh nếu anh quên xóa comment test hoặc để lộ Passwords/Keys.

---

## 💡 Skills (Phần bổ sung)
- **Image Gen**: Dùng để vẽ UI mockup, icon, hoặc hình minh họa cho bài viết ngay trong lúc đang code.

---
*Chúc anh tận dụng tốt các "vũ khí" này để trở thành Super Dev!*
*— Team An & Hà từ AWF —*
