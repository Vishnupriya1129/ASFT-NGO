'use client';

import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Users, Building2, GraduationCap, Heart } from 'lucide-react';

const stats = [
  {
    value: '500+',
    label: 'Youths Empowered',
    icon: Users,
    description: 'Through skill development and mentorship',
  },
  {
    value: '4',
    label: 'Partnered Educational Institutions',
    icon: Building2,
    description: 'Schools and colleges across the region',
  },
  {
    value: '40+',
    label: 'Active Volunteers',
    icon: Heart,
    description: 'Committed to serving the community',
  },
];

export function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      ref={ref}
      className="py-16 bg-gradient-to-b from-white to-slate-50"
      aria-label="Impact statistics"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="section-tag">Our Impact</span>
          <h2 className="section-heading mt-3">
            Making a Difference Together
          </h2>
          <div className="divider-emerald mt-4" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                className="card-emerald text-center p-8"
              >
                <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon size={28} className="text-emerald-500" />
                </div>
                <div className="font-serif text-4xl md:text-5xl font-bold text-primary-500">
                  {stat.value}
                </div>
                <div className="text-slate-700 font-semibold text-lg mt-2">
                  {stat.label}
                </div>
                <div className="text-slate-500 text-sm mt-1">
                  {stat.description}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
