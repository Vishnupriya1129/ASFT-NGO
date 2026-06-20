'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Megaphone, Calendar, MapPin, Clock, Bell, AlertCircle } from 'lucide-react';

// Map old font-awesome class names to lucide components
const iconMap: Record<string, React.ReactNode> = {
  'fa-bullhorn': <Megaphone className="text-sun-warm text-base" />,
  'fa-calendar': <Calendar className="text-sun-warm text-base" />,
  'fa-calendar-alt': <Calendar className="text-sun-warm text-base" />,
  'fa-map-marker-alt': <MapPin className="text-sun-warm text-base" />,
  'fa-clock': <Clock className="text-sun-warm text-base" />,
  'fa-bell': <Bell className="text-sun-warm text-base" />,
  'fa-exclamation-triangle': <AlertCircle className="text-sun-warm text-base" />,
  // Add any other icons you use in the database
};

export function AnnouncementsSection() {
  const [announcements, setAnnouncements] = useState<any[]>([]);

  useEffect(() => {
    loadAnnouncements();
  }, []);

 async function loadAnnouncements() {
  if (!supabase) {
    console.error('Supabase is not configured');
    return;
  }

  const { data } = await supabase
    .from('announcements')
    .select('*')
    .order('created_at', { ascending: false });

  if (data) {
    setAnnouncements(data);
  }
}
  return (
    <section
      className="py-16 bg-gradient-to-b from-soil-dark to-soil-mid relative overflow-hidden"
      aria-label="Latest announcements"
    >
      {/* Subtle leaf texture */}
      <div
        className="absolute inset-0 opacity-50 pointer-events-none"
        style={{
          backgroundImage:
            "url('https://media.istockphoto.com/id/1290692045/photo/the-concept-of-unity-cooperation-teamwork-and-charity.webp?b=1&s=170667a&w=0&k=20&c=ED6Bvhds6oE8epOJKYXhF2ABxjD56-qamRnGWL9S1tU=')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* Header */}
      <div className="text-center mb-10 relative z-10">
        <h2 className="font-serif text-3xl font-bold text-sun-warm mb-2 flex items-center justify-center gap-3">
          <Megaphone className="text-sun-warm" aria-hidden="true" />
          Latest from the Field
        </h2>
        <p className="text-white/60 text-sm">
          Stay updated with our ongoing missions, events, and calls for support
        </p>
      </div>

      {/* Infinite scrolling track */}
      <div className="overflow-hidden max-w-7xl mx-auto relative z-10">
        <div className="announcements-track">
          {/* Duplicate the list to create seamless loop */}
          {[...announcements, ...announcements].map((item, i) => (
            <div
              key={`${item.id || i}-${i}`}
              className="inline-flex items-center gap-3 mx-4 px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl text-white font-medium text-sm whitespace-nowrap hover:bg-white/20 hover:-translate-y-1 transition-all duration-300 cursor-default"
            >
              {item.badge === 'new' && <span className="badge-new">New</span>}
              {item.badge === 'event' && <span className="badge-event">Event</span>}
              {/* Render matching lucide icon, fallback to a default */}
              {iconMap[item.icon] || <Bell className="text-sun-warm text-base" />}
              <span>
                {item.title} - {item.content}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* CSS for infinite scroll animation (injected via style tag) */}
      <style jsx>{`
        .announcements-track {
          display: flex;
          animation: scroll 25s linear infinite;
        }
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        /* Pause on hover for better UX */
        .announcements-track:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}