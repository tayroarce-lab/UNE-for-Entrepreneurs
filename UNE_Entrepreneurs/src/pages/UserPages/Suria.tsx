import React, { useEffect } from 'react';
import Navbar from '../../components/Shared/Navbar/Navbar';
import Footer from '../../components/Shared/Footer/Footer';
import HeroSuria from '../../components/Suria/HeroSuria';
import AboutSuria from '../../components/Suria/AboutSuria';
import MisionVision from '../../components/Suria/MisionVision';
import ProgramPillars from '../../components/Suria/ProgramPillars';
import Requirements from '../../components/Suria/Requirements';
import ValoresDiferenciadores from '../../components/Suria/ValoresDiferenciadores';
import Testimonials from '../../components/Suria/Testimonials';
import CTABanner from '../../components/Suria/CTABanner';
import '../../styles/Suria.css';

const SuriaLanding: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="suria-page">
      <Navbar />
      
      <main>
        <HeroSuria />
        <AboutSuria />
        <MisionVision />
        <ProgramPillars />
        <Requirements />
        <ValoresDiferenciadores />
        <Testimonials />
        <CTABanner />
      </main>

      <Footer />
    </div>
  );
};

export default SuriaLanding;
