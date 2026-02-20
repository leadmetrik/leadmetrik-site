'use client'

import { useState } from 'react'
import Image from 'next/image'
import { exportToLuckyDigitalsFormat, IntakeData } from '@/lib/exportLuckyDigitals'

interface FormData {
  // Client Info (Lucky Digitals header)
  clientName: string
  emailAddress: string
  orderNumber: string
  
  // Essentials - SEO
  url: string
  keyword1: string
  keyword2: string
  keyword3: string
  keyword4: string
  keyword5: string
  additionalDetails: string
  
  // Citation Details - NAPW
  businessName: string
  contactPerson: string
  streetAddress: string
  suite: string
  city: string
  state: string
  zipCode: string
  primaryPhone: string
  tollFree: string
  fax: string
  category1: string
  category2: string
  category3: string
  websiteAddress: string
  primaryEmail: string
  secondaryEmail: string
  brands: string
  productsServices: string
  yearEstablished: string
  hoursOfOperation: string
  languagesSpoken: string
  paymentMethods: string
  tagline: string
  serviceAreas: string
  licenseNumber: string
  shortDescription: string
  longDescription: string
  
  // Google Stacking (Optional)
  gmailAccount: string
  gmailPassword: string
  recoveryEmail: string
  recoveryPhone: string
}

