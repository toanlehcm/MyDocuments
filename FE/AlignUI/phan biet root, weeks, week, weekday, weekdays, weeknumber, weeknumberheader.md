# 🎯 Phân biệt `root`, `weeks`, `week`, `weekday`, `weekdays`, `weeknumber`, `weeknumberheader`

## 📊 Complete Visual Hierarchy

```
┌─────────────────────────────────────────────────────────────────────┐
│                          root (UI.Root)                             │
│  ┌───────────────────────────────────────────────────────────────┐ │
│  │                      Calendar Content                         │ │
│  │  ┌─────────────────────────────────────────────────────────┐ │ │
│  │  │              October 2024                               │ │ │
│  │  └─────────────────────────────────────────────────────────┘ │ │
│  │                                                               │ │
│  │  ┌─────────────────────────────────────────────────────────┐ │ │
│  │  │ weekdays (UI.Weekdays) ← Header row                     │ │ │
│  │  │ ┌────┬────┬────┬────┬────┬────┬────┬────┐             │ │ │
│  │  │ │wnh │ Su │ Mo │ Tu │ We │ Th │ Fr │ Sa │             │ │ │
│  │  │ └────┴────┴────┴────┴────┴────┴────┴────┘             │ │ │
│  │  │  ↑    ↑                              ↑                  │ │ │
│  │  │  │    weekday (UI.Weekday) each cell                   │ │ │
│  │  │  weeknumberheader (UI.WeeknumberHeader)                │ │ │
│  │  └─────────────────────────────────────────────────────────┘ │ │
│  │                                                               │ │
│  │  ┌─────────────────────────────────────────────────────────┐ │ │
│  │  │ weeks (UI.Weeks) ← Container for all week rows         │ │ │
│  │  │ ┌─────────────────────────────────────────────────────┐│ │ │
│  │  │ │ week (UI.Week) ← Single row                         ││ │ │
│  │  │ │ ┌────┬────┬────┬────┬────┬────┬────┬────┐          ││ │ │
│  │  │ │ │ 40 │ 28 │ 29 │ 30 │  1 │  2 │  3 │  4 │          ││ │ │
│  │  │ │ └────┴────┴────┴────┴────┴────┴────┴────┘          ││ │ │
│  │  │ │  ↑    ↑ day cells...                                ││ │ │
│  │  │ │  weeknumber (UI.Weeknumber)                         ││ │ │
│  │  │ └─────────────────────────────────────────────────────┘│ │ │
│  │  │ ┌─────────────────────────────────────────────────────┐│ │ │
│  │  │ │ week (UI.Week) ← Another row                        ││ │ │
│  │  │ │ ┌────┬────┬────┬────┬────┬────┬────┬────┐          ││ │ │
│  │  │ │ │ 41 │  5 │  6 │  7 │  8 │  9 │ 10 │ 11 │          ││ │ │
│  │  │ │ └────┴────┴────┴────┴────┴────┴────┴────┘          ││ │ │
│  │  │ └─────────────────────────────────────────────────────┘│ │ │
│  │  │ ...more week rows...                                   │ │ │
│  │  └─────────────────────────────────────────────────────────┘ │ │
│  └───────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 🔍 HTML Structure

```html
<!-- Complete DayPicker Structure -->

<div class="root">                           ← UI.Root (outermost container)
  
  <!-- Month Caption -->
  <div class="month_caption">...</div>
  
  <!-- Calendar Grid -->
  <table class="month_grid">
    
    <!-- Weekday Header Row -->
    <thead>
      <tr class="weekdays">                  ← UI.Weekdays (header row)
        <th class="weeknumberheader">#</th>  ← UI.WeeknumberHeader (optional)
        <th class="weekday">Su</th>          ← UI.Weekday
        <th class="weekday">Mo</th>          ← UI.Weekday
        <th class="weekday">Tu</th>          ← UI.Weekday
        <th class="weekday">We</th>          ← UI.Weekday
        <th class="weekday">Th</th>          ← UI.Weekday
        <th class="weekday">Fr</th>          ← UI.Weekday
        <th class="weekday">Sa</th>          ← UI.Weekday
      </tr>
    </thead>
    
    <!-- Date Rows -->
    <tbody class="weeks">                    ← UI.Weeks (container for all rows)
      
      <!-- First Week Row -->
      <tr class="week">                      ← UI.Week (single row)
        <td class="weeknumber">40</td>       ← UI.Weeknumber (optional)
        <td class="day">...</td>             ← Day cells
        <td class="day">...</td>
        ...
      </tr>
      
      <!-- Second Week Row -->
      <tr class="week">                      ← UI.Week
        <td class="weeknumber">41</td>       ← UI.Weeknumber
        <td class="day">...</td>
        ...
      </tr>
      
      <!-- More week rows... -->
      
    </tbody>
  </table>
  
