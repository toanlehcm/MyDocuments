# Có phải Directives giống Custom Components trong ReactJS?

## 📘 Câu trả lời ngắn gọn:

**✅ CÓ** - AngularJS Directives tương đương với React Components!

---

## 🎯 So sánh chi tiết:

### **AngularJS Directive ↔ React Component**

| Feature | AngularJS Directive | React Component |
|---------|-------------------|-----------------|
| **Purpose** | Reusable UI component | Reusable UI component |
| **Encapsulation** | ✅ Isolated scope | ✅ Props & State |
| **Props/Data binding** | `scope: { ... }` | `props` |
| **Template** | `template` or `templateUrl` | JSX return |
| **Lifecycle** | `$onInit`, `$onDestroy` | `useEffect`, `componentDidMount` |
| **Event handling** | `&` callbacks | Function props |
| **Reusability** | ✅ Use anywhere | ✅ Use anywhere |

---

## 📊 Code comparison:

### **1. AngularJS Directive (audioRecorder.js)**

```javascript
// AngularJS Directive
angular.module('PtEMobile').directive('audioRecorder', function($timeout) {
    return {
        restrict: 'E',
        scope: {
            id: '@',                    // Props (string)
            audioModel: '=',            // Props (two-way binding)
            onRecordComplete: '&',      // Props (callback function)
            showPlayer: '=?',           // Props (optional)
            timeLimit: '=?'             // Props (optional)
        },
        controller: function($scope) {
            // Component logic
            this.startRecord = function() { ... };
            this.stopRecord = function() { ... };
        },
        template: `
            <div class="audioRecorder">
                <button ng-click="recorder.startRecord()">Record</button>
                <button ng-click="recorder.stopRecord()">Stop</button>
            </div>
        `
    };
});
```

**Usage:**
```html
<audio-recorder 
    id="note-audio"
    audio-model="noteAudio"
    on-record-complete="handleComplete()"
    show-player="true"
    time-limit="300">
</audio-recorder>
```

---

### **2. React Component (equivalent)**

```javascript
// React Component
import React, { useState, useCallback } from 'react';

function AudioRecorder({ 
    id,                     // Props (string)
    audioModel,             // Props (data)
    onRecordComplete,       // Props (callback)
    showPlayer = true,      // Props (optional with default)
    timeLimit = 300         // Props (optional with default)
}) {
    const [isRecording, setIsRecording] = useState(false);
    
    const startRecord = useCallback(() => {
        // Component logic
        setIsRecording(true);
    }, []);
    
    const stopRecord = useCallback(() => {
        // Component logic
        setIsRecording(false);
        onRecordComplete?.(audioData);
    }, [onRecordComplete]);
    
    return (
        <div className="audioRecorder">
            <button onClick={startRecord}>Record</button>
            <button onClick={stopRecord}>Stop</button>
        </div>
    );
}

export default AudioRecorder;
```

**Usage:**
```jsx
<AudioRecorder 
    id="note-audio"
    audioModel={noteAudio}
    onRecordComplete={handleComplete}
    showPlayer={true}
    timeLimit={300}
/>
```

---

## 📊 Detailed comparison:

### **1. Props/Data binding:**

**AngularJS:**
```javascript
scope: {
    id: '@',                // String binding (one-way)
    audioModel: '=',        // Two-way binding
    onRecordComplete: '&',  // Callback function
    showPlayer: '=?',       // Optional two-way binding
}
```

**React:**
```javascript
function AudioRecorder({ 
    id,                     // String prop
    audioModel,             // Data prop
    onRecordComplete,       // Callback prop
    showPlayer = true       // Optional prop with default
}) {
    // ...
}
```

---

### **2. Template/Render:**

**AngularJS:**
```javascript
template: `
    <div class="audioRecorder">
        <button ng-click="recorder.startRecord()">
            {{recorder.isRecording ? 'Recording...' : 'Record'}}
        </button>
    </div>
`
```

**React:**
```jsx
return (
    <div className="audioRecorder">
        <button onClick={startRecord}>
            {isRecording ? 'Recording...' : 'Record'}
        </button>
    </div>
);
```

---

### **3. State management:**

**AngularJS:**
```javascript
controller: function($scope) {
    var ctrl = this;
    ctrl.isRecording = false;  // State
    ctrl.elapsedTime = 0;      // State
    
    ctrl.startRecord = function() {
        ctrl.isRecording = true;  // Update state
    };
}
```

**React:**
```javascript
const [isRecording, setIsRecording] = useState(false);
const [elapsedTime, setElapsedTime] = useState(0);

const startRecord = () => {
    setIsRecording(true);  // Update state
};
```

