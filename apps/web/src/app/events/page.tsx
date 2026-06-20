'use client';

import { useEffect, useState } from 'react';
import { Navbar } from '@/app/components/layout/Navbar';
import { Footer } from '@/app/components/layout/Footer';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';

export default function EventsPage() {
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    loadEvents();
  }, []);

  async function loadEvents() {
    if (!supabase) {
      console.error('Supabase is not configured');
      return;
    }

    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('event_date', { ascending: true });

    if (error) {
      console.error('Events Error:', error);
      return;
    }

    setEvents(data || []);
  }

  return (
    <>
      <Navbar />

      <main
        className="min-h-screen bg-gradient-to-b from-cloud to-earth-cream pt-24"
        id="main-content"
      >
        <section className="py-24">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <span className="section-tag">Events</span>

            <h1 className="font-serif text-5xl text-soil-dark mb-5">
              Join Our Next Community Events
            </h1>

            <p className="text-stone text-lg max-w-3xl mx-auto">
              Help us bring hope, meals, and learning to more communities with
              hands-on events across India.
            </p>
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-6 grid gap-8 lg:grid-cols-3 pb-24">
          {events.map((event) => (
            <article
              key={event.id}
              className="card overflow-hidden shadow-xl"
            >
              <div className="relative h-56 w-full bg-gradient-to-t from-soil-dark/80 to-transparent overflow-hidden">
                <Image
                  src={event.image_url}
                  alt={event.title}
                  width={800}
                  height={600}
                  className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-soil-dark/80 to-transparent" />
              </div>

              <div className="p-6">
                <p className="text-sm text-forest-mid font-semibold uppercase tracking-[0.2em] mb-3">
                  {new Date(event.event_date).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </p>

                <h2 className="font-serif text-2xl text-soil-dark mb-3">
                  {event.title}
                </h2>

                <p className="text-stone mb-4">
                  {event.description}
                </p>

                <p className="text-sm text-stone/80">
                  Location: {event.location}
                </p>
              </div>
            </article>
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
}