// app/components/home/ProgramsSection.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { createClient } from '@/lib/supabase/client';
import { ArrowRight } from 'lucide-react';

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
        .is('parent_slug', null) // Only parent programs
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
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-gray-500">No programs found.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="inline-block bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-widest mb-3">
            Our Impact Areas
          </span>
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-primary-900">
            Programs That Transform Lives
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mt-3 text-lg">
            Explore the many ways we're creating lasting change in communities across Tamil Nadu.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((program) => (
            <Link
              key={program.id}
              href={`/programs/${program.slug}`}
              className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-primary-200 hover:-translate-y-1"
            >
              {program.image_urls && program.image_urls.length > 0 && (
                <div className="relative h-52 w-full overflow-hidden">
                  <Image
                    src={program.image_urls[0]}
                    alt={program.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                </div>
              )}
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 group-hover:text-primary-600 transition-colors">
                  {program.title}
                </h3>
                <p className="text-gray-500 text-sm mt-2 line-clamp-3">{program.description}</p>
                <div className="mt-4 flex items-center gap-2 text-primary-600 font-semibold text-sm group-hover:gap-3 transition-all">
                  Learn More <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}