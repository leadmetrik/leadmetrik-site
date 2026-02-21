'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { 
  Star, Shield, Bell, MessageSquare, TrendingUp, BarChart3,
  AlertTriangle, Clock, Users, Eye, CheckCircle, ArrowRight,
  ChevronDown, Zap, Target, Award, Building, Search
} from 'lucide-react'

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

// Star Rating Component with animation
function StarRating({ rating, size = 'md', animated = false }: { rating: number; size?: 'sm' | 'md' | 'lg'; animated?: boolean }) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  }
  
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <motion.div
          key={star}
          initial={animated ? { scale: 0, rotate: -180 } : {}}
          animate={animated ? { scale: 1, rotate: 0 } : {}}
          transition={{ delay: star * 0.1, type: "spring", stiffness: 200 }}
        >
          <Star
            className={`${sizeClasses[size]} ${
              star <= rating
                ? 'text-yellow-400 fill-yellow-400'
                : star <= rating + 0.5
                ? 'text-yellow-400 fill-yellow-400/50'
                : 'text-gray-600'
            }`}
          />
        </motion.div>
      ))}
    </div>
  )
}

// Pain points data
const painPoints = [
  {
    icon: AlertTriangle,
    problem: "That 1-star review from 2019 is STILL costing you customers",
    impact: "Every negative review loses you 30 potential customers"
  },
  {
    icon: TrendingUp,
    problem: "Competitors with worse service have better ratings",
    impact: "They're actively managing their reputation. You're not."
  },
  {
    icon: Eye,
    problem: "You don't know what people are saying about you",
    impact: "Negative mentions spread while you're in the dark"
  },
  {
    icon: Clock,
    problem: "Responding to reviews takes hours you don't have",
    impact: "Unanswered reviews signal you don't care"
  }
]

// Services data
const services = [
  {
    icon: Star,
    title: 'Review Generation',
    description: 'Automated systems that ask happy customers for reviews at the perfect moment. More 5-star reviews, on autopilot.',
    features: ['SMS & Email Campaigns', 'QR Code Review Cards', 'Post-Service Automation', 'Multi-Platform Support']
  },
  {
    icon: Bell,
    title: 'Review Monitoring',
    description: 'Real-time alerts across 200+ platforms. Know instantly when someone mentions your business.',
    features: ['Google & Yelp Alerts', 'Social Media Monitoring', 'Competitor Tracking', 'Sentiment Analysis']
  },
  {
    icon: MessageSquare,
    title: 'Response Management',
    description: 'Professional responses to every review within hours. Turn critics into fans.',
    features: ['Same-Day Responses', 'Custom Templates', 'Escalation Protocols', 'Owner Voice Matching']
  },
  {
    icon: Shield,
    title: 'Negative Suppression',
    description: 'Push down negative content and highlight the positive. Control what Google shows.',
    features: ['SEO Content Creation', 'Positive Press Coverage', 'Search Result Optimization', 'Legal Review Support']
  },
  {
    icon: Search,
    title: 'Google Business Optimization',
    description: 'Maximize your Google Business Profile to rank higher and convert more searches.',
    features: ['Profile Optimization', 'Photo Management', 'Post Scheduling', 'Q&A Management']
  },
  {
    icon: BarChart3,
    title: 'Reputation Dashboard',
    description: 'See your entire reputation at a glance. Track progress, spot trends, prove ROI.',
    features: ['Real-Time Analytics', 'Competitor Benchmarks', 'Monthly Reports', 'ROI Tracking']
  }
]

// Process steps
const processSteps = [
  {
    week: '1',
    title: 'Audit & Strategy',
    description: 'We analyze your current reputation across all platforms, identify threats, and create your custom playbook.'
  },
  {
    week: '2',
    title: 'Monitoring Setup',
    description: 'Deploy real-time monitoring across 200+ platforms. You\'ll never miss another mention.'
  },
  {
    week: '3',
    title: 'Review Generation Launch',
    description: 'Activate automated review requests. Watch your 5-star reviews start rolling in.'
  },
  {
    week: '4+',
    title: 'Ongoing Management',
    description: 'We handle responses, suppress negatives, and keep your reputation growing month over month.'
  }
]

