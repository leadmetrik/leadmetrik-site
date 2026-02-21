'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

// Animated counter component
function AnimatedCounter({ value, suffix = '' }: { value: number; suffix?: string }) {
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
      {count}{suffix}
    </span>
  )
}

// Live booking notifications (Stripe-style)
const bookingNotifications = [
  { name: 'Jessica & Michael', event: 'Wedding Reception', date: 'June 14', guests: 180, revenue: '$12,500' },
  { name: 'Acme Corp', event: 'Annual Gala', date: 'March 22', guests: 250, revenue: '$18,000' },
  { name: 'Garcia Family', event: 'Quinceañera', date: 'April 5', guests: 150, revenue: '$8,500' },
  { name: 'TechStart Inc', event: 'Product Launch', date: 'Feb 28', guests: 120, revenue: '$7,200' },
  { name: 'The Johnsons', event: 'Anniversary Party', date: 'May 10', guests: 80, revenue: '$4,800' },
]

// Pain points data
const painPoints = [
  {
    icon: '📅',
    title: 'Seasonal Booking Gaps',
    description: 'January slumps and summer slowdowns eat into your revenue. You need consistent bookings year-round, not feast or famine.',
    stat: 'January bookings drop 40% for most Vegas venues',
  },
  {
    icon: '🔍',
    title: 'Losing to Competitors on Google',
    description: "When couples search 'wedding venue Las Vegas,' your competitors show up first. If you're not in the top 3, you're invisible.",
    stat: '75% of bookers never scroll past the first 3 results',
  },
  {
    icon: '👻',
    title: 'Website Visitors Don\'t Convert',
    description: "You're getting traffic but no inquiries. Your site looks dated, loads slowly, or doesn't make it easy to book a tour.",
    stat: '94% of first impressions are design-related',
  },
  {
    icon: '🗣️',
    title: 'Relying on Word of Mouth',
    description: "Referrals are great, but they're unpredictable. You need a consistent lead generation system, not luck.",
    stat: '80% of couples find venues through Google',
  },
  {
    icon: '📸',
    title: 'Photos Don\'t Showcase Your Space',
    description: "Your venue is stunning in person, but your photos and videos don't capture the magic. Virtual tours are non-existent.",
    stat: '92% say photos influence their venue decision',
  },
  {
    icon: '⭐',
    title: 'Weak Review Strategy',
    description: "Your 23 Google reviews can't compete with venues that have 400+. New clients trust reviews more than your website.",
    stat: '89% of bookers read reviews before contacting',
  },
]

// Event types with tailored content
const eventTypes = [
  {
    id: 'weddings',
    name: 'Weddings',
    icon: '💒',
    headline: 'Become the #1 Wedding Venue in Your Area',
    painPoints: ['Competing with 500+ Vegas wedding venues', 'Couples comparing 5-7 venues before deciding', 'Pinterest and Instagram driving expectations'],
    solutions: ['SEO for "wedding venue Las Vegas" keywords', 'Stunning before/after transformation content', 'Review generation from happy couples'],
    avgTicket: '$15,000',
    targetKeywords: ['wedding venue las vegas', 'outdoor wedding venue henderson', 'affordable wedding reception las vegas'],
  },
  {
    id: 'corporate',
    name: 'Corporate',
    icon: '🏢',
    headline: 'Land More Corporate Events & Galas',
    painPoints: ['Competing with hotel ballrooms', 'Long B2B sales cycles', 'Need consistent repeat bookings'],
    solutions: ['LinkedIn targeting for event planners', 'Google Ads for corporate event searches', 'Email nurture for past clients'],
    avgTicket: '$12,000',
    targetKeywords: ['corporate event venue las vegas', 'company party venue henderson', 'conference venue las vegas'],
  },
  {
    id: 'quinceanera',
    name: 'Quinceañeras',
    icon: '👑',
    headline: 'Capture the Quinceañera Market',
    painPoints: ['Spanish-language marketing gaps', 'Word-of-mouth dominated market', 'Price-sensitive customers'],
    solutions: ['Bilingual SEO strategy', 'Instagram/TikTok content for families', 'Referral incentive programs'],
    avgTicket: '$8,500',
    targetKeywords: ['quinceañera venue las vegas', 'salón para quinceañera las vegas', 'quince venue henderson'],
  },
  {
    id: 'private',
    name: 'Private Parties',
    icon: '🎉',
    headline: 'Fill Your Calendar with Private Events',
    painPoints: ['Smaller events with lower margins', 'Last-minute bookings', 'Varied requirements'],
    solutions: ['Google Ads for birthday/anniversary searches', 'Flexible package marketing', 'Upsell strategies for add-ons'],
    avgTicket: '$4,500',
    targetKeywords: ['private party venue las vegas', 'birthday party venue henderson', 'anniversary party venue'],
  },
  {
    id: 'galas',
    name: 'Galas',
    icon: '✨',
    headline: 'Attract High-End Gala & Charity Events',
    painPoints: ['Competing with casino ballrooms', 'Need sophisticated marketing', 'High-touch sales process'],
    solutions: ['Luxury positioning and branding', 'Targeted outreach to nonprofits', 'Showcase past prestigious events'],
    avgTicket: '$25,000',
    targetKeywords: ['gala venue las vegas', 'charity event venue las vegas', 'black tie event space'],
  },
  {
    id: 'holiday',
    name: 'Holiday Events',
    icon: '🎄',
    headline: 'Maximize Holiday Season Revenue',
    painPoints: ['Compressed booking window', 'Competing for limited dates', 'Heavy discounting pressure'],
    solutions: ['Early-bird marketing campaigns', 'Holiday party package promotion', 'Corporate holiday party targeting'],
    avgTicket: '$8,000',
    targetKeywords: ['holiday party venue las vegas', 'christmas party venue', 'new years eve venue las vegas'],
  },
]

