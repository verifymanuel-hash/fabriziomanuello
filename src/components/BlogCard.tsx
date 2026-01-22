'use client'

import Link from 'next/link'
import { BlogPost } from '@/lib/types'
import { motion } from 'framer-motion'

interface BlogCardProps {
  post: BlogPost
  index?: number
}

const categoryColors = {
  entertainment: 'bg-pink-100 text-pink-800',
  tech: 'bg-blue-100 text-blue-800',
  sports: 'bg-green-100 text-green-800',
  politics: 'bg-purple-100 text-purple-800',
}

export const BlogCard = ({ post, index = 0 }: BlogCardProps) => {
  const categoryColor = categoryColors[post.category as keyof typeof categoryColors] || 'bg-gray-100 text-gray-800'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="h-full"
    >
      <Link href={`/post/${post.slug}`}>
        <article className="h-full bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer group">
          {/* Image Container */}
          <div className="relative h-48 bg-gradient-gold overflow-hidden">
            {post.featuredImage ? (
              <img
                src={post.featuredImage}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            ) : (
              <div className="w-full h-full bg-gradient-gold flex items-center justify-center">
                <span className="text-white text-4xl">📰</span>
              </div>
            )}
            <div className="absolute top-4 right-4">
              <span className={`px-3 py-1 text-xs font-semibold rounded-full ${categoryColor}`}>
                {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 flex flex-col justify-between h-full">
            <div>
              <h3 className="text-xl font-bold text-deep-blue mb-2 line-clamp-2 group-hover:text-royal-gold transition-colors">
                {post.title}
              </h3>
              <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                {post.excerpt}
              </p>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between text-sm">
              <div className="text-gray-500">
                <p>By <span className="font-semibold text-deep-blue">{post.author}</span></p>
              </div>
              <div className="flex items-center space-x-3 text-royal-gold font-semibold">
                <span className="flex items-center gap-1">
                  <span>👁️</span> {post.views}
                </span>
                <span className="flex items-center gap-1">
                  <span>❤️</span> {post.likes}
                </span>
              </div>
            </div>
          </div>
        </article>
      </Link>
    </motion.div>
  )
}