// Pricing tiers
const pricingTiers = [
  {
    name: 'Monitor',
    price: 297,
    description: 'Know what\'s being said about you',
    features: [
      '24/7 Reputation Monitoring',
      'Real-Time Alerts',
      'Monthly Reputation Report',
      'Response Templates Library',
      'Up to 2 Locations'
    ],
    cta: 'Start Monitoring',
    popular: false
  },
  {
    name: 'Grow',
    price: 597,
    description: 'Build your 5-star reputation',
    features: [
      'Everything in Monitor',
      'Automated Review Generation',
      'Google Business Optimization',
      'Professional Response Writing',
      'Up to 3 Locations',
      'Competitor Tracking'
    ],
    cta: 'Start Growing',
    popular: true
  },
  {
    name: 'Dominate',
    price: 997,
    description: 'Own your market\'s reputation',
    features: [
      'Everything in Grow',
      'Negative Content Suppression',
      'Custom SEO Content',
      'Monthly Strategy Calls',
      'Unlimited Locations',
      'Priority Support',
      'Crisis Management'
    ],
    cta: 'Start Dominating',
    popular: false
  }
]

// FAQ data
const faqs = [
  {
    question: 'Can you remove bad Google reviews?',
    answer: 'We can\'t directly remove legitimate reviews, but we can help flag reviews that violate Google\'s policies (fake reviews, spam, conflicts of interest). More importantly, we focus on generating so many positive reviews that the negative ones become statistically insignificant. We also create positive SEO content to push down negative search results.'
  },
  {
    question: 'How long until I see results?',
    answer: 'Most clients see their first new reviews within the first week of launching our review generation system. Within 90 days, the average client improves their overall rating by 0.5-1.0 stars. Full reputation transformation typically takes 6-12 months depending on your starting point.'
  },
  {
    question: 'Do you write fake reviews?',
    answer: 'Absolutely not. Fake reviews are illegal, unethical, and will get your business banned from Google. We only generate authentic reviews from real customers who had genuine positive experiences. Our system simply makes it easy for happy customers to share their feedback.'
  },
  {
    question: 'What platforms do you monitor?',
    answer: 'We monitor 200+ platforms including Google, Yelp, Facebook, TripAdvisor, BBB, industry-specific sites, social media mentions, news articles, and more. If someone\'s talking about your business online, we\'ll find it.'
  },
  {
    question: 'How is this different from doing it myself?',
    answer: 'Time and expertise. The average business owner spends 5-10 hours per week managing their online reputation (or ignores it entirely). We handle everything professionally, respond within hours instead of days, and use proven strategies to accelerate your results.'
  },
  {
    question: 'What if I have a reputation crisis?',
    answer: 'Our Dominate plan includes crisis management. If you\'re hit with a wave of negative reviews or a PR nightmare, we spring into action with a coordinated response strategy, positive content creation, and legal guidance if needed.'
  }
]

// Industries
const vegasIndustries = [
  { name: 'Restaurants & Bars', icon: '🍽️' },
  { name: 'Hotels & Resorts', icon: '🏨' },
  { name: 'Medical & Dental', icon: '🏥' },
  { name: 'Home Services', icon: '🔧' },
  { name: 'Auto Dealerships', icon: '🚗' },
  { name: 'Law Firms', icon: '⚖️' },
]

// Platform logos for monitoring
const platforms = [
  { name: 'Google', color: '#4285F4' },
  { name: 'Yelp', color: '#D32323' },
  { name: 'Facebook', color: '#1877F2' },
  { name: 'TripAdvisor', color: '#00AF87' },
  { name: 'BBB', color: '#005A8B' },
  { name: 'Healthgrades', color: '#00B2A9' },
]

