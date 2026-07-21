import React, { type ReactNode } from 'react';
import styles from './RecursosPageContainer.module.css';

interface RecursosPageContainerProps {
  children: ReactNode;
}

const RecursosPageContainer: React.FC<RecursosPageContainerProps> = ({ children }) => {
  return (
    <div className={styles.recursosPage}>
      {children}
    </div>
  );
};

export default RecursosPageContainer;
