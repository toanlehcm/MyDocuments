Bạn đang dùng useQuery để lấy data user ngay trong component form, như vậy là hoàn toàn hợp lý và là best practice với React Query và React Hook Form cho các lý do sau:

Vì sao đây là best practice?
Tách biệt logic lấy data và logic form:

useQuery quản lý lifecycle, cache, loading, error cho bạn.
Form chỉ quan tâm đến data đã có.
Đồng bộ tốt với React Hook Form:

Khi data user trả về, bạn dùng form.reset() để set lại giá trị form (edit).
Khi không có userId (tạo mới), form dùng defaultValues rỗng.
Dễ mở rộng, dễ test:

Có thể tái sử dụng logic lấy user ở nhiều nơi.
Dễ kiểm soát loading, error, refetch.
Một số lưu ý để tối ưu hơn
Chỉ render form khi data đã sẵn sàng (edit):
Không gọi reset nhiều lần không cần thiết.
Không truyền object inline vào defaultValues của useForm.
Có thể tách logic lấy user ra custom hook nếu form phức tạp.
Ví dụ chuẩn
Tài liệu tham khảo
React Query - useQuery
React Hook Form - FAQ: How to set defaultValues from async data
Tóm lại:

Gọi API lấy user bằng useQuery trong form là best practice, miễn là bạn reset form đúng lúc và chỉ render khi data đã sẵn sàng.
Đây là cách tối ưu, clean code, dễ bảo trì cho cả create và edit!