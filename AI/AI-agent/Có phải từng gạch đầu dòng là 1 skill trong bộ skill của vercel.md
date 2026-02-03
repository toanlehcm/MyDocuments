### 7. JavaScript Performance (LOW-MEDIUM)

- `js-batch-dom-css` - Group CSS changes via classes or cssText
- `js-index-maps` - Build Map for repeated lookups
- `js-cache-property-access` - Cache object properties in loops
- `js-cache-function-results` - Cache function results in module-level Map
- `js-cache-storage` - Cache localStorage/sessionStorage reads
- `js-combine-iterations` - Combine multiple filter/map into one loop
- `js-length-check-first` - Check array length before expensive comparison
- `js-early-exit` - Return early from functions
- `js-hoist-regexp` - Hoist RegExp creation outside loops
- `js-min-max-loop` - Use loop for min/max instead of sort
- `js-set-map-lookups` - Use Set/Map for O(1) lookups
- `js-tosorted-immutable` - Use toSorted() for immutability

1. có phải từng gạch đầu dòng là 1 skill trong bộ skill của vercel?
2. có phải t chỉ cần thêm key word của từng skill trong câu promp của mình là đã áp dụng được skill của vercel. VD "Tối ưu validate function theo quy tắc js-early-exit."
3. file SKILL.md có rất nhiều skill, làm sao t biết nên áp dụng cái nào cho code của mình. VD file index.js nên dùng skill nào để clean code, performance, reuse, chuẩn product code reactjs, maintainable,...
   làm sao biết được?

4. **Đúng, từng gạch đầu dòng là một skill**  
   Mỗi dòng như `js-early-exit`, `js-hoist-regexp`,... là một quy tắc (skill) trong bộ best practices của Vercel cho React/Next.js, được mô tả chi tiết trong SKILL.md.

5. **Thêm keyword vào prompt là đúng cách để yêu cầu áp dụng skill**  
   Khi bạn viết prompt như:

   > "Tối ưu validate function theo quy tắc js-early-exit."  
   > là bạn đã yêu cầu AI hoặc reviewer áp dụng đúng quy tắc đó cho code. Tuy nhiên, để thực sự áp dụng, code phải thay đổi đúng theo ví dụ và giải thích của rule đó trong SKILL.md.

6. **Làm sao biết nên áp dụng skill nào cho code của mình?**

- **Đọc mô tả từng rule:** SKILL.md có giải thích, ví dụ đúng/sai cho từng rule.
- **Xem code của bạn có vấn đề gì:**
  - Nếu code lặp lại nhiều lần, xem các rule về cache, combine iterations, reuse.
  - Nếu có nhiều điều kiện kiểm tra, xem rule về early exit.
  - Nếu dùng RegExp trong vòng lặp, xem rule hoist regexp.
  - Nếu cần tối ưu bundle, xem các rule bundle-.
  - Nếu muốn code dễ maintain, ưu tiên các rule về memoization, hoist JSX, derived state, v.v.
- **So sánh code với ví dụ trong SKILL.md:** Nếu code bạn giống ví dụ sai, hãy sửa theo ví dụ đúng.
- **Dùng checklist:** Có thể tạo checklist các rule phù hợp với loại code (form, fetch, render, v.v.) để review.

**Ví dụ cho file index.js:**

- Hàm validate: dùng `js-early-exit`, `js-hoist-regexp`.
- Component: dùng `rerender-memo` nếu có logic phức tạp, `rendering-hoist-jsx` nếu có JSX tĩnh.
- Import: dùng `bundle-barrel-imports` nếu import qua barrel file.

**Tóm lại:**  
Bạn nên đọc mô tả từng rule, đối chiếu với code hiện tại, và chọn rule phù hợp với vấn đề hoặc mục tiêu tối ưu của mình. Prompt chỉ là cách yêu cầu, còn code phải thực sự thay đổi đúng theo rule đó.
