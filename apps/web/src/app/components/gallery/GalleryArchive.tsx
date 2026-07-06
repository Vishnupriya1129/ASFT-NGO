// apps/web/src/components/gallery/GalleryArchive.tsx
'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { X, ChevronLeft, ChevronRight, FolderOpen } from 'lucide-react';

type GalleryItem = {
  id: number;
  title: string;
  image_url: string;
  caption: string;
  year: number;
  event: string;
};

export default function GalleryArchive() {
  const [photos, setPhotos] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryItem | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    loadGallery();
  }, []);

  async function loadGallery() {
    if (!supabase) return;

    const { data, error } = await supabase
      .from('gallery')
      .select('*')
      .order('year', { ascending: false })
      .order('event', { ascending: true });

    if (error) {
      console.error(error);
      return;
    }

    setPhotos((data as GalleryItem[]) || []);
    setLoading(false);
  }

  const groupedGallery = useMemo(() => {
    const result: Record<number, Record<string, GalleryItem[]>> = {};

    photos.forEach((photo) => {
      if (!result[photo.year]) {
        result[photo.year] = {};
      }
      if (!result[photo.year][photo.event]) {
        result[photo.year][photo.event] = [];
      }
      result[photo.year][photo.event].push(photo);
    });

    return result;
  }, [photos]);

  const allPhotos = useMemo(() => photos, [photos]);

  const handlePhotoClick = (photo: GalleryItem) => {
    const index = allPhotos.findIndex(p => p.id === photo.id);
    setSelectedPhoto(photo);
    setSelectedIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedPhoto(null);
    document.body.style.overflow = 'auto';
  };

  const navigatePhoto = (direction: 'prev' | 'next') => {
    const currentIndex = allPhotos.findIndex(p => p.id === selectedPhoto?.id);
    let newIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
    if (newIndex < 0) newIndex = allPhotos.length - 1;
    if (newIndex >= allPhotos.length) newIndex = 0;
    setSelectedPhoto(allPhotos[newIndex]);
    setSelectedIndex(newIndex);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedPhoto) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') navigatePhoto('prev');
      if (e.key === 'ArrowRight') navigatePhoto('next');
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhoto]);

  if (loading) {
    return (
      <div className="text-center py-24 text-white/60">
        Loading Gallery...
      </div>
    );
  }

  return (
    <section className="py-10">
      <div className="max-w-7xl mx-auto px-6">
        {Object.entries(groupedGallery)
          .sort(([yearA], [yearB]) => Number(yearB) - Number(yearA))
          .map(([year, events]) => {
            const totalPhotos = Object.values(events).reduce(
              (acc, items) => acc + items.length,
              0
            );

            return (
              <div key={year} className="mb-20">
                {/* Year Header - Folder Style */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-4 mb-8"
                >
                  <FolderOpen className="w-8 h-8 text-sun-warm" />
                  <h2 className="text-4xl font-serif text-white">
                    {year}
                  </h2>
                  <span className="text-white/30 text-sm font-mono">
                    ({totalPhotos} photos)
                  </span>
                </motion.div>

                {/* Events - Like Subfolders */}
                {Object.entries(events).map(([event, items]) => (
                  <div key={event} className="mb-12 ml-8">
                    {/* Event Header */}
                    <motion.h3
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      className="text-2xl font-semibold text-white/80 mb-4 flex items-center gap-3"
                    >
                      <span className="w-1 h-6 bg-sun-warm/50 rounded-full" />
                      {event}
                      <span className="text-white/30 text-sm font-mono">
                        ({items.length} {items.length === 1 ? 'photo' : 'photos'})
                      </span>
                    </motion.h3>

                    {/* Photo Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                      {items.map((photo, index) => (
                        <motion.div
                          key={photo.id}
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          className="group relative rounded-lg overflow-hidden bg-white/5 border border-white/10 hover:border-sun-warm/50 transition-all duration-300 cursor-pointer aspect-square"
                          onClick={() => handlePhotoClick(photo)}
                        >
                          <Image
                            src={photo.image_url}
                            alt={photo.title || photo.caption || 'Gallery image'}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/80 to-transparent">
                            <p className="text-white text-xs font-medium line-clamp-2">
                              {photo.caption || photo.title}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            );
          })}

        {photos.length === 0 && (
          <div className="text-center py-24">
            <p className="text-white/40 text-lg">
              No gallery images found.
            </p>
          </div>
        )}
      </div>

      {/* Lightbox Modal - Keep the same */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            {/* ... keep your existing lightbox code ... */}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}