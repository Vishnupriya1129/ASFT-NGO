import { Navbar } from '@/app/components/layout/Navbar';
import { Footer } from '@/app/components/layout/Footer';
import { DonationSection } from '@/app/components/home/DonationSection';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Donate | Aram Saeivom Family Trust',
  description: 'Support our mission – every donation plants a seed of hope.',
};

export default function DonatePage() {
  return (
    <>
      <Navbar />
      <main className="pt-20"> {/* Adjust for navbar height */}
        <DonationSection />
      </main>
      <Footer />
    </>
  );
}