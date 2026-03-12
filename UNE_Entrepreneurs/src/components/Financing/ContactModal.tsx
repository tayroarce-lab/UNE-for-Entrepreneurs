// ============================================================
// Modal de Contacto — UNE Costa Rica
// ============================================================
import { useState } from 'react';
import { Mail, CheckCircle2, ChevronRight, Send } from 'lucide-react';
import type { FinancingProgram } from '../../types/financing';
import { createApplication } from '../../services/FinancingService';
import { useAuth } from '../../context/AuthContext';

interface ContactModalProps {
  program: FinancingProgram;
  onClose: () => void;
}

export default function ContactModal({ program, onClose }: ContactModalProps) {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    message: `Hola UNE, me gustaría recibir asesoría para aplicar al programa "${program.name}".`,
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'El nombre es obligatorio';
    if (!formData.email.trim()) newErrors.email = 'El correo es obligatorio';
    if (!formData.message.trim()) newErrors.message = 'Debe incluir un mensaje';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      await createApplication({
        programId: program.id!,
        userId: user?.id,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        createdAt: new Date().toISOString(),
        status: 'new',
      });
      setSubmitted(true);
    } catch (err) {
      console.error('Error al enviar contacto UNE:', err);
      setErrors({ form: 'Ocurrió un error al enviar el mensaje. Intente de nuevo.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="financingModalOverlay"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-labelledby="contactModalTitle"
    >
      <div className="financingModal" style={{ maxWidth: '600px' }}>
        <div className="financingModalHeader">
          <h2 className="financingModalTitle" id="contactModalTitle" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Mail size={22} color="var(--uneGold)" /> Contactar Asesoría UNE
          </h2>
          <button className="financingModalClose" onClick={onClose} aria-label="Cerrar modal">
            ✕
          </button>
        </div>

        <div className="financingModalBody">
          {submitted ? (
            <div className="financingEligibilityResult financingEligibilityQualifies">
              <div className="financingEligibilityResultTitle">
                <CheckCircle2 color="var(--successGreen)" /> ¡Mensaje enviado con éxito!
              </div>
              <p style={{ fontSize: '0.85rem', marginTop: '0.5rem' }}>
                Un consultor de UNE Costa Rica se pondrá en contacto con usted
                pronto al correo <strong>{formData.email}</strong>.
              </p>
              <button
                className="financingBtn financingBtnPrimary"
                onClick={onClose}
                style={{ marginTop: '1rem' }}
              >
                Cerrar
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} id="contactForm">
              <div style={{ background: 'var(--uneCream)', padding: '1rem', borderRadius: 'var(--radiusMd)', marginBottom: '1.5rem', fontSize: '0.85rem' }}>
                <p style={{ fontWeight: 600, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <ChevronRight size={16} /> Sobre nuestro servicio de asesoría
                </p>
                <ul className="financingRequirementsList" style={{ paddingLeft: '1.5rem' }}>
                  <li style={{ display: 'flex', gap: '6px', alignItems: 'center' }}><CheckCircle2 size={14} color="var(--uneGold)" /> Evaluaremos su plan de negocios antes de aplicar.</li>
                  <li style={{ display: 'flex', gap: '6px', alignItems: 'center' }}><CheckCircle2 size={14} color="var(--uneGold)" /> Le ayudaremos a corregir posibles errores de forma gratuita.</li>
                  <li style={{ display: 'flex', gap: '6px', alignItems: 'center' }}><CheckCircle2 size={14} color="var(--uneGold)" /> Aceleraremos el proceso gracias a nuestros convenios.</li>
                </ul>
              </div>

              {errors.form && <div className="financingAlert financingAlertError">{errors.form}</div>}

              <div className="financingFormRow">
                <div className="financingFormGroup">
                  <label className="financingFormLabel" htmlFor="contactName">Nombre completo <span className="financingFormRequired">*</span></label>
                  <input
                    id="contactName"
                    type="text"
                    className="financingFormInput"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                  {errors.name && <span className="financingFormError">⚠ {errors.name}</span>}
                </div>

                <div className="financingFormGroup">
                  <label className="financingFormLabel" htmlFor="contactEmail">Correo electrónico <span className="financingFormRequired">*</span></label>
                  <input
                    id="contactEmail"
                    type="email"
                    className="financingFormInput"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                  {errors.email && <span className="financingFormError">⚠ {errors.email}</span>}
                </div>
              </div>

              <div className="financingFormGroup">
                <label className="financingFormLabel" htmlFor="contactPhone">Teléfono (opcional)</label>
                <input
                  id="contactPhone"
                  type="tel"
                  className="financingFormInput"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+506 8888-8888"
                />
              </div>

              <div className="financingFormGroup">
                <label className="financingFormLabel" htmlFor="contactMessage">Mensaje <span className="financingFormRequired">*</span></label>
                <textarea
                  id="contactMessage"
                  className="financingFormTextarea"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                />
                {errors.message && <span className="financingFormError">⚠ {errors.message}</span>}
              </div>

              <div className="financingModalFooter" style={{ marginTop: '2rem' }}>
                <button
                  type="button"
                  className="financingBtn financingBtnSecondary"
                  onClick={onClose}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="financingBtn financingBtnPrimary"
                  id="submitContactBtn"
                  disabled={loading}
                  style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  <Send size={16} /> {loading ? 'Enviando...' : 'Enviar Mensaje'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
