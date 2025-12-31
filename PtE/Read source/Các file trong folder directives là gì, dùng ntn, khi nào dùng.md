# Folder `directives/` - AngularJS Custom Directives

## 📘 Directives là gì?

**Directives** trong AngularJS là các **custom HTML elements/attributes** (thẻ HTML tùy chỉnh) cho phép bạn mở rộng HTML với các behavior và functionality mới.

---

## 🎯 Dùng để làm gì?

### **1. Tạo reusable UI components:**

```javascript
// Directive definition (trong file audioRecorder.js)
angular.module('PtEMobile').directive('audioRecorder', function ($timeout) {
    return {
        restrict: 'E',  // Element directive: <audio-recorder>
        scope: { ... }, // Isolated scope
        controller: AudioRecorderController,
        template: '<div class="audioRecorder">...</div>',
        link: function(scope, element, attrs) { ... }
    };
});
```

**Usage in HTML:**
```html
<!-- Use custom <audio-recorder> element anywhere -->
<audio-recorder 
    id="note-audio"
    audio-model="noteAudio"
    on-record-complete="handleRecordComplete()"
    convert-mp3="true"
    time-limit="300">
</audio-recorder>
```

---

## 📊 Types of Directives trong project:

### **Common directive patterns:**

```javascript
// 1. Element Directive (E)
restrict: 'E'
// Usage: <my-directive></my-directive>

// 2. Attribute Directive (A)  
restrict: 'A'
// Usage: <div my-directive></div>

// 3. Class Directive (C)
restrict: 'C'
// Usage: <div class="my-directive"></div>

// 4. Comment Directive (M)
restrict: 'M'
// Usage: <!-- directive: my-directive -->

// 5. Combined
restrict: 'EA'  // Can be used as element OR attribute
```

---

## 🔍 Example: audioRecorder.js directive breakdown:

### **1. Directive Definition Object (DDO):**

```javascript
return {
    // What type of directive
    restrict: 'E',  // Element: <audio-recorder>
    
    // Isolated scope (component-like)
    scope: {
        id: '@',                      // @ = string binding
        audioRecorder: '=',           // = = two-way binding
        audioModel: '=',              // = = two-way binding
        onRecordStart: '&',           // & = callback function
        onRecordComplete: '&',        // & = callback function
        showPlayer: '=?',             // =? = optional two-way binding
        autoStart: '=?',              // =? = optional
        convertMp3: '=?',             // =? = optional
        timeLimit: '=?',              // =? = optional
    },
    
    // Controller for directive logic
    controller: AudioRecorderController,
    controllerAs: 'recorder',
    bindToController: true,
    
    // Template (HTML)
    template: function (element, attrs) {
        return '<div class="audioRecorder">' + element.html() + '</div>';
    },
    
    // Link function (DOM manipulation)
    link: function (scope, element, attrs) {
        var recorder = scope.recorder;
        recorder.audioRecorder = recorder;
        if (recorder.autoStart) {
            recorder.startRecord();
        }
    }
};
```

---

## 🎯 Khi nào dùng Directives?

### **Use Case 1: Reusable UI Components**

```html
<!-- Treatment Notes page -->
<audio-recorder 
    id="treatment-audio"
    audio-model="treatmentNote.audioFile"
    on-record-complete="saveAudioNote()">
</audio-recorder>

<!-- SOAP Notes page -->
<audio-recorder 
    id="soap-audio"
    audio-model="soapNote.audioFile"
    on-record-complete="saveSoapAudio()">
</audio-recorder>

<!-- Evaluation page -->
<audio-recorder 
    id="eval-audio"
    audio-model="evaluation.audioFile"
    on-record-complete="saveEvalAudio()">
</audio-recorder>

<!-- ✅ Same component, used in 3 different places -->
```

---

### **Use Case 2: Encapsulate Complex Logic**

```javascript
// Without directive (messy controller):
$scope.startRecording = function() {
    // 50+ lines of recording logic
    // Check permissions
    // Initialize recorder
    // Handle Cordova vs HTML5
    // Convert to MP3
    // etc...
};

// With directive (clean controller):
$scope.handleRecordComplete = function() {
    // Just handle the result
    $scope.treatmentNote.audioFile = audioFile;
};
```

