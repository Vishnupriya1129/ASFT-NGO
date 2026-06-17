'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Megaphone } from 'lucide-react';

export function RecruitmentPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (!sessionStorage.getItem('popupClosed')) {
        const timer = setTimeout(() => setOpen(true), 1500);
        return () => clearTimeout(timer);
      }
    }
    return undefined;
  }, []);

  const close = () => {
    setOpen(false);
    sessionStorage.setItem('popupClosed', 'true');
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-forest-dark/60 backdrop-blur-md z-[10000] flex items-center justify-center p-4"
          onClick={(e) => e.target === e.currentTarget && close()}
          role="dialog"
          aria-modal="true"
          aria-labelledby="popup-title"
        >
          <motion.div
            initial={{ scale: 0.85, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.85, y: 20 }}
            className="bg-gradient-to-br from-forest-mid to-soil-mid text-white rounded-4xl p-12 max-w-md w-full text-center relative shadow-2xl border border-white/15"
          >
            <button
              onClick={close}
              className="absolute top-4 right-4 w-10 h-10 bg-white/15 rounded-full flex items-center justify-center hover:bg-white hover:text-forest-dark transition-all hover:rotate-90 duration-300"
              aria-label="Close announcement"
            >
              <X size={18} />
            </button>

            <div className="text-6xl mb-5 animate-pulse-glow inline-block">
              <Megaphone size={56} className="text-sun-warm mx-auto" />
            </div>

            <h2 id="popup-title" className="font-serif text-4xl font-bold mb-4">
              We are Hiring!
            </h2>
            <p className="text-white/85 text-lg mb-7">
              Join our mission to serve humanity. Recruitment starts from:
            </p>
            <div className="inline-block bg-sun-warm text-soil-dark px-10 py-4 rounded-full font-bold text-2xl font-serif shadow-gold mb-5">
              02 May 2026
            </div>
            <p className="text-white/70 text-sm">
              Positions available for coordinators, field volunteers, and teachers
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
