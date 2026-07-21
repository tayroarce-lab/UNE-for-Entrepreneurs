import React from 'react';
import { FileText } from 'lucide-react';
import styles from './RecursosEmpty.module.css';

const RecursosEmpty: React.FC = () => {
  return (
    <div className={styles.noRecursos}>
      <FileText size={80} className={styles.icon} />
      <h2>Próximamente más contenido</h2>
      <p>Estamos trabajando en nuevas guías y herramientas para tu crecimiento.</p>
    </div>
  );
};

export default RecursosEmpty;
