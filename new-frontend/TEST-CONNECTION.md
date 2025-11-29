# Testing Strapi ↔ Frontend Connection

## ✅ What We've Done

1. ✅ Created `.env.local` file with Strapi URL
2. ✅ Frontend is running on port 3000
3. ✅ Strapi is running on port 1337
4. ⚠️ Content type endpoint not found (404)

## 🔍 Next Steps to Fix

### Step 1: Check Strapi Content Types

1. Open Strapi Admin: `http://localhost:1337/admin`
2. Go to **Content-Type Builder** (left sidebar)
3. Check what content types you have:
   - Look for: `posts`, `articles`, `blogs`, `blog-posts`, or similar
   - Note the exact name (it's case-sensitive!)

### Step 2: Create Blog Post Content Type (if it doesn't exist)

If you don't have a blog post content type:

1. In Strapi Admin → **Content-Type Builder**
2. Click **"Create new collection type"**
3. Name it: `blog-post` (or `post`, `article` - your choice)
4. Add these fields:
   - **title** (Text, Short text)
   - **slug** (UID, based on title)
   - **excerpt** (Text, Long text)
   - **content** (Rich text, optional)
   - **publishedAt** (Date)
   - **category** (Relation → Create new "Category" type, optional)
   - **author** (Relation → Create new "Author" type, optional)
   - **image** (Media, Single media, optional)
5. Click **Save**
6. Click **"Restart Strapi"** when prompted

### Step 3: Set API Permissions

1. In Strapi Admin → **Settings** → **Users & Permissions Plugin** → **Roles**
2. Click on **Public** role
3. Under **Permissions**, find your content type (e.g., "Blog Post")
4. Check these permissions:
   - ✅ **find** (to list all posts)
   - ✅ **findOne** (to get single post)
5. Click **Save**

### Step 4: Create a Test Blog Post

1. Go to **Content Manager** → Your content type (e.g., "Blog Post")
2. Click **"Create new entry"**
3. Fill in:
   - Title: "My First Blog Post"
   - Slug: "my-first-blog-post" (auto-generated from title)
   - Excerpt: "This is a test post"
4. Click **Save**
5. Click **Publish** (important!)

### Step 5: Update Frontend Code (if content type name is different)

If your content type is NOT called `blog-posts`, update the code:

**File:** `src/lib/api/blog-api.ts`

Find this line (around line 75):
```typescript
const response = await strapiClient.get<StrapiResponse<BlogPost[]>>(
  `/blog-posts?${queryParams.toString()}`
);
```

Change `/blog-posts` to your content type name:
- If it's `post` → change to `/posts`
- If it's `article` → change to `/articles`
- If it's `blog-post` → change to `/blog-posts` (plural)

Also update these lines:
- Line with `/blog-posts/${id}` 
- Line with `/blog-posts?filters[slug]`

### Step 6: Restart Frontend

After creating `.env.local`, restart your frontend:

1. Stop the frontend (Ctrl+C in the terminal)
2. Start again: `npm run dev`

### Step 7: Test the Connection

1. Open browser: `http://localhost:3000`
2. Open DevTools (F12) → **Network** tab
3. Refresh the page
4. Look for requests to `http://localhost:1337/api/...`
5. Check the response:
   - ✅ **200 OK** = Success!
   - ❌ **404** = Content type name wrong
   - ❌ **403** = Permissions not set

## 🎯 Quick Checklist

- [ ] `.env.local` created ✅
- [ ] Strapi running on port 1337 ✅
- [ ] Frontend running on port 3000 ✅
- [ ] Content type exists in Strapi
- [ ] API permissions set (find, findOne)
- [ ] Test blog post created and published
- [ ] Content type name matches in code
- [ ] Frontend restarted after .env.local creation
- [ ] Browser shows blog posts

## 🐛 Common Issues

### Issue: 404 Not Found
**Solution:** Check content type name matches in code

### Issue: 403 Forbidden
**Solution:** Set API permissions in Strapi (Settings → Roles → Public)

### Issue: Empty array returned
**Solution:** Make sure blog post is **published** (not just saved)

### Issue: No data showing
**Solution:** Check browser console for errors, check Network tab for API calls

## 📝 What to Tell Me

After checking Strapi, let me know:
1. What content type name you have (or created)
2. If you see any errors in browser console
3. What you see in Network tab when loading the page

Then I can help update the code if needed!



