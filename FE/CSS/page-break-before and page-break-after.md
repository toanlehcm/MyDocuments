```
for(var i=0; i<questionsFirstSessionObject.length; i++){
    var questionAnswerItemFirstSession = await questionAnswerATP(questionsFirstSessionObject[i], dateSetting, patientId);
    // var break_page = questionsFirstSessionObject[i].PageBreak ? "style='display: block;page-break-after:always;'" : "";
        var break_page = questionsFirstSessionObject[i].PageBreak ? "style='page-break-before:always;'" : "";
    ContentNoteFile += 	"<div class='question mt-4 mb-3'"+ break_page +">" +
                            "<div class='question-title'>" +
                                "<strong>" + questionsFirstSessionObject[i].Title + "</strong>" +
                            "</div>" +
                            "<div class='clearfix question-answer'>" +
                                questionAnswerItemFirstSession +
                            "</div>" +
                        "</div>";
}
```
phân biệt page-break-before:always; và page-break-after:always;
khi nào nên dùng loại nào?
loại nào không làm bug trắng trang?

## Phân biệt `page-break-before` vs `page-break-after`

### **1. Sự khác biệt:**

| Property | Ý nghĩa | Hành vi |
|----------|---------|---------|
| `page-break-before: always` | Ngắt trang **TRƯỚC** element | Trang mới bắt đầu, rồi mới render element |
| `page-break-after: always` | Ngắt trang **SAU** element | Render element xong, rồi mới ngắt trang mới |

### **2. Minh họa trực quan:**

```
┌─────────────────┐
│   Trang 1       │
│                 │
│  Content A      │
│                 │
│  ← page-break-after: always (ngắt SAU Content A)
└─────────────────┘

┌─────────────────┐
│   Trang 2       │
│                 │
│  Content B      │  ← Bắt đầu trang mới
│                 │
└─────────────────┘
```

```
┌─────────────────┐
│   Trang 1       │
│                 │
│  Content A      │
│                 │
└─────────────────┘

┌─────────────────┐  ← page-break-before: always (ngắt TRƯỚC Content B)
│   Trang 2       │
│                 │
│  Content B      │
│                 │
└─────────────────┘
```

### **3. Loại nào gây bug trắng trang?**

**`page-break-after: always` DỄ GÂY TRẮNG TRANG HƠN!**

```javascript
// ❌ GÂY BUG - page-break-after trên element CUỐI CÙNG
for(var i=0; i<questions.length; i++){
    ContentNoteFile += "<div style='page-break-after:always;'>" + content + "</div>";
}
// → Element cuối cùng vẫn có page-break-after 
// → Tạo ra 1 trang trắng ở cuối!
```

```javascript
// ✅ AN TOÀN HƠN - page-break-before
for(var i=0; i<questions.length; i++){
    var break_page = questions[i].PageBreak ? "style='page-break-before:always;'" : "";
    ContentNoteFile += "<div " + break_page + ">" + content + "</div>";
}
// → Chỉ ngắt trang KHI CẦN, không tạo trang trắng cuối
```

### **4. Khi nào dùng loại nào?**

| Tình huống | Nên dùng | Lý do |
|------------|----------|-------|
| Bắt đầu chapter/section mới | `page-break-before` | Đảm bảo section luôn bắt đầu trang mới |
| Kết thúc section, muốn nội dung tiếp theo ở trang mới | `page-break-after` | Nhưng cẩn thận với element cuối |
| Loop qua nhiều items | `page-break-before` | Tránh trang trắng cuối |
| Element cuối cùng của document | **KHÔNG DÙNG** `page-break-after` | Sẽ tạo trang trắng |

### **5. Fix cho code của bạn:**

````javascript
// ✅ ĐÚNG - Dùng page-break-before
for(var i=0; i<questionsFirstSessionObject.length; i++){
    var questionAnswerItemFirstSession = await questionAnswerATP(questionsFirstSessionObject[i], dateSetting, patientId);
    
    // Chỉ áp dụng page-break-before khi PageBreak = true
    var break_page = questionsFirstSessionObject[i].PageBreak ? " style='page-break-before:always;'" : "";
    
    ContentNoteFile += "<div class='question mt-4 mb-3'" + break_page + ">" +
                            "<div class='question-title'>" +
                                "<strong>" + questionsFirstSessionObject[i].Title + "</strong>" +
                            "</div>" +
                            "<div class='clearfix question-answer'>" +
                                questionAnswerItemFirstSession +
                            "</div>" +
                        "</div>";
}
````

### **6. Nếu BẮT BUỘC phải dùng `page-break-after`:**

````javascript
// Kiểm tra KHÔNG phải element cuối cùng
for(var i=0; i<questionsFirstSessionObject.length; i++){
    var questionAnswerItemFirstSession = await questionAnswerATP(questionsFirstSessionObject[i], dateSetting, patientId);
    
    // Chỉ page-break-after nếu KHÔNG PHẢI element cuối
    var isLastItem = (i === questionsFirstSessionObject.length - 1);
    var break_page = "";
    
    if(questionsFirstSessionObject[i].PageBreak && !isLastItem){
        break_page = " style='page-break-after:always;'";
    }
    
    ContentNoteFile += "<div class='question mt-4 mb-3'" + break_page + ">" +
                            "<div class='question-title'>" +
                                "<strong>" + questionsFirstSessionObject[i].Title + "</strong>" +
                            "</div>" +
                            "<div class='clearfix question-answer'>" +
                                questionAnswerItemFirstSession +
                            "</div>" +
                        "</div>";
}
````

### **Kết luận:**

| Property | Độ an toàn | Khuyến nghị |
|----------|------------|-------------|
| `page-break-before: always` | ✅ An toàn | **Nên dùng** trong loop |
| `page-break-after: always` | ⚠️ Rủi ro | Chỉ dùng khi kiểm tra không phải element cuối |

**→ Code hiện tại của bạn dùng `page-break-before` là ĐÚNG!**