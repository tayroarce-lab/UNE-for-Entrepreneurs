import React from 'react';
import Navbar from '../../components/Shared/Navbar/Navbar';
import Footer from '../../components/Shared/Footer/Footer';
import BudgetDashboard from '../../components/Budget/BudgetDashboard/BudgetDashboard';

const BudgetPage: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#f8fafc' }}>
      <Navbar />
      <div style={{ flex: 1, paddingTop: '80px', paddingBottom: '40px' }}>
        <BudgetDashboard />
      </div>
      <Footer />
    </div>
  );
};

export default BudgetPage;
