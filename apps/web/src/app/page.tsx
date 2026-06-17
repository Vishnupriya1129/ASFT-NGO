import { Navbar }               from '@/components/layout/Navbar';
import { Footer }               from '@/components/layout/Footer';
import { HeroSection }          from '@/components/home/HeroSection';
import { AnnouncementsSection } from '@/components/home/AnnouncementsSection';
import { StatsSection }         from '@/components/home/StatsSection';
import { MissionVisionSection } from '@/components/home/MissionVisionSection';
import { ProgramsSection }      from '@/components/home/ProgramsSection';
import { GallerySection }       from '@/components/home/GallerySection';
import { EducationSection }     from '@/components/home/EducationSection';
import { DonationSection }      from '@/components/home/DonationSection';
import { ExploreSection }       from '@/components/home/ExploreSection';
import { RecruitmentPopup }     from '@/components/home/RecruitmentPopup';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <HeroSection />
        <AnnouncementsSection />
        <StatsSection />
        <MissionVisionSection />
        <ExploreSection />
        <ProgramsSection />
        <GallerySection />
        <EducationSection />
        <DonationSection />
      </main>
      <Footer />
      <RecruitmentPopup />
    </>
  );
}