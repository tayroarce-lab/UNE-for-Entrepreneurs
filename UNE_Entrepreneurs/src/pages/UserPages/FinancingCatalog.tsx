// ============================================================
// Página Usuario — Catálogo de Financiamientos — UNE
// ============================================================
import { useState, useEffect, useCallback } from 'react';
import { Search, Trash2, Pin } from 'lucide-react';
import type { FinancingProgram, FinancingType, UserProfile } from '../../types/financing';
import { FINANCING_TYPES, REGIONS } from '../../types/financing';
import { getFinancingPrograms } from '../../services/FinancingService';
import { checkEligibility } from '../../utils/financingUtils';
import FinancingCard from '../../components/Financing/FinancingCard';
import FinancingNavbar from '../../components/Financing/FinancingNavbar';
import FinancingFooter from '../../components/Financing/FinancingFooter';
import EligibilityModal from '../../components/Financing/EligibilityModal';
import '../../styles/financing.css';

export default function UserFinancingCatalog() {
  // Data
  const [programs, setPrograms] = useState<FinancingProgram[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<FinancingType | ''>('');
  const [filterRegion, setFilterRegion] = useState('');
  const [filterTags, setFilterTags] = useState<string[]>([]);
  const [filterMinAmount, setFilterMinAmount] = useState<string>('');
  const [filterMaxAmount, setFilterMaxAmount] = useState<string>('');

  // Pagination
  const [page, setPage] = useState(1);
  const limit = 6;

  // Modals
  const [eligibilityProgram, setEligibilityProgram] = useState<FinancingProgram | null>(null);
  const [suggestions, setSuggestions] = useState<FinancingProgram[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const fetchPrograms = useCallback(async () => {
    setLoading(true);
    try {
      const filters: Record<string, string | number> = {
        _page: page,
        _limit: limit,
      };
      if (searchQuery) filters.q = searchQuery;
      if (filterType) filters.type = filterType;
      if (filterRegion) filters.region = filterRegion;
      if (filterTags.length > 0) filters.tags_like = filterTags[0];
      if (filterMinAmount) filters.minAmount_gte = Number(filterMinAmount);
      if (filterMaxAmount) filters.maxAmount_lte = Number(filterMaxAmount);

      const result = await getFinancingPrograms(filters);
      setPrograms(result.data);
      setTotal(result.total);
    } catch (error) {
      console.error('Error al cargar programas:', error);
    } finally {
      setLoading(false);
    }
  }, [page, searchQuery, filterType, filterRegion, filterTags, filterMinAmount, filterMaxAmount]);

  useEffect(() => {
    fetchPrograms();
  }, [fetchPrograms]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchPrograms();
  };

  const clearFilters = () => {
    setSearchQuery('');
    setFilterType('');
    setFilterRegion('');
    setFilterTags([]);
    setFilterMinAmount('');
    setFilterMaxAmount('');
    setPage(1);
  };

  const toggleTag = (tag: string) => {
    if (filterTags.includes(tag)) {
      setFilterTags(filterTags.filter((t) => t !== tag));
    } else {
      setFilterTags([...filterTags, tag]);
    }
    setPage(1);
  };

  // Sugerencias personalizadas — fuzzy match por tags/sectores
  const handleShowSuggestions = async (profile: UserProfile) => {
    try {
      const allResult = await getFinancingPrograms({ _limit: 50 });
      const allPrograms = allResult.data.filter(
        (p) => p.id !== eligibilityProgram?.id && p.status === 'active'
      );

      // Ordenar por coincidencia de elegibilidad
      const scored = allPrograms.map((p) => {
        const check = checkEligibility(profile, p.eligibility);
        let score = 0;
        if (check.result === 'qualifies') score = 3;
        else if (check.result === 'possibly') score = 2;

        // Bonus por coincidencia de tags
        if (profile.sector) {
          const sectorMatch = p.tags.some(
            (t) => t.toLowerCase().includes(profile.sector!.toLowerCase())
          );
          if (sectorMatch) score += 1;
        }

        return { program: p, score };
      });

      scored.sort((a, b) => b.score - a.score);
      setSuggestions(scored.slice(0, 3).map((s) => s.program));
      setShowSuggestions(true);
    } catch (error) {
      console.error('Error al obtener sugerencias:', error);
    }
  };

  const totalPages = Math.ceil(total / limit);
  const availableTags = [
    'pymes', 'capitalTrabajo', 'agricultura', 'mujer', 'joven',
    'tecnología', 'exportación', 'turismo', 'microempresa',
  ];

  return (
    <>
      <FinancingNavbar />

      {/* Hero Section */}
      <section className="financingHero" id="financingHero">
        <span className="financingHeroSubtitle">
          UNA INICIATIVA CONJUNTA DE &nbsp;|&nbsp; FINANCIAPYME CR &amp; UNE COSTA RICA
        </span>
        <h1 className="financingHeroTitle">
          Encuentre el financiamiento ideal para su negocio
        </h1>
        <form className="financingSearchBar" onSubmit={handleSearch} role="search">
          <input
            type="text"
            className="financingSearchInput"
            placeholder="Buscar por banco, tipo de crédito o sector..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            id="financingSearchInput"
            aria-label="Buscar financiamiento"
          />
          <button type="submit" className="financingSearchButton" id="financingSearchBtn">
            Buscar
          </button>
        </form>
      </section>

      {/* Main Layout */}
      <div className="financingLayout">
        {/* Sidebar Filters */}
        <aside className="financingFilters" role="complementary" aria-label="Filtros">
          <h2 className="financingFiltersTitle">Filtros</h2>

          {/* Tipo */}
          <div className="financingFilterGroup">
            <label className="financingFilterLabel">Tipo de Financiamiento</label>
            <div className="financingFilterCheckboxes">
              {Object.entries(FINANCING_TYPES).map(([key, label]) => (
                <label key={key}>
                  <input
                    type="radio"
                    name="filterType"
                    checked={filterType === key}
                    onChange={() => {
                      setFilterType(filterType === key ? '' : key as FinancingType);
                      setPage(1);
                    }}
                  />
                  {label}
                </label>
              ))}
            </div>
          </div>

          {/* Región */}
          <div className="financingFilterGroup">
            <label className="financingFilterLabel" htmlFor="filterRegion">
              Región
            </label>
            <select
              id="filterRegion"
              className="financingFilterSelect"
              value={filterRegion}
              onChange={(e) => {
                setFilterRegion(e.target.value);
                setPage(1);
              }}
            >
              <option value="">Todas las regiones</option>
              {REGIONS.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>

          {/* Monto */}
          <div className="financingFilterGroup">
            <label className="financingFilterLabel">Monto del Préstamo (₡)</label>
            <div className="financingFilterRange">
              <input
                type="number"
                placeholder="Desde"
                value={filterMinAmount}
                onChange={(e) => {
                  setFilterMinAmount(e.target.value);
                  setPage(1);
                }}
                aria-label="Monto mínimo"
              />
              <span>—</span>
              <input
                type="number"
                placeholder="Hasta"
                value={filterMaxAmount}
                onChange={(e) => {
                  setFilterMaxAmount(e.target.value);
                  setPage(1);
                }}
                aria-label="Monto máximo"
              />
            </div>
          </div>

          {/* Sector Comercial (tags) */}
          <div className="financingFilterGroup">
            <label className="financingFilterLabel">Sector / Etiquetas</label>
            <div className="financingFilterCheckboxes">
              {availableTags.map((tag) => (
                <label key={tag}>
                  <input
                    type="checkbox"
                    checked={filterTags.includes(tag)}
                    onChange={() => toggleTag(tag)}
                  />
                  {tag.charAt(0).toUpperCase() + tag.slice(1)}
                </label>
              ))}
            </div>
          </div>

          <button className="financingClearFilters" onClick={clearFilters} id="clearFiltersBtn" style={{ display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'center' }}>
            <Trash2 size={16} /> Limpiar Filtros
          </button>
        </aside>

        {/* Results */}
        <main className="financingMainContent" role="main">
          <div className="financingResultsHeader">
            <span className="financingResultsCount">
              Mostrando <strong>{total}</strong> resultados encontrados
            </span>
            <div className="financingSort">
              <span>Ordenar por:</span>
              <select aria-label="Ordenar por">
                <option value="relevance">Relevancia</option>
                <option value="amount_asc">Monto (menor a mayor)</option>
                <option value="amount_desc">Monto (mayor a menor)</option>
                <option value="date">Más recientes</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="financingLoading">
              <div className="financingSpinner" />
              <span className="financingLoadingText">Buscando programas de financiamiento...</span>
            </div>
          ) : programs.length === 0 ? (
            <div className="financingEmptyState">
              <div className="financingEmptyStateIcon"><Search size={48} color="var(--textMuted)" /></div>
              <div className="financingEmptyStateTitle">
                No se encontraron programas
              </div>
              <p className="financingEmptyStateText">
                Intente con otros términos de búsqueda o ajuste los filtros.
              </p>
              <button className="financingBtn financingBtnSecondary" onClick={clearFilters}>
                Limpiar filtros
              </button>
            </div>
          ) : (
            <>
              <div className="financingCardsGrid">
                {programs.map((program) => (
                  <FinancingCard
                    key={program.id}
                    program={program}
                    onCheckEligibility={setEligibilityProgram}
                  />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="financingPagination">
                  <button
                    className="financingPaginationBtn"
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                  >
                    ← Anterior
                  </button>
                  {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                    const pageNum = page <= 3
                      ? i + 1
                      : page >= totalPages - 2
                        ? totalPages - 4 + i
                        : page - 2 + i;
                    if (pageNum < 1 || pageNum > totalPages) return null;
                    return (
                      <button
                        key={pageNum}
                        className={`financingPaginationBtn ${pageNum === page ? 'active' : ''}`}
                        onClick={() => setPage(pageNum)}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                  <button
                    className="financingPaginationBtn"
                    disabled={page === totalPages}
                    onClick={() => setPage(page + 1)}
                  >
                    Siguiente →
                  </button>
                </div>
              )}
            </>
          )}

          {/* Suggestions after eligibility check */}
          {showSuggestions && suggestions.length > 0 && (
            <section className="financingSuggestionsSection">
              <h2 className="financingSuggestionsTitle" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Pin size={20} color="var(--uneGold)" /> Programas sugeridos para su perfil
              </h2>
              <div className="financingSuggestionsGrid">
                {suggestions.map((prog) => (
                  <FinancingCard key={prog.id} program={prog} />
                ))}
              </div>
            </section>
          )}
        </main>
      </div>

      {/* Testimonial Section */}
      <section className="financingTestimonialSection" id="testimonialSection">
        <div className="financingTestimonialImage">
          <div
            style={{
              width: '100%',
              height: '300px',
              background: 'linear-gradient(135deg, var(--uneRed), var(--uneGold))',
              borderRadius: 'var(--radiusLg)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontSize: '1rem',
              fontWeight: 600,
              padding: '2rem',
              textAlign: 'center',
            }}
          >
            🏢 EMPRESARIA<br />COSTARRICENSE
          </div>
        </div>
        <div>
          <span className="financingTestimonialLabel">CASO DE ÉXITO</span>
          <h3 className="financingTestimonialQuote">
            "Gracias a FinanciaPyme CR, logramos expandir nuestro taller de artesanías en Cartago."
          </h3>
          <p className="financingTestimonialText">
            "Encontramos el crédito del BNCR que mejor se ajustaba a nuestro flujo de caja. El
            proceso de comparación fue transparente y muy sencillo gracias a la plataforma
            impulsada por UNE Costa Rica."
          </p>
          <p className="financingTestimonialAuthor">
            — <strong>María Fernanda Quesada</strong>, Fundadora de EcoArte CR
          </p>
        </div>
      </section>

      {/* Eligibility Modal */}
      {eligibilityProgram && (
        <EligibilityModal
          program={eligibilityProgram}
          onClose={() => setEligibilityProgram(null)}
          onShowSuggestions={handleShowSuggestions}
        />
      )}

      <FinancingFooter />
    </>
  );
}
