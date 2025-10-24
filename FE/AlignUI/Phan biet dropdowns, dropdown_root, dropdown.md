# 🎯 Phân biệt `dropdowns`, `dropdown_root`, `dropdown` trong DayPicker

## 📊 Visual Hierarchy

```
┌─────────────────────────────────────────────────────────┐
│                    dropdowns                            │  ← Container for ALL dropdowns
│  ┌──────────────────────────────────────────────────┐  │
│  │            dropdown_root                         │  │  ← Single dropdown wrapper
│  │  ┌────────────────────────────────────────────┐ │  │
│  │  │          dropdown                          │ │  │  ← The <select> element
│  │  │  ┌──────────────────────────────────────┐ │ │  │
│  │  │  │  October        ▼                    │ │ │  │
│  │  │  └──────────────────────────────────────┘ │ │  │
│  │  └────────────────────────────────────────────┘ │  │
│  └──────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────┐  │
│  │            dropdown_root                         │  │  ← Another dropdown wrapper
│  │  ┌────────────────────────────────────────────┐ │  │
│  │  │          dropdown                          │ │  │
│  │  │  ┌──────────────────────────────────────┐ │ │  │
│  │  │  │  2024           ▼                    │ │ │  │
│  │  │  └──────────────────────────────────────┘ │ │  │
│  │  └────────────────────────────────────────────┘ │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

---

## 🔍 HTML Structure

```html
<!-- Generated HTML when captionLayout="dropdown" -->

<div class="dropdowns">              ← UI.Dropdowns (container)
  
  <!-- Month Dropdown -->
  <div class="dropdown_root">         ← UI.DropdownRoot (wrapper 1)
    <select class="dropdown">         ← UI.Dropdown (<select> element)
      <option value="0">January</option>
      <option value="1">February</option>
      ...
      <option value="9" selected>October</option>
      ...
    </select>
  </div>
  
  <!-- Year Dropdown -->
  <div class="dropdown_root">         ← UI.DropdownRoot (wrapper 2)
    <select class="dropdown">         ← UI.Dropdown (<select> element)
      <option value="2020">2020</option>
      <option value="2021">2021</option>
      ...
      <option value="2024" selected>2024</option>
      ...
    </select>
  </div>
  
</div>
```

---

## 📝 Detailed Breakdown

### 1️⃣ **`dropdowns` (UI.Dropdowns)** - Container for ALL dropdowns

```typescript
classNames={{
  dropdowns: cn(
    // ✅ Layout for multiple dropdowns (month + year)
    'flex',              // Flexbox layout
    'gap-2',            // Space between dropdowns
    'items-center',     // Vertical alignment
    'justify-center',   // Horizontal alignment
  ),
}}
```

**Vai trò:**
- 📦 Container chứa TẤT CẢ dropdowns (month + year)
- 📐 Định nghĩa layout giữa các dropdowns
- 🎨 Spacing và alignment

**Visual:**
```
┌────────────────────────────────────┐
│   [October ▼]    [2024 ▼]        │  ← dropdowns (flex container)
│        ↑              ↑            │
│    dropdown_root  dropdown_root   │
└────────────────────────────────────┘
```

---

### 2️⃣ **`dropdown_root` (UI.DropdownRoot)** - Wrapper cho TỪNG dropdown

```typescript
classNames={{
  dropdown_root: cn(
    // ✅ Individual dropdown wrapper
    'relative',         // Position context for icon
    'inline-flex',      // Inline flex container
    'items-center',     // Vertical center
  ),
}}
```

**Vai trò:**
- 📦 Wrapper cho 1 dropdown riêng lẻ (month HOẶC year)
- 🎨 Position context cho custom icon
- 📐 Layout cho dropdown + icon

**Visual:**
```
┌─────────────────────────┐
│  dropdown_root          │  ← Wrapper (for month)
│  ┌───────────────────┐  │
│  │ October      ▼   │  │  ← dropdown (<select>)
│  └───────────────────┘  │
└─────────────────────────┘

