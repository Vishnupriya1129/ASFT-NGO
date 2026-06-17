'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Camera } from 'lucide-react';

const galleryItems = [
  {
    src: 'vol.png',
    alt: 'NGO volunteers distributing food to people in a community',
    title: 'Nourishing the next generation',
    caption: 'Community feeding drive, South India',
    span: 'large',
  },
  {
    src: 'https://img.magnific.com/premium-photo/smiles-humble-classroom-rural-indian-girl-finds-joy-learning-with-her-friends-back-school_409333-4545.jpg?w=2000',
    alt: 'Children studying together in a classroom',
    title: 'Learning with joy',
    caption: 'Educational program, Rural South India',
    span: 'normal',
  },
  {
    src: 'https://childvikasfoundation.org/assets/images/food-distribution/2.jpg',
    alt: 'A volunteer handing out food packages to families',
    title: 'No one sleeps hungry',
    caption: 'Community outreach, South India',
    span: 'normal',
  },
  {
    src: 'https://images.stockcake.com/public/6/f/6/6f6113c6-18f3-4023-9f41-f690becd9a75_large/rural-classroom-teaching-stockcake.jpg',
    alt: 'Children in a rural classroom listening to a teacher',
    title: 'Education knows no walls',
    caption: 'Village school program, South India',
    span: 'wide',
  },
  {
    src: 'https://www.thehindu.com/news/cities/Thiruvananthapuram/xhj1ze/article31233472.ece/ALTERNATES/LANDSCAPE_615/COMMUNITYKITCHEN',
    alt: 'Community members enjoying a meal together in a care program',
    title: 'Dignity in every action',
    caption: 'Community support initiative, South India',
    span: 'normal',
  },
];

export function GallerySection() {
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

        {/* Masonry-style grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px]">
          {galleryItems.map(({ src, alt, title, caption, span }, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`relative rounded-2xl overflow-hidden cursor-pointer group shadow-xl ${
                span === 'large' ? 'col-span-2 row-span-2' :
                span === 'wide'  ? 'col-span-2'            : ''
              }`}
            >
              <Image
                src={src}
                alt={alt}
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
          ))}
        </div>
      </div>
    </section>
  );
}