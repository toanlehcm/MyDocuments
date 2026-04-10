Trong Mongoose (và cơ sở dữ liệu MongoDB nói chung), **"xóa vĩnh viễn" (Hard Delete)** là hành động loại bỏ hoàn toàn một document (bản ghi) ra khỏi collection của database. 

Khi lệnh này được thực thi, dữ liệu sẽ bốc hơi khỏi ổ cứng của máy chủ cơ sở dữ liệu và **không thể khôi phục lại** (trừ khi bạn có bản sao lưu - backup). 

Khái niệm này thường được đặt lên bàn cân với **"Xóa mềm" (Soft Delete)** – nơi bạn không thực sự xóa data mà chỉ thêm một trường kiểu như `isDeleted: true` hoặc `deletedAt: new Date()` để ẩn dữ liệu đó khỏi giao diện người dùng.

### Các hàm dùng để Xóa vĩnh viễn trong Mongoose

Để thực hiện Hard Delete, Mongoose cung cấp 4 phương thức chính. Dưới đây là cách sử dụng thực tế của từng hàm:

#### 1. `findByIdAndDelete(id)`
Đây là hàm phổ biến nhất, thường được dùng trong các API xóa một record cụ thể dựa vào `_id`. Hàm này sẽ xóa và trả về data của document vừa bị xóa (rất tiện nếu bạn muốn in ra log hoặc báo cho người dùng biết họ vừa xóa cái gì).

```javascript
// Xóa user có ID cụ thể
const deletedUser = await User.findByIdAndDelete('64a1b2c3d4e5f6g7h8i9j0k1');

if (!deletedUser) {
    console.log('Không tìm thấy User để xóa!');
} else {
    console.log('Đã xóa thành công:', deletedUser.name);
}
```

#### 2. `deleteOne(filter)`
Hàm này sẽ tìm document **đầu tiên** khớp với điều kiện lọc (filter) và xóa nó đi. Nó không trả về document bị xóa mà chỉ trả về thông tin xác nhận (ví dụ: `deletedCount: 1`).

```javascript
// Xóa user đầu tiên có email là test@example.com
const result = await User.deleteOne({ email: 'test@example.com' });

console.log(`Đã xóa ${result.deletedCount} user.`);
```

#### 3. `findOneAndDelete(filter)`
Tương tự như `deleteOne`, nó tìm và xóa document đầu tiên khớp với điều kiện. Nhưng điểm khác biệt là nó **trả về nguyên xi document vừa bị xóa** giống như `findByIdAndDelete`.

```javascript
// Xóa user có username là 'spammer' và lấy lại data của user đó
const removedSpammer = await User.findOneAndDelete({ username: 'spammer' });
```

#### 4. `deleteMany(filter)`
Hàm này cực kỳ nguy hiểm và mạnh mẽ. Nó sẽ quét toàn bộ collection và xóa **tất cả** các document khớp với điều kiện.

```javascript
// Xóa toàn bộ user có trạng thái là 'banned'
const result = await User.deleteMany({ status: 'banned' });

console.log(`Đã dọn dẹp ${result.deletedCount} tài khoản vi phạm.`);
```

---

### ⚠️ Những lưu ý "sống còn" khi dùng Hard Delete

* **Tuyệt đối cẩn thận với `deleteMany({})`:** Nếu bạn truyền vào một object rỗng, Mongoose sẽ hiểu là "không có điều kiện lọc nào cả", và nó sẽ **xóa sạch toàn bộ data** trong collection đó.
* **Hàm `.remove()` đã "nghỉ hưu":** Trong các hướng dẫn cũ trên mạng (Mongoose v5 trở xuống), bạn sẽ thấy người ta dùng hàm `User.remove()`. Hiện tại hàm này đã bị **deprecated** (loại bỏ). Bạn chỉ nên dùng nhóm hàm `delete` ở trên.
* **Có nên dùng Hard Delete không?** Đối với các hệ thống thực tế (nhất là liên quan đến thương mại điện tử, tài chính hoặc data người dùng), các Senior Developer luôn ưu tiên dùng **Soft Delete**. Bạn chỉ nên dùng Hard Delete cho các bảng lưu dữ liệu rác, token hết hạn, session, hoặc log hệ thống.