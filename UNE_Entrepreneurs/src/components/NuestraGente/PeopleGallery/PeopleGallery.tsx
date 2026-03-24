import React, { useEffect, useState } from 'react';
import { Quote, Loader } from 'lucide-react';
import { getCasosExito } from '../../../services/CasosExitoService';
import type { CasoExito } from '../../../services/CasosExitoService';
import '../../../styles/NuestraGente.css';

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
      // Solo mostrar los activos
      setCasosDeExito(data.filter(c => c.activo) || []);
    } catch (error) {
      console.error('Error al cargar casos de éxito:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ flex: 1, paddingTop: '80px' }}>
      <section className="ng-hero">
        <div className="ng-hero-deco-1" />
        <div className="ng-hero-deco-2" />
        <div className="ng-hero-inner">
          <h1>Nuestra <span>Gente</span></h1>
          <p>Historias reales de personas extraordinarias que están transformando su futuro con el apoyo y la guía de UNE.</p>
        </div>
      </section>

      <section className="ng-gallery">
        <div className="ng-gallery-inner">
          {loading ? (
            <div style={{ textAlign: 'center', padding: '100px', color: '#8B1A1A' }}>
              <Loader className="animate-spin" size={48} />
              <p style={{ marginTop: '20px', fontWeight: 600 }}>Cargando historias inspiradoras...</p>
            </div>
          ) : casosDeExito.length > 0 ? (
            casosDeExito.map((caso, index) => (
              <article key={caso.id} className={`caso-card ${index % 2 !== 0 ? 'reverse' : ''}`}>
                <div className="caso-img-side">
                  <img src={caso.imagen} alt={caso.nombre} className="avatar-img" />
                  <div className="img-gradient" style={{ background: `linear-gradient(to top, ${caso.colorTag}66, transparent)` }} />
                </div>
                <div className="caso-content-side" style={{ borderTop: `8px solid ${caso.colorTag}` }}>
                  <Quote size={120} color={caso.colorTag} className="caso-quote-icon" />
                  <div style={{ position: 'relative', zIndex: 1 }}>
                    <span className="caso-tag" style={{ backgroundColor: `${caso.colorTag}22`, color: caso.colorTag }}>
                      Caso de Éxito
                    </span>
                    <h3 className="caso-quote-text">"{caso.cita}"</h3>
                    <div className="caso-author">
                      <div className="caso-author-avatar" style={{ color: caso.colorTag }}>{caso.nombre.charAt(0)}</div>
                      <div>
                        <p className="caso-author-name">{caso.nombre}</p>
                        <div className="caso-author-meta">
                          <span style={{ color: caso.colorTag, fontSize: '1.1rem', fontWeight: 600 }}>{caso.profesion}</span>
                          <span style={{ color: '#9333ea', opacity: 0.3 }}>•</span>
                          <span style={{ color: '#6b7280', fontSize: '1rem', fontWeight: 500 }}>{caso.ubicacion}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))
          ) : (
            <div style={{ textAlign: 'center', padding: '100px', color: '#64748b' }}>
              <p>Próximamente más historias de éxito.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default PeopleGallery;
