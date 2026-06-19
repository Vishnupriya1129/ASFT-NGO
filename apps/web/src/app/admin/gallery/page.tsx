'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function GalleryAdminPage() {
  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [caption, setCaption] = useState('');
  const [span, setSpan] = useState<'normal' | 'wide' | 'large'>('normal');
  const [gallery, setGallery] = useState<any[]>([]);

  async function loadGallery() {
    const { data } = await supabase
      .from('gallery')
      .select('*')
      .order('created_at', { ascending: false });

    setGallery(data || []);
  }

  async function addImage() {
    await supabase.from('gallery').insert([
      {
        title,
        image_url: imageUrl,
        caption,
        span, // now uses the controlled span state
      },
    ]);

    setTitle('');
    setImageUrl('');
    setCaption('');
    setSpan('normal'); // reset to default

    loadGallery();
  }

  useEffect(() => {
    loadGallery();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Gallery CMS</h1>

      <div className="space-y-4 max-w-lg">
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-3 w-full"
        />

        <input
          placeholder="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="border p-3 w-full"
        />

        <textarea
          placeholder="Caption"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className="border p-3 w-full"
        />

        {/* NEW: span selector */}
        <select
          value={span}
          onChange={(e) =>
            setSpan(e.target.value as 'normal' | 'wide' | 'large')
          }
          className="border p-3 w-full"
        >
          <option value="normal">Normal</option>
          <option value="wide">Wide</option>
          <option value="large">Large</option>
        </select>

        <button
          onClick={addImage}
          className="bg-green-600 text-white px-5 py-2 rounded"
        >
          Add Image
        </button>
      </div>

      <div className="mt-10">
        {gallery.map((item) => (
          <div key={item.id} className="border p-4 mb-3">
            <img
              src={item.image_url}
              alt={item.title}
              className="w-40 h-40 object-cover"
            />
            <h3>{item.title}</h3>
            <p>{item.caption}</p>
            {/* Optional: display span */}
            <span className="text-xs text-gray-500 uppercase">
              Layout: {item.span}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}