# How to setup file .prettierrc.json. t muốn config prettier để auto format code after save thì cài file .prettierrc.json hay file nào?

**Hướng dẫn cài đặt Prettier để auto format on save:**

---

## **Bước 1: Cài đặt Prettier**

```bash
npm install --save-dev prettier
```

---

## **Bước 2: Tạo file `.prettierrc.json`**

Tạo file ở **thư mục gốc** dự án (cùng cấp với package.json):

````json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 80,
  "bracketSpacing": true,
  "arrowParens": "avoid",
  "endOfLine": "lf"
}
````

---

## **Bước 3: Tạo file `.prettierignore` (optional)**

Để bỏ qua các file không cần format:

```
# Dependencies
node_modules/
dist/
build/

# Config files
package-lock.json
yarn.lock
```

---

## **Bước 4: Cài Prettier extension trong VS Code**

1. Mở VS Code
2. Vào Extensions (Ctrl+Shift+X)
3. Tìm "Prettier - Code formatter"
4. Click **Install**

---

## **Bước 5: Config VS Code settings**

Mở **Settings** (Ctrl+,) hoặc tạo file `.vscode/settings.json`:

````json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
````

---

## **Bước 6: Thêm scripts vào package.json (optional)**

````json
// filepath: package.json
// ...existing code...
"scripts": {
  "format": "prettier --write \"src/**/*.{ts,tsx,js,jsx,json,css,md}\"",
  "format:check": "prettier --check \"src/**/*.{ts,tsx,js,jsx,json,css,md}\""
  // ...existing code...
}
// ...existing code...
````

---

## **Test Prettier:**

1. Mở file dashboard-routes.tsx
2. Viết code không đúng format:
   ```tsx
   export const dashboardRoutes:RouteObject[]=[{path:'/dashboard',element:(<MainLayout><DashboardPage/></MainLayout>)}];
   ```
3. Save file (Ctrl+S)
4. Prettier tự động format thành:
   ```tsx
   export const dashboardRoutes: RouteObject[] = [
     {
       path: '/dashboard',
       element: (
         <MainLayout>
           <DashboardPage />
         </MainLayout>
       ),
     },
   ];
   ```

---

## **Kết luận:**

✅ **File cần tạo**: `.prettierrc.json` (ở thư mục gốc)  
✅ **Extension**: Prettier - Code formatter  
✅ **VS Code setting**: `"editor.formatOnSave": true`  
✅ **Test**: Save file → code tự động format

Similar code found with 2 license types