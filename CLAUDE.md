# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Gigil** is a monorepo containing a Next.js frontend with a Strapi CMS backend for blog content management and a separate database service using Prisma.

### Workspaces
- `frontend` - Legacy Next.js 14 frontend (being phased out)
- `new-frontend` - Active Next.js 15 frontend with shadcn/ui components (port 3002)
- `backend/strapi` - Strapi v5 CMS for blog content (port 1337)
- `backend/express` - Express.js API (currently minimal/placeholder)
- `db` - Prisma database schema and migrations

## Development Commands

### Starting Development
```bash
# Install dependencies (first time)
npm i

# Run all services concurrently (frontend + express + strapi)
npm run dev

# Run only new-frontend (recommended for frontend work)
npm run new-frontend:dev
```

### Building
```bash
# Build all workspaces
npm run build

# Build new-frontend only
npm run new-frontend:build

# Build and start new-frontend production server
npm run new-frontend:build && npm run new-frontend:start
```

### Individual Workspace Commands
```bash
# Frontend (new-frontend - port 3002)
npm run dev --workspace new-frontend
npm run build --workspace new-frontend
npm run start --workspace new-frontend

# Strapi (port 1337)
npm run develop --workspace backend/strapi
npm run build --workspace backend/strapi
npm run start --workspace backend/strapi

# Prisma (db workspace)
npm run prisma:generate --workspace db
npm run prisma:migrate --workspace db
npm run prisma:studio --workspace db
```

### Linting
```bash
# Lint all workspaces
npm run lint

# Lint specific workspace
npm run lint --workspace new-frontend
```

## Architecture

### Frontend Architecture (new-frontend)
- **Framework**: Next.js 15 with React 19, App Router
- **Styling**: Tailwind CSS v4, shadcn/ui components
- **State Management**: TanStack Query (React Query) for server state
- **API Client**: Axios with separate clients for Strapi and Express APIs
- **Port**: 3002 (development)

**Key Directories:**
- `src/app/` - Next.js App Router pages and layouts
- `src/components/` - Reusable React components
- `src/components/ui/` - shadcn/ui components
- `src/lib/api/` - API clients and data fetching logic
- `src/types/` - TypeScript type definitions
- `src/providers/` - React context providers (e.g., QueryProvider)

**Font Configuration:**
- Uses Geist Sans, Geist Mono, and Playfair Display fonts
- Configured in `src/app/layout.tsx` with CSS variables

### Backend Architecture (Strapi)
- **Framework**: Strapi v5.23.6
- **Database**: PostgreSQL (production), SQLite (development fallback)
- **Content Types**: `blogpost` (main content type)
- **Port**: 1337

**Important Notes:**
- Strapi v4+ does NOT support MongoDB (must use PostgreSQL or SQLite)
- Database client is configurable via `DATABASE_CLIENT` environment variable
- Supports both standalone database config and `DATABASE_URL` connection strings
- Production deployments should use PostgreSQL

**Content Type Structure:**
- `src/api/blogpost/` - Blogpost API (controllers, routes, services)
- `types/generated/` - Auto-generated TypeScript types from Strapi schemas

### Database (Prisma)
- **Schema Location**: `db/prisma/schema.prisma`
- **Current Models**: `Gift` (id, name, description, category, createdAt)
- **Provider**: PostgreSQL

### API Integration

**Strapi API Client** (`new-frontend/src/lib/api/strapi-client.ts`):
- Base URL: `NEXT_PUBLIC_STRAPI_API_URL` (default: `http://localhost:1337/api`)
- Automatic endpoint discovery via `discover-endpoint.ts`
- Transforms Strapi's nested data structure to flat frontend format
- Handles image URL resolution (Strapi returns relative URLs)

**Blog API** (`new-frontend/src/lib/api/blog-api.ts`):
- Auto-discovers blog endpoint name (tries: blog-posts, posts, articles, etc.)
- Transforms rich text content from Strapi blocks to plain text
- Populates related data (author, category, coverImage)
- Sorts by `publishedAt:desc` by default

