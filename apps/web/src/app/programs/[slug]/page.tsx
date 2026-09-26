import { Metadata } from 'next';
import { Navbar } from '@/app/components/layout/Navbar';
import { Footer } from '@/app/components/layout/Footer';
import { getProgramBySlug, getSubPrograms, getPrograms, YearBreakdown } from '@/lib/programs';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from '@/components/ui/SafeImage';
import { ArrowRight, ChevronLeft, Home, MapPin, Heart } from 'lucide-react';

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

// ✅ Helper: normalize year_breakdown data into a consistent shape
function normalizeYearData(data: unknown): {
  title: string;
  summary: string;
  details: string[];
  location: string;
  impact: string;
} {
  let title = '';
  let summary = '';
  let details: string[] = [];
  let location = '';
  let impact = '';

  if (typeof data === 'string') {
    // Old format: single string
    summary = data;
  } else if (Array.isArray(data)) {
    // Old format: array of strings
    summary = data[0] || '';
    details = data.slice(1);
  } else if (typeof data === 'object' && data !== null) {
    // New format: rich object
    const obj = data as YearBreakdown;
    title = obj.title || '';
    summary = obj.summary || '';
    details = obj.details || [];
    location = obj.location || '';
    impact = obj.impact || '';
  }

  return { title, summary, details, location, impact };
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

          {/* ===== YEAR BREAKDOWN — Beautiful Chunked Cards ===== */}
          {hasYearBreakdown && (
            <div className="mt-8">
              <div className="text-center mb-12">
                <span className="inline-block bg-[#C9A227]/10 text-[#C9A227] px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-[0.2em] border border-[#C9A227]/20 mb-3">
                  Our Journey
                </span>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#0F223D]">
                  Milestones Through the Years
                </h2>
                <div className="w-16 h-1 bg-[#C9A227] mx-auto mt-4 rounded-full" />
              </div>

              <div className="space-y-6">
                {Object.entries(program.year_breakdown!)
                  .sort((a, b) => a[0].localeCompare(b[0]))
                  .map(([year, data]) => {
                    const { title, summary, details, location, impact } = normalizeYearData(data);

                    return (
                      <div
                        key={year}
                        className="relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
                      >
                        {/* Left accent bar */}
                        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-[#C9A227] to-[#0F223D]" />

                        <div className="p-6 md:p-8 pl-8">
                          <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-8">
                            {/* Year Badge */}
                            <div className="flex-shrink-0">
                              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#0F223D] to-[#1a2a4a] flex items-center justify-center shadow-lg">
                                <span className="text-white font-bold text-lg">{year}</span>
                              </div>
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                              {title && (
                                <h3 className="text-xl md:text-2xl font-serif font-bold text-[#0F223D] mb-2">
                                  {title}
                                </h3>
                              )}

                              {summary && (
                                <p className="text-gray-600 leading-relaxed mb-4 text-[15px]">
                                  {summary}
                                </p>
                              )}

                              {details.length > 0 && (
                                <ul className="space-y-2 mt-3">
                                  {details.map((detail, index) => (
                                    <li key={index} className="flex items-start gap-3 text-sm text-gray-700">
                                      <span className="text-[#C9A227] mt-0.5 flex-shrink-0">◆</span>
                                      <span>{detail}</span>
                                    </li>
                                  ))}
                                </ul>
                              )}

                              {/* Meta info */}
                              {(location || impact) && (
                                <div className="flex flex-wrap gap-3 mt-5 pt-4 border-t border-gray-100">
                                  {location && (
                                    <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-medium">
                                      <MapPin size={12} />
                                      {location}
                                    </span>
                                  )}
                                  {impact && (
                                    <span className="inline-flex items-center gap-1.5 bg-[#C9A227]/10 text-[#8B6914] px-3 py-1 rounded-full text-xs font-medium">
                                      <Heart size={12} />
                                      {impact}
                                    </span>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
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