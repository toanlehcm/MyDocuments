# 🎯 Phân biệt `months`, `month`, `month_caption`, `month_grid`, `month_dropdown`

## 📊 Complete Visual Hierarchy

```
┌────────────────────────────────────────────────────────────────────────┐
│                         months (UI.Months)                             │
│  ┌──────────────────────────────────┬──────────────────────────────┐  │
│  │        month (UI.Month)         │      month (UI.Month)        │  │
│  │  ┌────────────────────────────┐ │  ┌────────────────────────┐ │  │
│  │  │ month_caption              │ │  │ month_caption          │ │  │
│  │  │  ◄  October 2024  ►        │ │  │  ◄ November 2024  ►    │ │  │
│  │  └────────────────────────────┘ │  └────────────────────────┘ │  │
│  │  OR                              │  OR                          │  │
│  │  ┌────────────────────────────┐ │  ┌────────────────────────┐ │  │
│  │  │ month_dropdown (if enabled)│ │  │ month_dropdown         │ │  │
│  │  │  [October ▼] [2024 ▼]      │ │  │ [November ▼] [2024 ▼]  │ │  │
│  │  └────────────────────────────┘ │  └────────────────────────┘ │  │
│  │                                  │                              │  │
│  │  ┌────────────────────────────┐ │  ┌────────────────────────┐ │  │
│  │  │ month_grid                 │ │  │ month_grid             │ │  │
│  │  │ Su Mo Tu We Th Fr Sa       │ │  │ Su Mo Tu We Th Fr Sa   │ │  │
│  │  │  1  2  3  4  5  6  7       │ │  │              1  2  3  4│ │  │
│  │  │  8  9 10 11 12 13 14       │ │  │  5  6  7  8  9 10 11  │ │  │
│  │  │ 15 16 17 18 19 20 21       │ │  │ 12 13 14 15 16 17 18  │ │  │
│  │  │ 22 23 24 25 26 27 28       │ │  │ 19 20 21 22 23 24 25  │ │  │
│  │  │ 29 30 31                   │ │  │ 26 27 28 29 30        │ │  │
│  │  └────────────────────────────┘ │  └────────────────────────┘ │  │
│  └──────────────────────────────────┴──────────────────────────────┘  │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 🔍 HTML Structure

```html
<!-- Multiple Months Display -->
<div class="months">                    ← UI.Months (container for all months)
  
  <!-- First Month -->
  <div class="month">                   ← UI.Month (single month container)
    
    <!-- Caption: Default (buttons) -->
    <div class="month_caption">         ← UI.MonthCaption (header with nav)
      <button>◄</button>
      <span>October 2024</span>
      <button>►</button>
    </div>
    
    <!-- OR Caption: Dropdown -->
    <div class="month_dropdown">        ← UI.MonthDropdown (dropdown caption)
      <div class="dropdowns">
        <select>October</select>
        <select>2024</select>
      </div>
    </div>
    
    <!-- Calendar Grid -->
    <table class="month_grid">          ← UI.MonthGrid (the date table)
      <thead>
        <tr>Su Mo Tu We Th Fr Sa</tr>
      </thead>
      <tbody>
        <tr>1 2 3 4 5 6 7</tr>
        ...
      </tbody>
    </table>
  </div>
  
  <!-- Second Month -->
  <div class="month">                   ← UI.Month (another month)
    <div class="month_caption">...</div>
    <table class="month_grid">...</table>
  </div>
  
</div>
```

---

## 📝 Detailed Breakdown

### 1️⃣ **`months` (UI.Months)** - Container cho TẤT CẢ các tháng

```typescript
classNames={{
  months: cn(
    // ✅ Layout for multiple months
    'flex',              // Horizontal or vertical layout
    'divide-x',          // Divider between months
    'divide-gray-200',   // Divider color
    'gap-8',            // Space between months (alternative to divide)
  ),
}}
```

**Vai trò:**
- 📦 Container chứa nhiều tháng (khi `numberOfMonths > 1`)
- 📐 Layout cho multiple months (horizontal/vertical)
- 🎨 Spacing và dividers giữa các tháng

**Usage:**
```typescript
<DayPicker 
  numberOfMonths={2}  // Show 2 months → months container will have 2 children
