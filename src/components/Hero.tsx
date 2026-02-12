'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState, useEffect } from 'react'

export const Hero = () => {
  const [showHero, setShowHero] = useState(true)
  const [hideBackground, setHideBackground] = useState(false)

  useEffect(() => {
    // Start vanishing everything after 1.5s (drop down) + 5s (visible) = 6.5s
    const timer1 = setTimeout(() => {
      setHideBackground(true)
    }, 6500)

    // Hide hero completely after vanish animation (2s) completes
    const timer2 = setTimeout(() => {
      setShowHero(false)
    }, 8500)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
    }
  }, [])

  if (!showHero) {
    return null
  }

  return (
    <motion.section
      className="relative w-full text-white overflow-hidden pt-20 sm:pt-32 md:pt-44 lg:pt-56 pb-0"
      initial={{ y: -150, opacity: 0 }}
      animate={{ y: showHero ? 0 : 0, opacity: 1 }}
      transition={{ 
        type: 'spring',
        stiffness: 50,
        damping: 30,
        duration: 1.5,
      }}
      style={{ 
        overflow: 'hidden',
      }}
      animate={{ opacity: hideBackground ? 0 : 1 }}
      transition={{ duration: 2, ease: 'easeInOut' }}
    >
      {/* Animated Background - Vanish with opacity */}
      <motion.div
        className="absolute inset-0 bg-gradient-blue overflow-hidden"
        animate={{ opacity: hideBackground ? 0 : 1 }}
        transition={{ duration: 2, ease: 'easeInOut' }}
        style={{ pointerEvents: hideBackground ? 'none' : 'auto' }}
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
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
        </div>
      </motion.div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-16 md:gap-32 lg:gap-48 items-center w-full">
          {/* Left Content */}
          <motion.div
            className="space-y-4 z-10"
            initial={{ opacity: 0, y: -50 }}
            animate={{ y: 0, opacity: hideBackground ? 0 : (showHero ? 1 : 0) }}
            transition={{ 
              type: hideBackground ? 'tween' : 'spring',
              stiffness: hideBackground ? undefined : 50,
              damping: hideBackground ? undefined : 30,
              duration: hideBackground ? 2 : 1.5,
              ease: hideBackground ? 'easeInOut' : undefined,
            }}
          >
            <div>
              <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold mb-2 sm:mb-3">
                Fabrizio Manuello
              </h1>
              <p className="text-base sm:text-lg md:text-2xl lg:text-3xl opacity-95 leading-relaxed max-w-xl">
                Discover fascinating stories from around the world
              </p>
            </div>
          </motion.div>

          {/* Right Content - Background Image */}
          <motion.div
            className="relative flex items-center justify-center w-full"
            initial={{ opacity: 0, y: -100 }}
            animate={{ y: 0, opacity: hideBackground ? 0 : (showHero ? 1 : 0) }}
            transition={{ 
              type: hideBackground ? 'tween' : 'spring',
              stiffness: hideBackground ? undefined : 50,
              damping: hideBackground ? undefined : 30,
              duration: hideBackground ? 2 : 1.5,
              ease: hideBackground ? 'easeInOut' : undefined,
            }}
          >
            <Image
              src="/images/Background-4.png"
              alt="Background"
              width={3600}
              height={2400}
              className="w-full h-auto object-contain drop-shadow-2xl scale-150"
              priority
            />
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}
