import React, { useEffect, useState } from 'react';
import { Quote, Loader2 } from 'lucide-react';
import { getCasosExito } from '../../../services/CasosExitoService';
import type { CasoExito } from '../../../services/CasosExitoService';
import styles from './PeopleGallery.module.css';

const PeopleGallery: React.FC = () => {
  const [casosDeExito, setCasosDeExito] = useState<CasoExito[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchCasos();
  }, []);

  const fetchCasos = async () => {
    try {
      const data = await getCasosExito();
      setCasosDeExito(data.filter(c => c.activo) || []);
    } catch (error) {
      console.error('Error al cargar casos de éxito:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ flex: 1 }}>
      <section className={styles.ngHero}>
        <div className={styles.ngHeroInner}>
          <h1>Nuestra <span>Gente</span></h1>
          <p>Historias reales de personas extraordinarias que están transformando su futuro con el apoyo y la guía de UNE.</p>
        </div>
      </section>

      <section className={styles.ngGallery}>
        <div className={styles.ngGalleryInner}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '100px', color: 'var(--suria-crimson)' }}>
              <Loader2 className="animate-spin" size={48} />
              <p style={{ marginTop: '20px', fontWeight: 600, fontFamily: 'var(--font-ui)' }}>Cargando historias inspiradoras...</p>
            </div>
          ) : casosDeExito.length > 0 ? (
            casosDeExito.map((caso, index) => (
              <article key={caso.id} className={`${styles.casoCard} ${index % 2 !== 0 ? styles.reverse : ''}`}>
                <div className={styles.imgSide}>
                  <img src={caso.imagen} alt={caso.nombre} className={styles.avatarImg} />
                  <div className={styles.imgGradient} style={{ background: `linear-gradient(to top, ${caso.colorTag || '#d4a853'}33, transparent)` }} />
                </div>
                <div className={styles.contentSide} style={{ borderTop: `6px solid ${caso.colorTag || 'var(--suria-gold)'}` }}>
                  <Quote size={180} color={caso.colorTag || 'var(--suria-plum)'} className={styles.casoQuoteIcon} />
                  <div style={{ position: 'relative', zIndex: 1 }}>
                    <span className={styles.casoTag} style={{ backgroundColor: `${caso.colorTag || '#d4a853'}22`, color: caso.colorTag || 'var(--suria-plum)' }}>
                      Caso de Éxito
                    </span>
                    <h3 className={styles.casoQuoteText}>"{caso.cita}"</h3>
                    <div className={styles.author}>
                      <div className={styles.authorAvatar} style={{ color: caso.colorTag || 'var(--suria-plum)' }}>{caso.nombre.charAt(0)}</div>
                      <div>
                        <p className={styles.authorName}>{caso.nombre}</p>
                        <div className={styles.authorMeta}>
                          <span style={{ color: caso.colorTag || 'var(--suria-plum)', fontWeight: 700 }}>{caso.profesion}</span>
                          <span style={{ opacity: 0.3 }}>•</span>
                          <span style={{ color: 'var(--suria-brown)', opacity: 0.6 }}>{caso.ubicacion}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))
          ) : (
            <div style={{ textAlign: 'center', padding: '100px', color: 'var(--suria-brown)', opacity: 0.6 }}>
              <p>Próximamente más historias de éxito.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default PeopleGallery;
