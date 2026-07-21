'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Quote } from 'lucide-react';

export function FounderNote() {
  const ref = useRef(null);
  const sectionRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
      style={{
        background: 'linear-gradient(165deg, #F8F5EE 0%, #f0ebe0 35%, #e8e0d4 65%, #F8F5EE 100%)'
      }}
    >
      {/* Paper texture overlay */}
      <div className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E")`
        }}
      />

      {/* Soft navy gradient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#0a1628]/[0.04] rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#0a1628]/[0.03] rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-400/[0.04] rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          
          {/* ===== LEFT: OVAL PORTRAIT ===== */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative w-[320px] md:w-[380px] aspect-[4/5] group">
              
              {/* Emerald Ambient Glow */}
              <div className="absolute -inset-8 md:-inset-12 rounded-full bg-emerald-400/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              <div className="absolute -inset-4 md:-inset-6 rounded-full bg-emerald-400/5 blur-xl" />
              <div className="absolute -inset-2 rounded-full bg-[#0a1628]/[0.03] blur-3xl" />

              {/* SVG Mask for True Oval Portrait */}
              <div className="relative w-full h-full">
                <svg 
                  className="absolute inset-0 w-full h-full" 
                  viewBox="0 0 400 500" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <defs>
                    <clipPath id="ovalMask">
                      <ellipse cx="200" cy="250" rx="160" ry="200" />
                    </clipPath>
                    
                    <linearGradient id="goldOutline" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#C9A227" stopOpacity="0.4" />
                      <stop offset="30%" stopColor="#D4A437" stopOpacity="0.8" />
                      <stop offset="50%" stopColor="#E8C84A" stopOpacity="1" />
                      <stop offset="70%" stopColor="#D4A437" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#C9A227" stopOpacity="0.4" />
                    </linearGradient>
                    
                    <radialGradient id="outerGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="60%" stopColor="#C9A227" stopOpacity="0.08" />
                      <stop offset="100%" stopColor="#C9A227" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                  
                  <ellipse 
                    cx="200" 
                    cy="250" 
                    rx="175" 
                    ry="215" 
                    fill="url(#outerGlow)"
                    stroke="#C9A227"
                    strokeWidth="0.5"
                    strokeOpacity="0.15"
                  />
                  
                  <foreignObject 
                    x="0" 
                    y="0" 
                    width="400" 
                    height="500" 
                    clipPath="url(#ovalMask)"
                    className="overflow-hidden"
                  >
                    <div className="relative w-full h-full">
                      <Image
                        src="https://vixzstrzqhwswhibzfdq.supabase.co/storage/v1/object/public/content-images/content-images/2024/Anniversary/_MG_8239.JPG"
                        alt="Balasubramanian — Founder, Aram Saeivom Family Trust"
                        fill
                        className="object-cover object-[center_30%] transition-transform duration-700 ease-out group-hover:scale-105"
                        priority
                        sizes="(max-width: 768px) 320px, 380px"
                      />
                    </div>
                  </foreignObject>
                  
                  <motion.ellipse
                    cx="200"
                    cy="250"
                    rx="160"
                    ry="200"
                    stroke="url(#goldOutline)"
                    strokeWidth="1.5"
                    fill="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={isMounted ? { pathLength: 1, opacity: 1 } : {}}
                    transition={{ duration: 2.5, ease: "easeInOut", delay: 0.3 }}
                  />
                  
                  <ellipse
                    cx="200"
                    cy="250"
                    rx="164"
                    ry="204"
                    stroke="#C9A227"
                    strokeWidth="0.5"
                    strokeOpacity="0.15"
                    fill="none"
                  />
                </svg>
              </div>
              
              {/* Decorative corner accents */}
              <div className="absolute -top-1 -left-1 w-10 h-10 border-t-2 border-l-2 border-[#C9A227]/30 rounded-tl-xl pointer-events-none" />
              <div className="absolute -bottom-1 -right-1 w-10 h-10 border-b-2 border-r-2 border-[#C9A227]/30 rounded-br-xl pointer-events-none" />
            </div>
          </motion.div>

          {/* ===== RIGHT: QUOTE & TEXT (Times New Roman) ===== */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="lg:pl-4"
            style={{ fontFamily: 'Times New Roman, serif' }}
          >
            {/* Decorative Quote Mark */}
            <div className="relative">
              <Quote 
                size={72} 
                className="text-[#C9A227]/15 absolute -top-6 -left-2" 
                strokeWidth={1.5}
              />
              
              <div className="relative z-10">
                <span className="inline-block bg-[#C9A227]/10 text-[#C9A227] px-5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-[0.15em] border border-[#C9A227]/20 mb-6">
                  Founder's Note
                </span>
                
                <h2 className="text-4xl sm:text-5xl font-bold text-[#0a1628] leading-tight mb-8 tracking-wide">
                  A Message from<br />
                  <span className="text-[#0a1628]/80">Our Founder</span>
                </h2>
              </div>
            </div>

            {/* Quote Text */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="relative pl-8"
            >
              <div className="absolute left-0 top-0 w-[3px] h-full bg-gradient-to-b from-[#C9A227] via-emerald-400/40 to-transparent rounded-full" />
              
              <p className="text-xl md:text-2xl text-gray-700 leading-[1.8] font-light tracking-wide mb-8 italic">
                "At Aram Saeivom Family Trust, we believe that true change begins with 
                compassion and action. Every meal we serve, every child we educate, and 
                every community we empower is a step toward a brighter, more equitable future. 
                Our journey is built on the unwavering belief that small acts of kindness, 
                multiplied by many, can transform the world."
              </p>
            </motion.div>

            {/* Gold Divider */}
            <div className="flex items-center gap-4 my-8 pl-8">
              <div className="h-px w-16 bg-gradient-to-r from-[#C9A227]/60 to-[#C9A227]/20" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#C9A227]/60" />
              <div className="h-px w-16 bg-gradient-to-l from-[#C9A227]/60 to-[#C9A227]/20" />
            </div>

            {/* Founder Signature */}
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="pl-8"
            >
              <p className="text-3xl font-bold text-[#0a1628] tracking-wide">
                Balasubramanian
              </p>
              <p className="text-sm text-gray-500/70 mt-0.5 tracking-wider">
                Founder, Aram Saeivom Family Trust
              </p>
            </motion.div>

            {/* Read Full Note Button */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="mt-8 pl-8"
            >
              <Link
                href="/founders-note"
                className="inline-flex items-center gap-3 text-emerald-600 font-medium hover:text-emerald-700 transition-all duration-300 group"
              >
                <span className="border-b-2 border-emerald-600/30 group-hover:border-emerald-600 transition-all duration-300 pb-0.5 text-sm tracking-wide">
                  Read Full Note
                </span>
                <ArrowRight 
                  size={16} 
                  className="group-hover:translate-x-1.5 group-hover:scale-110 transition-all duration-300" 
                />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}