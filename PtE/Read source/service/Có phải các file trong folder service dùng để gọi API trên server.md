# Folder `service/` - AngularJS Services

## 📘 Câu trả lời:

**KHÔNG hoàn toàn đúng!** Services trong folder `service/` **KHÔNG chỉ dùng để gọi API**.

---

## 🎯 Services dùng để làm gì?

### **Services có nhiều mục đích khác nhau:**

| Service Type | Purpose | Example |
|--------------|---------|---------|
| **API Service** | ✅ Call backend APIs | apiService.js |
| **Business Logic** | Business rules, calculations | commonService.js |
| **Utility Service** | Helper functions, formatting | pendoService.js |
| **External Integration** | WebSocket, 3rd party APIs | recordingService.js, speechService.js |
| **Data Management** | Read/parse data files | readJsonService.js |

---

## 📊 Phân tích các services trong project của bạn:

### **1. apiService.js - ✅ API Calling Service**

**Purpose:** Wrapper cho HTTP calls đến backend

```javascript
// apiService.js
angular.module('apiService', [])
    .service('api', function($http, $q, $rootScope) {
        
        this.call = function(url, params, options) {
            // Add token
            if (!params.token) {
                params.token = $rootScope.token;
            }
            
            // Add user role
            if (!params.userRoleSelected) {
                params.userRoleSelected = $rootScope.userRoleSelected;
            }
            
            // Call backend API
            return $http({
                method: 'POST',
                url: $rootScope.host + 'api/' + url,
                data: params
            }).then(
                function(response) {
                    // Handle success
                    return response;
                },
                function(error) {
                    // Handle error
                    errorHandler(error);
                    return $q.reject(error);
                }
            );
        };
    });
```

**Usage:**
```javascript
// In controller
api.call('v4GetPatient', { patientId: 123 }).then(
    function(response) {
        $scope.patient = response.data;
    }
);
```

**✅ Đây là service để gọi API!**

---

### **2. commonService.js - ❌ KHÔNG phải API service**

**Purpose:** Business logic, UI utilities, common functions

```javascript
// commonService.js
angular.module('commonService', [])
    .service('commonService', function($mdDialog, $translate, $sce) {
        
        // Show toast notification (UI utility)
        this.showToast = function(message, hideDelay, gotIt) {
            $mdToast.show({
                template: '<md-toast>' + message + '</md-toast>',
                hideDelay: hideDelay
            });
        };
        
        // Show popup (UI utility)
        this.popupMessage = function(title, message, handleCancel, handleConfirm) {
            $mdDialog.show({
                template: '<md-dialog>...</md-dialog>',
                // ...
            });
        };
        
        // Print insurance claim (business logic)
        this.printInsuranceClaim = function(claimId, isPrintWithEob) {
            // Complex logic to print claim
            // Calls API internally
            api.call('v4GetClaimPDF', { claimId: claimId }).then(...);
        };
        
        // Format currency (utility function)
        this.formatCurrency = function(amount) {
            return '$' + amount.toFixed(2);
        };
        
        // Calculate distance (utility function)
        this.convertDistance = function(meters) {
            return (meters * 0.000621371).toFixed(2) + ' miles';
        };
    });
```

**Usage:**
```javascript
// Show toast
commonService.showToast('Saved successfully!', 3000);

// Show popup
commonService.popupMessage('Confirm', 'Delete this item?', cancel, confirm);

// Print claim
commonService.printInsuranceClaim(claimId, true);

// Format currency
var price = commonService.formatCurrency(123.456); // "$123.46"
```

**❌ KHÔNG phải service để gọi API - đây là service chứa business logic và utilities!**

---

### **3. recordingService.js - ❌ KHÔNG phải API service**

**Purpose:** Audio recording functionality (browser API)

```javascript
// recordingService.js
angular.module('RecordingService', [])
    .service('RecordingService', function($q) {
        
        var self = this;
        self.recorder = null;
        self.stream = null;
        
        // Initialize microphone (browser API, not backend API)
        this.initRecorder = function() {
            return navigator.mediaDevices.getUserMedia({ audio: true })
                .then(function(stream) {
                    self.stream = stream;
                    self.recorder = RecordRTC(stream, {
                        type: 'audio',
                        sampleRate: 44100
                    });
                });
        };
        
        // Start recording (client-side, no API call)
        this.startRecording = function() {
            if (self.recorder) {
                self.recorder.startRecording();
            }
        };
        
        // Stop recording (client-side, returns blob)
        this.stopRecording = function() {
            return $q(function(resolve, reject) {
                self.recorder.stopRecording(function() {
                    var blob = self.recorder.getBlob();
                    resolve(blob); // Return audio blob
                });
            });
        };
    });
```

