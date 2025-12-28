# Folder `dist` - Distribution/Production Build

## 📘 `dist` là gì?

**`dist`** (viết tắt của **distribution**) là folder chứa **production-ready code** - code đã được optimize, minify, và sẵn sàng để deploy lên server hoặc build thành Cordova app.

---

## 🎯 Dùng để làm gì?

### **1. Chứa optimized production code:**

```
dist/
├── index.html              ✅ Minified HTML
├── scripts/
│   └── app.abc123.js       ✅ Minified, concatenated JS (with cache hash)
├── styles/
│   └── main.def456.css     ✅ Minified, concatenated CSS (with cache hash)
├── images/
│   └── *.png/jpg           ✅ Optimized images
├── fonts/
│   └── *.woff/ttf          ✅ Font files
└── views/
    └── *.html              ✅ Minified templates
```

---

### **2. Created by `grunt build`:**

```bash
# Build production code
grunt build

# Result: dist/ folder is created with optimized files
```

**Build process:**

```javascript
// Gruntfile.js
grunt.registerTask("build", [
  "clean:dist", // 1. Delete old dist/
  "wiredep", // 2. Inject dependencies
  "useminPrepare", // 3. Prepare optimization
  "concurrent:dist", // 4. Compile SASS, optimize images
  "postcss", // 5. Add vendor prefixes
  "ngtemplates", // 6. Cache Angular templates
  "concat", // 7. Concatenate files
  "ngAnnotate", // 8. Make Angular minify-safe
  "copy:dist", // 9. Copy files to dist/
  "cssmin", // 10. Minify CSS
  "uglify", // 11. Minify JS
  "filerev", // 12. Add cache-busting hashes
  "usemin", // 13. Update file references
  "htmlmin", // 14. Minify HTML
]);
```

---

## 🔄 Workflow:

### **Development vs Production:**

```
Development (app/ + .tmp/):
app/scripts/app.js          ← Original, readable code
app/scripts/controllers/
app/scripts/services/
app/styles/main.scss        ← Uncompiled SASS
                            ↓ grunt serve
Browser: localhost:9002     ← Dev server, live reload

Production (dist/):
                            ↓ grunt build
dist/scripts/app.abc123.js  ← Minified, concatenated, hashed
dist/styles/main.def456.css ← Compiled, minified, hashed
                            ↓
Deploy to server or Cordova build
```

---

## 📊 So sánh app/ vs dist/:

| File          | app/ (Development)       | dist/ (Production)                     |
| ------------- | ------------------------ | -------------------------------------- |
| **HTML**      | `index.html` (readable)  | `index.html` (minified)                |
| **JS**        | Multiple files, readable | Single file, minified `app.abc123.js`  |
| **CSS**       | `main.scss` (SASS)       | `main.def456.css` (compiled, minified) |
| **Images**    | Original size            | Optimized, compressed                  |
| **Size**      | ~10MB                    | ~2MB (optimized)                       |
| **Load time** | Slow (many requests)     | Fast (fewer, smaller files)            |

---

## 🎯 Khi nào dùng?

### **1. Build for Cordova:**

```bash
# Step 1: Build web app
grunt build
# Creates dist/ folder

# Step 2: Copy dist/ to Cordova www/
cordova prepare
# Copies dist/ → platforms/android/app/src/main/assets/www/

# Step 3: Build Android APK
cordova build android --release
# Creates: platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk

# Step 4: Sign and deploy
```

---

### **2. Deploy to web server:**

```bash
# Build
grunt build

# Upload dist/ to server
scp -r dist/* user@server:/var/www/html/

# Or use FTP/deployment tool
```

---

### **3. Before releasing new version:**

```bash
# Always build fresh dist/
rm -rf dist
grunt build

# Test dist/ locally
grunt serve:dist
# Opens browser with production build

# If OK, proceed with deployment
```

---

## 🔍 What happens during `grunt build`:

### **Example file transformations:**

**1. JavaScript (minify + concatenate):**

```javascript
// BEFORE (app/scripts/app.js) - 50KB
angular.module("PtEMobile", ["ngRoute", "ngAnimate"]).config(function ($routeProvider) {
  $routeProvider.when("/", {
    templateUrl: "views/main.html",
    controller: "MainCtrl",
  });
});

// AFTER (dist/scripts/app.abc123.js) - 15KB
angular.module("PtEMobile", ["ngRoute", "ngAnimate"]).config([
  "$routeProvider",
  function (a) {
    a.when("/", { templateUrl: "views/main.html", controller: "MainCtrl" });
  },
]);
```

**2. CSS (compile SASS + minify):**

```css
/* BEFORE (app/styles/main.scss) - 100KB */
$primary-color: #007bff;

.header {
  background-color: $primary-color;
  padding: 20px;

  .logo {
    font-size: 24px;
  }
}

/* AFTER (dist/styles/main.def456.css) - 30KB */
.header {
  background-color: #007bff;
  padding: 20px;
}
.header .logo {
  font-size: 24px;
}
```

