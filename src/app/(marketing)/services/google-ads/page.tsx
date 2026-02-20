'use client'

import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { 
  Search, MousePointerClick, TrendingUp, DollarSign, Target, 
  CheckCircle2, ArrowRight, ChevronDown, Zap, Shield,
  BarChart3, Users, Clock, Award, Building2, Wrench,
  Stethoscope, Store, Calculator, Play, Eye, ShoppingCart,
  Youtube, MapPin, AlertTriangle, Phone, PieChart, Rocket,
  LineChart, BadgeCheck, Headphones
} from 'lucide-react'

const painPoints = [
  {
    problem: "Burning cash with no results?",
    solution: "We audit your account, cut wasted spend, and focus budget on keywords that actually convert.",
    icon: DollarSign,
  },
  {
    problem: "Sky-high cost per click?",
    solution: "Our optimization techniques lower CPC by 20-40% while maintaining or improving lead quality.",
    icon: TrendingUp,
  },
  {
    problem: "No idea what's working?",
    solution: "Crystal-clear reporting shows exactly which campaigns, keywords, and ads drive revenue.",
    icon: PieChart,
  },
  {
    problem: "Agency that never calls back?",
    solution: "Direct access to your account manager. Monthly strategy calls. Real humans, not ticket systems.",
    icon: Headphones,
  },
]

const campaignTypes = [
  {
    id: 'search',
    name: 'Search Ads',
    icon: Search,
    description: 'Capture high-intent customers actively searching for your services.',
    benefits: [
      'Appear at the top of Google results instantly',
      'Target exact keywords your customers use',
      'Pay only when someone clicks',
      'Perfect for lead generation',
    ],
    bestFor: 'Service businesses, local companies, B2B',
  },
  {
    id: 'display',
    name: 'Display Ads',
    icon: Eye,
    description: 'Build brand awareness across millions of websites and apps.',
    benefits: [
      'Reach customers while they browse',
      'Retarget website visitors',
      'Visual ads that stand out',
      'Cost-effective impressions',
    ],
    bestFor: 'Brand awareness, remarketing, e-commerce',
  },
  {
    id: 'shopping',
    name: 'Shopping Ads',
    icon: ShoppingCart,
    description: 'Showcase your products with images and prices directly in search.',
    benefits: [
      'Product images in search results',
      'Price comparison visibility',
      'Higher purchase intent clicks',
      'Automated product feeds',
    ],
    bestFor: 'E-commerce, retail, product businesses',
  },
  {
    id: 'youtube',
    name: 'YouTube Ads',
    icon: Youtube,
    description: 'Reach your audience with video ads on the world\'s #2 search engine.',
    benefits: [
      'Skippable and non-skippable formats',
      'Detailed audience targeting',
      'Brand storytelling at scale',
      'Pay for engaged views',
    ],
    bestFor: 'Brand building, product demos, awareness',
  },
  {
    id: 'local',
    name: 'Local Service Ads',
    icon: MapPin,
    description: 'Get leads directly from Google with the Google Guarantee badge.',
    benefits: [
      'Pay per lead, not per click',
      'Google Guaranteed trust badge',
      'Top of search placement',
      'Direct calls and messages',
    ],
    bestFor: 'Home services, contractors, local businesses',
  },
]

const results = [
  {
    title: "Lower Cost Per Lead",
    description: "Smart bidding and continuous optimization squeeze more leads from every dollar.",
    icon: DollarSign,
    stat: "32%",
    statLabel: "avg. reduction in CPL",
  },
  {
    title: "Higher Conversion Rates",
    description: "Better targeting and landing page optimization turn more clicks into customers.",
    icon: Target,
    stat: "2.5x",
    statLabel: "avg. conversion increase",
  },
  {
    title: "Transparent Reporting",
    description: "Know exactly where every dollar goes. No hidden fees, no confusing metrics.",
    icon: BarChart3,
    stat: "100%",
    statLabel: "spend transparency",
  },
  {
    title: "No Long-Term Contracts",
    description: "Month-to-month because we earn your business with results, not lock-ins.",
    icon: Shield,
    stat: "0",
    statLabel: "contracts required",
  },
]

