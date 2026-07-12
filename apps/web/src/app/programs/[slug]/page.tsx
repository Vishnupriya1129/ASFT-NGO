import { Metadata } from 'next';
import { Navbar } from '@/app/components/layout/Navbar';
import { Footer } from '@/app/components/layout/Footer';
import { getProgramBySlug, getSubPrograms, getPrograms } from '@/lib/programs';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ChevronLeft, Home } from 'lucide-react';

interface ProgramPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: ProgramPageProps): Promise<Metadata> {
  const program = await getProgramBySlug(params.slug);
  
  if (!program) {
    return { title: 'Program Not Found' };
  }

  return {
    title: program.title,
    description: program.description,
  };
}

export default async function ProgramDetailPage({ params }: ProgramPageProps) {
  const program = await getProgramBySlug(params.slug);
  
  if (!program) {
    notFound();
  }

  const subPrograms = await getSubPrograms(program.slug);
  const allPrograms = await getPrograms();
  const hasYearBreakdown = program.year_breakdown && Object.keys(program.year_breakdown).length > 0;

  // Find the parent program if this is a sub-program
  const parentProgram = program.parent_slug 
    ? allPrograms.find(p => p.slug === program.parent_slug) 
    : null;

  // Get siblings (other sub-programs under same parent)
  const siblings = program.parent_slug 
    ? allPrograms.filter(p => p.parent_slug === program.parent_slug && p.slug !== program.slug)
    : [];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-sky-pale to-cloud pt-24">
        
        {/* ===== BREADCRUMB NAVIGATION ===== */}
        <div className="max-w-5xl mx-auto px-6 pt-4">
          <nav className="flex items-center gap-2 text-sm text-gray-500" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-primary-600 transition-colors flex items-center gap-1">
              <Home size={14} />
              Home
            </Link>
            <span className="text-gray-300">/</span>
            <Link href="/programs" className="hover:text-primary-600 transition-colors">
              Programs
            </Link>
            
            {parentProgram && (
              <>
                <span className="text-gray-300">/</span>
                <Link 
                  href={`/programs/${parentProgram.slug}`} 
                  className="hover:text-primary-600 transition-colors"
                >
                  {parentProgram.title}
                </Link>
              </>
            )}
            
            <span className="text-gray-300">/</span>
            <span className="text-primary-600 font-medium">{program.title}</span>
          </nav>
        </div>

        {/* ===== BACK BUTTON ===== */}
        <div className="max-w-5xl mx-auto px-6 pt-4">
          <Link
            href={parentProgram ? `/programs/${parentProgram.slug}` : '/programs'}
            className="inline-flex items-center gap-2 text-gray-500 hover:text-primary-600 transition-colors text-sm font-medium group"
          >
            <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            {parentProgram ? `Back to ${parentProgram.title}` : 'Back to Programs'}
          </Link>
        </div>

        {/* ===== HERO ===== */}
        <section className="relative py-16 bg-gradient-to-br from-primary-800 to-primary-600 mx-6 rounded-3xl overflow-hidden">
          <div className="absolute inset-0 bg-black/20" />
          <div className="relative z-10 max-w-4xl mx-auto px-8 text-center text-white">
            {program.parent_slug && (
              <span className="inline-block bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border border-white/30 mb-4">
                Sub-Program
              </span>
            )}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold drop-shadow-lg">
              {program.title}
            </h1>
            <p className="text-white/90 text-lg max-w-2xl mx-auto mt-3 leading-relaxed">
              {program.description}
            </p>
          </div>
        </section>

        {/* ===== CONTENT ===== */}
        <section className="py-12 max-w-5xl mx-auto px-6">
          {/* Main Description */}
          {program.content && (
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-10">
              <p className="text-gray-600 leading-relaxed text-lg">{program.content}</p>
            </div>
          )}

          {/* Images */}
          {program.image_urls && program.image_urls.length > 0 && (
            <div className="grid grid-cols-2 gap-4 mb-10">
              {program.image_urls.map((url, index) => (
                <div key={index} className="relative h-48 rounded-xl overflow-hidden shadow-md">
                  <Image
                    src={url}
                    alt={`${program.title} - Image ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}

          {/* Sub-programs (if this is a parent program) */}
          {subPrograms.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-serif font-bold text-primary-800 mb-6">
                Explore {program.title}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {subPrograms.map((sub) => (
                  <Link
                    key={sub.slug}
                    href={`/programs/${sub.slug}`}
                    className="group bg-white p-6 rounded-xl hover:bg-primary-50 transition-colors border border-gray-100 hover:border-primary-200 shadow-sm"
                  >
                    <h3 className="font-bold text-gray-800 group-hover:text-primary-600 transition-colors">
                      {sub.title}
                    </h3>
                    <p className="text-gray-500 text-sm mt-1 line-clamp-2">{sub.description}</p>
                    <div className="mt-3 text-primary-600 text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                      View Details <ArrowRight size={14} />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Siblings (other sub-programs under same parent) */}
          {siblings.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-serif font-bold text-primary-800 mb-6">
                More from {parentProgram?.title || 'Odyssey'}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {siblings.map((sibling) => (
                  <Link
                    key={sibling.slug}
                    href={`/programs/${sibling.slug}`}
                    className="group bg-white p-6 rounded-xl hover:bg-primary-50 transition-colors border border-gray-100 hover:border-primary-200 shadow-sm"
                  >
                    <h3 className="font-bold text-gray-800 group-hover:text-primary-600 transition-colors">
                      {sibling.title}
                    </h3>
                    <p className="text-gray-500 text-sm mt-1 line-clamp-2">{sibling.description}</p>
                    <div className="mt-3 text-primary-600 text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                      View Details <ArrowRight size={14} />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Year Breakdown */}
          {hasYearBreakdown && (
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-serif font-bold text-primary-800 mb-6">
                Our Journey
              </h2>
              <div className="space-y-6">
                {Object.entries(program.year_breakdown!)
                  .sort((a, b) => a[0].localeCompare(b[0]))
                  .map(([year, activities]) => (
                    <div key={year} className="border-l-4 border-primary-300 pl-6">
                      <h3 className="text-xl font-bold text-primary-600">{year}</h3>
                      <ul className="mt-2 space-y-2">
                        {(activities as string[]).map((activity: string, index: number) => (
                          <li key={index} className="text-gray-600 flex items-start gap-2 text-sm">
                            <span className="text-primary-400 mt-0.5">✦</span>
                            <span>{activity}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </section>

        {/* ===== CTA ===== */}
        <section className="py-16 bg-primary-900">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-serif font-bold text-white mb-4">
              Get Involved
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto mb-8">
              Join us in creating lasting change. Every contribution matters.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/volunteer"
                className="bg-white text-primary-900 px-8 py-3 rounded-full font-semibold hover:bg-primary-50 transition shadow-lg"
              >
                Volunteer With Us
              </Link>
              <Link
                href="/donate"
                className="bg-white/20 text-white px-8 py-3 rounded-full font-semibold border-2 border-white/30 hover:bg-white/30 transition"
              >
                Support Our Mission
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}