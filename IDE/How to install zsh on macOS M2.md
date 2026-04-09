Chào bạn, cài đặt **Zsh (Z shell)** và bộ khung cấu hình **Oh My Zsh** là một trong những việc đầu tiên và quan trọng nhất mà các lập trình viên thường làm khi sắm máy Mac mới (đặc biệt là các dòng chip Apple Silicon như M1/M2/M3).

Kể từ macOS Catalina (10.15), Apple đã chọn Zsh làm shell mặc định thay cho Bash. Tuy nhiên, để Zsh thực sự mạnh mẽ, đẹp mắt và tự động gợi ý code thông minh như các video trên mạng, bạn cần cài đặt thêm Homebrew và Oh My Zsh.

Dưới đây là hướng dẫn chi tiết, từng bước cài đặt và cấu hình Zsh chuẩn chỉ nhất cho Macbook Pro M2 của bạn.

---

### Bước 1: Kiểm tra Zsh hiện tại
Mở ứng dụng **Terminal** (nhấn `Cmd + Space` và gõ Terminal).
Kiểm tra xem máy bạn đã dùng Zsh chưa bằng lệnh:
```bash
echo $SHELL
```
Nếu kết quả trả về là `/bin/zsh`, bạn đang dùng Zsh. Nếu là `/bin/bash`, hãy gõ lệnh sau để chuyển sang Zsh làm mặc định (có thể máy sẽ hỏi mật khẩu đăng nhập của bạn):
```bash
chsh -s /bin/zsh
```
Sau đó, tắt Terminal (`Cmd + Q`) và mở lại.

### Bước 2: Cài đặt Homebrew (Công cụ quản lý gói thiết yếu)
Homebrew giống như App Store dành cho Terminal. Nó giúp bạn cài đặt các phần mềm dòng lệnh cực kỳ dễ dàng.
Dán nguyên dòng lệnh sau vào Terminal và nhấn Enter:
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```
*Lưu ý: Quá trình này có thể mất vài phút. Bạn sẽ cần nhập mật khẩu máy tính (khi nhập mật khẩu, màn hình sẽ không hiện dấu `***`, cứ tự tin gõ và nhấn Enter).*

**CỰC KỲ QUAN TRỌNG (Dành riêng cho chip M1/M2/M3):**
Sau khi cài xong, Homebrew sẽ báo bạn cần thêm nó vào biến môi trường (PATH) thì mới dùng lệnh `brew` được. Hãy nhìn vào phần **"Next steps"** ở cuối luồng log cài đặt, nó sẽ bảo bạn chạy 2 lệnh (copy và chạy từng lệnh một). Thường 2 lệnh đó sẽ trông giống như thế này:
```bash
(echo; echo 'eval "$(/opt/homebrew/bin/brew shellenv)"') >> /Users/TÊN_USER_CỦA_BẠN/.zprofile
eval "$(/opt/homebrew/bin/brew shellenv)"
```
*(Nhớ thay `TÊN_USER_CỦA_BẠN` bằng tên thư mục gốc của bạn trên máy)*.

Kiểm tra xem brew đã nhận chưa:
```bash
brew --version
```

### Bước 3: Cài đặt Oh My Zsh (Linh hồn của giao diện)
Đây là bộ khung (framework) giúp quản lý cấu hình Zsh, cung cấp hàng ngàn giao diện (theme) và công cụ hỗ trợ (plugins).
Chạy lệnh sau:
```bash
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```
Sau khi cài xong, giao diện Terminal của bạn sẽ đổi khác (có màu sắc, thường mặc định là theme `robbyrussell`).

### Bước 4: Cài đặt 2 Plugin "Trấn Phái" (Bắt buộc phải có)
Đây là 2 plugin biến Zsh thành một trợ lý thông minh:

**1. Tự động gợi ý lệnh dựa trên lịch sử (zsh-autosuggestions):**
Nó sẽ hiển thị mờ mờ câu lệnh bạn từng gõ, chỉ cần nhấn phím mũi tên phải (`→`) là nó tự điền nốt.
```bash
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
```

**2. Tô màu cú pháp (zsh-syntax-highlighting):**
Khi bạn gõ đúng lệnh (ví dụ `cd`, `ls`), nó sẽ màu xanh. Gõ sai (lệnh không tồn tại), nó sẽ màu đỏ. Rất tiện để tránh gõ sai chính tả.
```bash
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
```

### Bước 5: Kích hoạt Plugin trong file cấu hình
Bây giờ, bạn cần bảo Zsh hãy bật 2 plugin vừa tải về.

1. Mở file cấu hình bằng trình soạn thảo Nano:
```bash
nano ~/.zshrc
```
2. Dùng phím mũi tên di chuyển xuống tìm dòng có chữ `plugins=(git)`.
3. Sửa dòng đó thành:
```bash
plugins=(git zsh-autosuggestions zsh-syntax-highlighting)
```
*(Lưu ý: Không có dấu phẩy giữa các plugin, chỉ cách nhau bằng khoảng trắng).*
4. Lưu và thoát: Nhấn `Ctrl + O` -> `Enter` -> Nhấn `Ctrl + X`.

Cuối cùng, chạy lệnh này để Terminal nạp cấu hình mới:
```bash
source ~/.zshrc
```

---
🎉 **Xong!** Bây giờ bạn hãy gõ thử vài lệnh (ví dụ `cd ~/Desktop`, rồi xóa đi gõ lại chữ `c` xem nó có tự gợi ý mờ mờ không). 

Bạn có muốn tôi hướng dẫn thêm cách đổi Theme (giao diện) của Oh My Zsh cho xịn xò và hiển thị được biểu tượng nhánh Git không?