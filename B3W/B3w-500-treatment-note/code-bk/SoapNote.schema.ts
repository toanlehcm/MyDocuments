import { z } from 'zod'
import { IFieldValidators, ISoapNoteField, ISoapNoteStructure } from '@/lib/types'
import { isNotNull } from '@/lib/helper'
import { FIELD_ITEM_TYPE } from '@/lib/dynamic-form'

/**
 * 🎯 BASE SCHEMAS - Shared package
 */

// ✅ Custom validator cho RichText Editor
const validateRichText = (val: string): boolean => {
  // Remove HTML tags to count actual text
  const textOnly = val.replace(/<[^>]*>/g, '')
  const trimmed = textOnly.trim()

  // Check if empty (considering empty HTML tags like <p></p>)
  if (trimmed === '' || val === '<p></p>' || val === '<p><br></p>') {
    return false
  }

  return true
}

const countRichTextChars = (val: string): number => {
  const textOnly = val.replace(/<[^>]*>/g, '')
  return textOnly.length
}

export const FIELD_BASE_SCHEMAS: Record<FIELD_ITEM_TYPE, z.ZodTypeAny> = {
  [FIELD_ITEM_TYPE.TEXT]: z.string(),

  [FIELD_ITEM_TYPE.TEXTAREA]: z.string(),

  // ✅ RICHTEXT_EDITOR với custom validation
  [FIELD_ITEM_TYPE.RICHTEXT_EDITOR]: z.string()
    .transform(val => val?.trim() ?? '')
    .refine(validateRichText, {
      message: 'This field cannot be empty'
    }),

  [FIELD_ITEM_TYPE.NUMBER]: z.preprocess(
    (val) => {
      if (val === '' || val === null || val === undefined) return null
      const num = Number(val)
      return isNaN(num) ? null : num
    },
    z.union([z.number(), z.null()])
  ),

  [FIELD_ITEM_TYPE.DATE_PICKER]: z.string(),
  [FIELD_ITEM_TYPE.TIME_PICKER]: z.string(),
  [FIELD_ITEM_TYPE.SELECT]: z.string(),
  [FIELD_ITEM_TYPE.RADIO]: z.string(),
  [FIELD_ITEM_TYPE.CHECKBOX]: z.array(z.string()),
  [FIELD_ITEM_TYPE.MULTIPLE_FILES]: z.array(z.any()),
  [FIELD_ITEM_TYPE.SIGNATURE]: z.string().url()
}

export const applyValidators = (
  baseSchema: z.ZodTypeAny,
  validators?: IFieldValidators,
  fieldType?: FIELD_ITEM_TYPE
): z.ZodTypeAny => {
  if (!isNotNull(validators)) return baseSchema

  let schema = baseSchema

  // Required
  if (isNotNull(validators?.required)) {
    // Already handled by base schema
  } else {
    schema = schema.optional()
  }

  // ✅ Max length cho RichText Editor (count text only, not HTML)
  if (fieldType === FIELD_ITEM_TYPE.RICHTEXT_EDITOR && validators?.max != null) {
    const maxChars = validators.max
    schema = schema.refine(
      (val: string) => countRichTextChars(val) <= maxChars,
      {
        message: `Maximum ${maxChars} characters allowed`
      }
    )
  }

  // Min/Max cho string thường
  if (schema instanceof z.ZodString && fieldType !== FIELD_ITEM_TYPE.RICHTEXT_EDITOR) {
    if (validators.min !== undefined) {
      schema = schema.min(validators.min)
    }
    if (validators.max !== undefined) {
      schema = schema.max(validators.max)
    }
  }

  // Min/Max cho number
  if (schema instanceof z.ZodNumber) {
    if (validators.min !== undefined) {
      schema = schema.min(validators.min)
    }
    if (validators.max !== undefined) {
      schema = schema.max(validators.max)
    }
  }

  // Pattern (regex)
  if (validators.pattern && schema instanceof z.ZodString) {
    schema = schema.regex(new RegExp(validators.pattern))
  }

  // Custom validator
  if (validators.custom != null) {
    schema = schema.refine(validators.custom)
  }

  return schema
}

/**
 * Helper: Count characters in rich text (excluding HTML)
 */
export const countRichTextCharacters = (html: string): number => {
  return countRichTextChars(html)
}

export const generateSoapNoteSchema = (structure: ISoapNoteStructure | null): z.ZodObject<z.ZodRawShape> => {
  const schemaFields: Record<string, z.ZodTypeAny> = {}

  if (!isNotNull(structure) || !isNotNull(structure?.sections) || structure?.sections.length === 0) {
    return z.object({})
  }

  structure?.sections.forEach((section: ISoapNoteField) => {
    let fieldSchema = z.string().trim()

    if (isNotNull(section.validators?.required) && section.validators.required === true) {
      fieldSchema = fieldSchema.min(1, 'error.required')
    }

    if (isNotNull(section.validators?.max)) {
      const maxLength = Number(section.validators.max)
      fieldSchema = fieldSchema.max(maxLength, `error.maxLength|${maxLength}`)
    }

    schemaFields[section.key] = fieldSchema
  })

  return z.object(schemaFields)
}

export type TypeSoapNoteSchema = z.infer<ReturnType<typeof generateSoapNoteSchema>>
