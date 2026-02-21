import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Social Media Marketing Las Vegas | Social Media Agency | LeadMetrik',
  description: 'Las Vegas social media marketing agency. We handle content creation, community management, and paid ads on Instagram, Facebook, TikTok & LinkedIn. No contracts. Get your free social media audit today.',
  keywords: [
    'social media marketing las vegas',
    'social media agency las vegas',
    'social media management las vegas',
    'instagram marketing las vegas',
    'facebook marketing las vegas',
    'tiktok marketing las vegas',
    'social media company las vegas',
    'las vegas social media manager',
    'social media advertising las vegas',
    'social media services las vegas',
  ],
  openGraph: {
    title: 'Social Media Marketing Las Vegas | LeadMetrik',
    description: 'Turn your social media into a lead-generating machine. Content creation, community management, and paid ads — all done for you by our Las Vegas team.',
    url: 'https://leadmetrik.com/services/social-media',
    siteName: 'LeadMetrik',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Social Media Marketing Las Vegas | LeadMetrik',
    description: 'Turn your social media into a lead-generating machine. Full-service social media management for Las Vegas businesses.',
  },
  alternates: {
    canonical: 'https://leadmetrik.com/services/social-media',
  },
}

export default function SocialMediaLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
