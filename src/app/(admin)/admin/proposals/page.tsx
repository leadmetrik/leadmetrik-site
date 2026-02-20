import { supabaseAdmin } from '@/lib/supabase';
import { FileText, ExternalLink, Calendar, DollarSign, User } from 'lucide-react';
import Link from 'next/link';

async function getProposals() {
  const { data, error } = await supabaseAdmin
    .from('proposals')
    .select('*, lead:leads(name, email, company)')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching proposals:', error);
    return [];
  }

  return data || [];
}

export default async function ProposalsPage() {
  const proposals = await getProposals();

  const statusColors: Record<string, string> = {
    draft: 'bg-gray-500/20 text-gray-400',
    sent: 'bg-yellow-500/20 text-yellow-400',
    viewed: 'bg-blue-500/20 text-blue-400',
    signed: 'bg-emerald-500/20 text-emerald-400',
    expired: 'bg-red-500/20 text-red-400',
  };

  return (
    <div className="max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Proposals</h1>
        <p className="text-gray-400 mt-1">{proposals.length} total proposals</p>
      </div>

      {proposals.length === 0 ? (
        <div className="bg-[#1A202C] rounded-xl border border-gray-800 p-12 text-center">
          <FileText className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-white mb-2">No proposals yet</h2>
          <p className="text-gray-400">Proposals will appear here when you create them from leads.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {proposals.map((proposal: {
            id: string;
            slug: string;
            status: string;
            monthly_price?: number;
            setup_fee?: number;
            created_at: string;
            signed_at?: string;
            lead?: { name: string; email: string; company?: string };
          }) => (
            <div
              key={proposal.id}
              className="bg-[#1A202C] rounded-xl border border-gray-800 p-6 hover:border-gray-700 transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-white">
                      {proposal.lead?.name || proposal.slug}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[proposal.status] || 'bg-gray-500/20 text-gray-400'}`}>
                      {proposal.status}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                    {proposal.lead?.company && (
                      <span className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {proposal.lead.company}
                      </span>
                    )}
                    {proposal.monthly_price && (
                      <span className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4" />
                        ${proposal.monthly_price}/mo
                        {proposal.setup_fee && ` + $${proposal.setup_fee} setup`}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      Created {new Date(proposal.created_at).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                    {proposal.signed_at && (
                      <span className="text-emerald-400 flex items-center gap-1">
                        ✓ Signed {new Date(proposal.signed_at).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                    )}
                  </div>
                </div>

                <Link
                  href={`/proposal/${proposal.slug}`}
                  target="_blank"
                  className="flex items-center gap-2 px-4 py-2 bg-[#F5A623] hover:bg-[#E09000] text-[#1A202C] font-medium rounded-lg transition-colors"
                >
                  View <ExternalLink className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
