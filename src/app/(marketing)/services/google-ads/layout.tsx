import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Google Ads Management Las Vegas | PPC Agency | Lead Metrik',
  description: 'Stop wasting money on Google Ads. Our Las Vegas PPC experts lower your cost per lead and increase conversions. Free Google Ads audit available.',
  keywords: [
    'google ads management las vegas',
    'ppc management las vegas',
    'google ads agency',
    'pay per click advertising',
    'ppc agency las vegas',
    'google ads expert',
    'adwords management',
    'ppc advertising services',
  ],
  openGraph: {
    title: 'Google Ads Management Las Vegas | Lead Metrik',
    description: 'Stop wasting money on Google Ads. Expert PPC management that delivers real ROI.',
    type: 'website',
    locale: 'en_US',
    url: 'https://leadmetrik.com/services/google-ads',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Google Ads Management Las Vegas',
    description: 'Stop wasting money on Google Ads. Expert PPC management that delivers real ROI.',
  },
  alternates: {
    canonical: 'https://leadmetrik.com/services/google-ads',
  },
}

export default function GoogleAdsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
