'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

// Animated counter component
function AnimatedCounter({ value, suffix = '', prefix = '' }: { value: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  useEffect(() => {
    if (isInView) {
      const duration = 2000
      const steps = 60
      const increment = value / steps
      let current = 0
      
      const timer = setInterval(() => {
        current += increment
        if (current >= value) {
          setCount(value)
          clearInterval(timer)
        } else {
          setCount(Math.floor(current))
        }
      }, duration / steps)

      return () => clearInterval(timer)
    }
  }, [isInView, value])

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  )
}

// Live service call notifications
const serviceCallNotifications = [
  { name: 'Mike T.', service: 'AC Repair - Emergency', time: '2 min ago', location: 'Henderson', icon: '❄️' },
  { name: 'Sarah L.', service: 'Burst Pipe - Emergency', time: '4 min ago', location: 'Summerlin', icon: '🔧' },
  { name: 'David R.', service: 'Electrical Panel Upgrade', time: '7 min ago', location: 'North Las Vegas', icon: '⚡' },
  { name: 'Jennifer K.', service: 'Roof Leak Inspection', time: '12 min ago', location: 'Spring Valley', icon: '🏠' },
  { name: 'Robert M.', service: 'Garage Door Repair', time: '15 min ago', location: 'Green Valley', icon: '🚗' },
  { name: 'Amanda S.', service: 'Furnace Not Working', time: '18 min ago', location: 'Las Vegas', icon: '🔥' },
]

// Pain points data
const painPoints = [
  {
    icon: '🚨',
    title: "Emergency Jobs Going to Competitors",
    description: "When someone's AC breaks at 2 PM in Vegas heat, they call whoever shows up first on Google. If that's not you, you're losing $500+ jobs daily.",
    stat: '78% of emergency searches result in same-day service calls',
  },
  {
    icon: '💰',
    title: 'Racing to the Bottom on Price',
    description: "Without strong visibility and reviews, you're forced to compete on price alone. Your margins shrink while competitors with better marketing charge premium rates.",
    stat: 'Companies with 100+ reviews charge 22% more on average',
  },
  {
    icon: '📉',
    title: 'Feast or Famine Lead Flow',
    description: "Some weeks you're turning down work, others you're wondering where the next job is coming from. No predictability means no growth.",
    stat: 'HVAC demand swings 250-600% seasonally',
  },
  {
    icon: '🎯',
    title: 'Wasted Google Ads Spend',
    description: "You've tried Google Ads but the leads were garbage or cost too much. Wrong keywords, bad landing pages, and no call tracking killed your ROI.",
    stat: 'Average home services CPC in Las Vegas: $35-65',
  },
  {
    icon: '⭐',
    title: 'Drowning in Competitor Reviews',
    description: "The plumber down the street has 400 Google reviews. You have 23. Guess who homeowners call first? Reviews are the new word-of-mouth.",
    stat: '93% of consumers read reviews before hiring',
  },
  {
    icon: '📱',
    title: 'Website That Kills Trust',
    description: "Your website looks like it was built in 2012. Homeowners land on it, see the outdated design, and immediately call someone else.",
    stat: '75% of consumers judge credibility by website design',
  },
]