const process = [
  {
    week: "Week 1",
    title: "Audit & Strategy",
    description: "Deep dive into your current campaigns (or competitors if you're new). Identify waste, opportunities, and quick wins.",
    tasks: [
      "Full account audit",
      "Competitor analysis",
      "Keyword opportunity research",
      "Conversion tracking setup",
    ],
  },
  {
    week: "Week 2",
    title: "Campaign Build",
    description: "Build campaigns from the ground up with proven structures, compelling ads, and strategic targeting.",
    tasks: [
      "Campaign structure design",
      "Ad copy creation (multiple variants)",
      "Audience targeting setup",
      "Negative keyword lists",
    ],
  },
  {
    week: "Week 3",
    title: "Launch & Monitor",
    description: "Go live with close monitoring. We watch the data like hawks and make rapid adjustments.",
    tasks: [
      "Campaign launch",
      "Daily performance monitoring",
      "Bid adjustments",
      "Initial optimizations",
    ],
  },
  {
    week: "Ongoing",
    title: "Optimize & Scale",
    description: "Continuous improvement. Test new ads, expand winners, cut losers, and scale what works.",
    tasks: [
      "A/B testing ads & landing pages",
      "Budget reallocation to winners",
      "New keyword expansion",
      "Monthly strategy calls",
    ],
  },
]

const faqs = [
  {
    q: "How much should I spend on Google Ads?",
    a: "It depends on your industry and goals, but most local businesses see results with $1,500-5,000/month. We'll help you determine the right budget based on your cost per lead targets and growth goals.",
  },
  {
    q: "How quickly will I see results?",
    a: "You'll see traffic immediately. Meaningful conversion data typically comes within 2-4 weeks. Optimization compounds over time—most clients see their best results at 3-6 months.",
  },
  {
    q: "What's your management fee?",
    a: "Our Google Ads management is included in our Growth ($1,200/mo) and Dominate ($2,500/mo) packages. No percentage of ad spend fees that grow as you scale.",
  },
  {
    q: "Do you require a minimum ad spend?",
    a: "We recommend at least $1,500/month in ad spend to generate meaningful data and results. Less than that makes it hard to optimize effectively.",
  },
  {
    q: "Will I own my Google Ads account?",
    a: "Absolutely. We work in YOUR account. You own everything—campaigns, data, history. If you ever leave, it's all yours.",
  },
  {
    q: "How is this different from doing it myself?",
    a: "Google makes it easy to spend money, hard to spend it well. We bring years of experience, proven strategies, and full-time attention. Most DIY accounts waste 40-60% of their budget.",
  },
  {
    q: "Do you work with competitors in my area?",
    a: "No. We take one client per industry per metro area. When you work with us, your competitors can't. First come, first served.",
  },
]

const industries = [
  { name: "Medical & Wellness", icon: Stethoscope },
  { name: "Home Services", icon: Wrench },
  { name: "Event Venues", icon: Building2 },
  { name: "Retail & E-commerce", icon: Store },
]

