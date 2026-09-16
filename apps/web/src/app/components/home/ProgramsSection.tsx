'use client';

import Link from 'next/link';
import Image from '@/components/ui/SafeImage';
import { ArrowRight, TreePine, Sparkles, Calendar } from 'lucide-react';

interface Program {
  id: number;
  slug: string;
  title: string;
  description: string;
  image_url: string;
  icon: React.ReactNode;
  color: string;
}

// ✅ Hardcoded for now (migrate to Neon later)
const PROGRAMS: Program[] = [
  {
    id: 1,
    slug: 'odyssey',
    title: 'Odyssey Project',
    description: 'A transformative journey of civic engagement, skill development, and outdoor education.',
    image_url: 'https://res.cloudinary.com/kvatjwwc/image/upload/v1789566218/thooyam-asft2.jpg',
    icon: <TreePine size={24} />,
    color: 'text-emerald-600',
  },
  {
    id: 2,
    slug: 'thooayam-26',
    title: "THOOYAM '26",
    description: 'Environmental action and community clean-up initiative.',
    image_url: 'https://res.cloudinary.com/kvatjwwc/image/upload/v1789566184/thooyam.jpg',
    icon: <Sparkles size={24} />,
    color: 'text-blue-600',
  },
  {
    id: 3,
    slug: 'observation-days',
    title: 'Observation Days',
    description: 'Marking important national and international days with meaningful community engagement.',
    image_url: 'https://res.cloudinary.com/kvatjwwc/image/upload/v1789561810/bbxbmomyum4lgx1ya1y0.jpg',
    icon: <Calendar size={24} />,
    color: 'text-amber-600',
  },
];

export function ProgramsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="inline-block bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-widest mb-3">
            Our Impact Areas
          </span>
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-[#0a1628]">
            Programs That Transform Lives
          </h2>
          <div className="w-16 h-1 bg-emerald-500 mx-auto mt-4 rounded-full" />
          <p className="text-gray-600 max-w-2xl mx-auto mt-4 text-lg">
            Explore the many ways we're creating lasting change in communities across Tamil Nadu.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROGRAMS.map((program) => (
            <Link
              key={program.id}
              href={`/programs/${program.slug}`}
              className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-emerald-300 hover:-translate-y-1"
            >
              <div className="relative h-52 w-full overflow-hidden">
                <Image
                  src={program.image_url}
                  alt={program.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              </div>

              <div className="p-6">
                <div className={`${program.color} mb-3`}>
                  {program.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 group-hover:text-emerald-600 transition-colors">
                  {program.title}
                </h3>
                <p className="text-gray-500 text-sm mt-2 line-clamp-3">{program.description}</p>
                <div className="mt-4 flex items-center gap-2 text-emerald-600 font-semibold text-sm group-hover:gap-3 transition-all">
                  Learn More <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/programs"
            className="inline-flex items-center gap-2 bg-emerald-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-emerald-700 transition shadow-lg shadow-emerald-200"
          >
            View All Programs <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}