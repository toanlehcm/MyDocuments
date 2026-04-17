---
description: 🔁 Retrospective bug/task vừa done - Đúc kết kiến thức FE/BE
version: 1.1.0
---

# WORKFLOW: /retrospective - The Knowledge Extractor

Bạn là **Antigravity Knowledge Architect**. Nhiệm vụ: Sau mỗi bug/task hoàn thành, TỰ ĐỘNG đúc kết toàn bộ kiến thức thành 4 artifact có thể tái sử dụng.

---

## 🎯 TRIGGER PHRASES (Khi user nói các câu này, KÍCH HOẠT workflow)

User có thể nói:
- `Retro bug vừa done`
- `Retrospective bug vừa done`
- `Retro task vừa done`
- `Retrospective task vừa done`
- `Retro bug-[mã]` (ví dụ: `Retro bug-6324`)
- `Retrospective bug-[mã]` (ví dụ: `Retrospective bug-6324`)
- `Retro task-[mã]`
- `Retrospective task vừa xong`

→ Khi nhận bất kỳ câu trên, **ĐỌC SESSION CONTEXT** và tự động tạo 4 artifact dưới đây.

---

## 📥 ĐẦU VÀO (AI tự đọc từ context)

AI phải tự thu thập thông tin từ:
1. **Session hiện tại**: Files đã xem/edit, bug ID, mô tả bug
2. **Code đã sửa**: Logic trước/sau khi fix, pattern được dùng
3. **Files liên quan**: Tên file, vai trò (Controller, Action, DAL, Util...)
4. **Root cause**: Nguyên nhân gốc rễ của bug/task

---

## 📤 ĐẦU RA: 4 ARTIFACT bắt buộc

Tạo thư mục: `d:\Sources\MyDocuments\PtE\retro\[BUG-ID]-[tên-ngắn]\`  
(Hoặc vị trí tương tự trong workspace)

Tạo **5 files** (4 files học tập + 1 file session memory cho AI):

---

### 📄 File 1: `01-cv-version.md`
**Mục đích:** Ghi vào CV, LinkedIn — súc tích 1–2 câu.

```markdown
# CV Version — [Bug ID]: [Tên bug]

## Mô tả thành tích (1–2 câu cho CV/LinkedIn):
[Câu mô tả kỹ năng, impact, và công nghệ — không dùng từ "bug", dùng từ như "resolved", "optimized", "improved"]

## Keywords kỹ thuật (để ATS scan):
[Danh sách công nghệ/kỹ năng dùng trong bug này]
```

---

### 📄 File 2: `02-interview-version.md`
**Mục đích:** Trả lời phỏng vấn khi hỏi "Bạn đã gặp khó khăn gì? Vượt qua như thế nào?" — 1–4 câu, STAR format.

```markdown
# Interview Version — [Bug ID]: [Tên bug]

## STAR Format (Situation → Task → Action → Result):

**S (Situation):** [Bối cảnh — ứng dụng là gì, vấn đề người dùng gặp phải]

**T (Task):** [Nhiệm vụ — cần sửa cái gì]

**A (Action):** [Hành động — bạn đã làm gì, tìm nguyên nhân như thế nào]

**R (Result):** [Kết quả — bug đã được fix, impact]

## Câu trả lời gộp lại (1–4 câu tự nhiên):
[Đoạn văn viết liền từ STAR, đọc tự nhiên cho phỏng vấn]

## Câu hỏi phỏng vấn FE/BE liên quan:
- Q: [Câu hỏi phỏng vấn phổ biến liên quan]
  A: [Câu trả lời ngắn]
```

---

### 📄 File 3: `03-full-knowledge.md`
**Mục đích:** Nền tảng kỹ thuật đầy đủ — đọc lại để hiểu sâu, áp dụng nhanh, hotfix nhanh.

```markdown
# Full Knowledge Base — [Bug ID]: [Tên bug]

## 1. Tóm tắt bug
- **Ticket:** [ID]
- **Symptom:** [Người dùng thấy gì sai]
- **Root Cause:** [Nguyên nhân kỹ thuật thực sự]
- **Files bị ảnh hưởng:** [Danh sách file]

## 2. Kiến thức FE (AngularJS / JS / CSS / Browser)

### 2.1 Khái niệm cốt lõi liên quan
[Giải thích kỹ thuật FE được dùng/liên quan trong bug này]

### 2.2 Pattern đúng vs sai
| ❌ Sai | ✅ Đúng | Lý do |
|--------|---------|-------|
| [code sai] | [code đúng] | [giải thích] |

### 2.3 AngularJS-specific gotchas (nếu có)
[Ghi chú về AngularJS 1.x behaviors đặc biệt cần nhớ]

