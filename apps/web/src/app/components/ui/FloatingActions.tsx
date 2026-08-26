// apps/web/src/app/components/ui/FloatingActions.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { MessageCircle, Heart } from 'lucide-react';

// ✅ Replace with your NGO's WhatsApp number (country code + number, no '+' or spaces)
const WHATSAPP_NUMBER = '918508053583'; // India country code (91) + your number (without +)

// ✅ Pre‑filled message (URL‑encoded)
const DEFAULT_MESSAGE = encodeURIComponent(
  'Hi! I’d like to know more about Aram Saeivom Family Trust and how I can support your mission.'
);

export function FloatingActions() {
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      // Hide after scrolling down 100px, show when scrolling up
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

  const handleWhatsApp = () => {
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${DEFAULT_MESSAGE}`,
      '_blank'
    );
  };

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 flex flex-col gap-3 transition-all duration-300 ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
      }`}
    >
      {/* WhatsApp Button */}
      <button
        onClick={handleWhatsApp}
        className="flex items-center gap-2 bg-[#25D366] text-white px-5 py-3 rounded-full shadow-2xl shadow-[#25D366]/30 hover:shadow-[#25D366]/50 hover:scale-105 transition-all duration-300 font-bold text-base"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={22} />
        <span>Chat</span>
      </button>

      {/* Donate Button */}
      <Link
        href="/donate"
        className="flex items-center gap-2 bg-gradient-to-r from-[#C9A227] to-[#d4b44a] text-[#0a1628] px-5 py-3 rounded-full shadow-2xl shadow-[#C9A227]/30 hover:shadow-[#C9A227]/50 hover:scale-105 transition-all duration-300 font-bold text-base"
      >
        <Heart size={20} className="fill-[#0a1628]" />
        <span>Donate</span>
      </Link>
    </div>
  );
}