'use client';

import { useState } from 'react';
import { Navbar } from '@/app/components/layout/Navbar';
import { Footer } from '@/app/components/layout/Footer';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import { Heart, Shield, QrCode, Building2, Copy, Check, ArrowRight, Sparkles } from 'lucide-react';

export default function DonatePage() {
  const [copied, setCopied] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <Head>
        <title>Donate | Aram Saeivom Family Trust</title>
        <meta name="description" content="Support our mission. Every donation helps us create lasting change in communities across Tamil Nadu." />
      </Head>

      <Navbar />
      <main className="min-h-screen pt-24">
        
        {/* ===== HERO — Navy + Emerald ===== */}
        <section className="relative h-[280px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0a1628] via-[#1a2a4a] to-emerald-800">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-emerald-500/10 to-transparent" />
            <div className="absolute bottom-0 right-0 w-1/3 h-1/2 bg-amber-400/5 rounded-full blur-3xl" />
          </div>
          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
            <span className="inline-block bg-white/10 backdrop-blur-md px-5 py-2 rounded-full text-sm font-semibold uppercase tracking-widest border border-white/20 mb-4">
              <Heart size={16} className="inline mr-2" />
              Support Our Mission
            </span>
            <h1 className="text-4xl sm:text-5xl font-serif font-bold drop-shadow-lg">
              Every Donation Plants a Seed of Hope
            </h1>
            <p className="text-white/80 text-lg max-w-2xl mx-auto mt-3 leading-relaxed">
              Your contribution directly funds meals, education, healthcare, and care for those who need it most.
            </p>
          </div>
          {/* Decorative bottom curve */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
              <path d="M0 40 Q360 0 720 40 T1440 40 V80 H0 V40Z" fill="#faf8f4" opacity="0.95" />
            </svg>
          </div>
        </section>

        {/* ===== 18G/12A BADGE ===== */}
        <section className="py-4 bg-[#0a1628]/5 border-b border-emerald-500/10">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
              <span className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm border border-emerald-500/20">
                <Shield size={18} className="text-emerald-600" />
                <span className="font-semibold text-[#0a1628]">18G/12A Registered</span>
              </span>
              <span className="text-gray-400">|</span>
              <span className="text-gray-500">
                All donations are eligible for tax exemption under Section 80G
              </span>
            </div>
          </div>
        </section>

        {/* ===== DONATION OPTIONS — Premium Glass Cards ===== */}
        <section className="py-16" style={{ background: 'linear-gradient(180deg, #faf8f4 0%, #f0ebe0 50%, #faf8f4 100%)' }}>
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0a1628]">
                Choose How You Want to Give
              </h2>
              <div className="w-16 h-1 bg-emerald-500 mx-auto mt-4 rounded-full" />
              <p className="text-gray-600 max-w-2xl mx-auto mt-4">
                Every contribution, big or small, creates ripples of change. Here's how you can support our mission.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* ===== OPTION 1: UPI / QR — Premium Glass ===== */}
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500/30 to-[#C9A227]/30 rounded-3xl blur opacity-0 group-hover:opacity-100 transition duration-500" />
                <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-white/50 shadow-xl hover:shadow-2xl transition-all duration-300">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                      <QrCode size={24} className="text-emerald-600" />
                    </div>
                    <h3 className="text-xl font-bold text-[#0a1628]">Scan &amp; Pay</h3>
                  </div>
                  
                  <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 text-center border border-white/30">
                    <div className="relative w-48 h-48 mx-auto bg-white rounded-xl overflow-hidden border border-gray-200 shadow-md">
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
                    <div className="mt-4 p-3 bg-white/80 backdrop-blur-sm rounded-xl border border-emerald-200 flex items-center justify-between">
                      <span className="text-sm font-mono text-[#0a1628]">aramsaeivom@upi</span>
                      <button 
                        onClick={() => handleCopy('aramsaeivom@upi')}
                        className="text-emerald-600 hover:text-emerald-700 text-sm flex items-center gap-1 transition-colors font-medium"
                      >
                        {copied ? <Check size={14} /> : <Copy size={14} />}
                        {copied ? 'Copied!' : 'Copy'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* ===== OPTION 2: BANK TRANSFER — Premium Glass ===== */}
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#C9A227]/30 to-emerald-500/30 rounded-3xl blur opacity-0 group-hover:opacity-100 transition duration-500" />
                <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-white/50 shadow-xl hover:shadow-2xl transition-all duration-300">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                      <Building2 size={24} className="text-emerald-600" />
                    </div>
                    <h3 className="text-xl font-bold text-[#0a1628]">Bank Transfer</h3>
                  </div>

                  <div className="space-y-3">
                    <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-white/30">
                      <p className="text-xs text-gray-400 uppercase tracking-wider">Account Name</p>
                      <p className="font-semibold text-[#0a1628]">Aram Saeivom Family Trust</p>
                    </div>
                    <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-white/30">
                      <p className="text-xs text-gray-400 uppercase tracking-wider">Account Number</p>
                      <p className="font-semibold text-[#0a1628] font-mono">XXXXXXXXXXXX</p>
                    </div>
                    <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-white/30">
                      <p className="text-xs text-gray-400 uppercase tracking-wider">IFSC Code</p>
                      <p className="font-semibold text-[#0a1628] font-mono">XXXXX1234</p>
                    </div>
                    <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-white/30">
                      <p className="text-xs text-gray-400 uppercase tracking-wider">Bank Name</p>
                      <p className="font-semibold text-[#0a1628]">State Bank of India</p>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-emerald-50/80 backdrop-blur-sm rounded-xl border border-emerald-200 text-center">
                    <p className="text-sm text-gray-700">
                      <span className="font-semibold text-emerald-700">Note:</span> After transferring, email us at{' '}
                      <a href="https://mail.google.com/mail/?view=cm&fs=1&to=aramsaeivom@gmail.com" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline font-medium">
                        aramsaeivom@gmail.com
                      </a>
                      {' '}with your name and transaction ID for your receipt.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== 18G/12A DETAILS — Navy + Emerald ===== */}
        <section className="py-16 bg-[#0a1628] text-white">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <div className="flex justify-center mb-4">
              <Shield size={48} className="text-emerald-400" />
            </div>
            <h2 className="text-3xl font-serif font-bold mb-4">
              Your Donation is Tax-Deductible
            </h2>
            <p className="text-white/70 text-lg max-w-2xl mx-auto leading-relaxed">
              Aram Saeivom Family Trust is registered under <span className="text-white font-semibold">18G/12A</span> of the Income Tax Act. 
              All donations made to us are eligible for tax exemption under Section 80G.
            </p>
            <div className="mt-6 inline-block bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/10">
              <span className="text-sm font-medium tracking-wider text-white/60">Registration No: XXXXXXXXX</span>
            </div>
          </div>
        </section>

        {/* ===== CTA ===== */}
        <section className="py-16 bg-white/80 backdrop-blur-sm border-t border-emerald-100/30">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-2xl font-serif font-bold text-[#0a1628] mb-4">
              Have Questions?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8">
              If you have any questions about donating, or if you'd like to discuss other ways to support us, please reach out.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=aramsaeivom@gmail.com" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-emerald-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-emerald-700 transition shadow-lg shadow-emerald-200"
              >
                Email Us <ArrowRight size={18} />
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-white text-[#0a1628] px-8 py-3 rounded-full font-semibold border-2 border-emerald-200 hover:bg-gray-50 transition"
              >
                Contact Us <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </section>

        {/* Subtle Footer Accent */}
        <div className="h-1 bg-gradient-to-r from-[#0a1628] via-emerald-500/50 to-[#0a1628]" />

      </main>
      <Footer />
    </>
  );
}
