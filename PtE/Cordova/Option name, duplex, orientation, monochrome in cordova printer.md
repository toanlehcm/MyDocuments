# Option name, duplex, orientation, monochrome in cordova printer.

# Giải thích `$cordovaPrinter.print()` Options

## 📝 So sánh 2 cách viết:

### **Cách 1: Simple (Không options)**
```javascript
$cordovaPrinter.print(fileURI);
```

### **Cách 2: Full options (Recommended)**
````javascript
$cordovaPrinter.print(fileURI, {
    name: 'Insurance_Claim',
    duplex: 'long',
    orientation: 'portrait',
    monochrome: false
}, function(success) {
    console.log('Print success:', success);
}, function(error) {
    console.log('Print error:', error);
    messageAlert.error('Failed to print. Please try again.');
});
````

---

## 🎯 Có cần thiết không?

### **✅ CẦN THIẾT vì:**

1. **Control print behavior** - Điều khiển cách in
2. **Handle errors** - Bắt và xử lý lỗi
3. **Better UX** - Trải nghiệm người dùng tốt hơn
4. **Professional document** - In tài liệu chuyên nghiệp

---

## 📊 Ý nghĩa các thuộc tính:

### **1. `name: 'Insurance_Claim'`**

**Tác dụng:** Đặt tên cho print job

```javascript
// ✅ Có name
$cordovaPrinter.print(fileURI, {
    name: 'Insurance_Claim'
});
// → Print queue: "Insurance_Claim.pdf"
// → Easy to identify trong print history

// ❌ Không có name
$cordovaPrinter.print(fileURI);
// → Print queue: "Unknown Document" hoặc "print_1234.pdf"
// → Khó phân biệt document nào
```

**Ví dụ thực tế:**
```javascript
// Print CMS-1500 form
$cordovaPrinter.print(fileURI, {
    name: `CMS1500_${patientName}_${claimId}_${moment().format('MMDDYYYY')}`
});
// → Print queue: "CMS1500_JohnDoe_CLM001_12252024.pdf"
// ✅ Dễ identify và track
```

**Lợi ích:**
- ✅ Identify document trong print queue
- ✅ Track print history
- ✅ Audit trail (ai print gì, khi nào)
- ✅ Troubleshoot khi có lỗi

---

### **2. `duplex: 'long'`**

**Tác dụng:** Cấu hình in 2 mặt (double-sided printing)

**Values:**
- `'none'` - In 1 mặt (single-sided)
- `'long'` - In 2 mặt, lật theo cạnh dài (portrait binding)
- `'short'` - In 2 mặt, lật theo cạnh ngắn (landscape binding)

```javascript
// Portrait document (document dọc)
$cordovaPrinter.print(fileURI, {
    duplex: 'long',        // Lật theo cạnh dài
    orientation: 'portrait'
});
/*
┌─────────┐     ┌─────────┐
│ Page 1  │ --> │ Page 2  │
│         │     │         │
│         │     │         │
└─────────┘     └─────────┘
    ↓ Flip along long edge (top to bottom)
*/

// Landscape document (document ngang)
$cordovaPrinter.print(fileURI, {
    duplex: 'short',       // Lật theo cạnh ngắn
    orientation: 'landscape'
});
/*
┌───────────────┐     ┌───────────────┐
│   Page 1      │ --> │   Page 2      │
└───────────────┘     └───────────────┘
    ↓ Flip along short edge (left to right)
*/
```

**Ví dụ thực tế:**
```javascript
// Insurance claim (nhiều trang)
$cordovaPrinter.print(fileURI, {
    name: 'Insurance_Claim',
    duplex: 'long',  // ✅ Save paper, professional
    orientation: 'portrait'
});
// → Print 10 pages: chỉ dùng 5 sheets of paper
// → Save cost, environmentally friendly
```

**Lợi ích:**
- ✅ **Tiết kiệm giấy** (50% paper saving)
- ✅ **Professional appearance** (documents look official)
- ✅ **Easy to read** (natural page flow)
- ✅ **Cost saving** (less paper = less money)

---

### **3. `orientation: 'portrait'`**

**Tác dụng:** Cấu hình hướng trang khi in

**Values:**
- `'portrait'` - Dọc (chiều cao > chiều rộng) - **Default cho medical documents**
- `'landscape'` - Ngang (chiều rộng > chiều cao)

```javascript
// Portrait (8.5" x 11" paper)
// ┌─────────┐
// │         │ Height: 11"
// │         │
// │         │
// └─────────┘
//   Width: 8.5"

$cordovaPrinter.print(fileURI, {
    orientation: 'portrait'  // ✅ Standard for forms
});

// Landscape (11" x 8.5" paper)
// ┌───────────────┐
// │               │ Height: 8.5"
// └───────────────┘
//   Width: 11"

$cordovaPrinter.print(fileURI, {
    orientation: 'landscape'  // ✅ Good for wide tables/charts
});
```

