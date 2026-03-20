❓ **Giải đáp thắc mắc: Tại sao thêm vào exclude nhưng Git vẫn theo dõi (track) sự thay đổi?**

Nguyên nhân là do: **Git chỉ phớt lờ (`ignore` hoặc `exclude`) những file CHƯA BAO GIỜ được track (untracked files).**
Nếu những file này trước đây đã từng được `git add` hoặc đã được commit lên Git rồi, thì hệ thống vẫn sẽ tiếp tục theo dõi sự thay đổi của chúng, cho dù bạn có thêm vào `.gitignore` hay [.git/info/exclude](cci:7://file:///d:/Sources/pteverywhere/.git/info/exclude:0:0-0:0) đi chăng nữa.

Để giải quyết, bạn có **2 trường hợp** dựa vào mục đích của bạn:

---

### Cách 1: Bạn chỉ muốn bỏ qua thay đổi ở MÁY CỦA BẠN (Local) - KHUYÊN DÙNG ⭐
Những file này (như `environment.js` hay `pteverywhere.js`) **cần có mặt trên Git** để team dùng, nhưng bạn sửa cấu hình trên máy bạn (ví dụ đổi API URL, DB connection) và **không muốn Git push nhầm lên**.

👉 **Giải pháp:** Dùng lệnh `skip-worktree` để báo Git hãy làm ngơ mọi thay đổi trên các file này:
*Mở Terminal/Command Prompt và chạy:*
```bash
git update-index --skip-worktree Client/app/index.html
git update-index --skip-worktree Client/app/scripts/config/environment.js
git update-index --skip-worktree Client/app/cordova-android
git update-index --skip-worktree Server/package-lock.json
git update-index --skip-worktree Server/config/pteverywhere.js
git update-index --skip-worktree Server/lib/util/pdfUtil.js
git update-index --skip-worktree Server/public/javascript/ActionheroWebsocketClient.min.js
```
*(Lưu ý: Nếu sau này bạn MỐN Git track lại file nào, hãy thay `--skip-worktree` bằng `--no-skip-worktree`)*.

---

### Cách 2: Bạn muốn XÓA HẲN các file này khỏi Git của cả team
Nếu những file này là file rác/file tự sinh ra và **chẳng làm gì có ích cả, đáng lẽ không bao giờ nên nằm trên Git**, bạn cần xóa chúng khỏi cache của Git (vẫn giữ lại file vật lý trên ổ cứng của bạn).

👉 **Giải pháp:** Dùng lệnh `git rm --cached`:
*Mở Terminal/Command Prompt và chạy:*
```bash
git rm --cached Client/app/index.html
git rm --cached Client/app/scripts/config/environment.js
git rm --cached Server/package-lock.json
git rm --cached Server/config/pteverywhere.js
git rm --cached Server/lib/util/pdfUtil.js
git rm --cached Server/public/javascript/ActionheroWebsocketClient.min.js
```
*Sau khi chạy, bạn sẽ thấy các file này chuyển sang trạng thái "Deleted" trên Git. Bạn commit và push lên, chúng sẽ bị xóa khỏi repository chung trên mạng.*

**💡 Lời khuyên của An (Guide):**
Với các file như `index.html` và file config, rất có thể là dự án yêu cầu chúng có trên Git. Anh nên áp dụng **Cách 1** nhé!