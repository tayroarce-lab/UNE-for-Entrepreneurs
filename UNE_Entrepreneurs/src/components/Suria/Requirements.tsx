import React from 'react';
import { CheckCircle2, Flower2 } from 'lucide-react';

const Requirements: React.FC = () => {
  const requirements = [
    'Residir en las localidades donde el programa tenga presencia.',
    'Tener un emprendimiento con posibilidad de crecer o escalar.',
    'Estar dispuesta a participar en los grupos de apoyo (Bancos Comunales).',
    'Ser la encargada de manejar tu propio negocio.',
    'Participar activamente en todas las capacitaciones financieras.'
  ];

  return (
    <section className="suria-section suria-requirements" style={{ background: 'var(--suria-ivory)', position: 'relative', overflow: 'hidden' }}>
      <div className="suria-container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span style={{ color: 'var(--suria-crimson)', fontWeight: 800, fontSize: '0.8rem', letterSpacing: '2px', fontFamily: 'var(--font-ui)', textTransform: 'uppercase' }}>TU CAMINO COMIENZA AQUÍ</span>
          <h2 className="suria-section-title" style={{ marginTop: '1rem', marginBottom: '1rem' }}>Requisitos para Aplicar</h2>
          <p style={{ color: 'var(--suria-brown)', opacity: 0.7 }}>Cumplir con estos puntos te permitirá acceder a todos los beneficios de Süria.</p>
        </div>
        
        <div className="suria-req-list" style={{ position: 'relative', zIndex: 1 }}>
          {requirements.map((req, index) => (
            <div key={index} className="suria-req-item card">
              <div className="suria-req-number" style={{ background: 'var(--suria-plum)', color: 'var(--suria-gold)' }}>
                {index + 1}
              </div>
              <div className="suria-req-content">
                <p style={{ fontWeight: 700, fontSize: '1.2rem', color: 'var(--suria-plum)', margin: 0 }}>{req}</p>
              </div>
              <CheckCircle2 
                size={24} 
                style={{ marginLeft: 'auto', color: 'var(--suria-crimson)' }}
              />
            </div>
          ))}
        </div>
      </div>
      
      {/* Background Decoration */}
      <div style={{ position: 'absolute', bottom: '-100px', left: '-50px', color: 'var(--suria-peach)', opacity: 0.4, zIndex: 0 }}>
        <Flower2 size={300} strokeWidth={0.5} />
      </div>
    </section>
  );
};

export default Requirements;
