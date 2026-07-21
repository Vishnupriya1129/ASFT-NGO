import { Metadata } from 'next';
import { Navbar } from '@/app/components/layout/Navbar';
import { Footer } from '@/app/components/layout/Footer';
import { getPrograms } from '@/lib/programs';
import Link from 'next/link';
import Image from '@/components/ui/SafeImage';
import { ArrowRight, TreePine, Handshake, Heart, Sparkles, Target, Award, Users, Calendar } from 'lucide-react';

export const metadata: Metadata = {
  title: 'All Programs | Aram Saeivom Family Trust',
  description: 'Explore all our programs that empower communities across Tamil Nadu.',
};

const programIcons: Record<string, { icon: React.ReactNode; color: string }> = {
  'odyssey': { icon: <TreePine size={28} />, color: 'text-emerald-600' },
  'thooayam-26': { icon: <Sparkles size={28} />, color: 'text-blue-600' },
  'relief-works': { icon: <Heart size={28} />, color: 'text-rose-600' },
  'health': { icon: <Target size={28} />, color: 'text-red-600' },
  'humanitarian': { icon: <Handshake size={28} />, color: 'text-purple-600' },
  'awareness': { icon: <Award size={28} />, color: 'text-amber-600' },
  'observation-days': { icon: <Calendar size={28} />, color: 'text-teal-600' },
};

export default async function ProgramsPage() {
  const allPrograms = await getPrograms();
  
  // Separate parent programs and sub-programs
  const parentPrograms = allPrograms.filter(p => !p.parent_slug);
  const subPrograms = allPrograms.filter(p => p.parent_slug);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-sky-pale to-cloud pt-24">
        
        {/* Hero */}
        <section className="relative h-[280px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0a1628] via-[#1a2a4a] to-emerald-800">
          <div className="absolute inset-0 bg-black/20" />
          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
            <span className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-widest border border-white/30 mb-4">
              Our Impact Areas
            </span>
            <h1 className="text-4xl sm:text-5xl font-serif font-bold drop-shadow-lg">
              All Programs
            </h1>
            <p className="text-white/90 text-lg max-w-2xl mx-auto mt-4 leading-relaxed">
              Explore the many ways we're creating lasting change in communities across Tamil Nadu.
            </p>
          </div>
        </section>

        {/* All Programs Grid */}
        <section className="py-16 max-w-7xl mx-auto px-6">
          
          {/* Parent Programs */}
          <div className="mb-16">
            <h2 className="text-2xl font-serif font-bold text-primary-800 mb-6">
              Our Programs
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {parentPrograms.map((program) => {
                const iconData = programIcons[program.slug] || { icon: <Users size={28} />, color: 'text-primary-600' };
                const subCount = allPrograms.filter(p => p.parent_slug === program.slug).length;
                
                return (
                  <Link
                    key={program.slug}
                    href={`/programs/${program.slug}`}
                    className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-emerald-300 hover:-translate-y-1"
                  >
                    {program.image_urls && program.image_urls.length > 0 ? (
                      <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                        <Image
                          src={program.image_urls[0]}
                          alt={program.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    ) : (
                      <div className="relative h-48 w-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                        <span className="text-gray-400 text-sm">No Image</span>
                      </div>
                    )}
                    
                    <div className="p-6">
                      <div className={`${iconData.color} mb-3`}>
                        {iconData.icon}
                      </div>
                      <div className="flex items-start justify-between">
                        <h3 className="text-xl font-bold text-gray-800 group-hover:text-emerald-600 transition-colors">
                          {program.title}
                        </h3>
                        {subCount > 0 && (
                          <span className="text-xs bg-emerald-50 text-emerald-600 px-2 py-1 rounded-full">
                            {subCount}
                          </span>
                        )}
                      </div>
                      <p className="text-gray-500 text-sm mt-2 line-clamp-3">{program.description}</p>
                      <div className="mt-4 flex items-center gap-2 text-emerald-600 font-semibold text-sm group-hover:gap-3 transition-all">
                        Learn More <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Sub-Programs (Optional - if you want to show them separately) */}
          {subPrograms.length > 0 && (
            <div>
              <h2 className="text-2xl font-serif font-bold text-primary-800 mb-6">
                Sub-Programs
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {subPrograms.map((program) => {
                  const parent = allPrograms.find(p => p.slug === program.parent_slug);
                  const iconData = programIcons[program.slug] || { icon: <Users size={28} />, color: 'text-primary-600' };
                  
                  return (
                    <Link
                      key={program.slug}
                      href={`/programs/${program.slug}`}
                      className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-emerald-300 hover:-translate-y-1"
                    >
                      <div className="p-6">
                        <div className={`${iconData.color} mb-3`}>
                          {iconData.icon}
                        </div>
                        <h3 className="text-lg font-bold text-gray-800 group-hover:text-emerald-600 transition-colors">
                          {program.title}
                        </h3>
                        {parent && (
                          <p className="text-xs text-gray-400 mt-1">Part of {parent.title}</p>
                        )}
                        <p className="text-gray-500 text-sm mt-2 line-clamp-2">{program.description}</p>
                        <div className="mt-4 flex items-center gap-2 text-emerald-600 font-semibold text-sm group-hover:gap-3 transition-all">
                          Learn More <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}