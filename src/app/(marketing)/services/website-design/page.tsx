'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { 
  Frown, Smartphone, Clock, Search, TrendingDown, Lock,
  TrendingUp, Briefcase, Tablet, Zap, Shield, Wrench,
  CheckCircle, ArrowRight, ChevronDown
} from 'lucide-react';

// Pain point flip cards data
const painPoints = [
  {
    problem: "Your website looks like it's from 2015",
    icon: Frown,
    solution: "Modern, stunning design that makes competitors jealous",
    benefit: "First impressions that convert"
  },
  {
    problem: "Visitors leave because it's not mobile-friendly",
    icon: Smartphone,
    solution: "Built mobile-first — perfect on every screen size",
    benefit: "Capture 60%+ of traffic on mobile"
  },
  {
    problem: "Takes forever to load",
    icon: Clock,
    solution: "Lightning-fast performance under 2 seconds",
    benefit: "Lower bounce rates, higher rankings"
  },
  {
    problem: "Nobody can find you on Google",
    icon: Search,
    solution: "SEO built into every page from day one",
    benefit: "Get found by people searching for you"
  },
  {
    problem: "Visitors browse but never contact you",
    icon: TrendingDown,
    solution: "Conversion-optimized with clear calls to action",
    benefit: "Turn visitors into paying customers"
  },
  {
    problem: "You can't update it yourself",
    icon: Lock,
    solution: "Easy-to-use admin panel + training included",
    benefit: "Control your content, no developer needed"
  }
];

// Process steps
const processSteps = [
  {
    step: 1,
    title: "Discovery Call",
    description: "We learn everything about your business, goals, and target customers. This 30-minute call shapes everything.",
    duration: "30 min"
  },
  {
    step: 2,
    title: "Strategy & Sitemap",
    description: "We map out every page, the user journey, and conversion points. You approve before we touch a pixel.",
    duration: "2-3 days"
  },
  {
    step: 3,
    title: "Design Mockups",
    description: "See your site before it's built. We create full mockups with unlimited revisions until you love it.",
    duration: "5-7 days"
  },
  {
    step: 4,
    title: "Development",
    description: "We code it with clean, fast, SEO-friendly tech. Mobile-first, blazing fast, secure.",
    duration: "7-14 days"
  },
  {
    step: 5,
    title: "Launch Day",
    description: "Final review, testing on all devices, and we go live. Plus training so you can manage it yourself.",
    duration: "1 day"
  },
  {
    step: 6,
    title: "Ongoing Support",
    description: "We don't disappear. Hosting, updates, backups, and priority support included.",
    duration: "Forever"
  }
];

// Benefits
const benefits = [
  {
    icon: TrendingUp,
    title: "More Leads While You Sleep",
    description: "Your website works 24/7, capturing leads and inquiries even at 3 AM."
  },
  {
    icon: Briefcase,
    title: "Look As Professional As You Are",
    description: "Stop losing customers to competitors with better-looking sites."
  },
  {
    icon: Tablet,
    title: "Perfect On Every Device",
    description: "Desktop, tablet, phone — your site looks incredible everywhere."
  },
  {
    icon: Zap,
    title: "Loads In Under 2 Seconds",
    description: "Fast sites rank higher and convert better. We obsess over speed."
  },
  {
    icon: Shield,
    title: "Secure & Protected",
    description: "SSL, backups, malware protection — your site is locked down."
  },
  {
    icon: Wrench,
    title: "We Handle Everything",
    description: "Domain, hosting, emails, maintenance — it's all included."
  }
];

