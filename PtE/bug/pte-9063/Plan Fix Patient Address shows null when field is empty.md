# Fix: Patient Address shows "null" when field is empty

## Background

When patient address fields are empty/null, the PDF/HTML output displays the literal string `"null"` instead of an empty string.

**Root cause** is in `v2_CommonLogic.getAddressString()` ([v2_CommonLogic.js](file:///d:/Sources/pteverywhere/Server/logicMongo/v2_CommonLogic.js) line 523–584).

---

## Root Cause Analysis

### `v2_CommonLogic.getAddressString(address, twoRow)` — Line 523

```js
var addressLine = address.AddressLine;  // ← no guard: if address is null/undefined, throws TypeError
// ...
if (twoRow) {
    return addressLine + "<br/>" + arrAddress.join(", "); // ← if addressLine is null → returns "null<br/>..."
} else {
    return arrAddress.join(", ");  // ← safe, only returns filled parts
}
```

**Two bugs:**

| # | Scenario | Bug |
|---|----------|-----|
| 1 | `address` itself is `null` / `undefined` | Accessing `address.AddressLine` throws `TypeError: Cannot read property 'AddressLine' of null` |
| 2 | `twoRow = true` and `addressLine` field is `null` or `""` | Returns `"null<br/>city, state, zip"` — literal "null" is rendered in PDF |

---

## Use Cases That Display Patient Address

All callers of [getAddressString](file:///d:/Sources/pteverywhere/Server/logicMongo/v2_PatientInvoiceLogic.js#4554-4587) for patient address:

| File | Line | Context | twoRow | Risk |
|------|------|---------|--------|------|
| [v2_PatientInvoiceLogic.js](file:///d:/Sources/pteverywhere/Server/logicMongo/v2_PatientInvoiceLogic.js) | 4665 | `patientData.PatientData.Address[0]` | `false` | ⚠️ No null guard on `Address[0]` |
| [v2_PatientInvoiceLogic.js](file:///d:/Sources/pteverywhere/Server/logicMongo/v2_PatientInvoiceLogic.js) | 5275 | `patientData.Address` (SuperBill template) | `false` | ✅ Guarded by [if(patientData.Address)](file:///d:/Sources/pteverywhere/Server/logicMongo/v2_CommonLogic.js#2120-2205) |
| [v2_PatientInvoiceLogic.js](file:///d:/Sources/pteverywhere/Server/logicMongo/v2_PatientInvoiceLogic.js) | 7114 | `patientData.Address` (Invoice template v2) | `true` | 🔴 **Bug here** — twoRow=true triggers null display |
| [v2_PatientInvoiceLogic.js](file:///d:/Sources/pteverywhere/Server/logicMongo/v2_PatientInvoiceLogic.js) | 25121 | `patient.Address` (Patient Statement PDF) | `true` | 🔴 **Bug here** — twoRow=true triggers null display |
| [v2_CommonLogic.js](file:///d:/Sources/pteverywhere/Server/logicMongo/v2_CommonLogic.js) internal | 4554 | Local copy in PatientInvoiceLogic (same logic) | — | Same root issue |

> [!NOTE]
> Line 4665: `patientData.PatientData.Address[0]` — also missing null guard for `PatientData.Address.length > 0` check is present but `Address[0]` could still have null/empty fields.

---

## Proposed Changes

### Fix in `v2_CommonLogic.getAddressString`

#### [MODIFY] [v2_CommonLogic.js](file:///d:/Sources/pteverywhere/Server/logicMongo/v2_CommonLogic.js)

Fix the function at line 523 to:
1. Guard against `address` being `null` or `undefined` — return `""` immediately
2. When `twoRow = true`, only include `addressLine` if it's non-empty — avoid `"null<br/>..."` output

```js
v2_CommonLogic.getAddressString = function(address, twoRow) {
    if (!address) return ''  // guard against null/undefined

    var arrAddress = []
    var addressLine = address.AddressLine || ''  // ← coerce null to ''
    var state = address.State
    var city = address.City
    var zipcode = address.ZipCode
    var country = address.Country

    if (!twoRow) {
        twoRow = false
        if (addressLine) arrAddress.push(addressLine)
    }
    if (city) arrAddress.push(city)
    if (country == 'USA') {
        if (state) {
            var stateSubString = state.split(" - ")
            arrAddress.push(stateSubString[0])
        }
    } else {
        if (state) arrAddress.push(state)
    }
    if (zipcode) {
        if (zipcode.trim().length > 0) {
            zipcode = v2_CommonLogic.getZipCodeOfUSA(zipcode, country, false)
            arrAddress.push(zipcode)
        }
    }
    if (country && country !== 'USA') arrAddress.push(country)

    if (twoRow) {
        // Only prepend addressLine line if it has value
        if (addressLine) {
            return addressLine + "<br/>" + arrAddress.join(", ")
        }
        return arrAddress.join(", ")
    } else {
        return arrAddress.join(", ")
    }
}
```

> [!IMPORTANT]
> This is a shared utility used across many features (invoice PDF, treatment note, document, appointment email). The change is backward-compatible: it only removes the `"null"` literal output and adds a null guard — no behavior change for valid data.

---

## Verification Plan

### Manual Verification

1. Create a patient with **no address** filled in
2. Open a Patient Invoice and print/preview as PDF
3. Verify the "Address" row in the patient info section:
   - **Before fix**: shows `null` or `null, city, state`
   - **After fix**: shows either empty or only the filled parts (e.g. `city, state`)
4. Repeat for **Patient Statement** (Billing > Patient Statement > Generate PDF)
5. Repeat for **SuperBill** print

### Server Restart Required
After changing [v2_CommonLogic.js](file:///d:/Sources/pteverywhere/Server/logicMongo/v2_CommonLogic.js), restart the server for changes to take effect.
