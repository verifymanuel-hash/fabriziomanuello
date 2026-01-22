'use client'

import { AdminDashboard } from '@/components/AdminDashboard'
import { AdminLogin } from '@/components/AdminLogin'
import { useEffect, useState } from 'react'

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is already logged in
    const loggedIn = localStorage.getItem('adminLoggedIn') === 'true'
    setIsLoggedIn(loggedIn)
    setLoading(false)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn')
    localStorage.removeItem('adminEmail')
    setIsLoggedIn(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-blue flex items-center justify-center">
        <div className="animate-spin">
          <div className="w-12 h-12 border-4 border-light-gold border-t-royal-gold rounded-full"></div>
        </div>
      </div>
    )
  }

  if (!isLoggedIn) {
    return <AdminLogin onLoginSuccess={() => setIsLoggedIn(true)} />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminDashboard onLogout={handleLogout} />
    </div>
  )
}
