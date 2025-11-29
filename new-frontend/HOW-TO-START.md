# 🚀 How to Start Your Next.js Server

## ✅ Quick Start (Recommended)

### **Option 1: From the `new-frontend` directory (Recommended)**

1. **Open PowerShell/Terminal**
2. **Navigate to the new-frontend folder:**
   ```powershell
   cd C:\Users\ADMIN\Desktop\gigilwebsite-clean\new-frontend
   ```

3. **Start the development server:**
   ```powershell
   npm run dev
   ```

4. **Wait for the server to start** - You should see:
   ```
   ▲ Next.js 15.5.6
   - Local:        http://localhost:3002
   - Ready in X seconds
   ```

5. **Open your browser** and go to: `http://localhost:3002`

---

### **Option 2: From the root directory (Using workspace)**

1. **Open PowerShell/Terminal**
2. **Navigate to the root folder:**
   ```powershell
   cd C:\Users\ADMIN\Desktop\gigilwebsite-clean
   ```

3. **Start the new-frontend server:**
   ```powershell
   npm run new-frontend:dev
   ```

4. **Wait for the server to start** - You should see:
   ```
   ▲ Next.js 15.5.6
   - Local:        http://localhost:3002
   - Ready in X seconds
   ```

5. **Open your browser** and go to: `http://localhost:3002`

---

## ⚠️ Troubleshooting

### **"Port 3002 already in use" Error**

If you see this error, it means another process is using port 3002. Here's how to fix it:

1. **Find what's using the port:**
   ```powershell
   netstat -ano | findstr :3002
   ```

2. **Kill the process** (replace `PID` with the number from step 1):
   ```powershell
   taskkill /PID <PID> /F
   ```

3. **Or use a different port** - Edit `new-frontend/package.json`:
   ```json
   "dev": "next dev -p 3003"
   ```

---

## 📋 What Was Fixed

1. ✅ **Lockfile Warning Fixed**: Added `outputFileTracingRoot` to `next.config.ts` to tell Next.js where the project root is
2. ✅ **Port Conflict Resolved**: The previous process on port 3002 has been terminated

---

## 🎯 Important Notes

- **Server runs on port 3002** (not 3000)
- **Keep the terminal open** while the server is running
- **Press `Ctrl+C`** in the terminal to stop the server
- The warning about multiple lockfiles should now be gone

---

## ✅ Verification

After starting, you should see:
- ✅ No lockfile warnings
- ✅ Server running on `http://localhost:3002`
- ✅ Your website loads in the browser

---

**Ready to start? Use Option 1 (recommended) from above! 🚀**