## 3. Kiến thức BE (ActionHero / Node / MongoDB)

### 3.1 Khái niệm cốt lõi liên quan
[Giải thích kỹ thuật BE được dùng/liên quan trong bug này]

### 3.2 Pattern đúng vs sai
| ❌ Sai | ✅ Đúng | Lý do |
|--------|---------|-------|
| [code sai] | [code đúng] | [giải thích] |

### 3.3 MongoDB / Mongoose gotchas (nếu có)
[Ghi chú về behavior đặc biệt cần nhớ]

## 4. Quy trình debug đã dùng
1. [Bước 1]
2. [Bước 2]
3. [Bước 3]

## 5. Design Decision (Tại sao code như vậy?)
[Giải thích lý do thiết kế — để khi leader hỏi có câu trả lời ngay]

## 6. Dấu hiệu nhận biết bug tương tự
[Danh sách "nếu thấy X thì nghĩ đến Y" — để phát hiện nhanh sau này]

## 7. Test cases cần check sau khi fix
- [ ] [Case 1]
- [ ] [Case 2]
```

---

### 📄 File 4: `04-code-reading-guide.md`
**Mục đích:** Hướng dẫn đọc và hiểu các file liên quan — từ tổng quan đến chi tiết.

```markdown
# Code Reading Guide — [Bug ID]: [Tên bug]

## Mục tiêu
Hiểu file [tên file] trong tối đa [X] phút mà không cần đọc từng dòng.

---

## FILE: [Tên file đầy đủ]

### 🗺️ Bản đồ file (tổng quan)
- **Vai trò trong hệ thống:** [File này làm gì trong toàn bộ app]
- **Ai gọi file này?** [File/Action nào trigger file này]
- **File này gọi ai?** [Dependencies]
- **Tổng số dòng:** ~[N] dòng

### 🏗️ Cấu trúc cấp cao (Top-level structure)
```
[Liệt kê các function/section chính như một outline]
- Section A: [dòng X–Y] → [mục đích]
- Function B(): [dòng X–Y] → [mục đích]
- Section C: [dòng X–Y] → [mục đích]
```

### 🔍 Điểm bug nằm ở đâu?
- **Function liên quan:** `[tên function]` — dòng [X]–[Y]
- **Logic trước khi fix:** [mô tả]
- **Logic sau khi fix:** [mô tả]

### 📖 Chiến lược đọc file lớn nhanh (>1000 dòng)
1. **Bước 1 — Đọc top 50 dòng**: Tìm imports, constants, pattern chung
2. **Bước 2 — Tìm entry points**: Ctrl+F "controller\|function\|action\|module" để thấy function list
3. **Bước 3 — Đọc function signatures**: Chỉ đọc tên hàm, tham số, return — chưa đọc body
4. **Bước 4 — Trace theo bug**: Từ symptom → tìm function gần nhất → đọc kỹ function đó
5. **Bước 5 — Đọc comments**: Comment thường giải thích WHY, code giải thích HOW

### ⚠️ Những chỗ dễ gây confused trong file này
- [Điều 1 — Ví dụ: variable naming trùng nhau]
- [Điều 2 — Ví dụ: async callback lồng nhau nhiều cấp]

### 🧭 Workflow trong file (dùng bug này làm ví dụ)
```
User action → [Function A] → [Function B] → [Function C] → Response
                    ↓
             [chỗ bug nằm ở đây]
```

### 💡 Mental model để nhớ file này
[1 câu ví von đơn giản để nhớ file này làm gì]
Ví dụ: "File này như một 'bưu tá' — nhận yêu cầu, phân loại, rồi chuyển đúng bộ phận xử lý"
```

---

### 📄 File 5: `session-ticket-[mã-ticket].md`
**Mục đích:** Lưu toàn bộ thông tin kỹ thuật của ticket để AI đọc lại và khôi phục context nhanh trong session mới — giải quyết vấn đề **mất session do giới hạn token**.

> **Nguyên tắc:** File này là "bộ nhớ ngoài" của AI. Khi session cũ bị xóa, AI chỉ cần đọc file này để hiểu ngay toàn bộ ticket mà không cần hỏi lại user.

```markdown
# Session Memory — [Bug ID]: [Tên bug]

> 🤖 **Dành cho AI Agent đọc khi restore context.**  
> User chỉ cần nói: "Đọc file session-ticket-[ID].md và nhớ lại context bug này."

---

## 📋 TICKET INFO
- **Ticket ID:** [ID]
- **Type:** Bug / Task / Feature
- **Title:** [Tiêu đề đầy đủ]
- **Status:** Done / In Progress
- **Reporter:** [Tên người báo]
- **Assignee:** [Tên người fix]
- **Date fixed:** [Ngày]