/>
```

---

### 2️⃣ **`month` (UI.Month)** - Container cho MỘT tháng riêng lẻ

```typescript
classNames={{
  month: cn(
    // ✅ Single month container
    'space-y-4',        // Space between caption and grid
    'flex-1',           // Equal width in flex parent
  ),
}}
```

**Vai trò:**
- 📦 Container cho 1 tháng
- 📐 Spacing giữa caption và grid
- 🎨 Styling cho individual month

**Visual:**
```
┌─────────────────────────┐
│   month                 │
│  ┌───────────────────┐  │
│  │ month_caption     │  │ ← Caption (header)
│  └───────────────────┘  │
│  ┌───────────────────┐  │
│  │ month_grid        │  │ ← Grid (dates)
│  │ Su Mo Tu We...    │  │
│  │  1  2  3  4...    │  │
│  └───────────────────┘  │
└─────────────────────────┘
```

---

### 3️⃣ **`month_caption` (UI.MonthCaption)** - Header với navigation buttons

```typescript
classNames={{
  month_caption: cn(
    // ✅ Caption with nav buttons (default mode)
    'flex',
    'justify-center',
    'items-center',
    'relative',
    'h-10',
    'rounded-lg',
    'bg-gray-50',
  ),
}}
```

**Vai trò:**
- 🎯 Header của tháng (mode: default navigation)
- 🔼 Chứa prev/next buttons + label
- 🎨 Background và spacing

**Visual:**
```
┌──────────────────────────────┐
│ month_caption                │
│  ┌────┬────────────┬────┐   │
│  │ ◄ │ October 2024│ ► │   │
│  └────┴────────────┴────┘   │
└──────────────────────────────┘
    ↑         ↑          ↑
  button   label      button
```

**Code:**
```typescript
<DayPicker 
  captionLayout="buttons"  // Default - uses month_caption
/>
```

---

### 4️⃣ **`month_grid` (UI.MonthGrid)** - Bảng chứa các ngày

```typescript
classNames={{
  month_grid: cn(
    // ✅ The calendar table
    'w-full',
    'border-collapse',
    'mt-4',
  ),
}}
```

**Vai trò:**
- 📅 Bảng HTML chứa tất cả dates
- 📐 Structure cho weekday headers + week rows
- 🎨 Table styling

**Visual:**
```
┌────────────────────────────┐
│ month_grid                 │
│ ┌────────────────────────┐ │
│ │ Su Mo Tu We Th Fr Sa  │ │ ← thead (weekdays)
│ ├────────────────────────┤ │
│ │  1  2  3  4  5  6  7  │ │ ← tbody (dates)
│ │  8  9 10 11 12 13 14  │ │
│ │ 15 16 17 18 19 20 21  │ │
│ │ 22 23 24 25 26 27 28  │ │
│ │ 29 30 31              │ │
│ └────────────────────────┘ │
└────────────────────────────┘
```

**Code:**
```html
<table class="month_grid">
  <thead>
    <tr class="weekdays">
      <th class="weekday">Su</th>
      ...
    </tr>
  </thead>
  <tbody class="weeks">
    <tr class="week">
      <td class="day">...</td>
      ...
    </tr>
  </tbody>
</table>
```

---

### 5️⃣ **`month_dropdown` (UI.MonthDropdown)** - Caption dạng dropdown

```typescript
classNames={{
  month_dropdown: cn(
    // ✅ Caption with dropdowns (when captionLayout="dropdown")
    'flex',
    'justify-center',
    'items-center',
    'gap-2',
    'h-10',
  ),
}}
```

**Vai trò:**
- 🎯 Header của tháng (mode: dropdown)
- 📝 Alternative cho `month_caption`
- 🎨 Chứa month + year dropdowns

**Visual:**
```
┌──────────────────────────────┐
│ month_dropdown               │
│  ┌──────────┐  ┌─────────┐  │
│  │October ▼│  │2024  ▼│  │
│  └──────────┘  └─────────┘  │
└──────────────────────────────┘
       ↑              ↑
  month select   year select
```

**Code:**
```typescript
<DayPicker 
  captionLayout="dropdown"  // Uses month_dropdown instead of month_caption
  fromYear={2020}
  toYear={2030}