// Service types with tailored content
const serviceTypes = [
  {
    id: 'hvac',
    name: 'HVAC',
    icon: '❄️',
    headline: 'Dominate AC & Heating Searches in Las Vegas',
    painPoints: ['Seasonal demand swings killing cash flow', 'Emergency calls going to LSA competitors', 'Big brands outspending you on Google'],
    solutions: ['Google Local Service Ads (Google Guaranteed)', 'Emergency keyword campaigns (24/7 AC repair)', 'Seasonal SEO strategy (summer AC, winter heating)'],
    avgTicket: '$450',
    targetKeywords: ['ac repair las vegas', 'hvac near me', '24 hour ac repair henderson'],
  },
  {
    id: 'plumbing',
    name: 'Plumbing',
    icon: '🔧',
    headline: 'Be the First Plumber They Call',
    painPoints: ['24/7 emergency competition is fierce', 'Price shoppers calling 5 companies', 'HomeAdvisor leads that never convert'],
    solutions: ['Emergency plumber SEO & LSAs', 'Review generation automation', 'Call tracking with recorded calls'],
    avgTicket: '$385',
    targetKeywords: ['emergency plumber las vegas', 'plumber near me', 'drain cleaning henderson'],
  },
  {
    id: 'electrical',
    name: 'Electrical',
    icon: '⚡',
    headline: 'Become the Trusted Electrician in Your Area',
    painPoints: ['Homeowners hesitant about unlicensed work', 'Competing with handymen on price', 'Low visibility for specialty services'],
    solutions: ['Google Guaranteed badge builds instant trust', 'License & certification content marketing', 'Panel upgrade & EV charger campaigns'],
    avgTicket: '$325',
    targetKeywords: ['licensed electrician las vegas', 'electrical repair near me', 'ev charger installation henderson'],
  },
  {
    id: 'roofing',
    name: 'Roofing',
    icon: '🏠',
    headline: 'Win More Roofing Jobs Without Chasing Leads',
    painPoints: ['High-ticket jobs with long sales cycles', 'Storm chasers flooding the market', 'Homeowners comparing 5+ quotes'],
    solutions: ['Before/after portfolio optimization', 'Storm damage & insurance claim content', 'Retargeting campaigns for quote follow-up'],
    avgTicket: '$8,500',
    targetKeywords: ['roof repair las vegas', 'roofing company near me', 'roof replacement henderson'],
  },
  {
    id: 'contractor',
    name: 'General Contractors',
    icon: '🔨',
    headline: 'Attract High-Value Renovation Projects',
    painPoints: ['Building trust for $50k+ projects', 'Competing with unlicensed handymen', 'Long sales cycle from lead to contract'],
    solutions: ['Portfolio & case study content', 'Google Business Profile optimization', 'Video testimonials from past clients'],
    avgTicket: '$15,000',
    targetKeywords: ['general contractor las vegas', 'home renovation near me', 'kitchen remodel henderson'],
  },
  {
    id: 'garage',
    name: 'Garage Door',
    icon: '🚗',
    headline: 'Own the Garage Door Market Locally',
    painPoints: ['Emergency repairs going to national brands', 'Competing with Yelp advertisers', 'Low margin on basic repairs'],
    solutions: ['Local Service Ads domination', 'New installation upsell campaigns', 'Review generation for trust'],
    avgTicket: '$275',
    targetKeywords: ['garage door repair las vegas', 'garage door installation near me', 'broken garage door spring'],
  },
]

// Services data
const services = [
  {
    id: 'lsa',
    title: 'Google Local Service Ads',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    description: 'Get the Google Guaranteed badge and appear at the very top of search results. Pay only for real leads, not clicks. The #1 lead source for home service companies.',
    features: ['Google Guaranteed badge', 'Pay per lead (not per click)', 'Top of search placement', 'Background check verified', 'Dispute bad leads for credits'],
    result: 'HVAC clients see 40+ qualified leads per month at $45-65 each',
  },
  {
    id: 'seo',
    title: 'Local SEO & Google Maps',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    description: 'Dominate the Google Maps 3-pack for your service keywords. When homeowners search "plumber near me" or "AC repair Las Vegas," you show up first.',
    features: ['Google Business Profile optimization', 'Local citation building', 'Service area targeting', 'Keyword-optimized content', 'Competitor analysis'],
    result: 'Average client sees 3x increase in Maps visibility within 90 days',
  },
  {
    id: 'ppc',
    title: 'Google Ads Management',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    description: 'Targeted Google Ads campaigns for emergency services, installations, and repairs. We optimize for calls and form submissions, not vanity metrics.',
    features: ['Call-only campaigns', 'Emergency keyword targeting', 'Negative keyword optimization', 'Landing page optimization', 'A/B testing & optimization'],
    result: 'Clients typically see 40% reduction in cost per lead within 60 days',
  },
  {
    id: 'reviews',
    title: 'Review Generation System',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ),
    description: 'Turn every happy customer into a 5-star review. Automated text and email requests sent after each job. Watch your review count climb weekly.',
    features: ['Automated review requests', 'SMS + email campaigns', 'Review monitoring alerts', 'Response templates', 'Competitor review tracking'],
    result: 'Clients average 25+ new reviews per month',
  },
  {
    id: 'tracking',
    title: 'Call Tracking & Analytics',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    description: 'Know exactly which marketing channels drive calls. Every call is tracked, recorded, and attributed. No more guessing where leads come from.',
    features: ['Dedicated tracking numbers', 'Call recording & transcription', 'Source attribution', 'Missed call alerts', 'Real-time dashboard'],
    result: 'Identify which 20% of spend drives 80% of your leads',
  },
  {
    id: 'website',
    title: 'High-Converting Websites',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    description: 'Mobile-first websites built to convert visitors into calls. Click-to-call buttons, service area pages, and trust signals that turn browsers into buyers.',
    features: ['Mobile-optimized design', 'Click-to-call integration', 'Service area landing pages', 'Trust badges & reviews', 'Fast loading speed'],
    result: 'Average 2.5x increase in website-to-call conversion rate',
  },
]

