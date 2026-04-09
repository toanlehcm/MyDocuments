Với skill `$openai-docs`, anh có thể dùng mình như một “tra cứu docs chính chủ + áp vào case code” cho mọi thứ liên quan OpenAI (model, API, tool calling, structured outputs, Realtime, Agents SDK), và mình sẽ trả lời dựa trên docs OpenAI hiện hành.

Ví dụ anh có thể hỏi:
- “Team nên dùng `Responses API` hay `Chat Completions` cho agent có tool calling? Cho checklist migrate + điểm khác nhau.” ([platform.openai.com](https://platform.openai.com/docs/guides/responses-vs-chat-completions?utm_source=openai))
- “Viết mẫu request `Responses API` có function calling, và giải thích `call_id`/tool outputs map thế nào.” ([platform.openai.com](https://platform.openai.com/docs/guides/migrate-to-responses?utm_source=openai))
- “Muốn làm voice real-time trong web/mobile: dùng Realtime API qua WebRTC như thế nào, và khi nào nên dùng Agents SDK thay vì WebRTC thuần?” ([platform.openai.com](https://platform.openai.com/docs/guides/realtime-webrtc?utm_source=openai))
- “Structured outputs/JSON schema trong Responses API đặt ở đâu (khác gì Chat Completions)?” ([platform.openai.com](https://platform.openai.com/docs/guides/responses-vs-chat-completions?utm_source=openai))

Nếu anh nêu 1 use case cụ thể (vd: “tạo agent hỗ trợ bác sĩ nhập note + gọi tool tra ICD/CPT”), mình sẽ tra docs và đưa ra mẫu request + cấu hình model/tool đúng chuẩn.