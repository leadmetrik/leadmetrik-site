'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import Link from 'next/link'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

interface AddOn {
  id: string
  name: string
  description: string
  icon: string
  details: string[]
  original_price: number
  discounted_price: number
  highlight: string | null
  sort_order: number
  is_active: boolean
}

export default function AdminSettingsPage() {
  const [addons, setAddons] = useState<AddOn[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState<string | null>(null)
  const [editingAddon, setEditingAddon] = useState<AddOn | null>(null)

  useEffect(() => {
    fetchAddons()
  }, [])

  async function fetchAddons() {
    const { data, error } = await supabase
      .from('addon_settings')
      .select('*')
      .order('sort_order')
    
    if (!error && data) {
      setAddons(data)
    }
    setLoading(false)
  }

  async function updateAddon(addon: AddOn) {
    setSaving(addon.id)
    
    const { error } = await supabase
      .from('addon_settings')
      .update({
        name: addon.name,
        description: addon.description,
        icon: addon.icon,
        details: addon.details,
        original_price: addon.original_price,
        discounted_price: addon.discounted_price,
        highlight: addon.highlight || null,
        is_active: addon.is_active,
        sort_order: addon.sort_order,
      })
      .eq('id', addon.id)

    if (error) {
      alert('Failed to save: ' + error.message)
    } else {
      setEditingAddon(null)
      await fetchAddons()
    }
    setSaving(null)
  }

  async function toggleActive(addon: AddOn) {
    setSaving(addon.id)
    
    const { error } = await supabase
      .from('addon_settings')
      .update({ is_active: !addon.is_active })
      .eq('id', addon.id)

    if (!error) {
      await fetchAddons()
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
            <h1 className="text-3xl font-bold">Add-on Settings</h1>
            <p className="text-gray-400">Manage pricing and details for proposal add-ons</p>
          </div>
          <Link 
            href="/admin/templates"
            className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
          >
            Industry Templates →
          </Link>
        </div>

        {/* Add-ons List */}
        <div className="space-y-4">
          {addons.map((addon) => (
            <div 
              key={addon.id} 
              className={`bg-gray-800 rounded-xl p-6 border-2 transition-colors ${
                addon.is_active ? 'border-transparent' : 'border-red-500/50 opacity-60'
              }`}
            >
              {editingAddon?.id === addon.id ? (
                // Edit Mode
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Icon (emoji)</label>
                      <input
                        type="text"
                        value={editingAddon.icon}
                        onChange={(e) => setEditingAddon({ ...editingAddon, icon: e.target.value })}
                        className="w-full px-3 py-2 bg-gray-700 rounded-lg text-2xl"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Name</label>
                      <input
                        type="text"
                        value={editingAddon.name}
                        onChange={(e) => setEditingAddon({ ...editingAddon, name: e.target.value })}
                        className="w-full px-3 py-2 bg-gray-700 rounded-lg"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Description</label>
                    <input
                      type="text"
                      value={editingAddon.description}
                      onChange={(e) => setEditingAddon({ ...editingAddon, description: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-700 rounded-lg"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Original Price ($)</label>
                      <input
                        type="number"
                        value={editingAddon.original_price}
                        onChange={(e) => setEditingAddon({ ...editingAddon, original_price: parseInt(e.target.value) || 0 })}
                        className="w-full px-3 py-2 bg-gray-700 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Discounted Price ($)</label>
                      <input
                        type="number"
                        value={editingAddon.discounted_price}
                        onChange={(e) => setEditingAddon({ ...editingAddon, discounted_price: parseInt(e.target.value) || 0 })}
                        className="w-full px-3 py-2 bg-gray-700 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Highlight Badge</label>
                      <input
                        type="text"
                        value={editingAddon.highlight || ''}
                        onChange={(e) => setEditingAddon({ ...editingAddon, highlight: e.target.value })}
                        placeholder="e.g. BEST FOR SEO"
                        className="w-full px-3 py-2 bg-gray-700 rounded-lg"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Details (one per line)</label>
                    <textarea
                      value={editingAddon.details.join('\n')}
                      onChange={(e) => setEditingAddon({ ...editingAddon, details: e.target.value.split('\n').filter(Boolean) })}
                      rows={5}
                      className="w-full px-3 py-2 bg-gray-700 rounded-lg font-mono text-sm"
                    />
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => updateAddon(editingAddon)}
                      disabled={saving === addon.id}
                      className="px-4 py-2 bg-orange-500 hover:bg-orange-600 rounded-lg font-semibold disabled:opacity-50"
                    >
                      {saving === addon.id ? 'Saving...' : 'Save Changes'}
                    </button>
                    <button
                      onClick={() => setEditingAddon(null)}
                      className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                // View Mode
                <div className="flex items-start gap-4">
                  <div className="text-4xl">{addon.icon}</div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-xl font-bold">{addon.name}</h3>
                      {addon.highlight && (
                        <span className="px-2 py-0.5 bg-orange-500 text-xs font-bold rounded-full">
                          {addon.highlight}
                        </span>
                      )}
                      {!addon.is_active && (
                        <span className="px-2 py-0.5 bg-red-500/20 text-red-400 text-xs font-bold rounded-full">
                          DISABLED
                        </span>
                      )}
                    </div>
                    <p className="text-gray-400 mb-2">{addon.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {addon.details.map((detail, i) => (
                        <span key={i} className="px-2 py-1 bg-gray-700 text-sm rounded">
                          {detail}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-gray-500 line-through">${addon.original_price}/mo</p>
                    <p className="text-2xl font-bold text-orange-400">${addon.discounted_price}/mo</p>
                    <p className="text-green-400 text-sm">
                      Save ${addon.original_price - addon.discounted_price}/mo
                    </p>
                  </div>

                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => setEditingAddon(addon)}
                      className="px-3 py-1.5 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => toggleActive(addon)}
                      disabled={saving === addon.id}
                      className={`px-3 py-1.5 rounded-lg text-sm ${
                        addon.is_active 
                          ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30' 
                          : 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                      }`}
                    >
                      {addon.is_active ? 'Disable' : 'Enable'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="mt-8 p-6 bg-gray-800 rounded-xl">
          <h3 className="text-lg font-bold mb-4">Quick Reference</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {addons.filter(a => a.is_active).map(addon => (
              <div key={addon.id} className="text-center p-3 bg-gray-700/50 rounded-lg">
                <div className="text-2xl mb-1">{addon.icon}</div>
                <p className="text-sm font-medium">{addon.name}</p>
                <p className="text-orange-400 font-bold">${addon.discounted_price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
