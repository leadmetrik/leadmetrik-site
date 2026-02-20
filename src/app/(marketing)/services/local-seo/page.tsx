'use client'

import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { 
  MapPin, Phone, Star, TrendingUp, Search, Target, 
  CheckCircle2, ArrowRight, ChevronDown, Zap, Shield,
  BarChart3, Users, Clock, Award, Building2, Wrench,
  Stethoscope, Store, Calculator, Play
} from 'lucide-react'

// SEO Metadata handled in layout or generateMetadata

const painPoints = [
  {
    problem: "Invisible on Google Maps?",
    solution: "We optimize your Google Business Profile to appear in the Map Pack for your target keywords.",
    icon: MapPin,
  },
  {
    problem: "Competitors outranking you?",
    solution: "Our aggressive link building and citation strategy pushes you above the competition.",
    icon: TrendingUp,
  },
  {
    problem: "Getting clicks but no calls?",
    solution: "We optimize for buyer-intent keywords that bring customers ready to purchase.",
    icon: Phone,
  },
  {
    problem: "Bad or no reviews?",
    solution: "Our review generation system builds your reputation and trust signals automatically.",
    icon: Star,
  },
]

const benefits = [
  {
    title: "Appear in Google Map Pack",
    description: "Show up when locals search for your services. The Map Pack gets 44% of all clicks.",
    icon: MapPin,
    stat: "44%",
    statLabel: "of clicks go to Map Pack",
  },
  {
    title: "More Calls From Ready Buyers",
    description: "Rank for high-intent keywords like 'near me' searches that convert 28% higher.",
    icon: Phone,
    stat: "28%",
    statLabel: "higher conversion rate",
  },
  {
    title: "Build Unshakeable Trust",
    description: "Dominate review sites and build the social proof that makes customers choose you.",
    icon: Shield,
    stat: "93%",
    statLabel: "read reviews before buying",
  },
  {
    title: "Track Every Lead",
    description: "Know exactly which keywords drive calls, form fills, and revenue. No guessing.",
    icon: BarChart3,
    stat: "100%",
    statLabel: "attribution clarity",
  },
]

const timeline = [
  {
    month: "Month 1",
    title: "Foundation & Audit",
    description: "We analyze your current rankings, audit your Google Business Profile, and identify quick wins.",
    tasks: [
      "Complete SEO audit & competitor analysis",
      "Google Business Profile optimization",
      "Citation building (50+ directories)",
      "Initial rank tracking setup",
    ],
  },
  {
    month: "Month 2",
    title: "Authority Building",
    description: "Aggressive link building begins. We secure high-authority backlinks that boost your rankings.",
    tasks: [
      "Guest posts on DA 40+ sites",
      "Google News link placements",
      "Niche-relevant backlink outreach",
      "Review generation campaign",
    ],
  },
  {
    month: "Month 3+",
    title: "Domination Mode",
    description: "Rankings climb. Leads increase. We double down on what's working and expand your reach.",
    tasks: [
      "Ongoing link building (120+ monthly)",
      "Content optimization & expansion",
      "Competitor backlink acquisition",
      "Monthly strategy calls & reporting",
    ],
  },
]

const faqs = [
  {
    q: "How long until I see results from local SEO?",
    a: "Most clients see measurable ranking improvements within 60-90 days. However, SEO is a long-term investment—the biggest gains come at 6-12 months as your authority compounds.",
  },
  {
    q: "What's included in your local SEO services?",
    a: "Our packages include Google Business Profile optimization, citation building, high-authority link building, review management, rank tracking, and monthly reporting. We handle everything—you just answer the phone.",
  },
  {
    q: "Do I need to sign a long-term contract?",
    a: "No. We're month-to-month because we believe in earning your business every single month. That said, SEO works best as a sustained effort—most successful clients stay 12+ months.",
  },
  {
    q: "How is this different from other SEO companies?",
    a: "We focus exclusively on local businesses and use proven, white-hat techniques. No shortcuts, no BS. Plus, you'll actually talk to real humans—not get lost in a ticket system.",
  },
  {
    q: "What if I'm already running Google Ads?",
    a: "Great—they complement each other. Ads give immediate visibility while SEO builds long-term organic traffic. Many clients reduce ad spend as organic rankings improve.",
  },
  {
    q: "How do you report on progress?",
    a: "Monthly reports showing ranking changes, traffic growth, citation status, and lead tracking. Plus a strategy call to discuss what's working and what's next.",
  },
]

