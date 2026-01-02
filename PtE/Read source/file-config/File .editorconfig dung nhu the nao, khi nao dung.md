# File .editorconfig - Editor Configuration

## 📘 .editorconfig là gì?

**.editorconfig** là file **cấu hình coding style** giúp đồng bộ hóa format code giữa các editors/IDEs khác nhau (VS Code, WebStorm, Sublime Text, etc.)

---

## 🎯 Dùng để làm gì?

### **1. Đồng bộ coding style trong team:**

**Problem without .editorconfig:**

```
Developer A (VS Code):     Uses tabs, CRLF line endings
Developer B (WebStorm):    Uses 4 spaces, LF line endings
Developer C (Sublime):     Uses 2 spaces, mixed line endings

→ Git conflicts!
→ Inconsistent code!
→ Hard to review!
```

**Solution with .editorconfig:**

```
All developers:            Use 2 spaces, LF line endings
→ Consistent code!
→ No conflicts!
→ Easy to review!
```

---

## 📊 Giải thích từng setting:

### **1. `root = true`**

```properties
root = true
```

**Meaning:** This is the top-level .editorconfig file

- Editor stops searching for more .editorconfig files in parent directories
- Settings in this file apply to entire project

---

### **2. `[*]` - Apply to all files**

```properties
[*]
indent_style = space
indent_size = 2
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true
```

**Breakdown:**

| Setting                    | Value   | Meaning                                     |
| -------------------------- | ------- | ------------------------------------------- |
| `indent_style`             | `space` | Use spaces (not tabs)                       |
| `indent_size`              | `2`     | 2 spaces per indent level                   |
| `end_of_line`              | `lf`    | Unix line endings `\n` (not Windows `\r\n`) |
| `charset`                  | `utf-8` | Use UTF-8 encoding                          |
| `trim_trailing_whitespace` | `true`  | Remove spaces at end of lines               |
| `insert_final_newline`     | `true`  | Add newline at end of file                  |

---

### **3. `[*.md]` - Special rules for Markdown**

```properties
[*.md]
trim_trailing_whitespace = false
```

**Why?** In Markdown, trailing spaces have meaning:

```markdown
Line 1 ← Two spaces here = line break
Line 2
```

---

## 🔄 How it works:

### **Workflow:**

```
1. Developer opens file in editor (VS Code, WebStorm, etc.)
   ↓
2. Editor plugin reads .editorconfig
   ↓
3. Editor applies rules automatically
   ↓
4. Code is formatted consistently
```

**Example:**

```javascript
// WITHOUT .editorconfig (Developer A uses tabs)
function test() {
→   console.log('hello');  // ← Tab character
}

// WITH .editorconfig (Everyone uses 2 spaces)
function test() {
  console.log('hello');  // ← 2 spaces
}
```

---

## 🎯 Khi nào dùng?

### **1. Automatically when editing files:**

```
✅ Open any .js file in VS Code
→ .editorconfig rules apply automatically
→ Indentation: 2 spaces
→ Line endings: LF
→ Encoding: UTF-8
```

---

### **2. When saving files:**

```
✅ Save file (Ctrl+S)
→ Trailing whitespace removed
→ Final newline added
→ All .editorconfig rules enforced
```

---

### **3. When formatting code:**

```
✅ Format Document (Shift+Alt+F)
→ Uses .editorconfig settings
→ Consistent with team style
```

---

## 🔍 Real-world examples from your project:

### **Example 1: JavaScript files**

```javascript
// ✅ .editorconfig ensures:
angular.module('PtEMobile', [
··'ngRoute',           // ← Exactly 2 spaces indent
··'ngAnimate'
])␊                     // ← LF line ending
.config(function() {
····// code           // ← 4 spaces (2 levels × 2 spaces)
})␊                     // ← Final newline at end of file
```

---

### **Example 2: HTML files**

```html
<!DOCTYPE html>
<html>
  ··<head>
    <!-- ← 2 spaces indent -->
    ····
    <title>PTE</title>
    <!-- ← 4 spaces (nested) -->
    ··
  </head>
  ··
  <body>
    ····
    <div>
      <!-- ← 4 spaces -->
      ······Content
      <!-- ← 6 spaces -->
      ····
    </div>
    ··
  </body>
</html>
␊
<!-- ← Final newline -->
```

---

### **Example 3: CSS/SCSS files**

