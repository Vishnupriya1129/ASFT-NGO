import { Navbar } from '@/app/components/layout/Navbar';
import { Footer } from '@/app/components/layout/Footer';
import { HeroSection } from '@/app/components/home/HeroSection';
import { AnnouncementsSection } from '@/app/components/home/AnnouncementsSection';
import { StatsSection } from '@/app/components/home/StatsSection';
import { MissionVisionSection } from '@/app/components/home/MissionVisionSection';
import { ProgramsSection } from '@/app/components/home/ProgramsSection';
import { FounderNote } from '@/app/components/home/FounderNote';
import { DonateVolunteerCTA } from '@/app/components/home/DonateVolunteerCTA';
import { AboutPreview } from '@/app/components/home/AboutPreview';
import dynamic from 'next/dynamic';

// ✅ Lazy load heavy components to make the initial page load instantly smooth
const GallerySection = dynamic(
  () => import('@/app/components/home/GallerySection').then(mod => mod.GallerySection),
  {
    ssr: false,
    loading: () => (
      <div className="h-64 flex items-center justify-center bg-gray-50 rounded-xl">
        <p className="text-gray-400 text-sm">Loading gallery...</p>
      </div>
    )
  }
);

const VideoSection = dynamic(
  () => import('@/app/components/home/VideoSection').then(mod => mod.VideoSection),
  {
    ssr: false,
    loading: () => (
      <div className="h-64 flex items-center justify-center bg-[#0F223D]">
        <p className="text-white/40 text-sm">Loading video...</p>
      </div>
    )
  }
);

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="w-full">
        <HeroSection /> 
        <DonateVolunteerCTA />
        <AboutPreview />
        <AnnouncementsSection />
        <MissionVisionSection />
        <FounderNote />
        {/* <StatsSection /> */}
        <ProgramsSection />
        <VideoSection />
        <GallerySection />
      </main>
      <Footer />
    </>
  );
}