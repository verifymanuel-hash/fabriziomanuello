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
  const [formStep, setFormStep] = useState('headline')
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: 'tech',
    content: '',
    excerpt: '',
    author: 'Fabrizio Manuello',
    featuredImage: '',
    additionalImages: [] as string[],
    externalUrl: '',
    conclusion: '',
    published: true,
  })
  const router = useRouter()

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, field: 'featuredImage' | 'additionalImages') => {
    const file = e.target.files?.[0]
    if (file) {
      // Compress image before converting to base64
      const img = new Image()
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      
      const reader = new FileReader()
      reader.onloadend = () => {
        img.src = reader.result as string
        img.onload = () => {
          let width = img.width
          let height = img.height
          
          // Reduce size if larger than 800px
          if (width > 800 || height > 800) {
            const ratio = width > height ? 800 / width : 800 / height
            width = width * ratio
            height = height * ratio
          }
          
          canvas.width = width
          canvas.height = height
          ctx?.drawImage(img, 0, 0, width, height)
          
          const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7)
          
          if (field === 'featuredImage') {
            setFormData({ ...formData, featuredImage: compressedBase64 })
          } else {
            setFormData({ ...formData, additionalImages: [...formData.additionalImages, compressedBase64] })
          }
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const removeAdditionalImage = (index: number) => {
    setFormData({
      ...formData,
      additionalImages: formData.additionalImages.filter((_, i) => i !== index),
    })
  }

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
      if (!formData.title || !formData.slug || !formData.category || !formData.content) {
        alert('❌ Please fill in: Headline, URL Slug, Category, and Body')
        return
      }

      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formData.title,
          slug: formData.slug,
          category: formData.category,
          content: formData.content,
          excerpt: formData.excerpt,
          author: formData.author,
          featuredImage: formData.featuredImage,
          additionalImages: formData.additionalImages,
          externalUrl: formData.externalUrl,
          conclusion: formData.conclusion,
          published: formData.published,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        alert(`❌ Error: ${data.error || 'Failed to publish post'}`)
        return
      }

      alert('✅ Post published successfully!')
      setFormData({
        title: '',
        slug: '',
        category: 'tech',
        content: '',
        excerpt: '',
        author: 'Fabrizio Manuello',
        featuredImage: '',
        additionalImages: [],
        externalUrl: '',
        conclusion: '',
        published: true,
      })
      setFormStep('headline')
      setShowPostForm(false)
      loadPosts()
      loadStats()
    } catch (error) {
      console.error('Error creating post:', error)
      alert('❌ Network error. Check console for details.')
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
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
                  {/* Form Section */}
                  <div className="lg:col-span-2 p-8 border-r border-gray-200">
                    <form onSubmit={handleCreatePost} className="space-y-6">
                      {/* Step Tabs */}
                      <div className="flex gap-2 mb-8 border-b border-gray-200 overflow-x-auto">
                        {[
                          { id: 'headline', label: 'Headline' },
                          { id: 'body', label: 'Body' },
                          { id: 'images', label: 'Images' },
                          { id: 'external', label: 'External Link' },
                          { id: 'conclusion', label: 'Conclusion' },
                        ].map((step) => (
                          <button
                            key={step.id}
                            type="button"
                            onClick={() => setFormStep(step.id)}
                            className={`px-4 py-2 font-semibold border-b-2 transition-colors whitespace-nowrap ${
                              formStep === step.id
                                ? 'border-royal-gold text-royal-gold'
                                : 'border-transparent text-gray-600 hover:text-deep-blue'
                            }`}
                          >
                            {step.label}
                          </button>
                        ))}
                      </div>

                      {/* Headline Section */}
                      {formStep === 'headline' && (
                        <div className="space-y-6">
                          <div>
                            <label className="block text-sm font-semibold text-deep-blue mb-2">Featured Image</label>
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-royal-gold transition-colors cursor-pointer"
                              onClick={() => document.getElementById('featured-image-input')?.click()}
                            >
                              {formData.featuredImage ? (
                                <div className="space-y-4">
                                  <img src={formData.featuredImage} alt="Preview" className="w-full h-40 object-cover rounded" />
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      setFormData({ ...formData, featuredImage: '' })
                                    }}
                                    className="text-red-600 hover:text-red-800 font-semibold"
                                  >
                                    Remove Image
                                  </button>
                                </div>
                              ) : (
                                <div>
                                  <p className="text-2xl mb-2">📸</p>
                                  <p className="text-gray-600 font-semibold">Click to upload headline image</p>
                                  <p className="text-gray-400 text-sm mt-1">PNG, JPG up to 10MB</p>
                                </div>
                              )}
                            </div>
                            <input
                              id="featured-image-input"
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleImageUpload(e, 'featuredImage')}
                              className="hidden"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-semibold text-deep-blue mb-2">
                              Headline / Post Title
                              <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              placeholder="Enter your post headline here"
                              value={formData.title}
                              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-royal-gold text-lg font-semibold"
                              required
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-semibold text-deep-blue mb-2">Post Slug (URL)</label>
                            <input
                              type="text"
                              placeholder="my-post-slug"
                              value={formData.slug}
                              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-royal-gold"
                              required
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-semibold text-deep-blue mb-2">Category</label>
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
                            </div>
                            <div>
                              <label className="block text-sm font-semibold text-deep-blue mb-2">Quick Excerpt</label>
                              <input
                                type="text"
                                placeholder="Brief preview text"
                                value={formData.excerpt}
                                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-royal-gold"
                                required
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Body Section */}
                      {formStep === 'body' && (
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-semibold text-deep-blue mb-2">
                              Body / Description
                              <span className="text-red-500">*</span>
                            </label>
                            <p className="text-xs text-gray-500 mb-2">Markdown formatting supported</p>
                            <textarea
                              placeholder="Write your post content here... Use # for headings, **bold**, *italic*, etc."
                              value={formData.content}
                              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-royal-gold h-64 font-mono text-sm"
                              required
                            />
                          </div>
                        </div>
                      )}

                      {/* Images Section */}
                      {formStep === 'images' && (
                        <div className="space-y-6">
                          <div>
                            <label className="block text-sm font-semibold text-deep-blue mb-4">Additional Images / Videos</label>
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-royal-gold transition-colors cursor-pointer"
                              onClick={() => document.getElementById('additional-images-input')?.click()}
                            >
                              <p className="text-2xl mb-2">🎬</p>
                              <p className="text-gray-600 font-semibold">Click to add more images</p>
                              <p className="text-gray-400 text-sm mt-1">Optional - Add support images or video thumbnails</p>
                            </div>
                            <input
                              id="additional-images-input"
                              type="file"
                              accept="image/*"
                              multiple
                              onChange={(e) => {
                                const files = e.target.files
                                if (files) {
                                  Array.from(files).forEach((file) => {
                                    const img = new Image()
                                    const canvas = document.createElement('canvas')
                                    const ctx = canvas.getContext('2d')
                                    
                                    const reader = new FileReader()
                                    reader.onloadend = () => {
                                      img.src = reader.result as string
                                      img.onload = () => {
                                        let width = img.width
                                        let height = img.height
                                        
                                        if (width > 800 || height > 800) {
                                          const ratio = width > height ? 800 / width : 800 / height
                                          width = width * ratio
                                          height = height * ratio
                                        }
                                        
                                        canvas.width = width
                                        canvas.height = height
                                        ctx?.drawImage(img, 0, 0, width, height)
                                        
                                        const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7)
                                        setFormData({
                                          ...formData,
                                          additionalImages: [...formData.additionalImages, compressedBase64],
                                        })
                                      }
                                    }
                                    reader.readAsDataURL(file)
                                  })
                                }
                              }}
                              className="hidden"
                            />
                          </div>

                          {formData.additionalImages.length > 0 && (
                            <div>
                              <label className="text-sm font-semibold text-deep-blue mb-3 block">Uploaded Images</label>
                              <div className="grid grid-cols-2 gap-4">
                                {formData.additionalImages.map((img, idx) => (
                                  <div key={idx} className="relative">
                                    <img src={img} alt="Additional" className="w-full h-24 object-cover rounded" />
                                    <button
                                      type="button"
                                      onClick={() => removeAdditionalImage(idx)}
                                      className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-700"
                                    >
                                      ✕
                                    </button>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* External Link Section */}
                      {formStep === 'external' && (
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-semibold text-deep-blue mb-2">External Post URL (Optional)</label>
                            <p className="text-xs text-gray-500 mb-2">Link to external website or resource</p>
                            <input
                              type="url"
                              placeholder="https://example.com/post"
                              value={formData.externalUrl}
                              onChange={(e) => setFormData({ ...formData, externalUrl: e.target.value })}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-royal-gold"
                            />
                          </div>
                        </div>
                      )}

                      {/* Conclusion Section */}
                      {formStep === 'conclusion' && (
                        <div className="space-y-6">
                          <div>
                            <label className="block text-sm font-semibold text-deep-blue mb-2">Conclusion (Optional)</label>
                            <textarea
                              placeholder="Wrap up your post with a conclusion or call-to-action..."
                              value={formData.conclusion}
                              onChange={(e) => setFormData({ ...formData, conclusion: e.target.value })}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-royal-gold h-32"
                            />
                          </div>

                          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <label className="flex items-center gap-3 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={formData.published}
                                onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                                className="w-5 h-5"
                              />
                              <span className="font-semibold text-deep-blue">Publish immediately</span>
                            </label>
                            <p className="text-sm text-gray-600 mt-2 ml-8">
                              {formData.published ? '✓ Post will be visible on the blog' : '⏱️ Post will be saved as draft'}
                            </p>
                          </div>

                          <button
                            type="submit"
                            className="w-full bg-gradient-gold text-deep-blue py-3 font-bold rounded-lg hover:shadow-lg transition-shadow text-lg"
                          >
                            📝 Publish Post
                          </button>
                        </div>
                      )}
                    </form>
                  </div>

                  {/* Preview Section */}
                  <div className="lg:col-span-1 p-8 bg-gray-50">
                    <h3 className="font-bold text-deep-blue mb-4">📱 Live Preview</h3>
                    <div className="bg-white rounded-lg overflow-hidden shadow-md">
                      {formData.featuredImage && (
                        <img src={formData.featuredImage} alt="Preview" className="w-full h-32 object-cover" />
                      )}
                      <div className="p-4">
                        {formData.title && (
                          <h2 className="font-bold text-lg text-deep-blue mb-2 line-clamp-2">{formData.title}</h2>
                        )}
                        {formData.excerpt && (
                          <p className="text-gray-600 text-sm mb-3 line-clamp-3">{formData.excerpt}</p>
                        )}
                        <div className="flex gap-2 flex-wrap">
                          <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                            formData.category === 'entertainment' ? 'bg-pink-100 text-pink-800' :
                            formData.category === 'tech' ? 'bg-blue-100 text-blue-800' :
                            formData.category === 'sports' ? 'bg-green-100 text-green-800' :
                            'bg-purple-100 text-purple-800'
                          }`}>
                            {formData.category.charAt(0).toUpperCase() + formData.category.slice(1)}
                          </span>
                          <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                            formData.published
                              ? 'bg-green-100 text-green-800'
                              : 'bg-orange-100 text-orange-800'
                          }`}>
                            {formData.published ? '✓ Published' : '⏱️ Draft'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
