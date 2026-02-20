'use client'

import { useEffect, useState, useMemo } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import SignaturePad from '@/components/SignaturePad'

interface AddOn {
  id: string
  name: string
  description: string
  icon: string
  details: string[]
  original_price: number
  discounted_price: number
  highlight: string | null
  sort_order: number
}

interface Keyword {
  keyword: string
  volume: number
  intent: string
  competition: string
}

interface IndustryTemplate {
  industry: string
  display_name: string
  executive_summary: string
  target_keywords: Keyword[]
  seo_deliverables: {
    everyMonth: string[]
    rotating: { name: string; icon: string; items: string[] }[]
  }
  services_setup: string[]
  services_monthly: string[]
  base_setup_fee: number
  base_monthly_retainer: number
}

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
  expires_at: string | null
  keyword_data: {
    keywords: Keyword[]
    total_volume: number
    location: string
    researched_at: string
  } | null
}

const competitionColors: Record<string, string> = {
  'Low': 'bg-green-100 text-green-700',
  'Medium': 'bg-yellow-100 text-yellow-700',
  'Medium-High': 'bg-orange-100 text-orange-700',
  'High': 'bg-red-100 text-red-700',
}

export default function DynamicProposalPage() {
  const params = useParams()
  const slug = params.slug as string
  
  const [proposal, setProposal] = useState<Proposal | null>(null)
  const [template, setTemplate] = useState<IndustryTemplate | null>(null)
  const [addons, setAddons] = useState<AddOn[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // Form state
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [signatureData, setSignatureData] = useState<string | null>(null)
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [fbAdsBudget, setFbAdsBudget] = useState<'basic' | 'recommended'>('recommended')
  const [selectedAddOns, setSelectedAddOns] = useState<Set<string>>(new Set())

  useEffect(() => {
    async function fetchData() {
      try {
        const proposalRes = await fetch(`/api/proposal/${slug}`)
        if (!proposalRes.ok) {
          setError(proposalRes.status === 404 ? 'Proposal not found' : 'Failed to load proposal')
          setLoading(false)
          return
        }
        const proposalData = await proposalRes.json()
        setProposal(proposalData)
        setFbAdsBudget(proposalData.fb_ads_budget || 'recommended')
        
        if (proposalData.recommended_addons?.length) {
          setSelectedAddOns(new Set(proposalData.recommended_addons))
        }

        if (!proposalData.viewed_at) {
          fetch(`/api/proposal/${slug}/view`, { method: 'POST' })
        }

        const templateRes = await fetch(`/api/industry-template/${proposalData.industry}`)
        if (templateRes.ok) {
          const templateData = await templateRes.json()
          setTemplate(templateData)
        }

        const addonsRes = await fetch('/api/addons')
        if (addonsRes.ok) {
          const addonsData = await addonsRes.json()
          setAddons(addonsData)
        }
      } catch {
        setError('Failed to load proposal')
      } finally {
        setLoading(false)
      }
    }
    
    fetchData()
  }, [slug])

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
    const baseMonthly = template?.base_monthly_retainer || proposal?.monthly_retainer || 1200
    const setup = template?.base_setup_fee || proposal?.setup_fee || 1500
    let addOnsMonthly = 0
    let savings = 0
    
    selectedAddOns.forEach(id => {
      const addon = addons.find(a => a.id === id)
      if (addon) {
        addOnsMonthly += addon.discounted_price
        savings += addon.original_price - addon.discounted_price
      }
    })

    return {
      monthlyTotal: baseMonthly + addOnsMonthly,
      setupTotal: setup,
      addOnsTotal: addOnsMonthly,
      addOnsSavings: savings,
    }
  }, [selectedAddOns, addons, template, proposal])

  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  const handleSubmit = async () => {
    if (!fullName || !email || !signatureData || !agreedToTerms) {
      alert('Please complete all required fields: full name, email, signature, and agree to terms.')
      return
    }

    setIsSubmitting(true)
    
    const selectedAddOnDetails = addons.filter(a => selectedAddOns.has(a.id)).map(a => ({
      id: a.id,
      name: a.name,
      price: a.discounted_price,
      originalPrice: a.original_price
    }))

    const addonIdMap: Record<string, string> = {
      'blog': 'seo-blog',
      'reputation': 'reputation',
      'social': 'social-media',
      'email': 'email-marketing',
      'video': 'video-reels',
    }
    const stripeAddonIds = Array.from(selectedAddOns).map(id => addonIdMap[id] || id)
    
    try {
      const stripeResponse = await fetch('/api/stripe/create-subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerEmail: email,
          customerName: fullName,
          businessName: proposal?.business_name || proposal?.client_name,
          selectedAddons: stripeAddonIds,
          signatureData: signatureData,
          proposalId: proposal?.id,
          proposalSlug: slug,
        }),
      })

      const stripeResult = await stripeResponse.json()

      if (!stripeResponse.ok) {
        throw new Error(stripeResult.error || 'Failed to create invoice')
      }

      await fetch('/api/update-proposal-stripe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          proposalId: proposal?.id,
          signatureData,
          selectedAddons: selectedAddOnDetails,
          monthlyTotal,
          fbAdsBudget,
          stripeCustomerId: stripeResult.customerId,
          stripeSubscriptionId: stripeResult.subscriptionId,
          stripeInvoiceId: stripeResult.invoiceId,
        }),
      })

      localStorage.setItem('proposal_signature', JSON.stringify({
        id: proposal?.id,
        name: fullName,
        email: email,
        signature: signatureData,
        date: currentDate,
        fbAdsBudget,
        selectedAddOns: selectedAddOnDetails.map(a => ({ name: a.name, price: a.price })),
        monthlyTotal,
        setupTotal,
        signedAt: new Date().toISOString(),
        stripeInvoiceUrl: stripeResult.invoiceUrl,
        stripeCustomerId: stripeResult.customerId,
      }))

      window.location.href = `/thank-you/${slug}`
    } catch (err) {
      console.error('Error submitting proposal:', err)
      setIsSubmitting(false)
      alert('There was an error submitting your proposal. Please try again or contact support@leadmetrik.com')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-brand-orange border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading proposal...</p>
        </div>
      </div>
    )
  }

  if (error || !proposal) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">Proposal Not Found</h1>
          <p className="text-gray-600">This proposal may have expired or the link is incorrect.</p>
        </div>
      </div>
    )
  }

  // Prefer real keyword data from DataForSEO research, fallback to template
  const keywords = proposal.keyword_data?.keywords || template?.target_keywords || []
  const totalVolume = proposal.keyword_data?.total_volume || keywords.reduce((sum, kw) => sum + kw.volume, 0)
  const servicesSetup = template?.services_setup || []
  const servicesMonthly = template?.services_monthly || []
  const seoDeliverables = template?.seo_deliverables
  const executiveSummary = proposal.custom_intro || template?.executive_summary || 'This proposal outlines a comprehensive digital marketing strategy designed to increase your online visibility, drive qualified leads, and establish your business as a dominant presence in your local market.'

  return (
    <div className="min-h-screen bg-gray-50 proposal-body">
      {/* App-like Header */}
      <header className="app-header">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <Image
            src="/logo.jpg"
            alt="Lead Metrik"
            width={180}
            height={60}
            className="h-10 sm:h-12 w-auto"
            priority
          />
          <span className="text-xs text-gray-500 hidden sm:block">Proposal Date: {currentDate}</span>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6 sm:py-10 pb-24 safe-bottom stagger-children">
        {/* Hero */}
        <div className="text-center mb-6 sm:mb-10">
          <h1 className="text-mobile-lg font-bold text-brand-charcoal mb-2 sm:mb-3">
            Digital Marketing Proposal
          </h1>
          <p className="text-mobile-sm text-gray-600">
            Prepared for <span className="font-semibold text-brand-charcoal">{proposal.client_name}</span>
            {proposal.business_name && <span className="block sm:inline"> — {proposal.business_name}</span>}
          </p>
          <p className="text-xs text-gray-400 mt-2 sm:hidden">{currentDate}</p>
        </div>

        {/* Executive Summary */}
        <section className="app-card mb-4 sm:mb-6">
          <h2 className="text-mobile-md font-bold text-brand-charcoal mb-3">Executive Summary</h2>
          <p className="text-gray-700 leading-relaxed mb-3 text-sm sm:text-base">{executiveSummary}</p>
          <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
            Our goal is to get you ranking in the <strong>Google Maps Top 3</strong> within 4-6 months, 
            allowing you to eventually reduce or eliminate your Google Ads spend while maintaining 
            a steady flow of new leads.
          </p>
        </section>

        {/* Services */}
        <section className="app-card mb-4 sm:mb-6">
          <h2 className="text-mobile-md font-bold text-brand-charcoal mb-4">Services Included</h2>
          
          <div className="space-y-5">
            <div className="border-l-4 border-brand-orange pl-4">
              <h3 className="font-semibold text-base sm:text-lg text-brand-charcoal">Setup + First Month</h3>
              <p className="text-xs sm:text-sm text-gray-500 mb-2">Everything to get you up and running</p>
              <ul className="space-y-1.5 text-sm text-gray-700">
                {servicesSetup.map((service, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-brand-orange mr-2 flex-shrink-0">✓</span>
                    <span>{service}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-l-4 border-brand-orange pl-4">
              <h3 className="font-semibold text-base sm:text-lg text-brand-charcoal">Ongoing Monthly Services</h3>
              <p className="text-xs sm:text-sm text-gray-500 mb-2">Starting Month 2</p>
              <ul className="space-y-1.5 text-sm text-gray-700">
                {servicesMonthly.map((service, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-brand-orange mr-2 flex-shrink-0">✓</span>
                    <span>{service}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Target Keywords */}
        {keywords.length > 0 && (
          <section className="app-card mb-4 sm:mb-6">
            <h2 className="text-mobile-md font-bold text-brand-charcoal mb-2">Target Keywords</h2>
            <p className="text-gray-600 mb-4 text-sm">High-value local search terms we'll target:</p>
            
            <div className="table-scroll">
              <table className="w-full min-w-[500px]">
                <thead>
                  <tr className="border-b-2 border-brand-orange">
                    <th className="text-left py-2.5 px-3 font-semibold text-brand-charcoal text-sm">Keyword</th>
                    <th className="text-left py-2.5 px-3 font-semibold text-brand-charcoal text-sm">Searches</th>
                    <th className="text-left py-2.5 px-3 font-semibold text-brand-charcoal text-sm">Intent</th>
                    <th className="text-left py-2.5 px-3 font-semibold text-brand-charcoal text-sm">Competition</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {keywords.map((kw, i) => (
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="py-2.5 px-3 font-medium text-brand-charcoal text-sm">{kw.keyword}</td>
                      <td className="py-2.5 px-3 text-brand-charcoal font-semibold text-sm">{kw.volume.toLocaleString()}</td>
                      <td className="py-2.5 px-3 text-gray-700 text-sm">{kw.intent}</td>
                      <td className="py-2.5 px-3">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${competitionColors[kw.competition] || 'bg-gray-100 text-gray-700'}`}>
                          {kw.competition}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mt-4 p-3 sm:p-4 bg-brand-orange/10 rounded-lg">
              <p className="text-sm text-brand-charcoal font-medium">
                📊 Total addressable search volume: <span className="font-bold">~{totalVolume.toLocaleString()} searches/month</span>
              </p>
              <p className="text-xs text-gray-600 mt-1">
                Even capturing 5-10% of this traffic = qualified leads every month
              </p>
              {proposal.keyword_data && (
                <p className="text-xs text-gray-500 mt-1 italic">
                  Data from Google Ads API • {proposal.keyword_data.location} market
                </p>
              )}
            </div>
          </section>
        )}

        {/* SEO Deliverables */}
        {seoDeliverables && (
          <section className="app-card mb-4 sm:mb-6">
            <h2 className="text-mobile-md font-bold text-brand-charcoal mb-2">Monthly SEO Deliverables</h2>
            <p className="text-gray-600 mb-5 text-sm">Here's exactly what we deliver every month:</p>
            
            {/* Every Month */}
            <div className="mb-6">
              <h3 className="text-base sm:text-lg font-semibold text-brand-charcoal mb-3 flex items-center">
                <span className="w-7 h-7 sm:w-8 sm:h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-xs sm:text-sm mr-2 flex-shrink-0">✓</span>
                Every Month
              </h3>
              <div className="bg-gray-50 rounded-xl p-4">
                <ul className="space-y-1.5 text-sm text-gray-700">
                  {seoDeliverables.everyMonth?.map((item, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-brand-orange mr-2">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Rotating */}
            {seoDeliverables.rotating?.length > 0 && (
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-brand-charcoal mb-2 flex items-center">
                  <span className="w-7 h-7 sm:w-8 sm:h-8 bg-brand-orange rounded-full flex items-center justify-center text-white text-xs sm:text-sm mr-2 flex-shrink-0">⚡</span>
                  High-Power Link Building
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm mb-3">One of the following each month (rotating based on your needs):</p>
                
                <div className="grid sm:grid-cols-2 gap-3">
                  {seoDeliverables.rotating.map((service, i) => (
                    <div key={i} className="bg-gray-50 rounded-xl p-4 border-2 border-dashed border-gray-200">
                      <div className="flex items-center mb-2">
                        <span className="text-xl sm:text-2xl mr-2">{service.icon}</span>
                        <h4 className="font-semibold text-brand-charcoal text-sm sm:text-base">{service.name}</h4>
                      </div>
                      <ul className="space-y-0.5 text-xs sm:text-sm text-gray-600">
                        {service.items?.map((item, j) => (
                          <li key={j}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                <div className="mt-4 p-3 bg-orange-50 rounded-lg border border-orange-200">
                  <p className="text-xs sm:text-sm text-brand-charcoal">
                    <strong>💡 Why we rotate:</strong> Rotating link types creates a natural, diverse backlink profile 
                    that Google rewards. Over 4 months, you'll receive all four high-power link building services.
                  </p>
                </div>
              </div>
            )}
          </section>
        )}

        {/* Pricing */}
        <section className="app-card mb-4 sm:mb-6">
          <h2 className="text-mobile-md font-bold text-brand-charcoal mb-4">Investment</h2>
          
          <div className="overflow-hidden rounded-xl border border-gray-200">
            <table className="w-full">
              <thead className="bg-brand-charcoal text-white">
                <tr>
                  <th className="px-4 sm:px-6 py-3 text-left font-semibold text-sm">Service</th>
                  <th className="px-4 sm:px-6 py-3 text-right font-semibold text-sm">Price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="bg-orange-50">
                  <td className="px-4 sm:px-6 py-3 font-medium text-brand-charcoal text-sm">Setup + First Month</td>
                  <td className="px-4 sm:px-6 py-3 text-right font-bold text-brand-charcoal">${setupTotal.toLocaleString()}</td>
                </tr>
                <tr className="bg-orange-50">
                  <td className="px-4 sm:px-6 py-3 font-medium text-brand-charcoal text-sm">
                    Monthly Retainer
                    <span className="block sm:inline text-xs font-normal text-gray-500 sm:ml-1">(starts Month 2)</span>
                  </td>
                  <td className="px-4 sm:px-6 py-3 text-right font-bold text-brand-charcoal">${(template?.base_monthly_retainer || 1200).toLocaleString()}/mo</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Ad Budget Selection */}
          <div className="mt-6 p-4 sm:p-5 bg-gray-50 rounded-xl">
            <h3 className="font-semibold text-brand-charcoal mb-3 text-sm sm:text-base">Client-Paid Ad Budgets (Separate)</h3>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                <div>
                  <p className="font-medium text-brand-charcoal text-sm">Google Ads Budget</p>
                  <p className="text-xs text-gray-500">Managed by Lead Metrik</p>
                </div>
                <p className="font-bold text-brand-charcoal">~$1,500/mo</p>
              </div>

              <div className="p-3 bg-white rounded-lg border border-gray-200">
                <p className="font-medium text-brand-charcoal mb-2 text-sm">Facebook/Instagram Ads Budget</p>
                <div className="space-y-2">
                  <label className={`flex items-center p-2.5 rounded-lg border-2 cursor-pointer transition-colors touch-manipulation ${fbAdsBudget === 'basic' ? 'border-brand-orange bg-orange-50' : 'border-gray-200 hover:bg-gray-50'}`}>
                    <input
                      type="radio"
                      name="fbBudget"
                      checked={fbAdsBudget === 'basic'}
                      onChange={() => setFbAdsBudget('basic')}
                      className="sr-only"
                    />
                    <div className={`w-4 h-4 rounded-full border-2 mr-2 flex items-center justify-center flex-shrink-0 ${fbAdsBudget === 'basic' ? 'border-brand-orange' : 'border-gray-300'}`}>
                      {fbAdsBudget === 'basic' && <div className="w-2 h-2 rounded-full bg-brand-orange"></div>}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-brand-charcoal text-sm">Basic — $100/mo</p>
                      <p className="text-xs text-gray-500">Entry-level retargeting</p>
                    </div>
                  </label>

                  <label className={`flex items-center p-2.5 rounded-lg border-2 cursor-pointer transition-colors touch-manipulation ${fbAdsBudget === 'recommended' ? 'border-brand-orange bg-orange-50' : 'border-gray-200 hover:bg-gray-50'}`}>
                    <input
                      type="radio"
                      name="fbBudget"
                      checked={fbAdsBudget === 'recommended'}
                      onChange={() => setFbAdsBudget('recommended')}
                      className="sr-only"
                    />
                    <div className={`w-4 h-4 rounded-full border-2 mr-2 flex items-center justify-center flex-shrink-0 ${fbAdsBudget === 'recommended' ? 'border-brand-orange' : 'border-gray-300'}`}>
                      {fbAdsBudget === 'recommended' && <div className="w-2 h-2 rounded-full bg-brand-orange"></div>}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-brand-charcoal text-sm">Recommended — $200-$400/mo</p>
                      <p className="text-xs text-gray-500">Better reach & results</p>
                    </div>
                    <span className="px-2 py-0.5 bg-brand-orange text-white text-[10px] font-bold rounded ml-2 flex-shrink-0">BEST</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Power Add-Ons */}
        {addons.length > 0 && (
          <section className="app-card mb-4 sm:mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
              <h2 className="text-mobile-md font-bold text-brand-charcoal">Power Add-Ons</h2>
              <span className="px-3 py-1 bg-brand-orange text-white rounded-full text-xs font-bold self-start sm:self-auto">
                EXCLUSIVE RATES
              </span>
            </div>
            <p className="text-gray-600 mb-5 text-sm">
              Supercharge your marketing with these high-impact services
            </p>

            <div className="space-y-3">
              {addons.map((addon) => {
                const isSelected = selectedAddOns.has(addon.id)
                return (
                  <div
                    key={addon.id}
                    onClick={() => toggleAddOn(addon.id)}
                    className={`relative rounded-xl cursor-pointer transition-all duration-200 touch-manipulation ${
                      isSelected 
                        ? 'bg-orange-50 border-2 border-brand-orange shadow-md' 
                        : 'bg-gray-50 border-2 border-transparent hover:border-gray-200 active:bg-gray-100'
                    }`}
                  >
                    {addon.highlight && (
                      <span className={`absolute -top-2 right-3 px-2 py-0.5 text-[10px] font-bold rounded-full ${
                        isSelected ? 'bg-brand-orange text-white' : 'bg-gray-300 text-gray-600'
                      }`}>
                        {addon.highlight}
                      </span>
                    )}
                    
                    <div className="p-4">
                      <div className="flex items-start gap-3">
                        {/* Checkbox */}
                        <div className={`flex-shrink-0 w-6 h-6 rounded-lg border-2 flex items-center justify-center mt-0.5 transition-all ${
                          isSelected ? 'bg-brand-orange border-brand-orange' : 'border-gray-300'
                        }`}>
                          {isSelected && (
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                        
                        {/* Icon */}
                        <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-brand-orange to-orange-500 rounded-xl flex items-center justify-center text-xl sm:text-2xl shadow-md">
                          {addon.icon}
                        </div>
                        
                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0">
                              <h3 className="text-base sm:text-lg font-bold text-brand-charcoal leading-tight">{addon.name}</h3>
                              <p className="text-gray-500 text-xs sm:text-sm mt-0.5">{addon.description}</p>
                            </div>
                            {/* Price - Mobile: below title, Desktop: right side */}
                            <div className="text-right flex-shrink-0">
                              <p className="text-gray-400 line-through text-sm">${addon.original_price}</p>
                              <p className="text-xl sm:text-2xl font-bold text-brand-orange">
                                ${addon.discounted_price}
                                <span className="text-xs font-normal text-gray-400">/mo</span>
                              </p>
                              <p className="text-green-600 text-xs font-medium">
                                Save ${addon.original_price - addon.discounted_price}
                              </p>
                            </div>
                          </div>
                          
                          {/* Details - hidden on very small screens */}
                          <ul className="hidden sm:grid sm:grid-cols-2 gap-x-3 gap-y-0.5 text-xs text-gray-600 mt-2">
                            {addon.details.map((detail, i) => (
                              <li key={i} className="flex items-center">
                                <span className="text-brand-orange mr-1">✓</span>
                                {detail}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Total Calculator */}
            <div className="mt-5 p-4 sm:p-5 bg-brand-charcoal rounded-xl text-white">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold mb-0.5">Your Investment</h3>
                  {selectedAddOns.size > 0 && (
                    <p className="text-green-400 text-xs sm:text-sm">
                      🎉 Saving <span className="font-bold">${addOnsSavings}/mo</span> with add-on discounts!
                    </p>
                  )}
                </div>
                
                <div className="text-left sm:text-right">
                  <div className="flex items-baseline gap-2 sm:justify-end">
                    <span className="text-gray-400 text-sm">Setup:</span>
                    <span className="text-xl font-bold">${setupTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex items-baseline gap-2 sm:justify-end">
                    <span className="text-gray-400 text-sm">Monthly:</span>
                    <span className="text-3xl sm:text-4xl font-bold text-brand-orange">${monthlyTotal.toLocaleString()}</span>
                    <span className="text-gray-400">/mo</span>
                  </div>
                  {selectedAddOns.size > 0 && (
                    <p className="text-xs text-gray-400 mt-1">
                      Base: ${template?.base_monthly_retainer || 1200} + Add-ons: ${addOnsTotal}
                    </p>
                  )}
                </div>
              </div>
              
              {selectedAddOns.size >= 3 && (
                <div className="mt-3 p-2.5 bg-green-500/20 rounded-lg border border-green-500/30 text-center">
                  <p className="text-green-300 text-sm font-medium">
                    🔥 <span className="font-bold">Pro Bundle!</span> You've selected {selectedAddOns.size} add-ons — maximum impact!
                  </p>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Timeline */}
        <section className="app-card mb-4 sm:mb-6">
          <h2 className="text-mobile-md font-bold text-brand-charcoal mb-4">Timeline & Expectations</h2>
          
          <div className="space-y-4">
            {[
              { num: '1', title: 'Month 1: Foundation', desc: 'Audit, setup, access configuration, initial optimizations' },
              { num: '2-3', title: 'Months 2-3: Build Momentum', desc: 'Citation building, ad optimization, content improvements' },
              { num: '4-6', title: 'Months 4-6: Map Pack Ranking', desc: 'Target Google Maps Top 3, begin reducing paid ad dependency' },
            ].map((step, i) => (
              <div key={i} className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-brand-orange rounded-full flex items-center justify-center text-white font-bold text-sm">{step.num}</div>
                <div className="ml-3 sm:ml-4">
                  <h3 className="font-semibold text-brand-charcoal text-sm sm:text-base">{step.title}</h3>
                  <p className="text-gray-600 text-xs sm:text-sm">{step.desc}</p>
                </div>
              </div>
            ))}
            <div className="flex items-start">
              <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm">✓</div>
              <div className="ml-3 sm:ml-4">
                <h3 className="font-semibold text-brand-charcoal text-sm sm:text-base">Goal: Reduce Google Ads</h3>
                <p className="text-gray-600 text-xs sm:text-sm">Once Maps ranking is stable, lower or stop Google Ads spend</p>
              </div>
            </div>
          </div>
        </section>

        {/* Terms */}
        <section className="app-card mb-4 sm:mb-6">
          <h2 className="text-mobile-md font-bold text-brand-charcoal mb-4">Terms & Conditions</h2>
          
          <div className="prose prose-sm prose-gray max-w-none text-gray-700 space-y-3 text-xs sm:text-sm">
            <p><strong>1. Payment Terms</strong><br />
            Setup fee of ${setupTotal.toLocaleString()} is due upon signing. Monthly retainer is billed on the 1st of each month, 
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
            One 20-minute strategy call per month on Thursdays via Google Meet or in-office meeting is included.</p>
          </div>
        </section>

        {/* Signature Section */}
        <section className="app-card border-2 border-brand-orange mb-4 sm:mb-6">
          <h2 className="text-mobile-md font-bold text-brand-charcoal mb-4">Accept & Sign</h2>
          
          {/* Order Summary */}
          <div className="mb-6 p-4 bg-gray-50 rounded-xl border-2 border-gray-200">
            <h3 className="text-base font-bold text-brand-charcoal mb-3 flex items-center">
              <span className="mr-2">📋</span> Order Summary
            </h3>
            
            <div className="flex justify-between items-center py-2.5 border-b border-gray-200">
              <span className="font-medium text-brand-charcoal text-sm">Setup Fee (one-time)</span>
              <span className="font-bold text-brand-charcoal">${setupTotal.toLocaleString()}</span>
            </div>
            
            <div className="py-2.5 border-b border-gray-200 space-y-1.5">
              <div className="flex justify-between items-center">
                <span className="text-gray-700 text-sm">Base Retainer</span>
                <span className="font-medium text-brand-charcoal text-sm">${template?.base_monthly_retainer || 1200}/mo</span>
              </div>
              
              {addons.filter(a => selectedAddOns.has(a.id)).map(addon => (
                <div key={addon.id} className="flex justify-between items-center">
                  <span className="text-gray-700 text-sm flex items-center">
                    <span className="mr-1.5">{addon.icon}</span>
                    {addon.name}
                  </span>
                  <span className="font-medium text-brand-charcoal text-sm">${addon.discounted_price}/mo</span>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center py-2.5">
              <span className="font-bold text-brand-charcoal">Monthly Total</span>
              <span className="font-bold text-brand-orange text-xl">${monthlyTotal.toLocaleString()}/mo</span>
            </div>
          </div>

          {/* Client Info */}
          <div className="grid sm:grid-cols-2 gap-3 mb-4">
            <div>
              <label className="block text-sm font-medium text-brand-charcoal mb-1.5">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full legal name"
                className="app-input"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-charcoal mb-1.5">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="app-input"
              />
            </div>
          </div>

          {/* Signature Pad */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-brand-charcoal mb-1.5">
              Signature <span className="text-red-500">*</span>
            </label>
            <SignaturePad onSave={setSignatureData} />
          </div>

          {/* Terms Checkbox */}
          <label className="flex items-start gap-3 mb-5 cursor-pointer touch-manipulation">
            <input
              type="checkbox"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              className="mt-0.5 w-5 h-5 text-brand-orange border-2 border-gray-300 rounded focus:ring-brand-orange flex-shrink-0"
            />
            <span className="text-gray-700 text-xs sm:text-sm">
              I have read and agree to the terms and conditions outlined in this proposal. 
              I understand that signing this agreement authorizes Lead Metrik to begin work and 
              charge the fees specified above.
            </span>
          </label>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={isSubmitting || !fullName || !email || !signatureData || !agreedToTerms}
            className="w-full py-4 bg-gradient-to-r from-brand-orange to-orange-500 text-white text-base sm:text-lg font-bold rounded-xl hover:from-orange-600 hover:to-orange-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg active:scale-[0.98] touch-manipulation"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : (
              <>Sign & Accept Proposal</>
            )}
          </button>

          <p className="text-center text-xs text-gray-500 mt-3">
            By signing, you'll receive an invoice via email for the setup fee.
          </p>
        </section>

        {/* Expiration Notice */}
        {proposal.expires_at && (
          <p className="text-center text-gray-500 text-xs sm:text-sm">
            This proposal expires on {new Date(proposal.expires_at).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        )}

        {/* Custom Notes */}
        {proposal.custom_notes && (
          <section className="bg-blue-50 rounded-2xl border border-blue-200 p-4 mt-4">
            <h3 className="font-semibold text-blue-800 mb-1.5 text-sm">📝 Additional Notes</h3>
            <p className="text-blue-700 text-sm">{proposal.custom_notes}</p>
          </section>
        )}
      </main>
    </div>
  )
}
