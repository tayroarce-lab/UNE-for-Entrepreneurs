import { useEffect } from 'react';
import Navbar from '../../components/Shared/Navbar';
import Footer from '../../components/Shared/Footer';
import { Quote } from 'lucide-react';
import marielosImg from '../../assets/Marielos.png';
import katherineImg from '../../assets/katherine.png';
import damarisImg from '../../assets/Damaris.png';
import ginetteImg from '../../assets/Ginette.png';
import '../../styles/NuestraGente.css';

const casosDeExito = [
  {
    id: 1,
    nombre: 'Damaris',
    profesion: 'Artesana',
    ubicacion: 'Emprendedora',
    cita: 'Confiaron en mí, en mi capacidad, y lo más bonito es ver cómo se realizan mis sueños, ver mi taller creciendo gracias a las oportunidades que nos han dado.',
    imagen: damarisImg,
    colorTag: '#60a5fa',
  },
  {
    id: 2,
    nombre: 'Ginette',
    profesion: 'Artesana',
    ubicacion: 'Emprendedora',
    cita: 'A mí esto me ha abierto mucho los ojos. Ahora entiendo que si quiero que mi negocio crezca tengo que ordenarme.',
    imagen: ginetteImg,
    colorTag: '#4ade80',
  },
  {
    id: 3,
    nombre: 'Katherine',
    profesion: 'Panadera',
    ubicacion: 'Emprendedora',
    cita: 'Esta ha sido una experiencia muy bonita, con compañeras muy buenas y una guía que está siempre presente.',
    imagen: katherineImg,
    colorTag: '#f472b6',
  },
  {
    id: 4,
    nombre: 'Marielos',
    profesion: 'Cocinera',
    ubicacion: 'Bagaces',
    cita: 'Hoy estamos de fiesta por saber que las mujeres de Bagaces fueron escuchadas por UNE.',
    imagen: marielosImg,
    colorTag: '#facc15',
  },
];

export default function NuestraGente() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="nuestra-gente-page">
      <Navbar />

      <main style={{ flex: 1, paddingTop: '80px' }}>
        {/* HERO */}
        <section className="ng-hero">
          <div className="ng-hero-deco-1" />
          <div className="ng-hero-deco-2" />
          <div className="ng-hero-inner">
            <h1>
              Nuestra <span>Gente</span>
            </h1>
            <p>
              Historias reales de personas extraordinarias que están transformando su futuro
              con el apoyo y la guía de UNE.
            </p>
          </div>
        </section>

        {/* GALLERY */}
        <section className="ng-gallery">
          <div className="ng-gallery-inner">
            {casosDeExito.map((caso, index) => (
              <article key={caso.id} className={`caso-card ${index % 2 !== 0 ? 'reverse' : ''}`}>
                {/* Image Side */}
                <div className="caso-img-side">
                  <img src={caso.imagen} alt={caso.nombre} className="avatar-img" />
                  <div
                    className="img-gradient"
                    style={{ background: `linear-gradient(to top, ${caso.colorTag}66, transparent)` }}
                  />
                </div>

                {/* Content Side */}
                <div
                  className="caso-content-side"
                  style={{ borderTop: `8px solid ${caso.colorTag}` }}
                >
                  <Quote size={120} color={caso.colorTag} className="caso-quote-icon" />

                  <div style={{ position: 'relative', zIndex: 1 }}>
                    <span
                      className="caso-tag"
                      style={{ backgroundColor: `${caso.colorTag}22`, color: caso.colorTag }}
                    >
                      Caso de Éxito #{caso.id}
                    </span>

                    <h3 className="caso-quote-text">"{caso.cita}"</h3>

                    <div className="caso-author">
                      <div
                        className="caso-author-avatar"
                        style={{ color: caso.colorTag }}
                      >
                        {caso.nombre.charAt(0)}
                      </div>
                      <div>
                        <p className="caso-author-name">{caso.nombre}</p>
                        <div className="caso-author-meta">
                          <span style={{ color: caso.colorTag, fontSize: '1.1rem', fontWeight: 600 }}>
                            {caso.profesion}
                          </span>
                          <span style={{ color: '#9333ea', opacity: 0.3 }}>•</span>
                          <span style={{ color: '#6b7280', fontSize: '1rem', fontWeight: 500 }}>
                            {caso.ubicacion}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
