import React from 'react';
import Navbar from '../../components/Shared/Navbar/Navbar';
import Footer from '../../components/Shared/Footer/Footer';
import PeopleGallery from '../../components/NuestraGente/PeopleGallery/PeopleGallery';
const NuestraGente: React.FC = () => {
  return (
    <>
      <Navbar />
      <PeopleGallery />
      <Footer />
    </>
  );
};

export default NuestraGente;
