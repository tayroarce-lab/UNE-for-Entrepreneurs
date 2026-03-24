import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Phone, MapPin, Send, ArrowLeft, Flower2 } from 'lucide-react';
import { toast } from 'sonner';
import { postContacto } from '../../../services/ContactService';
import PremiumModal from '../../Shared/PremiumModal';
import styles from './SuriaApplicationForm.module.css';

const SuriaApplicationForm: React.FC = () => {
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nombre || !formData.telefono || !formData.email || !formData.ubicacion || !formData.negocio || !formData.mensaje) {
      toast.error("Por favor completa todos los campos requeridos.");
      return;
    }

    setLoading(true);

    try {
      await postContacto(formData);

      fetch('https://formsubmit.co/ajax/tarcebfwd@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          _subject: '🔔 Nueva Solicitud de Contacto - Süria',
          Nombre: formData.nombre,
          Teléfono: formData.telefono,
          Email: formData.email,
          Ubicación: formData.ubicacion,
          Negocio: formData.negocio,
          '¿Por qué unirse?': formData.mensaje
        })
      }).catch(err => console.error('FormSubmit Error:', err));

      setShowSuccessModal(true);
      setFormData({
        nombre: '', telefono: '', email: '', ubicacion: '', negocio: '', mensaje: ''
      });
    } catch (error) {
      console.error(error);
      toast.error("Hubo un error procesando tu solicitud.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <button 
            onClick={() => navigate(-1)} 
            className={styles.backBtn}
          >
            <ArrowLeft size={18} /> Volver
          </button>
          <h1 className={styles.title}>Comienza hoy tu historia de <span>éxito</span></h1>
          <p className={styles.subtitle}>
            Completa este formulario y el equipo de UNE se pondrá en contacto contigo para 
            explicarte cómo sumarte al grupo más cercano de tu comunidad.
          </p>
        </div>

        <div className={styles.grid}>
          <div className={styles.infoPanel}>
            <h2 className={styles.infoTitle}>Apoyo <br /><span>Incondicional</span></h2>
            <p className={styles.infoDesc}>
              Al unirte a Süria, no solo recibes capital; recibes a toda una red de mujeres 
              impulsando tu crecimiento.
            </p>

            <div className={styles.contactRows}>
              <div className={styles.contactRow}>
                <div className={styles.iconBox}>
                  <Mail size={22} />
                </div>
                <div className={styles.contactText}>
                  <span className={styles.contactLabel}>EMAIL</span>
                  <span className={styles.contactValue}>info@une.cr</span>
                </div>
              </div>
              <div className={styles.contactRow}>
                <div className={styles.iconBox}>
                  <Phone size={22} />
                </div>
                <div className={styles.contactText}>
                  <span className={styles.contactLabel}>TELÉFONO</span>
                  <span className={styles.contactValue}>+506 2200-0000</span>
                </div>
              </div>
              <div className={styles.contactRow}>
                <div className={styles.iconBox}>
                  <MapPin size={22} />
                </div>
                <div className={styles.contactText}>
                  <span className={styles.contactLabel}>SEDE</span>
                  <span className={styles.contactValue}>San José, Costa Rica</span>
                </div>
              </div>
            </div>

            <div className={styles.decorativeIcon}>
               <Flower2 size={240} strokeWidth={0.5} />
            </div>
          </div>

          <div className={styles.formPanel}>
            <form onSubmit={handleSubmit}>
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label>Nombre completo</label>
                  <input 
                    type="text" 
                    name="nombre" 
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                    placeholder="Tu nombre"
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Teléfono</label>
                  <input 
                    type="tel" 
                    name="telefono" 
                    value={formData.telefono}
                    onChange={handleChange}
                    required
                    placeholder="+506 XXXX-XXXX"
                  />
                </div>
              </div>

              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label>Correo electrónico</label>
                  <input 
                    type="email" 
                    name="email" 
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="tu@email.com"
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Ubicación</label>
                  <input 
                    type="text" 
                    name="ubicacion" 
                    value={formData.ubicacion}
                    onChange={handleChange}
                    required
                    placeholder="Ej. Cartago, Bagaces..."
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label>Descripción del Negocio / Idea</label>
                <input 
                  type="text" 
                  name="negocio" 
                  value={formData.negocio}
                  onChange={handleChange}
                  required
                  placeholder="Contanos un poco de tu emprendimiento"
                />
              </div>

              <div className={styles.formGroup} style={{ marginBottom: '3rem' }}>
                <label>¿Por qué quieres unirte a Süria?</label>
                <textarea 
                  name="mensaje" 
                  value={formData.mensaje}
                  onChange={handleChange}
                  required
                  rows={4}
                  placeholder="Contanos tus metas..."
                ></textarea>
              </div>

              <button 
                type="submit" 
                className={styles.submitBtn} 
                disabled={loading}
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

      <PremiumModal 
        isOpen={showSuccessModal}
        onClose={() => { setShowSuccessModal(false); navigate('/suria'); }}
        title="¡Solicitud Enviada!"
        message="Tu mensaje ha sido recibido con éxito. Muy pronto una asesora de UNE Costa Rica se pondrá en contacto contigo para guiarte en tu proceso hacia Süria."
        type="success"
      />
    </section>
  );
};

export default SuriaApplicationForm;
