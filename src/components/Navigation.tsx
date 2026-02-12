'use client'

import Link from 'next/link'
import { useState } from 'react'
import Image from 'next/image'

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)

  const categories = [
    { name: 'Entertainment', slug: 'entertainment' },
    { name: 'Tech', slug: 'tech' },
    { name: 'Sports', slug: 'sports' },
    { name: 'Politics', slug: 'politics' },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-white border-b-2 border-deep-blue shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <div className="relative w-28 h-28 transform group-hover:scale-110 transition-transform duration-300">
              <Image
                src="/images/Manuello-logo.png"
                alt="Manuello Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/category/${category.slug}`}
                className="px-4 py-2 text-deep-blue font-semibold hover:text-royal-gold transition-colors duration-200 relative group"
              >
                {category.name}
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-royal-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </Link>
            ))}
            <Link
              href="/contact"
              className="px-4 py-2 text-deep-blue font-semibold hover:text-royal-gold transition-colors duration-200 relative group"
            >
              Contact Us
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-royal-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-deep-blue hover:bg-light-gold rounded-lg transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden pb-4 border-t border-deep-blue">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/category/${category.slug}`}
                className="block px-4 py-3 text-deep-blue font-semibold hover:bg-light-gold transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {category.name}
              </Link>
            ))}
            <Link
              href="/contact"
              className="block px-4 py-3 text-deep-blue font-semibold hover:bg-light-gold transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Contact Us
            </Link>

          </div>
        )}
      </div>
    </nav>
  )
}
