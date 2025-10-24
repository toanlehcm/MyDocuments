import { z } from 'zod'
import { IFieldIntake, IFormSection, IIntakeFormStructure } from '@/lib/types'
import { FIELD_ITEM_TYPE, INTAKE_FORM_TAB, TAB_LABELS } from '@/lib/constants'
import { getSectionKey, toFieldKey } from '@/lib/helper'
import { makeOptionalNullable, validateArrayMaxItems, validateArrayMinItems, validateArrayNotEmpty, validateNumber, validateNumberMax, validateNumberMin, validateRequired, validateStringMaxLength, validateStringMinLength, validateStringNotEmpty } from './Common.schema'

export const baseSchema: Record<FIELD_ITEM_TYPE, z.ZodTypeAny> = {
  [FIELD_ITEM_TYPE.TEXT]: z.string(),
  [FIELD_ITEM_TYPE.TEXTAREA]: z.string(),
  [FIELD_ITEM_TYPE.SELECT]: z.string(),
  [FIELD_ITEM_TYPE.RADIO]: z.string(),
  [FIELD_ITEM_TYPE.CHECKBOX]: z.array(z.string()),
  [FIELD_ITEM_TYPE.DATE_PICKER]: z.string(),
  [FIELD_ITEM_TYPE.MULTIPLE_FILES]: z.array(z.any()),

  // NUMBER fields - Use preprocess to handle empty/null/undefined.
  [FIELD_ITEM_TYPE.NUMBER]: z.preprocess(
    (val) => {
      if (val === '' || val === null || val === undefined) return null

      const num = Number(val)
      // Return null if NaN (prevents "expected number, received NaN" error)
      return isNaN(num) ? null : num
    },
    z.union([z.number(), z.null()])
  ),
  [FIELD_ITEM_TYPE.NUMBER_SELECT]: z.preprocess(
    (val) => {
      if (val === '' || val === null || val === undefined) return null
      const num = Number(val)
      return isNaN(num) ? null : num
    },
    z.union([z.number(), z.null()])
  ),

  [FIELD_ITEM_TYPE.RATING]: z.preprocess(
    (val) => {
      if (val === '' || val === null || val === undefined) return null
      const num = Number(val)
      return isNaN(num) ? null : num
    },
    z.union([z.number(), z.null()])
  )
}

// Generic constraint applier for min/max validations. Works with ZodString, ZodNumber, and ZodArray.
const applyConstraints = <T extends z.ZodString | z.ZodNumber | z.ZodArray<any>>(
  schema: T,
  min: number | undefined,
  max: number | undefined,
  errorPrefix: 'minLength' | 'minValue' | 'minItems'
): T => {
  let result = schema as any

  // Apply min constraint
  // For numbers: apply if min exists (can be 0 or negative)
  // For strings/arrays: apply if min > 1 (min=1 is already covered by required validation)
  if (min != null && min > (errorPrefix === 'minValue' ? -Infinity : 1)) {
    result = result.min(min, `error.${errorPrefix}|${min}`)
  }

  // Apply max constraint
  if (max != null) {
    const maxPrefix = errorPrefix.replace('min', 'max') as 'maxLength' | 'maxValue' | 'maxItems'
    result = result.max(max, `error.${maxPrefix}|${max}`)
  }

  return result as T
}

/* ==================== Validation Helper Functions ==================== */
/**
 * Apply required validation for string-based fields (TEXT, TEXTAREA, SELECT, RADIO, DATE_PICKER).
 * @returns Schema with required validation.
 * @example applyStringRequiredValidation(schema.optional().nullable(), 5, 50)
 */
const applyStringRequiredValidation = (
  schema: z.ZodTypeAny, // Base schema (already marked as optional/nullable if needed).
  min?: number, // Minimum length (optional).
  max?: number // Maximum length (optional).
): z.ZodTypeAny => {
  let result = validateStringNotEmpty(schema)

  if (min != null && min > 1) {
    result = validateStringMinLength(result, min)
  }

  if (max != null) {
    result = validateStringMaxLength(result, max)
  }

  return result
}

/**
 * Apply required validation for number-based fields (NUMBER, NUMBER_SELECT, RATING).
 * @returns Schema with required validation.
 * @example Conditional field (isRequired: true).
 * applyNumberRequiredValidation(schema.optional().nullable(), 0, 10)
 * → Validates: not null, is number, value >= 0, value <= 10
 */
const applyNumberRequiredValidation = (
  schema: z.ZodTypeAny, // Base schema (already marked as optional/nullable if needed).
  min?: number, // Minimum value (optional, can be 0 or negative).
  max?: number // Maximum value (optional).
): z.ZodTypeAny => {
  let result = validateNumber(schema)

  if (min != null) {
    result = validateNumberMin(result, min)
  }

  if (max != null) {
    result = validateNumberMax(result, max)
  }

  return result
}

/**
 * Apply required validation for array-based fields (CHECKBOX, MULTIPLE_FILES).
 * @returns Schema with required validation.
 * @example Conditional field (isRequired: true).
 * applyArrayRequiredValidation(schema.optional().nullable(), 2, 5)
 * → Validates: array.length > 0, array.length >= 2, array.length <= 5
 */
