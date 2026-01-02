# Folder `factory/` - AngularJS Factories (Services)

## 📘 Factory là gì?

**Factory** trong AngularJS là một **service pattern** để tạo các **reusable business logic, data services, và utility functions** có thể được inject vào controllers, directives, và các services khác.

---

## 🎯 Factory vs Controller vs Directive:

| Component | Purpose | Example |
|-----------|---------|---------|
| **Controller** | UI logic, handle user actions | Button clicks, form validation |
| **Directive** | Reusable UI components | `<audio-recorder>`, `<date-picker>` |
| **Factory** | Business logic, data services, utilities | API calls, WebSocket, calculations |

---

## 📊 Factory dùng để làm gì?

### **1. Share data between controllers:**

```javascript
// Without factory (BAD):
// Controller 1
$scope.userData = { name: 'John' };

// Controller 2
// ❌ Cannot access Controller 1's userData

// With factory (GOOD):
// userDataFactory.js
angular.module('PtEMobile').factory('userDataFactory', function() {
    var userData = { name: 'John' };
    
    return {
        getUserData: function() {
            return userData;
        },
        setUserData: function(data) {
            userData = data;
        }
    };
});

// Controller 1
var user = userDataFactory.getUserData();

// Controller 2
var user = userDataFactory.getUserData(); // ✅ Same data!
```

---

### **2. Encapsulate API calls:**

```javascript
// patientFactory.js
angular.module('PtEMobile').factory('patientFactory', 
    function($http, $q, $rootScope) {
        return {
            getPatientById: function(patientId) {
                return $http.get('/api/patients/' + patientId)
                    .then(function(response) {
                        return response.data;
                    });
            },
            
            savePatient: function(patientData) {
                return $http.post('/api/patients', patientData)
                    .then(function(response) {
                        return response.data;
                    });
            },
            
            deletePatient: function(patientId) {
                return $http.delete('/api/patients/' + patientId);
            }
        };
    }
);

// Use in controller:
patientFactory.getPatientById(123).then(function(patient) {
    $scope.patient = patient;
});
```

---

### **3. Manage complex state/connections (WebSocket example):**

Your actionheroFactory.js is a **perfect example**:

```javascript
// actionheroFactory.js - WebSocket connection manager
angular.module('actionheroFactory', [])
    .factory('actionheroFactory', function($rootScope, $http, ...) {
        var actionConnection = null;  // Singleton connection
        var onNewMessageListener = null;
        
        return {
            // Initialize WebSocket connection
            init: function(kickout, options, roomName) {
                if (!actionConnection) {
                    actionConnection = new ActionheroWebsocketClient(options);
                    // Setup event listeners...
                }
                actionConnection.connect(function() {
                    joinRoom();
                });
            },
            
            // Send message through WebSocket
            sendRoomMessage: function(roomName, message) {
                actionConnection.say(roomName, message);
            },
            
            // Listen for new messages
            onNewMessage: function(listener) {
                onNewMessageListener = listener;
            },
            
            // Get connection status
            getConnection: function() {
                return actionConnection;
            },
            
            // Disconnect
            disconnect: function() {
                if (actionConnection) {
                    actionConnection.disconnect();
                }
            }
        };
    });
```

**Usage in multiple controllers:**

```javascript
// Controller 1 - Messages
angular.module('PtEMobile').controller('MessagesCtrl', 
    function($scope, actionheroFactory) {
        // Initialize connection
        actionheroFactory.init(false, options, 'messages-room');
        
        // Listen for new messages
        actionheroFactory.onNewMessage(function(message) {
            $scope.messages.push(message);
            $scope.$apply();
        });
    }
);

// Controller 2 - Notifications
angular.module('PtEMobile').controller('NotificationsCtrl',
    function($scope, actionheroFactory) {
        // Use same connection (singleton)
        var connection = actionheroFactory.getConnection();
        
        // Send notification
        $scope.sendNotification = function() {
            actionheroFactory.sendRoomMessage('notifications', 'Hello!');
        };
    }
);

// Both controllers share the SAME WebSocket connection!
```

---

## 🔍 Your actionheroFactory.js explained:

### **What it does:**

```javascript
// 1. Manages WebSocket connection (Singleton pattern)
var actionConnection = null;  // Only ONE connection for entire app

// 2. Handles real-time messages
actionConnection.on('say', function(messageResponse) {
    switch (contextType.toLowerCase()) {
        case 'newmessage':
            // New chat message received
            onNewMessageListener(messageData);
            break;
            
        case 'insurance-claim-form':
            // Insurance claim update
            $rootScope.$emit("insuranceClaimFormListener", ...);
            break;
            
        case 'webnotification':
            // Web notification
            $rootScope.$emit('webNotification', ...);
            break;
            
        case 'kickout':
            // User kicked out
            onKickout(messageInfo);
            break;
            
        // ... 20+ other message types
    }
});

// 3. Provides API for controllers
return {
    init: init,                    // Initialize connection
    sendRoomMessage: sendRoomMessage,  // Send message
    onNewMessage: onNewMessage,    // Listen for new messages
    disconnect: disconnect,        // Close connection
    getSocketId: getSocketId,      // Get socket ID
    // ... more methods
};
```

