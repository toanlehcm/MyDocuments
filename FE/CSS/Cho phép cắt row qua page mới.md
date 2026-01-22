## Phân tích yêu cầu

Bạn muốn: **Nếu nội dung của 1 row không vừa với không gian còn lại của trang → đẩy toàn bộ row đó sang trang mới** (thay vì cắt row giữa chừng).

### **Vấn đề:**
- CSS `page-break-inside: auto` cho phép cắt row giữa chừng
- CSS `page-break-inside: avoid` sẽ đẩy row sang trang mới nếu không vừa

### **Giải pháp:**

Sử dụng `page-break-inside: avoid` trên `tr` nhưng **KHÔNG dùng** `page-break-before: avoid` (đây là nguyên nhân gây trắng trang trước đó).

````html
<!doctype html>
<html>
    <head>
        <meta charset="utf-8">
        <title>PTEverywhere</title>
        <link href="https://fonts.googleapis.com/css?family=Courgette|Give+You+Glory|Gloria+Hallelujah|Indie+Flower|Lobster|Noto+Serif|Open+Sans|Pacifico|Poiret+One|Shadows+Into+Light|Tangerine|Zeyada" rel="stylesheet">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <style>
            html, body {
                background-color: #FFFFFF !important;
                font-family: "Times New Roman", Times, serif !important;
                font-size: 13px !important;
                color: black;
            }
            
            html{zoom:1.0}

            /* FIX: Cho phép table được cắt trang */
            table {
                page-break-inside: auto !important;
                border-collapse: collapse;
            }

            /* 
             * QUAN TRỌNG: 
             * - page-break-inside: avoid → Giữ toàn bộ row trên cùng 1 trang
             * - Nếu row không vừa → đẩy sang trang mới
             * - KHÔNG dùng page-break-before: avoid (gây trắng trang)
             */
            table tbody tr {
                page-break-inside: avoid !important;
                page-break-after: auto !important;
            }

            /* Cho phép cells wrap text */
            td, th {
                word-wrap: break-word;
                overflow-wrap: break-word;
                vertical-align: top;
            }
            
            /* Chỉ giữ title với nội dung đầu tiên */
            .question-title {
                page-break-after: avoid;
            }
            
            /* Cho phép containers cắt trang */
            .question, .info-holder, .control-section, .table-controls {
                page-break-inside: auto !important;
            }

            /* 
             * FIX cho trường hợp row QUÁ DÀI (dài hơn 1 trang):
             * Nếu row cao hơn chiều cao trang → cho phép cắt
             */
            table tbody tr.allow-break {
                page-break-inside: auto !important;
            }
            
            <adminFileInternalCSS>
            <bootstrapInternalCSS>
            <customInternalCSS>
            <mainATPInternalCSS>
            <mainContainerInternalCSS>
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

### **Giải thích sự khác biệt:**

| CSS | Hành vi | Khi nào dùng |
|-----|---------|--------------|
| `page-break-inside: auto` | Cho phép cắt row giữa chừng | Row rất dài, muốn tận dụng không gian |
| `page-break-inside: avoid` | Giữ toàn bộ row cùng 1 trang | Row vừa phải, muốn nội dung liền mạch |
| `page-break-before: avoid` | **TRÁNH DÙNG** - Gây trắng trang | Đừng dùng |

### **Kết quả mong đợi:**

```
┌─────────────────────┐
│ Header + Logo       │
│ Document Title      │
│ "Long table"        │
│                     │
│ Row 1: Lorem ipsum..│
│ Row 2: Lorem ipsum..│
│                     │  ← Không đủ chỗ cho Row 3
└─────────────────────┘
         ↓
┌─────────────────────┐
│ Row 3: Lorem ipsum  │  ← Toàn bộ Row 3 ở trang mới
│ dolor sit amet...   │
│                     │
│ Row 4...            │
│ Row 5...            │
└─────────────────────┘
```

### **Lưu ý quan trọng:**

Nếu **1 row có nội dung dài hơn 1 trang** (ví dụ: 1 cell chứa 2000 từ), thì với `page-break-inside: avoid`, PDF sẽ bị lỗi hoặc cắt bỏ nội dung. Trong trường hợp đó, bạn cần logic phức tạp hơn ở JavaScript để phát hiện và thêm class `allow-break`.