# Quick Setup Guide for Gigil Frontend + Backend Integration

## 🚀 Quick Start

### 1. **Immediate Next Steps**

Since you have your frontend running at `http://localhost:3000`, here's what you need to do:

#### Option A: Monorepo Setup (Recommended)
```bash
# 1. Create a parent directory for both projects
mkdir gigil-app
cd gigil-app

# 2. Move your frontend into the monorepo
mv "C:\Users\ADMIN\Desktop\Gigil Frontend" ./frontend

# 3. Clone or create your backend in the same directory
git clone <your-backend-repo> backend
# OR create new backend
mkdir backend && cd backend && npm init -y

# 4. Go back to frontend and run
cd ../frontend
npm run dev
```

#### Option B: Keep Separate Repositories
```bash
# 1. Keep your current frontend structure
# 2. Update the backend path in docker-compose.yml
# 3. Update the backend path in deploy.sh
# 4. Run the deployment script
./deploy.sh
```

### 2. **Backend Requirements**

Your backend should have these endpoints:
```
GET  /health          # Health check
POST /api/auth/login  # User authentication
GET  /api/users/me    # Get current user
POST /api/users       # Create user
PUT  /api/users/:id   # Update user
```

### 3. **Environment Variables**

Create these files in your frontend:

#### `.env.local` (Development)
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_APP_NAME=Gigil Frontend
```

#### `.env.production` (Production)
```env
NEXT_PUBLIC_API_URL=https://your-api-domain.com
NEXT_PUBLIC_APP_NAME=Gigil
```

### 4. **Test the Integration**

```bash
# Start both services
docker-compose up --build

# Or run them separately:
# Terminal 1: Frontend
npm run dev

# Terminal 2: Backend (in your backend directory)
npm run dev
```

### 5. **Verify Everything Works**

- Frontend: http://localhost:3000
- Backend: http://localhost:8000
- Health Check: http://localhost:8000/health

## 🔧 Configuration Files Created

I've created these files for you:

1. **`.github/workflows/ci-cd.yml`** - GitHub Actions CI/CD pipeline
2. **`Dockerfile`** - Frontend containerization
3. **`docker-compose.yml`** - Full stack development setup
4. **`deploy.sh`** - Deployment script
5. **`CI-CD-README.md`** - Complete CI/CD documentation
6. **`BACKEND-INTEGRATION-STRATEGY.md`** - Integration strategy

## 🎯 What You Need to Do Now

### Immediate Actions:
1. **Update backend path** in `docker-compose.yml` and `deploy.sh`
2. **Create backend repository** with the API endpoints mentioned above
3. **Set up environment variables** for your backend
4. **Test the integration** using Docker Compose

### Next Steps:
1. **Push to GitHub** to trigger the CI/CD pipeline
2. **Set up production environment** (Vercel, AWS, etc.)
3. **Configure monitoring** and logging
4. **Set up automated testing**

## 🆘 Troubleshooting

### Common Issues:

1. **Backend not found**: Update the backend path in configuration files
2. **Port conflicts**: Change ports in docker-compose.yml
3. **Environment variables**: Make sure all required env vars are set
4. **Docker issues**: Ensure Docker is running and accessible

### Quick Fixes:

```bash
# Check if Docker is running
docker --version
docker-compose --version

# Check if ports are available
netstat -an | findstr :3000
netstat -an | findstr :8000

# Reset Docker containers
docker-compose down
docker-compose up --build --force-recreate
```

## 📞 Need Help?

If you encounter any issues:
1. Check the logs: `docker-compose logs`
2. Verify environment variables
3. Test API endpoints manually
4. Check network connectivity between services

The CI/CD pipeline is now ready to deploy both your frontend and backend together! 🎉

