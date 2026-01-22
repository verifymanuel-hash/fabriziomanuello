import { db } from './firebase'
import { collection, query, where, orderBy, limit, getDocs, doc, getDoc, setDoc, updateDoc, deleteDoc, increment } from 'firebase/firestore'
import { BlogPost, Analytics } from './types'

const POSTS_COLLECTION = 'posts'
const ANALYTICS_COLLECTION = 'analytics'
const CATEGORIES = ['entertainment', 'tech', 'sports', 'politics']

// Blog Posts
export const getPosts = async (category?: string, limitCount = 10) => {
  try {
    let q
    if (category && CATEGORIES.includes(category)) {
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
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as BlogPost[]
  } catch (error) {
    console.error('Error fetching posts:', error)
    return []
  }
}

export const getPostBySlug = async (slug: string) => {
  try {
    const q = query(collection(db, POSTS_COLLECTION), where('slug', '==', slug))
    const snapshot = await getDocs(q)
    if (snapshot.empty) return null
    return { id: snapshot.docs[0].id, ...snapshot.docs[0].data() } as BlogPost
  } catch (error) {
    console.error('Error fetching post:', error)
    return null
  }
}

export const createPost = async (post: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt' | 'views' | 'likes'>) => {
  try {
    const newPost = {
      ...post,
      createdAt: new Date(),
      updatedAt: new Date(),
      views: 0,
      likes: 0,
    }
    const docRef = await setDoc(doc(collection(db, POSTS_COLLECTION)), newPost)
    return { id: docRef.id, ...newPost }
  } catch (error) {
    console.error('Error creating post:', error)
    throw error
  }
}

export const updatePost = async (postId: string, updates: Partial<BlogPost>) => {
  try {
    const postRef = doc(db, POSTS_COLLECTION, postId)
    await updateDoc(postRef, { ...updates, updatedAt: new Date() })
    return true
  } catch (error) {
    console.error('Error updating post:', error)
    throw error
  }
}

export const deletePost = async (postId: string) => {
  try {
    await deleteDoc(doc(db, POSTS_COLLECTION, postId))
    return true
  } catch (error) {
    console.error('Error deleting post:', error)
    throw error
  }
}

export const incrementPostViews = async (postId: string) => {
  try {
    const postRef = doc(db, POSTS_COLLECTION, postId)
    await updateDoc(postRef, { views: increment(1) })
  } catch (error) {
    console.error('Error incrementing views:', error)
  }
}

export const likePost = async (postId: string) => {
  try {
    const postRef = doc(db, POSTS_COLLECTION, postId)
    await updateDoc(postRef, { likes: increment(1) })
  } catch (error) {
    console.error('Error liking post:', error)
  }
}

// Analytics
export const getAnalytics = async (): Promise<Analytics | null> => {
  try {
    const analyticsRef = doc(db, ANALYTICS_COLLECTION, 'global')
    const snapshot = await getDoc(analyticsRef)
    return snapshot.exists() ? (snapshot.data() as Analytics) : null
  } catch (error) {
    console.error('Error fetching analytics:', error)
    return null
  }
}

export const updateAnalytics = async (updates: Partial<Analytics>) => {
  try {
    const analyticsRef = doc(db, ANALYTICS_COLLECTION, 'global')
    await updateDoc(analyticsRef, updates)
  } catch (error) {
    console.error('Error updating analytics:', error)
  }
}
