# 🤖 AI Explain for Devs (Cheat Sheet)

Tài liệu này tổng hợp các khái niệm AI được "ánh xạ" sang tư duy lập trình Web (FE/BE) để anh em Developer dễ dàng nắm bắt.

---

## 📖 Từ điển Thuật ngữ

| Khái niệm AI | Giải thích "Kiểu Dev" | Ví dụ thực tế |
|--------------|-----------------------|---------------|
| **LLM** | Core Engine / Predictor | Giống như một hàm `guessNextWord(input)` khổng lồ. |
| **Tokens** | Đơn vị tính Byte/String | Giống như cách tính dung lượng Payload của API. Dùng để tính tiền. |
| **Context Window** | RAM / Local State | Giới hạn bộ nhớ tạm thời của một lần gọi API. Tràn là "quên" data cũ. |
| **Hallucination** | Bịa data + HTTP 200 OK | AI tự tin viết ra một cái hàm npm `không-tồn-tại`. |
| **Agents** | App = LLM + Tools | Con Bot có quyền `read/write file` và tự lên kế hoạch thực thi. |
| **Prompt Injection** | SQL Injection cho AI | Chèn text lừa AI nhả ra API Key hoặc System Prompt. |
| **RAG** | DB Search + Prompt | Fetch dữ liệu từ DB của mình rồi quăng vào Prompt làm context cho AI. |

---

## ⚙️ Cấu hình Mô hình (Parameters)

| Khái niệm | Giải thích "Kiểu Dev" | Note |
|-----------|-----------------------|------|
| **Parameters** | Số lượng "biến số" / nơ-ron | Càng nhiều Parameters (`8B`, `70B`), AI càng thông minh và xử lý được logic khó. |
| **Weights** | Giá trị phần trăm / Weighting | Tỉ lệ xác suất từ A đi kèm từ B được lưu trong model. |

---

## 📝 Kinh nghiệm thực chiến cho Team
- **Prompting:** Hãy coi như đang truyền `props` cho Component. Càng cụ thể (Type, Props) thì đầu ra càng chuẩn.
- **Few-shot:** Nên đưa 1-2 ví dụ Code (JSON/JSX) vào Prompt để AI bắt chước đúng định dạng output mình cần.
