import { Metadata } from 'next';
import { Navbar } from '@/app/components/layout/Navbar';
import { Footer } from '@/app/components/layout/Footer';
import { getPrograms } from '@/lib/programs';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, TreePine } from 'lucide-react';

export const metadata: Metadata = {
  title: 'All Programs | Aram Saeivom Family Trust',
  description: 'Explore our flagship Odyssey Project.',
};

// Safe Image Component
function SafeImage({ src, alt, className }: { src: string | null | undefined; alt: string; className?: string }) {
  if (!src) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-emerald-100 to-emerald-200 flex items-center justify-center">
        <TreePine size={64} className="text-emerald-600/40" />
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      className={className}
    />
  );
}

export default async function ProgramsPage() {
  const allPrograms = await getPrograms();
  
  // Get Odyssey program only
  const odyssey = allPrograms.find(p => p.slug === 'odyssey');

  if (!odyssey) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-gradient-to-b from-sky-pale to-cloud pt-24">
          <div className="max-w-7xl mx-auto px-6 py-16 text-center">
            <p className="text-gray-500">Odyssey program not found.</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-sky-pale to-cloud pt-24">
        
        {/* Hero */}
        <section className="relative h-[280px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0F223D] via-[#1a2a4a] to-emerald-800">
          <div className="absolute inset-0 bg-black/20" />
          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
            <span className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-widest border border-white/30 mb-4">
              Our Programs
            </span>
            <h1 className="text-4xl sm:text-5xl font-serif font-bold drop-shadow-lg">
              All Programs
            </h1>
            <p className="text-white/90 text-lg max-w-2xl mx-auto mt-4 leading-relaxed">
              Explore our flagship programs that create lasting change in communities across Tamil Nadu.
            </p>
          </div>
        </section>

        {/* Odyssey Program Card — Only One */}
        <section className="py-16 max-w-4xl mx-auto px-6">
          <Link
            href="/programs/odyssey"
            className="group block bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-emerald-300 hover:-translate-y-1"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
              {/* Image */}
              <div className="md:col-span-1 relative h-64 md:h-auto min-h-[280px] overflow-hidden">
                <SafeImage
                  src={odyssey.image_urls?.[0] || null}
                  alt={odyssey.title}
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                <div className="absolute top-4 left-4 bg-emerald-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  Flagship
                </div>
              </div>
              
              {/* Content */}
              <div className="md:col-span-2 p-8 md:p-10 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-3">
                  <TreePine size={32} className="text-emerald-600" />
                </div>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#0F223D] group-hover:text-emerald-700 transition-colors">
                  {odyssey.title}
                </h2>
                <p className="text-gray-600 text-lg mt-3 leading-relaxed max-w-2xl">
                  {odyssey.description}
                </p>
                
                <div className="mt-6 flex items-center gap-2 text-emerald-600 font-semibold group-hover:gap-3 transition-all">
                  Explore Odyssey <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </Link>

          {/* Note about other programs */}
          <div className="text-center mt-8 text-sm text-gray-400">
            <span className="text-[#C9A227]">✦</span> Odyssey is our flagship program. Explore its eight pillars to learn more.
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}