/**
   * ❌ Note.md: Schema của CHỈ 1 TAB hiện tại
   * 
   * KHÔNG CẦN THIẾT - Đây là ANTI-PATTERN!
   * 
   * Structure:
   * {
   *   firstName: z.string().min(1, 'Required'),
   *   gender: z.string().min(1, 'Required'),
   *   chiefHealthConcerns: z.string().min(1, 'Required')
   * }
   * 
   * VẤN ĐỀ:
   * - Schema chỉ có flat fields (firstName, gender)
   * - Nhưng form values có nested structure (basicInformation.firstName)
   * - → Zod KHÔNG TÌM THẤY fields để validate
   * - → form.trigger() luôn return true (không có lỗi vì không validate gì cả)
   * 
   * ❌ XÓA BIẾN NÀY ĐI!
   */
  // const intakeFormSchema = schemaStructure instanceof z.ZodObject
  //   ? schemaStructure.shape?.[currentTab]
  //   : undefine
----------------------
[API returns structure]
        ↓
useMemo → generateIntakeFormSchema(structure)
        ↓
useMemo → pick schema for currentTab
        ↓
useForm({ resolver: zodResolver(currentSchema) })
        ↓
renderBodyForm(currentTab)  
------------------
- Flow prefill name.
    1. field.value = "Daniel" (từ react-hook-form)
       ↓
    2. FieldInput render
       ↓
    3. TextInput nhận baseInputProps
       ↓
    4. BaseInput nhận inputProps.value ← ❌ THIẾU Ở ĐÂY
       ↓
    5. Input.Input render với value ← Không có value nên rỗng
- Flow prefill date:
    1. value = "2006-10-01" (string)
       ↓
    2. Check: value == null? → No, continue
       ↓
    3. Check: value instanceof Date? → No, continue
       ↓
    4. Check: typeof value === 'string'? → Yes
       ↓
    5. convertUTCToLocalDateTime("2006-10-01")
       ↓ returns { formatDate: "10/01/2006", time: "12:00 AM" }
       ↓
    6. Parse "10/01/2006" → new Date(2006, 9, 1)
       ↓
    7. Return: Sun Oct 01 2006 00:00:00 GMT+0700 ✅
- Flow show error message from RHF to Field component:
    User nhập sai → Zod validate
                        ↓
             RHF set fieldState.error
                        ↓
             FormController render với fieldState
                        ↓
             fieldState.error?.message → hintErrorProps
                        ↓
         TextInput hiển thị error message
-------------
Nguyên nhân: SELECT field có default value = null, Zod check type trước khi check .min(1), nên throw generic error message thay vì custom message.

Giải pháp: Thay đổi default value của SELECT/RADIO từ null → '' (empty string) để nhất quán với các string-based fields khác.

Áp dụng fix này là validation message nhất quán cho tất cả fields! 🚀

---------------

  * 4. If using intakeFormSchema (only 1 tab):
  *   - Schema: { firstName: z.string() }
  *   - Form values: { basicInformation: { firstName: '' } }
  *   - → MISMATCH! Zod did not find 'firstName' at root level
  *   - → Validation did NOT work!

---------------

Sau khi fix:
// Base schema:
z.string()  // ✅ No .trim()

// Apply rules:
z.string().trim().min(1, 'error.required')

// Value: null
// Validation: z.string().trim().min(1).parse(null)
// Step 1: z.string() check type → null không phải string
// Step 2: .trim() normalize → skip (vì null)
// Step 3: .min(1) check → Error!
// ✅ Error: "error.required" (custom message)

----------------

Truoc khi fix:
// Base schema:
z.string().trim()

// Value: null
// Validation: z.string().trim().min(1).parse(null)
// ❌ Error: "Invalid input: expected string, received null"
// → .trim() chạy TRƯỚC min(1)
// → null không phải string → throw error ngay
// → min(1) KHÔNG được check!

-----------

.trim() làm schema accept null và return error message khác
.trim() nên được apply TRONG applyRules sau khi check required

----------------

useEffect(() => {
  if (schemaStructure instanceof z.ZodObject) {
    // ✅ Convert to JSON-serializable format
    const schemaJSON = {
      sections: Object.entries(schemaStructure.shape).map(([sectionKey, sectionSchema]) => {
        if (!(sectionSchema instanceof z.ZodObject)) return null

        return {
          section: sectionKey,
          fields: Object.entries(sectionSchema.shape).map(([fieldKey, fieldSchema]) => ({
            name: fieldKey,
            type: fieldSchema._def.typeName,
            required: !fieldSchema.isOptional(),
            nullable: fieldSchema.isNullable()
          }))
        }
      }).filter(Boolean)
    }

    // ✅ Pretty print JSON
    console.log('📋 Schema as JSON:')
    console.log(JSON.stringify(schemaJSON, null, 2))
  }
}, [schemaStructure])