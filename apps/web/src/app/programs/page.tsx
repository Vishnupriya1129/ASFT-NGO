import { Navbar } from '@/app/components/layout/Navbar';
import { Footer } from '@/app/components/layout/Footer';
import { ProgramsSection } from '@/app/components/home/ProgramsSection';
import Image from 'next/image';
import Link from 'next/link';

export default function ProgramsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-sky-pale to-cloud pt-24" id="main-content">
        <section className="py-24">
          <div className="max-w-6xl mx-auto px-6 grid gap-16 lg:grid-cols-[1.3fr_0.9fr] items-center">
            <div>
              <span className="section-tag">Programs</span>
              <h1 className="font-serif text-5xl text-soil-dark mb-5">Programs for Every Corner of India</h1>
              <p className="text-stone text-lg leading-relaxed mb-8">
                From rural classrooms in Maharashtra to community kitchens in Delhi, our programs are built to
                support local people with dignity, nutrition, education, and livelihood development.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-4 text-stone">
                  <span className="mt-1 text-forest-mid font-semibold">•</span>
                  Daily meal support for children, elders, and families in need.
                </li>
                <li className="flex items-start gap-4 text-stone">
                  <span className="mt-1 text-forest-mid font-semibold">•</span>
                  Mobile feeding camps, shelter outreach, and local food packet distribution.
                </li>
                <li className="flex items-start gap-4 text-stone">
                  <span className="mt-1 text-forest-mid font-semibold">•</span>
                  Education, life skills, and community training for long-term resilience.
                </li>
              </ul>
              <Link href="/#donate" className="btn-primary">
                Support a Program
              </Link>
            </div>

            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl bg-gradient-to-br from-sun-warm/30 to-sun-gold/30">
              <Image
                src="https://vixzstrzqhwswhibzfdq.supabase.co/storage/v1/object/public/content-images/content-%20images/2024/food-program/IMG_8860.JPG"
                alt="Volunteers serving food to families"
                width={900}
                height={700}
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-soil-dark/80 to-transparent" />
              <div className="absolute bottom-8 left-8 text-white max-w-xs">
                <p className="text-sm uppercase tracking-[0.25em] text-sun-warm mb-2">Arram Seivom Family Trust</p>
                <h2 className="font-serif text-3xl font-bold">Meals, care, and hope across India.</h2>
              </div>
            </div>
          </div>
        </section>

        <ProgramsSection />
      </main>
      <Footer />
    </>
  );
}
