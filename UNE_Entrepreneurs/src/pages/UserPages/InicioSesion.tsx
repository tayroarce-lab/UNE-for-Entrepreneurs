import React from 'react';
import Navbar from '../../components/Shared/Navbar/Navbar';
import Footer from '../../components/Shared/Footer/Footer';
import LoginForm from '../../components/Auth/LoginForm/LoginForm';

const InicioSesion: React.FC = () => {
  return (
    <>
      <Navbar />
      <main>
        <LoginForm />
      </main>
      <Footer />
    </>
  );
};

export default InicioSesion;
