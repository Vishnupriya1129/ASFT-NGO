'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

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

  const allPhotos = useMemo(() => {
    return photos;
  }, [photos]);

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

  // Keyboard navigation
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
          .map(([year, events]) => (
            <div key={year} className="mb-20">
              {/* Year Header - Bigger and Elegant */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-10"
              >
                <h2 className="text-5xl lg:text-6xl font-serif text-white mb-3">
                  {year}
                </h2>
                {/* Thin Gold Divider */}
                <div className="flex items-center gap-4">
                  <div className="h-px flex-1 bg-gradient-to-r from-sun-warm/60 to-transparent" />
                  <span className="text-white/30 text-sm font-light tracking-widest">
                    {Object.values(events).reduce((acc, items) => acc + items.length, 0)} memories
                  </span>
                  <div className="h-px flex-1 bg-gradient-to-l from-sun-warm/60 to-transparent" />
                </div>
              </motion.div>

              {/* Events within the year */}
              {Object.entries(events).map(([event, items]) => (
                <div key={event} className="mb-14 last:mb-0">
                  <motion.h3
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-2xl font-semibold text-white/80 mb-6 flex items-center gap-3"
                  >
                    <span className="w-1 h-8 bg-sun-warm rounded-full" />
                    <span>{event}</span>
                    <span className="text-white/30 text-sm font-normal font-mono">
                      ({items.length} {items.length === 1 ? 'Photo' : 'Photos'})
                    </span>
                  </motion.h3>

                  {/* Photo Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {items.map((photo, index) => (
                      <motion.div
                        key={photo.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.05 }}
                        className="group relative rounded-xl overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10 hover:border-sun-warm/50 transition-all duration-300 cursor-pointer"
                        onClick={() => handlePhotoClick(photo)}
                      >
                        {/* Image Container - Increased height */}
                        <div className="relative w-full h-72 lg:h-80 overflow-hidden">
                          <Image
                            src={photo.image_url}
                            alt={photo.title || photo.caption || 'Gallery image'}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>

                        {/* Caption Overlay */}
                        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/80 to-transparent">
                          <p className="text-white text-sm font-medium">
                            {photo.caption || photo.title}
                          </p>
                        </div>

                        {/* Title at bottom (always visible) */}
                        <div className="p-4 bg-white/5">
                          <p className="text-white/70 text-sm line-clamp-2">
                            {photo.title}
                          </p>
                          {photo.caption && photo.caption !== photo.title && (
                            <p className="text-white/40 text-xs mt-1 line-clamp-1">
                              {photo.caption}
                            </p>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))}

        {/* Empty State */}
        {photos.length === 0 && (
          <div className="text-center py-24">
            <p className="text-white/40 text-lg">
              No gallery images found.
            </p>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            {/* Top Controls Bar */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/60 to-transparent z-10 flex items-center justify-between"
            >
              {/* Photo Counter */}
              <div className="flex items-center gap-3">
                <div className="px-4 py-2 bg-black/50 backdrop-blur-sm rounded-lg border border-white/10">
                  <span className="text-white/80 text-sm font-mono">
                    {String(selectedIndex + 1).padStart(2, '0')} <span className="text-white/40">/</span> {String(allPhotos.length).padStart(2, '0')}
                  </span>
                </div>
              </div>

              {/* Close Button */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 text-white/60 hover:text-white transition-colors rounded-lg hover:bg-white/10"
                onClick={(e) => {
                  e.stopPropagation();
                  closeLightbox();
                }}
              >
                <X className="w-6 h-6" />
              </motion.button>
            </motion.div>

            {/* Navigation Arrows - Left */}
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              whileHover={{ scale: 1.1, x: -5 }}
              whileTap={{ scale: 0.9 }}
              className="absolute left-4 lg:left-8 text-white/40 hover:text-white transition-colors z-10 p-3 rounded-full hover:bg-white/10 backdrop-blur-sm"
              onClick={(e) => {
                e.stopPropagation();
                navigatePhoto('prev');
              }}
            >
              <ChevronLeft className="w-8 h-8 lg:w-10 lg:h-10" />
            </motion.button>

            {/* Navigation Arrows - Right */}
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              whileHover={{ scale: 1.1, x: 5 }}
              whileTap={{ scale: 0.9 }}
              className="absolute right-4 lg:right-8 text-white/40 hover:text-white transition-colors z-10 p-3 rounded-full hover:bg-white/10 backdrop-blur-sm"
              onClick={(e) => {
                e.stopPropagation();
                navigatePhoto('next');
              }}
            >
              <ChevronRight className="w-8 h-8 lg:w-10 lg:h-10" />
            </motion.button>

            {/* Image Container */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
              className="relative max-w-6xl w-full max-h-[85vh] rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-full min-h-[60vh]">
                <Image
                  src={selectedPhoto.image_url}
                  alt={selectedPhoto.title || selectedPhoto.caption || 'Gallery image'}
                  fill
                  className="object-contain"
                  sizes="(max-width: 1024px) 100vw, 80vw"
                  priority
                />
              </div>

              {/* Bottom Info Overlay - Removed keyboard hints */}
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
              >
                <div className="flex items-center gap-4 text-white/80 mb-2">
                  <span className="text-sm font-mono bg-white/10 px-3 py-1 rounded-full">
                    {selectedPhoto.year}
                  </span>
                  <span className="text-white/30">|</span>
                  <span className="text-sm font-light">{selectedPhoto.event}</span>
                </div>
                <p className="text-white text-lg lg:text-xl font-medium max-w-2xl">
                  {selectedPhoto.caption || selectedPhoto.title}
                </p>
                <div className="flex items-center gap-4 mt-2 text-white/40 text-xs">
                  <span>{selectedIndex + 1} of {allPhotos.length}</span>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}