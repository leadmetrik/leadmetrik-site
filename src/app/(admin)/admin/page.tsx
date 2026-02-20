import { supabaseAdmin } from '@/lib/supabase';
import { Users, FileText, CheckCircle, Clock, TrendingUp, Activity } from 'lucide-react';

async function getDashboardStats() {
  const now = new Date();
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  // Get leads count
  const { count: totalLeads } = await supabaseAdmin
    .from('leads')
    .select('*', { count: 'exact', head: true });

  const { count: leadsThisWeek } = await supabaseAdmin
    .from('leads')
    .select('*', { count: 'exact', head: true })
    .gte('created_at', weekAgo.toISOString());

  const { count: leadsThisMonth } = await supabaseAdmin
    .from('leads')
    .select('*', { count: 'exact', head: true })
    .gte('created_at', monthAgo.toISOString());

  // Get proposals count
  const { count: totalProposals } = await supabaseAdmin
    .from('proposals')
    .select('*', { count: 'exact', head: true });

  const { count: pendingProposals } = await supabaseAdmin
    .from('proposals')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'sent');

  const { count: signedProposals } = await supabaseAdmin
    .from('proposals')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'signed');

  // Get recent activity
  const { data: recentLeads } = await supabaseAdmin
    .from('leads')
    .select('id, name, email, company, created_at')
    .order('created_at', { ascending: false })
    .limit(5);

  const { data: recentProposals } = await supabaseAdmin
    .from('proposals')
    .select('id, slug, status, created_at, lead:leads(name, company)')
    .order('created_at', { ascending: false })
    .limit(5);

  const conversionRate = totalLeads && totalLeads > 0 
    ? Math.round(((signedProposals || 0) / totalLeads) * 100) 
    : 0;

  return {
    totalLeads: totalLeads || 0,
    leadsThisWeek: leadsThisWeek || 0,
    leadsThisMonth: leadsThisMonth || 0,
    totalProposals: totalProposals || 0,
    pendingProposals: pendingProposals || 0,
    signedProposals: signedProposals || 0,
    conversionRate,
    recentLeads: recentLeads || [],
    recentProposals: recentProposals || [],
  };
}

export default async function AdminDashboard() {
  const stats = await getDashboardStats();

  const statCards = [
    { label: 'Total Leads', value: stats.totalLeads, icon: Users, color: 'blue' },
    { label: 'This Week', value: stats.leadsThisWeek, icon: TrendingUp, color: 'green' },
    { label: 'Proposals Sent', value: stats.totalProposals, icon: FileText, color: 'orange' },
    { label: 'Awaiting Signature', value: stats.pendingProposals, icon: Clock, color: 'yellow' },
    { label: 'Signed', value: stats.signedProposals, icon: CheckCircle, color: 'emerald' },
    { label: 'Conversion Rate', value: `${stats.conversionRate}%`, icon: Activity, color: 'purple' },
  ];

  const colorClasses: Record<string, string> = {
    blue: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
    green: 'bg-green-500/10 text-green-400 border-green-500/30',
    orange: 'bg-orange-500/10 text-orange-400 border-orange-500/30',
    yellow: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30',
    emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    purple: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
  };

  return (
    <div className="max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <p className="text-gray-400 mt-1">Overview of your leads and proposals</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className={`rounded-xl p-5 border ${colorClasses[stat.color]}`}
            >
              <div className="flex items-center gap-3 mb-3">
                <Icon className="w-5 h-5" />
                <span className="text-sm font-medium opacity-80">{stat.label}</span>
              </div>
              <p className="text-3xl font-bold">{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Leads */}
        <div className="bg-[#1A202C] rounded-xl border border-gray-800 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-800">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-[#F5A623]" />
              Recent Leads
            </h2>
          </div>
          <div className="divide-y divide-gray-800">
            {stats.recentLeads.length === 0 ? (
              <p className="px-6 py-8 text-gray-500 text-center">No leads yet</p>
            ) : (
              stats.recentLeads.map((lead: { id: string; name: string; email: string; company?: string; created_at: string }) => (
                <div key={lead.id} className="px-6 py-4 hover:bg-gray-800/50 transition-colors">
                  <p className="text-white font-medium">{lead.name}</p>
                  <p className="text-gray-400 text-sm">{lead.company || lead.email}</p>
                  <p className="text-gray-600 text-xs mt-1">
                    {new Date(lead.created_at).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Proposals */}
        <div className="bg-[#1A202C] rounded-xl border border-gray-800 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-800">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#F5A623]" />
              Recent Proposals
            </h2>
          </div>
          <div className="divide-y divide-gray-800">
            {stats.recentProposals.length === 0 ? (
              <p className="px-6 py-8 text-gray-500 text-center">No proposals yet</p>
            ) : (
              stats.recentProposals.map((proposal: { id: string; slug: string; status: string; created_at: string; lead?: { name: string; company?: string } | { name: string; company?: string }[] | null }) => {
                const leadData = Array.isArray(proposal.lead) ? proposal.lead[0] : proposal.lead;
                return (
                <div key={proposal.id} className="px-6 py-4 hover:bg-gray-800/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <p className="text-white font-medium">{leadData?.name || proposal.slug}</p>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      proposal.status === 'signed' 
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : proposal.status === 'sent'
                        ? 'bg-yellow-500/20 text-yellow-400'
                        : 'bg-gray-500/20 text-gray-400'
                    }`}>
                      {proposal.status}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm">{leadData?.company || ''}</p>
                  <p className="text-gray-600 text-xs mt-1">
                    {new Date(proposal.created_at).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              );})
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
