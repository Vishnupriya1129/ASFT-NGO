'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Heart } from 'lucide-react';

export function FloatingDonate() {
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      // Hide on scroll down, show on scroll up (optional)
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
      }`}
    >
      <Link
        href="/donate"
        className="flex items-center gap-2 bg-gradient-to-r from-[#C9A227] to-[#d4b44a] text-[#0a1628] px-5 py-3 rounded-full shadow-2xl shadow-[#C9A227]/30 hover:shadow-[#C9A227]/50 hover:scale-105 transition-all duration-300 font-bold text-base"
      >
        <Heart size={20} className="fill-[#0a1628]" />
        <span>Donate Now</span>
      </Link>
    </div>
  );
}