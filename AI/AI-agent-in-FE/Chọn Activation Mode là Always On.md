# Việc anh chọn Activation Mode là "Always On" cho file pte-ai-context.md là cực kỳ an toàn và ĐÚNG CHUẨN (Best Practice) trong trường hợp này.

Dưới đây là 3 lý do tại sao anh nên để Always On cho file này:

1. File này đóng vai trò là "Bộ não trung tâm" (Root Context)
File 

pte-ai-context.md
 thực chất rất ngắn (chỉ khoảng 13 dòng). Nhiệm vụ của nó không phải là chứa toàn bộ kiến thức dự án, mà là đóng vai trò "Biển chỉ đường". Khi để Always On, ngay từ câu greeting đầu tiên của bất kỳ session trò chuyện nào, AI sẽ luôn luôn biết được:

"À, mình đang ở dự án PtEverywhere."
"Nếu user bảo mình viết code Server, mình phải tự động vào .agent/code-standards/ đọc cấu trúc trước."
Nếu anh không để Always On (ví dụ để Auto/Dynamic), đôi khi AI có thể lười đọc hoặc "bỏ quên" mất file này nếu câu hỏi của anh không có từ khóa rõ ràng, dẫn đến việc sinh code sai chuẩn ngay từ đầu.

2. Tiết kiệm Token (Chi phí & Tốc độ)
Thay vì đẩy hàng nghìn dòng của 10 file (patterns, anti-patterns, null-safety, v.v.) vào mục Always On khiến AI bị "ngộp" thông tin (tốn token, phản hồi chậm), anh chỉ cấu hình Always On cho đúng 1 file mục lục ngắn gọn này.

Khi nào anh thực sự yêu cầu "Hãy viết thuật toán tính tiền cho Patient", nhờ file mục lục này AI mới bắt đầu đi tìm và đọc (lazy-load) các file quy tắc cụ thể. Đây là cách tối ưu context cực kỳ thông minh.

3. Ngăn chặn AI tự biên tự diễn (Hallucination)
Dự án PtE có những thuật ngữ dễ gây hiểu lầm chết người, ví dụ như từ Client (trong logic PtE nó nghĩa là Clinic/Phòng khám, không phải là Khách hàng/Bệnh nhân). Việc luôn luôn "đập vào mắt" AI nguyên tắc này ở mọi prompt giúp đảm bảo AI không bao giờ nhầm lẫn logic core của business trong bất kỳ tình huống debug hay phân tích code nào.

💡 Tóm lại: Anh setup pte-ai-context.md là Always On, và để tất cả các file còn lại trong .agent/ ở trạng thái bình thường (AI tự tìm đến qua file mục lục) là mô hình chuẩn mực và an toàn nhất cho các IDE AI Agent hiện nay. Anh cứ yên tâm giữ nguyên cấu hình này nhé!