Quá hay — làm PR **trực tiếp trong terminal của VS Code** mà không cần `gh` vẫn được 💪
Mình sẽ hướng dẫn cách **chuẩn, nhanh, an toàn** để bạn tạo Pull Request (PR) từ:
`feature/demo-git-rebase-2 → dev-to-demo-rebase`

---

## 🧭 Mục tiêu

Tạo Pull Request trên **GitHub** chỉ bằng VS Code terminal (hoặc git CLI).
Ta sẽ dùng **git + trình duyệt**, không cần GitHub CLI.

---

## ✅ Bước 1. Đảm bảo bạn đã push branch rebase xong

Trong VS Code terminal:

```bash
git push origin feature/demo-git-rebase-2 --force-with-lease
```

> ⚠️ Phải có `--force-with-lease` vì bạn vừa rebase (thay đổi lịch sử commit).

---

## ✅ Bước 2. Mở link tạo PR trực tiếp từ terminal

Chạy lệnh sau:

```bash
git remote -v
```

Nó sẽ hiện ra đường dẫn như:

```
origin  https://github.com/toanle/LearningNextJSApp.git (fetch)
```

→ Copy phần URL (tức là `https://github.com/toanle/LearningNextJSApp.git`)

---

## ✅ Bước 3. Tạo link mở Pull Request

Xóa `.git` ở cuối, rồi thêm đoạn sau vào link:

```
/compare/dev-to-demo-rebase...feature/demo-git-rebase-2
```

Ví dụ hoàn chỉnh:

```
https://github.com/toanle/LearningNextJSApp/compare/dev-to-demo-rebase...feature/demo-git-rebase-2
```

---

## ✅ Bước 4. Mở link đó trong trình duyệt (hoặc command line)

Nếu bạn muốn mở trực tiếp từ VS Code terminal (Mac hoặc Linux):

```bash
open https://github.com/toanle/LearningNextJSApp/compare/dev-to-demo-rebase...feature/demo-git-rebase-2
```

> Trên Windows thì dùng:

```bash
start https://github.com/toanle/LearningNextJSApp/compare/dev-to-demo-rebase...feature/demo-git-rebase-2
```

---

## ✅ Bước 5. GitHub sẽ mở trang “Compare & Pull Request”

Tại đây bạn:

- Xác nhận:

  - **base:** `dev-to-demo-rebase`
  - **compare:** `feature/demo-git-rebase-2`

- Thêm **title** và **description** cho PR
  Ví dụ:

  ```
  feat: Feature A - rebased with latest dev updates
  - Includes step 1 & step 2
  - Resolved conflicts during rebase
  ```

- Bấm **“Create Pull Request”**

🎉 Xong! PR của bạn đã được tạo chỉ từ terminal mà không cần `gh`.

---

## 💡 Tóm gọn

| Mục đích              | Lệnh                                                                                    |
| --------------------- | --------------------------------------------------------------------------------------- |
| Push branch đã rebase | `git push origin feature/demo-git-rebase-2 --force-with-lease`                          |
| Xem remote repo URL   | `git remote -v`                                                                         |
| Mở link tạo PR        | `open https://github.com/<repo>/compare/dev-to-demo-rebase...feature/demo-git-rebase-2` |

---

Bạn có thể gửi mình kết quả `git remote -v` để mình giúp bạn viết **đúng link PR** sẵn luôn nhé 🚀
