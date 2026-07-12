'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { createClient } from '@/lib/supabase/client';
import { Megaphone, ChevronLeft, ChevronRight } from 'lucide-react';

interface Announcement {
  id: number;
  title: string;
  description: string;
  date?: string;
  time?: string;
  location?: string;
  image?: string;
  alt?: string;
  status?: string;
}

export function AnnouncementsSection() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  const supabase = createClient();

  useEffect(() => {
    const loadAnnouncements = async () => {
      const { data } = await supabase
        .from('announcements')
        .select('*')
        .order('id', { ascending: false });
      if (data) setAnnouncements(data);
      setLoading(false);
    };
    loadAnnouncements();
  }, [supabase]);

  // Auto-scroll every 3 seconds
  useEffect(() => {
    if (announcements.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [announcements.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % announcements.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + announcements.length) % announcements.length);
  };

  if (loading) return <div className="py-16 text-center text-white/60">Loading announcements...</div>;
  if (announcements.length === 0) return null;

  const current = announcements[currentIndex];

  return (
    <section
      className="relative py-20 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: 'url(https://vixzstrzqhwswhibzfdq.supabase.co/storage/v1/object/public/content-images/content-images/2026/Just%20Ride/20260103_084733.jpg)',
      }}
      aria-label="Announcements"
    >
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white border border-white/30 px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-widest">
            <motion.div
              animate={{
                rotate: [0, 10, -5, 10, 0],
                scale: [1, 1.15, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 1,
              }}
            >
              <Megaphone size={16} />
            </motion.div>
            SPOTLIGHTS
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mt-3 drop-shadow-lg">
            Stay updated with our ongoing missions, events, and calls for support
          </h2>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Left Arrow */}
          <button
            onClick={prevSlide}
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 backdrop-blur-sm p-2 rounded-full text-white transition-all duration-300"
            aria-label="Previous"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Right Arrow */}
          <button
            onClick={nextSlide}
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 backdrop-blur-sm p-2 rounded-full text-white transition-all duration-300"
            aria-label="Next"
          >
            <ChevronRight size={24} />
          </button>

          {/* Slide */}
          <Link href="/events">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-white/20 text-white cursor-pointer hover:bg-white/20 transition-colors duration-300 group"
            >
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h3 className="text-xl font-bold text-white">{current.title}</h3>
                  {current.status && (
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      current.status === 'ongoing' ? 'bg-green-500/30 text-green-200' :
                      current.status === 'past' ? 'bg-gray-500/30 text-gray-200' :
                      'bg-blue-500/30 text-blue-200'
                    }`}>
                      {current.status}
                    </span>
                  )}
                </div>
                <p className="text-white/90 text-sm sm:text-base leading-relaxed line-clamp-3">
                  {current.description}
                </p>
                <div className="flex items-center gap-2 mt-4 text-white/60 text-sm group-hover:text-white transition-colors">
                  <span>View full details</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </motion.div>
          </Link>
        </div>
      </div>
    </section>
  );
}
