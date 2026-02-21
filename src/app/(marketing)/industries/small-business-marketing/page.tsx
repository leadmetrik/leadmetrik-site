'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import AnimatedCounter from '@/components/AnimatedCounter'

// Rotating business types for hero
const businessTypes = [
  { name: 'Restaurant', icon: '🍽️' },
  { name: 'Boutique', icon: '👗' },
  { name: 'Salon', icon: '💇' },
  { name: 'Auto Shop', icon: '🔧' },
  { name: 'Gym', icon: '💪' },
  { name: 'Pet Store', icon: '🐕' },
  { name: 'Bakery', icon: '🧁' },
  { name: 'Law Firm', icon: '⚖️' },
]

// Pain points data
const painPoints = [
  {
    icon: '💸',
    title: 'Limited Budget',
    description: 'Big chains spend millions. You need results on hundreds.',
    stat: '49%',
    statLabel: 'cite budget as #1 challenge',
  },
  {
    icon: '⏰',
    title: 'No Time for Marketing',
    description: "You're running the business. Who has time for SEO and social?",
    stat: '65%',
    statLabel: 'struggle with time or budget',
  },
  {
    icon: '🔥',
    title: 'Burned by Agencies',
    description: "You've paid for fancy reports and excuses. Never again.",
    stat: '73%',
    statLabel: "unsure their marketing works",
  },
  {
    icon: '🏢',
    title: 'Competing with Giants',
    description: 'Walmart, Amazon, and chains have unlimited ad budgets.',
    stat: '33M',
    statLabel: 'small businesses competing',
  },
  {
    icon: '🤯',
    title: 'Confused by Options',
    description: 'SEO? PPC? Social? Email? TikTok? Where do you even start?',
    stat: '17%',
    statLabel: 'of small businesses use SEO',
  },
  {
    icon: '📊',
    title: "Can't Measure Results",
    description: 'Is your marketing working? Most owners have no idea.',
    stat: '73%',
    statLabel: "don't know if it's working",
  },
]

// Business type tabs
const businessTabs = [
  {
    id: 'restaurants',
    name: 'Restaurants & Cafes',
    icon: '🍽️',
    challenges: [
      'Delivery apps eating 30% of profits',
      'Competing with chains for "near me" searches',
      'Managing reviews across multiple platforms',
      'Seasonal traffic fluctuations',
    ],
    solutions: [
      'Google Business Profile dominance',
      'Direct ordering system promotion',
      'Review generation automation',
      'Local SEO for cuisine keywords',
    ],
    keywords: ['restaurants near me', 'best brunch las vegas', 'italian food henderson'],
    avgTicket: '$45-85 per table',
    cta: 'Fill More Tables',
  },
  {
    id: 'retail',
    name: 'Retail Stores',
    icon: '🛍️',
    challenges: [
      'Amazon killing foot traffic',
      'Showrooming (browse in-store, buy online)',
      'Inventory visibility online',
      'Competing with big box stores',
    ],
    solutions: [
      'Local inventory ads on Google',
      'Google Shopping campaigns',
      '"In stock near me" optimization',
      'Instagram shopping integration',
    ],
    keywords: ['boutique las vegas', 'gift shop near me', 'clothing store henderson'],
    avgTicket: '$75-200 per visit',
    cta: 'Drive More Foot Traffic',
  },
  {
    id: 'professional',
    name: 'Professional Services',
    icon: '💼',
    challenges: [
      'Trust is everything in your industry',
      'Long sales cycles',
      'Competing with established firms',
      'Generating qualified leads (not tire-kickers)',
    ],
    solutions: [
      'Thought leadership content',
      'Review and testimonial strategy',
      'LinkedIn presence building',
      'Local SEO for service keywords',
    ],
    keywords: ['accountant las vegas', 'lawyer near me', 'financial advisor henderson'],
    avgTicket: '$500-5,000+ per client',
    cta: 'Attract Better Clients',
  },
  {
    id: 'health',
    name: 'Health & Wellness',
    icon: '🏋️',
    challenges: [
      'High competition in fitness/wellness',
      'ClassPass and aggregators taking margins',
      'Seasonal membership fluctuations',
      'Retaining members long-term',
    ],
    solutions: [
      'Niche positioning and branding',
      'Google Maps optimization',
      'Member referral programs',
      'Content marketing for expertise',
    ],
    keywords: ['gym near me', 'yoga studio las vegas', 'spa henderson'],
    avgTicket: '$50-150/month membership',
    cta: 'Grow Your Membership',
  },
  {
    id: 'auto',
    name: 'Auto Services',
    icon: '🚗',
    challenges: [
      'Emergency searches need instant visibility',
      'Trust issues (mechanics have bad rep)',
      'Competing with dealership service centers',
      'Tracking phone calls from ads',
    ],
    solutions: [
      'Google Maps dominance',
      'Review generation (trust signals)',
      'Call tracking and recording',
      'Emergency keyword targeting',
    ],
    keywords: ['mechanic near me', 'auto repair las vegas', 'oil change henderson'],
    avgTicket: '$150-800 per service',
    cta: 'Get More Service Calls',
  },
  {
    id: 'pets',
    name: 'Pet Services',
    icon: '🐕',
    challenges: [
      'Pet parents are emotional buyers',
      'High competition in grooming/boarding',
      'Seasonal demand (holidays = boarding rush)',
      'Building trust with first-time customers',
    ],
    solutions: [
      'Visual content (cute pet photos!)',
      'Review strategy (pet parents love sharing)',
      'Google Business Profile optimization',
      'Seasonal campaign planning',
    ],
    keywords: ['dog groomer near me', 'pet boarding las vegas', 'vet henderson'],
    avgTicket: '$50-150 per visit',
    cta: 'Book More Appointments',
  },
]

