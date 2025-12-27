# Fix Redis Connection Error - ActionHero Server

## 🔍 Nguyên nhân:

**Redis server chưa được start**

```
Error: connect ECONNREFUSED 127.0.0.1:6379
```

ActionHero framework yêu cầu **Redis** để hoạt động (cache, sessions, background jobs).

---

## ✅ Solution:

### **Step 1: Install Redis (nếu chưa có)**

#### **Windows:**
```bash
# Download Redis for Windows
# https://github.com/microsoftarchive/redis/releases

# Or use Chocolatey
choco install redis-64

# Or use WSL2
wsl --install
sudo apt-get update
sudo apt-get install redis-server
```

#### **macOS:**
```bash
brew install redis
```

#### **Linux:**
```bash
sudo apt-get update
sudo apt-get install redis-server
```

---

### **Step 2: Start Redis Server**

#### **Windows (Native Redis):**
```bash
# Navigate to Redis installation folder
cd C:\Program Files\Redis

# Start Redis server
redis-server.exe

# Or as Windows Service
redis-server --service-start
```

#### **Windows (WSL2):**
```bash
# Start WSL
wsl

# Start Redis
sudo service redis-server start

# Or
redis-server --daemonize yes

# Check status
redis-cli ping
# Should return: PONG
```

#### **macOS/Linux:**
```bash
# Start Redis
redis-server

# Or as background service
brew services start redis  # macOS
sudo systemctl start redis # Linux

# Check status
redis-cli ping
# Should return: PONG
```

---

### **Step 3: Verify Redis Connection**

```bash
# Open Redis CLI
redis-cli

# Test connection
127.0.0.1:6379> ping
PONG

# Check server info
127.0.0.1:6379> info server

# Exit
127.0.0.1:6379> exit
```

---

### **Step 4: Start ActionHero Server**

```bash
# Navigate to Server directory
cd D:\SVN\Pte-7275\Server

# Start server
npm start

# Or with development mode
npm run dev
```

---

## 🎯 Alternative: Configure Redis Connection

Nếu Redis đang chạy ở port khác hoặc remote server, cập nhật config:

````javascript
exports['default'] = {
  redis: function(api) {
    return {
      enabled: true,
      
      '_toExpand': false,
      
      client: {
        host: '127.0.0.1',      // Redis host
        port: 6379,             // Redis port
        password: null,         // Redis password (if required)
        database: 0,            // Redis database number
        options: {
          // Connection options
        }
      },
      
      subscriber: {
        host: '127.0.0.1',
        port: 6379,
        password: null,
        database: 0
      },
      
      tasks: {
        host: '127.0.0.1',
        port: 6379,
        password: null,
        database: 0
      }
    };
  }
};

exports.test = {
  redis: function(api) {
    return {
      enabled: true,
      
      client: {
        host: '127.0.0.1',
        port: 6379,
        database: 2  // Use different database for test
      },
      
      subscriber: {
        host: '127.0.0.1',
        port: 6379,
        database: 2
      },
      
      tasks: {
        host: '127.0.0.1',
        port: 6379,
        database: 2
      }
    };
  }
};
````

---

## 🚨 Quick Fix - Disable Redis (NOT RECOMMENDED for production)

Nếu chỉ muốn test nhanh mà không cần Redis:

````javascript
exports['default'] = {
  redis: function(api) {
    return {
      enabled: false  // ✅ Disable Redis
    };
  }
};
````

**Warning:** Tắt Redis sẽ:
- ❌ Không có cache
- ❌ Không có background jobs
- ❌ Không có clustering support
- ❌ Không recommended cho production

---

## 🎯 Recommended Flow:

```bash
# 1. Check if Redis is installed
redis-cli --version

# 2. Start Redis server
redis-server
# Or (Windows Service)
redis-server --service-start

# 3. Verify Redis is running
redis-cli ping
# Expected: PONG

# 4. Start ActionHero server
cd D:\SVN\Pte-7275\Server
npm start

# Expected output:
# my_actionhero_project @ 2025-12-26 - info: redis connected (client)
# my_actionhero_project @ 2025-12-26 - info: redis connected (subscriber)
# my_actionhero_project @ 2025-12-26 - info: redis connected (tasks)
# my_actionhero_project @ 2025-12-26 - notice: server ID: xxx
# my_actionhero_project @ 2025-12-26 - notice: environment: development
# my_actionhero_project @ 2025-12-26 - notice: *** Server Started @ http://localhost:8080 ***
```

---

## 🎯 Summary:

| Issue | Cause | Fix |
|-------|-------|-----|
| **ECONNREFUSED 127.0.0.1:6379** | Redis not running | Start Redis server |
| **MaxRetriesPerRequestError** | Cannot connect to Redis | Verify Redis is accessible |
| **Server won't start** | Redis connection required | Start Redis before ActionHero |

**Steps:**
1. ✅ Install Redis
2. ✅ Start Redis server (`redis-server`)
3. ✅ Verify connection (`redis-cli ping`)
4. ✅ Start ActionHero server (`npm start`)

**Redis là dependency bắt buộc cho ActionHero framework!**