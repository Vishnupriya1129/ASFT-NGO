'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export function FounderNote() {
  return (
    <section className="py-20 bg-gradient-to-b from-primary-50 to-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="inline-block bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-widest">
            Founder's Note
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-primary-900 mt-4">
            A Message from Our Founder
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          {/* Founder Image */}
          <div className="lg:col-span-1 flex justify-center">
            <div className="relative w-64 h-64 rounded-2xl overflow-hidden shadow-xl border-4 border-primary-100">
              <Image
                src="https://vixzstrzqhwswhibzfdq.supabase.co/storage/v1/object/public/content-images/logo/ar.png"
                alt="Founder - Aram Saeivom Family Trust"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Founder Message */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl shadow-lg p-8 border border-primary-50"
            >
              <p className="text-lg text-gray-700 leading-relaxed mb-6 italic">
                "At Aram Saeivom Family Trust, we believe that true change begins with 
                compassion and action. Every meal we serve, every child we educate, and 
                every community we empower is a step toward a brighter, more equitable future.
                Our journey is built on the unwavering belief that small acts of kindness, 
                multiplied by many, can transform the world."
              </p>
              <div className="flex items-center gap-4">
                <div className="h-12 w-0.5 bg-primary-300" />
                <div>
                  <p className="font-bold text-primary-700 text-lg">Balasubramanian</p>
                  <p className="text-sm text-gray-500">Founder, Aram Saeivom Family Trust</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}