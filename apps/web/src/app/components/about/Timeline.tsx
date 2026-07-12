'use client';

'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Award, Flame, Heart, Sparkles, Star, Target } from 'lucide-react';

interface TimelineItem {
  id: number;
  year: string;
  title: string;
  description: string;
  image_urls: string[];
  details: string[];
  sort_order: number;
  is_active: boolean;
  badge?: string; // Optional badge: 'first', 'milestone', 'innovation', 'impact'
}

interface TimelineProps {
  items: TimelineItem[];
}

// ✅ Badge mapping
const badgeConfig: Record<string, { icon: React.ReactNode; color: string; label: string }> = {
  first: { icon: <Star size={16} />, color: 'bg-amber-500', label: 'First' },
  milestone: { icon: <Award size={16} />, color: 'bg-purple-500', label: 'Milestone' },
  innovation: { icon: <Sparkles size={16} />, color: 'bg-blue-500', label: 'Innovation' },
  impact: { icon: <Heart size={16} />, color: 'bg-rose-500', label: 'Impact' },
};

// ✅ Stats for count-up (example — adjust based on your data)
const yearStats: Record<string, { meals?: number; families?: number; programs?: number }> = {
  '2017': { meals: 100, families: 20, programs: 4 },
  '2018': { meals: 300, families: 50, programs: 8 },
  '2019': { meals: 500, families: 100, programs: 12 },
  '2020': { meals: 1200, families: 200, programs: 18 },
  '2021': { meals: 2000, families: 350, programs: 25 },
  '2022': { meals: 3500, families: 500, programs: 32 },
  '2023': { meals: 5000, families: 750, programs: 40 },
  '2024': { meals: 7500, families: 1000, programs: 50 },
  '2025': { meals: 10000, families: 1300, programs: 55 },
  '2026': { meals: 12000, families: 1500, programs: 60 },
};

// ✅ Animated Counter Component
function AnimatedCounter({ target, label }: { target: number; label: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000;
      const increment = target / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isInView, target]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-2xl font-bold text-primary-600">{count}+</div>
      <div className="text-xs text-gray-500">{label}</div>
    </div>
  );
}

// ✅ Single Timeline Item Component
function TimelineItem({
  item,
  index,
  totalItems,
}: {
  item: TimelineItem;
  index: number;
  totalItems: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Parallax effect
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  // Alternating layout
  const isEven = index % 2 === 0;

  // Auto-slide images
  useEffect(() => {
    if (item.image_urls.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % item.image_urls.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [item.image_urls.length]);

  // Get badge config
  const badge = item.badge ? badgeConfig[item.badge] : null;

  // Stats for this year
  const stats = yearStats[item.year] || null;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 60 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`relative flex flex-col ${
        isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
      } gap-8 lg:gap-16 items-center py-16 lg:py-20 border-b border-gray-100 last:border-0 group`}
    >
      {/* ===== CONNECTOR LINE ===== */}
      {index < totalItems - 1 && (
        <div className="absolute left-12 top-24 bottom-0 w-0.5 bg-primary-200/50 hidden lg:block" />
      )}

      {/* ===== IMAGE SIDE ===== */}
      <motion.div
        style={{ y }}
        className="flex-1 w-full"
      >
        <div className="relative h-[260px] sm:h-[320px] lg:h-[380px] rounded-2xl overflow-hidden shadow-2xl shadow-gray-200/30">
          {/* Image Slider */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0"
            >
              <Image
                src={item.image_urls[currentImageIndex] || '/placeholder.jpg'}
                alt={`${item.year} - ${item.title}`}
                fill
                className="object-cover"
                priority
              />
            </motion.div>
          </AnimatePresence>

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

          {/* Year badge on image */}
          <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm text-white px-4 py-1.5 rounded-full text-sm font-medium flex items-center gap-2">
            <span className="text-primary-300 font-bold">{(index + 1).toString().padStart(2, '0')}.</span>
            {item.year}
          </div>

          {/* Image navigation dots */}
          {item.image_urls.length > 1 && (
            <div className="absolute bottom-4 right-4 flex gap-1.5">
              {item.image_urls.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    currentImageIndex === idx ? 'bg-white w-4' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          )}

          {/* Badge */}
          {badge && (
            <div className={`absolute top-4 right-4 ${badge.color} text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-lg`}>
              {badge.icon}
              {badge.label}
            </div>
          )}
        </div>
      </motion.div>

      {/* ===== TEXT SIDE ===== */}
      <div className="flex-1 w-full">
        {/* Year + Number */}
        <div className="flex items-center gap-3 mb-3">
          <span className="text-sm font-medium text-primary-400 font-mono">
            {(index + 1).toString().padStart(2, '0')}
          </span>
          <span className="text-2xl font-bold text-primary-600">{item.year}</span>
        </div>

        {/* Title */}
        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-primary-800 mb-4">
          {item.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-base lg:text-lg leading-relaxed mb-6">
          {item.description}
        </p>

        {/* Bullet points */}
        <ul className="space-y-2.5 mb-6">
          {item.details.map((detail, idx) => (
            <motion.li
              key={idx}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : -12 }}
              transition={{ duration: 0.3, delay: idx * 0.05 + 0.2 }}
              className="flex items-start gap-3 text-gray-600 text-sm lg:text-base"
            >
              <span className="text-primary-400 text-lg leading-tight mt-0.5">✦</span>
              <span>{detail}</span>
            </motion.li>
          ))}
        </ul>

        {/* Stats */}
        {stats && (
          <div className="flex gap-6 pt-4 border-t border-gray-100">
            {stats.meals && <AnimatedCounter target={stats.meals} label="Meals Served" />}
            {stats.families && <AnimatedCounter target={stats.families} label="Families Helped" />}
            {stats.programs && <AnimatedCounter target={stats.programs} label="Programs" />}
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ============================================
// MAIN TIMELINE COMPONENT
// ============================================
export function Timeline({ items }: TimelineProps) {
  // Filter out duplicates and sort
  const uniqueItems = items.filter(
    (item, index, self) =>
      index === self.findIndex((i) => i.year === item.year)
  ).sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));

  if (uniqueItems.length === 0) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-gray-500">No timeline entries found.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        {/* ===== HEADER ===== */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block bg-primary-50 text-primary-700 px-5 py-2 rounded-full text-sm font-semibold uppercase tracking-widest border border-primary-100/50"
          >
            Our Journey
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl font-serif font-bold text-primary-900 mt-6"
          >
            Tracing Our Path of Impact
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 64 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-1 bg-primary-500 mx-auto mt-5 rounded-full"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-gray-600 max-w-2xl mx-auto mt-5 text-lg"
          >
            From a simple act of kindness to a movement of change — here's how
            we've grown since 2017.
          </motion.p>
        </div>

        {/* ===== TIMELINE ITEMS ===== */}
        <div className="relative">
          {uniqueItems.map((item, index) => (
            <TimelineItem
              key={item.year}
              item={item}
              index={index}
              totalItems={uniqueItems.length}
            />
          ))}
        </div>

        {/* ===== FOOTER CTA ===== */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mt-16 pt-12 border-t border-gray-100"
        >
          <p className="text-gray-500 text-sm">
            <span className="text-primary-500 font-bold">✦</span> Every year tells a story of hope, resilience, and transformation.
          </p>
        </motion.div>
      </div>
    </section>
  );
}