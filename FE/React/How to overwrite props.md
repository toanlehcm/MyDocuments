```tsx
import React, { JSX } from 'react'
import { HintCmp, IHintCmpProps } from './HintCmp'
import { useTranslations } from 'next-intl'
import { getErrorMessage, isNotNull } from '@/lib/helper'
import { clsx } from 'clsx'

export interface IHintErrorProps {
  hintErrorProps?: IHintCmpProps
}

export default function HintError ({ hintErrorProps }: IHintErrorProps): JSX.Element | null {
  const t = useTranslations()
  const errorMessage = getErrorMessage(hintErrorProps?.hintText)

  return (
    <HintCmp
      {...hintErrorProps}
      rootProps={{
        ...hintErrorProps?.rootProps,
        hasError: true,
        className: clsx('font-normal text-xs', hintErrorProps?.rootProps?.className)
      }}
      hintText={isNotNull(errorMessage) ? t(errorMessage?.key ?? '', errorMessage?.params) : ''}
    />
  )
}
```

Trong React, **thứ tự spread props** quyết định **ưu tiên ghi đè giá trị**. Về best practice, bạn nên đặt **`{...hintErrorProps}` trước**, sau đó mới đặt **các props cố định** mà bạn muốn chắc chắn không bị ghi đè.

---

### 📌 **1. Nguyên tắc ghi đè props**

* Props được định nghĩa **sau** sẽ **ghi đè** props định nghĩa **trước** nếu trùng key.
* Ví dụ:

  ```tsx
  <HintCmp a="1" {...hintErrorProps} b="2" />
  ```

  * Nếu `hintErrorProps` có `a="3"`, thì kết quả:
    `{ a: "3", b: "2" }`
  * Nếu bạn muốn đảm bảo `a="1"` **không thể bị ghi đè**, hãy đặt nó **sau**.

---

### 📌 **2. Best practice trong trường hợp của bạn**

Vì bạn muốn **các giá trị mặc định như `rootProps` và `hintText` luôn được ưu tiên**, hãy làm như sau:

✅ **Đặt spread props trước** để giá trị mặc định không bị ghi đè:

```tsx
<HintCmp
  {...hintErrorProps}
  rootProps={{ hasError: true, className: 'font-normal text-xs' }}
  hintText={isNotNull(errorMessage) ? t(errorMessage?.key ?? '', errorMessage?.params) : ''}
/>
```

---

### 📌 **3. Lý do đây là best practice**

1. **Clean code & dễ hiểu** – Người đọc thấy rõ ràng: các giá trị mặc định (`rootProps`, `hintText`) là ưu tiên cuối cùng.
2. **Dễ bảo trì** – Nếu team bạn cần thay đổi giá trị mặc định, bạn không sợ chúng bị ghi đè ngầm bởi spread props.
3. **Tăng khả năng tái sử dụng** – Các props truyền từ bên ngoài (`hintErrorProps`) vẫn có thể mở rộng, nhưng các giá trị quan trọng vẫn được bảo vệ.
4. **Hiệu năng** – Không có khác biệt đáng kể về hiệu năng giữa hai cách, nhưng cách này giảm lỗi ghi đè không mong muốn → ít bug hơn.

---

### ✅ **Kết luận**

→ **Best practice:** **Đặt `{...hintErrorProps}` trước**, sau đó là các props cố định/mặc định để bảo vệ giá trị quan trọng.

```tsx
<HintCmp
  {...hintErrorProps}
  rootProps={{ hasError: true, className: 'font-normal text-xs' }}
  hintText={isNotNull(errorMessage) ? t(errorMessage?.key ?? '', errorMessage?.params) : ''}
/>
```
<!-- ------------------------------------------ -->

Nếu bạn muốn **người khác vẫn custom được `className` của `rootProps`** nhưng **vẫn giữ style mặc định** của bạn, bạn cần **kết hợp className** thay vì ghi đè hẳn. Cách làm phổ biến trong React: dùng `clsx` hoặc `classnames`.

---

