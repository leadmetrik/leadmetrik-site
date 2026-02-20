'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

interface Lead {
  id: string
  created_at: string
  name: string
  email: string
  phone: string | null
  website: string | null
  industry: string
  business_size: string
  challenge: string | null
  status: string
  proposal_id: string | null
}

interface Proposal {
  id: string
  slug: string
  status: string
  setup_fee: number
  monthly_retainer: number
}

const industryEmoji: Record<string, string> = {
  'medical': '🏥',
  'venue': '🎪',
  'home-services': '🔧',
  'small-business': '🏪',
}

const statusColors: Record<string, string> = {
  'new': 'bg-blue-500/20 text-blue-400',
  'contacted': 'bg-yellow-500/20 text-yellow-400',
  'qualified': 'bg-purple-500/20 text-purple-400',
  'proposal_sent': 'bg-orange-500/20 text-orange-400',
  'signed': 'bg-green-500/20 text-green-400',
  'lost': 'bg-red-500/20 text-red-400',
}

export default function AdminPage() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [proposals, setProposals] = useState<Record<string, Proposal>>({})
  const [loading, setLoading] = useState(true)
  const [generating, setGenerating] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchLeads()
  }, [])

  async function fetchLeads() {
    setLoading(true)
    
    const { data: leadsData, error: leadsError } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false })

    if (leadsError) {
      setError('Failed to fetch leads')
      setLoading(false)
      return
    }

    setLeads(leadsData || [])

    // Fetch proposals for leads that have them
    const proposalIds = leadsData
      ?.filter(l => l.proposal_id)
      .map(l => l.proposal_id) || []

    if (proposalIds.length > 0) {
      const { data: proposalsData } = await supabase
        .from('proposals')
        .select('*')
        .in('id', proposalIds)

      const proposalsMap: Record<string, Proposal> = {}
      proposalsData?.forEach(p => {
        proposalsMap[p.id] = p
      })
      setProposals(proposalsMap)
    }

    setLoading(false)
  }

  async function generateProposal(leadId: string) {
    setGenerating(leadId)
    setError(null)

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/generate-proposal`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ lead_id: leadId, send_email: true }),
        }
      )

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to generate proposal')
      }

      // Refresh leads
      await fetchLeads()
      
      alert(`✅ Proposal generated!\n\nURL: ${result.proposal_url}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate proposal')
    } finally {
      setGenerating(null)
    }
  }

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
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
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">LeadMetrik Admin</h1>
            <p className="text-gray-400">Manage leads and proposals</p>
          </div>
          <div className="flex gap-3">
            <a
              href="/admin/settings"
              className="px-4 py-2 bg-orange-500 hover:bg-orange-600 rounded-lg transition-colors font-medium"
            >
              ⚙️ Add-ons
            </a>
            <a
              href="/admin/templates"
              className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
            >
              📄 Templates
            </a>
            <button
              onClick={fetchLeads}
              className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
            >
              ↻ Refresh
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400">
            {error}
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-800 rounded-xl p-6">
            <p className="text-gray-400 text-sm">Total Leads</p>
            <p className="text-3xl font-bold">{leads.length}</p>
          </div>
          <div className="bg-gray-800 rounded-xl p-6">
            <p className="text-gray-400 text-sm">New</p>
            <p className="text-3xl font-bold text-blue-400">
              {leads.filter(l => l.status === 'new').length}
            </p>
          </div>
          <div className="bg-gray-800 rounded-xl p-6">
            <p className="text-gray-400 text-sm">Proposals Sent</p>
            <p className="text-3xl font-bold text-orange-400">
              {leads.filter(l => l.status === 'proposal_sent').length}
            </p>
          </div>
          <div className="bg-gray-800 rounded-xl p-6">
            <p className="text-gray-400 text-sm">Signed</p>
            <p className="text-3xl font-bold text-green-400">
              {leads.filter(l => l.status === 'signed').length}
            </p>
          </div>
        </div>

        {/* Leads Table */}
        <div className="bg-gray-800 rounded-xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-700/50">
              <tr>
                <th className="text-left p-4 font-medium text-gray-300">Lead</th>
                <th className="text-left p-4 font-medium text-gray-300">Industry</th>
                <th className="text-left p-4 font-medium text-gray-300">Size</th>
                <th className="text-left p-4 font-medium text-gray-300">Status</th>
                <th className="text-left p-4 font-medium text-gray-300">Date</th>
                <th className="text-left p-4 font-medium text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {leads.map(lead => {
                const proposal = lead.proposal_id ? proposals[lead.proposal_id] : null
                
                return (
                  <tr key={lead.id} className="hover:bg-gray-700/30">
                    <td className="p-4">
                      <div>
                        <p className="font-semibold">{lead.name}</p>
                        <p className="text-sm text-gray-400">{lead.email}</p>
                        {lead.phone && (
                          <p className="text-sm text-gray-500">{lead.phone}</p>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="flex items-center gap-2">
                        <span>{industryEmoji[lead.industry] || '📊'}</span>
                        <span className="capitalize">{lead.industry.replace('-', ' ')}</span>
                      </span>
                    </td>
                    <td className="p-4 text-gray-300 capitalize">
                      {lead.business_size === 'solo' ? 'Just me' : lead.business_size}
                    </td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-sm ${statusColors[lead.status] || 'bg-gray-500/20 text-gray-400'}`}>
                        {lead.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="p-4 text-gray-400 text-sm">
                      {formatDate(lead.created_at)}
                    </td>
                    <td className="p-4">
                      {proposal ? (
                        <a
                          href={`/proposal/${proposal.slug}`}
                          target="_blank"
                          className="px-4 py-2 bg-green-500/20 text-green-400 rounded-lg text-sm hover:bg-green-500/30 transition-colors"
                        >
                          View Proposal →
                        </a>
                      ) : (
                        <button
                          onClick={() => generateProposal(lead.id)}
                          disabled={generating === lead.id}
                          className="px-4 py-2 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 rounded-lg text-sm font-medium transition-colors"
                        >
                          {generating === lead.id ? 'Generating...' : 'Generate Proposal'}
                        </button>
                      )}
                    </td>
                  </tr>
                )
              })}
              {leads.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-gray-500">
                    No leads yet. They'll appear here when someone fills out the contact form.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
