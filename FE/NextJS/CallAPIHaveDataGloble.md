Để 3 API này chỉ gọi 1 lần ngay sau khi login và không bị gọi lại khi render các component con, bạn nên đặt logic gọi API ở component cha cấp cao nhất quản lý toàn bộ user state, ví dụ:

Tối ưu nhất:
Đặt ở layout hoặc provider cấp cao nhất (ví dụ: layout.tsx, AppProvider, hoặc một custom UserProvider).
Nếu chỉ dùng cho trang user-management, đặt ở page.tsx như bạn đang làm là hợp lý.
Nếu muốn dùng cho toàn bộ app (mọi trang đều cần user info), nên đặt ở layout.tsx hoặc một provider bọc ngoài toàn bộ app.
Gợi ý cấu trúc:
1. Nếu chỉ dùng cho user-management:
Đặt ở page.tsx (như hiện tại).
2. Nếu dùng cho toàn app:
Tạo file:
src/providers/UserProvider.tsx

Gọi 3 API trong UserProvider, lưu data vào zustand/context.

Bọc toàn bộ app bằng UserProvider trong layout.tsx.

3. Nếu dùng Next.js App Router:
Đặt ở src/app/layout.tsx hoặc src/app/providers.tsx.
Tóm lại:
Chỉ dùng cho 1 page: Đặt ở page.tsx của page đó.
Dùng cho toàn app: Đặt ở provider cấp cao nhất (UserProvider hoặc layout.tsx).
Lưu ý:

Không nên đặt ở component con hoặc từng page nhỏ, tránh gọi lại nhiều lần.
Nếu app có nhiều trang đều cần user info, nên đặt ở provider cấp cao nhất để tối ưu performance và chia sẻ state.
Tóm tắt:

Dùng toàn app: UserProvider hoặc layout.tsx
Chỉ 1 page: page.tsx của page đó (như bạn đang làm)
→ Đây là cách tối ưu nhất!