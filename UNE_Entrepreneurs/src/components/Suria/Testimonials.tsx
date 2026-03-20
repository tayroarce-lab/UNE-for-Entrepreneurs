import React from 'react';
import { Quote } from 'lucide-react';

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      name: 'Marielos',
      trade: 'Cocinera',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300&h=300',
      quote: 'Hoy estamos de fiesta por saber que las mujeres de Bagaces fueron escuchadas por UNE.'
    },
    {
      name: 'Katherine',
      trade: 'Panadera',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=300&h=300',
      quote: 'Esta ha sido una experiencia muy bonita, con compañeras muy buenas y una guía que está siempre presente.'
    },
    {
      name: 'Ginette',
      trade: 'Artesana',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=300&h=300',
      quote: 'A mí esto me ha abierto mucho los ojos. Ahora entiendo que si quiero que mi negocio crezca tengo que ordenarme.'
    },
    {
      name: 'Jaqueline',
      trade: 'Artesana',
      avatar: 'https://images.unsplash.com/photo-1489424159676-112cb953046f?auto=format&fit=crop&q=80&w=300&h=300',
      quote: 'Significa mucho saber que uno tiene el poder, la creatividad, las ideas y el don para que nos den esta oportunidad.'
    },
    {
      name: 'Damaris',
      trade: 'Artesana',
      avatar: 'https://images.unsplash.com/photo-1554151228-14d9def656ec?auto=format&fit=crop&q=80&w=300&h=300',
      quote: 'Confiaron en mí, en mi capacidad, y lo más bonito es ver cómo se realizan mis sueños, ver mi taller creciendo.'
    }
  ];

  return (
    <section className="suria-section suria-testimonials" style={{ background: 'white', position: 'relative' }}>
      <div className="suria-container">
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <span style={{ color: 'var(--suria-crimson)', fontWeight: 800, fontSize: '0.8rem', letterSpacing: '2px', fontFamily: 'var(--font-ui)', textTransform: 'uppercase' }}>TESTIMONIOS REALES</span>
          <h2 className="suria-section-title" style={{ marginTop: '1rem', marginBottom: '1rem' }}>Historias que nos Inspiran</h2>
          <p style={{ color: 'var(--suria-brown)', opacity: 0.7 }}>Mujeres que ya están transformando sus vidas con Süria.</p>
        </div>
        
        <div className="suria-test-grid">
          {testimonials.map((test, index) => (
            <div key={index} className="suria-test-card card" style={{ padding: '4rem 2.5rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
               <div style={{ width: '120px', height: '120px', borderRadius: '50%', overflow: 'hidden', border: '5px solid var(--suria-cream)', marginBottom: '2.5rem', boxShadow: '0 15px 35px rgba(0,0,0,0.1)' }}>
                  <img src={test.avatar} alt={test.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
               </div>
               
               <div style={{ marginBottom: '2.5rem' }}>
                  <h4 style={{ margin: '0 0 0.5rem', fontSize: '1.4rem', color: 'var(--suria-plum)', fontWeight: 900 }}>{test.name}</h4>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--suria-crimson)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px' }}>{test.trade}</p>
               </div>

               <Quote 
                 size={30} 
                 style={{ color: 'var(--suria-peach)', marginBottom: '1.5rem', opacity: 0.5 }} 
               />
               
               <div className="suria-test-text accent-phrase" style={{ color: 'var(--suria-plum)', fontSize: '1.2rem', lineHeight: 1.6, fontStyle: 'italic', opacity: 0.9 }}>
                 "{test.quote}"
               </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
