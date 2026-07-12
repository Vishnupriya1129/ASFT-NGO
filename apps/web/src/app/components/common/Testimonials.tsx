'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';

// ✅ Placeholder testimonials — replace with real ones later
const defaultTestimonials = [
  {
    id: 1,
    name: 'Volunteer Name 1',
    role: 'Volunteer',
    content: 'Volunteering with Aram Saeivom Family Trust has been a life-changing experience. The impact we create together is truly inspiring.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Program Participant',
    role: 'Participant',
    content: 'The programs run by ASFT have transformed my community. I\'ve seen children return to school and families access healthcare.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Volunteer Name 2',
    role: 'Volunteer Coordinator',
    content: 'Being part of this organization has given me purpose. The dedication of the team and the gratitude of the communities we serve is overwhelming.',
    rating: 5,
  },
];

interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  rating?: number;
}

interface TestimonialsProps {
  testimonials?: Testimonial[];
  title?: string;
  subtitle?: string;
}

export function Testimonials({
  testimonials = defaultTestimonials,
  title = 'What People Say',
  subtitle = 'Real stories from volunteers and community members',
}: TestimonialsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Auto-slide every 6 seconds
  useEffect(() => {
    if (testimonials.length <= 1) return;
    const interval = setInterval(nextTestimonial, 6000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  if (testimonials.length === 0) return null;

  const current = testimonials[currentIndex];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="inline-block bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-widest mb-3">
            Testimonials
          </span>
          <h2 className="text-3xl font-serif font-bold text-primary-900">{title}</h2>
          <p className="text-gray-600 mt-2">{subtitle}</p>
        </div>

        {/* Testimonial Carousel */}
        <div className="relative bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <div className="absolute top-6 left-6 text-primary-200">
            <Quote size={48} />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="relative z-10 pt-8"
            >
              {/* Rating - ✅ Fixed with fallback */}
              {current.rating && current.rating > 0 && (
                <div className="flex gap-1 text-yellow-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={18} 
                      fill={i < current.rating! ? 'currentColor' : 'none'} 
                    />
                  ))}
                </div>
              )}

              {/* Content */}
              <p className="text-gray-700 text-lg leading-relaxed italic">
                "{current.content}"
              </p>

              {/* Author */}
              <div className="mt-6">
                <p className="font-bold text-gray-800">{current.name}</p>
                <p className="text-sm text-gray-500">{current.role}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          {testimonials.length > 1 && (
            <div className="flex justify-center gap-2 mt-6">
              <button
                onClick={prevTestimonial}
                className="p-2 rounded-full bg-gray-100 hover:bg-primary-100 transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={20} className="text-gray-600" />
              </button>
              <button
                onClick={nextTestimonial}
                className="p-2 rounded-full bg-gray-100 hover:bg-primary-100 transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight size={20} className="text-gray-600" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}