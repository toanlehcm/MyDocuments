Lỗi này là do **CORS preflight** (OPTIONS) không được server của bạn đáp lại với status 2xx và các header cho phép truy cập. Mình đi qua từng bước để bạn hiểu rõ nguyên nhân và cách khắc phục:

---

## 1. Hiểu lỗi “blocked by CORS policy”

Khi bạn gọi API từ `http://localhost:5002` đến `https://development.b3well.com/api/user/users`, trình duyệt sẽ:

1. Gửi một **OPTIONS** request (preflight) để kiểm tra server có cho phép:

   * Origin `http://localhost:5002`
   * Phương thức (GET/POST/PUT/DELETE…)
   * Các header tuỳ chỉnh (`Authorization`, `x-client-id`, v.v.)

2. Nếu server:

   * **Không** trả về status 200–299, hoặc
   * **Không** gửi `Access-Control-Allow-Origin: http://localhost:5002` (hoặc `*`), hoặc
   * **Không** gửi `Access-Control-Allow-Headers` chứa tên các header bạn dùng (ví dụ `Authorization`, `X-Client-Id`),

   thì sẽ bị chặn, và bạn sẽ thấy:

   > Response to preflight request doesn't pass access control check: It does not have HTTP ok status.

---

## 2. Kiểm tra lại config Axios của bạn

Bạn đã tạo instance như sau:

```ts
const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'Accept-Language': 'us',
    'x-client-id': '96e45e59-…'
  }
})
```

Và trong interceptor bạn gắn thêm:

```ts
config.headers.Authorization = 'Bearer ' + token
```

**Chú ý:**

* `x-client-id` và `Authorization` không nằm trong “CORS safelist” nên sẽ KHỞI TẠO preflight.
* Mặc dù bạn chỉnh ở client request, nhưng **CORS là cơ chế server**: client chỉ có thể yêu cầu, server mới cấp phép.

\=> **Axios của bạn không sai**, nhưng server API chưa:

* Trả về status 200 cho OPTIONS,
* Hoặc chưa `Access-Control-Allow-Origin` / `Allow-Headers` tương ứng.

---

## 3. Cách fix (phải ở phía server)

### A. Với Express.js / Nest.js / Fastify

Cài và dùng middleware [cors](https://github.com/expressjs/cors) chẳng hạn:

```js
import cors from 'cors'
app.use(cors({
  origin: 'http://localhost:5002',           // hoặc '*' nếu dev
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization','X-Client-Id']
}))
```

### B. Với Next.js API Routes

Trong `pages/api/user/users.ts` hoặc `app/api/user/users/route.ts` (App Router):

```ts
export async function OPTIONS(request: Request) {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': 'http://localhost:5002',
      'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type,Authorization,X-Client-Id'
    }
  })
}

export async function GET(request: Request) {
  // ... xử lý GET, nhớ cũng set Access-Control-Allow-Origin v.v. 
}
```

Hoặc nhanh hơn, với `next.config.js`:

```js
module.exports = {
  async headers() {
    return [{
      source: '/api/:path*',
      headers: [
        { key: 'Access-Control-Allow-Origin',      value: 'http://localhost:5002' },
        { key: 'Access-Control-Allow-Methods',     value: 'GET,POST,PUT,DELETE,OPTIONS' },
        { key: 'Access-Control-Allow-Headers',     value: 'Content-Type,Authorization,X-Client-Id' }
      ]
    }]
  }
}
```

---

## 4. Kết luận

* **Nguyên nhân**: Server không trả về đúng response cho OPTIONS preflight (không HTTP OK hoặc thiếu header CORS).
* **Giải pháp**: Bật CORS trên server, cho phép Origin, Methods, Headers tương ứng.
* **Client-side**: Bạn không thể “fix” CORS bằng axios. Chỉ có server mới cấp phép được.

Sau khi bổ sung cấu hình CORS trên server, mọi request (kể cả có header `Authorization`, `x-client-id` hay preflight) đều sẽ chạy bình thường.

---

**Tham khảo**

* MDN CORS preflight: [https://developer.mozilla.org/en-US/docs/Glossary/Preflight\_request](https://developer.mozilla.org/en-US/docs/Glossary/Preflight_request)
* Express CORS middleware: [https://github.com/expressjs/cors](https://github.com/expressjs/cors)
* Next.js headers config: [https://nextjs.org/docs/api-reference/next.config.js/headers](https://nextjs.org/docs/api-reference/next.config.js/headers)
