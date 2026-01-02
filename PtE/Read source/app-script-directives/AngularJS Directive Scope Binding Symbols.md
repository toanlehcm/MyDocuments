# AngularJS Directive Scope Binding Symbols

## 📘 Các ký hiệu scope binding:

| Symbol | Name | Data Flow | Purpose |
|--------|------|-----------|---------|
| **`@`** | Text/String binding | Parent → Child (one-way) | Pass string values |
| **`=`** | Two-way binding | Parent ↔ Child (two-way) | Sync data between parent & child |
| **`&`** | Expression/Callback | Child → Parent | Call parent functions |
| **`<?`** | Optional one-way binding | Parent → Child (one-way) | Optional data, read-only |
| **`=?`** | Optional two-way binding | Parent ↔ Child (two-way) | Optional data, read/write |
| **`@?`** | Optional text binding | Parent → Child (one-way) | Optional string |

---

## 🎯 Chi tiết từng ký hiệu:

### **1. `@` - Text/String Binding (One-way)**

**Meaning:** Pass string value from parent to child (interpolated)

```javascript
scope: {
    id: '@'  // String binding
}
```

**Usage:**
```html
<!-- Parent -->
<audio-recorder id="note-audio-{{patientId}}"></audio-recorder>

<!-- Child receives: "note-audio-12345" -->
```

**In controller:**
```javascript
controller: function() {
    console.log(this.id);  // "note-audio-12345" (string)
}
```

**Key points:**
- ✅ Always receives **string**
- ✅ Supports interpolation `{{}}`
- ✅ One-way: Parent → Child only
- ❌ Child cannot change parent value

---

### **2. `=` - Two-way Binding**

**Meaning:** Sync data between parent and child (both directions)

```javascript
scope: {
    audioModel: '='  // Two-way binding
}
```

**Usage:**
```html
<!-- Parent -->
<audio-recorder audio-model="noteAudio"></audio-recorder>
```

**In controller:**
```javascript
controller: function() {
    // Read parent value
    console.log(this.audioModel);  // Parent's noteAudio object
    
    // Change child value → Parent updates automatically
    this.audioModel = newAudioBlob;
    // Parent's noteAudio is now newAudioBlob
}
```

**Key points:**
- ✅ Two-way sync: Parent ↔ Child
- ✅ Parent changes → Child updates
- ✅ Child changes → Parent updates
- ✅ Can pass any data type (object, array, etc.)
- ⚠️ Can cause performance issues if overused

---

### **3. `&` - Expression/Callback Binding**

**Meaning:** Pass function/callback from parent to child

```javascript
scope: {
    onRecordComplete: '&'  // Callback function
}
```

**Usage:**
```html
<!-- Parent -->
<audio-recorder 
    on-record-complete="handleComplete(audioData)">
</audio-recorder>
```

**In parent controller:**
```javascript
$scope.handleComplete = function(audioData) {
    console.log('Recording complete:', audioData);
    // Save to server, etc.
};
```

**In child controller:**
```javascript
controller: function() {
    // Call parent function
    this.onRecordComplete({ 
        audioData: blob  // Pass data to parent
    });
    
    // Parent's handleComplete(blob) is executed
}
```

**Key points:**
- ✅ One-way: Child → Parent
- ✅ Child calls parent function
- ✅ Pass data via object: `{ paramName: value }`
- ✅ Parent function name can be different from binding name

---

### **4. `<?` - Optional One-way Binding**

