// ============================================================
// Tarjeta de Programa de Financiamiento — UNE
// ============================================================
import { Link } from 'react-router-dom';
import { Landmark } from 'lucide-react';
import type { FinancingProgram } from '../../types/financing';
import { FINANCING_TYPES } from '../../types/financing';

interface SuriaCardProps {
  program: FinancingProgram;
  onCheckEligibility?: (program: FinancingProgram) => void;
}

export default function SuriaCard({ program, onCheckEligibility }: SuriaCardProps) {
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
      {/* Header: Bank badge + Tag badges */}
      <div className="financingCardHeader" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '36px', height: '36px', background: 'var(--uneCream)', borderRadius: 'var(--radiusSm)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Landmark size={18} color="var(--uneGold)" />
          </div>
          <span className="financingCardBankBadge">
            {FINANCING_TYPES[program.type]}
          </span>
          {isClosed && (
            <span style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--errorRed)', background: 'var(--errorBg)', padding: '2px 8px', borderRadius: '4px' }}>
              Cerrado
            </span>
          )}
        </div>
        {/* Tags float right in header */}
        <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
          {program.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="financingTag" style={{ fontSize: '0.65rem', padding: '2px 6px' }}>
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Body */}
      <div className="financingCardBody">
        <h3 className="financingCardName">{program.name}</h3>
        <p className="financingCardDescription">
          {program.description
            ? program.description.length > 100
              ? program.description.substring(0, 100) + '...'
              : program.description
            : `Financiamiento para empresas en ${program.region}. ${program.eligibility.legalStatus === 'formal' ? 'Empresa Formal (Tributación).' : 'Asesoramiento Integral.'}`
          }
        </p>

        {/* Financial Metrics — 2 columns like the mockup */}
        <div className="financingCardMeta" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0', borderTop: '1px solid var(--borderLight)', marginTop: '12px', paddingTop: '12px' }}>
          <div className="financingCardMetaItem">
            <span className="financingCardMetaLabel">Monto Mín.</span>
            <span className="financingCardMetaValueSecondary" style={{ fontSize: '1rem', fontWeight: 700 }}>
              {program.minAmount === 0 ? '—' : formatAmount(program.minAmount)}
            </span>
          </div>
          <div className="financingCardMetaItem">
            <span className="financingCardMetaLabel">Monto Máx.</span>
            <span className="financingCardMetaValue" style={{ fontSize: '1rem', fontWeight: 700 }}>
              {formatAmount(program.maxAmount)}
            </span>
          </div>
        </div>
      </div>

      {/* Single CTA button — matching mockup */}
      <div className="financingCardFooter" style={{ padding: '0 1.25rem 1.25rem' }}>
        <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
          <Link
            to={`/financiamiento/${program.id}`}
            className="financingCardCta"
            style={{ flex: 1, textAlign: 'center', textDecoration: 'none' }}
          >
            Detalles
          </Link>
          {onCheckEligibility && !isClosed && (
            <button
              onClick={() => onCheckEligibility(program)}
              className="financingBtn financingBtnSecondary"
              style={{ padding: '8px 12px', fontSize: '0.85rem' }}
            >
              ¿Califico?
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
