'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, PlayCircle } from 'lucide-react';

export function HeroButtons() {
  return (
    <section className="py-12 bg-white border-t border-gray-100">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="/donate"
            className="btn-primary inline-flex items-center justify-center gap-2 px-10 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
          >
            <Heart size={22} />
            Donate Us
          </Link>
          <Link
            href="/programs"
            className="btn-secondary inline-flex items-center justify-center gap-2 px-10 py-4 text-lg font-semibold"
          >
            <PlayCircle size={22} />
            See Our Work
          </Link>
        </motion.div>
      </div>
    </section>
  );
}