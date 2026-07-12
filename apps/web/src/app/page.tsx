import { Navbar } from '@/app/components/layout/Navbar';
import { Footer } from '@/app/components/layout/Footer';
import { HeroSection } from '@/app/components/home/HeroSection';
import { HeroButtons } from '@/app/components/home/HeroButtons';
import { VideoSection } from '@/app/components/home/VideoSection';   // ✅ Import the video
import { AnnouncementsSection } from '@/app/components/home/AnnouncementsSection';
import { StatsSection } from '@/app/components/home/StatsSection';
import { MissionVisionSection } from '@/app/components/home/MissionVisionSection';
import { ProgramsSection } from '@/app/components/home/ProgramsSection';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="w-full">
        <HeroSection />
        <HeroButtons />
        <VideoSection />              {/* ✅ Video appears here */}
        <AnnouncementsSection />
        <StatsSection />
        <MissionVisionSection />
        <ProgramsSection />
      </main>
      <Footer />
    </>
  );
}
