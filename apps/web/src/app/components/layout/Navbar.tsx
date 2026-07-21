'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from '@/components/ui/SafeImage';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

// ✅ Define types properly
type NavItem = {
  label: string;
  href: string;
};

type NavItemWithDropdown = {
  label: string;
  href: string;
  dropdown: NavItem[];
};

type NavItemType = NavItem | NavItemWithDropdown;

const navItems: NavItemType[] = [
  { label: 'Home', href: '/' },
  {
    label: 'About',
    href: '/about',
    dropdown: [
      { label: 'Our Story', href: '/about' },
      { label: 'Our Team', href: '/team' },
      { label: 'Timeline', href: '/timeline' },
      { label: 'Contact', href: '/contact' },
    ]
  },
  {
  label: 'Programs',
  href: '/programs',
  dropdown: [
    { label: 'All Programs', href: '/programs' },
    { label: 'Odyssey', href: '/programs/odyssey' },
    { label: 'THOOYAM \'26', href: '/programs/thooayam-26' },
    { label: 'Observation Days', href: '/programs/observation-days' },
  ]
},
  { label: 'Gallery', href: '/gallery' },
  { label: 'Events', href: '/events' },
  { label: 'Join Us', href: '/volunteer' },
  { label: 'Dashboard', href: '/admin' },
];

// ✅ Type guard to check if item has dropdown
function hasDropdown(item: NavItemType): item is NavItemWithDropdown {
  return 'dropdown' in item && Array.isArray((item as NavItemWithDropdown).dropdown);
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    if (href.includes('#')) return pathname === '/about';
    return pathname.startsWith(href);
  };

  const isDropdownActive = (items: NavItem[]) => {
    return items.some((item) => {
      if (item.href.includes('#')) return pathname === '/about';
      return pathname.startsWith(item.href);
    });
  };

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
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 group shrink-0"
          aria-label="Aram Saeivom Family Trust Home"
        >
          <Image
            src="https://vixzstrzqhwswhibzfdq.supabase.co/storage/v1/object/public/content-images/logo/asftt.png"
            alt="Aram Saeivom Family Trust"
            width={70}
            height={70}
            priority
            className="object-contain"
          />
          <div className="hidden md:block">
            <div
              className={`font-bold text-xl leading-tight transition-colors duration-300 ${
                scrolled ? 'text-primary-600' : 'text-white'
              }`}
            >
              Aram Saeivom Family Trust
            </div>
          </div>
          <div className="md:hidden">
            <div
              className={`font-bold text-sm leading-tight transition-colors duration-300 ${
                scrolled ? 'text-primary-600' : 'text-white'
              }`}
            >
              Aram Saeivom
            </div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => {
            const hasDropdownItems = hasDropdown(item);
            const active = hasDropdownItems
              ? isDropdownActive(item.dropdown)
              : isActive(item.href);
            const isDropdownOpen = openDropdown === item.label;

            if (hasDropdownItems) {
              return (
                <li
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(item.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button
                    className={`px-4 py-2 text-sm font-medium transition-all duration-300 rounded-md flex items-center gap-1 ${
                      scrolled
                        ? active
                          ? 'text-primary-600 bg-primary-50'
                          : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                        : active
                        ? 'text-white bg-white/20'
                        : 'text-white hover:text-white/80 hover:bg-white/10'
                    }`}
                  >
                    {item.label}
                    <ChevronDown
                      size={14}
                      className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                    />
                  </button>

                  {/* Dropdown */}
                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className={`absolute top-full left-0 mt-1 w-48 rounded-lg shadow-xl overflow-hidden ${
                          scrolled ? 'bg-white' : 'bg-white/95 backdrop-blur-md'
                        } border border-gray-100`}
                      >
                        {item.dropdown.map((subItem) => {
                          const subActive =
                            subItem.href.includes('#')
                              ? pathname === '/about'
                              : isActive(subItem.href);
                          return (
                            <Link
                              key={subItem.label}
                              href={subItem.href}
                              className={`block px-4 py-2.5 text-sm transition-colors ${
                                subActive
                                  ? 'bg-primary-50 text-primary-600 font-medium'
                                  : 'text-gray-700 hover:bg-gray-50 hover:text-primary-600'
                              }`}
                              onClick={() => setOpenDropdown(null)}
                            >
                              {subItem.label}
                            </Link>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            }

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`px-4 py-2 text-sm font-medium transition-all duration-300 rounded-md relative ${
                    scrolled
                      ? active
                        ? 'text-primary-600 bg-primary-50'
                        : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                      : active
                      ? 'text-white bg-white/20'
                      : 'text-white hover:text-white/80 hover:bg-white/10'
                  }`}
                >
                  {item.label}
                  {active && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 ${
                        scrolled ? 'bg-primary-500' : 'bg-white'
                      } rounded-full`}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </Link>
              </li>
            );
          })}
          <li>
            <Link
              href="/donate"
              className={`btn-primary text-sm py-2.5 px-5 ${
                !scrolled ? 'bg-white text-primary-600 hover:bg-white/90' : ''
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
            className="lg:hidden bg-white/98 backdrop-blur-md border-t border-gray-100 shadow-lg"
          >
            <div className="px-4 py-4 space-y-2">
              <ul className="space-y-1">
                {navItems.map((item) => {
                  if (hasDropdown(item)) {
                    return (
                      <div key={item.label}>
                        <div className="px-4 py-3 font-medium text-gray-700">
                          {item.label}
                        </div>
                        <div className="pl-4 space-y-1">
                          {item.dropdown.map((subItem) => (
                            <Link
                              key={subItem.label}
                              href={subItem.href}
                              className="block px-4 py-2.5 rounded-lg text-sm text-gray-600 hover:bg-primary-50 hover:text-primary-600 transition-all"
                              onClick={() => setMenuOpen(false)}
                            >
                              {subItem.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    );
                  }
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={`block px-4 py-3 rounded-lg font-medium transition-all ${
                          isActive(item.href)
                            ? 'bg-primary-50 text-primary-600'
                            : 'text-gray-700 hover:bg-primary-50 hover:text-primary-600'
                        }`}
                        onClick={() => setMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
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