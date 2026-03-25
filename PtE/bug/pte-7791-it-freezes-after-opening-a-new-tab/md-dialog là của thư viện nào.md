`<md-dialog>` là component của thư viện **AngularJS Material** (`angular-material`).

| | **AngularJS Material** | **Angular Material** |
|---|---|---|
| Framework | AngularJS 1.x | Angular 2+ |
| Package | `angular-material` | `@angular/material` |
| Link | [material.angularjs.org](https://material.angularjs.org) | [material.angular.io](https://material.angular.io) |
| Dialog service | `$mdDialog` (JS) | `MatDialog` (TS) |
| Config options | `multiple`, `skipHide`, `hasBackdrop`... | `panelClass`, `data`, `width`... |

Dự án PtE đang dùng **AngularJS 1.6** nên tất cả `md-*` components (`<md-dialog>`, `<md-select>`, `md-contact-chips`...) đều đến từ **AngularJS Material** — không phải Angular Material v2+ (library khác hoàn toàn với API khác nhau).

Đó là lý do tại sao `panelClass` không work — đó là option của Angular Material v2+, còn AngularJS Material không có option này. Fix đúng là thêm class trực tiếp vào HTML template như em đã làm ở [popupAddEditTaskPtE.html](cci:7://file:///d:/Sources/pteverywhere/Client/app/views/tasks/popupAddEditTaskPtE.html:0:0-0:0) dòng 1.