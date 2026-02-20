'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://your-project.supabase.co'

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)
    
    const formData = new FormData(e.currentTarget)
    
    const leadData = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      website: formData.get('website') as string,
      industry: formData.get('industry') as string,
      business_size: formData.get('business_size') as string,
      challenge: formData.get('challenge') as string,
      source: 'website',
    }

    try {
      const response = await fetch(`${SUPABASE_URL}/functions/v1/save-lead`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(leadData),
      })

      if (!response.ok) {
        throw new Error('Failed to submit form')
      }

      setSubmitted(true)
    } catch (err) {
      console.error('Form submission error:', err)
      setError('Something went wrong. Please try again or call us directly.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-24 bg-brand-charcoal relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-brand-orange/5 blur-[200px] rounded-full" />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="text-brand-orange font-semibold text-sm uppercase tracking-wider">
              Free SEO Audit Las Vegas
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-4 mb-6">
              Ready to Dominate Google?
            </h2>
            <p className="text-gray-400 text-lg mb-8">
              Get a free SEO audit of your online presence. Our Las Vegas digital marketing team will show you exactly 
              what's working, what's not, and how to fix it.
            </p>

            {/* Benefits */}
            <div className="space-y-4 mb-8">
              {[
                'Free 15-minute audit call',
                'Custom strategy for your business',
                'No long-term contracts',
                'Results within 30 days',
              ].map((benefit) => (
                <div key={benefit} className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-brand-orange/20 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-brand-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-300">{benefit}</span>
                </div>
              ))}
            </div>

            {/* Contact info */}
            <div className="flex flex-col sm:flex-row gap-6">
              <a
                href="tel:+17029964415"
                className="flex items-center gap-3 text-gray-300 hover:text-brand-orange transition-colors"
              >
                <div className="w-12 h-12 bg-brand-orange/10 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-brand-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Call us</p>
                  <p className="font-semibold">(702) 996-4415</p>
                </div>
              </a>
              <a
                href="mailto:mark@leadmetrik.com"
                className="flex items-center gap-3 text-gray-300 hover:text-brand-orange transition-colors"
              >
                <div className="w-12 h-12 bg-brand-orange/10 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-brand-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email us</p>
                  <p className="font-semibold">mark@leadmetrik.com</p>
                </div>
              </a>
            </div>
          </motion.div>

          {/* Right side - Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-brand-dark rounded-2xl p-8 border border-gray-800">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">We Got Your Request!</h3>
                  <p className="text-gray-400">Check your email — we'll be in touch within 24 hours with your custom proposal.</p>
                </div>
              ) : (
                <>
                  <h3 className="text-2xl font-bold text-white mb-2">Get Your Free Audit</h3>
                  <p className="text-gray-400 mb-6">Fill out the form and we'll analyze your online presence.</p>
                  
                  {error && (
                    <div className="mb-4 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
                      {error}
                    </div>
                  )}
                  
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          className="w-full px-4 py-3 bg-brand-charcoal/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-brand-orange transition-colors"
                          placeholder="John Smith"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Phone *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          required
                          className="w-full px-4 py-3 bg-brand-charcoal/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-brand-orange transition-colors"
                          placeholder="(702) 555-0123"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Business Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        className="w-full px-4 py-3 bg-brand-charcoal/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-brand-orange transition-colors"
                        placeholder="john@yourbusiness.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Website URL
                      </label>
                      <input
                        type="url"
                        name="website"
                        className="w-full px-4 py-3 bg-brand-charcoal/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-brand-orange transition-colors"
                        placeholder="https://yourbusiness.com"
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Industry *
                        </label>
                        <select
                          name="industry"
                          required
                          className="w-full px-4 py-3 bg-brand-charcoal/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-brand-orange transition-colors"
                        >
                          <option value="">Select industry...</option>
                          <option value="medical">Medical / Healthcare</option>
                          <option value="venue">Event Venue / Hospitality</option>
                          <option value="home-services">Home Services</option>
                          <option value="small-business">Other Local Business</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Business Size *
                        </label>
                        <select
                          name="business_size"
                          required
                          className="w-full px-4 py-3 bg-brand-charcoal/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-brand-orange transition-colors"
                        >
                          <option value="">Select size...</option>
                          <option value="solo">Just me</option>
                          <option value="small">2-10 employees</option>
                          <option value="medium">11-50 employees</option>
                          <option value="large">50+ employees</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        What's your biggest marketing challenge?
                      </label>
                      <select
                        name="challenge"
                        className="w-full px-4 py-3 bg-brand-charcoal/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-brand-orange transition-colors"
                      >
                        <option value="">Select one...</option>
                        <option value="visibility">Not showing up on Google</option>
                        <option value="leads">Not enough leads/calls</option>
                        <option value="website">Need a better website</option>
                        <option value="social">No social media presence</option>
                        <option value="reviews">Need more reviews</option>
                        <option value="other">Something else</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-brand-orange hover:bg-brand-orange-dark disabled:opacity-50 disabled:cursor-not-allowed text-white py-4 rounded-full font-semibold text-lg transition-all btn-shine flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Sending...
                        </>
                      ) : (
                        <>
                          Get My Free Audit
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </>
                      )}
                    </button>
                  </form>
                  
                  <p className="text-center text-gray-500 text-sm mt-4">
                    No spam. No obligations. Just helpful insights.
                  </p>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
