'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Heart, Globe, Users, Handshake } from 'lucide-react';

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

            {/* Stats — 4 Columns */}
            <div className="flex flex-wrap gap-4 mb-8">
              <div className="flex-1 min-w-[80px] text-center bg-gray-50 rounded-xl p-4 border border-gray-100">
                <p className="text-2xl font-bold text-primary-600">8+</p>
                <p className="text-xs text-gray-500">Years of Service</p>
              </div>
              <div className="flex-1 min-w-[80px] text-center bg-gray-50 rounded-xl p-4 border border-gray-100">
                <p className="text-2xl font-bold text-primary-600">50+</p>
                <p className="text-xs text-gray-500">Programs</p>
              </div>
              <div className="flex-1 min-w-[80px] text-center bg-gray-50 rounded-xl p-4 border border-gray-100">
                <p className="text-2xl font-bold text-primary-600">1000+</p>
                <p className="text-xs text-gray-500">Lives Impacted</p>
              </div>
              <div className="flex-1 min-w-[80px] text-center bg-gray-50 rounded-xl p-4 border border-gray-100">
                <p className="text-2xl font-bold text-primary-600">18G/12A</p>
                <p className="text-xs text-gray-500">Registered Trust</p>
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

          {/* ✅ RIGHT: 4 IMAGE BOXES */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4"
          >
            {/* Box 1: Heart */}
            <div className="relative h-48 rounded-xl overflow-hidden shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10" />
              <div className="relative w-full h-full bg-rose-100 flex items-center justify-center">
                <Heart size={40} className="text-rose-500 opacity-60" />
              </div>
            </div>

            {/* Box 2: Users */}
            <div className="relative h-48 rounded-xl overflow-hidden shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10" />
              <div className="relative w-full h-full bg-blue-100 flex items-center justify-center">
                <Users size={40} className="text-blue-500 opacity-60" />
              </div>
            </div>

            {/* Box 3: Globe */}
            <div className="relative h-48 rounded-xl overflow-hidden shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10" />
              <div className="relative w-full h-full bg-emerald-100 flex items-center justify-center">
                <Globe size={40} className="text-emerald-500 opacity-60" />
              </div>
            </div>

            {/* ✅ Box 4: Handshake (NEW) */}
            <div className="relative h-48 rounded-xl overflow-hidden shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10" />
              <div className="relative w-full h-full bg-amber-100 flex items-center justify-center">
                <Handshake size={40} className="text-amber-500 opacity-60" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}