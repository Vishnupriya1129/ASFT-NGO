import { Navbar } from '@/app/components/layout/Navbar';
import { Footer } from '@/app/components/layout/Footer';
import { EducationSection } from '@/app/components/home/EducationSection';
import Image from 'next/image';
import Link from 'next/link';

export default function EducationPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-earth-cream to-cloud pt-24" id="main-content">
        <section className="py-24">
          <div className="max-w-6xl mx-auto px-6 grid gap-16 lg:grid-cols-[0.95fr_1.05fr] items-center">
            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl bg-gradient-to-br from-forest-light/30 to-leaf-pale/30">
              <Image
                src="https://vixzstrzqhwswhibzfdq.supabase.co/storage/v1/object/public/content-images/content-%20images/2024/child-safety-program/IMG_2327.JPG"
                alt="Children learning together in a classroom"
                width={900}
                height={700}
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/70 to-transparent" />
              <div className="absolute bottom-8 left-8 text-white max-w-xs">
                <p className="text-sm uppercase tracking-[0.25em] text-sun-warm mb-2">Education</p>
                <h2 className="font-serif text-3xl font-bold">Learning for every child.</h2>
              </div>
            </div>

            <div>
              <span className="section-tag">Education</span>
              <h1 className="font-serif text-5xl text-soil-dark mb-5">Seed School of Hope</h1>
              <p className="text-stone text-lg leading-relaxed mb-8">
                Our education program brings books, digital learning, and teacher support to schools and learning hubs.
                We focus on children in underserved communities so they can grow with dignity.
              </p>
              <div className="space-y-4 mb-8 text-stone">
                <p>• Full-day classrooms with culturally relevant learning.</p>
                <p>• Computer literacy, life skills, and creative arts.</p>
                <p>• Nutrition and health checks for every student.</p>
              </div>
              <Link href="/volunteer" className="btn-primary">
                Join as Volunteer
              </Link>
            </div>
          </div>
        </section>

        <EducationSection />
      </main>
      <Footer />
    </>
  );
}