**3. HTML (minify + inject hashed files):**

```html
<!-- BEFORE (app/index.html) -->
<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" href="styles/main.css" />
  </head>
  <body>
    <div ng-view></div>
    <script src="scripts/app.js"></script>
    <script src="scripts/controllers/main.js"></script>
  </body>
</html>

<!-- AFTER (dist/index.html) -->
<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" href="styles/main.def456.css" />
  </head>
  <body>
    <div ng-view></div>
    <script src="scripts/app.abc123.js"></script>
  </body>
</html>
```

---

## 🚨 Important Notes:

### **1. Always in `.gitignore`:**

```gitignore
# .gitignore
dist/               ✅ Don't commit build output
.tmp/
node_modules/
bower_components/
```

**Why?**

- Build output changes on every build
- Different developers may have different build results
- Takes up repository space
- Should be generated fresh for each deployment

---

### **2. Clean before building:**

```javascript
// Gruntfile.js
clean: {
  dist: {
    files: [
      {
        dot: true,
        src: [
          ".tmp",
          "dist/{,*/}*", // Delete everything in dist/
          "!dist/.git{,*/}*", // Except .git files
        ],
      },
    ];
  }
}
```

---

### **3. Cache busting with file hashing:**

```javascript
// Gruntfile.js
filerev: {
  dist: {
    src: ["dist/scripts/{,*/}*.js", "dist/styles/{,*/}*.css", "dist/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}"];
  }
}
```

**Result:**

```
app.js      → app.abc123.js
main.css    → main.def456.css
logo.png    → logo.789xyz.png
```

**Why?** Browser won't cache old versions when you deploy updates.

---

## 💡 Analogy (Ví dụ dễ hiểu):

### **Restaurant analogy:**

```
app/          = Kitchen (raw ingredients, prep area)
.tmp/         = Prep station (cutting, mixing)
dist/         = Plated dishes ready to serve customers
```

**Process:**

```
1. app/       = Raw ingredients (readable source code)
2. .tmp/      = Prep work (compile SASS, etc.)
3. grunt build = Cooking process (optimize, minify)
4. dist/      = Final dish (ready to serve/deploy)
```

---

## 🔍 Test production build locally:

```bash
# Build
grunt build

# Serve production build (test before deploy)
grunt serve:dist
# or
cd dist
python -m SimpleHTTPServer 8000
# Open: http://localhost:8000
```

---

## 📊 Folder structure comparison:

```
Project Root/
├── app/                    ✅ Source code (commit to Git)
│   ├── index.html
│   ├── scripts/
│   ├── styles/
│   └── views/
│
├── .tmp/                   ❌ Temp build (don't commit)
│   └── styles/
│       └── main.css
│
├── dist/                   ❌ Production build (don't commit)
│   ├── index.html
│   ├── scripts/
│   │   └── app.abc123.js
│   └── styles/
│       └── main.def456.css
│
├── bower_components/       ❌ Dependencies (don't commit)
├── node_modules/           ❌ Dependencies (don't commit)
│
├── Gruntfile.js           ✅ Build config (commit)
├── bower.json             ✅ Frontend deps (commit)
├── package.json           ✅ Build deps (commit)
└── .gitignore             ✅ Ignore rules (commit)
```

---

## 🎯 Common scenarios:

### **Scenario 1: Build for Cordova Android:**

```bash
# Clean and build
rm -rf dist
grunt build

# Prepare Cordova
cordova prepare android

# Build APK
cordova build android --release

# dist/ is now inside:
# platforms/android/app/src/main/assets/www/
```

---

### **Scenario 2: Deploy to web server:**

```bash
# Build
grunt build

# Upload dist/ contents
rsync -av dist/ user@server:/var/www/myapp/

# Or use FTP client to upload dist/ folder
```

---

### **Scenario 3: Build errors:**

```bash
# Clean everything and rebuild
rm -rf .tmp dist
grunt clean
grunt build
```

---

## 🎯 Summary:

| Question                 | Answer                                              |
| ------------------------ | --------------------------------------------------- |
| **`dist` là gì?**        | Production build folder - optimized, minified code  |
| **Dùng để làm gì?**      | Deploy to server or build Cordova app               |
| **Khi nào dùng?**        | `grunt build` before deployment or Cordova build    |
| **Có cần commit?**       | ❌ NO - always in `.gitignore`                      |
| **Có thể xóa?**          | ✅ YES - run `grunt build` to recreate              |
| **Khác `app/` như nào?** | `app/` = source, `dist/` = optimized for production |

---

## 🚀 Complete workflow:

```bash
# 1. Development
grunt serve              # Uses app/ + .tmp/

# 2. Build for production
grunt build              # Creates dist/

# 3. Test production build
grunt serve:dist         # Test dist/ locally

# 4. Deploy
# Option A: Web server
scp -r dist/* server:/var/www/

# Option B: Cordova app
cordova prepare android
cordova build android --release
```

**`dist` is your final product - optimized, minified, and ready for customers/users!**
