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

// Platform data
const platforms = [
  {
    id: 'instagram',
    name: 'Instagram',
    icon: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
    color: 'from-purple-500 to-pink-500',
    stats: { followers: '10K+', engagement: '4.5%', reach: '50K+' },
    description: 'Visual storytelling that stops the scroll. We create stunning Reels, Stories, and posts that build your brand and drive engagement.',
    services: ['Reels & Stories', 'Feed Curation', 'Hashtag Strategy', 'Influencer Collabs']
  },
  {
    id: 'facebook',
    name: 'Facebook',
    icon: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
    color: 'from-blue-600 to-blue-400',
    stats: { followers: '5K+', engagement: '3.2%', reach: '30K+' },
    description: 'Community building and lead generation on the world\'s largest social network. We turn your page into a customer acquisition machine.',
    services: ['Page Management', 'Community Building', 'Facebook Ads', 'Lead Generation']
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    icon: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
      </svg>
    ),
    color: 'from-black to-gray-800',
    stats: { followers: '25K+', engagement: '8.7%', reach: '200K+' },
    description: 'Go viral in Vegas. Short-form video content that captures attention and builds massive brand awareness with the next generation.',
    services: ['Viral Content', 'Trend Jumping', 'TikTok Ads', 'Creator Partnerships']
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    icon: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
    color: 'from-blue-700 to-blue-500',
    stats: { followers: '2K+', engagement: '5.1%', reach: '15K+' },
    description: 'B2B lead generation and thought leadership. Position yourself as the go-to expert in your industry.',
    services: ['Thought Leadership', 'B2B Networking', 'LinkedIn Ads', 'Employee Advocacy']
  },
]

// Services data
const services = [
  {
    title: 'Content Creation',
    description: 'Scroll-stopping graphics, videos, and copy that captures your brand voice and drives engagement.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: 'Community Management',
    description: 'We respond to comments, DMs, and mentions so your audience feels heard and valued 24/7.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
      </svg>
    ),
  },
  {
    title: 'Paid Social Ads',
    description: 'Targeted campaigns on Meta, TikTok, and LinkedIn that turn ad spend into real customers.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'Analytics & Reporting',
    description: 'Monthly reports that show exactly what\'s working, what\'s not, and where we\'re headed next.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    title: 'Influencer Partnerships',
    description: 'Connect with local Vegas influencers who can authentically promote your brand to their followers.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ),
  },
  {
    title: 'Strategy & Consulting',
    description: 'Custom social media roadmap built around your business goals, audience, and competitive landscape.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
]

// Process steps
const processSteps = [
  { week: 'Week 1', title: 'Audit & Strategy', description: 'Deep dive into your current social presence, competitors, and audience. We build your custom playbook.' },
  { week: 'Week 2', title: 'Content Calendar', description: 'We create your first month of content, including graphics, captions, and posting schedule.' },
  { week: 'Week 3', title: 'Launch & Engage', description: 'Content goes live. We monitor, respond, and start building your community.' },
  { week: 'Ongoing', title: 'Optimize & Scale', description: 'Monthly reporting, strategy refinement, and scaling what works.' },
]

// Pricing tiers
const pricingTiers = [
  {
    name: 'Starter',
    price: 500,
    description: 'Perfect for small businesses getting started on social',
    features: [
      '2 platforms managed',
      '12 posts per month',
      'Basic graphics',
      'Monthly reporting',
      'Comment moderation',
    ],
    cta: 'Get Started',
    popular: false,
  },
  {
    name: 'Growth',
    price: 1200,
    description: 'For businesses ready to scale their social presence',
    features: [
      '3 platforms managed',
      '20 posts per month',
      'Custom graphics & videos',
      'Weekly reporting',
      'Community management',
      'Hashtag strategy',
      'Competitor monitoring',
    ],
    cta: 'Most Popular',
    popular: true,
  },
  {
    name: 'Dominate',
    price: 2500,
    description: 'Full-service social media takeover',
    features: [
      'All platforms managed',
      '30+ posts per month',
      'Premium video content',
      'Real-time reporting',
      '24/7 community management',
      'Paid ad management',
      'Influencer outreach',
      'Dedicated strategist',
    ],
    cta: 'Let\'s Talk',
    popular: false,
  },
]

