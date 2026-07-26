import { Metadata } from 'next';
import { Navbar } from '@/app/components/layout/Navbar';
import { Footer } from '@/app/components/layout/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, Users, Target, Award, Clock, MapPin, Mail, ArrowRight, CheckCircle, ArrowUpRight } from 'lucide-react';
import { Testimonials } from '@/app/components/common/Testimonials';

export const metadata: Metadata = {
  title: 'Join Us | Aram Saeivom Family Trust',
  description: 'Become a volunteer and help us create lasting change in communities across Tamil Nadu.',
};

export default function VolunteerPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white pt-24">

{/* ===== HERO — Clean Image, No Heavy Overlay ===== */}
<section className="relative h-[400px] flex items-center justify-center overflow-hidden">
  {/* Background Image — Full width, no cut */}
  <div className="absolute inset-0">
    <Image
      src="https://vixzstrzqhwswhibzfdq.supabase.co/storage/v1/object/public/content-images/content-images/2024/Child%20Safety%20Program/_MG_2426.JPG"
      alt="Join us in making a difference"
      fill
      className="object-cover"
      priority
    />
    {/* ✅ Very subtle gradient overlay — just for text readability */}
    <div className="absolute inset-0 bg-gradient-to-t from-[#0F223D]/70 via-[#0F223D]/30 to-[#0F223D]/20" />
  </div>
  
  {/* Content — positioned on top of image */}
  <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
    <span className="inline-block bg-white/20 backdrop-blur-sm px-5 py-2 rounded-full text-sm font-semibold uppercase tracking-widest border border-white/30 mb-4">
      Join the Movement
    </span>
    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold drop-shadow-lg">
      Be the Change
    </h1>
    <p className="text-xl text-white/90 max-w-2xl mx-auto mt-4 leading-relaxed font-light drop-shadow">
      Your time, skills, and compassion can transform lives. Join us in building a brighter future.
    </p>
  </div>
