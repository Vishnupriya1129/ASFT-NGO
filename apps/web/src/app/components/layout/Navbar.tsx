'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Programs', href: '/programs' },
  { label: 'Events', href: '/events' },
  { label: 'Join Us', href: '/volunteer' },
  { label: 'Dashboard', href: '/admin' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      role="navigation"
      aria-label="Main navigation"
      suppressHydrationWarning
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled ? 'bg-white shadow-lg py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 group shrink-0"
          aria-label="Aram Saeivom Family Trust Home"
        >
          <Image
            src="https://vixzstrzqhwswhibzfdq.supabase.co/storage/v1/object/public/content-images/logo/ar.png"
            alt="Aram Saeivom Family Trust"
            width={70}
            height={70}
            priority
            className="object-contain"
          />
          <div className="hidden md:block">
            <div
              className={`font-bold text-xl leading-tight transition-colors duration-300 ${
                scrolled ? 'text-primary-500' : 'text-white'
              }`}
            >
              Aram Saeivom Family Trust
            </div>
            <div
              className={`text-xs font-medium transition-colors duration-300 ${
                scrolled ? 'text-primary-600' : 'text-white/80'
              }`}
            >
              Empowering Youth. Transforming Communities. Inspiring Change.
            </div>
          </div>
          <div className="md:hidden">
            <div
              className={`font-bold text-sm leading-tight transition-colors duration-300 ${
                scrolled ? 'text-primary-500' : 'text-white'
              }`}
            >
              Aram Saeivom
            </div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <ul
          className={`hidden lg:flex items-center gap-1 transition-colors duration-300 ${
            scrolled ? 'text-gray-700' : 'text-white'
          }`}
        >
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`px-4 py-2 text-sm font-medium transition-colors duration-300 rounded-md hover:bg-white/10 ${
                  scrolled
                    ? 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                    : 'text-white hover:text-white/80 hover:bg-white/10'
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/donate"
              className={`btn-primary text-sm py-2.5 px-5 ${
                !scrolled ? 'bg-white text-primary-500 hover:bg-white/90' : ''
              }`}
            >
              Donate
            </Link>
          </li>
        </ul>

        {/* Mobile menu button */}
        <button
          className={`lg:hidden p-2 rounded-lg transition-colors ${
            scrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'
          }`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white border-t border-gray-100"
          >
            <div className="px-4 py-4 space-y-2">
              <ul className="space-y-1">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="block px-4 py-3 rounded-lg text-gray-700 font-medium hover:bg-primary-50 hover:text-primary-600 transition-all duration-300"
                      onClick={() => setMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="pt-3 border-t border-gray-100 mt-3">
                <Link
                  href="/donate"
                  className="btn-primary block px-4 py-3 text-center font-semibold"
                  onClick={() => setMenuOpen(false)}
                >
                  Donate Now
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
