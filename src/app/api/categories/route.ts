import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/firebase'
import { collection, getDocs, query, where } from 'firebase/firestore'

const POSTS_COLLECTION = 'posts'
const CATEGORIES = ['entertainment', 'tech', 'sports', 'politics']

// GET categories
export async function GET(request: NextRequest) {
  try {
    const categoriesData = []

    for (const category of CATEGORIES) {
      const q = query(
        collection(db, POSTS_COLLECTION),
        where('category', '==', category),
        where('published', '==', true)
      )
      const snapshot = await getDocs(q)
      const count = snapshot.size

      categoriesData.push({
        id: category,
        name: category.charAt(0).toUpperCase() + category.slice(1),
        slug: category,
        count,
      })
    }

    return NextResponse.json(categoriesData)
  } catch (error) {
    console.error('Error fetching categories:', error)
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 })
  }
}
