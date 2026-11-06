'use client';

import { useState } from 'react';
import { Navbar } from '@/app/components/layout/Navbar';
import { Footer } from '@/app/components/layout/Footer';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import { Heart, Shield, QrCode, Building2, Copy, Check, ArrowRight } from 'lucide-react';

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
      {/* Main Background: Deep Jade Green */}
      <main className="min-h-screen bg-[#05140F] pt-24 overflow-hidden relative">
        
        {/* Background Glowing Orbs */}
        <div className="absolute top-[10%] left-[5%] w-[500px] h-[500px] bg-[#0E7A5F]/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[20%] right-[5%] w-[400px] h-[400px] bg-[#C9A227]/10 rounded-full blur-[100px] pointer-events-none" />

               {/* ===== HERO — Smooth Transition ===== */}
               {/* ===== HERO — Seamless Gradient Transition ===== */}
        <section className="relative flex flex-col items-center justify-center pt-24 pb-32 px-6 overflow-hidden">
          
          {/* Navy to Emerald Background that fades into the main background */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0F223D] via-[#0F223D] to-[#05140F] z-0" />
          
          {/* Glowing Orbs */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#0E7A5F]/20 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#C9A227]/10 rounded-full blur-[80px] pointer-events-none" />

          {/* Text Content */}
          <div className="relative z-10 max-w-4xl mx-auto text-center text-white">
            <span className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-md px-5 py-2 rounded-full text-sm font-semibold uppercase tracking-widest border border-white/10 mb-6 text-[#C9A227] shadow-sm">
              <Heart size={16} /> Support Our Mission
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold drop-shadow-lg mb-6 leading-tight">
              Every Donation Plants a Seed of Hope
            </h1>
            <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-light">
              Your contribution directly funds meals, education, healthcare, and care for those who need it most.
            </p>
          </div>
        </section>

        {/* ===== TAX EXEMPTION BADGE ===== */}
        <section className="relative z-20 pb-16">
          <div className="max-w-3xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-center gap-6 text-center">
            <div className="flex items-center gap-2 bg-[#0F223D] px-6 py-3 rounded-full shadow-[0_0_20px_rgba(14,122,95,0.3)] border border-[#0E7A5F]/50 text-[#0E7A5F]">
              <Shield size={20} />
              <span className="font-bold text-sm tracking-wide">18G/12A Registered</span>
            </div>
            <p className="text-white/60 text-sm max-w-sm sm:max-w-none">
              All donations are eligible for tax exemption under Section 80G
            </p>
          </div>
        </section>
        {/* ===== DONATION OPTIONS — Frosted Glass on Jade ===== */}
        <section className="py-16 relative z-10">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-white">
                Choose How You Want to Give
              </h2>
              <div className="w-16 h-1 bg-[#C9A227] mx-auto mt-4 rounded-full" />
              <p className="text-white/70 max-w-2xl mx-auto mt-4 text-lg font-light">
                Every contribution, big or small, creates ripples of change. Here's how you can support our mission.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* OPTION 1: UPI / QR */}
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#0E7A5F] to-[#C9A227] rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition duration-500" />
                <div className="relative bg-[#0F223D]/80 backdrop-blur-xl rounded-[2.5rem] p-8 border border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.3)] h-full flex flex-col">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-[#0E7A5F]/20 rounded-full flex items-center justify-center">
                      <QrCode size={24} className="text-[#0E7A5F]" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">Scan & Pay</h3>
                  </div>
                  
                  <div className="bg-white/5 rounded-2xl p-6 text-center border border-white/5 flex-grow flex flex-col items-center justify-center">
                    <div className="relative w-48 h-48 bg-white rounded-xl overflow-hidden shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                      <Image
                        src="https://res.cloudinary.com/kvatjwwc/image/upload/f_auto,q_auto,w_1200/v1789557702/qr_1.png"
                        alt="UPI QR Code"
                        fill
                        className="object-contain p-2"
                      />
                    </div>
                    <p className="text-sm text-white/60 mt-4">
                      Scan with PhonePe, GPay, Paytm, or any UPI app
                    </p>
                    <div className="mt-4 w-full p-3 bg-[#0F223D] rounded-xl border border-white/10 flex items-center justify-between">
                      <span className="text-sm font-mono text-white/80">aramsaeivom@upi</span>
                      <button 
                        onClick={() => handleCopy('aramsaeivom@upi')}
                        className="text-[#C9A227] hover:text-white text-sm flex items-center gap-1 transition-colors font-medium"
                      >
                        {copied ? <Check size={14} /> : <Copy size={14} />}
                        {copied ? 'Copied!' : 'Copy'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* OPTION 2: BANK TRANSFER */}
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#C9A227] to-[#0E7A5F] rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition duration-500" />
                <div className="relative bg-[#0F223D]/80 backdrop-blur-xl rounded-[2.5rem] p-8 border border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.3)] h-full flex flex-col">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-[#C9A227]/20 rounded-full flex items-center justify-center">
                      <Building2 size={24} className="text-[#C9A227]" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">Bank Transfer</h3>
                  </div>

                  <div className="space-y-3 flex-grow">
                    <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                      <p className="text-xs text-white/40 uppercase tracking-wider">Account Name</p>
                      <p className="font-semibold text-white">Aram Saeivom Family Trust</p>
                    </div>
                    <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                      <p className="text-xs text-white/40 uppercase tracking-wider">Account Number</p>
                      <p className="font-semibold text-white font-mono">XXXXXXXXXXXX</p>
                    </div>
                    <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                      <p className="text-xs text-white/40 uppercase tracking-wider">IFSC Code</p>
                      <p className="font-semibold text-white font-mono">XXXXX1234</p>
                    </div>
                    <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                      <p className="text-xs text-white/40 uppercase tracking-wider">Bank Name</p>
                      <p className="font-semibold text-white">State Bank of India</p>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-[#0E7A5F]/20 rounded-xl border border-[#0E7A5F]/30 text-center">
                    <p className="text-sm text-white/80">
                      <span className="font-semibold text-[#C9A227]">Note:</span> After transferring, email us at{' '}
                      <a href="https://mail.google.com/mail/?view=cm&fs=1&to=aramsaeivom@gmail.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#C9A227] underline font-medium transition-colors">
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

        {/* ===== 18G/12A DETAILS ===== */}
        <section className="py-20 relative z-10">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/5 backdrop-blur-md border border-white/10 rounded-full mb-6">
              <Shield size={40} className="text-[#0E7A5F]" />
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
              Your Donation is Tax-Deductible
            </h2>
            <p className="text-white/70 text-lg max-w-2xl mx-auto leading-relaxed mb-8">
              Aram Saeivom Family Trust is registered under <span className="text-white font-semibold">18G/12A</span> of the Income Tax Act. 
              All donations made to us are eligible for tax exemption under Section 80G.
            </p>
            <div className="inline-block bg-[#0F223D] px-6 py-3 rounded-full border border-white/10 shadow-lg">
              <span className="text-sm font-medium tracking-wider text-white/60">Registration No: XXXXXXXXX</span>
            </div>
          </div>
        </section>

        {/* ===== CTA ===== */}
        <section className="py-20 relative z-10">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[3rem] p-12 shadow-[0_20px_50px_rgba(0,0,0,0.2)]">
              <h2 className="text-3xl font-serif font-bold text-white mb-4">
                Have Questions?
              </h2>
              <p className="text-white/70 max-w-2xl mx-auto mb-8 text-lg">
                If you have any questions about donating, or if you'd like to discuss other ways to support us, please reach out.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=aramsaeivom@gmail.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-[#C9A227] text-[#0F223D] px-8 py-4 rounded-full font-bold hover:bg-[#E8C84A] transition-all shadow-xl hover:-translate-y-1"
                >
                  Email Us <ArrowRight size={18} />
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-white/10 text-white px-8 py-4 rounded-full font-bold border border-white/20 hover:bg-white/20 transition-all hover:-translate-y-1"
                >
                  Contact Us <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Subtle Footer Accent */}
        <div className="h-1 w-full bg-gradient-to-r from-[#0F223D] via-[#0E7A5F] to-[#C9A227]" />

      </main>
      <Footer />
    </>
  );
}