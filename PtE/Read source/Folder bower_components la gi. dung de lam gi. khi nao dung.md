# Folder `bower_components` - Frontend Package Manager

## 📘 `bower_components` là gì?

**`bower_components`** là folder chứa **frontend dependencies** (thư viện JavaScript/CSS) được quản lý bởi **Bower** - một package manager cho web (giống npm nhưng cho frontend).

---

## 🎯 Dùng để làm gì?

### **1. Chứa frontend libraries:**

```
bower_components/
├── angular/                ✅ AngularJS framework
│   ├── angular.js
│   └── angular.min.js
├── angular-route/          ✅ Angular routing
├── angular-animate/        ✅ Angular animations
├── bootstrap/              ✅ Bootstrap CSS
│   ├── dist/
│   │   ├── css/
│   │   └── js/
├── jquery/                 ✅ jQuery
│   └── dist/
│       └── jquery.min.js
├── lodash/                 ✅ Utility library
├── moment/                 ✅ Date library
└── font-awesome/           ✅ Icon fonts
```

---

### **2. Managed by `bower.json`:**

```json
// bower.json
{
  "name": "pte-everywhere",
  "version": "1.0.0",
  "dependencies": {
    "angular": "~1.6.0",
    "angular-route": "~1.6.0",
    "angular-animate": "~1.6.0",
    "bootstrap": "~3.3.7",
    "jquery": "~3.2.1",
    "lodash": "~4.17.4",
    "moment": "~2.18.1",
    "font-awesome": "~4.7.0"
  }
}
```

---

### **3. Installed by Bower CLI:**

```bash
# Install all dependencies from bower.json
bower install

# Install specific package
bower install angular --save

# Update packages
bower update

# Search for packages
bower search angular
```

---

## 🔄 Workflow:

### **Initial setup:**

```bash
# 1. Install Bower globally (one time)
npm install -g bower

# 2. Install project dependencies
cd D:\SVN\Pte-7275\Client
bower install

# ✅ This creates bower_components/ folder
```

---

### **Adding new library:**

```bash
# Example: Add angular-material
bower install angular-material --save

# Result:
bower_components/
└── angular-material/
    ├── angular-material.js
    └── angular-material.css

# bower.json automatically updated:
{
  "dependencies": {
    "angular-material": "~1.1.0"
  }
}
```

---

## 🔗 Integration with Grunt:

### **Grunt automatically injects Bower dependencies:**

```javascript
// Gruntfile.js
wiredep: {
  app: {
    src: ['app/index.html'],
    ignorePath: /\.\.\//
  }
}
```

**What it does:**

```html
<!-- app/index.html -->
<!-- bower:css -->
<link rel="stylesheet" href="bower_components/bootstrap/dist/css/bootstrap.css" />
<link rel="stylesheet" href="bower_components/font-awesome/css/font-awesome.css" />
<!-- endbower -->

<!-- bower:js -->
<script src="bower_components/jquery/dist/jquery.js"></script>
<script src="bower_components/angular/angular.js"></script>
<script src="bower_components/bootstrap/dist/js/bootstrap.js"></script>
<script src="bower_components/angular-route/angular-route.js"></script>
<!-- endbower -->
```

**Grunt reads bower.json → Auto-injects `<script>` and `<link>` tags**

---

## 📊 So sánh với npm:

| Aspect              | Bower (bower_components)    | npm (node_modules)    |
| ------------------- | --------------------------- | --------------------- |
| **Purpose**         | Frontend libraries (JS/CSS) | Backend + build tools |
| **Config file**     | `bower.json`                | `package.json`        |
| **Install command** | `bower install`             | `npm install`         |
| **Usage**           | Browser `<script>` tags     | Node.js `require()`   |
| **Status**          | ⚠️ Deprecated (2017)        | ✅ Active             |

---

## ⚠️ Bower is DEPRECATED:

### **Why still in your project?**

