'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'

interface Proposal {
  id: string
  slug: string
  client_name: string
  client_email: string
  business_name: string | null
  industry: string
  setup_fee: number
  monthly_retainer: number
  fb_ads_budget: string
  recommended_addons: string[]
  custom_intro: string | null
  custom_notes: string | null
  status: string
  sent_at: string | null
  viewed_at: string | null
  expires_at: string | null
  signed_at: string | null
}

export default function DynamicProposalPage() {
  const params = useParams()
  const slug = params.slug as string
  
  const [proposal, setProposal] = useState<Proposal | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchProposal() {
      try {
        const res = await fetch(`/api/proposal/${slug}`)
        if (!res.ok) {
          if (res.status === 404) {
            setError('Proposal not found')
          } else {
            setError('Failed to load proposal')
          }
          return
        }
        const data = await res.json()
        setProposal(data)
        
        // Mark as viewed if not already
        if (!data.viewed_at) {
          fetch(`/api/proposal/${slug}/view`, { method: 'POST' })
        }
      } catch (err) {
        setError('Failed to load proposal')
      } finally {
        setLoading(false)
      }
    }
    
    fetchProposal()
  }, [slug])

  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-brand-orange border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading proposal...</p>
        </div>
      </div>
    )
  }

  if (error || !proposal) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Proposal Not Found</h1>
          <p className="text-gray-600">This proposal may have expired or the link is incorrect.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          <Image
            src="/logo.jpg"
            alt="Lead Metrik"
            width={180}
            height={60}
            className="h-10 sm:h-12 w-auto"
          />
          <span className="text-xs sm:text-sm text-gray-500">Proposal Date: {currentDate}</span>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Hero */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-brand-charcoal mb-3 sm:mb-4">
            Digital Marketing Proposal
          </h1>
          <p className="text-lg text-gray-600">
            Prepared for <span className="font-semibold text-brand-charcoal">{proposal.client_name}</span>
            {proposal.business_name && <span> — {proposal.business_name}</span>}
          </p>
        </div>

        {/* Executive Summary */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8 mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-brand-charcoal mb-4">Executive Summary</h2>
          {proposal.custom_intro ? (
            <p className="text-gray-700 leading-relaxed">{proposal.custom_intro}</p>
          ) : (
            <p className="text-gray-700 leading-relaxed">
              This proposal outlines a comprehensive digital marketing strategy designed to increase 
              your online visibility, drive qualified leads, and establish your business as a 
              dominant presence in your local market.
            </p>
          )}
        </section>

        {/* Services Included */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8 mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-brand-charcoal mb-6">Services Included</h2>
          
          <div className="space-y-6">
            <div className="border-l-4 border-brand-orange pl-4">
              <h3 className="font-semibold text-lg text-brand-charcoal">Setup + First Month</h3>
              <p className="text-sm text-gray-500 mb-2">Everything to get you up and running</p>
              <ul className="mt-2 space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-brand-orange mr-2">✓</span>
                  Google Business Profile audit and optimization
                </li>
                <li className="flex items-start">
                  <span className="text-brand-orange mr-2">✓</span>
                  Local SEO & citation building
                </li>
                <li className="flex items-start">
                  <span className="text-brand-orange mr-2">✓</span>
                  On-site keyword optimization
                </li>
                <li className="flex items-start">
                  <span className="text-brand-orange mr-2">✓</span>
                  Competitor analysis & strategy
                </li>
              </ul>
            </div>

            <div className="border-l-4 border-brand-orange pl-4">
              <h3 className="font-semibold text-lg text-brand-charcoal">Ongoing Monthly Services</h3>
              <p className="text-sm text-gray-500 mb-2">Starting Month 2</p>
              <ul className="mt-2 space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-brand-orange mr-2">✓</span>
                  Local SEO & link building
                </li>
                <li className="flex items-start">
                  <span className="text-brand-orange mr-2">✓</span>
                  Google Business Profile management
                </li>
                <li className="flex items-start">
                  <span className="text-brand-orange mr-2">✓</span>
                  Monthly performance reporting
                </li>
                <li className="flex items-start">
                  <span className="text-brand-orange mr-2">✓</span>
                  Strategy recommendations
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8 mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-brand-charcoal mb-6">Investment</h2>
          
          <div className="overflow-hidden rounded-xl border border-gray-200">
            <table className="w-full">
              <thead className="bg-brand-charcoal text-white">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold">Service</th>
                  <th className="px-6 py-4 text-right font-semibold">Price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="bg-orange-50">
                  <td className="px-6 py-4 font-medium text-brand-charcoal">Setup Fee (one-time)</td>
                  <td className="px-6 py-4 text-right font-bold text-brand-charcoal text-xl">
                    ${proposal.setup_fee.toLocaleString()}
                  </td>
                </tr>
                <tr className="bg-white">
                  <td className="px-6 py-4 font-medium text-brand-charcoal">
                    Monthly Retainer
                    <span className="text-sm font-normal text-gray-500 ml-2">(starts Month 2)</span>
                  </td>
                  <td className="px-6 py-4 text-right font-bold text-brand-orange text-xl">
                    ${proposal.monthly_retainer.toLocaleString()}/mo
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Recommended Add-ons */}
          {proposal.recommended_addons && proposal.recommended_addons.length > 0 && (
            <div className="mt-6 p-4 bg-orange-50 rounded-xl">
              <h3 className="font-semibold text-brand-charcoal mb-2">Recommended Add-ons</h3>
              <div className="flex flex-wrap gap-2">
                {proposal.recommended_addons.map((addon, i) => (
                  <span key={i} className="px-3 py-1 bg-brand-orange text-white text-sm rounded-full capitalize">
                    {addon.replace(/-/g, ' ')}
                  </span>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Custom Notes */}
        {proposal.custom_notes && (
          <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8 mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-brand-charcoal mb-4">Additional Notes</h2>
            <p className="text-gray-700 leading-relaxed">{proposal.custom_notes}</p>
          </section>
        )}

        {/* Terms */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8 mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-brand-charcoal mb-4">Terms & Conditions</h2>
          
          <div className="prose prose-gray max-w-none text-gray-700 space-y-4 text-sm">
            <p><strong>1. Payment Terms</strong><br />
            Setup fee is due upon signing. Monthly retainer is billed on the 1st of each month, 
            beginning the month after setup is complete.</p>
            
            <p><strong>2. Cancellation Policy</strong><br />
            This agreement is month-to-month after the initial setup period. Either party may cancel with 30 days 
            written notice. <span className="text-brand-orange font-semibold">You may cancel anytime.</span></p>
            
            <p><strong>3. Access Requirements</strong><br />
            Client agrees to provide necessary access to website and Google Business Profile as needed.</p>
            
            <p><strong>4. Results Disclaimer</strong><br />
            While we employ industry best practices, we cannot guarantee specific rankings or results.</p>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-r from-brand-orange to-orange-500 rounded-2xl p-6 sm:p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="mb-6 opacity-90">
            Reply to the email or contact us to discuss this proposal and next steps.
          </p>
          <a 
            href="mailto:mark@leadmetrik.com?subject=Re: Marketing Proposal" 
            className="inline-block bg-white text-brand-orange font-bold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Contact Us
          </a>
        </section>

        {/* Expiration Notice */}
        {proposal.expires_at && (
          <p className="text-center text-gray-500 text-sm mt-6">
            This proposal expires on {new Date(proposal.expires_at).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        )}
      </main>
    </div>
  )
}
