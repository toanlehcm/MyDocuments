# Basic about puppeteer

**Puppeteer** là một **thư viện Node.js** do Google phát triển, cho phép bạn **điều khiển trình duyệt Chrome/Chromium bằng mã JavaScript** thông qua giao thức DevTools.

Nói ngắn gọn: **Puppeteer = viết code để điều khiển trình duyệt tự động**.

---

# ✅ Puppeteer dùng để làm gì?

## 1. **Tự động hoá trình duyệt (browser automation)**

* Mở trang web
* Nhập dữ liệu vào form
* Click nút
* Điều hướng giữa các trang
* Upload file
* Chụp màn hình / PDF

→ Giống như robot dùng Chrome thay cho người.

---

## 2. **Web scraping (thu thập dữ liệu)**

Puppeteer có thể:

* Render đầy đủ trang SPA (React, Vue, Angular, Next.js), kể cả AJAX
* Lấy DOM sau khi page load
* Scroll để tải dữ liệu lazy-loading

→ Rất hữu ích để scrape website hiện đại mà các thư viện như axios/cheerio không lấy được.

---

## 3. **Tạo ảnh / PDF từ trang web**

Ví dụ:

* Xuất hóa đơn PDF
* Xuất báo cáo PDF
* Capture screenshot website

---

## 4. **Testing giao diện (UI testing)**

Dùng trong e2e test:

* Kiểm tra button hoạt động đúng
* Kiểm tra navigation
* Kiểm tra form validation
* Test SSR trên Next.js

---

## 5. **SEO & SSR testing**

* Render website chạy SPA để xem bot Google thấy gì
* Kiểm tra meta, OpenGraph, lỗi SEO

---

## 6. **Kiểm thử hiệu năng & bảo mật**

* Audit Lighthouse thông qua cho phép Chrome headless chạy tự động
* Kiểm thử XSS, CSRF, input injection

---

# ✅ Puppeteer hoạt động như thế nào?

* Khi bạn khởi tạo Puppeteer, nó sẽ mở **Chrome headless** (không giao diện) hoặc Chrome có giao diện.
* Bạn gửi “lệnh” cho Chrome như:

  ```js
  await page.goto('https://google.com');
  await page.type('#search', 'reactjs');
  await page.click('button.search');
  ```
* Chrome sẽ thực thi như người dùng thật.

---

# 🔧 Ví dụ code siêu đơn giản

```js
import puppeteer from "puppeteer";

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto("https://example.com");
  await page.screenshot({ path: "example.png" });

  await browser.close();
})();
```

---

# 🎯 Khi nào nên dùng Puppeteer?

| Trường hợp             | Puppeteer có phù hợp không?       |
| ---------------------- | --------------------------------- |
| Lấy API JSON           | ❌ Không, axios tốt hơn            |
| Scrape HTML đơn giản   | ❌ Cheerio hoặc Playwright nhẹ hơn |
| Scrape website SPA     | ✅ Rất phù hợp                     |
| Tự động hoá tác vụ web | ✅ Rất phù hợp                     |
| Test UI                | ✅                                 |
| Render PDF             | ✅                                 |

---

# 📌 Lưu ý quan trọng

* Puppeteer khá nặng → chạy trên server cần nhiều RAM/CPU
* Deploy trên serverless (Vercel / Netlify) khó
* Nhiều website anti-bot, cần headless stealth plugin

---

Nếu bạn muốn, mình có thể tạo cho bạn:
✅ Roadmap học Puppeteer từ A → Z
hoặc
✅ 20 prompt để học Puppeteer bằng NotebookLM
hoặc
✅ Template dự án Puppeteer clean code & chống anti-bot.

Bạn muốn hướng nào?
