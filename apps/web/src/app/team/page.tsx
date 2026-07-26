'use client';

import { Navbar } from '@/app/components/layout/Navbar';
import { Footer } from '@/app/components/layout/Footer';
import Link from 'next/link';
import { Calendar, Quote, ArrowUpRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import Head from 'next/head';

// ✅ LinkedIn Icon — Custom SVG (no import issues)
function LinkedInIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

// ✅ Team member data
const teamMembers = [
  {
    id: 1,
    name: 'Balasubramanian',
    role: 'Founder & Chairperson',
    years: 9.5,
    bio: 'Founder of Aram Saeivom Family Trust, leading the organization with vision and compassion since 2017.',
    image: 'https://vixzstrzqhwswhibzfdq.supabase.co/storage/v1/object/public/content-images/content-images/2023/Anniversary/_MG_2559.JPG',
    testimonial: null,
    linkedin: null,
    isFounder: true,
  },
  {
    id: 2,
    name: 'Madhupriya',
    role: 'Trustee',
    years: 8,
    bio: 'A dedicated trustee committed to the mission of empowering communities through education and healthcare.',
    image: 'https://vixzstrzqhwswhibzfdq.supabase.co/storage/v1/object/public/content-images/trustees/madhupriya.jpeg',
    testimonial: null,
    linkedin: null,
    isFounder: false,
  },
  {
    id: 3,
    name: 'Aashiq Ahamed N',
    role: 'Senior Security Engineer & Core Team Member',
    years: 9,
    bio: 'Core team member since 2017. Aashiq has been instrumental in building the foundation of ASF.',
    image: 'https://vixzstrzqhwswhibzfdq.supabase.co/storage/v1/object/public/content-images/trustees/aashish.jpeg',
    testimonial: 'I have been a part of the NGO Aram Seivom Foundation (ASF) since 2017. I joined when I was a student, and during that time I was able to attend and conduct many programs and activities. Through ASF, I learned leadership, teamwork, commitment, discipline, and my duty towards society. ASF helped me improve my confidence and communication skills. The values and lessons I learned from ASF are still helping me in both my personal life and career.',
    linkedin: 'https://www.linkedin.com/in/aashiq-ahamed-n-39ab0a157',
    isFounder: false,
  },
  {
    id: 4,
    name: 'Santhanasibi M',
    role: 'Graphic Designer & Trustee',
    years: 3,
    bio: 'A creative professional and trustee who brings design thinking and visual communication skills to the organization.',
    image: 'https://vixzstrzqhwswhibzfdq.supabase.co/storage/v1/object/public/content-images/trustees/sibi.jpeg',
    testimonial: 'After joining the Aram Seivom Family Trust, I gained valuable skills through the various programs conducted there. I learned leadership qualities, teamwork, and how to effectively manage and coordinate a team.',
    linkedin: 'https://www.linkedin.com/in/santhana-sibi-m-aa40302a6',
    isFounder: false,
  },
  {
    id: 5,
    name: 'Vigneshwar M',
    role: 'Aspirant & Trustee',
    years: 3,
    bio: 'A passionate trustee dedicated to understanding and addressing social issues through community engagement and leadership.',
    image: 'https://vixzstrzqhwswhibzfdq.supabase.co/storage/v1/object/public/content-images/trustees/v.jpeg',
    testimonial: 'Joining ASF helped me see the world through the eyes of a social worker, helped me understand social values & how impactful the work we do for the society. Personally it made me a better person, team player and a leader.',
    linkedin: null,
    isFounder: false,
  },
  {
    id: 6,
    name: 'Shiva S',
    role: 'Creative Head, Graphene.Ai & Trustee',
    years: 9.5,
    bio: 'Core team member since the beginning of ASF. Shiva brings creative leadership and strategic vision to the organization.',
    image: 'https://vixzstrzqhwswhibzfdq.supabase.co/storage/v1/object/public/content-images/trustees/siva.png',
    testimonial: null,
    linkedin: 'https://www.linkedin.com/in/shivas03040507/',
    isFounder: false,
  },
];

// ✅ Safe Image Component
function TeamMemberImage({ src, name }: { src: string | null | undefined; name: string }) {
  const initials = name.split(' ').map(n => n[0]).join('').slice(0, 2);
  
  if (!src) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-emerald-600/20 to-[#0F223D]/20 rounded-full">
        <span className="text-4xl font-serif text-[#0F223D]/30">{initials}</span>
      </div>
    );
  }

  return (
    <img 
      src={src} 
      alt={name} 
      className="w-full h-full object-cover rounded-full shadow-xl"
      onError={(e) => {
        const target = e.target as HTMLImageElement;
        target.style.display = 'none';
        const parent = target.parentElement;
        if (parent) {
          const placeholder = document.createElement('div');
          placeholder.className = 'w-full h-full flex items-center justify-center bg-gradient-to-br from-emerald-600/20 to-[#0F223D]/20 rounded-full';
          const span = document.createElement('span');
          span.className = 'text-4xl font-serif text-[#0F223D]/30';
          span.textContent = initials;
          placeholder.appendChild(span);
          parent.appendChild(placeholder);
        }
      }}
    />
  );
}

