import { Metadata } from 'next';
import { Navbar } from '@/app/components/layout/Navbar';
import { Footer } from '@/app/components/layout/Footer';
import { Timeline } from '@/app/components/about/Timeline';
import { getTimeline } from '@/lib/timeline';

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
        <section className="relative h-[250px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-800 to-primary-600">
          <div className="absolute inset-0 bg-black/20" />
          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
            <span className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-widest border border-white/30 mb-4">
              Our Journey
            </span>
            <h1 className="text-4xl sm:text-5xl font-serif font-bold drop-shadow-lg">
              Our Timeline
            </h1>
            <p className="text-white/90 text-lg max-w-2xl mx-auto mt-4 leading-relaxed">
              Tracing our path of impact — from a simple act of kindness to a movement of change.
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