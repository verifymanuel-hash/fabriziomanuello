'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface AdminLoginProps {
  onLoginSuccess: () => void
}

export const AdminLogin = ({ onLoginSuccess }: AdminLoginProps) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const CORRECT_EMAIL = 'fotsiemmanuel397@gmail.com'
  const CORRECT_PASSWORD = 'Bulletman123123@'

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // Simulate API call delay
    setTimeout(() => {
      if (email === CORRECT_EMAIL && password === CORRECT_PASSWORD) {
        // Store login state in localStorage
        localStorage.setItem('adminLoggedIn', 'true')
        localStorage.setItem('adminEmail', email)
        onLoginSuccess()
      } else {
        setError('Invalid email or password')
      }
      setLoading(false)
    }, 500)
  }

  return (
    <div className="min-h-screen bg-gradient-blue flex items-center justify-center px-4">
      {/* Background Elements */}
      <motion.div
        className="absolute top-10 left-10 w-64 h-64 bg-royal-gold opacity-10 rounded-full blur-3xl"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-80 h-80 bg-light-gold opacity-5 rounded-full blur-3xl"
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      {/* Login Card */}
      <motion.div
        className="relative bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md"
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-deep-blue mb-2">
            Admin Login
          </h1>
          <p className="text-gray-600">
            Fabrizio Manuello Dashboard
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {/* Email Input */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <label className="block text-sm font-semibold text-deep-blue mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-3 border-2 border-deep-blue rounded-lg focus:outline-none focus:border-royal-gold focus:ring-2 focus:ring-royal-gold/20 transition-all duration-300"
              disabled={loading}
            />
          </motion.div>

          {/* Password Input */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <label className="block text-sm font-semibold text-deep-blue mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-3 border-2 border-deep-blue rounded-lg focus:outline-none focus:border-royal-gold focus:ring-2 focus:ring-royal-gold/20 transition-all duration-300"
              disabled={loading}
            />
          </motion.div>

          {/* Error Message */}
          {error && (
            <motion.div
              className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {error}
            </motion.div>
          )}

          {/* Login Button */}
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gradient-gold text-deep-blue font-bold py-3 rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="animate-spin">
                  <div className="w-5 h-5 border-2 border-deep-blue border-t-royal-gold rounded-full"></div>
                </div>
                Logging in...
              </>
            ) : (
              'Login to Dashboard'
            )}
          </motion.button>
        </form>

        {/* Footer Info */}
        <div className="mt-6 p-4 bg-light-gold/20 rounded-lg text-center">
          <p className="text-xs text-gray-600">
            🔒 Secure admin access only
          </p>
        </div>
      </motion.div>
    </div>
  )
}
