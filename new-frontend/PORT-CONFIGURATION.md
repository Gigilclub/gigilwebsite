# Port Configuration Guide

## 🚪 Current Port Setup

### **Ports in Use:**
- Port 3000: Already in use
- Port 3001: Already in use (likely Express API)

### **New Frontend Port:**
- Port 3002: ✅ Available - Frontend will run here

---

## ✅ What I Changed

I've updated your `package.json` to run the frontend on **port 3002** instead of 3000.

**Updated commands:**
- `npm run dev` → Runs on port 3002
- `npm start` → Runs on port 3002

---

## 🚀 How to Use

### **Start Frontend on Port 3002:**

```bash
npm run dev
```

**Frontend will be available at:**
```
http://localhost:3002
```

---

## 🔧 Alternative: Run on Any Port

If you want to use a different port temporarily, you can run:

```bash
npx next dev -p 3003
```

Or any port you want:
```bash
npx next dev -p 4000
npx next dev -p 5000
```

---

## 📝 Port Summary

| Service | Port | URL |
|---------|------|-----|
| Frontend | 3002 | http://localhost:3002 |
| Strapi | 1337 | http://localhost:1337 |
| Express API | 3001 | http://localhost:3001 |

---

## ✅ Next Steps

1. **Stop current frontend** (if running): Press Ctrl+C
2. **Start on new port:**
   ```bash
   npm run dev
   ```
3. **Access frontend:**
   ```
   http://localhost:3002
   ```

---

## 🎯 Testing

After starting, test:
- Frontend: `http://localhost:3002`
- Strapi API: `http://localhost:1337/api/blog-posts`
- Check if blog posts load on the website

---

**Your frontend will now run on port 3002! 🚀**





