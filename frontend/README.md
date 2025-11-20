# GIGIL Frontend

A luxury gifting platform built with Next.js 14, TypeScript, and Tailwind CSS.

## 🚀 Quick Start

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```
   NEXT_PUBLIC_STRAPI_API_URL=http://localhost:1337
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎨 Design System

### Colors
- **Primary BG**: #F9F5F0 (cream)
- **Secondary BG**: #FAFAF8 (off-white)
- **Text Primary**: #005F56 (deep teal)
- **Accent**: #FFCAB0 (soft peach)
- **Border**: #E8E3DC (light warm neutral)
- **Dark Text**: #2D2D2D
- **Light Text**: #FFFFFF

### Typography
- **Headlines**: Playfair Display (serif)
- **Body**: Inter (sans-serif)

### Spacing
8px base system (xs: 4px, sm: 8px, md: 16px, lg: 24px, xl: 32px, 2xl: 48px, 3xl: 64px)

## 📁 Project Structure

```
app/
├── page.tsx                 # Homepage
├── layout.tsx              # Root layout
├── globals.css             # Global styles
├── blog/                   # Blog pages
├── gifts/                  # Gifts pages
├── quiz/                   # AI Quiz page
├── about/                  # About page
└── contact/                # Contact page

components/
├── layout/                 # Layout components
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   └── Container.tsx
├── sections/               # Page sections
│   ├── Hero.tsx
│   ├── GiftGrid.tsx
│   ├── BlogShowcase.tsx
│   ├── AITeaser.tsx
│   ├── About.tsx
│   └── Contact.tsx
└── ui/                     # Reusable UI components
    ├── Button.tsx
    ├── Card.tsx
    ├── GiftCard.tsx
    └── BlogCard.tsx

lib/
├── strapiClient.ts         # Strapi API client
├── animations.ts           # Framer Motion animations
├── cn.ts                   # Utility functions
└── sampleData.ts           # Sample data for testing
```

## 🎬 Component Specifications

### GiftCard Component
- **Props**: id, title, image, category, priceRange, description
- **Features**: 4:3 aspect ratio, hover effects, category badges
- **Animations**: Fade-in-up on scroll, scale on hover

### BlogCard Component
- **Props**: id, title, image, excerpt, slug, publishedAt
- **Features**: 1200x630 aspect ratio, 2-line excerpt clamp
- **Animations**: Fade-in-up on scroll, scale on hover

### Button Component
- **Variants**: primary, secondary, ghost
- **Sizes**: sm, md, lg
- **Features**: Hover effects, accessibility support

## 🔗 Strapi Integration

The app is configured to work with Strapi CMS. Make sure your Strapi backend is running on `http://localhost:1337`.

### Required Content Types
- **Gifts**: title, description, image, category, price, slug
- **Blog Posts**: title, content, excerpt, featuredImage, slug, publishedAt
- **Categories**: name, slug, description

## 📱 Responsive Design

- **Mobile**: 0-767px (1 column, 48px headlines)
- **Tablet**: 768-1023px (2 columns, 56px headlines)
- **Desktop**: 1024px+ (3-4 columns, 64px headlines)

## ♿ Accessibility

- Semantic HTML structure
- ARIA labels on interactive elements
- Keyboard navigation support
- Color contrast compliance
- Alt text on all images

## 🎯 Performance

- Next.js Image optimization
- Code splitting by route
- Lazy loading
- Optimized animations
- Lighthouse score targets: 95+ desktop, 85+ mobile

## 🛠️ Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Code Style
- TypeScript for type safety
- Tailwind CSS for styling
- Framer Motion for animations
- ESLint for code quality

## 📄 License

This project is part of the GIGIL luxury gifting platform.









