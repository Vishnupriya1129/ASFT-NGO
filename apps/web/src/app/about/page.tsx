import { Navbar } from '@/app/components/layout/Navbar';
import { Footer } from '@/app/components/layout/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, Target, Users, ArrowRight, Award, TreePine, Handshake } from 'lucide-react';
import { getTimeline } from '@/lib/timeline';

export default async function AboutPage() {
  const timelineItems = await getTimeline();

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#F8F5EE] pt-24">
        
        {/* Hero */}
        <section className="relative h-[400px] sm:h-[500px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="https://vixzstrzqhwswhibzfdq.supabase.co/storage/v1/object/public/content-images/content-images/2023/Anniversary/_MG_2559.JPG"
              alt="Aram Saeivom Family Trust - About Us"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-[#0F223D]/70" />
          </div>
          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
            <span className="inline-block bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-widest border border-white/20 mb-4">
              About Us
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold drop-shadow-lg">
              Empowering Youth, <br />
              <span className="text-[#C9A227]">Transforming Communities</span>
            </h1>
            <p className="text-white/80 text-lg max-w-2xl mx-auto mt-4 leading-relaxed">
              Since 2017, we have been working tirelessly to create lasting change — one life, one family, one community at a time.
            </p>
          </div>
        </section>

        {/* Intro */}
        <section className="py-20 bg-[#F8F5EE]">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="inline-block bg-[#C9A227]/10 text-[#C9A227] px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-widest mb-4">
                  Who We Are
                </span>
                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0F223D] mb-6">
                  A Movement of <br />
                  <span className="text-[#0E7A5F]">Compassion and Action</span>
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-4">
                  Aram Saeivom Family Trust is a non-profit organization dedicated to uplifting 
                  underserved communities through education, healthcare, environmental action, 
                  and humanitarian support.
                </p>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Our journey began in 2017 with a simple belief: that small acts of kindness, 
                  multiplied by many, can transform the world.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center border border-[#C9A227]/10">
                  <Heart size={36} className="text-[#0E7A5F] mx-auto mb-3" />
                  <p className="text-2xl font-bold text-[#0F223D]">8+</p>
                  <p className="text-sm text-gray-500">Years of Service</p>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center border border-[#C9A227]/10">
                  <Handshake size={36} className="text-[#0E7A5F] mx-auto mb-3" />
                  <p className="text-2xl font-bold text-[#0F223D]">50+</p>
                  <p className="text-sm text-gray-500">Programs</p>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center border border-[#C9A227]/10">
                  <Users size={36} className="text-[#0E7A5F] mx-auto mb-3" />
                  <p className="text-2xl font-bold text-[#0F223D]">1000+</p>
                  <p className="text-sm text-gray-500">Lives Impacted</p>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center border border-[#C9A227]/10">
                  <Award size={36} className="text-[#0F223D] mx-auto mb-3" />
                  <p className="text-2xl font-bold text-[#0F223D]">18G/12A</p>
                  <p className="text-sm text-gray-500">Registered Trust</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Vision & Mission */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-14">
              <span className="inline-block bg-[#C9A227]/10 text-[#C9A227] px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-widest mb-4">
                Our Guiding Light
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0F223D]">
                Vision & Mission
              </h2>
              <div className="w-16 h-1 bg-[#C9A227] mx-auto mt-4 rounded-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-[#F8F5EE] rounded-2xl p-8 border-t-4 border-[#C9A227]">
                <h3 className="text-2xl font-bold text-[#0F223D] mb-4">Our Vision</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  To create a world that is inclusive, just, and humane — one that 
                  values the capabilities and active participation of every individual, 
                  especially the youth, in building a sustainable and equitable future.
                </p>
              </div>
              <div className="bg-[#F8F5EE] rounded-2xl p-8 border-t-4 border-[#0E7A5F]">
                <h3 className="text-2xl font-bold text-[#0F223D] mb-4">Our Mission</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  To empower communities through education, healthcare, environmental 
                  action, and humanitarian support, creating sustainable pathways for 
                  youth and families to thrive with dignity and purpose.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline */}

        {/* Program Glimpse */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-14">
              <span className="inline-block bg-[#C9A227]/10 text-[#C9A227] px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-widest mb-4">
                Our Work
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0F223D]">
                Program Glimpse
              </h2>
              <div className="w-16 h-1 bg-[#C9A227] mx-auto mt-4 rounded-full" />
              <p className="text-gray-600 max-w-2xl mx-auto mt-4">
                Explore the key areas where we create impact — click to learn more.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: 'Odyssey Project',
                  description: 'Civic engagement, training, outdoor education & field trips',
                  icon: TreePine,
                  href: '/programs/odyssey',
                  color: 'border-[#0E7A5F] hover:bg-[#0E7A5F]/5'
                },
                {
                  title: 'THOOYAM \'26',
                  description: 'Environmental action & community clean-up initiatives',
                  icon: Handshake,
                  href: '/programs/thooayam-26',
                  color: 'border-[#0F223D] hover:bg-[#0F223D]/5'
                },
                {
                  title: 'Relief Works',
                  description: 'Emergency response & disaster relief operations',
                  icon: Heart,
                  href: '/programs/relief-works',
                  color: 'border-[#C9A227] hover:bg-[#C9A227]/5'
                },
                {
                  title: 'Health & Humanitarian',
                  description: 'Medical camps, hygiene programs & community care',
                  icon: Users,
                  href: '/programs/health',
                  color: 'border-[#0E7A5F] hover:bg-[#0E7A5F]/5'
                }
              ].map((program) => {
                const Icon = program.icon;
                return (
                  <Link
                    key={program.title}
                    href={program.href}
                    className={`bg-white rounded-2xl p-6 shadow-lg border-t-4 ${program.color} hover:shadow-xl transition-all duration-300 group`}
                  >
                    <Icon size={32} className="text-[#0F223D] mb-3" />
                    <h3 className="text-lg font-bold text-[#0F223D] mb-2">{program.title}</h3>
                    <p className="text-gray-500 text-sm">{program.description}</p>
                    <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-[#0E7A5F] group-hover:gap-3 transition-all">
                      Learn More <ArrowRight size={16} />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-[#0F223D] text-white">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-serif font-bold mb-4">
              Join Us in Making a Difference
            </h2>
            <p className="text-white/70 text-lg mb-8">
              Become a part of our journey. Together, we can create lasting change.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/volunteer"
                className="bg-white text-[#0F223D] px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition"
              >
                Volunteer With Us
              </Link>
              <Link
                href="/donate"
                className="bg-[#0E7A5F] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#0E7A5F]/80 transition"
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