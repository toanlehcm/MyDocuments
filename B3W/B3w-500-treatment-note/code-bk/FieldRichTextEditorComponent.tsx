'use client'

import React, { memo, useState, useEffect, useMemo, JSX } from 'react'
import dynamic from 'next/dynamic'
import { EditorState, ContentState, convertToRaw, convertFromHTML } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import { Typography } from '@/components/atoms'
import { RICHTEXT_TOOLBAR_CONFIG } from '@/lib/constants'
import { countRichTextCharacters } from '@/lib/dynamic-form/schema/fieldSchemas'
import { cn } from '@/utils'
import { RICHTEXT_MAX_LENGTH, RICHTEXT_WARNING_THRESHOLD } from '@/lib/dynamic-form'

// ✅ Dynamic import React Draft Wysiwyg (client-side only)
const Editor = dynamic(
  async () => await import('react-draft-wysiwyg').then((mod) => mod.Editor),
  { ssr: false, loading: () => <div>Loading editor...</div> }
)

interface IFieldRichTextEditorProps {
  name: string
  label: string
  value: string
  onChange: (value: string) => void
  onBlur?: () => void
  error?: string
  required?: boolean
  disabled?: boolean
  placeholder?: string
  helpText?: string
  maxLength?: number
}

const FieldRichTextEditorComponent = ({
  name,
  label,
  value,
  onChange,
  onBlur,
  error,
  required,
  disabled,
  placeholder,
  helpText,
  maxLength = RICHTEXT_MAX_LENGTH
}: IFieldRichTextEditorProps): JSX.Element => {
  // ✅ Initialize editor state from HTML value
  const [editorState, setEditorState] = useState(() => {
    if (value) {
      const blocksFromHTML = convertFromHTML(value)
      const contentState = ContentState.createFromBlockArray(
        blocksFromHTML.contentBlocks,
        blocksFromHTML.entityMap
      )
      return EditorState.createWithContent(contentState)
    }
    return EditorState.createEmpty()
  })

  // ✅ Sync editor state with external value changes
  useEffect(() => {
    const currentContent = editorState.getCurrentContent()
    const currentHTML = draftToHtml(convertToRaw(currentContent))

    // Only update if value changed externally
    if (value !== currentHTML) {
      const blocksFromHTML = convertFromHTML(value || '')
      const contentState = ContentState.createFromBlockArray(
        blocksFromHTML.contentBlocks,
        blocksFromHTML.entityMap
      )
      setEditorState(EditorState.createWithContent(contentState))
    }
  }, [value])

  // ✅ Character count (excluding HTML tags)
  const charCount = useMemo(() => {
    return countRichTextCharacters(value)
  }, [value])

  const isNearLimit = charCount >= maxLength * RICHTEXT_WARNING_THRESHOLD
  const isOverLimit = charCount > maxLength

  // ✅ Handle editor change
  const handleEditorChange = (newEditorState: EditorState): void => {
    setEditorState(newEditorState)

    const contentState = newEditorState.getCurrentContent()
    const html = draftToHtml(convertToRaw(contentState))

    // ✅ Prevent exceeding max length
    const newCharCount = countRichTextCharacters(html)
    if (newCharCount <= maxLength) {
      onChange(html)
    }
  }

  return (
    <div className='space-y-2'>
      {/* Label */}
      <div className='flex items-center justify-between'>
        <Typography
          variant='label-sm'
          className={cn(
            'font-semibold',
            error ? 'text-red-600' : 'text-strong-950'
          )}
        >
          {label}
          {required && <span className='text-red-600 ml-1'>*</span>}
        </Typography>

        {/* Character count */}
        <Typography
          variant='paragraph-xs'
          className={cn(
            'font-medium',
            isOverLimit
              ? 'text-red-600'
              : isNearLimit
                ? 'text-yellow-600'
                : 'text-sub-600'
          )}
        >
          {charCount.toLocaleString()} / {maxLength.toLocaleString()} characters
        </Typography>
      </div>

      {/* Help text */}
      {helpText && (
        <Typography variant='paragraph-xs' className='text-sub-600'>
          {helpText}
        </Typography>
      )}

      {/* Editor */}
      <div className={cn(
        'border rounded-lg overflow-hidden',
        error ? 'border-red-600' : 'border-stroke-soft-200',
        disabled && 'bg-weak-50 cursor-not-allowed opacity-60'
      )}
      >
        <Editor
          editorState={editorState}
          onEditorStateChange={handleEditorChange}
          onBlur={onBlur}
          toolbar={RICHTEXT_TOOLBAR_CONFIG}
          placeholder={placeholder}
          readOnly={disabled}
          editorClassName='min-h-[120px] px-3 py-2 text-sm'
          toolbarClassName='border-b border-stroke-soft-200 bg-weak-50'
          wrapperClassName='bg-white'
        />
      </div>

      {/* Warning message */}
      {isNearLimit && !isOverLimit && (
        <Typography variant='paragraph-xs' className='text-yellow-600 font-medium'>
          ⚠️ There are {(maxLength - charCount).toLocaleString()} characters left
        </Typography>
      )}

      {/* Error message */}
      {error && (
        <Typography variant='paragraph-xs' className='text-red-600 font-medium'>
          {error}
        </Typography>
      )}
    </div>
  )
}

/**
 * ✅ MEMOIZED VERSION - Chỉ re-render khi value, error, hoặc disabled thay đổi
 */
export const FieldRichTextEditor = memo(FieldRichTextEditorComponent, (prevProps, nextProps) => {
  return (
    prevProps.value === nextProps.value &&
    prevProps.error === nextProps.error &&
    prevProps.disabled === nextProps.disabled &&
    prevProps.required === nextProps.required
  )
})

FieldRichTextEditor.displayName = 'FieldRichTextEditor'
