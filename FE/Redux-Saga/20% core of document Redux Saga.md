# [20% core of document Redux Saga](https://redux-saga.js.org/docs/introduction/GettingStarted)

Dưới đây là **lộ trình 20% → 80%**: những mục *bắt buộc phải học* trong Redux-Saga để bạn có thể **làm việc ngay với project thực tế**, đọc/hiểu code legacy, debug workflow bất đồng bộ, và maintain lâu dài.

---

# 🎯 **Redux-Saga — Học 20% cốt lõi để làm được 80% việc**

## ✅ **1. Introduction**

**Học 2 mục sau:**

* **Getting Started**
* **Beginner Tutorial**

**Lý do:**
Đặt nền tảng tư duy “Saga = middleware xử lý side effects + generator”. Phải hiểu cơ bản để không bị confused khi đọc effects.

---

# 🌱 **2. Basic Concepts (ưu tiên cao nhất)**

## ⭐ **(1) Declarative Effects — QUAN TRỌNG NHẤT**

**Học kỹ mục này.**
Bạn phải hiểu:

* `call`
* `put`
* `take`
* `takeEvery`
* `takeLatest`
* `select`
* **Generator function chạy thế nào**

👉 Đây là **xương sống** của mọi saga.

---

## ⭐ **(2) Dispatching Actions**

Cần để hiểu:

* Action đi từ UI → reducer như thế nào
* Saga intercept action ra sao

---

## ⭐ **(3) Effect**

Đọc để hiểu:

* Tại sao saga gọi là declarative
* Tại sao `call(fn)` ≠ `fn()`

---

## ⭐ **(4) Error Handling**

Trong thực tế, hầu như 100% saga đều xử lý lỗi HTTP → **bắt buộc phải học**.

---

## ⭐ **(5) Using Saga Helpers**

Chỉ cần học:

* `takeEvery`
* `takeLatest`
* `throttle` (tuỳ dự án)

Không cần đọc sâu các helper ít dùng.

---

# 🧠 **3. Advanced Concepts (chỉ chọn những cái dùng nhiều trong dự án thật)**

Dưới đây là **20% advanced** nhưng xuất hiện **80% trong project**.

---

## ⭐ **(1) Concurrency**

Học:

* Các effect chạy song song
* `all([...])`
* `race([...])`

Dùng rất nhiều trong:

* Chạy nhiều API cùng lúc
* Timeout API
* Prevent duplicate requests

---

## ⭐ **(2) Fork Model**

Rất quan trọng để hiểu:

* difference `fork` vs `spawn` vs `call`
* background tasks
* cancellation

**Nếu bạn hiểu fork model → bạn hiểu 80% flow của dự án lớn.**

---

## ⭐ **(3) Non-Blocking Calls**

Liên quan đến `fork` → giúp viết saga không bị chặn UI.

---

## ⭐ **(4) Root Saga**

Luôn xuất hiện trong mọi project.

---

❌ **Bạn chưa cần học các mục sau cho đến khi nâng cấp kiến thức:**

* Channels
* Future Actions
* Racing Effects (đọc sau concurrency)
* Running Tasks in Parallel (đã hiểu `all` là đủ)
* Composing Sagas (dùng ít)
* Advanced testing (khi cần)

---

# 📌 **TÓM TẮT: Mục cần học**

## 🎯 **Học ngay để làm được việc (bắt buộc):**

### **Introduction**

* Getting Started
* Beginner Tutorial

### **Basic Concepts**

* Declarative Effects ⭐⭐⭐⭐⭐
* Dispatching Actions ⭐⭐⭐⭐
* Effect ⭐⭐⭐
* Error Handling ⭐⭐⭐⭐⭐
* Using Saga Helpers (takeEvery, takeLatest) ⭐⭐⭐⭐⭐

### **Advanced Concepts**

* Concurrency (`all`, `race`) ⭐⭐⭐⭐
* Fork Model ⭐⭐⭐⭐⭐
* Non-Blocking Calls ⭐⭐⭐
* Root Saga ⭐⭐⭐⭐⭐

---

# 🧩 Nếu bạn muốn tớ tạo luôn **Mindmap Redux-Saga (1 trang A4)** để bạn in ra học trong 5 phút → chỉ cần nói:

**"Tạo mindmap A4"** 📄🧠
