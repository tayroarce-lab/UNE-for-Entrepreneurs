import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users2, ArrowRight, Flower2 } from 'lucide-react';

const CTABanner: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="suria-cta-banner" style={{ background: 'var(--suria-plum)', position: 'relative', overflow: 'hidden', padding: '12rem 0' }}>
      <div className="suria-container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ background: 'rgba(255,255,255,0.05)', display: 'inline-flex', padding: '1.5rem', borderRadius: '50%', marginBottom: '3.5rem', border: '1px solid rgba(255,255,255,0.1)' }}>
           <Users2 size={60} color="var(--suria-gold)" />
        </div>
        <h2 style={{ fontSize: '4.5rem', marginBottom: '2.5rem', color: 'white', lineHeight: 1.1 }}>
          El momento de <br /> <span style={{ color: 'var(--suria-gold)' }}>florecer</span> es ahora.
        </h2>
        <p style={{ fontSize: '1.6rem', opacity: 0.9, marginBottom: '5rem', maxWidth: '850px', margin: '0 auto 5rem', color: 'rgba(255,255,255,0.8)', lineHeight: 1.6 }}>
          No esperes a tener recursos para empezar. Únete a **Süria** y obtén el apoyo de UNE 
          para transformar tu talento en un negocio de éxito para tu familia.
        </p>
        <button 
          className="suria-btn"
          style={{ background: 'var(--suria-gold)', color: 'var(--suria-plum)', padding: '1.8rem 5rem', fontSize: '1.3rem', borderRadius: '60px', fontWeight: 900, border: 'none', cursor: 'pointer', transition: 'transform 0.3s', boxShadow: '0 20px 50px rgba(0,0,0,0.3)', display: 'inline-flex', alignItems: 'center', gap: '20px' }}
          onClick={() => navigate('/contacto')}
        >
          ¡Aplica y únete al próximo grupo! <ArrowRight size={28} />
        </button>
      </div>

      {/* Background Decorations */}
      <div style={{ position: 'absolute', top: '-10%', left: '-5%', color: 'rgba(255,255,255,0.03)' }}>
        <Flower2 size={400} strokeWidth={0.5} />
      </div>
      <div style={{ position: 'absolute', bottom: '-10%', right: '-5%', color: 'rgba(255,255,255,0.03)' }}>
        <Flower2 size={500} strokeWidth={0.5} />
      </div>
    </section>
  );
};

export default CTABanner;
