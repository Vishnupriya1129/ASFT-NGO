'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from '@/components/ui/SafeImage';
import { createClient } from '@/lib/supabase/client';
import { ArrowRight, TreePine, Sparkles, Calendar } from 'lucide-react';

interface Program {
  id: number;
  slug: string;
  title: string;
  description: string;
  image_urls: string[];
  parent_slug: string | null;
  sort_order: number;
  is_active: boolean;
}

// ✅ Only these 3 programs will show
const HOMEPAGE_PROGRAMS = ['odyssey', 'thooayam-26', 'observation-days'];

const programIcons: Record<string, { icon: React.ReactNode; color: string }> = {
  'odyssey': { icon: <TreePine size={24} />, color: 'text-emerald-600' },
  'thooayam-26': { icon: <Sparkles size={24} />, color: 'text-blue-600' },
  'observation-days': { icon: <Calendar size={24} />, color: 'text-amber-600' },
};

export function ProgramsSection() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const fetchPrograms = async () => {
      const { data, error } = await supabase
        .from('programs')
        .select('*')
        .eq('is_active', true)
        .is('parent_slug', null)
        .in('slug', HOMEPAGE_PROGRAMS) // ✅ Only fetch these 3
        .order('sort_order', { ascending: true });

      if (data) setPrograms(data);
      setLoading(false);
    };

    fetchPrograms();
  }, [supabase]);

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-gray-500">Loading programs...</p>
        </div>
      </section>
    );
  }

  if (programs.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="inline-block bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-widest mb-3">
            Our Impact Areas
          </span>
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-[#0a1628]">
            Programs That Transform Lives
          </h2>
          <div className="w-16 h-1 bg-emerald-500 mx-auto mt-4 rounded-full" />
          <p className="text-gray-600 max-w-2xl mx-auto mt-4 text-lg">
            Explore the many ways we're creating lasting change in communities across Tamil Nadu.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((program) => {
            const iconData = programIcons[program.slug] || { icon: null, color: 'text-primary-600' };
            
            return (
              <Link
                key={program.id}
                href={`/programs/${program.slug}`}
                className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-emerald-300 hover:-translate-y-1"
              >
                {/* Image */}
                {program.image_urls && program.image_urls.length > 0 ? (
                  <div className="relative h-52 w-full overflow-hidden">
                    <Image
                      src={program.image_urls[0]}
                      alt={program.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                  </div>
                ) : (
                  <div className="relative h-52 w-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                    <span className="text-gray-300 text-sm">No Image</span>
                  </div>
                )}
                
                <div className="p-6">
                  {iconData.icon && (
                    <div className={`${iconData.color} mb-3`}>
                      {iconData.icon}
                    </div>
                  )}
                  <h3 className="text-xl font-bold text-gray-800 group-hover:text-emerald-600 transition-colors">
                    {program.title}
                  </h3>
                  <p className="text-gray-500 text-sm mt-2 line-clamp-3">{program.description}</p>
                  <div className="mt-4 flex items-center gap-2 text-emerald-600 font-semibold text-sm group-hover:gap-3 transition-all">
                    Learn More <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/programs"
            className="inline-flex items-center gap-2 bg-emerald-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-emerald-700 transition shadow-lg shadow-emerald-200"
          >
            View All Programs <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}