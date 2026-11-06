'use client';

import { Navbar } from '@/app/components/layout/Navbar';
import { Footer } from '@/app/components/layout/Footer';
import Link from 'next/link';
import { Calendar, Quote, ArrowUpRight, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Head from 'next/head';
import { useState, useEffect } from 'react';

// ✅ LinkedIn Icon
function LinkedInIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

// ✅ Team member interface
interface TeamMember {
  id: number;
  name: string;
  role: string;
  years: number;
  bio: string;
  image: string;
  testimonial: string | null;
  linkedin: string | null;
  isFounder: boolean;
}

// ✅ Team member data
const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: 'Balasubramanian',
    role: 'Founder & Chairperson',
    years: 9.5,
    bio: 'Founder of Aram Saeivom Family Trust, leading the organization with vision and compassion since 2017.',
    image: 'https://res.cloudinary.com/kvatjwwc/image/upload/f_auto,q_auto,w_1200/v1789558526/_MG_8246.jpg',
    testimonial: null,
    linkedin: null,
    isFounder: true,
  },
  {
    id: 2,
    name: 'Madhupriya',
    role: 'Core Team Member',
    years: 8,
    bio: 'A dedicated core team member committed to the mission of empowering communities through education and healthcare.',
    image: 'https://res.cloudinary.com/kvatjwwc/image/upload/f_auto,q_auto,w_1200/v1789557462/madhupriya.jpg',
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
    image: 'https://res.cloudinary.com/kvatjwwc/image/upload/f_auto,q_auto,w_1200/v1789557384/aashish.jpg',
    testimonial: 'I have been a part of the NGO Aram Seivom Foundation (ASF) since 2017. I joined when I was a student, and during that time I was able to attend and conduct many programs and activities. Through ASF, I learned leadership, teamwork, commitment, discipline, and my duty towards society.',
    linkedin: 'https://www.linkedin.com/in/aashiq-ahamed-n-39ab0a157',
    isFounder: false,
  },
  {
    id: 4,
    name: 'Santhanasibi M',
    role: 'Graphic Designer & Core Team Member',
    years: 3,
    bio: 'A creative professional and core team member who brings design thinking and visual communication skills to the organization.',
    image: 'https://res.cloudinary.com/kvatjwwc/image/upload/f_auto,q_auto,w_1200/v1789557651/sibi.jpg',
    testimonial: 'After joining the Aram Seivom Family Trust, I gained valuable skills through the various programs conducted there. I learned leadership qualities, teamwork, and how to effectively manage and coordinate a team.',
    linkedin: 'https://www.linkedin.com/in/santhana-sibi-m-aa40302a6',
    isFounder: false,
  },
  {
    id: 5,
    name: 'Vigneshwar M',
    role: 'Aspirant & Core Team Member',
    years: 3,
    bio: 'A passionate core team member dedicated to understanding and addressing social issues through community engagement and leadership.',
    image: 'https://res.cloudinary.com/kvatjwwc/image/upload/f_auto,q_auto,w_1200/v1789557664/v.jpg',
    testimonial: 'Joining ASF helped me see the world through the eyes of a social worker, helped me understand social values & how impactful the work we do for the society. Personally it made me a better person, team player and a leader.',
    linkedin: null,
    isFounder: false,
  },
  {
    id: 6,
    name: 'Shiva S',
    role: 'Creative Head, Graphene.Ai & Core Team Member',
    years: 9.5,
    bio: 'Core team member since the beginning of ASF. Shiva brings creative leadership and strategic vision to the organization.',
    image: 'https://res.cloudinary.com/kvatjwwc/image/upload/f_auto,q_auto,w_1200/v1789557718/siva.png',
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
      <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-full">
        <span className="text-4xl font-serif text-[#0F223D]/30">{initials}</span>
      </div>
    );
  }

  return (
    <div className="w-full h-full rounded-full overflow-hidden bg-white">
      <img 
        src={src} 
        alt={name} 
        className="w-full h-full object-contain object-center"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.style.display = 'none';
          const parent = target.parentElement;
          if (parent) {
            const placeholder = document.createElement('div');
            placeholder.className = 'w-full h-full flex items-center justify-center bg-gray-100 rounded-full';
            const span = document.createElement('span');
            span.className = 'text-4xl font-serif text-[#0F223D]/30';
            span.textContent = initials;
            placeholder.appendChild(span);
            parent.appendChild(placeholder);
          }
        }}
      />
    </div>
  );
}

