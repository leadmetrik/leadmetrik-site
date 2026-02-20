import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Lead Metrik | Las Vegas Digital Marketing Agency',
  description: 'We help local businesses dominate Google. SEO, Google Ads, websites, and social media — all done for you. Get your free audit today.',
  keywords: 'las vegas digital marketing, local seo las vegas, google ads management, website design las vegas, social media marketing',
  openGraph: {
    title: 'Lead Metrik | Las Vegas Digital Marketing Agency',
    description: 'We help local businesses dominate Google. Get your free audit today.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Lead Metrik',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lead Metrik | Las Vegas Digital Marketing Agency',
    description: 'We help local businesses dominate Google. Get your free audit today.',
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