```
Your project (2015-2017 era):
  AngularJS 1.x
       ↓
  Bower (standard at that time)
       ↓
  bower_components/

Modern projects (2018+):
  React/Vue/Angular (modern)
       ↓
  npm/yarn only
       ↓
  node_modules/
```

**Bower was deprecated in 2017, but your project still uses it because it's an older AngularJS project.**

---

## 🎯 Khi nào dùng?

### **1. During development:**

```bash
# First time setup
bower install

# Add new library
bower install angular-material --save

# Update existing libraries
bower update angular
```

---

### **2. When dependencies are missing:**

```bash
# If bower_components/ is missing
bower install

# Rebuilds entire folder from bower.json
```

---

### **3. Team collaboration:**

```gitignore
# .gitignore
bower_components/    ✅ Don't commit to Git
```

**Workflow:**

```
Developer A:
1. bower install lodash --save
2. Commit bower.json (NOT bower_components/)
3. Push to Git

Developer B:
1. Pull from Git
2. bower install (recreates bower_components/)
3. Ready to code
```

---

## 🚨 Important Notes:

### **1. Always in `.gitignore`:**

```gitignore
# Don't commit dependencies
bower_components/
node_modules/
```

---

### **2. Can be deleted safely:**

```bash
# If you have issues
rm -rf bower_components/

# Reinstall
bower install
```

---

### **3. Flat dependency structure:**

**Bower (flat):**

```
bower_components/
├── angular/
├── jquery/
└── bootstrap/
```

**npm (nested):**

```
node_modules/
├── package-a/
│   └── node_modules/
│       └── dependency-1/
└── package-b/
    └── node_modules/
        └── dependency-2/
```

---

## 💡 Analogy (Ví dụ dễ hiểu):

### **Library analogy:**

```
bower_components/ = Public library
                    (shared books/resources)

Your app/         = Your notebook
                    (references books from library)
```

**Usage:**

```html
<!-- You don't copy books, you reference them -->
<script src="bower_components/angular/angular.js"></script>
<script src="bower_components/jquery/dist/jquery.min.js"></script>

<!-- Your code uses these libraries -->
<script src="app/scripts/app.js"></script>
```

---

## 🔍 Check your `bower_components`:

```bash
# List all installed packages
bower list

# Check specific package version
bower list angular

# See dependency tree
bower list --paths
```

**Expected output:**

```
bower check-new     Checking for new versions of the project dependencies...
pte-everywhere#1.0.0
├── angular#1.6.9
├── angular-animate#1.6.9
├── angular-route#1.6.9
├── bootstrap#3.3.7
├── jquery#3.2.1
└── lodash#4.17.21
```

---

## 📦 Modern equivalent:

### **If building new project today:**

```bash
# ❌ Old way (Bower)
bower install angular --save

# ✅ New way (npm)
npm install angular --save
# or
npm install react --save
```

**Modern projects use npm for EVERYTHING:**

```json
// package.json (modern)
{
  "dependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "angular": "^16.0.0", // Even Angular uses npm now!
    "bootstrap": "^5.3.0"
  }
}
```

---

## 🎯 Summary:

| Question                      | Answer                                                      |
| ----------------------------- | ----------------------------------------------------------- |
| **`bower_components` là gì?** | Folder chứa frontend libraries (JS/CSS)                     |
| **Dùng để làm gì?**           | Store Angular, jQuery, Bootstrap, etc.                      |
| **Khi nào dùng?**             | `bower install` when setting up project or adding libraries |
| **Có cần commit?**            | ❌ NO - always in `.gitignore`                              |
| **Có thể xóa?**               | ✅ YES - run `bower install` to recreate                    |
| **Còn dùng không?**           | ⚠️ Bower deprecated, but your project still needs it        |

---

## 🚀 Quick commands:

```bash
# Install all dependencies
bower install

# Add new package
bower install package-name --save

# Remove package
bower uninstall package-name --save

# Update packages
bower update

# Clean up and reinstall
rm -rf bower_components && bower install
```

**`bower_components` is like a warehouse for frontend libraries - your app references them but doesn't own them!**

Similar code found with 4 license types
