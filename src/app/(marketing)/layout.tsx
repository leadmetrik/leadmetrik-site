import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

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

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="bg-brand-dark text-white min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
