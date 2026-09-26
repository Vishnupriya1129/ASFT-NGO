import { Metadata } from 'next';
import { Navbar } from '@/app/components/layout/Navbar';
import { Footer } from '@/app/components/layout/Footer';
import { getSubPrograms } from '@/lib/programs';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, TreePine, Users, Bike, Map, Heart, Target, Handshake, Calendar, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Odyssey Project | Aram Saeivom Family Trust',
  description: 'Explore our flagship Odyssey Project â€” civic engagement, training, outdoor education, and more.',
};

// All sub-programs under Odyssey
const subProgramsMap = [
  { 
    slug: 'civic-engagement', 
    title: 'Civic Engagement Activities', 
    icon: TreePine, 
    color: 'emerald',
    description: 'Environmental action, health, humanitarian, and relief initiatives.',
    subItems: ['Relief Works', 'Health Programs', 'Humanitarian Programs', 'Observation Days']
  },
  { 
    slug: 'training', 
    title: 'Training Programs', 
    icon: Users, 
    color: 'blue',
    description: 'Building skills, confidence, and leadership through comprehensive training.'
  },
  { 
    slug: 'field-trips', 
    title: 'Field Trips', 
    icon: Map, 
    color: 'purple',
    description: 'Exploring heritage, history, and culture through immersive educational journeys.',
      subItems: ['Just Ride']
  },
];

const colorMap = {
  emerald: 'border-emerald-500 hover:bg-emerald-50',
  blue: 'border-blue-500 hover:bg-blue-50',
  purple: 'border-purple-500 hover:bg-purple-50',
  rose: 'border-rose-500 hover:bg-rose-50',
  teal: 'border-teal-500 hover:bg-teal-50',
  indigo: 'border-indigo-500 hover:bg-indigo-50',
  amber: 'border-amber-500 hover:bg-amber-50',
  orange: 'border-orange-500 hover:bg-orange-50',
};

const textColorMap = {
  emerald: 'text-emerald-600',
  blue: 'text-blue-600',
  purple: 'text-purple-600',
  rose: 'text-rose-600',
  teal: 'text-teal-600',
  indigo: 'text-indigo-600',
  amber: 'text-amber-600',
  orange: 'text-orange-600',
};

export default async function OdysseyPage() {
  const subPrograms = await getSubPrograms('odyssey');

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-sky-pale to-cloud pt-24">
        
        {/* Hero */}
        <section className="relative h-[300px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-emerald-800 to-emerald-600">
          <div className="absolute inset-0 bg-black/20" />
          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
            <span className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-widest border border-white/30 mb-4">
              Flagship Program
            </span>
            <h1 className="text-4xl sm:text-5xl font-serif font-bold drop-shadow-lg">
              Odyssey Project
            </h1>
            <p className="text-white/90 text-lg max-w-2xl mx-auto mt-4 leading-relaxed">
              A transformative journey of civic engagement, skill development, outdoor education, and humanitarian action.
            </p>
          </div>
        </section>

        {/* Sub-Programs Grid */}
        <section className="py-16 max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-primary-900">
              Explore Odyssey
            </h2>
            <div className="w-16 h-1 bg-emerald-500 mx-auto mt-4 rounded-full" />
            <p className="text-gray-600 max-w-2xl mx-auto mt-4">
              Discover the pillars of our flagship program â€” each designed to create lasting impact.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subProgramsMap.map((program) => {
              const Icon = program.icon;
              const color = colorMap[program.color as keyof typeof colorMap];
              const textColor = textColorMap[program.color as keyof typeof textColorMap];
              
              const actualData = subPrograms.find(p => p.slug === program.slug);

              return (
                <Link
                  key={program.slug}
                  href={`/programs/${program.slug}`}
                  className={`group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border-t-4 ${color} hover:-translate-y-1 border border-gray-100`}
                >
                  <div className="p-6">
                    <div className={`${textColor} mb-3`}>
                      <Icon size={28} />
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 group-hover:text-emerald-600 transition-colors">
                      {program.title}
                    </h3>
                    <p className="text-gray-500 text-sm mt-2 line-clamp-2">
                      {actualData?.description || program.description}
                    </p>
                    
                    {/* Show sub-items for Civic Engagement */}
                    {program.slug === 'civic-engagement' && program.subItems && (
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {program.subItems.map((item) => (
                          <span key={item} className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                            {item}
                          </span>
                        ))}
                      </div>
                    )}
                    
                    <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-emerald-600 group-hover:gap-3 transition-all">
                      Learn More <ArrowRight size={16} />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Back to Programs */}
          <div className="text-center mt-12">
            <Link
              href="/programs"
              className="inline-flex items-center gap-2 text-gray-500 hover:text-emerald-600 transition-colors"
            >
              â† Back to All Programs
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}