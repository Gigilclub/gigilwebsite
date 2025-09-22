Gigil Monorepo
================

Apps:
- `frontend` (Next.js 14, TailwindCSS)
- `backend/express` (Express.js gifting API)
- `backend/strapi` (Strapi CMS for Blog)

Note: Strapi v4+ does not support MongoDB. This repo uses Postgres for Strapi and Prisma. If MongoDB is a hard requirement, we must pin to Strapi v3 (EOL) or reconsider.

Quick start
- `npm i`
- `cp .env.example .env` and fill values
- `npm run dev`