// FAQ data for schema
const faqs = [
  {
    question: "How much does website design cost in Las Vegas?",
    answer: "Our Las Vegas website design packages start at $1,500 for a professional 5-page site. Most small businesses invest between $2,500-$5,000 for a complete website with SEO, contact forms, and mobile optimization. We offer flexible payment plans to make it affordable."
  },
  {
    question: "How long does it take to build a website?",
    answer: "A typical small business website takes 2-4 weeks from start to launch. More complex sites with e-commerce or custom features may take 4-8 weeks. We'll give you an exact timeline during our discovery call."
  },
  {
    question: "Do you redesign existing websites?",
    answer: "Absolutely! Many of our Las Vegas clients come to us with outdated websites that need a complete refresh. We can keep your existing content and domain while giving you a modern, fast, mobile-friendly design."
  },
  {
    question: "What's included in website maintenance?",
    answer: "Our maintenance plans include hosting, SSL certificate, daily backups, security monitoring, WordPress/plugin updates, and priority support. You also get 1-2 hours of content updates per month depending on your plan."
  },
  {
    question: "Will my website work on mobile phones?",
    answer: "Every website we build is mobile-first. We design for phones first, then scale up to tablets and desktops. This ensures over 60% of your visitors (who use mobile) get a perfect experience."
  },
  {
    question: "Do you help with SEO and Google rankings?",
    answer: "Yes! Basic on-page SEO is included with every website — proper headings, meta tags, fast loading, mobile-friendly design. For ongoing SEO and Google rankings, we offer dedicated Local SEO packages."
  },
  {
    question: "Can I update the website myself?",
    answer: "Yes! We build sites with easy-to-use admin panels. You can update text, images, and add new content without any coding. We also include training so you feel confident managing your site."
  },
  {
    question: "What if I need changes after launch?",
    answer: "All our packages include a revision period after launch. For ongoing changes, our maintenance plans include monthly content updates. Need something big? We're just an email away."
  }
];

// Pricing tiers
const pricingTiers = [
  {
    name: "Starter",
    price: "$1,500",
    description: "Perfect for new businesses",
    features: [
      "Up to 5 pages",
      "Mobile-responsive design",
      "Contact form",
      "Basic SEO setup",
      "Google Analytics",
      "2 rounds of revisions",
      "1 month support"
    ],
    cta: "Get Started",
    popular: false
  },
  {
    name: "Growth",
    price: "$3,500",
    description: "Most popular for established businesses",
    features: [
      "Up to 10 pages",
      "Custom design",
      "Lead capture forms",
      "Blog setup",
      "Advanced SEO",
      "Speed optimization",
      "Social media integration",
      "Unlimited revisions",
      "3 months support"
    ],
    cta: "Most Popular",
    popular: true
  },
  {
    name: "E-Commerce",
    price: "$5,000+",
    description: "Full online store setup",
    features: [
      "Unlimited pages",
      "Product catalog",
      "Shopping cart",
      "Payment processing",
      "Inventory management",
      "Order notifications",
      "Customer accounts",
      "Advanced SEO",
      "6 months support"
    ],
    cta: "Let's Talk",
    popular: false
  }
];

