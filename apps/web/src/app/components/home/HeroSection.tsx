'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const heroImages = [
  'https://vixzstrzqhwswhibzfdq.supabase.co/storage/v1/object/public/content-images/content-images/2023/Anniversary/IMG_2472.JPG',
  'https://vixzstrzqhwswhibzfdq.supabase.co/storage/v1/object/public/content-images/content-images/2024/Child%20Safety%20Program/IMG_2547.JPG',
  'https://vixzstrzqhwswhibzfdq.supabase.co/storage/v1/object/public/content-images/content-images/2024/Happiness%20Day/IMG_7834.JPG',
  'https://vixzstrzqhwswhibzfdq.supabase.co/storage/v1/object/public/content-images/content-images/2026/Mental%20Health%20Training/IMG_2953.jpg',
];

export function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextSlide = useCallback(() => {
    const next = (currentIndex + 1) % heroImages.length;
    setDirection(1);
    setCurrentIndex(next);
  }, [currentIndex]);

  const prevSlide = useCallback(() => {
    const prev = (currentIndex - 1 + heroImages.length) % heroImages.length;
    setDirection(-1);
    setCurrentIndex(prev);
  }, [currentIndex]);

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [prevSlide, nextSlide]);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? '-100%' : '100%',
      opacity: 0,
    }),
  };

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Images with Slide Transition */}
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          <Image
            src={heroImages[currentIndex]}
            alt="Aram Seivom Family Trust"
            fill
            className="object-cover"
            priority
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-black/35" />
        </motion.div>
      </AnimatePresence>

      {/* ====== BRAND NAME – BOTTOM CENTER ====== */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-10 text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-white drop-shadow-lg">
            Aram Seivom
          </h1>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-serif text-white/90 drop-shadow-md mt-1">
            Family Trust
          </h2>
        </motion.div>
      </div>

      {/* ====== LEFT ARROW ====== */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 text-white/70 hover:text-white bg-black/20 hover:bg-black/40 backdrop-blur-sm p-3 rounded-full transition-all duration-300"
        aria-label="Previous slide"
      >
        <ChevronLeft size={28} />
      </button>

      {/* ====== RIGHT ARROW ====== */}
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 text-white/70 hover:text-white bg-black/20 hover:bg-black/40 backdrop-blur-sm p-3 rounded-full transition-all duration-300"
        aria-label="Next slide"
      >
        <ChevronRight size={28} />
      </button>

      {/* Slide counter removed – trust name now occupies that spot */}
    </section>
  );
}