┌─────────────────────────┐
│  dropdown_root          │  ← Wrapper (for year)
│  ┌───────────────────┐  │
│  │ 2024         ▼   │  │  ← dropdown (<select>)
│  └───────────────────┘  │
└─────────────────────────┘
```

---

### 3️⃣ **`dropdown` (UI.Dropdown)** - The `<select>` element itself

```typescript
classNames={{
  dropdown: cn(
    // ✅ The actual <select> element styling
    'appearance-none',           // Remove default browser arrow
    'px-3 py-2',                // Padding
    'pr-8',                     // Extra padding for custom arrow
    'rounded-lg',               // Border radius
    'border border-gray-300',   // Border
    'bg-white',                 // Background
    'text-sm font-medium',      // Typography
    'cursor-pointer',           // Cursor style
    
    // Focus state
    'focus:outline-none',
    'focus:ring-2 focus:ring-blue-500',
    
    // Hover state
    'hover:border-gray-400',
  ),
}}
```

**Vai trò:**
- 🎨 Style cho `<select>` element
- 🖱️ Interactive states (hover, focus)
- 📝 Typography và spacing
- ⬇️ Custom arrow handling

---

## 📊 Comparison Table

| Element | HTML Tag | Purpose | Parent | Contains |
|---------|----------|---------|--------|----------|
| **`dropdowns`** | `<div>` | Container for all dropdowns | Caption | Multiple `dropdown_root` |
| **`dropdown_root`** | `<div>` | Wrapper for single dropdown | `dropdowns` | One `dropdown` |
| **`dropdown`** | `<select>` | The actual select element | `dropdown_root` | `<option>` elements |

---

## 🎨 Visual Examples

### Example 1: Default Styling

```typescript
<DayPicker
  captionLayout="dropdown"  // Enable dropdowns
  classNames={{
    dropdowns: 'flex gap-4 items-center',
    dropdown_root: 'relative',
    dropdown: 'px-3 py-2 border rounded-lg appearance-none',
  }}
/>
```

**Result:**
```
┌───────────────────────────────────────┐
│  ┌─────────────┐  ┌──────────────┐   │
│  │ October  ▼ │  │ 2024      ▼ │   │
│  └─────────────┘  └──────────────┘   │
└───────────────────────────────────────┘
    ↑                      ↑
  Month dropdown       Year dropdown
```

---

### Example 2: Custom Arrow Icon

```typescript
classNames={{
  dropdowns: 'flex gap-2',
  
  dropdown_root: cn(
    'relative',
    // ✅ Custom arrow using ::after
    'after:content-["▼"]',
    'after:absolute',
    'after:right-2',
    'after:top-1/2',
    'after:-translate-y-1/2',
    'after:pointer-events-none',
    'after:text-gray-500',
  ),
  
  dropdown: cn(
    'appearance-none',  // Remove default arrow
    'pr-8',            // Space for custom arrow
    'px-3 py-2',
    'border rounded-lg',
  ),
}}
```

**Visual:**
```
┌────────────────────────┐
│  dropdown_root         │
│  ┌──────────────────┐  │
│  │ October       ▼ │  │  ← Custom arrow (::after)
│  └──────────────────┘  │
│       ↑                │
│    dropdown (<select>) │
└────────────────────────┘
```

---

### Example 3: Stacked Layout (Vertical)

```typescript
classNames={{
  dropdowns: 'flex flex-col gap-2',  // ✅ Vertical layout
  dropdown_root: 'w-full',
  dropdown: 'w-full px-3 py-2 border rounded-lg',
}}
```

**Result:**
```
┌─────────────────┐
│  October     ▼ │  ← Month dropdown
└─────────────────┘
┌─────────────────┐
│  2024        ▼ │  ← Year dropdown
└─────────────────┘
```

---

### Example 4: Side-by-side with Different Widths

```typescript
classNames={{
  dropdowns: 'flex gap-2',
  
  // Month dropdown (wider)
  dropdown_root: cn(
    'relative',
    'first:flex-1',  // First dropdown (month) takes more space
  ),
  
  // Year dropdown (narrower)
  // (second dropdown_root will be default width)
  
  dropdown: 'w-full px-3 py-2 border rounded-lg',
}}
```

**Result:**
```
┌─────────────────────────┬──────────────┐
│  October             ▼ │ │ 2024     ▼ │ │
└─────────────────────────┴──────────────┘
        ↑ Wider                ↑ Narrower
```

---

## 🔧 Real-World Styling Example

```typescript
import { DayPicker } from 'react-day-picker';

<DayPicker
  captionLayout="dropdown"
  fromYear={2020}
  toYear={2030}
  classNames={{
    // ========================================
    // dropdowns - Container for month + year
    // ========================================
    dropdowns: cn(
      'flex',              // Horizontal layout
      'gap-2',            // 8px space between dropdowns
      'items-center',     // Vertical center
      'justify-center',   // Horizontal center
    ),
    
    // ========================================
    // dropdown_root - Wrapper for each dropdown
    // ========================================
    dropdown_root: cn(
      'relative',          // For positioning custom arrow
      'inline-flex',       // Inline flex container
      
      // ✅ Custom arrow icon
      'after:content-[""]',
      'after:absolute',
      'after:right-3',
      'after:top-1/2',
      'after:-translate-y-1/2',
      'after:w-0 after:h-0',
      'after:border-l-[4px] after:border-l-transparent',
      'after:border-r-[4px] after:border-r-transparent',
      'after:border-t-[5px] after:border-t-gray-600',
      'after:pointer-events-none',
    ),
    
    // ========================================
    // dropdown - The <select> element
    // ========================================
    dropdown: cn(
      // Reset default styles
      'appearance-none',
      
      // Spacing
      'px-3 py-2',
      'pr-8',             // Extra padding for arrow
      
      // Border & Background
      'border border-gray-300',
      'rounded-lg',
      'bg-white',
      
      // Typography
      'text-sm',
      'font-medium',
      'text-gray-900',
      
      // Interactive
      'cursor-pointer',
      
      // Transitions
      'transition-colors duration-200',
      
      // Hover
      'hover:border-gray-400',
      'hover:bg-gray-50',
      
      // Focus
      'focus:outline-none',
      'focus:ring-2',
      'focus:ring-blue-500',
      'focus:border-blue-500',
      
      // Disabled
      'disabled:opacity-50',
      'disabled:cursor-not-allowed',
    ),
  }}
