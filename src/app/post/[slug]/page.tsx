'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function PostPage({ params }: { params: { slug: string } }) {
  const [post, setPost] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [liked, setLiked] = useState(false)

  useEffect(() => {
    const loadPost = async () => {
      try {
        // Search through posts to find matching slug
        const res = await fetch('/api/posts?limit=100')
        const data = await res.json()
        const foundPost = data.posts?.find((p: any) => p.slug === params.slug)
        
        if (foundPost) {
          setPost(foundPost)
          // Track view
          try {
            await fetch('/api/analytics/stats', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ postId: foundPost.id, action: 'view' }),
            })
          } catch (error) {
            console.error('Error tracking view:', error)
          }
        }
      } catch (error) {
        console.error('Error loading post:', error)
      } finally {
        setLoading(false)
      }
    }

    loadPost()
  }, [params.slug])

  const handleLike = async () => {
    if (!post || liked) return

    try {
      await fetch('/api/analytics/stats', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId: post.id, action: 'like' }),
      })
      setPost({ ...post, likes: (post.likes || 0) + 1 })
      setLiked(true)
    } catch (error) {
      console.error('Error liking post:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="inline-block animate-spin">
          <div className="w-12 h-12 border-4 border-royal-gold border-t-deep-blue rounded-full"></div>
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h1 className="text-4xl font-bold text-deep-blue mb-6">Article Not Found</h1>
          <p className="text-gray-600 mb-8 text-lg">The article you're looking for doesn't exist.</p>
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-deep-blue text-white font-bold rounded-lg hover:shadow-lg transition-shadow"
          >
            Back to Home
          </Link>
        </div>
      </div>
    )
  }

  const categoryColors: { [key: string]: string } = {
    entertainment: 'text-pink-600',
    tech: 'text-blue-600',
    sports: 'text-green-600',
    politics: 'text-purple-600',
  }

  return (
    <motion.div
      className="min-h-screen bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Featured Image */}
      {post.featuredImage && (
        <div className="w-full h-96 bg-gradient-gold overflow-hidden">
          <img
            src={post.featuredImage}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Content */}
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <span className={`text-sm font-bold ${categoryColors[post.category as keyof typeof categoryColors] || 'text-gray-600'}`}>
              {post.category.toUpperCase()}
            </span>
            <span className="text-sm text-gray-500">
              {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : 'Date unknown'}
            </span>
          </div>

          <h1 className="text-5xl font-bold text-deep-blue mb-4 leading-tight">
            {post.title}
          </h1>

          <p className="text-xl text-gray-600 mb-6 leading-relaxed">
            {post.excerpt}
          </p>

          <div className="flex items-center justify-between border-t border-b border-gray-200 py-4">
            <div className="text-gray-700">
              <p className="font-semibold text-deep-blue">By {post.author}</p>
            </div>
            <div className="flex items-center gap-6 text-lg">
              <span className="flex items-center gap-2 text-gray-600">
                👁️ <span className="font-semibold">{post.views || 0}</span> views
              </span>
              <button
                onClick={handleLike}
                className={`flex items-center gap-2 font-semibold transition-colors ${
                  liked
                    ? 'text-red-500 cursor-not-allowed'
                    : 'text-gray-600 hover:text-red-500 cursor-pointer'
                }`}
                disabled={liked}
              >
                ❤️ <span>{post.likes || 0}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Body */}
        <motion.div
          className="prose prose-lg max-w-none mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {post.content.split('\n\n').map((paragraph: string, index: number) => (
            <p key={index} className="text-gray-700 leading-relaxed text-lg mb-6">
              {paragraph}
            </p>
          ))}
        </motion.div>

        {/* Footer */}
        <div className="border-t-2 border-deep-blue pt-8">
          <div className="mb-8">
            <h3 className="text-xl font-bold text-deep-blue mb-4">Share This Article</h3>
            <div className="flex gap-4">
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:shadow-lg transition-shadow"
              >
                Twitter
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:shadow-lg transition-shadow"
              >
                Facebook
              </a>
            </div>
          </div>

          <Link
            href="/"
            className="inline-block px-6 py-3 bg-deep-blue text-white font-bold rounded-lg hover:shadow-lg transition-shadow"
          >
            ← Back to Home
          </Link>
        </div>
      </article>
    </motion.div>
  )
}
