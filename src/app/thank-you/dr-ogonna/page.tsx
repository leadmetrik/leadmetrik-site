'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { generateProposalPDF, loadLogoBase64 } from '@/lib/generateProposalPDF'

interface SelectedAddOn {
  name: string
  price: number
}

interface SignatureData {
  name: string
  email: string
  signature: string
  date: string
  fbAdsBudget: 'basic' | 'recommended'
  selectedAddOns: SelectedAddOn[]
  monthlyTotal: number
  setupTotal: number
  signedAt: string
  stripeInvoiceUrl?: string
  stripeCustomerId?: string
}

export default function ThankYouPage() {
  const [signatureData, setSignatureData] = useState<SignatureData | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('proposal_signature')
    if (stored) {
      setSignatureData(JSON.parse(stored))
    }
  }, [])

  const handleGeneratePDF = async () => {
    if (!signatureData) return
    
    setIsGenerating(true)
    
    try {
      const logoBase64 = await loadLogoBase64()
      await generateProposalPDF({
        name: signatureData.name,
        email: signatureData.email || 'Not provided',
        date: signatureData.date,
        fbAdsBudget: signatureData.fbAdsBudget,
        selectedAddOns: signatureData.selectedAddOns || [],
        monthlyTotal: signatureData.monthlyTotal || 1200,
        setupTotal: signatureData.setupTotal || 1500,
        signature: signatureData.signature
      }, logoBase64)
    } catch (error) {
      console.error('Error generating PDF:', error)
      alert('Error generating PDF. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  if (!signatureData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">No signature data found.</p>
          <Link href="/proposal/dr-ogonna" className="text-brand-orange hover:underline">
            Go to proposal
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="app-header">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Image
            src="/logo.jpg"
            alt="Lead Metrik"
            width={180}
            height={60}
            className="h-10 sm:h-12 w-auto"
          />
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-10 sm:py-16 safe-bottom">
        {/* Success Icon */}
        <div className="text-center mb-6 sm:mb-8 animate-slide-up">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-green-100 rounded-full mb-4 sm:mb-6">
            <svg className="w-8 h-8 sm:w-10 sm:h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h1 className="text-mobile-lg font-bold text-brand-charcoal mb-2 sm:mb-3 text-balance">
            Proposal Signed Successfully!
          </h1>
          <p className="text-gray-600 text-mobile-sm">
            Thank you, {signatureData.name}. We're excited to work with you!
          </p>
        </div>

        {/* Summary Card */}
        <div className="app-card mb-6 sm:mb-8">
          <h2 className="text-lg sm:text-xl font-bold text-brand-charcoal mb-3 sm:mb-4">Agreement Summary</h2>
          
          <div className="space-y-3 text-gray-700">
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span>Signed by</span>
              <span className="font-medium">{signatureData.name}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span>Email</span>
              <span className="font-medium">{signatureData.email || 'Not provided'}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span>Date signed</span>
              <span className="font-medium">{signatureData.date}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span>Setup fee</span>
              <span className="font-medium">${signatureData.setupTotal?.toLocaleString() || '1,500'}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span>Base retainer</span>
              <span className="font-medium">$1,200/mo</span>
            </div>
            
            {signatureData.selectedAddOns && signatureData.selectedAddOns.length > 0 && (
              <>
                <div className="pt-2 pb-1">
                  <span className="text-sm font-semibold text-gray-500 uppercase">Selected Add-Ons</span>
                </div>
                {signatureData.selectedAddOns.map((addon, i) => (
                  <div key={i} className="flex justify-between py-1 pl-4 border-b border-gray-50">
                    <span className="text-gray-600">✓ {addon.name}</span>
                    <span className="font-medium">${addon.price}/mo</span>
                  </div>
                ))}
              </>
            )}
            
            <div className="flex justify-between py-3 bg-orange-50 -mx-4 px-4 rounded-lg mt-2">
              <span className="font-bold text-brand-charcoal">Monthly Total</span>
              <span className="font-bold text-brand-orange text-lg">
                ${signatureData.monthlyTotal?.toLocaleString() || '1,200'}/mo
              </span>
            </div>
            
            <div className="flex justify-between py-2 text-sm">
              <span className="text-gray-500">FB/IG Ads budget</span>
              <span className="text-gray-600">
                {signatureData.fbAdsBudget === 'basic' ? '$100/mo' : '$200-$400/mo'}
              </span>
            </div>
          </div>
        </div>

        {/* Download Button */}
        <button
          onClick={handleGeneratePDF}
          disabled={isGenerating}
          className="app-button-secondary w-full text-base sm:text-lg flex items-center justify-center gap-3 mb-6 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isGenerating ? (
            <>
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Generating PDF...
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download Signed Copy (PDF)
            </>
          )}
        </button>

        {/* Invoice Sent Banner */}
        {signatureData.stripeInvoiceUrl && (
          <div className="bg-green-50 border border-green-200 rounded-2xl p-6 mb-6">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-green-800 mb-1">Invoice Sent!</h3>
                <p className="text-green-700 text-sm mb-3">
                  Your invoice has been emailed to {signatureData.email}. You can also pay directly below.
                </p>
                <a
                  href={signatureData.stripeInvoiceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                  View & Pay Invoice
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Next Steps */}
        <div className="bg-orange-50 rounded-2xl p-6 sm:p-8">
          <h2 className="text-lg sm:text-xl font-bold text-brand-charcoal mb-3 sm:mb-4">Next Steps</h2>
          <ol className="space-y-3 text-gray-700 text-sm sm:text-base">
            <li className="flex items-start">
              <span className="flex-shrink-0 w-6 h-6 bg-brand-orange text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-bold mr-3">1</span>
              <span>Complete the intake form to provide access details</span>
            </li>
            <li className="flex items-start">
              <span className={`flex-shrink-0 w-6 h-6 ${signatureData.stripeInvoiceUrl ? 'bg-green-500' : 'bg-brand-orange'} text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-bold mr-3`}>
                {signatureData.stripeInvoiceUrl ? '✓' : '2'}
              </span>
              <span className={signatureData.stripeInvoiceUrl ? 'line-through text-gray-400' : ''}>
                {signatureData.stripeInvoiceUrl 
                  ? 'Invoice sent to your email' 
                  : 'We\'ll send an invoice for the setup fee + first month'}
              </span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 w-6 h-6 bg-brand-orange text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-bold mr-3">3</span>
              <span>Schedule your first Thursday strategy call</span>
            </li>
          </ol>
          
          <Link
            href="/intake/dr-ogonna"
            className="app-button-primary mt-5 sm:mt-6 w-full flex items-center justify-center text-base sm:text-lg"
          >
            Complete Intake Form →
          </Link>
        </div>

        {/* Contact */}
        <p className="text-center text-gray-500 text-xs sm:text-sm mt-6 sm:mt-8">
          Questions? Email us at <a href="mailto:support@leadmetrik.com" className="text-brand-orange hover:underline active:opacity-70">support@leadmetrik.com</a>
        </p>
      </main>
    </div>
  )
}
