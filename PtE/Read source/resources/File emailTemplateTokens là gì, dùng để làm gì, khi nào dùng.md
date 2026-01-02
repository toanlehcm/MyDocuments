# File emailTemplateTokens.js - Email Template Token Configuration

## 📘 File này là gì?

**emailTemplateTokens.js** là file **configuration/resource** chứa danh sách các **email template tokens** (biến thay thế) được dùng trong hệ thống email tự động của PtEverywhere.

---

## 🎯 Dùng để làm gì?

### **1. Define available tokens for each email template:**

```javascript
const RESOURCES_EMAIL_TEMPLATES_TOKENS = {
  "AlertMessageStandard": [ // Appointment Reminder email
    {
      tokenName: "clientname",           // Token name: {{clientname}}
      description: "Full name of client" // What it represents
    },
    {
      tokenName: "datetime",
      description: "Date and time of appointment"
    },
    {
      tokenName: "location",
      description: "Location of appointment"
    }
  ]
}
```

**Purpose:** Cho phép admin customize email templates với dynamic data

---

## 📊 Cách hoạt động:

### **Step 1: Admin tạo email template với tokens:**

```html
<!-- Email Template Editor in Admin Portal -->
<h2>Appointment Reminder</h2>

<p>Dear {{clientname}},</p>

<p>This is a reminder for your appointment with {{attendeename}}.</p>

<p><strong>Service:</strong> {{service}}</p>
<p><strong>Date & Time:</strong> {{datetime}}</p>
<p><strong>Location:</strong> {{location}}</p>

<p>Click here to view your schedule: {{link-to-schedule}}</p>

<p>Best regards,<br>Your therapy team</p>
```

---

### **Step 2: System replaces tokens with real data:**

```javascript
// Backend replaces tokens when sending email
var emailBody = template.body; // Contains {{clientname}}, {{datetime}}, etc.

// Replace tokens with actual data
emailBody = emailBody.replace('{{clientname}}', patient.fullName);
emailBody = emailBody.replace('{{datetime}}', appointment.datetime);
emailBody = emailBody.replace('{{location}}', appointment.location);
emailBody = emailBody.replace('{{service}}', appointment.serviceName);
emailBody = emailBody.replace('{{link-to-schedule}}', scheduleUrl);

// Send email
sendEmail(patient.email, emailSubject, emailBody);
```

---

### **Step 3: Patient receives personalized email:**

```
Subject: Appointment Reminder

Dear John Smith,

This is a reminder for your appointment with Dr. Sarah Johnson.

Service: Physical Therapy Session
Date & Time: May 15, 2024 at 2:00 PM
Location: Downtown Clinic - Room 203

Click here to view your schedule: https://app.pteverywhere.com/schedule

Best regards,
Your therapy team
```

---

## 🎯 Khi nào dùng?

### **Use Case 1: Admin customizes email templates**

```javascript
// In Email Settings page
angular.module('PtEMobile').controller('EmailSettingsCtrl',
    function($scope, RESOURCES_EMAIL_TEMPLATES_TOKENS) {
        
        // Get available tokens for selected template type
        $scope.selectTemplateType = function(templateType) {
            // Get tokens for this template
            $scope.availableTokens = RESOURCES_EMAIL_TEMPLATES_TOKENS[templateType];
            
            /* Result for "AlertMessageStandard":
            [
              {tokenName: "clientname", description: "Full name of client"},
              {tokenName: "datetime", description: "Date and time of appointment"},
              {tokenName: "location", description: "Location of appointment"},
              ...
            ]
            */
        };
        
        // Insert token into email editor
        $scope.insertToken = function(token) {
            var editor = $scope.emailEditor;
            editor.insertText('{{' + token.tokenName + '}}');
        };
    }
);
```

---

### **Use Case 2: Display token reference in UI**

```html
<!-- Email Template Editor -->
<div class="email-template-editor">
  <h3>Edit Email Template: Appointment Reminder</h3>
  
  <!-- Email editor (CKEditor or similar) -->
  <textarea ng-model="emailTemplate.body" ck-editor></textarea>
  
  <!-- Token reference panel -->
  <div class="token-reference">
    <h4>Available Tokens</h4>
    <p>Click to insert into email:</p>
    
    <table>
      <tr ng-repeat="token in availableTokens">
        <td>
          <button ng-click="insertToken(token)">
            {{{{token.tokenName}}}}
          </button>
        </td>
        <td>{{token.description}}</td>
      </tr>
    </table>
  </div>
</div>
```

