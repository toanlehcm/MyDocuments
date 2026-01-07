## Hướng dẫn Pull code mới từ Remote về Local bằng TortoiseSVN

### **Method 1: SVN Update (Khuyên dùng - Đơn giản nhất)**

#### **Bước 1: Mở folder chứa code**
1. Mở Windows Explorer
2. Navigate đến thư mục project: PTE-9300

#### **Bước 2: SVN Update**
1. **Right-click** vào thư mục project
2. Chọn **"SVN Update"**

```
Right-click folder → SVN Update
```

#### **Bước 3: Xem kết quả**
- TortoiseSVN sẽ hiển thị dialog với danh sách files được update
- Kiểm tra log để xem những thay đổi gì

**Shortcut:** `Ctrl + Shift + Right-click` → SVN Update

---

### **Method 2: Update to Revision (Nếu muốn pull code từ revision cụ thể)**

#### **Bước 1: Right-click folder**
```
Right-click folder → TortoiseSVN → Update to revision...
```

#### **Bước 2: Chọn revision**
- **HEAD revision** - Latest code (mặc định)
- **Specific revision** - Nhập số revision cụ thể
- **Working copy** - Giữ nguyên

#### **Bước 3: Click OK**

---

### **Method 3: Check for Modifications (Xem trước khi pull)**

#### **Bước 1: Kiểm tra changes**
```
Right-click folder → TortoiseSVN → Check for modifications
```

#### **Bước 2: Click "Check repository"**
- Hiển thị files có changes trên server
- So sánh với local

#### **Bước 3: Click "Update" để pull code**

---

### **Method 4: Show Log và Update**

#### **Bước 1: Xem history**
```
Right-click folder → TortoiseSVN → Show log
```

#### **Bước 2: Xem commits mới**
- Màu **đen** - Commits chưa pull
- Màu **xám** - Commits đã có local

#### **Bước 3: Update**
- Right-click vào commit muốn pull
- Chọn **"Update item to revision"**

---

## **Command Line (nếu prefer dùng command)**

### **SVN Update command:**

```bash
# Navigate to project folder
cd d:\SVN\PTE-9300

# Update to latest
svn update

# Update specific folder
svn update Client\app\scripts\controllers

# Update to specific revision
svn update -r 12345

# Update with detailed output
svn update --verbose
```

---

## **Giải quyết Conflicts khi Pull**

### **Khi có conflict, TortoiseSVN hiện options:**

```
(p) Postpone   - Giữ lại conflict, giải quyết sau
(df) Diff      - Xem differences
(e) Edit       - Edit file để resolve
(mc) Mine      - Giữ code local
(tc) Theirs    - Lấy code remote
(m) Merge      - Merge cả 2
```

### **Cách resolve conflict:**

#### **Option 1: Dùng TortoiseMerge**
```
Right-click conflicted file → TortoiseSVN → Edit conflicts
```
- Màn hình 3 cột:
  - **Theirs** (Remote) - Bên trái
  - **Mine** (Local) - Bên phải  
  - **Merged** (Result) - Ở giữa

#### **Option 2: Chọn một bên**
```
Right-click file → TortoiseSVN → Resolve...
→ Select: "Resolve using local/theirs"
```

#### **Option 3: Manual edit**
```
1. Open file trong VS Code
2. Tìm conflict markers:
   <<<<<<< .mine
   Your changes
   =======
   Remote changes
   >>>>>>> .r12345
3. Edit manually
4. Right-click → TortoiseSVN → Resolved
```

---

## **Best Practices:**

### ✅ **Trước khi Pull:**

```bash
1. Commit hoặc Stash local changes
2. Check for modifications
3. Backup nếu cần thiết
```

### ✅ **Khi Pull:**

```bash
1. Pull thường xuyên (hàng ngày)
2. Pull trước khi bắt đầu code
3. Pull trước khi commit
```

### ✅ **Sau khi Pull:**

```bash
1. Build project (npm install, grunt build)
2. Test features đã thay đổi
3. Resolve conflicts nếu có
```

---

## **Keyboard Shortcuts trong TortoiseSVN:**

| Action | Shortcut |
|--------|----------|
| SVN Update | `Ctrl + Shift + Right-click` → Update |
| SVN Commit | `Ctrl + Shift + Right-click` → Commit |
| Show Log | `Ctrl + Shift + Right-click` → Show log |
| Diff | `Ctrl + Shift + Right-click` → Diff |

---

## **Troubleshooting:**

### **Problem 1: "Working copy locked"**
```
Right-click folder → TortoiseSVN → Clean up
```

### **Problem 2: "Out of date"**
```
svn update
# Then try commit again
```

### **Problem 3: "Tree conflict"**
```
Right-click → TortoiseSVN → Resolve...
→ Select appropriate resolution
```

### **Problem 4: Update fails**
```bash
# Revert all changes
Right-click → TortoiseSVN → Revert...
→ Select all files → OK

# Then update again
SVN Update
```

---

## **Quick Reference - Common Workflows:**

### **Daily workflow:**
```
1. Morning: SVN Update
2. Code your changes
3. Before lunch: SVN Update
4. After lunch: SVN Update
5. Before commit: SVN Update → Commit
6. End of day: SVN Update → Commit
```

### **Before deploy:**
```
1. SVN Update
2. npm install (nếu có thay đổi package.json)
3. grunt build
4. Test
5. Deploy
```

---

**TL;DR:** Right-click folder → **SVN Update** là cách đơn giản nhất để pull code mới từ remote về local!