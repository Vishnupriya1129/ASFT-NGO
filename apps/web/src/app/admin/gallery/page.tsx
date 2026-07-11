'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Plus, Trash, X } from 'lucide-react';

interface GalleryItem {
  id: number;
  title: string;
  image_url: string;
  year: number;
  event: string;
  caption: string;
}

export default function AdminGallery() {
  const router = useRouter();
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/admin/login');
        return;
      }
      loadGallery();
    };
    checkAuth();
  }, [router]);

  const loadGallery = async () => {
    const { data } = await supabase
      .from('gallery')
      .select('*')
      .order('year', { ascending: false });
    if (data) setItems(data);
    setLoading(false);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this image?')) return;
    await supabase.from('gallery').delete().eq('id', id);
    loadGallery();
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const data = {
      title: formData.get('title') as string,
      image_url: formData.get('image_url') as string,
      year: parseInt(formData.get('year') as string),
      event: formData.get('event') as string,
      caption: formData.get('caption') as string,
    };

    await supabase.from('gallery').insert(data);
    setShowForm(false);
    loadGallery();
  };

  if (loading) return <div className="p-10 text-gray-500">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-primary-500">Gallery</h1>
          <button
            onClick={() => setShowForm(true)}
            className="btn-primary inline-flex items-center gap-2"
          >
            <Plus size={18} /> Add Image
          </button>
        </div>

        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-lg w-full p-8 relative">
              <button
                onClick={() => setShowForm(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
              <h2 className="text-xl font-bold mb-4">Add Gallery Image</h2>
              <form onSubmit={handleSave} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium">Title</label>
                  <input name="title" className="w-full border rounded-lg px-4 py-2" required />
                </div>
                <div>
                  <label className="block text-sm font-medium">Image URL</label>
                  <input name="image_url" className="w-full border rounded-lg px-4 py-2" required />
                </div>
                <div>
                  <label className="block text-sm font-medium">Year</label>
                  <input name="year" type="number" className="w-full border rounded-lg px-4 py-2" required />
                </div>
                <div>
                  <label className="block text-sm font-medium">Event</label>
                  <input name="event" className="w-full border rounded-lg px-4 py-2" required />
                </div>
                <div>
                  <label className="block text-sm font-medium">Caption</label>
                  <input name="caption" className="w-full border rounded-lg px-4 py-2" />
                </div>
                <button type="submit" className="w-full bg-primary-500 text-white py-2 rounded-lg hover:bg-primary-600">
                  Add Image
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow overflow-hidden">
              <div className="relative h-40 bg-gray-200">
                <Image
                  src={item.image_url}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-3">
                <p className="font-semibold text-sm truncate">{item.title}</p>
                <p className="text-xs text-gray-500">{item.year} – {item.event}</p>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="mt-2 text-red-500 hover:text-red-700 text-sm flex items-center gap-1"
                >
                  <Trash size={14} /> Delete
                </button>
              </div>
            </div>
          ))}
          {items.length === 0 && (
            <div className="col-span-full text-center py-12 text-gray-500">
              No images in gallery. Click "Add Image" to upload.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}