**Result:**
```
Available Tokens:
[Insert] {{clientname}}         Full name of client
[Insert] {{datetime}}           Date and time of appointment
[Insert] {{location}}           Location of appointment
[Insert] {{service}}            Name of service/class
[Insert] {{link-to-schedule}}   Link to Schedule of client
```

---

### **Use Case 3: Validate email templates**

```javascript
// Validate that only allowed tokens are used
function validateEmailTemplate(templateType, templateBody) {
    // Get allowed tokens for this template type
    var allowedTokens = RESOURCES_EMAIL_TEMPLATES_TOKENS[templateType];
    var allowedTokenNames = allowedTokens.map(t => t.tokenName);
    
    // Extract tokens from template body
    var usedTokens = templateBody.match(/{{([^}]+)}}/g) || [];
    usedTokens = usedTokens.map(t => t.replace(/{{|}}/g, ''));
    
    // Check for invalid tokens
    var invalidTokens = usedTokens.filter(function(token) {
        return !allowedTokenNames.includes(token);
    });
    
    if (invalidTokens.length > 0) {
        alert('Invalid tokens used: ' + invalidTokens.join(', '));
        return false;
    }
    
    return true;
}

// Usage:
$scope.saveEmailTemplate = function() {
    if (validateEmailTemplate($scope.templateType, $scope.templateBody)) {
        // Save template
        api.call('SaveEmailTemplate', {
            type: $scope.templateType,
            body: $scope.templateBody
        });
    }
};
```

---

## 📊 Complete list of email template types:

### **Patient-facing emails:**

```javascript
"AlertMessage"                              // Personal event reminder
"AlertMessageStandard"                      // Appointment reminder
"ConfirmAppointmentBookedForPatient"        // New appointment confirmation
"ConfirmAppointmentChanged"                 // Rescheduled appointment
"ConfirmAppointmentDeletedForPatient"       // Canceled appointment
"CompleteRegistrationPatient"               // Patient registration
"CompleteRegistrationSelfPatient"           // Self-registration
"RemindAvailableOpeningToPatient"           // Waitlist opening
"NewExercisesAssigned"                      // New exercises
"DocumentSubmitted"                         // Document submitted
"PaymentSuccessfullyProcessed"              // Payment success
"PaymentError"                              // Payment failed
```

---

### **Provider-facing emails:**

```javascript
"ConfirmAppointmentBookedForTherapist"      // New appointment (to provider)
"ConfirmAppointmentDeletedForProvider"      // Canceled appointment (to provider)
"ConfirmAppointmentBookedByPatient"         // Patient self-booked
"CompleteRegistrationTherapist"             // Therapist registration
```

---

### **Admin/Receptionist emails:**

```javascript
"ConfirmAppointmentBookedForAdmin"          // New appointment (to admin)
"ConfirmAppointmentDeletedForAdmin"         // Canceled appointment (to admin)
"NotifyNewSelfRegistrationPatient"          // New self-registered patient
"ReminderNewOrUpdateWaitlistToClinicUser"   // Waitlist update
"RemindAvailableOpeningToClinicUser"        // Opening available
```

---

### **System emails:**

```javascript
"ChangePassword"                            // Password reset
"CompleteRegistrationClinic"                // Clinic registration
```

---

### **Subscription emails (Stripe/Billing):**

```javascript
"SubscriptionOnTrialExpired"
"SubscriptionOnPaymentSuccessful"
"SubscriptionOnPaymentSuccessFullStarter"
"SubscriptionRecurringPaymentSuccessful"
"SubscriptionRecurringPaymentSuccessfulUpcomingIsTerminated"
"SubscriptionOnDueAmountPaidSuccessfulSuspendedPlan"
"SubscriptionPaymentFailed1stAttempt"
"SubscriptionPaymentRetryFailed2ndOr3rdAttempt"
"SubscriptionAccountLockedAfter4thFailedAttempt"
"SubscriptionUpcomingPlanScheduled"
"SubscriptionUpcomingPlanScheduledAutoFromStarterToStandard"
"SubscriptionCancelledBySA"
"SubscriptionExceedingUserLimitBeforeScheduledPlanStarts"
"SubscriptionSupportNeeded"
```

