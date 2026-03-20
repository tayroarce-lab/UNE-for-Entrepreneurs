import React, { useEffect } from 'react';
import Navbar from '../../components/Shared/Navbar';
import Footer from '../../components/Shared/Footer';
import HeroSuria from '../../components/Suria/HeroSuria';
import AboutSuria from '../../components/Suria/AboutSuria';
import ProgramPillars from '../../components/Suria/ProgramPillars';
import Requirements from '../../components/Suria/Requirements';
import Testimonials from '../../components/Suria/Testimonials';
import CTABanner from '../../components/Suria/CTABanner';
import '../../styles/Suria.css';

const SuriaLanding: React.FC = () => {
  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="suria-page">
      <Navbar />
      
      <main>
        <HeroSuria />
        <AboutSuria />
        <ProgramPillars />
        <Requirements />
        <Testimonials />
        <CTABanner />
      </main>

      <Footer />
    </div>
  );
};

export default SuriaLanding;
