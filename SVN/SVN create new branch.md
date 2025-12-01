Trong **SVN**, bạn **không dùng “lệnh tạo branch”** như Git.

SVN tạo branch bằng **Copy (svn copy)** — tức là **copy code từ trunk/tags sang branches**.
Trên **TortoiseSVN**, thao tác “tạo branch mới” chính là:

**✅ Cách tạo branch mới bằng TortoiseSVN**

**1. Chuột phải vào thư mục Working Copy → chọn:**

`TortoiseSVN → Branch/Tag...`

**2. Điền thông tin branch:**
• **To URL:**

Ví dụ:

`https://your-svn-server/project/branches/feature-8924`

• **Create copy in the repository** → tick chọn
• Message (optional)
**3. Nhấn OK → Branch sẽ được tạo trong SVN Repository
🔍 TortoiseSVN thực chất chạy lệnh:**

`svn copy ^/trunk ^/branches/feature-8924 -m "Create feature-8924 branch"`

**🌱 Sau khi tạo branch → switch để làm việc trên branch mới**
Chuột phải Working Copy →
**TortoiseSVN → Switch…**

Chọn URL của branch mới → OK.
**📌 Tóm tắt các thao tác tương ứng trong SVN**Mục tiêuTortoiseSVNLệnh 

**Nếu bạn cần mình có thể hướng dẫn thêm:**
✔ Làm sao để tạo **branch từ một revision cụ thể**

✔ Cách **revert toàn bộ thay đổi** an toàn

✔ Cách **xem diff**, **đổi branch mà không mất file**,

✔ Hoặc setup VSCode để xem SVN changes.

| Mục tiêu | TortoiseSVN | Lệnh SVN |
| --- | --- | --- |
| Checkout | Checkout | `svn checkout` |
| Đổi branch | Switch | `svn switch` |
| Tạo branch mới | Branch/Tag | `svn copy` |
| Commit | Commit | `svn commit` |
| Update | Update | `svn update` |