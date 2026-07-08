import { Navbar } from '@/app/components/layout/Navbar';
import { Footer } from '@/app/components/layout/Footer';
import { HeroSection } from '@/app/components/home/HeroSection';
import { HeroButtons } from '@/app/components/home/HeroButtons';
import { AnnouncementsSection } from '@/app/components/home/AnnouncementsSection';
import { StatsSection } from '@/app/components/home/StatsSection';
import { MissionVisionSection } from '@/app/components/home/MissionVisionSection';
import { ProgramsSection } from '@/app/components/home/ProgramsSection';
import { RecruitmentPopup } from '@/app/components/home/RecruitmentPopup';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="w-full">
        <HeroSection />
        <HeroButtons />
        <AnnouncementsSection />
        <StatsSection />
        <MissionVisionSection />
        <ProgramsSection />
      </main>
      <Footer />
      <RecruitmentPopup />
    </>
  );
}