# Phân tích build component để reuse

theo design này thì cần tạo những component nào để reuse lại, đảm bảo clean code. product code.
- 1 loại component chỉ có UI, 1 loại component có UI và form.
- cho t 1 checklist trước.
- sau đó t sẽ build từng component.
- đừng build 1 lần tất cả, t không theo dẽo được

-----

**Phân tích design và tạo checklist components:**

---

## **CHECKLIST - Components cần build:**

### **Phase 1: UI Components (Pure UI - No Form Logic) ✅**

#### **1.1. Atomic Components (nhỏ nhất):**
- [ ] `StatisticCard` - Hiển thị metric với số lớn + label + trend
- [ ] `TabButton` - Tab button (Practice Executive Summary, Front-End Analytics, etc.)
- [ ] `FilterBadge` - Badge hiển thị filter đã chọn ("Last updated X min ago", "Saved Filters")

#### **1.2. Chart Components:**
- [ ] `DonutChart` - Donut chart với số ở giữa (Appointments: 24)
- [ ] `BarChart` - Bar chart (Revenue: Gross Charge vs Post-Deductions)
- [ ] `LineChart` - Line chart (Payment & Collection)
- [ ] `HorizontalBarChart` - Horizontal bar chart (Account Receivables)
- [ ] `MultiLineChart` - Multi-line chart (Charge Log với nhiều lines)

#### **1.3. Card Components:**
- [ ] `MetricCard` - Card chứa 1 metric đơn (Total Collection, Applied Payments)
- [ ] `ChartCard` - Card chứa chart với title
- [ ] `AppointmentCard` - Card hiển thị appointment fill rate + donut chart
- [ ] `UnpaidClaimsCard` - Card hiển thị unpaid claims với donut chart + metrics

---

### **Phase 2: Form Components (Form-connected with RHF) ✅**

#### **2.1. Filter Components:**
- [ ] `FormDatePicker` - Date range picker
- [ ] `FormSelect` - Dropdown (Location, Provider, Service)
- [ ] `FormButton` - Button (Apply Filter, Clear Filters, Save Filters)

#### **2.2. Composite Form:**
- [ ] `DashboardFilters` - Component ghép tất cả filters lại

---

### **Phase 3: Layout Components ✅**

- [ ] `DashboardHeader` - Header với tabs + filters + saved filters badge
- [ ] `MetricsRow` - Row chứa 4 metric cards
- [ ] `ChartsGrid` - Grid layout cho charts

---

### **Phase 4: Page Assembly ✅**

- [ ] `DashboardPage` - Ghép tất cả components lại

---

## **Ưu tiên build theo thứ tự:**

### **Sprint 1: Foundations (Week 1)**
1. ✅ `StatisticCard` - Component đơn giản nhất
2. ✅ `MetricCard` - Wrap StatisticCard trong Card
3. ✅ `TabButton` - Tab navigation
4. ✅ `FormSelect` - Dropdown filter
5. ✅ `FormDatePicker` - Date picker filter

### **Sprint 2: Charts (Week 2)**
6. ✅ `BarChart` - Revenue chart
7. ✅ `LineChart` - Payment chart
8. ✅ `DonutChart` - Appointment chart
9. ✅ `HorizontalBarChart` - Account Receivables

### **Sprint 3: Complex Components (Week 3)**
10. ✅ `AppointmentCard` - Card với donut + metrics
11. ✅ `UnpaidClaimsCard` - Card với donut + legend
12. ✅ `MultiLineChart` - Charge log chart
13. ✅ `DashboardFilters` - Filter bar

### **Sprint 4: Assembly (Week 4)**
14. ✅ `DashboardHeader` - Header với tabs + filters
15. ✅ `MetricsRow` - Layout cho metrics
16. ✅ `ChartsGrid` - Layout cho charts
17. ✅ `DashboardPage` - Final assembly

---

## **Folder structure:**

```
src/
├── components/
│   ├── ui/                          # Pure UI components
│   │   ├── cards/
│   │   │   ├── StatisticCard.tsx
│   │   │   ├── MetricCard.tsx
│   │   │   ├── ChartCard.tsx
│   │   │   ├── AppointmentCard.tsx
│   │   │   └── UnpaidClaimsCard.tsx
│   │   ├── charts/
│   │   │   ├── DonutChart.tsx
│   │   │   ├── BarChart.tsx
│   │   │   ├── LineChart.tsx
│   │   │   ├── HorizontalBarChart.tsx
│   │   │   └── MultiLineChart.tsx
│   │   └── common/
│   │       ├── TabButton.tsx
│   │       └── FilterBadge.tsx
│   └── form/                        # Form-connected components
│       ├── FormDatePicker.tsx
│       ├── FormSelect.tsx
│       └── FormButton.tsx
├── modules/
│   └── dashboard/
│       ├── components/
│       │   ├── DashboardFilters.tsx
│       │   ├── DashboardHeader.tsx
│       │   ├── MetricsRow.tsx
│       │   └── ChartsGrid.tsx
│       └── pages/
│           └── DashboardPage.tsx
```

---

## **Component Props Preview (để bạn hình dung):**

### **StatisticCard:**
```tsx
interface StatisticCardProps {
  title: string;
  value: number | string;
  prefix?: string;
  suffix?: string;
  trend?: {
    value: number;
    type: 'increase' | 'decrease';
    period?: string;
  };
}
```

### **DonutChart:**
```tsx
interface DonutChartProps {
  data: Array<{ name: string; value: number; color: string }>;
  centerText?: string;
  centerValue?: number;
  height?: number;
}
```

### **FormSelect:**
```tsx
interface FormSelectProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  placeholder?: string;
  options: Array<{ label: string; value: string }>;
}
```

---

## **Bắt đầu từ đâu?**

**Hãy cho tôi biết bạn muốn build component nào đầu tiên:**

1. ✅ **StatisticCard** (đơn giản nhất, foundation)
2. ✅ **MetricCard** (dùng StatisticCard)
3. ✅ **BarChart** (Revenue chart)
4. ✅ **DonutChart** (Appointment chart)
5. ✅ **FormSelect** (Filter dropdown)

**Hoặc bạn muốn tôi:**
- Vẽ component tree (sơ đồ phụ thuộc)?
- Giải thích chi tiết 1 component cụ thể?
- Bắt đầu code component đầu tiên?

**Hãy chọn 1 component để bắt đầu! 🚀**