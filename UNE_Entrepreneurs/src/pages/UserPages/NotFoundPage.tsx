import React from 'react';
import Navbar from '../../components/Shared/Navbar/Navbar';
import Footer from '../../components/Shared/Footer/Footer';
import NotFound from '../../components/Shared/NotFound/NotFound';

const NotFoundPage: React.FC = () => {
  return (
    <>
      <Navbar />
      <main>
        <NotFound />
      </main>
      <Footer />
    </>
  );
};

export default NotFoundPage;
