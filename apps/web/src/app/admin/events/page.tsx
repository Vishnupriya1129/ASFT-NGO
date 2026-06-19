'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function EventsAdminPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    loadEvents();
  }, []);

  async function loadEvents() {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('event_date', { ascending: true });

    if (error) {
      console.error(error);
      return;
    }

    setEvents(data || []);
  }

  async function addEvent() {
    const { error } = await supabase
      .from('events')
      .insert([
        {
          title,
          description,
          location,
          image_url: imageUrl,
          event_date: eventDate,
        },
      ]);

    if (error) {
      alert(error.message);
      return;
    }

    setTitle('');
    setDescription('');
    setLocation('');
    setImageUrl('');
    setEventDate('');

    loadEvents();
  }

  async function deleteEvent(id: number) {
    await supabase
      .from('events')
      .delete()
      .eq('id', id);

    loadEvents();
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        Events CMS
      </h1>

      <div className="space-y-4 max-w-xl">
        <input
          className="border p-3 w-full"
          placeholder="Event Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="border p-3 w-full"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          className="border p-3 w-full"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <input
          className="border p-3 w-full"
          placeholder="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />

        <input
          type="date"
          className="border p-3 w-full"
          value={eventDate}
          onChange={(e) => setEventDate(e.target.value)}
        />

        <button
          onClick={addEvent}
          className="bg-green-600 text-white px-5 py-2 rounded"
        >
          Add Event
        </button>
      </div>

      <div className="mt-10 space-y-4">
        {events.map((event) => (
          <div
            key={event.id}
            className="border p-4 rounded"
          >
            <div className="flex justify-between items-center">
              <div>
                <h2 className="font-bold text-lg">
                  {event.title}
                </h2>

                <p className="text-gray-600">
                  {event.location}
                </p>

                <p className="text-sm text-gray-500">
                  {new Date(event.event_date).toLocaleDateString()}
                </p>
              </div>

              <button
                onClick={() => deleteEvent(event.id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>

            <p className="mt-3">
              {event.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}