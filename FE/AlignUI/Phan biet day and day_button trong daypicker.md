# 🎯 Phân biệt `day` vs `day_button` - Deep Dive

## 📊 Visual Comparison

```
┌─────────────────────────────────────────────────────┐
│                                                     │
│  UI.Day (Cell Container)                           │
│  ┌───────────────────────────────┐                │
│  │ ← Padding, Background, Border │                │
│  │                               │                │
│  │   UI.DayButton (Button)       │                │
│  │   ┌─────────────────────┐    │                │
│  │   │                     │    │                │
│  │   │        15           │    │                │
│  │   │                     │    │                │
│  │   └─────────────────────┘    │                │
│  │   ↑ Clickable, Text, Hover   │                │
│  └───────────────────────────────┘                │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

## 🎨 HTML Structure

```html
<!-- Generated HTML from DayPicker -->

<td 
  role="gridcell" 
  class="day"              ← UI.Day (container)
>
  <button 
    type="button"
    class="day_button"      ← UI.DayButton (interactive element)
    aria-label="15"
    tabindex="0"
  >
    15                      ← Text content
  </button>
</td>
```

---

## 🔍 Detailed Breakdown

### 1️⃣ **`day` (UI.Day)** - Table Cell Container

```typescript
classNames={{
  day: cn(
    // ✅ Structural properties (affect the CELL)
    'relative',              // Position context
    'size-10',              // Width & Height of cell
    'shrink-0',             // Don't shrink in flex
    'select-none',          // Disable text selection
    'p-0',                  // Remove default padding
    'group/cell',           // For group selectors
    
    // ✅ Range styling (background behind button)
    '[&:has(.day-range-middle)]:bg-primary-alpha-10',
    
    // ✅ Rounded corners for range
    'first:[&:has([aria-selected])]:rounded-l-lg',
    'last:[&:has([aria-selected])]:rounded-r-lg',
    
    // ✅ Pseudo-elements (bridges between cells)
    'before:absolute',
    'before:inset-y-0',
    'before:-right-2',
    'before:w-2',
    'before:bg-primary-alpha-10',
  ),
}}
```

**Vai trò:**
- 📦 Container cho button
- 🎨 Chứa background cho range selection
- 📐 Định nghĩa size của cell (40x40px)
- 🌉 Tạo bridges giữa các cells (pseudo-elements)

---

### 2️⃣ **`day_button` (UI.DayButton)** - Interactive Button

```typescript
classNames={{
  day_button: cn(
    // ✅ Display & Layout
    'flex',                  // Flexbox
    'size-10',              // Match parent size
    'shrink-0',             // Don't shrink
    'items-center',         // Center vertically
    'justify-center',       // Center horizontally
    'rounded-lg',           // Rounded corners
    
    // ✅ Typography
    'text-center',          // Center text
    'text-label-sm',        // Font size
    'text-text-sub-600',    // Default text color
    
    // ✅ Transitions
    'transition',
    'duration-200',
    'ease-out',
    
    // ✅ Interactive States
    'hover:bg-bg-weak-50',              // Hover background
    'hover:text-text-strong-950',       // Hover text
    
    'focus:outline-none',               // Remove default outline
    'focus-visible:bg-bg-weak-50',      // Focus background
    'focus-visible:text-text-strong-950', // Focus text
    
    // ✅ Selected State (when aria-selected="true")
    'aria-[selected]:bg-primary-base',     // Blue background
    'aria-[selected]:text-static-white',   // White text
    
    // ✅ Accessibility
    'outline-none',         // Custom focus handling
  ),
}}
```

**Vai trò:**
- 🖱️ Interactive element (clickable)
- 🎨 Foreground styling (text, hover, focus)
- ✅ Selected state styling
- ♿ Accessibility (aria-label, tabindex, focus)

---

## 📊 Comparison Table

| Aspect | `day` (Cell) | `day_button` (Button) |
|--------|-------------|---------------------|
| **HTML Element** | `<td>` or `<div>` | `<button>` |
| **Purpose** | Container / Structure | Interactive element |
| **Clickable** | ❌ No | ✅ Yes |
| **Background** | Range background (xanh nhạt) | Selected state (xanh đậm) |
| **Size** | Defines cell size (40x40) | Fills cell size |
| **Hover** | N/A | ✅ Hover effects |
| **Focus** | N/A | ✅ Focus styles |
| **Pseudo-elements** | ✅ ::before (bridges) | ❌ None |
| **Range Styling** | ✅ Background color | ❌ Transparent |
| **Text** | ❌ No text | ✅ Contains date number |
| **ARIA** | `role="gridcell"` | `aria-label`, `aria-selected` |

---

## 🎨 Visual Examples

### Example 1: Normal Day (15)

```html
<td class="day relative size-10 p-0">          ← Cell (40x40px)
  <button class="day_button                     ← Button (fills cell)
                 flex size-10 items-center 
                 justify-center rounded-lg
                 text-gray-600
                 hover:bg-gray-50">
    15                                          ← Text
  </button>
