'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import ProgramsMegaMenu, { ProgramNode } from './ProgramsMegaMenu';

type NavItem = {
  label: string;
  href: string;
};

const SIMPLE_ITEMS: NavItem[] = [
  { label: 'Gallery', href: '/gallery' },
  { label: 'Events', href: '/events' },
  { label: 'Join Us', href: '/volunteer' },
];

interface NavbarProps {
  programTree?: ProgramNode[];
}

export function Navbar({ programTree = [] }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [programsOpen, setProgramsOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const pathname = usePathname();

  const programsTimeout = useRef<NodeJS.Timeout | null>(null);
  const aboutTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setProgramsOpen(false);
    setAboutOpen(false);
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setProgramsOpen(false);
        setAboutOpen(false);
        setMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const handleProgramsEnter = () => {
    if (programsTimeout.current) clearTimeout(programsTimeout.current);
    setProgramsOpen(true);
  };

  const handleProgramsLeave = () => {
    programsTimeout.current = setTimeout(() => setProgramsOpen(false), 200);
  };

  const handleAboutEnter = () => {
    if (aboutTimeout.current) clearTimeout(aboutTimeout.current);
    setAboutOpen(true);
  };

  const handleAboutLeave = () => {
    aboutTimeout.current = setTimeout(() => setAboutOpen(false), 200);
  };

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  const aboutItems: NavItem[] = [
    { label: 'Our Story', href: '/about' },
    { label: 'Core Team', href: '/team' },
    { label: 'Our Journey', href: '/timeline' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <nav
      role="navigation"
      aria-label="Main navigation"
      suppressHydrationWarning
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100 py-3'
          : 'bg-gradient-to-b from-black/60 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* ✅ Logo — Small Perfect Circle */}
        <Link href="/" className="flex items-center gap-3 group shrink-0">
          <div className="relative w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 transition-transform duration-300 hover:scale-105 flex-shrink-0">
            {/* Gold ring */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: 'linear-gradient(135deg, #E8C84A 0%, #C9A227 50%, #8B6914 100%)',
                boxShadow: '0 3px 12px rgba(201, 162, 39, 0.4)',
              }}
            />
            {/* Inner white ring */}
            <div className="absolute inset-[2px] rounded-full bg-white" />
            {/* Logo image clipped to circle */}
            <div className="absolute inset-[3px] rounded-full overflow-hidden bg-white">
              <Image
                src="https://res.cloudinary.com/kvatjwwc/image/upload/v1790420467/asftt_1.png"
                alt="Aram Saeivom Family Trust"
                fill
                className="object-cover"
                priority
              />
            </div>
            {/* Subtle shine */}
            <div
              className="absolute inset-[3px] rounded-full pointer-events-none"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.35) 0%, transparent 45%)',
              }}
            />
          </div>

          <div className="hidden md:block">
            <div
              className={`font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-tight transition-colors duration-300 ${
                scrolled ? 'text-primary-600' : 'text-white'
              }`}
            >
              Aram Saeivom Family Trust
            </div>
          </div>
          <div className="md:hidden">
            <div
              className={`font-bold text-base sm:text-lg leading-tight transition-colors duration-300 ${
                scrolled ? 'text-primary-600' : 'text-white'
              }`}
            >
              Aram Saeivom
            </div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden lg:flex items-center gap-1">
          {/* About dropdown */}
          <li
            className="relative"
            onMouseEnter={handleAboutEnter}
            onMouseLeave={handleAboutLeave}
          >
            <button
              className={`px-4 py-2 text-base md:text-lg font-semibold transition-all duration-300 rounded-md flex items-center gap-1 ${
                scrolled
                  ? 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                  : 'text-white hover:text-white/80 hover:bg-white/10'
              }`}
              aria-expanded={aboutOpen}
            >
              About
              <ChevronDown
                size={16}
                className={`transition-transform ${aboutOpen ? 'rotate-180' : ''}`}
              />
            </button>
            <AnimatePresence>
              {aboutOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 mt-2 w-56 rounded-xl shadow-xl bg-white border border-gray-100 overflow-hidden"
                >
                  {aboutItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`block px-4 py-3 text-sm transition-colors ${
                        isActive(item.href)
                          ? 'bg-primary-50 text-primary-600 font-medium'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-primary-600'
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </li>

          {/* Programs Mega Menu */}
          <li
            className="relative"
            onMouseEnter={handleProgramsEnter}
            onMouseLeave={handleProgramsLeave}
          >
            <button
              className={`px-4 py-2 text-base md:text-lg font-semibold transition-all duration-300 rounded-md flex items-center gap-1 ${
                scrolled
                  ? 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                  : 'text-white hover:text-white/80 hover:bg-white/10'
              }`}
              aria-expanded={programsOpen}
            >
              Programs
              <ChevronDown
                size={16}
                className={`transition-transform ${programsOpen ? 'rotate-180' : ''}`}
              />
            </button>
            <AnimatePresence>
              {programsOpen && (
                <ProgramsMegaMenu
                  tree={programTree}
                  onClose={() => setProgramsOpen(false)}
                />
              )}
            </AnimatePresence>
          </li>

          {/* Simple items */}
          {SIMPLE_ITEMS.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`px-4 py-2 text-base md:text-lg font-semibold transition-all duration-300 rounded-md ${
                  scrolled
                    ? isActive(item.href)
                      ? 'text-primary-600 bg-primary-50'
                      : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                    : isActive(item.href)
                      ? 'text-white bg-white/20'
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
              className={`text-base md:text-lg font-bold px-6 py-2.5 rounded-full transition shadow-lg ${
                scrolled
                  ? 'bg-primary-500 text-white hover:bg-primary-600'
                  : 'bg-white text-primary-600 hover:bg-white/90'
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
          {menuOpen ? <span className="text-2xl">✕</span> : <span className="text-2xl">☰</span>}
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
            className="lg:hidden bg-white/98 backdrop-blur-md border-t border-gray-100 shadow-lg overflow-hidden max-h-[80vh] overflow-y-auto"
          >
            <div className="px-4 py-4 space-y-1">
              {/* About */}
              <details className="group">
                <summary className="flex items-center justify-between px-4 py-3 rounded-lg font-medium text-gray-700 cursor-pointer hover:bg-primary-50">
                  About
                  <ChevronDown size={16} className="group-open:rotate-180 transition-transform" />
                </summary>
                <div className="pl-4 mt-1 space-y-1">
                  {aboutItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="block px-4 py-2.5 rounded-lg text-sm text-gray-600 hover:bg-primary-50 hover:text-primary-600"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </details>

              {/* Programs */}
              <details className="group">
                <summary className="flex items-center justify-between px-4 py-3 rounded-lg font-medium text-gray-700 cursor-pointer hover:bg-primary-50">
                  Programs
                  <ChevronDown size={16} className="group-open:rotate-180 transition-transform" />
                </summary>
                <div className="pl-4 mt-1 space-y-1">
                  {programTree.map((program) => (
                    <div key={program.slug}>
                      {program.children && program.children.length > 0 ? (
                        <details className="group/sub">
                          <summary className="flex items-center justify-between px-4 py-2.5 rounded-lg text-sm text-gray-700 cursor-pointer hover:bg-primary-50">
                            {program.title}
                            <ChevronDown size={14} className="group-open/sub:rotate-180 transition-transform" />
                          </summary>
                          <div className="pl-4 mt-1 space-y-1">
                            <Link
                              href={`/programs/${program.slug}`}
                              onClick={() => setMenuOpen(false)}
                              className="block px-4 py-2 rounded-lg text-xs text-[#C9A227] hover:bg-primary-50 font-semibold"
                            >
                              Open Page →
                            </Link>
                            {program.children.map((child) => (
                              <Link
                                key={child.slug}
                                href={`/programs/${child.slug}`}
                                onClick={() => setMenuOpen(false)}
                                className="block px-4 py-2 rounded-lg text-sm text-gray-600 hover:bg-primary-50 hover:text-primary-600"
                              >
                                {child.title}
                              </Link>
                            ))}
                          </div>
                        </details>
                      ) : (
                        <Link
                          href={`/programs/${program.slug}`}
                          onClick={() => setMenuOpen(false)}
                          className="block px-4 py-2.5 rounded-lg text-sm text-gray-600 hover:bg-primary-50 hover:text-primary-600"
                        >
                          {program.title}
                        </Link>
                      )}
                    </div>
                  ))}
                  <Link
                    href="/programs"
                    onClick={() => setMenuOpen(false)}
                    className="block px-4 py-2.5 rounded-lg text-sm font-semibold text-[#C9A227] hover:bg-primary-50"
                  >
                    View All Programs →
                  </Link>
                </div>
              </details>

              {SIMPLE_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={`block px-4 py-3 rounded-lg font-medium transition-all ${
                    isActive(item.href)
                      ? 'bg-primary-50 text-primary-600'
                      : 'text-gray-700 hover:bg-primary-50 hover:text-primary-600'
                  }`}
                >
                  {item.label}
                </Link>
              ))}

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