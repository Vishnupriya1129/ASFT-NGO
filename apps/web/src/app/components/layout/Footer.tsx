import Link from 'next/link';
import { FaFacebookF, FaInstagram, FaYoutube, FaLinkedinIn, FaLocationArrow, FaLandmark } from 'react-icons/fa';
import { Mail, Phone, MapPin } from 'lucide-react';

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
    Icon: FaLandmark,
    label: 'New Location',
    href: 'https://www.google.com/maps/place/R4H3%2B445,+Transport+Nagar,+Tamil+Nadu+625022/@9.8277139,78.1018706,438m/data=!3m1!1e3!4m13!1m7!3m6!1s0x3b00d07db7f2f9a3:0x2c535b9873f86ddc!2sR4H3%2B445,+Transport+Nagar,+Tamil+Nadu+625022!3b1!8m2!3d9.8277625!4d78.1028594!3m4!1s0x3b00d07db7f2f9a3:0x2c535b9873f86ddc!8m2!3d9.8277625!4d78.1028594!10m1!2e57?entry=ttu&g_ep=EgoyMDI2MDcwNi4wIKXMDSoASAFQAw%3D%3D',
  }
];

export function Footer() {
  //✅ Old address – displayed as static text
  const oldAddress = 'No.381, Transport Nagar, PTC Post, Madurai – 625022., Tamil Nadu, India';
  const newLocation = 'R4H3+445, Transport Nagar, Tamil Nadu 625022';
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(newLocation)}`;

  return (
    <footer className="bg-primary-900 text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Top row: Brand + Donate/Volunteer buttons */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-xl">
            <h2 className="text-2xl font-semibold">Aram Saeivom Family Trust</h2>
            <p className="mt-3 text-sm text-white/80">
              Empowering youth, transforming communities, and inspiring lasting change.
            </p>
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
          {/* Email – icon + text clickable */}
          <div className="flex items-center gap-3 text-sm text-white/80">
            <a
              href="mailto:aramsaeivom@gmail.com"
              className="text-primary-400 hover:text-primary-300 transition-colors flex-shrink-0"
              aria-label="Send email"
            >
              <Mail size={18} />
            </a>
            <a
              href="mailto:aramsaeivom@gmail.com"
              className="hover:text-white transition-colors"
            >
              aramsaeivom@gmail.com
            </a>
          </div>

          {/* Phone – icon + text clickable */}
          <div className="flex items-center gap-3 text-sm text-white/80">
            <a
              href="tel:+918508053583"
              className="text-primary-400 hover:text-primary-300 transition-colors flex-shrink-0"
              aria-label="Call us"
            >
              <Phone size={18} />
            </a>
            <a
              href="tel:+918508053583"
              className="hover:text-white transition-colors"
            >
              +91 85080 53583
            </a>
          </div>

          {/* Address – icon clickable, text not linked */}
          <div className="flex items-center gap-3 text-sm text-white/80 sm:col-span-2 lg:col-span-1">
            <a
              href={mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-400 hover:text-primary-300 transition-colors flex-shrink-0"
              aria-label="Open location in Google Maps"
            >
              <MapPin size={18} />
            </a>
            <span>{newLocation}</span>
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