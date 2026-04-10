Chào bạn, rất vui được hướng dẫn bạn! Việc cài đặt Zsh trên Windows 11 sẽ giúp trải nghiệm dòng lệnh của bạn xịn xò và mượt mà hơn rất nhiều, tương tự như trên macOS hay Linux. Vì Windows không hỗ trợ Zsh trực tiếp (Native), chúng ta sẽ sử dụng hệ thống phụ trợ mạnh mẽ của Windows là WSL (Windows Subsystem for Linux).

Dưới đây là các bước chi tiết để bạn có được một Terminal Zsh tuyệt đẹp:

### Bước 1: Cài đặt WSL và Ubuntu (Nếu bạn chưa có)

WSL cho phép bạn chạy môi trường Linux thực sự ngay bên trong Windows mà không cần cài máy ảo nặng nề.

1.  **Mở PowerShell với quyền Quản trị viên (Administrator):** Nhấn phím `Windows`, gõ `PowerShell`, chuột phải và chọn "Run as administrator".
2.  **Cài đặt mặc định:** Gõ lệnh sau và nhấn Enter:
    ```powershell
    wsl --install
    ```
    *Lệnh này sẽ tự động kích hoạt tính năng WSL và cài đặt bản phân phối Ubuntu mặc định.*
3.  **Khởi động lại máy tính:** Khi quá trình cài đặt hoàn tất, hãy khởi động lại PC của bạn.
4.  **Thiết lập User/Password:** Sau khi khởi động lại, một cửa sổ terminal Ubuntu sẽ tự động hiện lên (hoặc bạn tìm `Ubuntu` trong menu Start). Nó sẽ yêu cầu bạn tạo một `username` và `password` cho hệ thống Linux này (lưu ý: mật khẩu khi gõ sẽ không hiện dấu *, cứ gõ xong và nhấn Enter).

### Bước 2: Cài đặt Zsh trong Ubuntu

Bây giờ bạn đã ở trong môi trường Linux (Ubuntu terminal). Mặc định nó sử dụng Bash, chúng ta sẽ chuyển sang Zsh.

1.  **Cập nhật hệ thống:**
    ```bash
    sudo apt update && sudo apt upgrade -y
    ```
2.  **Cài đặt Zsh:**
    ```bash
    sudo apt install zsh -y
    ```
3.  **Xác nhận cài đặt thành công:**
    ```bash
    zsh --version
    ```
    *(Nó sẽ in ra phiên bản của Zsh)*

### Bước 3: Đặt Zsh làm shell mặc định

Để mỗi khi mở Ubuntu, nó sẽ tự động vào Zsh thay vì Bash.

1.  Gõ lệnh sau:
    ```bash
    chsh -s $(which zsh)
    ```
    *(Nó có thể hỏi mật khẩu Linux bạn đã tạo ở Bước 1)*
2.  **Khởi động lại shell:** Đóng cửa sổ Ubuntu lại và mở lên lại. Lần đầu tiên mở, Zsh có thể hiện một menu cấu hình, bạn cứ ấn phím `0` (lựa chọn mặc định) để thoát ra.

### Bước 4: Cài đặt Oh My Zsh (Để giao diện đẹp và xịn)

Zsh gốc nhìn khá chán. Chúng ta sẽ cài framework "Oh My Zsh" để dễ dàng thay đổi giao diện (theme) và thêm các tiện ích (plugins).

1.  **Cài đặt qua dòng lệnh:** (Đảm bảo bạn đã cài `curl` và `git`, thường Ubuntu đã có sẵn)
    ```bash
    sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
    ```
2.  Sau khi cài xong, terminal của bạn sẽ trông khác hẳn.

### Bước 5: Cấu hình Windows Terminal (Quan trọng)

Để trải nghiệm mượt mà nhất, bạn **BẮT BUỘC** phải dùng ứng dụng **Windows Terminal** (có sẵn trên Windows 11, hoặc tải từ Microsoft Store).

1.  Mở ứng dụng **Windows Terminal**.
2.  Mở phần **Cài đặt (Settings)** (nhấn tổ hợp phím `Ctrl + ,` hoặc bấm vào nút mũi tên trỏ xuống trên thanh tab).
3.  **Thay đổi Profile mặc định:** Ở mục "Startup" -> "Default profile", hãy đổi từ `Windows PowerShell` sang `Ubuntu`. (Từ giờ trở đi, cứ mở Windows Terminal là nó sẽ tự động vào Zsh của bạn).

---

### (Tùy chọn) Bước 6: Làm cho Terminal xịn xò hơn nữa

Dưới đây là 2 plugin cực kỳ phổ biến giúp bạn code sướng hơn:

**1. Zsh Autosuggestions (Gợi ý lệnh mờ mờ như Copilot):**
```bash
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
```

**2. Zsh Syntax Highlighting (Đổi màu lệnh: gõ đúng thì xanh, sai thì đỏ):**
```bash
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
```

**Kích hoạt các plugin này:**
1.  Mở file cấu hình bằng lệnh: `nano ~/.zshrc`
2.  Tìm dòng có chữ `plugins=(git)`
3.  Đổi nó thành: `plugins=(git zsh-autosuggestions zsh-syntax-highlighting)`
4.  Lưu lại (nhấn `Ctrl + O` -> `Enter` -> `Ctrl + X`).
5.  Gõ `source ~/.zshrc` để áp dụng.

Bạn hãy thử làm theo các bước trên nhé! Nếu gặp lỗi ở bước nào, hãy copy log dán lên đây, tôi sẽ gỡ rối giúp bạn.