# File cases.json - ICD-9 Diagnosis Codes Database

## 📘 cases.json là gì?

**cases.json** là file **data** chứa danh sách các **ICD-9 diagnosis codes** (mã bệnh theo chuẩn ICD-9) - được dùng trong hệ thống y tế để mã hóa chẩn đoán bệnh.

---

## 🎯 Dùng để làm gì?

### **1. Store medical diagnosis codes:**

```json
{
  "cases": [
    {
      "Id": "716",                                    // ICD-9 code
      "Name": "Other and unspecified arthropathies"  // Diagnosis name
    },
    {
      "Id": "716.0",
      "Name": "Kaschin-beck disease"
    }
  ]
}
```

**Purpose:** Database của các mã bệnh để doctors/therapists có thể chọn khi tạo treatment notes, evaluations, etc.

---

### **2. Hierarchical structure:**

```
716     → Other and unspecified arthropathies (CATEGORY)
├── 716.0   → Kaschin-beck disease (SUBCATEGORY)
│   ├── 716.00 → Kaschin-Beck disease, site unspecified
│   ├── 716.01 → Kaschin-Beck disease, shoulder region
│   ├── 716.02 → Kaschin-Beck disease, upper arm
│   └── ...
├── 716.1   → Traumatic arthropathy
│   ├── 716.10 → Traumatic arthropathy, site unspecified
│   ├── 716.11 → Traumatic arthropathy, shoulder region
│   └── ...
└── ...
```

**Structure:**
- **3 digits** (716) = Main category
- **4 digits** (716.0) = Subcategory
- **5 digits** (716.00) = Specific location/type

---

## 📊 What is ICD-9?

### **ICD = International Classification of Diseases**

```
ICD-9 = Version 9 (older standard, still used in some systems)
ICD-10 = Version 10 (current standard)

Your app uses ICD-9 codes for diagnosis coding
```

**Example codes in your file:**
```
716.0  = Kaschin-beck disease
716.1  = Traumatic arthropathy
716.2  = Allergic arthritis
716.3  = Climacteric arthritis
716.4  = Transient arthropathy
716.5  = Unspecified polyarthropathy
716.6  = Unspecified monoarthritis
716.8  = Other specified arthropathy
716.9  = Unspecified arthropathy
```

---

## 🎯 Dùng như thế nào?

### **1. Load data vào app:**

```javascript
// In your controller or service
$http.get('data/cases.json').then(function(response) {
  $scope.diagnosisCodes = response.data.cases;
});
```

---

### **2. Autocomplete/search for diagnosis codes:**

```javascript
// In treatment notes or evaluation forms
$scope.searchDiagnosis = function(searchText) {
  return $scope.diagnosisCodes.filter(function(diagnosis) {
    var lowerSearch = searchText.toLowerCase();
    return diagnosis.Id.indexOf(lowerSearch) > -1 || 
           diagnosis.Name.toLowerCase().indexOf(lowerSearch) > -1;
  });
};
```

**Usage in HTML:**
```html
<md-autocomplete
  md-search-text="diagnosisSearch"
  md-items="item in searchDiagnosis(diagnosisSearch)"
  md-item-text="item.Name"
  placeholder="Search diagnosis code">
  
  <md-item-template>
    <span class="item-title">
      <strong>{{item.Id}}</strong> - {{item.Name}}
    </span>
  </md-item-template>
  
  <md-not-found>
    No diagnosis found matching "{{diagnosisSearch}}"
  </md-not-found>
</md-autocomplete>
```

---

### **3. Dropdown selection:**

```html
<!-- Select diagnosis code in evaluation/treatment form -->
<select ng-model="patient.diagnosisCode" 
        ng-options="code.Id as (code.Id + ' - ' + code.Name) for code in diagnosisCodes">
  <option value="">-- Select Diagnosis Code --</option>
</select>
```

---

### **4. Display in treatment notes:**

```javascript
// Controller
$scope.selectedDiagnosis = {
  Id: "716.11",
  Name: "Traumatic arthropathy, shoulder region"
};

// In template
<div class="diagnosis-info">
  <label>Diagnosis:</label>
  <span>{{selectedDiagnosis.Id}} - {{selectedDiagnosis.Name}}</span>
</div>
```

**Output:**
```
Diagnosis: 716.11 - Traumatic arthropathy, shoulder region
```

---

## 🔍 Real-world usage trong PTE app:

### **Example 1: Initial Evaluation form**

```javascript
// When therapist creates evaluation
$scope.evaluation = {
  patientId: '12345',
  diagnosisCodes: [],  // Array of selected codes
  primaryDiagnosis: null
};

// Select primary diagnosis
$scope.selectPrimaryDiagnosis = function(diagnosis) {
  $scope.evaluation.primaryDiagnosis = {
    code: diagnosis.Id,
    name: diagnosis.Name
  };
};

// Add secondary diagnosis
$scope.addSecondaryDiagnosis = function(diagnosis) {
  $scope.evaluation.diagnosisCodes.push({
    code: diagnosis.Id,
    name: diagnosis.Name
  });
};
```

