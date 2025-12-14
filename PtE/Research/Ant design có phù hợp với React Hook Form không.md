# Ant design có phù hợp với React Hook Form không? Dễ build 1 component chỉ có UI để dùng riêng có có form, và 1 component có UI và Controller của RHF để làm việc với form như validate được không?

**TL;DR: Ant Design HOÀN TOÀN phù hợp với React Hook Form ✅**

---

## **Phân tích 2 use cases:**

### **Use Case 1: Pure UI Component (không có form logic)**
→ Dùng Ant Design components trực tiếp

### **Use Case 2: Form-connected Component (với RHF Controller)**
→ Wrap Ant Design với React Hook Form Controller

---

## **Setup:**

```bash
npm install react-hook-form
npm install antd
```

---

## **Pattern 1: Pure UI Components (Reusable)**

### **Input Component (chỉ UI):**

````tsx
import { Input as AntInput } from 'antd';
import type { InputProps as AntInputProps } from 'antd';

interface InputProps extends AntInputProps {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  ...props
}) => {
  return (
    <div style={{ marginBottom: 16 }}>
      {label && (
        <label style={{ display: 'block', marginBottom: 4 }}>
          {label}
        </label>
      )}
      <AntInput
        {...props}
        status={error ? 'error' : undefined}
      />
      {error && (
        <div style={{ color: '#ff4d4f', fontSize: 12, marginTop: 4 }}>
          {error}
        </div>
      )}
    </div>
  );
};
````

**Usage (standalone):**
```tsx
<Input
  label="Email"
  placeholder="Enter email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  error="Email is required"
/>
```

---

### **Select Component (chỉ UI):**

````tsx
import { Select as AntSelect } from 'antd';
import type { SelectProps as AntSelectProps } from 'antd';

interface SelectProps extends AntSelectProps {
  label?: string;
  error?: string;
}

export const Select: React.FC<SelectProps> = ({
  label,
  error,
  ...props
}) => {
  return (
    <div style={{ marginBottom: 16 }}>
      {label && (
        <label style={{ display: 'block', marginBottom: 4 }}>
          {label}
        </label>
      )}
      <AntSelect
        {...props}
        status={error ? 'error' : undefined}
        style={{ width: '100%', ...props.style }}
      />
      {error && (
        <div style={{ color: '#ff4d4f', fontSize: 12, marginTop: 4 }}>
          {error}
        </div>
      )}
    </div>
  );
};
````

---

## **Pattern 2: Form-connected Components (với RHF)**

### **FormInput (với Controller):**

````tsx
import { Input } from 'antd';
import { Controller, type Control, type FieldValues, type Path } from 'react-hook-form';

interface FormInputProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  placeholder?: string;
  type?: 'text' | 'password' | 'email';
  rules?: any;
}

export const FormInput = <T extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  type = 'text',
  rules,
}: FormInputProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <div style={{ marginBottom: 16 }}>
          {label && (
            <label style={{ display: 'block', marginBottom: 4 }}>
              {label}
              {rules?.required && <span style={{ color: 'red' }}> *</span>}
            </label>
          )}
          <Input
            {...field}
            type={type}
            placeholder={placeholder}
            status={error ? 'error' : undefined}
          />
          {error && (
            <div style={{ color: '#ff4d4f', fontSize: 12, marginTop: 4 }}>
              {error.message}
            </div>
          )}
        </div>
      )}
    />
  );
};
````

---

### **FormSelect (với Controller):**

````tsx
import { Select } from 'antd';
import { Controller, type Control, type FieldValues, type Path } from 'react-hook-form';

interface FormSelectProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  placeholder?: string;
  options: Array<{ label: string; value: string | number }>;
  rules?: any;
}

export const FormSelect = <T extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  options,
  rules,
}: FormSelectProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <div style={{ marginBottom: 16 }}>
          {label && (
            <label style={{ display: 'block', marginBottom: 4 }}>
              {label}
              {rules?.required && <span style={{ color: 'red' }}> *</span>}
            </label>
          )}
          <Select
            {...field}
            placeholder={placeholder}
            options={options}
            status={error ? 'error' : undefined}
            style={{ width: '100%' }}
          />
          {error && (
            <div style={{ color: '#ff4d4f', fontSize: 12, marginTop: 4 }}>
              {error.message}
            </div>
          )}
        </div>
      )}
    />
  );
};
````

