'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaFacebookF, FaInstagram, FaYoutube, FaLinkedinIn, FaLocationArrow, FaSearchLocation } from 'react-icons/fa';
import { Mail, Phone } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

// ✅ Define the type for your settings
interface Settings {
  contact_email?: string;
  contact_phone?: string;
  site_title?: string;
  tagline?: string;
}

const socialLinks = [
  {
    Icon: FaFacebookF,
    label: 'Facebook',
    href: 'https://m.facebook.com/1673806749585918/',
  },
  {
    Icon: FaInstagram,
    label: 'Instagram',
    href: 'https://www.instagram.com/aram_saeivom_family?igsh=MWMwdzZkemNhOW1kdA==',
  },
  {
    Icon: FaYoutube,
    label: 'YouTube',
    href: 'https://youtube.com/channel/UCfxiR29gQPTZMdUOXrZZD3A?si=rLk5mI2m68pQfCQv',
  },
  {
    Icon: FaLinkedinIn,
    label: 'LinkedIn',
    href: 'https://in.linkedin.com/company/aram-saeivom-family-trust',
  },
  {
    Icon: FaSearchLocation,
    label: 'Search Location',
    href: 'https://maps.app.goo.gl/deooKm4CgME9BSjE7',
  },
];

export function Footer() {
  const [settings, setSettings] = useState<Settings | null>(null);

  useEffect(() => {
    const loadSettings = async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('settings')
        .select('*')
        .single();
      
      if (data) {
        setSettings(data);
      } else {
        // If no data, set empty object to prevent null errors
        setSettings({});
      }
    };
    loadSettings();
  }, []);

  // Static address
  const address = 'No.381, Transport Nagar, PTC Post, Madurai – 625022.';
  const addressLine1 = 'R4H3+445, Transport Nagar, Tamil Nadu 625022';
  const mapUrl = `https://maps.app.goo.gl/deooKm4CgME9BSjE7`;

  // Safely access settings with fallbacks
  const contactEmail = settings?.contact_email || 'aramsaeivom@gmail.com';
  const contactPhone = settings?.contact_phone || '+91 85080 53583';
  const siteTitle = settings?.site_title || 'Aram Saeivom Family Trust';
  const tagline = settings?.tagline || 'Empowering youth, transforming communities, and inspiring lasting change.';

  return (
    <footer className="bg-primary-900 text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Top row: Brand + Donate/Volunteer buttons */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-xl">
            <h2 className="text-2xl font-semibold">{siteTitle}</h2>
            <p className="mt-3 text-sm text-white/80">{tagline}</p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link href="/donate" className="btn-primary text-center">
              Donate Now
            </Link>
            <Link href="/volunteer" className="btn-outline text-center">
              Volunteer
            </Link>
          </div>
        </div>

        {/* Contact details */}
        <div className="mt-10 grid grid-cols-1 gap-4 border-t border-white/10 pt-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* Email */}
          <div className="flex items-center gap-3 text-sm text-white/80">
            <a
              href={`mailto:${contactEmail}`}
              className="text-primary-400 hover:text-primary-300 transition-colors flex-shrink-0"
              aria-label="Send email"
            >
              <Mail size={18} />
            </a>
            <a href={`mailto:${contactEmail}`} className="hover:text-white transition-colors">
              {contactEmail}
            </a>
          </div>

          {/* Phone */}
          <div className="flex items-center gap-3 text-sm text-white/80">
            <a
              href={`tel:${contactPhone.replace(/\s/g, '')}`}
              className="text-primary-400 hover:text-primary-300 transition-colors flex-shrink-0"
              aria-label="Call us"
            >
              <Phone size={18} />
            </a>
            <a href={`tel:${contactPhone.replace(/\s/g, '')}`} className="hover:text-white transition-colors">
              {contactPhone}
            </a>
          </div>

          {/* Location */}
          <div className="flex items-center gap-3 text-sm text-white/80 sm:col-span-2 lg:col-span-1">
            <a
              href={mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-400 hover:text-primary-300 transition-colors flex-shrink-0"
              aria-label="Open location in Google Maps"
            >
              <FaLocationArrow size={18} />
            </a>
            <span>{address}</span>
          </div>
        </div>

        {/* Bottom row: Copyright + Social icons */}
        <div className="mt-8 flex flex-col gap-4 border-t border-white/10 pt-8 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-white/70">
            © 2026 Aram Saeivom Family Trust. All rights reserved.
          </p>

          <div className="flex gap-3">
            {socialLinks.map(({ Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-white transition-all duration-300 hover:-translate-y-1 hover:bg-primary-600"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
