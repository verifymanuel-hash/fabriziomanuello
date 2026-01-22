'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export const Hero = () => {
  return (
    <section className="relative w-full bg-gradient-blue text-white overflow-hidden py-24">
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

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            className="space-y-8 z-10 -translate-x-32"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <div>
              <h1 className="text-6xl md:text-8xl font-bold mb-6">
                Fabrizio Manuello
              </h1>
              <p className="text-xl md:text-3xl opacity-95 leading-relaxed max-w-xl">
                Discover fascinating stories from around the world
              </p>
            </div>
          </motion.div>

          {/* Right Content - Background Image */}
          <motion.div
            className="relative h-screen lg:h-full flex items-center justify-center"
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
          >
            <Image
              src="/images/Background-4.png"
              alt="Background"
              width={3600}
              height={2400}
              className="w-full h-auto object-contain drop-shadow-2xl scale-150 translate-x-32"
              priority
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
