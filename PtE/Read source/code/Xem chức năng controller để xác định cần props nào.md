Great questions! Let's break them down step by step:

### 1. Khi tạo một controller, làm sao biết được cần props nào?

- **Props** (ở đây là các dependency injection như `$scope`, `$mdDialog`, `api`, v.v.) phụ thuộc vào:
  - **Chức năng của controller**: Bạn cần xác định controller này dùng để làm gì (ví dụ: hiển thị popup, xử lý dữ liệu, gọi API, v.v.).
  - **Các service/framework bạn sử dụng**: Nếu bạn cần gọi API, bạn sẽ cần `api`. Nếu bạn cần dịch ngôn ngữ, bạn sẽ cần `$translate`.
  - **Các dữ liệu truyền vào từ view hoặc từ nơi gọi controller**: Ví dụ, `selectedClinic`, `data`, `currentPlanData` thường được truyền vào khi mở popup qua `$mdDialog`.

### 2. Props nào bắt buộc và không bắt buộc?

- **Bắt buộc**: Những dependency mà controller cần để hoạt động đúng (ví dụ: `$scope`, `$mdDialog` nếu controller là popup).
- **Không bắt buộc**: Những dependency chỉ dùng cho một số chức năng phụ hoặc có thể không cần thiết nếu không sử dụng tính năng đó (ví dụ: `descriptionOne` nếu chỉ dùng để hiển thị mô tả, có thể null).
- **Cách xác định**:
  - Xem code bên trong controller: Nếu một dependency được sử dụng trực tiếp (ví dụ: `$scope.selectedClinic = selectedClinic;`), nó thường là bắt buộc.
  - Xem nơi gọi controller: Khi mở popup bằng `$mdDialog.show`, các giá trị truyền vào qua `locals` sẽ là props cho controller.

### 3. Làm sao biết controller đang nhận props từ đâu?

- **Từ AngularJS DI (Dependency Injection)**: Các giá trị như `$scope`, `$mdDialog`, `$translate` là service của AngularJS, luôn có sẵn nếu bạn khai báo.
- **Từ nơi gọi controller (thường là popup hoặc route)**:
  - Nếu controller dùng cho popup, props được truyền qua `$mdDialog.show` với thuộc tính `locals`.
    ```javascript
    $mdDialog.show({
      controller: 'popupConvertSubscriptionPtECtrl',
      locals: {
        selectedClinic: clinicObj,
        descriptionOne: '...',
        data: someData,
        currentPlanData: planData
      },
      ...
    });
    ```
  - Nếu controller dùng cho route, props có thể truyền qua resolve hoặc service.

---

**Tóm lại**:  
- Xem chức năng controller để xác định cần props nào.
- Xem code bên trong controller để biết props nào bắt buộc.
- Xem nơi gọi controller (popup, route) để biết props được truyền từ đâu.

Nếu bạn muốn biết chi tiết về một props cụ thể, hãy xem nơi gọi controller hoặc hỏi về props đó!