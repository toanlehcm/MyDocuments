# # Gruntfile.js - Task Runner Configuration

## 📘 Gruntfile.js là gì?

**Gruntfile.js** là file cấu hình cho **Grunt** - một JavaScript task runner (công cụ chạy tác vụ tự động).

---

## 🎯 Dùng để làm gì?

### **1. Tự động hóa các tác vụ lặp đi lặp lại:**

```javascript
// Ví dụ trong file của bạn:

// ✅ Compile SASS → CSS
'dart-sass': {
  server: { /* compile SASS files */ }
}

// ✅ Minify CSS/JS
cssmin: { /* minimize CSS */ }
uglify: { /* minimize JavaScript */ }

// ✅ Optimize images
imagemin: { /* compress images */ }

// ✅ Watch files and auto-reload
watch: {
  styles: {
    files: ['app/styles/*.scss'],
    tasks: ['sass:server', 'postcss:server']
  }
}
```

---

### **2. Build production code:**

```javascript
// Build task chain
grunt.registerTask("build", [
  "clean:dist", // 1. Xóa folder dist cũ
  "wiredep", // 2. Inject Bower dependencies
  "useminPrepare", // 3. Chuẩn bị minification
  "concurrent:dist", // 4. Compile SASS, optimize images
  "postcss", // 5. Add vendor prefixes
  "ngtemplates", // 6. Cache Angular templates
  "concat", // 7. Concat files
  "ngAnnotate", // 8. Make Angular code minify-safe
  "copy:dist", // 9. Copy files to dist
  "cssmin", // 10. Minify CSS
  "uglify", // 11. Minify JS
  "filerev", // 12. Add hash to filenames (cache busting)
  "usemin", // 13. Update references
  "htmlmin", // 14. Minify HTML
]);
```

---

### **3. Development server:**

```javascript
// Local development với live reload
grunt.registerTask("serve", [
  "clean:server",
  "wiredep",
  "concurrent:server",
  "postcss:server",
  "connect:livereload", // Start server at localhost:9002
  "watch", // Auto-reload on file changes
]);
```

---

## 🕐 Khi nào dùng?

### **Development (phát triển):**

```bash
# Start local server with live reload
grunt serve

# → Server runs at http://localhost:9002
# → Auto-reload when you save files
# → SASS compiles automatically
```

**Khi:**

- Đang code và muốn xem thay đổi real-time
- Cần compile SASS → CSS
- Test trên browser với live reload

---

### **Production Build (build cho production):**

```bash
# Build optimized production code
grunt build

# → Compiles, minifies, optimizes all code
# → Output: dist/ folder ready for deployment
```

**Khi:**

- Cần build app để deploy lên server
- Cần tối ưu hóa code (minify, compress)
- Cần tạo cache-busting hashes

---

### **Testing:**

```bash
# Run tests
grunt test

# → Runs Karma unit tests
```

**Khi:**

- Chạy unit tests
- CI/CD pipeline

---

## 📊 Workflow trong project của bạn:

### **1. Development workflow:**

```bash
# Terminal 1: Start dev server
grunt serve

# Terminal 2: Edit code
# → app/scripts/
# → app/styles/
# → app/views/

# Browser automatically reloads!
```

---

### **2. Build for Cordova:**

```bash
# Step 1: Build web app
grunt build

# Step 2: Copy dist/ to Cordova
cordova prepare

# Step 3: Build Android APK
cordova build android --release

# Step 4: Sign and deploy
```

---

## 🎯 Các tác vụ chính trong file của bạn:

| Task            | Mô tả               | Command             |
| --------------- | ------------------- | ------------------- |
| **serve**       | Start dev server    | `grunt serve`       |
| **build**       | Build production    | `grunt build`       |
| **build:debug** | Build debug version | `grunt build:debug` |
| **test**        | Run tests           | `grunt test`        |
| **watch**       | Watch file changes  | (auto with serve)   |
| **dart-sass**   | Compile SASS → CSS  | (auto)              |
| **uglify**      | Minify JavaScript   | (auto in build)     |
| **cssmin**      | Minify CSS          | (auto in build)     |

---

## 🔍 So sánh với các tools khác:

| Tool            | Purpose                   | Your Project Uses             |
| --------------- | ------------------------- | ----------------------------- |
| **Grunt**       | Task runner               | ✅ YES (Gruntfile.js)         |
| **Gulp**        | Task runner (alternative) | ❌ NO                         |
| **Webpack**     | Module bundler            | ❌ NO (uses Grunt instead)    |
| **npm scripts** | Simple task runner        | ⚠️ Could use for simple tasks |

---

## 🚨 Important Notes:

### **Your project structure:**

```
Project/
├── Gruntfile.js          ✅ Task configuration
├── package.json          ✅ npm dependencies (includes Grunt plugins)
├── bower.json            ✅ Frontend dependencies
├── app/                  ✅ Source code
│   ├── scripts/
│   ├── styles/
│   └── views/
└── dist/                 ✅ Built code (created by grunt build)
```

---

### **Key Grunt plugins in your project:**

```json
{
  "grunt-contrib-uglify-es": "minify JS",
  "grunt-dart-sass": "compile SASS",
  "grunt-usemin": "optimize asset loading",
  "grunt-angular-templates": "cache Angular templates",
  "grunt-postcss": "add vendor prefixes",
  "grunt-filerev": "cache busting",
  "time-grunt": "show task execution time",
  "jit-grunt": "auto-load Grunt plugins"
}
```

---

## 🎯 Summary:

| Question                    | Answer                                                                                |
| --------------------------- | ------------------------------------------------------------------------------------- |
| **Gruntfile.js là gì?**     | Config file for Grunt task runner                                                     |
| **Dùng để làm gì?**         | Automate build, compile SASS, minify, optimize, test                                  |
| **Khi nào dùng?**           | Development (`grunt serve`), Production build (`grunt build`), Testing (`grunt test`) |
| **Có thay thế được không?** | Có thể dùng Gulp/Webpack, nhưng phải rewrite toàn bộ config                           |

---

## 💡 Quick Commands:

```bash
# Development
grunt serve              # Start dev server (localhost:9002)

# Production
grunt build              # Build optimized code → dist/

# After build
cordova prepare          # Copy dist/ to Cordova
cordova build android    # Build APK
```

**Gruntfile.js is essential for your development and build workflow!**
