import React from 'react';
import { Target, Heart, Sparkles, Flower2 } from 'lucide-react';

const MisionVision: React.FC = () => {
  return (
    <section className="suria-section" style={{ background: 'white', position: 'relative', overflow: 'hidden' }}>
      <div className="suria-container">

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
          <span style={{ color: 'var(--suria-crimson)', fontWeight: 800, fontSize: '0.8rem', letterSpacing: '2px', fontFamily: 'var(--font-ui)', textTransform: 'uppercase' }}>QUIÉNES SOMOS</span>
          <h2 className="suria-section-title" style={{ marginTop: '1rem', marginBottom: '1.5rem' }}>La Historia detrás de UNE</h2>
          <p style={{ maxWidth: '800px', margin: '0 auto', color: 'var(--suria-brown)', fontSize: '1.2rem', lineHeight: 1.8, opacity: 0.9 }}>
            UNE es una organización que trabaja para crear más oportunidades para las personas que emprenden. 
            Creemos que muchas personas tienen talento, ideas y ganas de trabajar, pero a veces no tienen 
            las oportunidades o los recursos para hacer crecer sus negocios.
          </p>
        </div>

        {/* Misión + Visión */}
        <div className="suria-mv-grid" style={{ marginBottom: '6rem' }}>

          {/* Misión */}
          <div className="suria-mv-card" style={{ background: 'var(--suria-plum)', borderRadius: '32px', color: 'white', position: 'relative', overflow: 'hidden' }}>
            <div style={{ background: 'rgba(255,255,255,0.1)', width: '64px', height: '64px', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2.5rem' }}>
              <Target size={32} color="var(--suria-gold)" />
            </div>
            <span style={{ color: 'var(--suria-gold)', fontWeight: 800, fontSize: '0.75rem', letterSpacing: '3px', textTransform: 'uppercase', fontFamily: 'var(--font-ui)' }}>01 — MISIÓN</span>
            <h3 style={{ fontSize: '2rem', color: 'white', margin: '1.5rem 0', fontFamily: 'var(--font-display)' }}>¿Por qué existimos?</h3>
            <p style={{ color: 'rgba(255,255,255,0.85)', lineHeight: 1.8, fontSize: '1.1rem' }}>
              Desarrollamos programas que buscan fortalecer los emprendimientos y mejorar las oportunidades 
              económicas de las personas, especialmente en comunidades donde el acceso a estas oportunidades 
              es más limitado.
            </p>
            <div style={{ position: 'absolute', bottom: '-20px', right: '-20px', color: 'rgba(255,255,255,0.04)' }}>
              <Flower2 size={180} strokeWidth={0.5} />
            </div>
          </div>

          {/* Visión */}
          <div className="suria-mv-card" style={{ background: 'var(--suria-ivory)', borderRadius: '32px', position: 'relative', overflow: 'hidden', border: '1px solid rgba(64,22,45,0.06)' }}>
            <div style={{ background: 'var(--suria-crimson)', width: '64px', height: '64px', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2.5rem' }}>
              <Sparkles size={32} color="white" />
            </div>
            <span style={{ color: 'var(--suria-crimson)', fontWeight: 800, fontSize: '0.75rem', letterSpacing: '3px', textTransform: 'uppercase', fontFamily: 'var(--font-ui)' }}>02 — VISIÓN</span>
            <h3 style={{ fontSize: '2rem', color: 'var(--suria-plum)', margin: '1.5rem 0', fontFamily: 'var(--font-display)' }}>¿Hacia dónde vamos?</h3>
            <p style={{ color: 'var(--suria-brown)', lineHeight: 1.8, fontSize: '1.1rem', opacity: 0.9 }}>
              Un Costa Rica donde cada mujer emprendedora tenga acceso a las herramientas, el capital y la 
              comunidad que necesita para transformar su talento en un negocio próspero y sostenible.
            </p>
            <div style={{ position: 'absolute', bottom: '-20px', right: '-20px', color: 'var(--suria-peach)', opacity: 0.3 }}>
              <Flower2 size={180} strokeWidth={0.5} />
            </div>
          </div>
        </div>

        {/* Frase insignia */}
        <div className="suria-insignia-banner" style={{ background: 'var(--suria-cream)', borderRadius: '32px', textAlign: 'center', position: 'relative', overflow: 'hidden', border: '1px solid rgba(64,22,45,0.05)' }}>
          <Heart size={36} style={{ color: 'var(--suria-crimson)', marginBottom: '2rem', opacity: 0.7 }} />
          <p className="accent-phrase" style={{ fontSize: 'clamp(1.4rem, 5vw, 2rem)', color: 'var(--suria-plum)', maxWidth: '800px', margin: '0 auto', lineHeight: 1.5 }}>
            "Creemos que cuando una mujer fortalece su emprendimiento,<br />
            también se fortalece <span style={{ color: 'var(--suria-crimson)' }}>su comunidad</span>."
          </p>
          <p style={{ color: 'var(--suria-brown)', marginTop: '2rem', fontWeight: 700, fontFamily: 'var(--font-ui)', letterSpacing: '1px', textTransform: 'uppercase', fontSize: '0.8rem', opacity: 0.6 }}>— Filosofía de UNE Costa Rica</p>
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'var(--suria-peach)', opacity: 0.08, pointerEvents: 'none' }}>
            <Flower2 size={400} strokeWidth={0.3} />
          </div>
        </div>

      </div>
    </section>
  );
};

export default MisionVision;