/>
```

---

## 📊 Comparison Table

| Element | Purpose | Contains | When Used | Parent |
|---------|---------|----------|-----------|--------|
| **`months`** | Container for all months | Multiple `month` | Always (even 1 month) | Root |
| **`month`** | Single month container | `month_caption`/`month_dropdown` + `month_grid` | Always (per month) | `months` |
| **`month_caption`** | Header with nav buttons | Nav buttons + Label | `captionLayout="buttons"` (default) | `month` |
| **`month_dropdown`** | Header with dropdowns | Month + Year selects | `captionLayout="dropdown"` | `month` |
| **`month_grid`** | Calendar table | Weekdays + Dates | Always | `month` |

---

## 🎨 Visual Comparison

### Single Month (Default Caption)

```
┌────────────────────────────────┐
│        months                  │
│  ┌──────────────────────────┐ │
│  │      month               │ │
│  │  ┌────────────────────┐  │ │
│  │  │ month_caption      │  │ │
│  │  │  ◄ October 2024 ►  │  │ │
│  │  └────────────────────┘  │ │
│  │  ┌────────────────────┐  │ │
│  │  │ month_grid         │  │ │
│  │  │ Su Mo Tu We Th Fr Sa│ │ │
│  │  │  1  2  3  4  5  6  7│ │ │
│  │  └────────────────────┘  │ │
│  └──────────────────────────┘ │
└────────────────────────────────┘
```

### Single Month (Dropdown Caption)

```
┌────────────────────────────────┐
│        months                  │
│  ┌──────────────────────────┐ │
│  │      month               │ │
│  │  ┌────────────────────┐  │ │
│  │  │ month_dropdown     │  │ │
│  │  │ [October▼] [2024▼] │  │ │
│  │  └────────────────────┘  │ │
│  │  ┌────────────────────┐  │ │
│  │  │ month_grid         │  │ │
│  │  │ Su Mo Tu We Th Fr Sa│ │ │
│  │  └────────────────────┘  │ │
│  └──────────────────────────┘ │
└────────────────────────────────┘
```

### Multiple Months (2)

```
┌──────────────────────────────────────────────────────┐
│                    months                            │
│  ┌───────────────────────┬───────────────────────┐  │
│  │     month            │ │     month            │  │
│  │  ┌─────────────────┐ │ │  ┌─────────────────┐│  │
│  │  │ month_caption   │ │ │  │ month_caption   ││  │
│  │  │ ◄ October 2024 ►│ │ │  │ ◄ November 2024►││  │
│  │  └─────────────────┘ │ │  └─────────────────┘│  │
│  │  ┌─────────────────┐ │ │  ┌─────────────────┐│  │
│  │  │ month_grid      │ │ │  │ month_grid      ││  │
│  │  │ Su Mo Tu We ... │ │ │  │ Su Mo Tu We ... ││  │
│  │  └─────────────────┘ │ │  └─────────────────┘│  │
│  └───────────────────────┴───────────────────────┘  │
└──────────────────────────────────────────────────────┘
```

---

## 🔧 Real-World Examples

### Example 1: Single Month with Default Caption

```typescript
<DayPicker
  classNames={{
    months: 'p-4',
    month: 'space-y-4',
    month_caption: 'flex justify-center items-center h-10 bg-gray-50 rounded-lg',
    month_grid: 'w-full mt-4',
  }}
/>
```

### Example 2: Single Month with Dropdown

```typescript
<DayPicker
  captionLayout="dropdown"
  fromYear={2020}
  toYear={2030}
  classNames={{
    months: 'p-4',
    month: 'space-y-4',
    month_dropdown: 'flex justify-center gap-2',  // ← Used instead of month_caption
    month_grid: 'w-full mt-4',
  }}
/>
```

### Example 3: Multiple Months Side-by-Side

```typescript
<DayPicker
  numberOfMonths={2}
  classNames={{
    months: 'flex divide-x divide-gray-200',  // ← Horizontal layout with divider
    month: 'px-4 space-y-4',                  // ← Padding for each month
    month_caption: 'flex justify-center items-center h-10',
    month_grid: 'w-full mt-4',
  }}
/>
```

### Example 4: Multiple Months Stacked Vertically

```typescript
<DayPicker
  numberOfMonths={3}
  classNames={{
    months: 'flex flex-col divide-y divide-gray-200',  // ← Vertical layout
    month: 'py-4 space-y-4',
    month_caption: 'flex justify-center items-center h-10',
    month_grid: 'w-full mt-4',
  }}
