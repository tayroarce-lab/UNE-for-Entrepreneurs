import { useState, useEffect, useCallback } from 'react';
import { Landmark, Plus, Search, ClipboardList, Pencil, Copy, Trash2, Activity, Lock } from 'lucide-react';
import Swal from 'sweetalert2';
import { toast } from 'sonner';
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
import AdminSuriaForm from './AdminSuriaForm';
import AdminLayout from '../AdminComponents/AdminLayout';
import '../../styles/AdminDashboard.css';

export default function AdminSuriaPage() {
  const { isAdmin, user } = useAuth();

  // State
  const [programs, setPrograms] = useState<FinancingProgram[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingProgram, setEditingProgram] = useState<FinancingProgram | null>(null);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<FinancingType | ''>('');
  const [filterRegion, setFilterRegion] = useState('');
  const [filterStatus, setFilterStatus] = useState<FinancingStatus | ''>('');

  // Pagination
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 10;

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
      toast.error('Error al cargar los programas de financiamiento');
    } finally {
      setLoading(false);
    }
  }, [page, searchQuery, filterType, filterRegion, filterStatus]);

  useEffect(() => {
    fetchPrograms();
  }, [fetchPrograms]);

  // ---- CRUD Handlers ----
  const handleSave = async (programData: Omit<FinancingProgram, 'id'> & { id?: string }) => {
    setSaving(true);
    try {
      if (programData.id) {
        await updateFinancingProgram(programData.id, programData);
        toast.success(`Modelo "${programData.name}" actualizado correctamente`);
      } else {
        await createFinancingProgram({
          ...programData,
          createdBy: user?.id,
        });
        toast.success(`Modelo "${programData.name}" creado correctamente`);
      }
      setShowForm(false);
      setEditingProgram(null);
      fetchPrograms();
    } catch (error) {
      console.error('Error al guardar:', error);
      toast.error('Error al guardar el modelo');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (program: FinancingProgram) => {
    const result = await Swal.fire({
      title: '¿Está seguro?',
      text: `Se eliminará el modelo "${program.name}". Esta acción no se puede deshacer.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#8B1A1A',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });

    if (result.isConfirmed) {
      try {
        await deleteFinancingProgram(program.id!);
        toast.success(`Modelo "${program.name}" eliminado`);
        fetchPrograms();
      } catch (error) {
        console.error('Error al eliminar:', error);
        toast.error('Error al eliminar el modelo');
      }
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

  const totalPages = Math.ceil(total / limit);

  if (!isAdmin) {
    return (
        <div style={{ padding: '100px', textAlign: 'center' }}>
            <Lock size={48} color="#ef4444" style={{ marginBottom: '20px' }} />
            <h1 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Acceso denegado.</h1>
            <p>Solo los administradores pueden acceder a esta página.</p>
        </div>
    );
  }

  return (
    <AdminLayout>
        <header className="admin-top-header">
            <h1 style={{ fontSize: '2rem', fontWeight: 800 }}><Landmark size={28} /> Modelo de Financiamiento Suria</h1>
            <button
                className="btn-publish-v2"
                onClick={() => {
                   setEditingProgram(null);
                   setShowForm(true);
                }}
            >
                <Plus size={18} /> Nuevo Modelo
            </button>
        </header>

        <main style={{ padding: 0 }}>
            {/* Filters */}
            <div className="grid-card" style={{ marginBottom: '30px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '15px' }}>
                    <div className="search-bar-v2" style={{ width: '100%' }}>
                        <Search size={18} className="search-icon-header" />
                        <input
                            type="text"
                            placeholder="Buscar por nombre, tipo, región..."
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                setPage(1);
                            }}
                        />
                    </div>
                    
                    <select
                        className="financingFilterSelect"
                        style={{ padding: '12px', borderRadius: '12px', border: '1px solid #e2e8f0', background: '#fff', fontWeight: 600, outline: 'none' }}
                        value={filterType}
                        onChange={(e) => {
                            setFilterType(e.target.value as FinancingType | '');
                            setPage(1);
                        }}
                    >
                        <option value="">Todos los tipos</option>
                        {Object.entries(FINANCING_TYPES).map(([key, label]) => (
                            <option key={key} value={key}>{label}</option>
                        ))}
                    </select>

                    <select
                        className="financingFilterSelect"
                        style={{ padding: '12px', borderRadius: '12px', border: '1px solid #e2e8f0', background: '#fff', fontWeight: 600, outline: 'none' }}
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

                    <select
                        className="financingFilterSelect"
                        style={{ padding: '12px', borderRadius: '12px', border: '1px solid #e2e8f0', background: '#fff', fontWeight: 600, outline: 'none' }}
                        value={filterStatus}
                        onChange={(e) => {
                            setFilterStatus(e.target.value as FinancingStatus | '');
                            setPage(1);
                        }}
                    >
                        <option value="">Todos los estados</option>
                        {Object.entries(FINANCING_STATUS).map(([key, label]) => (
                            <option key={key} value={key}>{label}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Form Modal */}
            {showForm && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.75)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000, padding: '20px' }}>
                    <div style={{ background: '#fff', borderRadius: '24px', width: '100%', maxWidth: '800px', maxHeight: '90vh', overflowY: 'auto' }}>
                        <AdminSuriaForm
                            program={editingProgram}
                            onSave={handleSave}
                            onCancel={() => {
                                setShowForm(false);
                                setEditingProgram(null);
                            }}
                            loading={saving}
                        />
                    </div>
                </div>
            )}

            {/* Table */}
            <div className="grid-card">
                {loading ? (
                    <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>
                        <Activity className="animate-spin" size={32} style={{ margin: '0 auto 15px' }} />
                        <p>Cargando programas de financiamiento...</p>
                    </div>
                ) : programs.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '60px' }}>
                        <ClipboardList size={48} color="#cbd5e1" style={{ marginBottom: '15px' }} />
                        <h3>No se encontraron programas</h3>
                        <p style={{ color: '#94a3b8' }}>{searchQuery ? 'Intente con otros términos de búsqueda.' : 'Inicie creando su primer programa.'}</p>
                    </div>
                ) : (
                    <>
                        <table className="admin-table-v2">
                            <thead>
                                <tr>
                                    <th>PROGRAMA</th>
                                    <th>TIPO</th>
                                    <th>REGIÓN</th>
                                    <th>ESTADO</th>
                                    <th>VERIFICADO</th>
                                    <th style={{ textAlign: 'center' }}>ACCIONES</th>
                                </tr>
                            </thead>
                            <tbody>
                                {programs.map((program) => (
                                    <tr key={program.id}>
                                        <td>
                                            <div style={{ fontWeight: 800 }}>{program.name}</div>
                                            <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>{program.amountRange}</div>
                                        </td>
                                        <td>
                                            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#64748b', background: '#f1f5f9', padding: '4px 8px', borderRadius: '6px' }}>
                                                {FINANCING_TYPES[program.type]}
                                            </span>
                                        </td>
                                        <td style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600 }}>{program.region}</td>
                                        <td>
                                            <span className={`status-tag ${program.status === 'active' ? 'success' : 'pending'}`}>
                                                {FINANCING_STATUS[program.status]}
                                            </span>
                                        </td>
                                        <td style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                                            {formatDate(program.lastVerified)}
                                        </td>
                                        <td>
                                            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                                                <button onClick={() => { setEditingProgram(program); setShowForm(true); }} style={{ background: '#f1f5f9', border: 'none', borderRadius: '8px', padding: '8px', cursor: 'pointer' }}><Pencil size={14} /></button>
                                                <button onClick={() => handleDuplicate(program)} style={{ background: '#f1f5f9', border: 'none', borderRadius: '8px', padding: '8px', cursor: 'pointer' }}><Copy size={14} /></button>
                                                <button onClick={() => handleDelete(program)} style={{ background: '#fee2e2', color: '#dc2626', border: 'none', borderRadius: '8px', padding: '8px', cursor: 'pointer' }}><Trash2 size={14} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {totalPages > 1 && (
                            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '30px' }}>
                                <button
                                    onClick={() => setPage(page - 1)}
                                    disabled={page === 1}
                                    style={{ padding: '8px 16px', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', cursor: page === 1 ? 'not-allowed' : 'pointer', opacity: page === 1 ? 0.5 : 1 }}
                                >
                                    Anterior
                                </button>
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                                    <button
                                        key={p}
                                        onClick={() => setPage(p)}
                                        style={{ 
                                            padding: '8px 15px', 
                                            borderRadius: '8px', 
                                            border: 'none',
                                            background: p === page ? '#1e293b' : '#f1f5f9',
                                            color: p === page ? '#fff' : '#64748b',
                                            fontWeight: 800,
                                            cursor: 'pointer'
                                        }}
                                    >
                                        {p}
                                    </button>
                                ))}
                                <button
                                    onClick={() => setPage(page + 1)}
                                    disabled={page === totalPages}
                                    style={{ padding: '8px 16px', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', cursor: page === totalPages ? 'not-allowed' : 'pointer', opacity: page === totalPages ? 0.5 : 1 }}
                                >
                                    Siguiente
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </main>
    </AdminLayout>
  );
}
