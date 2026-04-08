# Codex trong VS Code - Hướng dẫn nhanh (cập nhật 2026-04-08)

Nguồn chính thức dùng trong tài liệu này: OpenAI Developers + OpenAI Help Center.

## 1) T đang dùng Codex plan nào?

Theo ảnh bạn gửi có dòng **"Upgrade to Plus"** trong phần rate limits.
Suy ra khả năng cao bạn đang ở **ChatGPT Free** (hoặc Go), chưa phải Plus/Pro.

Cách check chính xác:
1. Trong VS Code Codex panel -> mở menu tài khoản (góc avatar) -> vào `Manage plan` hoặc `Open ChatGPT account`.
2. Hoặc mở trực tiếp ChatGPT web -> `Settings` -> `Plan`.
3. Nếu thấy nút nâng cấp (`Upgrade to Plus`) thì đang không ở Plus/Pro.

## 2) Model nào free, model nào tính phí?

Có 2 lớp cần tách riêng:

1. **Theo gói ChatGPT (Codex extension đăng nhập ChatGPT):**
- Không phải "model free vs paid" theo từng model như API.
- Bạn có **quota dùng kèm plan** (Free/Go/Plus/Pro/Business/Enterprise/Edu).
- Hết quota thì có thể mua thêm credits (tùy plan hỗ trợ).

2. **Theo API key (token-based):**
- Mọi model đều tính theo token/credit.
- Không có "free tier model" cho GPT-5.x/Codex models trong API docs hiện tại.

## 3) Danh sách model theo chất lượng code (cao -> thấp), kèm chi phí/request/token

Lưu ý: thứ tự dưới đây ưu tiên **chất lượng generate code thực tế trong Codex** dựa trên mô tả model + rate card hiện tại.

| Thứ tự (code quality) | Model | Chi phí (token-based credits/1M) | Tiêu hao request (legacy, trung bình) | Tiêu hao token |
|---|---|---|---|---|
| 1 | GPT-5.4 | Input 62.50, Cached 6.250, Output 375 | Local ~7 credits/msg, Cloud ~34 credits/msg | Cao nhất nếu output dài + reasoning cao |
| 2 | GPT-5.3-Codex | Input 43.75, Cached 4.375, Output 350 | Local ~5, Cloud ~25 | Thấp hơn GPT-5.4, rất mạnh cho coding agent |
| 3 | GPT-5.2-Codex | Input 43.75, Cached 4.375, Output 350 | (Thường tương đương nhóm Codex legacy) | Gần GPT-5.3-Codex |
| 4 | GPT-5.1-Codex-Max | Input 31.25, Cached 3.125, Output 250 | Thuộc nhóm legacy Codex | Trung bình |
| 5 | GPT-5.4-Mini | Input 18.75, Cached 1.875, Output 113 | Tùy plan/migration | Thấp hơn, nhanh hơn |
| 6 | GPT-5.1-Codex-mini | Input 6.25, Cached 0.625, Output 50 | Local ~1, Cloud: không hỗ trợ | Rẻ nhất, hợp task nhỏ |

Ghi chú quan trọng:
- `Fast mode`: nhanh ~1.5x nhưng tiêu hao credit **2x**.
- Tiêu hao thực tế phụ thuộc độ dài context, số file, mức reasoning, local/cloud.
- Tài khoản/plan khác nhau có thể thấy model picker khác nhau.

## 4.1) "Select reasoning" là gì? (ví dụ medium)

`Reasoning effort` là mức "độ suy nghĩ" trước khi model trả lời.
- `low`: nhanh, rẻ, hợp task rõ ràng.
- `medium`: cân bằng tốc độ/chất lượng (mặc định khuyên dùng).
- `high`: sâu hơn cho task khó, tốn token/rate limit hơn.

## 4.2) Nên dùng reasoning thế nào để hiệu quả và tiết kiệm?

Khuyến nghị thực chiến:
1. Mặc định dùng `medium`.
2. Đổi `low` cho việc lặp nhanh: sửa lỗi nhỏ, format, rename, test đơn giản.
3. Chỉ bật `high` cho: refactor lớn, kiến trúc, bug khó tái hiện, task đa bước nhiều ràng buộc.
4. Khi thấy token/limits tụt nhanh: hạ về `medium` hoặc `low`, chia task nhỏ hơn.

## 5) Reasoning có tác dụng gì khi dùng Codex extension trong VSCode?

- Ảnh hưởng trực tiếp tới độ sâu lập kế hoạch và chất lượng kết quả code.
- `high` thường giảm sai sót ở bài toán phức tạp, nhưng chậm hơn và tốn limits/tokens hơn.
- Với task đơn giản, `high` thường không đáng chi phí.

## 6) Include IDE context là gì? Khi nào nên bật?

`Include IDE context` (liên quan `Auto Context`) là cho Codex tự lấy context từ IDE: file đang mở, đoạn chọn, file gần đây.

Nên bật khi:
- Làm việc trong repo lớn, cần Codex hiểu ngữ cảnh nhanh.
- Bạn muốn prompt ngắn mà vẫn chính xác.

