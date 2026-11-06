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
      {/* Main Background: Deep Navy to Emerald */}
      <main className="min-h-screen bg-gradient-to-br from-[#0F223D] via-[#0F223D] to-[#064E3B] pt-24 overflow-hidden relative">
        
        {/* Background Glowing Orbs */}
        <div className="absolute top-[10%] left-[5%] w-[500px] h-[500px] bg-[#0E7A5F]/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[20%] right-[5%] w-[400px] h-[400px] bg-[#C9A227]/10 rounded-full blur-[100px] pointer-events-none" />

        {/* Hero */}
        <section className="relative h-[400px] sm:h-[500px] flex items-center justify-center overflow-hidden z-10">
          <div className="absolute inset-0 z-0">
            <Image
              src="https://res.cloudinary.com/kvatjwwc/image/upload/f_auto,q_auto,w_1200/v1789558526/_MG_8246.jpg"
              alt="Aram Saeivom Family Trust - About Us"
              fill
              className="object-cover"
              priority
            />
            {/* Dark gradient overlay so text pops over the image */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F223D] via-[#0F223D]/70 to-transparent" />
          </div>
          
          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white mt-12">
            <span className="inline-block bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-[0.2em] border border-white/20 mb-6 text-[#C9A227] shadow-[0_0_15px_rgba(201,162,39,0.3)]">
              About Us
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold drop-shadow-lg mb-6">
              Empowering Youth, <br />
              <span className="text-[#C9A227]">Transforming Communities</span>
            </h1>
            <p className="text-white/80 text-lg max-w-2xl mx-auto leading-relaxed font-light">
              Since 2017, we have been working tirelessly to create lasting change — one life, one family, one community at a time.
            </p>
          </div>
        </section>

        {/* Intro */}
        <section className="py-20 relative z-10">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="inline-block bg-[#C9A227]/10 text-[#C9A227] px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-widest mb-4 border border-[#C9A227]/20">
                  Who We Are
                </span>
                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mb-6 leading-tight">
                  A Movement of <br />
                  <span className="text-[#0E7A5F]">Compassion and Action</span>
                </h2>
                <p className="text-white/70 text-lg leading-relaxed mb-4">
                  Aram Saeivom Family Trust is a non-profit organization dedicated to uplifting 
                  underserved communities through education, healthcare, environmental action, 
                  and humanitarian support.
                </p>
                <p className="text-white/70 text-lg leading-relaxed">
                  Our journey began in 2017 with a simple belief: that small acts of kindness, 
                  multiplied by many, can transform the world.
                </p>
              </div>
              
              {/* Glass Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 backdrop-blur-md rounded-3xl p-6 text-center border border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:bg-white/10 transition-colors duration-300">
                  <Heart size={36} className="text-[#0E7A5F] mx-auto mb-3" />
                  <p className="text-2xl font-bold text-white">10+</p>
                  <p className="text-sm text-white/60">Years of Service</p>
                </div>
                <div className="bg-white/5 backdrop-blur-md rounded-3xl p-6 text-center border border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:bg-white/10 transition-colors duration-300">
                  <Handshake size={36} className="text-[#0E7A5F] mx-auto mb-3" />
                  <p className="text-2xl font-bold text-white">50+</p>
                  <p className="text-sm text-white/60">Programs</p>
                </div>
                <div className="bg-white/5 backdrop-blur-md rounded-3xl p-6 text-center border border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:bg-white/10 transition-colors duration-300">
                  <Users size={36} className="text-[#0E7A5F] mx-auto mb-3" />
                  <p className="text-2xl font-bold text-white">1000+</p>
                  <p className="text-sm text-white/60">Lives Impacted</p>
                </div>
                <div className="bg-white/5 backdrop-blur-md rounded-3xl p-6 text-center border border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:bg-white/10 transition-colors duration-300">
                  <Award size={36} className="text-[#C9A227] mx-auto mb-3" />
                  <p className="text-2xl font-bold text-white">18G/12A</p>
                  <p className="text-sm text-white/60">Registered Trust</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Vision & Mission */}
        <section className="py-20 relative z-10">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-14">
              <span className="inline-block bg-[#C9A227]/10 text-[#C9A227] px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-widest mb-4 border border-[#C9A227]/20">
                Our Guiding Light
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">
                Vision & Mission
              </h2>
              <div className="w-16 h-1 bg-[#C9A227] mx-auto mt-4 rounded-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.12)] relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#0E7A5F] to-transparent" />
                <h3 className="text-2xl font-bold text-white mb-4">Our Vision</h3>
                <p className="text-white/70 text-lg leading-relaxed">
                  To create a world that is inclusive, just, and humane — one that 
                  values the capabilities and active participation of every individual, 
                  especially the youth, in building a sustainable and equitable future.
                </p>
              </div>
              <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.12)] relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#C9A227] to-transparent" />
                <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
                <p className="text-white/70 text-lg leading-relaxed">
                  To empower communities through education, healthcare, environmental 
                  action, and humanitarian support, creating sustainable pathways for 
                  youth and families to thrive with dignity and purpose.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Program Glimpse */}
        <section className="py-20 relative z-10">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-14">
              <span className="inline-block bg-[#C9A227]/10 text-[#C9A227] px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-widest mb-4 border border-[#C9A227]/20">
                Our Work
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">
                Program Glimpse
              </h2>
              <div className="w-16 h-1 bg-[#C9A227] mx-auto mt-4 rounded-full" />
              <p className="text-white/60 max-w-2xl mx-auto mt-4">
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
                  color: 'text-[#0E7A5F]'
                },
                {
                  title: 'THOOYAM \'26',
                  description: 'Environmental action & community clean-up initiatives',
                  icon: Handshake,
                  href: '/programs/thooayam-26',
                  color: 'text-white'
                },
                {
                  title: 'Relief Works',
                  description: 'Emergency response & disaster relief operations',
                  icon: Heart,
                  href: '/programs/relief-works',
                  color: 'text-[#C9A227]'
                },
                {
                  title: 'Health & Humanitarian',
                  description: 'Medical camps, hygiene programs & community care',
                  icon: Users,
                  href: '/programs/health',
                  color: 'text-[#0E7A5F]'
                }
              ].map((program) => {
                const Icon = program.icon;
                return (
                  <Link
                    key={program.title}
                    href={program.href}
                    className="bg-white/5 backdrop-blur-md rounded-3xl p-6 border border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:bg-white/10 hover:-translate-y-1 transition-all duration-300 group flex flex-col"
                  >
                    <Icon size={32} className={`${program.color} mb-4 group-hover:scale-110 transition-transform duration-300`} />
                    <h3 className="text-lg font-bold text-white mb-2">{program.title}</h3>
                    <p className="text-white/60 text-sm leading-relaxed mb-4 flex-grow">{program.description}</p>
                    <div className="flex items-center gap-2 text-sm font-semibold text-[#C9A227] group-hover:gap-3 transition-all mt-auto">
                      Learn More <ArrowRight size={16} />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-white/5 backdrop-blur-lg border-t border-white/10 relative z-10">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-serif font-bold text-white mb-4">
              Join Us in Making a Difference
            </h2>
            <p className="text-white/70 text-lg mb-8">
              Become a part of our journey. Together, we can create lasting change.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/volunteer"
                className="bg-white text-[#0F223D] px-8 py-3 rounded-full font-semibold hover:bg-[#F8F5EE] transition shadow-lg"
              >
                Volunteer With Us
              </Link>
              <Link
                href="/donate"
                className="bg-[#C9A227] text-[#0F223D] px-8 py-3 rounded-full font-semibold hover:bg-[#E8C84A] transition shadow-lg"
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