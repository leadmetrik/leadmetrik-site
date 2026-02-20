'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'

const painPoints = [
  {
    title: 'Seasonal booking gaps',
    description: 'January and summer are slow, and you\'re scrambling to fill dates.',
    icon: '📅',
  },
  {
    title: 'Lost to competitors',
    description: 'Couples find other venues on Google because your site doesn\'t rank.',
    icon: '🏆',
  },
  {
    title: 'Website visitors don\'t convert',
    description: 'You get traffic but inquiries don\'t match — your funnel is broken.',
    icon: '🔄',
  },
  {
    title: 'Relying on word of mouth',
    description: 'Referrals are great but unpredictable. You need consistent leads.',
    icon: '📢',
  },
]

const services = [
  'Google Business Profile optimization',
  'Local SEO for venue keywords',
  'Google Ads for wedding/event searches',
  'Facebook/Instagram advertising',
  'Professional photography showcases',
  'Virtual tour integration',
  'Review generation campaigns',
  'Lead capture optimization',
]

export default function VenueMarketing() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <div className="min-h-screen bg-brand-dark pt-20">
      {/* Hero */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 text-purple-400 font-semibold text-sm uppercase tracking-wider mb-4">
              <span className="text-2xl">🏛️</span>
              Event Venue Marketing
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Fill Your Event Calendar Year-Round
            </h1>
            <p className="text-xl text-gray-400 mb-8">
              We help event venues, wedding venues, and banquet halls get found online 
              and book more events — even during slow seasons.
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
            <div>
              <div className="text-3xl md:text-4xl font-bold text-brand-orange">80%</div>
              <div className="text-gray-400 text-sm mt-1">Of couples find venues online</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-brand-orange">2x</div>
              <div className="text-gray-400 text-sm mt-1">More inquiries with SEO</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-brand-orange">Top 3</div>
              <div className="text-gray-400 text-sm mt-1">Google Maps ranking goal</div>
            </div>
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
              Common Venue Challenges
            </h2>
            <p className="text-gray-400 text-lg">
              We've helped venues just like yours overcome these obstacles.
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
                Marketing Built for Venues
              </h2>
              <p className="text-gray-400 text-lg mb-8">
                We understand the event industry. Our strategies are designed to showcase 
                your space and convert browsers into booked events.
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
              <h3 className="text-2xl font-bold text-white mb-4">Book More Events</h3>
              <p className="text-gray-400 mb-6">
                See how your venue stacks up against competitors with a free marketing audit.
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
            Ready to Fill Your Calendar?
          </h2>
          <p className="text-gray-400 text-lg mb-8">
            Let's talk about how we can help your venue get more bookings.
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
