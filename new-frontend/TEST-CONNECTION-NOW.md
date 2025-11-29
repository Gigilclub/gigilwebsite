# Testing Connection - Step by Step

## 🔍 Current Status

### **Environment Variables:**
✅ `.env.local` file exists and is configured correctly:
- Strapi URL: `http://localhost:1337/api`
- Frontend should connect to this URL

### **Frontend Server:**
⏳ Starting... (running in background)

---

## 🧪 Testing Steps

### **Step 1: Check if Strapi is Running**

Open your browser and go to:
```
http://localhost:1337/admin
```

**Expected:** You should see Strapi admin login page

**If not working:** Start Strapi in a terminal:
```bash
cd C:\Users\ADMIN\Desktop\gigilwebsite\backend\strapi
npm run develop
```

---

### **Step 2: Test Strapi API**

Open your browser and go to:
```
http://localhost:1337/api/blog-posts
```

**Expected:** You should see JSON data like:
```json
{
  "data": [
    {
      "id": 1,
      "attributes": {
        "title": "When Chocolate was Medicine...",
        ...
      }
    }
  ]
}
```

**If you see data:** ✅ Strapi API is working!

**If you see 404:** Content type name might be different

**If you see 403:** Permissions not set (go to Settings → Roles → Public)

---

### **Step 3: Test Frontend**

Open your browser and go to:
```
http://localhost:3000
```

**Expected:** 
- Website loads
- Blog posts appear
- No errors in console

**Check Browser Console (F12):**
- Look for any errors
- Check Network tab for API calls to `localhost:1337`

---

### **Step 4: Verify API Connection**

1. Open `http://localhost:3000` in browser
2. Press **F12** to open DevTools
3. Click **Network** tab
4. Refresh the page (F5)
5. Look for requests to:
   - `http://localhost:1337/api/blog-posts`
   - Or similar Strapi endpoints

**Expected:**
- ✅ Request shows **200 OK** status
- ✅ Response contains your blog posts data
- ✅ Blog posts appear on the page

---

## 🐛 Troubleshooting

### **Issue: Frontend shows "Failed to load blog posts"**

**Check:**
1. Is Strapi running? Test: `http://localhost:1337/api/blog-posts`
2. Are blog posts published in Strapi? (not just saved)
3. Are permissions set? (Settings → Roles → Public → Enable find & findOne)
4. Check browser console for errors (F12)

### **Issue: 404 Not Found**

**Possible causes:**
- Content type name is different
- Check what content type you created in Strapi
- Update `src/lib/api/blog-api.ts` if needed

### **Issue: 403 Forbidden**

**Solution:**
1. Go to Strapi Admin
2. Settings → Users & Permissions Plugin → Roles → Public
3. Enable **find** and **findOne** for Blog Post, Category, and Author
4. Save

### **Issue: Empty array / No posts showing**

**Check:**
1. Are blog posts **published** in Strapi? (not just saved)
2. Check API directly: `http://localhost:1337/api/blog-posts`
3. Verify data structure matches what frontend expects

---

## ✅ Success Checklist

- [ ] Strapi is running on port 1337
- [ ] Can access Strapi admin: `http://localhost:1337/admin`
- [ ] Can access Strapi API: `http://localhost:1337/api/blog-posts` (shows data)
- [ ] Frontend is running on port 3000
- [ ] Can access frontend: `http://localhost:3000`
- [ ] Browser Network tab shows API calls to Strapi
- [ ] API calls return 200 OK status
- [ ] Blog posts appear on the website
- [ ] No errors in browser console

---

## 🎯 Quick Test Commands

### **Test Strapi API:**
```powershell
Invoke-WebRequest -Uri "http://localhost:1337/api/blog-posts" -UseBasicParsing
```

### **Test Frontend:**
```powershell
Invoke-WebRequest -Uri "http://localhost:3000" -UseBasicParsing
```

---

## 📝 What to Tell Me

After testing, let me know:
1. ✅ Is Strapi running? (Can you access `http://localhost:1337/admin`?)
2. ✅ Does Strapi API work? (Can you see data at `http://localhost:1337/api/blog-posts`?)
3. ✅ Is Frontend running? (Can you access `http://localhost:3000`?)
4. ✅ Do blog posts appear on the website?
5. ❌ Any errors you see? (Check browser console F12)

---

**Let's test everything step by step! 🚀**

