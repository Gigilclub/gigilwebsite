# Complete Strapi Setup Guide - Copy & Paste

## 📋 Step-by-Step Instructions

### **Step 1: Open Strapi Admin**
1. Open browser: `http://localhost:1337/admin`
2. Login if needed

---

### **Step 2: Create Blog Post Collection Type**

1. Click **"Content-Type Builder"** (left sidebar)
2. Click **"Create new collection type"** button (top right)
3. **Display name:** Type `Blog Post`
4. Click **"Continue"**
5. Click **"Finish"**

---

### **Step 3: Add Fields to Blog Post**

Add these fields one by one:

#### **Field 1: Title**
- Click **"Add another field"**
- Select **"Text"**
- Name: `title`
- Type: **Short text**
- Required: **ON** (toggle switch)
- Click **"Finish"**

#### **Field 2: Slug**
- Click **"Add another field"**
- Select **"UID"**
- Name: `slug`
- Attached field: Select `title` (auto-generates from title)
- Required: **ON**
- Click **"Finish"**

#### **Field 3: Excerpt**
- Click **"Add another field"**
- Select **"Text"**
- Name: `excerpt`
- Type: **Long text**
- Required: **ON**
- Click **"Finish"**

#### **Field 4: Content (Optional)**
- Click **"Add another field"**
- Select **"Rich text"**
- Name: `content`
- Required: **OFF**
- Click **"Finish"**

#### **Field 5: Image**
- Click **"Add another field"**
- Select **"Media"**
- Name: `image`
- Type: **Single media**
- Required: **OFF**
- Click **"Finish"**

---

### **Step 4: Create Category Collection Type**

1. In **Content-Type Builder**, click **"Create new collection type"**
2. **Display name:** Type `Category`
3. Click **"Continue"**
4. Click **"Finish"**

**Add Fields to Category:**

#### **Field 1: Name**
- Click **"Add another field"**
- Select **"Text"**
- Name: `name`
- Type: **Short text**
- Required: **ON**
- Click **"Finish"**

#### **Field 2: Slug**
- Click **"Add another field"**
- Select **"UID"**
- Name: `slug`
- Attached field: Select `name`
- Required: **ON**
- Click **"Finish"**

5. Click **"Save"** (top right)

---

### **Step 5: Create Author Collection Type**

1. In **Content-Type Builder**, click **"Create new collection type"**
2. **Display name:** Type `Author`
3. Click **"Continue"**
4. Click **"Finish"**

**Add Fields to Author:**

#### **Field 1: Name**
- Click **"Add another field"**
- Select **"Text"**
- Name: `name`
- Type: **Short text**
- Required: **ON**
- Click **"Finish"**

#### **Field 2: Email (Optional)**
- Click **"Add another field"**
- Select **"Email"**
- Name: `email`
- Required: **OFF**
- Click **"Finish"**

#### **Field 3: Avatar (Optional)**
- Click **"Add another field"**
- Select **"Media"**
- Name: `avatar`
- Type: **Single media**
- Required: **OFF**
- Click **"Finish"**

5. Click **"Save"** (top right)

---

### **Step 6: Add Relations to Blog Post**

1. Go back to **"Blog Post"** in Content-Type Builder
2. Click **"Add another field"**
3. Select **"Relation"**

**Add Category Relation:**
- On the left side, select **"Blog Post"**
- In the middle, select **"has one"** (dropdown)
- On the right side, select **"Category"**
- Click the arrow pointing **→** (from Blog Post to Category)
- Click **"Finish"**

**Add Author Relation:**
- Click **"Add another field"**
- Select **"Relation"**
- On the left: **"Blog Post"**
- Middle: **"has one"**
- Right: **"Author"**
- Click arrow **→** (from Blog Post to Author)
- Click **"Finish"**

4. Click **"Save"** (top right)
5. Click **"Restart Strapi"** when prompted
6. Wait for Strapi to restart (may take 30 seconds)

---

### **Step 7: Set API Permissions**

1. Click **"Settings"** (bottom left sidebar)
2. Click **"Users & Permissions Plugin"**
3. Click **"Roles"**
4. Click **"Public"** role

**Enable Permissions:**

**For Blog Post:**
- Scroll to find **"Blog Post"**
- Check ✅ **"find"**
- Check ✅ **"findOne"**

**For Category:**
- Scroll to find **"Category"**
- Check ✅ **"find"**
- Check ✅ **"findOne"**

**For Author:**
- Scroll to find **"Author"**
- Check ✅ **"find"**
- Check ✅ **"findOne"**

5. Click **"Save"** (top right)