**Express API Client** (`new-frontend/src/lib/api/express-client.ts`):
- Base URL: `NEXT_PUBLIC_EXPRESS_API_URL`
- Currently minimal, prepared for future gifting features

## Critical Implementation Details

### Strapi Endpoint Discovery
The blog API uses automatic endpoint discovery because Strapi content type names can vary:
- Configured via `NEXT_PUBLIC_STRAPI_BLOG_ENDPOINT` environment variable
- Falls back to trying common names: `blogposts`, `blog-posts`, `posts`, etc.
- Discovery happens on first API call and caches the result

### Strapi Data Transformation
Strapi returns nested data structures that must be transformed:
```typescript
// Strapi format
{ id: 1, attributes: { title: "...", coverImage: { data: { attributes: { url: "..." } } } } }

// Transformed frontend format
{ id: 1, title: "...", image: "https://strapi.url/uploads/..." }
```

The `transformBlogPost()` function in `blog-api.ts` handles this transformation.

### Database Configuration
Strapi's database config (`backend/strapi/config/database.ts`) supports:
- SQLite (development default)
- PostgreSQL (production)
- MySQL (configured but not actively used)

Switch database by setting `DATABASE_CLIENT` env var to `postgres`, `mysql`, or `sqlite`.

## Environment Variables

### Required for new-frontend
```env
NEXT_PUBLIC_STRAPI_API_URL=http://localhost:1337/api
NEXT_PUBLIC_STRAPI_BLOG_ENDPOINT=blogposts  # Optional, will auto-discover
NEXT_PUBLIC_EXPRESS_API_URL=http://localhost:3001/api  # If using Express API
```

### Required for backend/strapi
```env
HOST=0.0.0.0
PORT=1337
APP_KEYS=key1,key2,key3,key4  # Comma-separated
API_TOKEN_SALT=random_string
ADMIN_JWT_SECRET=random_string
TRANSFER_TOKEN_SALT=random_string
JWT_SECRET=random_string
ENCRYPTION_KEY=random_string

# Database (choose one)
DATABASE_CLIENT=sqlite  # or postgres
DATABASE_URL=postgresql://user:pass@host:5432/dbname  # For PostgreSQL
```

**Production Security:**
- NEVER use example values from `.env.example` in production
- Generate new random keys using the crypto module
- See DEPLOYMENT-GUIDE.md for key generation script

## Deployment

The project is configured for separate service deployment:
- **Frontend**: Vercel (recommended for Next.js)
- **Strapi**: Railway or Render
- **Database**: Railway Postgres, Render Postgres, or Supabase

Detailed deployment instructions are in `DEPLOYMENT-GUIDE.md`.

**Key Deployment Considerations:**
- Set root directory to workspace path (e.g., `new-frontend` or `backend/strapi`)
- Configure build commands per workspace
- Strapi MUST use PostgreSQL in production (not SQLite)
- Enable public permissions in Strapi for blog content (`find` and `findOne` on Blogpost)

## TypeScript Configuration

- All workspaces use TypeScript 5
- Strapi auto-generates types in `backend/strapi/types/generated/`
- Frontend types are manually maintained in `new-frontend/src/types/`

## Known Issues & Gotchas

1. **Two Frontend Workspaces**: `frontend` is legacy (Next.js 14), `new-frontend` is active (Next.js 15)
2. **Strapi Endpoint Names**: Content type might be `blogpost`, `blog-post`, or `blogposts` - use endpoint discovery
3. **Image URLs**: Strapi returns relative paths; use `getStrapiImageUrl()` helper to get full URLs
4. **Database Compatibility**: Strapi v5 does NOT support MongoDB
5. **Port Conflicts**: Ensure ports 1337 (Strapi) and 3002 (new-frontend) are available
6. **Concurrent Development**: Use `npm run dev` to run all services, or run workspaces individually

## Testing

Currently, no test suites are configured. The project uses linting via ESLint:
```bash
npm run lint  # Lint all workspaces
```
