### Giải thích đơn giản về `getCombineStatus()` và `componentMap`

#### 1. **Mục đích của `getCombineStatus()`**

- Hàm này dùng để **xác định trạng thái thực tế** của subscription, dựa trên cả trạng thái của plan (`status`) và trạng thái của clinic (`clinicStatus`).
- Một số trạng thái có thể bị "kết hợp" lại để phản ánh đúng tình hình (ví dụ: plan đang active nhưng clinic đã cancel thì trả về trạng thái `ACTIVE_CANCELLED`).
- Kết quả trả về là một giá trị thuộc kiểu `SubscriptionStatus`, dùng để tra cứu các thông tin liên quan đến trạng thái này.

**Ví dụ:**
- Nếu plan là `ACTIVE` nhưng clinic là `ACTIVE_CANCELLED` → trả về `ACTIVE_CANCELLED`.
- Nếu plan là `SUSPENDED` và còn tiền nợ → trả về `SUSPENDED_DUE`.

#### 2. **Mục đích của `componentMap`**

- Đây là một **bản đồ (mapping)** giữa các trạng thái subscription (`SubscriptionStatus`) và các thành phần UI cần hiển thị (`SubscriptionDetailComponent[]`).
- Mỗi trạng thái sẽ có một danh sách các component cần render trên giao diện.
- Khi biết trạng thái thực tế (từ `getCombineStatus()`), bạn sẽ biết cần hiển thị những phần nào cho người dùng.

**Ví dụ:**
- Nếu trạng thái là `ACTIVE`, sẽ hiển thị các component như: Charges, Next Term, Started, Discount, Payment Method, Therapists, Non-Therapists, RCM Add-on,...
- Nếu trạng thái là `FAILED_PAYMENT`, sẽ hiển thị các component như: Due Amount, Due Date, Started, Discount, Payment Method,...

#### **Cách hoạt động chung**

- Khi gọi `isShowComponent(component)`, hàm sẽ:
  1. Xác định trạng thái thực tế bằng `getCombineStatus()`.
  2. Lấy danh sách các component cần hiển thị từ `componentMap` dựa trên trạng thái đó.
  3. Kiểm tra xem component truyền vào có nằm trong danh sách này không.

---

### **Tóm tắt**

- **`getCombineStatus()`**: Xác định trạng thái subscription thực tế (có thể là trạng thái kết hợp).
- **`componentMap`**: Quy định với mỗi trạng thái thì hiển thị những thành phần UI nào.
- **Mục đích chung**: Giúp giao diện hiển thị đúng các phần thông tin phù hợp với trạng thái của subscription.

Nếu bạn cần ví dụ cụ thể về giá trị trả về hoặc cách sử dụng, hãy hỏi nhé!