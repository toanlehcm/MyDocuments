# Component Label và LabelList khác nhau gì?
# Khi nào dùng cái nào?
# type của Children của <Label> là gì?
# type của Children của <LabelList> là gì?
# cái nào phù hợp với design

**So sánh Label vs LabelList trong Recharts:**

---

## **1. Khác nhau giữa `<Label>` và `<LabelList>`**

| Feature | `<Label>` | `<LabelList>` |
|---------|-----------|---------------|
| **Purpose** | Hiển thị **1 label duy nhất** | Hiển thị **nhiều labels** (mỗi data point 1 label) |
| **Use case** | Center label, title, subtitle | Label cho từng slice của pie chart |
| **Position** | `center`, `top`, `bottom`, `left`, `right` | `inside`, `outside`, `insideStart`, `insideEnd` |
| **Children** | `React.ReactElement` hoặc render function | Không hỗ trợ children |
| **Custom render** | ✅ Có thể dùng `content` prop | ❌ Chỉ format text |

---

## **2. Khi nào dùng cái nào?**

### **Dùng `<Label>` khi:**
- ✅ Cần hiển thị **1 label ở center** của donut chart
- ✅ Cần **custom render** phức tạp (ReactNode)
- ✅ Cần hiển thị **title/subtitle** tổng hợp

**Example:**
````tsx
<Pie data={data}>
  <Label position="center" value="Total: 100" />
</Pie>
````

---

### **Dùng `<LabelList>` khi:**
- ✅ Cần hiển thị **label cho từng slice** của pie chart
- ✅ Cần hiển thị **giá trị hoặc phần trăm** của mỗi phần
- ✅ Label đơn giản (text formatting)

**Example:**
````tsx
<Pie data={data}>
  <LabelList dataKey="value" position="inside" />
</Pie>
````

---

## **3. Type của Children**

### **`<Label>` Children Type:**

````typescript
interface LabelProps {
  viewBox?: ViewBox;
  value?: string | number;
  position?: 'center' | 'top' | 'bottom' | 'left' | 'right';
  content?: React.ReactElement | ((props: any) => React.ReactElement);
  children?: React.ReactElement; // ← Custom component
  // ... other props
}
````

**Accepts:**
- ✅ `value` prop (string/number)
- ✅ `content` prop (ReactElement or render function)
- ✅ `children` (Custom React component)

---

### **`<LabelList>` Children Type:**

````typescript
interface LabelListProps {
  dataKey?: string | number;
  position?: 'top' | 'left' | 'right' | 'bottom' | 'inside' | 'outside' | 'insideLeft' | 'insideRight' | 'insideTop' | 'insideBottom';
  content?: React.ReactElement | ((props: any) => React.ReactElement);
  // ❌ No children prop
}
````

**Accepts:**
- ✅ `dataKey` để lấy data
- ✅ `content` prop (custom render function)
- ❌ **KHÔNG hỗ trợ children**

---

## **4. Cái nào phù hợp với design?**

### **✅ Dùng `<Label>` với custom `content`**

Vì design cần:
- **1 center label** (không phải nhiều labels)
- **Custom layout** (số lớn + text nhỏ)
- **ReactNode** (div với styling)

---

## **Solution: Sử dụng `<Label>` với `content` prop**

````tsx
import React from 'react';
import { PieChart, Pie, Cell, Label, Legend, ResponsiveContainer } from 'recharts';
import type { ComponentPropsWithoutRef } from 'react';

interface IPieRechartCmpProps extends ComponentPropsWithoutRef<typeof Pie> {
  centerLabel?: React.ReactNode;
  legendContent?: React.ReactNode;
}

export default function PieRechartCmp({
  dataKey = 'value',
  nameKey = 'name',
  outerRadius = '80%',
  innerRadius = '65%',
  isAnimationActive = false,
  centerLabel,
  legendContent,
  data = [],
  ...propsPieRechartCmp
}: IPieRechartCmpProps) {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          data={data}
          dataKey={dataKey}
          nameKey={nameKey}
          cx="50%"
          cy="50%"
          outerRadius={outerRadius}
          innerRadius={innerRadius}
          isAnimationActive={isAnimationActive}
          {...propsPieRechartCmp}
        >
          {/* Render colors */}
          {data.map((entry: any, index: number) => (
            <Cell key={`cell-${index}`} fill={entry.fill || entry.color} />
          ))}

          {/* Center Label using Label with content */}
          {centerLabel && (
            <Label
              position="center"
              content={({ viewBox }) => {
                const { cx, cy } = viewBox || { cx: 0, cy: 0 };
                return (
                  <g>
                    <foreignObject
                      x={(cx || 0) - 100}
                      y={(cy || 0) - 50}
                      width={200}
                      height={100}
                    >
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '100%',
                          height: '100%',
                        }}
                      >
                        {centerLabel}
                      </div>
                    </foreignObject>
                  </g>
                );
              }}
            />
          )}
        </Pie>

        {/* Custom Legend */}
        {legendContent && (
          <Legend
            content={() => (
              <div style={{ width: '100%', marginTop: 20 }}>
                {legendContent}
              </div>
            )}
          />
        )}
      </PieChart>
    </ResponsiveContainer>
  );
}
````

---

## **Usage:**

````tsx
import React from 'react';
import PieRechartCmp from '@/core/components/ui/PieRechartCmp';

export const PracticeExecutiveSummary: React.FC = () => {
  const appointmentData = [
    { name: 'Finished', value: 10, fill: '#52C41A' },
    { name: 'Booked', value: 8, fill: '#1890FF' },
    { name: 'Cancelled', value: 3, fill: '#FF4D4F' },
    { name: 'No Show', value: 2, fill: '#FAAD14' },
    { name: 'Rescheduled', value: 1, fill: '#722ED1' },
  ];

  const total = appointmentData.reduce((sum, item) => sum + item.value, 0);

  return (
    <PieRechartCmp
      data={appointmentData}
      centerLabel={
        <div className="flex flex-col items-center gap-1">
          <span className="text-4xl font-semibold text-gray-900">{total}</span>
          <span className="text-sm text-gray-500">Appointments</span>
        </div>
      }
      legendContent={
        <div className="flex flex-wrap justify-center gap-4">
          {appointmentData.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <div
                className="h-3 w-3 rounded-sm"
                style={{ backgroundColor: item.fill }}
              />
              <span className="text-sm text-gray-700">{item.name}</span>
            </div>
          ))}
        </div>
      }
    />
  );
};
````

---

## **Tóm tắt:**

### **`<Label>`:**
- ✅ **1 label duy nhất** (center label)
- ✅ **Custom ReactNode** (phức tạp)
- ✅ **Phù hợp với design** (24 + "Appointments")

### **`<LabelList>`:**
- ✅ **Nhiều labels** (mỗi slice 1 label)
- ❌ **Chỉ text đơn giản**
- ❌ **Không phù hợp design** này

---

**→ Dùng `<Label>` với `content` prop để render custom ReactNode! 🚀**