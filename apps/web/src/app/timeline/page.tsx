import { Metadata } from 'next';
import { Navbar } from '@/app/components/layout/Navbar';
import { Footer } from '@/app/components/layout/Footer';
import { getTimeline } from '@/lib/timeline';
import { Timeline } from '@/app/components/about/Timeline';
import { ShootingStars } from '@/components/ShootingStars';

export const metadata: Metadata = {
  title: 'Our Journey | Aram Saeivom Family Trust',
  description: 'Explore the journey of Aram Saeivom Family Trust — from 2017 to the present.',
};

export default async function TimelinePage() {
  const timelineItems = await getTimeline();

  return (
    <>
      <Navbar />
      {/* Main Background: Navy to Jade Gradient */}
      <main className="min-h-screen bg-gradient-to-br from-[#0F223D] via-[#0F223D] to-[#064E3B] pt-24 overflow-hidden relative">
      
      <ShootingStars />

        {/* Subtle background glows for glass effect */}
        <div className="absolute top-[10%] left-[5%] w-[500px] h-[500px] bg-[#0E7A5F]/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[20%] right-[5%] w-[400px] h-[400px] bg-[#C9A227]/10 rounded-full blur-[100px] pointer-events-none" />

        {/* Hero Section */}
        <section className="relative h-[250px] flex items-center justify-center overflow-hidden z-10">
          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
            <span className="inline-block bg-white/5 backdrop-blur-md px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-widest border border-white/10 mb-4 text-[#C9A227]">
              Our Journey
            </span>
            <h1 className="text-4xl sm:text-5xl font-serif font-bold drop-shadow-lg mb-4 text-white">
              Journey Through the Years
            </h1>
            <p className="text-white/60 text-lg max-w-2xl mx-auto leading-relaxed font-light">
              Explore our story, chapter by chapter — from a single spark to a movement of change.
            </p>
          </div>
        </section>

        {/* The Timeline Component */}
        <section className="relative z-20">
          <Timeline items={timelineItems} />
        </section>

      </main>
      <Footer />
    </>
  );
}