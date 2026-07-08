import { Metadata } from 'next';
import { Navbar } from '@/app/components/layout/Navbar';
import { Footer } from '@/app/components/layout/Footer';
import { ProgramsSection } from '@/app/components/home/ProgramsSection';
import GalleryArchive from '@/app/components/gallery/GalleryArchive';

export const metadata: Metadata = {
  title: 'Programs',
  description: 'Explore our programs that empower communities.',
};

export default function ProgramsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-sky-pale to-cloud pt-24">
        {/* Program cards – already has its own heading */}
        <ProgramsSection />

        {/* Gallery section – separate heading */}
        <section className="py-16 bg-gradient-to-b from-primary-900 to-soil-dark">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-4xl font-serif text-white mb-8 text-center">
              Program Highlights – Gallery
            </h2>
            <GalleryArchive />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}