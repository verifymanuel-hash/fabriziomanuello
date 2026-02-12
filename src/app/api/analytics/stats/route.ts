import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/firebase'
import { collection, query, where, orderBy, getDocs, increment, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'

const POSTS_COLLECTION = 'posts'
const ANALYTICS_COLLECTION = 'analytics'

// GET analytics stats
export async function GET(request: NextRequest) {
  try {
    const postsQuery = query(
      collection(db, POSTS_COLLECTION),
      where('published', '==', true)
    )
    const postsSnapshot = await getDocs(postsQuery)
    const posts = postsSnapshot.docs.map((doc) => doc.data())

    const stats = {
      totalArticles: posts.length,
      totalViews: posts.reduce((sum: number, post: any) => sum + (post.views || 0), 0),
      totalLikes: posts.reduce((sum: number, post: any) => sum + (post.likes || 0), 0),
      avgViewsPerArticle: posts.length > 0 ? Math.round(
        posts.reduce((sum: number, post: any) => sum + (post.views || 0), 0) / posts.length
      ) : 0,
      postsPerCategory: {
        entertainment: posts.filter((p: any) => p.category === 'entertainment').length,
        tech: posts.filter((p: any) => p.category === 'tech').length,
        sports: posts.filter((p: any) => p.category === 'sports').length,
        politics: posts.filter((p: any) => p.category === 'politics').length,
      },
      lastUpdated: new Date(),
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error('Error fetching analytics:', error)
    return NextResponse.json(
      {
        totalArticles: 0,
        totalViews: 0,
        totalLikes: 0,
        avgViewsPerArticle: 0,
        postsPerCategory: { entertainment: 0, tech: 0, sports: 0, politics: 0 },
        lastUpdated: new Date(),
      },
      { status: 500 }
    )
  }
}

// POST track view
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { postId, action } = body

    if (!postId) {
      return NextResponse.json({ error: 'postId required' }, { status: 400 })
    }

    const postRef = doc(db, POSTS_COLLECTION, postId)

    if (action === 'view') {
      await updateDoc(postRef, { views: increment(1) })
    } else if (action === 'like') {
      await updateDoc(postRef, { likes: increment(1) })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error tracking analytics:', error)
    return NextResponse.json({ error: 'Failed to track action' }, { status: 500 })
  }
}
