```
khi t muốn investigate 1 bug bất kỳ trong project, để tìm root cause, sau đó fix bug triệt để cho root cause đó, t nên dùng flag nào ngoài /help trong file .gemini\antigravity\global_workflows\README.md. 
Để tăng hiệu quả input và output của AI Agent
```

Viewed debug.md:1-266

Flag tối ưu nhất được thiết kế chuyên biệt cho tác vụ này là **`/debug`**. 

Tuy nhiên, với tư duy của một Senior Engineer (muốn fix **triệt để** và **tối ưu I/O của AI**), anh không nên chỉ gọi `/debug` đơn thuần mà cần vận hành nó theo một Workflow chuỗi.

### Giải thích Cơ chế (Tại sao `/debug` tối ưu nhất?)
Khi anh gõ `/debug`, AI Agent trong AWF không kích hoạt module viết code thông thường mà chuyển sang state **"The Detective v2.1"**. State này ép buộc AI phải chạy ngầm một cơ chế gọi là **Hypothesis Formation (Thiết lập giả thuyết)**:
- Thay vì thấy lỗi là nhào vô sửa bừa (Trial and Error) gây lãng phí Token và làm hỏng logic cũ.
- Lệnh `/debug` ép AI phải phân tích log, ngắt code, và in ra 3 giả thuyết (kèm % tỷ lệ chính xác) để anh xác nhận **trước khi** tiến hành viết bất kỳ dòng code nào.

### Workflow Tối ưu Xử lý Bug Triệt để (Senior Level)

Để không bao giờ rơi vào Rabbit Hole (điểm mù debug), anh hãy ứng dụng combo sau:

**1. Khởi chạy Investigation:**
Anh mở đầu bằng lệnh `/debug` kèm theo một Prompt đã cấu trúc sẵn (chuẩn hóa Input):
> `/debug Phát hiện memory leak/freeze UI ở màn hình [A]. Stack trace: [B]. Các file tình nghi: [C], [D]. Hãy phân tích event loop hoặc digest cycle và đưa ra 3 giả thuyết root cause.`

**2. Nếu Root-cause đơn giản (Typo, Null pointer):**
Anh chỉ cần ra lệnh cho AI fix trực tiếp ngay trong luồng `/debug`.

**3. Nếu Root-cause phức tạp (Sai Architecture, Race Condition):** 
**BẮT BUỘC** chặn AI lại và chuyển cờ sang lệnh **`/plan`**:
> `Dựa vào root cause vừa tìm ra, hãy chạy /plan để thiết kế lại luồng data flow cho Component này trước khi code.`
*(Tác dụng: Ép AI nhả ra 1 file markdown kiến trúc. Anh review file đó, duyệt logic xong mới cho AI chạy lệnh `/code` để gõ code. Đảm bảo fix tận gốc rễ cấu trúc).*

**4. Chốt hạ bằng Knowledge Base:**
Sau khi code chạy ngon lành, anh gọi cờ **`/save-brain`**. 
> `Chạy /save-brain ghi lại nguyên nhân gây ra bug [Tên Bug] và cách fix để lần sau không lặp lại sai lầm này ở thư mục Client.`

**Tóm lại:** Lệnh lõi là `/debug`. Nhưng "bí quyết" tối ưu I/O nằm ở việc anh cung cấp Input dồi dào log/context ban đầu, và dùng `/plan` để rào chắn không cho AI sửa code bậy bạ vượt ngoài tầm kiểm soát.