// Process steps
const processSteps = [
  {
    step: 1,
    title: 'Discovery & Audit',
    description: 'We analyze your current online presence, audit your competitors, and identify the keywords that will drive the most profitable leads.',
    duration: 'Week 1',
  },
  {
    step: 2,
    title: 'Setup & Optimization',
    description: 'We optimize your Google Business Profile, set up Local Service Ads, configure call tracking, and build your campaign foundation.',
    duration: 'Weeks 2-3',
  },
  {
    step: 3,
    title: 'Launch & Monitor',
    description: 'Campaigns go live. We monitor performance daily, optimize bids, test ad copy, and ensure every dollar works hard for you.',
    duration: 'Week 4+',
  },
  {
    step: 4,
    title: 'Scale & Dominate',
    description: 'As we identify winning strategies, we scale what works, expand to new service areas, and help you dominate your market.',
    duration: 'Ongoing',
  },
]

// FAQ data
const faqs = [
  {
    question: 'How much does home services marketing cost in Las Vegas?',
    answer: 'Our home services marketing packages start at $1,200/month for local SEO and Google Business optimization, and go up to $4,000+/month for comprehensive campaigns including LSAs, Google Ads, review generation, and call tracking. We customize based on your service area, competition level, and growth goals. Most clients see positive ROI within 60-90 days.',
  },
  {
    question: 'How quickly will I see results?',
    answer: 'Google Local Service Ads can generate leads within the first week of approval. Google Maps improvements typically show within 30-60 days. Full SEO results take 3-6 months to mature. We focus on quick wins (LSAs, paid ads) while building long-term organic visibility.',
  },
  {
    question: 'What are Google Local Service Ads (LSAs)?',
    answer: 'LSAs are Google\'s pay-per-lead advertising for home service companies. You get the "Google Guaranteed" badge, appear at the very top of search results, and only pay when someone actually contacts you — not per click. It\'s the highest-converting lead source for HVAC, plumbing, electrical, and other home services.',
  },
  {
    question: 'Do you work with HVAC companies?',
    answer: 'Absolutely! HVAC is one of our core specialties. We understand the seasonal demand swings, emergency service keywords, and competitive landscape in Las Vegas. We\'ve helped HVAC companies generate 40+ qualified leads per month through LSAs and targeted Google Ads.',
  },
  {
    question: 'How do you track leads and calls?',
    answer: 'We set up dedicated tracking phone numbers for each marketing channel (Google Ads, LSAs, organic, etc.). Every call is recorded and attributed to its source. You get a real-time dashboard showing leads, calls, cost per lead, and ROI. No more guessing where your leads come from.',
  },
  {
    question: 'Can you help me get more Google reviews?',
    answer: 'Yes! Our automated review generation system sends text and email requests to customers after each job. Most clients see 20-30+ new reviews per month. We also help you respond professionally to all reviews and monitor competitor review activity.',
  },
  {
    question: 'What areas in Las Vegas do you serve?',
    answer: 'We work with home service companies throughout the Las Vegas Valley including Summerlin, Henderson, North Las Vegas, Spring Valley, Green Valley, Enterprise, and surrounding areas. We can target specific zip codes or service areas based on your coverage.',
  },
  {
    question: 'How is this different from buying leads from HomeAdvisor or Angi?',
    answer: 'With HomeAdvisor/Angi, you\'re buying shared leads that go to 3-5 competitors simultaneously, and you pay whether they convert or not. Our approach builds YOUR online presence — your Google ranking, your reviews, your LSA profile. The leads come directly to you, not shared. You own the asset long-term instead of renting leads.',
  },
]

