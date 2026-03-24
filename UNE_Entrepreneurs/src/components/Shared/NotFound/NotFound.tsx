import React from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
import styles from './NotFound.module.css';

const NotFound: React.FC = () => {
  return (
    <div className={styles.page}>
      <div className={styles.iconWrapper}>
        <AlertCircle size={80} strokeWidth={1.5} />
      </div>
      <p className={styles.code}>404</p>
      <h1 className={styles.title}>Página no encontrada</h1>
      <p className={styles.description}>
        Lo sentimos, el recurso que buscas no está disponible o ha sido movido. 
        Verifica la dirección o regresa a nuestro portal de emprendimiento.
      </p>
      <Link to="/" className={styles.homeLink}>
        Volver al Inicio
      </Link>
    </div>
  );
};

export default NotFound;
