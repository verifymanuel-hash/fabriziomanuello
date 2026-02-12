'use client'

import Link from 'next/link'

export const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-deep-blue text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <div>
              <div className="font-bold text-lg">Fabrizio</div>
              <div className="font-bold text-lg">Manuello Blog</div>
            </div>
            <p className="text-light-gold text-sm">
              International stories from around the world
            </p>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-bold mb-4 text-royal-gold">Categories</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/category/entertainment" className="hover:text-royal-gold transition-colors">
                  Entertainment
                </Link>
              </li>
              <li>
                <Link href="/category/tech" className="hover:text-royal-gold transition-colors">
                  Technology
                </Link>
              </li>
              <li>
                <Link href="/category/sports" className="hover:text-royal-gold transition-colors">
                  Sports
                </Link>
              </li>
              <li>
                <Link href="/category/politics" className="hover:text-royal-gold transition-colors">
                  Politics
                </Link>
              </li>
            </ul>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-bold mb-4 text-royal-gold">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-royal-gold transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-royal-gold transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-royal-gold transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-bold mb-4 text-royal-gold">Newsletter</h4>
            <p className="text-sm text-light-gold mb-4">
              Subscribe to get latest stories
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-3 py-2 rounded bg-white/10 text-white placeholder-light-gold text-sm outline-none focus:bg-white/20 transition-colors"
              />
              <button className="px-4 py-2 bg-royal-gold text-deep-blue font-semibold rounded hover:shadow-lg transition-shadow text-sm">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-light-gold">
            <p>© {currentYear} Fabrizio Manuello. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-royal-gold transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-royal-gold transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