</div>
```

---

## 📝 Detailed Breakdown

### 1️⃣ **`root` (UI.Root)** - Outermost Container

```typescript
classNames={{
  root: cn(
    // ✅ Entire calendar container
    'relative',          // Position context
    'inline-block',      // Inline display
    'text-gray-900',     // Default text color
    'bg-white',          // Background
    'rounded-xl',        // Rounded corners
    'shadow-lg',         // Drop shadow
    'p-4',              // Padding
  ),
}}
```

**Vai trò:**
- 📦 Container ngoài cùng của toàn bộ calendar
- 🎨 Global styling (background, shadow, padding)
- 📐 Position context cho absolute elements

**Visual:**
```
┌─────────────────────────────────┐
│ root                            │
│  [Entire Calendar Inside]       │
│  - Caption                       │
│  - Weekdays                      │
│  - Weeks/Dates                   │
│  - Footer                        │
└─────────────────────────────────┘
```

---

### 2️⃣ **`weekdays` (UI.Weekdays)** - Header Row Container

```typescript
classNames={{
  weekdays: cn(
    // ✅ Header row container (Su Mo Tu...)
    'flex',              // Flex layout
    'gap-2',            // Space between cells
  ),
}}
```

**Vai trò:**
- 📋 Container cho header row (Su, Mo, Tu...)
- 📐 Layout cho weekday cells
- 🎨 Spacing between headers

**Visual:**
```
┌────────────────────────────────────┐
│ weekdays (header row)             │
│ ┌────┬────┬────┬────┬────┬────┐  │
│ │ Su │ Mo │ Tu │ We │ Th │ Fr │  │
│ └────┴────┴────┴────┴────┴────┘  │
└────────────────────────────────────┘
```

---

### 3️⃣ **`weekday` (UI.Weekday)** - Single Weekday Header Cell

```typescript
classNames={{
  weekday: cn(
    // ✅ Individual weekday cell (Su, Mo, Tu...)
    'text-text-soft-400',        // Text color
    'text-label-sm',             // Font size
    'uppercase',                 // UPPERCASE
    'size-10',                   // Width & height
    'flex items-center',         // Center content
    'justify-center',            // Center horizontally
    'text-center',               // Text align
    'select-none',               // Disable text selection
  ),
}}
```

**Vai trò:**
- 📝 Individual weekday header cell
- 🎨 Typography và styling
- 📐 Size và alignment

**Visual:**
```
┌────┐ ┌────┐ ┌────┐ ┌────┐
│ SU │ │ MO │ │ TU │ │ WE │ ← Each is a weekday
└────┘ └────┘ └────┘ └────┘
```

---

### 4️⃣ **`weeknumberheader` (UI.WeeknumberHeader)** - Week Number Column Header

```typescript
classNames={{
  weeknumberheader: cn(
    // ✅ Header cell for week number column
    'text-text-soft-400',        // Match weekday color
    'text-label-sm',             // Font size
    'size-10',                   // Match weekday size
    'flex items-center',         // Center content
    'justify-center',            // Center horizontally
    'select-none',               // Disable selection
  ),
}}
```

**Vai trò:**
- 📋 Header cell cho week number column
- 🔢 Typically shows "#" or "Wk"
- 📐 Match styling với weekday headers

**Visual:**
```
┌────┬────┬────┬────┬────┬────┬────┬────┐
│ #  │ SU │ MO │ TU │ WE │ TH │ FR │ SA │
└────┴────┴────┴────┴────┴────┴────┴────┘
  ↑