---

## 📊 Common factory patterns in your project:

### **Your `factory/` folder likely contains:**

```
factory/
├── actionheroFactory.js      ← WebSocket connection manager
├── apiFactory.js             ← REST API calls wrapper
├── patientFactory.js         ← Patient data operations
├── appointmentFactory.js     ← Appointment operations
├── treatmentNoteFactory.js   ← Treatment notes operations
├── insuranceFactory.js       ← Insurance operations
├── downloadService.js        ← File download utility
├── sessionFactory.js         ← Session/authentication
├── commonService.js          ← Common utilities
└── ...
```

---

## 🎯 Khi nào dùng Factory?

### **Use factory when:**

✅ **1. Share data between controllers:**
```javascript
// userSessionFactory.js
angular.module('PtEMobile').factory('userSessionFactory', function() {
    var currentUser = null;
    
    return {
        setUser: function(user) {
            currentUser = user;
        },
        getUser: function() {
            return currentUser;
        },
        isLoggedIn: function() {
            return currentUser !== null;
        }
    };
});
```

---

✅ **2. Encapsulate API calls:**
```javascript
// treatmentNoteFactory.js
angular.module('PtEMobile').factory('treatmentNoteFactory',
    function($http, api) {
        return {
            getTreatmentNote: function(noteId) {
                return api.call('v4GetTreatmentNote', { noteId: noteId });
            },
            
            saveTreatmentNote: function(noteData) {
                return api.call('v4SaveTreatmentNote', noteData);
            },
            
            deleteTreatmentNote: function(noteId) {
                return api.call('v4DeleteTreatmentNote', { noteId: noteId });
            },
            
            printTreatmentNote: function(noteId) {
                return api.call('v4PrintTreatmentNote', { noteId: noteId });
            }
        };
    }
);

// Use in controller:
treatmentNoteFactory.getTreatmentNote(noteId).then(function(note) {
    $scope.treatmentNote = note;
});
```

---

✅ **3. Manage external connections (WebSocket, Database):**

Your actionheroFactory.js is perfect example:
```javascript
// Singleton WebSocket connection
actionheroFactory.init();  // Connect once

// Use in any controller
actionheroFactory.sendRoomMessage('room-123', 'Hello');
actionheroFactory.onNewMessage(function(msg) { ... });
```

---

✅ **4. Utility functions:**
```javascript
// commonService.js
angular.module('PtEMobile').factory('commonService', function() {
    return {
        formatDate: function(date) {
            return moment(date).format('MM/DD/YYYY');
        },
        
        formatCurrency: function(amount) {
            return '$' + amount.toFixed(2);
        },
        
        showToast: function(message, duration) {
            // Show toast notification
        },
        
        showPopup: function(title, message, callback) {
            // Show popup
        }
    };
});

// Use anywhere:
var formattedDate = commonService.formatDate(new Date());
var price = commonService.formatCurrency(123.456);
```

---

✅ **5. Complex business logic:**
```javascript
// calculationFactory.js
angular.module('PtEMobile').factory('calculationFactory', function() {
    return {
        calculateInvoiceTotal: function(items, tax, discount) {
            var subtotal = items.reduce(function(sum, item) {
                return sum + (item.price * item.quantity);
            }, 0);
            
            var taxAmount = subtotal * (tax / 100);
            var discountAmount = subtotal * (discount / 100);
            
            return {
                subtotal: subtotal,
                tax: taxAmount,
                discount: discountAmount,
                total: subtotal + taxAmount - discountAmount
            };
        },
        
        calculatePaymentPlan: function(totalAmount, downPayment, months) {
            var remaining = totalAmount - downPayment;
            var monthlyPayment = remaining / months;
            
            return {
                downPayment: downPayment,
                monthlyPayment: monthlyPayment,
                numberOfMonths: months,
                totalAmount: totalAmount
            };
        }
    };
});
```

---

## 📊 Factory vs Service vs Provider:

| Type | Use Case | Syntax | Return Value |
|------|----------|--------|--------------|
| **Factory** | Most common, flexible | `return { ... }` | Object you return |
| **Service** | When you need `this` | Constructor function | Instance (new) |
| **Provider** | Need configuration | `$get` function | Complex config |

---

### **Example comparison:**

**Factory (most common):**
```javascript
angular.module('PtEMobile').factory('myFactory', function() {
    return {
        doSomething: function() { ... }
    };
});
```

**Service (less common):**
```javascript
angular.module('PtEMobile').service('myService', function() {
    this.doSomething = function() { ... };
});
```

**Provider (rare, advanced):**
```javascript
angular.module('PtEMobile').provider('myProvider', function() {
    var config = {};
    
    this.setConfig = function(c) {
        config = c;
    };
    
    this.$get = function() {
        return {
            doSomething: function() {
                // Use config
            }
        };
    };
});
```

---

## 🔍 How to use factory:

### **Step 1: Create factory file:**

