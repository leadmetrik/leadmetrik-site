import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Las Vegas Local SEO Services | Get Found on Google Maps | Lead Metrik',
  description: 'Dominate local search in Las Vegas. Our local SEO services help businesses rank higher on Google Maps, get more calls, and grow revenue. Free SEO audit available.',
  keywords: [
    'local seo las vegas',
    'las vegas seo services',
    'google business profile optimization',
    'local seo services',
    'seo company las vegas',
    'google maps seo',
    'local search optimization',
    'small business seo las vegas',
  ],
  openGraph: {
    title: 'Las Vegas Local SEO Services | Lead Metrik',
    description: 'Dominate local search in Las Vegas. Rank higher on Google Maps and get more customers.',
    type: 'website',
    locale: 'en_US',
    url: 'https://leadmetrik.com/services/local-seo',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Las Vegas Local SEO Services',
    description: 'Dominate local search in Las Vegas. Rank higher on Google Maps and get more customers.',
  },
  alternates: {
    canonical: 'https://leadmetrik.com/services/local-seo',
  },
}

export default function LocalSEOLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