/>
```

**Result:**
```
┌─────────────────────────────────────────┐
│   ┌──────────────┐  ┌────────────┐     │
│   │ October   ▼ │  │ 2024    ▼ │     │
│   └──────────────┘  └────────────┘     │
│        ↑ Month          ↑ Year         │
│    dropdown_root    dropdown_root      │
└─────────────────────────────────────────┘
              ↑ dropdowns
```

---

## 🎯 When to Style Each

### Style `dropdowns` when you want:

✅ **Layout between dropdowns**
```typescript
'flex gap-4'          // Horizontal spacing
'flex-col'            // Vertical layout
'justify-between'     // Space distribution
```

✅ **Alignment**
```typescript
'items-center'        // Vertical center
'justify-end'         // Right align
```

---

### Style `dropdown_root` when you want:

✅ **Custom arrow icon**
```typescript
'after:content-["▼"]'           // Custom arrow
'after:absolute after:right-2'  // Position arrow
```

✅ **Individual dropdown wrapper styling**
```typescript
'first:flex-1'        // First dropdown wider
'last:w-32'          // Last dropdown fixed width
```

✅ **Background around dropdown**
```typescript
'bg-gray-100 p-2 rounded-lg'  // Wrapper background
```

---

### Style `dropdown` when you want:

✅ **Select element appearance**
```typescript
'appearance-none'     // Remove default arrow
'border rounded-lg'   // Border & corners
'bg-white'           // Background
```

✅ **Typography**
```typescript
'text-sm font-medium'  // Font styling
'text-gray-900'       // Text color
```

✅ **Interactive states**
```typescript
'hover:border-blue-500'  // Hover border
'focus:ring-2'          // Focus ring
```

---

## 📊 Complete Hierarchy

```
UI.Dropdowns (dropdowns)
├── UI.DropdownRoot (dropdown_root) [Month]
│   └── UI.Dropdown (dropdown) [<select>]
│       ├── <option value="0">January</option>
│       ├── <option value="1">February</option>
│       └── ...
│
└── UI.DropdownRoot (dropdown_root) [Year]
    └── UI.Dropdown (dropdown) [<select>]
        ├── <option value="2020">2020</option>
        ├── <option value="2021">2021</option>
        └── ...
```

---

## 🎨 Responsive Example

```typescript
classNames={{
  // Mobile: Stack vertically
  // Desktop: Side by side
  dropdowns: cn(
    'flex',
    'flex-col sm:flex-row',  // Stack on mobile, row on desktop
    'gap-2',
    'w-full sm:w-auto',
  ),
  
  dropdown_root: cn(
    'relative',
    'w-full sm:w-auto',      // Full width on mobile
  ),
  
  dropdown: cn(
    'w-full',                 // Full width in container
    'px-3 py-2',
    'border rounded-lg',
  ),
}}
```

**Mobile:**
```
┌─────────────────┐
│  October     ▼ │
└─────────────────┘
┌─────────────────┐
│  2024        ▼ │
└─────────────────┘
```

**Desktop:**
```
┌──────────────┬──────────────┐
│ October   ▼ │ │ 2024     ▼ │ │
└──────────────┴──────────────┘
```

---

## 🎯 Summary

| Element | Purpose | Level | Styling Focus |
|---------|---------|-------|---------------|
| **`dropdowns`** | Container for all | Parent | Layout, spacing between dropdowns |
| **`dropdown_root`** | Wrapper per dropdown | Middle | Custom arrow, individual sizing |
| **`dropdown`** | The `<select>` element | Child | Appearance, states, typography |

**Mental Model:**
```
dropdowns = Shelf (holds multiple items)
dropdown_root = Frame (wraps each item)
dropdown = Picture (the actual content)
```

Hiểu rõ 3 level này giúp bạn style dropdown caption một cách chính xác! 🎨