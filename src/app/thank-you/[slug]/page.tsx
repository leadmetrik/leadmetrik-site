'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

interface SignatureData {
  id: string
  name: string
  email: string
  signature: string
  date: string
  fbAdsBudget: string
  selectedAddOns: { name: string; price: number }[]
  monthlyTotal: number
  setupTotal: number
  signedAt: string
  stripeInvoiceUrl?: string
  stripeCustomerId?: string
}

export default function ThankYouPage() {
  const params = useParams()
  const slug = params.slug as string
  
  const [signatureData, setSignatureData] = useState<SignatureData | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem('proposal_signature')
    if (stored) {
      try {
        setSignatureData(JSON.parse(stored))
      } catch {
        // Invalid data
      }
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-center">
          <Image
            src="/logo.png"
            alt="Lead Metrik"
            width={180}
            height={60}
            className="h-10 sm:h-12 w-auto"
          />
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        {/* Success Message */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-brand-charcoal mb-4">
            Proposal Accepted! 🎉
          </h1>
          <p className="text-lg text-gray-600 max-w-md mx-auto">
            Thank you for choosing Lead Metrik. We're excited to help grow your business!
          </p>
        </div>

        {/* Summary Card */}
        {signatureData && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8 mb-8">
            <h2 className="text-xl font-bold text-brand-charcoal mb-4">Your Agreement Summary</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">Signed by</span>
                <span className="font-medium text-brand-charcoal">{signatureData.name}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">Email</span>
                <span className="font-medium text-brand-charcoal">{signatureData.email}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">Date</span>
                <span className="font-medium text-brand-charcoal">{signatureData.date}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">Setup Fee (one-time)</span>
                <span className="font-bold text-brand-charcoal">${signatureData.setupTotal?.toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-600">Monthly Investment</span>
                <span className="font-bold text-brand-orange text-xl">${signatureData.monthlyTotal?.toLocaleString()}/mo</span>
              </div>
              
              {signatureData.selectedAddOns?.length > 0 && (
                <div className="pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-500 mb-2">Selected Add-ons:</p>
                  <div className="flex flex-wrap gap-2">
                    {signatureData.selectedAddOns.map((addon, i) => (
                      <span key={i} className="px-3 py-1 bg-orange-100 text-brand-orange text-sm rounded-full">
                        {addon.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Next Steps */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8 mb-8">
          <h2 className="text-xl font-bold text-brand-charcoal mb-4">What Happens Next?</h2>
          
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-brand-orange rounded-full flex items-center justify-center text-white font-bold text-sm">
                1
              </div>
              <div>
                <h3 className="font-semibold text-brand-charcoal">Invoice Sent</h3>
                <p className="text-gray-600 text-sm">
                  You'll receive an invoice via email for the setup fee. Payment is due within 7 days.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-brand-orange rounded-full flex items-center justify-center text-white font-bold text-sm">
                2
              </div>
              <div>
                <h3 className="font-semibold text-brand-charcoal">Kickoff Call</h3>
                <p className="text-gray-600 text-sm">
                  We'll schedule a kickoff call to gather access credentials and discuss your goals.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-brand-orange rounded-full flex items-center justify-center text-white font-bold text-sm">
                3
              </div>
              <div>
                <h3 className="font-semibold text-brand-charcoal">Setup Begins</h3>
                <p className="text-gray-600 text-sm">
                  Our team will begin auditing your accounts and implementing the strategy.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Invoice Button */}
        {signatureData?.stripeInvoiceUrl && (
          <div className="text-center mb-8">
            <a
              href={signatureData.stripeInvoiceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-brand-charcoal text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              View Invoice
            </a>
          </div>
        )}

        {/* Contact */}
        <div className="text-center">
          <p className="text-gray-600 mb-2">Questions? We're here to help.</p>
          <a 
            href="mailto:mark@leadmetrik.com" 
            className="text-brand-orange font-semibold hover:underline"
          >
            mark@leadmetrik.com
          </a>
        </div>
      </main>
    </div>
  )
}
