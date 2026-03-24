import React from 'react';
import Navbar from '../../components/Shared/Navbar/Navbar';
import Footer from '../../components/Shared/Footer/Footer';
import PeopleGallery from '../../components/NuestraGente/PeopleGallery/PeopleGallery';
import '../../styles/NuestraGente.css';

const NuestraGente: React.FC = () => {
  return (
    <div className="nuestra-gente-page">
      <Navbar />
      <PeopleGallery />
      <Footer />
    </div>
  );
};

export default NuestraGente;
