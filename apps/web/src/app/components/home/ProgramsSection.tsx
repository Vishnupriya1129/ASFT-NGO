'use client';

import Link from 'next/link';
import Image from '@/components/ui/SafeImage';
import { ArrowRight, TreePine, Sparkles, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

interface Program {
  id: number;
  slug: string;
  title: string;
  description: string;
  image_url: string;
  icon: React.ReactNode;
  color: string;
}

const PROGRAMS: Program[] = [
  {
    id: 1,
    slug: 'odyssey',
    title: 'Odyssey Project',
    description: 'A transformative journey of civic engagement, skill development, and outdoor education.',
    image_url: 'https://res.cloudinary.com/kvatjwwc/image/upload/f_auto,q_auto,w_1200/v1789566218/thooyam-asft2.jpg',
    icon: <TreePine size={24} />,
    color: 'text-emerald-600',
  },
  {
    id: 2,
    slug: 'thooayam-26',
    title: "THOOYAM '26",
    description: 'Environmental action and community clean-up initiative.',
    image_url: 'https://res.cloudinary.com/kvatjwwc/image/upload/f_auto,q_auto,w_1200/v1789566184/thooyam.jpg',
    icon: <Sparkles size={24} />,
    color: 'text-blue-600',
  },
  {
    id: 3,
    slug: 'observation-days',
    title: 'Observation Days',
    description: 'Marking important national and international days with meaningful community engagement.',
    image_url: 'https://res.cloudinary.com/kvatjwwc/image/upload/f_auto,q_auto,w_1200/v1789561810/bbxbmomyum4lgx1ya1y0.jpg',
    icon: <Calendar size={24} />,
    color: 'text-amber-600',
  },
];

export function ProgramsSection() {
  return (
    <section className="py-24 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-6">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block bg-white text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-widest mb-4 shadow-sm border border-gray-100">
            Our Impact Areas
          </span>
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-[#0F223D]">
            Programs That Transform Lives
          </h2>
          <div className="w-16 h-1 bg-emerald-500 mx-auto mt-6 rounded-full" />
          <p className="text-gray-500 max-w-2xl mx-auto mt-6 text-lg font-light">
            Explore the many ways we're creating lasting change in communities across Tamil Nadu.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROGRAMS.map((program, index) => (
            <motion.div
              key={program.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group h-full"
            >
              <Link
                href={`/programs/${program.slug}`}
                className="flex flex-col h-full bg-white rounded-2xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-50 hover:-translate-y-2 hover:shadow-[0_8px_40px_rgb(0,0,0,0.08)] transition-all duration-300"
              >
                <div className="relative h-52 w-full overflow-hidden">
                  <Image
                    src={program.image_url}
                    alt={program.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>

                <div className="p-8 flex flex-col flex-grow">
                  <div className={`${program.color} mb-4`}>
                    {program.icon}
                  </div>
                  <h3 className="text-xl font-bold text-[#0F223D] group-hover:text-[#C9A227] transition-colors mb-3">
                    {program.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed flex-grow">
                    {program.description}
                  </p>
                  <div className="mt-6 flex items-center gap-2 text-[#C9A227] font-semibold text-sm group-hover:gap-4 transition-all">
                    Learn More <ArrowRight size={16} />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-16"
        >
          <Link
            href="/programs"
            className="inline-flex items-center gap-2 bg-[#0F223D] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#1a2a4a] hover:-translate-y-1 transition-all shadow-xl shadow-[#0F223D]/20"
          >
            View All Programs <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}