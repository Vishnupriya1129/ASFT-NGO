import { Navbar } from '@/app/components/layout/Navbar';
import { Footer } from '@/app/components/layout/Footer';
import { HeroSection } from '@/app/components/home/HeroSection';
// import { HeroButtons } from '@/app/components/home/HeroButtons';  // ❌ REMOVED
import { VideoSection } from '@/app/components/home/VideoSection';
import { AnnouncementsSection } from '@/app/components/home/AnnouncementsSection';
import { StatsSection } from '@/app/components/home/StatsSection';
import { MissionVisionSection } from '@/app/components/home/MissionVisionSection';
import { ProgramsSection } from '@/app/components/home/ProgramsSection';
import { FounderNote } from '@/app/components/home/FounderNote';
import { DonateVolunteerCTA } from '@/app/components/home/DonateVolunteerCTA';
import { AboutPreview } from '@/app/components/home/AboutPreview';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="w-full">
        <HeroSection />
        {/* <HeroButtons />  ❌ REMOVED */}
        <VideoSection />
        <AnnouncementsSection />
        <MissionVisionSection />
        <FounderNote />
        <DonateVolunteerCTA />
        <AboutPreview />
        {/* <StatsSection /> */}
        <ProgramsSection />
      </main>
      <Footer />
    </>
  );
}