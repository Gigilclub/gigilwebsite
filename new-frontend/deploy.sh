#!/bin/bash

# Deployment script for Gigil Frontend + Backend
# This script handles the deployment of both frontend and backend services

set -e

echo "🚀 Starting deployment process..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
FRONTEND_DIR="."
BACKEND_DIR="../your-backend-directory"  # Update this path
DOCKER_COMPOSE_FILE="docker-compose.yml"

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if required tools are installed
check_dependencies() {
    print_status "Checking dependencies..."
    
    if ! command -v docker &> /dev/null; then
        print_error "Docker is not installed. Please install Docker first."
        exit 1
    fi
    
    if ! command -v docker-compose &> /dev/null; then
        print_error "Docker Compose is not installed. Please install Docker Compose first."
        exit 1
    fi
    
    print_status "All dependencies are installed ✓"
}

# Build and test frontend
build_frontend() {
    print_status "Building frontend..."
    
    cd "$FRONTEND_DIR"
    
    # Install dependencies
    npm ci
    
    # Run linting
    npm run lint
    
    # Build the application
    npm run build
    
    print_status "Frontend build completed ✓"
    cd ..
}

# Build and test backend
build_backend() {
    print_status "Building backend..."
    
    if [ -d "$BACKEND_DIR" ]; then
        cd "$BACKEND_DIR"
        
        # Install dependencies
        npm ci
        
        # Run tests
        npm test
        
        # Build the application
        npm run build
        
        print_status "Backend build completed ✓"
        cd ..
    else
        print_warning "Backend directory not found at $BACKEND_DIR. Skipping backend build."
    fi
}

# Deploy with Docker Compose
deploy_with_docker() {
    print_status "Deploying with Docker Compose..."
    
    # Stop existing containers
    docker-compose -f "$DOCKER_COMPOSE_FILE" down
    
    # Build and start services
    docker-compose -f "$DOCKER_COMPOSE_FILE" up --build -d
    
    print_status "Deployment completed ✓"
}

# Health check
health_check() {
    print_status "Performing health checks..."
    
    # Wait for services to start
    sleep 10
    
    # Check frontend
    if curl -f http://localhost:3000 > /dev/null 2>&1; then
        print_status "Frontend is healthy ✓"
    else
        print_error "Frontend health check failed"
        exit 1
    fi
    
    # Check backend
    if curl -f http://localhost:8000/health > /dev/null 2>&1; then
        print_status "Backend is healthy ✓"
    else
        print_warning "Backend health check failed (might not have /health endpoint)"
    fi
}

# Main deployment function
main() {
    echo "🎯 Gigil Frontend + Backend Deployment Script"
    echo "=============================================="
    
    check_dependencies
    build_frontend
    build_backend
    deploy_with_docker
    health_check
    
    print_status "🎉 Deployment completed successfully!"
    print_status "Frontend: http://localhost:3000"
    print_status "Backend: http://localhost:8000"
}

# Run main function
main "$@"

