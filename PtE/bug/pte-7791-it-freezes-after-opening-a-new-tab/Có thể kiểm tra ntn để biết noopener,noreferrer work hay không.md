Để kiểm tra xem cờ `noopener,noreferrer` đã hoạt động thành công hay chưa và nó có thật sự giúp tách Process, anh có thể làm cách cực kỳ đơn giản sau:

### Cách 1: Kiểm tra bằng Developer Tools (Console)
Đây là cách check kỹ thuật nhanh nhất xem 2 tab đã bị "cắt đứt quan hệ" chưa:
1. Ở tab **Calendar**, anh bấm chuột phải chọn **"View Associated Tasks"** để mở ra thẻ mới.
2. Ở thẻ **Tasks (vừa được mở)**, F12 lên và vào tab **Console**.
3. Gõ câu lệnh này vào Console rồi nhấn Enter:
   ```javascript
   window.opener
   ```
   * **Kết quả ra `null`**: Chúc mừng anh! `noopener` đã hoạt động. Tab Tasks hiện tại là một Process hoàn toàn độc lập với Calendar.
   * **Kết quả ra một object `Window {...}`**: Code của mình chưa ăn ngầm, 2 tab vẫn đang dính chùm process với nhau.

### Cách 2: Test triệt để Root Cause Freeze (Hardcore Test)
Anh có thể tạm thời xóa dòng Hack `$animate` mà mình đã làm ở bài trước để xem `noopener` có tự gánh được lỗi freeze không:

1. Tạm thời **comment (//)** dòng code `$animate.enabled(false)` trong [app.js](cci:7://file:///d:/Sources/pteverywhere/Client/app/scripts/app.js:0:0-0:0) ([showPopupAddEditTask](cci:1://file:///d:/Sources/pteverywhere/Client/app/scripts/app.js:4974:8-5001:9)).
2. Mở 1 tab Calendar gốc.
3. Từ Calendar, dùng "View Associated Tasks" mở liên tục **6-7 thẻ Tasks mới** (cứ ra tab mới thì lại way về Calendar mở tiếp).
4. Ở tab Tasks cuối cùng (tab thứ 7), giữ nguyên ở màn hình đó, bấm nút `+ Task`.
5. **Hiện tượng mong đợi**: Dialog hiển thị CỰC MƯỢT mà **không hề bị Freeze**, dù mình không còn dùng `$animate.enabled(false)` nữa. Lý do là tab thứ 7 này đã được cấp một memory Process chuyên biệt, không phải xếp hàng event loop chung với 6 background tabs kia.

Anh cứ test thử nhé! Đây là một kiến thức rất đắt giá về Browser Performance đối với các ứng dụng SPA (Single Page Application) nặng như PtE đấy.