---

## 📊 Token categories:

### **1. Person tokens:**

```javascript
{tokenName: "clientname", description: "Full name of client"}
{tokenName: "client-first-name", description: "First Name of client"}
{tokenName: "providername", description: "Full name of provider"}
{tokenName: "provider-first-name", description: "First Name of provider"}
{tokenName: "attendeename", description: "Full name of provider of appointment"}
{tokenName: "receiver", description: "Full name of the email receiver"}
{tokenName: "username", description: "Full name of the email receiver"}
{tokenName: "appointmentbooker", description: "Name of person who books"}
{tokenName: "appointmentcanceler", description: "Name of person who cancels"}
{tokenName: "sender", description: "Name of person who submits document"}
```

---

### **2. Appointment tokens:**

```javascript
{tokenName: "service", description: "Name of service/class"}
{tokenName: "service-duration", description: "Duration of Service/Class"}
{tokenName: "datetime", description: "Date and time of appointment"}
{tokenName: "old-datetime", description: "Date before reschedule"}
{tokenName: "new-datetime", description: "Date after reschedule"}
{tokenName: "location", description: "Location of appointment"}
{tokenName: "new-location", description: "Location after reschedule"}
{tokenName: "note", description: "Note in appointment"}
{tokenName: "reason", description: "Reason for canceled appointment"}
```

---

### **3. Link tokens:**

```javascript
{tokenName: "link-to-login-portal", description: "Link to Login portal"}
{tokenName: "link-to-schedule", description: "Link to Schedule of client"}
{tokenName: "link-to-document", description: "Link to Document tab"}
{tokenName: "link-to-add-payment", description: "Link to Payment Info"}
{tokenName: "link-to-subscription", description: "Subscribe to appointments"}
{tokenName: "link-to-request", description: "Link to waitlist request"}
{tokenName: "link-to-wait-list", description: "Link to Wait List tab"}
{tokenName: "link-to-available-opening", description: "Link to available block"}
{tokenName: "link", description: "Link to document/exercise"}
{tokenName: "password", description: "Link to reset password"}
```

---

### **4. Subscription/Billing tokens:**

```javascript
{tokenName: "clinicname", description: "Name of clinic"}
{tokenName: "amount", description: "Payment amount"}
{tokenName: "planname", description: "Subscription plan name"}
{tokenName: "billingdate", description: "Billing date"}
{tokenName: "finalduedate", description: "Final due date"}
{tokenName: "nextbillingdate", description: "Next billing date"}
{tokenName: "startdate", description: "Plan start date"}
{tokenName: "enddate", description: "Plan end date"}
{tokenName: "scheduleddate", description: "Scheduled date"}
{tokenName: "date", description: "Generic date"}
{tokenName: "loginurl", description: "Login URL"}
{tokenName: "subscriptionurl", description: "Subscription management URL"}
{tokenName: "clinicurl", description: "Clinic URL"}
{tokenName: "userandroleurl", description: "User and Role management URL"}
```

---

## 🔍 How tokens are used in backend:

### **Example: Appointment Reminder email**

```javascript
// Backend (Node.js/ActionHero)
function sendAppointmentReminderEmail(appointment) {
    // Get email template
    var template = getEmailTemplate('AlertMessageStandard');
    var emailBody = template.body;
    var emailSubject = template.subject;
    
    // Get patient data
    var patient = getPatient(appointment.patientId);
    var provider = getProvider(appointment.providerId);
    var service = getService(appointment.serviceId);
    var location = getLocation(appointment.locationId);
    
    // Replace tokens
    emailBody = emailBody.replace(/{{clientname}}/g, patient.fullName);
    emailBody = emailBody.replace(/{{client-first-name}}/g, patient.firstName);
    emailBody = emailBody.replace(/{{provider-first-name}}/g, provider.firstName);
    emailBody = emailBody.replace(/{{attendeename}}/g, provider.fullName);
    emailBody = emailBody.replace(/{{service}}/g, service.name);
    emailBody = emailBody.replace(/{{service-duration}}/g, service.duration + ' minutes');
    emailBody = emailBody.replace(/{{datetime}}/g, formatDateTime(appointment.datetime));
    emailBody = emailBody.replace(/{{location}}/g, location.name);
    emailBody = emailBody.replace(/{{note}}/g, appointment.note || '');
    
    // Replace link tokens
    var patientPortalUrl = config.patientPortalUrl;
    emailBody = emailBody.replace(/{{link-to-login-portal}}/g, patientPortalUrl + '/login');
    emailBody = emailBody.replace(/{{link-to-schedule}}/g, patientPortalUrl + '/schedule');
    emailBody = emailBody.replace(/{{link-to-document}}/g, patientPortalUrl + '/documents');
    emailBody = emailBody.replace(/{{link-to-add-payment}}/g, patientPortalUrl + '/account/payment');
    
    // Send email
    sendEmail(patient.email, emailSubject, emailBody);
}
```

