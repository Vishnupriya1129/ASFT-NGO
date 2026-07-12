import { Metadata } from 'next';
import { Navbar } from '@/app/components/layout/Navbar';
import { Footer } from '@/app/components/layout/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, Shield, Banknote, QrCode, Building2, Copy, Check, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Donate | Aram Saeivom Family Trust',
  description: 'Support our mission. Every donation helps us create lasting change in communities across Tamil Nadu.',
};

export default function DonatePage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white pt-24">

        {/* ===== HERO ===== */}
        <section className="relative h-[350px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-800 to-primary-600">
          <div className="absolute inset-0 bg-black/20" />
          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
            <span className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-widest border border-white/30 mb-4">
              Support Our Mission
            </span>
            <h1 className="text-4xl sm:text-5xl font-serif font-bold drop-shadow-lg">
              Every Donation Plants a Seed of Hope
            </h1>
            <p className="text-white/90 text-lg max-w-2xl mx-auto mt-4 leading-relaxed">
              Your contribution directly funds meals, education, healthcare, and care for those who need it most.
            </p>
          </div>
        </section>

        {/* ===== 18G/12A BADGE ===== */}
        <section className="py-6 bg-primary-50 border-b border-primary-100">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
              <span className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-primary-100">
                <Shield size={18} className="text-primary-600" />
                <span className="font-semibold text-primary-700">18G/12A Registered</span>
              </span>
              <span className="text-gray-500">|</span>
              <span className="text-gray-600">
                All donations are eligible for tax exemption under Section 80G
              </span>
            </div>
          </div>
        </section>

        {/* ===== DONATION OPTIONS ===== */}
        <section className="py-16 max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-primary-900">
              Choose How You Want to Give
            </h2>
            <div className="w-16 h-1 bg-primary-500 mx-auto mt-4 rounded-full" />
            <p className="text-gray-600 max-w-2xl mx-auto mt-4">
              Every contribution, big or small, creates ripples of change. Here's how you can support our mission.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* ===== OPTION 1: UPI / QR ===== */}
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                  <QrCode size={24} className="text-primary-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">Scan &amp; Pay</h3>
              </div>
              
              <div className="bg-white rounded-xl p-6 text-center shadow-sm">
                <div className="relative w-48 h-48 mx-auto bg-white rounded-xl overflow-hidden border border-gray-200">
                  <Image
                    src="https://vixzstrzqhwswhibzfdq.supabase.co/storage/v1/object/public/content-images/QR/qr.png"
                    alt="UPI QR Code"
                    fill
                    className="object-contain p-2"
                  />
                </div>
                <p className="text-sm text-gray-500 mt-4">
                  Scan with PhonePe, GPay, Paytm, or any UPI app
                </p>
                <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-between">
                  <span className="text-sm font-mono text-gray-700">aramsaeivom@upi</span>
                  <button 
                    onClick={() => navigator.clipboard.writeText('aramsaeivom@upi')}
                    className="text-primary-600 hover:text-primary-700 text-sm flex items-center gap-1"
                  >
                    <Copy size={14} /> Copy
                  </button>
                </div>
              </div>
            </div>

            {/* ===== OPTION 2: BANK TRANSFER ===== */}
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                  <Building2 size={24} className="text-primary-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">Bank Transfer</h3>
              </div>

              <div className="space-y-4">
                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                  <p className="text-xs text-gray-500 uppercase tracking-wider">Account Name</p>
                  <p className="font-semibold text-gray-800">Aram Saeivom Family Trust</p>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                  <p className="text-xs text-gray-500 uppercase tracking-wider">Account Number</p>
                  <p className="font-semibold text-gray-800 font-mono">XXXXXXXXXXXX</p>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                  <p className="text-xs text-gray-500 uppercase tracking-wider">IFSC Code</p>
                  <p className="font-semibold text-gray-800 font-mono">XXXXX1234</p>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                  <p className="text-xs text-gray-500 uppercase tracking-wider">Bank Name</p>
                  <p className="font-semibold text-gray-800">State Bank of India</p>
                </div>
              </div>

              <div className="mt-6 p-4 bg-primary-50 rounded-xl border border-primary-100 text-center">
                <p className="text-sm text-gray-700">
                  <span className="font-semibold text-primary-700">Note:</span> After transferring, email us at{' '}
                  <a href="mailto:aramsaeivom@gmail.com" className="text-primary-600 hover:underline">
                    aramsaeivom@gmail.com
                  </a>
                  {' '}with your name and transaction ID for your receipt.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ===== 18G/12A DETAILS ===== */}
        <section className="py-16 bg-primary-900 text-white">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <div className="flex justify-center mb-4">
              <Shield size={48} className="text-primary-300" />
            </div>
            <h2 className="text-3xl font-serif font-bold mb-4">
              Your Donation is Tax-Deductible
            </h2>
            <p className="text-white/80 text-lg max-w-2xl mx-auto leading-relaxed">
              Aram Saeivom Family Trust is registered under <span className="text-white font-semibold">18G/12A</span> of the Income Tax Act. 
              All donations made to us are eligible for tax exemption under Section 80G.
            </p>
            <div className="mt-6 inline-block bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20">
              <span className="text-sm font-medium tracking-wider">Registration No: XXXXXXXXX</span>
            </div>
          </div>
        </section>

        {/* ===== IMPACT ===== */}
        <section className="py-16 bg-white border-t border-gray-100">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-2xl font-serif font-bold text-primary-800 mb-4">
              Your Support Creates Impact
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="text-3xl mb-2">🍲</div>
                <p className="font-bold text-gray-800">Meals Served</p>
                <p className="text-2xl font-bold text-primary-600">12,000+</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="text-3xl mb-2">👨‍👩‍👧‍👦</div>
                <p className="font-bold text-gray-800">Families Helped</p>
                <p className="text-2xl font-bold text-primary-600">1,500+</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="text-3xl mb-2">📚</div>
                <p className="font-bold text-gray-800">Programs</p>
                <p className="text-2xl font-bold text-primary-600">60+</p>
              </div>
            </div>
          </div>
        </section>

        {/* ===== CTA ===== */}
        <section className="py-16 bg-primary-50 border-t border-primary-100">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-2xl font-serif font-bold text-primary-800 mb-4">
              Have Questions?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8">
              If you have any questions about donating, or if you'd like to discuss other ways to support us, please reach out.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="mailto:aramsaeivom@gmail.com"
                className="inline-flex items-center gap-2 bg-primary-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-primary-700 transition shadow-lg shadow-primary-200"
              >
                Email Us <ArrowRight size={18} />
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-white text-primary-600 px-8 py-3 rounded-full font-semibold border-2 border-primary-200 hover:bg-primary-50 transition"
              >
                Contact Us <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}