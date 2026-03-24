import React from 'react';
import styles from './NewsHero.module.css';
import avatarJaqueline from '../../../assets/Jaqueline.png';
import avatarMaria from '../../../assets/success_story_maria.png';

const NewsHero: React.FC = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.decoration} />
      <div className={styles.imageWrapper}>
        <img src={avatarJaqueline} alt="Jaqueline" className={styles.image} />
      </div>
      <div className={styles.content}>
        <span className={styles.badge}>Emprendedora Destacada</span>
        <h2 className={styles.title}>Jaqueline: &ldquo;El arte de crear sueños&rdquo;</h2>
        <p className={styles.description}>
          Conozca la historia de cómo Jaqueline transformó su pequeño taller de artesanía en una marca 
          reconocida localmente. Su perseverancia y el apoyo de la red UNE han sido fundamentales en este viaje.
        </p>
        <div className={styles.authorRow}>
          <img src={avatarMaria} className={styles.authorAvatar} alt="Maria" />
          <p className={styles.authorName}>Entrevista por Maria Solano, UNE Colaboradora</p>
        </div>
      </div>
    </section>
  );
};

export default NewsHero;
