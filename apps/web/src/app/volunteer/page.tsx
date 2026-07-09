import { Metadata } from 'next';
import { Navbar } from '@/app/components/layout/Navbar';
import { Footer } from '@/app/components/layout/Footer';
import Link from 'next/link';
import { Heart, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Volunteer | Aram Saeivom Family Trust',
  description: 'Join our mission. Volunteer with us and help transform communities.',
};

// Replace with your actual Google Form URL
const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSflPi3hdVtPvNNviAmOZZ5e0VewvOxxo5uCsMQBFnnlkzsITA/viewform?usp=send_form&pli=1&authuser=0';

export default function VolunteerPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white pt-24">
        {/* Hero Section */}
        <section className="relative bg-primary-500 text-white py-20 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="w-full h-full bg-black/20" />
          </div>
          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
            <span className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-widest border border-white/30">
              <Heart size={16} /> Join Our Movement
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold mt-6 drop-shadow-lg">
              Be the Change
            </h1>
            <p className="text-white/90 text-lg max-w-2xl mx-auto mt-4 leading-relaxed">
              Volunteer with Aram Saeivom Family Trust and help us plant seeds of hope
              in our communities.
            </p>
          </div>
        </section>

        {/* Volunteer Sign-Up */}
        <section className="py-16 max-w-4xl mx-auto px-6">
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-slate-100">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart size={28} className="text-emerald-500" />
              </div>
              <h2 className="text-3xl font-serif font-bold text-primary-500">
                Volunteer Sign Up
              </h2>
              <p className="text-slate-500 mt-2">
                Fill out this quick form and we'll get back to you within 48 hours.
              </p>
            </div>

            <div className="text-center">
              <p className="text-slate-600 mb-6">
                Please complete our volunteer application form. It only takes a few minutes!
              </p>
              <a
                href={GOOGLE_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center gap-2 px-8 py-4 text-lg"
              >
                Apply Now <ArrowRight size={20} />
              </a>
              <p className="text-xs text-slate-400 mt-4">
                You'll be redirected to Google Forms to complete your application.
              </p>
            </div>

            {/* Optional: Quick info about volunteering */}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-slate-100 pt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-500">🌟</div>
                <p className="text-sm text-slate-600 mt-1">Flexible Hours</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-500">🤝</div>
                <p className="text-sm text-slate-600 mt-1">Community Impact</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-500">📜</div>
                <p className="text-sm text-slate-600 mt-1">Certificate Provided</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}