// FAQ data
const faqs = [
  {
    question: 'How much does social media marketing cost in Las Vegas?',
    answer: 'Our Las Vegas social media marketing packages start at $500/month for small businesses and scale up to $2,500+/month for full-service management. Pricing depends on the number of platforms, posting frequency, and whether you need paid advertising management.',
  },
  {
    question: 'Which social media platforms should my business be on?',
    answer: 'It depends on your audience. For most Las Vegas businesses, we recommend starting with Instagram and Facebook. If you\'re B2B, LinkedIn is essential. For businesses targeting younger demographics (restaurants, entertainment, retail), TikTok is a must.',
  },
  {
    question: 'How long does it take to see results from social media marketing?',
    answer: 'You\'ll see engagement improvements within the first month. Follower growth and brand awareness typically show significant progress in 2-3 months. For lead generation and sales, expect 3-6 months of consistent effort to see meaningful ROI.',
  },
  {
    question: 'Do you create all the content or do we need to provide it?',
    answer: 'We handle everything! Our team creates all graphics, writes captions, and produces video content. We\'ll occasionally ask for photos or videos from your business (like behind-the-scenes footage), but we do the heavy lifting.',
  },
  {
    question: 'Can you help with social media advertising and paid campaigns?',
    answer: 'Absolutely. We\'re certified in Meta Ads (Facebook & Instagram) and experienced with TikTok and LinkedIn advertising. We handle everything from audience targeting to creative design to optimization.',
  },
  {
    question: 'Do you require long-term contracts?',
    answer: 'No long-term contracts required. We offer month-to-month agreements because we believe in earning your business every month. That said, social media is a long game—most clients see the best results after 3-6 months of consistent work.',
  },
]

