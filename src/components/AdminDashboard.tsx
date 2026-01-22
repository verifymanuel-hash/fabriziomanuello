'use client'

import { useState, useEffect } from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js'
import { Line, Bar } from 'react-chartjs-2'
import { useRouter } from 'next/navigation'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend)

interface AdminDashboardProps {
  onLogout: () => void
}

export const AdminDashboard = ({ onLogout }: AdminDashboardProps) => {
  const [activeTab, setActiveTab] = useState('overview')
  const [posts, setPosts] = useState([])
  const [stats, setStats] = useState({
    totalArticles: 0,
    totalViews: 0,
    totalLikes: 0,
  })
  const [showPostForm, setShowPostForm] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: 'tech',
    content: '',
    excerpt: '',
    author: 'Fabrizio Manuello',
    featuredImage: '',
    published: false,
  })
  const router = useRouter()

  useEffect(() => {
    loadPosts()
    loadStats()
  }, [])

  const loadPosts = async () => {
    try {
      const res = await fetch('/api/posts')
      const data = await res.json()
      setPosts(data.posts || [])
    } catch (error) {
      console.error('Error loading posts:', error)
    }
  }

  const loadStats = async () => {
    try {
      const res = await fetch('/api/analytics/stats')
      const data = await res.json()
      setStats(data)
    } catch (error) {
      console.error('Error loading stats:', error)
    }
  }

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (res.ok) {
        setFormData({
          title: '',
          slug: '',
          category: 'tech',
          content: '',
          excerpt: '',
          author: 'Fabrizio Manuello',
          featuredImage: '',
          published: false,
        })
        setShowPostForm(false)
        loadPosts()
        loadStats()
      }
    } catch (error) {
      console.error('Error creating post:', error)
    }
  }

  const handleDeletePost = async (postId: string) => {
    if (confirm('Are you sure you want to delete this post?')) {
      try {
        const res = await fetch(`/api/posts/${postId}`, { method: 'DELETE' })
        if (res.ok) {
          loadPosts()
          loadStats()
        }
      } catch (error) {
        console.error('Error deleting post:', error)
      }
    }
  }

  const chartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Views',
        data: [120, 190, 150, 170, 220, 250, 180],
        borderColor: '#d4af37',
        backgroundColor: 'rgba(212, 175, 55, 0.1)',
        tension: 0.4,
      },
    ],
  }

  const categoryChartData = {
    labels: ['Entertainment', 'Tech', 'Sports', 'Politics'],
    datasets: [
      {
        label: 'Posts per Category',
        data: [8, 12, 6, 5],
        backgroundColor: ['#ec4899', '#3b82f6', '#22c55e', '#a855f7'],
      },
    ],
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-blue text-white p-8 flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-light-gold">Manage your blog and view analytics</p>
        </div>
        <button
          onClick={onLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
        >
          Logout
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-8 overflow-x-auto">
            {['overview', 'posts', 'analytics'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-2 font-semibold border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab
                    ? 'border-royal-gold text-royal-gold'
                    : 'border-transparent text-gray-600 hover:text-deep-blue'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-gray-600 text-sm font-semibold mb-2">Total Articles</h3>
                <p className="text-4xl font-bold text-deep-blue">{stats.totalArticles}</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-gray-600 text-sm font-semibold mb-2">Total Views</h3>
                <p className="text-4xl font-bold text-royal-gold">{stats.totalViews}</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-gray-600 text-sm font-semibold mb-2">Total Likes</h3>
                <p className="text-4xl font-bold text-pink-600">{stats.totalLikes}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="font-bold text-deep-blue mb-4">Weekly Views</h3>
                <Line data={chartData} options={{ responsive: true, maintainAspectRatio: true }} />
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="font-bold text-deep-blue mb-4">Posts per Category</h3>
                <Bar data={categoryChartData} options={{ responsive: true, maintainAspectRatio: true }} />
              </div>
            </div>
          </div>
        )}

        {/* Posts Tab */}
        {activeTab === 'posts' && (
          <div className="space-y-6">
            <button
              onClick={() => setShowPostForm(!showPostForm)}
              className="bg-gradient-gold text-deep-blue px-6 py-3 font-bold rounded-lg hover:shadow-lg transition-shadow"
            >
              {showPostForm ? 'Cancel' : '+ Create New Post'}
            </button>

            {showPostForm && (
              <form onSubmit={handleCreatePost} className="bg-white p-8 rounded-lg shadow-md space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input
                    type="text"
                    placeholder="Post Title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-royal-gold"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Post Slug (URL-friendly)"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-royal-gold"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-royal-gold"
                  >
                    <option value="entertainment">Entertainment</option>
                    <option value="tech">Tech</option>
                    <option value="sports">Sports</option>
                    <option value="politics">Politics</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Featured Image URL"
                    value={formData.featuredImage}
                    onChange={(e) => setFormData({ ...formData, featuredImage: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-royal-gold"
                  />
                </div>

                <input
                  type="text"
                  placeholder="Post Excerpt"
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-royal-gold"
                  required
                />

                <textarea
                  placeholder="Post Content (Markdown supported)"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-royal-gold h-40"
                  required
                />

                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.published}
                      onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                      className="w-4 h-4"
                    />
                    <span className="font-semibold text-deep-blue">Publish immediately</span>
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-deep-blue text-white py-3 font-bold rounded-lg hover:shadow-lg transition-shadow"
                >
                  Create Post
                </button>
              </form>
            )}

            <div className="grid gap-6">
              {posts.map((post: any) => (
                <div key={post.id} className="bg-white p-6 rounded-lg shadow-md flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-deep-blue text-lg">{post.title}</h4>
                    <p className="text-gray-600 text-sm mt-1">{post.excerpt}</p>
                    <div className="flex gap-4 mt-3 text-xs">
                      <span className="bg-gray-100 px-2 py-1 rounded">
                        {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
                      </span>
                      <span className="text-gray-500">👁️ {post.views} views</span>
                      <span className="text-gray-500">❤️ {post.likes} likes</span>
                      <span className={`${post.published ? 'text-green-600' : 'text-orange-600'}`}>
                        {post.published ? '✓ Published' : '⏱️ Draft'}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => router.push(`/admin/edit/${post.id}`)}
                      className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeletePost(post.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="font-bold text-deep-blue text-xl mb-6">Detailed Analytics</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold text-deep-blue mb-4">Traffic Over Time</h4>
                  <Line data={chartData} />
                </div>
                <div>
                  <h4 className="font-semibold text-deep-blue mb-4">Content Distribution</h4>
                  <Bar data={categoryChartData} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
