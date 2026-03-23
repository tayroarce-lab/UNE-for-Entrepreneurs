import { useEffect } from 'react';
import Navbar from '../../components/Shared/Navbar';
import Footer from '../../components/Shared/Footer';
import { Quote } from 'lucide-react';
import marielosImg from '../../assets/Marielos.png';
import katherineImg from '../../assets/katherine.png';
import damarisImg from '../../assets/Damaris.png';
import ginetteImg from '../../assets/Ginette.png';

export default function NuestraGente() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const casosDeExito = [
    {
      id: 1,
      nombre: "Damaris",
      profesion: "Artesana",
      ubicacion: "Emprendedora",
      cita: "Confiaron en mí, en mi capacidad, y lo más bonito es ver cómo se realizan mis sueños, ver mi taller creciendo gracias a las oportunidades que nos han dado.",
      imagen: damarisImg,
      colorTag: "#60a5fa"
    },
    {
      id: 2,
      nombre: "Ginette",
      profesion: "Artesana",
      ubicacion: "Emprendedora",
      cita: "A mí esto me ha abierto mucho los ojos. Ahora entiendo que si quiero que mi negocio crezca tengo que ordenarme.",
      imagen: ginetteImg,
      colorTag: "#4ade80"
    },
    {
      id: 3,
      nombre: "Katherine",
      profesion: "Panadera",
      ubicacion: "Emprendedora",
      cita: "Esta ha sido una experiencia muy bonita, con compañeras muy buenas y una guía que está siempre presente.",
      imagen: katherineImg,
      colorTag: "#f472b6"
    },
    {
      id: 4,
      nombre: "Marielos",
      profesion: "Cocinera",
      ubicacion: "Bagaces",
      cita: "Hoy estamos de fiesta por saber que las mujeres de Bagaces fueron escuchadas por UNE.",
      imagen: marielosImg,
      colorTag: "#facc15" 
    }
  ];

  return (
    <div className="nuestra-gente-page" style={{ background: '#F8F1EB', fontFamily: "'Inter', sans-serif", minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <main style={{ flex: 1, paddingTop: '80px' }}>
        {/* HERO SECTION */}
        <section style={{ 
          padding: '100px 2rem 80px', 
          textAlign: 'center', 
          background: 'linear-gradient(135deg, #4A1525 0%, #2D0D16 100%)', 
          color: '#fff',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Decorative Background Elements */}
          <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: '300px', height: '300px', background: 'rgba(255,255,255,0.03)', borderRadius: '50%' }}></div>
          <div style={{ position: 'absolute', bottom: '-20%', left: '-5%', width: '500px', height: '500px', background: 'rgba(255,255,255,0.03)', borderRadius: '50%' }}></div>

          <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <h1 style={{ 
              fontSize: '4.5rem', 
              fontWeight: 900, 
              marginBottom: '1.5rem', 
              letterSpacing: '-2px',
              textShadow: '0 10px 30px rgba(0,0,0,0.3)'
            }}>
              Nuestra <span style={{ color: '#facc15', fontStyle: 'italic' }}>Gente</span>
            </h1>
            <p style={{ fontSize: '1.4rem', color: '#fca5a5', fontWeight: 400, lineHeight: 1.6, maxWidth: '700px', margin: '0 auto' }}>
              Historias reales de personas extraordinarias que están transformando su futuro con el apoyo y la guía de UNE.
            </p>
          </div>
        </section>

        {/* GALLERY SECTION */}
        <section style={{ padding: '6rem 2rem' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '6rem' }}>
            {casosDeExito.map((caso, index) => (
              <article 
                key={caso.id} 
                className="caso-card"
                style={{ 
                  display: 'flex', 
                  flexDirection: index % 2 === 0 ? 'row' : 'row-reverse',
                  background: '#fff', 
                  borderRadius: '40px', 
                  overflow: 'hidden',
                  boxShadow: '0 40px 80px -20px rgba(74, 21, 37, 0.12)',
                  minHeight: '500px',
                  transition: 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.4s ease',
                }}
              >
                {/* Image Side */}
                <div style={{ flex: '1 1 45%', position: 'relative', overflow: 'hidden' }}>
                  <img 
                    src={caso.imagen} 
                    alt={caso.nombre} 
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover', 
                      filter: 'contrast(1.1) brightness(0.9)',
                      transition: 'transform 0.6s ease'
                    }}
                    className="avatar-img"
                  />
                  <div style={{ 
                    position: 'absolute', 
                    bottom: 0, 
                    left: 0, 
                    width: '100%', 
                    height: '40%', 
                    background: `linear-gradient(to top, ${caso.colorTag}66, transparent)`,
                    mixBlendMode: 'multiply'
                  }}></div>
                </div>

                {/* Content Side */}
                <div style={{ 
                  flex: '1 1 55%', 
                  padding: '5rem 4rem', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  justifyContent: 'center', 
                  position: 'relative', 
                  background: '#fff', 
                  borderTop: `8px solid ${caso.colorTag}`,
                }}>
                  <Quote size={120} color={caso.colorTag} style={{ opacity: 0.1, position: 'absolute', top: '1rem', right: '2rem' }} />
                  
                  <div style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{ 
                      display: 'inline-block', 
                      padding: '4px 16px', 
                      borderRadius: '20px', 
                      backgroundColor: `${caso.colorTag}22`, 
                      color: caso.colorTag, 
                      fontWeight: 700, 
                      fontSize: '0.9rem', 
                      marginBottom: '1.5rem',
                      textTransform: 'uppercase',
                      letterSpacing: '1px'
                    }}>
                      Caso de Éxito #{caso.id}
                    </div>

                    <h3 style={{ 
                      fontSize: '2rem', 
                      fontWeight: 700, 
                      lineHeight: 1.4, 
                      marginBottom: '2.5rem', 
                      color: '#4A1525',
                      fontStyle: 'italic'
                    }}>
                      "{caso.cita}"
                    </h3>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                      <div style={{ 
                        width: '70px', height: '70px', borderRadius: '24px', background: '#4A1525', 
                        color: caso.colorTag, display: 'flex', alignItems: 'center', justifyContent: 'center', 
                        fontSize: '1.8rem', fontWeight: 900,
                        boxShadow: '0 10px 20px rgba(74, 21, 37, 0.2)'
                      }}>
                        {caso.nombre.charAt(0)}
                      </div>
                      <div>
                        <p style={{ fontWeight: 900, fontSize: '1.5rem', margin: 0, color: '#4A1525' }}>{caso.nombre}</p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ color: caso.colorTag, fontSize: '1.1rem', fontWeight: 600 }}>{caso.profesion}</span>
                          <span style={{ color: '#9333ea', opacity: 0.3 }}>•</span>
                          <span style={{ color: '#6b7280', fontSize: '1rem', fontWeight: 500 }}>{caso.ubicacion}</span>
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

      <style>{`
        .caso-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 50px 100px -20px rgba(74, 21, 37, 0.2);
        }
        .caso-card:hover .avatar-img {
          transform: scale(1.05);
        }
        @media (max-width: 992px) {
          .caso-card {
            flex-direction: column !important;
            min-height: auto;
          }
          .caso-card > div {
            flex: none !important;
          }
          .caso-card .avatar-img {
            height: 400px !important;
          }
          .caso-card {
            padding: 0;
          }
        }
        @media (max-width: 600px) {
           h1 { font-size: 3rem !important; }
           .caso-card .avatar-img { height: 300px !important; }
           .caso-card > div:last-child { padding: 3rem 2rem !important; }
        }
      `}</style>
    </div>
  );
}
