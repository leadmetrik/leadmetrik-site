'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Check, Zap, Crown, Rocket, ArrowRight, X } from 'lucide-react'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://awtcqgoxpleitxatqeoh.supabase.co'

interface TierFeature {
  text: string
  highlight?: boolean
}

interface Tier {
  id: string
  name: string
  price: number
  setupFee: number
  tagline: string
  description: string
  features: TierFeature[]
  isPopular?: boolean
  icon: React.ReactNode
  gradient: string
}

const tiers: Tier[] = [
  {
    id: 'starter',
    name: 'Starter',
    price: 500,
    setupFee: 500,
    tagline: 'Get Found Locally',
    description: 'Perfect for businesses just getting started with SEO',
    icon: <Zap className="w-6 h-6" />,
    gradient: 'from-gray-600 to-gray-700',
    features: [
      { text: '5 target keywords' },
      { text: 'Local SEO optimization' },
      { text: 'Google Business Profile setup' },
      { text: 'Monthly rank reporting' },
      { text: 'Basic backlink building' },
      { text: 'Citation building (25+ sites)' },
    ],
  },
  {
    id: 'growth',
    name: 'Growth',
    price: 1200,
    setupFee: 1000,
    tagline: 'Dominate Your Market',
    description: 'Most popular choice for businesses ready to scale',
    icon: <Rocket className="w-6 h-6" />,
    gradient: 'from-brand-orange to-orange-600',
    isPopular: true,
    features: [
      { text: '5 target keywords' },
      { text: 'Full local SEO package' },
      { text: 'Google Business Profile management' },
      { text: 'Aggressive backlink building', highlight: true },
      { text: 'Google Ads management included', highlight: true },
      { text: 'Monthly strategy call' },
      { text: 'Priority support' },
    ],
  },
  {
    id: 'dominate',
    name: 'Dominate',
    price: 2500,
    setupFee: 1500,
    tagline: 'Own Your City',
    description: 'Full-service marketing for serious growth',
    icon: <Crown className="w-6 h-6" />,
    gradient: 'from-purple-600 to-purple-700',
    features: [
      { text: '10 target keywords', highlight: true },
      { text: '2 URL/domain optimization', highlight: true },
      { text: 'Full GBP management & posts' },
      { text: 'Premium backlink building' },
      { text: 'Google Ads management' },
      { text: 'Facebook/Instagram Ads', highlight: true },
      { text: 'Bi-weekly strategy calls' },
      { text: 'Competitor analysis' },
    ],
  },
]

interface FormData {
  name: string
  email: string
  phone: string
  website: string
  company: string
  industry: string
}

