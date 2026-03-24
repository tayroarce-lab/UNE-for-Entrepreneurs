import React from 'react';
import Navbar from '../../components/Shared/Navbar/Navbar';
import Footer from '../../components/Shared/Footer/Footer';
import RegisterForm from '../../components/Auth/RegisterForm/RegisterForm';

const RegistroUser: React.FC = () => {
  return (
    <>
      <Navbar />
      <main>
        <RegisterForm />
      </main>
      <Footer />
    </>
  );
};

export default RegistroUser;
