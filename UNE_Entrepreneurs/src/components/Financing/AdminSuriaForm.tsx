// ============================================================
// Formulario Admin de Programa de Financiamiento — UNE
// ============================================================
import { useState, useEffect } from 'react';
import { Pencil, PlusCircle, FileText, DollarSign, Link2, Phone, CheckSquare, FileCheck, Tags, Calendar, Paperclip, Save, AlertTriangle, X } from 'lucide-react';
import type { FinancingProgram, FinancingType, FinancingStatus, LegalStatus } from '../../types/financing';
import { FINANCING_TYPES, REGIONS, SECTORS } from '../../types/financing';
import { isValidUrl, sanitizeHtml } from '../../utils/financingUtils';

interface AdminSuriaFormProps {
  program?: FinancingProgram | null;
  onSave: (program: Omit<FinancingProgram, 'id'> & { id?: string }) => void;
  onCancel: () => void;
  loading?: boolean;
}

interface FormErrors {
  [key: string]: string;
}

const emptyProgram: Omit<FinancingProgram, 'id'> = {
  name: '',
  type: 'loan',
  amountRange: '',
  minAmount: 0,
  maxAmount: 0,
  eligibility: {
    regions: [],
    sectors: [],
    minRevenue: null,
    maxEmployees: null,
    legalStatus: 'any',
  },
  requirements: [''],
  region: '',
  applicationLink: '',
  howToApply: '',
  contact: { email: '', phone: '' },
  tags: [],
  status: 'active',
  lastVerified: new Date().toISOString().split('T')[0],
  sourceUrl: '',
  notes: '',
  attachments: [],
};

