# Fix 404 Error - Complete Solution

## 🔍 Problem

**Error:** `{"data":null,"error":{"status":404,"name":"NotFoundError","message":"Not Found"}}`

**This means:** The endpoint `/api/blog-posts` doesn't exist in your Strapi.

---

## 🎯 Solution: Find the Correct Endpoint Name

### **Step 1: Check Content-Type Builder**

1. **Open Strapi Admin:** `http://localhost:1337/admin`
2. **Go to:** Content-Type Builder (left sidebar)
3. **Look at:** Collection Types section
4. **What collection types do you see?**
   - List ALL of them
   - Note the EXACT names (case-sensitive!)

**Common names:**
- Blog Post
- Post
- Article
- Blog
- Content
- Entry

---

### **Step 2: Check API Name**

In Strapi, collection types have an **API name** that might be different from the display name.

**To find the API name:**
1. In Content-Type Builder, click on your collection type
2. Look at the URL or the API ID
3. Or check the API name field

**Strapi pluralizes names:**
- "Blog Post" → API name might be `blog-post` → endpoint: `/api/blog-posts`
- "Post" → API name might be `post` → endpoint: `/api/posts`
- "Article" → API name might be `article` → endpoint: `/api/articles`

---

### **Step 3: Test Different Endpoints**

Try these URLs in your browser (after setting permissions):

1. `http://localhost:1337/api/blog-posts`
2. `http://localhost:1337/api/posts`
3. `http://localhost:1337/api/articles`
4. `http://localhost:1337/api/blogs`
5. `http://localhost:1337/api/blog-post` (singular)
6. `http://localhost:1337/api/content`
7. `http://localhost:1337/api/entries`

**Which one shows your blog posts?** That's the correct endpoint!

---

### **Step 4: Check Permissions (IMPORTANT!)**

Even if the endpoint exists, you need permissions:

1. **Go to:** Settings → Users & Permissions Plugin → Roles → Public
2. **Enable:**
   - ✅ `find` (to list all posts)
   - ✅ `findOne` (to get single post)
3. **Do this for:**
   - Your blog post content type
   - Category
   - Author
4. **Click Save**

---

## 🔧 What I Need From You

**Tell me ONE of these:**

1. **What collection type name you see in Content-Type Builder?**
   - Example: "Blog Post", "Post", "Article"

2. **What API name it shows?**
   - Check the API ID or name field

3. **Which endpoint URL works?**
   - Test the URLs above and tell me which one shows your posts

---

## 🚀 Once You Tell Me

I'll update the code in `src/lib/api/blog-api.ts` to use the correct endpoint name!

**I'll change:**
```typescript
`/blog-posts?${queryParams.toString()}`
```

**To:**
```typescript
`/YOUR-CORRECT-ENDPOINT?${queryParams.toString()}`
```

---

## 📋 Quick Checklist

- [ ] Opened Strapi Admin
- [ ] Checked Content-Type Builder
- [ ] Found collection type name
- [ ] Set permissions (Settings → Roles → Public)
- [ ] Tested API URLs in browser
- [ ] Found which endpoint works
- [ ] Told me the endpoint name
- [ ] I'll update the code
- [ ] Restart frontend
- [ ] Test connection

---

## 💡 Most Likely Scenarios

### **Scenario 1: Content Type is "Post"**
- Endpoint: `/api/posts`
- I'll update code to use `/posts`

### **Scenario 2: Content Type is "Article"**
- Endpoint: `/api/articles`
- I'll update code to use `/articles`

### **Scenario 3: Content Type is "Blog Post" but API name is different**
- Need to check the actual API name
- Update code accordingly

---

**Check Content-Type Builder now and tell me:**
1. What collection type name you see?
2. Or which API URL works?

**Then I'll fix it immediately! 🚀**





