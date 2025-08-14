passHref là một prop của component <Link> trong Next.js (trước phiên bản 13), dùng để truyền thuộc tính href xuống thẻ con (thường là <a>).
Nó đảm bảo rằng thẻ <a> bên trong <Link> nhận được đúng thuộc tính href để hoạt động như một link HTML chuẩn.

Khi nào cần passHref?
Khi bạn dùng <Link> bọc một thẻ <a> bên trong:
Nếu không có passHref, thẻ <a> sẽ không có thuộc tính href, dẫn đến không hoạt động đúng như một link.
Lưu ý:
Next.js 13+ (App Router) với <Link> mới, bạn không cần dùng passHref nữa.
Nếu bạn dùng <Link> và truyền trực tiếp component con là <a>, Next.js sẽ tự động truyền href.
Tóm lại:
passHref giúp truyền thuộc tính href từ <Link> xuống thẻ <a> con bên trong, đảm bảo link hoạt động đúng trong các phiên bản Next.js cũ.