```javascript
'use strict';

angular.module('PtEMobile').factory('patientFactory', 
    function($http, $q, api) {
        
        // Private variables (only accessible within factory)
        var cachedPatients = [];
        
        // Private functions
        function _getCachedPatient(patientId) {
            return cachedPatients.find(function(p) {
                return p._id === patientId;
            });
        }
        
        // Public API (returned object)
        return {
            // Get patient by ID
            getPatient: function(patientId) {
                // Check cache first
                var cached = _getCachedPatient(patientId);
                if (cached) {
                    return $q.when(cached);
                }
                
                // Fetch from API
                return api.call('v4GetPatient', { patientId: patientId })
                    .then(function(response) {
                        var patient = response.data;
                        cachedPatients.push(patient);
                        return patient;
                    });
            },
            
            // Get all patients
            getAllPatients: function() {
                return api.call('v4GetAllPatients', {})
                    .then(function(response) {
                        cachedPatients = response.data;
                        return cachedPatients;
                    });
            },
            
            // Save patient
            savePatient: function(patientData) {
                return api.call('v4SavePatient', patientData)
                    .then(function(response) {
                        // Update cache
                        var index = cachedPatients.findIndex(function(p) {
                            return p._id === response.data._id;
                        });
                        if (index > -1) {
                            cachedPatients[index] = response.data;
                        } else {
                            cachedPatients.push(response.data);
                        }
                        return response.data;
                    });
            },
            
            // Clear cache
            clearCache: function() {
                cachedPatients = [];
            }
        };
    }
);
```

---

### **Step 2: Include in index.html:**

```html
<script src="scripts/factory/patientFactory.js"></script>
```

---

### **Step 3: Inject into controller:**

```javascript
angular.module('PtEMobile').controller('PatientCtrl',
    function($scope, patientFactory) {  // ✅ Inject factory
        
        // Use factory methods
        $scope.loadPatient = function(patientId) {
            patientFactory.getPatient(patientId).then(
                function(patient) {
                    $scope.patient = patient;
                },
                function(error) {
                    console.error('Failed to load patient:', error);
                }
            );
        };
        
        $scope.savePatient = function() {
            patientFactory.savePatient($scope.patient).then(
                function(savedPatient) {
                    alert('Patient saved successfully!');
                },
                function(error) {
                    alert('Failed to save patient');
                }
            );
        };
    }
);
```

---

## 📊 Your actionheroFactory.js usage flow:

### **Initialization (in app.js or main controller):**

```javascript
// app.js or main controller
angular.module('PtEMobile').run(
    function($rootScope, actionheroFactory) {
        // Initialize WebSocket connection on app start
        $rootScope.$on('user-logged-in', function() {
            actionheroFactory.init(false, $rootScope.actionheroOptions);
        });
    }
);
```

---

### **Usage in Messages controller:**

```javascript
angular.module('PtEMobile').controller('MessagesCtrl',
    function($scope, actionheroFactory) {
        
        // Listen for new messages
        actionheroFactory.onNewMessage(function(message) {
            console.log('New message:', message);
            $scope.messages.push(message);
            $scope.$apply();
        });
        
        // Send message
        $scope.sendMessage = function() {
            actionheroFactory.sendRoomMessage(
                'room-' + $scope.currentRoom,
                $scope.newMessage
            );
        };
        
        // Cleanup on controller destroy
        $scope.$on('$destroy', function() {
            actionheroFactory.disconnect();
        });
    }
);
```

---

### **Usage in Insurance controller:**

```javascript
angular.module('PtEMobile').controller('InsuranceCtrl',
    function($scope, $rootScope, actionheroFactory) {
        
        // Listen for insurance events via WebSocket
        $scope.$on('insuranceClaimFormListener', function(event, data) {
            console.log('Insurance claim update:', data);
            $scope.refreshClaimList();
        });
        
        // Insurance claim submitted in another tab/device
        // WebSocket notifies this controller automatically!
    }
);
```

---

## 📊 Summary:

| Question | Answer |
|----------|--------|
| **Factory là gì?** | Service pattern for reusable business logic |
| **Dùng để làm gì?** | API calls, data sharing, utilities, WebSocket, etc. |
| **Khi nào dùng?** | Share data/logic between controllers |
| **Khác Controller?** | Controller = UI logic, Factory = business logic |
| **Khác Directive?** | Directive = UI component, Factory = data service |
| **Singleton?** | ✅ YES - One instance shared across app |

---

## ✅ Best practices:

### **1. Return object with public methods:**
```javascript
return {
    publicMethod1: function() { ... },
    publicMethod2: function() { ... }
};
```

### **2. Use private variables for internal state:**
```javascript
var privateData = [];  // Only accessible in factory

return {
    getPrivateData: function() {
        return privateData;
    }
};
```

### **3. Return promises for async operations:**
```javascript
return {
    getData: function() {
        return $http.get('/api/data')
            .then(function(response) {
                return response.data;
            });
    }
};
```

### **4. Use singleton pattern for connections:**
```javascript
var connection = null;  // Singleton

return {
    getConnection: function() {
        if (!connection) {
            connection = createConnection();
        }
        return connection;
    }
};
```

---

**Factories are the backbone of your AngularJS app - they handle business logic, data operations, and external connections so your controllers stay clean and focused on UI! 🎯**