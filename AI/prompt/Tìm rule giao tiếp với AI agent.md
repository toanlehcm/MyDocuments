```
t đang tìm các tập rule cho context của AI Agent về việc tối ưu hóa prompt, input, output của AI Agent; giao tiếp giữa software engineer và AI Agent để tối ưu hóa công việc nhanh và hiệu quả hơn.
t đang là 1 FE developer, biết reactjs, nextjs, angularjs. Đang làm project angularjs 1.x, bootstrap 4, angular material(https://material.angularjs.org/1.0.0)
cho t các link tổng hợp từ các nguồn tin cậy như trên github, gitlab, blog, diễn đàng, website, document, báo cáo,...
```

Chào Toàn, bộ rule bạn vừa đưa ra thực sự rất chất lượng và mang đậm tư duy của một Senior Developer. Khái niệm bạn đang tìm kiếm trong cộng đồng phát triển AI Agent hiện nay thường được gọi là **System Prompts**, **Custom Instructions**, hoặc **.cursorrules** (nếu bạn dùng các AI IDE thế hệ mới).

Việc bạn có background mạnh về ReactJS/NextJS nhưng đang phải handle một project legacy (AngularJS 1.x) đòi hỏi AI Agent phải cực kỳ kỷ luật. Nếu không có bộ rule "trói" nó lại, AI sẽ rất dễ bị "ảo giác" (hallucinate) và sinh ra code Angular thế hệ mới (Angular 2+) hoặc áp dụng tư duy component của React vào AngularJS 1.x, dẫn đến vỡ project.

Dưới đây là tổng hợp các nguồn tài liệu, repository và diễn đàn uy tín nhất hiện nay chuyên lưu trữ các tập rule tối ưu hóa cho AI Agent trong quy trình Software Engineering:

### 1. Thư viện `.cursorrules` và System Prompts của Cộng đồng

Đây là nơi các Senior Engineer trên thế giới chia sẻ các file cấu hình context ép AI (như Claude 3.5 Sonnet hoặc GPT-4o) tuân thủ framework, coding convention và tư duy phản biện.

- **Cursor Directory (cursor.directory):** Đây là thư viện lớn nhất hiện nay tổng hợp các file `.cursorrules` cho từng framework cụ thể. Bạn có thể tìm thấy các rule ép AI phải viết code theo chuẩn nào, cấm dùng thư viện nào.
- **GitHub Repository - awesome-cursorrules:** Bạn có thể search từ khóa `awesome cursorrules github` để tìm các repo tổng hợp hàng trăm mẫu system prompt tối ưu cho Frontend, Backend, và DevOps.
- **GitHub Repository - f/awesome-chatgpt-prompts:** Một repo huyền thoại về prompt, trong đó có phần "Act as a Senior Software Engineer" rất sát với rule "Anti Yes-Man" mà bạn đề cập.

### 2. Tài liệu Chính thống từ các AI Provider (Dành cho Developer)

Để viết ra các rule bắt AI suy luận logic (The "Why" & "How") và chống hiệu ứng "Yes-Man", bạn nên tham khảo tài liệu từ chính những người tạo ra model:

- **Anthropic Prompt Engineering Interactive Tutorial:** Claude hiện tại là model làm coding agent tốt nhất. Anthropic có một guide cực kỳ chi tiết về cách dùng thẻ XML (`<thinking>`, `<scratchpad>`) để ép AI lập luận từng bước trước khi code, ngăn chặn việc nó vội vàng đưa ra solution sai.
- **OpenAI Prompt Engineering Guide (Mục Code Generation):** Tài liệu chuẩn mực về việc chia nhỏ task (decompose complex tasks) và yêu cầu AI tự review code của chính nó trước khi xuất ra output.

### 3. Diễn đàn & Blog Thực chiến của AI Engineers

- **Blog của Vercel & Các kỹ sư NextJS:** Cộng đồng React/NextJS áp dụng AI Agent rất mạnh. Trên blog của Vercel thường có các bài viết về cách thiết kế "AI Agent architecture" để thao tác với codebase lớn.
- **Reddit (r/LocalLLaMA, r/ChatGPTCoding):** Đây là nơi các dev thảo luận các "mánh khóe" (jailbreak, system prompts) để ép AI làm việc hiệu quả nhất, đặc biệt là cách xử lý các context window lớn khi nhồi toàn bộ source code vào.

---

### Gợi ý: Bổ sung Rule đặc thù cho Tech Stack hiện tại của bạn

Dựa trên bộ rule giao tiếp xuất sắc của bạn, tôi đề xuất bạn nên thêm một phần **Framework-Specific Constraints** vào file cấu hình của Agent, đặc biệt là cho project AngularJS 1.x hiện tại. Việc chuyển đổi bối cảnh từ các modern framework (React/NextJS) sang legacy đòi hỏi Agent phải "quên" đi các modern pattern.

Bạn có thể tham khảo thêm các rule cứng sau:

**7. Ràng buộc Công nghệ Cốt lõi (Strict Legacy Framework Constraints)**

- **AngularJS 1.x Isolation:** Tuyệt đối KHÔNG sử dụng cú pháp, decorator (như `@Component`, `@Injectable`) hoặc concept của Angular 2+ (hoặc React/NextJS). Chỉ thao tác với `$scope`, `controllerAs`, `directives`, và `services` theo chuẩn AngularJS 1.x.
- **UI Library Strictness:** Khi thiết kế UI, chỉ sử dụng các class và component có sẵn của Bootstrap 4 và Angular Material 1.0.0. KHÔNG tự ý import TailwindCSS, Material-UI hoặc viết custom CSS nếu framework đã hỗ trợ sẵn.
- **No Modern Build Tools Presumption:** Không giả định project đang sử dụng Webpack đời mới, Vite, hay NextJS App Router. Tuân thủ strict môi trường build legacy hiện tại của project.

Việc kết hợp bộ rule giao tiếp của bạn với bộ ràng buộc công nghệ này sẽ tạo ra một AI Agent vừa có tư duy phản biện sắc bén, vừa cực kỳ an toàn khi chạm vào các hệ thống legacy.