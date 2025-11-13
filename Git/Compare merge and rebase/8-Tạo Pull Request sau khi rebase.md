# Tạo Pull Request từ feature/demo-git-rebase-2 → dev-to-demo-rebase như thế nào?

---

Tốt lắm 😎 bạn đang ở bước cuối cùng — tạo Pull Request (PR) sau khi rebase thành công.
Mình sẽ hướng dẫn chi tiết **cả bằng GitHub (GUI)** lẫn **Git command line (CLI)** nhé 👇

---

## 🚀 Cách 1: Dùng **GitHub giao diện web (dễ và phổ biến nhất)**

### ✅ Bước 1. Push branch của bạn (nếu chưa)

```bash
git push origin feature/demo-git-rebase-2 --force-with-lease
```

### ✅ Bước 2. Mở GitHub repo của bạn

Đi tới:

```
https://github.com/<tên-organization-hoặc-username>/<tên-repo>
```

GitHub thường sẽ hiện ngay banner màu vàng ở đầu trang:

> “Compare & pull request” cho branch `feature/demo-git-rebase-2`

→ Bấm nút **“Compare & pull request”**

---

### ✅ Bước 3. Kiểm tra base và compare

- **base branch** → `dev-to-demo-rebase`
- **compare branch** → `feature/demo-git-rebase-2`

> Nếu GitHub mặc định để base = `main`, bạn đổi lại thành `dev-to-demo-rebase`.

---

### ✅ Bước 4. Viết tiêu đề & mô tả PR

Ví dụ:

```
Title: feat: Feature A - Rebased on latest dev updates
Body:
- Rebased on dev-to-demo-rebase
- Includes Feature A step 1 & 2
- Fixed conflicts with latest Dev updates
```

---

### ✅ Bước 5. Bấm **“Create Pull Request”**

🎉 Xong! Bây giờ nhóm reviewer có thể review code của bạn.
Trên PR sẽ thấy commit history gọn gàng nhờ rebase:

```
feat: Feature A - step 1
feat: Feature A - step 2
fix conflict after rebase
```

---

## 💻 Cách 2: Dùng **GitHub CLI (nếu bạn thích terminal)**

Nếu bạn có `gh` (GitHub CLI), làm như sau:

```bash
gh pr create --base dev-to-demo-rebase --head feature/demo-git-rebase-2 --title "Feature A - rebased on dev" --body "Rebased and ready for review"
```

---

## 💡 Lưu ý

- Sau khi tạo PR, **không nên push thêm commit mới lên branch** trừ khi để sửa review.
- Nếu reviewer yêu cầu cập nhật code, bạn có thể sửa rồi `git push origin feature/demo-git-rebase-2 --force-with-lease` lại.

---

Bạn có thể gửi mình ảnh trang PR bạn đang tạo (hoặc link base/compare) để mình check giúp xem đúng hướng `feature/demo-git-rebase-2 → dev-to-demo-rebase` chưa.
Bạn muốn mình giúp xem luôn không?
