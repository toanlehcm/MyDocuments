Chào Toàn, hệ thống GitHub CLI (`gh`) của bạn hiện đang quản lý rất tốt 2 tài khoản và cho phép bạn thêm tài khoản thứ 3 một cách dễ dàng. 

Dưới đây là các bước để bạn đăng nhập thêm tài khoản **ToanLe2017** và cách chuyển đổi qua lại giữa chúng.

### Bước 1: Đăng nhập thêm tài khoản mới vào GitHub CLI
Để thêm tài khoản `ToanLe2017`, bạn chỉ cần mở Terminal và chạy lệnh sau:

```bash
gh auth login
```

Sau đó, Terminal sẽ hiển thị các câu hỏi tương tác, bạn hãy dùng phím mũi tên và Enter để trả lời như sau:
1. **What account do you want to log into?** -> Chọn `GitHub.com`
2. **What is your preferred protocol for Git operations?** -> Chọn `HTTPS`
3. **Authenticate Git with your GitHub credentials?** -> Chọn `Yes`
4. **How would you like to authenticate GitHub CLI?** -> Chọn `Login with a web browser`

Lúc này, Terminal sẽ cung cấp cho bạn một **đoạn mã (One-time code)** và tự động mở trình duyệt web lên. 
* *Lưu ý: Trên trình duyệt web, hãy chắc chắn rằng bạn đang đăng nhập bằng tài khoản `toanlehcm2017@gmail.com` (ToanLe2017), nếu đang ở tài khoản khác thì hãy đăng xuất ra trước.*
* Nhập đoạn mã từ Terminal vào trình duyệt để cấp quyền (Authorize).

### Bước 2: Kiểm tra lại danh sách tài khoản
Sau khi xác thực thành công trên trình duyệt, bạn quay lại Terminal và gõ lại lệnh cũ để kiểm tra:

```bash
gh auth status
```
Lúc này bạn sẽ thấy cả 3 tài khoản, và `ToanLe2017` sẽ được đánh dấu là `- Active account: true`.

### Bước 3: Cách chuyển đổi (Switch) giữa các tài khoản
Khi có nhiều tài khoản, bạn chỉ có thể dùng 1 tài khoản làm Active (để thực hiện lệnh `git clone`, `git push`...). Để đổi qua đổi lại giữa 3 tài khoản này, bạn dùng lệnh:

```bash
gh auth switch
```
Terminal sẽ hiện ra danh sách các tài khoản, bạn chỉ việc dùng phím mũi tên chọn tài khoản muốn dùng rồi nhấn Enter là xong.

---

### ⚠️ Lưu ý CỰC KỲ QUAN TRỌNG về Git Config (Tên tác giả Commit)
Mặc dù bạn đã đổi tài khoản tải code bằng `gh`, nhưng thông tin **Global Git Config** của bạn hiện tại vẫn đang là:
* Name: `Toan Le`
* Email: `thanhtoanhcm1602@gmail.com`

Điều này nghĩa là nếu bạn clone một project của `ToanLe2017` về và code, khi commit lên, hệ thống vẫn ghi nhận tác giả là cái email cũ kia. Để khắc phục, **mỗi khi clone xong một repo dành cho tài khoản ToanLe2017**, bạn phải di chuyển vào thư mục repo đó và cài đặt lại thông tin *Local* (chỉ áp dụng cho repo đó):

```bash
cd ten_thu_moc_vua_clone
git config user.name "ToanLe2017"
git config user.email "toanlehcm2017@gmail.com"
```

Bạn hãy thử chạy lệnh `gh auth login` để thêm tài khoản nhé. Bạn có muốn tôi hướng dẫn thêm cách thiết lập SSH Key thay vì HTTPS để quản lý nhiều tài khoản tự động hơn không?