---

### **FormDatePicker (với Controller):**

````tsx
import { DatePicker } from 'antd';
import { Controller, type Control, type FieldValues, type Path } from 'react-hook-form';
import type { Dayjs } from 'dayjs';

interface FormDatePickerProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  placeholder?: string;
  rules?: any;
}

export const FormDatePicker = <T extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  rules,
}: FormDatePickerProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <div style={{ marginBottom: 16 }}>
          {label && (
            <label style={{ display: 'block', marginBottom: 4 }}>
              {label}
              {rules?.required && <span style={{ color: 'red' }}> *</span>}
            </label>
          )}
          <DatePicker
            {...field}
            placeholder={placeholder}
            status={error ? 'error' : undefined}
            style={{ width: '100%' }}
          />
          {error && (
            <div style={{ color: '#ff4d4f', fontSize: 12, marginTop: 4 }}>
              {error.message}
            </div>
          )}
        </div>
      )}
    />
  );
};
````

---

## **Usage Example: Login Form**

````tsx
import { useForm } from 'react-hook-form';
import { Button, Card } from 'antd';
import { FormInput } from '@/components/form/FormInput';

interface LoginFormData {
  email: string;
  password: string;
}

export const LoginPage: React.FC = () => {
  const { control, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: LoginFormData) => {
    console.log('Form data:', data);
    // Call API login
  };

  return (
    <Card title="Login" style={{ maxWidth: 400, margin: '50px auto' }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          name="email"
          control={control}
          label="Email"
          placeholder="Enter your email"
          type="email"
          rules={{
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address',
            },
          }}
        />

        <FormInput
          name="password"
          control={control}
          label="Password"
          placeholder="Enter your password"
          type="password"
          rules={{
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters',
            },
          }}
        />

        <Button type="primary" htmlType="submit" block>
          Login
        </Button>
      </form>
    </Card>
  );
};
````

---

## **Complex Form Example: Dashboard Filters**

````tsx
import { useForm } from 'react-hook-form';
import { Button, Space, Card } from 'antd';
import { FormDatePicker } from '@/components/form/FormDatePicker';
import { FormSelect } from '@/components/form/FormSelect';
import type { Dayjs } from 'dayjs';

interface FilterFormData {
  dateRange: [Dayjs, Dayjs];
  location: string;
  provider: string;
  service: string;
}

export const DashboardFilters: React.FC = () => {
  const { control, handleSubmit, reset } = useForm<FilterFormData>();

  const onSubmit = (data: FilterFormData) => {
    console.log('Filters:', data);
    // Apply filters
  };

  const handleClear = () => {
    reset();
  };

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Space size="middle" wrap>
          <FormDatePicker
            name="dateRange"
            control={control}
            label="Date Range"
            placeholder="Select date range"
          />

          <FormSelect
            name="location"
            control={control}
            label="Location"
            placeholder="Select location"
            options={[
              { label: 'Location 1', value: 'loc1' },
              { label: 'Location 2', value: 'loc2' },
            ]}
          />

          <FormSelect
            name="provider"
            control={control}
            label="Provider"
            placeholder="Select provider"
            options={[
              { label: 'Provider 1', value: 'prov1' },
              { label: 'Provider 2', value: 'prov2' },
            ]}
          />

          <FormSelect
            name="service"
            control={control}
            label="Service"
            placeholder="Select service"
            options={[
              { label: 'Service 1', value: 'serv1' },
              { label: 'Service 2', value: 'serv2' },
            ]}
          />

          <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end' }}>
            <Button type="primary" htmlType="submit">
              Apply Filter
            </Button>
            <Button onClick={handleClear}>
              Clear Filters
            </Button>
          </div>
        </Space>
      </form>
    </Card>
  );
};
````

---

## **Advanced: FormCheckbox**

````tsx
import { Checkbox } from 'antd';
import { Controller, type Control, type FieldValues, type Path } from 'react-hook-form';

interface FormCheckboxProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
}

export const FormCheckbox = <T extends FieldValues>({
  name,
  control,
  label,
}: FormCheckboxProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Checkbox
          checked={field.value}
          onChange={(e) => field.onChange(e.target.checked)}
        >
          {label}
        </Checkbox>
      )}
    />
  );
};
````

---

## **Advanced: FormRadioGroup**

````tsx
import { Radio } from 'antd';
import { Controller, type Control, type FieldValues, type Path } from 'react-hook-form';

