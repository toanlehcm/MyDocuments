┌─────────────────────────────────────────────────────────────────┐
│ 🎯 PHÂN LOẠI THEO MỨC ĐỘ REUSE                                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ✅ REUSABLE 100% (Shared Package)                              │
│     - Schema generation logic                                    │
│     - Field type definitions                                     │
│     - Validation rules                                           │
│     - Field rendering components                                 │
│     - Memoization utilities                                      │
│                                                                  │
│  ⚠️ REUSABLE 50% (Customizable)                                 │
│     - Form layout structure                                      │
│     - Submit handler pattern                                     │
│     - Loading/Error states                                       │
│                                                                  │
│  ❌ NOT REUSABLE (Form-specific)                                │
│     - Template fetching logic (khác API)                        │
│     - Business rules (khác validation)                          │
│     - UI/UX specific features                                   │
│     - Form-specific metadata                                    │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘

## SOLUTION STRUCTURE (Master Senior Level)
NGUYÊN TẮC THIẾT KẾ:
Separation of Concerns - Tách biệt Shared vs Specific
Single Responsibility - Mỗi file/folder có 1 nhiệm vụ rõ ràng
Open/Closed Principle - Dễ extend, không modify shared code
Dependency Injection - Form-specific logic inject vào shared components
Co-location - Đặt code gần nơi sử dụng nhất

