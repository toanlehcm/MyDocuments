Khi bạn bỏ onValueChange (không truyền prop này vào <Select.Root>), React Hook Form sẽ tự động kết nối giá trị field với component thông qua {...inputField} (tức là các prop như onChange, value, v.v. đã được truyền vào).

Nếu bạn không truyền onValueChange, mặc định inputField.onChange sẽ được gọi khi user chọn item, nên giá trị sẽ được cập nhật đúng trong form.
Nếu bạn tự truyền onValueChange nhưng không gọi inputField.onChange(value), hoặc truyền một hàm rỗng, thì giá trị sẽ không được cập nhật vào form state.
Vì vậy:

Nếu không truyền onValueChange, React Hook Form sẽ tự xử lý việc cập nhật value (bao gồm cả default value).
Nếu truyền onValueChange mà không gọi đúng inputField.onChange, bạn sẽ làm mất kết nối này.
Tóm lại
Không cần truyền onValueChange nếu bạn đã spread {...inputField} vào <Select.Root>.
Nếu muốn custom, bắt buộc phải gọi inputField.onChange(value) trong onValueChange.
Kết luận:

Khi bỏ onValueChange, giá trị default và các thay đổi sẽ được React Hook Form tự động đồng bộ qua {...inputField}.
Nếu override onValueChange mà không gọi inputField.onChange, giá trị sẽ không cập nhật vào form.

---------
Bạn có thể bỏ onOpenChange nếu:

Bạn không cần xử lý gì khi đóng/mở select (ví dụ: không cần trigger onBlur để validate, không cần custom logic khi đóng select).
Tuy nhiên, nếu bạn muốn trigger validate khi người dùng đóng select (giúp hiện lỗi khi chưa chọn gì), thì nên giữ lại:

Nếu bạn không cần validate khi đóng select hoặc không cần xử lý gì thêm, có thể bỏ onOpenChange hoàn toàn mà không ảnh hưởng đến việc lấy value hay submit form.

Tóm lại:

Không bắt buộc phải có onOpenChange.
Nếu muốn validate khi đóng select, hãy giữ lại.
Nếu không cần, có thể bỏ đi cho code gọn hơn.