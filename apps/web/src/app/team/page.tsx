import { Metadata } from 'next';
import { Navbar } from '@/app/components/layout/Navbar';
import { Footer } from '@/app/components/layout/Footer';
import Image from '@/components/ui/SafeImage';
import { Calendar, Link, Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Our Team | Aram Saeivom Family Trust',
  description: 'Meet the dedicated team behind Aram Saeivom Family Trust.',
};

// ✅ Use placeholder images from Supabase (or a neutral fallback)
const teamMembers = [
  {
    name: 'Founder Name',
    role: 'Founder & Chairperson',
    years: 8,
    image: '/placeholder-team.svg', // We'll create this
    email: 'founder@aramsaeivom.org',
  },
  {
    name: 'Trustee 1',
    role: 'Trustee',
    years: 6,
    image: '/placeholder-team.svg',
    email: 'trustee1@aramsaeivom.org',
  },
  {
    name: 'Trustee 2',
    role: 'Trustee',
    years: 5,
    image: '/placeholder-team.svg',
    email: 'trustee2@aramsaeivom.org',
  },
  {
    name: 'Volunteer Coordinator',
    role: 'Volunteer Coordinator',
    years: 4,
    image: '/placeholder-team.svg',
    email: 'volunteer@aramsaeivom.org',
  },
];

export default function TeamPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white pt-24">

        {/* Hero */}
        <section className="relative h-[300px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-800 to-primary-600">
          <div className="absolute inset-0 bg-black/20" />
          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
            <span className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-widest border border-white/30 mb-4">
              Our Team
            </span>
            <h1 className="text-4xl sm:text-5xl font-serif font-bold drop-shadow-lg">
              Meet Our Team
            </h1>
            <p className="text-white/90 text-lg max-w-2xl mx-auto mt-4 leading-relaxed">
              The dedicated individuals behind Aram Saeivom Family Trust — working tirelessly to create lasting change.
            </p>
          </div>
        </section>

        {/* Team Grid */}
        <section className="py-16 max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our team is comprised of passionate individuals committed to serving communities with integrity, compassion, and purpose.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <div
                key={member.name}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-primary-200"
              >
                <div className="relative h-64 w-full overflow-hidden bg-primary-50 flex items-center justify-center">
                  {member.image ? (
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="text-6xl font-bold text-primary-200">
                      {member.name.charAt(0)}
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800">{member.name}</h3>
                  <p className="text-primary-600 font-medium text-sm">{member.role}</p>
                  <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar size={14} />
                      {member.years}+ years
                    </span>
                    <span className="flex items-center gap-1">
                      <Mail size={14} />
                      <a href={`https://mail.google.com/mail/?view=cm&fs=1&to=${member.email}`} target="_blank" rel="noopener noreferrer" className="hover:text-primary-600 transition">
                        Email
                      </a>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Note about placeholder images */}
          <div className="mt-12 text-center text-sm text-gray-400 border-t border-gray-100 pt-8">
            <p>📸 Team photos coming soon. <span className="text-primary-500">✦</span></p>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-primary-50 border-t border-primary-100">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-2xl font-serif font-bold text-primary-800 mb-4">
              Join Our Team
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8">
              We're always looking for passionate volunteers and team members. Be a part of something meaningful.
            </p>
            <Link
              href="/volunteer"
              className="inline-block bg-primary-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-primary-700 transition shadow-lg shadow-primary-200"
            >
              Volunteer With Us
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
