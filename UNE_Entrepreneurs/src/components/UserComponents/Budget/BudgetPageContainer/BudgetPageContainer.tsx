import React, { type ReactNode } from 'react';
import styles from './BudgetPageContainer.module.css';

interface BudgetPageContainerProps {
  children: ReactNode;
}

const BudgetPageContainer: React.FC<BudgetPageContainerProps> = ({ children }) => {
  return (
    <div className={styles.container}>
      <div className={styles.contentWrapper}>
        {children}
      </div>
    </div>
  );
};

export default BudgetPageContainer;
