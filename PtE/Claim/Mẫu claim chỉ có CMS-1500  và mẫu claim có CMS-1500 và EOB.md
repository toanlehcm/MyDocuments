# Mẫu claim chỉ có CMS-1500  và mẫu claim có CMS-1500 và EOB gửi link thực tế càng tốt.

# Mẫu CMS-1500 Form và EOB Document

## 📄 1. CMS-1500 Form Only (Claim chỉ có form)

### **Mẫu CMS-1500 Standard:**

```
┌─────────────────────────────────────────────────────────────────┐
│                    HEALTH INSURANCE CLAIM FORM                  │
│                         (CMS-1500 / HCFA-1500)                  │
├─────────────────────────────────────────────────────────────────┤
│ 1. MEDICARE  MEDICAID  TRICARE  CHAMPVA  GROUP  FECA  OTHER    │
│    □         □         □         □        ☑      □     □       │
├─────────────────────────────────────────────────────────────────┤
│ 2. PATIENT'S NAME (Last, First, Middle)                        │
│    DOE, JOHN M                                                  │
├─────────────────────────────────────────────────────────────────┤
│ 3. PATIENT'S BIRTH DATE    4. INSURED'S NAME                   │
│    01/15/1980    M         SMITH, JANE                          │
├─────────────────────────────────────────────────────────────────┤
│ 5. PATIENT'S ADDRESS                                            │
│    123 Main Street, Apt 4B                                      │
│    New York, NY 10001                                           │
├─────────────────────────────────────────────────────────────────┤
│ 9. OTHER INSURED'S NAME    10. PATIENT CONDITION RELATED TO     │
│    NONE                         a. EMPLOYMENT □  b. AUTO □      │
│                                 c. OTHER □                      │
├─────────────────────────────────────────────────────────────────┤
│ 21. DIAGNOSIS OR NATURE OF ILLNESS OR INJURY                   │
│     A. M79.3 (Myalgia)      B. M54.5 (Low back pain)           │
│     C. _______              D. _______                          │
├─────────────────────────────────────────────────────────────────┤
│ 24. A-J SERVICES, PROCEDURES, CHARGES                           │
│ ┌──────┬───────┬──────────┬───────┬──────┬────────┬─────────┐ │
│ │Date  │Place │Procedure │Diag   │Charge│Days/   │EPSDT    │ │
│ │      │Svc   │Code      │Pointer│      │Units   │Family   │ │
│ ├──────┼───────┼──────────┼───────┼──────┼────────┼─────────┤ │
│ │01/15 │11    │97110     │AB     │150.00│1       │         │ │
│ │2024  │      │          │       │      │        │         │ │
│ ├──────┼───────┼──────────┼───────┼──────┼────────┼─────────┤ │
│ │01/15 │11    │97140     │AB     │125.00│1       │         │ │
│ │2024  │      │          │       │      │        │         │ │
│ └──────┴───────┴──────────┴───────┴──────┴────────┴─────────┘ │
├─────────────────────────────────────────────────────────────────┤
│ 28. TOTAL CHARGE: $275.00                                       │
│ 29. AMOUNT PAID: $0.00                                          │
│ 30. BALANCE DUE: $275.00                                        │
├─────────────────────────────────────────────────────────────────┤
│ 33. BILLING PROVIDER INFO & PH #                                │
│     ABC PHYSICAL THERAPY CLINIC                                 │
│     555 Healthcare Blvd, Suite 200                              │
│     New York, NY 10002                                          │
│     NPI: 1234567890                                             │
└─────────────────────────────────────────────────────────────────┘
```

### **Link mẫu thực tế CMS-1500:**
- **Official CMS template**: https://www.cms.gov/Medicare/CMS-Forms/CMS-Forms/Downloads/CMS1500.pdf
- **Filled example**: https://www.nucc.org/images/stories/PDF/cms_1500_claim_form_instructions_rev_05-2021.pdf
- **Interactive form**: https://www.cms.gov/files/document/cms-1500-form-instructions-revised-02-12.pdf

---

## 📄 2. CMS-1500 + EOB (Claim với Explanation of Benefits)

### **Page 1: CMS-1500 Form** (giống trên)

### **Page 2: EOB Document**