---

## 📊 Frontend usage in Email Settings:

### **Controller example:**

```javascript
angular.module('PtEMobile').controller('EmailSettingsCtrl',
    function($scope, $http, api, RESOURCES_EMAIL_TEMPLATES_TOKENS) {
        
        // List of email template types
        $scope.emailTemplateTypes = [
            {value: 'AlertMessage', label: 'Personal Event Reminder'},
            {value: 'AlertMessageStandard', label: 'Appointment Reminder'},
            {value: 'ConfirmAppointmentBookedForPatient', label: 'New Appointment'},
            {value: 'ConfirmAppointmentChanged', label: 'Rescheduled Appointment'},
            // ... more types
        ];
        
        // Load email template
        $scope.loadTemplate = function(templateType) {
            api.call('v4GetEmailTemplate', {type: templateType}).then(
                function(response) {
                    $scope.currentTemplate = response.data;
                    
                    // Get available tokens for this template
                    $scope.availableTokens = 
                        RESOURCES_EMAIL_TEMPLATES_TOKENS[templateType] || [];
                    
                    // Filter out "HideOnSetting" tokens
                    $scope.availableTokens = $scope.availableTokens.filter(
                        token => token.description !== 'HideOnSetting'
                    );
                }
            );
        };
        
        // Insert token at cursor position
        $scope.insertToken = function(tokenName) {
            var editor = CKEDITOR.instances['emailBodyEditor'];
            editor.insertText('{{' + tokenName + '}}');
        };
        
        // Save template
        $scope.saveTemplate = function() {
            // Validate tokens
            if (!validateTemplate($scope.currentTemplate.type, 
                                  $scope.currentTemplate.body)) {
                return;
            }
            
            api.call('v4SaveEmailTemplate', $scope.currentTemplate).then(
                function(response) {
                    alert('Template saved successfully!');
                },
                function(error) {
                    alert('Failed to save template');
                }
            );
        };
        
        // Validate template tokens
        function validateTemplate(templateType, templateBody) {
            var allowedTokens = RESOURCES_EMAIL_TEMPLATES_TOKENS[templateType];
            var allowedTokenNames = allowedTokens.map(t => t.tokenName);
            
            // Extract tokens from body
            var tokenRegex = /{{([^}]+)}}/g;
            var matches = templateBody.match(tokenRegex) || [];
            var usedTokens = matches.map(m => m.replace(/{{|}}/g, ''));
            
            // Check for invalid tokens
            var invalidTokens = usedTokens.filter(function(token) {
                return !allowedTokenNames.includes(token);
            });
            
            if (invalidTokens.length > 0) {
                alert('Invalid tokens: ' + invalidTokens.join(', '));
                return false;
            }
            
            return true;
        }
        
        // Preview email with sample data
        $scope.previewEmail = function() {
            var preview = $scope.currentTemplate.body;
            
            // Replace with sample data
            $scope.availableTokens.forEach(function(token) {
                var sampleValue = getSampleValue(token.tokenName);
                preview = preview.replace(
                    new RegExp('{{' + token.tokenName + '}}', 'g'),
                    sampleValue
                );
            });
            
            // Show preview dialog
            showPreviewDialog(preview);
        };
        
        function getSampleValue(tokenName) {
            var sampleData = {
                'clientname': 'John Smith',
                'client-first-name': 'John',
                'providername': 'Dr. Sarah Johnson',
                'service': 'Physical Therapy Session',
                'datetime': 'May 15, 2024 at 2:00 PM',
                'location': 'Downtown Clinic - Room 203',
                'note': 'Please arrive 10 minutes early',
                'link-to-schedule': 'https://app.pteverywhere.com/schedule'
            };
            return sampleData[tokenName] || '{{' + tokenName + '}}';
        }
    }
);
```

