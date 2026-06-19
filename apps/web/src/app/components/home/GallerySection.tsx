'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Camera } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export function GallerySection() {
  const [galleryItems, setGalleryItems] = useState<any[]>([]);

  useEffect(() => {
    loadGallery();
  }, []);

  async function loadGallery() {
    const { data, error } = await supabase
      .from('gallery')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Gallery fetch error:', error);
      return;
    }

    console.log('Gallery:', data);
    setGalleryItems(data || []);
  }

  return (
    <section
      id="gallery"
      className="py-24 bg-soil-dark"
      aria-label="Gallery of our work"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 bg-white/10 text-sun-warm px-5 py-2 rounded-full text-sm font-semibold uppercase tracking-widest mb-5">
            <Camera size={14} /> Moments of Impact
          </span>
          <h2 className="font-serif text-5xl text-sun-pale mb-5">
            Stories from the Soil
          </h2>
          <p className="text-white/60 text-lg">
            Real faces, real places, real change. Every photograph is a testament to the
            resilience of the human spirit.
          </p>
        </div>

        {/* Masonry‑style grid (matching the normal code layout) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px]">
          {galleryItems.length > 0 ? (
            galleryItems.map((item) => {
              const { id, image_url, title, caption, alt, span } = item;
              return (
                <motion.div
                  key={id || item.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.05 }} // subtle stagger
                  className={`relative rounded-2xl overflow-hidden cursor-pointer group shadow-xl ${
                    span === 'large'
                      ? 'col-span-2 row-span-2'
                      : span === 'wide'
                      ? 'col-span-2'
                      : ''
                  }`}
                >
                  <Image
                    src={image_url}
                    alt={alt || title || 'Gallery image'}
                    width={800}
                    height={600}
                    className="w-full h-full object-cover brightness-85 group-hover:brightness-65 group-hover:scale-110 transition-all duration-500"
                    loading="lazy"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-end p-6">
                    <div className="text-white transform translate-y-5 group-hover:translate-y-0 transition-transform duration-400">
                      <p className="font-semibold text-base">{title}</p>
                      <p className="text-white/70 text-sm mt-1">{caption}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })
          ) : (
            // Optional loading/empty state – you can replace with a skeleton or message
            <div className="col-span-full text-center text-white/50 py-12 text-sm">
              Loading gallery…
            </div>
          )}
        </div>
      </div>
    </section>
  );
}