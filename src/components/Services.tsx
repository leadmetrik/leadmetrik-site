'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'

const packages = [
  {
    name: 'Starter',
    tagline: 'Get Found',
    price: '500',
    description: 'Perfect for businesses just starting their digital presence',
    features: [
      'Professional website design',
      'Google Business Profile setup',
      'Basic local SEO optimization',
      'Mobile-responsive design',
      'Monthly performance report',
    ],
    cta: 'Get Started',
    popular: false,
  },
  {
    name: 'Growth',
    tagline: 'Get Leads',
    price: '1,200',
    description: 'For businesses ready to scale their customer acquisition',
    features: [
      'Everything in Starter',
      'Google Ads management',
      'Social media marketing',
      'Advanced local SEO',
      'Conversion tracking setup',
      'Bi-weekly strategy calls',
      'Competitor analysis',
    ],
    cta: 'Scale Up',
    popular: true,
  },
  {
    name: 'Dominate',
    tagline: 'Own Your Market',
    price: '2,500',
    description: 'Full-service marketing for maximum market domination',
    features: [
      'Everything in Growth',
      'Premium link building',
      'Content marketing (blogs)',
      'Reputation management',
      'Video production',
      'Email marketing automation',
      'Dedicated account manager',
      'Monthly strategy calls',
    ],
    cta: 'Dominate Now',
    popular: false,
  },
]

export default function Services() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="services" className="py-24 bg-brand-dark">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-brand-orange font-semibold text-sm uppercase tracking-wider">
            SEO & Marketing Packages
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-4 mb-6">
            Las Vegas SEO Services & Pricing
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Search engine optimization and digital marketing packages for Las Vegas businesses. 
            No confusing options — pick a plan that matches your goals.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-6">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className={`relative rounded-2xl overflow-hidden card-hover ${
                pkg.popular
                  ? 'bg-gradient-to-b from-brand-orange/20 to-brand-dark border-2 border-brand-orange'
                  : 'bg-brand-charcoal/50 border border-gray-800'
              }`}
            >
              {/* Popular badge */}
              {pkg.popular && (
                <div className="absolute top-0 right-0">
                  <div className="bg-brand-orange text-white text-xs font-bold px-4 py-1 rounded-bl-lg">
                    MOST POPULAR
                  </div>
                </div>
              )}

              <div className="p-8">
                {/* Plan name */}
                <div className="mb-6">
                  <span className="text-brand-orange font-semibold text-sm uppercase tracking-wider">
                    {pkg.tagline}
                  </span>
                  <h3 className="text-2xl font-bold text-white mt-2">{pkg.name}</h3>
                  <p className="text-gray-400 mt-2 text-sm">{pkg.description}</p>
                </div>

                {/* Price */}
                <div className="mb-8">
                  <div className="flex items-baseline gap-1">
                    <span className="text-gray-400 text-xl">$</span>
                    <span className="text-5xl font-bold text-white">{pkg.price}</span>
                    <span className="text-gray-400">/mo</span>
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-4 mb-8">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <svg
                        className="w-5 h-5 text-brand-orange mt-0.5 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link
                  href="#contact"
                  className={`block w-full py-4 rounded-full font-semibold text-center transition-all ${
                    pkg.popular
                      ? 'bg-brand-orange hover:bg-brand-orange-dark text-white btn-shine'
                      : 'bg-white/10 hover:bg-white/20 text-white border border-gray-700'
                  }`}
                >
                  {pkg.cta}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center text-gray-500 mt-12"
        >
          All plans are month-to-month. No long-term contracts. Cancel anytime.
        </motion.p>
      </div>
    </section>
  )
}
