'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { PlayCircle, Heart } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export function HeroSection() {
  const [mounted, setMounted] = useState(false);
  const [stats, setStats] = useState<any[]>([]);

  useEffect(() => {
    setMounted(true);
    loadStats();
  }, []);

  async function loadStats() {
    // Guard against missing Supabase client
    if (!supabase) {
      console.warn('Supabase client not available');
      return;
    }

    const { data, error } = await supabase
      .from('stats')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) {
      console.error('Stats Error:', error);
      return;
    }

    setStats(data || []);
  }

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-primary-50 via-white to-slate-50 pt-20"
      aria-label="Hero section"
    >
      {/* Gradient blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center py-20 lg:py-32">
          {/* Text Content */}
          {mounted && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="space-y-8 sm:space-y-10"
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="inline-flex items-center gap-2 bg-primary-100/80 px-4 py-2 rounded-full border border-primary-200 text-primary-700 text-sm font-semibold"
              >
                <div className="w-2 h-2 bg-accent-500 rounded-full animate-pulse" />
                Nourishing Communities
              </motion.div>

              {/* Main Heading */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="space-y-4"
              >
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
                  <span className="text-slate-900 block">Arram Seivom</span>
                  <span className="text-slate-900 block">Family Trust</span>
                  <span className="block text-gradient-primary">Hope for Every Community</span>
                </h1>
              </motion.div>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-slate-600 text-lg sm:text-xl leading-relaxed max-w-2xl font-light"
              >
                From city streets to village schools, we deliver food, education, and civic leadership with Indian heart and local dignity.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="flex flex-col sm:flex-row gap-4 pt-6"
              >
                <Link href="/#donate" className="btn-primary inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold shadow-lg hover:shadow-xl transition-all">
                  <Heart size={20} strokeWidth={1.5} />
                  <span>Plant a Seed</span>
                </Link>
                <Link href="/programs" className="btn-secondary inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold">
                  <PlayCircle size={20} strokeWidth={1.5} />
                  <span>See Our Work</span>
                </Link>
              </motion.div>

              {/* Dynamic Stats from Supabase */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="grid grid-cols-3 gap-6 pt-6 border-t border-stone/20"
              >
                {stats.map((stat) => (
                  <div key={stat.id} className="space-y-2">
                    <div className="font-serif text-3xl font-bold text-soil-dark">
                      {stat.value}
                    </div>
                    <div className="text-stone text-sm font-medium">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          )}

          {/* Overlapping Images */}
          {mounted && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
              className="relative"
            >
              {/* Main Image */}
              <div className="relative w-full h-[450px] sm:h-[500px] lg:h-[550px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <Image
                  src="https://images.yourstory.com/cs/wordpress/2018/03/19884450_1686832194672581_7847578843808818976_n.jpg?fm=png&auto=format&blur=500"
                  alt="Indian children supported by community volunteers"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-soil-dark/30 to-transparent pointer-events-none" />
              </div>

              {/* Small Overlapping Image */}
              <motion.div
                initial={{ opacity: 0, y: 30, rotate: -5 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                transition={{ delay: 0.5, duration: 0.6, type: 'spring' }}
                className="absolute -bottom-8 -right-4 sm:-bottom-12 sm:-right-6 z-20"
              >
                <div className="relative w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 rounded-2xl overflow-hidden shadow-xl border-4 border-white rotate-3 transition-transform hover:rotate-0 duration-300">
                  <Image
                    src="https://thumbs.dreamstime.com/b/rural-education-india-educating-students-children-isolated-villages-48430299.jpg"
                    alt="Rural Indian classroom with students learning together"
                    fill
                    className="object-cover"
                    loading="lazy"
                  />
                </div>
              </motion.div>

              <div className="absolute -top-10 -left-10 w-40 h-40 bg-sun-warm/20 rounded-full blur-2xl -z-10" />
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}