**Ví dụ thực tế:**
```javascript
// CMS-1500 form (insurance claim)
$cordovaPrinter.print(fileURI, {
    orientation: 'portrait'  // ✅ Standard form orientation
});

// Patient schedule (calendar view)
$cordovaPrinter.print(fileURI, {
    orientation: 'landscape'  // ✅ Better for wide calendar
});

// Treatment note
$cordovaPrinter.print(fileURI, {
    orientation: 'portrait'  // ✅ Standard document format
});
```

**Lợi ích:**
- ✅ **Optimize reading experience** (dễ đọc hơn)
- ✅ **Match document format** (phù hợp với format gốc)
- ✅ **Professional appearance** (trông chuyên nghiệp)
- ✅ **Proper scaling** (không bị stretched hoặc compressed)

---

### **4. `monochrome: false`**

**Tác dụng:** Cấu hình in màu hay đen trắng

**Values:**
- `true` - In đen trắng (grayscale)
- `false` - In màu (color) - **Default**

```javascript
// Color printing
$cordovaPrinter.print(fileURI, {
    monochrome: false  // ✅ Preserve colors (logos, highlights)
});
// → Logos, graphs, highlights được in màu
// → Professional, easy to read

// Black & white printing
$cordovaPrinter.print(fileURI, {
    monochrome: true  // ✅ Save color ink cost
});
// → Tất cả in đen trắng
// → Lower cost per page
```

**Ví dụ thực tế:**
```javascript
// Insurance claim với logo clinic
$cordovaPrinter.print(fileURI, {
    monochrome: false  // ✅ Preserve clinic logo colors
});

// Internal document (không cần màu)
$cordovaPrinter.print(fileURI, {
    monochrome: true  // ✅ Save ink cost
});

// Patient education materials (có graphs màu)
$cordovaPrinter.print(fileURI, {
    monochrome: false  // ✅ Color graphs easier to understand
});
```

**Lợi ích:**
- ✅ **Cost control** (chọn in màu hay đen trắng)
- ✅ **Preserve branding** (giữ màu logo, branding)
- ✅ **Better readability** (graphs, charts rõ ràng hơn)
- ✅ **Professional appearance** (documents trông professional)

---

## 🎯 Callback functions:

### **Success callback:**
```javascript
function(success) {
    console.log('Print success:', success);
    // Handle print success:
    // - Update print count
    // - Log to audit trail
    // - Show success message
    // - Track analytics
}
```

### **Error callback:**
```javascript
function(error) {
    console.log('Print error:', error);
    messageAlert.error('Failed to print. Please try again.');
    
    // Handle common errors:
    // - Printer not connected
    // - Out of paper
    // - Print job cancelled
    // - File not accessible
    // - Permission denied
}
```

---

## 📊 So sánh có/không có options:

| Aspect | Without Options | With Options |
|--------|----------------|--------------|
| **Document name** | "Unknown" | "Insurance_Claim" ✅ |
| **Print sides** | Random | Double-sided (save paper) ✅ |
| **Orientation** | May be wrong | Correct orientation ✅ |
| **Color** | Default | Controlled (cost savings) ✅ |
| **Error handling** | No feedback | User-friendly errors ✅ |
| **Success tracking** | Unknown | Confirmed success ✅ |
| **Professional** | ❌ Basic | ✅ Professional |

---

## 💡 Real-world examples:

### **Example 1: Print insurance claim**
````javascript
function printInsuranceClaim(claimId, patientName, fileURI) {
    const printJobName = `CMS1500_${patientName}_${claimId}_${moment().format('MMDDYYYY')}`;
    
    $cordovaPrinter.print(fileURI, {
        name: printJobName,           // ✅ Easy to identify
        duplex: 'long',               // ✅ Save paper (2-sided)
        orientation: 'portrait',      // ✅ Standard form orientation
        monochrome: false             // ✅ Preserve clinic logo colors
    }, 
    function(success) {
        console.log(`✅ Print success: ${printJobName}`);
        
        // Update print count in database
        updatePrintCount(claimId);
        
        // Log to audit trail
        logAuditTrail({
            action: 'PRINT_CLAIM',
            claimId: claimId,
            printJobName: printJobName,
            timestamp: new Date()
        });
        
        // Show success message
        messageAlert.success('Insurance claim printed successfully');
    }, 
    function(error) {
        console.log(`❌ Print error: ${error}`);
        
        // Handle specific errors
        if (error.code === 'PRINTER_NOT_AVAILABLE') {
            messageAlert.error('Printer is not connected. Please check your printer.');
        } else if (error.code === 'FILE_NOT_ACCESSIBLE') {
            messageAlert.error('Cannot access the document. Please try again.');
        } else {
            messageAlert.error('Failed to print. Please try again.');
        }
        
        // Log error
        logError({
            action: 'PRINT_CLAIM_FAILED',
            claimId: claimId,
            error: error,
            timestamp: new Date()
        });
    });
}
````

