'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import Image from 'next/image';

// Example data structure (replace with your actual Supabase data if needed)
const defaultTestimonials = [
  {
    id: 1,
    name: 'Aashiq Ahamed N',
    role: 'Core Team Member',
    content: 'I have been a part of the NGO Aram Seivom Foundation (ASF) since 2017. I joined when I was a student, and during that time I was able to attend and conduct many programs and activities. Through ASF, I learned leadership, teamwork, commitment, discipline, and my duty towards society.',
    image_url: 'https://res.cloudinary.com/kvatjwwc/image/upload/f_auto,q_auto,w_1200/v1789557384/aashish.jpg',
    rating: 5,
  },
  {
    id: 2,
    name: 'Santhanasibi M',
    role: 'Graphic Designer',
    content: 'After joining the Aram Seivom Family Trust, I gained valuable skills through the various programs conducted there. I learned leadership qualities, teamwork, and how to effectively manage and coordinate a team.',
    image_url: 'https://res.cloudinary.com/kvatjwwc/image/upload/f_auto,q_auto,w_1200/v1789557651/sibi.jpg',
    rating: 5,
  },
  {
    id: 3,
    name: 'Vigneshwar M',
    role: 'Aspirant',
    content: 'Joining ASF helped me see the world through the eyes of a social worker, helped me understand social values & how impactful the work we do for the society. Personally it made me a better person, team player and a leader.',
    image_url: 'https://res.cloudinary.com/kvatjwwc/image/upload/f_auto,q_auto,w_1200/v1789557664/v.jpg',
    rating: 5,
  }
];

interface TestimonialsProps {
  title?: string;
  subtitle?: string;
  testimonials?: any[]; // Replace 'any' with your actual Prisma/Supabase type
}

export function Testimonials({ 
  title = "What People Say", 
  subtitle = "Real stories from our community",
  testimonials = defaultTestimonials 
}: TestimonialsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-advance
  useEffect(() => {
    if (testimonials.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const next = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  if (!testimonials || testimonials.length === 0) return null;

  return (
    <div className="max-w-4xl mx-auto px-6">
      
      {/* Header */}
      <div className="text-center mb-16">
        <span className="inline-block bg-[#C9A227]/10 text-[#C9A227] px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-[0.2em] border border-[#C9A227]/20 mb-4 backdrop-blur-md">
          Testimonials
        </span>
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">{title}</h2>
        <div className="w-16 h-1 bg-[#C9A227] mx-auto rounded-full" />
        <p className="text-white/70 max-w-2xl mx-auto mt-4 text-lg font-light">{subtitle}</p>
      </div>

      {/* Glass Carousel Card */}
      <div className="relative bg-white/5 backdrop-blur-xl rounded-[3rem] p-10 md:p-16 shadow-[0_8px_40px_rgb(0,0,0,0.2)] border border-white/10 min-h-[450px] flex items-center justify-center">
        <Quote size={100} className="text-[#C9A227]/10 absolute top-10 left-10" />
        
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="w-full flex flex-col items-center text-center relative z-10"
          >
            {/* 🖼️ The Image */}
            <div className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-4 border-[#C9A227] shadow-[0_0_20px_rgba(201,162,39,0.3)] mb-8 relative">
              <Image 
                src={testimonials[currentIndex].image_url || '/images/fallback.jpg'} 
                alt={testimonials[currentIndex].name}
                fill
                className="object-cover"
              />
            </div>

            {/* ⭐ Rating */}
            <div className="flex gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  size={18} 
                  className={i < (testimonials[currentIndex].rating || 5) ? 'text-[#C9A227] fill-[#C9A227]' : 'text-gray-600'} 
                />
              ))}
            </div>

            {/* 💬 Quote */}
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed italic font-serif mb-10 max-w-3xl">
              "{testimonials[currentIndex].content}"
            </p>
            
            {/* 👤 Name & Role */}
            <div>
              <p className="font-bold text-white text-2xl">
                {testimonials[currentIndex].name}
              </p>
              <p className="text-base text-[#C9A227] font-semibold mt-1">
                {testimonials[currentIndex].role}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        {testimonials.length > 1 && (
          <>
            <button 
              onClick={prev}
              className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-[#C9A227] hover:text-[#0F223D] transition-all duration-300 z-20 border border-white/10"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={next}
              className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-[#C9A227] hover:text-[#0F223D] transition-all duration-300 z-20 border border-white/10"
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}
      </div>

      {/* Pagination Dots */}
      {testimonials.length > 1 && (
        <div className="flex justify-center gap-3 mt-10">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-3 rounded-full transition-all duration-300 ${
                currentIndex === index 
                  ? 'bg-[#C9A227] w-10' 
                  : 'bg-white/20 hover:bg-white/40 w-3'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}