// Services accordion data
const services = [
  {
    title: 'Google Business Profile Optimization',
    description: 'Your Google listing is often the first impression. We optimize every element — photos, posts, Q&A, attributes, and categories — to outrank competitors in the Map Pack.',
    features: ['Complete profile optimization', 'Weekly Google Posts', 'Q&A management', 'Photo optimization', 'Category strategy'],
  },
  {
    title: 'Local SEO & Maps Domination',
    description: "Get found when customers search 'near me'. We build citations, optimize for local keywords, and ensure you show up in the 3-pack for your most valuable searches.",
    features: ['Citation building (50+ directories)', 'Local keyword optimization', 'NAP consistency audit', 'Competitor gap analysis', 'Monthly ranking reports'],
  },
  {
    title: 'Reputation Management',
    description: '68% of consumers only use businesses with 4+ stars. We help you generate more reviews, respond professionally, and turn happy customers into advocates.',
    features: ['Review generation campaigns', 'Review response templates', 'Negative review mitigation', 'Review monitoring alerts', 'Competitor review analysis'],
  },
  {
    title: 'Social Media Management',
    description: "Stay top of mind without spending hours on content. We create and schedule posts that showcase your business and engage your local community.",
    features: ['Content calendar creation', '3-5 posts per week', 'Community engagement', 'Local hashtag strategy', 'Monthly performance reports'],
  },
  {
    title: 'Budget-Friendly Google Ads',
    description: "Big results don't require big budgets. We run hyper-targeted local campaigns that put your business in front of ready-to-buy customers.",
    features: ['Campaign setup & optimization', 'Keyword research', 'Ad copywriting', 'Landing page recommendations', 'Weekly budget optimization'],
  },
  {
    title: 'Small Business Website Design',
    description: 'A website that actually converts visitors into customers. Mobile-first, fast-loading, and designed to generate leads — not just look pretty.',
    features: ['Mobile-responsive design', 'SEO-optimized structure', 'Contact form integration', 'Google Analytics setup', 'Speed optimization'],
  },
]

