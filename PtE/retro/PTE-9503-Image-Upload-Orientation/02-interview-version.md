# Interview Version — PTE-9503: Double Rotation Bug in Image Upload

## STAR Format:

**S (Situation):** Users reported that portrait photos taken on modern Samsung devices and uploaded via Android WebView were incorrectly displayed horizontally.

**T (Task):** I needed to fix this "double rotation" issue without breaking the upload flow for older browsers that don't support auto-rotation.

**A (Action):** I debugged the `imageFactory` and discovered a conflict: modern WebViews auto-rotate images based on EXIF data, but our legacy code also manually applied Canvas rotation. Instead of hardcoding browser checks, I implemented a robust dimension-based detection: after the image loads, the code compares its width and height. If a photo with portrait EXIF tags is already vertical, it proves the browser handled it, so we safely bypass the manual canvas rotation.

**R (Result):** The bug was resolved across all devices. The solution is fully backward compatible, lightweight (under 10 lines of code), and completely eliminated the double rotation artifact.

## Câu trả lời gộp lại:
In our app, users experienced horizontal image uploads from Android WebViews because modern browsers auto-rotated EXIF images, and our legacy canvas code rotated them a second time. To solve this, I introduced a dimension-based detection mechanism that checks if the image is already vertical after loading. By verifying the actual dimensions (`height > width`) against the EXIF metadata, I could selectively skip the manual canvas rotation. This cleanly resolved the bug while perfectly preserving backward compatibility for older browsers.

## Câu hỏi phỏng vấn FE/BE liên quan:
- Q: Tại sao browser hiện đại lại hiển thị ảnh EXIF đúng chiều nhưng code đọc raw data lại thấy bị ngang?
  A: Vì từ Chrome 81+, browser mặc định áp dụng CSS `image-orientation: from-image` hoặc tự động xoay ảnh khi vẽ lên DOM/Canvas. Tuy nhiên, raw pixel data ban đầu vẫn là ảnh nằm ngang.
