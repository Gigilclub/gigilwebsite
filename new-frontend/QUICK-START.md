# Quick Start Guide - Full Stack Setup

## 🚀 Getting Started

### **Step 1: Set Up Environment Variables**

Run the setup script:
```bash
node setup-env.js
```

Or manually create `.env.local`:
```env
NEXT_PUBLIC_EXPRESS_API_URL=http://localhost:3001/api
NEXT_PUBLIC_STRAPI_API_URL=http://localhost:1337/api
NEXT_PUBLIC_APP_NAME=Gigil
```

### **Step 2: Choose Your Setup Method**

#### **Option A: Docker Compose (Recommended for Full Stack)**

1. **Update paths in `docker-compose.yml`:**
   - Update `../gigilwebsite/backend/express` to your Express backend path
   - Update `../gigilwebsite/backend/strapi` to your Strapi backend path

2. **Start all services:**
   ```bash
   docker-compose up --build
   ```

3. **Access services:**
   - Frontend: http://localhost:3000
   - Express API: http://localhost:3001
   - Strapi CMS: http://localhost:1337
   - PostgreSQL: localhost:5432

#### **Option B: Manual Setup (Development)**

1. **Start PostgreSQL** (if not using Docker):
   ```bash
   # Using Docker for just the database
   docker run -d \
     --name gigil-postgres \
     -e POSTGRES_DB=gigil_db \
     -e POSTGRES_USER=gigil_user \
     -e POSTGRES_PASSWORD=gigil_password \
     -p 5432:5432 \
     postgres:15-alpine
   ```

2. **Start Express API:**
   ```bash
   cd ../gigilwebsite/backend/express
   npm install
   npm run dev
   ```

3. **Start Strapi CMS:**
   ```bash
   cd ../gigilwebsite/backend/strapi
   npm install
   npm run develop
   ```

4. **Start Frontend:**
   ```bash
   npm install
   npm run dev
   ```

---

## 🔧 Configuration

### **Backend Paths**

Update `docker-compose.yml` with your actual backend paths:

```yaml
express-api:
  build:
    context: ../gigilwebsite/backend/express  # ← Update this
    dockerfile: Dockerfile

strapi:
  build:
    context: ../gigilwebsite/backend/strapi  # ← Update this
    dockerfile: Dockerfile
```

### **Strapi Environment Variables**

For Strapi in Docker, you need to generate secrets. Run this in your Strapi directory:

```bash
cd ../gigilwebsite/backend/strapi
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

Copy the output and update `docker-compose.yml`:
- `APP_KEYS`
- `API_TOKEN_SALT`
- `ADMIN_JWT_SECRET`
- `TRANSFER_TOKEN_SALT`
- `JWT_SECRET`

---

## ✅ Verification

### **Check Services:**

1. **Frontend:**
   ```bash
   curl http://localhost:3000
   ```

2. **Express API Health:**
   ```bash
   curl http://localhost:3001/health
   ```

3. **Strapi API:**
   ```bash
   curl http://localhost:1337/api
   ```

4. **PostgreSQL:**
   ```bash
   docker exec -it <container-name> psql -U gigil_user -d gigil_db
   ```

---

## 🐛 Troubleshooting

### **Port Conflicts:**

If ports are already in use, update `docker-compose.yml`:
```yaml
ports:
  - "3002:3000"  # Change external port
```

### **Backend Not Found:**

Make sure backend paths in `docker-compose.yml` are correct relative to this directory.

### **Database Connection Issues:**

1. Check PostgreSQL is running
2. Verify credentials in `docker-compose.yml`
3. Check network connectivity between services

### **Strapi Won't Start:**

1. Generate proper secrets (see above)
2. Check database connection
3. Verify Strapi has proper Dockerfile

---

## 📝 Next Steps

1. ✅ Set up environment variables
2. ✅ Start all services
3. ✅ Verify connections
4. ✅ Create content in Strapi
5. ✅ Test API endpoints
6. ✅ Build your features!

---

**Happy Coding! 🎉**




