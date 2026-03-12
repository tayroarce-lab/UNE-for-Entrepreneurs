// ============================================================
// Modal Analizar Elegibilidad — UNE Costa Rica
// ============================================================
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Briefcase, CircleDollarSign, Users, Scale, AlertTriangle, CheckCircle2, XCircle, ArrowRight, Save, LogIn } from 'lucide-react';
import type { FinancingProgram, UserProfile } from '../../types/financing';
import { REGIONS, SECTORS } from '../../types/financing';
import { checkEligibility } from '../../utils/financingUtils';
import { useAuth } from '../../context/AuthContext';

interface EligibilityModalProps {
  program: FinancingProgram;
  onClose: () => void;
  onShowSuggestions?: (profile: UserProfile) => void;
}

export default function EligibilityModal({ program, onClose, onShowSuggestions }: EligibilityModalProps) {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [profile, setProfile] = useState<Partial<UserProfile>>({
    region: user?.region || '',
    sector: user?.sector || '',
    annualRevenue: user?.annualRevenue || null,
    employees: user?.employees || null,
    legalStatus: user?.legalStatus || 'informal',
  });

  const [result, setResult] = useState<ReturnType<typeof checkEligibility> | null>(null);

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    const finalProfile = profile as UserProfile;
    const checkResult = checkEligibility(finalProfile, program.eligibility);
    setResult(checkResult);
  };

  return (
    <div
      className="financingModalOverlay"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-labelledby="eligibilityModalTitle"
    >
      <div className="financingModal" style={{ maxWidth: '600px' }}>
        <div className="financingModalHeader">
          <h2 className="financingModalTitle" id="eligibilityModalTitle" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Search size={22} color="var(--uneGold)" />
            Verificación de Elegibilidad
          </h2>
          <button className="financingModalClose" onClick={onClose} aria-label="Cerrar modal">
            ✕
          </button>
        </div>

        <div className="financingModalBody">
          <p style={{ marginBottom: '1.5rem', fontSize: '0.9rem', color: 'var(--textSecondary)' }}>
            Complete o modifique su perfil empresarial para verificar si cumple con los requisitos del programa: <strong>{program.name}</strong>.
          </p>

          <form onSubmit={handleCheck} id="eligibilityForm">
            <div className="financingFormRow">
              {/* Región */}
              <div className="financingFormGroup">
                <label className="financingFormLabel" htmlFor="profRegion" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <MapPin size={16} /> Región de su negocio <span className="financingFormRequired">*</span>
                </label>
                <select
                  id="profRegion"
                  className="financingFormSelect"
                  value={profile.region || ''}
                  onChange={(e) => setProfile({ ...profile, region: e.target.value })}
                  required
                >
                  <option value="">Seleccione una región...</option>
                  {REGIONS.map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>

              {/* Sector */}
              <div className="financingFormGroup">
                <label className="financingFormLabel" htmlFor="profSector" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Briefcase size={16} /> Sector Comercial <span className="financingFormRequired">*</span>
                </label>
                <select
                  id="profSector"
                  className="financingFormSelect"
                  value={profile.sector || ''}
                  onChange={(e) => setProfile({ ...profile, sector: e.target.value })}
                  required
                >
                  <option value="">Seleccione un sector...</option>
                  {SECTORS.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="financingFormRow">
              <div className="financingFormGroup">
                <label className="financingFormLabel" htmlFor="profRevenue" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <CircleDollarSign size={16} /> Ingreso Anual Estimado (₡)
                </label>
                <input
                  id="profRevenue"
                  type="number"
                  className="financingFormInput"
                  value={profile.annualRevenue || ''}
                  onChange={(e) => setProfile({ ...profile, annualRevenue: Number(e.target.value) || null })}
                  placeholder="Ej: 5000000"
                />
              </div>

              <div className="financingFormGroup">
                <label className="financingFormLabel" htmlFor="profEmployees" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Users size={16} /> Número de Empleados
                </label>
                <input
                  id="profEmployees"
                  type="number"
                  className="financingFormInput"
                  value={profile.employees || ''}
                  onChange={(e) => setProfile({ ...profile, employees: Number(e.target.value) || null })}
                  placeholder="Ej: 5"
                />
              </div>
            </div>

            <div className="financingFormGroup">
              <label className="financingFormLabel" htmlFor="profLegal" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Scale size={16} /> Estatus Legal <span className="financingFormRequired">*</span>
              </label>
              <select
                id="profLegal"
                className="financingFormSelect"
                value={profile.legalStatus}
                onChange={(e) => setProfile({ ...profile, legalStatus: e.target.value as 'formal' | 'informal' })}
                required
              >
                <option value="informal">Informal (No inscrito en Tributación)</option>
                <option value="formal">Formal (Inscrito en Tributación)</option>
              </select>
            </div>

            {/* Resultado de la evaluación */}
            {result && (
              <div
                className={`financingEligibilityResult ${
                  result.result === 'qualifies'
                    ? 'financingEligibilityQualifies'
                    : result.result === 'possibly'
                    ? 'financingEligibilityPossibly'
                    : 'financingEligibilityNo'
                }`}
                role="alert"
              >
                {result.result === 'qualifies' && (
                  <>
                    <div className="financingEligibilityResultTitle">
                      <CheckCircle2 color="var(--successGreen)" />
                      ¡Su negocio parece calificar!
                    </div>
                    <p style={{ marginTop: '0.5rem', fontSize: '0.85rem' }}>
                      Cumple con todos los criterios evaluados. Le recomendamos proceder con la
                      revisión detallada de requisitos o consultar con UNE.
                    </p>
                  </>
                )}

                {result.result === 'possibly' && (
                  <>
                    <div className="financingEligibilityResultTitle">
                      <AlertTriangle color="var(--warningGold)" />
                      Podría calificar (Faltan Datos)
                    </div>
                    <p style={{ marginTop: '0.5rem', fontSize: '0.85rem' }}>
                      Por favor, agregue los siguientes datos a su perfil para un análisis completo:
                    </p>
                    <ul style={{ marginTop: '0.5rem', marginLeft: '1.5rem', fontSize: '0.85rem' }}>
                      {result.missingFields.map((field, i) => (
                        <li key={i}>{field}</li>
                      ))}
                    </ul>
                  </>
                )}

                {result.result === 'does_not_qualify' && (
                  <>
                    <div className="financingEligibilityResultTitle">
                      <XCircle color="var(--errorRed)" />
                      Actualmente no cumple con este programa
                    </div>
                    <p style={{ marginTop: '0.5rem', fontSize: '0.85rem' }}>
                      Razones identificadas:
                    </p>
                    <ul style={{ marginTop: '0.5rem', marginLeft: '1.5rem', fontSize: '0.85rem', color: 'var(--errorRed)' }}>
                      {result.reasons.map((r, i) => (
                        <li key={i}>{r}</li>
                      ))}
                    </ul>
                    {onShowSuggestions && (
                      <div style={{ marginTop: '1rem' }}>
                        <button
                          type="button"
                          className="financingBtn financingBtnSecondary financingBtnSm"
                          onClick={() => {
                            onClose();
                            onShowSuggestions(profile as UserProfile);
                          }}
                          style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
                        >
                          Ver programas similares <ArrowRight size={14} />
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}

            {/* Acciones */}
            <div className="financingModalFooter" style={{ marginTop: '2rem' }}>
              {!user && (
                <button
                  type="button"
                  className="financingBtn financingBtnSecondary"
                  onClick={() => navigate('/login')}
                  style={{ marginRight: 'auto', display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  <LogIn size={16} /> Iniciar Sesión para Guardar
                </button>
              )}
              <button
                type="submit"
                className="financingBtn financingBtnPrimary"
                id="checkEligibilityBtn"
                style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <CheckCircle2 size={16} /> Analizar Elegibilidad
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