```
┌─────────────────────────────────────────────────────────────────┐
│              EXPLANATION OF BENEFITS (EOB)                      │
│                   BlueCross BlueShield                          │
├─────────────────────────────────────────────────────────────────┤
│ Member: JOHN DOE                    Member ID: ABC123456789     │
│ Claim #: 2024010112345              Date Processed: 01/20/2024  │
│ Provider: ABC Physical Therapy       NPI: 1234567890            │
├─────────────────────────────────────────────────────────────────┤
│                       CLAIM DETAILS                             │
├─────────────────────────────────────────────────────────────────┤
│ Date of   │Procedure│ Provider │ Allowed │Insurance│ Your      │
│ Service   │  Code   │ Charges  │ Amount  │  Paid   │Responsibility│
├───────────┼─────────┼──────────┼─────────┼─────────┼───────────┤
│ 01/15/24  │ 97110   │ $150.00  │ $120.00 │ $96.00  │ $24.00    │
│           │ Therapy │          │         │ (80%)   │ (20% coins)│
├───────────┼─────────┼──────────┼─────────┼─────────┼───────────┤
│ 01/15/24  │ 97140   │ $125.00  │ $100.00 │ $80.00  │ $20.00    │
│           │ Manual  │          │         │ (80%)   │ (20% coins)│
│           │ Therapy │          │         │         │           │
├───────────┴─────────┼──────────┼─────────┼─────────┼───────────┤
│           TOTALS    │ $275.00  │ $220.00 │ $176.00 │ $44.00    │
└─────────────────────┴──────────┴─────────┴─────────┴───────────┘

┌─────────────────────────────────────────────────────────────────┐
│                    PAYMENT BREAKDOWN                            │
├─────────────────────────────────────────────────────────────────┤
│ Total Provider Charges:                          $275.00        │
│ Plan Discount (Not Covered):                     -$55.00        │
│ Allowed Amount:                                  $220.00        │
├─────────────────────────────────────────────────────────────────┤
│ Applied to Deductible:                           $0.00          │
│ Co-insurance (20%):                              $44.00         │
│ Co-payment:                                      $0.00          │
├─────────────────────────────────────────────────────────────────┤
│ Insurance Paid to Provider:                      $176.00        │
│ You Owe Provider:                                $44.00         │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                         REMARKS                                 │
├─────────────────────────────────────────────────────────────────┤
│ • This is NOT a bill. This is a statement of benefits paid     │
│   on your behalf.                                               │
│ • You may receive a separate bill from your provider for       │
│   the amount you owe ($44.00).                                  │
│ • If you have questions, call Member Services: 1-800-123-4567  │
│ • Claim processed according to your plan benefits.             │
│ • Deductible Status: $0/$500 met for 2024                      │
│ • Out-of-Pocket Max: $176/$2,000 met for 2024                  │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                    REMARK CODES                                 │
├─────────────────────────────────────────────────────────────────┤
│ CO-45: Charges exceed your contracted/legislated fee           │
│        arrangement. Provider is not allowed to bill you for    │
│        this amount.                                             │
│ PR-2:  Co-insurance amount. This is your responsibility.       │
└─────────────────────────────────────────────────────────────────┘
```

### **Link mẫu thực tế EOB:**
- **Medicare EOB**: https://www.medicare.gov/basics/forms-help-resources/understanding-medicare-summary-notice
- **Sample EOB**: https://www.bcbsm.com/index/health-insurance-help/faqs/topics/claims-and-benefits/understanding-eob.html
- **EOB Example PDF**: https://www.anthem.com/dam/medpolicies/abc/active/guidelines/gl_pw_a051166.html

---

## 📊 So sánh 2 loại document:

| Feature | CMS-1500 Only | CMS-1500 + EOB |
|---------|--------------|----------------|
| **Number of pages** | 1 page | 2-3 pages |
| **Purpose** | Submit claim to insurance | Full documentation for patient/records |
| **Information** | Basic claim info | Claim + payment explanation |
| **Who receives** | Insurance company | Patient + Provider records |
| **When to use** | Initial submission | After processing / Patient copy |
| **File size** | ~50-100 KB | ~150-300 KB |

---

## 💻 Code implementation trong PtE:

````javascript
/**
 * Generate PDF claim với hoặc không có EOB
 * @param {string} claimId - ID của claim
 * @param {boolean} isPrintWithEob - Có bao gồm EOB không
 * @returns {Promise<string>} PDF file name
 */
