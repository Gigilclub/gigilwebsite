# Backend Connection Guide - Gigil Frontend Integration

## 📋 Understanding Your Backend Structure

Based on the [Gigil monorepo](https://github.com/Gigilclub/gigilwebsite), your backend consists of:

1. **Express.js API** (`backend/express`) - Gifting API
2. **Strapi CMS** (`backend/strapi`) - Blog content management
3. **PostgreSQL Database** - Used by Strapi and Prisma
4. **Existing Frontend** (`frontend`) - Next.js 14 (separate from your current frontend)

---

## 🎯 Integration Approaches

### **Option 1: Separate Repositories with API Integration** ⭐ **RECOMMENDED**

**Best for your situation because:**
- ✅ You've already built a modern Next.js 15 frontend
- ✅ Independent deployment and scaling
- ✅ Keep your current frontend improvements
- ✅ Easier to maintain separate codebases
- ✅ Your frontend can evolve independently

**How it works:**
- Your frontend (Next.js 15) makes API calls to:
  - Express API for gifting features
  - Strapi CMS API for blog content
- Both run separately and communicate via HTTP

---

### **Option 2: Merge into Monorepo**

**Best if:**
- You want to use the existing Next.js 14 frontend
- You prefer a single repository
- You want shared types and utilities

**How it works:**
- Move your frontend code into the monorepo
- Replace or merge with existing frontend
- Share code between frontend and backend

---

### **Option 3: Hybrid Approach**

**Best if:**
- You want to gradually migrate
- Keep both frontends running temporarily
- Test integration before full migration

---

## 🚀 **RECOMMENDED: Option 1 Implementation**

Since you have a modern Next.js 15 frontend with great components, let's connect it to the backend APIs.

### **Backend Services You'll Connect To:**

1. **Express API** (Gifting API)
   - Port: Typically `3001` or `8000`
   - Base URL: `http://localhost:3001/api` (or check your backend config)
   - Endpoints: Gifting-related APIs

2. **Strapi CMS** (Blog API)
   - Port: Typically `1337`
   - Base URL: `http://localhost:1337/api`
   - Endpoints: Blog posts, categories, etc.

---

## 📝 Implementation Steps

### **Step 1: Install Required Dependencies**

```bash
npm install axios @tanstack/react-query
```

### **Step 2: Create API Client Configuration**

We'll create:
- API client for Express API
- API client for Strapi CMS
- React Query hooks for data fetching
- Type definitions

### **Step 3: Environment Variables**

Create `.env.local`:
```env
# Express API (Gifting API)
NEXT_PUBLIC_EXPRESS_API_URL=http://localhost:3001/api

# Strapi CMS (Blog API)
NEXT_PUBLIC_STRAPI_API_URL=http://localhost:1337/api

# App Configuration
NEXT_PUBLIC_APP_NAME=Gigil
```

### **Step 4: Update Docker Compose**

Update `docker-compose.yml` to include both backend services.

---

## 🔧 What We'll Build

1. **API Clients** - Separate clients for Express and Strapi
2. **React Query Setup** - For efficient data fetching and caching
3. **API Hooks** - Custom hooks for blog posts, gifting, etc.
4. **Type Definitions** - TypeScript types for API responses
5. **Error Handling** - Centralized error handling
6. **Authentication** - If your backend requires auth

---

## 📊 Architecture Flow

```
Your Frontend (Next.js 15)
    │
    ├─── Express API Client ────> backend/express (Gifting API)
    │
    └─── Strapi API Client ────> backend/strapi (Blog CMS)
```

---

## 🎯 Next Steps

I'll create the complete implementation files for you:
1. API client setup
2. React Query configuration
3. Hooks for blog and gifting APIs
4. Updated environment configuration
5. Docker Compose updates

Let me know if you want to proceed with this approach, or if you prefer one of the other options!