weeknumberheader
```

**Only visible when:**
```typescript
<DayPicker showWeekNumber />  // Enable week numbers
```

---

### 5️⃣ **`weeks` (UI.Weeks)** - Container for All Week Rows

```typescript
classNames={{
  weeks: cn(
    // ✅ Container for all date rows
    'w-full',            // Full width
  ),
}}
```

**Vai trò:**
- 📦 Container chứa TẤT CẢ week rows
- 📐 Wrapper cho `<tbody>`
- 🎨 Table body styling

**Visual:**
```
┌────────────────────────────────────┐
│ weeks (container)                  │
│ ┌────────────────────────────────┐ │
│ │ week (row 1)                   │ │
│ │ 40  28 29 30  1  2  3  4       │ │
│ └────────────────────────────────┘ │
│ ┌────────────────────────────────┐ │
│ │ week (row 2)                   │ │
│ │ 41   5  6  7  8  9 10 11       │ │
│ └────────────────────────────────┘ │
│ ...more rows...                    │
└────────────────────────────────────┘
```

---

### 6️⃣ **`week` (UI.Week)** - Single Week Row

```typescript
classNames={{
  week: cn(
    // ✅ Single row of dates
    'grid',                  // Grid layout
    'grid-flow-col',         // Horizontal flow
    'auto-cols-auto',        // Auto column sizing
    'w-full',               // Full width
    'mt-2',                 // Top margin
    'gap-2',                // Gap between cells
  ),
}}
```

**Vai trò:**
- 📅 Single horizontal row of dates
- 📐 Layout cho 7 days + optional week number
- 🎨 Spacing between days

**Visual:**
```
┌──────────────────────────────────────┐
│ week (single row)                    │
│ ┌────┬────┬────┬────┬────┬────┬────┐│
│ │ 40 │  1 │  2 │  3 │  4 │  5 │  6 ││
│ └────┴────┴────┴────┴────┴────┴────┘│
└──────────────────────────────────────┘
```

---

### 7️⃣ **`weeknumber` (UI.Weeknumber)** - Week Number Cell

```typescript
classNames={{
  weeknumber: cn(
    // ✅ Week number in each row
    'text-text-soft-400',        // Muted color
    'text-label-sm',             // Small text
    'size-10',                   // Match day size
    'flex items-center',         // Center vertically
    'justify-center',            // Center horizontally
    'select-none',               // Disable selection
  ),
}}
```

**Vai trò:**
- 🔢 Week number cho mỗi row (40, 41, 42...)
- 📐 First cell trong mỗi week row
- 🎨 Muted styling (less prominent)

**Visual:**
```
┌────┬────┬────┬────┬────┬────┬────┬────┐
│ 40 │  1 │  2 │  3 │  4 │  5 │  6 │  7 │
└────┴────┴────┴────┴────┴────┴────┴────┘
  ↑
