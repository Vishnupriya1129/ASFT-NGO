import { Metadata } from 'next';
import { Navbar } from '@/app/components/layout/Navbar';
import { Footer } from '@/app/components/layout/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us | Aram Saeivom Family Trust',
  description: 'Learn about our mission, vision, and journey of transforming communities.',
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white pt-24">

        {/* ===== HERO ===== */}
        <section className="relative h-[450px] flex items-center justify-center overflow-hidden bg-primary-900">
          <div className="absolute inset-0">
            <Image
              src="https://vixzstrzqhwswhibzfdq.supabase.co/storage/v1/object/public/content-images/content-images/2023/Anniversary/_MG_2559.JPG"
              alt="Aram Saeivom Family Trust"
              fill
              className="object-cover opacity-40"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-primary-900/70 via-primary-900/60 to-primary-900/80" />
          </div>
          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
            <span className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-widest border border-white/30 mb-4">
              About Us
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold drop-shadow-lg">
              Aram Saeivom Family Trust
            </h1>
            <p className="text-xl sm:text-2xl text-white/90 max-w-2xl mx-auto mt-4 leading-relaxed">
              Empowering Youth. Transforming Communities. Inspiring Change.
            </p>
            <p className="text-white/60 text-sm mt-6 tracking-widest">
              — Since 2017 —
            </p>
          </div>
        </section>

        {/* ===== INTRODUCTION ===== */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-primary-900">
                Where Hope Finds a Home
              </h2>
              <div className="w-16 h-1 bg-primary-500 mx-auto mt-4 rounded-full" />
            </div>
            <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed">
              <p>
                Across Tamil Nadu, communities face challenges that often go unseen — 
                poverty, isolation, and lack of opportunity. At Aram Saeivom Family Trust, 
                we have walked alongside these communities for over eight years, 
                understanding that real transformation begins when people are seen, 
                heard, and valued.
              </p>
              <p className="mt-4">
                Our work sits at the intersection of social justice, education, 
                and community health. We combine comprehensive interventions with 
                initiatives that address the root causes of marginalization — 
                ensuring that no one is left behind.
              </p>
            </div>
          </div>
        </section>

        {/* ===== IMPACT ===== */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-primary-900 text-center mb-12">
              From Communities to Transformation
            </h2>
            <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed">
              <p>
                Our evidence-based interventions operate across multiple levels. 
                Through our programs, hundreds of individuals — the majority of them 
                women and youth — have found not just support, but a pathway back 
                to life and community on their own terms.
              </p>
              <p className="mt-4">
                We celebrate every victory: a child returning to school, a family 
                accessing healthcare, a community taking ownership of its environment. 
                Transformation is not measured in numbers alone, but in shared meals, 
                gardens tended together, and hopes rekindled.
              </p>
            </div>
          </div>
        </section>

        {/* ===== VISION & MISSION ===== */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-primary-900">
                Our Vision &amp; Mission
              </h2>
              <div className="w-16 h-1 bg-primary-500 mx-auto mt-4 rounded-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Vision */}
              <div className="bg-primary-50 rounded-2xl p-8 border border-primary-100">
                <h3 className="text-xl font-bold text-primary-800 mb-3">Our Vision</h3>
                <p className="text-gray-700 leading-relaxed">
                  To create a world that is inclusive, just, and humane — one that 
                  values the capabilities and active participation of every individual, 
                  especially the youth, in building a sustainable and equitable future.
                </p>
              </div>

              {/* Mission */}
              <div className="bg-emerald-50 rounded-2xl p-8 border border-emerald-100">
                <h3 className="text-xl font-bold text-emerald-800 mb-3">Our Mission</h3>
                <p className="text-gray-700 leading-relaxed">
                  To empower communities through education, healthcare, environmental 
                  action, and humanitarian support, creating sustainable pathways for 
                  youth and families to thrive with dignity and purpose.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ===== OUR STORY ===== */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-primary-900">
                Our Story
              </h2>
              <div className="w-16 h-1 bg-primary-500 mx-auto mt-4 rounded-full" />
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
              <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed">
                <p>
                  In 2017, a small group of passionate individuals encountered 
                  communities in need across Tamil Nadu. They witnessed children 
                  without access to education, families without healthcare, and 
                  environments in crisis. In their search for solutions, they 
                  discovered that no comprehensive services existed to address the 
                  interconnected needs of marginalized communities.
                </p>
                <p className="mt-4">
                  These encounters left the group with a clear conviction: they 
                  had to act. This led to the founding of Aram Saeivom Family Trust — 
                  a movement rooted in compassion, driven by purpose, and sustained 
                  by the belief that lasting change is possible.
                </p>
                <p className="mt-4 font-medium text-primary-700">
                  Today, we continue that journey — one community, one family, 
                  one life at a time.
                </p>
              </div>
              <div className="mt-8 flex justify-center">
                <Link
                  href="/timeline"
                  className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:gap-3 transition-all group"
                >
                  Explore Our Timeline <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ===== IMPACT STATS ===== */}
        <section className="py-20 bg-primary-900 text-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-serif font-bold">
                Our Impact in Numbers
              </h2>
              <div className="w-16 h-1 bg-primary-400 mx-auto mt-4 rounded-full" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-primary-300">8+</div>
                <div className="text-sm text-white/70 mt-2">Years of Service</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary-300">50+</div>
                <div className="text-sm text-white/70 mt-2">Programs</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary-300">1000+</div>
                <div className="text-sm text-white/70 mt-2">Lives Impacted</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary-300">18G/12A</div>
                <div className="text-sm text-white/70 mt-2">Registered Trust</div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== CTA ===== */}
        <section className="py-16 bg-white border-t border-gray-100">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-2xl font-serif font-bold text-primary-800 mb-4">
              Join Us in Our Mission
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8">
              Be a part of our journey. Whether through volunteering, donations, or partnerships — every contribution creates ripples of change.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/volunteer"
                className="bg-primary-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-primary-700 transition shadow-lg shadow-primary-200"
              >
                Volunteer With Us
              </Link>
              <Link
                href="/donate"
                className="bg-white text-primary-600 px-8 py-3 rounded-full font-semibold border-2 border-primary-200 hover:bg-primary-50 transition"
              >
                Support Our Mission
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}