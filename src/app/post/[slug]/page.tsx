'use client'

import { useState, useEffect } from 'react'
import { use } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const [post, setPost] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [liked, setLiked] = useState(false)

  useEffect(() => {
    const loadPost = async () => {
      try {
        // Search through posts to find matching slug
        const res = await fetch('/api/posts?limit=100')
        const data = await res.json()
        const foundPost = data.posts?.find((p: any) => p.slug === slug)
        
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
  }, [slug])

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
      className="min-h-screen bg-gradient-to-b from-gray-50 to-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Featured Image - Full Width & Tall */}
      {post.featuredImage && (
        <div className="w-full h-screen bg-gradient-gold overflow-hidden relative">
          <img
            src={post.featuredImage}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
            <div className="w-full p-8 md:p-16 text-white">
              <div className="max-w-4xl">
                <span className="inline-block bg-royal-gold text-deep-blue px-4 py-2 rounded-full font-bold mb-4">
                  {post.category.toUpperCase()}
                </span>
                <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight">
                  {post.title}
                </h1>
                <p className="text-xl md:text-2xl text-gray-100 mb-4">
                  {post.excerpt}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Content Card */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Meta Info - Much Larger & Clearer */}
        <div className="mb-16 pb-12 border-b-2 border-gray-300">
          <div className="space-y-6">
            {/* Author Section */}
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-gold flex items-center justify-center text-2xl">
                👤
              </div>
              <div>
                <p className="text-sm text-gray-500">Written by</p>
                <p className="text-3xl font-bold text-deep-blue">{post.author}</p>
              </div>
            </div>

            {/* Date Section */}
            <div className="flex items-center gap-4">
              <div className="text-4xl">📅</div>
              <div>
                <p className="text-sm text-gray-500">Published</p>
                <p className="text-2xl font-semibold text-deep-blue">
                  {post.createdAt ? new Date(post.createdAt).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  }) : 'Date unknown'}
                </p>
              </div>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-2 md:grid-cols-2 gap-6 mt-8">
              <div className="bg-blue-50 rounded-lg p-6 border-l-4 border-blue-500">
                <p className="text-sm text-gray-600 mb-2">Total Views</p>
                <p className="text-4xl font-bold text-deep-blue flex items-center gap-2">
                  👁️ {post.views || 0}
                </p>
              </div>
              <div className="bg-pink-50 rounded-lg p-6 border-l-4 border-pink-500">
                <p className="text-sm text-gray-600 mb-2">Likes</p>
                <button
                  onClick={handleLike}
                  className={`text-4xl font-bold flex items-center gap-2 transition-colors ${
                    liked
                      ? 'text-red-500 cursor-not-allowed'
                      : 'text-gray-700 hover:text-red-500 cursor-pointer'
                  }`}
                  disabled={liked}
                >
                  ❤️ {post.likes || 0}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Body */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="prose prose-lg max-w-none">
            {post.content.split('\n').map((paragraph: string, index: number) => (
              paragraph.trim() && (
                <p key={index} className="text-gray-700 leading-relaxed text-lg mb-6">
                  {paragraph}
                </p>
              )
            ))}
          </div>
        </motion.div>

        {/* Additional Images */}
        {post.additionalImages && post.additionalImages.length > 0 && (
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold text-deep-blue mb-6">Gallery</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {post.additionalImages.map((image: string, index: number) => (
                <div key={index} className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                  <img
                    src={image}
                    alt={`Gallery ${index + 1}`}
                    className="w-full h-64 object-cover"
                  />
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Conclusion */}
        {post.conclusion && (
          <motion.div
            className="bg-gradient-blue text-white p-8 rounded-lg mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold mb-4">Conclusion</h3>
            <p className="text-lg leading-relaxed">
              {post.conclusion}
            </p>
          </motion.div>
        )}

        {/* External Link */}
        {post.externalUrl && (
          <motion.div
            className="bg-yellow-50 border-2 border-royal-gold rounded-lg p-6 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <p className="text-gray-700 mb-4 font-semibold">Read more on external source:</p>
            <a
              href={post.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-deep-blue text-white font-bold rounded-lg hover:shadow-lg transition-shadow"
            >
              🔗 Visit Article
            </a>
          </motion.div>
        )}

        {/* Footer */}
        <div className="border-t-2 border-deep-blue pt-8">
          <div className="mb-8">
            <h3 className="text-xl font-bold text-deep-blue mb-4">Share This Article</h3>
            <div className="flex gap-4">
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:shadow-lg transition-shadow font-semibold"
              >
                Twitter
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:shadow-lg transition-shadow font-semibold"
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
