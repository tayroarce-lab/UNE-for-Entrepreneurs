import React, { useEffect } from 'react';
import Navbar from '../../components/Shared/Navbar/Navbar';
import Footer from '../../components/Shared/Footer/Footer';
import SuriaApplicationForm from '../../components/Suria/SuriaApplicationForm/SuriaApplicationForm';
import SuriaSchedule from '../../components/Suria/SuriaSchedule/SuriaSchedule';
import '../../styles/Suria.css';

const ContactSuria: React.FC = () => {  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="suria-page">
      <Navbar />
      <main>
        <SuriaApplicationForm />
        <SuriaSchedule />
      </main>
      <Footer />
    </div>
  );
};

export default ContactSuria;
