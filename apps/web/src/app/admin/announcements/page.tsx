'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { Plus, Pencil, Trash, X } from 'lucide-react';

interface Announcement {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  image: string;
  alt: string;
  status: string;
  google_form_url: string;
  created_at?: string;
}

export default function AdminAnnouncements() {
  const router = useRouter();
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Announcement | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/admin/login');
        return;
      }
      loadAnnouncements();
    };
    checkAuth();
  }, [router]);

  const loadAnnouncements = async () => {
    const { data } = await supabase
      .from('announcements')
      .select('*')
      .order('id', { ascending: false });
    if (data) setAnnouncements(data);
    setLoading(false);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this announcement?')) return;
    await supabase.from('announcements').delete().eq('id', id);
    loadAnnouncements();
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
      image: formData.get('image') as string,
      alt: formData.get('alt') as string,
      status: formData.get('status') as string,
      google_form_url: formData.get('google_form_url') as string,
    };

    try {
      let result;
      if (editing) {
        result = await supabase
          .from('announcements')
          .update(data)
          .eq('id', editing.id);
      } else {
        result = await supabase
          .from('announcements')
          .insert(data);
      }

      if (result.error) {
        alert('❌ Error: ' + result.error.message);
        console.error(result.error);
      } else {
        setShowForm(false);
        setEditing(null);
        loadAnnouncements();
        alert('✅ Announcement saved successfully!');
      }
    } catch (err) {
      alert('❌ Unexpected error: ' + err);
    }
  };

  if (loading) return <div className="p-10 text-gray-500">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-primary-500">Announcements</h1>
          <button
            onClick={() => { setEditing(null); setShowForm(true); }}
            className="btn-primary inline-flex items-center gap-2"
          >
            <Plus size={18} /> Add Announcement
          </button>
        </div>

        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-lg w-full p-8 relative max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => { setShowForm(false); setEditing(null); }}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
              <h2 className="text-xl font-bold mb-4">
                {editing ? 'Edit Announcement' : 'Add Announcement'}
              </h2>
              <form onSubmit={handleSave} className="space-y-4">
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium">Title *</label>
                  <input
                    name="title"
                    defaultValue={editing?.title || ''}
                    className="w-full border rounded-lg px-4 py-2"
                    required
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium">Description *</label>
                  <textarea
                    name="description"
                    defaultValue={editing?.description || ''}
                    className="w-full border rounded-lg px-4 py-2 h-24"
                    required
                  />
                </div>

                {/* Date */}
                <div>
                  <label className="block text-sm font-medium">Date</label>
                  <input
                    name="date"
                    type="date"
                    defaultValue={editing?.date || ''}
                    className="w-full border rounded-lg px-4 py-2"
                  />
                </div>

                {/* Time */}
                <div>
                  <label className="block text-sm font-medium">Time</label>
                  <input
                    name="time"
                    type="time"
                    defaultValue={editing?.time || ''}
                    className="w-full border rounded-lg px-4 py-2"
                  />
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-medium">Location</label>
                  <input
                    name="location"
                    defaultValue={editing?.location || ''}
                    className="w-full border rounded-lg px-4 py-2"
                  />
                </div>

                {/* Image URL */}
                <div>
                  <label className="block text-sm font-medium">Image URL</label>
                  <input
                    name="image"
                    defaultValue={editing?.image || ''}
                    className="w-full border rounded-lg px-4 py-2"
                    placeholder="https://..."
                  />
                </div>

                {/* Alt Text */}
                <div>
                  <label className="block text-sm font-medium">Alt Text</label>
                  <input
                    name="alt"
                    defaultValue={editing?.alt || ''}
                    className="w-full border rounded-lg px-4 py-2"
                    placeholder="Image description for accessibility"
                  />
                </div>

                {/* Status */}
                <div>
                  <label className="block text-sm font-medium">Status</label>
                  <select
                    name="status"
                    defaultValue={editing?.status || 'upcoming'}
                    className="w-full border rounded-lg px-4 py-2"
                  >
                    <option value="upcoming">Upcoming</option>
                    <option value="ongoing">Ongoing</option>
                    <option value="past">Past</option>
                  </select>
                </div>

                {/* Google Form URL */}
                <div>
                  <label className="block text-sm font-medium">Google Form URL</label>
                  <input
                    name="google_form_url"
                    defaultValue={editing?.google_form_url || ''}
                    className="w-full border rounded-lg px-4 py-2"
                    placeholder="https://forms.gle/your-form-id"
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    Link for "Apply Now" button on events page
                  </p>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-primary-500 text-white py-2 rounded-lg hover:bg-primary-600"
                >
                  {editing ? 'Update' : 'Create'} Announcement
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Table List */}
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
              {announcements.map((a) => (
                <tr key={a.id}>
                  <td className="px-6 py-4">{a.title}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{a.date || '—'}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      a.status === 'ongoing' ? 'bg-green-100 text-green-800' :
                      a.status === 'past' ? 'bg-gray-100 text-gray-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {a.status || 'upcoming'}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex gap-2">
                    <button
                      onClick={() => { setEditing(a); setShowForm(true); }}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(a.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash size={18} />
                    </button>
                  </td>
                </tr>
              ))}
              {announcements.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                    No announcements yet. Click "Add Announcement" to create one.
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