import React from 'react';
import Navbar from '../../components/Shared/Navbar/Navbar';
import Footer from '../../components/Shared/Footer/Footer';
import ProfileEditor from '../../components/Profile/ProfileEditor/ProfileEditor';

const ProfilePage: React.FC = () => {
  return (
    <>
      <Navbar />
      <main>
        <ProfileEditor />
      </main>
      <Footer />
    </>
  );
};

export default ProfilePage;