</section>

        {/* ===== WHY VOLUNTEER WITH US? (3 Cards) ===== */}
        <section className="py-24 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <span className="inline-block bg-[#C9A227]/10 text-[#C9A227] px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-[0.2em] border border-[#C9A227]/20 mb-4">
                Get Involved
              </span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#0F223D]">
                Why Volunteer With Us?
              </h2>
              <div className="w-16 h-1 bg-[#C9A227] mx-auto mt-4 rounded-full" />
              <p className="text-gray-500 max-w-2xl mx-auto mt-4 text-lg font-light">
                Volunteering with Aram Saeivom Family Trust is about becoming part of a movement that creates lasting change.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: Heart,
                  title: 'Make a Difference',
                  description: 'Your efforts directly impact the lives of children, families, and communities in need.',
                  color: 'from-rose-50 to-white border-rose-200'
                },
                {
                  icon: Users,
                  title: 'Build Community',
                  description: 'Join a network of passionate individuals who share your commitment to social change.',
                  color: 'from-blue-50 to-white border-blue-200'
                },
                {
                  icon: Award,
                  title: 'Grow &amp; Learn',
                  description: 'Develop new skills, gain valuable experience, and grow as a leader in your community.',
                  color: 'from-amber-50 to-white border-amber-200'
                }
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <div 
                    key={index}
                    className={`group relative overflow-hidden rounded-3xl bg-gradient-to-br ${item.color} border p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl`}
                  >
                    <div className="absolute -top-16 -right-16 w-32 h-32 rounded-full bg-white/20 blur-2xl group-hover:scale-150 transition-transform duration-700" />
                    <div className="relative">
                      <div className="w-14 h-14 rounded-2xl bg-white/80 backdrop-blur-sm border border-white/50 flex items-center justify-center mb-5 shadow-sm">
                        <Icon size={24} className="text-[#0F223D]" />
                      </div>
                      <h3 className="text-xl font-bold text-[#0F223D] mb-2">{item.title}</h3>
                      <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ===== WHAT VOLUNTEERS DO  */}
        <section className="py-24 bg-[#F8F5EE]">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <span className="inline-block bg-[#C9A227]/10 text-[#C9A227] px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-[0.2em] border border-[#C9A227]/20 mb-4">
                Volunteer Roles
              </span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#0F223D]">
                What Volunteers Do
              </h2>
              <div className="w-16 h-1 bg-[#C9A227] mx-auto mt-4 rounded-full" />
              <p className="text-gray-500 max-w-2xl mx-auto mt-4 text-lg font-light">
                Find the role that fits your skills and passion.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: Heart,
                  title: 'Community Outreach',
                  description: 'Engage with communities, organize events, and spread awareness.',
                  color: 'border-emerald-200 hover:border-emerald-400'
                },
                {
                  icon: Users,
                  title: 'Program Support',
                  description: 'Assist in running programs — from education to environmental initiatives.',
                  color: 'border-blue-200 hover:border-blue-400'
                },
                {
                  icon: Target,
                  title: 'Skill-Based Volunteering',
                  description: 'Share your expertise — teaching, photography, social media, or administration.',
                  color: 'border-amber-200 hover:border-amber-400'
                },
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <div 
                    key={index} 
                    className={`group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border-l-4 ${item.color} hover:-translate-y-1`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-11 h-11 rounded-xl bg-[#F8F5EE] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                        <Icon size={20} className="text-[#0F223D]" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-[#0F223D]">{item.title}</h4>
                        <p className="text-gray-500 text-sm mt-1 leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

               {/* ===== CTA ===== */}
        <section className="py-20 bg-[#0F223D]">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
              Ready to Make a Difference?
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto mb-8 font-light">
              Take the first step. Join us in building a more just, compassionate, and equitable world.
            </p>
            <Link
              href="https://docs.google.com/forms/d/e/1FAIpQLSflPi3hdVtPvNNviAmOZZ5e0VewvOxxo5uCsMQBFnnlkzsITA/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-white text-[#0F223D] px-10 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 group"
            >
              Sign Up to Volunteer
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <p className="text-white/30 text-sm mt-4">
              We'll get back to you within 48 hours.
            </p>
          </div>
        </section>


        {/* ===== WHO CAN APPLY & WHAT WE LOOK FOR — Premium SaaS Layout ===== */}
        <section className="py-24 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Who Can Apply — Glass Card */}
              <div className="relative overflow-hidden rounded-[32px] bg-white/80 backdrop-blur-xl border border-white/50 shadow-[0_25px_60px_rgba(15,34,61,0.06)] p-10">
                <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-[#9f813b] pointer-events-none" />
                
                <div className="relative">
                  <p className="text-xs uppercase tracking-[0.35em] text-[#e7ba23] font-semibold mb-3">
                    Everyone is Welcome
                  </p>
                  <h3 className="text-3xl font-serif font-bold text-[#0F223D] leading-tight mb-4">
                    Who Can Apply?
                  </h3>
                  <p className="text-gray-500 text-base leading-relaxed mb-8 max-w-lg">
                    Whether you're beginning your journey or bringing years of experience,
                    your willingness to serve is what truly matters.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { icon: "🎓", title: "Students" },
                      { icon: "💼", title: "Professionals" },
                      { icon: "🌿", title: "Retirees" },
                      { icon: "❤️", title: "Anyone with Passion" },
                    ].map((item) => (
                      <div
                        key={item.title}
                        className="group rounded-2xl bg-white border border-gray-100 p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                      >
                        <div className="w-12 h-12 rounded-2xl bg-[#F8F5EE] flex items-center justify-center text-2xl mb-3 transition group-hover:bg-[#C9A227]/10">
                          {item.icon}
                        </div>
                        <h4 className="font-semibold text-[#0F223D] text-sm">
                          {item.title}
                        </h4>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* What We Look For — Navy Card */}
              <div className="relative overflow-hidden rounded-[32px] bg-[#0F223D] p-10 text-white shadow-[0_25px_60px_rgba(15,34,61,0.15)]">
                <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[#C9A227]/10 blur-3xl" />
                <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-emerald-500/10 blur-3xl" />
                
                <div className="relative">
                  <p className="text-xs uppercase tracking-[0.35em] text-[#C9A227] font-semibold mb-3">
                    Our Values
                  </p>
                  <h3 className="text-3xl font-serif font-bold leading-tight mb-8">
                    What We Look For
                  </h3>
                  
                  <div className="space-y-4">
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
                        <div className="w-9 h-9 rounded-full bg-[#C9A227] flex items-center justify-center shrink-0">
                          <CheckCircle size={16} className="text-white" />
                        </div>
                        <span className="text-gray-300 group-hover:text-white transition-colors text-sm">
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

        {/* ===== VOLUNTEER FOR A SPECIFIC PROGRAM — Professional Grid ===== */}
        <section className="py-24 bg-[#F8F5EE]">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-16">
              <span className="inline-block bg-[#C9A227]/10 text-[#C9A227] px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-[0.2em] border border-[#C9A227]/20 mb-4">
                Choose Your Path
              </span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#0F223D]">
                Volunteer for a Specific Program
              </h2>
              <div className="w-16 h-1 bg-[#C9A227] mx-auto mt-4 rounded-full" />
              <p className="text-gray-500 max-w-2xl mx-auto mt-4 text-lg font-light">
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
                  className="group relative overflow-hidden rounded-2xl bg-white p-6 border border-gray-100 hover:border-[#C9A227] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#C9A227]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative flex items-center justify-between">
                    <span className="font-medium text-[#0F223D] group-hover:text-[#C9A227] transition-colors">
                      {program.title}
                    </span>
                    <ArrowUpRight size={18} className="text-gray-300 group-hover:text-[#C9A227] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ===== TESTIMONIALS ===== */}
        <Testimonials
          title="Voices of Our Volunteers"
          subtitle="Real stories from those who have been part of our journey"
        />
      </main>
      <Footer />
    </>
  );
}