1. **Các skill hiện tại đang có (trong session này)**
- `imagegen`
- `openai-docs`
- `plugin-creator`
- `skill-creator`
- `skill-installer`

2. **Các skill nên có thêm (phù hợp codebase/tech stack PtEverywhere)**
- `pte-angularjs-1x`: quy ước AngularJS 1.6 (scope, DI min-safe, ng-repeat track by, one-time binding, tránh ES2020 trên client)
- `pte-cordova`: patterns Cordova Android `14.0.1` + iOS `6.0.0` (file handling, InAppBrowser, file-opener2, permission/scoped storage)
- `pte-printing`: chuẩn hóa luồng in HTML/PDF/S3 và fallback Android 10+
- `pte-actionhero`: ActionHero actions/middlewares + errorCode pattern
- `pte-mongoose-dal`: DAL/Logic/Model separation, `.lean()/.select()`, soft-delete filters, pagination
- `pte-testing`: Jest (server) + Karma/Jasmine (client) conventions, smoke tests tối thiểu
- `pte-a11y`: WCAG 2.1 AA cho AngularJS/Material/Bootstrap (aria-label, keyboard nav)

Ghi chú: `skill-installer` cần chạy script Python để list/install curated skills, nhưng máy hiện tại không có `python/py` nên em chưa thể tự liệt kê “curated list” từ `openai/skills` bằng tool được. Nếu anh cài Python (hoặc có cách chạy Python trong môi trường này), em sẽ chạy `list-skills.py` và đề xuất install đúng tên skill từ curated repo.