'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, Heart, Droplets, ArrowRight, Sparkles } from 'lucide-react';

const programs = [
  {
    icon: Home,
    title: 'Orphanage Nutrition',
    description: 'Three wholesome meals daily for children in care homes. Balanced diets rich in local grains, pulses, and fresh vegetables.',
    image: 'https://nabatarafoundation.org/Programmes/Orphanage-care.webp',
    alt: 'Young girl receiving food from volunteers at a community feeding event',
    href: '/programs',
  },
  {
    icon: Heart,
    title: 'Elderly Care Homes',
    description: 'Warm, home-style meals served with dignity to senior citizens. Special diets for diabetes, hypertension, and mobility needs.',
    image: 'elderly.png',
    alt: 'Elderly women eating a meal together at an old age home',
    href: '/programs',
  },
  {
    icon: Droplets,
    title: 'Street Outreach',
    description: 'Mobile kitchens and food packets reaching homeless communities at railway stations, bus stands, and shelter points.',
    image: 'food.png',
    alt: 'Volunteers preparing food packets for homeless distribution',
    href: '/programs',
  },
];

export function ProgramsSection() {
  return (
    <section
      id="programs"
      className="py-20 sm:py-24 lg:py-32 bg-gradient-to-b from-slate-50 to-white"
      aria-label="Our programs"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {programs.map(({ icon: Icon, title, description, image, alt, href }, idx) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.6 }}
              className="card h-full flex flex-col overflow-hidden group hover:shadow-card-hover"
            >
              {/* Image */}
              <div className="relative h-48 sm:h-56 w-full bg-slate-100 overflow-hidden">
                <Image
                  src={image}
                  alt={alt}
                  width={800}
                  height={600}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
              </div>

              {/* Body */}
              <div className="p-6 sm:p-7 flex flex-col justify-between flex-1">
                <div>
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-600 to-primary-500 rounded-lg flex items-center justify-center text-white mb-4 shadow-md">
                    <Icon size={22} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">{title}</h3>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed">{description}</p>
                </div>
                <Link
                  href={href}
                  className="inline-flex items-center gap-2 text-primary-600 font-semibold text-sm mt-5 hover:gap-4 transition-all duration-300 group/link"
                >
                  Learn more
                  <ArrowRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
