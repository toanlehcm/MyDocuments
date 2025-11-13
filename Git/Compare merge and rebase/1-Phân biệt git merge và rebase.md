Tuyệt vời 🔥 — bạn sắp “level up” kỹ năng Git thực sự.
Hiểu và **thực hành phân biệt `merge` vs `rebase`** là điều mà 90% dev chỉ hiểu lý thuyết nhưng không dám thử.
Mình sẽ hướng dẫn bạn **bài thực hành cụ thể, step-by-step**, để bạn _tự tay_ làm và thấy sự khác biệt rõ ràng 👇

---

# 🧭 MỤC TIÊU

- Biết **khi nào dùng `merge`, khi nào dùng `rebase`**
- Thấy **lịch sử commit khác nhau như thế nào**
- Trực quan hóa qua `git log --oneline --graph`

---

# 🧩 PHẦN 1 – Chuẩn bị môi trường

Mở terminal và làm theo từng bước:

```bash
mkdir git-rebase-merge-demo
cd git-rebase-merge-demo
git init
```

Tạo file đầu tiên:

```bash
echo "Hello World" > file.txt
git add .
git commit -m "init: initial commit"
```

---

# 🧩 PHẦN 2 – Tạo branch và commit song song

Tạo nhánh chính và nhánh tính năng:

```bash
git checkout -b main
git checkout -b feature
```

Thêm commit vào nhánh **feature**:

```bash
echo "Feature A - step 1" >> file.txt
git add file.txt
git commit -m "feat: add feature A step 1"

echo "Feature A - step 2" >> file.txt
git add file.txt
git commit -m "feat: add feature A step 2"
```

Bây giờ quay lại **main** và thêm commit khác:

```bash
git checkout main
echo "Main update 1" >> file.txt
git add file.txt
git commit -m "chore: update main"
```

---

# 🧩 PHẦN 3 – Dùng `merge`

Quay lại **main** và merge **feature** vào:

```bash
git merge feature
```

Xem lịch sử:

```bash
git log --oneline --graph --all
```

🧠 Bạn sẽ thấy:

- Git tạo **một commit merge (commit hợp nhất)**
- Lịch sử có **nhánh rẽ và hội tụ lại**
- Dễ nhìn thấy branch history, nhưng hơi “rối” nếu nhiều branch.

---

# 🧩 PHẦN 4 – Reset lại & thử `rebase`

Chúng ta sẽ reset để so sánh:

```bash
git checkout feature
git reset --hard HEAD~2  # xóa 2 commit cuối trên feature (nếu muốn làm lại)
```

Thực tế dễ hơn: ta clone lại repo mới để thử rebase riêng biệt:

```bash
cd ..
git clone git-rebase-merge-demo git-rebase-rebase-demo
cd git-rebase-rebase-demo
```

Tạo lại `feature` branch và commit y như trên:

```bash
git checkout -b feature
echo "Feature A - step 1" >> file.txt
git add .
git commit -m "feat: add feature A step 1"

echo "Feature A - step 2" >> file.txt
git add .
git commit -m "feat: add feature A step 2"
```

Quay lại main và update:

```bash
git checkout main
echo "Main update 1" >> file.txt
git add .
git commit -m "chore: update main"
```

Giờ thử **rebase**:

```bash
git checkout feature
git rebase main
```

🧠 Git sẽ:

- “Gỡ” các commit của feature ra,
- “Đặt” chúng lên đầu lịch sử của main,
- Lịch sử trở thành **thẳng tắp** — không có merge commit.

Xem lịch sử:

```bash
git log --oneline --graph --all
```

👉 Bạn sẽ thấy lịch sử “linear” – nhìn như bạn commit sau main, không có nhánh phụ.

---

# 🧠 PHẦN 5 – So sánh merge vs rebase

| Đặc điểm                     | `git merge`                            | `git rebase`                                            |
| ---------------------------- | -------------------------------------- | ------------------------------------------------------- |
| Lịch sử                      | Có nhánh rẽ và merge commit            | Lịch sử thẳng tắp, không có merge commit                |
| Dễ đọc khi làm việc nhóm     | ✅ Có thể thấy rõ ai merge vào đâu     | ⚠️ Có thể khó debug nếu rebase nhiều                    |
| Giữ nguyên lịch sử commit cũ | ✅ Giữ nguyên                          | ❌ Viết lại lịch sử                                     |
| Dễ dùng trong team lớn       | ✅ Có                                  | ⚠️ Phải cẩn thận, không rebase branch đã push công khai |
| Dùng khi nào?                | Khi bạn muốn **lưu lại lịch sử merge** | Khi bạn muốn **lịch sử sạch, tuyến tính**               |

---

# 🧩 PHẦN 6 – Thực hành chuyên sâu

Khi bạn hiểu rõ rồi, hãy thử thêm:

```bash
git rebase -i HEAD~3
```

(Interactive rebase – cho phép **gộp commit, đổi thứ tự, đổi message**, cực hữu ích khi clean history trước khi push PR).

---

# 🚀 Tóm tắt nhanh

| Mệnh lệnh                   | Ý nghĩa                                                             |
| --------------------------- | ------------------------------------------------------------------- |
| `git merge feature`         | Hợp nhất branch, giữ toàn bộ lịch sử                                |
| `git rebase main`           | Di chuyển branch hiện tại lên trên `main` để tạo lịch sử tuyến tính |
| `git log --oneline --graph` | Xem lịch sử trực quan                                               |
| `git rebase -i HEAD~n`      | Gộp, chỉnh sửa, reorder commit                                      |

---

Nếu bạn muốn, mình có thể tạo **hình minh họa trực quan** (so sánh branch graph giữa merge và rebase) để bạn nhớ “chỉ nhìn là hiểu ngay”.
Bạn có muốn mình tạo hình đó không?
