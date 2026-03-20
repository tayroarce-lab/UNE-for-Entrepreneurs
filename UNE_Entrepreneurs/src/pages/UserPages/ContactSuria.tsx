import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Shared/Navbar';
import Footer from '../../components/Shared/Footer';
import PremiumModal from '../../components/Shared/PremiumModal';
import { Mail, Phone, MapPin, Send, ArrowLeft, Flower2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../../styles/Suria.css';

const ContactSuria: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    email: '',
    ubicacion: '',
    negocio: '',
    mensaje: ''
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulando envío
    setTimeout(() => {
      setLoading(false);
      setShowSuccessModal(true);
      
      setFormData({
        nombre: '',
        telefono: '',
        email: '',
        ubicacion: '',
        negocio: '',
        mensaje: ''
      });
    }, 1500);
  };

  return (
    <div className="suria-page">
      <Navbar />
      
      <main className="suria-section" style={{ minHeight: '90vh', padding: '10rem 0 5rem' }}>
        <div className="suria-container">
          <div style={{ marginBottom: '4rem', textAlign: 'center' }}>
            <button 
              onClick={() => navigate(-1)} 
              className="suria-back-btn"
              style={{ 
                background: 'none', 
                border: 'none', 
                color: 'var(--suria-crimson)', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px', 
                fontWeight: 700,
                cursor: 'pointer',
                marginBottom: '1.5rem',
                margin: '0 auto',
                fontFamily: 'var(--font-ui)',
                textTransform: 'uppercase',
                fontSize: '0.8rem',
                letterSpacing: '1px'
              }}
            >
              <ArrowLeft size={18} /> Volver
            </button>
            <h1 className="suria-section-title" style={{ marginBottom: '1.5rem', fontSize: '3.8rem' }}>Comienza hoy tu historia de <span style={{ color: 'var(--suria-crimson)' }}>éxito</span></h1>
            <p style={{ maxWidth: '700px', margin: '0 auto', color: 'var(--suria-brown)', fontSize: '1.3rem', opacity: 0.9, lineHeight: 1.6 }}>
              Completa este formulario y el equipo de UNE se pondrá en contacto contigo para 
              explicarte cómo sumarte al grupo más cercano de tu comunidad.
            </p>
          </div>

          <div className="suria-contact-grid card" style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr 1.5fr', 
            gap: 0,
            overflow: 'hidden',
          }}>
            {/* Información lateral */}
            <div style={{ 
              background: 'var(--suria-plum)',
              color: 'white',
              padding: '5rem 4.5rem',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <h2 style={{ fontSize: '2.8rem', marginBottom: '2.5rem', color: 'white', lineHeight: 1.1 }}>Apoyo <br /><span style={{ color: 'var(--suria-gold)' }}>Incondicional</span></h2>
              <p style={{ opacity: 0.8, marginBottom: '4.5rem', lineHeight: 1.7, fontSize: '1.15rem' }}>
                Al unirte a Süria, no solo recibes capital; recibes a toda una red de mujeres 
                impulsando tu crecimiento.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', position: 'relative', zIndex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                  <div style={{ width: '50px', height: '50px', background: 'rgba(255,255,255,0.08)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--suria-gold)' }}>
                    <Mail size={22} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '0.7rem', fontWeight: 700, opacity: 0.5, textTransform: 'uppercase' }}>EMAIL</span>
                    <span style={{ fontSize: '1rem', fontWeight: 600 }}>info@une.cr</span>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                  <div style={{ width: '50px', height: '50px', background: 'rgba(255,255,255,0.08)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--suria-gold)' }}>
                    <Phone size={22} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '0.7rem', fontWeight: 700, opacity: 0.5, textTransform: 'uppercase' }}>TELÉFONO</span>
                    <span style={{ fontSize: '1rem', fontWeight: 600 }}>+506 2200-0000</span>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                  <div style={{ width: '50px', height: '50px', background: 'rgba(255,255,255,0.08)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--suria-gold)' }}>
                    <MapPin size={22} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '0.7rem', fontWeight: 700, opacity: 0.5, textTransform: 'uppercase' }}>SEDE</span>
                    <span style={{ fontSize: '1rem', fontWeight: 600 }}>San José, Costa Rica</span>
                  </div>
                </div>
              </div>

              <div style={{ position: 'absolute', bottom: '-40px', right: '-40px', color: 'rgba(255,255,255,0.03)', zIndex: 0 }}>
                 <Flower2 size={240} strokeWidth={0.5} />
              </div>
            </div>

            {/* Formulario */}
            <div style={{ padding: '4.5rem', background: 'white' }}>
              <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
                  <div className="form-group">
                    <label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: 700, color: 'var(--suria-plum)', fontFamily: 'var(--font-ui)', fontSize: '0.8rem', textTransform: 'uppercase' }}>Nombre completo</label>
                    <input 
                      type="text" 
                      name="nombre" 
                      value={formData.nombre}
                      onChange={handleChange}
                      required
                      placeholder="Tu nombre"
                      style={{ width: '100%', padding: '1.25rem', borderRadius: '16px', border: '1px solid #f0f0f0', outline: 'none', background: 'var(--suria-ivory)', fontFamily: 'inherit' }}
                    />
                  </div>
                  <div className="form-group">
                    <label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: 700, color: 'var(--suria-plum)', fontFamily: 'var(--font-ui)', fontSize: '0.8rem', textTransform: 'uppercase' }}>Teléfono</label>
                    <input 
                      type="tel" 
                      name="telefono" 
                      value={formData.telefono}
                      onChange={handleChange}
                      required
                      placeholder="+506 XXXX-XXXX"
                      style={{ width: '100%', padding: '1.25rem', borderRadius: '16px', border: '1px solid #f0f0f0', outline: 'none', background: 'var(--suria-ivory)', fontFamily: 'inherit' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
                  <div className="form-group">
                    <label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: 700, color: 'var(--suria-plum)', fontFamily: 'var(--font-ui)', fontSize: '0.8rem', textTransform: 'uppercase' }}>Correo electrónico</label>
                    <input 
                      type="email" 
                      name="email" 
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="tu@email.com"
                      style={{ width: '100%', padding: '1.25rem', borderRadius: '16px', border: '1px solid #f0f0f0', outline: 'none', background: 'var(--suria-ivory)', fontFamily: 'inherit' }}
                    />
                  </div>
                  <div className="form-group">
                    <label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: 700, color: 'var(--suria-plum)', fontFamily: 'var(--font-ui)', fontSize: '0.8rem', textTransform: 'uppercase' }}>Ubicación</label>
                    <input 
                      type="text" 
                      name="ubicacion" 
                      value={formData.ubicacion}
                      onChange={handleChange}
                      required
                      placeholder="Ej. Cartago, Bagaces..."
                      style={{ width: '100%', padding: '1.25rem', borderRadius: '16px', border: '1px solid #f0f0f0', outline: 'none', background: 'var(--suria-ivory)', fontFamily: 'inherit' }}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '2rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: 700, color: 'var(--suria-plum)', fontFamily: 'var(--font-ui)', fontSize: '0.8rem', textTransform: 'uppercase' }}>Descripción del Negocio / Idea</label>
                  <input 
                    type="text" 
                    name="negocio" 
                    value={formData.negocio}
                    onChange={handleChange}
                    required
                    placeholder="Contanos un poco de tu emprendimiento"
                    style={{ width: '100%', padding: '1.25rem', borderRadius: '16px', border: '1px solid #f0f0f0', outline: 'none', background: 'var(--suria-ivory)', fontFamily: 'inherit' }}
                  />
                </div>

                <div style={{ marginBottom: '3rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: 700, color: 'var(--suria-plum)', fontFamily: 'var(--font-ui)', fontSize: '0.8rem', textTransform: 'uppercase' }}>¿Por qué quieres unirte a Süria?</label>
                  <textarea 
                    name="mensaje" 
                    value={formData.mensaje}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Contanos tus metas..."
                    style={{ width: '100%', padding: '1.25rem', borderRadius: '16px', border: '1px solid #f0f0f0', outline: 'none', background: 'var(--suria-ivory)', fontFamily: 'inherit', resize: 'none' }}
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  className="suria-btn" 
                  disabled={loading}
                  style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}
                >
                  {loading ? 'Procesando...' : (
                    <>
                      Enviar Solicitud <Send size={20} />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>

      {/* SUCCESS MODAL REPLACING SWEETALERT */}
      <PremiumModal 
        isOpen={showSuccessModal}
        onClose={() => { setShowSuccessModal(false); navigate('/suria'); }}
        title="¡Solicitud Enviada!"
        message="Tu mensaje ha sido recibido con éxito. Muy pronto una asesora de UNE Costa Rica se pondrá en contacto contigo para guiarte en tu proceso hacia Süria."
        type="success"
      />

      <Footer />

      <style>{`
        @media (max-width: 991px) {
          .suria-contact-grid {
            grid-template-columns: 1fr !important;
          }
          .suria-contact-grid > div:first-child {
            padding: 3rem !important;
            order: 2;
          }
          .suria-contact-grid > div:last-child {
            padding: 3rem !important;
            order: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default ContactSuria;