const applyArrayRequiredValidation = (
  schema: z.ZodTypeAny, // Base schema (already marked as optional/nullable if needed).
  min?: number, // Minimum items (optional).
  max?: number // Maximum items (optional).
): z.ZodTypeAny => {
  let result = validateArrayNotEmpty(schema)

  if (min != null && min > 1) {
    result = validateArrayMinItems(result, min)
  }

  if (max != null) {
    result = validateArrayMaxItems(result, max)
  }

  return result
}

const applyConditionalFieldRules = (
  schema: z.ZodTypeAny,
  field: IFieldIntake
): z.ZodTypeAny => {
  // Start as optional (correct when hidden).
  // const result = makeOptionalNullable(schema)
  return makeOptionalNullable(schema)

  // // If field is not required when visible, return early.
  // if (!field.items?.isRequired) {
  //   return result
  // }

  // // Field is required when visible - add runtime validation.
  // const fieldType = field.items?.type ?? FIELD_ITEM_TYPE.TEXT
  // const { min, max } = field.items

  // switch (fieldType) {
  //   // String-based fields.
  //   case FIELD_ITEM_TYPE.TEXT:
  //   case FIELD_ITEM_TYPE.TEXTAREA:
  //   case FIELD_ITEM_TYPE.SELECT:
  //   case FIELD_ITEM_TYPE.RADIO:
  //   case FIELD_ITEM_TYPE.DATE_PICKER:
  //     return applyStringRequiredValidation(result, min, max)

  //   // Number-based fields (RATING, NUMBER, NUMBER_SELECT).
  //   case FIELD_ITEM_TYPE.NUMBER:
  //   case FIELD_ITEM_TYPE.NUMBER_SELECT:
  //   case FIELD_ITEM_TYPE.RATING:
  //     return applyNumberRequiredValidation(result, min, max)

  //   // Array-based fields (CHECKBOX, MULTIPLE_FILES).
  //   case FIELD_ITEM_TYPE.CHECKBOX:
  //   case FIELD_ITEM_TYPE.MULTIPLE_FILES:
  //     return applyArrayRequiredValidation(result, min, max)

  //   default:
  //     return validateRequired(result)
  // }
}

/**
 * Apply validation rules to field schema based on field configuration.
 *
 * Rules priority:
 * 1. Conditional fields (visibleIf) → optional & nullable
 * 2. Non-editable fields → optional & nullable
 * 3. Required validation → based on field type
 * 4. Min/Max validation → from API config (items.min, items.max)
 * 5. Default → optional & nullable
 */
export const applyRules = (
  validator: z.ZodTypeAny,
  field: IFieldIntake
): z.ZodTypeAny => {
  let schema = validator

  // 1. Conditional fields are always optional.
  if (field.visibleIf != null) {
    return applyConditionalFieldRules(schema, field)
  }

  // 2. Non-editable fields are always optional.
  if (!(field.items?.isEditable)) {
    return makeOptionalNullable(schema)
  }

  // 3. Apply required validation based on field type.
  if (field.items?.isRequired && field.visibleIf == null) {
    const fieldType = field.items?.type ?? FIELD_ITEM_TYPE.TEXT
    const { min, max } = field.items

    switch (fieldType) {
      // String-based fields: TEXT, TEXTAREA, SELECT, RADIO, DATE_PICKER
      case FIELD_ITEM_TYPE.TEXT:
      case FIELD_ITEM_TYPE.TEXTAREA:
      case FIELD_ITEM_TYPE.SELECT:
      case FIELD_ITEM_TYPE.RADIO:
      case FIELD_ITEM_TYPE.DATE_PICKER:
        if (schema instanceof z.ZodString) {
          // Apply .trim() before .min(1) to normalize value.
          schema = schema.trim().min(1, 'error.required')

          // Apply min/max length constraints from API.
          if (schema instanceof z.ZodString) {
            schema = applyConstraints(schema, min, max, 'minLength')
          }
        }
        break

      // Number-based fields: NUMBER, NUMBER_SELECT, RATING
      case FIELD_ITEM_TYPE.NUMBER:
      case FIELD_ITEM_TYPE.NUMBER_SELECT:
      case FIELD_ITEM_TYPE.RATING:
        schema = validateRequired(schema)
        schema = validateNumber(schema)

        // Apply min value.
        if (min != null) {
          schema = validateNumberMin(schema, min)
        }

        // Apply max value.
        if (max != null) {
          schema = validateNumberMax(schema, max)
        }
        break

      // Array-based fields: CHECKBOX, MULTIPLE_FILES
      case FIELD_ITEM_TYPE.CHECKBOX:
      case FIELD_ITEM_TYPE.MULTIPLE_FILES:
        if (schema instanceof z.ZodArray) {
          schema = schema.min(1, 'error.required')

          // Apply min/max items constraints from API.
          if (schema instanceof z.ZodArray) {
            schema = applyConstraints(schema, min, max, 'minItems')
          }
        }
        break

      default:
        // Fallback: generic required validation
        schema = validateRequired(schema)
    }
  } else {
    // 4. Non-required fields are optional & nullable.
    return makeOptionalNullable(schema)
  }

  return schema
}

