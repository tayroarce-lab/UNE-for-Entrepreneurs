import React from 'react';
import Navbar from '../../components/Shared/Navbar/Navbar';
import Footer from '../../components/Shared/Footer/Footer';
import BudgetDashboard from '../../components/Budget/BudgetDashboard/BudgetDashboard';
import BudgetPageContainer from '../../components/UserComponents/Budget/BudgetPageContainer/BudgetPageContainer';

const BudgetPage: React.FC = () => {
  return (
    <BudgetPageContainer>
      <Navbar />
      <BudgetDashboard />
      <Footer />
    </BudgetPageContainer>
  );
};

export default BudgetPage;
