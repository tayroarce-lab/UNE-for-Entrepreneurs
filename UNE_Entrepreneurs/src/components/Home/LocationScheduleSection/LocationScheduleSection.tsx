import React from 'react';
import { Clock, MapPin } from 'lucide-react';
import InteractiveMap from '../../UserComponents/InteractiveMap';
import styles from './LocationScheduleSection.module.css';

interface LocationScheduleSectionProps {
  badge?: string;
  title?: string;
  address?: string;
  schedule?: string;
}

const LocationScheduleSection: React.FC<LocationScheduleSectionProps> = ({
  badge = 'VISÍTANOS',
  title = 'Estamos más cerca de lo que imaginas.',
  address = 'San José, Costa Rica. Edificio UNE, Paseo Colón.',
  schedule = 'Lunes a Viernes: 8:00 AM - 5:00 PM'
}) => {
  return (
    <section id="contacto" className={styles.locationSection}>
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.mapArea}>
            <InteractiveMap />
          </div>
          
          <div className={styles.infoArea}>
            <span className={styles.badge}>{badge}</span>
            <h2 className={styles.title}>{title}</h2>
            
            <div className={styles.infoItem}>
              <div className={styles.itemHeading}>
                <div className={styles.iconBox}><Clock size={32} /></div>
                <span>Horario de Atención</span>
              </div>
              <p className={styles.itemText}>{schedule}</p>
            </div>
            
            <div className={styles.infoItem}>
              <div className={styles.itemHeading}>
                <div className={styles.iconBox}><MapPin size={32} /></div>
                <span>Nuestra Sede Central</span>
              </div>
              <p className={styles.itemText}>{address}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationScheduleSection;
