# t đang dùng Google Antigravity, lam sao de toi uu token trong project thực tế.

```
Dựa vào hình ảnh Dashboard bạn vừa gửi, có thể thấy bạn đang có một hệ thống phân bổ Quota (hạn mức) cực kỳ rõ ràng với 5 Group, mỗi Group có thời gian reset khác nhau (từ 5 tiếng đến gần 4 ngày). Việc tối ưu token không chỉ giúp tiết kiệm chi phí mà còn giúp bạn không bị "đứt gánh" giữa giờ làm việc vì hết Quota.

Để tối ưu hóa lượng Token (bao gồm cả Input, Output và Reasoning Token) trong một dự án thực tế với Google Antigravity (hoặc các AI IDE tương tự), bạn hãy áp dụng 4 chiến lược sống còn sau đây:
Chiến lược Tối ưu Token
Mar 7, 4:25 PM

Nhìn vào Dashboard của bạn, Group 1 (Gemini High) có reset time rất ngắn (5h), trong khi Group 2 và 4 (Claude) có reset time tới gần 4 ngày.

Mẹo nhỏ cho bạn: Hãy ưu tiên "bào" Group 1 (Gemini High) và Group 3 trong ngày vì nó hồi phục rất nhanh. Hãy để dành Group 4 (Sonnet 4.6) và Group 2 (Opus) cho những chức năng thực sự xương xẩu vào cuối tuần hoặc khi Gemini bó tay nhé!
```

Bí kíp Tối ưu Token trong Dự án Thực tế (Google Antigravity)
Tối ưu token là bài toán quản lý đầu vào (Context), quản lý luồng suy nghĩ (Reasoning) và đầu ra (Output).
1. Chiến lược "Điều phối Model" (Dựa trên Dashboard của bạn)
Sai lầm lớn nhất gây tốn token là dùng "dao mổ trâu để giết gà" (Dùng Opus/Gemini High cho các task vụn vặt). Hãy chia task theo các Group bạn đang có:
Việc vặt, lặp lại (Dùng Group 3 & 5): * Tạo Mock data, viết JSDoc, comment code, format code, giải thích một đoạn code ngắn.
Tại sao: Các model như Gemini 3 Flash / GPT-OSS tiêu tốn cực ít token, chạy nhanh và thường có hạn mức rất dồi dào. Hãy để chúng gánh 50-60% số lượng câu hỏi hằng ngày của bạn.
Code logic hằng ngày (Dùng Group 4 - Sonnet 4.6):
Viết UI Component mới, tích hợp API, xử lý state management (Redux/Zustand).
Tại sao: Sonnet cực kỳ sắc bén với code. Nó tốn token hơn Group 3, nhưng sẽ ra kết quả đúng ngay từ lần 1-2, giúp bạn không phải chat đi chat lại (chat lại = tốn token nhân cấp số nhân).
Debug hệ thống & Kiến trúc (Dùng Group 1 & 2 - Gemini High / Opus):
Dùng khi gặp bug "ảo ma" không rõ nguyên nhân, cần AI đọc 10-20 file cùng lúc để tìm lỗi; hoặc khi setup cấu trúc thư mục từ đầu.
Tại sao: Nhóm "Thinking" này sinh ra một lượng Reasoning Token (Token suy nghĩ ẩn) khổng lồ trước khi trả lời. Nếu bạn dùng nó để đổi màu cái nút, nó vẫn sẽ "suy nghĩ" rất sâu và đốt sạch Quota của bạn (Quota của bạn đang ở mức 60% cho nhóm này).
2. Quản lý Đầu vào (Input Context) - Đừng bắt AI đọc rác
Mỗi khi bạn hỏi 1 câu, AI sẽ đọc những file bạn đính kèm. Càng đọc nhiều, Input Token càng tăng.
Chỉ đính kèm File liên quan: Đừng bấm nút "Add toàn bộ Workspace" trừ khi thật sự cần thiết. Hãy tag đích danh file bằng cú pháp @filename (ví dụ: @Button.tsx @utils.ts sửa lỗi ở đây).
Đóng bớt Tab không dùng: Một số Agent tự động lấy Context từ các tab đang mở trên Editor. Hãy dọn dẹp các tab không liên quan trước khi chat.
Sử dụng .agignore hoặc .cursorignore (Tương tự .gitignore):
Hãy tạo file này ở thư mục gốc và chặn AI đọc các file rác để tránh lãng phí token quét mã:
node_modules/
dist/
build/
.git/
*.map
package-lock.json
yarn.lock


3. Kỹ thuật Prompt để tối ưu Đầu ra (Output Token)
Output Token (chữ AI nhả ra) thường đắt hơn Input Token.
Xin Diff thay vì xin Full Code: Nếu file của bạn dài 500 dòng và bạn nhờ sửa 1 dòng lỗi, đừng để AI in lại cả 500 dòng.
Prompt đúng: "Chỉ viết ra hàm bị sửa" hoặc "Chỉ đưa ra đoạn code cần thay đổi, phần còn lại dùng // ... để rút gọn".
Yêu cầu không giải thích lằng nhằng: AI thường rất lịch sự và nói nhiều ("Dưới đây là đoạn code bạn cần... Chúc bạn thành công..."). Những câu này đều tốn token.
Prompt đúng: "Chỉ output code, không giải thích gì thêm".
4. Quản lý Lịch sử Chat (Context Window)
Đây là "kẻ thù" hút token mà ít người để ý: Lịch sử chat sẽ được gửi lại toàn bộ cho API trong mỗi lượt hỏi.
Ví dụ: Lượt 1 bạn hỏi tốn 1000 token. Lượt 2 bạn hỏi thêm 1 câu 50 token -> Hệ thống sẽ gửi (1000 + 50) = 1050 token. Càng chat dài, số token đốt mỗi lượt càng khủng khiếp.
Quy tắc: Đã xong một Task hoặc chuyển sang Component khác -> BẮT BUỘC BẤM NÚT NEW CHAT (Clear Chat).
Không dùng 1 luồng chat cho cả ngày làm việc. Chỉ giữ luồng chat khi bạn đang nhờ AI sửa đi sửa lại một lỗi liên tục.
💡 Tóm tắt cho Workflow của bạn:
Mở file cần sửa -> Chỉ mở file đó.
Mở Chat -> Chọn Model phù hợp (Thường là Sonnet 4.6).
Hỏi ngắn gọn, yêu cầu chỉ trả về code cần sửa.
Sửa xong -> Chạy thử -> Thành công -> Xóa Chat ngay lập tức trước khi sang tính năng mới.