### 📌 **Ví dụ cách kết hợp className**

```tsx
import clsx from 'clsx'

<HintCmp
  {...hintErrorProps}
  rootProps={{
    ...hintErrorProps?.rootProps,
    hasError: true, // 👈 Luôn override giá trị này
    className: clsx(
      'font-normal text-xs',      // style mặc định của bạn
      hintErrorProps?.rootProps?.className // 👈 thêm class custom của người dùng
    ),
  }}
  hintText={isNotNull(errorMessage) ? t(errorMessage?.key ?? '', errorMessage?.params) : ''}
/>
```

---

### 📌 **Vì sao đây là best practice**

1. **Người dùng vẫn có thể thêm hoặc ghi đè style** bằng cách truyền `className`.
2. **Giữ được style mặc định** của component để tránh bị mất format nếu quên truyền props.
3. **Dễ bảo trì** – Bạn có thể thay đổi style mặc định mà không phá vỡ code của người khác.
4. **Tái sử dụng cao** – Phù hợp với các component library hoặc design system.

---

### 📌 **Khi nào override hoàn toàn**

Nếu bạn **muốn cho phép người dùng ghi đè toàn bộ** (ví dụ trong trường hợp component rất linh hoạt), bạn có thể ưu tiên custom của họ:

```tsx
rootProps={{
  hasError: hintErrorProps?.rootProps?.hasError ?? true,
  className: hintErrorProps?.rootProps?.className ?? 'font-normal text-xs',
}}
```

---

### ✅ **Kết luận**

→ **Best practice**: Dùng `clsx`/`classnames` để **merge className**, và spread `...hintErrorProps.rootProps` trước khi override các giá trị mặc định. Điều này đảm bảo **clean code, dễ maintain**, và vẫn **cho phép tuỳ biến linh hoạt**.

<!-- ------------------------------------------ -->

Cách bạn ghi như vậy:

```tsx
<HintCmp
  rootProps={{ hasError: true, className: 'font-normal text-xs' }}
  hintText={isNotNull(errorMessage) ? t(errorMessage?.key ?? '', errorMessage?.params) : ''}
  {...hintErrorProps}
/>
```

⚠️ **Vấn đề**

* **Props thứ tự sau cùng sẽ ghi đè props trước** → nếu trong `hintErrorProps` có `rootProps` hoặc `hintText`, chúng sẽ **ghi đè hoàn toàn** giá trị mặc định (`hasError`, `className`).
* Điều này có thể khiến **style mặc định biến mất** hoặc logic `hasError` bị vô hiệu.
* Gây khó bảo trì, vì người đọc khó biết props nào cuối cùng được áp dụng.

---

✅ **Best practice & clean code**
Để giữ **mặc định** nhưng vẫn **cho phép custom**, hãy spread **trước**, rồi ghi đè/merge **sau**:

### 🔹 **Cách nên làm (an toàn hơn)**

```tsx
<HintCmp
  {...hintErrorProps}
  rootProps={{
    ...hintErrorProps?.rootProps,
    hasError: true, // luôn override giá trị này
    className: clsx('font-normal text-xs', hintErrorProps?.rootProps?.className), // merge className
  }}
  hintText={
    isNotNull(errorMessage) ? t(errorMessage?.key ?? '', errorMessage?.params) : ''
  }
/>
```

---

### 📌 **Lý do đây là best practice**

1. **Dễ đọc & bảo trì** – giá trị mặc định của bạn luôn rõ ràng.
2. **Tránh bug ghi đè ngoài ý muốn** – custom của người khác chỉ bổ sung, không phá vỡ logic cốt lõi.
3. **Dễ tái sử dụng** – ai cũng hiểu thứ tự ưu tiên: *defaults → custom → overrides*.

---

🔑 **Tóm tắt**:

* **Không khuyến khích** đặt `...hintErrorProps` sau cùng nếu bạn có props mặc định quan trọng.
* **Khuyến khích**: spread trước, sau đó override và merge className. Dùng thư viện như `clsx` hoặc `classnames` để clean code.
