// ============================================================
// Página Admin — Gestión de Financiamientos CRUD — UNE
// ============================================================
import { useState, useEffect, useCallback } from 'react';
import { Landmark, Plus, Search, ClipboardList, Pencil, Copy, CheckCircle, Lock, Trash2, CheckCircle2, AlertCircle } from 'lucide-react';
import type { FinancingProgram, FinancingType, FinancingStatus } from '../../types/financing';
import { FINANCING_TYPES, FINANCING_STATUS, REGIONS } from '../../types/financing';
import {
  getFinancingPrograms,
  createFinancingProgram,
  updateFinancingProgram,
  deleteFinancingProgram,
} from '../../services/FinancingService';
import { formatDate } from '../../utils/financingUtils';
import { useAuth } from '../../context/AuthContext';
import AdminFinancingForm from '../../components/Financing/AdminFinancingForm';
import FinancingNavbar from '../../components/Financing/FinancingNavbar';
import '../../styles/financing.css';

export default function AdminFinancingPage() {
  const { isAdmin, user } = useAuth();

  // State
  const [programs, setPrograms] = useState<FinancingProgram[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingProgram, setEditingProgram] = useState<FinancingProgram | null>(null);
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<FinancingType | ''>('');
  const [filterRegion, setFilterRegion] = useState('');
  const [filterStatus, setFilterStatus] = useState<FinancingStatus | ''>('');

  // Pagination
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 10;

  const showAlert = (type: 'success' | 'error', message: string) => {
    setAlert({ type, message });
    setTimeout(() => setAlert(null), 4000);
  };

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
      if (filterStatus) filters.status = filterStatus;

      const result = await getFinancingPrograms(filters);
      setPrograms(result.data);
      setTotal(result.total);
    } catch (error) {
      console.error('Error al cargar programas:', error);
      showAlert('error', 'Error al cargar los programas de financiamiento');
    } finally {
      setLoading(false);
    }
  }, [page, searchQuery, filterType, filterRegion, filterStatus]);

  useEffect(() => {
    fetchPrograms();
  }, [fetchPrograms]);

  // ---- CRUD Handlers ----
  const handleSave = async (programData: Omit<FinancingProgram, 'id'> & { id?: number }) => {
    setSaving(true);
    try {
      if (programData.id) {
        await updateFinancingProgram(programData.id, programData);
        showAlert('success', `Programa "${programData.name}" actualizado correctamente`);
      } else {
        await createFinancingProgram({
          ...programData,
          createdBy: user?.id,
        });
        showAlert('success', `Programa "${programData.name}" creado correctamente`);
      }
      setShowForm(false);
      setEditingProgram(null);
      fetchPrograms();
    } catch (error) {
      console.error('Error al guardar:', error);
      showAlert('error', 'Error al guardar el programa');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (program: FinancingProgram) => {
    if (!window.confirm(`¿Está seguro de eliminar el programa "${program.name}"?`)) return;
    try {
      await deleteFinancingProgram(program.id!);
      showAlert('success', `Programa "${program.name}" eliminado`);
      fetchPrograms();
    } catch (error) {
      console.error('Error al eliminar:', error);
      showAlert('error', 'Error al eliminar el programa');
    }
  };

  const handleDuplicate = (program: FinancingProgram) => {
    const duplicated = {
      ...program,
      id: undefined,
      name: `${program.name} (Copia)`,
      status: 'upcoming' as FinancingStatus,
      lastVerified: new Date().toISOString().split('T')[0],
    };
    setEditingProgram(duplicated as FinancingProgram);
    setShowForm(true);
  };

  const handleMarkVerified = async (program: FinancingProgram) => {
    try {
      await updateFinancingProgram(program.id!, {
        ...program,
        lastVerified: new Date().toISOString().split('T')[0],
      });
      showAlert('success', `"${program.name}" marcado como verificado hoy`);
      fetchPrograms();
    } catch (error) {
      console.error('Error:', error);
      showAlert('error', 'Error al actualizar verificación');
    }
  };

  const handleClose = async (program: FinancingProgram) => {
    const reason = window.prompt('Ingrese la razón de cierre (opcional):');
    try {
      await updateFinancingProgram(program.id!, {
        ...program,
        status: 'closed',
        closedReason: reason || undefined,
      });
      showAlert('success', `"${program.name}" marcado como cerrado`);
      fetchPrograms();
    } catch (error) {
      console.error('Error:', error);
      showAlert('error', 'Error al cerrar programa');
    }
  };

  const totalPages = Math.ceil(total / limit);

  if (!isAdmin) {
    return (
      <>
        <FinancingNavbar />
        <div className="financingAdminContainer">
          <div className="financingAlert financingAlertError" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Lock /> Acceso denegado. Solo los administradores pueden acceder a esta página.
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <FinancingNavbar />

      <div className="financingAdminContainer">
        {/* Alert */}
        {alert && (
          <div
            className={`financingAlert ${
              alert.type === 'success' ? 'financingAlertSuccess' : 'financingAlertError'
            }`}
            style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            {alert.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
            {alert.message}
          </div>
        )}

        {/* Header */}
        <div className="financingAdminHeader">
          <h1 className="financingAdminTitle" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Landmark size={28} color="var(--uneRed)" /> Gestión de Financiamientos
          </h1>
          <button
            className="financingBtn financingBtnPrimary"
            onClick={() => {
              setEditingProgram(null);
              setShowForm(true);
            }}
            id="newProgramBtn"
            style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <Plus size={18} /> Nuevo Programa
          </button>
        </div>

        {/* Filters */}
        <div className="financingAdminFilters">
          <div style={{ position: 'relative', flex: 1 }}>
            <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--textMuted)' }} />
            <input
              type="text"
              className="financingAdminSearch"
              placeholder="Buscar por nombre, tipo, región..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setPage(1);
              }}
              id="adminSearch"
              aria-label="Buscar programas"
              style={{ paddingLeft: '38px', width: '100%' }}
            />
          </div>
          <select
            className="financingFilterSelect"
            style={{ width: 'auto' }}
            value={filterType}
            onChange={(e) => {
              setFilterType(e.target.value as FinancingType | '');
              setPage(1);
            }}
            aria-label="Filtrar por tipo"
          >
            <option value="">Todos los tipos</option>
            {Object.entries(FINANCING_TYPES).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
          <select
            className="financingFilterSelect"
            style={{ width: 'auto' }}
            value={filterRegion}
            onChange={(e) => {
              setFilterRegion(e.target.value);
              setPage(1);
            }}
            aria-label="Filtrar por región"
          >
            <option value="">Todas las regiones</option>
            {REGIONS.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
          <select
            className="financingFilterSelect"
            style={{ width: 'auto' }}
            value={filterStatus}
            onChange={(e) => {
              setFilterStatus(e.target.value as FinancingStatus | '');
              setPage(1);
            }}
            aria-label="Filtrar por estado"
          >
            <option value="">Todos los estados</option>
            {Object.entries(FINANCING_STATUS).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
        </div>

        {/* Form Modal */}
        {showForm && (
          <div className="financingModalOverlay">
            <AdminFinancingForm
              program={editingProgram}
              onSave={handleSave}
              onCancel={() => {
                setShowForm(false);
                setEditingProgram(null);
              }}
              loading={saving}
            />
          </div>
        )}

        {/* Table */}
        {loading ? (
          <div className="financingLoading">
            <div className="financingSpinner" />
            <span className="financingLoadingText">Cargando programas...</span>
          </div>
        ) : programs.length === 0 ? (
          <div className="financingEmptyState">
            <div className="financingEmptyStateIcon">
              <ClipboardList size={48} color="var(--textMuted)" />
            </div>
            <div className="financingEmptyStateTitle">No se encontraron programas</div>
            <p className="financingEmptyStateText">
              {searchQuery || filterType || filterRegion || filterStatus
                ? 'Intente con otros filtros de búsqueda.'
                : 'Cree su primer programa de financiamiento.'}
            </p>
          </div>
        ) : (
          <>
            <div style={{ overflowX: 'auto' }}>
              <table className="financingAdminTable" id="adminFinancingTable">
                <thead>
                  <tr>
                    <th>Programa</th>
                    <th>Tipo</th>
                    <th>Región</th>
                    <th>Monto</th>
                    <th>Estado</th>
                    <th>Verificado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {programs.map((program) => (
                    <tr key={program.id} id={`adminRow-${program.id}`}>
                      <td>
                        <div style={{ fontWeight: 600 }}>{program.name}</div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--textMuted)' }}>
                          {program.tags.slice(0, 3).join(', ')}
                        </div>
                      </td>
                      <td>
                        <span className="financingCardBankBadge">
                          {FINANCING_TYPES[program.type]}
                        </span>
                      </td>
                      <td>{program.region}</td>
                      <td>
                        <span style={{ fontSize: '0.85rem' }}>{program.amountRange}</span>
                      </td>
                      <td>
                        <span
                          className={`financingStatusBadge ${
                            program.status === 'active'
                              ? 'financingStatusActive'
                              : program.status === 'closed'
                                ? 'financingStatusClosed'
                                : 'financingStatusUpcoming'
                          }`}
                        >
                          ● {FINANCING_STATUS[program.status]}
                        </span>
                      </td>
                      <td>
                        <span style={{ fontSize: '0.8rem' }}>
                          {formatDate(program.lastVerified)}
                        </span>
                        {program.createdBy && (
                          <div style={{ fontSize: '0.65rem', color: 'var(--textMuted)' }}>
                            por Admin #{program.createdBy}
                          </div>
                        )}
                      </td>
                      <td>
                        <div className="financingAdminActions">
                          <button
                            className="financingBtnIcon"
                            title="Editar"
                            onClick={() => {
                              setEditingProgram(program);
                              setShowForm(true);
                            }}
                            aria-label={`Editar ${program.name}`}
                          >
                            <Pencil size={18} />
                          </button>
                          <button
                            className="financingBtnIcon"
                            title="Duplicar"
                            onClick={() => handleDuplicate(program)}
                            aria-label={`Duplicar ${program.name}`}
                          >
                            <Copy size={18} />
                          </button>
                          <button
                            className="financingBtnIcon"
                            title="Marcar como verificado"
                            onClick={() => handleMarkVerified(program)}
                            aria-label={`Verificar ${program.name}`}
                            style={{ color: 'var(--successGreen)' }}
                          >
                            <CheckCircle size={18} />
                          </button>
                          {program.status !== 'closed' && (
                            <button
                              className="financingBtnIcon"
                              title="Cerrar programa"
                              onClick={() => handleClose(program)}
                              aria-label={`Cerrar ${program.name}`}
                              style={{ color: 'var(--warningGold)' }}
                            >
                              <Lock size={18} />
                            </button>
                          )}
                          <button
                            className="financingBtnIcon"
                            title="Eliminar"
                            onClick={() => handleDelete(program)}
                            aria-label={`Eliminar ${program.name}`}
                            style={{ color: 'var(--errorRed)' }}
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    className={`financingPaginationBtn ${p === page ? 'active' : ''}`}
                    onClick={() => setPage(p)}
                  >
                    {p}
                  </button>
                ))}
                <button
                  className="financingPaginationBtn"
                  disabled={page === totalPages}
                  onClick={() => setPage(page + 1)}
                >
                  Siguiente →
                </button>
              </div>
            )}

            <div style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--textMuted)', marginTop: '0.5rem' }}>
              Mostrando {programs.length} de {total} programas
            </div>
          </>
        )}
      </div>
    </>
  );
}