/>
```

---

## 🎯 When to Style Each

### Style `months` for:

✅ **Layout between multiple months**
```typescript
'flex gap-4'              // Horizontal spacing
'flex-col'                // Vertical layout
'divide-x divide-gray-200' // Dividers
```

✅ **Container-level styling**
```typescript
'p-4 bg-white rounded-xl shadow-lg'  // Outer container
```

---

### Style `month` for:

✅ **Individual month spacing**
```typescript
'space-y-4'    // Space between caption and grid
'px-4'         // Horizontal padding
```

✅ **Per-month styling**
```typescript
'first:border-l-0'  // Remove left border on first month
'last:pr-0'        // Remove right padding on last month
```

---

### Style `month_caption` for:

✅ **Caption bar appearance (button mode)**
```typescript
'h-10 bg-gray-50 rounded-lg'  // Background & height
'border border-gray-200'       // Border
```

✅ **Navigation button positioning**
```typescript
'relative'  // Position context for buttons
```

**Only used when:** `captionLayout="buttons"` (default)

---

### Style `month_dropdown` for:

✅ **Caption bar appearance (dropdown mode)**
```typescript
'flex gap-2 justify-center'  // Layout for dropdowns
'h-10'                       // Height
```

**Only used when:** `captionLayout="dropdown"`

---

### Style `month_grid` for:

✅ **Table structure**
```typescript
'w-full border-collapse'  // Full width, no spacing
'mt-4'                   // Space from caption
```

✅ **Grid-level styling**
```typescript
'border border-gray-200'  // Outer border
```

---

## 📊 Complete Hierarchy Tree

```
UI.Months (months)
│
├── UI.Month (month) [October]
│   ├── UI.MonthCaption (month_caption)  ← OR
│   │   ├── UI.Nav
│   │   │   ├── UI.NavButton (previous)
│   │   │   └── UI.NavButton (next)
│   │   └── UI.CaptionLabel
│   │
│   ├── UI.MonthDropdown (month_dropdown)  ← OR (alternative)
│   │   └── UI.Dropdowns
│   │       ├── UI.DropdownRoot [Month]
│   │       └── UI.DropdownRoot [Year]
│   │
│   └── UI.MonthGrid (month_grid)
│       ├── thead (UI.Weekdays)
│       └── tbody (UI.Weeks)
│           └── tr (UI.Week)
│               └── td (UI.Day)
│
└── UI.Month (month) [November]
    ├── UI.MonthCaption / UI.MonthDropdown
    └── UI.MonthGrid
```

---

## 🎨 AlignUI Implementation Reference

```typescript
// From your AlignUI code:

classNames={{
  // ========================================
  // Months Container
  // ========================================
  months: 'flex divide-x divide-stroke-soft-200',  // UI.Months
  
  // ========================================
  // Single Month Container
  // ========================================
  month: 'space-y-2',  // UI.Month
  
  // ========================================
  // Caption (Default - Buttons)
  // ========================================
  month_caption: 'flex justify-center items-center relative rounded-lg bg-bg-weak-50 h-9',  // UI.MonthCaption
  
  // ========================================
  // Caption (Dropdown Mode)
  // ========================================
  // month_dropdown would go here if using dropdown mode
  
  // ========================================
  // Calendar Grid
  // ========================================
  month_grid: 'w-full border-collapse',  // UI.MonthGrid (table)
}}
```

---

## 🎯 Summary

| Element | Level | Purpose | Always Present? |
|---------|-------|---------|-----------------|
| **`months`** | 1 (Root) | Container for all months | ✅ Yes |
| **`month`** | 2 | Individual month wrapper | ✅ Yes (per month) |
| **`month_caption`** | 3 | Caption with nav buttons | ⚠️ Only if `captionLayout="buttons"` |
| **`month_dropdown`** | 3 | Caption with dropdowns | ⚠️ Only if `captionLayout="dropdown"` |
| **`month_grid`** | 3 | Date table | ✅ Yes |

**Key Insight:**
- `month_caption` và `month_dropdown` là **mutually exclusive** (chỉ 1 trong 2 được render)
- `months`, `month`, và `month_grid` **luôn có** trong DOM

Hiểu rõ hierarchy này giúp bạn style calendar chính xác và tránh conflict! 🎨