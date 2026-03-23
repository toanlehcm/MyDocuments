Đây là danh sách câu hỏi điều tra để hỏi team:

---

### 🔍 Câu hỏi điều tra bug "Màn che / Đơ sau khi View Associated Tasks"

**📅 Timeline & Tần suất:**
1. Bug này xuất hiện từ khi nào? (sau release nào?)
2. Tần suất xảy ra là bao nhiêu? (1/10 lần click? 1/50?): hiếm khi
3. Bug xảy ra tất cả mọi người hay chỉ một số user cụ thể?: nửa team.

**📍 Xác định vị trí bug:**
4. Tab bị đơ là **tab mới** (Tasks) hay **tab cũ** (tab đang mở dropdown)?
5. Sau khi bị đơ, nếu user **refresh tab bị đơ** thì có dùng được không?
6. Khi bị đơ, có nhìn thấy **lớp overlay mờ phủ toàn màn hình** không? (như backdrop)
7. Khi bị đơ, F12 Console có báo lỗi JS gì không?

**🔁 Điều kiện để reproduce:**
8. Bị lỗi ở **tất cả sources** (appointment, document, invoice, contact log) hay chỉ một số? được báo là tất cả.
9. User cần làm gì trước khi click "View Associated Tasks" thì dễ bị lỗi hơn? (vd: có đang mở popup nào không?)
10. Bug có xảy ra ở **cả web lẫn mobile app** không, hay chỉ web?: chỉ có web
11. Bug có phụ thuộc **trình duyệt** không? (Chrome, Firefox, Safari...)
12. Thao tác **nhanh hay chậm** dễ bị hơn? (click liên tục nhiều menu khác nhau rồi mới click View Associated Tasks)

**🧩 Thông tin kỹ thuật:**
13. Trước khi click "View Associated Tasks", user **có đang mở popup/dialog nào** không? (`$mdDialog` hay bootbox?)
14. Khi bị đơ, nếu mở DevTools → Elements, có thấy element nào có class `modal-backdrop`, `cdk-overlay-backdrop`, hoặc `md-dialog-backdrop` trong DOM không?
15. Spinner loading (vòng tròn giữa màn hình) có **biến mất không** sau khi click?