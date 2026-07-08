'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Megaphone, Calendar, Heart, HeartHandshakeIcon } from 'lucide-react';

const announcements = [
  {
    id: 1,
    title: " ASFT – UGC NET Coaching Program",
    description:
      'UGC NET coaching program, next batch on August 15. Limited seats available. Register now to secure your spot and enhance your preparation for the UGC NET exams for only Rs.3500.',
    date: 'August 15, 2026 - December 17, 2026',
    icon: HeartHandshakeIcon,
  },
  {
    id: 2,
    title: ' ASFT – VTBT training program july 31',
    description:
      'We are thrilled to announce our upcoming VTBT training program starting on July 31. This program is designed to equip participants with essential skills and knowledge for personal and professional growth. Don’t miss this opportunity to learn from experts and enhance your capabilities.This is our Volunteer Team Building Training program, which is a part of our ongoing efforts to empower individuals and foster community development. Join us for an enriching experience that will help you make a positive impact in your community.',
    date: 'Agust 15, 2026',
    icon: Calendar,
  },
  {
    id: 3,
    title: 'New Mental Health Program Launching',
    description:
      'We are excited to announce our new Mental Health Training program starting next month. Free workshops and counseling sessions will be available for youth and families in need.',
    date: 'Upcoming',
    icon: Megaphone,
  },
  {
    id: 4,
    title: 'ASFT – Thuyam! City Cleanup Drive',
    description:
      'Keep our city clean! We’re organising தூயம்\'26 on 19th July 2026. We need volunteers and venue suggestions – please share your ideas within the next 2 days. Your support helps make this a success!',
    date: 'July 19, 2026',
    icon: Heart,
  },
];

export function AnnouncementsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isPaused, announcements.length]);

  const current = announcements[currentIndex];
  const Icon = current.icon;

  return (
    <section
      className="relative py-20 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: 'url(https://vixzstrzqhwswhibzfdq.supabase.co/storage/v1/object/public/content-images/content-images/2026/Just%20Ride/20260103_084733.jpg)',
      }}
      aria-label="Announcements"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white border border-white/30 px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-widest">
            <Megaphone size={14} className="inline mr-1" /> SPOTLIGHTS
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mt-3 drop-shadow-lg">
            Stay updated with our ongoing missions, events, and calls for support
          </h2>
        </div>

        {/* Announcement Card – clickable to /events */}
        <Link href="/events">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-white/20 text-white cursor-pointer hover:bg-white/20 transition-colors duration-300"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                <Icon size={24} className="text-white" />
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h3 className="text-xl font-bold text-white">{current.title}</h3>
                  <span className="text-xs text-white/80 bg-white/20 px-3 py-1 rounded-full">
                    {current.date}
                  </span>
                </div>
                <p className="text-white/90 text-sm sm:text-base leading-relaxed">
                  {current.description}
                </p>
              </div>
            </div>
          </motion.div>
        </Link>

        {/* Dot indicators – REMOVED as requested */}
      </div>
    </section>
  );
}