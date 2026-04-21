# Interview Version — PTE-6359: Can't update State of Location

## STAR Format (Situation → Task → Action → Result):

**S (Situation):** Users were unable to save or update location states because the system relied on an outdated ID-based reverse lookup that failed when users entered free-text inputs, causing server-side Mongoose CastErrors.

**T (Task):** I needed to transition the Country and State fields to free-text inputs, making Country optional while keeping State mandatory, without causing database errors.

**A (Action):** I completely removed the client-side ID lookup logic and instead stripped `CountryId` and `StateId` from the API payload before submission. I also flattened and refactored the validation logic to ensure State, City, and ZipCode are strictly validated even when Country is empty.

**R (Result):** The location update functionality was restored with a more robust, null-safe payload, and duplicate validation code was reduced by 50%.

## Câu trả lời gộp lại (1–4 câu tự nhiên):
Trong hệ thống cũ, việc update State bị lỗi do cơ chế reverse lookup ID không tương thích với input free-text, gây ra lỗi Mongoose CastError trên server. Để giải quyết, mình đã loại bỏ hoàn toàn cơ chế lookup này, chủ động chặn gửi `CountryId` và `StateId` trong payload, đồng thời tái cấu trúc lại logic validation để linh hoạt cho phép Country rỗng nhưng vẫn kiểm tra chặt chẽ State. Kết quả là tính năng update hoạt động mượt mà trở lại, data an toàn hơn và code validation được rút gọn đáng kể.

## Câu hỏi phỏng vấn FE/BE liên quan:
- Q: Làm sao để xử lý lỗi Mongoose CastError khi gửi thiếu trường tham chiếu (ObjectId)?
  A: Giải pháp tốt nhất là loại bỏ hoàn toàn (dùng toán tử `delete`) trường đó khỏi request payload ở phía client thay vì gán null hoặc chuỗi rỗng. Mongoose sẽ tự động bỏ qua các trường không tồn tại trong payload update.