// Services data
const services = [
  {
    id: 'seo',
    title: 'Venue SEO & Google Maps',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
    description: 'Dominate local search when couples and event planners search for venues. We optimize your Google Business Profile, build citations, and create content that ranks.',
    features: ['Google Business Profile optimization', 'Local citation building', 'Venue-focused keyword targeting', 'Schema markup for events', 'Monthly ranking reports'],
    result: 'Average client sees 4x increase in Google Maps visibility',
  },
  {
    id: 'ads',
    title: 'Google Ads for Event Searches',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    description: 'Targeted ads that appear when people search for venues in your area. We lower your cost per lead while increasing booking quality.',
    features: ['High-intent keyword targeting', 'Tour booking landing pages', 'Conversion tracking setup', 'Retargeting warm leads', 'A/B testing & optimization'],
    result: 'Clients typically see 35% reduction in cost per tour',
  },
  {
    id: 'social',
    title: 'Social Media (Instagram/Pinterest)',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    description: 'Stunning visual content that showcases your venue at its best. We create scroll-stopping Reels, Stories, and Pinterest boards that inspire bookings.',
    features: ['Professional photo/video content', 'Instagram Reels & Stories', 'Pinterest boards for wedding planners', 'User-generated content strategy', 'Influencer collaborations'],
    result: 'Venues see 3x increase in social inquiries',
  },
  {
    id: 'reviews',
    title: 'Review Management',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ),
    description: 'Turn every successful event into a 5-star review. We automate review requests and help you build an unbeatable online reputation.',
    features: ['Automated review requests', 'Google, Yelp, WeddingWire monitoring', 'Review response templates', 'Negative review management', 'Competitor reputation analysis'],
    result: 'Clients average 35 new reviews in the first 90 days',
  },
  {
    id: 'tours',
    title: 'Virtual Tours & Photography',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
    description: "Let prospects experience your venue before they visit. 360° virtual tours and professional photography that convert browsers into bookers.",
    features: ['360° virtual tour creation', 'Professional event photography', 'Drone footage', 'Before/after transformations', 'Video testimonials'],
    result: 'Virtual tours increase tour bookings by 67%',
  },
  {
    id: 'conversion',
    title: 'Lead Capture Optimization',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    description: 'Your website should be a booking machine. We optimize forms, add live chat, and create urgency that turns visitors into tour requests.',
    features: ['Tour booking form optimization', 'Live chat integration', 'Availability calendar widgets', 'Lead scoring & routing', 'CRM integration'],
    result: 'Website conversion rates improve by 45%',
  },
]

