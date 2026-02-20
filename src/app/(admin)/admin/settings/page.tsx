'use client';

import { useState, useEffect } from 'react';
import { Package, Save, Plus, Trash2, DollarSign, AlertCircle } from 'lucide-react';

interface Addon {
  id: string;
  name: string;
  description: string;
  price: number;
  is_active: boolean;
}

export default function SettingsPage() {
  const [addons, setAddons] = useState<Addon[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchAddons();
  }, []);

  const fetchAddons = async () => {
    try {
      const res = await fetch('/api/admin/addons');
      const data = await res.json();
      if (data.addons) {
        setAddons(data.addons);
      }
    } catch (err) {
      console.error('Failed to fetch addons:', err);
      setError('Failed to load add-ons');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setError('');
    setSuccess('');

    try {
      const res = await fetch('/api/admin/addons', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ addons }),
      });

      if (res.ok) {
        setSuccess('Add-ons saved successfully!');
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError('Failed to save add-ons');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const updateAddon = (id: string, field: keyof Addon, value: string | number | boolean) => {
    setAddons(addons.map(addon => 
      addon.id === id ? { ...addon, [field]: value } : addon
    ));
  };

  const addNewAddon = () => {
    const newAddon: Addon = {
      id: `new-${Date.now()}`,
      name: '',
      description: '',
      price: 0,
      is_active: true,
    };
    setAddons([...addons, newAddon]);
  };

  const removeAddon = (id: string) => {
    setAddons(addons.filter(addon => addon.id !== id));
  };

  if (loading) {
    return (
      <div className="max-w-7xl">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-800 rounded w-48 mb-4"></div>
          <div className="h-4 bg-gray-800 rounded w-64 mb-8"></div>
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-24 bg-gray-800 rounded-xl"></div>
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
            <Package className="w-8 h-8 text-[#F5A623]" />
            Add-on Settings
          </h1>
          <p className="text-gray-400 mt-1">Manage pricing for proposal add-ons</p>
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
        {addons.map((addon) => (
          <div
            key={addon.id}
            className={`bg-[#1A202C] rounded-xl border p-6 transition-all ${
              addon.is_active ? 'border-gray-800' : 'border-gray-800/50 opacity-60'
            }`}
          >
            <div className="grid gap-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Name</label>
                    <input
                      type="text"
                      value={addon.name}
                      onChange={(e) => updateAddon(addon.id, 'name', e.target.value)}
                      className="w-full px-3 py-2 bg-[#0F1419] border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#F5A623] focus:border-transparent"
                      placeholder="Add-on name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Monthly Price</label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <input
                        type="number"
                        value={addon.price}
                        onChange={(e) => updateAddon(addon.id, 'price', parseInt(e.target.value) || 0)}
                        className="w-full pl-8 pr-3 py-2 bg-[#0F1419] border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#F5A623] focus:border-transparent"
                        placeholder="0"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={addon.is_active}
                      onChange={(e) => updateAddon(addon.id, 'is_active', e.target.checked)}
                      className="w-4 h-4 rounded border-gray-600 bg-gray-800 text-[#F5A623] focus:ring-[#F5A623] focus:ring-offset-0"
                    />
                    <span className="text-sm text-gray-400">Active</span>
                  </label>
                  <button
                    onClick={() => removeAddon(addon.id)}
                    className="p-2 text-gray-500 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Description</label>
                <textarea
                  value={addon.description}
                  onChange={(e) => updateAddon(addon.id, 'description', e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 bg-[#0F1419] border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#F5A623] focus:border-transparent resize-none"
                  placeholder="Brief description of this add-on..."
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={addNewAddon}
        className="mt-4 w-full py-4 border-2 border-dashed border-gray-700 hover:border-[#F5A623] rounded-xl text-gray-400 hover:text-[#F5A623] transition-colors flex items-center justify-center gap-2"
      >
        <Plus className="w-5 h-5" />
        Add New Add-on
      </button>
    </div>
  );
}
