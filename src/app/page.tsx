'use client'

import { Hero } from '@/components/Hero'
import { BlogCard } from '@/components/BlogCard'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

const categories = []

const values = [
  { title: 'Quality', description: 'We deliver premium, well-researched content', icon: '⭐' },
  { title: 'Integrity', description: 'Double-checked facts and no clickbait', icon: '✅' },
  { title: 'Relevance', description: 'Stories that matter to you', icon: '🎯' },
  { title: 'Speed', description: 'Breaking news as it happens', icon: '⚡' },
  { title: 'Innovation', description: 'Using cutting-edge technology', icon: '🚀' },
]

export default function Home() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [carouselIndex, setCarouselIndex] = useState(0)

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const res = await fetch('/api/posts')
        const data = await res.json()
        setPosts(data.posts || [])
      } catch (error) {
        console.error('Error loading posts:', error)
      } finally {
        setLoading(false)
      }
    }
    loadPosts()
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  const nextSlide = () => {
    setCarouselIndex((prev) => (prev + 1) % posts.length)
  }

  const prevSlide = () => {
    setCarouselIndex((prev) => (prev - 1 + posts.length) % posts.length)
  }

  const getVisibleIndex = (offset: number) => (carouselIndex + offset) % posts.length

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <Hero />

      {/* Latest Posts - Carousel */}
      <motion.section 
        className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-0 pt-0"
        initial={{ y: 400, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          delay: 4.5,
          duration: 3.5,
          type: 'spring',
          stiffness: 50,
          damping: 30,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-deep-blue mb-2 sm:mb-4">Latest Stories</h2>
          <p className="text-gray-600 mb-8 sm:mb-12 text-sm sm:text-base md:text-lg">
            Discover our most recent articles and updates from around the world
          </p>
        </motion.div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin">
              <div className="w-12 h-12 border-4 border-royal-gold border-t-deep-blue rounded-full"></div>
            </div>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No articles yet. Check back soon!</p>
          </div>
        ) : (
          <div className="relative">
            {/* Carousel Container */}
            <div className="relative overflow-hidden">
              <motion.div
                className="flex gap-3 sm:gap-4 md:gap-6 will-change-transform"
                animate={{ x: -carouselIndex * (100 / 1.2) + '%' }}
                transition={{ type: 'spring', stiffness: 200, damping: 35, duration: 0.8 }}
              >
                {posts.map((post: any, index) => (
                  <div
                    key={post.id}
                    className="flex-shrink-0 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-12px)]"
                  >
                    <motion.div
                      className="h-full"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="h-full bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
                        {/* Featured Image */}
                        {post.featuredImage ? (
                          <div className="h-48 sm:h-56 md:h-72 bg-gradient-gold overflow-hidden">
                            <img
                              src={post.featuredImage}
                              alt={post.title}
                              className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                            />
                          </div>
                        ) : (
                          <div className="h-48 sm:h-56 md:h-72 bg-gradient-gold flex items-center justify-center">
                            <span className="text-white text-5xl">📰</span>
                          </div>
                        )}

                        {/* Content */}
                        <Link href={`/post/${post.slug}`}>
                          <div className="p-4 sm:p-6 cursor-pointer hover:bg-gray-50 transition-colors h-56 sm:h-72 md:h-80 flex flex-col">
                            {/* Category Badge */}
                            <div className="mb-2 sm:mb-3">
                              <span className={`inline-block px-2 sm:px-3 py-0.5 sm:py-1 text-xs font-semibold rounded-full ${
                                post.category === 'entertainment' ? 'bg-pink-100 text-pink-800' :
                                post.category === 'tech' ? 'bg-blue-100 text-blue-800' :
                                post.category === 'sports' ? 'bg-green-100 text-green-800' :
                                'bg-purple-100 text-purple-800'
                              }`}>
                                {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
                              </span>
                            </div>

                            {/* Title */}
                            <h3 className="text-sm sm:text-base md:text-lg font-bold text-deep-blue mb-2 line-clamp-2">
                              {post.title}
                            </h3>

                            {/* Excerpt - First 7 lines equivalent */}
                            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed line-clamp-4 mb-auto">
                              {post.excerpt || post.content.substring(0, 150)}
                            </p>

                            {/* Meta */}
                            <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-gray-200 text-xs text-gray-500 mt-auto">
                              <span>By {post.author}</span>
                              <div className="flex gap-2 sm:gap-3">
                                <span>👁️ {post.views || 0}</span>
                                <span>❤️ {post.likes || 0}</span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </div>
                    </motion.div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Carousel Controls */}
            {posts.length > 3 && (
              <div className="flex gap-3 sm:gap-4 justify-center mt-6 sm:mt-8">
                <button
                  onClick={prevSlide}
                  className="p-2 sm:p-3 bg-deep-blue text-white rounded-full hover:shadow-lg transition-shadow text-sm sm:text-base"
                  aria-label="Previous slide"
                >
                  ←
                </button>
                <div className="flex gap-1.5 sm:gap-2 items-center">
                  {posts.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCarouselIndex(index)}
                      className={`h-1.5 sm:h-2 rounded-full transition-all ${
                        index === carouselIndex
                          ? 'bg-royal-gold w-6 sm:w-8'
                          : 'bg-gray-300 w-1.5 sm:w-2 hover:bg-gray-400'
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
                <button
                  onClick={nextSlide}
                  className="p-2 sm:p-3 bg-deep-blue text-white rounded-full hover:shadow-lg transition-shadow text-sm sm:text-base"
                  aria-label="Next slide"
                >
                  →
                </button>
              </div>
            )}

            {posts.length > 6 && (
              <motion.div
                className="text-center mt-12"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Link
                  href="/blog"
                  className="inline-block px-8 py-3 bg-gradient-gold text-deep-blue font-bold rounded-lg hover:shadow-lg transition-shadow"
                >
                  View All Articles
                </Link>
              </motion.div>
            )}
          </div>
        )}
      </motion.section>
    </div>
  )
}
