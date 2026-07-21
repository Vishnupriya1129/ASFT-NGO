import { Metadata } from 'next';
import { Navbar } from '@/app/components/layout/Navbar';
import { Footer } from '@/app/components/layout/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Quote } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Founder\'s Note | Aram Saeivom Family Trust',
  description: 'A message from our founder — the vision, values, and journey of Aram Saeivom Family Trust.',
};

export default function FoundersNotePage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-[#F8F5EE] to-[#e8e0d4] pt-24">
        
        {/* Back Button */}
        <div className="max-w-4xl mx-auto px-6 pt-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-500 hover:text-emerald-600 transition-colors text-sm group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
        </div>

        {/* Main Content */}
        <section className="py-12 max-w-4xl mx-auto px-6">
          <div className="relative">
            {/* Decorative background */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-emerald-400/5 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-amber-400/5 rounded-full blur-3xl" />
            
            {/* Glass Card */}
            <div className="relative bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-12 border border-white/50">
              
              <Quote 
                size={80} 
                className="text-[#C9A227]/10 absolute top-6 right-8" 
                strokeWidth={1.5}
              />

              {/* Founder Image */}
              <div className="flex flex-col md:flex-row gap-8 items-center mb-10">
                <div className="relative w-32 h-40 md:w-40 md:h-50 flex-shrink-0">
                  <svg 
                    className="absolute inset-0 w-full h-full" 
                    viewBox="0 0 200 250" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <defs>
                      <clipPath id="ovalMaskSmall">
                        <ellipse cx="100" cy="125" rx="80" ry="100" />
                      </clipPath>
                    </defs>
                    
                    <foreignObject 
                      x="0" 
                      y="0" 
                      width="200" 
                      height="250" 
                      clipPath="url(#ovalMaskSmall)"
                      className="overflow-hidden"
                    >
                      <div className="relative w-full h-full">
                        <Image
                          src="https://vixzstrzqhwswhibzfdq.supabase.co/storage/v1/object/public/content-images/content-images/2024/Anniversary/_MG_8239.JPG"
                          alt="Founder - Aram Saeivom Family Trust"
                          fill
                          className="object-cover object-[center_30%]"
                        />
                      </div>
                    </foreignObject>
                    
                    <ellipse
                      cx="100"
                      cy="125"
                      rx="80"
                      ry="100"
                      stroke="#C9A227"
                      strokeWidth="1.5"
                      strokeOpacity="0.4"
                      fill="none"
                    />
                    <ellipse
                      cx="100"
                      cy="125"
                      rx="84"
                      ry="104"
                      stroke="#C9A227"
                      strokeWidth="0.5"
                      strokeOpacity="0.15"
                      fill="none"
                    />
                  </svg>
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-[#0a1628]" style={{ fontFamily: 'Times New Roman, serif' }}>
                    Founder's Note
                  </h1>
                  <p className="text-gray-500 mt-1" style={{ fontFamily: 'Times New Roman, serif' }}>
                    A message from the heart of Aram Saeivom Family Trust
                  </p>
                </div>
              </div>

              {/* Gold Divider */}
              <div className="flex items-center gap-4 mb-10">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#C9A227]/30" />
                <div className="w-2 h-2 rounded-full bg-[#C9A227]" />
                <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#C9A227]/30" />
              </div>

              {/* Full Note Content — Times New Roman */}
              <div className="prose prose-lg max-w-none" style={{ fontFamily: 'Times New Roman, serif' }}>
                <p className="text-gray-700 leading-relaxed text-lg italic">
                  "At Aram Saeivom Family Trust, we believe that true change begins with 
                  compassion and action. Every meal we serve, every child we educate, and 
                  every community we empower is a step toward a brighter, more equitable future."
                </p>
                
                <p className="text-gray-700 leading-relaxed mt-6">
                  Our journey began in 2017 with a simple belief: that small acts of kindness, 
                  when multiplied by many, can transform the world. What started as a dream 
                  has grown into a movement — one that touches thousands of lives across Tamil Nadu.
                </p>
                
                <p className="text-gray-700 leading-relaxed mt-6">
                  We have walked alongside communities through floods, cyclones, and a global 
                  pandemic. We have celebrated every child who returned to school, every family 
                  that accessed healthcare, and every community that took ownership of its 
                  environment. These victories remind us why we started, and they fuel our 
                  determination to continue.
                </p>
                
                <p className="text-gray-700 leading-relaxed mt-6">
                  Our work is built on compassion — not as a concept, but as a practice. Every 
                  meal we serve, every child we educate, and every community we empower is a 
                  step toward a brighter, more equitable future. Our journey is built on the 
                  unwavering belief that small acts of kindness, multiplied by many, can 
                  transform the world.
                </p>
                
                <p className="text-gray-700 leading-relaxed mt-6">
                  Today, as we look toward the future, we are more committed than ever. We 
                  invite you to join us — whether through volunteering, donations, or simply 
                  spreading the word. Together, we can build a world where dignity, opportunity, 
                  and hope are not privileges, but rights.
                </p>

                <p className="text-emerald-700 leading-relaxed mt-6 font-medium">
                  Thank you for being part of this journey.
                </p>
              </div>

              {/* Gold Divider */}
              <div className="flex items-center gap-4 my-10">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#C9A227]/30" />
                <div className="w-2 h-2 rounded-full bg-[#C9A227]" />
                <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#C9A227]/30" />
              </div>

              {/* Signature */}
              <div className="flex flex-col items-center text-center" style={{ fontFamily: 'Times New Roman, serif' }}>
                <div className="relative">
                  <p className="text-3xl font-bold text-[#0a1628]">
                    Balasubramanian
                  </p>
                  <div className="w-16 h-1 bg-[#C9A227] mx-auto mt-2 rounded-full" />
                </div>
                <p className="text-gray-500 mt-3">
                  Founder, Aram Saeivom Family Trust
                </p>
                <p className="text-sm text-gray-400 mt-1">
                  Since 2017
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <section className="py-12 max-w-4xl mx-auto px-6 text-center">
          <p className="text-sm text-gray-400" style={{ fontFamily: 'Times New Roman, serif' }}>
            <span className="text-[#C9A227] font-bold">✦</span> Every life touched is a story of hope.
          </p>
        </section>

      </main>
      <Footer />
    </>
  );
}