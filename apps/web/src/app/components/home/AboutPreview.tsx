'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Heart, Globe, Users, Shield } from 'lucide-react';

export function AboutPreview() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left: Text & Stats — With Gradient Shade */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative overflow-hidden rounded-[2.5rem] bg-white border border-gray-100 shadow-[0_20px_50px_rgba(15,34,61,0.05)] p-10 md:p-12"
          >
            {/* ✅ The Gradient Shade */}
            <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-[#C9A227]/30 pointer-events-none" />
            
            <div className="relative z-10">
              <span className="inline-block bg-[#C9A227]/10 text-[#C9A227] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-[0.2em] border border-[#C9A227]/20 mb-6">
                About Us
              </span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#0F223D] leading-tight mb-6">
                Empowering Communities,<br />
                <span className="text-gray-400">Transforming Lives</span>
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-10 font-light">
                Aram Saeivom Family Trust is a non-profit organization dedicated to uplifting underserved communities through education, healthcare, environmental action, and humanitarian support.
              </p>

              <div className="flex flex-wrap gap-8 mb-10">
                {[
                  { value: '10+', label: 'Years of Service' },
                  { value: '50+', label: 'Programs' },
                  { value: '1000+', label: 'Lives Impacted' },
                  { value: '18G/12A', label: 'Registered Trust' }
                ].map((stat, i) => (
                  <div key={i}>
                    <p className="text-3xl font-serif font-bold text-[#0F223D]">{stat.value}</p>
                    <p className="text-xs text-gray-500 uppercase tracking-wider mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>

              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-[#C9A227] font-bold hover:text-[#8B6914] transition-colors group"
              >
                Learn More About Us
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>

          {/* Right: Clean Icon Cards — WITH GRADIENT SHADE */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { icon: Heart, title: 'Compassion', desc: 'Serving with empathy and dignity.' },
              { icon: Users, title: 'Community', desc: 'Building stronger together.' },
              { icon: Globe, title: 'Sustainability', desc: 'Protecting our environment.' },
              { icon: Shield, title: 'Integrity', desc: 'Transparent and accountable.' }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative overflow-hidden bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 hover:-translate-y-1 hover:shadow-[0_8px_40px_rgb(0,0,0,0.08)] transition-all duration-300"
              >
                {/* ✅ The Gradient Shade for each card */}
                <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-[#C9A227]/20 pointer-events-none" />
                
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center justify-center mb-5 text-[#C9A227]">
                    <item.icon size={28} />
                  </div>
                  <h3 className="font-bold text-[#0F223D] text-lg mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}