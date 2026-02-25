```
icon dev status </> ở panel phải và icon dev mode </> ở toolbar dưới khác nhau như thế nào? 
file design "login v2" là của t nhưng t chỉ có thể toggle dev status, còn dev mode thì bị yêu cầu upgrade pro plan là vì sao?
```

Câu hỏi của bạn rất chuẩn — nhiều người nhầm giữa **Dev Status** và **Dev Mode** trong Figma.

Mình giải thích rõ 2 icon `</>` bạn đang thấy:

---

# 1️⃣ Dev Status (`</>` ở panel phải) là gì?

Icon `</>` ở panel phải (trong tab Design) = **Dev Status**.

Nó dùng để:

* Đánh dấu frame/component là:

  * Ready for dev
  * In progress
  * Completed
* Gắn label cho dev biết trạng thái
* Không liên quan đến inspect code

👉 Đây chỉ là **workflow tag cho team**.

Nó KHÔNG:

* Không mở Inspect
* Không mở CSS
* Không liên quan MCP
* Không liên quan seat

Bạn có thể toggle vì:

```
Dev Status không yêu cầu Dev seat
```

---

# 2️⃣ Dev Mode (`</>` ở toolbar dưới) là gì?

Icon `</>` ở toolbar dưới = **Dev Mode thật**.

Khi bật Dev Mode, bạn sẽ có:

* Inspect CSS
* Copy code
* View variables
* See measurements
* Dev-ready layout
* MCP access

👉 Đây là tính năng dành cho **Dev seat hoặc Full seat trên paid plan**.

---

# 3️⃣ Vì sao bạn toggle được Dev Status nhưng Dev Mode yêu cầu upgrade?

Vì:

| Feature    | Yêu cầu                   |
| ---------- | ------------------------- |
| Dev Status | Free OK                   |
| Dev Mode   | Paid plan + Dev/Full seat |

Hiện tại bạn đang ở:

```
Workspace: Free
Seat: Full (free version)
```

Free Full seat ≠ Paid Full seat.

Dev Mode yêu cầu:

```
Professional plan trở lên
+
Dev seat hoặc Full seat (paid)
```

---

# 4️⃣ Tóm tắt khác biệt

| Dev Status           | Dev Mode             |
| -------------------- | -------------------- |
| Chỉ là trạng thái    | Inspect & code tools |
| Free dùng được       | Paid only            |
| Không liên quan MCP  | Liên quan MCP        |
| Không liên quan seat | Cần Dev/Full seat    |

---

# 5️⃣ Vì sao file là của bạn nhưng vẫn bị chặn?

Vì Figma kiểm tra:

```
Workspace plan
+
Seat type
```

Không kiểm tra:

```
Ai là owner file
```

Bạn có thể là owner file,
nhưng nếu workspace là Free → Dev Mode bị khóa.

---

# 6️⃣ Kết luận chính xác cho case của bạn

Bạn thấy:

* Dev Status toggle được ✅
* Dev Mode yêu cầu upgrade ❌

Vì:

```
Workspace = Free
Dev Mode = Paid feature
```

Không phải do file, mà do plan.

---

Nếu bạn muốn, mình có thể vẽ cho bạn sơ đồ rõ ràng:

```
Plan vs Seat vs Feature
```

để bạn không bao giờ bị nhầm giữa 3 cái này nữa.
