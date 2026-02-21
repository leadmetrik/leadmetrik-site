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

// Live booking notifications
const bookingNotifications = [
  { name: 'Sarah M.', service: 'Botox Consultation', time: '2 min ago', location: 'Summerlin' },
  { name: 'Mike R.', service: 'Weight Loss Consult', time: '5 min ago', location: 'Henderson' },
  { name: 'Jennifer L.', service: 'Med Spa Facial', time: '8 min ago', location: 'Las Vegas' },
  { name: 'David K.', service: 'Chiropractic Eval', time: '12 min ago', location: 'North Las Vegas' },
  { name: 'Amanda T.', service: 'Dental Cleaning', time: '15 min ago', location: 'Spring Valley' },
]

// Pain points data
const painPoints = [
  {
    icon: '🔍',
    title: "You're Invisible on Google",
    description: "Patients search 'med spa near me' or 'weight loss clinic Las Vegas' and find your competitors instead. If you're not in the top 3, you're losing patients daily.",
    stat: '75% of patients never scroll past the first 3 results',
  },
  {
    icon: '🏥',
    title: 'Competing With Hospital Systems',
    description: "Big healthcare systems have million-dollar marketing budgets. They're outbidding you on Google Ads and dominating local search results.",
    stat: 'Hospital systems spend 10x more on digital marketing',
  },
  {
    icon: '⭐',
    title: 'Low Review Count Kills Trust',
    description: "Your 23 reviews can't compete with clinics that have 400+. New patients trust reviews more than your credentials.",
    stat: '89% of patients read reviews before booking',
  },
  {
    icon: '💸',
    title: 'Wasting Money on Ads',
    description: "You're paying $50-100+ per click on Google Ads but the leads don't convert. Your cost per acquisition is eating your margins.",
    stat: 'Average healthcare CPC in Las Vegas: $47',
  },
  {
    icon: '📱',
    title: 'No Social Proof Strategy',
    description: "Before/after photos and patient testimonials are your best marketing assets — but nobody sees them because your social media is dead.",
    stat: '72% of patients check social media before booking',
  },
  {
    icon: '🌐',
    title: 'Outdated Website That Kills Conversions',
    description: "Your website looks like it was built in 2015. Patients land on it and immediately click back to find a more modern, trustworthy practice.",
    stat: '94% of first impressions are design-related',
  },
]

// Practice types with tailored content
const practiceTypes = [
  {
    id: 'medspa',
    name: 'Med Spas',
    icon: '💉',
    headline: 'Fill Your Appointment Book With High-Value Clients',
    painPoints: ['Competing with 200+ med spas in Vegas', 'Low-quality leads from Groupon', 'Seasonal booking fluctuations'],
    solutions: ['Targeted Google Ads for Botox, fillers, laser treatments', 'Instagram/TikTok content strategy', 'Review generation campaigns'],
    avgTicket: '$450',
    targetKeywords: ['med spa las vegas', 'botox near me', 'laser hair removal henderson'],
  },
  {
    id: 'weightloss',
    name: 'Weight Loss',
    icon: '⚖️',
    headline: 'Attract Patients Ready to Transform Their Lives',
    painPoints: ['Competing with fad diet programs', 'Patients shopping on price alone', 'High no-show rates'],
    solutions: ['SEO for Semaglutide, Ozempic, Wegovy keywords', 'Patient success story campaigns', 'Automated nurture sequences'],
    avgTicket: '$300/mo',
    targetKeywords: ['weight loss clinic las vegas', 'semaglutide near me', 'medical weight loss henderson'],
  },
  {
    id: 'dental',
    name: 'Dental',
    icon: '🦷',
    headline: 'Become the Go-To Dentist in Your Neighborhood',
    painPoints: ['Insurance-dependent patient base', 'Competing with corporate dental chains', 'Low case acceptance rates'],
    solutions: ['Local SEO for emergency dental searches', 'Implant & cosmetic procedure campaigns', 'Patient education content'],
    avgTicket: '$1,200',
    targetKeywords: ['dentist near me las vegas', 'emergency dentist henderson', 'dental implants las vegas'],
  },
  {
    id: 'chiro',
    name: 'Chiropractic',
    icon: '🦴',
    headline: 'Get More New Patient Appointments Every Week',
    painPoints: ['Skeptical patients who don\'t understand value', 'Relying too heavily on referrals', 'Cash vs insurance patient mix'],
    solutions: ['Google Ads for back pain & auto accident keywords', 'Educational video content', 'Review generation from existing patients'],
    avgTicket: '$65/visit',
    targetKeywords: ['chiropractor las vegas', 'back pain treatment near me', 'auto accident chiropractor henderson'],
  },
  {
    id: 'plastic',
    name: 'Plastic Surgery',
    icon: '✨',
    headline: 'Attract High-Intent Patients for Premium Procedures',
    painPoints: ['Long sales cycle from consult to surgery', 'Patients comparing multiple surgeons', 'Building trust for major procedures'],
    solutions: ['Before/after gallery optimization', 'Video testimonials & surgeon content', 'Retargeting campaigns for warm leads'],
    avgTicket: '$8,500',
    targetKeywords: ['plastic surgeon las vegas', 'breast augmentation henderson', 'mommy makeover las vegas'],
  },
  {
    id: 'primary',
    name: 'Primary Care',
    icon: '🩺',
    headline: 'Build a Thriving Patient Panel in Your Community',
    painPoints: ['Competing with urgent care centers', 'Insurance reimbursement challenges', 'Patient retention issues'],
    solutions: ['Local SEO for family doctor searches', 'Direct primary care marketing', 'Patient loyalty programs'],
    avgTicket: '$150/visit',
    targetKeywords: ['family doctor las vegas', 'primary care physician near me', 'doctor accepting new patients henderson'],
  },
]