**Usage:**
```javascript
// Initialize recorder
RecordingService.initRecorder().then(function() {
    console.log('Microphone ready');
});

// Start recording
RecordingService.startRecording();

// Stop and get audio blob
RecordingService.stopRecording().then(function(audioBlob) {
    // Upload to server
    uploadAudio(audioBlob);
});
```

**❌ KHÔNG gọi backend API - dùng browser's MediaRecorder API!**

---

### **4. speechService.js - ❌ KHÔNG phải API service**

**Purpose:** Speech recognition (browser Web Speech API)

```javascript
// speechService.js
angular.module('SpeechService', [])
    .service('SpeechService', function($rootScope, $window) {
        
        var recognition = null;
        
        // Check if browser supports speech recognition
        this.isSupported = function() {
            return 'webkitSpeechRecognition' in $window || 
                   'SpeechRecognition' in $window;
        };
        
        // Start listening (browser API, not backend API)
        this.startListening = function(config) {
            var SpeechRecognition = $window.SpeechRecognition || 
                                   $window.webkitSpeechRecognition;
            recognition = new SpeechRecognition();
            
            recognition.continuous = true;
            recognition.interimResults = true;
            recognition.lang = config.language || 'en-US';
            
            recognition.onresult = function(event) {
                var transcript = '';
                for (var i = 0; i < event.results.length; i++) {
                    transcript += event.results[i][0].transcript;
                }
                $rootScope.$broadcast('speech:result', { transcript: transcript });
            };
            
            recognition.start();
        };
        
        // Stop listening
        this.stopListening = function() {
            if (recognition) {
                recognition.stop();
            }
        };
    });
```

**Usage:**
```javascript
// Start speech recognition
SpeechService.startListening({ language: 'en-US' });

// Listen for results
$scope.$on('speech:result', function(event, data) {
    $scope.transcript = data.transcript;
});

// Stop recognition
SpeechService.stopListening();
```

**❌ KHÔNG gọi backend API - dùng browser's Web Speech API!**

---

### **5. readJsonService.js - ❌ KHÔNG phải backend API service**

**Purpose:** Read local JSON files

```javascript
// readJsonService.js
angular.module('readJsonService', [])
    .service('readJsonService', function($http, $q) {
        
        var _this = this;
        
        // Read local JSON file (HTTP GET, not backend API)
        this.promiseToHaveData = function(fileName) {
            var defer = $q.defer();
            
            if (!fileName || fileName.trim().length === 0) {
                return null;
            }
            
            // Read local file via HTTP GET
            $http.get(fileName)
                .success(function(data) {
                    angular.extend(_this, data);
                    defer.resolve();
                })
                .error(function() {
                    defer.reject('could not find file: ' + fileName);
                });
            
            return defer.promise;
        };
    });
```

**Usage:**
```javascript
// Load cases.json (ICD-9 codes)
readJsonService.promiseToHaveData('data/cases.json').then(
    function() {
        $scope.diagnosisCodes = readJsonService.cases;
    }
);

// Load emailTemplateTokens.json
readJsonService.promiseToHaveData('data/emailTemplateTokens.json').then(
    function() {
        $scope.emailTokens = readJsonService.tokens;
    }
);
```

**❌ KHÔNG gọi backend API - chỉ đọc local JSON files!**

---

### **6. pendoService.js - ❌ KHÔNG phải API service**

**Purpose:** Integration với Pendo (3rd party analytics)

```javascript
// pendoService.js
angular.module('PendoService', [])
    .service('PendoService', function($timeout) {
        
        // Initialize Pendo (3rd party service)
        this.initialize = function(user) {
            if (window.pendo && user.UserRoleSelected !== 'Patient') {
                window.pendo.initialize({
                    visitor: {
                        id: user._id,
                        email: user.Email,
                        full_name: user.FirstName + ' ' + user.LastName,
                        role: user.UserRoleSelected
                    },
                    account: {
                        id: user.Client._id,
                        name: user.Client.ClientName
                    }
                }, { force: true });
            }
        };
        
        // Track event in Pendo
        this.trackEvent = function(eventName, eventData) {
            if (window.pendo) {
                window.pendo.track(eventName, eventData);
            }
        };
        
        // Clear Pendo session
        this.untrackPendo = function() {
            if (window.pendo) {
                window.pendo.clearSession();
            }
        };
    });
```

