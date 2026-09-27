'use client';

import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, Save, X, Loader2, Users, Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string | null;
  image_url: string | null;
  linkedin_url: string | null;
  years: number;
  is_founder: boolean;
  testimonial: string | null;
  sort_order: number;
  is_active: boolean;
  created_at: string;
}

const EMPTY = {
  name: '', role: '', bio: '', image_url: '', linkedin_url: '',
  years: '0', is_founder: false, testimonial: '', sort_order: '0', is_active: true,
};

export default function TeamPage() {
  const [items, setItems] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/content/team');
      const data = await res.json();
      setItems(Array.isArray(data) ? data : []);
    } catch { toast.error('Failed'); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchItems(); }, []);

  const handleCreate = () => { setForm(EMPTY); setEditingId(null); setShowForm(true); };

  const handleEdit = (item: TeamMember) => {
    setForm({
      name: item.name,
      role: item.role,
      bio: item.bio || '',
      image_url: item.image_url || '',
      linkedin_url: item.linkedin_url || '',
      years: item.years?.toString() || '0',
      is_founder: item.is_founder,
      testimonial: item.testimonial || '',
      sort_order: item.sort_order?.toString() || '0',
      is_active: item.is_active,
    });
    setEditingId(item.id);
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.role.trim()) { toast.error('Name and role required'); return; }
    setSaving(true);
    try {
      const url = editingId ? `/api/admin/content/team/${editingId}` : '/api/admin/content/team';
      const res = await fetch(url, {
        method: editingId ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      toast.success(editingId ? 'Updated!' : 'Created!');
      setShowForm(false); setForm(EMPTY); setEditingId(null); fetchItems();
    } catch { toast.error('Failed to save'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete "${name}" from the team?`)) return;
    try {
      await fetch(`/api/admin/content/team/${id}`, { method: 'DELETE' });
      toast.success('Deleted'); fetchItems();
    } catch { toast.error('Failed to delete'); }
  };

  const handleToggle = async (item: TeamMember) => {
    try {
      await fetch(`/api/admin/content/team/${item.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...item, is_active: !item.is_active }),
      });
      toast.success(item.is_active ? 'Hidden' : 'Visible');
      fetchItems();
    } catch { toast.error('Failed'); }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#0F223D]">Team Members</h1>
          <p className="text-gray-600 mt-1">Manage core team members.</p>
        </div>
        <button onClick={handleCreate} className="inline-flex items-center gap-2 px-6 py-3 bg-[#C9A227] text-white rounded-lg hover:bg-[#8B6914] font-semibold shadow-md">
          <Plus size={18} /> New Member
        </button>
      </div>

      {loading && <div className="flex justify-center py-20"><Loader2 className="animate-spin text-[#C9A227]" size={32} /></div>}

      {!loading && items.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center border border-gray-100">
          <Users className="mx-auto text-gray-300 mb-4" size={48} />
          <p className="text-gray-400 mb-4">No team members yet.</p>
          <button onClick={handleCreate} className="px-4 py-2 bg-[#C9A227] text-white rounded-lg">Add your first member</button>
        </div>
      )}

      {!loading && items.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div key={item.id} className={`bg-white rounded-xl shadow-md p-6 border-2 transition ${item.is_active ? 'border-[#C9A227]/20' : 'border-gray-200 opacity-70'}`}>
              <div className="flex items-start gap-4">
                {item.image_url ? (
                  <img src={item.image_url} alt={item.name} className="w-16 h-16 rounded-full object-cover border-2 border-[#C9A227]/30" />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-[#0F223D] flex items-center justify-center text-white font-bold text-xl">{item.name.charAt(0)}</div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-bold text-[#0F223D] truncate">{item.name}</p>
                    {item.is_founder && <span className="text-[9px] bg-[#C9A227] text-white px-2 py-0.5 rounded-full">FOUNDER</span>}
                  </div>
                  <p className="text-xs text-[#C9A227] font-medium mt-0.5">{item.role}</p>
                  <p className="text-[10px] text-gray-400 mt-1">{item.years}+ years</p>
                </div>
              </div>
              {item.bio && <p className="text-sm text-gray-600 line-clamp-3 mt-4">{item.bio}</p>}
              <div className="flex items-center gap-2 pt-4 mt-4 border-t border-gray-100">
                <button onClick={() => handleEdit(item)} className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition">
                  <Pencil size={14} /> Edit
                </button>
                <button onClick={() => handleToggle(item)} className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-sm text-amber-600 hover:bg-amber-50 rounded-lg transition">
                  {item.is_active ? <><EyeOff size={14} /> Hide</> : <><Eye size={14} /> Show</>}
                </button>
                <button onClick={() => handleDelete(item.id, item.name)} className="inline-flex items-center justify-center px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full my-8">
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <h2 className="text-xl font-bold text-[#0F223D]">{editingId ? 'Edit Member' : 'New Member'}</h2>
              <button onClick={() => setShowForm(false)} className="p-1 hover:bg-gray-100 rounded-lg"><X size={20} /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                  <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9A227]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Role *</label>
                  <input type="text" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} required className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9A227]" placeholder="e.g., Core Team Member" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                <textarea value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} rows={3} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9A227] resize-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Testimonial (optional)</label>
                <textarea value={form.testimonial} onChange={(e) => setForm({ ...form, testimonial: e.target.value })} rows={3} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9A227] resize-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                <input type="url" value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9A227] text-sm" />
                {form.image_url && <div className="mt-2 w-16 h-16 rounded-full overflow-hidden border border-gray-200"><img src={form.image_url} alt="Preview" className="w-full h-full object-cover" /></div>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn URL</label>
                <input type="url" value={form.linkedin_url} onChange={(e) => setForm({ ...form, linkedin_url: e.target.value })} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9A227] text-sm" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Years of Service</label>
                  <input type="number" step="0.5" value={form.years} onChange={(e) => setForm({ ...form, years: e.target.value })} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9A227]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sort Order</label>
                  <input type="number" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: e.target.value })} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9A227]" />
                </div>
              </div>
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                  <input type="checkbox" checked={form.is_founder} onChange={(e) => setForm({ ...form, is_founder: e.target.checked })} className="w-5 h-5 text-[#C9A227] rounded" />
                  Founder
                </label>
                <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                  <input type="checkbox" checked={form.is_active} onChange={(e) => setForm({ ...form, is_active: e.target.checked })} className="w-5 h-5 text-[#C9A227] rounded" />
                  Active (visible on site)
                </label>
              </div>
              <div className="flex gap-3 pt-4 border-t">
                <button type="submit" disabled={saving} className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#C9A227] text-white rounded-lg hover:bg-[#8B6914] disabled:opacity-50 font-semibold">
                  {saving ? <><Loader2 size={16} className="animate-spin" /> Saving...</> : <><Save size={16} /> {editingId ? 'Update' : 'Create'}</>}
                </button>
                <button type="button" onClick={() => setShowForm(false)} className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}