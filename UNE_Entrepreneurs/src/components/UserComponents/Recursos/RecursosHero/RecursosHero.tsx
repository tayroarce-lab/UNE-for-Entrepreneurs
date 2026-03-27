import React from 'react';
import styles from './RecursosHero.module.css';

const RecursosHero: React.FC = () => {
  return (
    <section className={styles.recursosHero}>
      <div className={styles.container}>
        <h1>
          Recursos para <span>Emprendedores</span>
        </h1>
        <p>
          Descarga guías prácticas, plantillas de gestión y accede a trámites directos para formalizar y escalar tu negocio.
        </p>
      </div>
    </section>
  );
};

export default RecursosHero;