export default function IntakeForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  
  const [formData, setFormData] = useState<FormData>({
    clientName: '',
    emailAddress: '',
    orderNumber: '',
    url: '',
    keyword1: '',
    keyword2: '',
    keyword3: '',
    keyword4: '',
    keyword5: '',
    additionalDetails: '',
    businessName: '',
    contactPerson: '',
    streetAddress: '',
    suite: '',
    city: '',
    state: '',
    zipCode: '',
    primaryPhone: '',
    tollFree: '',
    fax: '',
    category1: '',
    category2: '',
    category3: '',
    websiteAddress: '',
    primaryEmail: '',
    secondaryEmail: '',
    brands: '',
    productsServices: '',
    yearEstablished: '',
    hoursOfOperation: '',
    languagesSpoken: '',
    paymentMethods: '',
    tagline: '',
    serviceAreas: '',
    licenseNumber: '',
    shortDescription: '',
    longDescription: '',
    gmailAccount: '',
    gmailPassword: '',
    recoveryEmail: '',
    recoveryPhone: '',
  })

  const [files, setFiles] = useState<{
    logo: File | null
    ownerPhoto: File | null
    businessImages: File[]
    videos: File[]
  }>({
    logo: null,
    ownerPhoto: null,
    businessImages: [],
    videos: [],
  })

  const updateField = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    
    // Store form data for download/export
    localStorage.setItem('intake_form_data', JSON.stringify({
      ...formData,
      submittedAt: new Date().toISOString()
    }))
    
    console.log('Form Data:', formData)
    console.log('Files:', files)
    
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  const totalSteps = 4

  const inputClass = "app-input"
  const labelClass = "block text-sm font-medium text-gray-700 mb-2"

  const handleExportExcel = () => {
    // Map form data to Lucky Digitals format
    const exportData: IntakeData = {
      clientName: formData.clientName,
      email: formData.emailAddress,
      orderNumber: formData.orderNumber,
      url: formData.url,
      keywords: [formData.keyword1, formData.keyword2, formData.keyword3, formData.keyword4, formData.keyword5].filter(k => k),
      additionalDetails: formData.additionalDetails,
      businessName: formData.businessName,
      contactPerson: formData.contactPerson,
      streetAddress: formData.streetAddress,
      suite: formData.suite,
      city: formData.city,
      state: formData.state,
      zipCode: formData.zipCode,
      phone: formData.primaryPhone,
      tollFree: formData.tollFree,
      fax: formData.fax,
      category1: formData.category1,
      category2: formData.category2,
      category3: formData.category3,
      website: formData.websiteAddress || formData.url,
      primaryEmail: formData.primaryEmail || formData.emailAddress,
      secondaryEmail: formData.secondaryEmail,
      brands: formData.brands,
      productsServices: formData.productsServices,
      yearEstablished: formData.yearEstablished,
      hoursOfOperation: formData.hoursOfOperation,
      languagesSpoken: formData.languagesSpoken,
      paymentMethods: formData.paymentMethods,
      tagline: formData.tagline,
      serviceAreas: formData.serviceAreas,
      licenseNumber: formData.licenseNumber,
      shortDescription: formData.shortDescription,
      longDescription: formData.longDescription,
      gmailAccount: formData.gmailAccount,
      gmailPassword: formData.gmailPassword,
      recoveryEmail: formData.recoveryEmail,
      recoveryPhone: formData.recoveryPhone,
    }
    
    exportToLuckyDigitalsFormat(exportData)
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="app-header">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
            <Image src="/logo.jpg" alt="Lead Metrik" width={180} height={60} className="h-10 sm:h-12 w-auto" />
          </div>
        </header>
        <main className="max-w-2xl mx-auto px-4 sm:px-6 py-10 sm:py-16 text-center safe-bottom">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-green-100 rounded-full mb-4 sm:mb-6 animate-slide-up">
            <svg className="w-8 h-8 sm:w-10 sm:h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-mobile-lg font-bold text-brand-charcoal mb-2 sm:mb-3 text-balance">Intake Form Submitted!</h1>
          <p className="text-gray-600 text-mobile-sm mb-6 sm:mb-8">
            Thank you for providing your information. We'll review everything and reach out within 24-48 hours to schedule your onboarding call.
          </p>
          
          {/* Excel Export Button */}
          <div className="app-card mb-6 sm:mb-8 inline-block w-full sm:w-auto">
            <p className="text-sm text-gray-600 mb-4">📊 Download client data for SEO fulfillment:</p>
            <button
              onClick={handleExportExcel}
              className="app-button-primary flex items-center gap-2 mx-auto"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Export Lucky Digitals Excel
            </button>
            <p className="text-xs text-gray-500 mt-2">Downloads .xlsx file matching Lucky Digitals Standard Package format</p>
          </div>
          
          <p className="text-gray-500 text-xs sm:text-sm">
            Questions? Email <a href="mailto:support@leadmetrik.com" className="text-brand-orange hover:underline active:opacity-70">support@leadmetrik.com</a>
          </p>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="app-header">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          <Image src="/logo.jpg" alt="Lead Metrik" width={180} height={60} className="h-10 sm:h-12 w-auto" />
          <span className="text-xs sm:text-sm text-gray-500 font-medium">Step {currentStep} of {totalSteps}</span>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12 safe-bottom">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-mobile-lg font-bold text-brand-charcoal mb-2 text-balance">Client Intake Form</h1>
          <p className="text-gray-600 text-sm sm:text-base">Please provide the following information to get started with your Local SEO campaign</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-6 sm:mb-8">
          <div className="flex justify-between mb-2">
            {[1, 2, 3, 4].map(step => (
              <div key={step} className="flex flex-col items-center">
                <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold transition-all duration-300
                  ${currentStep >= step ? 'bg-brand-orange text-white shadow-md shadow-orange-200' : 'bg-gray-200 text-gray-500'}`}>
                  {currentStep > step ? (
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : step}
                </div>
                <span className="text-[10px] sm:text-xs mt-1 text-gray-500 hidden sm:block">
                  {step === 1 && 'Client Info'}
                  {step === 2 && 'SEO Details'}
                  {step === 3 && 'Business Info'}
                  {step === 4 && 'Media & Logins'}
                </span>
              </div>
            ))}
          </div>
          <div className="h-1.5 sm:h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-brand-orange rounded-full transition-all duration-500 ease-out"
              style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
            />
          </div>
        </div>

        <div className="app-card">
          
          {/* Step 1: Client Info & SEO Essentials */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-4 mb-6">
                <h2 className="text-xl font-bold text-brand-charcoal">Client Information</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Client Name *</label>
                  <input type="text" className={inputClass} value={formData.clientName}
                    onChange={e => updateField('clientName', e.target.value)} placeholder="Dr. Ogonna" />
                </div>
                <div>
                  <label className={labelClass}>Email Address *</label>
                  <input type="email" className={inputClass} value={formData.emailAddress}
                    onChange={e => updateField('emailAddress', e.target.value)} placeholder="email@example.com" />
                </div>
              </div>
              
              <div>
                <label className={labelClass}>Order Number (internal use)</label>
                <input type="text" className={inputClass} value={formData.orderNumber}
                  onChange={e => updateField('orderNumber', e.target.value)} placeholder="LM-2026-001" />
              </div>
            </div>
          )}

          {/* Step 2: SEO Essentials */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-4 mb-6">
                <h2 className="text-xl font-bold text-brand-charcoal">SEO Essentials</h2>
                <p className="text-sm text-gray-500 mt-1">Your website and target keywords for Local SEO</p>
              </div>

              <div>
                <label className={labelClass}>Website URL *</label>
                <input type="url" className={inputClass} value={formData.url}
                  onChange={e => updateField('url', e.target.value)} placeholder="https://www.yoursite.com" />
              </div>

              <div className="bg-orange-50 rounded-lg p-4 mb-4">
                <p className="text-sm text-orange-800 font-medium mb-2">Target Keywords (5 keywords)</p>
                <p className="text-xs text-orange-600">Enter the search terms you want to rank for in Google Maps</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Keyword 1 *</label>
                  <input type="text" className={inputClass} value={formData.keyword1}
                    onChange={e => updateField('keyword1', e.target.value)} placeholder="weight loss clinic las vegas" />
                </div>
                <div>
                  <label className={labelClass}>Keyword 2 *</label>
                  <input type="text" className={inputClass} value={formData.keyword2}
                    onChange={e => updateField('keyword2', e.target.value)} placeholder="medical weight loss near me" />
                </div>
                <div>
                  <label className={labelClass}>Keyword 3 *</label>
                  <input type="text" className={inputClass} value={formData.keyword3}
                    onChange={e => updateField('keyword3', e.target.value)} placeholder="semaglutide clinic" />
                </div>
                <div>
                  <label className={labelClass}>Keyword 4</label>
                  <input type="text" className={inputClass} value={formData.keyword4}
                    onChange={e => updateField('keyword4', e.target.value)} placeholder="tirzepatide weight loss" />
                </div>
                <div>
                  <label className={labelClass}>Keyword 5</label>
                  <input type="text" className={inputClass} value={formData.keyword5}
                    onChange={e => updateField('keyword5', e.target.value)} placeholder="weight loss doctor" />
                </div>
              </div>

              <div>
                <label className={labelClass}>Additional Details (if any)</label>
                <textarea className={inputClass} rows={3} value={formData.additionalDetails}
                  onChange={e => updateField('additionalDetails', e.target.value)} 
                  placeholder="Any specific notes about your business or SEO goals..." />
              </div>
            </div>
          )}

          {/* Step 3: Citation Details - NAPW */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-4 mb-6">
                <h2 className="text-xl font-bold text-brand-charcoal">Citation Details (NAP+W)</h2>
                <p className="text-sm text-gray-500 mt-1">Name, Address, Phone & Website - used for local directory listings</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Business Name *</label>
                  <input type="text" className={inputClass} value={formData.businessName}
                    onChange={e => updateField('businessName', e.target.value)} placeholder="MediSlim" />
                </div>
                <div>
                  <label className={labelClass}>Company Owner/Contact Person *</label>
                  <input type="text" className={inputClass} value={formData.contactPerson}
                    onChange={e => updateField('contactPerson', e.target.value)} placeholder="Dr. Ogonna" />
                </div>
              </div>

              <div>
                <label className={labelClass}>Street Address *</label>
                <input type="text" className={inputClass} value={formData.streetAddress}
                  onChange={e => updateField('streetAddress', e.target.value)} placeholder="123 Main Street" />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className={labelClass}>Suite/Office</label>
                  <input type="text" className={inputClass} value={formData.suite}
                    onChange={e => updateField('suite', e.target.value)} placeholder="Suite 100" />
                </div>
                <div>
                  <label className={labelClass}>City *</label>
                  <input type="text" className={inputClass} value={formData.city}
                    onChange={e => updateField('city', e.target.value)} placeholder="Las Vegas" />
                </div>
                <div>
                  <label className={labelClass}>State *</label>
                  <input type="text" className={inputClass} value={formData.state}
                    onChange={e => updateField('state', e.target.value)} placeholder="NV" />
                </div>
                <div>
                  <label className={labelClass}>Zip/Postal Code *</label>
                  <input type="text" className={inputClass} value={formData.zipCode}
                    onChange={e => updateField('zipCode', e.target.value)} placeholder="89123" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className={labelClass}>Primary Phone *</label>
                  <input type="tel" className={inputClass} value={formData.primaryPhone}
                    onChange={e => updateField('primaryPhone', e.target.value)} placeholder="(702) 555-1234" />
                </div>
                <div>
                  <label className={labelClass}>Toll Free # (if any)</label>
                  <input type="tel" className={inputClass} value={formData.tollFree}
                    onChange={e => updateField('tollFree', e.target.value)} placeholder="(800) 555-1234" />
                </div>
                <div>
                  <label className={labelClass}>Fax # (if any)</label>
                  <input type="tel" className={inputClass} value={formData.fax}
                    onChange={e => updateField('fax', e.target.value)} placeholder="(702) 555-1235" />
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="font-semibold text-brand-charcoal mb-4">Business Categories</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className={labelClass}>Category #1 *</label>
                    <input type="text" className={inputClass} value={formData.category1}
                      onChange={e => updateField('category1', e.target.value)} placeholder="Weight Loss Service" />
                  </div>
                  <div>
                    <label className={labelClass}>Category #2</label>
                    <input type="text" className={inputClass} value={formData.category2}
                      onChange={e => updateField('category2', e.target.value)} placeholder="Medical Clinic" />
                  </div>
                  <div>
                    <label className={labelClass}>Category #3</label>
                    <input type="text" className={inputClass} value={formData.category3}
                      onChange={e => updateField('category3', e.target.value)} placeholder="Doctor" />
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="font-semibold text-brand-charcoal mb-4">Contact & Online Presence</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Website Address</label>
                    <input type="url" className={inputClass} value={formData.websiteAddress}
                      onChange={e => updateField('websiteAddress', e.target.value)} placeholder="https://www.medislim.com" />
                  </div>
                  <div>
                    <label className={labelClass}>Primary Email Address</label>
                    <input type="email" className={inputClass} value={formData.primaryEmail}
                      onChange={e => updateField('primaryEmail', e.target.value)} placeholder="info@medislim.com" />
                  </div>
                  <div>
                    <label className={labelClass}>Secondary Email (if any)</label>
                    <input type="email" className={inputClass} value={formData.secondaryEmail}
                      onChange={e => updateField('secondaryEmail', e.target.value)} placeholder="support@medislim.com" />
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="font-semibold text-brand-charcoal mb-4">Business Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Brands you sell or use (if any)</label>
                    <input type="text" className={inputClass} value={formData.brands}
                      onChange={e => updateField('brands', e.target.value)} placeholder="Ozempic, Wegovy, Mounjaro" />
                  </div>
                  <div>
                    <label className={labelClass}>Products/Services</label>
                    <input type="text" className={inputClass} value={formData.productsServices}
                      onChange={e => updateField('productsServices', e.target.value)} placeholder="Semaglutide, Tirzepatide, Weight Loss Programs" />
                  </div>
                  <div>
                    <label className={labelClass}>Year Established</label>
                    <input type="text" className={inputClass} value={formData.yearEstablished}
                      onChange={e => updateField('yearEstablished', e.target.value)} placeholder="2020" />
                  </div>
                  <div>
                    <label className={labelClass}>Hours of Operation</label>
                    <input type="text" className={inputClass} value={formData.hoursOfOperation}
                      onChange={e => updateField('hoursOfOperation', e.target.value)} placeholder="Mon-Fri 9am-5pm, Sat 10am-2pm" />
                  </div>
                  <div>
                    <label className={labelClass}>Languages Spoken</label>
                    <input type="text" className={inputClass} value={formData.languagesSpoken}
                      onChange={e => updateField('languagesSpoken', e.target.value)} placeholder="English, Spanish" />
                  </div>
                  <div>
                    <label className={labelClass}>Payment Methods Accepted</label>
                    <input type="text" className={inputClass} value={formData.paymentMethods}
                      onChange={e => updateField('paymentMethods', e.target.value)} placeholder="Cash, Credit Cards, Insurance" />
                  </div>
                </div>

                <div className="mt-4">
                  <label className={labelClass}>Tagline (if any)</label>
                  <input type="text" className={inputClass} value={formData.tagline}
                    onChange={e => updateField('tagline', e.target.value)} placeholder="Your Journey to a Healthier You" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className={labelClass}>Service Areas</label>
                    <input type="text" className={inputClass} value={formData.serviceAreas}
                      onChange={e => updateField('serviceAreas', e.target.value)} placeholder="Las Vegas, Henderson, North Las Vegas" />
                  </div>
                  <div>
                    <label className={labelClass}>Contractor#/License# (if any)</label>
                    <input type="text" className={inputClass} value={formData.licenseNumber}
                      onChange={e => updateField('licenseNumber', e.target.value)} placeholder="NV-MD-12345" />
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="font-semibold text-brand-charcoal mb-4">Business Descriptions</h3>
                <div>
                  <label className={labelClass}>Short Description (1-2 sentences)</label>
                  <textarea className={inputClass} rows={2} value={formData.shortDescription}
                    onChange={e => updateField('shortDescription', e.target.value)} 
                    placeholder="MediSlim offers medical weight loss solutions with FDA-approved medications in Las Vegas." />
                </div>
                <div className="mt-4">
                  <label className={labelClass}>Long Description (full paragraph)</label>
                  <textarea className={inputClass} rows={4} value={formData.longDescription}
                    onChange={e => updateField('longDescription', e.target.value)} 
                    placeholder="MediSlim is a leading medical weight loss clinic in Las Vegas, specializing in FDA-approved GLP-1 medications including Semaglutide (Ozempic, Wegovy) and Tirzepatide (Mounjaro). Our experienced medical team creates personalized weight loss programs..." />
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Media & Google Stacking */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-4 mb-6">
                <h2 className="text-xl font-bold text-brand-charcoal">Media & Access</h2>
                <p className="text-sm text-gray-500 mt-1">Upload images and provide optional Google login for advanced setup</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold text-brand-charcoal mb-4">📸 Media Uploads</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Company Logo (PNG/JPG)</label>
                    <input type="file" accept="image/*" className="w-full text-sm"
                      onChange={e => setFiles(prev => ({ ...prev, logo: e.target.files?.[0] || null }))} />
                  </div>
                  <div>
                    <label className={labelClass}>Company Owner Picture</label>
                    <input type="file" accept="image/*" className="w-full text-sm"
                      onChange={e => setFiles(prev => ({ ...prev, ownerPhoto: e.target.files?.[0] || null }))} />
                  </div>
                </div>

                <div className="mt-4">
                  <label className={labelClass}>Business Images (multiple, interior/exterior)</label>
                  <input type="file" accept="image/*" multiple className="w-full text-sm"
                    onChange={e => setFiles(prev => ({ ...prev, businessImages: Array.from(e.target.files || []) }))} />
                  <p className="text-xs text-gray-500 mt-1">Upload photos of your office, waiting room, treatment rooms, etc.</p>
                </div>

                <div className="mt-4">
                  <label className={labelClass}>Video URLs (YouTube/Vimeo links)</label>
                  <textarea className={inputClass} rows={2} placeholder="https://youtube.com/watch?v=..." />
                  <p className="text-xs text-gray-500 mt-1">Paste links to promotional or testimonial videos</p>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <h3 className="font-semibold text-brand-charcoal mb-2">🔐 Google Stacking Login (Optional)</h3>
                <p className="text-sm text-yellow-800 mb-4">
                  Providing Google credentials allows us to set up advanced Google Stacking for stronger local SEO signals. 
                  These credentials are stored securely and only used for your campaign setup.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Email/Gmail Account</label>
                    <input type="email" className={inputClass} value={formData.gmailAccount}
                      onChange={e => updateField('gmailAccount', e.target.value)} placeholder="yourbusiness@gmail.com" />
                  </div>
                  <div>
                    <label className={labelClass}>Password</label>
                    <input type="password" className={inputClass} value={formData.gmailPassword}
                      onChange={e => updateField('gmailPassword', e.target.value)} placeholder="••••••••" />
                  </div>
                  <div>
                    <label className={labelClass}>Recovery Email</label>
                    <input type="email" className={inputClass} value={formData.recoveryEmail}
                      onChange={e => updateField('recoveryEmail', e.target.value)} placeholder="backup@email.com" />
                  </div>
                  <div>
                    <label className={labelClass}>Recovery Phone</label>
                    <input type="tel" className={inputClass} value={formData.recoveryPhone}
                      onChange={e => updateField('recoveryPhone', e.target.value)} placeholder="(702) 555-1234" />
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  <strong>What happens next?</strong> After you submit this form, we'll review your information and 
                  begin setting up your Local SEO campaign. Expect an email within 24-48 hours to schedule your 
                  first Thursday strategy call.
                </p>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-gray-200 gap-3">
            <button
              onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
              disabled={currentStep === 1}
              className="app-button-outline flex-1 sm:flex-none disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ← Previous
            </button>

            {currentStep < totalSteps ? (
              <button
                onClick={() => setCurrentStep(prev => Math.min(totalSteps, prev + 1))}
                className="app-button-primary flex-1 sm:flex-none"
              >
                Next →
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="app-button-secondary flex-1 sm:flex-none flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Submitting...
                  </>
                ) : (
                  'Submit Intake Form'
                )}
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
