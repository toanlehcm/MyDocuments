# File .bowerrc - Bower Configuration

## 📘 .bowerrc là gì?

**.bowerrc** là file **configuration** (cấu hình) cho **Bower** - package manager cho frontend dependencies.

---

## 🎯 Dùng để làm gì?

### **1. Configure Bower behavior:**

```json
{
  "directory": "bower_components", // ✅ Where to install packages
  "registry": "https://registry.bower.io", // ✅ Where to download from
  "strict-ssl": false // ✅ SSL certificate validation
}
```

---

## 📊 Giải thích từng option:

### **1. `"directory": "bower_components"`**

**Purpose:** Định nghĩa folder để lưu packages

```
Project/
├── bower_components/    ✅ Packages installed here
│   ├── angular/
│   ├── bootstrap/
│   └── jquery/
├── app/
└── .bowerrc
```

**If not set:** Default is `bower_components/`

---

### **2. `"registry": "https://registry.bower.io"`**

**Purpose:** Bower repository URL (nơi download packages)

```bash
# When you run:
bower install angular

# Bower downloads from:
https://registry.bower.io/packages/angular
```

**If not set:** Uses default `https://bower.herokuapp.com`

---

### **3. `"strict-ssl": false` ⚠️**

**Purpose:** Tắt SSL certificate validation

```
✅ "strict-ssl": true   → Verify SSL certificates (secure)
❌ "strict-ssl": false  → Skip SSL verification (not secure)
```

**Why set to `false`?**

- **Corporate proxy/firewall** blocks SSL
- **Self-signed certificates** in company network
- **Old SSL certificates** on Bower registry

**⚠️ Security warning:**

```
Setting "strict-ssl": false is NOT RECOMMENDED
because it makes you vulnerable to man-in-the-middle attacks.

Only use in trusted networks (e.g., company intranet).
```

---

## 🔄 Workflow:

### **When you run `bower install`:**

```bash
bower install
```

**Process:**

```
1. Read .bowerrc configuration
   ↓
2. Check "registry" setting
   registry: https://registry.bower.io
   ↓
3. Check "strict-ssl" setting
   strict-ssl: false (skip SSL verification)
   ↓
4. Download packages from registry
   ↓
5. Install to "directory"
   bower_components/
```

---

## 🎯 Khi nào dùng?

### **1. First time setup:**

```bash
# Clone project
git clone project-url

# Install dependencies
cd Client
bower install
# ✅ Uses .bowerrc settings to install packages
```

---

### **2. Behind corporate proxy:**

```json
{
  "directory": "bower_components",
  "registry": "https://registry.bower.io",
  "strict-ssl": false, // ✅ Skip SSL for proxy
  "proxy": "http://proxy.company.com:8080",
  "https-proxy": "http://proxy.company.com:8080"
}
```

---

### **3. Custom registry (private company packages):**

```json
{
  "directory": "bower_components",
  "registry": "https://bower.company.com", // ✅ Private registry
  "strict-ssl": true
}
```

---

## 🔍 Other common .bowerrc options:

### **Full example:**

```json
{
  // Installation directory
  "directory": "bower_components",

  // Package registry
  "registry": "https://registry.bower.io",

  // SSL settings
  "strict-ssl": false,

  // Proxy settings (for corporate networks)
  "proxy": "http://proxy.company.com:8080",
  "https-proxy": "http://proxy.company.com:8080",

  // Timeouts (milliseconds)
  "timeout": 120000,

  // Interactive prompts
  "interactive": true,

  // Analytics (send usage data to Bower)
  "analytics": false,

  // Storage settings
  "storage": {
    "packages": "~/.bower/packages",
    "registry": "~/.bower/registry",
    "links": "~/.bower/links"
  },

  // Script hooks
  "scripts": {
    "preinstall": "echo 'Installing...'",
    "postinstall": "echo 'Done!'"
  }
}
```

---

## 🚨 Security Recommendation:

### **Your current setting:**

```json
{
  "strict-ssl": false // ❌ NOT SECURE
}
```

### **Recommended fix:**

```json
{
  "directory": "bower_components",
  "registry": "https://registry.bower.io",
  "strict-ssl": true // ✅ SECURE (verify SSL certificates)
}
```

**Test if it works:**

```bash
# Try with strict-ssl enabled
bower install

# If it fails with SSL error:
Error: self signed certificate in certificate chain

# Then you need to:
# 1. Update Node.js certificates
# 2. Configure company proxy properly
# 3. Or keep strict-ssl: false (if in trusted network)
```

---

## 📊 Comparison with npm config:

| Bower          | npm           | Purpose            |
| -------------- | ------------- | ------------------ |
| .bowerrc       | `.npmrc`      | Configuration file |
| `"directory"`  | Not needed    | Install location   |
| `"registry"`   | `registry=`   | Package source     |
| `"strict-ssl"` | `strict-ssl=` | SSL validation     |

**npm equivalent:**

```ini
# .npmrc
registry=https://registry.npmjs.org/
strict-ssl=false
proxy=http://proxy.company.com:8080
https-proxy=http://proxy.company.com:8080
```

---

## 🎯 Troubleshooting:

### **Problem 1: SSL certificate errors**

```bash
Error: self signed certificate in certificate chain
```

**Solution:**

```json
{
  "strict-ssl": false // Temporary workaround
}
```

**Better solution:**

```bash
# Update Node.js CA certificates
npm config set cafile /path/to/company-ca.crt
```

---

### **Problem 2: Proxy errors**

```bash
Error: connect ETIMEDOUT
```

**Solution:**

```json
{
  "proxy": "http://proxy.company.com:8080",
  "https-proxy": "http://proxy.company.com:8080",
  "strict-ssl": false
}
```

---

### **Problem 3: Registry not responding**

```bash
Error: Registry timeout
```

**Solution:**

```json
{
  "registry": "https://registry.bower.io",
  "timeout": 300000 // Increase timeout to 5 minutes
}
```

---

## ⚠️ Bower is Deprecated:

**Important note:**

```
Bower was deprecated in 2017.
Modern projects use npm/yarn for everything.

Your project still uses Bower because:
- It's an older AngularJS 1.x project (2015-2017 era)
- Migration to npm would require rewriting dependencies
- Bower still works, just not actively maintained
```

**For new projects:**

```bash
# ❌ Don't use
bower install angular

# ✅ Use npm instead
npm install angular
```

---

## 📊 Summary:

| Question                | Answer                                                 |
| ----------------------- | ------------------------------------------------------ |
| **.bowerrc là gì?**     | Bower configuration file                               |
| **Dùng để làm gì?**     | Configure where/how Bower installs packages            |
| **Khi nào dùng?**       | When running `bower install`                           |
| **`strict-ssl: false`** | Skip SSL verification (needed for corporate proxies)   |
| **Security**            | ⚠️ `false` is not secure, use only in trusted networks |
| **Can delete?**         | ❌ NO - needed for `bower install` to work             |
| **Committed to Git?**   | ✅ YES - team needs same config                        |

---

## 🚀 Quick Commands:

```bash
# Install all bower dependencies
bower install

# Check bower configuration
bower config

# Clear bower cache (if issues)
bower cache clean

# Update all packages
bower update
```

**.bowerrc is the configuration file that tells Bower where and how to install your frontend dependencies!**
