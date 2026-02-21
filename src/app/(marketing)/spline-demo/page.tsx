'use client'

import { useState, Suspense } from 'react'
import dynamic from 'next/dynamic'

// Lazy load Spline to avoid SSR issues
const Spline = dynamic(() => import('@splinetool/react-spline'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-brand-dark">
      <div className="animate-spin w-8 h-8 border-2 border-brand-orange border-t-transparent rounded-full" />
    </div>
  ),
})

const scenes = [
  {
    name: 'Abstract Geometric',
    url: 'https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode',
    description: 'Floating 3D shapes with smooth animations',
  },
  {
    name: 'Gradient Blob',
    url: 'https://prod.spline.design/9951u9cumiw2Ehj8/scene.splinecode',
    description: 'Morphing gradient sphere (from Spline homepage)',
  },
  {
    name: 'Interactive Cube',
    url: 'https://prod.spline.design/LEvjG3OETYd2GsRw/scene.splinecode',
    description: 'Hoverable/clickable 3D cube',
  },
  {
    name: 'Floating Shapes',
    url: 'https://prod.spline.design/PBQQBw8bfXDhBo7w/scene.splinecode',
    description: 'Multiple floating geometric elements',
  },
  {
    name: 'Tech Scene',
    url: 'https://prod.spline.design/o3v1HPnOwXUx88B6/scene.splinecode',
    description: 'Tech/digital aesthetic',
  },
  {
    name: 'Minimal Abstract',
    url: 'https://prod.spline.design/S8o9DE-254xyJ0lv/scene.splinecode',
    description: 'Clean minimal 3D design',
  },
]

export default function SplineDemo() {
  const [activeScene, setActiveScene] = useState(0)

  return (
    <div className="min-h-screen bg-brand-dark">
      {/* Scene selector */}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex gap-2 bg-black/50 backdrop-blur-sm p-2 rounded-full">
        {scenes.map((scene, i) => (
          <button
            key={i}
            onClick={() => setActiveScene(i)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeScene === i
                ? 'bg-brand-orange text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {scene.name}
          </button>
        ))}
      </div>

      {/* Info badge */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full">
        <p className="text-gray-300 text-sm">{scenes[activeScene].description}</p>
      </div>

      {/* Hero mockup with Spline */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Spline Background */}
        <div className="absolute inset-0 z-0">
          <Spline
            key={activeScene}
            scene={scenes[activeScene].url}
            style={{ width: '100%', height: '100%' }}
          />
        </div>

        {/* Content overlay */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-brand-orange/10 border border-brand-orange/30 rounded-full px-4 py-2 mb-8 backdrop-blur-sm">
            <span className="w-2 h-2 bg-brand-orange rounded-full animate-pulse" />
            <span className="text-brand-orange font-medium text-sm">SEO Company Las Vegas</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
            Las Vegas SEO &
            <br />
            Marketing Agency
          </h1>

          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto mb-10 drop-shadow-md">
            <span className="text-white font-medium">Local SEO, Google Ads, websites & digital marketing </span>
            — all done for you by our Las Vegas marketing team.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="group relative bg-brand-orange hover:bg-brand-orange-dark text-white px-8 py-4 rounded-full font-semibold text-lg transition-all">
              Get Your Free Audit
            </button>
            <button className="flex items-center gap-2 text-gray-300 hover:text-white px-8 py-4 rounded-full font-medium text-lg transition-colors border border-gray-700 hover:border-gray-500 backdrop-blur-sm">
              (702) 996-4415
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
