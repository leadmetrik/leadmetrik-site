'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'

const painPoints = [
  {
    title: "You're invisible on Google",
    description: "Patients search 'weight loss clinic near me' and find your competitors instead.",
    icon: '🔍',
  },
  {
    title: 'Low review count',
    description: 'Your 12 reviews can\'t compete with clinics that have 200+. New patients trust reviews.',
    icon: '⭐',
  },
  {
    title: 'Expensive, ineffective ads',
    description: 'You\'re paying $50+ per click on Google Ads but not seeing the ROI.',
    icon: '💸',
  },
  {
    title: 'No social proof',
    description: 'Before/after photos and patient testimonials are your best marketing — but nobody sees them.',
    icon: '📱',
  },
]

const services = [
  'Google Business Profile optimization',
  'Local SEO for medical keywords',
  'Google Ads management',
  'Facebook/Instagram advertising',
  'Reputation management',
  'Before/after content strategy',
  'HIPAA-compliant marketing',
  'Conversion tracking setup',
]

const results = [
  { metric: '3x', label: 'Average increase in monthly leads' },
  { metric: '40%', label: 'Reduction in cost per lead' },
  { metric: 'Top 3', label: 'Google Maps ranking goal' },
]

export default function MedicalMarketing() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <div className="min-h-screen bg-brand-dark pt-20">
      {/* Hero */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 text-blue-400 font-semibold text-sm uppercase tracking-wider mb-4">
              <span className="text-2xl">🏥</span>
              Medical & Wellness Marketing
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Get More Patients Without Relying on Referrals
            </h1>
            <p className="text-xl text-gray-400 mb-8">
              We help medical clinics, med spas, and wellness centers dominate local search 
              and get a steady stream of qualified patient inquiries.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="#contact"
                className="bg-brand-orange hover:bg-brand-orange-dark text-white px-8 py-4 rounded-full font-semibold text-lg transition-all btn-shine text-center"
              >
                Get Your Free Audit
              </Link>
              <Link
                href="tel:+17029964415"
                className="border border-gray-700 hover:border-gray-500 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all text-center"
              >
                Call (702) 996-4415
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-brand-charcoal/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 gap-8 text-center">
            {results.map((item) => (
              <div key={item.label}>
                <div className="text-3xl md:text-4xl font-bold text-brand-orange">{item.metric}</div>
                <div className="text-gray-400 text-sm mt-1">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pain Points */}
      <section ref={ref} className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Sound Familiar?
            </h2>
            <p className="text-gray-400 text-lg">
              These are the challenges we solve for medical practices every day.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {painPoints.map((point, index) => (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1 }}
                className="bg-brand-charcoal/50 border border-gray-800 rounded-xl p-6"
              >
                <div className="text-4xl mb-4">{point.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{point.title}</h3>
                <p className="text-gray-400">{point.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-brand-charcoal/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                What We Do for Medical Practices
              </h2>
              <p className="text-gray-400 text-lg mb-8">
                A complete digital marketing solution tailored for healthcare providers. 
                We handle everything so you can focus on patient care.
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {services.map((service) => (
                  <li key={service} className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-brand-orange flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-300">{service}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-brand-dark rounded-2xl p-8 border border-gray-800">
              <h3 className="text-2xl font-bold text-white mb-4">Ready to Grow?</h3>
              <p className="text-gray-400 mb-6">
                Get a free analysis of your current online presence and see exactly where you stand.
              </p>
              <Link
                href="#contact"
                className="block w-full bg-brand-orange hover:bg-brand-orange-dark text-white py-4 rounded-full font-semibold text-center transition-all btn-shine"
              >
                Get My Free Audit
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Start Getting More Patients This Month
          </h2>
          <p className="text-gray-400 text-lg mb-8">
            Join other successful medical practices in Las Vegas who trust Lead Metrik for their marketing.
          </p>
          <Link
            href="#contact"
            className="inline-flex items-center gap-2 bg-brand-orange hover:bg-brand-orange-dark text-white px-8 py-4 rounded-full font-semibold text-lg transition-all btn-shine"
          >
            Schedule Your Free Consultation
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  )
}
