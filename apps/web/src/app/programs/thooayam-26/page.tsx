import { Metadata } from 'next';
import { Navbar } from '@/app/components/layout/Navbar';
import { Footer } from '@/app/components/layout/Footer';
import Image from '@/components/ui/SafeImage';
import Link from 'next/link';
import { ArrowLeft, Calendar, MapPin, Users, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'THOOYAM \'26 | Aram Saeivom Family Trust',
  description: 'Environmental action and community clean-up initiative.',
};

export default function ThooayamPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-sky-pale to-cloud pt-24">
        
        {/* Back Button */}
        <div className="max-w-7xl mx-auto px-6 pt-4">
          <Link
            href="/programs"
            className="inline-flex items-center gap-2 text-gray-500 hover:text-primary-600 transition-colors text-sm"
          >
            <ArrowLeft size={16} /> Back to Programs
          </Link>
        </div>

        {/* Hero */}
        <section className="relative h-[350px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-800 to-blue-600 mx-6 rounded-3xl">
          <div className="absolute inset-0 bg-black/20" />
          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
            <span className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-widest border border-white/30 mb-4">
              <Sparkles size={16} className="inline mr-2" />
              Environmental Action
            </span>
            <h1 className="text-4xl sm:text-5xl font-serif font-bold drop-shadow-lg">
              THOOYAM '26
            </h1>
            <p className="text-white/90 text-lg max-w-2xl mx-auto mt-4 leading-relaxed">
              Environmental action and community clean-up initiative — creating lasting change through collective effort.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 max-w-4xl mx-auto px-6">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-serif font-bold text-primary-800 mb-4">
              About THOOYAM '26
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              THOOYAM '26 is our flagship environmental action program focused on community clean-up, 
              waste management, and environmental awareness. Through large-scale clean-up drives and 
              educational campaigns, we aim to create lasting behavioral change in communities.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Join us in making a difference — every small action contributes to a cleaner, greener future.
            </p>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}