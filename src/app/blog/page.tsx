'use client'

import { useState, useEffect } from 'react'
import { BlogCard } from '@/components/BlogCard'
import Link from 'next/link'

export default function BlogPage() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('all')

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const url = selectedCategory === 'all' 
          ? '/api/posts?limit=100' 
          : `/api/posts?category=${selectedCategory}&limit=100`
        const res = await fetch(url)
        const data = await res.json()
        setPosts(data.posts || [])
      } catch (error) {
        console.error('Error loading posts:', error)
      } finally {
        setLoading(false)
      }
    }
    loadPosts()
  }, [selectedCategory])

  const categories = [
    { name: 'All Posts', slug: 'all' },
    { name: 'Entertainment', slug: 'entertainment' },
    { name: 'Technology', slug: 'tech' },
    { name: 'Sports', slug: 'sports' },
    { name: 'Politics', slug: 'politics' },
  ]

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-deep-blue mb-4">All Articles</h1>
          <p className="text-gray-600 text-lg">
            Browse our complete collection of stories and insights
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-12 flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category.slug}
              onClick={() => setSelectedCategory(category.slug)}
              className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                selectedCategory === category.slug
                  ? 'bg-gradient-gold text-deep-blue shadow-lg'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Posts Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin">
              <div className="w-12 h-12 border-4 border-royal-gold border-t-deep-blue rounded-full"></div>
            </div>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No articles found in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post: any, index) => (
              <BlogCard key={post.id} post={post} index={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
