import { Metadata } from 'next';
import { Navbar } from '@/app/components/layout/Navbar';
import { Footer } from '@/app/components/layout/Footer';
import { getPrograms } from '@/lib/programs';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, TreePine, Handshake, Heart, Sparkles, Target, Award, Users, Calendar } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Programs',
  description: 'Explore our programs that empower communities.',
};

const programIcons: Record<string, { icon: React.ReactNode; color: string }> = {
  'odyssey': { icon: <TreePine size={28} />, color: 'text-emerald-600' },
  'thooayam-26': { icon: <Sparkles size={28} />, color: 'text-blue-600' },
  'relief-works': { icon: <Heart size={28} />, color: 'text-rose-600' },
  'health': { icon: <Target size={28} />, color: 'text-red-600' },
  'humanitarian': { icon: <Handshake size={28} />, color: 'text-purple-600' },
  'awareness': { icon: <Award size={28} />, color: 'text-amber-600' },
  'observation-days': { icon: <Calendar size={28} />, color: 'text-amber-600' },
};

export default async function ProgramsPage() {
  const programs = await getPrograms();
  const parentPrograms = programs.filter(p => !p.parent_slug);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-sky-pale to-cloud pt-24">
        
        {/* Program Cards */}
        <section className="py-16 max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="inline-block bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-widest mb-3">
              Our Impact Areas
            </span>
            <h1 className="text-4xl sm:text-5xl font-serif font-bold text-primary-900">
              Programs That Transform Lives
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto mt-3 text-lg">
              Explore the many ways we're creating lasting change in communities across Tamil Nadu.
            </p>
          </div>

          {parentPrograms.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {parentPrograms.map((program) => {
                const iconData = programIcons[program.slug] || { icon: <Users size={28} />, color: 'text-primary-600' };
                const subCount = programs.filter(p => p.parent_slug === program.slug).length;
                
                return (
                  <Link
                    key={program.slug}
                    href={`/programs/${program.slug}`}
                    className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-primary-200 hover:-translate-y-1"
                  >
                    {program.image_urls && program.image_urls.length > 0 && (
                      <div className="relative h-48 w-full overflow-hidden">
                        <Image
                          src={program.image_urls[0]}
                          alt={program.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <div className={`${iconData.color} mb-3`}>
                        {iconData.icon}
                      </div>
                      <div className="flex items-start justify-between">
                        <h3 className="text-xl font-bold text-gray-800 group-hover:text-primary-600 transition-colors">
                          {program.title}
                        </h3>
                        {subCount > 0 && (
                          <span className="text-xs bg-primary-50 text-primary-600 px-2 py-1 rounded-full">
                            {subCount}
                          </span>
                        )}
                      </div>
                      <p className="text-gray-500 text-sm mt-2 line-clamp-3">{program.description}</p>
                      <div className="mt-4 flex items-center gap-2 text-primary-600 font-semibold text-sm group-hover:gap-3 transition-all">
                        Learn More <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <p>No programs found. Please check back soon!</p>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}