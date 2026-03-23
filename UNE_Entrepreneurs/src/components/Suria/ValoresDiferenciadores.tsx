import React from 'react';
import { ShieldCheck, Users2, GraduationCap, BadgePercent, HeartHandshake, Zap } from 'lucide-react';

const valores = [
  {
    icon: <HeartHandshake size={32} />,
    titulo: 'Solidaridad',
    descripcion: 'Las beneficiarias se apoyan entre sí en bancos comunales. El grupo comparte la responsabilidad, fortaleciendo la confianza y el compromiso.',
    color: 'var(--suria-crimson)',
    bg: 'rgba(169,38,43,0.08)',
  },
  {
    icon: <ShieldCheck size={32} />,
    titulo: 'Confianza',
    descripcion: 'Creemos en el potencial de cada emprendedora antes de que ella misma lo vea. Confiamos en su capacidad y acompañamos su crecimiento.',
    color: 'var(--suria-plum)',
    bg: 'rgba(64,22,45,0.07)',
  },
  {
    icon: <GraduationCap size={32} />,
    titulo: 'Formación Continua',
    descripcion: 'Ofrecemos talleres de gestión financiera, ventas y toma de decisiones para que cada mujer administre su éxito con profesionalismo.',
    color: '#c47d17',
    bg: 'rgba(196,125,23,0.08)',
  },
];

const diferenciadores = [
  {
    icon: <BadgePercent size={28} />,
    titulo: 'Garantía Solidaria',
    descripcion: 'No necesitas propiedades ni avales. Tu comunidad es tu respaldo.',
  },
  {
    icon: <Users2 size={28} />,
    titulo: 'Red de Mujeres',
    descripcion: 'Accedés a una red activa de emprendedoras que crecen juntas en toda Costa Rica.',
  },
  {
    icon: <Zap size={28} />,
    titulo: 'Acceso Rápido',
    descripcion: 'Proceso ágil, sin trámites imposibles. Diseñado para la realidad de la mujer costarricense.',
  },
];

const ValoresDiferenciadores: React.FC = () => {
  return (
    <section className="suria-section" style={{ background: 'var(--suria-ivory)' }}>
      <div className="suria-container">

        {/* Valores */}
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <span style={{ color: 'var(--suria-crimson)', fontWeight: 800, fontSize: '0.8rem', letterSpacing: '2px', fontFamily: 'var(--font-ui)', textTransform: 'uppercase' }}>EN LO QUE CREEMOS</span>
          <h2 className="suria-section-title" style={{ marginTop: '1rem', marginBottom: '0.5rem' }}>Nuestros Valores</h2>
          <p style={{ color: 'var(--suria-brown)', opacity: 0.7, maxWidth: '600px', margin: '0 auto' }}>
            Los principios que guían todo lo que hacemos en UNE y en el Programa Süria.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2.5rem', marginBottom: '8rem' }}>
          {valores.map((v, i) => (
            <div key={i} className="card" style={{ padding: '3.5rem 3rem', borderRadius: '28px', textAlign: 'center', transition: 'all 0.3s' }}>
              <div style={{ width: '72px', height: '72px', borderRadius: '22px', background: v.bg, color: v.color, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2.5rem' }}>
                {v.icon}
              </div>
              <h3 style={{ fontSize: '1.6rem', color: 'var(--suria-plum)', marginBottom: '1.5rem', fontFamily: 'var(--font-display)' }}>{v.titulo}</h3>
              <p style={{ color: 'var(--suria-brown)', lineHeight: 1.7, fontSize: '1rem', opacity: 0.9 }}>{v.descripcion}</p>
            </div>
          ))}
        </div>

        {/* Diferenciadores */}
        <div style={{ background: 'var(--suria-plum)', borderRadius: '40px', padding: '6rem 5rem', position: 'relative', overflow: 'hidden' }}>
          <div style={{ textAlign: 'center', marginBottom: '5rem', position: 'relative', zIndex: 1 }}>
            <span style={{ color: 'var(--suria-gold)', fontWeight: 800, fontSize: '0.8rem', letterSpacing: '2px', fontFamily: 'var(--font-ui)', textTransform: 'uppercase' }}>POR QUÉ ELEGIRNOS</span>
            <h2 style={{ fontSize: '3rem', color: 'white', marginTop: '1rem', fontFamily: 'var(--font-display)' }}>Lo que nos hace <span style={{ color: 'var(--suria-gold)' }}>diferentes</span></h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2.5rem', position: 'relative', zIndex: 1 }}>
            {diferenciadores.map((d, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '24px', padding: '3rem 2.5rem', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)' }}>
                <div style={{ color: 'var(--suria-gold)', marginBottom: '2rem' }}>{d.icon}</div>
                <h4 style={{ color: 'white', fontSize: '1.3rem', fontWeight: 800, marginBottom: '1rem' }}>{d.titulo}</h4>
                <p style={{ color: 'rgba(255,255,255,0.75)', lineHeight: 1.7, fontSize: '0.95rem' }}>{d.descripcion}</p>
              </div>
            ))}
          </div>

          {/* Stat row */}
          <div style={{ marginTop: '5rem', paddingTop: '4rem', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '2rem', position: 'relative', zIndex: 1 }}>
            {[
              { stat: '92%', label: 'de emprendedoras mejoró sus ingresos' },
              { stat: '+1,500', label: 'mujeres beneficiadas en Costa Rica' },
              { stat: '100%', label: 'apoyo durante todo el proceso' },
            ].map((s, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--suria-gold)', fontFamily: 'var(--font-display)', lineHeight: 1 }}>{s.stat}</div>
                <div style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.9rem', marginTop: '0.75rem', maxWidth: '180px' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default ValoresDiferenciadores;
