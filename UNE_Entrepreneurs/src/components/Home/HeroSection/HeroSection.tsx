import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MoveRight } from 'lucide-react';
import styles from './HeroSection.module.css';
const heroImage = '/assets/hero_une.jpg';

interface HeroSectionProps {
  badgeText?: string;
  titleContent?: React.ReactNode;
  descriptionText?: string;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  badgeText = 'CONVOCATORIA ABIERTA: PROGRAMA SÜRIA',
  titleContent = (
    <>
      El impulso que tu <span className={styles.titleAccent}>negocio</span> el éxito que te <span className={styles.titleAccent}>mereces</span>.
    </>
  ),
  descriptionText = 'Sé parte de Süria: el programa de UNE que ha transformado la vida de 1,500 mujeres en Costa Rica. Financiamiento, formación y una comunidad imparable te esperan.',
  primaryButtonText = 'Aplicar al Programa Ahora',
  primaryButtonLink = '/contacto',
  secondaryButtonText = 'Ver detalles de Süria',
  secondaryButtonLink = '/suria',
}) => {
  const navigate = useNavigate();

  return (
    <section id="inicio" className={styles.heroSection}>
      <div className="container">
        <div className={styles.heroInner}>
          <div className={styles.heroText}>
            <div className={styles.scriptLogo}>süria</div>
            <span className={styles.heroBadge}>{badgeText}</span>
            <h1 className={styles.heroTitle}>
              {titleContent}
            </h1>
            <p className={styles.heroDescription}>
              {descriptionText}
            </p>
            <div className={styles.heroButtons}>
              <button 
                className={styles.applyButton}
                onClick={() => navigate(primaryButtonLink)}
              >
                {primaryButtonText} <MoveRight size={20} />
              </button>
              <button 
                className={styles.detailsButton}
                onClick={() => navigate(secondaryButtonLink)}
              >
                {secondaryButtonText}
              </button>
            </div>
          </div>

          <div className={styles.heroImageWrapper}>
            <div className={styles.imageFrame}>
              <img src={heroImage} alt="Emprendedora exitosa UNE" />
              <div className={styles.statOverlay}>
                <div className={styles.statNumber}>100%</div>
                <div className={styles.statLabel}>APOYO FEMENINO</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