// Process steps
const processSteps = [
  {
    step: 1,
    title: 'Venue Audit',
    description: 'We analyze your current online presence, photograph your space, study your competitors, and identify your biggest opportunities.',
    duration: 'Week 1',
  },
  {
    step: 2,
    title: 'Strategy & Setup',
    description: 'We build your custom marketing plan, optimize your Google Business Profile, create landing pages, and set up tracking.',
    duration: 'Weeks 2-3',
  },
  {
    step: 3,
    title: 'Launch Campaigns',
    description: 'Ads go live, content starts posting, and review requests go out. We monitor daily and optimize for best results.',
    duration: 'Week 4+',
  },
  {
    step: 4,
    title: 'Scale & Fill Calendar',
    description: 'As we identify winning strategies, we scale what works. Monthly reporting shows exactly how your calendar is filling up.',
    duration: 'Ongoing',
  },
]

// FAQ data
const faqs = [
  {
    question: 'How much does venue marketing cost in Las Vegas?',
    answer: 'Our venue marketing packages start at $1,500/month for local SEO and reputation management, scaling up to $4,000+/month for comprehensive campaigns including SEO, Google Ads, social media, and virtual tours. Pricing depends on your venue size, competition level, and growth goals.',
  },
  {
    question: 'How long before I see more bookings?',
    answer: 'Google Ads can drive tour requests within the first 1-2 weeks. SEO improvements typically show results in 2-3 months, with significant ranking improvements in 4-6 months. Our clients usually see measurable booking increases within 60-90 days.',
  },
  {
    question: 'Do you work with wedding venues specifically?',
    answer: 'Yes! Wedding venues are one of our specialties. We understand the wedding industry, work with WeddingWire and The Knot, and know how to target engaged couples in Las Vegas. We also work with corporate event spaces, banquet halls, and multi-purpose venues.',
  },
  {
    question: 'Can you help during our slow seasons?',
    answer: 'Absolutely. We develop specific campaigns for slow seasons like January and summer. This includes targeting corporate events, private parties, and out-of-town planners looking for Vegas venues. Our goal is year-round consistency.',
  },
  {
    question: 'How do you help us get more reviews?',
    answer: 'We implement an automated review generation system that sends requests to clients after their events. Most venues see 10-15+ new reviews per month. We also help you respond professionally to all reviews and manage any negative feedback.',
  },
  {
    question: 'Do you create content or do we need to provide photos?',
    answer: 'We can work with your existing photos, but we recommend professional photography sessions to showcase your venue at its best. We coordinate with local photographers and videographers to create stunning visual content that converts.',
  },
  {
    question: 'What areas in Las Vegas do you serve?',
    answer: 'We work with venues throughout the Las Vegas Valley including Downtown, Summerlin, Henderson, North Las Vegas, and the Strip corridor. We understand the local market dynamics and competition in each area.',
  },
  {
    question: 'How do you track and report results?',
    answer: 'You get a real-time dashboard showing tour requests, calls, form submissions, and bookings. We provide detailed monthly reports with insights and recommendations. You\'ll always know exactly what your marketing investment is generating.',
  },
]

