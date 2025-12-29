# File .gitattributes - Git Attributes Configuration

## 📘 .gitattributes là gì?

**.gitattributes** là file **cấu hình Git** để định nghĩa **attributes** (thuộc tính) cho các files trong repository, đặc biệt là **line ending handling** (xử lý xuống dòng).

---

## 🎯 Dùng để làm gì?

### **1. Normalize line endings:**

```properties
* text=auto
```

**Meaning:** Git tự động xử lý line endings cho tất cả text files

---

## 📊 Line Endings Problem:

### **The Problem:**

```
Windows:    Uses CRLF (\r\n) - Carriage Return + Line Feed
Unix/Mac:   Uses LF (\n)     - Line Feed only

Problem:
- Windows dev commits file with CRLF
- Mac dev pulls → Git shows entire file as changed
- Commits become messy
- Hard to review changes
```

---

### **The Solution: `* text=auto`**

```properties
* text=auto
```

**What Git does:**

```
1. On commit (Windows → Repository):
   CRLF → LF (normalize to Unix style)

2. On checkout (Repository → Windows):
   LF → CRLF (convert to Windows style for working directory)

3. On checkout (Repository → Mac/Linux):
   LF → LF (keep as is)
```

**Result:**

- Repository always has LF (Unix style)
- Working directory has OS-appropriate line endings
- No more line ending conflicts!

---

## 🔄 How `text=auto` works:

### **Example workflow:**

```
Developer A (Windows):
1. Edit file.js with CRLF line endings
2. git add file.js
3. Git converts CRLF → LF
4. git commit
5. Repository stores file with LF

Developer B (Mac):
1. git pull
2. Git keeps LF (Mac native)
3. Edit file.js with LF
4. git add file.js
5. Git keeps LF
6. git commit
7. No changes detected (both used LF in repo)

Developer C (Windows):
1. git pull
2. Git converts LF → CRLF for working directory
3. Edit file.js with CRLF (Windows native)
4. git add file.js
5. Git converts CRLF → LF
6. git commit
7. No changes detected (normalized to LF)
```

---

## 🎯 Khi nào dùng?

### **1. Always active (automatic):**

```bash
# When you commit
git add app/scripts/app.js
git commit -m "Update app"

# ✅ Git automatically:
# - Detects file is text (not binary)
# - Normalizes line endings CRLF → LF
# - Stores in repository with LF
```

---

### **2. When cloning repository:**

```bash
git clone https://github.com/project.git

# ✅ Git automatically:
# - Reads .gitattributes
# - Applies line ending rules
# - Converts LF → CRLF (on Windows)
# - Keeps LF (on Mac/Linux)
```

---

### **3. Cross-platform teams:**

```
Team:
- 3 developers on Windows
- 2 developers on Mac
- 1 developer on Linux

✅ .gitattributes ensures:
- Everyone's commits are consistent
- No line ending conflicts
- Clean git diffs
```

---

## 🔍 Advanced .gitattributes configurations:

### **Your current config (simple):**

```properties
* text=auto
```

**Meaning:** Let Git automatically detect text files and normalize line endings

---

### **Recommended config (explicit):**

```properties
# Auto detect text files and normalize line endings
* text=auto

# Explicitly declare text files
*.js text
*.ts text
*.json text
*.html text
*.css text
*.scss text
*.md text
*.xml text
*.yml text
*.yaml text

# Ensure these files always have LF (Unix) line endings on checkout
*.sh text eol=lf
Makefile text eol=lf

# Declare files that will always have CRLF line endings on checkout
*.bat text eol=crlf
*.cmd text eol=crlf

# Denote all files that are truly binary and should not be modified
*.png binary
*.jpg binary
*.jpeg binary
*.gif binary
*.ico binary
*.mov binary
*.mp4 binary
*.mp3 binary
*.pdf binary
*.ttf binary
*.woff binary
*.woff2 binary
*.eot binary
*.apk binary
*.ipa binary

# Archive files
*.zip binary
*.tar binary
*.gz binary
*.7z binary

# Exclude from exports
.gitattributes export-ignore
.gitignore export-ignore
```

---

## 📊 Attribute types:

### **1. `text` - Text file**

```properties
*.js text
```

**Meaning:** This is a text file, normalize line endings

---

### **2. `text=auto` - Auto-detect**

```properties
* text=auto
```

**Meaning:** Git decides if file is text or binary

---

### **3. `eol=lf` - Force LF**

```properties
*.sh text eol=lf
```

**Meaning:** Always use LF (Unix), even on Windows
**Use case:** Shell scripts must have LF to work on Unix

---

### **4. `eol=crlf` - Force CRLF**

```properties
*.bat text eol=crlf
```

**Meaning:** Always use CRLF (Windows)
**Use case:** Batch files must have CRLF to work on Windows