---

### **Example 2: Print treatment note**
````javascript
function printTreatmentNote(noteId, patientName, fileURI) {
    const printJobName = `TreatmentNote_${patientName}_${moment().format('MMDDYYYY_HHmmss')}`;
    
    $cordovaPrinter.print(fileURI, {
        name: printJobName,           // ✅ Identify in print queue
        duplex: 'long',               // ✅ Save paper
        orientation: 'portrait',      // ✅ Standard document format
        monochrome: true              // ✅ Save color ink (không cần màu)
    }, 
    function(success) {
        console.log(`✅ Treatment note printed: ${printJobName}`);
        
        // Update note status
        updateNoteStatus(noteId, 'PRINTED');
        
        // Show success toast
        showToast('Treatment note printed successfully', 3000);
    }, 
    function(error) {
        console.log(`❌ Print error: ${error}`);
        messageAlert.error('Failed to print treatment note. Please try again.');
    });
}
````

---

### **Example 3: Print patient schedule (landscape)**
````javascript
function printPatientSchedule(scheduleDate, fileURI) {
    const printJobName = `Schedule_${moment(scheduleDate).format('MMDDYYYY')}`;
    
    $cordovaPrinter.print(fileURI, {
        name: printJobName,           // ✅ Date-based name
        duplex: 'short',              // ✅ Short-edge binding for landscape
        orientation: 'landscape',     // ✅ Better for wide schedule
        monochrome: false             // ✅ Color-coded appointments
    }, 
    function(success) {
        console.log(`✅ Schedule printed: ${printJobName}`);
        messageAlert.success('Schedule printed successfully');
    }, 
    function(error) {
        console.log(`❌ Print error: ${error}`);
        messageAlert.error('Failed to print schedule. Please try again.');
    });
}
````

---

## 🎯 Best practices:

### **1. Always use descriptive names**
```javascript
// ❌ BAD: Generic name
{ name: 'Document' }

// ✅ GOOD: Descriptive name
{ name: `CMS1500_${patientName}_${claimId}_${date}` }
```

### **2. Choose appropriate duplex mode**
```javascript
// Single-page document
{ duplex: 'none' }

// Multi-page portrait document
{ duplex: 'long' }

// Multi-page landscape document
{ duplex: 'short' }
```

### **3. Match orientation to content**
```javascript
// Forms, letters, treatment notes
{ orientation: 'portrait' }

// Schedules, charts, wide tables
{ orientation: 'landscape' }
```

### **4. Control color for cost**
```javascript
// Official documents with branding
{ monochrome: false }

// Internal documents
{ monochrome: true }
```

### **5. Always handle errors**
```javascript
$cordovaPrinter.print(fileURI, options, 
    function(success) {
        // ✅ Log success
        // ✅ Update database
        // ✅ Notify user
    }, 
    function(error) {
        // ✅ Log error
        // ✅ Show user-friendly message
        // ✅ Provide troubleshooting steps
    }
);
```

---

## 🎯 Tổng kết:

| Câu hỏi | Trả lời |
|---------|---------|
| **Có cần thiết không?** | ✅ **RẤT CẦN THIẾT** cho production code |
| **Tại sao?** | Control behavior, handle errors, better UX |
| **`name`** | Identify document trong print queue |
| **`duplex`** | Save paper, professional, cost-effective |
| **`orientation`** | Optimize reading, match content format |
| **`monochrome`** | Control cost, preserve colors when needed |
| **Callbacks** | Track success/failure, handle errors properly |

**Code với full options:**
- ✅ **Professional** - Trông chuyên nghiệp
- ✅ **Cost-effective** - Tiết kiệm chi phí
- ✅ **User-friendly** - Trải nghiệm tốt
- ✅ **Maintainable** - Dễ maintain và debug
- ✅ **Production-ready** - Sẵn sàng deploy

**Recommendation:**
```javascript
// ✅ ALWAYS use full options in production code
$cordovaPrinter.print(fileURI, {
    name: descriptiveName,
    duplex: 'long',
    orientation: 'portrait',
    monochrome: false
}, successCallback, errorCallback);

// ❌ NEVER use simple version in production
$cordovaPrinter.print(fileURI);
```

**Kết luận: Code với full options là BEST PRACTICE!** ✅