import { createClient } from '@/lib/supabase/server'; // ✅ server version for Server Component
import { Navbar } from '@/app/components/layout/Navbar';
import { Footer } from '@/app/components/layout/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, MapPin, Clock, ArrowRight } from 'lucide-react';

interface Announcement {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  image: string;
  alt: string;
  status: string;
  google_form_url: string;
  created_at?: string;
}

async function getAnnouncements() {
  console.log('🔍 Fetching announcements...');
  const supabase = createClient(); // ✅ create client inside function
  
  const { data, error } = await supabase
    .from('announcements')
    .select('*')
    .order('id', { ascending: false });

  if (error) {
    console.error('❌ Error:', error);
    return { data: [], error: error.message };
  }

  console.log(`✅ Fetched ${data?.length || 0} announcements`);
  return { data: data || [], error: null };
}

export default async function EventsPage() {
  const { data: announcements, error } = await getAnnouncements();

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white pt-24">
        {/* Hero Section */}
        <section className="relative h-[400px] sm:h-[500px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="https://vixzstrzqhwswhibzfdq.supabase.co/storage/v1/object/public/content-images/content-images/2026/Uvagai/20260321_181154.jpg"
              alt="Events and announcements"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>
          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
            <span className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-widest border border-white/30">
              <Calendar size={16} /> UPCOMING & ONGOING
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold mt-6 drop-shadow-lg">
              Events & Announcements
            </h1>
            <p className="text-white/90 text-lg max-w-2xl mx-auto mt-4 leading-relaxed">
              See all our upcoming events, workshops, and community programs.
            </p>
          </div>
        </section>

        {/* Events Grid */}
        <section className="py-16 max-w-7xl mx-auto px-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-6">
              <p className="font-semibold">Error loading announcements:</p>
              <p className="text-sm">{error}</p>
            </div>
          )}

          {!error && announcements.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <p>No announcements found.</p>
            </div>
          )}

          {announcements.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {announcements.map((item) => (
                <div key={item.id} className="card-emerald overflow-hidden flex flex-col">
                  {item.image && (
                    <div className="relative h-56 w-full overflow-hidden bg-slate-200">
                      <Image
                        src={item.image}
                        alt={item.alt || item.title}
                        fill
                        className="object-cover"
                      />
                      <span className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold shadow-md ${
                        item.status === 'ongoing' 
                          ? 'bg-emerald-500 text-white' 
                          : item.status === 'past'
                          ? 'bg-gray-500 text-white'
                          : 'bg-primary-500 text-white'
                      }`}>
                        {item.status || 'Upcoming'}
                      </span>
                    </div>
                  )}

                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-xl font-bold text-primary-500">{item.title}</h3>
                    <div className="space-y-2 mt-3 text-sm text-slate-600">
                      {item.date && (
                        <div className="flex items-center gap-2">
                          <Calendar size={16} className="text-primary-400" />
                          <span>{item.date}</span>
                        </div>
                      )}
                      {item.time && (
                        <div className="flex items-center gap-2">
                          <Clock size={16} className="text-primary-400" />
                          <span>{item.time}</span>
                        </div>
                      )}
                      {item.location && (
                        <div className="flex items-start gap-2">
                          <MapPin size={16} className="text-primary-400 mt-0.5" />
                          <span>{item.location}</span>
                        </div>
                      )}
                    </div>
                    <p className="text-slate-500 text-sm mt-3 leading-relaxed flex-1 line-clamp-4">
                      {item.description}
                    </p>
                    <Link
                      href={item.google_form_url || '/#donate'}
                      target={item.google_form_url ? '_blank' : ''}
                      rel={item.google_form_url ? 'noopener noreferrer' : ''}
                      className="inline-flex items-center gap-2 text-emerald-600 font-semibold text-sm mt-4 hover:gap-4 transition-all duration-300 group"
                    >
                      {item.google_form_url ? 'Apply Now' : 'Get Involved'} 
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}