// Services data
const services = [
  {
    id: 'seo',
    title: 'Medical SEO',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
    description: 'Dominate Google Maps and organic search for your medical keywords. We optimize your Google Business Profile, build local citations, and create SEO content that ranks.',
    features: ['Google Business Profile optimization', 'Medical keyword research & targeting', 'Local citation building', 'SEO content creation', 'Technical SEO audits'],
    result: 'Average client sees 3x increase in organic traffic within 6 months',
  },
  {
    id: 'ppc',
    title: 'Healthcare Google Ads',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    description: 'HIPAA-compliant Google Ads campaigns that target patients actively searching for your services. We lower your cost per lead while increasing quality.',
    features: ['HIPAA-compliant landing pages', 'Conversion tracking setup', 'Negative keyword optimization', 'Call tracking & recording', 'A/B testing & optimization'],
    result: 'Clients typically see 40% reduction in cost per lead',
  },
  {
    id: 'reputation',
    title: 'Review Management',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ),
    description: 'Turn happy patients into 5-star reviews. We automate review requests, monitor your online reputation, and help you respond professionally to feedback.',
    features: ['Automated review request system', 'Multi-platform monitoring', 'Review response templates', 'Negative review management', 'Competitor review analysis'],
    result: 'Clients average 47 new reviews in the first 90 days',
  },
  {
    id: 'social',
    title: 'Medical Social Media',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    description: 'Before/after content, patient testimonials, and educational posts that build trust and drive appointments. We handle content creation and community management.',
    features: ['Before/after photo strategy', 'HIPAA-compliant content', 'Instagram & TikTok management', 'Patient testimonial videos', 'Paid social advertising'],
    result: 'Med spa clients see 2.5x increase in consultation requests from social',
  },
  {
    id: 'retention',
    title: 'Patient Retention',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    description: 'Keep patients coming back with automated email campaigns, appointment reminders, and re-engagement sequences. Increase lifetime patient value.',
    features: ['Email nurture sequences', 'Appointment reminder automation', 'Re-activation campaigns', 'Birthday & holiday outreach', 'Referral program setup'],
    result: 'Practices see 35% increase in repeat appointments',
  },
]

// Process steps
const processSteps = [
  {
    step: 1,
    title: 'Discovery & Audit',
    description: 'We analyze your current online presence, competitors, and target keywords. You get a detailed report showing exactly where you stand.',
    duration: 'Week 1',
  },
  {
    step: 2,
    title: 'Strategy & Setup',
    description: 'We build your custom marketing plan, set up tracking, optimize your Google Business Profile, and create your campaign foundation.',
    duration: 'Weeks 2-3',
  },
  {
    step: 3,
    title: 'Launch & Optimize',
    description: 'Campaigns go live. We monitor performance daily, A/B test creative, and continuously optimize for better results.',
    duration: 'Week 4+',
  },
  {
    step: 4,
    title: 'Scale & Grow',
    description: 'As we identify winning strategies, we scale what works and expand into new channels. Monthly reporting keeps you informed.',
    duration: 'Ongoing',
  },
]