</td>
```

**Visual:**
```
┌────────────┐
│            │  ← day (cell, no visible styling)
│  ┌──────┐  │
│  │  15  │  │  ← day_button (visible text & hover)
│  └──────┘  │
│            │
└────────────┘
```

---

### Example 2: Selected Day (27)

```html
<td class="day relative size-10 p-0">
  <button class="day_button
                 flex size-10 items-center justify-center
                 rounded-lg
                 bg-blue-600        ← Selected background
                 text-white"        ← Selected text
          aria-selected="true">
    27
  </button>
</td>
```

**Visual:**
```
┌────────────┐
│            │  ← day (cell)
│  ╔══════╗  │
│  ║  27  ║  │  ← day_button (blue background)
│  ╚══════╝  │
│            │
└────────────┘
```

---

### Example 3: Range Middle Day (5)

```html
<td class="day 
           relative size-10 p-0
           bg-blue-100">              ← Cell has light blue bg
  <button class="day_button
                 flex size-10 items-center justify-center
                 rounded-lg
                 text-blue-600        ← Blue text
                 bg-transparent">     ← Transparent (shows cell bg)
    5
  </button>
</td>
```

**Visual:**
```
┌────────────┐
│░░░░░░░░░░░░│  ← day (light blue background)
│░░┌──────┐░░│
│░░│  5   │░░│  ← day_button (transparent, shows cell bg)
│░░└──────┘░░│
│░░░░░░░░░░░░│
└────────────┘
```

**Key insight:** Button is transparent, cell background shows through!

---

### Example 4: Range with Bridges

```html
<!-- Day 1 (start) -->
<td class="day size-10 bg-transparent
           before:block before:w-3 before:bg-blue-100
           before:absolute before:right-0">
  <button class="day_button bg-blue-600 text-white">1</button>
</td>

<!-- Day 2 (middle) -->
<td class="day size-10 bg-blue-100
           before:block before:w-2 before:bg-blue-100
           before:absolute before:-right-2">
  <button class="day_button bg-transparent text-blue-600">2</button>
</td>

<!-- Day 3 (middle) -->
<td class="day size-10 bg-blue-100
           before:block before:w-2 before:bg-blue-100">
  <button class="day_button bg-transparent text-blue-600">3</button>
</td>
```

**Visual:**
```
╔════╗░░░░░░┌──────┐░░░░░░┌──────┐
║  1 ║░░░░░░│  2   │░░░░░░│  3   │
╚════╝░░░░░░└──────┘░░░░░░└──────┘
  ↑      ↑       ↑      ↑       ↑
button  bridge  button bridge button
(blue)  (cell   (trans) (cell  (trans)
        ::before)       ::before)
```

---

## 🔑 Key Differences in AlignUI Code

```typescript
// From your AlignUI code:

cell: cn(
  // ========================================
  // day (Cell Level) - Structure & Range BG
  // ========================================
  'group/cell relative size-10 shrink-0 select-none p-0',
  
  // ✅ Cell background for range
  '[&:has(.day-range-middle)]:bg-primary-alpha-10',
  
  // ✅ Rounded corners for cell
  'first:[&:has([aria-selected])]:rounded-l-lg',
  'last:[&:has([aria-selected])]:rounded-r-lg',
  
  // ✅ Pseudo-elements (bridges)
  'before:absolute before:inset-y-0 before:-right-2',
  'before:hidden before:w-2 before:bg-primary-alpha-10',
  '[&:has(.day-range-middle)]:before:block',
),

