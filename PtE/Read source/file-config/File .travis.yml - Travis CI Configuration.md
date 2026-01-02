# File .travis.yml - Travis CI Configuration

## 📘 .travis.yml là gì?

**.travis.yml** là file **cấu hình cho Travis CI** - một continuous integration (CI) service để tự động build và test code mỗi khi có commit/push lên repository.

---

## 🎯 Dùng để làm gì?

### **1. Automated testing & building:**

```yaml
sudo: false # Don't need root access
language: node_js # Project uses Node.js
node_js:
  - "iojs" # Test on io.js
  - "0.12" # Test on Node 0.12
  - "0.10" # Test on Node 0.10
before_script:
  - "npm install -g bower grunt-cli" # Install build tools
  - "bower install" # Install dependencies
```

**Purpose:** Automatically run tests when code is pushed to GitHub

---

## 📊 Giải thích từng phần:

### **1. `sudo: false`**

```yaml
sudo: false
```

**Meaning:** Don't use root privileges (faster build, container-based)

**Benefits:**

- ✅ Faster startup time
- ✅ More secure
- ✅ Container-based infrastructure

---

### **2. `language: node_js`**

```yaml
language: node_js
```

**Meaning:** This is a Node.js project

**What Travis does:**

- Install Node.js
- Run `npm install` automatically
- Set up Node environment

---

### **3. `node_js:` - Test matrix**

```yaml
node_js:
  - "iojs" # io.js (Node.js fork, 2015)
  - "0.12" # Node.js 0.12.x
  - "0.10" # Node.js 0.10.x
```

**Meaning:** Run tests on 3 different Node versions

**What Travis does:**

```
Build 1: Test on io.js
Build 2: Test on Node 0.12
Build 3: Test on Node 0.10

→ Ensures compatibility across versions
```

---

### **4. `before_script:`**

```yaml
before_script:
  - "npm install -g bower grunt-cli"
  - "bower install"
```

**Meaning:** Commands to run BEFORE tests

**Execution order:**

```
1. npm install -g bower grunt-cli  → Install build tools globally
2. bower install                   → Install frontend dependencies
3. [then run tests]
```

---

## 🔄 Complete CI workflow:

### **When you push code to GitHub:**

```
1. Developer pushes to GitHub
   git push origin master
        ↓
2. GitHub triggers Travis CI webhook
        ↓
3. Travis CI starts build
        ↓
4. Travis reads .travis.yml
        ↓
5. Set up environment (3 parallel builds)
   - Build 1: io.js
   - Build 2: Node 0.12
   - Build 3: Node 0.10
        ↓
6. Install dependencies
   npm install (automatic)
        ↓
7. Run before_script
   npm install -g bower grunt-cli
   bower install
        ↓
8. Run tests (default: npm test)
   npm test
        ↓
9. Report results
   ✅ All builds passed
   or
   ❌ Build failed on Node 0.10
```

---

## 🎯 Khi nào dùng?

### **1. Automatically on git push:**

```bash
# Developer workflow
git add .
git commit -m "Fix bug"
git push origin master

# ✅ Travis CI automatically:
# - Pulls latest code
# - Runs builds on 3 Node versions
# - Runs tests
# - Reports status
```

---

### **2. On pull requests:**

```bash
# Developer creates PR
gh pr create

# ✅ Travis CI automatically:
# - Tests PR code
# - Reports status on GitHub
# - Blocks merge if tests fail
```

---

### **3. Integration with GitHub:**

**GitHub UI shows:**

```
✅ All checks passed
   - Travis CI (io.js): passed
   - Travis CI (Node 0.12): passed
   - Travis CI (Node 0.10): passed

or

❌ Some checks failed
   - Travis CI (io.js): passed
   - Travis CI (Node 0.12): passed
   - Travis CI (Node 0.10): failed ← Click for details
```

---

## 🚨 Issues with current config:

### **⚠️ Problem: Outdated Node versions**

```yaml
node_js:
  - "iojs" # ❌ Deprecated (2015)
  - "0.12" # ❌ EOL (End of Life)
  - "0.10" # ❌ EOL (End of Life)
```

**These versions are from 2014-2015!**

---

## ✅ Updated configuration:

```yaml
sudo: false
language: node_js

# ✅ Use modern Node versions
node_js:
  - "18" # LTS (Long Term Support)
  - "16" # Previous LTS
  - "14" # Older LTS

# Cache dependencies for faster builds
cache:
  directories:
    - node_modules
    - bower_components

# Install dependencies
before_script:
  - "npm install -g bower grunt-cli"
  - "bower install"

# Run tests
script:
  - "grunt test"

# Run build
after_success:
  - "grunt build"

# Notifications
notifications:
  email:
    recipients:
      - team@example.com
    on_success: change # Only notify when status changes
    on_failure: always # Always notify on failure
```

---

## 📊 Complete Travis CI configuration options:

### **Advanced example:**