export default function Pricing() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [selectedTier, setSelectedTier] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    website: '',
    company: '',
    industry: '',
  })

  const handleTierSelect = (tierId: string) => {
    setSelectedTier(tierId)
    setError(null)
    // Scroll to modal smoothly
    setTimeout(() => {
      document.getElementById('pricing-modal')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, 100)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedTier) return
    
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch(`${SUPABASE_URL}/functions/v1/save-lead`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          lead_type: 'package',
          selected_tier: selectedTier,
          source: 'pricing_page',
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to submit')
      }

      setSubmitted(true)
    } catch (err) {
      console.error('Submit error:', err)
      setError('Something went wrong. Please try again or call us at (702) 996-4415.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const selectedTierData = tiers.find(t => t.id === selectedTier)

  return (
    <section id="pricing" className="py-24 bg-brand-dark relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-orange/5 blur-[200px] rounded-full" />
      
      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-brand-orange font-semibold text-sm uppercase tracking-wider">
            Simple Pricing
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-4 mb-6">
            Choose Your Growth Plan
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            No hidden fees. No long-term contracts. Just results-driven marketing that pays for itself.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative rounded-2xl border ${
                tier.isPopular
                  ? 'border-brand-orange bg-gradient-to-b from-brand-orange/10 to-transparent'
                  : 'border-gray-800 bg-brand-charcoal/50'
              } p-8 flex flex-col`}
            >
              {/* Popular badge */}
              {tier.isPopular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-brand-orange text-white text-sm font-semibold px-4 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Icon & Name */}
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tier.gradient} flex items-center justify-center text-white`}>
                  {tier.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{tier.name}</h3>
                  <p className="text-gray-500 text-sm">{tier.tagline}</p>
                </div>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-white">${tier.price.toLocaleString()}</span>
                  <span className="text-gray-500">/mo</span>
                </div>
                <p className="text-gray-500 text-sm mt-1">+ ${tier.setupFee} one-time setup</p>
              </div>

              {/* Description */}
              <p className="text-gray-400 text-sm mb-6">{tier.description}</p>

              {/* Features */}
              <ul className="space-y-3 mb-8 flex-grow">
                {tier.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className={`w-5 h-5 flex-shrink-0 mt-0.5 ${feature.highlight ? 'text-brand-orange' : 'text-emerald-500'}`} />
                    <span className={`text-sm ${feature.highlight ? 'text-white font-medium' : 'text-gray-400'}`}>
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button
                onClick={() => handleTierSelect(tier.id)}
                className={`w-full py-4 rounded-full font-semibold transition-all flex items-center justify-center gap-2 ${
                  tier.isPopular
                    ? 'bg-brand-orange hover:bg-brand-orange-dark text-white'
                    : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                }`}
              >
                Get Started
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </div>

        {/* Selected Tier Modal */}
        {selectedTier && !submitted && (
          <motion.div
            id="pricing-modal"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-xl mx-auto bg-brand-charcoal rounded-2xl border border-gray-800 p-8"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${selectedTierData?.gradient} flex items-center justify-center text-white`}>
                  {selectedTierData?.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{selectedTierData?.name} Plan</h3>
                  <p className="text-brand-orange text-sm">${selectedTierData?.price}/mo</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedTier(null)}
                className="text-gray-500 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {error && (
              <div className="mb-4 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-brand-dark border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-brand-orange"
                    placeholder="John Smith"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Phone *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-brand-dark border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-brand-orange"
                    placeholder="(702) 555-0123"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Business Email *</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-brand-dark border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-brand-orange"
                  placeholder="john@yourbusiness.com"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Company Name</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-brand-dark border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-brand-orange"
                    placeholder="Your Business LLC"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Industry *</label>
                  <select
                    name="industry"
                    required
                    value={formData.industry}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-brand-dark border border-gray-700 rounded-lg text-white focus:outline-none focus:border-brand-orange"
                  >
                    <option value="">Select...</option>
                    <option value="medical">Medical / Healthcare</option>
                    <option value="venue">Event Venue</option>
                    <option value="home-services">Home Services</option>
                    <option value="small-business">Other Business</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Website URL</label>
                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-brand-dark border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-brand-orange"
                  placeholder="https://yourbusiness.com"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-brand-orange hover:bg-brand-orange-dark disabled:opacity-50 disabled:cursor-not-allowed text-white py-4 rounded-full font-semibold text-lg transition-all flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    Get My Proposal
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>

              <p className="text-center text-gray-500 text-sm">
                Your proposal will be sent within minutes. No obligations.
              </p>
            </form>
          </motion.div>
        )}

        {/* Success State */}
        {submitted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-xl mx-auto bg-brand-charcoal rounded-2xl border border-emerald-500/30 p-8 text-center"
          >
            <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-emerald-500" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">You're All Set! 🎉</h3>
            <p className="text-gray-400 mb-4">
              Your <span className="text-brand-orange font-semibold">{selectedTierData?.name}</span> proposal is being prepared.
              Check your email — you'll receive it within the next few minutes.
            </p>
            <p className="text-gray-500 text-sm">
              Questions? Call us at <a href="tel:+17029964415" className="text-brand-orange hover:underline">(702) 996-4415</a>
            </p>
          </motion.div>
        )}

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="flex flex-wrap items-center justify-center gap-8 text-gray-500">
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-emerald-500" />
              <span>No long-term contracts</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-emerald-500" />
              <span>Cancel anytime</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-emerald-500" />
              <span>Results within 30 days</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
