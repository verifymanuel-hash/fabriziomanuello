'use client'

import { useState, useEffect } from 'react'
import { use } from 'react'
import { BlogCard } from '@/components/BlogCard'
import Link from 'next/link'

export default function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category: categoryParam } = use(params)
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [category, setCategory] = useState('')

  useEffect(() => {
    const categoryName = categoryParam.toLowerCase()
    setCategory(categoryName)

    const loadPosts = async () => {
      try {
        const res = await fetch(`/api/posts?category=${categoryName}`)
        const data = await res.json()
        setPosts(data.posts || [])
      } catch (error) {
        console.error('Error loading posts:', error)
      } finally {
        setLoading(false)
      }
    }

    loadPosts()
  }, [categoryParam])

  const categoryDisplay = category.charAt(0).toUpperCase() + category.slice(1)

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-blue text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">{categoryDisplay}</h1>
          <p className="text-light-gold text-lg">
            Explore all {categoryDisplay.toLowerCase()} articles
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin">
              <div className="w-12 h-12 border-4 border-royal-gold border-t-deep-blue rounded-full"></div>
            </div>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600 mb-6">
              No articles found in the {categoryDisplay} category yet.
            </p>
            <Link
              href="/"
              className="inline-block px-6 py-3 bg-deep-blue text-white font-bold rounded-lg hover:shadow-lg transition-shadow"
            >
              Back to Home
            </Link>
          </div>
        ) : (
          <>
            <p className="text-gray-600 mb-8">
              {posts.length} article{posts.length !== 1 ? 's' : ''} found
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post: any, index) => (
                <BlogCard key={post.id} post={post} index={index} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
