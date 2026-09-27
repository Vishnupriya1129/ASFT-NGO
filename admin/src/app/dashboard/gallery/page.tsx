'use client';

import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, Save, X, Loader2, Image as ImageIcon } from 'lucide-react';
import toast from 'react-hot-toast';

interface GalleryItem {
  id: number;
  image_url: string;
  year: number | null;
  event: string | null;
  title: string | null;
  caption: string | null;
  span: string | null;
  created_at: string;
}

const EMPTY = { image_url: '', year: '', event: '', title: '', caption: '', span: '' };

export default function GalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState(EMPTY);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/content/gallery');
      const data = await res.json();
      setItems(Array.isArray(data) ? data : []);
    } catch { toast.error('Failed'); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchItems(); }, []);

  const handleCreate = () => { setForm(EMPTY); setEditingId(null); setShowForm(true); };
  const handleEdit = (item: GalleryItem) => {
    setForm({
      image_url: item.image_url || '',
      year: item.year?.toString() || '',
      event: item.event || '',
      title: item.title || '',
      caption: item.caption || '',
      span: item.span || '',
    });
    setEditingId(item.id);
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.image_url.trim()) { toast.error('Image URL required'); return; }
    setSaving(true);
    try {
      const url = editingId ? `/api/admin/content/gallery/${editingId}` : '/api/admin/content/gallery';
      const res = await fetch(url, {
        method: editingId ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      toast.success(editingId ? 'Updated!' : 'Added!');
      setShowForm(false); setForm(EMPTY); setEditingId(null); fetchItems();
    } catch { toast.error('Failed to save'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this image?')) return;
    try {
      await fetch(`/api/admin/content/gallery/${id}`, { method: 'DELETE' });
      toast.success('Deleted'); fetchItems();
    } catch { toast.error('Failed to delete'); }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#0F223D]">Gallery</h1>
          <p className="text-gray-600 mt-1">Manage images shown in the gallery.</p>
        </div>
        <button onClick={handleCreate} className="inline-flex items-center gap-2 px-6 py-3 bg-[#C9A227] text-white rounded-lg hover:bg-[#8B6914] font-semibold shadow-md">
          <Plus size={18} /> Add Image
        </button>
      </div>

      {loading && <div className="flex justify-center py-20"><Loader2 className="animate-spin text-[#C9A227]" size={32} /></div>}

      {!loading && items.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center border border-gray-100">
          <ImageIcon className="mx-auto text-gray-300 mb-4" size={48} />
          <p className="text-gray-400 mb-4">No images yet.</p>
          <button onClick={handleCreate} className="px-4 py-2 bg-[#C9A227] text-white rounded-lg">Add your first image</button>
        </div>
      )}

      {!loading && items.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((item) => (
            <div key={item.id} className="group relative bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition">
              <div className="relative aspect-square bg-gray-100">
                <img src={item.image_url} alt={item.title || 'Gallery'} className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
              </div>
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition flex gap-1">
                <button onClick={() => handleEdit(item)} className="p-2 bg-white/90 backdrop-blur rounded-lg shadow hover:bg-white text-blue-600"><Pencil size={14} /></button>
                <button onClick={() => handleDelete(item.id)} className="p-2 bg-white/90 backdrop-blur rounded-lg shadow hover:bg-white text-red-600"><Trash2 size={14} /></button>
              </div>
              <div className="p-3">
                <p className="text-xs font-semibold text-[#0F223D] truncate">{item.title || 'Untitled'}</p>
                <p className="text-[10px] text-gray-400 truncate">{item.event} {item.year && `• ${item.year}`}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full my-8">
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <h2 className="text-xl font-bold text-[#0F223D]">{editingId ? 'Edit Image' : 'Add Image'}</h2>
              <button onClick={() => setShowForm(false)} className="p-1 hover:bg-gray-100 rounded-lg"><X size={20} /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL *</label>
                <input type="url" value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} required className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9A227] text-sm" />
                {form.image_url && <div className="mt-2 w-32 h-32 rounded-lg overflow-hidden border border-gray-200"><img src={form.image_url} alt="Preview" className="w-full h-full object-cover" /></div>}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                  <input type="number" value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9A227]" placeholder="2024" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Event</label>
                  <input type="text" value={form.event} onChange={(e) => setForm({ ...form, event: e.target.value })} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9A227]" placeholder="Event name" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9A227]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Caption</label>
                <textarea value={form.caption} onChange={(e) => setForm({ ...form, caption: e.target.value })} rows={2} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9A227] resize-none" />
              </div>
              <div className="flex gap-3 pt-4 border-t">
                <button type="submit" disabled={saving} className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#C9A227] text-white rounded-lg hover:bg-[#8B6914] disabled:opacity-50 font-semibold">
                  {saving ? <><Loader2 size={16} className="animate-spin" /> Saving...</> : <><Save size={16} /> {editingId ? 'Update' : 'Add'}</>}
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