'use client';

import Link from 'next/link';
import { BookOpen, School2, CalendarDays, Camera, BarChart3, Handshake } from 'lucide-react';
import { motion } from 'framer-motion';

const pages = [
  {
    title: 'Programs',
    description: 'Food, shelter, and dignity through community kitchens and outreach across India.',
    href: '/programs',
    icon: BookOpen,
  },
  {
    title: 'Education',
    description: 'Rural schools, tutoring hubs, and digital classrooms for every child.',
    href: '/education',
    icon: School2,
  },
  {
    title: 'Events',
    description: 'Join festivals, health camps, and volunteer days in local neighbourhoods.',
    href: '/events',
    icon: CalendarDays,
  },
 
  {
    title: 'Impact',
    description: 'Numbers that matter: meals shared, children taught, communities lifted.',
    href: '/impact',
    icon: BarChart3,
  },
  {
    title: 'Volunteer',
    description: 'Lend your time, skills, and compassion to youth-led community service.',
    href: '/volunteer',
    icon: Handshake,
  },
];

export function ExploreSection() {
  return (
    <section id="explore" className="py-24 bg-gradient-to-b from-earth-cream to-cloud" aria-label="Explore our pages">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="section-tag">Explore</span>
          <h2 className="font-serif text-5xl text-soil-dark mb-5">Separate pages for every part of our mission</h2>
          <p className="text-stone text-lg leading-relaxed">
            Discover the programs, education work, events, impact stories, and volunteer opportunities that make Arram Seivom Family Trust a true Indian community movement.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {pages.map(({ title, description, href, icon: Icon }, idx) => (
            <motion.article
              key={title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="group rounded-3xl bg-white shadow-xl border border-forest-light/30 p-8 hover:-translate-y-1 transition-all"
            >
              <div className="w-14 h-14 rounded-2xl bg-forest-mid/10 text-forest-mid flex items-center justify-center mb-6">
                <Icon size={24} />
              </div>
              <h3 className="font-serif text-2xl text-soil-dark mb-3">{title}</h3>
              <p className="text-stone text-sm leading-relaxed mb-6">{description}</p>
              <Link href={href} className="inline-flex items-center gap-2 text-forest-mid font-semibold text-sm hover:text-forest-dark">
                Go to {title}
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}