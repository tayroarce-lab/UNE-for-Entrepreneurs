import React from 'react';
import styles from './SuriaSchedule.module.css';

const SuriaSchedule: React.FC = () => {
  const horarios = [
    { dias: 'Lunes – Viernes', horas: '8:00 AM – 5:00 PM', estado: 'Disponible', color: 'rgba(169,38,43,0.1)', textColor: 'var(--suria-crimson)' },
    { dias: 'Sábados', horas: '8:00 AM – 12:00 PM', estado: 'Medio día', color: 'rgba(212,168,83,0.15)', textColor: 'var(--suria-brown)' },
    { dias: 'Domingos y Feriados', horas: 'Cerrado', estado: null, color: '#fef2f2', textColor: '' },
  ];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.badge}>CUANDO VISITARNOS</span>
          <h2 className={styles.title}>Horario de Atención</h2>
        </div>

        <div className={styles.scheduleList}>
          {horarios.map((h, i) => (
            <div key={i} className={styles.card}>
              <div>
                <div className={styles.days}>{h.dias}</div>
                <div className={styles.hours}>{h.horas}</div>
              </div>
              {h.estado && (
                <span 
                  className={styles.status}
                  style={{ background: h.color, color: h.textColor }}
                >
                  {h.estado}
                </span>
              )}
            </div>
          ))}

          <div className={styles.locationCard}>
            <p className={styles.locationText}>
              📍 Diagonal a la iglesia católica, Santa Ana, San José.
            </p>
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=9.9326,-84.1824"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.mapLink}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg>
              Ir con Google Maps
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SuriaSchedule;
