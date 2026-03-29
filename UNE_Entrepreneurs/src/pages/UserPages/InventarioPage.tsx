import React from 'react';
import Navbar from '../../components/Shared/Navbar/Navbar';
import Footer from '../../components/Shared/Footer/Footer';
import InventarioDashboard from '../../components/Budget/InventarioDashboard/InventarioDashboard';
import BudgetPageContainer from '../../components/UserComponents/Budget/BudgetPageContainer/BudgetPageContainer';

const InventarioPage: React.FC = () => {
  return (
    <BudgetPageContainer>
      <Navbar />
      <InventarioDashboard />
      <Footer />
    </BudgetPageContainer>
  );
};

export default InventarioPage;
