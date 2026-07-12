'use client';

import { useEffect, useState, useMemo } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { createClient } from '@/lib/supabase/client';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Folder,
  FolderOpen,
  ChevronDown,
  ChevronRight as ChevronRightIcon,
} from 'lucide-react';

type GalleryItem = {
  id: number;
  title: string;
  image_url: string;
  caption?: string;
  year: number;
  event: string;
};

export default function GalleryArchive() {
  const supabase = createClient();
  const [photos, setPhotos] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryItem | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [openYears, setOpenYears] = useState<Record<number, boolean>>({});
  const [openEvents, setOpenEvents] = useState<Record<string, boolean>>({});

  useEffect(() => {
    loadGallery();
  }, []);

  async function loadGallery() {
    console.log('🔍 Fetching gallery...');
    if (!supabase) {
      setError('Supabase client not available.');
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('gallery')
        .select('*')
        .order('year', { ascending: false })
        .order('event', { ascending: true });

      if (error) {
        console.error('❌ Supabase error:', error);
        setError(`Error: ${error.message}`);
        setLoading(false);
        return;
      }

      console.log('📊 Data received:', data?.length || 0, 'rows');
      setPhotos(data || []);
    } catch (err) {
      console.error('💥 Unexpected:', err);
      setError('Unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  }

  const groupedGallery = useMemo(() => {
    const result: Record<number, Record<string, GalleryItem[]>> = {};
    photos.forEach((photo) => {
      if (!result[photo.year]) result[photo.year] = {};
      if (!result[photo.year][photo.event]) result[photo.year][photo.event] = [];
      result[photo.year][photo.event].push(photo);
    });
    return result;
  }, [photos]);

  const allPhotos = useMemo(() => photos, [photos]);

  const toggleYear = (year: number) =>
    setOpenYears((prev) => ({ ...prev, [year]: !prev[year] }));

  const toggleEvent = (key: string) =>
    setOpenEvents((prev) => ({ ...prev, [key]: !prev[key] }));

  const handlePhotoClick = (photo: GalleryItem) => {
    const index = allPhotos.findIndex((p) => p.id === photo.id);
    setSelectedPhoto(photo);
    setSelectedIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedPhoto(null);
    document.body.style.overflow = 'auto';
  };

  const navigatePhoto = (direction: 'prev' | 'next') => {
    const current = allPhotos.findIndex((p) => p.id === selectedPhoto?.id);
    const newIndex = (current + (direction === 'next' ? 1 : -1) + allPhotos.length) % allPhotos.length;
    setSelectedPhoto(allPhotos[newIndex]);
    setSelectedIndex(newIndex);
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!selectedPhoto) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') navigatePhoto('prev');
      if (e.key === 'ArrowRight') navigatePhoto('next');
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [selectedPhoto]);

  if (loading) {
    return (
      <div className="text-center py-24 text-white/60">
        <div className="animate-spin w-8 h-8 border-4 border-sun-warm border-t-transparent rounded-full mx-auto mb-4" />
        <p>Loading Gallery...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-24 text-red-400">
        <p className="text-xl font-semibold">⚠️ {error}</p>
        <p className="text-sm text-white/40 mt-2">Check console for details.</p>
      </div>
    );
  }

  if (photos.length === 0) {
    return (
      <div className="text-center py-24">
        <p className="text-white/40 text-lg">No gallery images found.</p>
        <p className="text-white/20 text-sm">Run the SQL to allow public read access.</p>
      </div>
    );
  }

  return (
    <section className="py-10">
      <div className="max-w-7xl mx-auto px-6">
        {Object.entries(groupedGallery)
          .sort(([a], [b]) => Number(b) - Number(a))
          .map(([year, events]) => {
            const total = Object.values(events).reduce((acc, items) => acc + items.length, 0);
            const isYearOpen = openYears[Number(year)] ?? false;

            return (
              <div key={year} className="mb-6 border-b border-white/5 pb-6">
                <button
                  onClick={() => toggleYear(Number(year))}
                  className="flex items-center gap-3 w-full text-left hover:bg-white/5 rounded-lg p-3 transition-colors group"
                >
                  {isYearOpen ? (
                    <FolderOpen className="w-6 h-6 text-sun-warm" />
                  ) : (
                    <Folder className="w-6 h-6 text-sun-warm/70 group-hover:text-sun-warm" />
                  )}
                  <span className="text-2xl font-serif text-white">{year}</span>
                  <span className="text-white/40 text-sm font-mono">({total} photos)</span>
                  <span className="ml-auto">
                    {isYearOpen ? (
                      <ChevronDown className="w-5 h-5 text-white/40" />
                    ) : (
                      <ChevronRightIcon className="w-5 h-5 text-white/40" />
                    )}
                  </span>
                </button>

                {isYearOpen && (
                  <div className="ml-8 mt-4 space-y-6">
                    {Object.entries(events).map(([event, items]) => {
                      const eventKey = `${year}-${event}`;
                      const isEventOpen = openEvents[eventKey] ?? false;

                      return (
                        <div key={event} className="border-l-2 border-white/10 pl-4">
                          <button
                            onClick={() => toggleEvent(eventKey)}
                            className="flex items-center gap-2 w-full text-left hover:bg-white/5 rounded-lg px-3 py-2 transition-colors group"
                          >
                            {isEventOpen ? (
                              <FolderOpen className="w-5 h-5 text-sun-warm/80" />
                            ) : (
                              <Folder className="w-5 h-5 text-sun-warm/60 group-hover:text-sun-warm" />
                            )}
                            <span className="text-lg font-semibold text-white/80">{event}</span>
                            <span className="text-white/30 text-sm font-mono">
                              ({items.length} {items.length === 1 ? 'photo' : 'photos'})
                            </span>
                            <span className="ml-auto">
                              {isEventOpen ? (
                                <ChevronDown className="w-4 h-4 text-white/30" />
                              ) : (
                                <ChevronRightIcon className="w-4 h-4 text-white/30" />
                              )}
                            </span>
                          </button>

                          {isEventOpen && (
                            <div className="mt-3 ml-6">
                              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                                {items.map((photo, idx) => (
                                  <motion.div
                                    key={photo.id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                                    className="group relative rounded-lg overflow-hidden bg-white/5 border border-white/10 hover:border-sun-warm/50 transition-all duration-300 cursor-pointer aspect-square"
                                    onClick={() => handlePhotoClick(photo)}
                                  >
                                    <Image
                                      src={photo.image_url}
                                      alt={photo.title || photo.caption || 'Gallery'}
                                      fill
                                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    <div className="absolute bottom-0 left-0 right-0 p-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/80 to-transparent">
                                      <p className="text-white text-xs font-medium line-clamp-2">
                                        {photo.caption || photo.title}
                                      </p>
                                    </div>
                                  </motion.div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
      </div>

      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            {/* Close, prev, next buttons... (keep as before) */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              className="absolute top-6 right-6 text-white/60 hover:text-white z-10"
              onClick={(e) => { e.stopPropagation(); closeLightbox(); }}
            >
              <X className="w-8 h-8" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              className="absolute left-6 text-white/40 hover:text-white z-10 hidden md:block"
              onClick={(e) => { e.stopPropagation(); navigatePhoto('prev'); }}
            >
              <ChevronLeft className="w-12 h-12" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              className="absolute right-6 text-white/40 hover:text-white z-10 hidden md:block"
              onClick={(e) => { e.stopPropagation(); navigatePhoto('next'); }}
            >
              <ChevronRight className="w-12 h-12" />
            </motion.button>

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', damping: 20 }}
              className="relative max-w-5xl w-full max-h-[85vh] rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-full min-h-[50vh]">
                <Image
                  src={selectedPhoto.image_url}
                  alt={selectedPhoto.title || 'Gallery'}
                  fill
                  className="object-contain"
                  sizes="(max-width: 1024px) 100vw, 80vw"
                  priority
                />
              </div>
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent"
              >
                <div className="flex items-center gap-4 text-white/80 mb-2">
                  <span className="text-sm font-mono bg-white/10 px-3 py-1 rounded-full">
                    {selectedPhoto.year}
                  </span>
                  <span className="text-white/30">|</span>
                  <span className="text-sm font-light">{selectedPhoto.event}</span>
                </div>
                <p className="text-white text-lg lg:text-xl font-medium">
                  {selectedPhoto.caption || selectedPhoto.title}
                </p>
                <div className="text-white/40 text-xs mt-2">
                  {selectedIndex + 1} of {allPhotos.length}
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