export default function ReputationManagementPage() {
  const [activeTab, setActiveTab] = useState(0)
  const [showAfter, setShowAfter] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  // Schema.org FAQ markup
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  }

  // Service schema
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Reputation Management Services",
    "provider": {
      "@type": "Organization",
      "name": "LeadMetrik",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Las Vegas",
        "addressRegion": "NV"
      }
    },
    "areaServed": {
      "@type": "City",
      "name": "Las Vegas"
    },
    "description": "Professional online reputation management services including review generation, monitoring, and negative content suppression."
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      {/* Hero Section */}
      <section className="relative bg-brand-dark pt-24 pb-16 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-dark via-brand-dark to-red-900/20" />
        
        {/* Floating stars background */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: [0.2, 0.5, 0.2],
                y: [0, -20, 0]
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            >
              <Star className="w-4 h-4 text-yellow-400/30 fill-yellow-400/30" />
            </motion.div>
          ))}
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left content */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-full px-4 py-2 mb-6"
              >
                <AlertTriangle className="w-4 h-4 text-red-400" />
                <span className="text-red-400 text-sm font-medium">97% of consumers read reviews before buying</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
              >
                One Bad Review Costs You{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600">
                  $30,000/Year
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl text-gray-300 mb-4"
              >
                We fix that.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-gray-400 mb-8 max-w-lg"
              >
                Las Vegas reputation management that generates 5-star reviews on autopilot, 
                monitors every mention, and protects your business from negative content.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link
                  href="#contact"
                  className="inline-flex items-center justify-center gap-2 bg-brand-orange hover:bg-brand-orange-dark text-white font-semibold px-8 py-4 rounded-xl transition-all hover:scale-105"
                >
                  Get Your Free Reputation Audit
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="#how-it-works"
                  className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-xl transition-colors"
                >
                  See How We Work
                </Link>
              </motion.div>

              {/* Trust badges */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-10 flex items-center gap-8"
              >
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-green-400" />
                  <span className="text-gray-400 text-sm">No Fake Reviews. Ever.</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-400" />
                  <span className="text-gray-400 text-sm">Results in 30 Days</span>
                </div>
              </motion.div>
            </div>

            {/* Right side - Animated star rating card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700 shadow-2xl">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-brand-orange/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Building className="w-10 h-10 text-brand-orange" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Your Business</h3>
                  <p className="text-gray-400">Las Vegas, NV</p>
                </div>

                {/* Animated rating */}
                <div className="text-center">
                  <motion.div
                    key={showAfter ? 'after' : 'before'}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="mb-2"
                  >
                    <span className={`text-5xl font-bold ${showAfter ? 'text-green-400' : 'text-red-400'}`}>
                      {showAfter ? '4.8' : '3.2'}
                    </span>
                  </motion.div>
                  
                  <div className="flex justify-center mb-4">
                    <StarRating rating={showAfter ? 4.8 : 3.2} size="lg" animated={true} />
                  </div>

                  <p className="text-gray-400 mb-6">
                    {showAfter ? '247 reviews' : '43 reviews'}
                  </p>

                  {/* Toggle button */}
                  <button
                    onClick={() => setShowAfter(!showAfter)}
                    className={`w-full py-3 rounded-xl font-semibold transition-all ${
                      showAfter 
                        ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                        : 'bg-brand-orange text-white hover:bg-brand-orange-dark'
                    }`}
                  >
                    {showAfter ? '✓ With LeadMetrik' : 'See With LeadMetrik →'}
                  </button>
                </div>

                {/* Revenue impact */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: showAfter ? 1 : 0, y: showAfter ? 0 : 10 }}
                  className="mt-6 p-4 bg-green-500/10 rounded-xl border border-green-500/20"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Additional Revenue</span>
                    <span className="text-2xl font-bold text-green-400">+$8,400/mo</span>
                  </div>
                </motion.div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-brand-orange/20 rounded-full blur-2xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-yellow-400/10 rounded-full blur-2xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-gray-900 border-y border-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                <AnimatedCounter value={94} suffix="%" />
              </div>
              <p className="text-gray-400 text-sm">Avoid businesses with bad ratings</p>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                <AnimatedCounter value={30} prefix="$" suffix="K" />
              </div>
              <p className="text-gray-400 text-sm">Lost per negative review/year</p>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                <AnimatedCounter value={4} suffix=" hrs" />
              </div>
              <p className="text-gray-400 text-sm">Average response time</p>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                <AnimatedCounter value={200} suffix="+" />
              </div>
              <p className="text-gray-400 text-sm">Platforms monitored</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pain Points Section */}
      <section className="bg-brand-dark py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Sound Familiar?
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              These reputation problems are costing Las Vegas businesses thousands every month
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {painPoints.map((point, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-red-900/20 border border-red-800/30 rounded-2xl p-6 hover:border-red-700/50 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <point.icon className="w-6 h-6 text-red-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">{point.problem}</h3>
                    <p className="text-red-300/80 text-sm">{point.impact}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Review Simulator */}
      <section className="bg-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              See the Difference Reviews Make
            </h2>
            <p className="text-gray-400">
              Click to see your business transform
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Before */}
            <motion.div
              className={`bg-gray-800 rounded-2xl p-6 border-2 transition-all cursor-pointer ${
                !showAfter ? 'border-red-500' : 'border-gray-700 opacity-60'
              }`}
              onClick={() => setShowAfter(false)}
              whileHover={{ scale: 1.02 }}
            >
              <div className="text-red-400 text-sm font-semibold mb-4">BEFORE</div>
              <div className="flex items-center gap-4 mb-4">
                <div className="text-4xl font-bold text-white">3.2</div>
                <StarRating rating={3.2} />
              </div>
              <p className="text-gray-400 text-sm mb-4">43 reviews</p>
              <div className="space-y-2">
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <StarRating rating={1} size="sm" />
                    <span className="text-gray-500 text-xs">2 weeks ago</span>
                  </div>
                  <p className="text-gray-400 text-sm">"Terrible service, waited 45 minutes..."</p>
                </div>
                <div className="bg-gray-700/50 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <StarRating rating={2} size="sm" />
                    <span className="text-gray-500 text-xs">1 month ago</span>
                  </div>
                  <p className="text-gray-400 text-sm">"Not worth the price..."</p>
                </div>
              </div>
              <div className="mt-4 p-3 bg-red-500/10 rounded-lg">
                <div className="text-red-400 text-sm">Estimated Lost Revenue</div>
                <div className="text-2xl font-bold text-red-400">-$2,800/mo</div>
              </div>
            </motion.div>

            {/* After */}
            <motion.div
              className={`bg-gray-800 rounded-2xl p-6 border-2 transition-all cursor-pointer ${
                showAfter ? 'border-green-500' : 'border-gray-700 opacity-60'
              }`}
              onClick={() => setShowAfter(true)}
              whileHover={{ scale: 1.02 }}
            >
              <div className="text-green-400 text-sm font-semibold mb-4">AFTER 90 DAYS</div>
              <div className="flex items-center gap-4 mb-4">
                <div className="text-4xl font-bold text-white">4.8</div>
                <StarRating rating={4.8} />
              </div>
              <p className="text-gray-400 text-sm mb-4">247 reviews</p>
              <div className="space-y-2">
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <StarRating rating={5} size="sm" />
                    <span className="text-gray-500 text-xs">2 days ago</span>
                  </div>
                  <p className="text-gray-400 text-sm">"Amazing experience! Will definitely return..."</p>
                </div>
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <StarRating rating={5} size="sm" />
                    <span className="text-gray-500 text-xs">1 week ago</span>
                  </div>
                  <p className="text-gray-400 text-sm">"Best in Vegas, hands down..."</p>
                </div>
              </div>
              <div className="mt-4 p-3 bg-green-500/10 rounded-lg">
                <div className="text-green-400 text-sm">New Revenue Generated</div>
                <div className="text-2xl font-bold text-green-400">+$8,400/mo</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="bg-brand-dark py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Complete Reputation Management
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Everything you need to build, protect, and grow your online reputation
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-gray-800/50 border border-gray-700 rounded-2xl p-6 hover:border-brand-orange/50 hover:bg-gray-800 transition-all"
              >
                <div className="w-14 h-14 bg-brand-orange/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-brand-orange/30 transition-colors">
                  <service.icon className="w-7 h-7 text-brand-orange" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{service.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Timeline */}
      <section id="how-it-works" className="bg-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              How It Works
            </h2>
            <p className="text-gray-400">
              Your reputation transformation starts now
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative flex gap-6 pb-12 last:pb-0"
              >
                {/* Timeline line */}
                {index < processSteps.length - 1 && (
                  <div className="absolute left-6 top-14 w-0.5 h-[calc(100%-3.5rem)] bg-gradient-to-b from-brand-orange to-brand-orange/20" />
                )}
                
                {/* Week badge */}
                <div className="flex-shrink-0 w-12 h-12 bg-brand-orange rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">W{step.week}</span>
                </div>
                
                {/* Content */}
                <div className="flex-1 bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                  <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
                  <p className="text-gray-400">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Results / Social Proof */}
      <section className="bg-brand-dark py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Real Results for Las Vegas Businesses
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-brand-orange/20 to-yellow-500/10 rounded-2xl p-8 text-center border border-brand-orange/20"
            >
              <div className="text-5xl font-bold text-white mb-2">3.8 → 4.7</div>
              <div className="flex justify-center mb-4">
                <StarRating rating={4.7} />
              </div>
              <p className="text-gray-300">Average rating improvement in 90 days</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-green-500/20 to-emerald-500/10 rounded-2xl p-8 text-center border border-green-500/20"
            >
              <div className="text-5xl font-bold text-white mb-2">+127</div>
              <p className="text-green-400 text-lg mb-2">New reviews/month</p>
              <p className="text-gray-300">Average client review generation</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-blue-500/20 to-cyan-500/10 rounded-2xl p-8 text-center border border-blue-500/20"
            >
              <div className="text-5xl font-bold text-white mb-2">92%</div>
              <p className="text-blue-400 text-lg mb-2">Response rate</p>
              <p className="text-gray-300">Reviews answered within 4 hours</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Las Vegas Local Section */}
      <section className="bg-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                We Know Vegas Businesses
              </h2>
              <p className="text-gray-400 mb-8">
                Las Vegas is competitive. Your reputation can make or break you. We've helped 
                businesses across the valley build 5-star reputations that drive real revenue.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {vegasIndustries.map((industry, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-gray-800 rounded-xl p-4 text-center border border-gray-700 hover:border-brand-orange/50 transition-colors"
                  >
                    <div className="text-3xl mb-2">{industry.icon}</div>
                    <div className="text-sm text-gray-300">{industry.name}</div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              {/* Platform monitoring visual */}
              <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-6 text-center">
                  We Monitor Every Platform
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  {platforms.map((platform, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-gray-700/50 rounded-xl p-4 text-center"
                    >
                      <div 
                        className="w-10 h-10 rounded-full mx-auto mb-2 flex items-center justify-center"
                        style={{ backgroundColor: `${platform.color}20` }}
                      >
                        <div 
                          className="w-6 h-6 rounded-full"
                          style={{ backgroundColor: platform.color }}
                        />
                      </div>
                      <div className="text-sm text-gray-300">{platform.name}</div>
                    </motion.div>
                  ))}
                </div>
                <p className="text-center text-gray-500 text-sm mt-6">
                  + 194 more platforms
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="bg-brand-dark py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-gray-400">
              No contracts. Cancel anytime. Results guaranteed.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingTiers.map((tier, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative bg-gray-800 rounded-2xl p-8 border ${
                  tier.popular 
                    ? 'border-brand-orange shadow-xl shadow-brand-orange/10' 
                    : 'border-gray-700'
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-brand-orange text-white text-sm font-semibold px-4 py-1 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-white mb-2">{tier.name}</h3>
                  <p className="text-gray-400 text-sm mb-4">{tier.description}</p>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-bold text-white">${tier.price}</span>
                    <span className="text-gray-400">/mo</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-300 text-sm">
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link
                  href="#contact"
                  className={`block w-full text-center py-3 rounded-xl font-semibold transition-all ${
                    tier.popular
                      ? 'bg-brand-orange text-white hover:bg-brand-orange-dark'
                      : 'bg-gray-700 text-white hover:bg-gray-600'
                  }`}
                >
                  {tier.cta}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-gray-900 py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="text-white font-medium pr-4">{faq.question}</span>
                  <ChevronDown 
                    className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform ${
                      openFaq === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {openFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="px-6 pb-6 text-gray-400">
                        {faq.answer}
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
      <section id="contact" className="bg-brand-dark py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Stop Losing Customers to Bad Reviews
            </h2>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Get your free reputation audit and see exactly where you stand — 
              and how we can help you dominate.
            </p>

            <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700 max-w-xl mx-auto">
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Business Name"
                  className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-brand-orange focus:outline-none"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-brand-orange focus:outline-none"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-brand-orange focus:outline-none"
                />
                <button
                  type="submit"
                  className="w-full bg-brand-orange hover:bg-brand-orange-dark text-white font-semibold py-4 rounded-xl transition-all hover:scale-105 flex items-center justify-center gap-2"
                >
                  Get My Free Reputation Audit
                  <ArrowRight className="w-5 h-5" />
                </button>
              </form>
              <p className="text-gray-500 text-sm mt-4">
                Free audit includes: Current rating analysis, competitor comparison, and custom improvement plan
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-brand-dark/95 backdrop-blur border-t border-gray-800 p-4 md:hidden z-50">
        <Link
          href="#contact"
          className="block w-full bg-brand-orange text-white font-semibold py-3 rounded-xl text-center"
        >
          Get Your Free Reputation Audit
        </Link>
      </div>
    </>
  )
}