---

### **4. Lifecycle hooks:**

**AngularJS:**
```javascript
controller: function($scope, $element) {
    // On component mount
    this.$onInit = function() {
        console.log('Component initialized');
    };
    
    // On component unmount
    $element.one('$destroy', function() {
        console.log('Component destroyed');
        // Cleanup
    });
}
```

**React:**
```javascript
useEffect(() => {
    console.log('Component mounted');
    
    return () => {
        console.log('Component unmounted');
        // Cleanup
    };
}, []);
```

---

### **5. Event callbacks:**

**AngularJS:**
```javascript
scope: {
    onRecordComplete: '&'  // Callback from parent
}

// Call parent callback
this.onRecordComplete({ audioData: blob });
```

**React:**
```javascript
function AudioRecorder({ onRecordComplete }) {
    // Call parent callback
    onRecordComplete?.(blob);
}
```

---

## 🔍 Your audioRecorder scope breakdown:

### **Your directive scope:**

```javascript
scope: {
    id: '@',                      // ≈ React: id (string prop)
    audioRecorder: '=',           // ≈ React: ref
    audioModel: '=',              // ≈ React: value + onChange
    onRecordStart: '&',           // ≈ React: onRecordStart callback
    onRecordComplete: '&',        // ≈ React: onRecordComplete callback
    onRecordFailed: '&',          // ≈ React: onRecordFailed callback
    onRecordDelete: '&',          // ≈ React: onRecordDelete callback
    onPlaybackComplete: '&',      // ≈ React: onPlaybackComplete callback
    onPlaybackStart: '&',         // ≈ React: onPlaybackStart callback
    onPlaybackPause: '&',         // ≈ React: onPlaybackPause callback
    onPlaybackResume: '&',        // ≈ React: onPlaybackResume callback
    onConversionStart: '&',       // ≈ React: onConversionStart callback
    onConversionComplete: '&',    // ≈ React: onConversionComplete callback
    showPlayer: '=?',             // ≈ React: showPlayer = true (optional)
    autoStart: '=?',              // ≈ React: autoStart = false (optional)
    convertMp3: '=?',             // ≈ React: convertMp3 = false (optional)
    timeLimit: '=?',              // ≈ React: timeLimit = 300 (optional)
    autoStart: '=?',              // ⚠️ DUPLICATE! Bug in code
}
```

---

### **React equivalent:**

```javascript
function AudioRecorder({
    id,
    audioRecorder,              // ref
    audioModel,                 // value
    onRecordStart,
    onRecordComplete,
    onRecordFailed,
    onRecordDelete,
    onPlaybackComplete,
    onPlaybackStart,
    onPlaybackPause,
    onPlaybackResume,
    onConversionStart,
    onConversionComplete,
    showPlayer = true,          // Default value
    autoStart = false,          // Default value
    convertMp3 = false,         // Default value
    timeLimit = 300             // Default value
}) {
    // Component logic
}
```

---

## 📊 Full comparison table:

| Concept | AngularJS Directive | React Component |
|---------|-------------------|-----------------|
| **Props** | `scope: { prop: '=' }` | `function Comp({ prop })` |
| **String prop** | `id: '@'` | `{ id }` |
| **Data prop** | `audioModel: '='` | `{ audioModel }` |
| **Callback** | `onComplete: '&'` | `{ onComplete }` |
| **Optional** | `showPlayer: '=?'` | `{ showPlayer = true }` |
| **State** | `ctrl.state = value` | `const [state, setState] = useState()` |
| **Template** | `template: '...'` | `return <div>...</div>` |
| **Mount** | `$onInit()` | `useEffect(() => {}, [])` |
| **Unmount** | `$destroy` | `useEffect(() => () => {})` |
| **Update** | `$watch` | `useEffect(() => {}, [deps])` |
| **Ref** | `audioRecorder: '='` | `ref={audioRecorder}` |

---

## 🚨 Key differences:

### **1. Two-way binding:**

**AngularJS:**
```javascript
// Two-way binding (automatic sync)
scope: {
    audioModel: '='  // Changes propagate both ways
}

// Parent changes → Child updates
// Child changes → Parent updates
```

**React:**
```javascript
// One-way data flow (explicit)
function AudioRecorder({ audioModel, onAudioModelChange }) {
    // Parent changes → Child updates (automatic)
    // Child changes → Must call onAudioModelChange (explicit)
    
    const handleChange = (newValue) => {
        onAudioModelChange?.(newValue);
    };
}
```

---

### **2. Template syntax:**