```scss
.header {
··background: #fff;   // ← 2 spaces
··padding: 20px;
··
··.logo {             // ← 2 spaces
····font-size: 24px; // ← 4 spaces (nested)
··}
}␊                    // ← Final newline
```

---

## 📊 Editor Support:

### **Editors that support .editorconfig:**

| Editor                | Support     | How                                          |
| --------------------- | ----------- | -------------------------------------------- |
| **VS Code**           | ✅ Built-in | Install "EditorConfig for VS Code" extension |
| **WebStorm/IntelliJ** | ✅ Built-in | Enabled by default                           |
| **Sublime Text**      | ✅ Plugin   | Install "EditorConfig" package               |
| **Atom**              | ✅ Plugin   | Install "editorconfig" package               |
| **Vim**               | ✅ Plugin   | Install "editorconfig-vim"                   |
| **Notepad++**         | ✅ Plugin   | Install EditorConfig plugin                  |

---

### **VS Code setup:**

```bash
# 1. Install extension
ext install EditorConfig.EditorConfig

# 2. Reload VS Code

# 3. Open any file
# ✅ .editorconfig rules automatically applied
```

**Verify it's working:**

```
1. Open file in VS Code
2. Look at bottom status bar:
   "Spaces: 2" ← Confirms 2-space indent from .editorconfig
   "LF" ← Confirms Unix line endings
```

---

## 🚨 Common issues:

### **Problem 1: Mixed line endings**

**Without .editorconfig:**

```
file1.js: CRLF (Windows)
file2.js: LF (Unix)
file3.js: CR (Old Mac)
→ Git shows entire file as changed!
```

**With .editorconfig:**

```properties
end_of_line = lf
```

```
file1.js: LF
file2.js: LF
file3.js: LF
→ Consistent!
```

---

### **Problem 2: Trailing whitespace**

**Without .editorconfig:**

```javascript
function test() {··
··console.log('hello');····  ← Extra spaces
}··
```

**With .editorconfig:**

```properties
trim_trailing_whitespace = true
```

```javascript
function test() {
··console.log('hello');  ← No trailing spaces
}
```

---

### **Problem 3: No final newline**

**Without .editorconfig:**

```javascript
function test() {
··console.log('hello');
}[EOF - no newline]
```

**With .editorconfig:**

```properties
insert_final_newline = true
```

```javascript
function test() {
··console.log('hello');
}
[EOF with newline]
```

---

## 🎯 Advanced configurations:

### **Different rules for different file types:**

```properties
root = true

# Default for all files
[*]
indent_style = space
indent_size = 2
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true

# JavaScript files
[*.js]
indent_size = 2

# TypeScript files
[*.ts]
indent_size = 2

# JSON files
[*.json]
indent_size = 2

# HTML files
[*.html]
indent_size = 2

# CSS/SCSS files
[*.{css,scss}]
indent_size = 2

# Markdown files (keep trailing spaces)
[*.md]
trim_trailing_whitespace = false

# Makefile (must use tabs)
[Makefile]
indent_style = tab

# YAML files (specific indent)
[*.{yml,yaml}]
indent_size = 2

# Package files
[{package.json,bower.json}]
indent_size = 2
```

---

## 📊 Summary:

| Question                 | Answer                                                        |
| ------------------------ | ------------------------------------------------------------- |
| **.editorconfig là gì?** | File cấu hình coding style cho editors                        |
| **Dùng để làm gì?**      | Đồng bộ indentation, line endings, encoding giữa team members |
| **Khi nào dùng?**        | Tự động khi mở/save files trong editor                        |
| **Cần cài gì không?**    | ✅ YES - Install editor plugin (EditorConfig for VS Code)     |
| **Có commit lên Git?**   | ✅ YES - Toàn team cần cùng config                            |
| **Có thể xóa?**          | ❌ NO - Mất tính đồng bộ coding style                         |

---

## 🚀 Quick setup (VS Code):

```bash
# 1. Install extension
code --install-extension EditorConfig.EditorConfig

# 2. Reload VS Code
# Press: Ctrl+Shift+P → "Reload Window"

# 3. Test
# Open any .js file
# Bottom bar should show: "Spaces: 2" and "LF"
```

---

## ✅ Benefits:

```
✅ Consistent code formatting across team
✅ No more tabs vs spaces debates
✅ Fewer Git conflicts from formatting
✅ Works across different editors
✅ Enforces best practices automatically
✅ New developers get correct settings instantly
```

---

**.editorconfig ensures everyone on your team writes code with the same formatting style, regardless of which editor they use!**
