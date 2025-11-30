# **Null Pointer Exception (NPE)**

**Null Pointer Exception (NPE)** là một lỗi rất phổ biến trong lập trình, đặc biệt trong các ngôn ngữ **Java, C#, Kotlin**, hoặc bất kỳ ngôn ngữ nào có khái niệm _null reference_.

---

# 🔍 **Null Pointer Exception là gì?**

**Null Pointer Exception** xảy ra khi chương trình cố gắng **truy cập vào một đối tượng thông qua một biến có giá trị `null`**.

Hiểu đơn giản:

👉 Bạn đang muốn dùng một “đồ vật”, nhưng thực tế tay bạn lại đang trống không.

---

# 🧠 **Khi nào xảy ra Null Pointer Exception?**

Một số tình huống gây NPE:

1. Gọi **method** trên một biến null

   → `obj.method()`

2. Truy cập **thuộc tính** của biến null

   → `obj.field`

3. Lấy phần tử từ một mảng null

   → `arr[0]` khi `arr = null`

4. Truyền null vào nơi không cho phép null

   → Constructor hoặc method không mong đợi giá trị null

---

# 📌 **Ví dụ trong Java**

## ❌ Ví dụ gây ra NullPointerException

```java
public class Demo {
    public static void main(String[] args) {
        String name = null;   // biến không có giá trị

        System.out.println(name.length());
        // Gây NullPointerException vì name == null
    }
}

```

🧨 **Giải thích:**

Bạn gọi `length()` trên `name`, nhưng `name` đang là `null` → chương trình crash.

---

# ✔️ Cách sửa lỗi

### Cách 1: Kiểm tra null trước khi dùng

```java
if (name != null) {
    System.out.println(name.length());
}

```

### Cách 2: Gán giá trị mặc định

```java
String name = (inputName != null) ? inputName : "";

```

### Cách 3: Dùng Optional (Java 8+)

```java
Optional.ofNullable(name).ifPresent(n -> System.out.println(n.length()));

```

---

# 🎯 Ví dụ thêm trong thực tế (Java)

### ❌ Truy cập phần tử của một mảng null

```java
int[] nums = null;
System.out.println(nums[0]);  // NPE

```

### ❌ Gọi method trên object chưa được khởi tạo

```java
User user;

user = null;
user.getEmail();  // NPE

```

---

# 👉 Nếu bạn muốn, mình có thể:

✓ Giải thích theo kiểu dễ hiểu hơn

✓ Viết ví dụ bằng **JavaScript, TypeScript, C#, Python, Kotlin**

✓ Giúp bạn debug lỗi NPE trong code của bạn

Bạn muốn xem ví dụ bằng ngôn ngữ nào? Hoặc bạn đang gặp lỗi NPE trong đoạn code nào?
