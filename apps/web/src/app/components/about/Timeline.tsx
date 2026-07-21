'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';

interface TimelineItem {
  id: number;
  year: string;
  title: string;
  description: string;
  image_urls: string[];
  details: string[];
  sort_order: number;
  is_active: boolean;
}

interface TimelineProps {
  items: TimelineItem[];
}

const yearStats: Record<string, { meals?: number; families?: number; volunteers?: number; programs?: number }> = {
  '2017': { meals: 100, families: 20, volunteers: 8 },
  '2018': { meals: 300, families: 50, volunteers: 15, programs: 8 },
  '2019': { meals: 500, families: 100, volunteers: 25, programs: 12 },
  '2020': { meals: 1200, families: 200, volunteers: 40, programs: 18 },
  '2021': { meals: 2000, families: 350, volunteers: 55, programs: 25 },
  '2022': { meals: 3500, families: 500, volunteers: 70, programs: 32 },
  '2023': { meals: 5000, families: 750, volunteers: 90, programs: 40 },
  '2024': { meals: 7500, families: 1000, volunteers: 110, programs: 50 },
};

const yearQuotes: Record<string, string> = {
  '2017': '"Every journey begins with a single step taken with a heart full of compassion."',
  '2018': '"Awareness today leads to a healthier and stronger tomorrow."',
  '2019': '"Connections create communities, and communities create change."',
  '2020': '"In the darkest times, we found our brightest light."',
  '2021': '"Education is the seed of lasting change."',
  '2022': '"Health is the foundation of every thriving community."',
  '2023': '"Small acts of kindness create ripples that change the world."',
  '2024': '"Empowerment begins when we believe in each other."',
};

function AnimatedCount({ end, duration = 2 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let frame = 0;
    const startTime = performance.now();
    const step = (currentTime: number) => {
      const progress = Math.min(1, (currentTime - startTime) / (duration * 1000));
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        frame = window.requestAnimationFrame(step);
      }
    };

    frame = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(frame);
  }, [end, duration]);

  return <>{count}+</>;
}

function SafeImage({ src, alt, className, priority }: { src: string | null | undefined; alt: string; className?: string; priority?: boolean }) {
  const [error, setError] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient || !src || error) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-[#0E7A5F]/15 to-[#0F223D]/20 flex items-center justify-center">
        <span className="text-4xl font-serif text-[#0F223D]/20">📷</span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      className={className}
      priority={priority}
      onError={() => setError(true)}
      suppressHydrationWarning
    />
  );
}