// Process timeline
const processSteps = [
  {
    week: 'Week 1',
    title: 'Audit & Strategy',
    description: 'We analyze your current online presence, competitors, and opportunities. You get a clear roadmap with priorities.',
    tasks: ['Website audit', 'Google Business review', 'Competitor analysis', 'Keyword research', 'Strategy presentation'],
  },
  {
    week: 'Week 2',
    title: 'Foundation Building',
    description: 'Fix the basics first. We optimize your Google Business Profile, fix website issues, and ensure your NAP is consistent everywhere.',
    tasks: ['GBP optimization', 'Website quick wins', 'Citation cleanup', 'Review strategy setup', 'Tracking installation'],
  },
  {
    week: 'Week 3-4',
    title: 'Content & Reviews',
    description: 'Start building momentum with fresh content, review generation, and social presence that positions you as the local expert.',
    tasks: ['Content creation', 'Review outreach', 'Social media launch', 'Blog post #1', 'Google Posts schedule'],
  },
  {
    week: 'Month 2+',
    title: 'Growth & Scaling',
    description: 'With foundations set, we accelerate. More content, more reviews, paid ads if needed, and continuous optimization.',
    tasks: ['Ongoing SEO', 'Paid ads (optional)', 'Monthly reporting', 'Strategy calls', 'Continuous improvement'],
  },
]

// FAQ data
const faqs = [
  {
    question: 'How much should a small business spend on marketing?',
    answer: "The SBA recommends 7-8% of revenue for established businesses, 10-12% for growth mode. But it's not about the amount — it's about ROI. We've seen businesses get better results with $500/month done right than $5,000/month done wrong. Our Starter package begins at $500/month.",
  },
  {
    question: 'How long until I see results?',
    answer: "You'll see improvements in your Google Business Profile within 2-4 weeks. Local SEO rankings typically improve within 60-90 days. Paid ads can generate leads within days of launch. We set realistic expectations upfront — no overnight miracles, but steady, measurable progress.",
  },
  {
    question: "What if I've been burned by agencies before?",
    answer: "We hear this constantly. That's why we do things differently: no long-term contracts (month-to-month), transparent reporting you can actually understand, and we actually answer the phone when you call. We measure success by your business growth, not vanity metrics.",
  },
  {
    question: 'Do I need a website to work with you?',
    answer: "Not necessarily. Many small businesses get excellent results from Google Business Profile optimization alone. That said, a good website converts more visitors into customers. We can help you build one if needed, or work with what you have.",
  },
  {
    question: 'How do you compete with agencies that have bigger teams?',
    answer: "Bigger isn't better. Large agencies spread their attention across hundreds of clients. We intentionally keep our client roster small so every business gets real attention. You'll work directly with strategists, not junior account managers reading from scripts.",
  },
  {
    question: "What's included in my monthly investment?",
    answer: "Everything is transparent. Our Starter package ($500/mo) includes: Google Business Profile optimization, local SEO foundations, review management, and monthly reporting with a strategy call. No hidden fees, no surprise charges. What you see is what you get.",
  },
  {
    question: 'Can you help with just one thing, like reviews?',
    answer: "Absolutely. While our full packages deliver the best results, we understand budget constraints. We offer à la carte services for businesses that need help with specific areas. Let's talk about what matters most to your business right now.",
  },
  {
    question: 'Why should I hire an agency instead of doing it myself?',
    answer: "You could learn digital marketing — it would take 6-12 months to get competent. But your time is better spent running your business. We bring years of experience, proven systems, and tools that would cost you thousands monthly. For most small business owners, outsourcing marketing is the highest-ROI decision they make.",
  },
]

