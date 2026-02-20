'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'

const industries = [
  {
    name: 'Medical & Wellness',
    slug: 'medical-marketing',
    icon: '🏥',
    description: 'Get more patients through local search and targeted ads',
    painPoints: ['Low Google visibility', 'Competing with big clinics', 'Need more patient reviews'],
    stats: '73% of patients search online before booking',
    color: 'from-blue-500/20 to-blue-600/5',
    borderColor: 'border-blue-500/30',
  },
  {
    name: 'Event Venues',
    slug: 'venue-marketing',
    icon: '🏛️',
    description: 'Fill your calendar with qualified event inquiries',
    painPoints: ['Seasonal booking gaps', 'Standing out locally', 'Converting website visitors'],
    stats: '80% of couples find venues through Google',
    color: 'from-purple-500/20 to-purple-600/5',
    borderColor: 'border-purple-500/30',
  },
  {
    name: 'Home Services',
    slug: 'home-services-marketing',
    icon: '🔧',
    description: 'Be the first call when homeowners need help',
    painPoints: ['Competing on price', 'Emergency job visibility', 'Building trust fast'],
    stats: '97% of consumers search online for local services',
    color: 'from-green-500/20 to-green-600/5',
    borderColor: 'border-green-500/30',
  },
  {
    name: 'Small Business',
    slug: 'small-business-marketing',
    icon: '🏪',
    description: 'Compete with bigger brands on a smaller budget',
    painPoints: ['Limited marketing budget', 'No time for marketing', 'Need quick results'],
    stats: '46% of all searches have local intent',
    color: 'from-brand-orange/20 to-brand-orange/5',
    borderColor: 'border-brand-orange/30',
  },
]

export default function Industries() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="industries" className="py-24 bg-brand-charcoal relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-brand-orange/5 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-brand-orange/5 rounded-full blur-[150px]" />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-brand-orange font-semibold text-sm uppercase tracking-wider">
            Industries We Serve
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-4 mb-6">
            We Understand Your Business
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            We specialize in helping local businesses like yours dominate their market. 
            Our strategies are tailored to your industry's unique challenges.
          </p>
        </motion.div>

        {/* Industry Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {industries.map((industry, index) => (
            <motion.div
              key={industry.slug}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link
                href={`/industries/${industry.slug}`}
                className={`block h-full p-8 rounded-2xl bg-gradient-to-br ${industry.color} border ${industry.borderColor} card-hover group`}
              >
                <div className="flex items-start gap-4">
                  <div className="text-5xl">{industry.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-brand-orange transition-colors">
                      {industry.name}
                    </h3>
                    <p className="text-gray-300 mb-4">{industry.description}</p>
                    
                    {/* Pain points */}
                    <div className="space-y-2 mb-4">
                      {industry.painPoints.map((point) => (
                        <div key={point} className="flex items-center gap-2 text-sm text-gray-400">
                          <span className="text-brand-orange">✓</span>
                          {point}
                        </div>
                      ))}
                    </div>

                    {/* Stat */}
                    <div className="bg-white/5 rounded-lg px-4 py-3 inline-block">
                      <p className="text-sm text-brand-orange font-medium">{industry.stats}</p>
                    </div>
                  </div>
                </div>

                {/* Arrow */}
                <div className="flex justify-end mt-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-brand-orange transition-colors">
                    <svg
                      className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12"
        >
          <p className="text-gray-400 mb-4">Don't see your industry?</p>
          <Link
            href="#contact"
            className="inline-flex items-center gap-2 text-brand-orange hover:text-brand-orange-light font-semibold transition-colors"
          >
            Let's talk about your business
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
