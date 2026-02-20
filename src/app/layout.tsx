import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Las Vegas SEO & Marketing Agency | LeadMetrik',
  description: 'Las Vegas SEO company & digital marketing agency. We help local businesses get found, get leads, and dominate their market. Free marketing audit →',
  keywords: 'seo las vegas, las vegas seo, marketing agency las vegas, seo company las vegas, digital marketing las vegas, local seo las vegas, search engine optimization las vegas, las vegas marketing companies',
  openGraph: {
    title: 'Las Vegas SEO & Marketing Agency | LeadMetrik',
    description: 'Las Vegas SEO company & digital marketing agency. Get found. Get leads. Dominate your market.',
    type: 'website',
    locale: 'en_US',
    siteName: 'LeadMetrik',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Las Vegas SEO & Marketing Agency | LeadMetrik',
    description: 'Las Vegas SEO company & digital marketing agency. Get found. Get leads. Dominate your market.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-brand-dark text-white antialiased`}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
