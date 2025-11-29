# 🚀 Deployment Guide for Gigil Monorepo

This guide walks you through deploying your monorepo to production.

## 📋 Overview

Your monorepo has:
- **new-frontend**: Next.js frontend (port 3002)
- **backend/strapi**: Strapi CMS (port 1337)
- **db**: Prisma database schema

## 🎯 Deployment Strategy

### Option 1: Separate Services (Recommended)

Deploy each service independently for better scalability:

1. **Frontend** → Vercel/Netlify
2. **Strapi** → Railway/Render
3. **Database** → Railway Postgres / Render Postgres / Supabase

### Option 2: All-in-One (Simpler, but less scalable)

Deploy everything to one platform like Railway or Render.

---

## 📦 Step-by-Step Deployment

### Phase 1: Deploy Strapi Backend

#### Using Railway (Recommended)

1. **Create Railway Account**
   - Go to [railway.app](https://railway.app)
   - Sign up with GitHub

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your `gigilwebsite` repo

3. **Add Database**
   - Click "+ New" → "Database" → "PostgreSQL"
   - Railway will create a Postgres instance

4. **Deploy Strapi Service**
   - Click "+ New" → "GitHub Repo"
   - Select your repo
   - Railway will detect it's a monorepo
   - **Set Root Directory**: `backend/strapi`
   - **Set Build Command**: `npm install && npm run build`
   - **Set Start Command**: `npm run start`

5. **Add Environment Variables**
   In Railway dashboard, add these to your Strapi service:

   ```env
   # App Keys (generate new ones for production!)
   APP_KEYS=your-key-1,your-key-2,your-key-3,your-key-4
   ADMIN_JWT_SECRET=your-admin-secret
   API_TOKEN_SALT=your-api-token-salt
   TRANSFER_TOKEN_SALT=your-transfer-token-salt
   ENCRYPTION_KEY=your-encryption-key

   # Server
   HOST=0.0.0.0
   PORT=1337
   NODE_ENV=production

   # Database (Railway provides this automatically)
   DATABASE_CLIENT=postgres
   DATABASE_URL=${{Postgres.DATABASE_URL}}
   ```

   **⚠️ Important**: Generate NEW random keys for production! Don't use the local dev keys.

6. **Get Your Strapi URL**
   - Railway will give you a URL like: `https://your-strapi.railway.app`
   - Save this URL - you'll need it for the frontend

---

### Phase 2: Deploy Frontend

#### Using Vercel (Recommended for Next.js)

1. **Create Vercel Account**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub

2. **Import Project**
   - Click "Add New" → "Project"
   - Import your `gigilwebsite` repo

3. **Configure Project**
   - **Root Directory**: `new-frontend`
   - **Framework Preset**: Next.js (auto-detected)
   - **Build Command**: `npm run build` (or leave default)
   - **Output Directory**: `.next` (default)

4. **Add Environment Variables**
   In Vercel dashboard → Settings → Environment Variables:

   ```env
   NEXT_PUBLIC_STRAPI_API_URL=https://your-strapi.railway.app/api
   NEXT_PUBLIC_STRAPI_BLOG_ENDPOINT=blogposts
   NEXT_PUBLIC_EXPRESS_API_URL=https://your-express-api.railway.app/api
   ```

   Replace `your-strapi.railway.app` with your actual Strapi URL from Phase 1.

5. **Deploy**
   - Click "Deploy"
   - Vercel will build and deploy your frontend
   - You'll get a URL like: `https://your-app.vercel.app`

---

### Phase 3: Configure Strapi Permissions

1. **Access Strapi Admin**
   - Go to: `https://your-strapi.railway.app/admin`
   - Log in with your admin account

2. **Enable Public API Access**
   - Settings → Users & Permissions → Roles → Public
   - Enable `find` and `findOne` for **Blogpost**
   - Click "Save"

3. **Test API**
   - Visit: `https://your-strapi.railway.app/api/blogposts`
   - Should return JSON (even if empty)

---

## 🔐 Generating Production Keys

**Never use local dev keys in production!**

Generate new keys using:

```bash
# In PowerShell or Terminal
node -e "const crypto = require('crypto'); const keys = Array.from({length: 4}, () => crypto.randomBytes(32).toString('base64')); console.log('APP_KEYS=' + keys.join(',')); console.log('ADMIN_JWT_SECRET=' + crypto.randomBytes(32).toString('base64')); console.log('API_TOKEN_SALT=' + crypto.randomBytes(32).toString('base64')); console.log('TRANSFER_TOKEN_SALT=' + crypto.randomBytes(32).toString('base64')); console.log('ENCRYPTION_KEY=' + crypto.randomBytes(32).toString('base64'));"
```

Copy the output and use it in your production environment variables.

---

## 🌐 Alternative: Deploy to Render

### Strapi on Render

1. Go to [render.com](https://render.com)
2. New → Web Service
3. Connect GitHub repo
4. Settings:
   - **Root Directory**: `backend/strapi`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm run start`
5. Add environment variables (same as Railway)
6. Add PostgreSQL database from Render dashboard

### Frontend on Render

1. New → Static Site
2. Root Directory: `new-frontend`
3. Build Command: `npm install && npm run build`
4. Publish Directory: `.next`
5. Add environment variables

---

## ✅ Post-Deployment Checklist

- [ ] Strapi is accessible at production URL
- [ ] Strapi admin panel works (`/admin`)
- [ ] Strapi API works (`/api/blogposts`)
- [ ] Frontend is deployed and accessible
- [ ] Frontend can fetch blog posts from Strapi
- [ ] Environment variables are set correctly
- [ ] Database is connected and working
- [ ] Public permissions are enabled in Strapi

---

## 🐛 Troubleshooting

### Frontend can't connect to Strapi

1. Check `NEXT_PUBLIC_STRAPI_API_URL` in Vercel
2. Make sure it includes `/api` at the end
3. Check browser console for CORS errors
4. Verify Strapi CORS settings allow your frontend domain

### Strapi 403 Forbidden

- Enable public permissions (see Phase 3)
- Check API endpoint name matches (`blogposts` vs `blog-posts`)

### Database Connection Issues

- Verify `DATABASE_URL` is set correctly
- Check database is running and accessible
- For Railway/Render, use the provided `DATABASE_URL` variable

---

## 📝 Notes

- **Never commit `.env` files** - always use platform environment variables
- **Use different keys for production** - never reuse dev keys
- **Test locally first** - make sure everything works before deploying
- **Monitor logs** - Railway/Render/Vercel provide logs for debugging

---

## 🎉 You're Done!

Once deployed:
- Your frontend: `https://your-app.vercel.app`
- Your Strapi: `https://your-strapi.railway.app`
- Your blog posts will load from Strapi
- Quiz feature is ready (backend integration pending)




