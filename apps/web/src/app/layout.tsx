import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Providers } from '@/app/components/providers';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? 'https://seed-and-serve-4djp3dt4c-vishnus-projects-76247019.vercel.app'),
  title: {
    template: '%s | Arram Seivom Family Trust — Where Sky Meets Earth, Hope Blooms',
    default: 'Arram Seivom Family Trust — Where Sky Meets Earth, Hope Blooms',
  },
  description:
    'Arram Seivom Family Trust (ASFT) — Empowering youth through civic engagement, education, and social responsibility.',
  keywords: ['NGO', 'India', 'donate', 'education', 'youth', 'social responsibility', 'community', 'leadership'],
  authors: [{ name: 'Arram Seivom Family Trust' }],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: process.env.NEXT_PUBLIC_APP_URL,
    siteName: 'Arram Seivom Family Trust',
    images: [{ url: 'https://vixzstrzqhwswhibzfdq.supabase.co/storage/v1/object/public/content-images/content-%20images/2026/just-ride/20260104_165523.jpg', width: 1200, height: 630, alt: 'Arram Seivom Family Trust' }],
  },
  twitter: { card: 'summary_large_image', creator: '@seedandserve' },
};

export const viewport: Viewport = {
  themeColor: '#039BE5',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-cloud text-charcoal antialiased overflow-x-hidden">
        <Providers>
          {children}
          <Toaster
            position="bottom-center"
            toastOptions={{
              style: {
                background: '#1B5E20',
                color: 'white',
                borderRadius: '50px',
                padding: '16px 32px',
                fontWeight: '600',
              },
              success: { iconTheme: { primary: '#FFCA28', secondary: '#1B5E20' } },
            }}
          />
        </Providers>
      </body>
    </html>
  );
}
