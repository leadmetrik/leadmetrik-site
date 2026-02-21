import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Reputation Management Las Vegas | Online Review Management | LeadMetrik',
  description: 'Las Vegas reputation management experts. We generate 5-star reviews, suppress negative content, and protect your online reputation. Get your free reputation audit today.',
  keywords: 'reputation management las vegas, online reputation management, review management las vegas, google review management, remove bad reviews, reputation repair las vegas, online review generation, business reputation management',
  openGraph: {
    title: 'Reputation Management Las Vegas | LeadMetrik',
    description: 'Generate 5-star reviews on autopilot. Protect your business from negative content. Las Vegas reputation management experts.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Reputation Management Las Vegas | LeadMetrik',
    description: 'Generate 5-star reviews on autopilot. Protect your business from negative content.',
  },
  alternates: {
    canonical: 'https://leadmetrik.com/services/reputation-management',
  },
}

export default function ReputationManagementLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