function YearChapter({ item, index, isEven }: { item: TimelineItem; index: number; isEven: boolean }) {
  const stats = yearStats[item.year] || null;
  const quote = yearQuotes[item.year] || null;
  const imageSrc = item.image_urls && item.image_urls.length > 0 ? item.image_urls[0] : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      viewport={{ once: true }}
      className="relative py-16 md:py-20 border-b border-[#C9A227]/10 last:border-0"
    >
      <div className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-10 md:gap-16 items-start`}>

        {/* Image */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="flex-1 w-full md:w-1/2"
        >
          <div className="relative h-[280px] md:h-[380px] w-full rounded-2xl overflow-hidden shadow-xl bg-[#0F223D]/5">
            <SafeImage src={imageSrc} alt={`${item.year} — ${item.title}`} className="object-cover" priority={index < 3} />
            <div className="absolute inset-0 border border-[#C9A227]/20 rounded-2xl pointer-events-none" />
          </div>
        </motion.div>

        {/* Content */}
        <div className="flex-1 w-full md:w-1/2">
          <div className="flex items-baseline gap-3 mb-3">
            <span className="text-4xl md:text-5xl font-serif font-bold text-[#C9A227]/30">
              {(index + 1).toString().padStart(2, '0')}
            </span>
            <span className="text-3xl md:text-4xl font-serif font-bold text-[#0F223D]">
              {item.year}
            </span>
          </div>

          <h3 className="text-2xl md:text-3xl font-serif font-bold text-[#0F223D] mb-3">
            {item.title}
          </h3>

          {quote && (
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="text-sm md:text-base text-[#0F223D]/50 italic mb-4 border-l-2 border-[#C9A227]/30 pl-4"
            >
              {quote}
            </motion.p>
          )}

          <p className="text-gray-600 text-base leading-relaxed mb-4">{item.description}</p>

          <ul className="space-y-1.5 mb-4">
            {item.details.slice(0, 5).map((detail, idx) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="flex items-start gap-2 text-sm text-gray-500"
              >
                <span className="text-[#C9A227] mt-0.5">✦</span>
                <span>{detail}</span>
              </motion.li>
            ))}
          </ul>

          {stats && (
            <div className="flex flex-wrap gap-6 pt-4 border-t border-[#C9A227]/10">
              {stats.meals && (
                <div>
                  <div className="text-2xl font-serif font-bold text-[#0F223D]">
                    <AnimatedCount end={stats.meals} duration={2} />
                  </div>
                  <div className="text-xs text-gray-400">Meals Served</div>
                </div>
              )}
              {stats.families && (
                <div>
                  <div className="text-2xl font-serif font-bold text-[#0F223D]">
                    <AnimatedCount end={stats.families} duration={2} />
                  </div>
                  <div className="text-xs text-gray-400">Families Helped</div>
                </div>
              )}
              {stats.volunteers && (
                <div>
                  <div className="text-2xl font-serif font-bold text-[#0F223D]">
                    <AnimatedCount end={stats.volunteers} duration={2} />
                  </div>
                  <div className="text-xs text-gray-400">Volunteers</div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function Timeline({ items }: TimelineProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const uniqueItems = items
    .filter((item, index, self) => index === self.findIndex((i) => i.year === item.year))
    .sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  // Animate background gradient as user scrolls
  const bgColor = useTransform(scrollYProgress, [0, 1], ['#F8F5EE', '#fffbe6']);
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Track active chapter
  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll('[data-chapter]');
      let newIndex = 0;
      elements.forEach((el, i) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight / 2) {
          newIndex = i;
        }
      });
      setActiveIndex(Math.min(newIndex, uniqueItems.length - 1));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [uniqueItems.length]);

  if (uniqueItems.length === 0) {
    return (
      <section className="py-20 bg-[#F8F5EE]">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-gray-500">No timeline entries found.</p>
        </div>
      </section>
    );
  }

  return (
    <motion.section
      ref={sectionRef}
      style={{ background: bgColor }}
      className="relative py-16 overflow-hidden"
    >
      {/* ===== GOLDEN ANIMATED LINE ===== */}
      <div className="absolute left-8 top-0 bottom-0 w-0.5 md:left-12 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[#C9A227]/10 rounded-full" />
        <motion.div
          className="absolute top-0 left-0 right-0 bg-gradient-to-b from-[#C9A227] via-[#D4A437] to-[#C9A227] rounded-full origin-top"
          style={{
            height: '100%',
            scaleY: pathLength,
            filter: 'drop-shadow(0 0 6px #C9A227)',
          }}
        />
        {uniqueItems.map((item, index) => {
          const isActive = index === activeIndex;
          const topPosition = `${(index / Math.max(uniqueItems.length - 1, 1)) * 100}%`;
          return (
            <div
              key={item.year}
              className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3"
              style={{ top: topPosition }}
            >
              {isActive && (
                <div className="absolute inset-0 rounded-full bg-[#C9A227]/20 animate-ping" />
              )}
              <div
                className={`absolute inset-0 rounded-full transition-all duration-500 ${isActive
                    ? 'bg-[#C9A227] shadow-lg shadow-[#C9A227]/50 scale-125'
                    : 'bg-[#C9A227]/60'
                  }`}
              />
            </div>
          );
        })}
      </div>

      {/* ===== HEADER ===== */}
      <div className="max-w-6xl mx-auto px-6 pl-16 md:pl-20 mb-12">
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-block bg-[#C9A227]/10 text-[#C9A227] px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest border border-[#C9A227]/20 mb-3">
            Our Journey
          </span>
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif font-bold text-[#0F223D]"
          >
            Our Timeline
          </motion.h2>
          <div className="w-16 h-1 bg-[#C9A227] mx-auto mt-3 rounded-full" />
          <p className="text-gray-500 mt-4 text-lg font-light">
            From a simple act of kindness to a movement of change — here's how we've grown since 2017.
          </p>
        </div>
      </div>

      {/* ===== CHAPTERS ===== */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 pl-16 md:pl-20">
        {uniqueItems.map((item, index) => (
          <div key={item.year} data-chapter>
            <YearChapter item={item} index={index} isEven={index % 2 === 0} />
          </div>
        ))}
      </div>

      {/* ===== PROGRESS INDICATOR ===== */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 pl-16 md:pl-20 pt-6 pb-3">
        <div className="flex justify-between items-center gap-1">
          {uniqueItems.map((item, index) => {
            const isActive = index === activeIndex;
            return (
              <div
                key={item.year}
                className="flex-1 flex flex-col items-center cursor-pointer"
                onClick={() => {
                  const el = document.querySelector(`[data-chapter="${index}"]`);
                  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }}
              >
                <span
                  className={`text-xs font-mono transition-all duration-300 ${isActive ? 'text-[#C9A227] font-semibold' : 'text-gray-400'
                    }`}
                >
                  {item.year}
                </span>
                <motion.div
                  layout
                  className={`w-full h-0.5 mt-1 rounded-full transition-all duration-500 ${isActive ? 'bg-[#C9A227]' : 'bg-gray-200'
                    }`}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* ===== FOOTER ===== */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 pl-16 md:pl-20 pt-4 pb-8 text-center">
        <p className="text-xs text-gray-400 tracking-wider">
          <span className="text-[#C9A227] font-bold">✦</span> Every year tells a story of hope, resilience, and transformation.
        </p>
      </div>
    </motion.section>
  );
}
