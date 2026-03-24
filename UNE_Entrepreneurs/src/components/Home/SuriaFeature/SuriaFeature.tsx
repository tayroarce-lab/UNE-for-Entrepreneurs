import React from 'react';
import { ShieldCheck, Users, HandCoins } from 'lucide-react';
import styles from './SuriaFeature.module.css';
import suriaWoman from '../../../assets/suria_hero.png';

interface Benefit {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface SuriaFeatureProps {
  badge?: string;
  title?: React.ReactNode;
  benefits?: Benefit[];
}

const defaultBenefits: Benefit[] = [
  {
    id: 1,
    icon: <ShieldCheck size={32} />,
    title: 'Crédito con Propósito',
    description: 'Bajas tasas de interés colectivas diseñadas para ser pagadas con el crecimiento de tu negocio.'
  },
  {
    id: 2,
    icon: <Users size={32} />,
    title: 'Bancos Comunales',
    description: 'No estás sola. Creces junto a un grupo de mujeres que se respaldan mutuamente.'
  },
  {
    id: 3,
    icon: <HandCoins size={32} />,
    title: 'Acompañamiento Real',
    description: 'Gestión empresarial y financiera incluida en cada etapa de tu proceso con UNE.'
  }
];

const SuriaFeature: React.FC<SuriaFeatureProps> = ({
  badge = 'DESCUBRE SÜRIA',
  title = (
    <>
      Mucho más que un <br /> <span className={styles.titleAccent}>préstamo</span>: un ecosistema.
    </>
  ),
  benefits = defaultBenefits
}) => {
  return (
    <section id="que-es-une" className={styles.suriaFeature}>
      <div className="container">
        <div className={styles.featureInner}>
          <div className={styles.featureText}>
            <span className={styles.featureBadge}>{badge}</span>
            <h2 className={styles.featureTitle}>
              {title}
            </h2>
            
            <div className={styles.benefitList}>
              {benefits.map((benefit) => (
                <div key={benefit.id} className={styles.benefitItem}>
                  <div className={styles.iconCircle}>{benefit.icon}</div>
                  <div>
                    <h4 className={styles.benefitHeading}>{benefit.title}</h4>
                    <p className={styles.benefitDesc}>{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.featureImageArea}>
            <div className={styles.mainImageWrapper}>
              <img src={suriaWoman} alt="Mujer líder UNE" className={styles.mainImage} />
              <div className={styles.imageOverlay}></div>
            </div>
            <div className={styles.floatingCard}>
              <div className={styles.floatingValue}>+1,500</div>
              <div className={styles.floatingLabel}>MUJERES IMPACTADAS</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SuriaFeature;
