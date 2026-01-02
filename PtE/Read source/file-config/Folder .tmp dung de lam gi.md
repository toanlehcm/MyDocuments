# Folder `.tmp` - Temporary Build Files

## 📘 `.tmp` là gì?

**`.tmp`** là folder chứa **temporary files** (files tạm thời) được tạo bởi **Grunt** trong quá trình development.

---

## 🎯 Dùng để làm gì?

### **1. Chứa compiled files trong development:**

```
.tmp/
├── styles/
│   ├── main.css          ✅ Compiled từ SASS
│   └── vendor.css        ✅ Third-party CSS
├── scripts/
│   └── templates.js      ✅ Cached Angular templates
└── concat/
    └── scripts/          ✅ Concatenated JS files
```

---

### **2. Intermediate build output:**

```javascript
// Trong Gruntfile.js
'dart-sass': {
  server: {
    files: [{
      expand: true,
      cwd: 'app/styles',
      src: ['*.scss'],
      dest: '.tmp/styles',     // ✅ Output to .tmp
      ext: '.css'
    }]
  }
}
```

**Flow:**

```
app/styles/main.scss  →  [Grunt compile]  →  .tmp/styles/main.css
                                                      ↓
                                            Dev server serves này
```

---

### **3. Served by development server:**

```javascript
// Gruntfile.js - connect:livereload
connect: {
  options: {
    port: 9002,
    hostname: 'localhost',
    livereload: 35729
  },
  livereload: {
    options: {
      open: true,
      middleware: function (connect) {
        return [
          connect.static('.tmp'),        // ✅ Serve .tmp first
          connect.static('app')          // Then serve app
        ];
      }
    }
  }
}
```

**Khi bạn chạy `grunt serve`:**

```
Browser request: http://localhost:9002/styles/main.css
                          ↓
Server checks: .tmp/styles/main.css  ✅ Found (compiled SASS)
                          ↓
Serves this file
```

---

## 🔄 Workflow:

### **Development mode (`grunt serve`):**

```
1. Watch SASS files
   app/styles/*.scss
        ↓
2. Compile to .tmp
   .tmp/styles/*.css
        ↓
3. Server serves from .tmp
   localhost:9002/styles/main.css
        ↓
4. Browser loads CSS
```

---

### **Production build (`grunt build`):**

```
1. Clean .tmp
        ↓
2. Compile SASS → .tmp
        ↓
3. Optimize, minify
        ↓
4. Copy to dist/
        ↓
5. Clean .tmp again
```

---

## 📊 So sánh folders:

| Folder                | Purpose            | When used     | Committed to Git? |
| --------------------- | ------------------ | ------------- | ----------------- |
| **app/**              | Source code        | Always        | ✅ YES            |
| **.tmp/**             | Compiled dev files | `grunt serve` | ❌ NO             |
| **dist/**             | Production build   | `grunt build` | ❌ NO             |
| **node_modules/**     | npm packages       | Always        | ❌ NO             |
| **bower_components/** | Bower packages     | Always        | ❌ NO             |

---

## 🚨 Important Notes:

### **1. Always in `.gitignore`:**

```gitignore
# .gitignore
.tmp/           ✅ Don't commit temporary files
dist/           ✅ Don't commit build output
node_modules/   ✅ Don't commit dependencies
bower_components/
```

---

### **2. Auto-cleaned by Grunt:**

```javascript
// Gruntfile.js
clean: {
  dist: {
    files: [{
      dot: true,
      src: [
        '.tmp',        // ✅ Clean before build
        'dist/{,*/}*'
      ]
    }]
  },
  server: '.tmp'   // ✅ Clean before serve
}
```

---

### **3. Can be deleted safely:**

```bash
# If you have issues, just delete and rebuild
rm -rf .tmp
rm -rf dist

# Then rebuild
grunt serve
# or
grunt build
```

---

## 💡 Analogy (Ví dụ dễ hiểu):

### **Cooking analogy:**

```
app/           = Recipe book (source code)
.tmp/          = Prep counter (temporary workspace)
dist/          = Plated dish (final product)
```

**Workflow:**

```
1. Get ingredients from recipe (app/)
2. Prep on counter (.tmp/) - chop, mix, cook
3. Serve on plate (dist/) - final presentation
4. Clean counter (.tmp/) after cooking
```

---

## 🔍 Check your `.tmp` folder:

```bash
# List contents
ls -la .tmp/

# Expected structure during development:
.tmp/
├── concat/
├── scripts/
└── styles/
    ├── main.css        # Your compiled CSS
    └── vendor.css
```

---

## 🎯 Common scenarios:

### **Scenario 1: CSS not updating**

```bash
# Solution: Clean .tmp and restart
rm -rf .tmp
grunt serve
```

### **Scenario 2: Build errors**

```bash
# Solution: Clean everything
rm -rf .tmp dist
grunt build
```

### **Scenario 3: Disk space issues**

```bash
# Safe to delete
rm -rf .tmp
rm -rf dist
rm -rf node_modules
rm -rf bower_components

# Then reinstall
npm install
bower install
```

---

## 🎯 Summary:

| Question            | Answer                                                      |
| ------------------- | ----------------------------------------------------------- |
| **`.tmp` là gì?**   | Folder chứa compiled files tạm thời                         |
| **Dùng để làm gì?** | Store SASS compiled CSS, concat JS, etc. during development |
| **Khi nào tạo?**    | Automatically by `grunt serve` or `grunt build`             |
| **Có cần commit?**  | ❌ NO - always in `.gitignore`                              |
| **Có thể xóa?**     | ✅ YES - safe to delete, will be regenerated                |

---

## 🚀 Quick commands:

```bash
# Development - creates .tmp
grunt serve

# Build - creates .tmp then dist
grunt build

# Clean up
rm -rf .tmp dist

# If issues, clean and rebuild
rm -rf .tmp && grunt serve
```

**`.tmp` is like a scratch pad - temporary workspace for Grunt during development!**
