import React, { useEffect, useState } from 'react';
import { Quote } from 'lucide-react';
import { getCasosExito } from '../../../services/CasosExitoService';
import type { CasoExito } from '../../../services/CasosExitoService';
import styles from './PeopleGallery.module.css';

const shimmerStyle: React.CSSProperties = {
  background: 'linear-gradient(90deg, #ede8e0 25%, #f5f2ea 50%, #ede8e0 75%)',
  backgroundSize: '600px 100%',
  animation: 'skeletonShimmer 1.4s infinite linear',
  borderRadius: 8,
};

const SkeletonCard = () => (
  <article className={styles.casoCard} style={{ minHeight: 400 }}>
    <div style={{ flex: '1.3', background: 'linear-gradient(90deg, #d6cfc4 25%, #e5ddd0 50%, #d6cfc4 75%)', backgroundSize: '600px 100%', animation: 'skeletonShimmer 1.4s infinite linear' }} />
    <div className={styles.contentSide} style={{ gap: '1.1rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div style={{ ...shimmerStyle, height: 14, width: 100, borderRadius: 20 }} />
      <div style={{ ...shimmerStyle, height: 34, width: '85%' }} />
      <div style={{ ...shimmerStyle, height: 34, width: '60%' }} />
      <div style={{ ...shimmerStyle, height: 16, width: '100%', marginTop: '1rem' }} />
      <div style={{ ...shimmerStyle, height: 16, width: '75%' }} />
    </div>
  </article>
);

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
      if (Array.isArray(data)) {
        setCasosDeExito(data.filter(c => c.activo));
      } else {
        setCasosDeExito([]);
      }
    } catch (error) {
      console.error('Error al cargar casos de éxito:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ flex: 1 }}>
      <style>{`
        @keyframes skeletonShimmer {
          0%   { background-position: -600px 0; }
          100% { background-position: 600px 0; }
        }
      `}</style>

      <section className={styles.ngHero}>
        <div className={styles.ngHeroInner}>
          <h1 className={styles.heroTitle}>Nuestra <span className={styles.titleAccent}>Gente</span></h1>
          <p>Historias reales de personas extraordinarias que están transformando su futuro con el apoyo y la guía de UNE.</p>
        </div>
      </section>

      <section className={styles.ngGallery}>
        <div className={styles.ngGalleryInner}>
          {loading ? (
            <>
              <SkeletonCard />
              <SkeletonCard />
            </>
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
