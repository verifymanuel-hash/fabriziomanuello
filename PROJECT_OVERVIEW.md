# Manuello Blog - Project Overview

## 🎯 Project Summary

A modern, international blog platform built with Next.js, React, and Firebase. Features a beautiful UI with white, deep blue, and royal gold color scheme, complete with an admin dashboard for content management and analytics.

## 📁 Project Structure

```
manuello-blog/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── posts/
│   │   │   │   ├── route.ts          # POST/GET all posts
│   │   │   │   └── [id]/route.ts     # GET/PUT/DELETE specific post
│   │   │   ├── analytics/
│   │   │   │   └── stats/route.ts    # Analytics tracking
│   │   │   └── categories/route.ts   # Category data
│   │   ├── admin/
│   │   │   └── page.tsx              # Admin dashboard
│   │   ├── blog/
│   │   │   └── page.tsx              # All blog posts
│   │   ├── category/
│   │   │   └── [category]/page.tsx   # Category-specific posts
│   │   ├── post/
│   │   │   └── [slug]/page.tsx       # Individual post view
│   │   ├── layout.tsx                # Root layout
│   │   └── page.tsx                  # Home page
│   ├── components/
│   │   ├── Navigation.tsx            # Header navigation
│   │   ├── Hero.tsx                  # Landing hero section
│   │   ├── BlogCard.tsx              # Blog post card component
│   │   ├── AdminDashboard.tsx        # Admin panel
│   │   └── Footer.tsx                # Footer
│   ├── lib/
│   │   ├── firebase.ts               # Firebase config
│   │   ├── types.ts                  # TypeScript interfaces
│   │   └── api.ts                    # API helper functions
│   └── styles/
│       └── globals.css               # Global styles & animations
├── public/                           # Static assets
├── .env.example                      # Environment template
├── .gitignore                        # Git ignore rules
├── package.json                      # Dependencies
├── tsconfig.json                     # TypeScript config
├── tailwind.config.ts                # Tailwind theming
├── next.config.js                    # Next.js config
├── README.md                         # Project readme
├── SETUP.md                          # Setup guide
└── this-file.md                      # This overview
```

## 🎨 Color Scheme

- **White (#FFFFFF)**: Primary background
- **Deep Blue (#1e3a8a)**: Primary color, text
- **Royal Gold (#d4af37)**: Accent, highlights
- **Light Gold (#f0e5d8)**: Secondary accent
- **Dark Blue (#0f172a)**: Dark text

## 🔑 Key Features

### Frontend
- ✨ Modern, responsive design
- 📱 Mobile-first approach
- 🎬 Smooth animations with Framer Motion
- 🌐 Multi-category blog support
- 📊 View and like counters
- 🔗 Social sharing integration

### Admin Portal
- 📝 Create/Edit/Delete posts
- 📈 Real-time analytics dashboard
- 📊 Visual charts and statistics
- 📋 Posts per category breakdown
- 👁️ Traffic monitoring
- ❤️ Engagement metrics

### Backend APIs
- `/api/posts` - Get/Create posts
- `/api/posts/[id]` - Get/Update/Delete specific post
- `/api/analytics/stats` - Track views and likes
- `/api/categories` - Get category data

### Database (Firestore)
Collections:
- `posts` - Blog articles
- `analytics` - Visitor statistics

## 🚀 Tech Stack

- **Frontend Framework**: Next.js 15
- **UI Library**: React 18
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Database**: Firebase Firestore
- **Analytics**: Firebase Analytics
- **Charts**: Chart.js & react-chartjs-2
- **HTTP Client**: Axios

## 📖 Categories

1. **Entertainment** - Movies, music, culture, events
2. **Technology** - Tech news, programming, innovation
3. **Sports** - Athletic news, scores, analysis
4. **Politics** - Political commentary, news, analysis

## 🌍 Pages

| Route | Purpose |
|-------|---------|
| `/` | Homepage with hero and latest posts |
| `/blog` | All blog posts with category filter |
| `/category/[category]` | Category-specific posts |
| `/post/[slug]` | Individual post view |
| `/admin` | Admin dashboard |

## 📡 API Endpoints

### Posts
- `GET /api/posts` - Get all published posts (with optional filters)
- `POST /api/posts` - Create new post
- `GET /api/posts/[id]` - Get specific post
- `PUT /api/posts/[id]` - Update post
- `DELETE /api/posts/[id]` - Delete post

### Analytics
- `GET /api/analytics/stats` - Get statistics
- `POST /api/analytics/stats` - Track views/likes

### Categories
- `GET /api/categories` - Get all categories with counts

## 🔧 Configuration

### Environment Variables
All required in `.env.local`:
```
NEXT_PUBLIC_FIREBASE_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
NEXT_PUBLIC_FIREBASE_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID
NEXT_PUBLIC_API_URL
```

### Customize Theme
Edit `tailwind.config.ts` to modify colors and styling

### Add Custom Pages
Create new files in `src/app/` following Next.js conventions

## 📱 Responsive Design

- **Mobile**: Full-width, stacked layout
- **Tablet**: 2-column grids
- **Desktop**: 3-column grids with sidebar
- **Large Screens**: Full layout with constraints

## ♿ Accessibility

- Semantic HTML
- ARIA labels where needed
- Keyboard navigation support
- Color contrast compliant
- Mobile touch-friendly buttons

## 🎭 Future Enhancement Ideas

- User authentication
- Comments system
- Search functionality
- Dark mode toggle
- Newsletter subscription
- Email notifications
- Advanced analytics
- SEO optimization
- Image optimization
- Video embeds
- Code syntax highlighting
- Reading time estimation

## 📦 Dependencies Summary

### Core
- `next` - React framework
- `react`, `react-dom` - UI library

### Data & State
- `firebase` - Backend services
- `axios` - HTTP requests

### UI & Styling
- `tailwindcss` - CSS framework
- `framer-motion` - Animations
- `chart.js`, `react-chartjs-2` - Charts

### Dev Tools
- `typescript` - Type safety
- `eslint` - Code quality
- `autoprefixer`, `postcss` - CSS processing

## 🚢 Deployment Ready

The project is configured for:
- ✅ Vercel (recommended)
- ✅ Firebase Hosting
- ✅ Netlify
- ✅ Traditional Node servers

## 📚 Documentation Files

- [README.md](README.md) - Project overview
- [SETUP.md](SETUP.md) - Detailed setup instructions
- [this file](PROJECT_OVERVIEW.md) - Project structure and info

## 🤝 Contributing

No external contributors yet. Maintained by Fabrizio Manuello.

## 📄 License

© 2026 Fabrizio Manuello. All rights reserved.

---

**Ready to start blogging? Follow the [SETUP.md](SETUP.md) guide!**
