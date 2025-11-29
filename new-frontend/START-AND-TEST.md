# 🚀 Start Servers & Test Connection

## Current Status:
- ⏳ Frontend: Starting (should be ready soon)
- ❌ Strapi: NOT RUNNING - You need to start it!

---

## 📋 Step-by-Step Instructions

### **STEP 1: Start Strapi (IMPORTANT!)**

**You need to do this manually:**

1. **Open a NEW terminal/command prompt** (keep it separate from frontend)

2. **Navigate to Strapi folder:**
   ```bash
   cd C:\Users\ADMIN\Desktop\gigilwebsite\backend\strapi
   ```
   *(Adjust path if your gigilwebsite folder is in a different location)*

3. **Start Strapi:**
   ```bash
   npm run develop
   ```

4. **Wait for this message:**
   ```
   Server started on http://localhost:1337
   ```

5. **Keep this terminal open!** Don't close it.

---

### **STEP 2: Verify Strapi is Running**

**Test in browser:**
1. Open: `http://localhost:1337/admin`
   - ✅ Should see Strapi admin login
   - ❌ If error, Strapi is not running

2. Open: `http://localhost:1337/api/blog-posts`
   - ✅ Should see JSON with your blog posts
   - ❌ If 404, check content type name
   - ❌ If 403, set permissions (Settings → Roles → Public)

---

### **STEP 3: Test Frontend**

**After Strapi is running:**

1. **Open browser:** `http://localhost:3000`

2. **What you should see:**
   - ✅ Website loads
   - ✅ Blog posts appear (your 3 demo posts)
   - ✅ No error messages

3. **If you see errors:**
   - Press **F12** to open DevTools
   - Check **Console** tab for errors
   - Check **Network** tab for API calls

---

### **STEP 4: Verify Connection**

**Open DevTools (F12) → Network Tab:**

1. **Refresh the page** (F5)

2. **Look for requests to:**
   - `http://localhost:1337/api/blog-posts`
   - Or similar Strapi endpoints

3. **Click on the request:**
   - **Status:** Should be **200 OK** ✅
   - **Response:** Should contain your blog posts data ✅

---

## ✅ Success Indicators

**Everything is working if:**
- ✅ Strapi admin accessible: `http://localhost:1337/admin`
- ✅ Strapi API returns data: `http://localhost:1337/api/blog-posts`
- ✅ Frontend loads: `http://localhost:3000`
- ✅ Blog posts appear on website
- ✅ Network tab shows successful API calls (200 OK)
- ✅ No errors in browser console

---

## 🐛 Common Issues & Fixes

### **Issue 1: Strapi won't start**
**Check:**
- Are you in the correct folder? (`gigilwebsite/backend/strapi`)
- Are dependencies installed? Run `npm install`
- Check terminal for error messages

### **Issue 2: Frontend shows "Failed to load blog posts"**
**Check:**
- Is Strapi running? Test: `http://localhost:1337/api/blog-posts`
- Are blog posts **published** in Strapi? (not just saved)
- Are permissions set? (Settings → Roles → Public → Enable find & findOne)

### **Issue 3: 404 Not Found**
**Check:**
- Content type name in Strapi
- Update code if name is different (not `blog-posts`)

### **Issue 4: 403 Forbidden**
**Fix:**
1. Strapi Admin → Settings → Users & Permissions Plugin → Roles → Public
2. Enable **find** and **findOne** for:
   - Blog Post
   - Category
   - Author
3. Save

---

## 🎯 Quick Checklist

- [ ] Started Strapi in separate terminal
- [ ] Strapi is running (can access `http://localhost:1337/admin`)
- [ ] Strapi API works (can see data at `http://localhost:1337/api/blog-posts`)
- [ ] Frontend is running (can access `http://localhost:3000`)
- [ ] Blog posts appear on website
- [ ] Network tab shows successful API calls
- [ ] No errors in browser console

---

## 📝 What to Do Right Now

1. **Open a new terminal**
2. **Start Strapi:**
   ```bash
   cd C:\Users\ADMIN\Desktop\gigilwebsite\backend\strapi
   npm run develop
   ```
3. **Wait for Strapi to start**
4. **Test:** Open `http://localhost:1337/api/blog-posts` in browser
5. **Test:** Open `http://localhost:3000` in browser
6. **Check:** Do blog posts appear?

---

**Start Strapi now and let me know what you see! 🚀**