export default function HomeServicesMarketing() {
  const [activeService, setActiveService] = useState('hvac')
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null)
  const [activeFaq, setActiveFaq] = useState<number | null>(null)
  const [currentNotification, setCurrentNotification] = useState(0)
  const heroRef = useRef(null)
  const heroInView = useInView(heroRef, { once: true })

  // Rotate notifications
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentNotification((prev) => (prev + 1) % serviceCallNotifications.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const selectedService = serviceTypes.find(s => s.id === activeService)!

  return (
    <div className="min-h-screen bg-brand-dark">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[90vh] flex items-center overflow-hidden pt-20">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-orange/15 rounded-full blur-[120px] animate-pulse-slow" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-orange/10 rounded-full blur-[120px] animate-pulse-slow delay-1000" />
          <div 
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `linear-gradient(#F5A623 1px, transparent 1px), linear-gradient(90deg, #F5A623 1px, transparent 1px)`,
              backgroundSize: '60px 60px'
            }}
          />
          
          {/* Floating tool icons */}
          <motion.div
            animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/3 right-[15%] text-4xl opacity-20"
          >
            🔧
          </motion.div>
          <motion.div
            animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-1/3 left-[10%] text-4xl opacity-20"
          >
            ⚡
          </motion.div>
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 left-[20%] text-3xl opacity-20"
          >
            ❄️
          </motion.div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Content */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 bg-brand-orange/10 border border-brand-orange/30 rounded-full px-4 py-2 mb-6"
              >
                <span className="text-xl">🔧</span>
                <span className="text-brand-orange font-medium text-sm">Home Services Marketing Las Vegas</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
              >
                Be the First Call
                <br />
                <span className="gradient-text">When Homeowners Need Help</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xl text-gray-400 mb-8 leading-relaxed"
              >
                We help HVAC, plumbing, electrical, and home service companies 
                <span className="text-white font-medium"> dominate local search</span> and get a steady stream of 
                qualified service calls — not tire-kickers or price shoppers.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link
                  href="#contact"
                  className="bg-brand-orange hover:bg-brand-orange-dark text-white px-8 py-4 rounded-full font-semibold text-lg transition-all btn-shine glow text-center"
                >
                  Get Your Free Audit
                </Link>
                <Link
                  href="tel:+17029964415"
                  className="border border-gray-700 hover:border-gray-500 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all text-center flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  (702) 996-4415
                </Link>
              </motion.div>
            </div>

            {/* Right: Live Service Calls Card */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={heroInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="hidden lg:block"
            >
              <div className="bg-brand-charcoal/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-white font-semibold">Live Service Calls</h3>
                  <span className="flex items-center gap-2 text-green-400 text-sm">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    Real-time
                  </span>
                </div>

                <div className="space-y-3">
                  <AnimatePresence mode="wait">
                    {serviceCallNotifications.map((notification, index) => (
                      index === currentNotification && (
                        <motion.div
                          key={notification.name}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          className="bg-brand-orange/10 border border-brand-orange/30 rounded-xl p-4"
                        >
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 bg-brand-orange/20 rounded-full flex items-center justify-center text-xl">
                              {notification.icon}
                            </div>
                            <div className="flex-1">
                              <p className="text-white font-medium">{notification.name} requested</p>
                              <p className="text-brand-orange text-sm font-medium">{notification.service}</p>
                              <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                                <span>{notification.location}</span>
                                <span>•</span>
                                <span>{notification.time}</span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )
                    ))}
                  </AnimatePresence>

                  {/* Static preview of other notifications */}
                  <div className="space-y-2 opacity-50">
                    {serviceCallNotifications
                      .filter((_, i) => i !== currentNotification)
                      .slice(0, 2)
                      .map((notification) => (
                        <div key={notification.name} className="bg-gray-800/30 rounded-lg p-3">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gray-700/50 rounded-full flex items-center justify-center">
                              {notification.icon}
                            </div>
                            <div>
                              <p className="text-gray-400 text-sm">{notification.name}</p>
                              <p className="text-gray-500 text-xs">{notification.service}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-700">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold text-white">47</p>
                      <p className="text-xs text-gray-500">Calls today</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-green-400">+28%</p>
                      <p className="text-xs text-gray-500">vs last week</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-brand-orange">$18k</p>
                      <p className="text-xs text-gray-500">Booked jobs</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-12 bg-brand-charcoal/30 border-y border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-brand-orange">
                <AnimatedCounter value={97} suffix="%" />
              </div>
              <p className="text-gray-400 text-sm mt-1">search online before calling</p>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-brand-orange">
                <AnimatedCounter value={180} suffix="k" />
              </div>
              <p className="text-gray-400 text-sm mt-1">"plumber near me" searches/month</p>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-brand-orange">
                4x
              </div>
              <p className="text-gray-400 text-sm mt-1">more calls with proper SEO</p>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-brand-orange">
                <AnimatedCounter value={70} suffix="%" />
              </div>
              <p className="text-gray-400 text-sm mt-1">of competitors using LSAs</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pain Points */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Sound Familiar?
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              These are the challenges home service companies face every day. 
              If you're experiencing any of these, we can help.
            </p>
          </motion.div>

          {/* Mobile: Horizontal Scroll / Desktop: Grid */}
          <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory md:grid md:grid-cols-2 lg:grid-cols-3 md:overflow-visible scrollbar-hide">
            {painPoints.map((point, index) => (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex-shrink-0 w-[300px] md:w-auto snap-center"
              >
                <div className="h-full bg-brand-charcoal/30 border border-gray-800 rounded-2xl p-6 hover:border-brand-orange/50 transition-colors group">
                  <span className="text-4xl mb-4 block group-hover:scale-110 transition-transform">{point.icon}</span>
                  <h3 className="text-xl font-bold text-white mb-2">{point.title}</h3>
                  <p className="text-gray-400 mb-4">{point.description}</p>
                  <p className="text-brand-orange text-sm font-medium">{point.stat}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Type Selector */}
      <section className="py-20 bg-brand-charcoal/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Marketing Built for Your Trade
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Every home service has unique challenges. Select yours to see how we can help.
            </p>
          </motion.div>

          {/* Service Type Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {serviceTypes.map((service) => (
              <button
                key={service.id}
                onClick={() => setActiveService(service.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeService === service.id
                    ? 'bg-brand-orange text-white shadow-lg shadow-brand-orange/25'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <span className="mr-2">{service.icon}</span>
                {service.name}
              </button>
            ))}
          </div>

          {/* Selected Service Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeService}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid lg:grid-cols-2 gap-8"
            >
              {/* Left: Pain Points & Solutions */}
              <div className="bg-brand-charcoal/40 border border-gray-800 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6">{selectedService.headline}</h3>
                
                <div className="mb-8">
                  <h4 className="text-red-400 font-semibold mb-3 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    Your Challenges
                  </h4>
                  <ul className="space-y-2">
                    {selectedService.painPoints.map((point) => (
                      <li key={point} className="flex items-start gap-2 text-gray-400">
                        <span className="text-red-400 mt-1">✗</span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-green-400 font-semibold mb-3 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Our Solutions
                  </h4>
                  <ul className="space-y-2">
                    {selectedService.solutions.map((solution) => (
                      <li key={solution} className="flex items-start gap-2 text-gray-300">
                        <span className="text-green-400 mt-1">✓</span>
                        {solution}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right: Stats Card */}
              <div className="bg-gradient-to-br from-brand-orange/20 to-brand-charcoal/40 border border-brand-orange/30 rounded-2xl p-8">
                <div className="text-center mb-8">
                  <span className="text-6xl mb-4 block">{selectedService.icon}</span>
                  <h4 className="text-xl font-bold text-white">{selectedService.name} Marketing</h4>
                </div>

                <div className="space-y-6">
                  <div className="bg-brand-dark/50 rounded-xl p-4">
                    <p className="text-gray-400 text-sm mb-1">Average Job Value</p>
                    <p className="text-2xl font-bold text-brand-orange">{selectedService.avgTicket}</p>
                  </div>

                  <div className="bg-brand-dark/50 rounded-xl p-4">
                    <p className="text-gray-400 text-sm mb-2">Keywords We'll Dominate</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedService.targetKeywords.map((keyword) => (
                        <span key={keyword} className="bg-brand-charcoal px-3 py-1 rounded-full text-xs text-gray-300 border border-gray-700">
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Link
                    href="#contact"
                    className="block w-full bg-brand-orange hover:bg-brand-orange-dark text-white text-center px-6 py-4 rounded-xl font-semibold transition-all btn-shine"
                  >
                    Get a Custom Strategy for {selectedService.name}
                  </Link>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Services Accordion */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Our Home Services Marketing Stack
            </h2>
            <p className="text-gray-400 text-lg">
              Everything you need to dominate your local market.
            </p>
          </motion.div>

          <div className="space-y-4">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <button
                  onClick={() => setActiveAccordion(activeAccordion === service.id ? null : service.id)}
                  className="w-full bg-brand-charcoal/30 border border-gray-800 rounded-xl p-6 text-left hover:border-brand-orange/50 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-brand-orange/20 rounded-xl flex items-center justify-center text-brand-orange">
                        {service.icon}
                      </div>
                      <h3 className="text-xl font-semibold text-white">{service.title}</h3>
                    </div>
                    <svg
                      className={`w-6 h-6 text-gray-400 transition-transform ${activeAccordion === service.id ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>

                  <AnimatePresence>
                    {activeAccordion === service.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-6 mt-6 border-t border-gray-700">
                          <p className="text-gray-400 mb-4">{service.description}</p>
                          
                          <div className="grid sm:grid-cols-2 gap-3 mb-4">
                            {service.features.map((feature) => (
                              <div key={feature} className="flex items-center gap-2 text-gray-300">
                                <svg className="w-4 h-4 text-brand-orange flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span className="text-sm">{feature}</span>
                              </div>
                            ))}
                          </div>

                          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                            <p className="text-green-400 text-sm font-medium">
                              📈 {service.result}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="py-20 bg-brand-charcoal/20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              How We Work Together
            </h2>
            <p className="text-gray-400 text-lg">
              A clear, proven process to make your phone ring more.
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-800 md:-translate-x-0.5" />

            <div className="space-y-12">
              {processSteps.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative flex items-center gap-8 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-4 md:left-1/2 w-8 h-8 bg-brand-orange rounded-full flex items-center justify-center text-white font-bold text-sm -translate-x-1/2 z-10 shadow-lg shadow-brand-orange/25">
                    {step.step}
                  </div>

                  {/* Content */}
                  <div className={`ml-16 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16'}`}>
                    <div className="bg-brand-charcoal/40 border border-gray-800 rounded-xl p-6 hover:border-brand-orange/30 transition-colors">
                      <span className="text-brand-orange text-sm font-medium">{step.duration}</span>
                      <h3 className="text-xl font-bold text-white mt-1 mb-2">{step.title}</h3>
                      <p className="text-gray-400">{step.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-400 text-lg">
              Everything you need to know about home services marketing.
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  className="w-full bg-brand-charcoal/30 border border-gray-800 rounded-xl p-5 text-left hover:border-gray-700 transition-all"
                >
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="font-semibold text-white">{faq.question}</h3>
                    <svg
                      className={`w-5 h-5 text-brand-orange flex-shrink-0 transition-transform ${activeFaq === index ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>

                  <AnimatePresence>
                    {activeFaq === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="pt-4 text-gray-400 leading-relaxed">{faq.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-20 bg-gradient-to-br from-brand-orange/20 via-brand-charcoal/50 to-brand-dark">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Make Your Phone Ring?
            </h2>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Get a free marketing audit and see exactly how we can help your business 
              dominate local search. No obligation, no pressure — just actionable insights.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="#contact"
                className="bg-brand-orange hover:bg-brand-orange-dark text-white px-10 py-4 rounded-full font-semibold text-lg transition-all btn-shine glow"
              >
                Start Your Free Audit
              </Link>
              <Link
                href="tel:+17029964415"
                className="bg-white/10 hover:bg-white/20 text-white px-10 py-4 rounded-full font-semibold text-lg transition-all flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call (702) 996-4415
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-gray-500 text-sm">
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5 text-brand-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                Google Partner
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5 text-brand-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                No Contracts
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5 text-brand-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                Pay for Results
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Schema for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
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
          }),
        }}
      />

      {/* Local Business Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            "name": "LeadMetrik - Home Services Marketing Las Vegas",
            "description": "Digital marketing agency specializing in SEO, Google Ads, and lead generation for HVAC, plumbing, electrical, and home service companies in Las Vegas.",
            "url": "https://leadmetrik.com/industries/home-services-marketing",
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
            "serviceType": ["HVAC Marketing", "Plumber Marketing", "Electrician Marketing", "Contractor SEO", "Home Services Lead Generation"]
          }),
        }}
      />
    </div>
  )
}
