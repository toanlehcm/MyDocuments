`getServerSession` và `getSession` cùng trả về một object `Session | null`, nhưng được thiết kế cho hai bối cảnh khác nhau:

|                         | `getServerSession`                                                                                                                                        | `getSession`                                                                                                                         |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| **Nguồn**               | `import { getServerSession } from 'next-auth'`                                                                                                            | `import { getSession } from 'next-auth/react'`                                                                                       |
| **Chạy ở đâu**          | **Chỉ trên server** (API Route, `getServerSideProps`, App Router `route.ts`)                                                                              | **Chạy ở client** (React component, hook), cũng có thể gọi trong SSR nhưng không lấy cookie trực tiếp                                |
| **Cách hoạt động**      | Dựa thẳng vào cookie và config NextAuth được khởi tạo trên server, không phát sinh request HTTP riêng                                                     | Gửi một HTTP request đến endpoint `/api/auth/session` để lấy session hiện tại                                                        |
| **Hiệu năng & Bảo mật** | Tận dụng data có sẵn (cookie, secret) trên server, không tốn lượt gọi mạng, an toàn hơn                                                                   | Mỗi lần gọi sẽ tốn 1 request đến API, có thể lộ endpoint nếu không cẩn thận                                                          |
| **Khi nào dùng?**       | • Trong API routes hoặc server-side functions (App Router `route.ts`, `getServerSideProps`…)<br>• Khi bạn cần gấp session mà không muốn client-side fetch | • Trong React components hoặc custom hooks trên client<br>• Khi bạn dùng `useSession()` không thoả mạn và vẫn cần lập trình thủ công |

---

### Ví dụ

1. **Server-side (App Router API route)**

   ```ts
   // app/api/profile/route.ts
   import { getServerSession } from 'next-auth'
   import { authOptions } from '@/lib/auth'

   export async function GET(req: Request) {
     const session = await getServerSession(authOptions)
     if (!session) return new Response('Unauthorized', { status: 401 })
     return new Response(JSON.stringify({ email: session.user?.email }))
   }
   ```

2. **Client-side (React component)**

   ```tsx
   'use client'
   import { getSession } from 'next-auth/react'
   import { useEffect, useState } from 'react'

   export function Profile() {
     const [email, setEmail] = useState<string>()

     useEffect(() => {
       getSession().then((session) => {
         if (session) setEmail(session.user?.email)
       })
     }, [])

     return <div>Your email: {email ?? 'loading…'}</div>
   }
   ```

---

**Tóm lại**

* Dùng **`getServerSession`** bất cứ khi nào bạn ở **server** (API, SSR, App Router routes) để tránh phải gọi HTTP thêm.
* Dùng **`getSession`** khi ở **client** hoặc trong component React, hoặc khi bạn muốn tận dụng cache/React-Query tích hợp sẵn của NextAuth.
