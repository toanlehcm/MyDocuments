Ran command: `echo "No task boundary needed."`

# Để thêm file **pte-ai-context.md** (hay bất kỳ bộ rules nào) vào luồng hoạt động tự động của **Google Antigravity** trong VS Code, anh làm theo 2 cách sau nhé:

### Cách 1: Thêm vào User Rules (Hoạt động cho mọi Workspace)
Nếu anh muốn Antigravity luôn đọc bộ luật này cho tất cả các folder liên quan đến PtEverywhere:

1. Copy toàn bộ nội dung của file [d:\Sources\pteverywhere\.agents\rules\pte-ai-context.md](cci:7://file:///d:/Sources/pteverywhere/.agents/rules/pte-ai-context.md:0:0-0:0).
2. Mở trình duyệt và vào đường dẫn: [https://aistudio.google.com/app/antigravity](https://aistudio.google.com/app/antigravity)
3. Tìm đến tab **"Settings"** (hoặc Custom Instructions / User Rules tùy phiên bản giao diện).
4. Paste toàn bộ nội dung file đó vào ô **User Rules**.
5. Save lại. Kể từ giờ, Antigravity sẽ luôn đính kèm bộ luật này vào context ngầm mỗi khi chat.

### Cách 2: Setup theo Project-Specific (Khuyên dùng)
Nếu anh muốn Antigravity chỉ áp dụng bộ luật này riêng cho folder `d:\Sources\pteverywhere`:

Antigravity có thể tự động nhận diện các file rules nếu được đặt đúng vị trí chuẩn. Hệ thống hiện tại của anh đã đưa rule vào đường dẫn có cấu trúc rất tốt:
> [d:\Sources\pteverywhere\.agents\rules\pte-ai-context.md](cci:7://file:///d:/Sources/pteverywhere/.agents/rules/pte-ai-context.md:0:0-0:0)

Tuy nhiên, để Antigravity tự động kích hoạt (auto-trigger), anh chỉ cần mở tab Chat của Antigravity trong VS Code, và **gửi một câu prompt duy nhất** để "dạy" nó như sau:

> *"Hãy nhớ từ nay về sau, đối với Workspace này, bạn phải luôn đọc và tuân thủ file [d:\Sources\pteverywhere\.agents\rules\pte-ai-context.md](cci:7://file:///d:/Sources/pteverywhere/.agents/rules/pte-ai-context.md:0:0-0:0) trước khi trả lời bất kỳ câu hỏi nào về code."*

Antigravity sẽ học và lưu ghi nhớ này vào file `.gemini/antigravity/brain/...` (System Context của agent). Lần tới anh mở chat mới, nó vẫn sẽ tự đi tìm file đó đọc đầu tiên ạ.