const industries = [
  { name: "Medical & Wellness", icon: Stethoscope },
  { name: "Home Services", icon: Wrench },
  { name: "Event Venues", icon: Building2 },
  { name: "Retail & Local Shops", icon: Store },
]

export default function LocalSEOPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [activeTimeline, setActiveTimeline] = useState(0)
  const [expandedPain, setExpandedPain] = useState<number | null>(null)
  
  // Calculator state
  const [currentLeads, setCurrentLeads] = useState(10)
  const projectedLeads3mo = Math.round(currentLeads * 1.8)
  const projectedLeads6mo = Math.round(currentLeads * 3.2)
  
  const heroRef = useRef(null)
  const benefitsRef = useRef(null)
  const timelineRef = useRef(null)
  const calcRef = useRef(null)
  
  const heroInView = useInView(heroRef, { once: true })
  const benefitsInView = useInView(benefitsRef, { once: true, margin: "-100px" })
  const timelineInView = useInView(timelineRef, { once: true, margin: "-100px" })
  const calcInView = useInView(calcRef, { once: true, margin: "-100px" })

  return (
    <main className="bg-brand-dark">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-orange/20 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-orange/10 rounded-full blur-[120px] animate-pulse delay-1000" />
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
              <MapPin className="w-4 h-4 text-brand-orange" />
              <span className="text-brand-orange text-sm font-medium">Las Vegas Local SEO Experts</span>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Dominate Local Search
              <span className="block text-brand-orange">Get Found. Get Calls. Get Paid.</span>
            </h1>
            
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Stop losing customers to competitors who rank higher. Our local SEO strategies put your business 
              in front of people actively searching for what you offer.
            </p>

            {/* Stats Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap justify-center gap-8 mb-10"
            >
              {[
                { value: "46%", label: "of Google searches are local" },
                { value: "76%", label: "visit a business within 24hrs" },
                { value: "28%", label: "result in a purchase" },
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

      {/* Pain Points Section - Interactive Cards */}
      <section className="py-20 bg-brand-charcoal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Sound Familiar?
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              These are the problems we solve every day for Las Vegas businesses.
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
                  <div className="w-12 h-12 bg-brand-orange/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-brand-orange/20 transition-colors">
                    <item.icon className="w-6 h-6 text-brand-orange" />
                  </div>
                  
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {item.problem}
                  </h3>
                  
                  <AnimatePresence>
                    {expandedPain === index && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-gray-400 text-sm"
                      >
                        {item.solution}
                      </motion.p>
                    )}
                  </AnimatePresence>
                  
                  <div className={`mt-4 text-brand-orange text-sm font-medium flex items-center gap-1 transition-transform ${
                    expandedPain === index ? 'opacity-0' : 'opacity-100'
                  }`}>
                    Tap to see solution
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section ref={benefitsRef} className="py-20 bg-brand-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={benefitsInView ? { opacity: 1, y: 0 } : {}}
            className="text-center mb-16"
          >
            <span className="text-brand-orange font-semibold text-sm uppercase tracking-wider">
              What You Get
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-4 mb-4">
              Results That Actually Matter
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Forget vanity metrics. Here's what local SEO actually does for your business.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={benefitsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1 }}
                className="bg-brand-charcoal/50 rounded-2xl p-6 border border-gray-800 hover:border-brand-orange/50 transition-all group"
              >
                <div className="w-14 h-14 bg-brand-orange/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-brand-orange group-hover:text-white transition-all">
                  <benefit.icon className="w-7 h-7 text-brand-orange group-hover:text-white transition-colors" />
                </div>
                
                <div className="mb-4">
                  <span className="text-4xl font-bold text-brand-orange">{benefit.stat}</span>
                  <span className="block text-xs text-gray-500 mt-1">{benefit.statLabel}</span>
                </div>
                
                <h3 className="text-lg font-semibold text-white mb-2">{benefit.title}</h3>
                <p className="text-gray-400 text-sm">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section ref={timelineRef} className="py-20 bg-brand-charcoal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={timelineInView ? { opacity: 1, y: 0 } : {}}
            className="text-center mb-16"
          >
            <span className="text-brand-orange font-semibold text-sm uppercase tracking-wider">
              The Process
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-4 mb-4">
              How We Get You Results
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              A proven system that's generated millions in revenue for local businesses.
            </p>
          </motion.div>

          {/* Timeline Navigation */}
          <div className="flex justify-center gap-4 mb-12">
            {timeline.map((item, index) => (
              <button
                key={index}
                onClick={() => setActiveTimeline(index)}
                className={`px-6 py-3 rounded-full font-medium transition-all ${
                  activeTimeline === index
                    ? 'bg-brand-orange text-white'
                    : 'bg-brand-dark text-gray-400 hover:text-white border border-gray-700'
                }`}
              >
                {item.month}
              </button>
            ))}
          </div>

          {/* Timeline Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTimeline}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-brand-dark rounded-2xl p-8 border border-gray-800 max-w-3xl mx-auto"
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-brand-orange rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold">{activeTimeline + 1}</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">{timeline[activeTimeline].title}</h3>
                  <p className="text-gray-400 mt-1">{timeline[activeTimeline].description}</p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {timeline[activeTimeline].tasks.map((task, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-3 bg-brand-charcoal/50 rounded-lg p-4"
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
      <section ref={calcRef} id="calculator" className="py-20 bg-brand-dark">
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
              See Your Potential Growth
            </h2>
            <p className="text-gray-400">
              Based on average results from our local SEO clients.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={calcInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="bg-brand-charcoal rounded-2xl p-8 border border-gray-800"
          >
            <div className="mb-8">
              <label className="block text-white font-medium mb-4">
                How many leads do you get per month right now?
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={currentLeads}
                  onChange={(e) => setCurrentLeads(Number(e.target.value))}
                  className="flex-1 h-2 bg-brand-dark rounded-lg appearance-none cursor-pointer accent-brand-orange"
                />
                <div className="w-20 text-center">
                  <span className="text-3xl font-bold text-brand-orange">{currentLeads}</span>
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-brand-dark rounded-xl">
                <div className="text-gray-500 text-sm mb-2">Current</div>
                <div className="text-3xl font-bold text-white">{currentLeads}</div>
                <div className="text-gray-500 text-sm">leads/month</div>
              </div>
              <div className="text-center p-6 bg-brand-orange/10 rounded-xl border border-brand-orange/30">
                <div className="text-brand-orange text-sm mb-2">After 3 Months</div>
                <div className="text-3xl font-bold text-brand-orange">{projectedLeads3mo}</div>
                <div className="text-gray-400 text-sm">+{Math.round((projectedLeads3mo / currentLeads - 1) * 100)}% growth</div>
              </div>
              <div className="text-center p-6 bg-brand-orange/20 rounded-xl border border-brand-orange/50">
                <div className="text-brand-orange text-sm mb-2">After 6 Months</div>
                <div className="text-4xl font-bold text-brand-orange">{projectedLeads6mo}</div>
                <div className="text-gray-400 text-sm">+{Math.round((projectedLeads6mo / currentLeads - 1) * 100)}% growth</div>
              </div>
            </div>

            <p className="text-center text-gray-500 text-sm mt-6">
              * Projections based on average client results. Individual results may vary.
            </p>

            <div className="mt-8 text-center">
              <Link
                href="#pricing"
                className="inline-flex items-center gap-2 bg-brand-orange hover:bg-brand-orange-dark text-white px-8 py-4 rounded-full font-semibold transition-all"
              >
                Start Growing Today
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Industries We Serve */}
      <section className="py-20 bg-brand-charcoal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Industries We Dominate
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Specialized local SEO strategies for Las Vegas businesses in these industries.
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
                className="bg-brand-dark rounded-xl p-6 border border-gray-800 hover:border-brand-orange/50 transition-all text-center group cursor-pointer"
              >
                <div className="w-16 h-16 bg-brand-orange/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-brand-orange transition-colors">
                  <industry.icon className="w-8 h-8 text-brand-orange group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-white font-medium">{industry.name}</h3>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-gray-500 mt-8"
          >
            Don't see your industry? <Link href="/#contact" className="text-brand-orange hover:underline">Let's talk</Link> — we've helped 50+ business types.
          </motion.p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-brand-dark">
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
                  className="w-full bg-brand-charcoal rounded-xl p-6 text-left border border-gray-800 hover:border-gray-700 transition-all"
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
      <section id="pricing" className="py-20 bg-brand-charcoal relative overflow-hidden">
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
              Ready to Dominate Local Search?
            </h2>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Join Las Vegas businesses already winning with local SEO. 
              Get a free audit and see exactly how we can help.
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
                Get Free SEO Audit
              </Link>
            </div>

            <p className="text-gray-500 mt-8 text-sm">
              No contracts. No BS. Just results.
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
            "name": "Local SEO Services Las Vegas",
            "description": "Professional local SEO services for Las Vegas businesses. Google Business Profile optimization, citation building, and link building to help you rank higher in local search.",
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
            "serviceType": "Local SEO"
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