**Directive hides complexity:**
- Permission handling
- Device detection (Cordova vs browser)
- Audio recording
- File conversion
- Playback controls
- Timer management

---

### **Use Case 3: Cross-platform Compatibility**

```javascript
// Directive handles platform differences internally
if (control.status.isCordova) {
    // Mobile: Use Cordova Media plugin
    cordovaMedia.recorder = new Media(...);
} else {
    // Web: Use HTML5 MediaRecorder API
    html5Media.recorder = new Recorder(...);
}

// Your controller doesn't care about platform:
<audio-recorder audio-model="audioFile"></audio-recorder>
// ✅ Works on iOS, Android, and Web browser
```

---

## 📊 Common Directives in your project:

### **Your `directives/` folder likely contains:**

```
directives/
├── audioRecorder.js          ← Audio recording component
├── dateRangePicker.js        ← Date range selector
├── fileUpload.js             ← File upload component
├── signaturePad.js           ← Signature capture
├── preventMultiClicks.js     ← Double-click prevention (decorator)
├── customSelect.js           ← Custom dropdown
├── imageViewer.js            ← Image preview/zoom
├── loadingSpinner.js         ← Loading indicator
└── ...
```

---

## 🔍 How to find directive usage:

### **Method 1: Search for directive name in HTML:**

```bash
# Search for audio-recorder usage
grep -r "audio-recorder" app/views/ --include="*.html"

# Result:
app/views/patientDashboard/treamentNoteATP.html:
    <audio-recorder id="note-audio" audio-model="note.audio"></audio-recorder>

app/views/patientDashboard/soapNoteATP.html:
    <audio-recorder id="soap-audio" audio-model="soap.audio"></audio-recorder>
```

---

### **Method 2: Search in controllers:**

```bash
# Sometimes directives are used dynamically
grep -r "audioRecorder" app/scripts/controllers/ --include="*.js"
```

---

### **Method 3: Check index.html:**

```html
<!-- index.html - All directives must be loaded -->
<script src="scripts/directives/audioRecorder.js"></script>
<script src="scripts/directives/dateRangePicker.js"></script>
<script src="scripts/directives/fileUpload.js"></script>
```

---

## 📊 Directive Scope Binding Types:

### **1. `@` - One-way string binding:**

```javascript
scope: {
    id: '@'  // Pass string value
}
```

**Usage:**
```html
<audio-recorder id="note-audio"></audio-recorder>
<!-- control.id = "note-audio" (string) -->
```

---

### **2. `=` - Two-way binding:**

```javascript
scope: {
    audioModel: '='  // Two-way data binding
}
```

**Usage:**
```html
<audio-recorder audio-model="note.audioFile"></audio-recorder>
<!-- Changes in directive update note.audioFile -->
<!-- Changes in note.audioFile update directive -->
```

---

### **3. `&` - Callback function:**

```javascript
scope: {
    onRecordComplete: '&'  // Parent function
}
```

**Usage:**
```html
<audio-recorder on-record-complete="saveNote()"></audio-recorder>
<!-- Directive calls parent's saveNote() -->
```

```javascript
// In directive:
control.onRecordComplete();  // Calls parent's saveNote()
```

---

### **4. `=?` - Optional two-way binding:**

```javascript
scope: {
    convertMp3: '=?',  // Optional parameter
    timeLimit: '=?'    // Optional parameter
}
```

**Usage:**
```html
<!-- With parameters -->
<audio-recorder 
    convert-mp3="true" 
    time-limit="300">
</audio-recorder>

<!-- Without parameters (uses defaults) -->
<audio-recorder></audio-recorder>
```

---

## 🎯 Real-world examples from your code:

### **Example 1: Basic usage**

```html
<!-- views/patientDashboard/treamentNoteATP.html -->
<audio-recorder 
    id="treatment-note-audio"
    audio-model="treatmentNote.audioFile">
</audio-recorder>
```

**What happens:**
```
1. Directive creates audio recorder UI
2. User clicks record button
3. Records audio (uses microphone permission)
4. Converts to blob
5. Stores in treatmentNote.audioFile
6. Parent controller can access the audio file
```

