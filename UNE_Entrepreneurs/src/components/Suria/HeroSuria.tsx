import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Flower2, ArrowRight } from 'lucide-react';
import suriaHero from '../../assets/suria_hero.png';

const HeroSuria: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="suria-hero" style={{ background: 'var(--suria-cream)', position: 'relative', overflow: 'hidden', padding: '12rem 0 8rem' }}>
      <div className="suria-container">
        <div className="suria-hero-inner" style={{ alignItems: 'center' }}>
          <div className="suria-hero-content" style={{ position: 'relative' }}>
            <span className="suria-hero-badge" style={{ background: 'var(--suria-crimson)', color: 'white', padding: '0.8rem 1.8rem', borderRadius: '50px', fontWeight: 900, fontSize: '0.85rem', letterSpacing: '3px', fontFamily: 'var(--font-ui)', textTransform: 'uppercase', marginBottom: '3rem', display: 'inline-block', boxShadow: '0 8px 20px rgba(169, 38, 43, 0.2)' }}>
              RECIBE FINANCIAMIENTO Y FORMACIÓN
            </span>
            <div style={{ position: 'relative', marginBottom: '2.5rem' }}>
              <span className="accent-phrase" style={{ fontSize: '3rem', color: 'var(--suria-orange)', position: 'absolute', top: '-1.8rem', left: '-1rem', opacity: 1, zIndex: 1, fontWeight: 300 }}>süria</span>
              <h1 className="suria-hero-title" style={{ fontSize: '5.2rem', color: 'var(--suria-plum)', fontWeight: 800, position: 'relative', zIndex: 0, margin: 0, lineHeight: 1, letterSpacing: '-1px' }}>
                Tu sueño tiene <span style={{ color: 'var(--suria-crimson)' }}>nombre</span>, nosotros ponemos el <span style={{ color: 'var(--suria-crimson)' }}>respaldo</span>.
              </h1>
            </div>
            <p className="suria-hero-description" style={{ fontSize: '1.5rem', color: 'var(--suria-brown)', opacity: 0.9, lineHeight: 1.6, marginBottom: '5rem', maxWidth: '620px' }}>
              Süria es el programa de UNE que cree en el potencial de la mujer costarricense. 
              Únete hoy a una comunidad de bienestar, éxito y libertad financiera.
            </p>
            <div className="suria-hero-buttons">
              <button 
                className="suria-btn"
                style={{ background: 'var(--suria-plum)', color: 'white', padding: '1.6rem 4.5rem', fontSize: '1.2rem', borderRadius: '50px', fontWeight: 900, border: 'none', cursor: 'pointer', boxShadow: '0 15px 40px rgba(64, 22, 45, 0.2)', transition: 'all 0.3s', display: 'flex', alignItems: 'center', gap: '15px' }}
                onClick={() => navigate('/contacto')}
              >
                ¡Aplicar ahora y sumarme a la red! <ArrowRight size={24} />
              </button>
            </div>
          </div>
          <div className="suria-hero-image-container" style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', top: '-60px', right: '-60px', color: 'var(--suria-peach)', zIndex: -1 }}>
              <Flower2 size={300} strokeWidth={0.5} />
            </div>
            <img 
              src={suriaHero} 
              alt="Mujer emprendedora disfrutando del éxito" 
              className="suria-hero-image"
              style={{ width: '100%', borderRadius: '50px', border: '15px solid white', boxShadow: '0 40px 80px rgba(64, 22, 45, 0.12)', transform: 'rotate(-2deg)' }}
            />
            <div className="hero-stat-overlay" style={{ position: 'absolute', top: '10%', left: '-60px', background: 'white', padding: '2rem 3rem', borderRadius: '30px', boxShadow: '0 25px 50px rgba(64, 22, 45, 0.1)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', gap: '5px', color: 'var(--suria-gold)' }}>
                 <Sparkles size={20} fill="currentColor" />
                 <Sparkles size={20} fill="currentColor" />
                 <Sparkles size={20} fill="currentColor" />
              </div>
              <div>
                <div style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--suria-brown)', textTransform: 'uppercase', letterSpacing: '1px' }}>EFECTIVIDAD</div>
                <div style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--suria-crimson)' }}>92% Éxito</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSuria;