// ============================================
// MAIN PAGE
// ============================================
export default function TeamPage() {
  const founder = teamMembers.find(m => m.isFounder);
  const trustees = teamMembers.filter(m => !m.isFounder);
  const testimonialMembers = teamMembers.filter(m => m.testimonial);

  return (
    <>
      <Head>
        <title>Our Team | Aram Saeivom Family Trust</title>
        <meta name="description" content="Meet the dedicated trustees and team members behind Aram Saeivom Family Trust." />
      </Head>

      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-[#F8F5EE] to-white pt-24">

        {/* ===== HERO ===== */}
        <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0F223D] via-[#1a2a4a] to-emerald-900">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-[#C9A227]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl" />
          
          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block bg-white/10 backdrop-blur-md px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-[0.2em] border border-white/10 mb-6">
                Leadership
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold">
                Meet Our Team
              </h1>
              <p className="text-white/60 text-lg max-w-2xl mx-auto mt-4 font-light">
                The dedicated individuals behind Aram Saeivom Family Trust — working tirelessly to create lasting change.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ===== FOUNDER SPOTLIGHT ===== */}
        {founder && (
          <section className="py-20 max-w-6xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0F223D] to-emerald-900 p-1"
            >
              <div className="relative rounded-3xl bg-white/5 backdrop-blur-xl p-8 md:p-12 border border-white/10">
                <div className="absolute top-0 right-0 w-48 h-48 bg-[#C9A227]/5 rounded-full blur-3xl" />
                
                <div className="relative flex flex-col md:flex-row gap-10 items-center">
                  <div className="relative">
                    <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-[#C9A227]/30 shadow-2xl">
                      <TeamMemberImage src={founder.image} name={founder.name} />
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-[#C9A227] text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                      Founder
                    </div>
                  </div>
                  
                  <div className="flex-1 text-center md:text-left">
                    <span className="inline-block bg-[#C9A227]/10 text-[#C9A227] px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest mb-3">
                      Visionary Leader
                    </span>
                    <h2 className="text-2xl md:text-3xl font-serif font-bold text-white">
                      {founder.name}
                    </h2>
                    <p className="text-[#C9A227] font-medium text-base">{founder.role}</p>
                    <div className="flex items-center justify-center md:justify-start gap-2 text-white/50 text-sm mt-2">
                      <Calendar size={14} />
                      <span>{founder.years}+ Years of Service</span>
                    </div>
                    <p className="text-white/70 max-w-lg leading-relaxed mt-4 text-sm">
                      {founder.bio}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </section>
        )}

        {/* ===== TRUSTEES GRID ===== */}
        <section className="py-20 max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block bg-[#C9A227]/10 text-[#C9A227] px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-[0.2em] border border-[#C9A227]/20 mb-4">
              Trustees
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#0F223D]">Our Trustees</h2>
            <div className="w-16 h-1 bg-[#C9A227] mx-auto mt-4 rounded-full" />
            <p className="text-gray-500 max-w-2xl mx-auto mt-4 text-sm">
              Each member brings unique expertise and a shared commitment to serving communities with integrity and compassion.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trustees.map((member) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="group relative bg-white/80 backdrop-blur-xl rounded-2xl border border-white/50 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 p-6"
              >
                <div className="flex flex-col items-center">
                  <div className="relative w-32 h-32 mb-4">
                    <div className="absolute inset-0 rounded-full shadow-xl border-2 border-[#C9A227]/20 group-hover:border-[#C9A227] transition-colors" />
                    <TeamMemberImage src={member.image} name={member.name} />
                  </div>

                  <h3 className="text-lg font-bold text-[#0F223D] text-center">
                    {member.name}
                  </h3>
                  <p className="text-[#C9A227] text-sm font-medium text-center">{member.role}</p>
                  
                  <div className="mt-2 inline-flex items-center gap-1.5 bg-[#F8F5EE] px-3 py-1 rounded-full text-xs text-gray-500">
                    <Calendar size={12} />
                    <span>{member.years}+ years</span>
                  </div>

                  <p className="text-gray-500 text-sm text-center mt-3 leading-relaxed line-clamp-3">
                    {member.bio}
                  </p>

                  {member.linkedin && (
                    <a 
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 flex items-center gap-1.5 text-xs text-gray-400 hover:text-[#C9A227] transition"
                    >
                      <LinkedInIcon />
                      <span>Connect</span>
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ===== TESTIMONIALS ===== */}
        {testimonialMembers.length > 0 && (
          <section className="py-20 bg-gradient-to-br from-white to-[#F8F5EE]">
            <div className="max-w-6xl mx-auto px-6">
              <div className="text-center mb-16">
                <span className="inline-block bg-[#C9A227]/10 text-[#C9A227] px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-[0.2em] border border-[#C9A227]/20 mb-4">
                  Voices
                </span>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#0F223D]">What Our Team Says</h2>
                <div className="w-16 h-1 bg-[#C9A227] mx-auto mt-4 rounded-full" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {testimonialMembers.map((member) => (
                  <motion.div
                    key={member.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="relative bg-white rounded-2xl p-6 border border-[#C9A227]/10 shadow-sm hover:shadow-lg transition-all"
                  >
                    <Quote size={24} className="text-[#C9A227]/15 absolute top-3 right-3" />
                    
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#C9A227]/20 flex-shrink-0">
                        <TeamMemberImage src={member.image} name={member.name} />
                      </div>
                      <div>
                        <p className="text-gray-600 text-sm leading-relaxed italic">"{member.testimonial}"</p>
                        <div className="mt-2">
                          <p className="text-sm font-semibold text-[#0F223D]">{member.name}</p>
                          <p className="text-xs text-gray-400">{member.role}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ===== CTA ===== */}
        <section className="py-16 bg-gradient-to-r from-[#0F223D] to-emerald-900">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto px-6 text-center"
          >
            <Sparkles className="w-8 h-8 text-[#C9A227] mx-auto mb-4" />
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-white mb-3">
              Join Our Mission
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto mb-6 text-sm">
              We're always looking for passionate volunteers and partners. Be part of something meaningful.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/volunteer"
                className="inline-flex items-center gap-2 bg-[#C9A227] text-[#0F223D] px-6 py-3 rounded-full font-semibold hover:bg-[#d4b44a] transition shadow-lg"
              >
                Volunteer With Us <ArrowUpRight size={16} />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-full font-semibold border border-white/20 hover:bg-white/20 transition"
              >
                Partner With Us
              </Link>
            </div>
          </motion.div>
        </section>

      </main>
      <Footer />
    </>
  );
}