Lệnh `git update-index --skip-worktree` dùng để báo cho Git **bỏ qua việc theo dõi các thay đổi (ignore changes)** trên những file **đã được commit** vào repository.

Tuy nhiên, có một lưu ý rất quan trọng: lệnh này **chỉ hoạt động trên FILE, không hoạt động trên THƯ MỤC (folder)**.

Dưới đây là hướng dẫn chi tiết cách để ignore toàn bộ folder `cordova-android` tùy theo mục đích của anh:

### CÁCH 1: Bỏ qua thay đổi local (Git vẫn giữ file trên server, chỉ lờ đi thay đổi ở máy anh)
Dùng khi folder này đã có trên Git, anh muốn sửa file thử nghiệm ở máy mình nhưng không muốn Git bắt push lên.

Vì không thể chạy cho folder, anh phải chạy lệnh cho **tất cả các file trong folder đó**:

**Trên MacOS / Linux / Git Bash (Windows):**
```bash
git ls-files Client/app/cordova-android | xargs git update-index --skip-worktree
```

**Trên PowerShell (Windows):**
```powershell
git ls-files Client/app/cordova-android | ForEach-Object { git update-index --skip-worktree $_ }
```

💡 **Cách mở lại (khi anh muốn Git theo dõi lại để commit lên server):**
Đổi `--skip-worktree` thành `--no-skip-worktree`:
```bash
git ls-files Client/app/cordova-android | xargs git update-index --no-skip-worktree
```

---

### CÁCH 2: Xoá hẳn folder này khỏi Git repo (Nhưng vẫn giữ lại ở máy local)
Dùng khi folder này lẽ ra không nên được đưa lên Git (ví dụ file build tự sinh), anh muốn report cho Git biết là hãy quên nó đi.

**Bước 1:** Bỏ theo dõi (xoá khỏi cache của Git nhưng giữ file trên ổ cứng)
```bash
git rm -r --cached Client/app/cordova-android
```

**Bước 2:** Thêm folder vào file `.gitignore`
Mở file `.gitignore` ở thư mục gốc của dự án và thêm dòng này vào cuối:
```
Client/app/cordova-android/
```

**Bước 3:** Commit thay đổi
```bash
git add .gitignore
git commit -m "chore: ignore cordova-android folder"
```
*(Sau bước này, trên server Git sẽ bị xoá folder này, nhưng trên máy anh vẫn còn nguyên).*