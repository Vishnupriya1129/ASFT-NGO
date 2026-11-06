import { Metadata } from 'next';
import { Navbar } from '@/app/components/layout/Navbar';
import { Footer } from '@/app/components/layout/Footer';
import { Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Contact Us | Aram Saeivom Family Trust',
  description: 'Get in touch with us — we\'d love to hear from you.',
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      {/* Main Background: Matching the Gallery's deep Navy to Emerald gradient */}
      <main className="min-h-screen bg-gradient-to-br from-[#0F223D] via-[#132B30] to-[#064E3B] pt-24 text-white overflow-hidden relative">
        
        {/* Decorative Glowing Orbs for the glass reflection */}
        <div className="absolute top-[10%] left-[5%] w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[20%] right-[5%] w-[400px] h-[400px] bg-[#C9A227]/10 rounded-full blur-[100px] pointer-events-none" />

        {/* Hero */}
        <section className="relative h-[250px] flex items-center justify-center overflow-hidden z-10">
          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
            <span className="inline-block bg-white/5 backdrop-blur-md px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-widest border border-white/10 mb-4 text-[#C9A227]">
              Get in Touch
            </span>
            <h1 className="text-4xl sm:text-5xl font-serif font-bold drop-shadow-lg mb-4 text-white">
              Contact Us
            </h1>
            <p className="text-white/60 text-lg max-w-2xl mx-auto leading-relaxed font-light">
              We'd love to hear from you. Reach out for inquiries, partnerships, or to learn more.
            </p>
          </div>
        </section>

        {/* Contact Info Cards Section */}
        <section className="relative py-12 max-w-6xl mx-auto px-6 z-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Email Card */}
            <a 
              href="https://mail.google.com/mail/?view=cm&fs=1&to=aramsaeivom@gmail.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group relative bg-white/5 backdrop-blur-xl rounded-3xl p-8 text-center border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.2)] hover:-translate-y-2 hover:bg-white/10 hover:border-[#C9A227]/30 hover:shadow-[0_8px_40px_0_rgba(201,162,39,0.15)] transition-all duration-500"
            >
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              
              <div className="relative w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 border border-white/10">
                <Mail size={28} className="text-[#C9A227]" />
              </div>
              <h3 className="font-bold text-white text-lg mb-2">Email Us</h3>
              <p className="text-white/60 text-sm group-hover:text-[#C9A227] transition-colors font-medium">
                aramsaeivom@gmail.com
              </p>
              <div className="mt-4 flex items-center justify-center gap-1 text-[#C9A227] text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                Send an email <ArrowUpRight size={14} />
              </div>
            </a>

            {/* Phone Card */}
            <a 
              href="tel:+918508053583" 
              className="group relative bg-white/5 backdrop-blur-xl rounded-3xl p-8 text-center border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.2)] hover:-translate-y-2 hover:bg-white/10 hover:border-[#C9A227]/30 hover:shadow-[0_8px_40px_0_rgba(201,162,39,0.15)] transition-all duration-500"
            >
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              
              <div className="relative w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300 border border-white/10">
                <Phone size={28} className="text-[#C9A227]" />
              </div>
              <h3 className="font-bold text-white text-lg mb-2">Call Us</h3>
              <p className="text-white/60 text-sm group-hover:text-[#C9A227] transition-colors font-medium">
                +91 85080 53583
              </p>
              <div className="mt-4 flex items-center justify-center gap-1 text-[#C9A227] text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                Call now <ArrowUpRight size={14} />
              </div>
            </a>

            {/* Address Card */}
            <div className="group relative bg-white/5 backdrop-blur-xl rounded-3xl p-8 text-center border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.2)] hover:-translate-y-2 hover:bg-white/10 hover:border-[#C9A227]/30 hover:shadow-[0_8px_40px_0_rgba(201,162,39,0.15)] transition-all duration-500">
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              
              <div className="relative w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 border border-white/10">
                <MapPin size={28} className="text-[#C9A227]" />
              </div>
              <h3 className="font-bold text-white text-lg mb-2">Visit Us</h3>
              <p className="text-white/60 text-sm leading-relaxed font-medium">
                No.381, Transport Nagar,<br />
                PTC Post, Madurai – 625022
              </p>
            </div>

          </div>

          {/* Google Map inside Glass Container */}
          <div className="mt-12 rounded-3xl overflow-hidden border border-white/10 relative group shadow-[0_8px_32px_0_rgba(0,0,0,0.2)]">
            <div className="absolute inset-0 bg-[#0F223D]/40 pointer-events-none group-hover:bg-transparent transition-colors duration-700 z-10" />
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3915.123456789!2d78.123456789!3d9.123456789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b00d07db7f2f9a3%3A0x2c535b9873f86ddc!2sR4H3%2B445%20Transport%20Nagar%2C%20Tamil%20Nadu%20625022!5e0!3m2!1sen!2sin!4v1730000000000"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Aram Saeivom Family Trust Location"
              className="w-full grayscale-[50%] contrast-[1.1] group-hover:grayscale-0 transition-all duration-700"
            />
          </div>

          {/* Social Media */}
          <div className="mt-20 text-center pb-12">
            <h2 className="text-2xl font-serif font-bold text-white mb-8">
              Connect With Us
            </h2>
            <div className="flex justify-center gap-4">
              <a
                href="https://m.facebook.com/1673806749585918/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 bg-white/5 backdrop-blur-xl text-white/70 rounded-2xl border border-white/10 flex items-center justify-center hover:bg-[#C9A227] hover:text-[#0F223D] hover:-translate-y-1 hover:shadow-lg hover:shadow-[#C9A227]/30 transition-all duration-300"
                aria-label="Facebook"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a
                href="https://www.instagram.com/aram_saeivom_family"
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 bg-white/5 backdrop-blur-xl text-white/70 rounded-2xl border border-white/10 flex items-center justify-center hover:bg-[#C9A227] hover:text-[#0F223D] hover:-translate-y-1 hover:shadow-lg hover:shadow-[#C9A227]/30 transition-all duration-300"
                aria-label="Instagram"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
              <a
                href="https://youtube.com/channel/UCfxiR29gQPTZMdUOXrZZD3A"
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 bg-white/5 backdrop-blur-xl text-white/70 rounded-2xl border border-white/10 flex items-center justify-center hover:bg-[#C9A227] hover:text-[#0F223D] hover:-translate-y-1 hover:shadow-lg hover:shadow-[#C9A227]/30 transition-all duration-300"
                aria-label="YouTube"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
              <a
                href="https://in.linkedin.com/company/aram-saeivom-family-trust"
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 bg-white/5 backdrop-blur-xl text-white/70 rounded-2xl border border-white/10 flex items-center justify-center hover:bg-[#C9A227] hover:text-[#0F223D] hover:-translate-y-1 hover:shadow-lg hover:shadow-[#C9A227]/30 transition-all duration-300"
                aria-label="LinkedIn"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}