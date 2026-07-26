'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  rating: number;
  image_url?: string;
  is_active: boolean;
  sort_order: number;
}

interface TestimonialsProps {
  title?: string;
  subtitle?: string;
}

export function Testimonials({
  title = 'What People Say',
  subtitle = 'Real stories from volunteers and community members',
}: TestimonialsProps) {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const fetchTestimonials = async () => {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });

      if (data) {
        setTestimonials(data);
        setLoading(false);
      } else if (error) {
        console.error('Error fetching testimonials:', error);
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, [supabase]);

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

  if (loading) {
    return (
      <section className="py-16 bg-[#F8F5EE]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="animate-pulse flex flex-col items-center">
            <div className="w-16 h-16 bg-gray-200 rounded-full mb-4" />
            <div className="h-4 bg-gray-200 rounded w-48 mb-2" />
            <div className="h-4 bg-gray-200 rounded w-32" />
          </div>
        </div>
      </section>
    );
  }

  if (testimonials.length === 0) {
    return (
      <section className="py-16 bg-[#F8F5EE]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-gray-500">No testimonials found. Add some in the admin panel.</p>
        </div>
      </section>
    );
  }

  const current = testimonials[currentIndex];

  return (
    <section className="py-16 bg-[#F8F5EE]">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="inline-block bg-[#C9A227]/10 text-[#C9A227] px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest border border-[#C9A227]/20 mb-3">
            Testimonials
          </span>
          <h2 className="text-3xl font-serif font-bold text-[#0F223D]">{title}</h2>
          <p className="text-gray-500 mt-2">{subtitle}</p>
        </div>

        {/* Testimonial Carousel */}
        <div className="relative bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <div className="absolute top-6 left-6 text-[#C9A227]/20">
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
              {/* Rating */}
              {current.rating && current.rating > 0 && (
                <div className="flex gap-1 text-yellow-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={18} 
                      fill={i < current.rating ? 'currentColor' : 'none'} 
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
                <p className="font-bold text-[#0F223D]">{current.name}</p>
                <p className="text-sm text-gray-500">{current.role}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          {testimonials.length > 1 && (
            <div className="flex justify-center gap-2 mt-6">
              <button
                onClick={prevTestimonial}
                className="p-2 rounded-full bg-gray-100 hover:bg-[#C9A227]/10 transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={20} className="text-gray-600" />
              </button>
              <button
                onClick={nextTestimonial}
                className="p-2 rounded-full bg-gray-100 hover:bg-[#C9A227]/10 transition-colors"
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