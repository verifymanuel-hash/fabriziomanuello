import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import '@/styles/globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Fabrizio Manuello - International Blog',
  description: 'Stories from around the world covering Entertainment, Tech, Sports, and Politics',
  keywords: 'blog, entertainment, technology, sports, politics',
  authors: [{ name: 'Fabrizio Manuello' }],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#1e3a8a" />
      </head>
      <body className="bg-white">
        <Navigation />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
