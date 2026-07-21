import React from 'react';
import { Loader } from 'lucide-react';
import styles from './RecursosLoading.module.css';

const RecursosLoading: React.FC = () => {
  return (
    <div className={styles.loadingContainer}>
      <Loader className={styles.spinner} size={60} />
      <p>Sincronizando biblioteca de recursos...</p>
    </div>
  );
};

export default RecursosLoading;