---

### **Example 2: With callbacks**

```html
<audio-recorder 
    id="soap-audio"
    audio-model="soapNote.audio"
    on-record-start="handleRecordStart()"
    on-record-complete="handleRecordComplete()"
    on-record-failed="handleRecordFailed()">
</audio-recorder>
```

**Controller:**
```javascript
$scope.handleRecordStart = function() {
    console.log('Recording started...');
    $scope.isRecording = true;
};

$scope.handleRecordComplete = function() {
    console.log('Recording completed!');
    $scope.isRecording = false;
    
    // Save audio to server
    saveAudioToServer($scope.soapNote.audio);
};

$scope.handleRecordFailed = function() {
    console.error('Recording failed!');
    alert('Could not access microphone');
};
```

---

### **Example 3: With options**

```html
<audio-recorder 
    id="eval-audio"
    audio-model="evaluation.audio"
    show-player="true"
    convert-mp3="true"
    time-limit="300"
    auto-start="false">
</audio-recorder>
```

**Options:**
- `show-player="true"` → Shows audio player controls
- `convert-mp3="true"` → Converts WAV to MP3
- `time-limit="300"` → Max 5 minutes (300 seconds)
- `auto-start="false"` → Don't auto-start recording

---

## 📊 Directive lifecycle:

### **When directive is used:**

```
1. compile phase
   ↓
2. controller instantiation
   AudioRecorderController created
   ↓
3. template compilation
   HTML generated
   ↓
4. link phase
   DOM manipulation
   Event listeners attached
   ↓
5. $destroy event
   Cleanup (cancel timers, remove listeners)
```

---

## 🚨 Common patterns in directives:

### **Pattern 1: Cleanup on destroy**

```javascript
// In directive controller:
$element.one('$destroy', function () {
    $interval.cancel(timing);
    // Clean up resources
});

// Or in scope:
$scope.$on('$destroy', function() {
    // Cleanup
});
```

**Why:** Prevent memory leaks from timers, listeners, etc.

---

### **Pattern 2: Isolated scope**

```javascript
scope: {
    // Directive has its own scope
    // Doesn't pollute parent scope
}
```

**Why:** Makes directive reusable and prevents conflicts

---

### **Pattern 3: controllerAs syntax**

```javascript
controllerAs: 'recorder',
bindToController: true
```

**Usage in template:**
```html
<div>{{recorder.elapsedTime}}</div>
<button ng-click="recorder.startRecord()">Record</button>
```

**Why:** Cleaner than `$scope`, better for nested directives

---

## 📊 Summary:

| Question | Answer |
|----------|--------|
| **Directives là gì?** | Custom HTML elements/attributes with custom behavior |
| **Dùng để làm gì?** | Create reusable UI components, encapsulate logic |
| **Khi nào dùng?** | When you need reusable components across multiple pages |
| **Ở đâu?** | `app/scripts/directives/` folder |
| **How to use?** | Include in `index.html`, use in HTML templates |
| **Example?** | `<audio-recorder>`, `<date-picker>`, etc. |

---

## ✅ Benefits of Directives:

```
✅ Reusability - Use same component everywhere
✅ Encapsulation - Hide complex logic
✅ Testability - Easier to unit test
✅ Maintainability - Change once, affects all usages
✅ Cross-platform - Handle platform differences internally
✅ Clean controllers - Controllers stay focused on business logic
```

---

## 🎯 How to create new directive:

```javascript
'use strict';

angular.module('PtEMobile')
  .directive('myDirective', function() {
    return {
      restrict: 'E',
      scope: {
        data: '=',
        onComplete: '&'
      },
      template: '<div>My custom component</div>',
      controller: function($scope) {
        // Logic here
      },
      link: function(scope, element, attrs) {
        // DOM manipulation here
      }
    };
  });
```

**Usage:**
```html
<my-directive 
    data="someData" 
    on-complete="handleComplete()">
</my-directive>
```

---

**Directives are the building blocks for creating reusable, maintainable UI components in AngularJS - like modern React/Vue components but in Angular 1.x!**