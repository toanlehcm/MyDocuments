# Codex Pricing & Usage Guide

Tài liệu này tóm tắt theo các trang chính thức của OpenAI:
- [Codex Pricing](https://developers.openai.com/codex/pricing)
- [Using Codex with your ChatGPT plan](https://help.openai.com/en/articles/11369540-codex-in-chatgpt-faq)
- [GPT-5.4 model page](https://developers.openai.com/api/docs/models)
- [GPT-5.3-Codex model page](https://developers.openai.com/api/docs/models/gpt-5.3-codex)
- [GPT-5.1-Codex model page](https://developers.openai.com/api/docs/models/gpt-5.1-codex)
- [GPT-5.1 Codex mini model page](https://developers.openai.com/api/docs/models/gpt-5.1-codex-mini)

## 1) So sánh rõ ràng giữa Free, Go, Plus, Pro, API key

### Free
- $0/month.
- Dùng Codex cho tác vụ coding ngắn, nhanh.
- Phù hợp để thử và làm việc nhẹ.

### Go
- $8/month.
- Dành cho coding nhẹ hơn Plus/Pro.
- Là bước nâng cấp rẻ nhất nếu bạn muốn dùng Codex thường xuyên hơn Free.

### Plus
- $20/month.
- Phù hợp cho vài session coding tập trung mỗi tuần.
- Có Codex trên web, CLI, IDE extension, iOS.
- Có cloud integrations như code review và Slack.
- Có model mới nhất trong nhóm dùng phổ thông, gồm GPT-5.4 và GPT-5.3-Codex.
- Có GPT-5.4-mini để tăng giới hạn local messages.
- Có thể mở rộng usage bằng ChatGPT credits.

### Pro
- $200/month.
- Phù hợp cho dev dùng Codex hằng ngày, full-time.
- Gồm mọi thứ của Plus, cộng thêm:
- Ưu tiên xử lý request.
- Có GPT-5.3-Codex-Spark preview.
- Giới hạn local và cloud cao hơn nhiều.
- Nhiều cloud-based code reviews hơn.

### API key
- Tính theo token usage, không theo subscription Codex cá nhân.
- Hợp cho automation, CI, workflow chia sẻ.
- Có thể dùng Codex trong CLI, SDK, hoặc IDE extension.
- Không có cloud-based features như GitHub code review, Slack, v.v.
- Trả tiền theo API pricing chuẩn.

## 2.1) Nếu upgrade từ Usage dashboard lên Go, Plus, Pro hoặc API key thì khác gì?

### Nếu lên Go
- Tăng mức dùng so với Free.
- Hợp nếu bạn chỉ cần dùng Codex nhẹ và không muốn lên Plus.

### Nếu lên Plus
- Bước cân bằng nhất cho dev cá nhân.
- Có cả local, IDE extension, web, iOS, cloud integrations.
- Thực tế là lựa chọn tốt nếu bạn code thường xuyên nhưng không phải cả ngày.

### Nếu lên Pro
- Tăng quota mạnh hơn Plus.
- Hợp nếu bạn dùng Codex nhiều mỗi ngày, code review nhiều, hoặc hay đụng trần usage.

### Nếu dùng API key
- Không còn là kiểu “subscription usage” giống Free/Go/Plus/Pro.
- Bạn trả theo token và có thể tự kiểm soát chi phí chi tiết hơn.
- Hợp nếu bạn cần tích hợp tự động, CI, hoặc muốn tách hoàn toàn khỏi gói ChatGPT.

## 2.2) Nên mua plan nào?

Khuyến nghị thực dụng:
- Chọn **Free** nếu bạn chỉ test hoặc dùng thỉnh thoảng.
- Chọn **Go** nếu bạn muốn rẻ và chỉ dùng nhẹ.
- Chọn **Plus** nếu bạn là dev cá nhân và dùng Codex đều đặn hằng tuần.
- Chọn **Pro** nếu bạn dùng Codex gần như mỗi ngày, nhiều giờ, nhiều repo, nhiều review.
- Chọn **API key** nếu mục tiêu chính là automation, CI, hoặc chi phí theo token thay vì subscription.

Nếu chỉ hỏi “phù hợp nhất cho dev cá nhân” thì thường là:
- **Plus** nếu bạn dùng vừa phải.
- **Pro** nếu bạn thật sự dùng như công cụ làm việc chính.

## 3) Personal usage, Desktop app và Extension thể hiện điều gì?

Trong Usage dashboard:
- **Desktop App** là lượng usage từ Codex chạy trong app desktop.
- **Extension** là lượng usage từ Codex trong IDE extension như VS Code.
- Đây là phần phân bổ theo kênh sử dụng, giúp bạn biết mình đang tiêu quota ở đâu.

Nếu bạn thấy cả hai cột:
- Nghĩa là cùng một tài khoản đang dùng Codex từ nhiều nơi.
- Cột nào cao hơn thì kênh đó đang tiêu nhiều usage hơn.

## 4) Context window: 19%, 81%, 50k, 258k tokens used là gì?

### 19% used
- Có nghĩa là bạn đã dùng 19% context window hiện tại.

### 81% left
- Có nghĩa là còn 81% context window khả dụng.

### 50k / 258k tokens used
- `50k` thường là số token đã dùng hiện tại.
- `258k` là tổng dung lượng context window mà session/model đang có lúc đó.

Nói đơn giản:
- Context window là “bộ nhớ ngắn hạn” của model cho phiên hiện tại.
- Càng nhiều file, prompt dài, log dài, hoặc lịch sử hội thoại dài thì token càng tăng.
- Khi lên gần đầy, Codex sẽ tự compacts context để tiết kiệm chỗ.

## 5) Nếu các chỉ số đạt giới hạn thì sao?

Theo docs:
- Số message bạn gửi được phụ thuộc model, độ phức tạp task, và local vs cloud.
- Task lớn, codebase lớn, session dài sẽ tiêu hao nhanh hơn.

Khi chạm limit:
- Bạn có thể bị chặn tạm thời cho tới khi quota reset.
- Với Plus/Pro, có thể mua thêm credits để tiếp tục.
- Nếu đang gần giới hạn, chuyển sang model nhỏ hơn như GPT-5.4-mini để kéo dài quota.
- Với API key, bạn tiếp tục được dùng nếu còn ngân sách API và quota billing.

## 6) Hướng dẫn dùng tiết kiệm các chỉ số này

### Tiết kiệm usage limit
- Chia task lớn thành nhiều task nhỏ.
- Đừng để Codex làm cả một roadmap dài trong một session nếu không cần.
- Dùng model mạnh chỉ khi task khó.
- Dùng model nhỏ hơn cho sửa lỗi nhỏ, rename, format, test đơn giản.

### Tiết kiệm context window
- Chỉ mở file thật sự liên quan.
- Tránh nhét nguyên log dài nếu chỉ cần vài dòng lỗi.
- Tóm tắt trước rồi mới đưa log thô nếu cần.
- Khi session quá dài, mở session mới thay vì kéo tiếp context cũ.

### Tiết kiệm token
- Viết prompt ngắn nhưng rõ.
- Nêu mục tiêu, ràng buộc, và file liên quan ngay từ đầu.
- Không yêu cầu giải thích dài nếu chỉ cần patch.
- Dùng `Include IDE context` khi nó giúp giảm việc bạn phải paste thủ công.

### Tiết kiệm money
- Nếu dùng cá nhân đều đặn, thường Plus là điểm cân bằng tốt nhất.
- Nếu bạn thường xuyên sát trần quota, cân nhắc Pro.
- Nếu workload chủ yếu là automation/CI, dùng API key sẽ dễ tối ưu theo token hơn.

## Mẹo chọn nhanh

- **Hobby / thử nghiệm**: Free
- **Dùng nhẹ**: Go
- **Dev cá nhân hằng tuần**: Plus
- **Dev hằng ngày, workload cao**: Pro
- **Automation / CI / tích hợp riêng**: API key

## Khi nào nên cân nhắc API key thay vì plan?

- Bạn cần billing theo token rõ ràng.
- Bạn muốn chạy trong CI hoặc automation.
- Bạn muốn tách usage khỏi subscription ChatGPT.
- Bạn không cần cloud features của Codex plan.

## Nguồn nghiên cứu thêm

- https://developers.openai.com/codex/pricing
- https://help.openai.com/en/articles/11369540-codex-in-chatgpt-faq
- https://developers.openai.com/api/docs/models
- https://developers.openai.com/api/docs/models/gpt-5.3-codex
- https://developers.openai.com/api/docs/models/gpt-5.1-codex
- https://developers.openai.com/api/docs/models/gpt-5.1-codex-mini

## Ghi chú

Một vài nhãn trong Usage dashboard có thể thay đổi theo rollout UI. Nếu bạn muốn, mình có thể làm thêm bản 1 trang chỉ dành riêng cho:
- cách đọc Usage dashboard của bạn,
- plan nào đáng mua,
- và cách giữ context/token thấp nhất khi dùng Codex trong VS Code.

---

Không hẳn.

Theo docs chính thức của Codex:

- `Local messages` và `Cloud tasks` dùng **cửa sổ 5 giờ** cho `Plus`, `Pro`, `Business`, `API key`.
- `Code reviews` thì là **theo tuần**.
- `Pro` không làm “reset nhanh hơn” theo nghĩa rút ngắn chu kỳ; nó chủ yếu cho **quota cao hơn**:
  - `Plus`: `45-225` local messages / 5h, `10-60` cloud tasks / 5h, `10-25` code reviews / tuần
  - `Pro`: `300-1500` local messages / 5h, `50-400` cloud tasks / 5h, `100-250` code reviews / tuần
- `Pro` còn có `6x higher usage limits` cho local/cloud tasks.

Nói ngắn gọn:
- **Không phải upgrade lên Go/Plus/Pro là refresh nhanh hơn theo kiểu reset sớm hơn.**
- Thường là:
  - **cùng cơ chế reset**,
  - nhưng **mức quota mỗi chu kỳ cao hơn** khi lên plan cao hơn.
- Với `API key`, usage là **usage-based theo token**, không còn kiểu quota plan giống hẳn `Free/Go/Plus/Pro`.

Riêng `Go`:
- Trang pricing public mình xem **không có bảng limit riêng cho Go** như `Plus/Pro`.
- Nên mình không thể khẳng định Go “reset nhanh hơn” từ docs này.
- Cách hiểu an toàn nhất: **Go chủ yếu là gói rẻ hơn với quota thấp hơn**, chứ không phải gói có chu kỳ reset đặc biệt ngắn hơn.

Nếu muốn, mình có thể làm ngay cho bạn một bảng 1 dòng cho từng plan:
- `reset theo cái gì`,
- `quota cao hay thấp`,
- `phù hợp kiểu dùng nào`.