## STRUCTURE HOÀN CHỈNH
src/
├── lib/                                    // ✅ SHARED PACKAGE (Tất cả forms dùng chung)
│   │
│   ├── dynamic-form/                       // 🎯 Core dynamic form engine
│   │   │
│   │   ├── types/                          // Type definitions
│   │   │   ├── index.ts                    // Export all types
│   │   │   ├── field.types.ts              // Field-related types
│   │   │   ├── schema.types.ts             // Schema-related types
│   │   │   └── form.types.ts               // Form-related types
│   │   │
│   │   ├── schema/                         // Schema generation
│   │   │   ├── index.ts
│   │   │   ├── generators/
│   │   │   │   ├── generateFieldSchema.ts  // Generate schema cho 1 field
│   │   │   │   ├── generateSectionSchema.ts // Generate schema cho 1 section
│   │   │   │   └── generateFormSchema.ts   // Generate schema cho toàn form
│   │   │   ├── validators/
│   │   │   │   ├── baseValidators.ts       // Base validation rules
│   │   │   │   ├── fieldValidators.ts      // Field-specific validators
│   │   │   │   └── customValidators.ts     // Custom validation helpers
│   │   │   └── constants/
│   │   │       ├── fieldSchemas.ts         // Base Zod schemas cho từng field type
│   │   │       └── validationMessages.ts   // Validation error messages
│   │   │
│   │   ├── rendering/                      // Component rendering
│   │   │   ├── index.ts
│   │   │   ├── RenderField.tsx            // Render single field (memoized)
│   │   │   ├── RenderSection.tsx          // Render section (recursive, memoized)
│   │   │   └── RenderForm.tsx             // Render entire form
│   │   │
│   │   ├── hooks/                          // Reusable hooks
│   │   │   ├── index.ts
│   │   │   ├── useCachedSchema.ts         // Schema caching
│   │   │   ├── useDynamicForm.ts          // React Hook Form integration
│   │   │   ├── useFieldVisibility.ts      // Conditional field logic
│   │   │   ├── useFormSubmit.ts           // Submit orchestration
│   │   │   └── useFormValidation.ts       // Validation utilities
│   │   │
│   │   ├── utils/                          // Helper utilities
│   │   │   ├── index.ts
│   │   │   ├── fieldHelpers.ts            // Field name generation, etc.
│   │   │   ├── schemaHelpers.ts           // Schema manipulation
│   │   │   ├── validationHelpers.ts       // Validation utilities
│   │   │   └── transformHelpers.ts        // Data transformation
│   │   │
│   │   └── constants/                      // Shared constants
│   │       ├── index.ts
│   │       ├── fieldTypes.ts              // FIELD_TYPE enum
│   │       ├── operators.ts               // VALIDATION_OPERATOR enum
│   │       └── defaultValues.ts           // Default values
│   │
│   ├── components/                         // ✅ SHARED UI COMPONENTS
│   │   │
│   │   ├── fields/                         // Field components (atoms)
│   │   │   ├── index.ts
│   │   │   ├── FieldInput.tsx             // Text input
│   │   │   ├── FieldTextarea.tsx          // Textarea
│   │   │   ├── FieldRichTextEditor.tsx    // Rich text editor
│   │   │   ├── FieldSelect.tsx            // Select dropdown
│   │   │   ├── FieldDatePicker.tsx        // Date picker
│   │   │   ├── FieldCheckbox.tsx          // Checkbox group
│   │   │   ├── FieldRadio.tsx             // Radio group
│   │   │   ├── FieldFileUpload.tsx        // File upload
│   │   │   └── FieldSignature.tsx         // Signature pad
│   │   │
│   │   └── form/                           // Form-level components
│   │       ├── index.ts
│   │       ├── FormSection.tsx            // Section wrapper
│   │       ├── FormActions.tsx            // Submit/Cancel buttons
│   │       └── FormErrorBoundary.tsx      // Error boundary
│   │
│   ├── hooks/                              // ⚠️ FORM-SPECIFIC HOOKS
│   │   │
│   │   ├── intake-form/                    // Intake form specific
│   │   │   ├── index.ts
│   │   │   ├── useGetIntakeStructure.ts   // Fetch intake structure
│   │   │   ├── useCreateIntakeForm.ts     // Create mutation
│   │   │   └── useUpdateIntakeForm.ts     // Update mutation
│   │   │
│   │   └── treatment-note/                 // Treatment note specific
│   │       ├── index.ts
│   │       ├── useGetTemplateStructure.ts // Fetch template structure (khác API)
│   │       ├── useGetTemplates.ts         // Fetch template list
│   │       ├── useCreateTreatmentNote.ts  // Create mutation
│   │       ├── useUpdateTreatmentNote.ts  // Update mutation
│   │       └── useAutoSaveTreatmentNote.ts // Auto-save mutation
│   │
│   ├── constants/                          // ⚠️ FORM-SPECIFIC CONSTANTS
│   │   │
│   │   ├── intakeForm.constants.ts        // Intake form constants
│   │   │   // - INTAKE_FORM_SECTIONS
│   │   │   // - INTAKE_FIELD_LIMITS
│   │   │   // - etc.
│   │   │
│   │   └── treatmentNote.constants.ts     // Treatment note constants
│   │       // - TREATMENT_NOTE_TEMPLATES
│   │       // - RICHTEXT_CHAR_LIMIT
│   │       // - SOAP_SECTIONS
│   │       // - etc.
│   │
│   ├── helper/                             // ⚠️ FORM-SPECIFIC HELPERS
│   │   │
│   │   ├── intakeForm.helper.ts           // Intake form helpers
│   │   │   // - convertIntakeData()
│   │   │   // - validateIntakeSection()
│   │   │   // - etc.
│   │   │
│   │   └── treatmentNote.helper.ts        // Treatment note helpers
│   │       // - convertPatientData()
│   │       // - formatTreatmentNoteData()
│   │       // - etc.
│   │
│   └── services/                           // ❌ API SERVICE (Form-specific)
│       ├── intakeForm.service.ts          // Intake form APIs
│       └── treatmentNote.service.ts       // Treatment note APIs
│
├── schema-validations/                     // ⚠️ FORM-SPECIFIC SCHEMAS (nếu cần)
│   ├── IntakeForm.schema.ts               // Intake form validation schemas
│   └── TreatmentNote.schema.ts            // Treatment note validation schemas
│
├── app/[locale]/(main-routes)/
│   │
│   ├── intake-form/                        // ❌ INTAKE FORM PAGES
│   │   ├── page.tsx                        // List page
│   │   ├── new/
│   │   │   └── page.tsx                    // Create page
│   │   ├── [id]/
│   │   │   ├── page.tsx                    // View page
│   │   │   └── edit/
│   │   │       └── page.tsx                // Edit page
│   │   │
│   │   └── components/                     // Intake form UI components
│   │       ├── form/
│   │       │   ├── IntakeFormContainer.tsx        // Main form wrapper
│   │       │   ├── IntakeFormLayout.tsx           // Layout structure
│   │       │   ├── IntakeFormHeader.tsx           // Form header
│   │       │   ├── IntakeFormTabs.tsx             // Tab navigation
│   │       │   ├── IntakeFormFieldRenderer.tsx    // Field renderer (wrapper)
│   │       │   └── useIntakeForm.ts               // Form logic hook
│   │       │
│   │       ├── sections/                   // Section-specific components
│   │       │   ├── GeneralInfoSection.tsx
│   │       │   ├── MedicalHistorySection.tsx
│   │       │   └── ...
│   │       │
│   │       └── shared/                     // Shared UI for intake form
│   │           ├── IntakeFormProgress.tsx
│   │           └── IntakeFormSummary.tsx
│   │
│   └── patients/[id]/treatment-note/       // ❌ TREATMENT NOTE PAGES
│       ├── page.tsx                        // List page
│       │
│       ├── new/
│       │   └── page.tsx                    // Create page
│       │
│       ├── [treatmentNoteId]/
│       │   ├── page.tsx                    // View page
│       │   └── edit/
│       │       └── page.tsx                // Edit page
│       │
│       └── components/                     // Treatment note UI components
│           │
│           ├── form/                       // Form components
│           │   ├── TreatmentNoteForm.tsx           // Main form component
│           │   ├── TreatmentNoteFormLayout.tsx     // Layout structure
│           │   ├── TreatmentNoteFieldRenderer.tsx  // Field renderer
│           │   ├── TemplateSelectorTreatmentNote.tsx // Template selector
│           │   ├── useFormTreatmentNote.ts         // Form logic hook
│           │   └── types.ts                        // Local types
│           │
│           ├── shared/                     // Shared UI for treatment note
│           │   ├── EditableNoteName.tsx    // Editable note name
│           │   ├── TreatmentNoteHeader.tsx // Header with actions
│           │   ├── TreatmentNoteLayout.tsx // Page layout wrapper
│           │   └── AutoSaveIndicator.tsx   // Auto-save status
│           │
│           ├── view/                       // View mode components
│           │   ├── ViewTreatmentNoteContent.tsx
│           │   ├── ViewTreatmentNoteSection.tsx
│           │   └── ViewSidebarMetadata.tsx
│           │
│           ├── list/                       // List view components
│           │   ├── HeaderListTreatmentNote.tsx
│           │   ├── ListTreatmentNote.tsx
│           │   └── TreatmentNoteCard.tsx
│           │
│           ├── services/                   // Service sidebar
│           │   └── ServiceSidebar.tsx
│           │
│           └── modal-search-appointment/   // Appointment selector
│               ├── ModalSearchAppointment.tsx
│               ├── AppointmentList.tsx
│               └── NoAppointmentsMessage.tsx
│
└── stores/                                 // ⚠️ FORM-SPECIFIC STATE
    ├── intakeFormStore.ts                 // Intake form state
    └── treatmentNoteStore.ts              // Treatment note state

