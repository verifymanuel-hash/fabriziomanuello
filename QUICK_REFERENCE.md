# Quick Reference Guide

## 🎯 Common Tasks

### Create a Blog Post

1. Go to [http://localhost:3000/admin](http://localhost:3000/admin)
2. Click **"+ Create New Post"**
3. Fill in:
   - Title: Your article headline
   - Slug: `my-article-slug` (lowercase, hyphens)
   - Category: Choose one
   - Content: Write your article
   - Featured Image: (optional) Image URL
4. Check **"Publish immediately"** if ready to go live
5. Click **"Create Post"**

### Edit a Post

1. Go to [http://localhost:3000/admin](http://localhost:3000/admin)
2. Find the post in the Posts tab
3. Click **"Edit"**
4. Make changes
5. Click **"Update Post"**

### Delete a Post

1. Go to [http://localhost:3000/admin](http://localhost:3000/admin)
2. Find the post in the Posts tab
3. Click **"Delete"**
4. Confirm deletion

### View Analytics

1. Go to [http://localhost:3000/admin](http://localhost:3000/admin)
2. Click **"Analytics"** tab
3. View charts and statistics

---

## 🔗 Important URLs

| URL | Purpose |
|-----|---------|
| `http://localhost:3000` | Homepage |
| `http://localhost:3000/blog` | All posts |
| `http://localhost:3000/admin` | Admin dashboard |
| `http://localhost:3000/category/tech` | Tech posts |
| `http://localhost:3000/category/entertainment` | Entertainment posts |
| `http://localhost:3000/category/sports` | Sports posts |
| `http://localhost:3000/category/politics` | Politics posts |

---

## 📁 Key Files to Know

| File | What it Does |
|------|-------------|
| `src/app/page.tsx` | Homepage |
| `src/app/admin/page.tsx` | Admin dashboard |
| `src/components/Navigation.tsx` | Header/menu |
| `src/app/api/posts/route.ts` | Post API endpoints |
| `tailwind.config.ts` | Colors and design |
| `.env.local` | Firebase settings |

---

## 🎨 Customize Colors

Edit `tailwind.config.ts`:

```typescript
colors: {
  'deep-blue': '#1e3a8a',      // Primary
  'royal-gold': '#d4af37',     // Accent
  'light-gold': '#f0e5d8',     // Secondary
  'dark-blue': '#0f172a',      // Text
}
```

Common color codes:
- Blue shades: `#1e3a8a`, `#3b82f6`, `#0f172a`
- Gold shades: `#d4af37`, `#f0e5d8`
- Greens: `#22c55e`, `#10b981`
- Reds: `#ef4444`, `#dc2626`

---

## 📝 Markdown Tips

Write posts with formatting:

```
# Heading 1
## Heading 2
### Heading 3

**Bold text**
*Italic text*

- Bullet point
- Another point

1. Numbered item
2. Another item

> Quote or emphasis
```

---

## 🚀 Common Commands

```bash
# Start development
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Check for errors
npm run lint
```

---

## 🔐 Environment Variables

Copy these from Firebase into `.env.local`:

```
NEXT_PUBLIC_FIREBASE_API_KEY=xxx
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=xxx.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=xxx
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=xxx.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=xxx
NEXT_PUBLIC_FIREBASE_APP_ID=xxx
```

**Never commit `.env.local` to Git!**

---

## 📱 Mobile Optimization

The blog automatically adapts:
- **Mobile**: 1 column, full-width
- **Tablet**: 2 columns
- **Desktop**: 3 columns + sidebar

Test on mobile:
1. Open DevTools (F12)
2. Click device toggle (mobile phone icon)
3. Test different screen sizes

---

## 🐛 Troubleshooting

### Posts not showing?
1. Check if posts are published
2. Verify Firestore connection
3. Check `.env.local` has correct Firebase credentials

### Admin page blank?
1. Hard refresh (Ctrl+Shift+R)
2. Check browser console for errors
3. Ensure npm packages installed: `npm install`

### Can't create posts?
1. Check Firestore security rules allow writes
2. Verify Firebase project ID is correct
3. Check browser console for errors

### Slow loading?
1. Posts limit is 50, reduce with `?limit=10`
2. Optimize image sizes
3. Check Firebase queries in console

---

## 📞 Need Help?

1. Check [SETUP.md](SETUP.md) for detailed guides
2. Check [API.md](API.md) for API reference
3. Check [PROJECT_OVERVIEW.md](PROJECT_OVERVIEW.md) for architecture
4. Check browser console (F12) for errors

---

## ✅ Checklist for Going Live

- [ ] Firebase project created
- [ ] `.env.local` configured
- [ ] Firestore database enabled
- [ ] Security rules updated
- [ ] First blog post created
- [ ] Admin dashboard tested
- [ ] Categories have posts
- [ ] Footer links working
- [ ] Mobile view tested
- [ ] Domain/hosting set up

---

## 🎓 Learning Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Firebase Docs](https://firebase.google.com/docs)
- [Tailwind Docs](https://tailwindcss.com/docs)
- [React Docs](https://react.dev)

---

**Happy blogging! 🚀**
