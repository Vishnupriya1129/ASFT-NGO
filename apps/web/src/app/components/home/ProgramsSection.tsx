'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

const programs = [
  {
    title: 'Anniversary',
    description: 'Celebrating milestones of service and community impact.',
    image:
      'https://vixzstrzqhwswhibzfdq.supabase.co/storage/v1/object/public/content-images/content-images/2025/Anniversary/IMG_2314.JPG',
    place: 'Community Hall',
    date: 'March 2025',
    href: '/programs',
  },
  {
    title: 'Maghiz',
    description: 'Empowering individuals through skill development and mentorship.',
    image:
      'https://vixzstrzqhwswhibzfdq.supabase.co/storage/v1/object/public/content-images/content-images/2026/Maghiz/IMG_2315.jpg',
    place: 'Training Center',
    date: 'June 2026',
    href: '/programs',
  },
  {
    title: 'Mental Health Training',
    description: 'Building awareness and support for mental well-being in the community.',
    image:
      'https://vixzstrzqhwswhibzfdq.supabase.co/storage/v1/object/public/content-images/content-images/2026/Mental%20Health%20Training/IMG_2943.jpg',
    place: 'Community Center',
    date: 'July 2026',
    href: '/programs',
  },
  {
    title: 'Just Ride',
    description: 'Promoting health, fitness, and community bonding through cycling events.',
    image:
      'https://vixzstrzqhwswhibzfdq.supabase.co/storage/v1/object/public/content-images/content-images/2026/Just%20Ride/IMG_6738.JPG',
    place: 'City Streets',
    date: 'August 2026',
    href: '/programs',
  },
  {
    title: 'Pongal',
    description: 'Celebrating the harvest festival with traditional joy and community feasts.',
    image:
      'https://vixzstrzqhwswhibzfdq.supabase.co/storage/v1/object/public/content-images/content-images/2026/Pongal/20260118_134859.jpg',
    place: 'Community Grounds',
    date: 'January 2026',
    href: '/programs',
  },
  {
    title: 'Uvagai',
    description: 'Fostering environmental awareness and sustainable living practices.',
    image:
      'https://vixzstrzqhwswhibzfdq.supabase.co/storage/v1/object/public/content-images/content-images/2026/Uvagai/IMG_20260321_185905304_HDR.jpg',
    place: 'Various Locations',
    date: 'March 2026',
    href: '/programs',
  },
  {
    title: 'Happiness Day',
    description: 'Celebrating joy and well-being in our community.',
    image:
      'https://vixzstrzqhwswhibzfdq.supabase.co/storage/v1/object/public/content-images/content-images/2024/Happiness%20Day/IMG_2903.JPG',
    place: 'Community Park',
    date: 'October 2024',
    href: '/programs',
  },
  {
    title: 'Medical Camp',
    description: 'Warm, home-style meals served with dignity to senior citizens.',
    image:
      'https://vixzstrzqhwswhibzfdq.supabase.co/storage/v1/object/public/content-images/content-images/2024/Medical%20Camp/IMG-20240517-WA0003.jpg',
    place: 'Old Age Home',
    date: 'May 2024',
    href: '/programs',
  },
  {
    title: 'Food Providing Program',
    description: 'Mobile kitchens and food packets reaching homeless communities.',
    image:
      'https://vixzstrzqhwswhibzfdq.supabase.co/storage/v1/object/public/content-images/content-images/2024/Food%20Providing%20Program/DSC_0078.JPG',
    place: 'City Wide',
    date: 'Ongoing',
    href: '/programs',
  },
];

export function ProgramsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const totalSlides = programs.length;

  // Auto-scroll every 5 seconds
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused, totalSlides]);

  const goToSlide = (index: number) => {
    setCurrentIndex((index + totalSlides) % totalSlides);
  };

  const nextSlide = () => goToSlide(currentIndex + 1);
  const prevSlide = () => goToSlide(currentIndex - 1);

  const currentProgram = programs[currentIndex];

  return (
    <section
      id="programs"
      className="py-20 sm:py-24 lg:py-32 bg-gradient-to-b from-slate-50 to-white"
      aria-label="Our programs"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 lg:mb-20">
          <span className="section-tag">
            <Sparkles size={14} className="inline mr-1" /> Our Initiatives
          </span>
          <h2 className="section-heading mb-4 sm:mb-6">
            Programs Rooted in Compassion
          </h2>
          <p className="section-subheading">
            Every meal we serve and every child we educate is a seed planted for a greener,
            kinder world. Our programs grow where they are needed most.
          </p>
        </div>

        {/* Carousel Container - Overlay Style */}
        <div className="relative max-w-4xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-primary-500 aspect-[16/9]">
            {/* Background Image */}
            <div className="absolute inset-0">
              <Image
                src={currentProgram.image}
                alt={currentProgram.title}
                fill
                className="object-cover transition-transform duration-700 ease-in-out"
                priority
              />
              {/* Dark overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/40" />
            </div>

            {/* Content Overlay */}
            <div className="relative z-10 h-full flex flex-col justify-end p-8 sm:p-12">
              <div className="space-y-2">
                {/* Title - Large */}
                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white drop-shadow-lg">
                  {currentProgram.title}
                </h3>

                {/* Place & Date */}
                <div className="flex flex-wrap items-center gap-4 text-white/90 text-sm sm:text-base">
                  <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                    📍 {currentProgram.place}
                  </span>
                  <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                    📅 {currentProgram.date}
                  </span>
                </div>

                {/* Description */}
                <p className="text-white/80 text-sm sm:text-base max-w-lg drop-shadow">
                  {currentProgram.description}
                </p>

                {/* Learn More Link */}
                <Link
                  href={currentProgram.href}
                  className="inline-flex items-center gap-2 text-white font-semibold text-sm mt-2 hover:gap-4 transition-all duration-300 group"
                >
                  Learn more
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </Link>

                {/* Brand Name - Bottom Right */}
                <div className="absolute bottom-4 right-6 text-white/30 text-xs font-serif tracking-widest">
                  Aram Seivom Family Trust
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Arrows - Absolute position */}
          <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white shadow-lg p-3 rounded-full border border-gray-200 transition-all duration-300"
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} className="text-primary-500" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white shadow-lg p-3 rounded-full border border-gray-200 transition-all duration-300"
            aria-label="Next slide"
          >
            <ChevronRight size={24} className="text-primary-500" />
          </button>

          {/* Dot Indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {programs.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToSlide(idx)}
                className={`w-3 h-3 rounded-full transition-all ${
                  idx === currentIndex
                    ? 'bg-primary-500 scale-125'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}