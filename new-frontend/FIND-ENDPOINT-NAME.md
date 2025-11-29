# Find Your Exact Endpoint Name

## 🔍 The Problem

404 error means the endpoint `/api/blog-posts` doesn't exist. We need to find the correct name.

---

## 🎯 Step-by-Step: Find the Correct Endpoint

### **Method 1: Check Content-Type Builder (BEST METHOD)**

1. **Open:** `http://localhost:1337/admin`
2. **Go to:** Content-Type Builder (left sidebar)
3. **Look at:** Collection Types section
4. **What do you see?** 
   - List ALL collection types
   - Note the EXACT names

**Screenshot or tell me:**
- What collection types are listed?
- What are their exact names?

---

### **Method 2: Check Content Manager**

1. **Open:** `http://localhost:1337/admin`
2. **Go to:** Content Manager (left sidebar)
3. **What collection types are listed?**
   - These are your content types
   - Click on one - what's the name in the URL?

---

### **Method 3: Check API Structure**

**In Strapi Admin, try this:**

1. **Go to:** Settings → API Tokens
2. **Or check:** The API structure

**Or test these in browser (one by one):**

```
http://localhost:1337/api/blog-posts
http://localhost:1337/api/posts
http://localhost:1337/api/articles
http://localhost:1337/api/blogs
http://localhost:1337/api/blog-post
http://localhost:1337/api/content
http://localhost:1337/api/entries
http://localhost:1337/api/blogposts
http://localhost:1337/api/blog_posts
```

**After setting permissions, which one shows your 3 blog posts?**

---

### **Method 4: Check Strapi Files (If You Have Access)**

If you can access the Strapi backend files:

1. **Go to:** `gigilwebsite/backend/strapi/src/api/`
2. **Look at:** Folder names
3. **These are your content types!**

---

## ⚠️ IMPORTANT: Set Permissions First!

**Before testing, make sure permissions are set:**

1. **Go to:** Settings → Users & Permissions Plugin → Roles → Public
2. **Enable:** `find` and `findOne` for ALL your collection types
3. **Save**

**Without permissions, you'll get 403 or 404 even if the endpoint exists!**

---

## 🚀 What to Tell Me

**Tell me ONE of these:**

1. **What collection type names you see in Content-Type Builder?**
   - Example: "Blog Post", "Post", "Article", etc.

2. **Which API URL works?**
   - After setting permissions, test the URLs above
   - Which one shows your 3 blog posts?

3. **What you named it when creating?**
   - Remember what you called it when you created the content type?

---

## 🔧 Once You Tell Me

I'll update the code in `src/lib/api/blog-api.ts`:

**Current code:**
```typescript
`/blog-posts?${queryParams.toString()}`
```

**I'll change it to:**
```typescript
`/YOUR-CORRECT-ENDPOINT?${queryParams.toString()}`
```

**And also update:**
- Line with `/blog-posts/${id}`
- Line with `/blog-posts?filters[slug]`

---

## 📋 Quick Action Items

1. ✅ **Set permissions** (Settings → Roles → Public → Enable find & findOne)
2. ✅ **Check Content-Type Builder** - What names do you see?
3. ✅ **Test API URLs** - Which one works?
4. ✅ **Tell me the name** - I'll update the code
5. ✅ **Restart frontend** - Test connection

---

**Do this now:**
1. Open Strapi Admin
2. Go to Content-Type Builder
3. Tell me what collection type names you see

**Or:**
1. Set permissions first
2. Test the API URLs above
3. Tell me which one shows your blog posts

**Then I'll fix the code immediately! 🚀**





