'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import Link from 'next/link'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

interface Keyword {
  keyword: string
  volume: number
  intent: string
  competition: string
}

interface IndustryTemplate {
  industry: string
  display_name: string
  executive_summary: string
  target_keywords: Keyword[]
  seo_deliverables: {
    everyMonth: string[]
    rotating: { name: string; icon: string; items: string[] }[]
  }
  services_setup: string[]
  services_monthly: string[]
  base_setup_fee: number
  base_monthly_retainer: number
}

const industryEmoji: Record<string, string> = {
  'medical': '🏥',
  'venue': '🎪',
  'home-services': '🔧',
  'small-business': '🏪',
}

export default function AdminTemplatesPage() {
  const [templates, setTemplates] = useState<IndustryTemplate[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState<string | null>(null)
  const [editingTemplate, setEditingTemplate] = useState<IndustryTemplate | null>(null)
  const [activeTab, setActiveTab] = useState<'summary' | 'keywords' | 'services' | 'seo'>('summary')

  useEffect(() => {
    fetchTemplates()
  }, [])

  async function fetchTemplates() {
    const { data, error } = await supabase
      .from('industry_templates')
      .select('*')
      .order('industry')
    
    if (!error && data) {
      setTemplates(data)
    }
    setLoading(false)
  }

  async function updateTemplate(template: IndustryTemplate) {
    setSaving(template.industry)
    
    const { error } = await supabase
      .from('industry_templates')
      .update({
        display_name: template.display_name,
        executive_summary: template.executive_summary,
        target_keywords: template.target_keywords,
        seo_deliverables: template.seo_deliverables,
        services_setup: template.services_setup,
        services_monthly: template.services_monthly,
        base_setup_fee: template.base_setup_fee,
        base_monthly_retainer: template.base_monthly_retainer,
      })
      .eq('industry', template.industry)

    if (error) {
      alert('Failed to save: ' + error.message)
    } else {
      setEditingTemplate(null)
      await fetchTemplates()
    }
    setSaving(null)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-4 mb-2">
              <Link href="/admin" className="text-gray-400 hover:text-white">
                ← Back to Admin
              </Link>
            </div>
            <h1 className="text-3xl font-bold">Industry Templates</h1>
            <p className="text-gray-400">Customize proposal content per industry</p>
          </div>
          <Link 
            href="/admin/settings"
            className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
          >
            ← Add-on Settings
          </Link>
        </div>

        {/* Templates Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {templates.map((template) => (
            <div 
              key={template.industry} 
              className="bg-gray-800 rounded-xl p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">{industryEmoji[template.industry] || '📊'}</span>
                <div>
                  <h3 className="text-xl font-bold">{template.display_name}</h3>
                  <p className="text-gray-400 text-sm">{template.industry}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-gray-700/50 p-3 rounded-lg">
                  <p className="text-gray-400 text-sm">Setup Fee</p>
                  <p className="text-xl font-bold">${template.base_setup_fee.toLocaleString()}</p>
                </div>
                <div className="bg-gray-700/50 p-3 rounded-lg">
                  <p className="text-gray-400 text-sm">Monthly Retainer</p>
                  <p className="text-xl font-bold text-orange-400">${template.base_monthly_retainer.toLocaleString()}/mo</p>
                </div>
              </div>

              <div className="space-y-2 text-sm mb-4">
                <p className="text-gray-400">
                  <span className="font-semibold text-white">{template.target_keywords?.length || 0}</span> target keywords
                </p>
                <p className="text-gray-400">
                  <span className="font-semibold text-white">{template.services_setup?.length || 0}</span> setup services
                </p>
                <p className="text-gray-400">
                  <span className="font-semibold text-white">{template.services_monthly?.length || 0}</span> monthly services
                </p>
              </div>

              <button
                onClick={() => {
                  setEditingTemplate(template)
                  setActiveTab('summary')
                }}
                className="w-full py-2 bg-orange-500 hover:bg-orange-600 rounded-lg font-semibold transition-colors"
              >
                Edit Template
              </button>
            </div>
          ))}
        </div>

        {/* Edit Modal */}
        {editingTemplate && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
              {/* Modal Header */}
              <div className="p-6 border-b border-gray-700 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{industryEmoji[editingTemplate.industry]}</span>
                  <div>
                    <h2 className="text-xl font-bold">{editingTemplate.display_name}</h2>
                    <p className="text-gray-400 text-sm">Edit template settings</p>
                  </div>
                </div>
                <button
                  onClick={() => setEditingTemplate(null)}
                  className="text-gray-400 hover:text-white text-2xl"
                >
                  ×
                </button>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-gray-700">
                {(['summary', 'keywords', 'services', 'seo'] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-3 font-medium capitalize transition-colors ${
                      activeTab === tab 
                        ? 'text-orange-400 border-b-2 border-orange-400' 
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Modal Body */}
              <div className="p-6 overflow-y-auto flex-1">
                {activeTab === 'summary' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Display Name</label>
                      <input
                        type="text"
                        value={editingTemplate.display_name}
                        onChange={(e) => setEditingTemplate({ ...editingTemplate, display_name: e.target.value })}
                        className="w-full px-3 py-2 bg-gray-700 rounded-lg"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-400 mb-1">Base Setup Fee ($)</label>
                        <input
                          type="number"
                          value={editingTemplate.base_setup_fee}
                          onChange={(e) => setEditingTemplate({ ...editingTemplate, base_setup_fee: parseInt(e.target.value) || 0 })}
                          className="w-full px-3 py-2 bg-gray-700 rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 mb-1">Base Monthly Retainer ($)</label>
                        <input
                          type="number"
                          value={editingTemplate.base_monthly_retainer}
                          onChange={(e) => setEditingTemplate({ ...editingTemplate, base_monthly_retainer: parseInt(e.target.value) || 0 })}
                          className="w-full px-3 py-2 bg-gray-700 rounded-lg"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Executive Summary</label>
                      <textarea
                        value={editingTemplate.executive_summary}
                        onChange={(e) => setEditingTemplate({ ...editingTemplate, executive_summary: e.target.value })}
                        rows={6}
                        className="w-full px-3 py-2 bg-gray-700 rounded-lg"
                      />
                    </div>
                  </div>
                )}

                {activeTab === 'keywords' && (
                  <div className="space-y-4">
                    <p className="text-gray-400 text-sm">Target keywords shown on proposals for this industry</p>
                    {editingTemplate.target_keywords?.map((kw, i) => (
                      <div key={i} className="grid grid-cols-4 gap-2 p-3 bg-gray-700/50 rounded-lg">
                        <input
                          type="text"
                          value={kw.keyword}
                          onChange={(e) => {
                            const newKeywords = [...editingTemplate.target_keywords]
                            newKeywords[i] = { ...newKeywords[i], keyword: e.target.value }
                            setEditingTemplate({ ...editingTemplate, target_keywords: newKeywords })
                          }}
                          placeholder="Keyword"
                          className="px-2 py-1 bg-gray-700 rounded text-sm"
                        />
                        <input
                          type="number"
                          value={kw.volume}
                          onChange={(e) => {
                            const newKeywords = [...editingTemplate.target_keywords]
                            newKeywords[i] = { ...newKeywords[i], volume: parseInt(e.target.value) || 0 }
                            setEditingTemplate({ ...editingTemplate, target_keywords: newKeywords })
                          }}
                          placeholder="Volume"
                          className="px-2 py-1 bg-gray-700 rounded text-sm"
                        />
                        <input
                          type="text"
                          value={kw.intent}
                          onChange={(e) => {
                            const newKeywords = [...editingTemplate.target_keywords]
                            newKeywords[i] = { ...newKeywords[i], intent: e.target.value }
                            setEditingTemplate({ ...editingTemplate, target_keywords: newKeywords })
                          }}
                          placeholder="Intent"
                          className="px-2 py-1 bg-gray-700 rounded text-sm"
                        />
                        <div className="flex gap-2">
                          <select
                            value={kw.competition}
                            onChange={(e) => {
                              const newKeywords = [...editingTemplate.target_keywords]
                              newKeywords[i] = { ...newKeywords[i], competition: e.target.value }
                              setEditingTemplate({ ...editingTemplate, target_keywords: newKeywords })
                            }}
                            className="flex-1 px-2 py-1 bg-gray-700 rounded text-sm"
                          >
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="Medium-High">Medium-High</option>
                            <option value="High">High</option>
                          </select>
                          <button
                            onClick={() => {
                              const newKeywords = editingTemplate.target_keywords.filter((_, idx) => idx !== i)
                              setEditingTemplate({ ...editingTemplate, target_keywords: newKeywords })
                            }}
                            className="px-2 py-1 bg-red-500/20 text-red-400 rounded text-sm hover:bg-red-500/30"
                          >
                            ×
                          </button>
                        </div>
                      </div>
                    ))}
                    <button
                      onClick={() => {
                        const newKeywords = [...(editingTemplate.target_keywords || []), { keyword: '', volume: 0, intent: '', competition: 'Medium' }]
                        setEditingTemplate({ ...editingTemplate, target_keywords: newKeywords })
                      }}
                      className="w-full py-2 border-2 border-dashed border-gray-600 rounded-lg text-gray-400 hover:border-orange-500 hover:text-orange-400 transition-colors"
                    >
                      + Add Keyword
                    </button>
                  </div>
                )}

                {activeTab === 'services' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold mb-2">Setup Services (Month 1)</h3>
                      <textarea
                        value={editingTemplate.services_setup?.join('\n') || ''}
                        onChange={(e) => setEditingTemplate({ ...editingTemplate, services_setup: e.target.value.split('\n').filter(Boolean) })}
                        rows={8}
                        placeholder="One service per line"
                        className="w-full px-3 py-2 bg-gray-700 rounded-lg font-mono text-sm"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Monthly Services (Ongoing)</h3>
                      <textarea
                        value={editingTemplate.services_monthly?.join('\n') || ''}
                        onChange={(e) => setEditingTemplate({ ...editingTemplate, services_monthly: e.target.value.split('\n').filter(Boolean) })}
                        rows={6}
                        placeholder="One service per line"
                        className="w-full px-3 py-2 bg-gray-700 rounded-lg font-mono text-sm"
                      />
                    </div>
                  </div>
                )}

                {activeTab === 'seo' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold mb-2">Every Month Deliverables</h3>
                      <textarea
                        value={editingTemplate.seo_deliverables?.everyMonth?.join('\n') || ''}
                        onChange={(e) => setEditingTemplate({ 
                          ...editingTemplate, 
                          seo_deliverables: { 
                            ...editingTemplate.seo_deliverables, 
                            everyMonth: e.target.value.split('\n').filter(Boolean) 
                          } 
                        })}
                        rows={5}
                        placeholder="One item per line"
                        className="w-full px-3 py-2 bg-gray-700 rounded-lg font-mono text-sm"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Rotating Link Building Services</h3>
                      <p className="text-gray-400 text-sm mb-2">These rotate monthly (one per month)</p>
                      {editingTemplate.seo_deliverables?.rotating?.map((service, i) => (
                        <div key={i} className="mb-4 p-4 bg-gray-700/50 rounded-lg">
                          <div className="flex gap-2 mb-2">
                            <input
                              type="text"
                              value={service.icon}
                              onChange={(e) => {
                                const newRotating = [...editingTemplate.seo_deliverables.rotating]
                                newRotating[i] = { ...newRotating[i], icon: e.target.value }
                                setEditingTemplate({ ...editingTemplate, seo_deliverables: { ...editingTemplate.seo_deliverables, rotating: newRotating } })
                              }}
                              placeholder="Icon"
                              className="w-16 px-2 py-1 bg-gray-700 rounded text-2xl text-center"
                            />
                            <input
                              type="text"
                              value={service.name}
                              onChange={(e) => {
                                const newRotating = [...editingTemplate.seo_deliverables.rotating]
                                newRotating[i] = { ...newRotating[i], name: e.target.value }
                                setEditingTemplate({ ...editingTemplate, seo_deliverables: { ...editingTemplate.seo_deliverables, rotating: newRotating } })
                              }}
                              placeholder="Service Name"
                              className="flex-1 px-2 py-1 bg-gray-700 rounded"
                            />
                          </div>
                          <textarea
                            value={service.items?.join('\n') || ''}
                            onChange={(e) => {
                              const newRotating = [...editingTemplate.seo_deliverables.rotating]
                              newRotating[i] = { ...newRotating[i], items: e.target.value.split('\n').filter(Boolean) }
                              setEditingTemplate({ ...editingTemplate, seo_deliverables: { ...editingTemplate.seo_deliverables, rotating: newRotating } })
                            }}
                            rows={3}
                            placeholder="Items (one per line)"
                            className="w-full px-2 py-1 bg-gray-700 rounded text-sm"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="p-6 border-t border-gray-700 flex gap-3">
                <button
                  onClick={() => updateTemplate(editingTemplate)}
                  disabled={saving === editingTemplate.industry}
                  className="flex-1 py-3 bg-orange-500 hover:bg-orange-600 rounded-lg font-bold disabled:opacity-50"
                >
                  {saving === editingTemplate.industry ? 'Saving...' : 'Save Changes'}
                </button>
                <button
                  onClick={() => setEditingTemplate(null)}
                  className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
