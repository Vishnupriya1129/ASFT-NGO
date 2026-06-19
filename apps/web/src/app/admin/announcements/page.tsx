'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function AnnouncementsAdminPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [announcements, setAnnouncements] = useState<any[]>([]);

  async function loadAnnouncements() {
    const { data } = await supabase
      .from('announcements')
      .select('*')
      .order('created_at', { ascending: false });

    setAnnouncements(data || []);
  }

async function addAnnouncement() {
  console.log("FUNCTION STARTED");

  const result = await supabase
    .from('announcements')
    .insert([
      {
        title,
        content,
      },
    ]);

  console.log("RESULT:", result);

  setTitle('');
  setContent('');

  loadAnnouncements();
}

  useEffect(() => {
    loadAnnouncements();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        Announcements CMS
      </h1>

      <div className="space-y-4 max-w-lg">
        <input
          className="border p-3 w-full"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="border p-3 w-full"
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <button
          onClick={() => {
          console.log("BUTTON CLICKED");
          addAnnouncement();
      }}
         className="bg-blue-600 text-white px-5 py-2 rounded"
        >
         Add Announcement
        </button>
      </div>

      <div className="mt-10">
        {announcements.map((item) => (
          <div
            key={item.id}
            className="border p-4 mb-3 rounded"
          >
            <h3 className="font-bold">
              {item.title}
            </h3>

            <p>{item.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}