---

### **Example 2: Treatment Note with diagnosis**

```javascript
// Treatment note includes diagnosis codes
$scope.treatmentNote = {
  date: new Date(),
  patientId: '12345',
  
  // Primary diagnosis
  primaryDiagnosis: {
    code: '716.11',
    name: 'Traumatic arthropathy, shoulder region'
  },
  
  // Secondary diagnoses
  secondaryDiagnoses: [
    {
      code: '716.91',
      name: 'Arthropathy, unspecified, shoulder region'
    }
  ],
  
  // Treatment details
  interventions: [...],
  goals: [...]
};
```

---

### **Example 3: Filter by body region**

```javascript
// Get all shoulder-related diagnoses
$scope.getShoulderDiagnoses = function() {
  return $scope.diagnosisCodes.filter(function(diagnosis) {
    return diagnosis.Name.toLowerCase().indexOf('shoulder') > -1;
  });
};

// Result:
/*
[
  { Id: '716.01', Name: 'Kaschin-Beck disease, shoulder region' },
  { Id: '716.11', Name: 'Traumatic arthropathy, shoulder region' },
  { Id: '716.21', Name: 'Allergic arthritis, shoulder region' },
  { Id: '716.31', Name: 'Climacteric arthritis, shoulder region' },
  ...
]
*/
```

---

## 📊 Data structure breakdown:

### **Your file contains 116 entries for code family 716:**

```javascript
// Category breakdown:
716     → 1 entry   (main category)
716.0   → 10 entries (Kaschin-beck disease + 9 body regions)
716.1   → 10 entries (Traumatic arthropathy + 9 body regions)
716.2   → 10 entries (Allergic arthritis + 9 body regions)
716.3   → 10 entries (Climacteric arthritis + 9 body regions)
716.4   → 10 entries (Transient arthropathy + 9 body regions)
716.5   → 10 entries (Polyarthropathy + 9 body regions)
716.6   → 9 entries  (Monoarthritis + 8 body regions)
716.8   → 10 entries (Other arthropathy + 9 body regions)
716.9   → 10 entries (Unspecified arthropathy + 9 body regions)

Total: 1 + (9 × 10) + 9 + 10 + 10 = 120 entries
```

---

### **Body region pattern:**

```javascript
// Each subcategory has variations for 9 body regions:
.x0  → site unspecified
.x1  → shoulder region
.x2  → upper arm
.x3  → forearm
.x4  → hand
.x5  → pelvic region and thigh
.x6  → lower leg
.x7  → ankle and foot
.x8  → other specified sites
.x9  → multiple sites

// Example for code 716.1 (Traumatic arthropathy):
716.10 → site unspecified
716.11 → shoulder region
716.12 → upper arm
716.13 → forearm
716.14 → hand
716.15 → pelvic region and thigh
716.16 → lower leg
716.17 → ankle and foot
716.18 → other specified sites
716.19 → multiple sites
```

---

## 🔍 Complete file likely contains thousands of codes:

### **Your file probably has structure like:**

```
data/
├── cases.json           ← ALL ICD-9 codes
│   ├── 001-139   → Infectious diseases
│   ├── 140-239   → Neoplasms
│   ├── 710-739   → Musculoskeletal (your data is from here)
│   │   ├── 710-719 → Arthropathies
│   │   │   └── 716 → Arthropathies (your excerpt)
│   │   ├── 720-724 → Dorsopathies
│   │   └── ...
│   └── ...
```

---

## 📊 How to use in app:

### **Method 1: Load all codes at app start:**

```javascript
// In app.js or main controller
angular.module('PtEMobile')
  .run(function($rootScope, $http) {
    // Load diagnosis codes
    $http.get('data/cases.json').then(function(response) {
      $rootScope.diagnosisCodes = response.data.cases;
      console.log('Loaded', $rootScope.diagnosisCodes.length, 'diagnosis codes');
    });
  });
```

---

### **Method 2: Load on-demand:**

```javascript
// In specific controller (evaluation, treatment notes)
angular.module('PtEMobile')
  .controller('EvaluationCtrl', function($scope, $http) {
    
    // Load only when needed
    function loadDiagnosisCodes() {
      if (!$scope.diagnosisCodes) {
        $http.get('data/cases.json').then(function(response) {
          $scope.diagnosisCodes = response.data.cases;
        });
      }
    }
    
    // Load when user focuses on diagnosis field
    $scope.onDiagnosisFieldFocus = function() {
      loadDiagnosisCodes();
    };
  });
```

---

### **Method 3: Use as service:**