export default function SmallBusinessMarketing() {
  const [activeTab, setActiveTab] = useState('restaurants')
  const [openAccordion, setOpenAccordion] = useState<number | null>(0)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [currentBusiness, setCurrentBusiness] = useState(0)

  const heroRef = useRef(null)
  const statsRef = useRef(null)
  const painRef = useRef(null)
  const tabsRef = useRef(null)
  const servicesRef = useRef(null)
  const processRef = useRef(null)
  const faqRef = useRef(null)

  const heroInView = useInView(heroRef, { once: true })
  const statsInView = useInView(statsRef, { once: true })
  const painInView = useInView(painRef, { once: true, margin: "-100px" })
  const tabsInView = useInView(tabsRef, { once: true, margin: "-100px" })
  const servicesInView = useInView(servicesRef, { once: true, margin: "-100px" })
  const processInView = useInView(processRef, { once: true, margin: "-100px" })
  const faqInView = useInView(faqRef, { once: true, margin: "-100px" })

  // Rotate business types in hero
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBusiness((prev) => (prev + 1) % businessTypes.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  const activeTabData = businessTabs.find((tab) => tab.id === activeTab)

  // Schema.org structured data
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "LeadMetrik - Small Business Marketing Las Vegas",
    "description": "Digital marketing agency specializing in small business growth. Local SEO, Google Ads, reputation management, and social media for Las Vegas small businesses.",
    "url": "https://leadmetrik.com/industries/small-business-marketing",
    "telephone": "+1-702-996-4415",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Las Vegas",
      "addressRegion": "NV",
      "addressCountry": "US"
    },
    "areaServed": {
      "@type": "City",
      "name": "Las Vegas"
    },
    "priceRange": "$500-$2500/month"
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="min-h-screen bg-brand-dark pt-20">
        {/* Hero Section */}
        <section ref={heroRef} className="py-20 relative overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-brand-orange/10 via-transparent to-brand-orange/5" />
          
          {/* Floating icons */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {['🏪', '📈', '⭐', '📱', '💰', '🎯'].map((icon, i) => (
              <motion.div
                key={i}
                className="absolute text-4xl opacity-20"
                style={{
                  left: `${15 + i * 15}%`,
                  top: `${20 + (i % 3) * 25}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 4 + i * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {icon}
              </motion.div>
            ))}
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5 }}
              >
                <span className="inline-flex items-center gap-2 bg-brand-orange/10 text-brand-orange px-4 py-2 rounded-full text-sm font-semibold mb-6">
                  <span className="text-xl">🏪</span>
                  Small Business Marketing Las Vegas
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
              >
                Big Results.{' '}
                <span className="bg-gradient-to-r from-brand-orange to-orange-400 bg-clip-text text-transparent">
                  Small Business Budget.
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-xl text-gray-400 mb-8 max-w-2xl"
              >
                Compete with big chains without the corporate marketing team. 
                We help Las Vegas small businesses get found, get chosen, and get more customers.
              </motion.p>

              {/* Rotating business type */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mb-8"
              >
                <div className="inline-flex items-center gap-3 bg-brand-charcoal/50 border border-gray-700 rounded-2xl px-6 py-4">
                  <span className="text-gray-400 text-sm">Marketing for your</span>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentBusiness}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center gap-2"
                    >
                      <span className="text-2xl">{businessTypes[currentBusiness].icon}</span>
                      <span className="text-white font-semibold text-lg">
                        {businessTypes[currentBusiness].name}
                      </span>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </motion.div>

              {/* CTA buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link
                  href="#contact"
                  className="group relative inline-flex items-center justify-center gap-2 bg-brand-orange hover:bg-brand-orange-dark text-white px-8 py-4 rounded-full font-semibold text-lg transition-all overflow-hidden"
                >
                  <span className="relative z-10">Get Your Free Audit</span>
                  <svg className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                  <div className="absolute inset-0 bg-gradient-to-r from-brand-orange-dark to-brand-orange opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
                <Link
                  href="tel:+17029964415"
                  className="inline-flex items-center justify-center gap-2 border border-gray-700 hover:border-brand-orange/50 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all"
                >
                  <svg className="w-5 h-5 text-brand-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  (702) 996-4415
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats Bar */}
        <section ref={statsRef} className="py-12 bg-brand-charcoal/50 border-y border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { value: 33, suffix: 'M', label: 'Small Businesses in US' },
                { value: 46, suffix: '%', label: 'Searches Have Local Intent' },
                { value: 17, suffix: '%', label: 'Use SEO (Huge Opportunity!)' },
                { value: 68, suffix: '%', label: 'Require 4+ Star Rating' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={statsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl md:text-4xl font-bold text-brand-orange mb-2">
                    {statsInView && (
                      <AnimatedCounter end={stat.value} suffix={stat.suffix} duration={2} />
                    )}
                  </div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Pain Points */}
        <section ref={painRef} className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={painInView ? { opacity: 1, y: 0 } : {}}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                We Get It. Small Business Marketing Is{' '}
                <span className="text-brand-orange">Hard.</span>
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                You're not alone. These are the challenges every small business owner faces.
              </p>
            </motion.div>

            {/* Mobile: horizontal scroll, Desktop: grid */}
            <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-x-auto md:overflow-visible pb-4 md:pb-0 snap-x snap-mandatory md:snap-none -mx-4 px-4 md:mx-0 md:px-0">
              {painPoints.map((point, index) => (
                <motion.div
                  key={point.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={painInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex-shrink-0 w-[300px] md:w-auto snap-start bg-brand-charcoal/50 border border-gray-800 hover:border-brand-orange/30 rounded-2xl p-6 transition-all group"
                >
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                    {point.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{point.title}</h3>
                  <p className="text-gray-400 mb-4">{point.description}</p>
                  <div className="flex items-center gap-2 text-brand-orange">
                    <span className="text-2xl font-bold">{point.stat}</span>
                    <span className="text-sm text-gray-500">{point.statLabel}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Business Type Tabs */}
        <section ref={tabsRef} className="py-20 bg-brand-charcoal/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={tabsInView ? { opacity: 1, y: 0 } : {}}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Marketing Tailored to{' '}
                <span className="text-brand-orange">Your Business</span>
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Different businesses need different strategies. Here's how we help yours.
              </p>
            </motion.div>

            {/* Tab buttons - horizontal scroll on mobile */}
            <div className="flex overflow-x-auto pb-4 mb-8 gap-2 snap-x snap-mandatory -mx-4 px-4 md:mx-0 md:px-0 md:flex-wrap md:justify-center">
              {businessTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-shrink-0 snap-start flex items-center gap-2 px-5 py-3 rounded-full font-semibold text-sm transition-all whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-brand-orange text-white'
                      : 'bg-brand-charcoal/50 text-gray-400 hover:text-white border border-gray-700 hover:border-gray-600'
                  }`}
                >
                  <span className="text-lg">{tab.icon}</span>
                  {tab.name}
                </button>
              ))}
            </div>

            {/* Tab content */}
            <AnimatePresence mode="wait">
              {activeTabData && (
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-brand-dark border border-gray-800 rounded-2xl p-6 md:p-8"
                >
                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Challenges */}
                    <div>
                      <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <span className="text-red-400">⚠️</span>
                        Your Challenges
                      </h3>
                      <ul className="space-y-3">
                        {activeTabData.challenges.map((challenge, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <svg className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            <span className="text-gray-300">{challenge}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Solutions */}
                    <div>
                      <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <span className="text-green-400">✅</span>
                        Our Solutions
                      </h3>
                      <ul className="space-y-3">
                        {activeTabData.solutions.map((solution, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <svg className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-gray-300">{solution}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Bottom info */}
                  <div className="mt-8 pt-6 border-t border-gray-800 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex flex-wrap gap-2">
                      <span className="text-gray-500 text-sm">Target keywords:</span>
                      {activeTabData.keywords.map((kw, i) => (
                        <span key={i} className="text-xs bg-brand-orange/10 text-brand-orange px-2 py-1 rounded">
                          {kw}
                        </span>
                      ))}
                    </div>
                    <Link
                      href="#contact"
                      className="inline-flex items-center justify-center gap-2 bg-brand-orange hover:bg-brand-orange-dark text-white px-6 py-3 rounded-full font-semibold transition-all"
                    >
                      {activeTabData.cta}
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Why Small Businesses{' '}
                <span className="text-brand-orange">Choose Us</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: '📋',
                  title: 'No Long-Term Contracts',
                  description: 'Month-to-month. If we don\'t deliver, you can leave. Simple.',
                },
                {
                  icon: '📊',
                  title: 'Transparent Reporting',
                  description: 'Reports you can actually understand. No jargon, no fluff.',
                },
                {
                  icon: '📞',
                  title: 'We Answer the Phone',
                  description: 'Crazy concept, right? Call us. We\'ll actually pick up.',
                },
                {
                  icon: '🎯',
                  title: 'Real Results',
                  description: 'More customers, more revenue. Not vanity metrics.',
                },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-brand-charcoal/30 border border-gray-800 rounded-xl p-6 text-center hover:border-brand-orange/30 transition-all"
                >
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Accordion */}
        <section ref={servicesRef} className="py-20 bg-brand-charcoal/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={servicesInView ? { opacity: 1, y: 0 } : {}}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Everything Your Business Needs to{' '}
                <span className="text-brand-orange">Grow</span>
              </h2>
              <p className="text-gray-400 text-lg">
                Comprehensive marketing services designed for small business success.
              </p>
            </motion.div>

            <div className="space-y-4">
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={servicesInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="border border-gray-800 rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() => setOpenAccordion(openAccordion === index ? null : index)}
                    className="w-full flex items-center justify-between p-6 text-left bg-brand-dark hover:bg-brand-charcoal/30 transition-all"
                  >
                    <span className="text-lg font-semibold text-white">{service.title}</span>
                    <motion.svg
                      animate={{ rotate: openAccordion === index ? 180 : 0 }}
                      className="w-5 h-5 text-brand-orange flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </motion.svg>
                  </button>
                  <AnimatePresence>
                    {openAccordion === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="p-6 pt-0 bg-brand-dark">
                          <p className="text-gray-400 mb-4">{service.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {service.features.map((feature, i) => (
                              <span
                                key={i}
                                className="text-sm bg-brand-orange/10 text-brand-orange px-3 py-1 rounded-full"
                              >
                                {feature}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Timeline */}
        <section ref={processRef} className="py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={processInView ? { opacity: 1, y: 0 } : {}}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Your Path to{' '}
                <span className="text-brand-orange">More Customers</span>
              </h2>
              <p className="text-gray-400 text-lg">
                A clear, proven process that delivers results.
              </p>
            </motion.div>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-800 transform md:-translate-x-1/2" />

              {processSteps.map((step, index) => (
                <motion.div
                  key={step.week}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  animate={processInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className={`relative flex items-start gap-8 mb-12 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-brand-orange rounded-full transform -translate-x-1/2 mt-6 z-10 ring-4 ring-brand-dark" />

                  {/* Content */}
                  <div className={`flex-1 ml-12 md:ml-0 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                    <span className="inline-block text-brand-orange font-semibold text-sm mb-2">
                      {step.week}
                    </span>
                    <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                    <p className="text-gray-400 mb-4">{step.description}</p>
                    <div className={`flex flex-wrap gap-2 ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
                      {step.tasks.map((task, i) => (
                        <span
                          key={i}
                          className="text-xs bg-brand-charcoal/50 text-gray-300 px-2 py-1 rounded border border-gray-700"
                        >
                          {task}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="hidden md:block flex-1" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section ref={faqRef} className="py-20 bg-brand-charcoal/30">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={faqInView ? { opacity: 1, y: 0 } : {}}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Frequently Asked{' '}
                <span className="text-brand-orange">Questions</span>
              </h2>
              <p className="text-gray-400 text-lg">
                Everything you need to know about working with us.
              </p>
            </motion.div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={faqInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="border border-gray-800 rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full flex items-center justify-between p-5 text-left bg-brand-dark hover:bg-brand-charcoal/30 transition-all"
                  >
                    <span className="text-white font-medium pr-4">{faq.question}</span>
                    <motion.svg
                      animate={{ rotate: openFaq === index ? 180 : 0 }}
                      className="w-5 h-5 text-brand-orange flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </motion.svg>
                  </button>
                  <AnimatePresence>
                    {openFaq === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="p-5 pt-0 bg-brand-dark">
                          <p className="text-gray-400">{faq.answer}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-brand-orange/20 to-transparent border border-brand-orange/30 rounded-3xl p-8 md:p-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Outmarket Your Competition?
              </h2>
              <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
                Every big business started small. Yours can be next. 
                Get a free marketing audit and see exactly where you stand.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Link
                  href="#contact"
                  className="group inline-flex items-center justify-center gap-2 bg-brand-orange hover:bg-brand-orange-dark text-white px-8 py-4 rounded-full font-semibold text-lg transition-all"
                >
                  Get My Free Audit
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link
                  href="tel:+17029964415"
                  className="inline-flex items-center justify-center gap-2 border border-gray-700 hover:border-brand-orange/50 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all"
                >
                  <svg className="w-5 h-5 text-brand-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  (702) 996-4415
                </Link>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  No Long-Term Contracts
                </span>
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Free Marketing Audit
                </span>
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Results Guaranteed
                </span>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  )
}
