Chào anh, em đã truy vết luồng chạy của dữ liệu và tìm ra chính xác nơi property PayerAddress (và PayeeAddress) được tạo ra.

Biến {{remitPayment.PayerAddress}} hiển thị trong file HTML không được tạo ra ở Frontend (AngularJS). File 

popupRemitPaymentPtE.js
 chỉ làm nhiệm vụ gọi API để lấy data gán vào biến $scope.remitPayment = remitPayment.

Data thực chất được Server (Node.js) tính toán và trả về qua API v4GetRemitPayment.

Dưới đây là chi tiết luồng chạy:

1. Luồng gọi hàm
Tại file Client/app/scripts/controllers/insurance/popupRemitPaymentPtE.js (line 1144), hàm 

_getRemitClaimList()
 sẽ gọi API v4GetRemitPayment.
API này map vào file Action Backend: Server/actions/v4_InsuranceERA.js (line 357).
Action này gọi xuống Logic layer: Server/logicMongo/v4_InsuranceERALogic.js.
2. Dòng code tạo ra PayerAddress
Tại file Server/logicMongo/v4_InsuranceERALogic.js (hàm v4_InsuranceERALogic.getRemitPayment, ở dòng 1475 - 1478), data được nối lại với nhau như sau:

javascript
// Lấy các mảnh địa chỉ từ Database của Payer
  const payerAddressInfo = [
    remitPayment.PayerAddress1, 
    remitPayment.PayerAddress2, 
    remitPayment.PayerCity, 
    remitPayment.PayerState, 
    remitPayment.PayerZipCode
  ];
  // Lọc bỏ các giá trị null/rỗng ròi nối lại bằng dấu phẩy
  remitPayment.PayerAddress = payerAddressInfo.filter(i => i).join(', ');
  // Tương tự cho Payee
  const payeeAddressInfo = [
    remitPayment.PayeeAddress1, 
    remitPayment.PayeeAddress2, 
    remitPayment.PayeeCity, 
    remitPayment.PayeeState, 
    remitPayment.PayeeZipCode
  ];
  remitPayment.PayeeAddress = payeeAddressInfo.filter(i => i).join(', ');
💡 Nguồn gốc sâu nhất: Các field như PayerAddress1, PayerCity, PayerZipCode... là các trường được lưu trữ sẵn trong Model Database 

InsuranceERA
 (bảng lưu Remit Payment). Khi parse file X12 835 (file EDI của bảo hiểm) đẩy vào system, chúng đã được lưu cứng ở các field riêng biệt, và Server chỉ việc ghép chúng lại thành 1 chuỗi string PayerAddress trước khi ném lên cho Frontend Client hiển thị.

