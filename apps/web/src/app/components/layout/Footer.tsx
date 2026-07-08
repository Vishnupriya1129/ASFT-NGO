import Link from 'next/link';
import { FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa';
import { MapPin, Phone, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-slate-900 to-slate-950 text-white relative">
      <div className="h-1 w-full bg-gradient-to-r from-primary-600 via-accent-500 to-primary-600" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 mb-12 sm:mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              Arram Seivom<br />Family Trust
            </h3>
            <p className="text-slate-300 leading-relaxed mb-6 max-w-md text-sm sm:text-base">
              Where sky meets earth, hope blooms. We are committed to educating youth and
              empowering communities through civic leadership, social responsibility, and
              meaningful service.
            </p>
            <div className="flex gap-3">
              {[
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
              ].map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-white hover:bg-primary-600 hover:-translate-y-1 transition-all duration-300"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-white/80 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/programs" className="text-white/80 hover:text-white transition-colors">
                  Programs
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-white/80 hover:text-white transition-colors">
                  Events
                </Link>
              </li>
              <li>
                <Link href="/volunteer" className="text-white/80 hover:text-white transition-colors">
                  Join Us
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-white/80 hover:text-white transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/donate" className="text-white/80 hover:text-white transition-colors font-semibold">
                  Donate
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-5">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-slate-300 text-sm">
                <MapPin size={16} className="text-primary-400 mt-0.5 flex-shrink-0" />
                <span>No.381, Transport Nagar, PTC Post, Madurai – 625022.</span>
              </li>
              <li className="flex items-center gap-3 text-slate-300 text-sm">
                <Phone size={16} className="text-primary-400 flex-shrink-0" />
                <span>+91 85080 53583</span>
              </li>
              <li className="flex items-center gap-3 text-slate-300 text-sm">
                <Mail size={16} className="text-primary-400 flex-shrink-0" />
                <span>aramsaeivom@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center text-slate-400 text-sm">
          <p>
            &copy; 2026 Arram Seivom Family Trust. All rights reserved. | Made with{' '}
            <span className="text-accent-400">♥</span> for humanity
          </p>
        </div>
      </div>
    </footer>
  );
}