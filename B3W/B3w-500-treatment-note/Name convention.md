NAMING CONVENTION - CHUẨN SENIOR LEVEL
📊 PHÂN TÍCH VẤN ĐỀ HIỆN TẠI
❌ VẤN ĐỀ:

1. FormLayoutSoapNote
   - Tên gợi ý: Layout wrapper
   - Thực tế: Xử lý submit logic + render form
   - Vấn đề: Tên không phản ánh đúng responsibility

2. FormSoapNoteUI
   - Tên gợi ý: UI-only component (presentational)
   - Thực tế: Orchestrate việc render fields
   - Vấn đề: "UI" suffix thường dùng cho pure presentational components

3. RenderFieldSoapNote
   - Tên OK nhưng quá specific (SOAP Note)
   - Vấn đề: Không thể reuse cho forms khác
   - 
✅ NAMING CHUẨN THEO PATTERN
1. Container vs Presentational Pattern
2. ┌─────────────────────────────────────────────────────────────────┐
│ 🎯 CONTAINER COMPONENTS (Smart Components)                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Tên: <Feature>Form.tsx hoặc <Feature>FormContainer.tsx        │
│                                                                  │
│  Responsibility:                                                 │
│  - Manage state (useForm, useState)                             │
│  - Handle business logic (submit, validation)                   │
│  - Connect to hooks/APIs                                        │
│  - Pass data down to presentational components                  │
│                                                                  │
│  Example:                                                        │
│  - SoapNoteForm.tsx                                             │
│  - TreatmentNoteFormContainer.tsx                               │
│  - IntakeFormContainer.tsx                                      │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ 🎯 PRESENTATIONAL COMPONENTS (Dumb Components)                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Tên: <Feature>FormFields.tsx hoặc <Feature>FormContent.tsx    │
│                                                                  │
│  Responsibility:                                                 │
│  - Render UI only                                               │
│  - Receive props from container                                 │
│  - No business logic                                            │
│  - Pure function (same props = same output)                     │
│                                                                  │
│  Example:                                                        │
│  - SoapNoteFormFields.tsx                                       │
│  - TreatmentNoteFormContent.tsx                                 │
│  - IntakeFormFields.tsx                                         │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
🏆 SOLUTION ĐỀ XUẤT
Cấu trúc mới (Chuẩn Industry)
src/app/.../treatment-note/components/form/
├── SoapNoteForm.tsx                    // ✅ Container (Smart)
├── SoapNoteFormFields.tsx             // ✅ Presentational (Dumb)
├── SoapNoteField.tsx                  // ✅ Single field component
└── useSoapNoteForm.ts                 // ✅ Form logic hook
📝 CHI TIẾT TỪNG FILE
1. SoapNoteForm.tsx (Container)
Tên chuẩn:

✅ SoapNoteForm.tsx
✅ TreatmentNoteForm.tsx (nếu muốn tổng quát hơn)
Tại sao:

Suffix Form → Rõ ràng đây là form component
Không có Layout → Tránh nhầm lẫn với layout wrapper
Không có Container → Ngắn gọn nhưng vẫn follow convention
Responsibility:
✅ Handle form submission
✅ Manage form state via hook
✅ Connect to API mutations
✅ Handle loading/error states
✅ Render FormFields component
❌ KHÔNG render chi tiết từng field

Code structure:
// ✅ CHUẨN
export const SoapNoteForm = ({ mode, noteId }: Props) => {
  // Logic layer
  const { formData, handleChange, handleSubmit, isLoading } = useSoapNoteForm({ mode, noteId })
  
  // Event handlers
  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    void handleSubmit()
  }
  
  // Render presentational component
  return (
    <form onSubmit={onSubmit}>
      <SoapNoteFormFields 
        formData={formData}
        handleChange={handleChange}
        isLoading={isLoading}
      />
    </form>
  )
}

2. SoapNoteFormFields.tsx (Presentational)
Tên chuẩn:

✅ SoapNoteFormFields.tsx
✅ SoapNoteFormContent.tsx
❌ SoapNoteFormUI.tsx (UI suffix ít dùng, prefer Fields/Content)
Tại sao:

Suffix Fields → Rõ ràng render tập hợp các fields
Suffix Content → Cũng OK, dùng khi có nhiều hơn fields (headers, footers)
KHÔNG dùng UI → Vì mọi component đều là UI, tên này redundant
Responsibility:

Code structure:

3. SoapNoteField.tsx (Single Field)
Tên chuẩn:

✅ SoapNoteField.tsx
✅ SoapNoteTextarea.tsx (nếu specific hơn)
❌ RenderFieldSoapNote.tsx (Tên quá dài, "Render" prefix thừa)
Tại sao:

Ngắn gọn, rõ ràng
KHÔNG dùng prefix Render → Mọi component đều render, redundant
Nếu muốn reusable → Đặt trong lib/components/fields/
Responsibility:
✅ Render layout của form (spacing, grid)
✅ Orchestrate các field components
✅ Receive props only (no state)
✅ Pure function
❌ KHÔNG có business logic
❌ KHÔNG handle submit
Code structure:
// ✅ CHUẨN
interface Props {
  formData: FormData
  handleChange: (name: string, value: string) => void
  isLoading: boolean
}

