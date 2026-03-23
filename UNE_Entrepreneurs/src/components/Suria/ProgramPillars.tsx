import React from 'react';
import { Wallet, Users, GraduationCap } from 'lucide-react';

const ProgramPillars: React.FC = () => {
  const pillars = [
    {
      title: 'Microcréditos',
      description: 'Ofrecemos pequeños créditos diseñados para invertir en tu negocio: compra de materiales, herramientas o mercadería que te ayuden a escalar.',
      icon: <Wallet size={36} />
    },
    {
      title: 'Trabajo en grupos',
      description: 'Participa en bancos comunales. Grupos de mujeres que se apoyan entre sí, compartiendo la responsabilidad y creciendo juntas.',
      icon: <Users size={36} />
    },
    {
      title: 'Acompañamiento',
      description: 'No estás sola. Brindamos capacitación en gestión financiera, ventas y toma de decisiones para que administres tu éxito profesionalmente.',
      icon: <GraduationCap size={36} />
    }
  ];

  return (
    <section className="suria-section" style={{ background: 'white' }}>
      <div className="suria-container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span style={{ color: 'var(--suria-crimson)', fontWeight: 800, fontSize: '0.8rem', letterSpacing: '2px', fontFamily: 'var(--font-ui)', textTransform: 'uppercase' }}>COMO TE IMPULSAMOS</span>
          <h2 className="suria-section-title" style={{ marginTop: '1rem', marginBottom: '1rem' }}>Los 3 Pilares del Programa</h2>
          <p style={{ color: 'var(--suria-brown)', opacity: 0.7, maxWidth: '600px', margin: '0 auto' }}>
            Un enfoque integral que combina recursos financieros con educación y una comunidad imparable.
          </p>
        </div>
        <div className="suria-pillars-grid">
          {pillars.map((pillar, index) => (
            <div key={index} className="suria-pillar-card card">
              <div className="suria-pillar-icon" style={{ background: 'var(--suria-ivory)', color: 'var(--suria-plum)' }}>
                {pillar.icon}
              </div>
              <h3 style={{ fontSize: '1.8rem', color: 'var(--suria-plum)', marginBottom: '1.5rem' }}>{pillar.title}</h3>
              <p style={{ fontSize: '1rem', lineHeight: '1.7', color: 'var(--suria-brown)', opacity: 0.9 }}>{pillar.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProgramPillars;
