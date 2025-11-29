# Gigil Frontend + Backend CI/CD Pipeline

This repository contains the CI/CD pipeline configuration for the Gigil project, which consists of separate frontend and backend applications.

## 🏗️ Project Structure

```
├── frontend/                 # Next.js Frontend (this repo)
│   ├── .github/workflows/   # GitHub Actions CI/CD
│   ├── Dockerfile           # Frontend containerization
│   └── docker-compose.yml   # Local development setup
├── backend/                 # Backend API (separate repo)
│   ├── Dockerfile          # Backend containerization
│   └── src/                # Backend source code
└── deploy.sh               # Deployment script
```

## 🚀 CI/CD Pipeline Features

### GitHub Actions Workflow (`.github/workflows/ci-cd.yml`)

1. **Frontend Build & Test**
   - Node.js 20 setup
   - Dependency installation
   - ESLint code quality checks
   - Next.js build with Turbopack
   - Artifact upload for deployment

2. **Backend Build & Test** (if in same repo)
   - Separate backend build process
   - Test execution
   - Build artifact creation

3. **Docker Build & Push**
   - Multi-stage Docker builds
   - Container registry push
   - Automated tagging

4. **Production Deployment**
   - Environment-specific deployments
   - Health checks
   - Rollback capabilities

## 🐳 Docker Configuration

### Frontend Dockerfile
- Multi-stage build for optimization
- Node.js 20 Alpine base image
- Production-ready Next.js setup
- Security best practices (non-root user)

### Docker Compose
- Frontend service (port 3000)
- Backend service (port 8000)
- PostgreSQL database
- Redis cache (optional)
- Network isolation

## 📋 Deployment Options

### Option 1: Monorepo Approach (Recommended)
```bash
# Clone both repositories into a monorepo structure
git clone <frontend-repo> gigil-app
cd gigil-app
git clone <backend-repo> backend

# Run the deployment script
chmod +x deploy.sh
./deploy.sh
```

### Option 2: Separate Repositories
```bash
# Frontend deployment
cd frontend-repo
npm run build
docker build -t gigil-frontend .
docker run -p 3000:3000 gigil-frontend

# Backend deployment
cd backend-repo
npm run build
docker build -t gigil-backend .
docker run -p 8000:8000 gigil-backend
```

### Option 3: Orchestrated Deployment
```bash
# Use Docker Compose for coordinated deployment
docker-compose up --build -d
```

## 🔧 Environment Configuration

### Frontend Environment Variables
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_APP_NAME=Gigil Frontend
API_BASE_URL=http://localhost:8000/api
NEXTAUTH_SECRET=your-secret-key
```

### Backend Environment Variables
```env
DATABASE_URL=postgresql://user:password@db:5432/gigil_db
FRONTEND_URL=http://frontend:3000
NODE_ENV=production
```

## 🚦 Pipeline Triggers

- **Push to main**: Full CI/CD pipeline with production deployment
- **Push to develop**: Build and test without production deployment
- **Pull Request**: Build and test for code quality checks

## 📊 Monitoring & Health Checks

### Health Check Endpoints
- Frontend: `GET http://localhost:3000`
- Backend: `GET http://localhost:8000/health`
- Database: Connection test
- Redis: Connection test

### Logging
- Structured logging with different levels
- Centralized log aggregation
- Error tracking and alerting

## 🔄 Rollback Strategy

1. **Automatic Rollback**: Failed health checks trigger automatic rollback
2. **Manual Rollback**: Use previous Docker image tags
3. **Database Rollback**: Database migration rollback scripts

## 🛠️ Local Development

### Prerequisites
- Node.js 20+
- Docker & Docker Compose
- Git

### Setup
```bash
# Clone the repository
git clone <your-repo-url>
cd gigil-frontend

# Install dependencies
npm install

# Start development server
npm run dev

# Or use Docker Compose for full stack
docker-compose up --build
```

### Development Commands
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## 🌐 Production Deployment

### Cloud Platforms
- **Vercel**: Optimized for Next.js
- **AWS**: ECS/EKS with ALB
- **Google Cloud**: Cloud Run
- **Azure**: Container Instances

### Environment Setup
1. Set up production environment variables
2. Configure domain and SSL certificates
3. Set up monitoring and logging
4. Configure CDN for static assets

## 📈 Performance Optimization

### Frontend
- Next.js Image Optimization
- Code splitting and lazy loading
- CDN integration
- Caching strategies

### Backend
- Database query optimization
- Redis caching
- API rate limiting
- Load balancing

## 🔒 Security Considerations

- Environment variable security
- Docker security best practices
- API authentication and authorization
- HTTPS enforcement
- Regular dependency updates

## 📞 Support

For issues or questions about the CI/CD pipeline:
1. Check the GitHub Actions logs
2. Review Docker container logs
3. Verify environment configuration
4. Check network connectivity between services

## 🔄 Updates

To update the CI/CD pipeline:
1. Modify `.github/workflows/ci-cd.yml`
2. Update Docker configurations if needed
3. Test changes in development environment
4. Deploy to staging before production

