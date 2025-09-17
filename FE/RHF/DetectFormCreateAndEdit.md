Để tối ưu, clean code và đảm bảo performance khi dùng React Hook Form (RHF) cho form create và edit (default empty hoặc load data user), bạn nên:

Best Practice cho Create & Edit với RHF
1. Tách rõ logic create và edit
Có thể dùng 1 form component, nhưng phân biệt bằng biến isEdit hoặc userData có tồn tại hay không.
Chỉ reset form khi thực sự cần (khi data user thay đổi hoặc khi mở modal).
2. Sử dụng defaultValues linh hoạt
Khi create:
defaultValues là empty object.
Khi edit:
defaultValues là data của user.
Ví dụ:

3. Reset form đúng thời điểm
Chỉ reset khi data user đã sẵn sàng (edit) hoặc khi mở modal create.
Không reset khi đóng modal hoặc khi data chưa sẵn sàng.
Ví dụ:

4. Không render form khi chưa có data (edit mode)
Ví dụ:

5. Tối ưu performance
Chỉ render lại khi thực sự cần (dùng dependency chuẩn cho useEffect).
Không gọi reset nhiều lần không cần thiết.
Không truyền object inline vào defaultValues (dễ gây re-render).
Tóm tắt mẫu code chuẩn
Tài liệu tham khảo
React Hook Form - Controlled Components
React Hook Form - FAQ: How to work with controlled/uncontrolled inputs
React Hook Form - reset API
Tóm lại:

Tách rõ create/edit, chỉ reset khi cần, không render khi chưa có data, không truyền object inline vào defaultValues, và dùng useEffect để reset khi edit.
Đây là cách tối ưu, clean code và tốt cho performance khi dùng RHF cho create & edit!