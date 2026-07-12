import { Metadata } from 'next';
import { Navbar } from '@/app/components/layout/Navbar';
import { Footer } from '@/app/components/layout/Footer';
import { Mail, Phone, MapPin, Facebook, Instagram, Youtube, Linkedin } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Contact Us | Aram Saeivom Family Trust',
  description: 'Get in touch with us — we\'d love to hear from you.',
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white pt-24">
        
        {/* Hero */}
        <section className="relative h-[250px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-800 to-primary-600">
          <div className="absolute inset-0 bg-black/20" />
          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
            <span className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-widest border border-white/30 mb-4">
              Get in Touch
            </span>
            <h1 className="text-4xl sm:text-5xl font-serif font-bold drop-shadow-lg">
              Contact Us
            </h1>
            <p className="text-white/90 text-lg max-w-2xl mx-auto mt-4 leading-relaxed">
              We'd love to hear from you. Reach out for inquiries, partnerships, or to learn more.
            </p>
          </div>
        </section>

        {/* Contact Info */}
        <section className="py-16 max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-gray-50 rounded-2xl p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail size={24} className="text-primary-600" />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Email</h3>
              <a href="mailto:aramsaeivom@gmail.com" className="text-gray-600 hover:text-primary-600 transition">
                aramsaeivom@gmail.com
              </a>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone size={24} className="text-primary-600" />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Phone</h3>
              <a href="tel:+918508053583" className="text-gray-600 hover:text-primary-600 transition">
                +91 85080 53583
              </a>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin size={24} className="text-primary-600" />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Address</h3>
              <p className="text-gray-600">
                No.381, Transport Nagar,<br />
                PTC Post, Madurai – 625022
              </p>
            </div>
          </div>

          {/* Google Map */}
          <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-200 mb-12">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3915.123456789!2d78.123456789!3d9.123456789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOcKwMDcnMjQuNiJOIDc4wrAwNyc0Mi40IkU!5e0!3m2!1sen!2sin!4v1234567890"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Aram Saeivom Family Trust Location"
              className="w-full"
            />
          </div>

          {/* Social Media */}
          <div className="text-center">
            <h2 className="text-2xl font-serif font-bold text-primary-800 mb-6">
              Follow Us
            </h2>
            <div className="flex justify-center gap-4">
              <a
                href="https://m.facebook.com/1673806749585918/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 bg-[#1877F2] text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                aria-label="Facebook"
              >
                <Facebook size={24} />
              </a>
              <a
                href="https://www.instagram.com/aram_saeivom_family"
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 bg-gradient-to-br from-[#E4405F] to-[#F56040] text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                aria-label="Instagram"
              >
                <Instagram size={24} />
              </a>
              <a
                href="https://youtube.com/channel/UCfxiR29gQPTZMdUOXrZZD3A"
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 bg-[#FF0000] text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                aria-label="YouTube"
              >
                <Youtube size={24} />
              </a>
              <a
                href="https://in.linkedin.com/company/aram-saeivom-family-trust"
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 bg-[#0A66C2] text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                aria-label="LinkedIn"
              >
                <Linkedin size={24} />
              </a>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}