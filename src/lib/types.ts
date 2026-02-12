export interface BlogPost {
  id: string
  title: string
  slug: string
  category: 'entertainment' | 'tech' | 'sports' | 'politics'
  content: string
  excerpt: string
  author: string
  featuredImage: string
  additionalImages?: string[]
  externalUrl?: string
  conclusion?: string
  createdAt: Date
  updatedAt: Date
  views: number
  likes: number
  published: boolean
}

export interface Category {
  id: string
  name: string
  slug: string
  description: string
  icon: string
  color: string
}

export interface Analytics {
  totalViews: number
  totalPosts: number
  categoryCounts: Record<string, number>
  recentPosts: BlogPost[]
  topPosts: BlogPost[]
  dailyViews: { date: string; views: number }[]
}

export interface AdminStats {
  totalArticles: number
  totalViews: number
  totalLikes: number
  avgViewsPerArticle: number
  postsPerCategory: Record<string, number>
  lastUpdated: Date
}
