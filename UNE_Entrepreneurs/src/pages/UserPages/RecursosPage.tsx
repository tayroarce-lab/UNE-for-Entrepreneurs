import React from 'react';
import Navbar from '../../components/Shared/Navbar/Navbar';
import Footer from '../../components/Shared/Footer/Footer';
import RecursosPageContainer from '../../components/UserComponents/Recursos/RecursosPageContainer/RecursosPageContainer';
import RecursosHero from '../../components/UserComponents/Recursos/RecursosHero/RecursosHero';
import RecursosList from '../../components/UserComponents/Recursos/RecursosList/RecursosList';

const RecursosPage: React.FC = () => {
  return (
    <RecursosPageContainer>
      <Navbar />
      <RecursosHero />
      <RecursosList />
      <Footer />
    </RecursosPageContainer>
  );
};

export default RecursosPage;
