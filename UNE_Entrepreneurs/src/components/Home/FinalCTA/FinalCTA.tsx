import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MoveRight } from 'lucide-react';
import styles from './FinalCTA.module.css';

interface FinalCTAProps {
  title?: string;
  buttonText?: string;
  buttonLink?: string;
}

const FinalCTA: React.FC<FinalCTAProps> = ({
  title = 'Escribe tu propia historia de éxito',
  buttonText = 'UNIRME A UNE AHORA',
  buttonLink = '/contacto'
}) => {
  const navigate = useNavigate();

  return (
    <section className={styles.finalCta}>
      <div className="container">
        <h2 className={styles.title}>{title}</h2>
        <button 
          className={styles.button}
          onClick={() => navigate(buttonLink)}
        >
          {buttonText} <MoveRight size={24} />
        </button>
      </div>
    </section>
  );
};

export default FinalCTA;
