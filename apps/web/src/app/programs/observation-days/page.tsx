import { Metadata } from 'next';
import { Navbar } from '@/app/components/layout/Navbar';
import { Footer } from '@/app/components/layout/Footer';
import Link from 'next/link'; // ✅ Add this
import Image from 'next/image';
import { Calendar, Heart, Leaf, Smile } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Observation of Specific Days | Aram Saeivom Family Trust',
  description: 'Celebrating international days of awareness, health, and happiness.',
};

export default function ObservationDaysPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white pt-24">

        {/* Hero */}
        <section className="relative h-[300px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-800 to-primary-600">
          <div className="absolute inset-0 bg-black/20" />
          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
            <span className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-widest border border-white/30 mb-4">
              Awareness & Celebration
            </span>
            <h1 className="text-4xl sm:text-5xl font-serif font-bold drop-shadow-lg">
              Observation of Specific Days
            </h1>
            <p className="text-white/90 text-lg max-w-2xl mx-auto mt-4 leading-relaxed">
              Aligning our community efforts with global movements — celebrating days that inspire awareness, action, and hope.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 max-w-4xl mx-auto px-6">
          <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed mb-12">
            <p>
              At Aram Saeivom Family Trust, we believe that certain days carry a universal message — 
              one that can spark awareness, inspire action, and foster a deeper sense of responsibility 
              towards ourselves, others, and the planet.
            </p>
            <p className="mt-4">
              By observing internationally recognized days, we align our community efforts with global 
              movements. These observances provide us the opportunity to educate, advocate, and engage 
              individuals of all ages in meaningful activities that emphasize health, environmental 
              consciousness, happiness, and overall wellbeing.
            </p>
          </div>

          {/* World Health Day */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border-l-4 border-primary-500">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                <Heart size={24} className="text-primary-600" />
              </div>
              <h2 className="text-2xl font-serif font-bold text-primary-800">World Health Day</h2>
            </div>
            <p className="text-gray-600">
              Each year, we join the global community in raising awareness about critical health issues. 
              Through health camps, awareness sessions, and community outreach, we promote access to 
              healthcare and healthy living practices.
            </p>
          </div>

          {/* World Earth Day */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border-l-4 border-emerald-500">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                <Leaf size={24} className="text-emerald-600" />
              </div>
              <h2 className="text-2xl font-serif font-bold text-emerald-800">World Earth Day</h2>
            </div>
            <p className="text-gray-600">
              Our commitment to the environment comes alive on Earth Day. We organize clean-up drives, 
              tree plantation events, and awareness campaigns to inspire communities to take action 
              for a sustainable future.
            </p>
          </div>

          {/* International Day of Happiness */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border-l-4 border-amber-500">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                <Smile size={24} className="text-amber-600" />
              </div>
              <h2 className="text-2xl font-serif font-bold text-amber-800">International Day of Happiness</h2>
            </div>
            <p className="text-gray-600">
              Initiated in 2023, our celebration of the International Day of Happiness focuses on 
              reminding people of the value of small moments of joy in their busy lives.
            </p>
            <div className="mt-4 p-4 bg-amber-50 rounded-xl border border-amber-100">
              <p className="text-sm text-gray-700">
                <span className="font-semibold">In collaboration with Decathlon Madurai,</span> we organize 
                interactive games and activities that engage participants in a fun and refreshing manner. 
                These activities are designed to foster a sense of community, promote mental wellbeing, 
                and help people reconnect with the simple joys that often get overlooked in the rush 
                of daily routines.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-primary-50 border-t border-primary-100">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-2xl font-serif font-bold text-primary-800 mb-4">
              Join Our Observances
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8">
              Be a part of our global observances. Together, we can make every day meaningful.
            </p>
            <Link
              href="/volunteer"
              className="inline-block bg-primary-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-primary-700 transition shadow-lg shadow-primary-200"
            >
              Volunteer With Us
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}