```javascript
// Create diagnosis service
angular.module('PtEMobile')
  .factory('diagnosisService', function($http, $q) {
    var diagnosisCodes = null;
    
    return {
      // Get all codes
      getAllCodes: function() {
        if (diagnosisCodes) {
          return $q.when(diagnosisCodes);
        }
        
        return $http.get('data/cases.json').then(function(response) {
          diagnosisCodes = response.data.cases;
          return diagnosisCodes;
        });
      },
      
      // Search codes
      search: function(query) {
        return this.getAllCodes().then(function(codes) {
          var lowerQuery = query.toLowerCase();
          return codes.filter(function(code) {
            return code.Id.indexOf(lowerQuery) > -1 ||
                   code.Name.toLowerCase().indexOf(lowerQuery) > -1;
          });
        });
      },
      
      // Get code by ID
      getById: function(id) {
        return this.getAllCodes().then(function(codes) {
          return codes.find(function(code) {
            return code.Id === id;
          });
        });
      },
      
      // Get codes by category
      getByCategory: function(categoryPrefix) {
        return this.getAllCodes().then(function(codes) {
          return codes.filter(function(code) {
            return code.Id.startsWith(categoryPrefix);
          });
        });
      }
    };
  });

// Use in controller
angular.module('PtEMobile')
  .controller('TreatmentNoteCtrl', function($scope, diagnosisService) {
    
    // Search diagnoses
    $scope.searchDiagnoses = function(query) {
      diagnosisService.search(query).then(function(results) {
        $scope.searchResults = results;
      });
    };
    
    // Get specific code
    diagnosisService.getById('716.11').then(function(diagnosis) {
      console.log(diagnosis);
      // { Id: "716.11", Name: "Traumatic arthropathy, shoulder region" }
    });
    
    // Get all arthropathy codes
    diagnosisService.getByCategory('716').then(function(codes) {
      $scope.arthropathyCodes = codes;
      console.log('Found', codes.length, 'arthropathy codes');
    });
  });
```

---

## 🚨 Important notes:

### **1. ICD-9 vs ICD-10:**

```javascript
// Your app uses ICD-9 (older)
// ICD-9: 3-5 digit numeric codes (716.11)

// ICD-10 (newer standard)
// ICD-10: 3-7 alphanumeric codes (M25.511)

// If updating to ICD-10, you need new data file
```

---

### **2. File size considerations:**

```javascript
// Complete ICD-9 has ~14,000 codes
// File size: ~1-2 MB

// Options:
1. Load all at once (good for offline app)
2. Load on-demand (better for web)
3. Search via API (for large datasets)
```

---

### **3. Caching:**

```javascript
// Cache in localStorage for faster loading
angular.module('PtEMobile')
  .factory('diagnosisService', function($http, $q, $window) {
    
    function getCachedCodes() {
      var cached = $window.localStorage.getItem('diagnosisCodes');
      return cached ? JSON.parse(cached) : null;
    }
    
    function setCachedCodes(codes) {
      $window.localStorage.setItem('diagnosisCodes', JSON.stringify(codes));
    }
    
    return {
      getAllCodes: function() {
        // Try cache first
        var cached = getCachedCodes();
        if (cached) {
          return $q.when(cached);
        }
        
        // Load from file
        return $http.get('data/cases.json').then(function(response) {
          var codes = response.data.cases;
          setCachedCodes(codes);
          return codes;
        });
      }
    };
  });
```

---

## 📊 Summary:

| Question | Answer |
|----------|--------|
| **cases.json là gì?** | Database of ICD-9 diagnosis codes |
| **Dùng để làm gì?** | Select/search medical diagnosis codes in treatment notes, evaluations |
| **Format** | JSON array of objects with `Id` (code) and `Name` (description) |
| **Structure** | Hierarchical: 3 digits (category) → 4-5 digits (specific diagnosis + location) |
| **Size** | Your excerpt: 116 codes for category 716 (arthropathies) |
| **Usage** | Load via `$http`, search/filter, display in forms |
| **Caching** | Recommended for large datasets |

---

## ✅ Example implementation:

````html
<div class="diagnosis-section">
  <label>Primary Diagnosis</label>
  
  <!-- Autocomplete for diagnosis search -->
  <md-autocomplete
    md-selected-item="treatmentNote.primaryDiagnosis"
    md-search-text="diagnosisSearchText"
    md-items="diagnosis in searchDiagnoses(diagnosisSearchText)"
    md-item-text="diagnosis.Name"
    md-min-length="2"
    placeholder="Search diagnosis code (e.g., 716 or shoulder)">
    
    <md-item-template>
      <span class="diagnosis-code">{{diagnosis.Id}}</span>
      <span class="diagnosis-name">{{diagnosis.Name}}</span>
    </md-item-template>
    
    <md-not-found>
      No diagnosis found for "{{diagnosisSearchText}}"
    </md-not-found>
  </md-autocomplete>
  
  <!-- Display selected diagnosis -->
  <div ng-if="treatmentNote.primaryDiagnosis" class="selected-diagnosis">
    <strong>{{treatmentNote.primaryDiagnosis.Id}}</strong>
    {{treatmentNote.primaryDiagnosis.Name}}
  </div>
</div>
````

---

**cases.json is your medical diagnosis code database - essential for documenting patient conditions in treatment notes and evaluations!**