export default function VenueMarketing() {
  const [activeEventType, setActiveEventType] = useState('weddings')
  const [activeService, setActiveService] = useState<string | null>(null)
  const [activeFaq, setActiveFaq] = useState<number | null>(null)
  const [currentNotification, setCurrentNotification] = useState(0)
  const heroRef = useRef(null)
  const heroInView = useInView(heroRef, { once: true })

  // Rotate notifications
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentNotification((prev) => (prev + 1) % bookingNotifications.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const selectedEventType = eventTypes.find(e => e.id === activeEventType)!

  return (
    <div className="min-h-screen bg-brand-dark">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[90vh] flex items-center overflow-hidden pt-20">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] animate-pulse-slow" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-orange/10 rounded-full blur-[120px] animate-pulse-slow delay-1000" />
          <div 
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `linear-gradient(#A855F7 1px, transparent 1px), linear-gradient(90deg, #A855F7 1px, transparent 1px)`,
              backgroundSize: '60px 60px'
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Content */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/30 rounded-full px-4 py-2 mb-6"
              >
                <span className="text-xl">🏛️</span>
                <span className="text-purple-400 font-medium text-sm">Event Venue Marketing Las Vegas</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
              >
                Fill Your Calendar.
                <br />
                <span className="text-brand-orange">Every Season.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xl text-gray-400 mb-8 leading-relaxed"
              >
                We help Las Vegas wedding venues, banquet halls, and event spaces 
                dominate local search and keep your calendar booked year-round — 
                even during the slow seasons.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link
                  href="#contact"
                  className="bg-brand-orange hover:bg-brand-orange/90 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all btn-shine text-center"
                >
                  Get Your Free Venue Audit
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

            {/* Right: Live Booking Feed (Stripe-style) */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={heroInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="hidden lg:block"
            >
              <div className="bg-brand-charcoal/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-white font-semibold">Live Event Bookings</h3>
                  <span className="flex items-center gap-2 text-green-400 text-sm">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    Real-time
                  </span>
                </div>

                {/* Calendar visualization */}
                <div className="bg-brand-dark/50 rounded-xl p-4 mb-4">
                  <div className="grid grid-cols-7 gap-1 text-center text-xs text-gray-500 mb-2">
                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                      <div key={i}>{day}</div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-1">
                    {Array.from({ length: 28 }, (_, i) => {
                      const isBooked = [3, 4, 7, 10, 11, 14, 17, 18, 21, 24, 25].includes(i + 1)
                      const isPending = [8, 15, 22].includes(i + 1)
                      return (
                        <div
                          key={i}
                          className={`aspect-square rounded text-xs flex items-center justify-center ${
                            isBooked 
                              ? 'bg-green-500/30 text-green-400' 
                              : isPending 
                                ? 'bg-yellow-500/30 text-yellow-400'
                                : 'bg-gray-800/50 text-gray-500'
                          }`}
                        >
                          {i + 1}
                        </div>
                      )
                    })}
                  </div>
                  <div className="flex items-center justify-center gap-4 mt-3 text-xs">
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-green-500/30 rounded" />
                      <span className="text-gray-400">Booked</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-yellow-500/30 rounded" />
                      <span className="text-gray-400">Pending</span>
                    </div>
                  </div>
                </div>

                {/* Live booking notification */}
                <AnimatePresence mode="wait">
                  {bookingNotifications.map((notification, index) => (
                    index === currentNotification && (
                      <motion.div
                        key={notification.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="bg-green-500/10 border border-green-500/30 rounded-xl p-4"
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
                            <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <p className="text-white font-medium">New Booking!</p>
                            <p className="text-gray-300 text-sm">{notification.name} — {notification.event}</p>
                            <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                              <span>{notification.date}</span>
                              <span>•</span>
                              <span>{notification.guests} guests</span>
                              <span>•</span>
                              <span className="text-green-400">{notification.revenue}</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )
                  ))}
                </AnimatePresence>

                <div className="mt-6 pt-4 border-t border-gray-700">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold text-white">18</p>
                      <p className="text-xs text-gray-500">Events this month</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-green-400">+42%</p>
                      <p className="text-xs text-gray-500">vs last year</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-brand-orange">$187k</p>
                      <p className="text-xs text-gray-500">Revenue</p>
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
                <AnimatedCounter value={10} suffix="K+" />
              </div>
              <p className="text-gray-400 text-sm mt-1">Vegas weddings per month</p>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-brand-orange">
                <AnimatedCounter value={80} suffix="%" />
              </div>
              <p className="text-gray-400 text-sm mt-1">of couples find venues on Google</p>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-brand-orange">
                <AnimatedCounter value={92} suffix="%" />
              </div>
              <p className="text-gray-400 text-sm mt-1">say photos influence their decision</p>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-brand-orange">
                <AnimatedCounter value={50} suffix="%" />
              </div>
              <p className="text-gray-400 text-sm mt-1">&quot;near me&quot; searches up YoY</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pain Points Grid */}
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
              These are the challenges we hear from venue owners every day. 
              If you&apos;re experiencing any of these, we can help.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {painPoints.map((point, index) => (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-brand-charcoal/30 border border-gray-800 rounded-2xl p-6 hover:border-brand-orange/50 transition-colors"
              >
                <span className="text-4xl mb-4 block">{point.icon}</span>
                <h3 className="text-xl font-bold text-white mb-2">{point.title}</h3>
                <p className="text-gray-400 mb-4">{point.description}</p>
                <p className="text-brand-orange text-sm font-medium">{point.stat}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Event Type Selector */}
      <section className="py-20 bg-brand-charcoal/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Marketing Built for Your Event Types
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Every event type has unique challenges. Select yours to see how we can help.
            </p>
          </motion.div>

          {/* Event Type Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {eventTypes.map((eventType) => (
              <button
                key={eventType.id}
                onClick={() => setActiveEventType(eventType.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeEventType === eventType.id
                    ? 'bg-brand-orange text-white'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                }`}
              >
                <span className="mr-2">{eventType.icon}</span>
                {eventType.name}
              </button>
            ))}
          </div>

          {/* Selected Event Type Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeEventType}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid lg:grid-cols-2 gap-8"
            >
              {/* Left: Pain Points & Solutions */}
              <div className="bg-brand-charcoal/40 border border-gray-800 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6">{selectedEventType.headline}</h3>
                
                <div className="mb-8">
                  <h4 className="text-brand-orange font-semibold mb-3 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    Your Challenges
                  </h4>
                  <ul className="space-y-2">
                    {selectedEventType.painPoints.map((point) => (
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
                    {selectedEventType.solutions.map((solution) => (
                      <li key={solution} className="flex items-start gap-2 text-gray-300">
                        <span className="text-green-400 mt-1">✓</span>
                        {solution}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right: Stats Card */}
              <div className="bg-gradient-to-br from-purple-500/20 to-brand-charcoal/40 border border-purple-500/30 rounded-2xl p-8">
                <div className="text-center mb-8">
                  <span className="text-6xl mb-4 block">{selectedEventType.icon}</span>
                  <h4 className="text-xl font-bold text-white">{selectedEventType.name} Marketing</h4>
                </div>

                <div className="space-y-6">
                  <div className="bg-brand-dark/50 rounded-xl p-4">
                    <p className="text-gray-400 text-sm mb-1">Average Event Value</p>
                    <p className="text-2xl font-bold text-brand-orange">{selectedEventType.avgTicket}</p>
                  </div>

                  <div className="bg-brand-dark/50 rounded-xl p-4">
                    <p className="text-gray-400 text-sm mb-2">Target Keywords We&apos;ll Dominate</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedEventType.targetKeywords.map((keyword) => (
                        <span key={keyword} className="bg-brand-charcoal px-3 py-1 rounded-full text-xs text-gray-300">
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Link
                    href="#contact"
                    className="block w-full bg-brand-orange hover:bg-brand-orange/90 text-white text-center px-6 py-4 rounded-xl font-semibold transition-all"
                  >
                    Get a {selectedEventType.name} Strategy
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
              Our Venue Marketing Services
            </h2>
            <p className="text-gray-400 text-lg">
              Everything you need to fill your event calendar year-round.
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
                  onClick={() => setActiveService(activeService === service.id ? null : service.id)}
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
                      className={`w-6 h-6 text-gray-400 transition-transform ${activeService === service.id ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>

                  <AnimatePresence>
                    {activeService === service.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-6 mt-6 border-t border-gray-700">
                          <p className="text-gray-400 mb-4">{service.description}</p>
                          
                          <div className="grid sm:grid-cols-2 gap-4 mb-4">
                            {service.features.map((feature) => (
                              <div key={feature} className="flex items-center gap-2 text-gray-300">
                                <svg className="w-4 h-4 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              A clear, proven process to fill your calendar.
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
                  <div className="absolute left-4 md:left-1/2 w-8 h-8 bg-brand-orange rounded-full flex items-center justify-center text-white font-bold text-sm -translate-x-1/2 z-10">
                    {step.step}
                  </div>

                  {/* Content */}
                  <div className={`ml-16 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16'}`}>
                    <div className="bg-brand-charcoal/40 border border-gray-800 rounded-xl p-6">
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
              Everything you need to know about venue marketing in Las Vegas.
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
                      className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform ${activeFaq === index ? 'rotate-180' : ''}`}
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
                        <p className="pt-4 text-gray-400">{faq.answer}</p>
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
      <section id="contact" className="py-20 bg-gradient-to-br from-purple-500/20 via-brand-charcoal/50 to-brand-dark">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Fill Your Calendar?
            </h2>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Get a free venue marketing audit and see exactly how we can help your 
              event space book more weddings, corporate events, and private parties.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/intake/venue"
                className="bg-brand-orange hover:bg-brand-orange/90 text-white px-10 py-4 rounded-full font-semibold text-lg transition-all btn-shine"
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

            <p className="mt-8 text-gray-500 text-sm">
              🎯 Las Vegas venue specialists · No contracts · Cancel anytime
            </p>
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
            "name": "LeadMetrik - Event Venue Marketing Las Vegas",
            "description": "Marketing agency specializing in SEO, Google Ads, and reputation management for wedding venues, banquet halls, and event spaces in Las Vegas.",
            "url": "https://leadmetrik.com/industries/venue-marketing",
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
            "serviceType": ["Event Venue Marketing", "Wedding Venue SEO", "Banquet Hall Marketing", "Venue Lead Generation"]
          }),
        }}
      />
    </div>
  )
}
