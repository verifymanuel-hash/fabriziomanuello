import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/firebase'
import { collection, query, where, orderBy, limit, getDocs, doc, setDoc, updateDoc, deleteDoc, increment } from 'firebase/firestore'
import { BlogPost } from '@/lib/types'

const POSTS_COLLECTION = 'posts'

// GET all posts (with optional filters)
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const category = searchParams.get('category')
    const limitCount = parseInt(searchParams.get('limit') || '50')

    let q
    if (category) {
      q = query(
        collection(db, POSTS_COLLECTION),
        where('category', '==', category),
        where('published', '==', true),
        orderBy('createdAt', 'desc'),
        limit(limitCount)
      )
    } else {
      q = query(
        collection(db, POSTS_COLLECTION),
        where('published', '==', true),
        orderBy('createdAt', 'desc'),
        limit(limitCount)
      )
    }

    const snapshot = await getDocs(q)
    const posts = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate?.() || new Date(),
      updatedAt: doc.data().updatedAt?.toDate?.() || new Date(),
    })) as BlogPost[]

    return NextResponse.json({ posts, total: posts.length })
  } catch (error) {
    console.error('Error fetching posts:', error)
    return NextResponse.json({ error: 'Failed to fetch posts', posts: [] }, { status: 500 })
  }
}

// POST create new post
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      title,
      slug,
      category,
      content,
      excerpt,
      author,
      featuredImage,
      published = false,
    } = body

    if (!title || !slug || !category || !content) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const newPost: any = {
      title,
      slug,
      category,
      content,
      excerpt: excerpt || content.substring(0, 150),
      author: author || 'Fabrizio Manuello',
      featuredImage: featuredImage || '',
      published,
      views: 0,
      likes: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const docRef = doc(collection(db, POSTS_COLLECTION))
    await setDoc(docRef, newPost)

    return NextResponse.json({ id: docRef.id, ...newPost }, { status: 201 })
  } catch (error) {
    console.error('Error creating post:', error)
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 })
  }
}
