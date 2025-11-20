import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
})

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap'
})

export const metadata: Metadata = {
  title: 'GIGIL - Luxury Gifting Platform',
  description: 'Discover the perfect gift for every moment. Curated experiences that create lasting memories.',
  keywords: ['gifts', 'luxury', 'experiences', 'curated', 'millennials'],
  authors: [{ name: 'GIGIL Team' }],
  openGraph: {
    title: 'GIGIL - Luxury Gifting Platform',
    description: 'Discover the perfect gift for every moment. Curated experiences that create lasting memories.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GIGIL - Luxury Gifting Platform',
    description: 'Discover the perfect gift for every moment. Curated experiences that create lasting memories.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-inter antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}