export const generateFieldSchema = (field: IFieldIntake): [string, z.ZodTypeAny] => {
  const type = field.items?.type ?? FIELD_ITEM_TYPE.TEXT
  const validator = baseSchema[type] ?? z.any()
  const schema = applyRules(validator, field)

  // Convert field key from UPPERCASE to camelCase. Ex: GENDER → gender, CHIEF_HEALTH_CONCERNS → chiefHealthConcerns.
  const fieldKey = toFieldKey(field.key)

  return [fieldKey, schema]
}

export const generateSectionSchema = (section: IFormSection): z.ZodTypeAny => {
  const fields = section.fields ?? []
  const shape: Record<string, z.ZodTypeAny> = {}

  // Add fields from section
  for (const field of fields) {
    const [key, schema] = generateFieldSchema(field)
    shape[key] = schema // EX: key = "gender"
  }

  // Add fields from children (Ex: Medical History)
  if (section.children != null) {
    for (const child of section.children) {
      for (const field of child.fields ?? []) {
        const [key, schema] = generateFieldSchema(field)
        shape[key] = schema
      }
    }
  }

  return z.object(shape)
}

export const mapI18nToTabKey = (i18n: string): INTAKE_FORM_TAB | undefined => {
  const entry = Object.entries(TAB_LABELS).find(([_, label]) => label === i18n)
  return (entry != null) ? (entry[0] as INTAKE_FORM_TAB) : undefined
}

// Generate schema with nested structure.
export const generateIntakeFormSchema = (structure: IIntakeFormStructure): z.ZodObject<any> => {
  const shape: Record<string, z.ZodTypeAny> = {}

  for (const section of structure) {
    const sectionKey = getSectionKey(section.name ?? section.i18n)
    const sectionSchema = generateSectionSchema(section)
    shape[sectionKey] = sectionSchema
  }

  return z.object(shape)
}

/* ------------------------ Convert Zod schema to readable format ------------------------------ */
interface SchemaField {
  field: string
  type: string
  required: boolean
  nullable: boolean
  validations?: string[]
}

interface SchemaSection {
  section: string
  fields: SchemaField[]
}

/**
 * Convert Zod schema to readable format
 * @example
 * const readable = formatZodSchema(schemaStructure)
 */
export const formatZodSchema = (schema: z.ZodObject<any>): SchemaSection[] => {
  const sections: SchemaSection[] = []

  Object.entries(schema.shape).forEach(([sectionKey, sectionSchema]) => {
    if (!(sectionSchema instanceof z.ZodObject)) return

    const fields: SchemaField[] = []

    Object.entries(sectionSchema.shape).forEach(([fieldKey, fieldSchema]) => {
      const field: SchemaField = {
        field: fieldKey,
        type: extractTypeName(fieldSchema),
        required: fieldSchema.isOptional() === false,
        nullable: fieldSchema.isNullable(),
        validations: extractValidations(fieldSchema)
      }

      fields.push(field)
    })

    sections.push({
      section: sectionKey,
      fields
    })
  })

  return sections
}

/**
 * Extract type name from Zod schema
 */
const extractTypeName = (schema: z.ZodTypeAny): string => {
  const typeName = schema.constructor.name

  switch (typeName) {
    case 'ZodString':
      return 'string'
    case 'ZodNumber':
      return 'number'
    case 'ZodBoolean':
      return 'boolean'
    case 'ZodArray':
      return 'array'
    case 'ZodObject':
      return 'object'
    case 'ZodDate':
      return 'date'
    default:
      return typeName.replace('Zod', '').toLowerCase()
  }
}

/**
 * Extract validation rules from Zod schema
 */
const extractValidations = (schema: z.ZodTypeAny): string[] => {
  const validations: string[] = []

  // Check if schema has checks (validations)
  if ('_def' in schema && 'checks' in schema._def) {
    const checks = Array.isArray((schema._def as any).checks) ? (schema._def as any).checks : []

    checks.forEach((check: any) => {
      switch (check.kind) {
        case 'min':
          validations.push(`min: ${String(check.value)}`)
          break
        case 'max':
          validations.push(`max: ${String(check.value)}`)
          break
        case 'email':
          validations.push('email')
          break
        case 'regex':
          validations.push(`regex: ${String(check.regex)}`)
          break
        case 'length':
          validations.push(`length: ${String(check.value)}`)
          break
      }
    })
  }

  return validations
}

/**
 * Print schema in a readable format
 */
export const printZodSchema = (schema: z.ZodObject<any>): void => {
  const formatted = formatZodSchema(schema)

  console.group('📋 SCHEMA STRUCTURE (Formatted)')

  formatted.forEach(({ section, fields }) => {
    console.group(`📁 ${section}`)
    console.table(fields)
    console.groupEnd()
  })

  console.groupEnd()
}
