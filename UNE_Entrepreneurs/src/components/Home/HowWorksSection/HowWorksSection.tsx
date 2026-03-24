import React from 'react';
import { ClipboardList, Target, TrendingUp } from 'lucide-react';
import styles from './HowWorksSection.module.css';
import avatarMaria from '../../../assets/success_story_maria.png';

interface Step {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  avatar?: string;
}

interface HowWorksSectionProps {
  title?: string;
  subtitle?: string;
  steps?: Step[];
}

const defaultSteps: Step[] = [
  {
    id: 1,
    icon: <ClipboardList size={40} />,
    title: 'Aplica',
    description: 'Únete a la plataforma y completa tu perfil de emprendedora UNE para el programa Süria.'
  },
  {
    id: 2,
    icon: <Target size={40} />,
    title: 'Capacítate',
    description: 'Accede a talleres de gestión y finanzas antes de recibir tu primer microcrédito.'
  },
  {
    id: 3,
    icon: <TrendingUp size={40} />,
    title: 'Escala',
    description: 'Recibe el respaldo financiero de UNE y crece junto a tu comunidad en bancos comunales.',
    avatar: avatarMaria
  }
];

const HowWorksSection: React.FC<HowWorksSectionProps> = ({
  title = 'Tu crecimiento en 3 pasos',
  subtitle = 'Hemos simplificado el acceso al capital y formación para que te enfoques en lo que mejor haces: crear.',
  steps = defaultSteps
}) => {
  return (
    <section id="noticias" className={styles.howWorksSection}>
      <div className="container">
        <h2 className={styles.sectionTitle}>{title}</h2>
        <p className={styles.sectionSubtitle}>{subtitle}</p>
        
        <div className={styles.grid}>
          {steps.map((step) => (
            <div key={step.id} className={styles.card}>
              <div className={styles.stepIcon}>{step.icon}</div>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <div style={{ position: 'relative', width: '100%' }}>
                {step.avatar && (
                   <img 
                    src={step.avatar} 
                    alt={`Avatar ${step.title}`} 
                    className={styles.floatingAvatar} 
                  />
                )}
                <p className={styles.stepText}>{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowWorksSection;
