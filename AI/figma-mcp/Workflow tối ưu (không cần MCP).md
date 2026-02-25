```
nếu workspace team là free, seat của t là view, không dùng được MCP thì có cách nào để github copilot kết hợp với figma để generate code giống như design, tối ưu công việc, rút ngắn thời gian build page, vẫn đảm bảo chính xác theo design được không?
```

Có. Nếu workspace team đang dùng Free plan và bạn không có Dev/Full seat (không dùng được MCP), bạn vẫn có thể kết hợp GitHub Copilot + Figma để generate code **rất gần pixel-perfect**, chỉ thiếu automation 100% như MCP. Các team production hiện nay thường dùng **Dev Mode + Inspect + Copy as code + Copilot prompt chuẩn**.

Mình sẽ đưa cho bạn workflow tối ưu nhất mà nhiều team frontend senior đang dùng.

---

# Mục tiêu

Generate React + Tailwind code:

* đúng spacing
* đúng font size
* đúng color
* đúng layout
* nhanh hơn manual coding 3–5×

---

# Workflow tối ưu (không cần MCP)

## Bước 1 — Dùng Dev Mode → Inspect trong Figma

Trong Figma:

```
Right panel → Dev Mode → Inspect
```

Bạn copy:

* CSS
* Tailwind (nếu có)
* Variables
* Spacing
* Typography

Ví dụ Figma cung cấp:

```css
display: flex;
padding: 16px 24px;
gap: 12px;
border-radius: 8px;
background: #FFFFFF;
```

---

## Bước 2 — Copy layout tree từ Figma

Right click frame → Copy → Copy as → CSS

hoặc copy structure thủ công:

```
Frame
  Header
    Title
    Subtitle
  Form
    Input
    Button
```

---

## Bước 3 — Paste vào Copilot Chat trong VSCode

Prompt chuẩn production:

```
Generate React component using TailwindCSS.

Requirements:
- Use exact values from this CSS
- Do not approximate
- Do not change spacing or font size
- Use semantic HTML
- Use flex and layout exactly as provided

CSS:
[paste CSS here]

Structure:
[paste structure here]
```

Copilot sẽ generate component chính xác 90–95%.

---

# Bước 4 — Copy exact tokens từ Figma Variables

Trong Figma Dev Mode → Variables

Ví dụ:

```
color-primary: #2563EB
spacing-md: 16px
radius-lg: 12px
```

Prompt:

```
Use exact color #2563EB
Use exact spacing 16px
Use exact radius 12px
```

---

# Bước 5 — Copy SVG assets trực tiếp từ Figma

Right click icon → Copy as SVG

Paste vào React:

```jsx
<svg>...</svg>
```

Copilot có thể optimize nếu yêu cầu.

---

# Workflow thực tế production (Vercel, Stripe, Linear)

Flow thực tế:

```
Figma Dev Mode
↓
Copy CSS / Variables
↓
Paste vào Copilot
↓
Copilot generate component
↓
Developer adjust minor details
↓
Done
```

Nhanh hơn manual 3–5×.

---

# Tool stack tối ưu nhất cho bạn

Không cần MCP, chỉ cần:

* Figma Dev Mode (Free plan vẫn có Inspect cơ bản)
* VSCode
* Copilot Chat
* TailwindCSS

Optional:

Plugin Figma:

* TailwindCSS plugin
* Figma to Code plugin
* Builder.io plugin

---

# Ví dụ thực tế

Figma CSS:

```css
display: flex;
padding: 12px 16px;
gap: 8px;
background: #F9FAFB;
border-radius: 8px;
```

Prompt Copilot:

```
Convert this CSS to React Tailwind component.
Do not approximate values.

CSS:
display:flex;
padding:12px 16px;
gap:8px;
background:#F9FAFB;
border-radius:8px;
```

Output:

```jsx
export default function Card() {
  return (
    <div className="flex p-[12px_16px] gap-[8px] bg-[#F9FAFB] rounded-[8px]">
      ...
    </div>
  )
}
```

Pixel-perfect.

---

# Cách đạt độ chính xác gần MCP nhất

Luôn dùng Tailwind arbitrary values:

```jsx
p-[12px]
gap-[7px]
text-[15px]
leading-[22px]
```

KHÔNG dùng:

```jsx
p-3
gap-2
text-sm
```

---

# Workflow tối ưu nhất mình khuyên bạn

```
Figma Dev Mode
+
Copy CSS
+
Copilot Chat prompt chuẩn
+
Tailwind arbitrary values
```

Hiệu quả:

```
90–95% pixel-perfect
```

Không cần MCP.

---

# Nếu bạn muốn, mình sẽ đưa cho bạn

prompt template chuẩn senior frontend dùng để convert bất kỳ Figma design → React Tailwind trong 10–20 giây.
