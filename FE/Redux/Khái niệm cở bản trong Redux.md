# Dưới đây là giải thích và ví dụ đơn giản cho các khái niệm cơ bản của Redux:

---

### 1. **Store**
- **Giải thích:**  
  Store là nơi lưu trữ toàn bộ state (dữ liệu) của ứng dụng Redux.  
  Mỗi app chỉ có một store duy nhất.

- **Ví dụ:**  
  ```javascript
  import { createStore } from 'redux';
  const store = createStore(reducer);
  ```

---

### 2. **Action**
- **Giải thích:**  
  Action là một object mô tả sự kiện hoặc ý định thay đổi state.  
  Action luôn có thuộc tính `type`.

- **Ví dụ:**  
  ```javascript
  const action = { type: 'INCREMENT', payload: 1 };
  ```

---

### 3. **Reducer**
- **Giải thích:**  
  Reducer là một hàm nhận state hiện tại và action, trả về state mới.  
  Reducer phải là pure function.

- **Ví dụ:**  
  ```javascript
  function counterReducer(state = 0, action) {
    if (action.type === 'INCREMENT') {
      return state + action.payload;
    }
    return state;
  }
  ```

---

### 4. **Dispatch**
- **Giải thích:**  
  Dispatch là hàm dùng để gửi action đến store, kích hoạt reducer xử lý.

- **Ví dụ:**  
  ```javascript
  store.dispatch({ type: 'INCREMENT', payload: 1 });
  ```

---

### 5. **Pure functions**
- **Giải thích:**  
  Pure function là hàm luôn trả về cùng một kết quả với cùng một input, không gây side effect (không thay đổi biến bên ngoài, không gọi API, v.v.).

- **Ví dụ:**  
  ```javascript
  function add(a, b) {
    return a + b;
  }
  ```

---

### 6. **State immutable**
- **Giải thích:**  
  State immutable nghĩa là không được thay đổi trực tiếp state cũ, mà phải tạo ra state mới khi cập nhật.

- **Ví dụ:**  
  ```javascript
  // Sai: state.count++
  // Đúng:
  return { ...state, count: state.count + 1 };
  ```

---

Nếu bạn cần ví dụ thực tế hơn hoặc code Redux đầy đủ, hãy hỏi nhé!