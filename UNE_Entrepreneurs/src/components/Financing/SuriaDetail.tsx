// ============================================================
// Página de Detalle de Financiamiento — UNE
// ============================================================
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  MapPin, DollarSign, ExternalLink, Clock, BarChart, 
  CheckCircle2, Paperclip, Flag, Heart, PlusCircle, 
  Phone, Mail, Globe, FileText, Handshake, Search, XCircle, CheckCircle, AlertCircle
} from 'lucide-react';
import { toast } from 'sonner';
import type { FinancingProgram } from '../../types/financing';
import { FINANCING_TYPES, FINANCING_STATUS } from '../../types/financing';
import { getFinancingProgramById, addFavorite, addToBudget } from '../../services/FinancingService';
import { formatDate, formatCurrency, sanitizeHtml } from '../../utils/financingUtils';
import { useAuth } from '../../context/AuthContext';
import Navbar from '../Shared/Navbar/Navbar';
import Footer from '../Shared/Footer/Footer';
import EligibilityModal from './EligibilityModal';
import ContactModal from './ContactModal';
import ReportModal from './ReportModal';
import '../../styles/financing.css';

export default function SuriaDetail() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [program, setProgram] = useState<FinancingProgram | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Modals
  const [showEligibility, setShowEligibility] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [showReport, setShowReport] = useState(false);

  // Actions
  const [favorited, setFavorited] = useState(false);
  const [budgetAdded, setBudgetAdded] = useState(false);

  useEffect(() => {
    const fetchProgram = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const data = await getFinancingProgramById(id);
        setProgram(data);
      } catch (err) {
        console.error('Error al cargar programa:', err);
        setError('No se pudo cargar el modelo de financiamiento.');
      } finally {
        setLoading(false);
      }
    };
    fetchProgram();
  }, [id]);



  const handleFavorite = async () => {
    if (!user || !program) return;
    try {
      await addFavorite({
        userId: user.id,
        programId: program.id!,
        createdAt: new Date().toISOString(),
      });
      setFavorited(true);
      toast.success('Modelo guardado en favoritos');
    } catch (err) {
      console.error('Error:', err);
      toast.error('Error al guardar en favoritos');
    }
  };

  const handleAddBudget = async () => {
    if (!user || !program) return;
    try {
      await addToBudget({
        userId: user.id,
        programId: program.id!,
        programName: program.name,
        estimatedAmount: program.maxAmount,
        type: 'income',
        date: new Date().toISOString().split('T')[0],
        note: `Ingreso estimado por modelo: ${program.name}`,
      });
      setBudgetAdded(true);
      toast.success('Modelo agregado al presupuesto simulado');
    } catch (err) {
      console.error('Error:', err);
      toast.error('Error al agregar al presupuesto');
    }
  };
  if (loading) {
    return (
      <>
        <Navbar />
        <div className="financingLoading" style={{ minHeight: '60vh' }}>
          <div className="financingSpinner" />
          <span className="financingLoadingText">Cargando detalle del modelo...</span>
        </div>
      </>
    );
  }

  if (error || !program) {
    return (
      <>
        <Navbar />
        <div className="financingDetailPage">
          <div className="financingAlert financingAlertError" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <XCircle size={18} /> {error || 'Modelo no encontrado'}
          </div>
          <Link to="/financiamiento" className="financingBtn financingBtnSecondary">
            ← Volver al catálogo
          </Link>
        </div>
      </>
    );
  }

  const statusClass =
    program.status === 'active'
      ? 'financingStatusActive'
      : program.status === 'closed'
        ? 'financingStatusClosed'
        : 'financingStatusUpcoming';

  return (
    <>
      <Navbar />

      <div className="financingDetailPage">


        {/* Breadcrumbs */}
        <nav className="financingBreadcrumbs" aria-label="Migas de pan">
          <Link to="/">Inicio</Link>
          <span className="financingBreadcrumbSep">/</span>
          <Link to="/financiamiento">Modelo Suria</Link>
          <span className="financingBreadcrumbSep">/</span>
          <span style={{ color: 'var(--textPrimary)', fontWeight: 600 }}>{program.name}</span>
        </nav>

        {/* Closed Banner */}
        {program.status === 'closed' && (
          <div className="financingClosedBanner" role="alert">
            <span className="financingClosedBannerIcon"><XCircle size={24} color="var(--errorRed)" /></span>
            <div>
              <span className="financingClosedBannerText">
                Convocatoria Cerrada
              </span>
              {program.closedReason && (
                <span className="financingClosedBannerReason">
                  {' '}— {program.closedReason}
                </span>
              )}
            </div>
          </div>
        )}

        <div className="financingDetailGrid">
          {/* Main Content */}
          <div>
            <div className="financingDetailMain">
              <div className="financingDetailHeader">
                <div className="financingDetailIcon">
                  {program.name.charAt(0)}
                </div>
                <div style={{ flex: 1 }}>
                  <div className="financingDetailBadges">
                    <span className="financingDetailBadge financingDetailBadgeType">
                      {FINANCING_TYPES[program.type]}
                    </span>
                    <span className="financingDetailBadge financingDetailBadgeConvenio">
                      CONVENIO UNE
                    </span>
                    <span className={`financingStatusBadge ${statusClass}`}>
                      ● {FINANCING_STATUS[program.status]}
                    </span>
                  </div>
                  <h1 className="financingDetailName" style={{ marginTop: '0.5rem' }}>
                    {program.name}
                  </h1>
                </div>
              </div>

              <div className="financingDetailDescription">
                {sanitizeHtml(program.howToApply)}
              </div>

              <div className="financingDetailMeta">
                <div className="financingDetailMetaItem">
                  <span className="financingDetailMetaIcon"><MapPin size={18} /></span>
                  {program.region}
                </div>
                <div className="financingDetailMetaItem">
                  <span className="financingDetailMetaIcon"><DollarSign size={18} /></span>
                  {program.amountRange}
                </div>
              </div>

              {/* Tags */}
              <div className="financingTagsList" style={{ marginTop: '1rem' }}>
                {program.tags.map((tag) => (
                  <span key={tag} className="financingTag">{tag}</span>
                ))}
              </div>

              {/* Source & Verification */}
              <div className="financingSourceBadge" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <ExternalLink size={14} /> Fuente: <a href={program.sourceUrl} target="_blank" rel="noopener noreferrer">
                  {new URL(program.sourceUrl).hostname}
                </a>
                <span style={{ margin: '0 4px', opacity: 0.5 }}>|</span>
                <CheckCircle2 size={14} color="var(--successGreen)" /> Verificado: {formatDate(program.lastVerified)}
              </div>

              {/* Intermediary copy */}
              <div className="financingIntermediaryCopy">
                <strong>Importante:</strong> UNE Costa Rica actúa como intermediario y facilitador.
                El botón "Ir al sitio oficial para aplicar" le redirigirá a la institución que
                gestiona este programa de financiamiento. UNE puede brindarle apoyo y orientación
                gratuita durante todo el proceso.
              </div>
            </div>

            {/* Benefits Section */}
            <section className="financingBenefitsSection">
              <h2 className="financingBenefitsTitle">Beneficios Principales</h2>
              <div className="financingBenefitsGrid">
                <div className="financingBenefitCard">
                  <div className="financingBenefitIcon"><Clock size={24} color="var(--uneGold)" /></div>
                  <div>
                    <div className="financingBenefitName">Acompañamiento UNE</div>
                    <div className="financingBenefitDesc">
                      Asesoría personalizada de consultores expertos de UNE Costa Rica durante
                      todo el proceso.
                    </div>
                  </div>
                </div>
                <div className="financingBenefitCard">
                  <div className="financingBenefitIcon"><BarChart size={24} color="var(--uneGold)" /></div>
                  <div>
                    <div className="financingBenefitName">Gestión Empresarial</div>
                    <div className="financingBenefitDesc">
                      Acompañamiento en gestión empresarial y financiera para maximizar el
                      impacto del financiamiento.
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Requirements */}
            {program.requirements.length > 0 && (
              <section className="financingRequirementsSection">
                <h2 className="financingRequirementsTitle">Requisitos de Aplicación</h2>
                {program.requirements.map((req, i) => (
                  <div key={i} className="financingRequirementItem">
                    <div className="financingRequirementCheck"><CheckCircle2 size={18} /></div>
                    <div>
                      <div className="financingRequirementText">{req}</div>
                    </div>
                  </div>
                ))}
              </section>
            )}

            {/* Attachments */}
            {program.attachments && program.attachments.length > 0 && (
              <section style={{ marginTop: '1.5rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Paperclip size={18} /> Documentos Adjuntos
                </h3>
                {program.attachments.map((att, i) => (
                  <a
                    key={i}
                    href={att.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="financingBtn financingBtnSecondary financingBtnSm"
                    style={{ marginRight: '0.5rem', marginBottom: '0.5rem', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                  >
                    <FileText size={14} /> {att.name}
                  </a>
                ))}
              </section>
            )}

            {/* Actions row */}
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
              <button
                className="financingBtn financingBtnSecondary financingBtnSm"
                onClick={() => setShowReport(true)}
                id="reportChangeBtn"
                style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <Flag size={14} /> Reportar Cambio
              </button>
              <button
                className="financingBtn financingBtnSecondary financingBtnSm"
                onClick={handleFavorite}
                disabled={favorited || !user}
                id="favoriteBtn"
                style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <Heart size={14} fill={favorited ? "currentColor" : "none"} /> {favorited ? 'Guardado' : 'Guardar en Favoritos'}
              </button>
              <button
                className="financingBtn financingBtnSecondary financingBtnSm"
                onClick={handleAddBudget}
                disabled={budgetAdded || !user}
                id="addBudgetBtn"
                style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                {budgetAdded ? <CheckCircle size={14} /> : <PlusCircle size={14} />} {budgetAdded ? 'Agregado' : 'Agregar al Presupuesto'}
              </button>
            </div>

            {/* Contact Info */}
            <section style={{ marginTop: '2rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Phone size={18} /> Contacto del Programa
              </h3>
              <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                <div className="financingDetailMetaItem" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Mail size={16} color="var(--textMuted)" />
                  <a href={`mailto:${program.contact.email}`}>{program.contact.email}</a>
                </div>
                {program.contact.phone && (
                  <div className="financingDetailMetaItem" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Phone size={16} color="var(--textMuted)" />
                    <a href={`tel:${program.contact.phone}`}>{program.contact.phone}</a>
                  </div>
                )}
                {program.contact.officeUrl && (
                  <div className="financingDetailMetaItem" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Globe size={16} color="var(--textMuted)" />
                    <a href={program.contact.officeUrl} target="_blank" rel="noopener noreferrer">
                      Sitio web
                    </a>
                  </div>
                )}
              </div>
            </section>

            {/* Notes */}
            {program.notes && (
              <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'var(--uneCream)', borderRadius: 'var(--radiusMd)', fontSize: '0.85rem' }}>
                <strong style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}><FileText size={16} /> Notas Internas:</strong> {sanitizeHtml(program.notes)}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="financingDetailSidebar">
            {/* Financial Details Card */}
            <div className="financingDetailFinancialCard">
              <h3 className="financingDetailFinancialTitle">Detalles Financieros</h3>

              <div className="financingDetailFinancialRow">
                <span className="financingDetailFinancialLabel">Tipo</span>
                <span className="financingDetailFinancialValue">
                  {FINANCING_TYPES[program.type]}
                </span>
              </div>
              <div className="financingDetailFinancialRow">
                <span className="financingDetailFinancialLabel">Monto Mínimo</span>
                <span className="financingDetailFinancialValue">
                  {formatCurrency(program.minAmount)}
                </span>
              </div>
              <div className="financingDetailFinancialRow">
                <span className="financingDetailFinancialLabel">Monto Máximo</span>
                <span className="financingDetailFinancialValue">
                  {formatCurrency(program.maxAmount)}
                </span>
              </div>
              <div className="financingDetailFinancialRow">
                <span className="financingDetailFinancialLabel">Región</span>
                <span className="financingDetailFinancialValue">{program.region}</span>
              </div>
              <div className="financingDetailFinancialRow">
                <span className="financingDetailFinancialLabel">Estado</span>
                <span className={`financingStatusBadge ${statusClass}`}>
                  ● {FINANCING_STATUS[program.status]}
                </span>
              </div>

              {/* CTA: Apply */}
              {program.status !== 'closed' ? (
                <>
                  <a
                    href={program.applicationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="financingDetailApplyBtn"
                    id="applyButton"
                  >
                    Ir al sitio oficial para aplicar 
                    <ExternalLink size={16} style={{ marginLeft: '6px', display: 'inline', verticalAlign: 'middle' }} />
                  </a>
                  <p className="financingDetailApplyNote">
                    Sin compromiso. Será redirigido al sitio oficial de la institución financiera.
                  </p>
                </>
              ) : (
                <div
                  className="financingAlert financingAlertWarning"
                  style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  <AlertCircle size={18} /> Convocatoria cerrada. No es posible aplicar en este momento.
                </div>
              )}

              {/* CTA: Check Eligibility */}
              {program.status !== 'closed' && (
                <button
                  className="financingBtn financingBtnGold"
                  style={{ width: '100%', marginTop: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                  onClick={() => setShowEligibility(true)}
                  id="detailCheckEligibilityBtn"
                >
                  <Search size={18} /> Ver si califico
                </button>
              )}
            </div>

            {/* UNE Help Card */}
            <div className="financingUneHelpCard">
              <div className="financingUneHelpIcon"><Handshake size={32} color="var(--uneGold)" /></div>
              <h3 className="financingUneHelpTitle">¿Necesitas ayuda de UNE?</h3>
              <p className="financingUneHelpText">
                Nuestros consultores expertos de UNE Costa Rica pueden ayudarte a preparar tu plan
                de negocios y acompañarte en el proceso.
              </p>
              <button
                className="financingUneHelpBtn"
                onClick={() => setShowContact(true)}
                id="contactUneBtn"
              >
                Contactar Asesoría UNE →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showEligibility && (
        <EligibilityModal
          program={program}
          onClose={() => setShowEligibility(false)}
        />
      )}

      {showContact && (
        <ContactModal
          program={program}
          onClose={() => setShowContact(false)}
        />
      )}

      {showReport && (
        <ReportModal
          programId={program.id!}
          programName={program.name}
          onClose={() => setShowReport(false)}
        />
      )}

      <Footer />
    </>
  );
}
