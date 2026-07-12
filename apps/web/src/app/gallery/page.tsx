import { Metadata } from 'next';
import { Navbar } from '@/app/components/layout/Navbar';
import { Footer } from '@/app/components/layout/Footer';
import GalleryArchive from '@/app/components/gallery/GalleryArchive';

export const metadata: Metadata = {
  title: 'Gallery | Aram Saeivom Family Trust',
  description: 'Explore moments from our journey — captured through the lens.',
};

export default function GalleryPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24">
        
        {/* Hero with colorful gradient */}
        <section className="relative h-[250px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-700 via-primary-500 to-primary-300">
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />
          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
            <span className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-widest border border-white/30 mb-4">
              Moments Captured
            </span>
            <h1 className="text-4xl sm:text-5xl font-serif font-bold drop-shadow-lg">
              Gallery
            </h1>
            <p className="text-white/90 text-lg max-w-2xl mx-auto mt-4 leading-relaxed">
              Glimpses of our journey, events, and the lives we touch.
            </p>
          </div>
        </section>

        {/* Gallery with colorful background */}
        <section className="py-12 bg-gradient-to-b from-primary-50 via-white to-primary-50/30">
          <div className="max-w-7xl mx-auto px-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/50">
              <GalleryArchive />
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}