// Flip Card Component
function FlipCard({ point, index }: { point: typeof painPoints[0]; index: number }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const IconComponent = point.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="h-64 perspective-1000"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="relative w-full h-full cursor-pointer"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring" }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 flex flex-col items-center justify-center text-center border border-gray-700"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="w-16 h-16 bg-orange-500/10 rounded-2xl flex items-center justify-center mb-4">
            <IconComponent className="w-8 h-8 text-orange-400" />
          </div>
          <p className="text-gray-300 text-lg">{point.problem}</p>
          <span className="mt-4 text-orange-400 text-sm flex items-center gap-1">
            Tap to see solution <ArrowRight className="w-4 h-4" />
          </span>
        </div>
        
        {/* Back */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 flex flex-col items-center justify-center text-center"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <p className="text-white font-semibold text-lg mb-3">{point.solution}</p>
          <p className="text-orange-100 text-sm flex items-center gap-1">
            <CheckCircle className="w-4 h-4" /> {point.benefit}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Before/After Slider Component
function BeforeAfterSlider() {
  const [sliderPosition, setSliderPosition] = useState(50);

  return (
    <div className="relative w-full max-w-4xl mx-auto aspect-video rounded-2xl overflow-hidden">
      {/* Before (ugly site mockup) */}
      <div className="absolute inset-0 bg-gray-300">
        <div className="w-full h-full bg-gradient-to-b from-gray-200 to-gray-400 flex flex-col">
          <div className="bg-blue-900 p-3 flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="flex-1 p-4">
            <div className="text-center">
              <div className="text-purple-800 text-2xl font-serif mb-2">WELCOME TO OUR WEBSITE</div>
              <div className="text-red-600 text-sm animate-pulse">*** UNDER CONSTRUCTION ***</div>
              <img 
                src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 200'%3E%3Crect fill='%23999' width='400' height='200'/%3E%3Ctext x='200' y='100' font-family='Comic Sans MS' font-size='24' text-anchor='middle' fill='%23333'%3E[Low Quality Image]%3C/text%3E%3C/svg%3E"
                alt="Before"
                className="mx-auto my-4 w-48 border-4 border-dashed border-gray-500"
              />
              <div className="text-green-800 font-bold">CALL US: 555-1234</div>
              <div className="text-blue-600 text-sm mt-2 overflow-hidden">
                <div className="animate-marquee whitespace-nowrap">
                  Best prices! Click here! Best prices! Best prices! Click here!
                </div>
              </div>
            </div>
          </div>
          <div className="bg-black text-green-500 text-xs p-2 text-center font-mono">
            Last updated: 2015 | Visitor counter: 000234
          </div>
        </div>
        <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold">
          BEFORE
        </div>
      </div>
      
      {/* After (modern site) */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <div className="w-full h-full flex flex-col">
          <div className="bg-gray-900/90 backdrop-blur p-4 flex justify-between items-center border-b border-gray-700">
            <div className="text-orange-500 font-bold text-xl">YourBrand</div>
            <div className="flex gap-6 text-gray-300 text-sm">
              <span>Services</span>
              <span>About</span>
              <span>Contact</span>
            </div>
          </div>
          <div className="flex-1 p-8 flex items-center">
            <div className="max-w-md">
              <h2 className="text-3xl font-bold text-white mb-4">Grow Your Business With Confidence</h2>
              <p className="text-gray-400 mb-6">Professional solutions that drive real results.</p>
              <button className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold">
                Get Started
              </button>
            </div>
          </div>
          <div className="flex justify-center gap-8 pb-4 text-sm text-gray-400">
            <span className="flex items-center gap-1"><CheckCircle className="w-4 h-4 text-orange-400" /> 5.0 Rating</span>
            <span className="flex items-center gap-1"><CheckCircle className="w-4 h-4 text-orange-400" /> 24/7 Support</span>
            <span className="flex items-center gap-1"><CheckCircle className="w-4 h-4 text-orange-400" /> Trusted by 500+</span>
          </div>
        </div>
        <div className="absolute top-4 left-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-bold">
          AFTER
        </div>
      </div>
      
      {/* Slider handle */}
      <div 
        className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center">
          <span className="text-gray-800">↔</span>
        </div>
      </div>
      
      {/* Slider input */}
      <input
        type="range"
        min="0"
        max="100"
        value={sliderPosition}
        onChange={(e) => setSliderPosition(Number(e.target.value))}
        className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize"
      />
    </div>
  );
}

// Process Timeline Component
function ProcessTimeline() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="max-w-5xl mx-auto">
      {/* Desktop: Horizontal timeline */}
      <div className="hidden md:block">
        <div className="flex justify-between mb-8">
          {processSteps.map((step, index) => (
            <button
              key={index}
              onClick={() => setActiveStep(index)}
              className={`flex flex-col items-center group transition-all ${
                activeStep === index ? 'scale-110' : ''
              }`}
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold transition-all ${
                activeStep === index 
                  ? 'bg-orange-500 text-white' 
                  : index < activeStep 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gray-700 text-gray-400'
              }`}>
                {index < activeStep ? <CheckCircle className="w-6 h-6" /> : step.step}
              </div>
              <span className={`mt-2 text-sm transition-all ${
                activeStep === index ? 'text-orange-400' : 'text-gray-500'
              }`}>
                {step.title}
              </span>
            </button>
          ))}
        </div>
        
        {/* Progress bar */}
        <div className="h-1 bg-gray-700 rounded-full mb-8 relative">
          <motion.div 
            className="h-full bg-orange-500 rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: `${(activeStep / (processSteps.length - 1)) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>
      
      {/* Step details */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700"
        >
          <div className="flex items-start gap-6">
            <div className="w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center text-2xl font-bold text-white shrink-0">
              {processSteps[activeStep].step}
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">
                {processSteps[activeStep].title}
              </h3>
              <p className="text-gray-400 text-lg mb-4">
                {processSteps[activeStep].description}
              </p>
              <span className="inline-flex items-center gap-2 text-orange-400 text-sm">
                <Clock className="w-4 h-4" />
                {processSteps[activeStep].duration}
              </span>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
      
      {/* Mobile: Navigation buttons */}
      <div className="flex justify-between mt-6 md:hidden">
        <button
          onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
          disabled={activeStep === 0}
          className="px-4 py-2 bg-gray-700 rounded-lg disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-gray-500">
          {activeStep + 1} / {processSteps.length}
        </span>
        <button
          onClick={() => setActiveStep(Math.min(processSteps.length - 1, activeStep + 1))}
          disabled={activeStep === processSteps.length - 1}
          className="px-4 py-2 bg-orange-500 rounded-lg disabled:opacity-50"
        >
          Next
        </button>
      </div>
      
      {/* Desktop: Step buttons */}
      <div className="hidden md:flex justify-center gap-4 mt-6">
        <button
          onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
          disabled={activeStep === 0}
          className="px-6 py-2 bg-gray-700 rounded-lg disabled:opacity-50 hover:bg-gray-600 transition-colors"
        >
          Previous Step
        </button>
        <button
          onClick={() => setActiveStep(Math.min(processSteps.length - 1, activeStep + 1))}
          disabled={activeStep === processSteps.length - 1}
          className="px-6 py-2 bg-orange-500 rounded-lg disabled:opacity-50 hover:bg-orange-400 transition-colors"
        >
          Next Step
        </button>
      </div>
    </div>
  );
}

// ROI Calculator Component  
function ROICalculator() {
  const [visitors, setVisitors] = useState(1000);
  const [conversionRate, setConversionRate] = useState(1);
  const [avgValue, setAvgValue] = useState(500);
  
  const currentLeads = Math.floor(visitors * (conversionRate / 100));
  const currentRevenue = currentLeads * avgValue;
  
  // Assume new site doubles conversion rate
  const newConversionRate = conversionRate * 2.5;
  const newLeads = Math.floor(visitors * (newConversionRate / 100));
  const newRevenue = newLeads * avgValue;
  
  const monthlyGain = newRevenue - currentRevenue;
  const yearlyGain = monthlyGain * 12;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Inputs */}
        <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
          <h3 className="text-xl font-bold text-white mb-6">Your Current Numbers</h3>
          
          <div className="space-y-6">
            <div>
              <label className="block text-gray-400 mb-2">
                Monthly Website Visitors
              </label>
              <input
                type="range"
                min="100"
                max="10000"
                step="100"
                value={visitors}
                onChange={(e) => setVisitors(Number(e.target.value))}
                className="w-full accent-orange-500"
              />
              <div className="text-2xl font-bold text-white mt-1">
                {visitors.toLocaleString()} visitors
              </div>
            </div>
            
            <div>
              <label className="block text-gray-400 mb-2">
                Current Conversion Rate
              </label>
              <input
                type="range"
                min="0.5"
                max="5"
                step="0.5"
                value={conversionRate}
                onChange={(e) => setConversionRate(Number(e.target.value))}
                className="w-full accent-orange-500"
              />
              <div className="text-2xl font-bold text-white mt-1">
                {conversionRate}%
              </div>
            </div>
            
            <div>
              <label className="block text-gray-400 mb-2">
                Average Customer Value
              </label>
              <input
                type="range"
                min="100"
                max="5000"
                step="100"
                value={avgValue}
                onChange={(e) => setAvgValue(Number(e.target.value))}
                className="w-full accent-orange-500"
              />
              <div className="text-2xl font-bold text-white mt-1">
                ${avgValue.toLocaleString()}
              </div>
            </div>
          </div>
        </div>
        
        {/* Results */}
        <div className="space-y-4">
          {/* Current state */}
          <div className="bg-red-900/30 rounded-2xl p-6 border border-red-800/50">
            <div className="text-red-400 text-sm font-semibold mb-2">YOUR CURRENT WEBSITE</div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Monthly leads:</span>
              <span className="text-2xl font-bold text-white">{currentLeads}</span>
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className="text-gray-400">Monthly revenue:</span>
              <span className="text-2xl font-bold text-white">${currentRevenue.toLocaleString()}</span>
            </div>
          </div>
          
          {/* New state */}
          <div className="bg-green-900/30 rounded-2xl p-6 border border-green-800/50">
            <div className="text-green-400 text-sm font-semibold mb-2">WITH A LEADMETRIK WEBSITE</div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Monthly leads:</span>
              <span className="text-2xl font-bold text-white">{newLeads}</span>
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className="text-gray-400">Monthly revenue:</span>
              <span className="text-2xl font-bold text-white">${newRevenue.toLocaleString()}</span>
            </div>
          </div>
          
          {/* The difference */}
          <motion.div 
            className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-6"
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ repeat: Infinity, repeatType: "reverse", duration: 2 }}
          >
            <div className="text-orange-100 text-sm font-semibold mb-2">YOU'RE LEAVING ON THE TABLE</div>
            <div className="text-4xl font-bold text-white">
              ${monthlyGain.toLocaleString()}/mo
            </div>
            <div className="text-orange-100 mt-1">
              That's <strong>${yearlyGain.toLocaleString()}</strong> per year
            </div>
          </motion.div>
        </div>
      </div>
      
      <p className="text-center text-gray-500 text-sm mt-6">
        * Based on industry average of 2.5x conversion improvement with modern, optimized websites
      </p>
    </div>
  );
}

// FAQ Accordion Component
function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      {faqs.map((faq, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
        >
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full text-left bg-gray-800/50 rounded-xl p-5 border border-gray-700 hover:border-orange-500/50 transition-all"
          >
            <div className="flex justify-between items-center gap-4">
              <h3 className="font-semibold text-white text-lg">{faq.question}</h3>
              <motion.span
                animate={{ rotate: openIndex === index ? 180 : 0 }}
                className="text-orange-400 shrink-0"
              >
                <ChevronDown className="w-5 h-5" />
              </motion.span>
            </div>
            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <p className="text-gray-400 mt-4 leading-relaxed">
                    {faq.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </motion.div>
      ))}
    </div>
  );
}

// Main Page Component
export default function WebsiteDesignPage() {
  return (
    <>
      {/* Schema.org structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Website Design Las Vegas",
            "description": "Professional website design services in Las Vegas. Mobile-first, SEO-optimized websites that convert visitors into customers.",
            "provider": {
              "@type": "LocalBusiness",
              "name": "LeadMetrik",
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
            "serviceType": "Website Design"
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
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
            }))
          })
        }}
      />

      {/* Hero Section - Dark */}
      <section className="relative min-h-[90vh] flex items-center bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800 overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(249,115,22,0.1),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(249,115,22,0.05),transparent_50%)]" />
        </div>
        
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 rounded-full px-4 py-2 text-orange-400 text-sm mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                </span>
                Las Vegas Website Design Agency
              </span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
            >
              Websites That Actually{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
                Bring You Customers
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto"
            >
              Stop losing customers to competitors with better-looking websites. 
              We build fast, mobile-first sites that rank on Google and convert visitors into paying customers.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            >
              <Link
                href="/#contact"
                className="inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-400 text-white font-semibold px-8 py-4 rounded-xl transition-all transform hover:scale-105 shadow-lg shadow-orange-500/25"
              >
                Get Your Free Website Audit
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="#pricing"
                className="inline-flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 text-white font-semibold px-8 py-4 rounded-xl border border-gray-700 transition-all"
              >
                See Pricing
              </Link>
            </motion.div>
            
            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap justify-center gap-6 text-gray-500 text-sm"
            >
              <span className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                Las Vegas Based
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                Mobile-First Design
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                SEO Included
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                2-Week Delivery
              </span>
            </motion.div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center">
            <div className="w-1.5 h-3 bg-orange-500 rounded-full mt-2" />
          </div>
        </motion.div>
      </section>

      {/* Pain Points Section - Charcoal */}
      <section className="py-20 bg-[#1A202C]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Sound Familiar?
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              These website problems are costing you customers every single day. 
              <span className="text-orange-400"> Tap each card</span> to see how we fix it.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {painPoints.map((point, index) => (
              <FlipCard key={index} point={point} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Before/After Section - Dark */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              See The Transformation
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Drag the slider to see what a modern, professional website looks like 
              compared to an outdated design.
            </p>
          </motion.div>
          
          <BeforeAfterSlider />
        </div>
      </section>

      {/* What You Get Section - Charcoal */}
      <section className="py-20 bg-[#1A202C]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              What You Actually Get
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Not just a pretty website — a business asset that generates revenue.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700 hover:border-orange-500/50 transition-all group"
                >
                  <div className="w-14 h-14 bg-orange-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <IconComponent className="w-7 h-7 text-orange-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-400">
                    {benefit.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section - Dark */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              How We Build Your Website
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              A proven 6-step process that delivers results. No surprises, no delays.
            </p>
          </motion.div>
          
          <ProcessTimeline />
        </div>
      </section>

      {/* ROI Calculator Section - Charcoal */}
      <section className="py-20 bg-[#1A202C]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              What's A Bad Website Costing You?
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Use our calculator to see how much revenue you're missing out on 
              with an underperforming website.
            </p>
          </motion.div>
          
          <ROICalculator />
        </div>
      </section>

      {/* Pricing Section - Dark */}
      <section id="pricing" className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              No hidden fees. No surprises. Choose the package that fits your business.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingTiers.map((tier, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative rounded-2xl p-8 ${
                  tier.popular 
                    ? 'bg-gradient-to-b from-orange-500/20 to-gray-800 border-2 border-orange-500' 
                    : 'bg-gray-800/50 border border-gray-700'
                }`}
              >
                {tier.popular && (
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-orange-500 text-white text-sm font-semibold px-4 py-1 rounded-full">
                    Most Popular
                  </span>
                )}
                <h3 className="text-2xl font-bold text-white mb-2">{tier.name}</h3>
                <p className="text-gray-400 mb-4">{tier.description}</p>
                <div className="text-4xl font-bold text-white mb-6">
                  {tier.price}
                </div>
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-300">
                      <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/#contact"
                  className={`block text-center py-3 rounded-xl font-semibold transition-all ${
                    tier.popular 
                      ? 'bg-orange-500 hover:bg-orange-400 text-white' 
                      : 'bg-gray-700 hover:bg-gray-600 text-white'
                  }`}
                >
                  {tier.cta}
                </Link>
              </motion.div>
            ))}
          </div>
          
          <p className="text-center text-gray-500 text-sm mt-8">
            All prices are one-time. Hosting & maintenance available from $49/month.
          </p>
        </div>
      </section>

      {/* FAQ Section - Charcoal */}
      <section className="py-20 bg-[#1A202C]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Everything you need to know about working with us.
            </p>
          </motion.div>
          
          <FAQAccordion />
        </div>
      </section>

      {/* Pro Tip Section - Dark */}
      <section className="py-12 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-gradient-to-r from-orange-500/10 to-orange-600/5 rounded-2xl p-8 border border-orange-500/20">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center shrink-0">
                <Tablet className="w-6 h-6 text-orange-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Pro Tip: Consider the Dress!</h3>
                <p className="text-gray-400">
                  Don't forget to factor in the width of your wedding dress when determining your wedding aisle width! 
                  A ballgown or a dress with a long train will require more space than a simple sheath dress.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section - Dark Gradient */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-gray-800 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(249,115,22,0.1),transparent_70%)]" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Ready for a Website That Works as Hard as You Do?
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Stop losing customers to outdated websites. Get a free audit and see exactly 
              what's holding your business back online.
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-400 text-white font-bold text-lg px-10 py-5 rounded-xl transition-all transform hover:scale-105 shadow-lg shadow-orange-500/25"
            >
              Get Your Free Website Audit
              <ArrowRight className="w-6 h-6" />
            </Link>
            <p className="text-gray-500 text-sm mt-4">
              No obligation. No pressure. Just honest feedback.
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}