---

## 🐛 STEPS TO REPRODUCE
1. [Bước 1]
2. [Bước 2]
3. [Bước 3 — điểm xảy ra bug]

**Expected:** [Kết quả mong đợi]
**Actual:** [Kết quả thực tế bị sai]

---

## 🔍 ROOT CAUSE
[Giải thích nguyên nhân kỹ thuật gốc rễ — đủ chi tiết để AI hiểu ngay mà không cần đọc code]

---

## ✅ SOLUTION
[Giải pháp đã áp dụng — mô tả logic thay đổi, công thức, pattern]

---

## 📁 FILES ĐÃ SỬA (Fixed Files)

| File | Đường dẫn đầy đủ | Vai trò | Thay đổi gì |
|------|------------------|---------|-------------|
| [Tên file] | [path] | [Generator/Validator/Controller/...] | [Mô tả thay đổi ngắn] |

### Chi tiết từng file:

#### [Tên file 1]
- **Function bị ảnh hưởng:** `[tên function()]` — dòng [X]–[Y]
- **Logic cũ (sai):**
```javascript
[code cũ quan trọng]
```
- **Logic mới (đúng):**
```javascript
[code mới đã fix]
```

---

## 📁 FILES LIÊN QUAN (Related Files — không sửa nhưng cùng workflow)

| File | Đường dẫn | Vai trò trong workflow | Lý do liên quan |
|------|-----------|------------------------|-----------------|
| [Tên file] | [path] | [Mô tả vai trò] | [Tại sao liên quan đến bug này] |

---

## 🗄️ MONGODB — Collections & Queries liên quan

| Collection | Mục đích | Fields quan trọng | Query pattern |
|------------|----------|-------------------|---------------|
| [tên collection] | [làm gì] | [field1, field2] | [find/aggregate pattern] |

**Sample query đã dùng khi debug:**
```javascript
// [Mô tả query này làm gì]
db.[collection].find({ [filter] }).lean()
```

---

## 📦 THƯ VIỆN / DEPENDENCIES liên quan

| Library | Version | Dùng để làm gì | Gotcha cần nhớ |
|---------|---------|----------------|----------------|
| [moment-timezone] | [2.x] | [Tính ngày theo timezone] | [.tz() phải gọi trước khi tính ngày] |

---

## 🧭 WORKFLOW (Luồng dữ liệu của ticket này)

```
[Entry point] → [Function A] → [Function B] → [Function C] → [Output]
                                    ↓
                          [Chỗ bug nằm ở đây]
                          [Đã fix: mô tả ngắn]
```

---

## ⚠️ SIDE EFFECTS & RISKS
- [Điều cần lưu ý nếu có ticket tương tự sau này]
- [Những chỗ code khác có thể bị ảnh hưởng nhưng chưa kiểm tra]

---

## 🔗 LIÊN KẾT
- **Full knowledge:** `03-full-knowledge.md`
- **Code reading guide:** `04-code-reading-guide.md`
- **Interview prep:** `02-interview-version.md`
```

---

## 🔄 QUY TRÌNH THỰC HIỆN

```
1. AI đọc session context (files đã xem, code đã sửa)
2. AI tạo thư mục retro/[BUG-ID]/
3. AI viết 5 files (ưu tiên session-ticket trước để không mất data)
4. AI in ra preview ngắn từng file cho user xem
5. AI lưu vào brain.json (knowledge_items → gotchas)
6. AI thông báo xong
```

---

## 📋 OUTPUT FORMAT SAU KHI DONE

```
✅ RETROSPECTIVE DONE — [Bug ID]

📁 Đã tạo 5 files tại: retro/[BUG-ID]-[tên]/

📄 session-ticket-[ID].md   → 🤖 AI context restore (đọc file này để nhớ lại ticket)
📄 01-cv-version.md         → Dùng cho CV/LinkedIn
📄 02-interview-version.md  → Dùng khi phỏng vấn
📄 03-full-knowledge.md     → Đọc để hiểu sâu
📄 04-code-reading-guide.md → Hướng dẫn đọc code nhanh

🧠 Đã lưu vào brain (gotchas + patterns)

💡 Tip: Khi bắt đầu session mới về ticket này, nói:
   "Đọc file session-ticket-[ID].md và nhớ lại context."
```

---

## ⚠️ NEXT STEPS

```
1️⃣ Đọc 03-full-knowledge.md để consolidate kiến thức
2️⃣ Add vào Anki/flashcard các gotchas
3️⃣ /save-brain để đảm bảo không mất context
4️⃣ Commit code nếu chưa commit
```
