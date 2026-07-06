import { Navbar }               from '@/app/components/layout/Navbar';
import { Footer }               from '@/app/components/layout/Footer';
import { HeroSection }          from '@/app/components/home/HeroSection';
import { AnnouncementsSection } from '@/app/components/home/AnnouncementsSection';
import { StatsSection }         from '@/app/components/home/StatsSection';
import { MissionVisionSection } from '@/app/components/home/MissionVisionSection';
import { ProgramsSection }      from '@/app/components/home/ProgramsSection';
import { EducationSection }     from '@/app/components/home/EducationSection';
import { DonationSection }      from '@/app/components/home/DonationSection';
import { ExploreSection }       from '@/app/components/home/ExploreSection';
import { RecruitmentPopup }     from '@/app/components/home/RecruitmentPopup';

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
        <EducationSection />
        <DonationSection />
      </main>
      <Footer />
      <RecruitmentPopup />
    </>
  );
}