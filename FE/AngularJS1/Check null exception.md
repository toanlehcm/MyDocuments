# Check null exception by jshint in AngularJS 1.x project

"lint": "grunt jshint",
"lint:fix": "grunt jshint --force",
"validate": "grunt jshint && grunt jscs && grunt test",
"prebuild": "npm run validate"

# Run ESLint on Specific File

## ✅ Yes, bạn có thể lint từng file cụ thể!

---

## 🎯 Solution 1: Direct ESLint Command (Recommended)

### **Check single file:**

```bash
# Check treamentNoteATP.js
npx eslint app/scripts/controllers/patientDashboard/treamentNoteATP.js

# Or use full path
npx eslint d:\SVN\Pte-7275\Client\app\scripts\controllers\patientDashboard\treamentNoteATP.js
```

---

### **Auto-fix errors in single file:**

```bash
npx eslint app/scripts/controllers/patientDashboard/treamentNoteATP.js --fix
```

---

## 🎯 Solution 2: Add Custom npm Scripts

### **Update package.json:**

````json
{
  "name": "pteapp",
  "private": true,
  "devDependencies": {
    "@babel/core": "^7.23.5",
    "@babel/plugin-transform-class-properties": "^7.27.1",
    "@babel/preset-env": "^7.23.5",
    "autoprefixer": "^9.8.8",
    "babel-loader": "^9.1.3",
    "clean-webpack-plugin": "^4.0.0",
    "copy-webpack-plugin": "^11.0.0",
    "css-loader": "^6.8.1",
    "eslint": "^8.55.0",
    "eslint-plugin-angular": "^4.0.1",
    "grunt": "^0.4.5",
    "grunt-angular-templates": "^0.5.7",
    "grunt-concurrent": "^1.0.0",
    "grunt-contrib-clean": "^0.6.0",
    "grunt-contrib-compass": "^1.1.0",
    "grunt-contrib-concat": "^0.5.0",
    "grunt-contrib-connect": "^0.9.0",
    "grunt-contrib-copy": "^0.7.0",
    "grunt-contrib-cssmin": "^0.12.0",
    "grunt-contrib-htmlmin": "^0.4.0",
    "grunt-contrib-imagemin": "^1.0.0",
    "grunt-contrib-jshint": "^0.11.0",
    "grunt-contrib-uglify": "^0.7.0",
    "grunt-contrib-watch": "^0.6.1",
    "grunt-eslint": "^24.3.0",
    "grunt-filerev": "^2.1.2",
    "grunt-google-cdn": "^0.4.3",
    "grunt-jscs": "^1.8.0",
    "grunt-karma": "*",
    "grunt-newer": "^1.1.0",
    "grunt-ng-annotate": "^0.9.2",
    "grunt-postcss": "^0.9.0",
    "grunt-svgmin": "^2.0.0",
    "grunt-usemin": "^3.0.0",
    "grunt-wiredep": "^2.0.0",
    "html-webpack-plugin": "^5.5.3",
    "jit-grunt": "^0.9.1",
    "jshint-stylish": "^1.0.0",
    "karma-jasmine": "*",
    "karma-phantomjs-launcher": "*",
    "mini-css-extract-plugin": "^2.7.6",
    "postcss": "^7.0.39",
    "postcss-loader": "^7.3.3",
    "sass": "^1.92.1",
    "sass-loader": "^13.3.2",
    "style-loader": "^3.3.3",
    "time-grunt": "^1.0.0",
    "webpack": "^5.89.0",
    "webpack-cli": "^5.1.4",
    "webpack-dev-server": "^4.15.1"
  },
  "engines": {
    "node": ">=0.10.0"
  },
  "scripts": {
    "start": "grunt serve",
    "test": "grunt test",
    "dev": "webpack serve --mode development",
    "build": "webpack --mode production",
    "build:dev": "webpack --mode development",
    "serve": "webpack serve --mode development",
    "bundle:appsignal": "npx browserify app/lib/appsignal/appsignal-init.js -o app/lib/appsignal/appsignal.bundle.js",
    "lint": "eslint app/scripts/**/*.js",
    "lint:fix": "eslint app/scripts/**/*.js --fix",
    "lint:file": "eslint",
    "lint:treatment": "eslint app/scripts/controllers/patientDashboard/treamentNoteATP.js",
    "lint:treatment:fix": "eslint app/scripts/controllers/patientDashboard/treamentNoteATP.js --fix",
    "validate": "npm run lint && grunt test",
    "prebuild": "npm run validate"
  },
  "dependencies": {
    "@appsignal/javascript": "^1.6.1",
    "@appsignal/plugin-breadcrumbs-console": "^1.1.37",
    "@appsignal/plugin-breadcrumbs-network": "^1.1.24",
    "@appsignal/plugin-path-decorator": "^1.0.18",
    "@appsignal/plugin-window-events": "^1.0.26",
    "bootbox": "^4.4.0",
    "buffer-to-vinyl": "^1.1.0",
    "connect-modrewrite": "^0.10.2",
    "grunt-contrib-uglify-es": "^3.3.0",
    "grunt-dart-sass": "^2.0.1",
    "yo": "^2.0.4"
  }
}
````

