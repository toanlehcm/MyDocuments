User is asking why `v4GetTaskGeneralData` is called in both `TasksManagementCtrl` and `PopupAddEditTaskCtrl`, and suspects it might be failing and causing the crash. Investigating the factory and how errors from this API are handled.

Viewed taskFactoryPtE.js:70-150

Explained why `v4GetTaskGeneralData` is fetched globally, verified it handles errors without crashing, and explained that the UI state showing 'Select Patient' while fields are visible is an async data loading visual state, not a crash.

1. **Mục đích gọi `v4GetTaskGeneralData` trong cả 2 chỗ (TasksManagement & Popup):**
Bởi vì popup `PopupAddEditTaskCtrl` có thể được mở từ **bất kỳ đâu** trong app (từ Schedule, từ Patient Profile, Calendar, v.v.) chứ không chỉ từ trang Tasks Management. Để đảm bảo nó luôn có đủ data cho dropdown (danh sách Clinic Users để gán Assigned To, Notified To, ds Entities...), popup **bắt buộc phải tự fetch data độc lập**.

2. **Nghi ngờ API này lỗi làm crash popup:**
Khả năng này **KHÔNG** xảy ra. Em đã check `taskFactoryPtE.js` dòng 101, dev đã handle lỗi cực kỳ an toàn:
```javascript
}, function (error) {
    console.error("v4GetTaskGeneralData, ERROR: ", error);
    return null; // Khi API lỗi, trả về null thay vì throw exception
});
```
Và trong popup `popupAddEditTaskPtE.js` dòng 167:
```javascript
    generalData = response || {}; // Nếu truyền null, nó tự cover thành object rỗng
```
Do đó, nếu API này sập (500, timeout), JS **không bị crash**. Hậu quả duy nhất là các dropdown (Assigned To, Notified To) sẽ bị **trống không có option nào**.

3. **Về bức hình: RelatedTo xuất hiện dù Patient hiển thị "Select Patient":**
Phát hiện của anh rất tinh tường! Tuy nhiên, đây **KHÔNG PHẢI LÀ CRASH ng-show**. Đây là 1 ảo giác về UI do **xử lý bất đồng bộ (Async)**. Trình tự xảy ra trong hình như sau:

- **Bối cảnh:** User click tạo Task khi đang đứng ở 1 màn hình có sẵn bệnh nhân (ví dụ: Patient Dashboard).
- **Lúc đó:** App truyền ngầm ID của bệnh nhân vào popup: `task = { Patient: 'id-bệnh-nhân-123' }`.
- **Dòng 141 chạy:** `$scope.taskModel.Patient = 'id-bệnh-nhân-123'`. 
- **Lúc này:** `checkFieldVisible('RelatedTo')` kiểm tra `!!$scope.taskModel.Patient` → Kết quả là chuỗi ID nên **giá trị là TRUE**. Các field RelatedTo, NotifiedTo **BẬT LÊN NGAY LẬP TỨC**.
- **TẠI SAO PATIENT ĐỂ LÀ "Select Patient"?** Cùng lúc đó (chiếc dòng 150), popup gọi `taskFactory.getPatientDetail('id-bệnh-nhân-123')` để lấy **TÊN** bệnh nhân. Hành động này tốn thời gian (hoặc user đang bị rớt mạng). Trong lúc chờ API trả Tên về, dropdown mặc định hiển thị placeholder là *"Select Patient"*.

**→ Kết luận về bức hình:** Những gì anh thấy trong hình là **trạng thái đang chờ load data tên bệnh nhân**, chứ không phải Angular bị crash (khiến checkFieldVisible sai). Chú ý trong hình cái ô search của thả xuống RelatedTo còn đang mở, nghĩa là JS vẫn đang chạy chứ chưa chết hẳn lúc đó.

---

**CHỐT ROOT CAUSE THEO DỮ LIỆU ĐÃ PHÂN TÍCH:**
Cái làm app freeze cứng đơ thực sự 100% là 2 nguyên nhân ngầm mà em đã báo trước đó:
1. Thiếu `multiple: true` trong popup config (Làm conflict layer `md-select` và `md-dialog`).
2. JS Crash do hàm `_detectChangedEmailPhonePatient` gọi `patientDataView._id` (undefined) khi user tương tác sâu.