export default function AdminSuriaForm({
  program,
  onSave,
  onCancel,
  loading = false,
}: AdminSuriaFormProps) {
  const [formData, setFormData] = useState<Omit<FinancingProgram, 'id'> & { id?: string }>(
    program ? { ...program } : { ...emptyProgram }
  );
  const [errors, setErrors] = useState<FormErrors>({});
  const [tagInput, setTagInput] = useState('');

  useEffect(() => {
    if (program) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData({ ...program });
    }
  }, [program]);

  // ---- Validaciones ----
  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) newErrors.name = 'El nombre es obligatorio';
    if (!formData.type) newErrors.type = 'El tipo es obligatorio';
    if (!formData.region) newErrors.region = 'La región es obligatoria';
    if (!formData.applicationLink.trim()) {
      newErrors.applicationLink = 'El enlace de aplicación es obligatorio';
    } else if (!isValidUrl(formData.applicationLink)) {
      newErrors.applicationLink = 'Ingrese una URL válida (https://...)';
    }
    if (!formData.sourceUrl.trim()) {
      newErrors.sourceUrl = 'La URL de fuente es obligatoria';
    } else if (!isValidUrl(formData.sourceUrl)) {
      newErrors.sourceUrl = 'Ingrese una URL válida (https://...)';
    }
    if (!formData.amountRange.trim()) {
      newErrors.amountRange = 'El rango de monto es obligatorio';
    }
    if (formData.minAmount < 0) newErrors.minAmount = 'El monto mínimo no puede ser negativo';
    if (formData.maxAmount < 0) newErrors.maxAmount = 'El monto máximo no puede ser negativo';
    if (formData.minAmount > formData.maxAmount && formData.maxAmount > 0) {
      newErrors.minAmount = 'El monto mínimo debe ser menor o igual al máximo';
    }
    if (!formData.howToApply.trim()) {
      newErrors.howToApply = 'Las instrucciones de aplicación son obligatorias';
    }
    if (!formData.contact.email.trim()) {
      newErrors.contactEmail = 'El correo de contacto es obligatorio';
    }

    // lastVerified no puede ser mayor a hoy
    if (formData.lastVerified) {
      const verifiedDate = new Date(formData.lastVerified);
      const today = new Date();
      today.setHours(23, 59, 59, 999);
      if (verifiedDate > today) {
        newErrors.lastVerified = 'La fecha de verificación no puede ser mayor a hoy';
      }
    }

    if (
      formData.eligibility.regions.length === 0 &&
      formData.eligibility.sectors.length === 0 &&
      !formData.eligibility.minRevenue &&
      !formData.eligibility.maxEmployees
    ) {
      newErrors.eligibility =
        'Debe definir al menos un criterio de elegibilidad (región, sector, ingresos o empleados)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Sanitizar campos de texto libre
    const sanitized = {
      ...formData,
      howToApply: sanitizeHtml(formData.howToApply),
      notes: formData.notes ? sanitizeHtml(formData.notes) : '',
    };
    onSave(sanitized);
  };

  // ---- Handlers de campos complejos ----
  const updateField = <K extends keyof typeof formData>(
    key: K,
    value: (typeof formData)[K]
  ) => {
    setFormData({ ...formData, [key]: value });
    if (errors[key as string]) {
      const newErrors = { ...errors };
      delete newErrors[key as string];
      setErrors(newErrors);
    }
  };

  const addTag = () => {
    const tag = tagInput.trim().toLowerCase();
    if (tag && !formData.tags.includes(tag)) {
      updateField('tags', [...formData.tags, tag]);
    }
    setTagInput('');
  };

  const removeTag = (tag: string) => {
    updateField('tags', formData.tags.filter((t) => t !== tag));
  };

  const addRequirement = () => {
    updateField('requirements', [...formData.requirements, '']);
  };

  const updateRequirement = (index: number, value: string) => {
    const updated = [...formData.requirements];
    updated[index] = value;
    updateField('requirements', updated);
  };

  const removeRequirement = (index: number) => {
    const updated = formData.requirements.filter((_, i) => i !== index);
    updateField('requirements', updated.length === 0 ? [''] : updated);
  };

  const toggleEligibilitySector = (sector: string) => {
    const sectors = formData.eligibility.sectors.includes(sector)
      ? formData.eligibility.sectors.filter((s) => s !== sector)
      : [...formData.eligibility.sectors, sector];
    updateField('eligibility', { ...formData.eligibility, sectors });
  };

  const toggleEligibilityRegion = (region: string) => {
    const regions = formData.eligibility.regions.includes(region)
      ? formData.eligibility.regions.filter((r) => r !== region)
      : [...formData.eligibility.regions, region];
    updateField('eligibility', { ...formData.eligibility, regions });
  };

  const addAttachment = () => {
    updateField('attachments', [...(formData.attachments ?? []), { name: '', url: '' }]);
  };

  const updateAttachment = (index: number, field: 'name' | 'url', value: string) => {
    const updated = [...(formData.attachments ?? [])];
    updated[index] = { ...updated[index], [field]: value };
    updateField('attachments', updated);
  };

  const removeAttachment = (index: number) => {
    updateField('attachments', (formData.attachments ?? []).filter((_, i) => i !== index));
  };

  return (
    <div className="financingModal" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div className="financingModalHeader">
        <h2 className="financingModalTitle" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {program ? <Pencil size={22} color="var(--uneGold)" /> : <PlusCircle size={22} color="var(--uneGold)" />}
          {program ? 'Editar Modelo Suria' : 'Nuevo Modelo Suria'}
        </h2>
        <button className="financingModalClose" onClick={onCancel} aria-label="Cerrar">
          <X size={20} />
        </button>
      </div>

      <form onSubmit={handleSubmit} id="adminFinancingForm">
        <div className="financingModalBody">
          {/* ---- Información Básica ---- */}
          <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--uneRed)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <FileText size={18} /> Información Básica
          </h3>

          <div className="financingFormGroup">
            <label className="financingFormLabel" htmlFor="progName">
              Nombre del Programa <span className="financingFormRequired">*</span>
            </label>
            <input
              id="progName"
              type="text"
              className="financingFormInput"
              value={formData.name}
              onChange={(e) => updateField('name', e.target.value)}
              placeholder="Ej: Crédito Pyme Banco Nacional"
            />
            {errors.name && <span className="financingFormError"><AlertTriangle size={14} style={{ display:'inline', verticalAlign:'middle' }}/> {errors.name}</span>}
          </div>

          <div className="financingFormRow">
            <div className="financingFormGroup">
              <label className="financingFormLabel" htmlFor="progType">
                Tipo <span className="financingFormRequired">*</span>
              </label>
              <select
                id="progType"
                className="financingFormSelect"
                value={formData.type}
                onChange={(e) => updateField('type', e.target.value as FinancingType)}
              >
                {Object.entries(FINANCING_TYPES).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
              {errors.type && <span className="financingFormError"><AlertTriangle size={14} style={{ display:'inline', verticalAlign:'middle' }}/> {errors.type}</span>}
            </div>

            <div className="financingFormGroup">
              <label className="financingFormLabel" htmlFor="progStatus">
                Estado
              </label>
              <select
                id="progStatus"
                className="financingFormSelect"
                value={formData.status}
                onChange={(e) => updateField('status', e.target.value as FinancingStatus)}
              >
                <option value="active">Activo</option>
                <option value="closed">Cerrado</option>
                <option value="upcoming">Próximamente</option>
              </select>
            </div>
          </div>

          {formData.status === 'closed' && (
            <div className="financingFormGroup financingCloseReasonInput">
              <label className="financingFormLabel" htmlFor="progClosedReason">
                Razón de cierre
              </label>
              <input
                id="progClosedReason"
                type="text"
                className="financingFormInput"
                value={formData.closedReason ?? ''}
                onChange={(e) => updateField('closedReason', e.target.value)}
                placeholder="Ej: Convocatoria finalizada, fondos agotados..."
              />
            </div>
          )}

          <div className="financingFormGroup">
            <label className="financingFormLabel" htmlFor="progRegion">
              Región <span className="financingFormRequired">*</span>
            </label>
            <select
              id="progRegion"
              className="financingFormSelect"
              value={formData.region}
              onChange={(e) => updateField('region', e.target.value)}
            >
              <option value="">Seleccionar región...</option>
              {REGIONS.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
            {errors.region && <span className="financingFormError"><AlertTriangle size={14} style={{ display:'inline', verticalAlign:'middle' }}/> {errors.region}</span>}
          </div>

          {/* ---- Montos ---- */}
          <h3 style={{ fontSize: '1rem', fontWeight: 700, margin: '1.5rem 0 1rem', color: 'var(--uneRed)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <DollarSign size={18} /> Montos
          </h3>

          <div className="financingFormGroup">
            <label className="financingFormLabel" htmlFor="progAmountRange">
              Rango de Monto (texto) <span className="financingFormRequired">*</span>
            </label>
            <input
              id="progAmountRange"
              type="text"
              className="financingFormInput"
              value={formData.amountRange}
              onChange={(e) => updateField('amountRange', e.target.value)}
              placeholder="Ej: ₡1,000,000 - ₡50,000,000"
            />
            {errors.amountRange && <span className="financingFormError"><AlertTriangle size={14} style={{ display:'inline', verticalAlign:'middle' }}/> {errors.amountRange}</span>}
          </div>

          <div className="financingFormRow">
            <div className="financingFormGroup">
              <label className="financingFormLabel" htmlFor="progMinAmount">
                Monto Mínimo (₡)
              </label>
              <input
                id="progMinAmount"
                type="number"
                className="financingFormInput"
                value={formData.minAmount || ''}
                onChange={(e) => updateField('minAmount', Number(e.target.value) || 0)}
                placeholder="1000000"
              />
              {errors.minAmount && <span className="financingFormError"><AlertTriangle size={14} style={{ display:'inline', verticalAlign:'middle' }}/> {errors.minAmount}</span>}
            </div>
            <div className="financingFormGroup">
              <label className="financingFormLabel" htmlFor="progMaxAmount">
                Monto Máximo (₡)
              </label>
              <input
                id="progMaxAmount"
                type="number"
                className="financingFormInput"
                value={formData.maxAmount || ''}
                onChange={(e) => updateField('maxAmount', Number(e.target.value) || 0)}
                placeholder="50000000"
              />
              {errors.maxAmount && <span className="financingFormError"><AlertTriangle size={14} style={{ display:'inline', verticalAlign:'middle' }}/> {errors.maxAmount}</span>}
            </div>
          </div>

          {/* ---- Enlaces ---- */}
          <h3 style={{ fontSize: '1rem', fontWeight: 700, margin: '1.5rem 0 1rem', color: 'var(--uneRed)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Link2 size={18} /> Enlaces y Fuentes
          </h3>

          <div className="financingFormGroup">
            <label className="financingFormLabel" htmlFor="progAppLink">
              Enlace de Aplicación Oficial <span className="financingFormRequired">*</span>
            </label>
            <input
              id="progAppLink"
              type="url"
              className="financingFormInput"
              value={formData.applicationLink}
              onChange={(e) => updateField('applicationLink', e.target.value)}
              placeholder="https://www.bncr.fi.cr/mi-negocio/emprende"
            />
            {errors.applicationLink && (
              <span className="financingFormError"><AlertTriangle size={14} style={{ display:'inline', verticalAlign:'middle' }}/> {errors.applicationLink}</span>
            )}
          </div>

          <div className="financingFormGroup">
            <label className="financingFormLabel" htmlFor="progSourceUrl">
              URL de Fuente Oficial <span className="financingFormRequired">*</span>
            </label>
            <input
              id="progSourceUrl"
              type="url"
              className="financingFormInput"
              value={formData.sourceUrl}
              onChange={(e) => updateField('sourceUrl', e.target.value)}
              placeholder="https://www.bncr.fi.cr/mi-negocio/emprende"
            />
            {errors.sourceUrl && <span className="financingFormError"><AlertTriangle size={14} style={{ display:'inline', verticalAlign:'middle' }}/> {errors.sourceUrl}</span>}
            <span className="financingFormHint">
              URL de la página oficial de donde se obtuvo la información del programa.
            </span>
          </div>

          <div className="financingFormGroup">
            <label className="financingFormLabel" htmlFor="progHowToApply">
              Cómo Aplicar <span className="financingFormRequired">*</span>
            </label>
            <textarea
              id="progHowToApply"
              className="financingFormTextarea"
              value={formData.howToApply}
              onChange={(e) => updateField('howToApply', e.target.value)}
              placeholder="Describa los pasos para aplicar..."
              rows={3}
            />
            {errors.howToApply && <span className="financingFormError"><AlertTriangle size={14} style={{ display:'inline', verticalAlign:'middle' }}/> {errors.howToApply}</span>}
          </div>

          {/* ---- Contacto ---- */}
          <h3 style={{ fontSize: '1rem', fontWeight: 700, margin: '1.5rem 0 1rem', color: 'var(--uneRed)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Phone size={18} /> Contacto del Programa
          </h3>

          <div className="financingFormRow">
            <div className="financingFormGroup">
              <label className="financingFormLabel" htmlFor="progContactEmail">
                Email <span className="financingFormRequired">*</span>
              </label>
              <input
                id="progContactEmail"
                type="email"
                className="financingFormInput"
                value={formData.contact.email}
                onChange={(e) =>
                  updateField('contact', { ...formData.contact, email: e.target.value })
                }
                placeholder="pyme@banco.fi.cr"
              />
              {errors.contactEmail && (
                <span className="financingFormError"><AlertTriangle size={14} style={{ display:'inline', verticalAlign:'middle' }}/> {errors.contactEmail}</span>
              )}
            </div>
            <div className="financingFormGroup">
              <label className="financingFormLabel" htmlFor="progContactPhone">
                Teléfono
              </label>
              <input
                id="progContactPhone"
                type="tel"
                className="financingFormInput"
                value={formData.contact.phone}
                onChange={(e) =>
                  updateField('contact', { ...formData.contact, phone: e.target.value })
                }
                placeholder="+506 22222222"
              />
            </div>
          </div>

          {/* ---- Elegibilidad ---- */}
          <h3 style={{ fontSize: '1rem', fontWeight: 700, margin: '1.5rem 0 1rem', color: 'var(--uneRed)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <CheckSquare size={18} /> Criterios de Elegibilidad
          </h3>

          {errors.eligibility && (
            <div className="financingAlert financingAlertWarning" style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <AlertTriangle size={18} /> {errors.eligibility}
            </div>
          )}

          <div className="financingFormGroup">
            <label className="financingFormLabel">Regiones Elegibles</label>
            <div className="financingFilterCheckboxes" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {REGIONS.map((r) => (
                <label key={r} style={{ minWidth: '120px' }}>
                  <input
                    type="checkbox"
                    checked={formData.eligibility.regions.includes(r)}
                    onChange={() => toggleEligibilityRegion(r)}
                  />
                  {r}
                </label>
              ))}
            </div>
          </div>

          <div className="financingFormGroup">
            <label className="financingFormLabel">Sectores Elegibles</label>
            <div className="financingFilterCheckboxes" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {SECTORS.map((s) => (
                <label key={s} style={{ minWidth: '120px' }}>
                  <input
                    type="checkbox"
                    checked={formData.eligibility.sectors.includes(s)}
                    onChange={() => toggleEligibilitySector(s)}
                  />
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </label>
              ))}
            </div>
            <span className="financingFormHint">
              Dejar vacío si aplica para cualquier sector.
            </span>
          </div>

          <div className="financingFormRow">
            <div className="financingFormGroup">
              <label className="financingFormLabel" htmlFor="progMinRevenue">
                Ingreso Mínimo Requerido (₡)
              </label>
              <input
                id="progMinRevenue"
                type="number"
                className="financingFormInput"
                value={formData.eligibility.minRevenue ?? ''}
                onChange={(e) =>
                  updateField('eligibility', {
                    ...formData.eligibility,
                    minRevenue: e.target.value ? Number(e.target.value) : null,
                  })
                }
                placeholder="Dejar vacío si no aplica"
              />
            </div>
            <div className="financingFormGroup">
              <label className="financingFormLabel" htmlFor="progMaxEmployees">
                Máximo de Empleados
              </label>
              <input
                id="progMaxEmployees"
                type="number"
                className="financingFormInput"
                value={formData.eligibility.maxEmployees ?? ''}
                onChange={(e) =>
                  updateField('eligibility', {
                    ...formData.eligibility,
                    maxEmployees: e.target.value ? Number(e.target.value) : null,
                  })
                }
                placeholder="Dejar vacío si no aplica"
              />
            </div>
          </div>

          <div className="financingFormGroup">
            <label className="financingFormLabel" htmlFor="progLegalStatus">
              Estatus Legal Requerido
            </label>
            <select
              id="progLegalStatus"
              className="financingFormSelect"
              value={formData.eligibility.legalStatus}
              onChange={(e) =>
                updateField('eligibility', {
                  ...formData.eligibility,
                  legalStatus: e.target.value as LegalStatus,
                })
              }
            >
              <option value="any">Cualquiera</option>
              <option value="formal">Solo Formal</option>
              <option value="informal">Solo Informal</option>
            </select>
          </div>

          {/* ---- Requisitos ---- */}
          <h3 style={{ fontSize: '1rem', fontWeight: 700, margin: '1.5rem 0 1rem', color: 'var(--uneRed)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <FileCheck size={18} /> Requisitos de Aplicación
          </h3>

          <div className="financingRequirementsInput">
            {formData.requirements.map((req, index) => (
              <div key={index} className="financingRequirementInputRow">
                <input
                  value={req}
                  onChange={(e) => updateRequirement(index, e.target.value)}
                  placeholder={`Requisito ${index + 1} (ej: RUC, Plan de negocio...)`}
                  aria-label={`Requisito ${index + 1}`}
                />
                <button type="button" onClick={() => removeRequirement(index)} aria-label="Eliminar requisito">
                  <X size={16} />
                </button>
              </div>
            ))}
            <button type="button" className="financingAddItemBtn" onClick={addRequirement}>
              <PlusCircle size={16} /> Agregar requisito
            </button>
          </div>

          {/* ---- Tags ---- */}
          <h3 style={{ fontSize: '1rem', fontWeight: 700, margin: '1.5rem 0 1rem', color: 'var(--uneRed)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Tags size={18} /> Etiquetas
          </h3>

          <div className="financingTagsInput" onClick={() => document.getElementById('tagInputField')?.focus()}>
            {formData.tags.map((tag) => (
              <span key={tag} className="financingTagsInputTag">
                {tag}
                <button
                  type="button"
                  className="financingTagsInputRemove"
                  onClick={() => removeTag(tag)}
                  aria-label={`Eliminar etiqueta ${tag}`}
                >
                  <X size={14} />
                </button>
              </span>
            ))}
            <input
              id="tagInputField"
              className="financingTagsInputField"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addTag();
                }
              }}
              placeholder="Escriba una etiqueta y presione Enter..."
            />
          </div>

          {/* ---- Verificación ---- */}
          <h3 style={{ fontSize: '1rem', fontWeight: 700, margin: '1.5rem 0 1rem', color: 'var(--uneRed)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Calendar size={18} /> Verificación
          </h3>

          <div className="financingFormGroup">
            <label className="financingFormLabel" htmlFor="progLastVerified">
              Fecha de Última Verificación
            </label>
            <input
              id="progLastVerified"
              type="date"
              className="financingFormInput"
              value={formData.lastVerified}
              onChange={(e) => updateField('lastVerified', e.target.value)}
            />
            {errors.lastVerified && (
              <span className="financingFormError"><AlertTriangle size={14} style={{ display:'inline', verticalAlign:'middle' }}/> {errors.lastVerified}</span>
            )}
          </div>

          {/* ---- Notas ---- */}
          <div className="financingFormGroup" style={{ marginTop: '1rem' }}>
            <label className="financingFormLabel" htmlFor="progNotes">
              Notas internas (opcional)
            </label>
            <textarea
              id="progNotes"
              className="financingFormTextarea"
              value={formData.notes ?? ''}
              onChange={(e) => updateField('notes', e.target.value)}
              placeholder="Notas internas para el equipo admin..."
              rows={2}
            />
          </div>

          {/* ---- Adjuntos ---- */}
          <h3 style={{ fontSize: '1rem', fontWeight: 700, margin: '1.5rem 0 1rem', color: 'var(--uneRed)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Paperclip size={18} /> Adjuntos (PDFs opcionales)
          </h3>

          {(formData.attachments ?? []).map((att, index) => (
            <div key={index} className="financingRequirementInputRow" style={{ marginBottom: '0.5rem' }}>
              <input
                value={att.name}
                onChange={(e) => updateAttachment(index, 'name', e.target.value)}
                placeholder="Nombre del archivo"
                style={{ flex: 1 }}
                aria-label={`Nombre adjunto ${index + 1}`}
              />
              <input
                value={att.url}
                onChange={(e) => updateAttachment(index, 'url', e.target.value)}
                placeholder="URL del archivo (ej: /uploads/doc.pdf)"
                style={{ flex: 2 }}
                aria-label={`URL adjunto ${index + 1}`}
              />
              <button type="button" onClick={() => removeAttachment(index)} aria-label="Eliminar adjunto">
                <X size={16} />
              </button>
            </div>
          ))}
          <button type="button" className="financingAddItemBtn" onClick={addAttachment}>
            <PlusCircle size={16} /> Agregar adjunto
          </button>
        </div>

        <div className="financingModalFooter">
          <button
            type="button"
            className="financingBtn financingBtnSecondary"
            onClick={onCancel}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="financingBtn financingBtnPrimary"
            disabled={loading}
            id="saveFinancingBtn"
            style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
          >
             <Save size={16} /> {loading ? 'Guardando...' : program ? 'Actualizar Modelo' : 'Crear Modelo'}
          </button>
        </div>
      </form>
    </div>
  );
}
