# Manuello Blog - Setup Instructions

Welcome to the Fabrizio Manuello Blog Platform! Follow these steps to get your blog up and running.

## 📋 Prerequisites

- **Node.js 18+** - Download from [nodejs.org](https://nodejs.org)
- **npm** (comes with Node.js)
- **Firebase Account** (free at [firebase.google.com](https://firebase.google.com))
- **Text Editor** - VS Code recommended

## 🚀 Step 1: Install Dependencies

Open a terminal in your project directory and run:

```bash
npm install
```

This will install all required packages including Next.js, Firebase, Tailwind CSS, and chart libraries.

## 🔥 Step 2: Set Up Firebase

### 2.1 Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click **"Create a project"**
3. Enter project name: `manuello-blog`
4. Choose your region
5. Click **"Create project"**

### 2.2 Create a Web App

1. In Firebase Console, click the web icon (`</>`)
2. Register app name as `manuello-blog`
3. Copy the Firebase config object
4. Keep this tab open - you'll need it in the next step

### 2.3 Enable Firestore Database

1. In Firebase Console, go to **Firestore Database**
2. Click **"Create database"**
3. Choose **"Start in production mode"**
4. Select your region and click **"Enable"**

### 2.4 Update Security Rules

1. In Firestore, click **"Rules"** tab
2. Replace all content with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read: if true;
      allow write: if true;
    }
  }
}
```

Click **"Publish"**

⚠️ **Note:** These are open rules for development. For production, restrict write access appropriately.

### 2.5 Configure Environment Variables

1. In your project root, create a `.env.local` file:

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

NEXT_PUBLIC_API_URL=http://localhost:3000
```

Replace all values with your Firebase config from Step 2.2

## 🎨 Step 3: Customize Your Blog

### 3.1 Update Site Metadata

Edit [src/app/layout.tsx](src/app/layout.tsx):
- Change title and description to your preference

### 3.2 Customize Colors

Edit [tailwind.config.ts](tailwind.config.ts) to adjust:
- Deep Blue: `#1e3a8a`
- Royal Gold: `#d4af37`
- Light Gold: `#f0e5d8`

### 3.3 Add Your Content

Add sample blog posts via the Admin Portal

## 📱 Step 4: Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser

## 🎯 Step 5: Access Admin Portal

1. Navigate to [http://localhost:3000/admin](http://localhost:3000/admin)
2. Click **"+ Create New Post"**
3. Fill in the post details:
   - **Title**: Your article title
   - **Slug**: URL-friendly version (e.g., `my-first-post`)
   - **Category**: Choose from Entertainment, Tech, Sports, Politics
   - **Content**: Write your article
   - **Excerpt**: Brief summary (auto-filled from content)
   - **Featured Image**: Image URL (optional)
   - **Publish immediately**: Check to go live

4. Click **"Create Post"**

## 📊 Features Overview

### Blog Frontend
- **Home Page**: Hero section with category shortcuts and latest posts
- **Category Pages**: `/category/[category]` for filtered posts
- **Blog Listing**: `/blog` for all posts with filtering
- **Individual Posts**: `/post/[slug]` with view counter and like button

### Admin Dashboard
- **Overview Tab**: Key statistics and charts
- **Posts Tab**: Create, edit, delete blog posts
- **Analytics Tab**: Detailed traffic and performance metrics

### Automatic Features
- ✅ View tracking on post opens
- ✅ Like counter per post
- ✅ Category filtering and sorting
- ✅ Responsive design for mobile, tablet, desktop
- ✅ Share buttons (Twitter, Facebook)
- ✅ SEO-friendly URLs

## 🌐 Deploying to Production

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click **"New Project"**
4. Import your GitHub repository
5. Add environment variables (from `.env.local`)
6. Click **"Deploy"**

Your blog is now live!

### Deploy to Other Platforms

Update Firebase rules from **"production mode"** to allow proper authentication based on your deployment.

## 🔐 Security Considerations for Production

Before going live, update your Firestore rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Anyone can read posts
    match /posts/{document=**} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update, delete: if request.auth.uid == resource.data.authorId;
    }
    
    // Only authenticated users can write analytics
    match /analytics/{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

## 📚 Useful Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)

## ❓ Troubleshooting

### Firebase Connection Issues
- Verify `.env.local` has correct credentials
- Check Firestore is enabled in Firebase Console
- Ensure security rules allow reads

### Build Errors
```bash
npm run lint
npm run build
```

### Port Already in Use
```bash
npm run dev -- -p 3001
```

## 📝 Next Steps

1. ✅ Complete setup following steps above
2. ✅ Create sample blog posts
3. ✅ Test categories and filtering
4. ✅ Monitor analytics dashboard
5. ✅ Deploy to production
6. ✅ Share with your audience!

---

**Happy blogging! 🎉**

For questions or support, reach out through the blog contact section.