interface FormRadioGroupProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  options: Array<{ label: string; value: string | number }>;
  rules?: any;
}

export const FormRadioGroup = <T extends FieldValues>({
  name,
  control,
  label,
  options,
  rules,
}: FormRadioGroupProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <div style={{ marginBottom: 16 }}>
          {label && (
            <label style={{ display: 'block', marginBottom: 8 }}>
              {label}
              {rules?.required && <span style={{ color: 'red' }}> *</span>}
            </label>
          )}
          <Radio.Group {...field} options={options} />
          {error && (
            <div style={{ color: '#ff4d4f', fontSize: 12, marginTop: 4 }}>
              {error.message}
            </div>
          )}
        </div>
      )}
    />
  );
};
````

---

## **Project Structure:**

```
src/
├── components/
│   ├── ui/                      # Pure UI components (no form logic)
│   │   ├── Input.tsx
│   │   ├── Select.tsx
│   │   ├── Button.tsx
│   │   └── Card.tsx
│   ├── form/                    # Form-connected components (RHF)
│   │   ├── FormInput.tsx
│   │   ├── FormSelect.tsx
│   │   ├── FormDatePicker.tsx
│   │   ├── FormCheckbox.tsx
│   │   └── FormRadioGroup.tsx
│   └── dashboard/
│       ├── DashboardFilters.tsx # Uses form components
│       └── MetricCard.tsx       # Uses UI components
└── pages/
    ├── LoginPage.tsx            # Uses form components
    └── DashboardPage.tsx        # Uses both UI & form components
```

---

## **Validation Examples:**

### **Email validation:**
```tsx
<FormInput
  name="email"
  control={control}
  rules={{
    required: 'Email is required',
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: 'Invalid email address',
    },
  }}
/>
```

### **Min/Max length:**
```tsx
<FormInput
  name="password"
  control={control}
  rules={{
    required: 'Password is required',
    minLength: { value: 6, message: 'Min 6 characters' },
    maxLength: { value: 20, message: 'Max 20 characters' },
  }}
/>
```

### **Custom validation:**
```tsx
<FormInput
  name="username"
  control={control}
  rules={{
    validate: (value) => 
      value !== 'admin' || 'Username cannot be "admin"',
  }}
/>
```

### **Async validation:**
```tsx
<FormInput
  name="email"
  control={control}
  rules={{
    validate: async (value) => {
      const exists = await checkEmailExists(value);
      return !exists || 'Email already exists';
    },
  }}
/>
```

---

## **So sánh 2 patterns:**

| Pattern | Use Case | Ưu điểm | Nhược điểm |
|---------|----------|---------|------------|
| **Pure UI** | Display data, standalone inputs | ✅ Reusable<br>✅ No dependencies<br>✅ Dễ test | ❌ Phải handle form logic manually |
| **Form-connected** | Forms với validation | ✅ Auto validation<br>✅ Type-safe<br>✅ Less boilerplate | ❌ Phụ thuộc RHF<br>❌ Khó reuse ngoài form |

---

## **Best Practice:**

### **1. Tạo CẢ HAI versions:**

```
components/
├── ui/
│   └── Input.tsx          # Pure UI
└── form/
    └── FormInput.tsx      # Form-connected
```

### **2. Form components import UI components:**

````tsx
import { Input } from '@/components/ui/Input'; // Reuse UI component
import { Controller } from 'react-hook-form';

export const FormInput = ({ name, control, ...props }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Input {...field} error={error?.message} {...props} />
      )}
    />
  );
};
````

---

## **Kết luận:**

### **✅ Ant Design + React Hook Form = Perfect Match**

| Yêu cầu | Giải pháp |
|---------|-----------|
| **Pure UI component** | ✅ Ant Design components trực tiếp |
| **Form-connected component** | ✅ Wrap với RHF Controller |
| **Validation** | ✅ RHF rules + custom validators |
| **Type safety** | ✅ Generic components với TypeScript |
| **Reusability** | ✅ 2-layer pattern (ui/ + form/) |

**Chốt lại cho team:**
1. **UI components** (`components/ui/`): Dùng standalone, không có form logic
2. **Form components** (`components/form/`): Wrap UI components với RHF Controller
3. **Validation**: RHF rules (required, pattern, validate)
4. **Best of both worlds**: Flexibility + Type safety + Reusability