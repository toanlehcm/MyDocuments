# Interview Version — PTE-7569: More menu persists beside popup

## STAR Format (Situation → Task → Action → Result):

**S (Situation):** Trong hệ thống quản lý phòng khám, người dùng phàn nàn rằng menu "More" không tự đóng mà bị treo lơ lửng trên màn hình khi họ bấm vào các action mở popup (như Print, Fax, Preview).

**T (Task):** Cần tìm hiểu nguyên nhân gốc rễ khiến menu không đóng và xử lý dứt điểm trên nhiều module (Documents, Payments, Claims).

**A (Action):** Qua quá trình debug, tôi phát hiện ra xung đột giữa Bootstrap và Angular Material: khi popup (`$mdDialog`) mở lên, lớp backdrop của nó đã block sự kiện "click outside" của document mà Bootstrap đang lắng nghe để đóng dropdown. Tôi đã xử lý bằng cách chèn lệnh đóng menu thủ công ngay trước khi trigger async call mở popup.

**R (Result):** Lỗi UI khó chịu được khắc phục hoàn toàn. Trải nghiệm người dùng mượt mà hơn và tránh được rủi ro user click nhầm vào menu ma.

## Câu trả lời gộp lại (1–4 câu tự nhiên):
Trong một dự án y tế, tôi gặp một lỗi UI khá khó chịu khi menu dropdown không tự đóng mà đè lên các popup. Nguyên nhân do lớp backdrop của popup Angular Material chặn mất sự kiện click outside mà Bootstrap dùng để đóng menu. Tôi đã xử lý triệt để bằng cách đóng menu thủ công trước khi popup kịp khởi tạo, giúp giao diện trở lại mượt mà, chuyên nghiệp.

## Câu hỏi phỏng vấn FE/BE liên quan:
- Q: Event bubbling là gì? Tại sao click ra ngoài menu mà nó không đóng?
  A: Event bubbling là cơ chế event truyền từ element con lên các thẻ cha (tới tận document). Nếu một element (như backdrop) chặn event lại (`e.stopPropagation()` hoặc có pointer-events đè lên), document sẽ không nhận được click, dẫn đến thư viện (như Bootstrap) không biết để đóng menu.