---

## 📊 View example:

```html
<div class="email-template-editor">
  <h2>Email Template Settings</h2>
  
  <!-- Template type selector -->
  <div class="form-group">
    <label>Email Template Type:</label>
    <select ng-model="selectedTemplateType" 
            ng-change="loadTemplate(selectedTemplateType)">
      <option ng-repeat="type in emailTemplateTypes" 
              value="{{type.value}}">
        {{type.label}}
      </option>
    </select>
  </div>
  
  <!-- Subject -->
  <div class="form-group">
    <label>Subject:</label>
    <input type="text" ng-model="currentTemplate.subject">
  </div>
  
  <!-- Body editor -->
  <div class="form-group">
    <label>Email Body:</label>
    <textarea id="emailBodyEditor" 
              ng-model="currentTemplate.body" 
              ck-editor></textarea>
  </div>
  
  <!-- Available tokens panel -->
  <div class="token-panel">
    <h3>Available Tokens</h3>
    <p>Click to insert into email:</p>
    
    <div class="token-list">
      <div class="token-item" ng-repeat="token in availableTokens">
        <button class="btn-insert-token" 
                ng-click="insertToken(token.tokenName)">
          {{{{token.tokenName}}}}
        </button>
        <span class="token-description">{{token.description}}</span>
      </div>
    </div>
  </div>
  
  <!-- Actions -->
  <div class="actions">
    <button ng-click="previewEmail()">Preview</button>
    <button ng-click="saveTemplate()">Save</button>
    <button ng-click="resetTemplate()">Reset to Default</button>
  </div>
</div>
```

---

## 🚨 Special "HideOnSetting" tokens:

```javascript
"SubscriptionOnTrialExpired": [
  {tokenName: "clinicname", description: "HideOnSetting"},
  {tokenName: "date", description: "HideOnSetting"},
  {tokenName: "loginurl", description: "HideOnSetting"},
]
```

**Meaning:** 
- These tokens have `description: "HideOnSetting"`
- They are **system-managed** and should NOT be shown in UI
- Used only by system, not customizable by admin
- Filter them out in frontend:

```javascript
$scope.availableTokens = $scope.availableTokens.filter(
    token => token.description !== 'HideOnSetting'
);
```

---

## 📊 Summary:

| Question | Answer |
|----------|--------|
| **File này là gì?** | Configuration of email template tokens |
| **Dùng để làm gì?** | Define available dynamic variables for each email type |
| **Khi nào dùng?** | When admin edits email templates, when backend sends emails |
| **Tokens là gì?** | Dynamic placeholders like `{{clientname}}`, `{{datetime}}` |
| **Ai dùng?** | Admin (customize templates), Backend (replace with real data) |
| **Format?** | `{{tokenName}}` in email body → Replaced with actual data |

---

## ✅ Complete workflow:

```
1. Admin opens Email Settings
   ↓
2. Selects template type (e.g., "Appointment Reminder")
   ↓
3. System loads RESOURCES_EMAIL_TEMPLATES_TOKENS["AlertMessageStandard"]
   ↓
4. Shows available tokens in UI
   ↓
5. Admin customizes email, inserts tokens like {{clientname}}
   ↓
6. Saves template to database
   ↓
7. Patient books appointment
   ↓
8. System triggers "send appointment reminder"
   ↓
9. Backend loads template from database
   ↓
10. Replaces {{clientname}} with "John Smith"
    Replaces {{datetime}} with "May 15, 2024 at 2:00 PM"
    etc.
   ↓
11. Sends personalized email to patient
   ↓
12. Patient receives email with real data (not tokens)
```

---

**emailTemplateTokens.js is the dictionary that defines what dynamic data can be inserted into email templates - it's the bridge between template customization (frontend) and email personalization (backend)! 📧**