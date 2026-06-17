'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Programs', href: '/programs' },
  { label: 'Campaigns', href: '/campaigns' },
  { label: 'Education', href: '/education' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Events', href: '/events' },
  { label: 'Volunteer', href: '/volunteer' },
  { label: 'Impact', href: '/impact' },
];

export function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const { data: session }         = useSession();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      role="navigation"
      aria-label="Main navigation"
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white shadow-lg py-3'
          : 'bg-white/98 backdrop-blur-sm py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Logo - Modern & Compact */}
        <Link
  href="/"
  className="flex items-center gap-3 group shrink-0"
  aria-label="Aram Seivom Family Trust Home"
>
  <Image
    src="/aram.png"
    alt="Aram Seivom Family Trust"
    width={60}
    height={60}
    priority
    className="object-contain"
  />

  <div className="hidden sm:block">
    <div className="font-bold text-base text-gray-900 leading-tight">
      Aram Seivom Family Trust
    </div>

    <div className="text-xs text-primary-600 font-medium">
      Youth Skill Development Organisation
    </div>
  </div>
</Link>

        {/* Desktop Nav - Centered */}
        <ul className="hidden lg:flex items-center gap-1" role="list">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link 
                href={item.href} 
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors duration-300 rounded-md hover:bg-gray-50"
              >
                {item.label}
              </Link>
            </li>
          ))}
          {session?.user?.role === 'ADMIN' || session?.user?.role === 'EDITOR' ? (
            <li>
              <Link href="/admin" className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors duration-300 rounded-md hover:bg-gray-50">
                Dashboard
              </Link>
            </li>
          ) : null}
        </ul>

        {/* CTA Section */}
        <div className="hidden lg:flex items-center gap-3">
          {session ? (
            <div className="flex items-center gap-3 border-r border-gray-200 pr-3">
              <span className="text-sm text-gray-600 font-medium">
                {session.user?.name}
              </span>
              <button
                onClick={() => signOut()}
                className="text-sm text-gray-600 hover:text-primary-600 font-medium transition-colors"
              >
                Sign out
              </button>
            </div>
          ) : null}
          <Link href="/#donate" className="btn-primary-sm text-sm py-2.5 px-6 font-semibold">
            Donate
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
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
              <ul className="space-y-1" role="list">
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
                  href="/#donate"
                  className="block px-4 py-3 rounded-lg bg-primary-600 text-white font-semibold text-center hover:bg-primary-700 transition-colors duration-300"
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
