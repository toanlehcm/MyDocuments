Khi bạn đặt **`staleTime: 0`**, React Query coi **dữ liệu vừa fetch xong đã “stale” (hết hạn)** ngay lập tức. Điều này dẫn đến hành vi sau:

---

### 🧠 **Cơ chế của React Query với `staleTime: 0`**

1. Khi component (hoặc form) **mount** trở lại cùng một `queryKey`, React Query kiểm tra cache:

   * **Dữ liệu vẫn còn trong cache**, nhưng vì `staleTime = 0`, nó được đánh dấu là *stale*.
2. Khi dữ liệu stale:

   * **React Query sẽ tự động gọi `queryFn` để fetch lại** dữ liệu mới nhất từ server.
   * Trong khi fetch, React Query **vẫn hiển thị dữ liệu cũ** (nếu có) để tránh nhấp nháy UI.
3. Vì thế, bạn **không cần** thủ công xóa cache (`queryClient.removeQueries`) – React Query đã buộc fetch lại dữ liệu.

---

### 📋 **Ví dụ cụ thể**

Giả sử bạn vừa fetch chi tiết appointment parent `A`.

* Bạn cancel một appointment children → dữ liệu trên server thay đổi.
* Khi đóng Drawer rồi mở lại, hook `useGetAppointment` được mount lại.
* `staleTime: 0` báo dữ liệu đang stale → React Query fetch lại từ server để lấy bản mới nhất.

---

### ✅ **Lợi ích của `staleTime: 0` so với removeQueries**

| **staleTime: 0**                                                                   | **removeQueries**                                                          |
| ---------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| Tự động fetch lại mỗi khi mount → **ít code hơn**.                                 | Bạn phải gọi `removeQueries` thủ công mỗi lần Drawer đóng.                 |
| Vẫn giữ dữ liệu cũ để hiển thị tạm thời trong khi fetch → **trải nghiệm mượt mà**. | Xóa cache → UI có thể bị nhấp nháy vì mất dữ liệu cũ trước khi fetch xong. |
| Dễ bảo trì, ít bug.                                                                | Dễ quên xóa hoặc xóa sai queryKey.                                         |

---

### ⚠ **Lưu ý giới hạn**

* **`staleTime: 0` không xóa cache**, chỉ đánh dấu stale. Nếu bạn muốn **xóa hoàn toàn dữ liệu nhạy cảm** (vd: form chứa thông tin bảo mật), hãy dùng `removeQueries`.
* Trong trường hợp Drawer không thực sự unmount (ví dụ: Drawer chỉ ẩn đi chứ không bị xóa khỏi DOM), hook có thể **không remount** → không kích hoạt fetch. Khi đó, `removeQueries` hoặc `refetch` thủ công vẫn cần thiết.

---

### 📌 **Kết luận**

👉 **`staleTime: 0`** đảm bảo fetch lại dữ liệu khi component mount mà không phải xóa cache.
👉 **Dùng `removeQueries`** chỉ khi Drawer không remount hoặc cần xóa sạch dữ liệu nhạy cảm.
👉 Với **AlignUI Drawer** (nếu Drawer thực sự unmount khi đóng), **`staleTime: 0` là đủ** và là giải pháp **đơn giản, hiệu quả, hiệu năng tốt**.
