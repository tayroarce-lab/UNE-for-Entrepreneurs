import React, { useState } from 'react';
import Navbar from '../../components/Shared/Navbar/Navbar';
import Footer from '../../components/Shared/Footer/Footer';
import { ChevronDown, HelpCircle, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface FaqItem {
  pregunta: string;
  respuesta: string;
  categoria: string;
}

const FAQS: FaqItem[] = [
  {
    categoria: 'Programa Süria',
    pregunta: '¿Qué es el programa Süria y a quién está dirigido?',
    respuesta: 'Süria es una iniciativa de UNE Costa Rica diseñada para impulsar emprendimientos liderados por mujeres. Ofrece acompañamiento técnico, asesoría financiera y acceso a una red colaborativa de apoyo.'
  },
  {
    categoria: 'Programa Süria',
    pregunta: '¿Tiene algún costo inscribirse en Süria?',
    respuesta: 'No, el proceso de postulación y participación en los talleres iniciales del programa Süria es completamente gratuito.'
  },
  {
    categoria: 'Plataforma y Cuenta',
    pregunta: '¿Cómo creo una cuenta en UNE Entrepreneurs?',
    respuesta: 'Puedes hacer clic en el botón "Crear Cuenta" ubicado en el menú superior o en la página principal, completar tus datos de contacto e iniciar a registrar la información de tu negocio.'
  },
  {
    categoria: 'Plataforma y Cuenta',
    pregunta: '¿Cómo funciona el gestor de presupuesto e inventario?',
    respuesta: 'Al iniciar sesión podrás acceder a "Mi Panel", donde podrás registrar tus ingresos, egresos y existencias de productos. El sistema calcula automáticamente márgenes y alertas de reposición.'
  },
  {
    categoria: 'Contacto y Soporte',
    pregunta: '¿Dónde puedo recibir atención presencial o asesoría directa?',
    respuesta: 'Puedes visitar nuestras oficinas centrales ubicadas en Paseo Colón, San José, o agendar una cita previa a través de la sección de Contacto.'
  }
];

const FaqPage: React.FC = () => {
  const navigate = useNavigate();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(prev => (prev === idx ? null : idx));
  };

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <main style={{ flex: 1, padding: 'min(120px, 15vh) 20px 80px', maxWidth: '900px', margin: '0 auto', width: '100%' }}>
        <button
          onClick={() => navigate(-1)}
          style={{ display: 'flex', alignItems: 'center', gap: '8px', border: 'none', background: 'none', color: '#64748b', fontWeight: 600, cursor: 'pointer', marginBottom: '1.5rem' }}
        >
          <ArrowLeft size={18} /> Volver
        </button>

        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#fce7f3', color: '#be185d', padding: '6px 16px', borderRadius: '30px', fontWeight: 700, fontSize: '0.85rem', marginBottom: '12px' }}>
            <HelpCircle size={16} /> CENTRO DE AYUDA
          </div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--suria-plum)', margin: '0 0 10px' }}>
            Preguntas Frecuentes
          </h1>
          <p style={{ color: '#64748b', fontSize: '1.1rem' }}>
            Encuentra respuestas rápidas a las consultas más comunes sobre nuestra plataforma y programas.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                style={{
                  background: 'white',
                  borderRadius: '16px',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease'
                }}
              >
                <button
                  onClick={() => toggle(idx)}
                  style={{
                    width: '100%',
                    padding: '20px 24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    border: 'none',
                    background: 'none',
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                >
                  <div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--suria-crimson)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      {faq.categoria}
                    </span>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1e293b', margin: '4px 0 0' }}>
                      {faq.pregunta}
                    </h3>
                  </div>
                  <ChevronDown
                    size={20}
                    style={{
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.3s ease',
                      color: 'var(--suria-crimson)',
                      flexShrink: 0
                    }}
                  />
                </button>

                {isOpen && (
                  <div style={{ padding: '0 24px 20px', color: '#475569', lineHeight: 1.6, fontSize: '0.98rem', borderTop: '1px solid #f1f5f9', paddingTop: '16px' }}>
                    {faq.respuesta}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FaqPage;