export const SoapNoteFormFields = ({ formData, handleChange, isLoading }: Props) => {
  return (
    <div className="space-y-6">
      <SoapNoteField
        name="subjective"
        label="Subjective"
        value={formData.subjective}
        onChange={handleChange}
        disabled={isLoading}
      />
      
      <SoapNoteField
        name="objective"
        label="Objective"
        value={formData.objective}
        onChange={handleChange}
        disabled={isLoading}
      />
      
      {/* ... other fields */}
    </div>
  )
}

🎯 SO SÁNH: TÊN CŨ vs TÊN MỚI
File cũ	Vấn đề	File mới	Lý do
FormLayoutSoapNote.tsx	"Layout" misleading (thực tế handle submit)	SoapNoteForm.tsx	Rõ ràng là form container
FormSoapNoteUI.tsx	"UI" suffix redundant	SoapNoteFormFields.tsx	Rõ ràng render fields
RenderFieldSoapNote.tsx	"Render" prefix thừa, too specific	TextareaField.tsx (in lib/)	Reusable, ngắn gọn
useFormSoapNote.ts	OK	useSoapNoteForm.ts	Consistent với SoapNoteForm
📂 STRUCTURE HOÀN CHỈNH (REFACTORED)
src/
├── lib/
│   └── components/
│       └── fields/                     // ✅ Shared field components
│           ├── TextareaField.tsx       // Reusable cho mọi form
│           ├── RichTextEditor.tsx
│           └── ...
│
└── app/.../treatment-note/
    └── components/
        └── form/
            ├── SoapNoteForm.tsx        // ✅ Container (Smart)
            │   // Responsibility:
            │   // - Handle submit
            │   // - Manage state via hook
            │   // - Render <form> + <SoapNoteFormFields>
            │
            ├── SoapNoteFormFields.tsx  // ✅ Presentational (Dumb)
            │   // Responsibility:
            │   // - Render layout
            │   // - Orchestrate TextareaField components
            │   // - Pure function
            │
            └── useSoapNoteForm.ts      // ✅ Form logic hook
                // Responsibility:
                // - Form state management
                // - Submit logic
                // - API mutations
                // - Return: { formData, handleChange, handleSubmit, isLoading }
🎯 NAMING RULES (MASTER LEVEL)
┌─────────────────────────────────────────────────────────────────┐
│ 🎯 CONTAINER COMPONENTS (Logic + Render)                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Pattern: <Feature>Form.tsx                                     │
│           <Feature>FormContainer.tsx (nếu muốn explicit)        │
│                                                                  │
│  Examples:                                                       │
│  ✅ SoapNoteForm.tsx                                            │
│  ✅ IntakeFormContainer.tsx                                     │
│  ✅ PatientProfileForm.tsx                                      │
│                                                                  │
│  ❌ FormLayoutSoapNote.tsx (Layout misleading)                  │
│  ❌ SoapNoteFormWrapper.tsx (Wrapper vague)                     │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ 🎯 PRESENTATIONAL COMPONENTS (Render only)                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Pattern: <Feature>FormFields.tsx                               │
│           <Feature>FormContent.tsx                              │
│                                                                  │
│  Examples:                                                       │
│  ✅ SoapNoteFormFields.tsx                                      │
│  ✅ IntakeFormContent.tsx                                       │
│  ✅ PatientFormFields.tsx                                       │
│                                                                  │
│  ❌ SoapNoteFormUI.tsx (UI redundant)                           │
│  ❌ FormSoapNoteUI.tsx (Inconsistent order)                     │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ 🎯 SINGLE FIELD COMPONENTS (Reusable atoms)                     │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Pattern: <FieldType>Field.tsx                                  │
│                                                                  │
│  Location: lib/components/fields/ (shared)                      │
│                                                                  │
│  Examples:                                                       │
│  ✅ TextareaField.tsx                                           │
│  ✅ RichTextEditor.tsx                                          │
│  ✅ DatePickerField.tsx                                         │
│                                                                  │
│  ❌ RenderFieldSoapNote.tsx (Too specific)                      │
│  ❌ FieldRenderSoapNote.tsx (Inconsistent order)                │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ 🎯 CUSTOM HOOKS                                                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Pattern: use<Feature>Form.ts                                   │
│                                                                  │
│  Examples:                                                       │
│  ✅ useSoapNoteForm.ts                                          │
│  ✅ useIntakeForm.ts                                            │
│  ✅ usePatientForm.ts                                           │
│                                                                  │
│  ❌ useFormSoapNote.ts (Inconsistent with component name)       │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
💡 TÓM TẮT
ĐỀ XUẤT REFACTOR:
// ❌ CŨ
FormLayoutSoapNote.tsx       → Handle submit + render
FormSoapNoteUI.tsx           → Render fields
RenderFieldSoapNote.tsx      → Single field
useFormSoapNote.ts           → Form logic

// ✅ MỚI (CHUẨN)
SoapNoteForm.tsx             → Handle submit + render (Container)
SoapNoteFormFields.tsx       → Render fields (Presentational)
lib/components/fields/
  TextareaField.tsx          → Reusable single field
useSoapNoteForm.ts           → Form logic (consistent naming)
BENEFITS:
✅ Clear separation of concerns
✅ Consistent naming pattern
✅ Reusable field components
✅ Easy to test (pure functions)
✅ Industry standard convention
✅ Self-documenting code
Kết luận: Áp dụng naming này sẽ làm code clean hơn 300%, maintainable hơn, và follow industry best practices! 🚀