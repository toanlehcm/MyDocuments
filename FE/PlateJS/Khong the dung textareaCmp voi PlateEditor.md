┌─────────────────────────────────────────────────────────────────┐
│ TEXTAREA vs PLATEEDITOR ARCHITECTURE                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│ TextareaCmp (Simple Input):                                     │
│ ┌──────────────────────────────────────────────────────────┐   │
│ │ FieldWrapper                                              │   │
│ │  └─ Textarea.Root                                        │   │
│ │      ├─ <textarea> (native HTML element)                │   │
│ │      └─ CharCounter                                      │   │
│ └──────────────────────────────────────────────────────────┘   │
│                                                                  │
│ PlateEditor (Rich Text):                                        │
│ ┌──────────────────────────────────────────────────────────┐   │
│ │ PlateController                                           │   │
│ │  └─ Plate (Slate.js instance)                            │   │
│ │      ├─ Toolbar (Bold, Italic, Undo...)                 │   │
│ │      └─ PlateEditorTextarea                              │   │
│ │          └─ Textarea.Root (wrapper only)                 │   │
│ │              ├─ PlateContent (Slate editor)              │   │
│ │              └─ CharCounter                              │   │
│ └──────────────────────────────────────────────────────────┘   │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
KEY DIFFERENCES:
1. STATE MANAGEMENT:
   TextareaCmp: React controlled state (value, onChange)
   PlateEditor: Slate.js editor state (complex JSON tree)

2. CONTENT TYPE:
   TextareaCmp: Plain text string
   PlateEditor: Rich text nodes (array of objects)

3. INTEGRATION:
   TextareaCmp: Direct <textarea> → React Hook Form
   PlateEditor: Custom getValue() → Transform → React Hook Form

4. UI STRUCTURE:
   TextareaCmp: Single component
   PlateEditor: Multiple nested components + controllers