export default function SocialMediaPage() {
  const [activePlatform, setActivePlatform] = useState(0)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const heroRef = useRef(null)
  const isHeroInView = useInView(heroRef, { once: true })

  return (
    <main className="bg-brand-dark">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">
        {/* Animated background */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-orange/20 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] animate-pulse delay-1000" />
          
          {/* Floating platform icons */}
          <motion.div
            animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 right-[15%] text-pink-500/30"
          >
            <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </motion.div>
          <motion.div
            animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-1/3 left-[10%] text-blue-500/30"
          >
            <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </motion.div>
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 right-[25%] text-brand-orange/30"
          >
            <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
            </svg>
          </motion.div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-brand-orange/10 border border-brand-orange/30 rounded-full px-4 py-2 mb-8"
          >
            <span className="w-2 h-2 bg-brand-orange rounded-full animate-pulse" />
            <span className="text-brand-orange font-medium text-sm">Social Media Marketing Las Vegas</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
          >
            Your Customers Are{' '}
            <span className="gradient-text">Scrolling</span>
            <br />
            Are They Seeing You?
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-10"
          >
            We turn your social media into a <span className="text-white font-medium">lead-generating machine</span>. 
            Content creation, community management, and paid ads — all done for you by our Las Vegas team.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="#contact"
              className="group relative bg-brand-orange hover:bg-brand-orange-dark text-white px-8 py-4 rounded-full font-semibold text-lg transition-all"
            >
              <span className="relative z-10 flex items-center gap-2">
                Get Your Free Social Audit
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </Link>
            <Link
              href="tel:+17029964415"
              className="flex items-center gap-2 text-gray-300 hover:text-white px-8 py-4 rounded-full font-medium text-lg transition-colors border border-gray-700 hover:border-gray-500"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              (702) 996-4415
            </Link>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-6 h-10 border-2 border-gray-600 rounded-full flex items-start justify-center p-2"
            >
              <div className="w-1 h-2 bg-brand-orange rounded-full" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-20 bg-brand-charcoal overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, #F5A623 1px, transparent 0)`,
              backgroundSize: '40px 40px'
            }}
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: 500, suffix: 'K+', label: 'Impressions Generated' },
              { value: 150, suffix: '%', label: 'Avg. Engagement Increase' },
              { value: 50, suffix: '+', label: 'Vegas Businesses Served' },
              { value: 10, suffix: 'x', label: 'Average ROI on Ads' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-gray-400 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 bg-brand-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              While You&apos;re Running Your Business...
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Your competitors are posting, engaging, and stealing your customers on social media.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: '📱', title: 'Inconsistent Posting', description: 'Random posts whenever you "find time" means the algorithm buries you.' },
              { icon: '👻', title: 'Ghost Town Engagement', description: 'Comments and DMs go unanswered. Potential customers move on.' },
              { icon: '📉', title: 'Zero ROI', description: 'Hours spent on social with nothing to show for it. No leads, no sales.' },
            ].map((problem, index) => (
              <motion.div
                key={problem.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-brand-charcoal/50 rounded-2xl p-8 border border-red-500/20 hover:border-red-500/40 transition-colors"
              >
                <div className="text-4xl mb-4">{problem.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{problem.title}</h3>
                <p className="text-gray-400">{problem.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Showcase - Interactive Tabs */}
      <section className="py-20 bg-brand-charcoal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              We Dominate Every Platform
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Tap a platform to see what we can do for your business.
            </p>
          </motion.div>

          {/* Platform Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {platforms.map((platform, index) => (
              <button
                key={platform.id}
                onClick={() => setActivePlatform(index)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all ${
                  activePlatform === index
                    ? 'bg-brand-orange text-white'
                    : 'bg-brand-dark text-gray-400 hover:text-white border border-gray-700'
                }`}
              >
                <span className={activePlatform === index ? 'text-white' : 'text-gray-500'}>
                  {platform.icon}
                </span>
                <span className="hidden sm:inline">{platform.name}</span>
              </button>
            ))}
          </div>

          {/* Platform Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activePlatform}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-brand-dark rounded-3xl p-8 md:p-12 border border-gray-800"
            >
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${platforms[activePlatform].color} text-white font-medium mb-6`}>
                    {platforms[activePlatform].icon}
                    <span>{platforms[activePlatform].name} Marketing</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                    {platforms[activePlatform].description}
                  </h3>
                  <ul className="space-y-3 mb-8">
                    {platforms[activePlatform].services.map((service) => (
                      <li key={service} className="flex items-center gap-3 text-gray-300">
                        <svg className="w-5 h-5 text-brand-orange flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {service}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="#contact"
                    className="inline-flex items-center gap-2 text-brand-orange hover:text-brand-orange-light font-medium transition-colors"
                  >
                    Get {platforms[activePlatform].name} Help
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {Object.entries(platforms[activePlatform].stats).map(([key, value]) => (
                    <div key={key} className="bg-brand-charcoal rounded-xl p-6 text-center">
                      <div className="text-2xl md:text-3xl font-bold text-white mb-1">{value}</div>
                      <div className="text-sm text-gray-400 capitalize">{key}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-brand-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Everything You Need to <span className="gradient-text">Win on Social</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Full-service social media management so you can focus on running your business.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-brand-charcoal/50 rounded-2xl p-8 border border-gray-800 hover:border-brand-orange/50 transition-all hover:-translate-y-1"
              >
                <div className="w-14 h-14 rounded-xl bg-brand-orange/10 flex items-center justify-center text-brand-orange mb-6 group-hover:bg-brand-orange group-hover:text-white transition-colors">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                <p className="text-gray-400">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Vegas Local Section */}
      <section className="py-20 bg-brand-charcoal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                We Know Vegas 🎰
              </h2>
              <p className="text-xl text-gray-400 mb-8">
                We&apos;re not some agency in New York guessing what works here. We live, work, and play in Las Vegas. 
                We know the local hashtags, the events, and what makes Vegas tick.
              </p>
              <div className="flex flex-wrap gap-3">
                {['#VegasLocal', '#LasVegasBusiness', '#VegasEats', '#SupportLocalVegas', '#VegasLife', '#DowntownVegas'].map((tag) => (
                  <span key={tag} className="bg-brand-dark px-4 py-2 rounded-full text-brand-orange text-sm font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-brand-orange/20 to-purple-500/20 rounded-3xl p-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-brand-orange/20 flex items-center justify-center">
                      <span className="text-2xl">📍</span>
                    </div>
                    <div>
                      <div className="text-white font-medium">Local Events</div>
                      <div className="text-gray-400 text-sm">We leverage Vegas events for timely content</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-brand-orange/20 flex items-center justify-center">
                      <span className="text-2xl">🤝</span>
                    </div>
                    <div>
                      <div className="text-white font-medium">Local Influencers</div>
                      <div className="text-gray-400 text-sm">Direct relationships with Vegas creators</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-brand-orange/20 flex items-center justify-center">
                      <span className="text-2xl">🎯</span>
                    </div>
                    <div>
                      <div className="text-white font-medium">Hyper-Local Targeting</div>
                      <div className="text-gray-400 text-sm">Reach customers in specific Vegas neighborhoods</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="py-20 bg-brand-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              From Zero to Viral in <span className="gradient-text">3 Weeks</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Our proven process gets you up and running fast.
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-brand-orange via-brand-orange to-transparent" />

            <div className="space-y-12">
              {processSteps.map((step, index) => (
                <motion.div
                  key={step.week}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative flex items-center gap-8 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 -ml-2 md:-ml-2 bg-brand-orange rounded-full border-4 border-brand-dark z-10" />
                  
                  {/* Content */}
                  <div className={`ml-12 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16'}`}>
                    <span className="inline-block px-3 py-1 bg-brand-orange/10 text-brand-orange rounded-full text-sm font-medium mb-2">
                      {step.week}
                    </span>
                    <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                    <p className="text-gray-400">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-brand-charcoal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Transparent Pricing. <span className="gradient-text">No Contracts.</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Choose a plan that fits your business. Scale up or down anytime.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {pricingTiers.map((tier, index) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative bg-brand-dark rounded-3xl p-8 border ${
                  tier.popular ? 'border-brand-orange' : 'border-gray-800'
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-brand-orange text-white text-sm font-medium rounded-full">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold text-white mb-2">{tier.name}</h3>
                <p className="text-gray-400 mb-6">{tier.description}</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-white">${tier.price}</span>
                  <span className="text-gray-400">/month</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-gray-300">
                      <svg className="w-5 h-5 text-brand-orange flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href="#contact"
                  className={`block text-center py-4 rounded-full font-semibold transition-all ${
                    tier.popular
                      ? 'bg-brand-orange hover:bg-brand-orange-dark text-white'
                      : 'border border-gray-700 text-white hover:border-brand-orange'
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
      <section className="py-20 bg-brand-dark">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-400">
              Everything you need to know about our social media services.
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
                className="border border-gray-800 rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left bg-brand-charcoal/50 hover:bg-brand-charcoal transition-colors"
                >
                  <span className="text-lg font-medium text-white">{faq.question}</span>
                  <svg
                    className={`w-5 h-5 text-brand-orange transition-transform ${openFaq === index ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <AnimatePresence>
                  {openFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <p className="p-6 pt-0 text-gray-400">{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-b from-brand-charcoal to-brand-dark">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Stop Posting and Praying.
              <br />
              <span className="gradient-text">Start Growing.</span>
            </h2>
            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
              Get a free social media audit and see exactly what&apos;s holding you back — and how we can fix it.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="#contact"
                className="bg-brand-orange hover:bg-brand-orange-dark text-white px-10 py-5 rounded-full font-semibold text-lg transition-all"
              >
                Get Your Free Audit Now
              </Link>
              <span className="text-gray-500">or</span>
              <Link
                href="tel:+17029964415"
                className="text-white hover:text-brand-orange font-medium text-lg transition-colors"
              >
                Call (702) 996-4415
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Schema.org FAQ markup */}
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
                "text": faq.answer
              }
            }))
          })
        }}
      />
    </main>
  )
}
