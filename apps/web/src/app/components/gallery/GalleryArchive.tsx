'use client';

import { useEffect, useState, useMemo } from 'react';
import Image from '@/components/ui/SafeImage';
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
  Camera,
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
      
      // Auto-open first year
      if (data && data.length > 0) {
        const years = [...new Set(data.map(p => p.year))];
        setOpenYears({ [years[0]]: true });
      }
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
      <div className="text-center py-16">
        <div className="w-8 h-8 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-sm text-emerald-300/60">Loading gallery...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <p className="text-red-400 font-medium">⚠️ {error}</p>
        <p className="text-sm text-emerald-300/40 mt-2">Please refresh and try again.</p>
      </div>
    );
  }

  if (photos.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-5xl mb-4 text-emerald-500/30">🖼️</div>
        <p className="text-emerald-300/60 font-medium">No gallery images found.</p>
        <p className="text-sm text-emerald-300/30 mt-1">Check back soon for updates.</p>
      </div>
    );
  }

  return (
    <div className="py-2">
      {/* ✨ Gallery Header with Photo Count */}
      <div className="flex items-center justify-between mb-6 px-1">
        <div className="flex items-center gap-3">
          <Camera className="w-5 h-5 text-emerald-400" />
          <span className="text-sm font-medium text-emerald-300/80">
            {photos.length} photos across {Object.keys(groupedGallery).length} years
          </span>
        </div>
        <span className="text-xs text-emerald-300/40 bg-emerald-500/10 px-3 py-1 rounded-full backdrop-blur-sm border border-emerald-500/20">
          Click a year to explore
        </span>
      </div>

      <div className="space-y-4">
        {Object.entries(groupedGallery)
          .sort(([a], [b]) => Number(b) - Number(a))
          .map(([year, events]) => {
            const total = Object.values(events).reduce((acc, items) => acc + items.length, 0);
            const isYearOpen = openYears[Number(year)] ?? false;

            return (
              <div key={year} className="border-b border-emerald-500/20 pb-4 last:border-0">
                {/* Year Header */}
                <button
                  onClick={() => toggleYear(Number(year))}
                  className="flex items-center gap-3 w-full text-left hover:bg-emerald-500/10 rounded-xl p-3 transition-all duration-300 group"
                >
                  <div className={`p-2 rounded-lg transition-all duration-300 ${isYearOpen ? 'bg-emerald-500/20' : 'bg-emerald-500/5'}`}>
                    {isYearOpen ? (
                      <FolderOpen className="w-5 h-5 text-emerald-400" />
                    ) : (
                      <Folder className="w-5 h-5 text-emerald-500/50 group-hover:text-emerald-400" />
                    )}
                  </div>
                  <span className="text-lg font-semibold text-white">{year}</span>
                  <span className="text-emerald-400/60 text-sm">({total} photos)</span>
                  <span className="ml-auto">
                    {isYearOpen ? (
                      <ChevronDown className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <ChevronRightIcon className="w-4 h-4 text-emerald-400" />
                    )}
                  </span>
                </button>

                {isYearOpen && (
                  <div className="ml-12 mt-3 space-y-4">
                    {Object.entries(events).map(([event, items]) => {
                      const eventKey = `${year}-${event}`;
                      const isEventOpen = openEvents[eventKey] ?? false;

                      return (
                        <div key={event} className="border-l-2 border-emerald-500/20 pl-4">
                          <button
                            onClick={() => toggleEvent(eventKey)}
                            className="flex items-center gap-2 w-full text-left hover:bg-emerald-500/10 rounded-lg px-3 py-2 transition-all duration-300 group"
                          >
                            {isEventOpen ? (
                              <FolderOpen className="w-4 h-4 text-emerald-400" />
                            ) : (
                              <Folder className="w-4 h-4 text-emerald-500/40 group-hover:text-emerald-400" />
                            )}
                            <span className="text-sm font-medium text-emerald-200/80">{event}</span>
                            <span className="text-emerald-400/50 text-xs">
                              ({items.length})
                            </span>
                            <span className="ml-auto">
                              {isEventOpen ? (
                                <ChevronDown className="w-3 h-3 text-emerald-400" />
                              ) : (
                                <ChevronRightIcon className="w-3 h-3 text-emerald-400" />
                              )}
                            </span>
                          </button>

                          {isEventOpen && (
                            <div className="mt-3 ml-6">
                              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                                {items.map((photo, idx) => (
                                  <motion.div
                                    key={photo.id}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.3, delay: idx * 0.04 }}
                                    className="group relative rounded-xl overflow-hidden bg-[#0a1628]/50 border border-emerald-500/20 hover:border-emerald-400/60 transition-all duration-300 cursor-pointer aspect-square shadow-sm hover:shadow-lg hover:-translate-y-1"
                                    onClick={() => handlePhotoClick(photo)}
                                  >
                                    <Image
                                      src={photo.image_url || '/placeholder.svg' || "/placeholder.svg"}
                                      alt={photo.title || photo.caption || 'Gallery'}
                                      fill
                                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    <div className="absolute bottom-0 left-0 right-0 p-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-[#0a1628]/90 to-transparent">
                                      <p className="text-white/90 text-xs font-medium line-clamp-2">
                                        {photo.caption || photo.title}
                                      </p>
                                    </div>
                                    <div className="absolute top-2 right-2 bg-emerald-500/20 text-emerald-300 text-[10px] font-medium px-1.5 py-0.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm border border-emerald-500/20">
                                      {photo.year}
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

      {/* Lightbox — Navy Blue + Emerald */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#0a1628]/95 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors z-10"
            >
              <X className="w-6 h-6" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); navigatePhoto('prev'); }}
              className="absolute left-4 text-white/20 hover:text-white transition-colors hidden md:block z-10"
            >
              <ChevronLeft className="w-10 h-10" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); navigatePhoto('next'); }}
              className="absolute right-4 text-white/20 hover:text-white transition-colors hidden md:block z-10"
            >
              <ChevronRight className="w-10 h-10" />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="relative max-w-5xl w-full max-h-[85vh] rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-full min-h-[50vh] bg-[#0a1628]/50">
                <Image
                  src={selectedPhoto.image_url || '/placeholder.svg' || "/placeholder.svg"}
                  alt={selectedPhoto.title || 'Gallery'}
                  fill
                  className="object-contain"
                  sizes="(max-width: 1024px) 100vw, 80vw"
                  priority
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-[#0a1628]/95 to-transparent">
                <div className="flex items-center gap-3 text-white/60 text-xs mb-1">
                  <span className="bg-emerald-500/30 text-emerald-300 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                    {selectedPhoto.year}
                  </span>
                  <span className="text-white/30">|</span>
                  <span className="text-white/50">{selectedPhoto.event}</span>
                </div>
                <p className="text-white text-sm font-medium">
                  {selectedPhoto.caption || selectedPhoto.title}
                </p>
                <div className="text-white/30 text-xs mt-1">
                  {selectedIndex + 1} of {allPhotos.length}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
