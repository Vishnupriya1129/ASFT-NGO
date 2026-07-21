import { Metadata } from 'next';
import { Navbar } from '@/app/components/layout/Navbar';
import { Footer } from '@/app/components/layout/Footer';
import { getTimeline } from '@/lib/timeline';
import { Timeline } from '@/app/components/about/Timeline';

export const metadata: Metadata = {
  title: 'Our Timeline | Aram Saeivom Family Trust',
  description: 'Explore the journey of Aram Saeivom Family Trust — from 2017 to the present.',
};

export default async function TimelinePage() {
  const timelineItems = await getTimeline();

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white pt-24">
        
        {/* Hero */}
        <section className="relative h-[200px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0F223D] via-[#1a2a4a] to-[#0E7A5F]">
          <div className="absolute inset-0 bg-black/20" />
          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
            <h1 className="text-3xl sm:text-4xl font-serif font-bold drop-shadow-lg">
              Journey Through the Years
            </h1>
            <p className="text-white/70 text-sm max-w-2xl mx-auto mt-2 leading-relaxed">
              Explore our story, chapter by chapter — from a simple act of kindness to a movement of change.
            </p>
          </div>
        </section>

        {/* Timeline */}
        <Timeline items={timelineItems} />

      </main>
      <Footer />
    </>
  );
}