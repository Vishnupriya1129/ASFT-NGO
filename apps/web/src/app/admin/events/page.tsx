'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { Plus, Pencil, Trash, X } from 'lucide-react';

const supabase = createClient();

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  image_url: string;
  status: string;
}

export default function AdminEvents() {
  const router = useRouter();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Event | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/admin/login');
        return;
      }
      loadEvents();
    };
    checkAuth();
  }, [router]);

  const loadEvents = async () => {
    const { data } = await supabase
      .from('events')
      .select('*')
      .order('id', { ascending: false });
    if (data) setEvents(data);
    setLoading(false);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this event?')) return;
    await supabase.from('events').delete().eq('id', id);
    loadEvents();
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const data = {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      date: formData.get('date') as string,
      time: formData.get('time') as string,
      location: formData.get('location') as string,
      image_url: formData.get('image_url') as string,
      status: formData.get('status') as string || 'upcoming',
    };

    if (editing) {
      await supabase.from('events').update(data).eq('id', editing.id);
    } else {
      await supabase.from('events').insert(data);
    }
    setShowForm(false);
    setEditing(null);
    loadEvents();
  };

  if (loading) return <div className="p-10 text-gray-500">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-primary-500">Events</h1>
          <button
            onClick={() => { setEditing(null); setShowForm(true); }}
            className="btn-primary inline-flex items-center gap-2"
          >
            <Plus size={18} /> Add Event
          </button>
        </div>

        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-lg w-full p-8 relative">
              <button
                onClick={() => { setShowForm(false); setEditing(null); }}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
              <h2 className="text-xl font-bold mb-4">
                {editing ? 'Edit Event' : 'Add Event'}
              </h2>
              <form onSubmit={handleSave} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium">Title</label>
                  <input
                    name="title"
                    defaultValue={editing?.title || ''}
                    className="w-full border rounded-lg px-4 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Description</label>
                  <textarea
                    name="description"
                    defaultValue={editing?.description || ''}
                    className="w-full border rounded-lg px-4 py-2 h-20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Date</label>
                  <input
                    name="date"
                    defaultValue={editing?.date || ''}
                    className="w-full border rounded-lg px-4 py-2"
                    placeholder="e.g., July 19, 2026"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Time</label>
                  <input
                    name="time"
                    defaultValue={editing?.time || ''}
                    className="w-full border rounded-lg px-4 py-2"
                    placeholder="e.g., 7:00 AM – 10:00 AM"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Location</label>
                  <input
                    name="location"
                    defaultValue={editing?.location || ''}
                    className="w-full border rounded-lg px-4 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Image URL</label>
                  <input
                    name="image_url"
                    defaultValue={editing?.image_url || ''}
                    className="w-full border rounded-lg px-4 py-2"
                    placeholder="https://..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Status</label>
                  <select
                    name="status"
                    defaultValue={editing?.status || 'upcoming'}
                    className="w-full border rounded-lg px-4 py-2"
                  >
                    <option value="upcoming">Upcoming</option>
                    <option value="ongoing">Ongoing</option>
                  </select>
                </div>
                <button type="submit" className="w-full bg-primary-500 text-white py-2 rounded-lg hover:bg-primary-600">
                  {editing ? 'Update' : 'Create'} Event
                </button>
              </form>
            </div>
          </div>
        )}

        {/* List */}
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {events.map((e) => (
                <tr key={e.id}>
                  <td className="px-6 py-4">{e.title}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{e.date || '—'}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      e.status === 'ongoing' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {e.status || 'upcoming'}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex gap-2">
                    <button
                      onClick={() => { setEditing(e); setShowForm(true); }}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(e.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash size={18} />
                    </button>
                  </td>
                </tr>
              ))}
              {events.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                    No events yet. Click "Add Event" to create one.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
