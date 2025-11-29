# Fix API Error - Step by Step

## 🔍 Problem Identified

**Error:** `Error fetching blog posts: {}`
**Cause:** 404 Not Found - The API endpoint `/api/blog-posts` doesn't exist

**This means:** The content type name in Strapi is different from what the code expects.

---

## 🎯 Solution: Find the Correct Content Type Name

### **Step 1: Check Strapi Content Type Name**

1. **Open Strapi Admin:** `http://localhost:1337/admin`
2. **Go to:** Content-Type Builder (left sidebar)
3. **Look for:** What you named your blog post content type
   - Did you name it `Blog Post`?
   - Or `Post`?
   - Or `Article`?
   - Or something else?

4. **Note the EXACT name** (case-sensitive!)

---

### **Step 2: Check Strapi API**

Try these URLs in your browser to find the correct endpoint:

1. `http://localhost:1337/api/blog-posts`
2. `http://localhost:1337/api/posts`
3. `http://localhost:1337/api/articles`
4. `http://localhost:1337/api/blogs`
5. `http://localhost:1337/api/blog-post` (singular)

**Which one shows your blog posts?** That's the correct endpoint name!

---

### **Step 3: Update the Code**

Once you know the correct name, I'll update the code for you.

**Tell me:** What content type name did you use in Strapi?

---

## 🔧 Quick Fix Options

### **Option A: If your content type is called "Post" (singular)**

The API endpoint would be `/api/posts` (plural)

I'll update the code to use `/posts` instead of `/blog-posts`

### **Option B: If your content type is called "Article"**

The API endpoint would be `/api/articles`

I'll update the code to use `/articles`

### **Option C: If your content type is called "Blog Post"**

Strapi should pluralize it to `/api/blog-posts`, but if it doesn't work, we might need to check:
- Is it published?
- Are permissions set?
- Is the API name different?

---

## 📋 What I Need From You

1. **What did you name your content type in Strapi?**
   - Go to Content-Type Builder
   - Look at the collection type name
   - Tell me the exact name

2. **Or test these URLs and tell me which one works:**
   - `http://localhost:1337/api/blog-posts`
   - `http://localhost:1337/api/posts`
   - `http://localhost:1337/api/articles`
   - `http://localhost:1337/api/blogs`

---

## 🚀 About Your Setup

**I understand your setup now:**
- **Monorepo (`gigilwebsite`):** Has its own frontend (port 3000) + backend
- **This project (`Gigil Frontend`):** Separate frontend (port 3002) connecting to the same backend

**This is correct!** You're building a separate frontend that connects to the Strapi backend from the monorepo.

---

## ✅ Next Steps

1. **Check Strapi Content-Type Builder** - What's the exact name?
2. **Test the API URLs** - Which one returns your blog posts?
3. **Tell me the correct name** - I'll update the code
4. **Restart frontend** - After I update the code

---

**Let me know what content type name you used, and I'll fix the code immediately! 🚀**





