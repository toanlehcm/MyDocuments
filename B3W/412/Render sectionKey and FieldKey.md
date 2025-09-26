À, để mình phân tích giúp bạn nhé 👇

---

### 1. Vì sao trước đây có `toSectionKey` và `toFieldKey`?

* **`toSectionKey`**: để chuẩn hóa `section.name` (ví dụ `"Basic Information"` → `basicInformation`) thành key **ổn định/deterministic** dùng làm object key trong `defaultValues`.
* **`toFieldKey`**: để chuẩn hóa `f.key` (ví dụ `"FIRST_NAME"` → `firstName`) thành key dùng trong `react-hook-form`.

> Đây là cách đảm bảo rằng khi API trả về `"Basic Information"` hay `"basic-information"`, thì bạn vẫn có key **consistent** trong JS object.

---

### 2. Khi API có `i18n` (VD `"i18n": "label.basicInformation"`)

* `i18n` **không phải là key để bind form** mà là **key để dịch label** bằng `useTranslation`.
* Trong `react-hook-form`, bạn vẫn cần 1 key **để quản lý state** (`form.register("basicInformation.firstName")`).
* Cái key đó **không thể** là `"label.basicInformation"` vì:

  1. Nó có dấu chấm → bị hiểu như nested object key (`{ label: { basicInformation: ... } }`)
  2. Nó gắn liền với ngôn ngữ (label), không phải với **business data** (field key).

---

### 3. Vậy nên:

* **`toSectionKey` và `toFieldKey` vẫn cần thiết** để tạo ra stable form key.
* **`i18n` dùng cho label hiển thị** (qua `t(i18n)`), **không phải để làm form key**.

Ví dụ:

```ts
const sectionKey = toSectionKey(section.name)
const fieldKey = toFieldKey(f.key)

result[sectionKey][fieldKey] = f.items?.value ?? ''
```

Rồi khi render UI:

```tsx
<h3>{t(section.i18n)}</h3>
<Label>{t(field.i18n)}</Label>
```

---

✅ Như vậy:

* **Form key**: ổn định, không phụ thuộc ngôn ngữ (dùng `toSectionKey`, `toFieldKey`).
* **Label hiển thị**: phụ thuộc ngôn ngữ (dùng `t(i18n)`).

---

👉 Nếu bạn bỏ luôn `toSectionKey` và `toFieldKey`, thì form key sẽ dựa vào `i18n`, và sẽ gặp vấn đề:

* Key bị thay đổi nếu `i18n` đổi format (VD `"label.basicInformation"` → `"form.basicInfo"`).
* Key có dấu chấm `"label.basicInformation"` → nested key không mong muốn trong `react-hook-form`.
* Không tách biệt giữa **dữ liệu** và **ngôn ngữ hiển thị**.

---

Bạn có muốn mình viết lại một ví dụ **tối ưu hơn**:

* `buildDefaultValuesFromStructure` vẫn dùng `toSectionKey`, `toFieldKey`.
* Nhưng UI render label sẽ dùng `t(section.i18n)` thay vì `section.name`.

Cho bạn thấy full workflow từ API → form state → UI translation?
