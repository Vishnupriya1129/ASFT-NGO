'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Heart, Globe, Users } from 'lucide-react';

export function AboutPreview() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="inline-block bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-widest mb-4">
              About Us
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-primary-900 mb-4">
              Empowering Communities, Transforming Lives
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Aram Saeivom Family Trust is a non-profit organization dedicated to uplifting 
              underserved communities through education, healthcare, environmental action, 
              and humanitarian support.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              Since 2017, we have been working tirelessly to create lasting change — one 
              life, one family, one community at a time.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary-600">8+</p>
                <p className="text-sm text-gray-500">Years of Service</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-primary-600">50+</p>
                <p className="text-sm text-gray-500">Programs</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-primary-600">1000+</p>
                <p className="text-sm text-gray-500">Lives Impacted</p>
              </div>
            </div>

            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700 transition-colors group"
            >
              Learn More About Us
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* Right: Image Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4"
          >
            <div className="relative h-64 rounded-xl overflow-hidden shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10" />
              <div className="relative w-full h-full bg-primary-200 flex items-center justify-center">
                <Heart size={48} className="text-primary-500 opacity-60" />
              </div>
            </div>
            <div className="relative h-64 rounded-xl overflow-hidden shadow-lg mt-8">
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10" />
              <div className="relative w-full h-full bg-green-200 flex items-center justify-center">
                <Users size={48} className="text-green-600 opacity-60" />
              </div>
            </div>
            <div className="relative h-64 rounded-xl overflow-hidden shadow-lg col-span-2">
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10" />
              <div className="relative w-full h-full bg-blue-200 flex items-center justify-center">
                <Globe size={48} className="text-blue-600 opacity-60" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}