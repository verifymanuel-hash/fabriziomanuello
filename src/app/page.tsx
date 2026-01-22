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

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <Hero />



      {/* Latest Posts */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-deep-blue mb-4">Latest Stories</h2>
          <p className="text-gray-600 mb-12 text-lg">
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
          <>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {posts.slice(0, 6).map((post: any, index) => (
                <motion.div key={post.id} variants={itemVariants}>
                  <BlogCard post={post} index={index} />
                </motion.div>
              ))}
            </motion.div>

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
          </>
        )}
      </section>
    </div>
  )
}