function _generateClaimPDF(claimId, isPrintWithEob) {
    return $q(function(resolve, reject) {
        if (!claimId) {
            reject('Invalid claimId');
            return;
        }
        
        var options = {
            spinner: true,
            requestType: requestType.POST,
            reqFrom: $rootScope.page
        };
        
        var param = {
            claimId: claimId,
            includeEob: isPrintWithEob  // true = CMS-1500 + EOB, false = chỉ CMS-1500
        };
        
        // Gọi API để generate PDF
        api.call('v4PrintClaimInCMS1500FormatATP', param, options).then(
            function(response) {
                if (!response || !response.data) {
                    reject('Invalid response');
                    return;
                }
                
                var pdfFileName = response.data.pdfName || response.data;
                
                if (isPrintWithEob) {
                    console.log('Generated claim WITH EOB:', pdfFileName);
                    // PDF sẽ có 2-3 pages:
                    // - Page 1: CMS-1500 form
                    // - Page 2: EOB document
                    // - Page 3: Additional EOB details (nếu cần)
                } else {
                    console.log('Generated claim WITHOUT EOB:', pdfFileName);
                    // PDF chỉ có 1 page: CMS-1500 form
                }
                
                resolve(pdfFileName);
            },
            function(error) {
                console.log('generateClaimPDF: API call failed -', error);
                reject(error);
            }
        );
    });
}

/**
 * Print claim với confirmation dialog
 * @param {Object} claim - Claim object
 */
function printClaim(claim) {
    // Bước 1: Confirm với user
    _confirmPrintWithEob(claim._id, 'print').then(function(isPrintWithEob) {
        // Bước 2: Generate PDF
        _generateClaimPDF(claim._id, isPrintWithEob).then(function(pdfFileName) {
            // Bước 3: Print PDF
            var isApp = $rootScope.appType === AppTypeConst.APP;
            var isAndroid = $rootScope.DeviceType === 'android';
            
            if (isApp) {
                if (isAndroid) {
                    // Android: print trực tiếp
                    $cordovaPrinter.print(pdfFileName);
                } else {
                    // iOS: download rồi print
                    var urlPdf = $rootScope.host + 'api/v4ViewPDF1500FormATP?type=download&pathPDFFile=' + pdfFileName;
                    
                    downloadService.download(urlPdf, pdfFileName).then(
                        function(fileURI) {
                            if (fileURI) {
                                $cordovaPrinter.print(fileURI);
                            }
                        },
                        function(error) {
                            console.log('Download failed:', error);
                        }
                    );
                }
            } else {
                // WEB: print với printJS
                var urlPdf = $rootScope.host + 'api/v4ViewPDF1500FormATP?type=view&pathPDFFile=' + pdfFileName;
                
                printJS({
                    printable: urlPdf,
                    type: 'pdf',
                    showModal: true
                });
            }
        }).catch(function(error) {
            console.log('Print claim failed:', error);
            messageAlert.error('Failed to print claim');
        });
    });
}
````

---

## 🎯 Real-world examples:

### **1. Medicare EOB (MSN - Medicare Summary Notice):**
https://www.medicare.gov/sites/default/files/2021-10/11306-Understanding-Medicare-Summary-Notice.pdf

### **2. Private Insurance EOB samples:**
- **UnitedHealthcare**: https://www.uhc.com/content/dam/uhcdotcom/en/HealthReform/PDF/eob-sample.pdf
- **Aetna**: https://www.aetna.com/individuals-families/member-rights-resources/health-claims/explanation-of-benefits.html
- **Cigna**: https://www.cigna.com/knowledge-center/understanding-explanation-of-benefits

### **3. CMS-1500 official form:**
https://www.cms.gov/Medicare/CMS-Forms/CMS-Forms/CMS-Forms-Items/CMS1188854

---

## 💡 Tổng kết:

| Document | Pages | Content | Use Case |
|----------|-------|---------|----------|
| **CMS-1500 only** | 1 | Claim form | Submit to insurance |
| **CMS-1500 + EOB** | 2-3 | Claim + Payment details | Patient records, full documentation |

**Trong code:**
```javascript
_confirmPrintWithEob(claimId, 'print')
  → User chọn YES → Generate CMS-1500 + EOB (2-3 pages)
  → User chọn NO  → Generate CMS-1500 only (1 page)
```