---

### **5. `binary` - Binary file**

```properties
*.png binary
```

**Meaning:** Don't touch this file, it's binary
**Use case:** Images, executables, archives

---

### **6. `export-ignore` - Exclude from archive**

```properties
.gitignore export-ignore
```

**Meaning:** Don't include in `git archive` exports

---

## 🚨 Common issues without .gitattributes:

### **Issue 1: Entire file shows as changed**

**Without .gitattributes:**

```bash
git diff app/scripts/app.js

# Shows:
- Line 1 (CRLF)
+ Line 1 (LF)
- Line 2 (CRLF)
+ Line 2 (LF)
# ... entire file!
```

**With .gitattributes:**

```bash
git diff app/scripts/app.js

# Shows only actual changes:
+ console.log('new feature');
```

---

### **Issue 2: Merge conflicts from line endings**

**Without .gitattributes:**

```
<<<<<<< HEAD
function test() {  (CRLF)
  console.log('A');  (CRLF)
}  (CRLF)
=======
function test() {  (LF)
  console.log('B');  (LF)
}  (LF)
>>>>>>> branch
```

**With .gitattributes:**

```
function test() {
<<<<<<< HEAD
  console.log('A');
=======
  console.log('B');
>>>>>>> branch
}
```

---

## 🔍 Check line endings in your files:

### **Method 1: Git command**

```bash
# Check line ending style
git ls-files --eol

# Output:
i/lf    w/crlf  attr/text=auto  app/scripts/app.js
i/lf    w/lf    attr/text=auto  app/scripts/services.js

# i/lf    = index has LF (in repository)
# w/crlf  = working directory has CRLF (on Windows)
# attr/   = .gitattributes rule applied
```

---

### **Method 2: File command (Git Bash)**

```bash
# Check specific file
file app/scripts/app.js

# Output:
app/scripts/app.js: UTF-8 Unicode text, with CRLF line terminators
```

---

### **Method 3: VS Code**

```
1. Open file in VS Code
2. Look at bottom right status bar:
   "CRLF" or "LF" or "CR"
3. Click to change
```

---

## 🎯 Integration with `.editorconfig`:

### **They work together:**

```properties
# .editorconfig (for editor)
[*]
end_of_line = lf

# .gitattributes (for Git)
* text=auto
```

**Workflow:**

```
1. Editor saves file with LF (per .editorconfig)
   ↓
2. Git commits file with LF (per .gitattributes)
   ↓
3. Consistent across team!
```

---

## 📊 Comparison:

| File                | Purpose                  | When Active                       | Scope        |
| ------------------- | ------------------------ | --------------------------------- | ------------ |
| **.gitattributes**  | Git line ending handling | Git operations (commit, checkout) | Repository   |
| **`.editorconfig`** | Editor formatting        | Editing files                     | Editor       |
| **`.eslintrc`**     | Code linting             | Running linter                    | Code quality |
| **`.jshintrc`**     | Code hints               | Running JSHint                    | Code quality |

**They complement each other:**

- `.editorconfig` → Format when editing
- .gitattributes → Normalize when committing
- `.eslintrc` → Validate code quality

---

## 🚀 Best practices:

### **1. Always commit .gitattributes:**

```gitignore
# .gitignore
node_modules/
bower_components/
dist/

# ✅ DON'T ignore .gitattributes
# .gitattributes  ← Should be tracked
```

---

### **2. Set up early in project:**

```bash
# New project setup
git init
echo "* text=auto" > .gitattributes
git add .gitattributes
git commit -m "Add .gitattributes"
```

---

### **3. Fix existing repository:**

```bash
# If you add .gitattributes to existing repo
git add --renormalize .
git commit -m "Normalize line endings"

# This re-checks all files and normalizes them
```

---

## 📊 Summary:

| Question                  | Answer                                                                 |
| ------------------------- | ---------------------------------------------------------------------- |
| **.gitattributes là gì?** | Git configuration for file attributes (line endings, binary detection) |
| **Dùng để làm gì?**       | Normalize line endings, prevent CRLF/LF conflicts                      |
| **Khi nào dùng?**         | Automatically on git commit/checkout                                   |
| **`* text=auto`**         | Let Git auto-detect text files and normalize line endings              |
| **Cần thiết không?**      | ✅ YES - Especially for cross-platform teams                           |
| **Có commit lên Git?**    | ✅ YES - Entire team needs same rules                                  |

---

## ✅ Benefits:

```
✅ No more line ending conflicts
✅ Clean git diffs (only show real changes)
✅ Consistent repository (always LF)
✅ Works across Windows/Mac/Linux
✅ Automatic (no manual intervention)
✅ Complements .editorconfig
```

---

**.gitattributes ensures your repository has consistent line endings, preventing conflicts in cross-platform teams!**