// FAQ data
const faqs = [
  {
    question: 'How much does medical marketing cost in Las Vegas?',
    answer: 'Our medical marketing packages start at $1,500/month for local SEO and go up to $5,000+/month for comprehensive campaigns including SEO, Google Ads, social media, and reputation management. We customize based on your practice size, competition level, and growth goals.',
  },
  {
    question: 'How long before I see results from medical SEO?',
    answer: 'Most practices see initial improvements in Google Maps rankings within 60-90 days. Significant organic search improvements typically take 4-6 months. Google Ads can drive leads within the first week of launching campaigns.',
  },
  {
    question: 'Do you work with HIPAA compliance requirements?',
    answer: 'Absolutely. All our marketing strategies are HIPAA-compliant. We never use protected health information in marketing, our landing pages are secure, and we can sign a Business Associate Agreement (BAA) if required.',
  },
  {
    question: 'What makes healthcare marketing different from regular marketing?',
    answer: 'Healthcare marketing requires understanding of HIPAA regulations, medical advertising restrictions, patient privacy concerns, and the unique patient journey. We specialize in healthcare and understand the nuances that generic agencies miss.',
  },
  {
    question: 'Can you help us get more Google reviews?',
    answer: 'Yes! Our review generation system automates the process of requesting reviews from satisfied patients. Most practices see 15-20+ new reviews per month. We also help you respond professionally to both positive and negative reviews.',
  },
  {
    question: 'Do you work with med spas and aesthetic practices?',
    answer: 'Med spas are one of our specialties. We understand the competitive Las Vegas aesthetic market and know how to target high-value procedures like Botox, fillers, laser treatments, and body contouring.',
  },
  {
    question: 'What areas in Las Vegas do you serve?',
    answer: 'We work with medical practices throughout the Las Vegas Valley including Summerlin, Henderson, North Las Vegas, Spring Valley, Green Valley, and the Las Vegas Strip area. We understand the local market dynamics of each area.',
  },
  {
    question: 'How do you track and report results?',
    answer: 'You get a real-time dashboard showing leads, calls, form submissions, and key metrics. We provide detailed monthly reports with insights and recommendations. You\'ll always know exactly what your marketing investment is generating.',
  },
]

