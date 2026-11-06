'use client';

import Image from '@/components/ui/SafeImage';

interface TimelineItem {
  id: number;
  year: string;
  title: string;
  description: string;
  image_urls: string[];
  details: string[];
  sort_order: number;
  is_active: boolean;
}

interface TimelineProps {
  items: TimelineItem[];
}

const LeafMask = ({ children, isEven }: { children: React.ReactNode, isEven: boolean }) => {
  const maskId = `leaf-mask-${isEven ? 'right' : 'left'}`;

  return (
    <div className="relative w-full h-full overflow-hidden">
      <svg width="0" height="0" className="absolute">
        <clipPath id={maskId} clipPathUnits="objectBoundingBox">
          <path 
            d={
              isEven 
                ? "M 0.5,0 C 0.9,0 1,0.3 1,0.7 C 1,1 0.7,1 0.5,1 C 0.1,1 0,0.7 0,0.3 C 0,0.1 0.1,0 0.5,0 Z" 
                : "M 0.5,0 C 0.1,0 0,0.3 0,0.7 C 0,1 0.3,1 0.5,1 C 0.9,1 1,0.7 1,0.3 C 1,0.1 0.9,0 0.5,0 Z"
            } 
          />
        </clipPath>
      </svg>
      <div 
        style={{ 
          clipPath: `url(#${maskId})`,
          WebkitClipPath: `url(#${maskId})`
        }}
        className="w-full h-full relative"
      >
        {children}
      </div>
    </div>
  );
};

export function Timeline({ items }: TimelineProps) {
  return (
    <div className="max-w-5xl mx-auto px-6 pb-20" suppressHydrationWarning>
      
      <div className="relative">
        {/* The Jade Green Vertical Line */}
        <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-[2px] bg-[#0E7A5F]/50 md:-translate-x-1/2 shadow-[0_0_15px_rgba(14,122,95,0.8)]" />

        <div className="space-y-24">
          {items.map((item, index) => {
            const isEven = index % 2 === 0;
            const imageUrl = item.image_urls && item.image_urls.length > 0 ? item.image_urls[0] : null;

            return (
              <div
                key={item.id || index}
                className={`relative flex flex-col md:flex-row items-center gap-8 md:gap-16 ${
                  isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Text Side (Glassmorphism Card) */}
                <div className={`flex-1 w-full md:w-1/2 pl-16 md:pl-0 ${isEven ? 'md:text-right' : 'md:text-left'}`}>
                  <div className="inline-block bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:bg-white/15 transition-colors duration-500 w-full md:w-[95%]">
                    <span className="text-4xl font-serif font-bold text-[#C9A227] block mb-2 pointer-events-none drop-shadow-md">
                      {item.year}
                    </span>
                    <h3 className="text-2xl font-bold text-white mb-4 relative z-10">
                      {item.title}
                    </h3>
                    <p className="text-white/80 leading-relaxed text-sm md:text-base">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Central Dot (Glowing) */}
                <div className="absolute left-[20px] md:left-1/2 md:-translate-x-1/2 flex items-center justify-center w-5 h-5 rounded-full bg-[#0F223D] border-2 border-[#0E7A5F] z-10 shadow-[0_0_15px_rgba(14,122,95,1)]">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#0E7A5F]" />
                </div>

                {/* Image Side (Leaf Shape) */}
                <div className="flex-1 w-full md:w-1/2 pl-16 md:pl-0 flex justify-center">
                  {imageUrl ? (
                    <div className="relative h-[320px] w-[320px] md:h-[400px] md:w-[400px] group transition-all duration-700 hover:scale-105">
                      <LeafMask isEven={isEven}>
                        <Image
                          src={imageUrl}
                          alt={item.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-[#0E7A5F]/20 mix-blend-overlay group-hover:bg-transparent transition-colors duration-500" />
                      </LeafMask>
                    </div>
                  ) : (
                    <div className="relative h-[320px] w-[320px] md:h-[400px] md:w-[400px] bg-white/5 border border-white/10 flex items-center justify-center">
                       <LeafMask isEven={isEven}>
                          <div className="w-full h-full flex items-center justify-center bg-white/5 backdrop-blur-sm">
                             <span className="text-white/40 font-serif italic text-lg">No image</span>
                          </div>
                       </LeafMask>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}