weeknumber
```

**Only visible when:**
```typescript
<DayPicker showWeekNumber />
```

---

## 📊 Comparison Table

| Element | HTML Tag | Purpose | Level | Always Visible? |
|---------|----------|---------|-------|-----------------|
| **`root`** | `<div>` | Outermost container | 1 | ✅ Yes |
| **`weekdays`** | `<tr>` | Header row container | 3 | ✅ Yes |
| **`weekday`** | `<th>` | Single weekday header | 4 | ✅ Yes (7 cells) |
| **`weeknumberheader`** | `<th>` | Week # column header | 4 | ⚠️ Only if `showWeekNumber` |
| **`weeks`** | `<tbody>` | Container for date rows | 3 | ✅ Yes |
| **`week`** | `<tr>` | Single week row | 4 | ✅ Yes (5-6 rows) |
| **`weeknumber`** | `<td>` | Week number cell | 5 | ⚠️ Only if `showWeekNumber` |

---

## 🎨 Visual Examples

### Example 1: Without Week Numbers

```
┌─────────────────────────────────────────┐
│ root                                    │
│  ┌───────────────────────────────────┐ │
│  │ October 2024                      │ │
│  └───────────────────────────────────┘ │
│  ┌───────────────────────────────────┐ │
│  │ weekdays                          │ │
│  │ Su  Mo  Tu  We  Th  Fr  Sa        │ │
│  └───────────────────────────────────┘ │
│  ┌───────────────────────────────────┐ │
│  │ weeks                             │ │
│  │ ┌─────────────────────────────┐   │ │
│  │ │ week                        │   │ │
│  │ │  1   2   3   4   5   6   7  │   │ │
│  │ └─────────────────────────────┘   │ │
│  │ ┌─────────────────────────────┐   │ │
│  │ │ week                        │   │ │
│  │ │  8   9  10  11  12  13  14  │   │ │
│  │ └─────────────────────────────┘   │ │
│  └───────────────────────────────────┘ │
└─────────────────────────────────────────┘
```

### Example 2: With Week Numbers

```
┌──────────────────────────────────────────────┐
│ root                                         │
│  ┌────────────────────────────────────────┐ │
│  │ October 2024                           │ │
│  └────────────────────────────────────────┘ │
│  ┌────────────────────────────────────────┐ │
│  │ weekdays                               │ │
│  │ ┌────┬────┬────┬────┬────┬────┬────┐  │ │
│  │ │ #  │ Su │ Mo │ Tu │ We │ Th │ Fr │  │ │
│  │ └────┴────┴────┴────┴────┴────┴────┘  │ │
│  │  ↑                                     │ │
│  │  weeknumberheader                      │ │
│  └────────────────────────────────────────┘ │
│  ┌────────────────────────────────────────┐ │
│  │ weeks                                  │ │
│  │ ┌──────────────────────────────────┐   │ │
│  │ │ week                             │   │ │
│  │ │ ┌───┬───┬───┬───┬───┬───┬───┐   │   │ │
│  │ │ │40 │ 1 │ 2 │ 3 │ 4 │ 5 │ 6 │   │   │ │
│  │ │ └───┴───┴───┴───┴───┴───┴───┘   │   │ │
│  │ │  ↑                               │   │ │
│  │ │  weeknumber                      │   │ │
│  │ └──────────────────────────────────┘   │ │
│  └────────────────────────────────────────┘ │
└──────────────────────────────────────────────┘
```

---

## 🔧 Real-World Styling Examples

### Example 1: Basic Calendar (No Week Numbers)

```typescript
<DayPicker
  classNames={{
    root: 'p-4 bg-white rounded-xl shadow',
    
    weekdays: 'flex gap-2 mb-2',
    weekday: 'text-xs text-gray-500 uppercase w-10 text-center',
    
    weeks: 'space-y-2',
    week: 'flex gap-2',
  }}
/>
```

### Example 2: Calendar with Week Numbers

```typescript
<DayPicker
  showWeekNumber
  classNames={{
    root: 'p-4 bg-white rounded-xl shadow',
    
    weekdays: 'flex gap-2 mb-2',
    weekday: 'text-xs text-gray-500 uppercase w-10 text-center',
    weeknumberheader: 'text-xs text-gray-400 w-8 text-center',  // ✅ Style header
    
    weeks: 'space-y-2',
    week: 'flex gap-2',
    weeknumber: 'text-xs text-gray-400 w-8 text-center',        // ✅ Style cells
  }}
/>
```

### Example 3: AlignUI Style (From Your Code)

```typescript
<DayPicker
  showWeekNumber
  classNames={{
    root: '...',  // Not in your code (uses default)
    
    // ========================================
    // Weekday Headers
    // ========================================
    weekdays: 'flex gap-2',  // UI.Weekdays (not in code - using default)
    
    weekday: cn(
      'text-text-soft-400',
      'text-label-sm',
      'uppercase',
      'size-10',
      'flex items-center justify-center',
      'text-center',
      'select-none',
    ),
    
    // weeknumberheader not defined (uses default or doesn't show)
    
    // ========================================
    // Week Rows
    // ========================================
    weeks: '...',  // Not in code (uses default)
    
    week: cn(
      'grid',
      'grid-flow-col',
      'auto-cols-auto',
      'w-full',
      'mt-2',
      'gap-2',
    ),
    
    // weeknumber not defined (you don't show week numbers)
  }}
