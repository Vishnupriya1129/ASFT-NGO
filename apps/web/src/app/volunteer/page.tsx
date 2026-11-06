import { Metadata } from 'next';
import { Navbar } from '@/app/components/layout/Navbar';
import { Footer } from '@/app/components/layout/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Heart, Users, Target, Award, ArrowRight, ArrowUpRight, 
  GraduationCap, Briefcase, HeartHandshake, Flame, Check 
} from 'lucide-react';
import { Testimonials } from '@/app/components/common/Testimonials';

export const metadata: Metadata = {
  title: 'Join Us | Aram Saeivom Family Trust',
  description: 'Become a volunteer and help us create lasting change in communities across Tamil Nadu.',
};

export default function VolunteerPage() {
  return (
    <>
      <Navbar />
      {/* Main Background: Deep Navy to Emerald Gradient */}
      <main className="min-h-screen bg-gradient-to-br from-[#0F223D] via-[#0F223D] to-[#064E3B] pt-24 overflow-hidden relative">
        
        {/* Background Glowing Orbs */}
        <div className="absolute top-[10%] left-[5%] w-[500px] h-[500px] bg-[#0E7A5F]/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[20%] right-[5%] w-[400px] h-[400px] bg-[#C9A227]/10 rounded-full blur-[100px] pointer-events-none" />

        {/* ===== HERO ===== */}
        <section className="relative h-[400px] flex items-center justify-center overflow-hidden z-10">
          <div className="absolute inset-0">
            <Image
              src="https://res.cloudinary.com/kvatjwwc/image/upload/f_auto,q_auto,w_1200/v1789558498/IMG_2516.jpg"
              alt="Join us in making a difference"
              fill
              className="object-cover"
              priority
            />
            {/* Gradient Overlay blending into the dark background */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F223D] via-[#0F223D]/70 to-transparent" />
          </div>
          
          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white mt-12">
            <span className="inline-block bg-white/10 backdrop-blur-md px-5 py-2 rounded-full text-sm font-semibold uppercase tracking-widest border border-white/20 mb-4 text-[#C9A227]">
              Join the Movement
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold drop-shadow-lg">
              Be the Change
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto mt-4 leading-relaxed font-light">
              Your time, skills, and compassion can transform lives. Join us in building a brighter future.
            </p>
          </div>
        </section>

        {/* ===== WHY VOLUNTEER WITH US? ===== */}
        <section className="py-24 relative z-10">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <span className="inline-block bg-white/10 text-[#C9A227] px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-[0.2em] border border-white/20 mb-4 backdrop-blur-md">
                Get Involved
              </span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-white">
                Why Volunteer With Us?
              </h2>
              <div className="w-16 h-1 bg-[#C9A227] mx-auto mt-4 rounded-full" />
              <p className="text-white/70 max-w-2xl mx-auto mt-4 text-lg font-light">
                Volunteering with Aram Saeivom Family Trust is about becoming part of a movement that creates lasting change.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: Heart,
                  title: 'Make a Difference',
                  description: 'Your efforts directly impact the lives of children, families, and communities in need.',
                  iconColor: 'text-rose-400',
                  bgColor: 'bg-rose-500/10'
                },
                {
                  icon: Users,
                  title: 'Build Community',
                  description: 'Join a network of passionate individuals who share your commitment to social change.',
                  iconColor: 'text-blue-400',
                  bgColor: 'bg-blue-500/10'
                },
                {
                  icon: Award,
                  title: 'Grow & Learn',
                  description: 'Develop new skills, gain valuable experience, and grow as a leader in your community.',
                  iconColor: 'text-[#C9A227]',
                  bgColor: 'bg-[#C9A227]/10'
                }
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <div 
                    key={index}
                    className="group relative overflow-hidden rounded-3xl bg-white/5 backdrop-blur-lg border border-white/10 p-8 transition-all duration-500 hover:-translate-y-2 hover:bg-white/10 hover:shadow-[0_8px_40px_rgba(0,0,0,0.3)]"
                  >
                    <div className="relative">
                      <div className={`w-14 h-14 rounded-2xl ${item.bgColor} border border-white/5 flex items-center justify-center mb-5 shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                        <Icon size={24} className={item.iconColor} />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                      <p className="text-white/60 text-sm leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ===== WHAT VOLUNTEERS DO ===== */}
        <section className="py-24 relative z-10">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <span className="inline-block bg-white/10 text-[#C9A227] px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-[0.2em] border border-white/20 mb-4 backdrop-blur-md">
                Volunteer Roles
              </span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-white">
                What Volunteers Do
              </h2>
              <div className="w-16 h-1 bg-[#C9A227] mx-auto mt-4 rounded-full" />
              <p className="text-white/70 max-w-2xl mx-auto mt-4 text-lg font-light">
                Find the role that fits your skills and passion.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: Heart,
                  title: 'Community Outreach',
                  description: 'Engage with communities, organize events, and spread awareness.',
                  color: 'border-t-[#0E7A5F]'
                },
                {
                  icon: Users,
                  title: 'Program Support',
                  description: 'Assist in running programs — from education to environmental initiatives.',
                  color: 'border-t-[#0F223D]'
                },
                {
                  icon: Target,
                  title: 'Skill-Based Volunteering',
                  description: 'Share your expertise — teaching, photography, social media, or administration.',
                  color: 'border-t-[#C9A227]'
                },
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <div 
                    key={index} 
                    className={`group bg-white/5 backdrop-blur-md rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border-t-4 ${item.color} border-x border-b border-white/10 hover:bg-white/10 hover:-translate-y-1`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                        <Icon size={20} className="text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-white">{item.title}</h4>
                        <p className="text-white/60 text-sm mt-1 leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ===== WHO CAN APPLY & WHAT WE LOOK FOR ===== */}
        <section className="py-24 relative z-10">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Who Can Apply — Glassmorphism with Jade Shade */}
              <div className="relative overflow-hidden rounded-[32px] bg-white/5 backdrop-blur-lg border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.2)] p-10">
                
                {/* Subtle Jade Glow instead of the cream gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#0E7A5F]/20 to-transparent pointer-events-none" />
                
                <div className="relative z-10">
                  <p className="text-xs uppercase tracking-[0.35em] text-[#C9A227] font-bold mb-3">
                    Everyone is Welcome
                  </p>
                  <h3 className="text-3xl font-serif font-bold text-white leading-tight mb-4">
                    Who Can Apply?
                  </h3>
                  <p className="text-white/70 text-base leading-relaxed mb-8 max-w-lg">
                    Whether you're beginning your journey or bringing years of experience,
                    your willingness to serve is what truly matters.
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { icon: GraduationCap, title: "Students" },
                      { icon: Briefcase, title: "Professionals" },
                      { icon: HeartHandshake, title: "Retirees" },
                      { icon: Flame, title: "Anyone with Passion" },
                    ].map((item, i) => {
                      const Icon = item.icon;
                      return (
                        <div
                          key={i}
                          className="group flex flex-col items-center justify-center rounded-2xl bg-white/5 border border-white/10 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:bg-white/10 hover:border-[#C9A227]/30"
                        >
                          <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center mb-4 transition-all duration-300 group-hover:bg-[#C9A227] group-hover:scale-110 shadow-sm border border-white/5">
                            <Icon size={24} className="text-white group-hover:text-[#0F223D] transition-colors duration-300" />
                          </div>
                          <h4 className="font-semibold text-white text-sm text-center">
                            {item.title}
                          </h4>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* What We Look For — Dark Navy Card */}
              <div className="relative overflow-hidden rounded-[32px] bg-[#0F223D]/80 backdrop-blur-xl border border-white/10 p-10 text-white shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
                <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[#C9A227]/10 blur-3xl" />
                <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-[#0E7A5F]/20 blur-3xl" />
                
                <div className="relative">
                  <p className="text-xs uppercase tracking-[0.35em] text-[#C9A227] font-bold mb-3">
                    Our Values
                  </p>
                  <h3 className="text-3xl font-serif font-bold leading-tight mb-8">
                    What We Look For
                  </h3>
                  
                  <div className="space-y-5">
                    {[
                      "A genuine passion for social change",
                      "Commitment to our mission and values",
                      "Reliability and dedication",
                      "Willingness to learn and grow",
                      "Positive attitude & teamwork",
                      "Empathy and respect for every community",
                    ].map((quality, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-4 group"
                      >
                        <div className="w-8 h-8 rounded-full bg-[#C9A227] flex items-center justify-center shrink-0 shadow-[0_0_12px_rgba(201,162,39,0.4)]">
                          <Check size={16} className="text-[#0F223D] font-bold" strokeWidth={3} />
                        </div>
                        <span className="text-white/80 group-hover:text-white transition-colors text-base">
                          {quality}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== VOLUNTEER FOR A SPECIFIC PROGRAM ===== */}
        <section className="py-24 relative z-10">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-16">
              <span className="inline-block bg-white/10 text-[#C9A227] px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-[0.2em] border border-white/20 mb-4 backdrop-blur-md">
                Choose Your Path
              </span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-white">
                Volunteer for a Specific Program
              </h2>
              <div className="w-16 h-1 bg-[#C9A227] mx-auto mt-4 rounded-full" />
              <p className="text-white/70 max-w-2xl mx-auto mt-4 text-lg font-light">
                Pick a program that resonates with you and join us there.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { title: 'Odyssey Project', slug: 'odyssey' },
                { title: 'THOOYAM \'26', slug: 'thooayam-26' },
                { title: 'Relief Works', slug: 'relief-works' },
              ].map((program) => (
                <Link
                  key={program.title}
                  href={`/programs/${program.slug}`}
                  className="group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-md p-6 border border-white/10 hover:border-[#C9A227] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(201,162,39,0.15)] hover:bg-white/10"
                >
                  <div className="relative flex items-center justify-between">
                    <span className="font-medium text-white group-hover:text-[#C9A227] transition-colors">
                      {program.title}
                    </span>
                    <ArrowUpRight size={18} className="text-gray-400 group-hover:text-[#C9A227] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ===== CTA ===== */}
        <section className="py-20 relative z-10">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[3rem] p-12 shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
                Ready to Make a Difference?
              </h2>
              <p className="text-white/70 text-lg max-w-2xl mx-auto mb-8 font-light">
                Take the first step. Join us in building a more just, compassionate, and equitable world.
              </p>
              <Link
                href="https://docs.google.com/forms/d/e/1FAIpQLSflPi3hdVtPvNNviAmOZZ5e0VewvOxxo5uCsMQBFnnlkzsITA/viewform"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-[#C9A227] text-[#0F223D] px-10 py-4 rounded-full font-bold text-lg hover:bg-[#E8C84A] transition-all duration-300 shadow-xl hover:shadow-[0_0_30px_rgba(201,162,39,0.4)] hover:-translate-y-1 group"
              >
                Sign Up to Volunteer
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <p className="text-white/40 text-sm mt-4">
                We'll get back to you within 48 hours.
              </p>
            </div>
          </div>
        </section>

        {/* ===== TESTIMONIALS ===== */}
                {/* ===== TESTIMONIALS ===== */}
        {/* We wrap the testimonials in a dark-themed section so it blends perfectly */}
        <section className="relative z-10 py-24 bg-[#0F223D]/50 backdrop-blur-md border-t border-white/5">
          <div className="max-w-7xl mx-auto">
            <Testimonials
              title="Voices of Our Volunteers"
              subtitle="Real stories from those who have been part of our journey"
            />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}