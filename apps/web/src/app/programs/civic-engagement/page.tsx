import { Metadata } from 'next';
import { Navbar } from '@/app/components/layout/Navbar';
import { Footer } from '@/app/components/layout/Footer';
import { getSubPrograms } from '@/lib/programs';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Bike, Heart, Target, Handshake, Calendar, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Civic Engagement Activities | Aram Saeivom Family Trust',
  description: 'Explore our civic engagement activities — Just Ride, Relief Works, Health, Humanitarian, and Observation Days.',
};

const subItemsMap = [
  { slug: 'just-ride', title: 'Just Ride', icon: Bike, color: 'amber', description: 'Outdoor education combining cycling, adventure, and environmental awareness.' },
  { slug: 'relief-works', title: 'Relief Works', icon: Heart, color: 'rose', description: 'Emergency response and disaster relief for communities in crisis.' },
  { slug: 'health', title: 'Health Programs', icon: Target, color: 'teal', description: 'Empowering communities through healthcare access and health education.' },
  { slug: 'humanitarian', title: 'Humanitarian Programs', icon: Handshake, color: 'indigo', description: 'Delivering compassion, dignity, and hope to the most vulnerable.' },
  { slug: 'observation-days', title: 'Observation of Specific Days', icon: Calendar, color: 'amber', description: 'Celebrating international days of awareness, health, and happiness.' },
];

const colorMap = {
  amber: 'border-amber-500 hover:bg-amber-50',
  rose: 'border-rose-500 hover:bg-rose-50',
  teal: 'border-teal-500 hover:bg-teal-50',
  indigo: 'border-indigo-500 hover:bg-indigo-50',
};

const textColorMap = {
  amber: 'text-amber-600',
  rose: 'text-rose-600',
  teal: 'text-teal-600',
  indigo: 'text-indigo-600',
};

export default async function CivicEngagementPage() {
  const subPrograms = await getSubPrograms('civic-engagement');

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-sky-pale to-cloud pt-24">
        
        {/* Hero */}
        <section className="relative h-[280px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-emerald-700 to-emerald-500">
          <div className="absolute inset-0 bg-black/20" />
          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
            <span className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-widest border border-white/30 mb-4">
              Odyssey → Civic Engagement
            </span>
            <h1 className="text-4xl sm:text-5xl font-serif font-bold drop-shadow-lg">
              Civic Engagement Activities
            </h1>
            <p className="text-white/90 text-lg max-w-2xl mx-auto mt-4 leading-relaxed">
              Environmental action, health, humanitarian, and relief initiatives that empower communities.
            </p>
          </div>
        </section>

        {/* Sub-Items Grid */}
        <section className="py-16 max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-primary-900">
              Our Civic Engagement Initiatives
            </h2>
            <div className="w-16 h-1 bg-emerald-500 mx-auto mt-4 rounded-full" />
            <p className="text-gray-600 max-w-2xl mx-auto mt-4">
              Explore the five pillars of our civic engagement activities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subItemsMap.map((program) => {
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
                    <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-emerald-600 group-hover:gap-3 transition-all">
                      Learn More <ArrowRight size={16} />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Back to Odyssey */}
          <div className="text-center mt-12">
            <Link
              href="/programs/odyssey"
              className="inline-flex items-center gap-2 text-gray-500 hover:text-emerald-600 transition-colors"
            >
              ← Back to Odyssey
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}