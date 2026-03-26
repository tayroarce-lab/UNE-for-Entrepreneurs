import React from 'react';
import { Flower2 } from 'lucide-react';
const suriaAbout = '/assets/suria_community.png';

const AboutSuria: React.FC = () => {
  return (
    <section className="suria-section suria-about" style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="suria-container">
        <div className="suria-about-grid">
          <div className="suria-about-image-container" style={{ position: 'relative' }}>
            <img 
              src={suriaAbout} 
              alt="Grupo de mujeres apoyándose" 
              className="suria-hero-image" 
              style={{ transform: 'rotate(2deg)' }}
            />
            <div style={{ position: 'absolute', bottom: '-40px', left: '-40px', color: 'var(--suria-peach)', zIndex: -1 }}>
              <Flower2 size={160} strokeWidth={0.5} />
            </div>
          </div>
          <div className="suria-about-content">
            <span style={{ color: 'var(--suria-orange)', fontWeight: 800, fontSize: '0.8rem', letterSpacing: '2px', fontFamily: 'var(--font-ui)' }}>NUESTRA MISIÓN</span>
            <h2 style={{ marginTop: '0.5rem' }}>¿Qué es Süria?</h2>
            <p>
              Süria es un programa de UNE diseñado específicamente para apoyar a mujeres costarricenses 
              que tienen un emprendimiento o desean hacerlo crecer. 
            </p>
            <p>
              Nuestro objetivo es que más mujeres puedan fortalecer su negocio, generar ingresos y 
              construir un futuro más estable para ellas y sus familias.
            </p>
            <p className="accent-phrase" style={{ fontSize: '1.4rem', color: 'var(--suria-crimson)', marginTop: '2rem' }}>
              "Creemos que cuando una mujer florece, su comunidad entera florece con ella."
            </p>
          </div>
        </div>
      </div>
      <div style={{ position: 'absolute', top: '10%', right: '-50px', color: 'var(--suria-ivory)', zIndex: -1 }}>
        <Flower2 size={240} strokeWidth={0.5} />
      </div>
    </section>
  );
};

export default AboutSuria;
