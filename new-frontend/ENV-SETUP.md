# Environment Variables Setup

## 📝 Important Note

The `.env.local` file is protected and cannot be created automatically. You need to create it manually.

## 🚀 Quick Setup

### Step 1: Create `.env.local` file

Create a file named `.env.local` in the root of your project with the following content:

```env
# Express API (Gifting API)
# Update this to match your Express backend port
NEXT_PUBLIC_EXPRESS_API_URL=http://localhost:3001/api

# Strapi CMS (Blog API)
# Update this to match your Strapi backend port (usually 1337)
NEXT_PUBLIC_STRAPI_API_URL=http://localhost:1337/api

# App Configuration
NEXT_PUBLIC_APP_NAME=Gigil
```

### Step 2: Update Ports

**Important:** Update the ports to match your backend setup:

- **Express API**: Check what port your Express backend runs on (commonly `3001` or `8000`)
- **Strapi CMS**: Check what port your Strapi runs on (commonly `1337`)

### Step 3: Verify

After creating the file, restart your Next.js dev server:

```bash
npm run dev
```

The environment variables will be loaded automatically.

---

## 🔍 How to Find Your Backend Ports

### For Express API:
1. Check your backend/express `package.json` scripts
2. Look for `PORT` in your Express server code
3. Check your backend's `.env` file

### For Strapi:
1. Check your backend/strapi `config/server.js` or `.env`
2. Default Strapi port is `1337`
3. Look for `PORT` or `HOST` configuration

---

## 📋 Example Configurations

### Development (Local):
```env
NEXT_PUBLIC_EXPRESS_API_URL=http://localhost:3001/api
NEXT_PUBLIC_STRAPI_API_URL=http://localhost:1337/api
```

### Production:
```env
NEXT_PUBLIC_EXPRESS_API_URL=https://api.gigil.com/api
NEXT_PUBLIC_STRAPI_API_URL=https://cms.gigil.com/api
```

---

## ⚠️ Security Note

- `.env.local` is already in `.gitignore` - it won't be committed
- Never commit sensitive keys or tokens
- Use different values for development and production