day: cn(
  // ========================================
  // day_button (Button Level) - Interactive
  // ========================================
  'flex size-10 shrink-0 items-center justify-center',
  'rounded-lg text-center text-label-sm',
  
  // ✅ Default state
  'text-text-sub-600',
  
  // ✅ Hover state (button only)
  'hover:bg-bg-weak-50 hover:text-text-strong-950',
  
  // ✅ Selected state (button only)
  'aria-[selected]:bg-primary-base',
  'aria-[selected]:text-static-white',
  
  // ✅ Focus state (button only)
  'focus:outline-none',
  'focus-visible:bg-bg-weak-50',
),

// ========================================
// Modifiers that affect button appearance
// ========================================
day_range_middle: 'day-range-middle !text-primary-base !bg-transparent',
```

---

## 🎯 When to Style Each

### Style `day` (Cell) when you want:

✅ **Range background colors**
```typescript
'[&:has(.day-range-middle)]:bg-primary-alpha-10'  // Light blue cell
```

✅ **Pseudo-elements (bridges)**
```typescript
'before:absolute before:bg-blue-100'  // Fill gaps between cells
```

✅ **Cell-level rounded corners**
```typescript
'first:[&:has([aria-selected])]:rounded-l-lg'  // Round first cell
```

✅ **Structural properties**
```typescript
'size-10'  // Cell dimensions
'relative' // Position context
```

---

### Style `day_button` (Button) when you want:

✅ **Interactive states**
```typescript
'hover:bg-gray-50'           // Hover background
'focus-visible:ring-2'       // Focus ring
```

✅ **Selected appearance**
```typescript
'aria-[selected]:bg-blue-600'     // Selected background
'aria-[selected]:text-white'      // Selected text
```

✅ **Text styling**
```typescript
'text-sm font-medium'        // Typography
```

✅ **Transitions**
```typescript
'transition duration-200'    // Smooth animations
```

---

## 📝 Mental Model

```
Think of it like a picture frame:

day (Cell) = The frame & matting
  - Defines structure
  - Provides background
  - Creates spacing

day_button (Button) = The picture itself
  - Interactive content
  - Foreground styling
  - User interactions
```

---

## 🎨 Complete Example: Range Selection

```typescript
// October 1-11 range

// Oct 1 (start)
<td class="day size-10 rounded-l-lg">               ← Cell rounded left
  <button class="day_button bg-blue-600 text-white" ← Button selected
          aria-selected="true">
    1
  </button>
</td>

// Oct 2-10 (middle)
<td class="day size-10 bg-blue-100">                ← Cell light blue
  <button class="day_button bg-transparent text-blue-600"> ← Button transparent
    2
  </button>
</td>

// Oct 11 (end)
<td class="day size-10 bg-blue-100 rounded-r-lg">   ← Cell light blue + rounded right
  <button class="day_button bg-blue-600 text-white" ← Button selected
          aria-selected="true">
    11
  </button>
</td>
```

**Result:**
```
╔════╗░░░░░░░░░░░░░░░░░░░░░░░░░░╔════╗
║  1 ║ 2  3  4  5  6  7  8  9  10║ 11 ║
╚════╝░░░░░░░░░░░░░░░░░░░░░░░░░░╚════╝
  ↑                                  ↑
Button     Cell BG shows           Button
selected   through transparent     selected
           buttons
```

---

## 🎯 Summary

| Property | `day` | `day_button` |
|----------|-------|-------------|
| **Layer** | Background | Foreground |
| **Purpose** | Structure | Interaction |
| **Styling** | Range effects | User states |
| **Contains** | Button | Text content |
| **Clickable** | No | Yes |

**Key Principle:** 
- `day` = Container/structure/background (passive)
- `day_button` = Content/interaction/foreground (active)

Hiểu được sự khác biệt này giúp bạn style DayPicker chính xác và tránh conflict! 🎨