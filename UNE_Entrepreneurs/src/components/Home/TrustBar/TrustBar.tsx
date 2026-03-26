import React from 'react';
import styles from './TrustBar.module.css';

interface TrustBarProps {
  label?: string;
  brands?: string[];
}

const TrustBar: React.FC<TrustBarProps> = ({
  label = 'CON EL RESPALDO DE:',
  brands = ['Bancos Comunales', 'Red de Mujeres UNE', 'Fondo de MicroEmprendimiento']
}) => {
  return (
    <section className={styles.trustBar}>
      <div className="container">
        <div className={styles.trustInner}>
          <span className={styles.trustLabel}>{label}</span>
          <div className={styles.brandList}>
            {brands.map((brand, i) => (
              <span key={i} className={styles.trustBrand}>{brand}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustBar;