---

## 🚀 Usage Commands:

### **1. Check specific file:**

```bash
# Using predefined script
npm run lint:treatment

# Or pass file path directly
npm run lint:file -- app/scripts/controllers/patientDashboard/treamentNoteATP.js
```

---

### **2. Auto-fix specific file:**

```bash
# Fix treamentNoteATP.js
npm run lint:treatment:fix

# Or fix any file
npm run lint:file -- app/scripts/controllers/patientDashboard/treamentNoteATP.js --fix
```

---

### **3. Check multiple specific files:**

```bash
npx eslint app/scripts/controllers/patientDashboard/treamentNoteATP.js app/scripts/factory/downloadService.js
```

---

### **4. Check all files in a folder:**

```bash
# Check all controllers
npx eslint app/scripts/controllers/**/*.js

# Check only patientDashboard controllers
npx eslint app/scripts/controllers/patientDashboard/**/*.js
```

---

## 📊 Output Example:

```bash
PS D:\SVN\Pte-7275\Client> npm run lint:treatment

> pteapp@ lint:treatment D:\SVN\Pte-7275\Client
> eslint app/scripts/controllers/patientDashboard/treamentNoteATP.js

D:\SVN\Pte-7275\Client\app\scripts\controllers\patientDashboard\treamentNoteATP.js
  7195:9   error  'dataResponse' is not defined              no-undef
  7195:33  error  Missing semicolon                          semi
  7196:1   error  Expected indentation of 8 spaces but found 0  indent

✖ 3 problems (3 errors, 0 warnings)
  2 errors and 0 warnings potentially fixable with the `--fix` option.
```

---

## 🎯 Advanced: Watch Mode for Single File

### **Install nodemon:**

```bash
npm install --save-dev nodemon
```

### **Add to package.json:**

```json
{
  "scripts": {
    "lint:watch": "nodemon --watch app/scripts --ext js --exec 'eslint'",
    "lint:treatment:watch": "nodemon --watch app/scripts/controllers/patientDashboard/treamentNoteATP.js --exec 'eslint app/scripts/controllers/patientDashboard/treamentNoteATP.js'"
  }
}
```

### **Usage:**

```bash
# Auto-lint on file change
npm run lint:treatment:watch
```

---

## 🎯 Quick Reference:

| Command | Purpose |
|---------|---------|
| `npx eslint file.js` | Check single file |
| `npx eslint file.js --fix` | Fix single file |
| `npm run lint:treatment` | Check treamentNoteATP.js |
| `npm run lint:treatment:fix` | Fix treamentNoteATP.js |
| `npm run lint:file -- path/to/file.js` | Check any file |

---

## ✅ Recommended Workflow:

```bash
# 1. Check specific file for errors
npm run lint:treatment

# 2. Auto-fix what can be fixed
npm run lint:treatment:fix

# 3. Manually fix remaining errors

# 4. Verify all fixed
npm run lint:treatment

# 5. Before commit, check all files
npm run lint
```

---

**Now you can easily lint individual files without checking the entire project!**

Similar code found with 1 license type