export default function MedicalMarketing() {
  const [activePractice, setActivePractice] = useState('medspa')
  const [activeService, setActiveService] = useState<string | null>(null)
  const [activeFaq, setActiveFaq] = useState<number | null>(null)
  const [currentNotification, setCurrentNotification] = useState(0)
  const heroRef = useRef(null)
  const heroInView = useInView(heroRef, { once: true })

  // Rotate notifications
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentNotification((prev) => (prev + 1) % bookingNotifications.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const selectedPractice = practiceTypes.find(p => p.id === activePractice)!

  return (
    <div className="min-h-screen bg-brand-dark">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[90vh] flex items-center overflow-hidden pt-20">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] animate-pulse-slow" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-orange/10 rounded-full blur-[120px] animate-pulse-slow delay-1000" />
          <div 
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `linear-gradient(#3B82F6 1px, transparent 1px), linear-gradient(90deg, #3B82F6 1px, transparent 1px)`,
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
                className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 rounded-full px-4 py-2 mb-6"
              >
                <span className="text-xl">🏥</span>
                <span className="text-blue-400 font-medium text-sm">Medical & Wellness Marketing Las Vegas</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
              >
                Get More Patients.
                <br />
                <span className="text-brand-orange">Not More Headaches.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xl text-gray-400 mb-8 leading-relaxed"
              >
                We help Las Vegas medical practices, med spas, and wellness clinics 
                dominate local search and get a steady stream of qualified patient inquiries — 
                without relying on referrals or wasting money on ads that don't convert.
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

            {/* Right: Live Notifications Card */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={heroInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="hidden lg:block"
            >
              <div className="bg-brand-charcoal/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-white font-semibold">Live Patient Bookings</h3>
                  <span className="flex items-center gap-2 text-green-400 text-sm">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    Real-time
                  </span>
                </div>

                <div className="space-y-3">
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
                              <p className="text-white font-medium">{notification.name} booked</p>
                              <p className="text-gray-400 text-sm">{notification.service}</p>
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
                    {bookingNotifications
                      .filter((_, i) => i !== currentNotification)
                      .slice(0, 2)
                      .map((notification) => (
                        <div key={notification.name} className="bg-gray-800/30 rounded-lg p-3">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gray-700/50 rounded-full" />
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
                      <p className="text-2xl font-bold text-white">127</p>
                      <p className="text-xs text-gray-500">Bookings today</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-green-400">+34%</p>
                      <p className="text-xs text-gray-500">vs last week</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-brand-orange">$47k</p>
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
                <AnimatedCounter value={73} suffix="%" />
              </div>
              <p className="text-gray-400 text-sm mt-1">of patients search online before booking</p>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-brand-orange">
                <AnimatedCounter value={89} suffix="%" />
              </div>
              <p className="text-gray-400 text-sm mt-1">read reviews before choosing a provider</p>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-brand-orange">
                3x
              </div>
              <p className="text-gray-400 text-sm mt-1">average lead increase for our clients</p>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-brand-orange">
                <AnimatedCounter value={40} suffix="%" />
              </div>
              <p className="text-gray-400 text-sm mt-1">average reduction in cost per lead</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pain Points Carousel */}
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
              These are the challenges we hear from medical practices every day. 
              If you're experiencing any of these, we can help.
            </p>
          </motion.div>

          {/* Mobile: Horizontal Scroll */}
          <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory md:grid md:grid-cols-2 lg:grid-cols-3 md:overflow-visible">
            {painPoints.map((point, index) => (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex-shrink-0 w-[300px] md:w-auto snap-center"
              >
                <div className="h-full bg-brand-charcoal/30 border border-gray-800 rounded-2xl p-6 hover:border-brand-orange/50 transition-colors">
                  <span className="text-4xl mb-4 block">{point.icon}</span>
                  <h3 className="text-xl font-bold text-white mb-2">{point.title}</h3>
                  <p className="text-gray-400 mb-4">{point.description}</p>
                  <p className="text-brand-orange text-sm font-medium">{point.stat}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Practice Type Selector */}
      <section className="py-20 bg-brand-charcoal/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Marketing Built for Your Practice Type
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Every medical specialty has unique challenges. Select yours to see how we can help.
            </p>
          </motion.div>

          {/* Practice Type Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {practiceTypes.map((practice) => (
              <button
                key={practice.id}
                onClick={() => setActivePractice(practice.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activePractice === practice.id
                    ? 'bg-brand-orange text-white'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                }`}
              >
                <span className="mr-2">{practice.icon}</span>
                {practice.name}
              </button>
            ))}
          </div>

          {/* Selected Practice Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activePractice}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid lg:grid-cols-2 gap-8"
            >
              {/* Left: Pain Points & Solutions */}
              <div className="bg-brand-charcoal/40 border border-gray-800 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6">{selectedPractice.headline}</h3>
                
                <div className="mb-8">
                  <h4 className="text-brand-orange font-semibold mb-3 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    Your Challenges
                  </h4>
                  <ul className="space-y-2">
                    {selectedPractice.painPoints.map((point) => (
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
                    {selectedPractice.solutions.map((solution) => (
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
                  <span className="text-6xl mb-4 block">{selectedPractice.icon}</span>
                  <h4 className="text-xl font-bold text-white">{selectedPractice.name} Marketing</h4>
                </div>

                <div className="space-y-6">
                  <div className="bg-brand-dark/50 rounded-xl p-4">
                    <p className="text-gray-400 text-sm mb-1">Average Ticket Value</p>
                    <p className="text-2xl font-bold text-brand-orange">{selectedPractice.avgTicket}</p>
                  </div>

                  <div className="bg-brand-dark/50 rounded-xl p-4">
                    <p className="text-gray-400 text-sm mb-2">Target Keywords We'll Dominate</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedPractice.targetKeywords.map((keyword) => (
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
                    Get a Custom Strategy for {selectedPractice.name}
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
              Our Medical Marketing Services
            </h2>
            <p className="text-gray-400 text-lg">
              Everything you need to attract, convert, and retain more patients.
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
              A clear, proven process to grow your practice.
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
              Everything you need to know about medical marketing in Las Vegas.
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
      <section id="contact" className="py-20 bg-gradient-to-br from-brand-orange/20 via-brand-charcoal/50 to-brand-dark">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Get More Patients?
            </h2>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Get a free marketing audit and see exactly how we can help your practice grow. 
              No obligation, no pressure — just actionable insights.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/intake/medical"
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
              🔒 HIPAA-compliant marketing · No contracts · Cancel anytime
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
            "name": "LeadMetrik - Medical Marketing Las Vegas",
            "description": "Medical marketing agency specializing in SEO, Google Ads, and reputation management for healthcare practices in Las Vegas.",
            "url": "https://leadmetrik.com/industries/medical-marketing",
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
            "serviceType": ["Medical Marketing", "Healthcare SEO", "Med Spa Marketing", "Doctor Marketing"]
          }),
        }}
      />
    </div>
  )
}