**Usage:**
```javascript
// Initialize Pendo on login
PendoService.initialize($rootScope.userData);

// Track event
PendoService.trackEvent('appointment-created', {
    appointmentId: appt._id,
    patientId: appt.patientId
});

// Clear on logout
PendoService.untrackPendo();
```

**❌ KHÔNG gọi backend API - integrate với Pendo analytics service!**

---

## 📊 Summary table:

| Service File | Purpose | Gọi Backend API? | Gọi External API? |
|--------------|---------|-----------------|-------------------|
| **apiService.js** | HTTP wrapper cho backend | ✅ YES | ❌ NO |
| **commonService.js** | Business logic, utilities | ✅ Có (internally) | ❌ NO |
| **recordingService.js** | Audio recording | ❌ NO | ✅ Browser MediaRecorder API |
| **speechService.js** | Speech recognition | ❌ NO | ✅ Browser Web Speech API |
| **readJsonService.js** | Read local JSON files | ❌ NO | ❌ NO (local files) |
| **pendoService.js** | Analytics tracking | ❌ NO | ✅ Pendo API |

---

## 🎯 Kết luận:

### **Services trong folder `service/` có nhiều mục đích:**

```
1. ✅ API Calling
   - apiService.js (backend API wrapper)
   
2. ✅ Business Logic
   - commonService.js (business rules, calculations)
   
3. ✅ Browser APIs
   - recordingService.js (MediaRecorder API)
   - speechService.js (Web Speech API)
   
4. ✅ Data Management
   - readJsonService.js (read local JSON files)
   
5. ✅ External Integrations
   - pendoService.js (Pendo analytics)
```

---

## 🔍 So sánh với Factory:

| Aspect | Service | Factory |
|--------|---------|---------|
| **Return** | Instance (`this`) | Object you return |
| **Usage** | Constructor function | Return object |
| **When** | When you need `this` | Most common, flexible |

**Example:**

**Service:**
```javascript
angular.module('app').service('myService', function() {
    this.doSomething = function() { ... };
});
```

**Factory (more common):**
```javascript
angular.module('app').factory('myFactory', function() {
    return {
        doSomething: function() { ... }
    };
});
```

---

## ✅ Best practice:

### **Naming convention:**

```
apiService.js         → API calls to backend
commonService.js      → Common utilities, business logic
recordingService.js   → Audio recording functionality
speechService.js      → Speech recognition
pendoService.js       → External service integration

patientFactory.js     → Patient data operations
appointmentFactory.js → Appointment operations
```

---

## 📊 Complete flow example:

### **Scenario: Record audio note and save to backend**

```javascript
// 1. Controller uses RecordingService (browser API)
RecordingService.initRecorder();
RecordingService.startRecording();

// User speaks...

RecordingService.stopRecording().then(function(audioBlob) {
    
    // 2. Controller uses commonService for UI
    commonService.showToast('Processing audio...', 3000);
    
    // 3. Controller uses apiService to save to backend
    var formData = new FormData();
    formData.append('audio', audioBlob, 'note.wav');
    formData.append('patientId', patientId);
    formData.append('noteId', noteId);
    
    api.call('v4SaveAudioNote', formData).then(
        function(response) {
            // 4. Show success message
            commonService.showToast('Audio note saved!', 3000);
            
            // 5. Track event
            PendoService.trackEvent('audio-note-saved', {
                noteId: response.noteId
            });
        },
        function(error) {
            commonService.showToast('Failed to save audio', 3000);
        }
    );
});
```

**Flow:**
```
RecordingService (Browser API)
    ↓
audioBlob
    ↓
apiService.call() → Backend API
    ↓
Success/Error
    ↓
commonService.showToast() (UI)
PendoService.trackEvent() (Analytics)
```

---

**Kết luận: Services KHÔNG CHỈ dùng để gọi API - chúng có nhiều mục đích khác nhau: API calls, business logic, browser APIs, external integrations, utilities, etc. 🎯**