```yaml
# Operating system
os: linux
dist: focal # Ubuntu 20.04

# Language
language: node_js

# Node versions to test
node_js:
  - "18"
  - "16"
  - "14"

# Cache for faster builds
cache:
  directories:
    - node_modules
    - bower_components
    - $HOME/.npm
    - $HOME/.cache/bower

# Environment variables
env:
  global:
    - NODE_ENV=test
    - CI=true
  matrix:
    - TEST_SUITE=unit
    - TEST_SUITE=integration

# Install dependencies
before_install:
  - npm install -g npm@latest

install:
  - npm ci # Clean install (faster than npm install)
  - npm install -g bower grunt-cli
  - bower install

# Before running tests
before_script:
  - grunt jshint
  - grunt jscs

# Run tests
script:
  - grunt test
  - npm run lint

# After successful tests
after_success:
  - grunt build
  - npm run coverage # Upload coverage to Codecov

# After tests fail
after_failure:
  - cat npm-debug.log

# Deploy (only on master branch)
deploy:
  provider: pages
  skip_cleanup: true
  github_token: $GITHUB_TOKEN
  local_dir: dist
  on:
    branch: master

# Notifications
notifications:
  email:
    on_success: change
    on_failure: always
  slack:
    rooms:
      - team-channel
    on_success: change
    on_failure: always
```

---

## 🔍 Check Travis CI status:

### **1. Travis CI Dashboard:**

```
Visit: https://travis-ci.org/your-username/your-repo

See:
- Build history
- Test results
- Build logs
- Coverage reports
```

---

### **2. GitHub integration:**

**Pull Request page:**

```
Checks:
✅ Travis CI — passed
   - Details: Build #123 passed in 2m 34s
   - Click for full logs
```

---

### **3. README badge:**

```markdown
# Your Project

[![Build Status](https://travis-ci.org/username/repo.svg?branch=master)](https://travis-ci.org/username/repo)

✅ Shows build status in README
```

---

## 🚨 Common issues:

### **Issue 1: Build times out**

```yaml
# Default timeout: 10 minutes
# If build takes longer, it fails

# Solution: Increase timeout
travis_wait 30 npm test # Wait up to 30 minutes
```

---

### **Issue 2: Dependencies fail to install**

```bash
# Error: bower ESUDO
# Bower needs --allow-root flag

# Solution:
before_script:
  - 'npm install -g bower grunt-cli'
  - 'bower install --allow-root'
```

---

### **Issue 3: Tests fail on specific Node version**

```yaml
# Allow some versions to fail
matrix:
  allow_failures:
    - node_js: "14" # Allow Node 14 to fail
  fast_finish: true # Don't wait for allowed failures
```

---

## 📊 Comparison with other CI services:

| Feature                | Travis CI   | GitHub Actions            | CircleCI               |
| ---------------------- | ----------- | ------------------------- | ---------------------- |
| **Config file**        | .travis.yml | `.github/workflows/*.yml` | `.circleci/config.yml` |
| **Free tier**          | Limited     | ✅ Good                   | Limited                |
| **Speed**              | Medium      | Fast                      | Fast                   |
| **Ease of use**        | Easy        | Very easy                 | Medium                 |
| **GitHub integration** | Good        | ✅ Native                 | Good                   |

---

## 🎯 Modern alternative: GitHub Actions

### **Since your project is on GitHub, consider GitHub Actions:**

```yaml
name: CI

on:
  push:
    branches: [master, develop]
  pull_request:
    branches: [master]

jobs:
  build:
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [14, 16, 18]

    steps:
      - uses: actions/checkout@v3

      - name: Use Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v3
        with:
          node-version: ${{ matrix.node-version }}

      - name: Cache dependencies
        uses: actions/cache@v3
        with:
          path: |
            node_modules
            bower_components
          key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}

      - name: Install dependencies
        run: |
          npm ci
          npm install -g bower grunt-cli
          bower install

      - name: Run linter
        run: npm run lint

      - name: Run tests
        run: grunt test

      - name: Build
        run: grunt build
```

---

## 📊 Summary:

| Question               | Answer                                                 |
| ---------------------- | ------------------------------------------------------ |
| **.travis.yml là gì?** | Travis CI configuration for automated testing          |
| **Dùng để làm gì?**    | Auto-run tests on push/PR, test multiple Node versions |
| **Khi nào dùng?**      | Automatically on git push to GitHub                    |
| **Có cần thiết?**      | ⚠️ Optional - Only if using Travis CI                  |
| **Có commit lên Git?** | ✅ YES - CI config should be tracked                   |
| **Status**             | ⚠️ Outdated (Node 0.10-0.12 are EOL)                   |

---

## ✅ Recommendations:

### **Option 1: Update Node versions**

```yaml
node_js:
  - "18" # Modern LTS
  - "16"
```

### **Option 2: Disable Travis CI**

```bash
# If not using Travis CI, delete the file
rm .travis.yml
```

### **Option 3: Migrate to GitHub Actions**

```bash
# Modern, better GitHub integration
# Create .github/workflows/ci.yml instead
```

---

**.travis.yml configures Travis CI to automatically test your code on every push, ensuring code quality before merge!**
