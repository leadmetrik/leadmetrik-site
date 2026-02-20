import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Las Vegas Website Design | Professional Web Design Services | LeadMetrik',
  description: 'Professional website design services in Las Vegas. Mobile-first, SEO-optimized websites that convert visitors into customers. Get a free website audit today.',
  keywords: [
    'website design las vegas',
    'web design las vegas',
    'las vegas web design',
    'website designer las vegas',
    'web design company las vegas',
    'small business website design',
    'professional website design',
    'affordable website design',
    'mobile friendly website design',
    'ecommerce website design',
    'website design services',
    'custom website design',
    'las vegas website developers'
  ],
  openGraph: {
    title: 'Las Vegas Website Design That Brings You Customers | LeadMetrik',
    description: 'Stop losing customers to competitors with better-looking websites. We build fast, mobile-first sites that rank on Google and convert.',
    type: 'website',
    locale: 'en_US',
    url: 'https://leadmetrik.com/services/website-design',
    siteName: 'LeadMetrik',
    images: [
      {
        url: 'https://leadmetrik-site.vercel.app/og-website-design.jpg',
        width: 1200,
        height: 630,
        alt: 'LeadMetrik Website Design Services'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Las Vegas Website Design | LeadMetrik',
    description: 'Professional website design services in Las Vegas. Mobile-first, SEO-optimized websites that convert.',
  },
  alternates: {
    canonical: 'https://leadmetrik.com/services/website-design'
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function WebsiteDesignLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