export default function GoogleAdsPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [activeProcess, setActiveProcess] = useState(0)
  const [activeCampaign, setActiveCampaign] = useState(0)
  const [expandedPain, setExpandedPain] = useState<number | null>(null)
  
  // Calculator state
  const [adSpend, setAdSpend] = useState(3000)
  const avgCPC = 4.50
  const conversionRate = 0.08
  const estimatedClicks = Math.round(adSpend / avgCPC)
  const estimatedLeads = Math.round(estimatedClicks * conversionRate)
  const costPerLead = estimatedLeads > 0 ? Math.round(adSpend / estimatedLeads) : 0
  const industryAvgCPL = 85
  
  const heroRef = useRef(null)
  const resultsRef = useRef(null)
  const processRef = useRef(null)
  const calcRef = useRef(null)
  
  const heroInView = useInView(heroRef, { once: true })
  const resultsInView = useInView(resultsRef, { once: true, margin: "-100px" })
  const processInView = useInView(processRef, { once: true, margin: "-100px" })
  const calcInView = useInView(calcRef, { once: true, margin: "-100px" })

  return (
    <main className="bg-brand-dark">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-brand-orange/15 rounded-full blur-[120px] animate-pulse delay-1000" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={heroInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-brand-orange/10 border border-brand-orange/30 rounded-full px-4 py-2 mb-8"
            >
              <MousePointerClick className="w-4 h-4 text-brand-orange" />
              <span className="text-brand-orange text-sm font-medium">Google Ads Management Las Vegas</span>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Stop Wasting Money
              <span className="block text-brand-orange">on Google Ads</span>
            </h1>
            
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Get more leads for less. Our expert PPC management turns your ad spend into 
              a predictable customer acquisition machine.
            </p>

            {/* Stats Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap justify-center gap-8 mb-10"
            >
              {[
                { value: "32%", label: "lower cost per lead" },
                { value: "2.5x", label: "conversion increase" },
                { value: "$0", label: "wasted on bad clicks" },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl font-bold text-brand-orange">{stat.value}</div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                href="#pricing"
                className="group bg-brand-orange hover:bg-brand-orange-dark text-white px-8 py-4 rounded-full font-semibold text-lg transition-all inline-flex items-center justify-center gap-2"
              >
                See Pricing
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="#calculator"
                className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all border border-white/20 inline-flex items-center justify-center gap-2"
              >
                <Calculator className="w-5 h-5" />
                Calculate Your ROI
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-3 bg-brand-orange rounded-full mt-2"
            />
          </div>
        </motion.div>
      </section>

      {/* Pain Points Section */}
      <section className="py-20 bg-brand-charcoal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Tired of This?
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              We fix the problems that plague most Google Ads accounts.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {painPoints.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setExpandedPain(expandedPain === index ? null : index)}
                className="cursor-pointer group"
              >
                <div className={`relative bg-brand-dark rounded-2xl p-6 border transition-all duration-300 h-full ${
                  expandedPain === index 
                    ? 'border-brand-orange shadow-lg shadow-brand-orange/20' 
                    : 'border-gray-800 hover:border-gray-700'
                }`}>
                  <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-red-500/20 transition-colors">
                    <item.icon className="w-6 h-6 text-red-400" />
                  </div>
                  
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {item.problem}
                  </h3>
                  
                  <AnimatePresence>
                    {expandedPain === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                      >
                        <div className="flex items-center gap-2 mb-2 mt-4">
                          <CheckCircle2 className="w-4 h-4 text-green-400" />
                          <span className="text-green-400 text-sm font-medium">Our Solution:</span>
                        </div>
                        <p className="text-gray-400 text-sm">
                          {item.solution}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  <div className={`mt-4 text-brand-orange text-sm font-medium flex items-center gap-1 transition-opacity ${
                    expandedPain === index ? 'opacity-0' : 'opacity-100'
                  }`}>
                    Tap for solution
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Campaign Types Section */}
      <section className="py-20 bg-brand-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-brand-orange font-semibold text-sm uppercase tracking-wider">
              Campaign Types
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-4 mb-4">
              We Manage It All
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              From search to shopping to YouTube—full-spectrum Google Ads expertise.
            </p>
          </motion.div>

          {/* Campaign Type Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {campaignTypes.map((type, index) => (
              <button
                key={type.id}
                onClick={() => setActiveCampaign(index)}
                className={`flex items-center gap-2 px-5 py-3 rounded-full font-medium transition-all ${
                  activeCampaign === index
                    ? 'bg-brand-orange text-white'
                    : 'bg-brand-charcoal text-gray-400 hover:text-white border border-gray-700'
                }`}
              >
                <type.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{type.name}</span>
              </button>
            ))}
          </div>

          {/* Campaign Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCampaign}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-brand-charcoal rounded-2xl p-8 border border-gray-800 max-w-4xl mx-auto"
            >
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 bg-brand-orange/10 rounded-xl flex items-center justify-center">
                      {(() => {
                        const Icon = campaignTypes[activeCampaign].icon
                        return <Icon className="w-7 h-7 text-brand-orange" />
                      })()}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">{campaignTypes[activeCampaign].name}</h3>
                      <p className="text-gray-500 text-sm">Best for: {campaignTypes[activeCampaign].bestFor}</p>
                    </div>
                  </div>
                  <p className="text-gray-400 mb-6">{campaignTypes[activeCampaign].description}</p>
                </div>
                
                <div className="flex-1">
                  <h4 className="text-white font-medium mb-4">What you get:</h4>
                  <ul className="space-y-3">
                    {campaignTypes[activeCampaign].benefits.map((benefit, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-start gap-3"
                      >
                        <CheckCircle2 className="w-5 h-5 text-brand-orange flex-shrink-0 mt-0.5" />
                        <span className="text-gray-300">{benefit}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Results Section */}
      <section ref={resultsRef} className="py-20 bg-brand-charcoal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={resultsInView ? { opacity: 1, y: 0 } : {}}
            className="text-center mb-16"
          >
            <span className="text-brand-orange font-semibold text-sm uppercase tracking-wider">
              The Results
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-4 mb-4">
              What Expert Management Delivers
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Real outcomes that impact your bottom line.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {results.map((result, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={resultsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1 }}
                className="bg-brand-dark rounded-2xl p-6 border border-gray-800 hover:border-brand-orange/50 transition-all group"
              >
                <div className="w-14 h-14 bg-brand-orange/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-brand-orange group-hover:text-white transition-all">
                  <result.icon className="w-7 h-7 text-brand-orange group-hover:text-white transition-colors" />
                </div>
                
                <div className="mb-4">
                  <span className="text-4xl font-bold text-brand-orange">{result.stat}</span>
                  <span className="block text-xs text-gray-500 mt-1">{result.statLabel}</span>
                </div>
                
                <h3 className="text-lg font-semibold text-white mb-2">{result.title}</h3>
                <p className="text-gray-400 text-sm">{result.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section ref={processRef} className="py-20 bg-brand-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={processInView ? { opacity: 1, y: 0 } : {}}
            className="text-center mb-16"
          >
            <span className="text-brand-orange font-semibold text-sm uppercase tracking-wider">
              Our Process
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-4 mb-4">
              From Audit to ROI
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              A proven system that turns ad spend into predictable revenue.
            </p>
          </motion.div>

          {/* Process Navigation */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {process.map((item, index) => (
              <button
                key={index}
                onClick={() => setActiveProcess(index)}
                className={`px-6 py-3 rounded-full font-medium transition-all ${
                  activeProcess === index
                    ? 'bg-brand-orange text-white'
                    : 'bg-brand-charcoal text-gray-400 hover:text-white border border-gray-700'
                }`}
              >
                {item.week}
              </button>
            ))}
          </div>

          {/* Process Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProcess}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-brand-charcoal rounded-2xl p-8 border border-gray-800 max-w-3xl mx-auto"
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-brand-orange rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold">{activeProcess + 1}</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">{process[activeProcess].title}</h3>
                  <p className="text-gray-400 mt-1">{process[activeProcess].description}</p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {process[activeProcess].tasks.map((task, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-3 bg-brand-dark rounded-lg p-4"
                  >
                    <CheckCircle2 className="w-5 h-5 text-brand-orange flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300 text-sm">{task}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ROI Calculator Section */}
      <section ref={calcRef} id="calculator" className="py-20 bg-brand-charcoal">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={calcInView ? { opacity: 1, y: 0 } : {}}
            className="text-center mb-12"
          >
            <span className="text-brand-orange font-semibold text-sm uppercase tracking-wider">
              ROI Calculator
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-4 mb-4">
              What Could Your Ad Spend Deliver?
            </h2>
            <p className="text-gray-400">
              See estimated results based on optimized campaign performance.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={calcInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="bg-brand-dark rounded-2xl p-8 border border-gray-800"
          >
            <div className="mb-8">
              <label className="block text-white font-medium mb-4">
                Monthly Ad Budget
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="1000"
                  max="20000"
                  step="500"
                  value={adSpend}
                  onChange={(e) => setAdSpend(Number(e.target.value))}
                  className="flex-1 h-2 bg-brand-charcoal rounded-lg appearance-none cursor-pointer accent-brand-orange"
                />
                <div className="w-28 text-center">
                  <span className="text-3xl font-bold text-brand-orange">${adSpend.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-6 mb-8">
              <div className="text-center p-6 bg-brand-charcoal rounded-xl">
                <LineChart className="w-8 h-8 text-brand-orange mx-auto mb-3" />
                <div className="text-3xl font-bold text-white">{estimatedClicks.toLocaleString()}</div>
                <div className="text-gray-500 text-sm">estimated clicks</div>
              </div>
              <div className="text-center p-6 bg-brand-orange/10 rounded-xl border border-brand-orange/30">
                <Users className="w-8 h-8 text-brand-orange mx-auto mb-3" />
                <div className="text-3xl font-bold text-brand-orange">{estimatedLeads}</div>
                <div className="text-gray-400 text-sm">estimated leads</div>
              </div>
              <div className="text-center p-6 bg-brand-charcoal rounded-xl">
                <DollarSign className="w-8 h-8 text-brand-orange mx-auto mb-3" />
                <div className="text-3xl font-bold text-white">${costPerLead}</div>
                <div className="text-gray-500 text-sm">cost per lead</div>
              </div>
            </div>

            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 mb-6">
              <div className="flex items-center gap-3">
                <BadgeCheck className="w-6 h-6 text-green-400" />
                <div>
                  <span className="text-green-400 font-medium">Industry avg CPL: ${industryAvgCPL}</span>
                  {costPerLead < industryAvgCPL && (
                    <span className="text-gray-400 ml-2">
                      — You'd save ${(industryAvgCPL - costPerLead) * estimatedLeads}/mo
                    </span>
                  )}
                </div>
              </div>
            </div>

            <p className="text-center text-gray-500 text-sm mb-6">
              * Estimates based on avg. CPC of ${avgCPC.toFixed(2)} and {(conversionRate * 100).toFixed(0)}% conversion rate. Actual results vary by industry.
            </p>

            <div className="text-center">
              <Link
                href="#pricing"
                className="inline-flex items-center gap-2 bg-brand-orange hover:bg-brand-orange-dark text-white px-8 py-4 rounded-full font-semibold transition-all"
              >
                Get Your Free Ads Audit
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Industries We Serve */}
      <section className="py-20 bg-brand-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Industries We Serve
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Specialized Google Ads strategies for Las Vegas businesses.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {industries.map((industry, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-brand-charcoal rounded-xl p-6 border border-gray-800 hover:border-brand-orange/50 transition-all text-center group cursor-pointer"
              >
                <div className="w-16 h-16 bg-brand-orange/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-brand-orange transition-colors">
                  <industry.icon className="w-8 h-8 text-brand-orange group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-white font-medium">{industry.name}</h3>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-8 p-6 bg-brand-charcoal/50 rounded-xl border border-gray-800 max-w-2xl mx-auto"
          >
            <p className="text-gray-400">
              <span className="text-brand-orange font-semibold">Exclusive territory:</span> We only take one client per industry per area. 
              Your competitors can't work with us once you do.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-brand-charcoal">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-brand-orange font-semibold text-sm uppercase tracking-wider">
              FAQ
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-4 mb-4">
              Common Questions
            </h2>
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
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full bg-brand-dark rounded-xl p-6 text-left border border-gray-800 hover:border-gray-700 transition-all"
                >
                  <div className="flex justify-between items-center gap-4">
                    <h3 className="text-white font-medium pr-4">{faq.q}</h3>
                    <ChevronDown className={`w-5 h-5 text-brand-orange flex-shrink-0 transition-transform ${
                      openFaq === index ? 'rotate-180' : ''
                    }`} />
                  </div>
                  <AnimatePresence>
                    {openFaq === index && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-gray-400 mt-4 pr-8"
                      >
                        {faq.a}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section id="pricing" className="py-20 bg-brand-dark relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-orange/10 blur-[200px] rounded-full" />
        </div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Ready to Stop Wasting Ad Spend?
            </h2>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Get a free audit of your Google Ads account. We'll show you exactly 
              where you're losing money and how to fix it.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/#pricing"
                className="group bg-brand-orange hover:bg-brand-orange-dark text-white px-8 py-4 rounded-full font-semibold text-lg transition-all inline-flex items-center justify-center gap-2"
              >
                View Pricing Plans
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/#contact"
                className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all border border-white/20"
              >
                Get Free Ads Audit
              </Link>
            </div>

            <p className="text-gray-500 mt-8 text-sm">
              No contracts. No percentage fees. Just results.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Google Ads Management Las Vegas",
            "description": "Professional Google Ads and PPC management services for Las Vegas businesses. Expert campaign management, optimization, and reporting to maximize your advertising ROI.",
            "provider": {
              "@type": "LocalBusiness",
              "name": "Lead Metrik",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Las Vegas",
                "addressRegion": "NV",
                "addressCountry": "US"
              }
            },
            "areaServed": {
              "@type": "City",
              "name": "Las Vegas"
            },
            "serviceType": ["Google Ads Management", "PPC Management", "Pay Per Click Advertising"]
          })
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map(faq => ({
              "@type": "Question",
              "name": faq.q,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.a
              }
            }))
          })
        }}
      />
    </main>
  )
}