Nên tắt khi:
- Đang xử lý dữ liệu nhạy cảm/không muốn gửi thêm context.
- Muốn kiểm soát chặt token và phạm vi context.

## 7) Plan mode là gì? Khi nào nên bật?

Trong UI mới, `Plan mode` là chế độ ưu tiên **lập kế hoạch trước khi hành động** (gần với tinh thần "Chat/plan first").

Nên bật khi:
- Bài toán lớn, nhiều rủi ro.
- Bạn muốn duyệt kế hoạch rồi mới cho sửa file/chạy lệnh.

Nên tắt khi:
- Task nhỏ, cần làm nhanh ngay.

## 8) Local project là gì?

`Local project` = chạy task trên máy của bạn, trong workspace hiện tại (đọc/sửa file, chạy command local theo permission).

Phù hợp khi:
- Cần feedback nhanh trên code local.
- Cần kiểm tra ngay bằng test/build local.

## 9) Connect Codex web là gì? Dùng thế nào?

Là kết nối session IDE với Codex web để theo dõi/chuyển tiếp công việc trên web.

Cách dùng cơ bản:
1. Chọn `Connect Codex web`.
2. Đăng nhập ChatGPT nếu được yêu cầu.
3. Với cloud workflows có thể cần connect GitHub để Codex web truy cập repo cloud task.

## 10) Send to cloud là gì? Dùng thế nào?

`Send to cloud` = đẩy task lên môi trường cloud chạy nền (không khóa IDE local).

Dùng khi:
- Task dài (refactor lớn, chạy nhiều bước, review PR).
- Bạn muốn tiếp tục code việc khác trong lúc cloud chạy.

Cách dùng:
1. Trong thread chọn cloud mode / send to cloud.
2. Chọn cloud environment.
3. Theo dõi progress, review diff, rồi apply/pull kết quả về local.

## 11) Weekly là gì?

`Weekly` trong `Rate limits remaining` là phần trăm/quota còn lại theo chu kỳ tuần của Codex usage.

Ý nghĩa:
- Ví dụ hiện `93% Apr 15` nghĩa là còn 93%, reset gần ngày 15/04 (theo UI account của bạn).

## 12) Default permissions là gì? Dùng thế nào?

`Default permissions` là chế độ an toàn mặc định:
- sandbox giới hạn trong workspace,
- thường không có network,
- các hành động nhạy cảm cần xin phép.

Nên dùng cho công việc hằng ngày để an toàn và tránh lệnh rủi ro.

## 13) Full access là gì? Dùng thế nào?

`Full access` (Agent Full Access / danger-full-access) cho agent quyền rộng hơn (kể cả network, ít/không hỏi lại tùy config).

Chỉ nên dùng khi:
- Bạn hiểu rõ rủi ro.
- Repo/thư mục tin cậy.
- Cần automation mạnh (cài dependency, gọi network, thao tác rộng).

Luôn quay về `Default permissions` sau khi hoàn tất tác vụ đặc biệt.

---

## Checklist dùng nhanh (đề xuất cho dev hàng ngày)

1. Mode: `Local project`.
2. Permissions: `Default permissions`.
3. Include IDE context: `On` khi code bình thường; `Off` khi xử lý dữ liệu nhạy cảm.
4. Reasoning: bắt đầu `medium`; xuống `low` cho task nhỏ; lên `high` cho task khó.
5. Chỉ `Send to cloud` cho job dài.
6. Chỉ dùng `Full access` trong phiên ngắn, có chủ đích.

---

## Link docs để research thêm

- Codex IDE overview: https://developers.openai.com/codex/ide
- Codex IDE features: https://developers.openai.com/codex/ide/features
- Codex IDE settings: https://developers.openai.com/codex/ide/settings
- Codex IDE slash commands: https://developers.openai.com/codex/ide/slash-commands
- Agent approvals & security: https://developers.openai.com/codex/agent-approvals-security
- Codex speed (Fast mode): https://developers.openai.com/codex/speed
- Models overview: https://developers.openai.com/api/docs/models
- GPT-5.3-Codex model: https://developers.openai.com/api/docs/models/gpt-5.3-codex
- GPT-5.2-Codex model: https://developers.openai.com/api/docs/models/gpt-5.2-codex
- GPT-5.1-Codex model: https://developers.openai.com/api/docs/models/gpt-5.1-codex
- Using Codex with your ChatGPT plan: https://help.openai.com/en/articles/11369540
- Codex rate card: https://help.openai.com/en/articles/20001106-codex-rate-card
- Flexible usage credits (Plus/Pro): https://help.openai.com/en/articles/12642688-using-credits-for-flexible-usage-in-chatgpt-pluspro

---

## Ghi chú độ chắc chắn (important)

Một số nhãn UI mới trong ảnh (`Plan mode`, `Connect Codex web`, `Send to cloud`) đang rollout nhanh và tài liệu chính thức chưa mô tả chi tiết từng label theo đúng câu chữ trong mọi bản extension.
Vì vậy phần giải thích cho các nhãn này được suy luận từ tài liệu chính thức về local/cloud mode, slash commands (`/local`, `/cloud`, `/auto-context`), approvals/sandbox và hành vi thực tế của Codex IDE.
