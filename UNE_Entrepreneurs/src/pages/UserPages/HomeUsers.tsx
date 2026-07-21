import React from 'react';
import Navbar from '../../components/Shared/Navbar/Navbar';
import Footer from '../../components/Shared/Footer/Footer';
import NewsCarouselSection from '../../components/Home/NewsCarouselSection/NewsCarouselSection';
import HeroSection from '../../components/Home/HeroSection/HeroSection';
import TrustBar from '../../components/Home/TrustBar/TrustBar';
import HowWorksSection from '../../components/Home/HowWorksSection/HowWorksSection';
import DashboardCTA from '../../components/Home/DashboardCTA/DashboardCTA';
import SuriaFeature from '../../components/Home/SuriaFeature/SuriaFeature';
import TestimonialsSection from '../../components/Home/TestimonialsSection/TestimonialsSection';
import FinalCTA from '../../components/Home/FinalCTA/FinalCTA';
import LocationScheduleSection from '../../components/Home/LocationScheduleSection/LocationScheduleSection';

const HomeUsers: React.FC = () => {
  return (
    <>
      <Navbar />
      <NewsCarouselSection />
      <HeroSection />
      <TrustBar />
      <HowWorksSection />
      <DashboardCTA />
      <SuriaFeature />
      <TestimonialsSection />
      <FinalCTA />
      <LocationScheduleSection />
      <Footer />
    </>
  );
};

export default HomeUsers;
