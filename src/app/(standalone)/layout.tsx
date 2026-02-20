import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Digital Marketing Proposal | LeadMetrik',
  description: 'Your customized digital marketing proposal from LeadMetrik.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function StandaloneLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="bg-gray-50 text-gray-900 min-h-screen">
      {children}
    </div>
  )
}
