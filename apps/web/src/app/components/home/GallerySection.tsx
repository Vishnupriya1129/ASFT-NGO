'use client';

import { useState, useEffect } from 'react';
import Image from '@/components/ui/SafeImage';
import { motion } from 'framer-motion';
import { Camera } from 'lucide-react';
import { createClient } from '@/lib/supabase/client'; // ✅ fixed import

export function GallerySection() {
  const [galleryItems, setGalleryItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient(); // ✅ create the client instance

  useEffect(() => {
    const fetchGallery = async () => {
      const { data, error } = await supabase
        .from('gallery')
        .select('*')
        .limit(6)
        .order('id', { ascending: false });

      if (data) setGalleryItems(data);
      setLoading(false);
    };

    fetchGallery();
  }, [supabase]);

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-gray-500">Loading gallery...</p>
        </div>
      </section>
    );
  }

  if (galleryItems.length === 0) return null;

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-widest">
            <Camera size={16} /> Our Gallery
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-primary-900 mt-4">
            Capturing Moments of Change
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mt-2">
            Glimpses of our journey, events, and the lives we touch.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {galleryItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="relative aspect-square rounded-lg overflow-hidden group cursor-pointer"
            >
              <Image
                src={item.image_url || '/placeholder.svg' || "/placeholder.svg"}
                alt={item.title || 'Gallery'}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/80 to-transparent">
                <p className="text-white text-xs font-medium line-clamp-2">
                  {item.caption || item.title}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-8">
          <a
            href="/gallery"
            className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700 transition-colors"
          >
            View Full Gallery →
          </a>
        </div>
      </div>
    </section>
  );
}