/>
```

---

## 🎯 When to Style Each

### Style `root` for:

✅ **Overall container appearance**
```typescript
'bg-white rounded-xl shadow-lg'  // Container styling
'p-4 max-w-md'                   // Padding & max width
```

---

### Style `weekdays` for:

✅ **Header row layout**
```typescript
'flex gap-2'        // Spacing between headers
'border-b pb-2'     // Bottom border separator
```

---

### Style `weekday` for:

✅ **Individual header cells**
```typescript
'text-xs uppercase text-gray-500'  // Typography
'w-10 text-center'                 // Size & alignment
```

---

### Style `weeknumberheader` for:

✅ **Week number column header**
```typescript
'text-xs text-gray-400'  // Match weekday style
'w-8'                    // Narrower than weekdays
```

**Only needed if:** `showWeekNumber={true}`

---

### Style `weeks` for:

✅ **Container for all rows**
```typescript
'space-y-2'  // Vertical spacing between rows
'divide-y'   // Dividers between rows
```

---

### Style `week` for:

✅ **Individual row layout**
```typescript
'flex gap-2'     // Spacing between day cells
'hover:bg-gray-50'  // Hover effect on entire row
```

---

### Style `weeknumber` for:

✅ **Week number cells**
```typescript
'text-xs text-gray-400'  // Muted styling
'w-8'                    // Match header width
```

**Only needed if:** `showWeekNumber={true}`

---

## 📊 Complete Hierarchy Tree

```
UI.Root (root)
│
├── UI.MonthCaption (month_caption)
│
├── UI.MonthGrid (month_grid)
│   │
│   ├── <thead>
│   │   └── UI.Weekdays (weekdays)        ← Header row
│   │       ├── UI.WeeknumberHeader (weeknumberheader) [optional]
│   │       ├── UI.Weekday (weekday) [Su]
│   │       ├── UI.Weekday (weekday) [Mo]
│   │       ├── UI.Weekday (weekday) [Tu]
│   │       ├── UI.Weekday (weekday) [We]
│   │       ├── UI.Weekday (weekday) [Th]
│   │       ├── UI.Weekday (weekday) [Fr]
│   │       └── UI.Weekday (weekday) [Sa]
│   │
│   └── <tbody>
│       └── UI.Weeks (weeks)              ← Container for rows
│           ├── UI.Week (week)            ← Row 1
│           │   ├── UI.Weeknumber (weeknumber) [40] [optional]
│           │   ├── UI.Day (day) [1]
│           │   ├── UI.Day (day) [2]
│           │   └── ... (7 days total)
│           │
│           ├── UI.Week (week)            ← Row 2
│           │   ├── UI.Weeknumber (weeknumber) [41]
│           │   └── ... (7 days)
│           │
│           └── ... (5-6 rows total)
│
└── UI.Footer (footer) [optional]
```

---

## 🎨 State Examples

### Week Number Hover Effect

```typescript
classNames={{
  week: cn(
    'group',  // Enable group hover
    'flex gap-2',
  ),
  
  weeknumber: cn(
    'text-gray-400',
    'group-hover:text-blue-600',  // Highlight on row hover
    'group-hover:font-semibold',
  ),
}}
```

**Visual:**
```
Normal state:
┌────┬────┬────┬────┐
│ 40 │  1 │  2 │  3 │
└────┴────┴────┴────┘

Hover state:
┌────┬────┬────┬────┐
│ 40 │  1 │  2 │  3 │  ← Entire row has hover effect
└────┴────┴────┴────┘
  ↑ Week number highlighted
```

---

## 🎯 Summary

| Element | Purpose | Parent | Children | Optional? |
|---------|---------|--------|----------|-----------|
| **`root`** | Outermost container | None | Everything | ❌ No |
| **`weekdays`** | Header row container | `month_grid` | `weekday` cells | ❌ No |
| **`weekday`** | Weekday header cell | `weekdays` | Text (Su, Mo...) | ❌ No |
| **`weeknumberheader`** | Week # column header | `weekdays` | Text (#, Wk) | ✅ Yes |
| **`weeks`** | Date rows container | `month_grid` | `week` rows | ❌ No |
| **`week`** | Single date row | `weeks` | `weeknumber` + `day` cells | ❌ No |
| **`weeknumber`** | Week number cell | `week` | Text (40, 41...) | ✅ Yes |

**Key Insights:**
- `root` wraps EVERYTHING
- `weekdays` (header) vs `weeks` (body)
- `weekday` (header cell) vs `week` (body row)
- `weeknumber` elements only appear when `showWeekNumber={true}`

Hiểu rõ hierarchy này giúp bạn style calendar structure chính xác! 🎨