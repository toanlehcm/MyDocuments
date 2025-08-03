Khi kết hợp **Align UI (AUI)** và **React Hook Form (RHF)**, nên dùng **`register` trước**, chỉ dùng `<Controller>` khi thật sự cần. Dưới đây là so sánh đầy đủ giúp bạn hiểu **bản chất, hiệu suất, khả năng mở rộng và maintain** của 2 cách:

---

## 🔍 1. Tổng quan ngắn gọn

| Cách dùng      | Đặc điểm chính                                                                                        |
| -------------- | ----------------------------------------------------------------------------------------------------- |
| `register`     | Trực tiếp gán props RHF (`ref`, `onChange`, `name`, `onBlur`) vào input. Dễ viết, hiệu năng cao.      |
| `<Controller>` | Dùng khi input **không hỗ trợ trực tiếp `ref` hoặc event** (custom component / controlled component). |

---

## 🔬 2. So sánh chi tiết các tiêu chí

| Tiêu chí                            | `register`                                                                   | `<Controller>`                                                            |
| ----------------------------------- | ---------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| ✅ **Hiệu năng (performance)**       | **Tốt nhất** vì RHF quản lý bằng uncontrolled input. Không gây re-render.    | Tốn thêm `render` props mỗi field. Dễ gây re-render nếu không tối ưu.     |
| 🔧 **Dễ viết / maintain**           | Ngắn gọn, dễ đọc, ít mã hơn.                                                 | Cần `render` props. Dễ gây rối nếu nhiều field.                           |
| 📦 **Hỗ trợ input AlignUI**         | OK nếu input tuân theo chuẩn `ref`, `onChange`, `name`.                      | Bắt buộc dùng nếu input không truyền được `ref`, hoặc dùng Slot phức tạp. |
| 🧩 **Form nhiều field (50+)**       | Rất phù hợp, vì hiệu năng cao, không re-render toàn form.                    | Tốn nhiều code, có thể chậm nếu mỗi field là controlled component.        |
| 🧠 **Form phức tạp (Step, Wizard)** | Có thể xử lý tốt nếu input đơn giản.                                         | Hữu ích nếu cần xử lý logic phức tạp, dynamic field, custom components.   |
| 🚀 **Mở rộng (custom input)**       | Khó hơn nếu input không support ref/onChange (ví dụ: AUI input chưa tối ưu). | Bắt buộc dùng `<Controller>` để custom behavior.                          |
| 👨‍🔧 **Debug dễ không?**           | Dễ debug vì data binding rõ ràng.                                            | Có thể rối vì logic bị ẩn trong render prop.                              |
| 📐 **Tái sử dụng component**        | Dễ nếu input nhận props chuẩn RHF.                                           | Dễ hơn trong các component complex (multi-layer Input).                   |

---

## ✅ Khi nào nên **dùng `register`**?

> Ưu tiên dùng mặc định.
> Chỉ cần component có thể nhận `ref`, `name`, `onChange`, `onBlur` từ RHF — thì `register` là tối ưu nhất.

### Ví dụ dùng với AUI:

```tsx
<Input.Root>
  <Input.Wrapper>
    <input {...register('email')} />
  </Input.Wrapper>
</Input.Root>
```

---

## ✅ Khi nào nên **dùng `<Controller>`**?

> Khi component là **controlled**, hoặc không expose `ref`/`onChange`.

### Ví dụ AUI có Slot (không nhận `ref` trực tiếp):

```tsx
<Controller
  name="email"
  control={form.control}
  render={({ field }) => (
    <Input.Root>
      <Input.Wrapper>
        <input {...field} />
      </Input.Wrapper>
    </Input.Root>
  )}
/>
```

---

## ✅ Khuyến nghị dùng cho AlignUI

| Tình huống                                            | Khuyên dùng                                   |
| ----------------------------------------------------- | --------------------------------------------- |
| AUI input đơn giản, expose thẳng `input`              | ✅ `register`                                  |
| AUI input có Slot/phức tạp, custom nội dung nhiều lớp | ✅ `Controller`                                |
| Tạo component dùng lại nhiều lần (InputField.tsx)     | ✅ `Controller` hoặc `forwardRef` + `register` |

---

## 💡 Bổ sung: Nếu muốn kết hợp tốt AUI + RHF

👉 Hãy viết wrapper:

```tsx
interface InputFieldProps {
  control: Control<Inputs>;
  name: keyof Inputs;
}

const InputField = ({ control, name }: InputFieldProps) => (
  <Controller
    name={name as string}
    control={control}
    render={({ field, fieldState }) => (
      <Input.Root>
        <Input.Wrapper>
          <input {...field} />
        </Input.Wrapper>
        {fieldState.error && <span>{fieldState.error.message}</span>}
      </Input.Root>
    )}
  />
);
```

---

## 📚 Tài liệu chính thức:

* [🔗 `register` – RHF docs](https://react-hook-form.com/api/useform/register)
* [🔗 `Controller` – RHF docs](https://react-hook-form.com/api/usecontroller/controller)

---

## ✅ Tổng kết

> **Ưu tiên `register` để có hiệu năng tốt nhất. Chỉ dùng `<Controller>` khi input không hoạt động đúng với `register`.**

Nếu bạn đang dùng Align UI:

* **`Input` đơn giản → `register`**
* **`Input` custom, Slot, multi-layer → `Controller`**

Muốn mình giúp bạn tạo wrapper chuẩn cho AlignUI + RHF?
