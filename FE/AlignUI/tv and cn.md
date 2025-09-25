Ok, mình phân tích chi tiết 2 file này trong AlignUI cho bạn nhé 👇

---

## 1. File `tv.ts`

```ts
import { createTV } from 'tailwind-variants'
import { twMergeConfig } from './cn'

export type { VariantProps, ClassValue } from 'tailwind-variants'

// AlignUI standard TV configuration
export const tv = createTV({
  twMergeConfig
})
```

### 🔎 Ý nghĩa

* Import `createTV` từ **tailwind-variants** để tạo hàm `tv` — hàm này dùng để định nghĩa **variant API** cho các component.
* Import `twMergeConfig` (từ file `cn.ts`) → chính là config custom cho việc merge class Tailwind.
* `export const tv = createTV({ twMergeConfig })`
  👉 Mỗi lần bạn dùng `tv({...})`, nó sẽ dùng config merge class theo chuẩn AlignUI (customized version, không chỉ default Tailwind).
* Export thêm type `VariantProps, ClassValue` để dễ dàng sử dụng type-safe trong các component.

📌 **Tóm lại**: `tv.ts` = điểm khởi tạo `tv()` đã gắn kèm config AlignUI → giúp bạn định nghĩa style variants thống nhất, sạch sẽ, tránh conflict.

---

## 2. File `cn.ts`

```ts
import clsx, { type ClassValue } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

export { type ClassValue } from 'clsx'

// AlignUI standard configuration (no custom prefixes)
export const twMergeConfig = {
  extend: {
    classGroups: {
      // Standard Tailwind classes only
      'font-size': [
        {
          text: [
            'xs',
            'sm',
            'base',
            'lg',
            'xl',
            '2xl',
            '3xl',
            '4xl',
            '5xl',
            '6xl'
          ]
        }
      ],
      shadow: [
        {
          shadow: ['none', 'sm', 'md', 'lg', 'xl', '2xl']
        }
      ],
      rounded: [
        {
          rounded: ['none', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', 'full']
        }
      ]
    }
  }
}

const customTwMerge = extendTailwindMerge(twMergeConfig)

/**
 * Utilizes `clsx` with `tailwind-merge`, use in cases of possible class conflicts.
 * AlignUI standard implementation - works with standard Tailwind classes.
 */
export function cn (...classes: ClassValue[]): string {
  return customTwMerge(clsx(...classes))
}
```

### 🔎 Ý nghĩa

* `clsx` → gộp các class string/array/object thành một string duy nhất.

  ```ts
  clsx("p-4", condition && "bg-red-500")
  ```
* `tailwind-merge` → giúp **resolve conflict class** trong Tailwind (ví dụ: `p-2 p-4` → giữ lại `p-4`).
* `extendTailwindMerge(twMergeConfig)` → mở rộng khả năng resolve conflict theo chuẩn AlignUI.

  * Ở đây AlignUI định nghĩa thêm `classGroups`:

    * `font-size`: các giá trị `text-xs → text-6xl`
    * `shadow`: `shadow-none → shadow-2xl`
    * `rounded`: `rounded-none → rounded-full`
  * Nghĩa là khi bạn truyền nhiều class mâu thuẫn (`rounded-sm rounded-lg`) → nó sẽ tự giữ cái cuối cùng (`rounded-lg`).
* `cn(...classes)` → wrapper tiện dụng:

  1. Gộp class với `clsx`.
  2. Resolve conflict với `tailwind-merge` (custom config).

📌 **Tóm lại**: `cn.ts` = hàm utility AlignUI dùng để viết class Tailwind **ngắn gọn, an toàn, không conflict**.

---

## 🚀 Cách 2 file phối hợp

* `cn.ts` → chuẩn hóa merge class (giúp viết class gọn, không lo conflict).
* `tv.ts` → dùng `createTV` kết hợp config trên → tạo ra `tv()` chuyên để build **variant-based components** trong AlignUI.

👉 Với combo này, AlignUI đảm bảo:

* Code clean, không conflict class Tailwind.
* Có thể mở rộng dễ dàng (add thêm variant hoặc class group mới).
* Dùng thống nhất cho toàn bộ component system (scalability + maintainability).

---

Bạn có muốn mình **viết ví dụ thực tế** với `tv()` + `cn()` (ví dụ: tạo một `Button` component AlignUI style chuẩn, có `size` + `color` variants) để thấy rõ cách hoạt động không?

<!-- ------------------------------------------ -->

Rồi 👍 mình viết cho bạn ví dụ thực tế luôn với `tv()` + `cn()` trong **AlignUI style**.

---

## 1. Tạo `button.tsx`

```tsx
import React from 'react'
import { tv, type VariantProps } from '@/lib/tv' // tv từ file bạn đưa
import { cn } from '@/lib/cn'

// 1. Định nghĩa style với tailwind-variants
const buttonVariants = tv({
  base: 'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',

  variants: {
    size: {
      sm: 'h-8 px-3 text-sm',
      md: 'h-10 px-4 text-base',
      lg: 'h-12 px-6 text-lg',
    },
    color: {
      primary: 'bg-primary-base text-white hover:bg-primary-600 focus:ring-primary-400',
      secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-400',
      danger: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-400',
    },
  },

  defaultVariants: {
    size: 'md',
    color: 'primary',
  },
})

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {} // <-- type an toàn cho size, color

export const Button: React.FC<ButtonProps> = ({
  size,
  color,
  className,
  ...props
}) => {
  return (
    <button
      className={cn(buttonVariants({ size, color }), className)}
      {...props}
    />
  )
}
```

---

## 2. Cách dùng

```tsx
import React from 'react'
import { Button } from '@/components/ui/button'

export default function Page() {
  return (
    <div className="flex flex-col gap-4">
      <Button>Default Button</Button>

      <Button size="sm" color="primary">
        Small Primary
      </Button>

      <Button size="md" color="secondary">
        Medium Secondary
      </Button>

      <Button size="lg" color="danger">
        Large Danger
      </Button>

      <Button disabled>Disabled</Button>
    </div>
  )
}
```

---

## 3. Giải thích

* `tv()`

  * Tạo ra API variant: `buttonVariants({ size, color })`.
  * Tự merge class theo config `twMergeConfig` (giữ class cuối cùng nếu conflict).

* `cn()`

  * Gộp class `buttonVariants` với `className` từ ngoài truyền vào.
  * Đảm bảo không conflict Tailwind.

* `VariantProps<typeof buttonVariants>`

  * TypeScript hỗ trợ tự động → chỉ cho phép `size: 'sm' | 'md' | 'lg'` và `color: 'primary' | 'secondary' | 'danger'`.

---

📌 Kết quả:

* Bạn có **1 component `Button` clean, type-safe, reusable**.
* Dễ dàng mở rộng thêm variant mới (`outline`, `ghost`, …).
* Không lo conflict class vì có `cn()` + `twMergeConfig`.

---

Bạn có muốn mình viết thêm ví dụ `Button` nâng cao hơn (có **icon start/end** và variant kiểu `outline`, `ghost`) để thấy rõ sức mạnh của `tv()` không?