**Meaning:** Pass data from parent to child, but optional (won't error if missing)

```javascript
scope: {
    showPlayer: '<?'  // Optional one-way binding
}
```

**Usage:**
```html
<!-- With value -->
<audio-recorder show-player="true"></audio-recorder>

<!-- Without value (no error) -->
<audio-recorder></audio-recorder>
```

**In controller:**
```javascript
controller: function() {
    console.log(this.showPlayer);  // true or undefined
    
    // Can read parent value
    if (this.showPlayer) {
        // Show player
    }
    
    // ❌ CANNOT change parent value
    this.showPlayer = false;  // Parent NOT updated
}
```

**Key points:**
- ✅ One-way: Parent → Child (read-only)
- ✅ Optional (no error if missing)
- ✅ Better performance than `=`
- ❌ Child cannot modify parent value

---

### **5. `=?` - Optional Two-way Binding**

**Meaning:** Sync data between parent and child, but optional

```javascript
scope: {
    convertMp3: '=?',  // Optional two-way binding
    timeLimit: '=?'    // Optional two-way binding
}
```

**Usage:**
```html
<!-- With values -->
<audio-recorder 
    convert-mp3="true" 
    time-limit="300">
</audio-recorder>

<!-- Without values (no error, uses defaults) -->
<audio-recorder></audio-recorder>
```

**In controller:**
```javascript
controller: function() {
    // Set defaults for optional parameters
    this.convertMp3 = this.convertMp3 ?? false;
    this.timeLimit = this.timeLimit ?? 300;
    
    // Can modify (two-way binding)
    this.timeLimit = 600;  // Parent updated
}
```

**Key points:**
- ✅ Two-way: Parent ↔ Child
- ✅ Optional (no error if missing)
- ✅ Good for optional settings/config
- ⚠️ Should set defaults in controller

---

### **6. `@?` - Optional Text Binding**

**Meaning:** Pass string from parent to child, but optional

```javascript
scope: {
    placeholder: '@?'  // Optional string binding
}
```

**Usage:**
```html
<!-- With value -->
<audio-recorder placeholder="Click to record"></audio-recorder>

<!-- Without value -->
<audio-recorder></audio-recorder>
```

**Key points:**
- ✅ One-way: Parent → Child
- ✅ Optional (no error if missing)
- ✅ Always string type

---

## 📊 Your audioRecorder scope explained:

```javascript
scope: {
    id: '@',                      // ✅ String: "note-audio"
    audioRecorder: '=',           // ✅ Two-way: Reference to directive
    audioModel: '=',              // ✅ Two-way: Audio blob data
    onRecordStart: '&',           // ✅ Callback: Parent function
    onRecordComplete: '&',        // ✅ Callback: Parent function
    onRecordFailed: '&',          // ✅ Callback: Parent function
    onRecordDelete: '&',          // ✅ Callback: Parent function
    onPlaybackComplete: '&',      // ✅ Callback: Parent function
    onPlaybackStart: '&',         // ✅ Callback: Parent function
    onPlaybackPause: '&',         // ✅ Callback: Parent function
    onPlaybackResume: '&',        // ✅ Callback: Parent function
    onConversionStart: '&',       // ✅ Callback: Parent function
    onConversionComplete: '&',    // ✅ Callback: Parent function
    showPlayer: '=?',             // ✅ Optional two-way: true/false
    autoStart: '=?',              // ✅ Optional two-way: true/false
    convertMp3: '=?',             // ✅ Optional two-way: true/false
    timeLimit: '=?',              // ✅ Optional two-way: number (seconds)
    autoStart: '=?',              // ❌ DUPLICATE! Bug in code
}
```

---

## 🚨 Bug in your code:

```javascript
autoStart: '=?',  // Line 1
// ... other properties
autoStart: '=?',  // ❌ DUPLICATE! Same property declared twice
```

**Fix:**
````javascript
scope: {
    id: '@',
    audioRecorder: '=',
    audioModel: '=',
    onRecordStart: '&',
    onRecordComplete: '&',
    onRecordFailed: '&',
    onRecordDelete: '&',
    onPlaybackComplete: '&',
    onPlaybackStart: '&',
    onPlaybackPause: '&',
    onPlaybackResume: '&',
    onConversionStart: '&',
    onConversionComplete: '&',
    showPlayer: '=?',
    autoStart: '=?',
    convertMp3: '=?',
    timeLimit: '=?'
    // ✅ Removed duplicate autoStart
}
````

---

## 📊 Complete usage example:

### **HTML usage:**

```html
<!-- Parent template -->
<audio-recorder 
    id="treatment-note-audio"
    audio-recorder="audioRecorderCtrl"
    audio-model="note.audioFile"
    on-record-start="handleRecordStart()"
    on-record-complete="handleRecordComplete(audioData)"
    on-record-failed="handleRecordFailed(error)"
    on-record-delete="handleRecordDelete()"
    on-playback-complete="handlePlaybackComplete()"
    on-playback-start="handlePlaybackStart()"
    on-playback-pause="handlePlaybackPause()"
    on-playback-resume="handlePlaybackResume()"
    on-conversion-start="handleConversionStart()"
    on-conversion-complete="handleConversionComplete(mp3File)"
    show-player="true"
    auto-start="false"
    convert-mp3="true"
    time-limit="300">
</audio-recorder>
```

---

### **Parent controller:**

```javascript
angular.module('PtEMobile').controller('TreatmentNoteCtrl', 
    function($scope) {
        // Data for two-way binding
        $scope.note = {
            audioFile: null
        };
        
        // Callback functions
        $scope.handleRecordStart = function() {
            console.log('Started recording');
            $scope.isRecording = true;
        };
        
        $scope.handleRecordComplete = function(audioData) {
            console.log('Recording complete:', audioData);
            $scope.note.audioFile = audioData;
            $scope.isRecording = false;
            
            // Save to server
            saveAudioToServer(audioData);
        };
        
        $scope.handleRecordFailed = function(error) {
            console.error('Recording failed:', error);
            alert('Could not access microphone');
        };
        
        $scope.handleRecordDelete = function() {
            console.log('Audio deleted');
            $scope.note.audioFile = null;
        };
        
        $scope.handlePlaybackComplete = function() {
            console.log('Playback finished');
        };
        
        $scope.handleConversionStart = function() {
            console.log('Converting to MP3...');
        };
        
        $scope.handleConversionComplete = function(mp3File) {
            console.log('MP3 conversion complete:', mp3File);
            $scope.note.audioFile = mp3File;
        };
    }
);
```

---

## 📚 Official AngularJS Documentation:

### **🔗 Official Links:**

1. **Directive Definition Object (DDO) - Scope:**
   - https://docs.angularjs.org/api/ng/service/$compile#directive-definition-object
   - Section: "scope" property

2. **Component Bindings:**
   - https://docs.angularjs.org/guide/component#component-based-application-architecture
   - Section: "Intercomponent Communication"

3. **Isolate Scope:**
   - https://docs.angularjs.org/guide/directive#isolating-the-scope-of-a-directive

4. **Developer Guide - Directives:**
   - https://docs.angularjs.org/guide/directive

5. **API Reference - $compile:**
   - https://docs.angularjs.org/api/ng/service/$compile

---

## 📊 Summary table from official docs:

| Symbol | Official Name | Description | Docs Link |
|--------|--------------|-------------|-----------|
| **`@`** | Attribute string binding | Bind to string value | [Link](https://docs.angularjs.org/api/ng/service/$compile#-scope-) |
| **`=`** | Two-way binding | Bind to parent scope property | [Link](https://docs.angularjs.org/api/ng/service/$compile#-scope-) |
| **`&`** | Expression binding | Bind to parent scope expression | [Link](https://docs.angularjs.org/api/ng/service/$compile#-scope-) |
| **`<?`** | One-way binding | Bind to parent (read-only) | [Link](https://docs.angularjs.org/api/ng/service/$compile#-scope-) |
| **`=?`** | Optional two-way | Optional two-way binding | [Link](https://docs.angularjs.org/api/ng/service/$compile#-scope-) |
| **`@?`** | Optional attribute | Optional string binding | [Link](https://docs.angularjs.org/api/ng/service/$compile#-scope-) |

---

## 🎯 Best practices:

### **1. Use `<` instead of `=` when possible:**

```javascript
// ❌ Old way (AngularJS 1.x)
scope: {
    data: '='  // Two-way binding (can cause issues)
}

// ✅ Better way (AngularJS 1.5+)
scope: {
    data: '<'  // One-way binding (better performance)
}
```

**Why:** One-way binding (`<`) is faster and prevents accidental changes

---

### **2. Use optional bindings for optional parameters:**

```javascript
// ✅ Good
scope: {
    required: '=',        // Required parameter
    optional: '=?',       // Optional parameter
    anotherOptional: '<?'  // Optional one-way
}
```

---

### **3. Use `&` for all callbacks:**

```javascript
// ✅ Good - All callbacks use &
scope: {
    onSave: '&',
    onDelete: '&',
    onCancel: '&'
}
```

---

### **4. Set defaults for optional parameters:**

```javascript
controller: function() {
    // Set defaults in $onInit or controller
    this.showPlayer = this.showPlayer ?? true;
    this.timeLimit = this.timeLimit ?? 300;
    this.convertMp3 = this.convertMp3 ?? false;
}
```

---

## 📊 Complete reference:

```javascript
// Complete scope binding reference
scope: {
    // REQUIRED BINDINGS
    stringValue: '@',           // String from attribute
    dataValue: '=',             // Two-way data binding
    callback: '&',              // Parent function
    
    // OPTIONAL BINDINGS
    optionalString: '@?',       // Optional string
    optionalData: '=?',         // Optional two-way
    optionalCallback: '&?',     // Optional callback
    
    // ONE-WAY BINDINGS (AngularJS 1.5+)
    oneWayData: '<',            // One-way (read-only)
    optionalOneWay: '<?',       // Optional one-way
}
```

---

**Official AngularJS documentation is available at: https://docs.angularjs.org/ 📚**