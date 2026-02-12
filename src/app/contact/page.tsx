'use client'

import { motion } from 'framer-motion'

export default function Contact() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative w-full bg-gradient-blue text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <h1 className="text-6xl md:text-7xl font-bold mb-6">Contact Us</h1>
            <p className="text-xl md:text-2xl opacity-95 max-w-2xl mx-auto">
              Get in touch with us. We'd love to hear from you!
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Details Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Email */}
          <motion.div
            className="bg-light-gold/10 p-8 rounded-xl border-2 border-royal-gold text-center"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="text-5xl mb-4">📧</div>
            <h2 className="text-2xl font-bold text-deep-blue mb-4">Email</h2>
            <a
              href="mailto:fabriziomanuello@gmail.com"
              className="text-xl text-royal-gold hover:text-deep-blue font-semibold transition-colors break-words"
            >
              fabriziomanuello@gmail.com
            </a>
          </motion.div>

          {/* Phone */}
          <motion.div
            className="bg-light-gold/10 p-8 rounded-xl border-2 border-royal-gold text-center"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="text-5xl mb-4">📱</div>
            <h2 className="text-2xl font-bold text-deep-blue mb-4">Phone</h2>
            <a
              href="tel:0553843255"
              className="text-xl text-royal-gold hover:text-deep-blue font-semibold transition-colors"
            >
              0553843255
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
