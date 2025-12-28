# Grunt vs Webpack - So sánh đơn giản

## ✅ Đúng, nhưng có khác biệt!

**Grunt** và **Webpack** đều là công cụ build/bundler, nhưng có approach khác nhau:

---

## 📊 So sánh cơ bản:

| Aspect       | Grunt (your project) | Webpack (React projects) |
| ------------ | -------------------- | ------------------------ |
| **Type**     | Task Runner          | Module Bundler           |
| **Approach** | Configuration-based  | Dependency graph-based   |
| **Focus**    | Automate tasks       | Bundle modules           |
| **Era**      | 2012-2016 (older)    | 2014-now (modern)        |

---

## 🎯 Vai trò tương tự:

### **1. Development Server:**

**Grunt (your project):**

```bash
grunt serve
# → Starts server at localhost:9002
# → Live reload
# → Compile SASS
```

**Webpack (React):**

```bash
npm start
# or
webpack-dev-server
# → Starts server at localhost:3000
# → Hot reload
# → Compile JSX, SASS
```

---

### **2. Production Build:**

**Grunt:**

```bash
grunt build
# → Minify JS (uglify)
# → Minify CSS (cssmin)
# → Optimize images
# → Output: dist/
```

**Webpack:**

```bash
npm run build
# or
webpack --mode production
# → Bundle and minify JS
# → Optimize CSS
# → Tree shaking
# → Output: build/
```

---

## 🔍 Khác biệt chính:

### **1. Philosophy:**

**Grunt = Task-oriented:**

```javascript
// Gruntfile.js
grunt.initConfig({
  uglify: {
    dist: {
      files: {
        "dist/app.min.js": ["app/**/*.js"],
      },
    },
  },
  cssmin: {
    target: {
      files: {
        "dist/app.min.css": ["app/**/*.css"],
      },
    },
  },
});

// Định nghĩa tasks theo từng bước
grunt.registerTask("build", ["uglify", "cssmin", "copy"]);
```

**Webpack = Module-oriented:**

```javascript
// webpack.config.js
module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      { test: /\.js$/, use: "babel-loader" },
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
    ],
  },
};

// Webpack tự động resolve dependencies
```

---

### **2. Workflow:**

**Grunt workflow:**

```
Source files → Task 1 → Task 2 → Task 3 → Output
     ↓
  uglify → cssmin → imagemin → concat → dist/
```

**Webpack workflow:**

```
Entry point → Dependency graph → Bundle → Output
     ↓
  index.js → import tree → optimize → dist/bundle.js
```

---

### **3. Module handling:**

**Grunt:**

```javascript
// ❌ Grunt doesn't understand imports
// You manually list files:
uglify: {
  dist: {
    files: {
      'dist/app.js': [
        'app/module1.js',
        'app/module2.js',
        'app/module3.js'  // Manual order!
      ]
    }
  }
}
```

**Webpack:**

```javascript
// ✅ Webpack follows imports automatically
// index.js
import module1 from "./module1";
import module2 from "./module2";
import "./styles.css"; // Can even import CSS!

// Webpack knows the dependency tree
```

---

## 🎯 Trong project của bạn:

### **Your tech stack:**

```
AngularJS (v1.x)
  ↓
Grunt (task runner)
  ↓
Bower (package manager)
  ↓
Cordova (mobile wrapper)
```

**Equivalent modern stack:**

```
React
  ↓
Webpack/Vite (bundler)
  ↓
npm/yarn (package manager)
  ↓
React Native / Capacitor
```

---

## 📊 Feature Comparison:

| Feature             | Grunt                    | Webpack                            |
| ------------------- | ------------------------ | ---------------------------------- |
| **Dev server**      | ✅ grunt-contrib-connect | ✅ webpack-dev-server              |
| **Live reload**     | ✅ grunt-contrib-watch   | ✅ Hot Module Replacement (better) |
| **SASS compile**    | ✅ grunt-dart-sass       | ✅ sass-loader                     |
| **Minify JS**       | ✅ grunt-contrib-uglify  | ✅ Built-in (production mode)      |
| **Minify CSS**      | ✅ grunt-contrib-cssmin  | ✅ css-minimizer-webpack-plugin    |
| **Module bundling** | ❌ Manual concat         | ✅ Automatic (core feature)        |
| **Code splitting**  | ❌ No                    | ✅ Yes (dynamic imports)           |
| **Tree shaking**    | ❌ No                    | ✅ Yes (remove unused code)        |

---

## 💡 Analogy (Ví dụ dễ hiểu):

### **Grunt = Assembly line (Dây chuyền lắp ráp):**

```
Raw materials → Station 1 → Station 2 → Station 3 → Product
     ↓
  Cut wood → Sand → Paint → Assemble → Chair
```

**Each station is a separate task.**

### **Webpack = Smart factory (Nhà máy thông minh):**

```
Blueprint → Analyze all parts → Optimize → Build
     ↓
  index.js → Find all dependencies → Bundle efficiently → app.js
```

**Factory knows what parts are needed automatically.**

---

## 🎯 Summary:

| Question                 | Answer                                                  |
| ------------------------ | ------------------------------------------------------- |
| **Grunt giống Webpack?** | ✅ YES - Cùng mục đích (build & optimize)               |
| **Có khác biệt?**        | ✅ YES - Grunt = task runner, Webpack = module bundler  |
| **Cái nào tốt hơn?**     | Webpack (modern), but Grunt works fine for your project |
| **Có nên migrate?**      | ❌ NO - Not worth it for existing AngularJS project     |

---

## 🚀 Commands comparison:

```bash
# Your project (Grunt + AngularJS)
grunt serve          # Dev server
grunt build          # Production build
grunt test           # Run tests

# Modern React project (Webpack)
npm start            # Dev server
npm run build        # Production build
npm test             # Run tests
```

**Kết luận: Grunt và Webpack đều làm công việc tương tự, nhưng Webpack hiện đại và mạnh mẽ hơn. Tuy nhiên, Grunt vẫn hoạt động tốt cho project AngularJS 1.x của bạn!**
