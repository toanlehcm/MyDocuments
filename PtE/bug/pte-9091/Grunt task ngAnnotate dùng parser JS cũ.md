```JS
Running "ngAnnotate:dist" (ngAnnotate) task
Generating ".tmp/concat/scripts/scripts.js" from: ".tmp/concat/scripts/scripts.js"...ERROR
>> error: couldn't process source due to parse error
>> Unexpected token (28389:13)
Warning: Task "ngAnnotate:dist" failed. Use --force to continue.

Aborted due to warnings.

Client/app/lib/common.js
    if (file?.type?.startsWith('video/') || /\.(mp4|mov|avi)$/i.test(options.fileName)) {
      options.mimeType = file.type;
    }

tại sao grunt build thì bị lỗi trên?
giúp t tìm root cause và solution 
```

Viewed common.js:141-940

### ROOT CAUSE: Incompatible JS Syntax

**Vấn đề rất đơn giản và rõ ràng:**

`file?.type?.startsWith('video/')` — đây là **Optional Chaining** (`?.`), một cú pháp ES2020.

Grunt task `ngAnnotate` sử dụng parser **Acorn** hoặc **Esprima** phiên bản cũ, chỉ hỗ trợ đến ES5/ES6. Parser này **không hiểu** cú pháp `?.` → bắn lỗi `Unexpected token`.

**Tại sao local dev không bị lỗi?** Vì browser hiện đại (Chrome, Firefox 2020+) đã hỗ trợ ES2020 natively. Grunt build mới là bước fail vì dùng old parser.

**Fix: Thay Optional Chaining bằng cú pháp ES5 tương đương:**

Edited common.js

Xong. Giải thích nhanh:

### Root Cause
`file?.type?.startsWith('video/')` dùng **Optional Chaining** (`?.`) — cú pháp **ES2020**.

Grunt task `ngAnnotate` dùng parser JS cũ (Acorn 4.x / Esprima) chỉ hiểu đến **ES6 (2015)**. Parser không nhận ra token `?.` → crash ngay lập tức với lỗi `Unexpected token`.

Browser thì không bị vì Chrome/Firefox từ 2020 đã hỗ trợ ES2020 native, nhưng Grunt parser thì không.

### Fix
Thay `?.` bằng chuỗi `&&` guard tương đương hoàn toàn về logic:

```js
// Trước (ES2020 - Grunt không hiểu)
file?.type?.startsWith('video/')

// Sau (ES5 - Grunt hiểu, logic 100% như cũ)
file && file.type && file.type.startsWith('video/')
```

> [!TIP]
> Project này dùng Grunt build với parser cũ nên **tuyệt đối tránh** các cú pháp ES2020+ trong source files: `?.` (optional chaining), `??` (nullish coalescing), `??=` `||=` `&&=`. Chỉ dùng từ ES6 trở xuống là an toàn.