**AngularJS:**
```html
<div ng-if="ctrl.isRecording">
    <span>{{ctrl.elapsedTime}}</span>
    <button ng-click="ctrl.stopRecord()">Stop</button>
</div>
```

**React:**
```jsx
{isRecording && (
    <div>
        <span>{elapsedTime}</span>
        <button onClick={stopRecord}>Stop</button>
    </div>
)}
```

---

### **3. Dependency injection:**

**AngularJS:**
```javascript
controller: function($scope, $timeout, $http, myService) {
    // Services injected automatically
}
```

**React:**
```javascript
import { useTimeout } from './hooks/useTimeout';
import { useHttp } from './hooks/useHttp';
import myService from './services/myService';

function AudioRecorder() {
    // Import explicitly
}
```

---

## ✅ Summary:

| Question | Answer |
|----------|--------|
| **Directives giống Components?** | ✅ YES - Very similar concept |
| **Reusable?** | ✅ Both are reusable |
| **Props/Bindings?** | ✅ Both have props/bindings |
| **State?** | ✅ Both have state |
| **Lifecycle?** | ✅ Both have lifecycle hooks |
| **Main difference?** | Two-way binding (Angular) vs One-way flow (React) |

---

## 🎯 Conclusion:

**YES, AngularJS Directives = React Components!**

```
AngularJS Directive:
- Component-based architecture
- Reusable UI elements
- Props (scope bindings)
- State management
- Lifecycle hooks

React Component:
- Component-based architecture
- Reusable UI elements
- Props
- State management (useState)
- Lifecycle hooks (useEffect)

→ Same concept, different syntax!
```

---

## 🔧 Migration example:

### **Your audioRecorder directive → React component:**

````javascript
// React version of your audioRecorder
import React, { useState, useEffect, useCallback, useRef } from 'react';

function AudioRecorder({
    id,
    audioModel,
    onRecordStart,
    onRecordComplete,
    onRecordFailed,
    onRecordDelete,
    onPlaybackComplete,
    onPlaybackStart,
    onPlaybackPause,
    onPlaybackResume,
    onConversionStart,
    onConversionComplete,
    showPlayer = true,
    autoStart = false,
    convertMp3 = false,
    timeLimit = 300
}) {
    const [isRecording, setIsRecording] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [audioBlob, setAudioBlob] = useState(null);
    
    const mediaRecorderRef = useRef(null);
    const timerRef = useRef(null);
    
    // Auto start on mount
    useEffect(() => {
        if (autoStart) {
            startRecord();
        }
        
        // Cleanup on unmount
        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, [autoStart]);
    
    const startRecord = useCallback(() => {
        setIsRecording(true);
        onRecordStart?.();
        
        // Start recording logic
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(stream => {
                mediaRecorderRef.current = new MediaRecorder(stream);
                mediaRecorderRef.current.start();
                
                // Start timer
                timerRef.current = setInterval(() => {
                    setElapsedTime(t => t + 1);
                }, 1000);
            })
            .catch(error => {
                onRecordFailed?.(error);
            });
    }, [onRecordStart, onRecordFailed]);
    
    const stopRecord = useCallback(() => {
        setIsRecording(false);
        clearInterval(timerRef.current);
        
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
            mediaRecorderRef.current.ondataavailable = (e) => {
                const blob = e.data;
                setAudioBlob(blob);
                onRecordComplete?.(blob);
            };
        }
    }, [onRecordComplete]);
    
    return (
        <div className="audioRecorder" id={id}>
            <div className="controls">
                {!isRecording ? (
                    <button onClick={startRecord}>
                        🎤 Record
                    </button>
                ) : (
                    <button onClick={stopRecord}>
                        ⏹ Stop
                    </button>
                )}
            </div>
            
            {isRecording && (
                <div className="timer">
                    {Math.floor(elapsedTime / 60)}:{(elapsedTime % 60).toString().padStart(2, '0')}
                </div>
            )}
            
            {showPlayer && audioBlob && (
                <audio controls src={URL.createObjectURL(audioBlob)} />
            )}
        </div>
    );
}

export default AudioRecorder;
````

**Usage:**
````jsx
<AudioRecorder
    id="note-audio"
    audioModel={noteAudio}
    onRecordStart={() => console.log('Started')}
    onRecordComplete={(blob) => saveAudio(blob)}
    showPlayer={true}
    timeLimit={300}
/>
````

---

**In summary: AngularJS Directives and React Components are the SAME CONCEPT - both are reusable, encapsulated UI components with props, state, and lifecycle hooks. Just different syntax! 🎯**