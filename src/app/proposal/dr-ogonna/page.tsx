'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import SignaturePad from '@/components/SignaturePad'
import { saveSignedProposal } from '@/lib/supabase'

interface AddOn {
  id: string
  name: string
  description: string
  details: string[]
  originalPrice: number
  discountedPrice: number
  icon: string
  highlight?: string
}

const ADD_ONS: AddOn[] = [
  {
    id: 'blog',
    name: 'SEO Blog Content',
    description: 'Dominate local search with authority content',
    details: [
      '12 blog posts per month',
      '2,500+ words each, SEO-optimized',
      'Keyword research & targeting',
      'Internal linking strategy',
      'Builds topical authority',
    ],
    originalPrice: 1200,
    discountedPrice: 597,
    icon: '📝',
    highlight: 'BEST FOR SEO',
  },
  {
    id: 'reputation',
    name: 'Reputation Management',
    description: 'Reviews = trust for medical practices',
    details: [
      'Review monitoring (Google, Yelp, etc.)',
      'Professional response management',
      'Review generation campaigns',
      'Negative review mitigation',
      'Monthly reputation report',
    ],
    originalPrice: 497,
    discountedPrice: 297,
    icon: '⭐',
    highlight: 'CRITICAL FOR CLINICS',
  },
  {
    id: 'social',
    name: 'Social Media Management',
    description: 'Weight loss is visual — before/afters drive leads',
    details: [
      '12-16 posts/month on FB & IG',
      'Our team shoots pro photos & videos on-site',
      'Professional editing & post production',
      'Content calendar & strategy',
      'Community management & engagement',
    ],
    originalPrice: 797,
    discountedPrice: 497,
    icon: '📸',
    highlight: 'PRO CONTENT INCLUDED',
  },
  {
    id: 'email',
    name: 'Email Marketing',
    description: 'Nurture leads & retain patients',
    details: [
      'Monthly patient newsletter',
      'Automated nurture sequences',
      'Re-engagement campaigns',
      'Lead capture optimization',
      'Performance analytics',
    ],
    originalPrice: 497,
    discountedPrice: 297,
    icon: '📧',
  },
  {
    id: 'video',
    name: 'Video/Reels Package',
    description: 'Short-form video dominates social feeds',
    details: [
      '8 short-form videos per month',
      'Professionally shot & edited',
      'Optimized for IG Reels, TikTok, FB',
      'Trending audio & hooks',
      'Patient testimonial clips',
    ],
    originalPrice: 797,
    discountedPrice: 497,
    icon: '🎬',
  },
]

