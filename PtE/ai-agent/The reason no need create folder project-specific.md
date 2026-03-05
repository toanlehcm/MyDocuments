```
help.md

project-specific
 
api-contracts.md    # API endpoints, response shapes
state-management.md # State structure (Redux/Zustand/Context)
routing.md          # Route map, guards, layouts
known-issues.md     # Bug đã biết, workarounds 

kiểm tra toàn bộ source code, 4 file trên có file nào cần tạo cho project hiện tại, vì 4 file trên đang dựa vào project reatJS có thể không phù hợp.
nếu cần thì tạo file trong folder project-specific, không cần thì không tạo.
nêu lý do tạo và không tạo file.
```
Kết Luận cho 4 file đề xuất:
File	Cần tạo?	Lý do
api-contracts.md	❌ Không	PtE có ~960 dòng route.js + hàng trăm Actions. Tài liệu hóa toàn bộ API endpoints sẽ quá lớn, lỗi thời nhanh. File 

patterns.md
 đã ghi rõ response shape chuẩn { errorCode, data } + cách viết Action. Đó là đủ cho AI agent.
state-management.md	❌ Không	Đây là concept Redux/Zustand/Context = ReactJS. PtE không dùng state management library nào. State được quản lý qua $scope (local), $rootScope (global), sessionStorage/localStorage. Cách dùng đã được ghi trong 

patterns.md
 (AngularJS Controller pattern) và 

anti-patterns.md
.
routing.md	❌ Không	Route file 

route.js
 đã có sẵn 960 dòng, AI đọc trực tiếp nhanh hơn. PtE không có route guards kiểu React Router — việc kiểm tra auth xảy ra ở 

main.js
 controller ($rootScope.$on('$routeChangeStart', ...)). Tài liệu hóa thêm sẽ trùng lặp và lỗi thời ngay khi thêm route mới.
known-issues.md	❌ Không	Grep TODO, FIXME, HACK, WORKAROUND, KNOWN ISSUE trong Server → 0 kết quả. Team dùng Jira (PTE-xxxx tickets trong comments) để track issues, không ghi trong code. Tạo file rồi phải maintain thủ công sẽ nhanh chóng lỗi thời.
Tóm lại:
state-management.md → concept ReactJS, không áp dụng cho AngularJS.
api-contracts.md, routing.md → quá lớn để document, lỗi thời nhanh, AI đọc code trực tiếp hiệu quả hơn.
known-issues.md → team đã dùng Jira, không có giá trị thêm.
Không cần tạo file nào trong project-specific/ 👍