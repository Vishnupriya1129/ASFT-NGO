import { Metadata } from 'next';
import { Navbar } from '@/app/components/layout/Navbar';
import { Footer } from '@/app/components/layout/Footer';
import Link from 'next/link';
import Image from '@/components/ui/SafeImage';
import { Heart, Users, Target, Award, Clock, MapPin, Mail, ArrowRight, CheckCircle } from 'lucide-react';
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

        {/* ===== HERO ===== */}
        <section className="relative h-[400px] flex items-center justify-center overflow-hidden bg-primary-900">
          <div className="absolute inset-0">
            <Image
              src="https://vixzstrzqhwswhibzfdq.supabase.co/storage/v1/object/public/content-images/content-images/2023/Anniversary/_MG_2559.JPG"
              alt="Join us in making a difference"
              fill
              className="object-cover opacity-30"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-primary-900/80 via-primary-900/70 to-primary-900/90" />
          </div>
          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
            <span className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-widest border border-white/30 mb-4">
              Join Us
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold drop-shadow-lg">
              Be the Change
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto mt-4 leading-relaxed">
              Your time, skills, and compassion can transform lives. Join us in building a brighter future for communities across Tamil Nadu.
            </p>
          </div>
        </section>

        {/* ===== WHY VOLUNTEER ===== */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-12">
              <span className="inline-block bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-widest mb-3">
                Get Involved
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-primary-900">
                Why Volunteer With Us?
              </h2>
              <div className="w-16 h-1 bg-primary-500 mx-auto mt-4 rounded-full" />
              <p className="text-gray-600 max-w-2xl mx-auto mt-4 text-lg">
                Volunteering with Aram Saeivom Family Trust is more than just giving your time — it's about becoming part of a movement that creates lasting change.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-50 rounded-2xl p-8 text-center hover:shadow-lg transition-shadow border border-gray-100">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart size={28} className="text-primary-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Make a Difference</h3>
                <p className="text-gray-600 text-sm">
                  Your efforts directly impact the lives of children, families, and communities in need.
                </p>
              </div>

              <div className="bg-gray-50 rounded-2xl p-8 text-center hover:shadow-lg transition-shadow border border-gray-100">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users size={28} className="text-primary-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Build Community</h3>
                <p className="text-gray-600 text-sm">
                  Join a network of passionate individuals who share your commitment to social change.
                </p>
              </div>

              <div className="bg-gray-50 rounded-2xl p-8 text-center hover:shadow-lg transition-shadow border border-gray-100">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award size={28} className="text-primary-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Grow & Learn</h3>
                <p className="text-gray-600 text-sm">
                  Develop new skills, gain valuable experience, and grow as a leader in your community.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ===== WHAT VOLUNTEERS DO ===== */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-primary-900">
                What Volunteers Do
              </h2>
              <div className="w-16 h-1 bg-primary-500 mx-auto mt-4 rounded-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  icon: <Heart size={20} className="text-primary-600" />,
                  title: 'Community Outreach',
                  description: 'Engage with communities, organize events, and spread awareness about our programs.'
                },
                {
                  icon: <Users size={20} className="text-primary-600" />,
                  title: 'Program Support',
                  description: 'Assist in running programs — from education and health camps to environmental initiatives.'
                },
                {
                  icon: <Target size={20} className="text-primary-600" />,
                  title: 'Skill-Based Volunteering',
                  description: 'Share your expertise — whether it\'s teaching, photography, social media, or administration.'
                },
                {
                  icon: <Clock size={20} className="text-primary-600" />,
                  title: 'Event Management',
                  description: 'Help plan and execute events, workshops, and community gatherings.'
                },
                {
                  icon: <MapPin size={20} className="text-primary-600" />,
                  title: 'Field Work',
                  description: 'Join us on the ground — participate in relief work, field trips, and community visits.'
                },
                {
                  icon: <Mail size={20} className="text-primary-600" />,
                  title: 'Advocacy & Awareness',
                  description: 'Help us amplify our voice through social media, content creation, and advocacy campaigns.'
                }
              ].map((item, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary-50 rounded-full flex items-center justify-center flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">{item.title}</h4>
                    <p className="text-gray-500 text-sm mt-1">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== WHO CAN APPLY ===== */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-primary-900">
                Who Can Apply?
              </h2>
              <div className="w-16 h-1 bg-primary-500 mx-auto mt-4 rounded-full" />
            </div>

            <div className="bg-primary-50 rounded-2xl p-8 md:p-12 border border-primary-100">
              <p className="text-gray-700 text-lg leading-relaxed text-center">
                We welcome volunteers from all walks of life. Whether you're a student, a working professional, 
                a retiree, or someone looking to give back — if you have a heart for service, we want to hear from you.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                <div className="bg-white rounded-xl p-4 text-center shadow-sm">
                  <div className="text-2xl mb-1">👩‍🎓</div>
                  <p className="font-medium text-gray-800 text-sm">Students</p>
                  <p className="text-gray-500 text-xs">Build skills & experience</p>
                </div>
                <div className="bg-white rounded-xl p-4 text-center shadow-sm">
                  <div className="text-2xl mb-1">👨‍💼</div>
                  <p className="font-medium text-gray-800 text-sm">Professionals</p>
                  <p className="text-gray-500 text-xs">Share your expertise</p>
                </div>
                <div className="bg-white rounded-xl p-4 text-center shadow-sm">
                  <div className="text-2xl mb-1">👴</div>
                  <p className="font-medium text-gray-800 text-sm">Retirees</p>
                  <p className="text-gray-500 text-xs">Give back to the community</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== WHAT WE LOOK FOR ===== */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-primary-900">
                What We Look For
              </h2>
              <div className="w-16 h-1 bg-primary-500 mx-auto mt-4 rounded-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                'A genuine passion for social change',
                'Commitment to our mission and values',
                'Reliability and dedication',
                'Willingness to learn and grow',
                'Team player with a positive attitude',
                'Empathy and respect for all communities'
              ].map((quality, index) => (
                <div key={index} className="flex items-start gap-3 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                  <CheckCircle size={20} className="text-primary-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{quality}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== VOLUNTEER FOR A SPECIFIC PROGRAM ===== */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-12">
              <span className="inline-block bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-widest mb-3">
                Choose Your Path
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-primary-900">
                Volunteer for a Specific Program
              </h2>
              <div className="w-16 h-1 bg-primary-500 mx-auto mt-4 rounded-full" />
              <p className="text-gray-600 max-w-2xl mx-auto mt-4">
                Not sure where to start? Pick a program that resonates with you and join us there.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                'Odyssey Project',
                'THOOYAM \'26',
                'Relief Works',
                'Health Programs',
                'Humanitarian Programs',
                'Training Programs'
              ].map((program) => (
                <Link
                  key={program}
                  href={`/programs/${program.toLowerCase().replace(/[' ]/g, '-').replace('--', '-')}`}
                  className="bg-gray-50 hover:bg-primary-50 p-4 rounded-xl text-center border border-gray-100 hover:border-primary-200 transition-all group"
                >
                  <p className="font-medium text-gray-800 group-hover:text-primary-600 transition-colors">
                    {program}
                  </p>
                  <p className="text-xs text-gray-400 group-hover:text-primary-400 transition-colors">
                    Learn more →
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

{/* ===== TESTIMONIALS ===== */}
<Testimonials
  title="Voices of Our Volunteers"
  subtitle="Hear from those who have been part of our journey"
/>

        {/* ===== CTA ===== */}
        <section className="py-16 bg-primary-900">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-serif font-bold text-white mb-4">
              Ready to Make a Difference?
            </h2>
            <p className="text-white/80 text-lg max-w-2xl mx-auto mb-8">
              Take the first step. Join us in building a more just, compassionate, and equitable world.
            </p>
            <Link
              href="https://docs.google.com/forms/d/e/1FAIpQLSflPi3hdVtPvNNviAmOZZ5e0VewvOxxo5uCsMQBFnnlkzsITA/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-primary-900 px-10 py-4 rounded-full font-bold text-lg hover:bg-primary-50 transition shadow-xl hover:shadow-2xl"
            >
              Sign Up to Volunteer
              <ArrowRight size={20} />
            </Link>
            <p className="text-white/40 text-sm mt-4">
              We'll get back to you within 48 hours.
            </p>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}