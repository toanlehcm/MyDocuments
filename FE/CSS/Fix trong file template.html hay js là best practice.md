## Best Practice: Fix trong file nào?

### **Kết luận: Fix trong DocumentFileTemplateATP.html là BEST PRACTICE**

### **So sánh 2 cách tiếp cận:**

| Tiêu chí | Fix trong Template HTML | Fix trong JS Logic |
|----------|------------------------|-------------------|
| **Separation of Concerns** | ✅ CSS ở file CSS/HTML | ❌ CSS trộn trong JS |
| **Maintainability** | ✅ Dễ tìm, dễ sửa | ❌ Khó tìm CSS trong 3000+ dòng JS |
| **Reusability** | ✅ Áp dụng cho mọi document | ⚠️ Phải nhớ inject mỗi lần |
| **Performance** | ✅ CSS compile 1 lần | ⚠️ String concat mỗi request |
| **Testing** | ✅ Test riêng HTML/CSS | ❌ Phải test cả logic + CSS |
| **Team collaboration** | ✅ FE sửa template, BE sửa logic | ❌ BE phải hiểu CSS |

### **Lý do chi tiết:**

**1. Separation of Concerns (Tách biệt trách nhiệm)**
```
┌─────────────────────────────────────────┐
│           KIẾN TRÚC ĐÚNG                │
├─────────────────────────────────────────┤
│ Template (HTML/CSS) → Presentation      │
│ Logic (JS)          → Business Logic    │
│ DAL                 → Data Access       │
└─────────────────────────────────────────┘
```

**2. Single Source of Truth**
- CSS cho PDF nên ở **1 chỗ duy nhất**: Template
- Không nên rải rác ở nhiều nơi (template + JS + external CSS)

**3. Dễ debug và maintain**
```javascript
// ❌ KHÔNG NÊN - CSS trong JS
var pdfPageBreakCSS = `
    <style>
        table tbody tr {
            page-break-inside: avoid !important;
        }
    </style>
`;
html = html.replace('</head>', pdfPageBreakCSS + '</head>');

// Vấn đề:
// - Khó tìm khi debug
// - IDE không highlight CSS syntax
// - Không có CSS autocomplete
```

### **Cách fix đúng trong Template:**

````html
<!doctype html>
<html>
    <head>
        <meta charset="utf-8">
        <title>PTEverywhere</title>
        <link href="https://fonts.googleapis.com/css?family=Courgette|Give+You+Glory|Gloria+Hallelujah|Indie+Flower|Lobster|Noto+Serif|Open+Sans|Pacifico|Poiret+One|Shadows+Into+Light|Tangerine|Zeyada" rel="stylesheet">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        
        <!-- EXTERNAL CSS FILES -->
        <style>
            <adminFileInternalCSS>
            <bootstrapInternalCSS>
            <customInternalCSS>
            <mainATPInternalCSS>
            <mainContainerInternalCSS>
        </style>
        
        <!-- PDF PAGE BREAK CSS - LOAD CUỐI CÙNG ĐỂ OVERRIDE -->
        <style>
            html, body {
                background-color: #FFFFFF !important;
                font-family: "Times New Roman", Times, serif !important;
                font-size: 13px !important;
                color: black;
            }
            
            html { zoom: 1.0; }

            /* TABLE PAGE BREAK RULES */
            table {
                page-break-inside: auto !important;
                border-collapse: collapse;
            }

            table tbody tr {
                page-break-inside: avoid !important;  /* Giữ row trên cùng 1 trang */
                page-break-after: auto !important;
            }

            td, th {
                word-wrap: break-word;
                overflow-wrap: break-word;
                vertical-align: top;
            }
            
            .question-title {
                page-break-after: avoid;
            }
            
            .question, .info-holder, .control-section, .table-controls {
                page-break-inside: auto !important;
            }
        </style>
    </head>
    <body>
        <div class="intake-form-page">
          <div class="panel panel-default">
            <div class="panel-body">
              <div class="d-flex align-items-center justify-content-between">
                <div class="d-flex align-items-center">
                  <div class="mr-3">
                    <div class="logo">
                      <img src="<ClientLogo>" alt="" style="max-width: 150px; max-height: 100px;"/>
                    </div>
                  </div>
                </div>
                <div class="d-flex flex-column">
                  <div class="text-right text-title"><ClientName></div>
                  <div class="text-right"><ClientAddress></div>
                  <div class="text-right"><ClientPhone></div>
                </div>
              </div>
              <hr>
              <div class="text-center font-weight-bold"><h1 class="text-center font-weight-bold heading"><DocumentFileName></h4></div>
              <br>
              <CPTListString>
              <ContentNoteFile>
              <NotesForPatient>
            </div>
          </div>
        </div>       
    </body>
</html>
````

### **Điểm quan trọng trong fix:**

**Thứ tự CSS đã thay đổi:**
```
TRƯỚC (bị override):
1. PDF CSS        ← Bị ghi đè
2. adminFileInternalCSS
3. bootstrapInternalCSS
4. mainATPInternalCSS  ← Có thể chứa CSS ghi đè

SAU (đúng):
1. adminFileInternalCSS
2. bootstrapInternalCSS
3. mainATPInternalCSS
4. PDF CSS        ← Load cuối, ưu tiên cao nhất
```

### **Tóm tắt cho Leader:**

| Câu hỏi | Trả lời |
|---------|---------|
| Fix ở đâu? | DocumentFileTemplateATP.html |
| Tại sao? | Separation of Concerns, Single Source of Truth |
| Có cần sửa JS? | **KHÔNG** - Chỉ cần đổi thứ tự CSS trong template |
| Risk? | **Thấp** - Chỉ thay đổi CSS, không ảnh hưởng logic |