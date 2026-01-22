import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'deep-blue': '#1e3a8a',
        'royal-gold': '#d4af37',
        'light-gold': '#f0e5d8',
        'dark-blue': '#0f172a',
      },
      backgroundImage: {
        'gradient-gold': 'linear-gradient(135deg, #d4af37 0%, #f0e5d8 100%)',
        'gradient-blue': 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
      },
    },
  },
  plugins: [],
}
export default config
