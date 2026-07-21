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
        
        {/* Hero — Navy Blue + Emerald */}
        <section className="relative h-[280px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0a1628] via-[#1a2a4a] to-emerald-800">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-emerald-500/10 to-transparent" />
            <div className="absolute bottom-0 right-0 w-1/3 h-1/2 bg-amber-400/5 rounded-full blur-3xl" />
          </div>
          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
            <span className="inline-block bg-white/10 backdrop-blur-md px-5 py-2 rounded-full text-sm font-semibold uppercase tracking-widest border border-white/20 mb-4">
              ✦ Moments Captured ✦
            </span>
            <h1 className="text-4xl sm:text-5xl font-serif font-bold drop-shadow-lg">
              Gallery
            </h1>
            <p className="text-white/80 text-lg max-w-2xl mx-auto mt-3 leading-relaxed">
              Glimpses of our journey, events, and the lives we touch.
            </p>
          </div>
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
              <path d="M0 40 Q360 0 720 40 T1440 40 V80 H0 V40Z" fill="#faf8f4" opacity="0.95" />
            </svg>
          </div>
        </section>

        {/* Gallery — Navy Blue + Emerald Green Theme */}
        <section className="py-16" style={{ background: 'linear-gradient(180deg, #faf8f4 0%, #f0ebe0 50%, #faf8f4 100%)' }}>
          <div className="max-w-7xl mx-auto px-6">
            <div className="relative">
              {/* Glow effects */}
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-emerald-400/15 rounded-full blur-3xl" />
              <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-emerald-400/10 rounded-full blur-3xl" />
              
              {/* ✅ Main Card — Navy Blue + Emerald Green */}
              <div className="relative bg-gradient-to-br from-[#0a1628] via-[#1a2a4a] to-emerald-900/80 backdrop-blur-2xl rounded-3xl shadow-2xl p-8 border border-emerald-500/20 shadow-emerald-900/30">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-emerald-500/5 to-transparent pointer-events-none" />
                <div className="absolute inset-0 rounded-3xl bg-[url('/grid-pattern.svg')] opacity-[0.03] pointer-events-none" />
                
                {/* ✅ Header — Navy Blue + Emerald */}
                <div className="relative flex items-center justify-between mb-6 pb-4 border-b border-emerald-500/20">
                  <div>
                    <h2 className="text-2xl font-serif font-bold text-white">Program Highlights</h2>
                    <p className="text-sm text-emerald-300/60">Browse through our journey captured in moments</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-emerald-300/60 bg-emerald-500/10 px-3 py-1 rounded-full backdrop-blur-sm border border-emerald-500/20">
                      Gallery
                    </span>
                  </div>
                </div>

                {/* Gallery Archive */}
                <div className="relative">
                  <GalleryArchive />
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="h-1 bg-gradient-to-r from-[#0a1628] via-emerald-500/50 to-[#0a1628]" />

      </main>
      <Footer />
    </>
  );
}