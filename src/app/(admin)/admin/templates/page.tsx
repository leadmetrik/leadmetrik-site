'use client';

import { useState, useEffect } from 'react';
import { FolderOpen, Save, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';

interface Template {
  id: string;
  industry: string;
  display_name: string;
  base_monthly_price: number;
  setup_fee: number;
  executive_summary: string;
  target_keywords: string[];
  seo_deliverables: string[];
  is_active: boolean;
}

export default function TemplatesPage() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      const res = await fetch('/api/admin/templates');
      const data = await res.json();
      if (data.templates) {
        setTemplates(data.templates);
      }
    } catch (err) {
      console.error('Failed to fetch templates:', err);
      setError('Failed to load templates');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setError('');
    setSuccess('');

    try {
      const res = await fetch('/api/admin/templates', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ templates }),
      });

      if (res.ok) {
        setSuccess('Templates saved successfully!');
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError('Failed to save templates');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const updateTemplate = (id: string, field: keyof Template, value: string | number | boolean | string[]) => {
    setTemplates(templates.map(template => 
      template.id === id ? { ...template, [field]: value } : template
    ));
  };

  const industryColors: Record<string, string> = {
    medical: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    venue: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    'home-services': 'bg-green-500/20 text-green-400 border-green-500/30',
    'small-business': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  };

  if (loading) {
    return (
      <div className="max-w-7xl">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-800 rounded w-48 mb-4"></div>
          <div className="h-4 bg-gray-800 rounded w-64 mb-8"></div>
          <div className="space-y-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-20 bg-gray-800 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <FolderOpen className="w-8 h-8 text-[#F5A623]" />
            Industry Templates
          </h1>
          <p className="text-gray-400 mt-1">Customize proposal content per industry</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#F5A623] hover:bg-[#E09000] text-[#1A202C] font-semibold rounded-lg transition-colors disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg mb-6 flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          {error}
        </div>
      )}

      {success && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-4 py-3 rounded-lg mb-6">
          {success}
        </div>
      )}

      <div className="space-y-4">
        {templates.map((template) => {
          const isExpanded = expandedId === template.id;
          return (
            <div
              key={template.id}
              className={`bg-[#1A202C] rounded-xl border transition-all ${
                template.is_active ? 'border-gray-800' : 'border-gray-800/50 opacity-60'
              }`}
            >
              {/* Header */}
              <button
                onClick={() => setExpandedId(isExpanded ? null : template.id)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-800/30 transition-colors rounded-xl"
              >
                <div className="flex items-center gap-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium border ${industryColors[template.industry] || 'bg-gray-500/20 text-gray-400'}`}>
                    {template.display_name}
                  </span>
                  <span className="text-gray-400 text-sm">
                    ${template.base_monthly_price}/mo • ${template.setup_fee} setup
                  </span>
                </div>
                {isExpanded ? (
                  <ChevronUp className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </button>

              {/* Expanded Content */}
              {isExpanded && (
                <div className="px-6 pb-6 space-y-4 border-t border-gray-800">
                  <div className="pt-4 grid sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">Display Name</label>
                      <input
                        type="text"
                        value={template.display_name}
                        onChange={(e) => updateTemplate(template.id, 'display_name', e.target.value)}
                        className="w-full px-3 py-2 bg-[#0F1419] border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#F5A623]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">Monthly Price</label>
                      <input
                        type="number"
                        value={template.base_monthly_price}
                        onChange={(e) => updateTemplate(template.id, 'base_monthly_price', parseInt(e.target.value) || 0)}
                        className="w-full px-3 py-2 bg-[#0F1419] border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#F5A623]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">Setup Fee</label>
                      <input
                        type="number"
                        value={template.setup_fee}
                        onChange={(e) => updateTemplate(template.id, 'setup_fee', parseInt(e.target.value) || 0)}
                        className="w-full px-3 py-2 bg-[#0F1419] border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#F5A623]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Executive Summary</label>
                    <textarea
                      value={template.executive_summary}
                      onChange={(e) => updateTemplate(template.id, 'executive_summary', e.target.value)}
                      rows={4}
                      className="w-full px-3 py-2 bg-[#0F1419] border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#F5A623] resize-none"
                      placeholder="Industry-specific executive summary..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                      Target Keywords (one per line)
                    </label>
                    <textarea
                      value={template.target_keywords.join('\n')}
                      onChange={(e) => updateTemplate(template.id, 'target_keywords', e.target.value.split('\n').filter(k => k.trim()))}
                      rows={4}
                      className="w-full px-3 py-2 bg-[#0F1419] border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#F5A623] resize-none font-mono text-sm"
                      placeholder="weight loss las vegas&#10;medical spa near me&#10;..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                      SEO Deliverables (one per line)
                    </label>
                    <textarea
                      value={template.seo_deliverables.join('\n')}
                      onChange={(e) => updateTemplate(template.id, 'seo_deliverables', e.target.value.split('\n').filter(d => d.trim()))}
                      rows={4}
                      className="w-full px-3 py-2 bg-[#0F1419] border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#F5A623] resize-none font-mono text-sm"
                      placeholder="Technical SEO audit&#10;Google Business Profile optimization&#10;..."
                    />
                  </div>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={template.is_active}
                      onChange={(e) => updateTemplate(template.id, 'is_active', e.target.checked)}
                      className="w-4 h-4 rounded border-gray-600 bg-gray-800 text-[#F5A623] focus:ring-[#F5A623]"
                    />
                    <span className="text-sm text-gray-400">Template active</span>
                  </label>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
