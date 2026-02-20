import { supabaseAdmin } from '@/lib/supabase';
import { Users, Mail, Building2, Calendar, ExternalLink, Package, Search } from 'lucide-react';
import Link from 'next/link';

async function getLeads() {
  const { data, error } = await supabaseAdmin
    .from('leads')
    .select('*, proposals(id, slug, status)')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching leads:', error);
    return [];
  }

  return data || [];
}

export default async function LeadsPage() {
  const leads = await getLeads();

  const statusColors: Record<string, string> = {
    new: 'bg-blue-500/20 text-blue-400',
    contacted: 'bg-yellow-500/20 text-yellow-400',
    proposal_created: 'bg-purple-500/20 text-purple-400',
    proposal_sent: 'bg-orange-500/20 text-orange-400',
    signed: 'bg-emerald-500/20 text-emerald-400',
    lost: 'bg-red-500/20 text-red-400',
  };

  const tierColors: Record<string, string> = {
    starter: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
    growth: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    dominate: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  };

  const tierLabels: Record<string, string> = {
    starter: '$500/mo',
    growth: '$1,200/mo',
    dominate: '$2,500/mo',
  };

  // Count by type
  const packageLeads = leads.filter((l: { lead_type?: string }) => l.lead_type === 'package').length;
  const auditLeads = leads.filter((l: { lead_type?: string }) => l.lead_type === 'audit' || !l.lead_type).length;

  return (
    <div className="max-w-7xl">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Leads</h1>
          <p className="text-gray-400 mt-1">
            {leads.length} total • 
            <span className="text-emerald-400 ml-2">{packageLeads} packages</span> • 
            <span className="text-yellow-400 ml-2">{auditLeads} audits</span>
          </p>
        </div>
      </div>

      {leads.length === 0 ? (
        <div className="bg-[#1A202C] rounded-xl border border-gray-800 p-12 text-center">
          <Users className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-white mb-2">No leads yet</h2>
          <p className="text-gray-400">Leads will appear here when people submit the contact form.</p>
        </div>
      ) : (
        <div className="bg-[#1A202C] rounded-xl border border-gray-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Type</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Lead</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Contact</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Industry</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Proposal</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {leads.map((lead: {
                  id: string;
                  name: string;
                  email: string;
                  phone?: string;
                  company?: string;
                  industry?: string;
                  status: string;
                  lead_type?: string;
                  selected_tier?: string;
                  created_at: string;
                  proposals?: Array<{ id: string; slug: string; status: string }>;
                }) => {
                  const isPackage = lead.lead_type === 'package';
                  return (
                    <tr key={lead.id} className="hover:bg-gray-800/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1">
                          {isPackage ? (
                            <>
                              <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-emerald-500/20 text-emerald-400 text-xs font-medium w-fit">
                                <Package className="w-3 h-3" />
                                PACKAGE
                              </span>
                              {lead.selected_tier && (
                                <span className={`px-2 py-0.5 rounded border text-xs font-medium w-fit ${tierColors[lead.selected_tier]}`}>
                                  {lead.selected_tier.charAt(0).toUpperCase() + lead.selected_tier.slice(1)} • {tierLabels[lead.selected_tier]}
                                </span>
                              )}
                            </>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-yellow-500/20 text-yellow-400 text-xs font-medium w-fit">
                              <Search className="w-3 h-3" />
                              AUDIT
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-[#F5A623]/20 flex items-center justify-center">
                            <span className="text-[#F5A623] font-semibold">
                              {lead.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <p className="text-white font-medium">{lead.name}</p>
                            {lead.company && (
                              <p className="text-gray-500 text-sm flex items-center gap-1">
                                <Building2 className="w-3 h-3" />
                                {lead.company}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-gray-300 flex items-center gap-2">
                          <Mail className="w-4 h-4 text-gray-500" />
                          {lead.email}
                        </p>
                        {lead.phone && (
                          <p className="text-gray-500 text-sm mt-1">{lead.phone}</p>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-gray-400 capitalize">{lead.industry?.replace('-', ' ') || '-'}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[lead.status] || 'bg-gray-500/20 text-gray-400'}`}>
                          {lead.status.replace(/_/g, ' ')}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {lead.proposals && lead.proposals.length > 0 ? (
                          <Link
                            href={`/proposal/${lead.proposals[0].slug}`}
                            target="_blank"
                            className="inline-flex items-center gap-1 text-[#F5A623] hover:text-[#E09000] text-sm"
                          >
                            View <ExternalLink className="w-3 h-3" />
                          </Link>
                        ) : (
                          <span className="text-gray-600 text-sm">—</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-gray-500 text-sm">
                          <Calendar className="w-4 h-4" />
                          {new Date(lead.created_at).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
