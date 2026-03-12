// ============================================================
// Modal de Reportar Cambio — UNE
// ============================================================
import { useState } from 'react';
import { Flag, CheckCircle2, AlertTriangle, Send } from 'lucide-react';
import { toast } from 'sonner';
import { createReport } from '../../services/FinancingService';
import { useAuth } from '../../context/AuthContext';

interface ReportModalProps {
  programId: string;
  programName: string;
  onClose: () => void;
}

export default function ReportModal({ programId, programName, onClose }: ReportModalProps) {
  const { user } = useAuth();
  const [note, setNote] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!note.trim()) {
      setError('Por favor describa el cambio o error que encontró.');
      return;
    }

    setLoading(true);
    try {
      await createReport({
        programId,
        userId: user?.id,
        note: note.trim(),
        createdAt: new Date().toISOString(),
      });
      toast.success('Reporte enviado con éxito');
      setSubmitted(true);
    } catch (err) {
      console.error('Error al enviar reporte:', err);
      setError('Error al enviar el reporte. Intente de nuevo.');
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
      aria-label="Reportar cambio"
    >
      <div className="financingModal" style={{ maxWidth: '500px' }}>
        <div className="financingModalHeader">
          <h2 className="financingModalTitle" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Flag size={20} color="var(--errorRed)" /> Reportar Cambio
          </h2>
          <button className="financingModalClose" onClick={onClose} aria-label="Cerrar">
            ✕
          </button>
        </div>

        <div className="financingModalBody">
          {submitted ? (
            <div className="financingEligibilityResult financingEligibilityQualifies">
              <div className="financingEligibilityResultTitle">
                <CheckCircle2 color="var(--successGreen)" /> Reporte enviado
              </div>
              <p style={{ fontSize: '0.85rem', marginTop: '0.5rem' }}>
                Gracias por informarnos. Nuestro equipo revisará la información de "
                {programName}" y actualizará los datos.
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
            <form onSubmit={handleSubmit} id="reportForm">
              <p style={{ fontSize: '0.85rem', color: 'var(--textSecondary)', marginBottom: '1rem' }}>
                ¿Encontró información desactualizada o incorrecta en el programa "
                <strong>{programName}</strong>"? Ayúdenos a mantener los datos actualizados.
              </p>

              <div className="financingFormGroup">
                <label className="financingFormLabel" htmlFor="reportNote">
                  Descripción del cambio <span className="financingFormRequired">*</span>
                </label>
                <textarea
                  id="reportNote"
                  className="financingFormTextarea"
                  value={note}
                  onChange={(e) => {
                    setNote(e.target.value);
                    setError('');
                  }}
                  placeholder="Ej: El enlace de aplicación ya no funciona, el programa cerró convocatoria..."
                  rows={4}
                />
                {error && <span className="financingFormError" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <AlertTriangle size={14} /> {error}
                </span>}
              </div>

              <button
                type="submit"
                className="financingBtn financingBtnPrimary"
                disabled={loading}
                style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                id="reportSubmitBtn"
              >
                <Send size={16} /> {loading ? 'Enviando...' : 'Enviar Reporte'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
