import { Navbar } from '@/app/components/layout/Navbar';
import { Footer } from '@/app/components/layout/Footer';
import GalleryArchive from '@/app/components/gallery/GalleryArchive';
import Image from 'next/image';

export default function GalleryPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-soil-dark text-white pt-24" id="main-content">
        <section className="py-24">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <span className="inline-flex items-center gap-2 bg-sun-warm/15 text-sun-warm px-5 py-2 rounded-full text-sm uppercase tracking-widest mb-5">
              Gallery
            </span>
            <h1 className="font-serif text-5xl mb-5">Stories from the Soil</h1>
            <p className="text-white/70 text-lg max-w-3xl mx-auto">
              Every photograph captures the spirit of India — from busy streets and village schools
              to community kitchens and smiling faces that inspire our work.
            </p>
          </div>
        </section>

        {/* Gallery Archive */}
        <GalleryArchive />

        <section className="py-20">
          <div className="max-w-6xl mx-auto px-6 grid gap-8 lg:grid-cols-2 items-center">
            <div className="space-y-6">
              <h2 className="font-serif text-4xl text-white">Real impact, real people.</h2>
              <p className="text-white/70 leading-relaxed">
                Our gallery is not just a showcase — it is a tribute to the communities we work with.
                You can see how meals are shared, classrooms come alive, and futures are transformed.
              </p>
            </div>
            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border border-white/10 bg-gradient-to-br from-sun-warm/30 to-sun-gold/30">
              <Image
                src="https://vixzstrzqhwswhibzfdq.supabase.co/storage/v1/object/public/content-images/content-%20images/2026/mental-health-training/FullSizeRender.jpeg"
                alt="School children in a classroom"
                width={900}
                height={650}
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}