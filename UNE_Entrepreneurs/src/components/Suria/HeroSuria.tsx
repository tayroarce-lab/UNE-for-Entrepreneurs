import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Flower2, ArrowRight, CheckCircle2 } from 'lucide-react';
import suriaHero from '../../assets/suria_hero.png';
import styles from './HeroSuria.module.css';

const HeroSuria: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.inner}>
          <div className={styles.content}>
            <span className={styles.badge}>
              <CheckCircle2 size={16} /> Financiamiento y Formación
            </span>
            
            <div className={styles.titleContainer}>
              <span className={styles.accent}>Süria</span>
              <h1 className={styles.title}>
                Tu sueño tiene <span className={styles.highlight}>nombre</span>, nosotros ponemos el <span className={styles.highlight}>respaldo</span>.
              </h1>
            </div>

            <p className={styles.description}>
              Süria es el programa de UNE que cree en el potencial de la mujer costarricense. 
              Únete hoy a una comunidad de bienestar, éxito y libertad financiera diseñada exclusivamente para ti.
            </p>

            <div className={styles.buttonGroup}>
              <button 
                className={styles.primaryBtn}
                onClick={() => navigate('/contacto')}
              >
                ¡Aplicar ahora! <ArrowRight size={22} />
              </button>
              <button 
                className={styles.secondaryBtn}
                onClick={() => navigate('/suria/servicios')}
              >
                Explorar beneficios
              </button>
            </div>
          </div>

          <div className={styles.imageWrapper}>
            <div className={styles.flower}>
              <Flower2 size={400} strokeWidth={0.5} />
            </div>
            
            <img 
              src={suriaHero} 
              alt="Mujer emprendedora disfrutando del éxito" 
              className={styles.mainImage}
            />

            <div className={styles.statCard}>
              <div className={styles.stars}>
                 <Sparkles size={16} fill="currentColor" />
                 <Sparkles size={16} fill="currentColor" />
                 <Sparkles size={16} fill="currentColor" />
              </div>
              <div className={styles.statLabel}>Efectividad verificada</div>
              <div className={styles.statValue}>92% Éxito</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSuria;

