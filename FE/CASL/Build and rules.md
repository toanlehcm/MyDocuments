Phân biệt build và rules trong CASL
1. build
Chức năng:
Trả về một instance của Ability (hoặc AppAbility), đã được cấu hình với các rule bạn vừa khai báo.
Cách dùng:
Khi nào dùng:
Khi bạn muốn tạo mới một ability để truyền vào context hoặc kiểm tra quyền ngay lập tức.
Phù hợp cho khởi tạo quyền cho user khi đăng nhập, hoặc khi cần ability instance để truyền vào <Can ability={...} />.
2. rules
Chức năng:
Trả về mảng các rule (quy tắc) bạn đã khai báo bằng can/cannot.
Cách dùng:
Khi nào dùng:
Khi bạn muốn lưu rule vào database, hoặc update một ability đã có sẵn (dùng ability.update(rules)).
Phù hợp cho các trường hợp cần đồng bộ rule giữa client/server, hoặc cập nhật lại quyền động.
So sánh & Khuyến nghị cho Next.js App Router
Tiêu chí	build (tạo instance)	rules (mảng rule)
Dễ dùng	⭐⭐⭐⭐⭐	⭐⭐⭐⭐
Clean code	⭐⭐⭐⭐⭐	⭐⭐⭐⭐
Performance	⭐⭐⭐⭐⭐ (tạo mới nhanh)	⭐⭐⭐⭐ (cần update lại ability)
Dễ maintain	⭐⭐⭐⭐⭐	⭐⭐⭐⭐
Phù hợp Next.js	⭐⭐⭐⭐⭐	⭐⭐⭐⭐
build:

Dùng khi bạn muốn tạo mới ability instance, truyền vào context, hoặc dùng trực tiếp trong component.
Tối ưu, clean, dễ dùng, phù hợp với Next.js App Router.
rules:

Dùng khi bạn muốn lưu rule, hoặc update lại ability đã có.
Thường dùng trong các trường hợp đặc biệt (đồng bộ, lưu trữ).
Kết luận:
Dùng build là tối ưu, clean code, dễ phát triển, phù hợp với Next.js App Router.
Dùng rules khi cần lưu trữ hoặc update lại ability đã có.
Tóm lại:

Dùng build để tạo và sử dụng ability instance trong hầu hết các trường hợp với Next.js.
Dùng rules khi cần thao tác sâu hơn với rule (lưu DB, update lại ability).