export default function TeamPage() {
  const founder = teamMembers.find(m => m.isFounder);
  const coreTeamMembers = teamMembers.filter(m => !m.isFounder);
  const testimonialMembers = teamMembers.filter(m => m.testimonial);
  
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    if (testimonialMembers.length <= 1) return;
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonialMembers.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [testimonialMembers.length]);

  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonialMembers.length);
  };

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + testimonialMembers.length) % testimonialMembers.length);
  };

  return (
    <>
      <Head>
        <title>Our Core Team | Aram Saeivom Family Trust</title>
        <meta name="description" content="Meet the dedicated core team members behind Aram Saeivom Family Trust." />
      </Head>

      <Navbar />
      {/* Main Background: Deep Navy to Emerald */}
      <main className="min-h-screen bg-gradient-to-br from-[#0F223D] via-[#0F223D] to-[#064E3B] pt-24 overflow-hidden relative">
        
        {/* Background Glowing Orbs */}
        <div className="absolute top-[5%] left-[10%] w-[500px] h-[500px] bg-[#0E7A5F]/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[20%] right-[10%] w-[400px] h-[400px] bg-[#C9A227]/10 rounded-full blur-[100px] pointer-events-none" />

        {/* ===== HERO ===== */}
        <section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0F223D] via-[#0F223D] to-[#0E7A5F]">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-[#C9A227]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-[#0E7A5F]/20 rounded-full blur-3xl" />
          
          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white pb-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block bg-white/10 backdrop-blur-md px-6 py-2 rounded-full text-sm font-semibold uppercase tracking-[0.2em] border border-white/20 mb-6 text-[#C9A227]">
                Leadership
              </span>
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-serif font-bold mb-6">
                Meet Our Team
              </h1>
              <p className="text-white/80 text-xl max-w-2xl mx-auto mt-4 font-light">
                The dedicated individuals behind Aram Saeivom Family Trust — working tirelessly to create lasting change.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ===== FOUNDER SPOTLIGHT (Reduced width, bigger text) ===== */}
        {founder && (
          <section className="py-20 max-w-5xl mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-[3rem] bg-white/90 backdrop-blur-xl border border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-10 md:p-16"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#C9A227]/10 rounded-full blur-3xl" />
              
              <div className="relative flex flex-col md:flex-row gap-12 items-center">
                <div className="relative">
                  <div className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-[#C9A227]/30 shadow-2xl bg-white">
                    <TeamMemberImage src={founder.image} name={founder.name} />
                  </div>
                  <div className="absolute bottom-2 -right-2 bg-[#C9A227] text-white text-sm font-bold px-4 py-1.5 rounded-full shadow-lg">
                    Founder
                  </div>
                </div>
                
                <div className="flex-1 text-center md:text-left">
                  <span className="inline-block bg-[#C9A227]/10 text-[#C9A227] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
                    Visionary Leader
                  </span>
                  <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#0F223D] mb-2">
                    {founder.name}
                  </h2>
                  <p className="text-[#C9A227] font-semibold text-lg md:text-xl">{founder.role}</p>
                  <div className="flex items-center justify-center md:justify-start gap-2 text-gray-500 text-base mt-3">
                    <Calendar size={16} />
                    <span>{founder.years}+ Years of Service</span>
                  </div>
                  <p className="text-gray-600 max-w-lg leading-relaxed mt-6 text-lg">
                    {founder.bio}
                  </p>
                </div>
              </div>
            </motion.div>
          </section>
        )}

        {/* ===== CORE TEAM MEMBERS GRID (Taller, bolder) ===== */}
        <section className="py-20 max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <span className="inline-block bg-white/10 text-[#C9A227] px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-[0.2em] border border-white/20 mb-4 backdrop-blur-md">
              Core Team
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">Our Core Team Members</h2>
            <div className="w-20 h-1.5 bg-[#C9A227] mx-auto rounded-full" />
            <p className="text-white/70 max-w-2xl mx-auto mt-6 text-lg">
              Each member brings unique expertise and a shared commitment to serving communities with integrity and compassion.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreTeamMembers.map((member) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="group relative bg-white/90 backdrop-blur-md rounded-[2.5rem] border border-white/50 hover:border-[#C9A227]/50 shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:shadow-[0_8px_40px_rgb(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-2 p-10"
              >
                <div className="flex flex-col items-center">
                  <div className="relative w-36 h-36 mb-6">
                    <div className="absolute inset-0 rounded-full border-2 border-[#C9A227]/20 group-hover:border-[#C9A227] transition-colors duration-300" />
                    <TeamMemberImage src={member.image} name={member.name} />
                  </div>

                  <h3 className="text-2xl font-bold text-[#0F223D] text-center mb-1">
                    {member.name}
                  </h3>
                  <p className="text-[#C9A227] text-sm font-semibold text-center mb-4">{member.role}</p>
                  
                  <div className="inline-flex items-center gap-2 bg-[#F8F5EE] px-4 py-1.5 rounded-full text-sm text-gray-600 mb-6">
                    <Calendar size={14} />
                    <span>{member.years}+ years</span>
                  </div>

                  <p className="text-gray-600 text-base text-center leading-relaxed line-clamp-4 mb-6">
                    {member.bio}
                  </p>

                  {member.linkedin && (
                    <a 
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-auto flex items-center gap-2 text-sm text-gray-500 hover:text-[#C9A227] transition font-bold"
                    >
                      <LinkedInIcon />
                      <span>Connect on LinkedIn</span>
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ===== TESTIMONIALS (Fading Carousel) ===== */}
        {testimonialMembers.length > 0 && (
          <section className="py-24 relative z-10 overflow-hidden">
            <div className="max-w-4xl mx-auto px-6">
              <div className="text-center mb-12">
                <span className="inline-block bg-white/10 text-[#C9A227] px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-[0.2em] border border-white/20 mb-4 backdrop-blur-md">
                  Voices
                </span>
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">What Our Team Says</h2>
                <div className="w-20 h-1.5 bg-[#C9A227] mx-auto rounded-full" />
              </div>

              {/* The Carousel Container */}
              <div className="relative bg-white/90 backdrop-blur-xl rounded-[3rem] p-12 md:p-16 shadow-[0_8px_40px_rgb(0,0,0,0.15)] border border-white/50 min-h-[400px] flex items-center justify-center">
                <Quote size={100} className="text-[#C9A227]/10 absolute top-10 left-10" />
                
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTestimonial}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="w-full flex flex-col items-center text-center relative z-10"
                  >
                    <p className="text-2xl md:text-3xl text-[#0F223D] leading-relaxed italic font-serif mb-10 max-w-3xl">
                      "{testimonialMembers[activeTestimonial].testimonial}"
                    </p>
                    
                    <div className="flex items-center gap-5">
                      <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-[#C9A227] shadow-lg">
                        <TeamMemberImage 
                          src={testimonialMembers[activeTestimonial].image} 
                          name={testimonialMembers[activeTestimonial].name} 
                        />
                      </div>
                      <div className="text-left">
                        <p className="font-bold text-[#0F223D] text-2xl">
                          {testimonialMembers[activeTestimonial].name}
                        </p>
                        <p className="text-base text-[#C9A227] font-semibold">
                          {testimonialMembers[activeTestimonial].role}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Navigation Arrows */}
                {testimonialMembers.length > 1 && (
                  <>
                    <button 
                      onClick={prevTestimonial}
                      className="absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-xl text-[#0F223D] hover:text-[#C9A227] hover:scale-110 transition-all z-20"
                    >
                      <ChevronLeft size={28} />
                    </button>
                    <button 
                      onClick={nextTestimonial}
                      className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-xl text-[#0F223D] hover:text-[#C9A227] hover:scale-110 transition-all z-20"
                    >
                      <ChevronRight size={28} />
                    </button>
                  </>
                )}
              </div>

              {/* Pagination Dots */}
              {testimonialMembers.length > 1 && (
                <div className="flex justify-center gap-3 mt-10">
                  {testimonialMembers.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveTestimonial(index)}
                      className={`h-3 rounded-full transition-all duration-300 ${
                        activeTestimonial === index 
                          ? 'bg-[#C9A227] w-10' 
                          : 'bg-white/30 hover:bg-white/60 w-3'
                      }`}
                      aria-label={`Go to testimonial ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {/* ===== CTA (Dark Glass) ===== */}
        <section className="py-20 bg-[#0E7A5F]/20 backdrop-blur-md border-t border-white/10 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto px-6 text-center"
          >
            <Sparkles className="w-10 h-10 text-[#C9A227] mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
              Join Our Mission
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto mb-10 text-lg">
              We're always looking for passionate volunteers and partners. Be part of something meaningful.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link
                href="/volunteer"
                className="inline-flex items-center justify-center gap-2 bg-[#C9A227] text-[#0F223D] px-8 py-4 rounded-full font-bold text-lg hover:bg-[#d4b44a] hover:-translate-y-1 transition-all shadow-xl"
              >
                Volunteer With Us <ArrowUpRight size={20} />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-full font-bold text-lg border border-white/20 hover:bg-white/20 hover:-translate-y-1 transition-all"
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