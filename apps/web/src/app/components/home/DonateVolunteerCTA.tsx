'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, Users, ArrowRight } from 'lucide-react';

export function DonateVolunteerCTA() {
  return (
    <section className="py-16 bg-primary-900">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mb-4">
            Join Us in Making a Difference
          </h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto mb-10">
            Your support — whether through donations or volunteering — helps us reach 
            more communities, feed more families, and create lasting change.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            {/* Donate Button */}
            <Link
              href="/donate"
              className="group inline-flex items-center justify-center gap-3 bg-white text-primary-900 px-10 py-4 rounded-full font-bold text-lg hover:bg-primary-50 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <Heart size={22} className="text-primary-500 group-hover:scale-110 transition-transform" />
              Donate Now
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>

            {/* Volunteer Button */}
            <Link
              href="/volunteer"
              className="group inline-flex items-center justify-center gap-3 bg-white/20 backdrop-blur-sm text-white px-10 py-4 rounded-full font-bold text-lg border-2 border-white/30 hover:bg-white/30 transition-all duration-300"
            >
              <Users size={22} className="group-hover:scale-110 transition-transform" />
              Become a Volunteer
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <p className="text-white/50 text-sm mt-6">
            Every contribution, big or small, creates ripples of change.
          </p>
        </motion.div>
      </div>
    </section>
  );
}