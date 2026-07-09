'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Navbar } from '@/app/components/layout/Navbar';
import { Footer } from '@/app/components/layout/Footer';
import { Calendar, MapPin, Clock, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const events = [
  {
    id: 1,
    title: 'ASFT – UGC NET Coaching Program',
    description:
      'UGC NET coaching program, next batch on August 15. Limited seats available. Register now to secure your spot and enhance your preparation for the UGC NET exams for only Rs.3500.Aram Saeivom Family Trust for a 6-month UGC-NET Coaching Programme running from 15 July 2026 to 17 December 2026.Key details:Fee: Rs. 3,500 per student for the full 6 monthsSchedule: 4 days a week - 3 days online + 1 Sunday contact classTests: Home test on the last Sunday of every month  Goal: Provide guidance, resources & practice to help students crack UGC-NET with confidenceTagline: Prepare Today. Qualify Tomorrow.Colleges are also encouraged to nominate students for this program.',
    date: 'August 15, 2026 - December 17, 2026',
    time: '6:00 PM – 8:00 PM (Mon/Wed)',
    location: 'Online (Zoom)',
    image:
      'https://vixzstrzqhwswhibzfdq.supabase.co/storage/v1/object/public/content-images/content-images/event%20pic/ugc.jpg',
    alt: 'UGC NET coaching session',
    status: 'upcoming',
  },
  {
    id: 2,
    title: 'ASFT – VTBT Training Program',
    description:
      'We are thrilled to announce our upcoming VTBT training program starting on July 31. This program is designed to equip participants with essential skills and knowledge for personal and professional growth. Don’t miss this opportunity to learn from experts and enhance your capabilities. This is our Volunteer Team Building Training program, which is a part of our ongoing efforts to empower individuals and foster community development.About the Volunteer Team Building Training ProgramThe Volunteer Team Building Training Program (VTBT) by Aram Saeivom Family Trust is a capacity-building initiative designed to empower volunteers and students with the skills, mindset, and values needed for community service.What the program focuses on:Team Bonding & Self-Growth: Through icebreakers, reflections, and group activities, participants build trust, connections, and confidence.Leadership & Mindfulness: Sessions on self-awareness, leadership, and mindfulness help volunteers grow personally and take initiative.Social Skills & Community Engagement: Interactive discussions and training cover group dynamics, emotional wellness, and effective strategies for working with communities.Creativity & Action Planning: Engaging activities encourage teamwork, creativity, and practical planning for real-world impact.Overall Goal: To enhance the capacity of volunteers, nurture future leaders, and equip them to make a meaningful, positive impact in society.The July 31 session continues this journey of learning, collaboration, and service — bringing people together to learn, lead, and grow as a team.',
    date: 'July 31, 2026',
    time: '10:00 AM – 4:00 PM',
    location: 'Community Center, Anna Nagar',
    image:
      'https://vixzstrzqhwswhibzfdq.supabase.co/storage/v1/object/public/content-images/content-images/2026/Mental%20Health%20Training/IMG_2943.jpg',
    alt: 'VTBT training session',
    status: 'upcoming',
  },
  {
    id: 3,
    title: 'New Mental Health Program Launching',
    description: `We are excited to announce our new Mental Health Training program starting next month. Free workshops and counseling sessions will be available for youth and families in need. Launching Soon: Mental Health Program by Aram Saeivom Family Trust
This program focuses on creating awareness, providing support, and building skills for emotional well-being. Our goal is to empower individuals with tools for mindfulness, resilience, and healthy coping — so every person feels heard, supported, and valued.`,
    date: 'Upcoming',
    time: 'TBA',
    location: 'Various locations',
    image:
      'https://vixzstrzqhwswhibzfdq.supabase.co/storage/v1/object/public/content-images/content-images/2026/Mental%20Health%20Training/IMG_3190.jpg',
    alt: 'Mental health training',
    status: 'upcoming',
  },
  {
    id: 4,
    title: 'ASFT – Thuyam! City Cleanup Drive',
    description: `Keep our city clean! We’re organising தூயம்'26 on 19th July 2026. We need volunteers and venue suggestions – please share your ideas within the next 2 days. Your support helps make this a success!.தூயம்'26 – Keep Our City Clean
Aram Saeivom Family Trust is organizing தூயம்'26, a city cleanup initiative scheduled for 19th July 2026. To make the biggest impact, we are currently finalizing the location for the cleanup drive. We invite all members to share suggestions for suitable places in the city within the next 2 days.Let’s come together to make our city cleaner and greener. Your ideas matter!`,
    date: 'July 19, 2026',
    time: '7:00 AM – 10:00 AM',
    location: 'Marina Beach, Chennai',
    image:
      'https://vixzstrzqhwswhibzfdq.supabase.co/storage/v1/object/public/content-images/content-images/2024/Rennovation/20240706164225_IMG_9221.JPG',
    alt: 'City cleanup drive',
    status: 'upcoming',
  },
];

export default function EventsPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const sortedEvents = [...events].sort((a, b) => {
    if (a.status === 'ongoing' && b.status !== 'ongoing') return 1;
    if (b.status === 'ongoing' && a.status !== 'ongoing') return -1;
    return 0;
  });

  if (!mounted) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white pt-24">
          <div className="max-w-7xl mx-auto px-6 py-16 text-center text-slate-500">
            Loading events...
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white pt-24">
        {/* Hero Banner - Full width with overlay */}
        <section className="relative bg-primary-500 text-white py-24 overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="https://vixzstrzqhwswhibzfdq.supabase.co/storage/v1/object/public/content-images/content-images/2024/anniversary/_MG_8486.JPG"
              alt="Events banner"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/60" />
          </div>
          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
            <span className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-widest border border-white/30 text-white">
              <Calendar size={16} /> UPCOMING & ONGOING
            </span>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif font-bold text-white mt-6 drop-shadow-lg">
              Join Us at Our Events
            </h1>
            <p className="text-white/90 text-lg max-w-2xl mx-auto mt-4 leading-relaxed">
              Be part of our mission – from festivals to training sessions, every event brings
              hope and change to our community.
            </p>
          </div>
        </section>

        {/* Events Grid */}
        <section className="py-16 max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedEvents.map((event, idx) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                className="group card-emerald overflow-hidden flex flex-col hover:shadow-emerald-lg transition-shadow duration-300"
              >
                <div className="relative h-56 w-full overflow-hidden bg-slate-200">
                  <Image
                    src={event.image}
                    alt={event.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {event.status === 'ongoing' && (
                    <span className="absolute top-3 right-3 bg-emerald-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                      Ongoing
                    </span>
                  )}
                  {event.status === 'upcoming' && (
                    <span className="absolute top-3 right-3 bg-primary-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                      Upcoming
                    </span>
                  )}
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-bold text-primary-500 group-hover:text-emerald-600 transition-colors duration-300">
                    {event.title}
                  </h3>

                  <div className="space-y-2 mt-3 text-sm text-slate-600">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-primary-400" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={16} className="text-primary-400" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin size={16} className="text-primary-400 mt-0.5" />
                      <span>{event.location}</span>
                    </div>
                  </div>

                  <p className="text-slate-500 text-sm mt-3 leading-relaxed flex-1 line-clamp-3">
                    {event.description}
                  </p>

                  <Link
                    href="/#donate"
                    className="inline-flex items-center gap-2 text-emerald-600 font-semibold text-sm mt-4 hover:gap-4 transition-all duration-300 group-hover:translate-x-1"
                  >
                    Get Involved <ArrowRight size={16} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}