---

### **Step 8: Create Test Data**

#### **Create a Category:**

1. Click **"Content Manager"** (left sidebar)
2. Click **"Category"**
3. Click **"Create new entry"** button
4. Fill in:
   - **Name:** `Technology`
   - **Slug:** `technology` (auto-generated, but you can edit)
5. Click **"Save"** (top right)
6. Click **"Publish"** button (important!)

#### **Create an Author:**

1. Click **"Content Manager"** → **"Author"**
2. Click **"Create new entry"**
3. Fill in:
   - **Name:** `John Doe`
   - **Email:** `john@example.com` (optional)
   - **Avatar:** Click to upload image (optional)
4. Click **"Save"**
5. Click **"Publish"**

#### **Create a Blog Post:**

1. Click **"Content Manager"** → **"Blog Post"**
2. Click **"Create new entry"**
3. Fill in:
   - **Title:** `Getting Started with Next.js`
   - **Slug:** `getting-started-with-nextjs` (auto-generated)
   - **Excerpt:** `Learn how to build modern web applications with Next.js and React.`
   - **Content:** (Optional) Add some content like: `Next.js is a powerful React framework...`
   - **Image:** Click to upload an image
   - **Category:** Click dropdown, select **"Technology"**
   - **Author:** Click dropdown, select **"John Doe"**
4. Click **"Save"** (top right)
5. Click **"Publish"** button (VERY IMPORTANT!)

---

### **Step 9: Verify API is Working**

1. Open new browser tab
2. Go to: `http://localhost:1337/api/blog-posts`
3. You should see JSON data with your blog post
4. If you see data, API is working! ✅

---

### **Step 10: Restart Frontend**

1. Go to your frontend terminal
2. Press **Ctrl+C** to stop the server
3. Run: `npm run dev`
4. Wait for it to start

---

### **Step 11: Test Connection**

1. Open browser: `http://localhost:3000`
2. Press **F12** to open DevTools
3. Click **"Network"** tab
4. Refresh the page (F5)
5. Look for requests to `http://localhost:1337/api/blog-posts`
6. Click on the request
7. Check **"Response"** tab - you should see your blog post data
8. Check your website - blog post should appear!

---

## ✅ Checklist

- [ ] Created Blog Post collection type
- [ ] Added all fields to Blog Post (title, slug, excerpt, content, image)
- [ ] Created Category collection type
- [ ] Created Author collection type
- [ ] Added relations (Blog Post → Category, Blog Post → Author)
- [ ] Saved and restarted Strapi
- [ ] Set API permissions (Public: find, findOne for all)
- [ ] Created test Category and published it
- [ ] Created test Author and published it
- [ ] Created test Blog Post and published it
- [ ] Verified API at `http://localhost:1337/api/blog-posts`
- [ ] Restarted frontend
- [ ] Tested connection - blog post appears on website

---

## 🎯 Quick Copy-Paste Values

### **Collection Type Names:**
- Blog Post
- Category
- Author

### **Field Names:**
**Blog Post:**
- title
- slug
- excerpt
- content
- image

**Category:**
- name
- slug

**Author:**
- name
- email
- avatar

### **Test Data:**
**Category:**
- Name: `Technology`
- Slug: `technology`

**Author:**
- Name: `John Doe`
- Email: `john@example.com`

**Blog Post:**
- Title: `Getting Started with Next.js`
- Slug: `getting-started-with-nextjs`
- Excerpt: `Learn how to build modern web applications with Next.js and React.`

---

## 🐛 Troubleshooting

### **Can't find Content-Type Builder?**
- Make sure you're logged in as admin
- Check left sidebar for "Content-Type Builder"

### **Field not saving?**
- Make sure you clicked "Finish" after each field
- Click "Save" at the top after adding all fields

### **API returns 404?**
- Check content type name is exactly "Blog Post"
- Make sure you restarted Strapi after creating it

### **API returns 403?**
- Go to Settings → Roles → Public
- Enable "find" and "findOne" for Blog Post, Category, and Author

### **No data showing?**
- Make sure blog post is **Published** (not just saved)
- Check browser console for errors (F12)
- Check Network tab for API calls

---

## 📝 Notes

- **Content Type Name:** We create "Blog Post" (singular), Strapi automatically makes it "blog-posts" (plural) for the API
- **Publishing:** Always click "Publish" not just "Save" for content to appear in API
- **Permissions:** Must enable in Public role for frontend to access
- **Restart:** Frontend needs restart after creating `.env.local`

---

**Follow these steps in order, and you'll have everything set up! 🚀**



