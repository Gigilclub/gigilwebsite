# How to Start Your Servers

## 🚀 Quick Start Guide

### **Current Status:**
- ❌ Frontend (port 3000): NOT RUNNING
- ❌ Strapi (port 1337): NOT RUNNING

---

## 📋 Step-by-Step: Start Both Servers

### **Step 1: Start Strapi Backend**

1. Open a **new terminal/command prompt**
2. Navigate to your Strapi folder:
   ```bash
   cd C:\Users\ADMIN\Desktop\gigilwebsite\backend\strapi
   ```
   *(Adjust path if your gigilwebsite folder is in a different location)*

3. Start Strapi:
   ```bash
   npm run develop
   ```
   Or:
   ```bash
   npm start
   ```

4. Wait until you see:
   ```
   Server started on http://localhost:1337
   ```

5. **Keep this terminal open** - Strapi needs to keep running!

---

### **Step 2: Start Frontend**

1. Open a **new terminal/command prompt** (keep Strapi terminal running!)
2. Navigate to your frontend folder:
   ```bash
   cd C:\Users\ADMIN\Desktop\Gigil Frontend
   ```

3. Start the frontend:
   ```bash
   npm run dev
   ```

4. Wait until you see:
   ```
   Ready on http://localhost:3000
   ```

5. **Keep this terminal open** too!

---

## ✅ Verify Everything is Running

### **Check Strapi:**
1. Open browser: `http://localhost:1337/admin`
2. You should see Strapi admin login page

### **Check Strapi API:**
1. Open browser: `http://localhost:1337/api/blog-posts`
2. You should see JSON data with your blog posts

### **Check Frontend:**
1. Open browser: `http://localhost:3000`
2. You should see your website with blog posts!

---

## 🎯 Quick Commands

### **Terminal 1 (Strapi):**
```bash
cd C:\Users\ADMIN\Desktop\gigilwebsite\backend\strapi
npm run develop
```

### **Terminal 2 (Frontend):**
```bash
cd C:\Users\ADMIN\Desktop\Gigil Frontend
npm run dev
```

---

## ⚠️ Important Notes

1. **Two Terminals Needed:** You need to run both servers in separate terminals
2. **Keep Both Running:** Don't close the terminals while working
3. **Order Doesn't Matter:** You can start Strapi or Frontend first
4. **Port Conflicts:** If ports are already in use, you'll see an error

---

## 🐛 Troubleshooting

### **"Port already in use" Error:**
- Another process is using the port
- Close other applications using port 3000 or 1337
- Or kill the process using the port

### **"Cannot find module" Error:**
- Run `npm install` in that folder first
- Make sure you're in the correct directory

### **Strapi won't start:**
- Check if you're in the correct Strapi folder
- Make sure dependencies are installed: `npm install`
- Check for errors in the terminal

### **Frontend won't start:**
- Check if you're in the correct frontend folder
- Make sure `.env.local` file exists
- Run `npm install` if needed

---

## 📝 Checklist

- [ ] Opened Terminal 1 for Strapi
- [ ] Navigated to Strapi folder
- [ ] Started Strapi (`npm run develop`)
- [ ] Strapi is running on port 1337
- [ ] Opened Terminal 2 for Frontend
- [ ] Navigated to Frontend folder
- [ ] Started Frontend (`npm run dev`)
- [ ] Frontend is running on port 3000
- [ ] Tested Strapi API: `http://localhost:1337/api/blog-posts`
- [ ] Tested Frontend: `http://localhost:3000`
- [ ] Blog posts appear on website!

---

**Start both servers and let me know when they're running! 🚀**

