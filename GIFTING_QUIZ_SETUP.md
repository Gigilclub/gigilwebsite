# Gifting Quiz Flow - Setup Guide

This document explains the complete gifting quiz flow implementation for the Gigil website.

## 🎯 Overview

The Gifting Quiz Flow is a multi-step quiz that helps users find the perfect gift by:
1. Asking questions about the recipient, budget, interests, and occasion
2. Using backend business logic to filter the product database
3. Displaying personalized gift recommendations

## 📁 Architecture

### Frontend (Next.js)
- **Homepage** (`frontend/app/page.tsx`): Landing page with quiz CTA
- **Quiz Flow** (`frontend/app/gifting/page.tsx`): Multi-step quiz interface
- **Components** (`frontend/components/quiz/`):
  - `ProgressBar.tsx` - Shows quiz progress
  - `QuizCard.tsx` - Container for each question
  - `OptionButton.tsx` - Single-select option buttons
  - `MultiSelectButton.tsx` - Multi-select buttons for interests
  - `GiftCard.tsx` - Displays gift recommendations

### Backend (Express.js)
- **Server** (`backend/express/src/index.ts`): Main Express server
- **Routes**:
  - `routes/quiz.ts` - POST /api/quiz (quiz submission)
  - `routes/gifts.ts` - GET /api/gifts/:id
  - `routes/categories.ts` - GET /api/categories, GET /api/categories/:slug/gifts
- **Services**:
  - `services/giftService.ts` - Business logic for gift filtering
  - `services/database.ts` - Prisma client singleton

### Database (Prisma + PostgreSQL)
- **Schema** (`db/prisma/schema.prisma`):
  - `Category` model (name, slug, description, imageUrl)
  - `Gift` model (with filtering fields: recipientType, priceRange, interests, occasion)
- **Seed** (`db/prisma/seed.ts`): Sample data with 18+ gifts across 6 categories

## 🚀 Setup Instructions

### 1. Install Dependencies

```bash
# Install all workspace dependencies
npm install

# Generate Prisma client
cd db
npm run prisma:generate
```

### 2. Database Setup

Ensure PostgreSQL is running, then:

```bash
# Run migrations
cd db
npx prisma migrate dev --name add_category_and_quiz_fields

# Seed the database with sample data
npm run seed
```

### 3. Environment Variables

**Frontend** (`frontend/.env.local`):
```bash
NEXT_PUBLIC_API_BASE=http://localhost:3001
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
```

**Backend** (`backend/express/.env`):
```bash
PORT=3001
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/gigildb"
NODE_ENV=development
```

**Database** (`db/.env`):
```bash
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/gigildb"
```

### 4. Start Development Servers

```bash
# From the root directory, start all services:
npm run dev
```

This starts:
- Frontend (Next.js) on http://localhost:3000
- Backend (Express) on http://localhost:3001
- Strapi CMS on http://localhost:1337

## 🎮 Using the Quiz

1. Visit http://localhost:3000
2. Click "Start the Gifting Quiz"
3. Answer 4 questions:
   - **Who is the gift for?** (him, her, kids, teen, anyone)
   - **What's your budget?** (under-25, 25-50, 50-100, 100-plus)
   - **What are their interests?** (tech, sports, arts, food, travel, etc.)
   - **What's the occasion?** (birthday, anniversary, holiday, thank-you, any)
4. View personalized recommendations

## 🧠 Business Logic

The gift filtering algorithm (`backend/express/src/services/giftService.ts`) works as follows:

### Filtering Rules
1. **Recipient Type**: Matches exactly OR includes "anyone"
2. **Budget/Price Range**: Must match exactly
3. **Interests**: Gift must have at least ONE matching interest
4. **Occasion** (optional): Gift supports the occasion OR "any"

### Match Scoring
- Perfect recipient match: +10 points
- "Anyone" recipient: +5 points
- Each matching interest: +5 points
- Exact occasion match: +10 points

Gifts are sorted by match score (highest first), and top matches are highlighted.

## 📊 Database Schema

### Category
```prisma
model Category {
  id          String   @id @default(cuid())
  name        String
  slug        String   @unique
  description String
  imageUrl    String?
  gifts       Gift[]
}
```

### Gift
```prisma
model Gift {
  id            String   @id @default(cuid())
  name          String
  description   String
  imageUrl      String?
  price         Float
  priceRange    String   // "under-25", "25-50", "50-100", "100-plus"
  categoryId    String
  category      Category @relation(...)
  recipientType String   // "him", "her", "kids", "teen", "anyone"
  interests     String[] // ["tech", "sports", "arts", etc.]
  occasion      String[] // ["birthday", "anniversary", etc.]
  url           String?
}
```

## 🎨 Design System

- **Primary Color**: Gigil Teal (`#005F56`)
- **Secondary Color**: Gigil Peach (`#FFCCAB`)
- **Framework**: TailwindCSS
- **Typography**: System font stack

## 🔧 API Endpoints

### POST /api/quiz
Submit quiz answers and get recommendations.

**Request Body**:
```json
{
  "recipient": "her",
  "budget": "50-100",
  "interests": ["fashion", "arts"],
  "occasion": "birthday"
}
```

**Response**:
```json
{
  "recommendations": [
    {
      "id": "...",
      "name": "Luxury Silk Scarf",
      "description": "...",
      "price": 65.00,
      "category": { "name": "Fashion", "slug": "fashion" },
      "matchScore": 25
    }
  ],
  "totalMatches": 1,
  "filters": { ... }
}
```

### GET /api/categories
Get all gift categories.

### GET /api/categories/:slug/gifts
Get all gifts in a specific category.

### GET /api/gifts/:id
Get a single gift by ID.

## 📝 Notes

- The seed script includes 18 sample gifts across 6 categories
- Images use Unsplash placeholders (update with real product images)
- Product URLs point to example.com (update with real product links)
- The quiz requires at least one interest to be selected
- Occasion is optional (defaults to "any")

## 🚢 Deployment

For production deployment:
1. Set `DATABASE_URL` to your production PostgreSQL instance
2. Set `NEXT_PUBLIC_API_BASE` to your production API URL
3. Run migrations: `npx prisma migrate deploy`
4. Seed production data: `npm run seed`
5. Build frontend: `cd frontend && npm run build`
6. Build backend: `cd backend/express && npm run build`

## 🎉 Success!

You now have a fully functional gifting quiz flow that:
- ✅ Has an attractive homepage
- ✅ Implements a multi-step quiz UI
- ✅ Uses backend business logic to filter gifts
- ✅ Displays personalized recommendations
- ✅ Stores data in PostgreSQL via Prisma
