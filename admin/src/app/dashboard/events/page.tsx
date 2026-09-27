'use client';

import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, Save, X, Loader2, Calendar, MapPin } from 'lucide-react';
import toast from 'react-hot-toast';

interface Event {
  id: number;
  title: string;
  description: string | null;
  event_date: string | null;
  location: string | null;
  image_url: string | null;
  ratio: string | null;
  created_at: string;
}

const EMPTY = {
  title: '', description: '', event_date: '', location: '', image_url: '', ratio: '',
};

export default function EventsPage() {
  const [items, setItems] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState(EMPTY);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/content/events');
      const data = await res.json();
      setItems(Array.isArray(data) ? data : []);
    } catch { toast.error('Failed to load'); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchItems(); }, []);

  const handleCreate = () => { setForm(EMPTY); setEditingId(null); setShowForm(true); };

  const handleEdit = (item: Event) => {
    setForm({
      title: item.title || '',
      description: item.description || '',
      event_date: item.event_date || '',
      location: item.location || '',
      image_url: item.image_url || '',
      ratio: item.ratio || '',
    });
    setEditingId(item.id);
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) { toast.error('Title required'); return; }
    setSaving(true);
    try {
      const url = editingId ? `/api/admin/content/events/${editingId}` : '/api/admin/content/events';
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

  const handleDelete = async (id: number, title: string) => {
    if (!confirm(`Delete "${title}"?`)) return;
    try {
      await fetch(`/api/admin/content/events/${id}`, { method: 'DELETE' });
      toast.success('Deleted'); fetchItems();
    } catch { toast.error('Failed to delete'); }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#0F223D]">Events</h1>
          <p className="text-gray-600 mt-1">Manage upcoming events.</p>
        </div>
        <button onClick={handleCreate} className="inline-flex items-center gap-2 px-6 py-3 bg-[#C9A227] text-white rounded-lg hover:bg-[#8B6914] font-semibold shadow-md">
          <Plus size={18} /> New Event
        </button>
      </div>

      {loading && <div className="flex justify-center py-20"><Loader2 className="animate-spin text-[#C9A227]" size={32} /></div>}

      {!loading && items.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center border border-gray-100">
          <Calendar className="mx-auto text-gray-300 mb-4" size={48} />
          <p className="text-gray-400 mb-4">No events yet.</p>
          <button onClick={handleCreate} className="px-4 py-2 bg-[#C9A227] text-white rounded-lg hover:bg-[#8B6914]">
            Create your first event
          </button>
        </div>
      )}

      {!loading && items.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition">
              <div className="relative h-40 bg-gradient-to-br from-[#0F223D] to-[#1a2a4a]">
                {item.image_url ? (
                  <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                ) : (
                  <div className="flex items-center justify-center h-full text-white/40"><Calendar size={32} /></div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-bold text-[#0F223D] mb-2 line-clamp-1">{item.title}</h3>
                <p className="text-sm text-gray-500 line-clamp-2 mb-3">{item.description}</p>
                <div className="space-y-1 mb-3">
                  {item.event_date && (
                    <div className="flex items-center gap-1.5 text-xs text-gray-400">
                      <Calendar size={12} /> {item.event_date}
                    </div>
                  )}
                  {item.location && (
                    <div className="flex items-center gap-1.5 text-xs text-gray-400">
                      <MapPin size={12} /> <span className="truncate">{item.location}</span>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
                  <button onClick={() => handleEdit(item)} className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition">
                    <Pencil size={14} /> Edit
                  </button>
                  <button onClick={() => handleDelete(item.id, item.title)} className="inline-flex items-center justify-center px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full my-8">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="text-xl font-bold text-[#0F223D]">{editingId ? 'Edit Event' : 'New Event'}</h2>
              <button onClick={() => setShowForm(false)} className="p-1 hover:bg-gray-100 rounded-lg"><X size={20} /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9A227]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9A227] resize-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input type="date" value={form.event_date} onChange={(e) => setForm({ ...form, event_date: e.target.value })} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9A227]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input type="text" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9A227]" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                <input type="url" value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9A227] text-sm" placeholder="https://res.cloudinary.com/..." />
                {form.image_url && <div className="mt-2 w-32 h-20 rounded overflow-hidden border border-gray-200"><img src={form.image_url} alt="Preview" className="w-full h-full object-cover" /></div>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Aspect Ratio (e.g., "16:9", "1:1")</label>
                <input type="text" value={form.ratio} onChange={(e) => setForm({ ...form, ratio: e.target.value })} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9A227]" placeholder="16:9" />
              </div>
              <div className="flex gap-3 pt-4 border-t border-gray-100">
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