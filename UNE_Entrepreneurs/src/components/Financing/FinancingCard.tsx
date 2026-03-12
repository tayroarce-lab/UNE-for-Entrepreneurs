// ============================================================
// Tarjeta de Programa de Financiamiento — UNE
// ============================================================
import { Link } from 'react-router-dom';
import { Landmark, CheckCircle2, ArrowRight } from 'lucide-react';
import type { FinancingProgram } from '../../types/financing';
import { FINANCING_TYPES } from '../../types/financing';

interface FinancingCardProps {
  program: FinancingProgram;
  onCheckEligibility?: (program: FinancingProgram) => void;
}

export default function FinancingCard({ program, onCheckEligibility }: FinancingCardProps) {
  const formatAmount = (num: number) => {
    return new Intl.NumberFormat('es-CR', {
      style: 'currency',
      currency: 'CRC',
      maximumFractionDigits: 0,
    }).format(num);
  };

  const isClosed = program.status === 'closed';

  return (
    <article
      className="financingCard"
      style={{ opacity: isClosed ? 0.75 : 1 }}
      aria-label={`Programa de financiamiento: ${program.name}`}
    >
      <div className="financingCardHeader">
        <div className="financingCardBankIcon">
          <Landmark size={24} color="var(--uneGold)" />
        </div>
        <div style={{ flex: 1 }}>
          <span className="financingCardBankBadge">
            {FINANCING_TYPES[program.type]}
          </span>
          <h3 className="financingCardTitle">{program.name}</h3>
        </div>
      </div>

      <div className="financingCardBody">
        <div className="financingCardAmount">
          <span className="financingCardAmountLabel">Monto</span>
          <div className="financingCardAmountValue">
            {program.minAmount === 0
              ? `Hasta ${formatAmount(program.maxAmount)}`
              : `${formatAmount(program.minAmount)} - ${formatAmount(program.maxAmount)}`}
          </div>
        </div>

        <ul className="financingCardFeatures">
          <li>
            <CheckCircle2 size={16} className="text-uneGold" style={{ flexShrink: 0, color: 'var(--uneGold)' }} />
            <span>Región: {program.region}</span>
          </li>
          <li>
            <CheckCircle2 size={16} className="text-uneGold" style={{ flexShrink: 0, color: 'var(--uneGold)' }} />
            <span>
              Empresa {program.eligibility.legalStatus === 'formal' ? 'Formal (Tributación)' : 'Asesoramiento Integral'}
            </span>
          </li>
          <li>
            <CheckCircle2 size={16} className="text-uneGold" style={{ flexShrink: 0, color: 'var(--uneGold)' }} />
            <span>
              {program.type === 'loan' ? 'Requiere Análisis de Crédito' : 'Requiere Presentar Proyecto'}
            </span>
          </li>
        </ul>

        {/* Tags */}
        <div className="financingTagsList">
          {program.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="financingTag" style={{ fontSize: '0.7rem', padding: '0.15rem 0.4rem' }}>
              {tag}
            </span>
          ))}
          {program.tags.length > 3 && (
            <span className="financingTag" style={{ fontSize: '0.7rem' }}>
              +{program.tags.length - 3}
            </span>
          )}
        </div>
      </div>

      <div className="financingCardFooter">
        <Link
          to={`/financiamiento/${program.id}`}
          className="financingBtn financingBtnSecondary financingBtnSm"
        >
          Ver Detalles
        </Link>
        {!isClosed && onCheckEligibility && (
          <button
            className="financingBtn financingBtnPrimary financingBtnSm"
            style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
            onClick={() => onCheckEligibility(program)}
            aria-label={`Verificar elegibilidad para ${program.name}`}
          >
            Ver si califico <ArrowRight size={14} />
          </button>
        )}
        {isClosed && (
          <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--errorRed)', marginLeft: 'auto' }}>
            Cerrado
          </span>
        )}
      </div>
    </article>
  );
}