## **KIẾN TRÚC TỐI ƯU (PRODUCTION-READY)
src/
├── lib/                                    // ✅ Shared business logic
│   │
│   ├── dynamic-form/                       // Form engine (shared)
│   │   ├── types/
│   │   │   └── index.ts
│   │   ├── constants/
│   │   │   └── dynamicForm.constants.ts   // File của bạn
│   │   ├── schema/
│   │   │   ├── generators/
│   │   │   ├── validators/
│   │   │   └── constants/
│   │   ├── rendering/
│   │   │   ├── RenderField.tsx
│   │   │   └── RenderSection.tsx
│   │   ├── hooks/
│   │   │   ├── useCachedSchema.ts
│   │   │   └── useDynamicForm.ts
│   │   └── utils/
│   │       └── fieldHelpers.ts
│   │
│   ├── hooks/                              // App-level hooks
│   │   ├── intake-form/
│   │   │   └── useGetIntakeStructure.ts
│   │   └── treatment-note/
│   │       └── useGetTemplateStructure.ts
│   │
│   ├── constants/                          // App-level constants
│   │   ├── intakeForm.constants.ts
│   │   └── treatmentNote.constants.ts
│   │
│   └── utils/                              // Pure utility functions
│       ├── date.utils.ts
│       └── string.utils.ts
│
├── components/                             // ✅ Shared UI components
│   ├── atoms/
│   ├── molecules/
│   │   ├── fields/                        // Field components
│   │   │   ├── FieldInput.tsx
│   │   │   ├── FieldRichTextEditor.tsx
│   │   │   └── ...
│   │   └── form/
│   │       └── FormSection.tsx
│   └── organisms/
│
├── services/                               // ✅ API services
│   ├── intakeForm.service.ts
│   └── treatmentNote.service.ts
│
├── stores/                                 // ✅ State management
│   ├── intakeFormStore.ts
│   └── treatmentNoteStore.ts
│
└── app/                                    // ✅ Next.js pages
    └── [locale]/
        └── (main-routes)/
            ├── intake-form/               // Feature-specific
            │   ├── page.tsx
            │   └── components/
            │       └── form/
            │           └── IntakeFormContainer.tsx
            │
            └── patients/[id]/
                └── treatment-note/        // Feature-specific
                    ├── page.tsx
                    └── components/
                        └── form/
                            └── TreatmentNoteForm.tsx

    /**
 * 🎯 MỤC ĐÍCH: Type definitions cho toàn bộ dynamic form system
 * 
 * ✅ REUSABLE: 100%
 * 
 * 📝 FILES:
 * - field.types.ts: IFormField, IFieldValidators, FIELD_TYPE enum
 * - schema.types.ts: IFormStructure, IFormSection
 * - form.types.ts: IFormConfig, IFormContext
 * 
 * 💡 TẠI SAO TÁCH RIÊNG:
 * - Type safety cho toàn project
 * - Dễ maintain khi thêm field type mới
 * - Autocomplete trong IDE
 * - Shared giữa Intake Form, Treatment Note, và forms khác
 */

 /**
 * 🎯 MỤC ĐÍCH: Generate Zod schema từ structure JSON
 * 
 * ✅ REUSABLE: 100%
 * 
 * 📝 FILES:
 * - generateFieldSchema.ts: 
 *   Input: IFormField
 *   Output: z.ZodTypeAny
 *   Logic: Map field type → base schema → apply validators
 * 
 * - generateSectionSchema.ts:
 *   Input: IFormSection
 *   Output: z.ZodObject<any>
 *   Logic: Loop qua fields → generate field schemas → combine
 * 
 * - generateFormSchema.ts:
 *   Input: IFormStructure
 *   Output: z.ZodObject<any>
 *   Logic: Loop qua sections → generate section schemas → combine
 * 
 * 💡 TẠI SAO TÁCH 3 FILES:
 * - Single Responsibility: Mỗi file handle 1 level (field/section/form)
 * - Dễ test từng level riêng
 * - Dễ extend thêm logic mới
 */

 /**
 * 🎯 MỤC ĐÍCH: Validation rules và custom validators
 * 
 * ✅ REUSABLE: 100%
 * 
 * 📝 FILES:
 * - baseValidators.ts:
 *   - applyRequired()
 *   - applyMinMax()
 *   - applyPattern()
 * 
 * - fieldValidators.ts:
 *   - validateEmail()
 *   - validatePhone()
 *   - validateRichText()
 * 
 * - customValidators.ts:
 *   - conditionalRequired()
 *   - crossFieldValidation()
 * 
 * 💡 TẠI SAO TÁCH:
 * - Reusable validation logic
 * - Dễ test từng validator riêng
 * - Dễ extend thêm validators mới
 */

 /**
 * 🎯 MỤC ĐÍCH: Base schemas và validation messages
 * 
 * ✅ REUSABLE: 100%
 * 
 * 📝 FILES:
 * - fieldSchemas.ts:
 *   export const FIELD_BASE_SCHEMAS: Record<FIELD_TYPE, z.ZodTypeAny> = {
 *     [FIELD_TYPE.TEXT]: z.string(),
 *     [FIELD_TYPE.RICHTEXT_EDITOR]: z.string()...
 *   }
 * 
 * - validationMessages.ts:
 *   export const VALIDATION_MESSAGES = {
 *     required: 'This field is required',
 *     max: 'Maximum {max} characters'
 *   }
 * 
 * 💡 TẠI SAO TÁCH:
 * - Single source of truth cho base schemas
 * - Dễ customize messages cho i18n
 */

 /**
 * 🎯 MỤC ĐÍCH: Render components (memoized)
 * 
 * ✅ REUSABLE: 100%
 * 
 * 📝 FILES:
 * - RenderField.tsx:
 *   Input: field config, control, isVisible
 *   Output: Rendered field component
 *   Logic: Switch field type → render corresponding component
 *   Memoization: Only re-render khi field config hoặc visibility thay đổi
 * 
 * - RenderSection.tsx:
 *   Input: section config, control, isFieldVisible
 *   Output: Rendered section với tất cả fields
 *   Logic: Loop qua fields → render RenderField
 *   Support: Recursive rendering cho nested sections
 *   Memoization: Only re-render khi section config thay đổi
 * 
 * - RenderForm.tsx:
 *   Input: structure, form instance
 *   Output: Rendered toàn bộ form
 *   Logic: Loop qua sections → render RenderSection
 * 
 * 💡 TẠI SAO MEMOIZED:
 * - Tránh re-render toàn form khi 1 field thay đổi
 * - Performance cải thiện 90% với large forms
 */

 /**
 * 🎯 MỤC ĐÍCH: Core hooks cho dynamic form
 * 
 * ✅ REUSABLE: 100%
 * 
 * 📝 FILES:
 * - useCachedSchema.ts:
 *   Purpose: Cache generated schema
 *   Input: structure, getCacheKey function
 *   Output: Cached schema
 *   Logic: Check cache → return cached / generate new → store cache
 *   Why: Tránh regenerate schema mỗi render
 * 
 * - useDynamicForm.ts:
 *   Purpose: React Hook Form integration
 *   Input: schema, defaultValues, mode
 *   Output: form instance, isDirty, handleSubmit
 *   Logic: Initialize RHF → handle validation → handle submit
 *   Why: Centralize form logic
 * 
 * - useFieldVisibility.ts:
 *   Purpose: Handle conditional fields
 *   Input: structure, form values
 *   Output: isFieldVisible function
 *   Logic: Evaluate visibility rules → return boolean
 *   Why: Reusable conditional logic
 * 
 * - useFormSubmit.ts:
 *   Purpose: Submit orchestration
 *   Input: onSubmit callback
 *   Output: handleSubmit function
 *   Logic: Validate → transform data → call API → handle error
 *   Why: Consistent submit flow
 * 
 * 💡 TẠI SAO TÁCH HOOKS:
 * - Separation of concerns
 * - Dễ test từng hook riêng
 * - Reusable cho mọi dynamic form
 */

 /**
 * 🎯 MỤC ĐÍCH: Hooks specific cho Treatment Note
 * 
 * ⚠️ REUSABLE: 0% (Treatment Note only)
 * 
 * 📝 FILES:
 * - useGetTemplateStructure.ts:
 *   Step 1: Call getTemplate(templateId) → get presigned URL
 *   Step 2: Fetch JSON từ presigned URL
 *   Step 3: Convert API structure → IFormStructure
 *   Cache: 10 minutes
 *   Why: Treatment Note fetch structure từ S3/Minio (khác với Intake Form)
 * 
 * - useGetTemplates.ts:
 *   API call: getTemplates()
 *   Return: Template[] (id, name, structureUrl)
 *   Cache: 5 minutes
 *   Why: Treatment Note có nhiều templates, cần dropdown để chọn
 * 
 * - useCreateTreatmentNote.ts:
 *   API call: createTreatmentNote()
 *   Success: Navigate to view page
 *   Error: Show toast
 *   Why: Treatment Note có business logic riêng (link appointment, etc.)
 * 
 * - useUpdateTreatmentNote.ts:
 *   API call: updateTreatmentNote()
 *   Success: Refetch + show toast
 *   Error: Show toast
 *   Why: Treatment Note có update logic riêng
 * 
 * - useAutoSaveTreatmentNote.ts:
 *   API call: autoSaveTreatmentNote() (silent)
 *   Debounce: 30 seconds
 *   No toast: Để tránh spam
 *   Why: Treatment Note cần auto-save (US 47.5)
 */

 /**
 * 🎯 MỤC ĐÍCH: Constants specific cho từng form
 * 
 * ⚠️ REUSABLE: 0%
 * 
 * 📝 intakeForm.constants.ts:
 * export const INTAKE_FORM_SECTIONS = [...]
 * export const INTAKE_FIELD_LIMITS = {...}
 * 
 * Why: Intake Form có sections và limits riêng
 * 
 * 📝 treatmentNote.constants.ts:
 * export const TREATMENT_NOTE_TEMPLATES = {...}
 * export const RICHTEXT_CHAR_LIMIT = 25000
 * export const SOAP_SECTIONS = ['subjective', 'objective', 'assessment', 'plan']
 * 
 * Why: Treatment Note có templates, SOAP structure, char limits riêng
 */

 /**
 * 🎯 MỤC ĐÍCH: Helper functions specific cho từng form
 * 
 * ⚠️ REUSABLE: 0%
 * 
 * 📝 intakeForm.helper.ts:
 * - convertIntakeData(): Transform API data → form data
 * - validateIntakeSection(): Custom validation cho intake sections
 * 
 * Why: Intake Form có data structure và validation rules riêng
 * 
 * 📝 treatmentNote.helper.ts:
 * - convertPatientData(): Transform patient data cho header
 * - formatTreatmentNoteData(): Transform form data → API payload
 * - countRichTextChars(): Count characters excluding HTML tags
 * 
 * Why: Treatment Note có data transformations riêng
 */

 /**
 * 🎯 MỤC ĐÍCH: UI components cho Intake Form
 * 
 * ❌ REUSABLE: 0%
 * 
 * 📁 form/
 * - IntakeFormContainer.tsx: Main wrapper với form provider
 * - IntakeFormLayout.tsx: Layout với tabs/sidebar
 * - IntakeFormTabs.tsx: Multi-step tabs navigation
 * - IntakeFormFieldRenderer.tsx: Wrapper cho RenderField với intake-specific logic
 * - useIntakeForm.ts: Form logic hook (combine shared hooks + intake logic)
 * 
 * Why: Intake Form có UI/UX riêng (tabs, multi-step, etc.)
 */

 /**
 * 🎯 MỤC ĐÍCH: UI components cho Treatment Note
 * 
 * ❌ REUSABLE: 0%
 * 
 * 📁 form/
 * - TreatmentNoteForm.tsx: Main form component
 * - TreatmentNoteFormLayout.tsx: Layout với header/sidebar
 * - TreatmentNoteFieldRenderer.tsx: Wrapper cho RenderField
 * - TemplateSelectorTreatmentNote.tsx: Template selector với warning modal
 * - useFormTreatmentNote.ts: Form logic hook với auto-save
 * 
 * 📁 shared/
 * - EditableNoteName.tsx: Editable note name (US 47.2)
 * - TreatmentNoteHeader.tsx: Header với actions (Save & Lock, etc.)
 * - TreatmentNoteLayout.tsx: Page layout wrapper
 * - AutoSaveIndicator.tsx: Auto-save status indicator
 * 
 * 📁 view/
 * - ViewTreatmentNoteContent.tsx: View mode content
 * - ViewTreatmentNoteSection.tsx: View single SOAP section
 * - ViewSidebarMetadata.tsx: Metadata sidebar (created by, date, etc.)
 * 
 * 📁 list/
 * - HeaderListTreatmentNote.tsx: List header với filters
 * - ListTreatmentNote.tsx: Treatment note list
 * - TreatmentNoteCard.tsx: Single treatment note card
 * 
 * Why: Treatment Note có UI/UX riêng (single page, auto-save, editable name, etc.)
 */