export default function DrOgonnaProposal() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [signatureData, setSignatureData] = useState<string | null>(null)
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [fbAdsBudget, setFbAdsBudget] = useState<'basic' | 'recommended'>('recommended')
  const [selectedAddOns, setSelectedAddOns] = useState<Set<string>>(new Set())

  const toggleAddOn = (id: string) => {
    setSelectedAddOns(prev => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  const { monthlyTotal, setupTotal, addOnsTotal, addOnsSavings } = useMemo(() => {
    const baseMonthly = 1200
    const setup = 1500
    let addOnsMonthly = 0
    let savings = 0
    
    selectedAddOns.forEach(id => {
      const addon = ADD_ONS.find(a => a.id === id)
      if (addon) {
        addOnsMonthly += addon.discountedPrice
        savings += addon.originalPrice - addon.discountedPrice
      }
    })

    return {
      monthlyTotal: baseMonthly + addOnsMonthly,
      setupTotal: setup,
      addOnsTotal: addOnsMonthly,
      addOnsSavings: savings,
    }
  }, [selectedAddOns])

  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  // Map local addon IDs to Stripe addon IDs
  const addonIdMap: Record<string, string> = {
    'blog': 'seo-blog',
    'reputation': 'reputation',
    'social': 'social-media',
    'email': 'email-marketing',
    'video': 'video-reels',
  }

  const handleSubmit = async () => {
    if (!fullName || !email || !signatureData || !agreedToTerms) {
      alert('Please complete all required fields: full name, email, signature, and agree to terms.')
      return
    }

    setIsSubmitting(true)
    
    // Prepare add-on details for storage
    const selectedAddOnDetails = ADD_ONS.filter(a => selectedAddOns.has(a.id)).map(a => ({
      id: a.id,
      name: a.name,
      price: a.discountedPrice,
      originalPrice: a.originalPrice
    }))

    // Map addon IDs to Stripe format
    const stripeAddonIds = Array.from(selectedAddOns).map(id => addonIdMap[id] || id)
    
    try {
      // 1. Save to Supabase
      const { data: savedProposal, error } = await saveSignedProposal({
        client_name: fullName,
        client_email: email,
        proposal_type: 'dr-ogonna',
        setup_total: setupTotal,
        base_monthly: 1200,
        monthly_total: monthlyTotal,
        fb_ads_budget: fbAdsBudget,
        selected_addons: selectedAddOnDetails,
        signature_data: signatureData,
        signed_at: new Date().toISOString(),
      })

      if (error) {
        console.error('Failed to save proposal:', error)
        // Continue anyway - Stripe is the priority
      }

      // 2. Create Stripe subscription and send invoice
      const stripeResponse = await fetch('/api/stripe/create-subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerEmail: email,
          customerName: fullName,
          businessName: 'MediSlim',
          selectedAddons: stripeAddonIds,
          signatureData: signatureData,
          proposalId: 'dr-ogonna',
        }),
      })

      const stripeResult = await stripeResponse.json()

      if (!stripeResponse.ok) {
        throw new Error(stripeResult.error || 'Failed to create invoice')
      }

      // 3. Update Supabase record with Stripe info
      if (savedProposal?.id) {
        await fetch('/api/update-proposal-stripe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            proposalId: savedProposal.id,
            stripeCustomerId: stripeResult.customerId,
            stripeSubscriptionId: stripeResult.subscriptionId,
            stripeInvoiceId: stripeResult.invoiceId,
          }),
        }).catch(err => console.error('Failed to update proposal with Stripe info:', err))
      }

      // 4. Store signature data in localStorage for PDF generation
      localStorage.setItem('proposal_signature', JSON.stringify({
        id: savedProposal?.id,
        name: fullName,
        email: email,
        signature: signatureData,
        date: currentDate,
        fbAdsBudget,
        selectedAddOns: selectedAddOnDetails.map(a => ({
          name: a.name,
          price: a.price
        })),
        monthlyTotal,
        setupTotal,
        signedAt: new Date().toISOString(),
        stripeInvoiceUrl: stripeResult.invoiceUrl,
        stripeCustomerId: stripeResult.customerId,
      }))

      // 5. Redirect to thank you page
      window.location.href = '/thank-you/dr-ogonna'
    } catch (err) {
      console.error('Error submitting proposal:', err)
      setIsSubmitting(false)
      alert('There was an error submitting your proposal. Please try again or contact support@leadmetrik.com')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="app-header">
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

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 safe-bottom">
        {/* Hero */}
        <div className="text-center mb-8 sm:mb-12 animate-slide-up">
          <h1 className="text-mobile-lg font-bold text-brand-charcoal mb-3 sm:mb-4 text-balance">
            Digital Marketing Proposal
          </h1>
          <p className="text-mobile-sm text-gray-600">
            Prepared for <span className="font-semibold text-brand-charcoal">Dr. Ogonna — MediSlim</span>
          </p>
        </div>

        {/* Executive Summary */}
        <section className="app-card mb-6 sm:mb-8">
          <h2 className="text-mobile-md font-bold text-brand-charcoal mb-3 sm:mb-4">Executive Summary</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            This proposal outlines a comprehensive digital marketing strategy designed to increase 
            your online visibility, drive qualified patient leads, and establish MediSlim as a 
            dominant presence in your local market.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Our goal is to get you ranking in the <strong>Google Maps Top 3</strong> within 4-6 months, 
            allowing you to eventually reduce or eliminate your Google Ads spend while maintaining 
            a steady flow of new patients.
          </p>
        </section>

        {/* Services */}
        <section className="app-card mb-6 sm:mb-8">
          <h2 className="text-mobile-md font-bold text-brand-charcoal mb-4 sm:mb-6">Services Included</h2>
          
          <div className="space-y-6">
            <div className="border-l-4 border-brand-orange pl-4">
              <h3 className="font-semibold text-lg text-brand-charcoal">Setup + First Month</h3>
              <p className="text-sm text-gray-500 mb-2">Everything to get you up and running</p>
              <ul className="mt-2 space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-brand-orange mr-2">✓</span>
                  Google Ads audit + conversion tracking setup
                </li>
                <li className="flex items-start">
                  <span className="text-brand-orange mr-2">✓</span>
                  Facebook/Instagram Ads setup + first ad creatives
                </li>
                <li className="flex items-start">
                  <span className="text-brand-orange mr-2">✓</span>
                  On-site keyword optimization
                </li>
                <li className="flex items-start">
                  <span className="text-brand-orange mr-2">✓</span>
                  Google Business Profile audit and optimization
                </li>
                <li className="flex items-start">
                  <span className="text-brand-orange mr-2">✓</span>
                  Access setup for website & Google Business Profile
                </li>
                <li className="flex items-start">
                  <span className="text-brand-orange mr-2">✓</span>
                  Local SEO & citation building
                </li>
                <li className="flex items-start">
                  <span className="text-brand-orange mr-2">✓</span>
                  Google Ads management
                </li>
                <li className="flex items-start">
                  <span className="text-brand-orange mr-2">✓</span>
                  FB/IG Ads management
                </li>
              </ul>
            </div>

            <div className="border-l-4 border-brand-orange pl-4">
              <h3 className="font-semibold text-lg text-brand-charcoal">Ongoing Monthly Services</h3>
              <p className="text-sm text-gray-500 mb-2">Starting Month 2</p>
              <ul className="mt-2 space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-brand-orange mr-2">✓</span>
                  Local SEO & citation building
                </li>
                <li className="flex items-start">
                  <span className="text-brand-orange mr-2">✓</span>
                  Google Ads management & optimization
                </li>
                <li className="flex items-start">
                  <span className="text-brand-orange mr-2">✓</span>
                  Facebook/Instagram Ads management
                </li>
                <li className="flex items-start">
                  <span className="text-brand-orange mr-2">✓</span>
                  Monthly 20-minute strategy call (1 Thursday via Google Meet or in-office)
                </li>
                <li className="flex items-start">
                  <span className="text-brand-orange mr-2">✓</span>
                  Performance reporting & recommendations
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Target Keywords */}
        <section className="app-card mb-6 sm:mb-8">
          <h2 className="text-mobile-md font-bold text-brand-charcoal mb-2">Target Keywords</h2>
          <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">High-value local search terms we'll target to drive patient inquiries:</p>
          
          <div className="table-scroll">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-brand-orange">
                  <th className="text-left py-3 px-4 font-semibold text-brand-charcoal">Keyword</th>
                  <th className="text-left py-3 px-4 font-semibold text-brand-charcoal">Monthly Searches</th>
                  <th className="text-left py-3 px-4 font-semibold text-brand-charcoal">Intent</th>
                  <th className="text-left py-3 px-4 font-semibold text-brand-charcoal">Competition</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-brand-charcoal">weight loss clinic las vegas</td>
                  <td className="py-3 px-4 text-brand-charcoal font-semibold">720</td>
                  <td className="py-3 px-4 text-gray-700">High intent, broad</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">High</span>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-brand-charcoal">semaglutide las vegas</td>
                  <td className="py-3 px-4 text-brand-charcoal font-semibold">480</td>
                  <td className="py-3 px-4 text-gray-700">
                    <span className="flex items-center">
                      Hot — GLP-1 trend
                      <span className="ml-2 text-brand-orange">🔥</span>
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">Medium-High</span>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-brand-charcoal">medical weight loss las vegas</td>
                  <td className="py-3 px-4 text-brand-charcoal font-semibold">590</td>
                  <td className="py-3 px-4 text-gray-700">Broad, qualified</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">High</span>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-brand-charcoal">ozempic weight loss las vegas</td>
                  <td className="py-3 px-4 text-brand-charcoal font-semibold">320</td>
                  <td className="py-3 px-4 text-gray-700">Brand name searches</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium">Medium</span>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-brand-charcoal">phentermine las vegas</td>
                  <td className="py-3 px-4 text-brand-charcoal font-semibold">260</td>
                  <td className="py-3 px-4 text-gray-700">
                    <span className="flex items-center">
                      Her offer, niche
                      <span className="ml-2 text-green-500">⭐</span>
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium">Medium</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="mt-4 p-4 bg-brand-orange/10 rounded-lg">
            <p className="text-sm text-brand-charcoal font-medium">
              📊 Total addressable search volume: <span className="font-bold">~2,370 searches/month</span>
            </p>
            <p className="text-xs text-gray-600 mt-1">
              Even capturing 5-10% of this traffic = 10-20+ qualified leads per month
            </p>
          </div>
          
          <p className="mt-3 text-sm text-gray-500 italic">
            Search volume estimates based on Las Vegas market data. We'll optimize your website, Google Business Profile, and ads to capture this traffic.
          </p>
        </section>

        {/* SEO Services Breakdown */}
        <section className="app-card mb-6 sm:mb-8">
          <h2 className="text-mobile-md font-bold text-brand-charcoal mb-2">Monthly SEO Deliverables</h2>
          <p className="text-gray-600 mb-6">Here's exactly what we deliver every month to boost your local rankings:</p>
          
          {/* Every Month Services */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-brand-charcoal mb-4 flex items-center">
              <span className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm mr-2">✓</span>
              Every Month
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {/* SEO Review & Analysis */}
              <div className="bg-gray-50 rounded-xl p-5">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-brand-orange rounded-lg flex items-center justify-center text-white mr-3">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-brand-charcoal">SEO Review & Analysis</h4>
                </div>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start">
                    <span className="text-brand-orange mr-2">•</span>
                    Monthly Rank Report
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-orange mr-2">•</span>
                    SEO Audit & Recommendations
                  </li>
                </ul>
              </div>

              {/* Social & Indexing */}
              <div className="bg-gray-50 rounded-xl p-5">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-brand-orange rounded-lg flex items-center justify-center text-white mr-3">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-brand-charcoal">Social Signals & Indexing</h4>
                </div>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start">
                    <span className="text-brand-orange mr-2">•</span>
                    Pinterest, Reddit, Tumblr sharing
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-orange mr-2">•</span>
                    Social bookmarking
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-orange mr-2">•</span>
                    Premium link indexing service
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Rotating High-Power Link Building */}
          <div>
            <h3 className="text-lg font-semibold text-brand-charcoal mb-2 flex items-center">
              <span className="w-8 h-8 bg-brand-orange rounded-full flex items-center justify-center text-white text-sm mr-2">⚡</span>
              High-Power Link Building
            </h3>
            <p className="text-gray-600 text-sm mb-4">One of the following each month (rotating based on your needs):</p>
            
            <div className="grid md:grid-cols-2 gap-4">
              {/* Guest Posting */}
              <div className="bg-brand-charcoal/5 rounded-xl p-5 border-2 border-dashed border-gray-300">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-brand-charcoal rounded-lg flex items-center justify-center text-white mr-3">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-brand-charcoal">Guest Posting</h4>
                </div>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• Up to 3 DA 40+ guest posts</li>
                  <li>• 400-800 word unique articles</li>
                  <li>• Do-follow backlinks</li>
                </ul>
              </div>

              {/* Press Releases */}
              <div className="bg-brand-charcoal/5 rounded-xl p-5 border-2 border-dashed border-gray-300">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-brand-charcoal rounded-lg flex items-center justify-center text-white mr-3">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-brand-charcoal">Press Releases</h4>
                </div>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• Up to 5 PR submissions</li>
                  <li>• Professionally written</li>
                  <li>• Strategic distribution</li>
                </ul>
              </div>

              {/* Competitor Backlinks */}
              <div className="bg-brand-charcoal/5 rounded-xl p-5 border-2 border-dashed border-gray-300">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-brand-charcoal rounded-lg flex items-center justify-center text-white mr-3">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-brand-charcoal">Competitor Backlinks</h4>
                </div>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• Up to 20 competitor backlinks</li>
                  <li>• DA 20-90 authority sites</li>
                  <li>• Niche-relevant placements</li>
                </ul>
              </div>

              {/* Google News */}
              <div className="bg-brand-charcoal/5 rounded-xl p-5 border-2 border-dashed border-gray-300">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-brand-charcoal rounded-lg flex items-center justify-center text-white mr-3">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-brand-charcoal">Google News Links</h4>
                </div>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• Up to 5 Google News backlinks</li>
                  <li>• DA 40-90 news sites</li>
                  <li>• Authority & trust signals</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-orange-50 rounded-lg border border-orange-200">
            <p className="text-sm text-brand-charcoal">
              <strong>💡 Why we rotate:</strong> Rotating link types creates a natural, diverse backlink profile 
              that Google rewards. Over 4 months, you'll receive all four high-power link building services.
            </p>
          </div>
        </section>

        {/* Pricing */}
        <section className="app-card mb-6 sm:mb-8">
          <h2 className="text-mobile-md font-bold text-brand-charcoal mb-4 sm:mb-6">Investment</h2>
          
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
                  <td className="px-6 py-4 font-medium text-brand-charcoal">Setup + First Month</td>
                  <td className="px-6 py-4 text-right font-bold text-brand-charcoal">$1,500</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-gray-700 pl-10">— Google Ads audit + conversion tracking</td>
                  <td className="px-6 py-4"></td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-gray-700 pl-10">— FB/IG Ads setup + first creatives</td>
                  <td className="px-6 py-4"></td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-gray-700 pl-10">— On-site keyword optimization</td>
                  <td className="px-6 py-4"></td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-gray-700 pl-10">— Google Business Profile audit + optimization</td>
                  <td className="px-6 py-4"></td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-gray-700 pl-10">— Local SEO & citation building</td>
                  <td className="px-6 py-4"></td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-gray-700 pl-10">— Google Ads management</td>
                  <td className="px-6 py-4"></td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-gray-700 pl-10">— FB/IG Ads management</td>
                  <td className="px-6 py-4"></td>
                </tr>
                <tr className="bg-orange-50">
                  <td className="px-6 py-4 font-medium text-brand-charcoal">Monthly Retainer <span className="text-sm font-normal text-gray-500">(starts Month 2)</span></td>
                  <td className="px-6 py-4 text-right font-bold text-brand-charcoal">$1,200/mo</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-gray-700 pl-10">— Local SEO & citation building</td>
                  <td className="px-6 py-4"></td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-gray-700 pl-10">— Google Ads management & optimization</td>
                  <td className="px-6 py-4"></td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-gray-700 pl-10">— FB/IG Ads management</td>
                  <td className="px-6 py-4"></td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-gray-700 pl-10">— Monthly 20-min strategy call (Thursdays)</td>
                  <td className="px-6 py-4"></td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-gray-700 pl-10">— Performance reporting & recommendations</td>
                  <td className="px-6 py-4"></td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Ad Budget Selection */}
          <div className="mt-8 p-6 bg-gray-50 rounded-xl">
            <h3 className="font-semibold text-brand-charcoal mb-4">Client-Paid Ad Budgets (Separate)</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200">
                <div>
                  <p className="font-medium text-brand-charcoal">Google Ads Budget</p>
                  <p className="text-sm text-gray-500">Current spend, managed by Lead Metrik</p>
                </div>
                <p className="font-bold text-brand-charcoal">~$1,500/mo</p>
              </div>

              <div className="p-4 bg-white rounded-lg border border-gray-200">
                <p className="font-medium text-brand-charcoal mb-3">Facebook/Instagram Ads Budget</p>
                <div className="space-y-3">
                  <label className="flex items-center p-3 rounded-lg border-2 cursor-pointer transition-colors hover:bg-gray-50"
                    style={{ borderColor: fbAdsBudget === 'basic' ? '#F5A623' : '#e5e7eb' }}>
                    <input
                      type="radio"
                      name="fbBudget"
                      checked={fbAdsBudget === 'basic'}
                      onChange={() => setFbAdsBudget('basic')}
                      className="sr-only"
                    />
                    <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${fbAdsBudget === 'basic' ? 'border-brand-orange' : 'border-gray-300'}`}>
                      {fbAdsBudget === 'basic' && <div className="w-3 h-3 rounded-full bg-brand-orange"></div>}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-brand-charcoal">Basic — $100/mo</p>
                      <p className="text-sm text-gray-500">Entry-level retargeting</p>
                    </div>
                  </label>

                  <label className="flex items-center p-3 rounded-lg border-2 cursor-pointer transition-colors hover:bg-gray-50"
                    style={{ borderColor: fbAdsBudget === 'recommended' ? '#F5A623' : '#e5e7eb' }}>
                    <input
                      type="radio"
                      name="fbBudget"
                      checked={fbAdsBudget === 'recommended'}
                      onChange={() => setFbAdsBudget('recommended')}
                      className="sr-only"
                    />
                    <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${fbAdsBudget === 'recommended' ? 'border-brand-orange' : 'border-gray-300'}`}>
                      {fbAdsBudget === 'recommended' && <div className="w-3 h-3 rounded-full bg-brand-orange"></div>}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-brand-charcoal">Recommended — $200-$400/mo</p>
                      <p className="text-sm text-gray-500">Better reach & results, creative testing</p>
                    </div>
                    <span className="px-2 py-1 bg-brand-orange text-white text-xs font-semibold rounded">BEST VALUE</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Power Add-Ons Section */}
        <section className="app-card mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
            <h2 className="text-mobile-md font-bold text-brand-charcoal">Power Add-Ons</h2>
            <span className="px-4 py-1.5 bg-brand-orange text-white rounded-full text-sm font-bold whitespace-nowrap">
              EXCLUSIVE RATES
            </span>
          </div>
          <p className="text-gray-600 mb-6 sm:mb-8">
            Supercharge your marketing with these high-impact services — all at special client rates
          </p>

          <div className="space-y-4">
            {ADD_ONS.map((addon) => {
              const isSelected = selectedAddOns.has(addon.id)
              return (
                <div
                  key={addon.id}
                  onClick={() => toggleAddOn(addon.id)}
                  className={`relative rounded-xl cursor-pointer transition-all duration-300 ${
                    isSelected 
                      ? 'bg-orange-50 border-2 border-brand-orange shadow-md' 
                      : 'bg-gray-50 border-2 border-transparent hover:border-gray-200 hover:bg-gray-100 active:bg-gray-100'
                  }`}
                >
                  {addon.highlight && (
                    <span className={`absolute -top-2.5 left-4 sm:left-auto sm:right-4 px-2.5 py-0.5 text-xs font-bold rounded-full ${
                      isSelected ? 'bg-brand-orange text-white' : 'bg-gray-200 text-gray-600'
                    }`}>
                      {addon.highlight}
                    </span>
                  )}
                  
                  {/* Mobile Layout */}
                  <div className="p-4 sm:hidden">
                    {/* Top row: Checkbox + Icon + Name + Price */}
                    <div className="flex items-center gap-3">
                      {/* Large touch-friendly checkbox */}
                      <div className={`flex-shrink-0 w-12 h-12 rounded-xl border-2 flex items-center justify-center transition-all ${
                        isSelected 
                          ? 'bg-brand-orange border-brand-orange' 
                          : 'border-gray-300 bg-white'
                      }`}>
                        {isSelected && (
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      
                      {/* Icon */}
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-brand-orange to-orange-500 rounded-xl flex items-center justify-center text-2xl shadow-sm">
                        {addon.icon}
                      </div>
                      
                      {/* Name + Price */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base font-bold text-brand-charcoal leading-tight">{addon.name}</h3>
                        <div className="flex items-baseline gap-2 mt-0.5">
                          <span className="text-xl font-bold text-brand-orange">${addon.discountedPrice}</span>
                          <span className="text-sm text-gray-400">/mo</span>
                          <span className="text-xs text-gray-400 line-through">${addon.originalPrice}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Description */}
                    <p className="text-sm text-gray-500 mt-3 pl-[60px]">{addon.description}</p>
                    
                    {/* Condensed details (show first 3 on mobile) */}
                    <ul className="mt-2 pl-[60px] space-y-1">
                      {addon.details.slice(0, 3).map((detail, i) => (
                        <li key={i} className="flex items-start text-sm text-gray-600">
                          <span className="text-brand-orange mr-2 flex-shrink-0">✓</span>
                          <span className="leading-tight">{detail}</span>
                        </li>
                      ))}
                      {addon.details.length > 3 && (
                        <li className="text-xs text-gray-400 italic">+{addon.details.length - 3} more</li>
                      )}
                    </ul>
                    
                    {/* Savings badge */}
                    <div className="mt-3 pl-[60px]">
                      <span className="inline-block px-2.5 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                        Save ${addon.originalPrice - addon.discountedPrice}/mo
                      </span>
                    </div>
                  </div>
                  
                  {/* Desktop Layout */}
                  <div className="hidden sm:block p-6">
                    <div className="flex items-start gap-4">
                      {/* Checkbox */}
                      <div className={`flex-shrink-0 w-8 h-8 rounded-lg border-2 flex items-center justify-center transition-all ${
                        isSelected 
                          ? 'bg-brand-orange border-brand-orange' 
                          : 'border-gray-300 hover:border-gray-400'
                      }`}>
                        {isSelected && (
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      
                      {/* Icon */}
                      <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-brand-orange to-orange-500 rounded-xl flex items-center justify-center text-3xl shadow-md">
                        {addon.icon}
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="text-xl font-bold text-brand-charcoal">{addon.name}</h3>
                        </div>
                        <p className="text-gray-500 mb-3">{addon.description}</p>
                        
                        <ul className="grid md:grid-cols-2 gap-x-4 gap-y-1 text-sm">
                          {addon.details.map((detail, i) => (
                            <li key={i} className="flex items-center text-gray-600">
                              <span className="text-brand-orange mr-2">✓</span>
                              {detail}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      {/* Pricing */}
                      <div className="flex-shrink-0 text-right">
                        <p className="text-gray-400 line-through text-lg">
                          ${addon.originalPrice}/mo
                        </p>
                        <p className="text-3xl font-bold text-brand-orange">
                          ${addon.discountedPrice}
                          <span className="text-sm font-normal text-gray-400">/mo</span>
                        </p>
                        <p className="text-green-600 text-sm font-medium">
                          Save ${addon.originalPrice - addon.discountedPrice}/mo
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Total Calculator */}
          <div className="mt-6 sm:mt-8 p-5 sm:p-6 bg-brand-charcoal rounded-xl text-white">
            {/* Mobile Layout - Centered & Stacked */}
            <div className="sm:hidden text-center">
              <h3 className="text-lg font-bold mb-4">Your Investment</h3>
              
              <div className="flex justify-center gap-6 mb-4">
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Setup</p>
                  <p className="text-2xl font-bold">${setupTotal.toLocaleString()}</p>
                </div>
                <div className="w-px bg-gray-600"></div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Monthly</p>
                  <p className="text-3xl font-bold text-brand-orange">${monthlyTotal.toLocaleString()}</p>
                </div>
              </div>
              
              {selectedAddOns.size > 0 && (
                <>
                  <p className="text-xs text-gray-400 mb-2">
                    Base: $1,200 + Add-ons: ${addOnsTotal}
                  </p>
                  <p className="text-green-400 text-sm font-medium">
                    🎉 Saving ${addOnsSavings}/mo!
                  </p>
                </>
              )}
            </div>
            
            {/* Desktop Layout */}
            <div className="hidden sm:flex sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold mb-1">Your Investment</h3>
                {selectedAddOns.size > 0 && (
                  <p className="text-green-400 text-sm">
                    🎉 You're saving <span className="font-bold">${addOnsSavings}/mo</span> with add-on discounts!
                  </p>
                )}
              </div>
              
              <div className="text-right">
                <div className="flex items-baseline gap-2 justify-end">
                  <span className="text-gray-400">Setup:</span>
                  <span className="text-2xl font-bold">${setupTotal.toLocaleString()}</span>
                </div>
                <div className="flex items-baseline gap-2 justify-end">
                  <span className="text-gray-400">Monthly:</span>
                  <span className="text-4xl font-bold text-brand-orange">${monthlyTotal.toLocaleString()}</span>
                  <span className="text-gray-400">/mo</span>
                </div>
                {selectedAddOns.size > 0 && (
                  <p className="text-xs text-gray-400 mt-1">
                    Base: $1,200 + Add-ons: ${addOnsTotal}
                  </p>
                )}
              </div>
            </div>
            
            {selectedAddOns.size >= 3 && (
              <div className="mt-4 p-3 bg-green-500/20 rounded-lg border border-green-500/30 text-center">
                <p className="text-green-300 text-sm sm:text-base font-medium">
                  🔥 <span className="font-bold">Pro Bundle!</span> You've selected {selectedAddOns.size} add-ons — maximum impact!
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Timeline */}
        <section className="app-card mb-6 sm:mb-8">
          <h2 className="text-mobile-md font-bold text-brand-charcoal mb-4 sm:mb-6">Timeline & Expectations</h2>
          
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-brand-orange rounded-full flex items-center justify-center text-white font-bold">
                1
              </div>
              <div className="ml-4">
                <h3 className="font-semibold text-brand-charcoal">Month 1: Foundation</h3>
                <p className="text-gray-600">Audit, setup, access configuration, initial optimizations</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-brand-orange rounded-full flex items-center justify-center text-white font-bold">
                2-3
              </div>
              <div className="ml-4">
                <h3 className="font-semibold text-brand-charcoal">Months 2-3: Build Momentum</h3>
                <p className="text-gray-600">Citation building, ad optimization, content improvements</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-brand-orange rounded-full flex items-center justify-center text-white font-bold">
                4-6
              </div>
              <div className="ml-4">
                <h3 className="font-semibold text-brand-charcoal">Months 4-6: Map Pack Ranking</h3>
                <p className="text-gray-600">Target Google Maps Top 3, begin reducing paid ad dependency</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                ✓
              </div>
              <div className="ml-4">
                <h3 className="font-semibold text-brand-charcoal">Goal: Reduce Google Ads</h3>
                <p className="text-gray-600">Once Maps ranking is stable, lower or stop Google Ads spend</p>
              </div>
            </div>
          </div>
        </section>

        {/* Terms */}
        <section className="app-card mb-6 sm:mb-8">
          <h2 className="text-mobile-md font-bold text-brand-charcoal mb-4 sm:mb-6">Terms & Conditions</h2>
          
          <div className="prose prose-gray max-w-none text-gray-700 space-y-4">
            <p><strong>1. Payment Terms</strong><br />
            Setup fee of $1,500 is due upon signing. Monthly retainer of $1,200 is billed on the 1st of each month, 
            beginning the month after setup is complete. Ad budgets are paid directly to advertising platforms.</p>
            
            <p><strong>2. Cancellation Policy</strong><br />
            This agreement is month-to-month after the initial setup period. Either party may cancel with 30 days 
            written notice. <span className="text-brand-orange font-semibold">You may cancel anytime.</span></p>
            
            <p><strong>3. Access Requirements</strong><br />
            Client agrees to provide necessary access to website, Google Business Profile, Google Ads account, 
            and social media accounts as needed to perform the services outlined.</p>
            
            <p><strong>4. Results Disclaimer</strong><br />
            While we employ industry best practices and have a strong track record, we cannot guarantee specific 
            rankings or results as search engine algorithms and competitive landscapes vary.</p>
            
            <p><strong>5. Confidentiality</strong><br />
            Both parties agree to keep confidential any proprietary information shared during the engagement.</p>
            
            <p><strong>6. Monthly Calls</strong><br />
            One 20-minute strategy call per month on Thursdays via Google Meet or in-office meeting is included. 
            Additional calls may be scheduled as needed.</p>
          </div>
        </section>

        {/* Signature Section */}
        <section className="bg-white rounded-2xl shadow-sm border-2 border-brand-orange p-6 sm:p-8 mb-6 sm:mb-8">
          <h2 className="text-mobile-md font-bold text-brand-charcoal mb-4 sm:mb-6">Accept & Sign</h2>
          
          {/* Order Summary */}
          <div className="mb-8 p-6 bg-gray-50 rounded-xl border-2 border-gray-200">
            <h3 className="text-lg font-bold text-brand-charcoal mb-4 flex items-center">
              <span className="mr-2">📋</span> Order Summary
            </h3>
            
            {/* Setup Fee */}
            <div className="flex justify-between items-center py-3 border-b border-gray-200">
              <span className="font-medium text-brand-charcoal">Setup Fee (one-time)</span>
              <span className="font-bold text-brand-charcoal text-lg">${setupTotal.toLocaleString()}</span>
            </div>
            
            {/* Monthly Services */}
            <div className="py-3 border-b border-gray-200">
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Monthly Services</p>
              
              <div className="flex justify-between items-center py-1">
                <span className="text-gray-700">Base Retainer</span>
                <span className="font-medium text-brand-charcoal">$1,200/mo</span>
              </div>
              
              {ADD_ONS.filter(a => selectedAddOns.has(a.id)).map(addon => (
                <div key={addon.id} className="flex justify-between items-center py-1">
                  <span className="text-gray-700 flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    {addon.name}
                  </span>
                  <span className="font-medium text-brand-charcoal">${addon.discountedPrice}/mo</span>
                </div>
              ))}
              
              {selectedAddOns.size === 0 && (
                <p className="text-sm text-gray-400 italic py-1">No add-ons selected</p>
              )}
            </div>
            
            {/* Monthly Total */}
            <div className="flex justify-between items-center py-4 border-b border-gray-200">
              <span className="font-bold text-brand-charcoal text-lg">Monthly Total</span>
              <span className="font-bold text-brand-orange text-2xl">${monthlyTotal.toLocaleString()}/mo</span>
            </div>
            
            {/* Ad Budgets */}
            <div className="py-3">
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Ad Budgets (paid to platforms)</p>
              <div className="flex justify-between items-center py-1">
                <span className="text-gray-600">Google Ads</span>
                <span className="text-gray-600">~$1,500/mo</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-gray-600">Facebook/Instagram Ads</span>
                <span className="text-gray-600">{fbAdsBudget === 'basic' ? '$100/mo' : '$200-400/mo'}</span>
              </div>
            </div>
            
            {/* Savings callout */}
            {addOnsSavings > 0 && (
              <div className="mt-3 p-3 bg-green-50 rounded-lg border border-green-200">
                <p className="text-green-700 text-sm font-medium text-center">
                  🎉 You're saving <span className="font-bold">${addOnsSavings}/mo</span> with your selected add-ons!
                </p>
              </div>
            )}
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Legal Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name"
                className="app-input"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address <span className="text-red-500">*</span>
                <span className="text-gray-400 font-normal ml-2 text-xs sm:text-sm">(we'll send you a copy)</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="app-input"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Signature <span className="text-red-500">*</span>
              </label>
              <SignaturePad onSignatureChange={setSignatureData} />
            </div>

            <div className="flex items-start">
              <input
                type="checkbox"
                id="terms"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="mt-1 h-5 w-5 text-brand-orange border-gray-300 rounded focus:ring-brand-orange"
              />
              <label htmlFor="terms" className="ml-3 text-gray-700">
                I have read and agree to the terms and conditions outlined above. I authorize Lead Metrik 
                to begin services upon receipt of the setup fee. <span className="text-red-500">*</span>
              </label>
            </div>

            <div className="pt-4">
              <p className="text-sm text-gray-500 mb-4">
                Date: <span className="font-medium text-gray-700">{currentDate}</span>
              </p>
              
              <button
                onClick={handleSubmit}
                disabled={isSubmitting || !fullName || !email || !signatureData || !agreedToTerms}
                className="app-button-primary w-full text-base sm:text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Processing...' : 'Sign & Accept Proposal'}
              </button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center text-gray-500 text-xs sm:text-sm py-6 sm:py-8">
          <p>Questions? Contact us at <a href="mailto:support@leadmetrik.com" className="text-brand-orange hover:underline active:opacity-70">support@leadmetrik.com</a></p>
          <p className="mt-2">© {new Date().getFullYear()} Lead Metrik. All rights reserved.</p>
        </footer>
      </main>
    </div>
  )
}
