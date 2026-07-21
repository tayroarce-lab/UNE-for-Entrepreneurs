import React from 'react';
import Navbar from '../../components/Shared/Navbar/Navbar';
import Footer from '../../components/Shared/Footer/Footer';
import { ShieldCheck, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TerminosPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <main style={{ flex: 1, padding: 'min(120px, 15vh) 20px 80px', maxWidth: '850px', margin: '0 auto', width: '100%' }}>
        <button
          onClick={() => navigate(-1)}
          style={{ display: 'flex', alignItems: 'center', gap: '8px', border: 'none', background: 'none', color: '#64748b', fontWeight: 600, cursor: 'pointer', marginBottom: '1.5rem' }}
        >
          <ArrowLeft size={18} /> Volver
        </button>

        <div style={{ background: 'white', borderRadius: '20px', padding: '2.5rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1rem', color: 'var(--suria-crimson)' }}>
            <ShieldCheck size={28} />
            <span style={{ fontWeight: 800, fontSize: '0.9rem', letterSpacing: '1px' }}>LEGAL & TRANSPARENCIA</span>
          </div>

          <h1 style={{ fontSize: '2.25rem', fontWeight: 900, color: 'var(--suria-plum)', marginBottom: '1rem' }}>
            Términos y Condiciones de Uso
          </h1>
          <p style={{ color: '#64748b', fontSize: '0.95rem', marginBottom: '2rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '1rem' }}>
            Última actualización: {new Date().toLocaleDateString('es-CR', { month: 'long', year: 'numeric' })}
          </p>

          <section style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', color: '#334155', lineHeight: 1.7 }}>
            <div>
              <h3 style={{ color: 'var(--suria-plum)', fontWeight: 800, fontSize: '1.2rem', marginBottom: '0.5rem' }}>
                1. Aceptación de los Términos
              </h3>
              <p>
                Al acceder y utilizar la plataforma UNE Entrepreneurs (Unión Nacional de Emprendedores de Costa Rica), el usuario acepta cumplir con los términos y condiciones establecidos en este documento. Si no está de acuerdo con alguno de los puntos, le solicitamos abstenerse de utilizar el servicio.
              </p>
            </div>

            <div>
              <h3 style={{ color: 'var(--suria-plum)', fontWeight: 800, fontSize: '1.2rem', marginBottom: '0.5rem' }}>
                2. Uso del Servicio y Registro
              </h3>
              <p>
                Los usuarios registrados se comprometen a proporcionar información verídica y actualizada. La plataforma provee herramientas de gestión presupuestaria, inventarios e información educativa con fines exclusivamente de apoyo al emprendimiento.
              </p>
            </div>

            <div>
              <h3 style={{ color: 'var(--suria-plum)', fontWeight: 800, fontSize: '1.2rem', marginBottom: '0.5rem' }}>
                3. Protección de Datos y Privacidad
              </h3>
              <p>
                UNE Costa Rica respeta la privacidad de sus usuarios. La información registrada en los módulos de finanzas e inventario es privada de cada usuario y no será compartida con terceros sin consentimiento previo.
              </p>
            </div>

            <div>
              <h3 style={{ color: 'var(--suria-plum)', fontWeight: 800, fontSize: '1.2rem', marginBottom: '0.5rem' }}>
                4. Propiedad Intelectual
              </h3>
              <p>
                Todos los contenidos, marcas, isotipos y recursos educativos disponibles en el portal son propiedad de la Unión Nacional de Emprendedores o de sus respectivos licenciantes.
              </p>
            </div>

            <div>
              <h3 style={{ color: 'var(--suria-plum)', fontWeight: 800, fontSize: '1.2rem', marginBottom: '0.5rem' }}>
                5. Contacto
              </h3>
              <p>
                Para cualquier consulta referente a estos términos, puede escribir a <a href="mailto:info@une.cr" style={{ color: 'var(--suria-crimson)', fontWeight: 700 }}>info@une.cr</a> o comunicarse a nuestras sedes centrales.
              </p>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TerminosPage;
