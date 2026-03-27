import { useState, useEffect } from 'react';
import '../../styles/AdminDashboard.css'
import AdminHeader from './AdminHeader';
import { 
  Wallet, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  History, 
  Activity,
  PlusCircle,
  Edit,
  Trash2,
  X,
  Save
} from 'lucide-react'
import { getTransactions, createTransaction, updateTransaction, deleteTransaction } from '../../services/BusinessService'
import type { Transaction } from '../../types/business'
import { toast } from 'sonner'
import Swal from 'sweetalert2'
import AdminLayout from './AdminLayout'

function ManejoPresupuesto() {
  const [transacciones, setTransacciones] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalAbierto, setModalAbierto] = useState(false);

  // Form State
  const [isCreando, setIsCreando] = useState(false);
  const [transaccionSeleccionada, setTransaccionSeleccionada] = useState<Transaction | null>(null);

  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState<number | string>('');
  const [type, setType] = useState<'income' | 'expense'>('income');
  const [category, setCategory] = useState('General');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    cargarTransacciones();
  }, []);

  const cargarTransacciones = async () => {
    setLoading(true);
    try {
      const data = await getTransactions();
      setTransacciones(data || []);
    } catch (error) {
      console.error('Error al cargar transacciones:', error);
      toast.error('Error al conectar con la base de datos de presupuesto');
    } finally {
      setLoading(false);
    }
  };

  const balanceTotal = transacciones.reduce((acc, curr) => 
    curr.type === 'income' ? acc + Number(curr.amount) : acc - Number(curr.amount), 0
  );

  const ingresosSuma = transacciones
    .filter((t) => t.type === 'income')
    .reduce((a, b) => a + Number(b.amount), 0);
    
  const egresosSuma = transacciones
      .filter((t) => t.type === 'expense')
      .reduce((a, b) => a + Number(b.amount), 0);

  const abrirModalCrear = () => {
      setIsCreando(true);
      setTransaccionSeleccionada(null);
      setDescription('');
      setAmount('');
      setType('income');
      setCategory('General');
      setModalAbierto(true);
  }

  const abrirModalEditar = (t: Transaction) => {
      setIsCreando(false);
      setTransaccionSeleccionada(t);
      setDescription(t.description);
      setAmount(t.amount);
      setType(t.type === 'expense' ? 'expense' : 'income');
      setCategory(t.category);
      setModalAbierto(true);
  }

  const handleGuardar = async () => {
      if (!description.trim() || amount === '' || Number(amount) <= 0) {
          toast.error("Descripción y Monto válido son requeridos");
          return;
      }
      setIsSaving(true);
      try {
          if (isCreando) {
              await createTransaction({
                  userId: 'admin',
                  description,
                  amount: Number(amount),
                  type,
                  category,
                  date: new Date().toISOString()
              });
              toast.success("Transacción registrada");
          } else if (transaccionSeleccionada?.id) {
              await updateTransaction(transaccionSeleccionada.id, {
                  description,
                  amount: Number(amount),
                  type,
                  category
              });
              toast.success("Transacción actualizada");
          }
          setModalAbierto(false);
          cargarTransacciones();
      } catch {
          toast.error("Error al guardar la transacción");
      } finally {
          setIsSaving(false);
      }
  }

  const handleEliminar = (id: string | number | undefined) => {
      if (!id) return;
      Swal.fire({
          title: '¿Eliminar transacción?',
          text: "El balance general será afectado permanentemente",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: 'var(--suria-crimson)',
          cancelButtonColor: '#64748b',
          confirmButtonText: 'Sí, eliminar',
          customClass: {
            confirmButton: 'btn-admin btn-admin-danger',
            cancelButton: 'btn-admin btn-admin-outline'
          }
      }).then(async (result) => {
          if (result.isConfirmed) {
              try {
                  await deleteTransaction(id);
                  toast.success("Transacción eliminada");
                  cargarTransacciones();
              } catch {
                  toast.error("Error al eliminar la transacción");
              }
          }
      });
  }

  return (
    <AdminLayout>
      <AdminHeader placeholder="Buscar movimientos financieros..." />

      <main className="admin-main">
        <div className="admin-top-header">
          <div>
            <h1 className="admin-page-title">Presupuesto Global</h1>
            <p className="admin-page-subtitle">Control y auditoría de los flujos de capital de la red UNE.</p>
          </div>
          <button 
            onClick={abrirModalCrear}
            className="btn-admin btn-admin-secondary"
            style={{ padding: '12px 24px', fontSize: '1rem' }}
          >
            <PlusCircle size={20} /> Nueva Transacción
          </button>
        </div>

        {/* BUDGET SUMMARY CARD */}
        <div className="admin-card" style={{ background: 'var(--suria-plum)', color: 'white', marginBottom: '30px' }}>
            <div className="admin-card-header" style={{ borderBottomColor: 'rgba(255,255,255,0.1)' }}>
                <h3 className="admin-card-title" style={{ color: 'white' }}>
                    <Wallet size={22} style={{ color: 'var(--suria-gold)' }} /> 
                    Balance General de la Red
                </h3>
            </div>
            
            <div style={{ padding: '1.5rem 0' }}>
               <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px', color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', fontWeight: 600 }}>
                  <DollarSign size={16} /> TOTAL DISPONIBLE
               </div>
               <div style={{ fontSize: '3rem', fontWeight: 900, color: 'white', letterSpacing: '-1px' }}>
                  ₡{balanceTotal.toLocaleString()}
               </div>
            </div>
            
            <div className="admin-grid-layout" style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.5rem' }}>
                <div className="stat-admin-card" style={{ background: 'rgba(255,255,255,0.05)', border: 'none' }}>
                    <span className="stat-label" style={{ color: 'rgba(255,255,255,0.6)' }}>Ingresos Totales</span>
                    <span className="stat-value" style={{ color: '#4ADE80', fontSize: '1.25rem' }}>
                        <TrendingUp size={18} /> +₡{ingresosSuma.toLocaleString()}
                    </span>
                </div>
                <div className="stat-admin-card" style={{ background: 'rgba(255,255,255,0.05)', border: 'none' }}>
                    <span className="stat-label" style={{ color: 'rgba(255,255,255,0.6)' }}>Egresos Totales</span>
                    <span className="stat-value" style={{ color: '#F87171', fontSize: '1.25rem' }}>
                        <TrendingDown size={18} /> -₡{egresosSuma.toLocaleString()}
                    </span>
                </div>
            </div>
        </div>

        {/* AUDIT LIST */}
        <div className="admin-card">
            <div className="admin-card-header">
                <h3 className="admin-card-title">
                   <History size={20} style={{ color: 'var(--suria-gold)' }} /> 
                   Auditoría de Movimientos Recientes
                </h3>
            </div>

            <div className="admin-table-container">
                {loading ? (
                    <div className="admin-loading">
                        <Activity className="animate-spin" size={32} />
                        <p>Analizando registros financieros...</p>
                    </div>
                ) : (
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>MOVIMIENTO / CATEGORÍA</th>
                                <th>FECHA</th>
                                <th style={{ textAlign: 'right' }}>MONTO</th>
                                <th style={{ textAlign: 'center' }}>ACCIONES</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transacciones.length > 0 ? transacciones.slice().reverse().map((t) => (
                                <tr key={t.id}>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            <div style={{ 
                                                width: '36px', 
                                                height: '36px', 
                                                borderRadius: '10px', 
                                                display: 'flex', 
                                                alignItems: 'center', 
                                                justifyContent: 'center',
                                                background: t.type === 'income' ? '#DCFCE7' : '#FEE2E2',
                                                color: t.type === 'income' ? '#166534' : '#991B1B'
                                            }}>
                                                {t.type === 'income' ? <TrendingUp size={18} /> : <TrendingDown size={18} />}
                                            </div>
                                            <div>
                                                <div style={{ fontWeight: 700, color: 'var(--suria-plum)', fontSize: '0.95rem' }}>{t.description}</div>
                                                <span className="status-tag" style={{ fontSize: '0.65rem', background: '#f1f5f9', color: '#64748b', padding: '2px 6px' }}>{t.category}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td style={{ color: 'var(--admin-text-secondary)', fontSize: '0.85rem' }}>
                                        {new Date(t.date).toLocaleDateString('es-CR', { dateStyle: 'medium' })}
                                    </td>
                                    <td style={{ textAlign: 'right' }}>
                                        <div style={{ 
                                            fontWeight: 800, 
                                            fontSize: '1.1rem',
                                            color: t.type === 'income' ? '#166534' : '#991B1B'
                                        }}>
                                            {t.type === 'income' ? '+' : '-'}₡{Number(t.amount).toLocaleString()}
                                        </div>
                                    </td>
                                    <td style={{ textAlign: 'center' }}>
                                        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                                            <button onClick={() => abrirModalEditar(t)} className="btn-admin btn-admin-outline" style={{ padding: '8px' }}><Edit size={16} /></button>
                                            <button onClick={() => handleEliminar(t.id)} className="btn-admin btn-admin-danger" style={{ padding: '8px' }}><Trash2 size={16} /></button>
                                        </div>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={4} className="admin-empty-state">
                                        <Wallet size={48} style={{ color: '#cbd5e1' }} />
                                        <p>No hay movimientos financieros registrados.</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}
            </div>
        </div>

        {modalAbierto && (
            <div className="admin-modal-overlay">
                <div className="admin-modal-content" style={{ maxWidth: '500px' }}>
                    <div className="admin-modal-header">
                        <h2 className="admin-modal-title">
                            <Wallet size={24} style={{ color: 'var(--suria-gold)' }} /> 
                            {isCreando ? 'Registrar Transacción' : 'Editar Transacción'}
                        </h2>
                        <button onClick={() => setModalAbierto(false)} className="btn-admin btn-admin-outline" style={{ padding: '6px' }}><X size={20} /></button>
                    </div>

                    <div className="admin-form-grid" style={{ gridTemplateColumns: '1fr' }}>
                        <div className="admin-form-group">
                            <label className="admin-label">Descripción del Movimiento:</label>
                            <input 
                                type="text"
                                className="admin-input"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Ej. Pago de Proveedores"
                            />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                            <div className="admin-form-group">
                                <label className="admin-label">Monto (₡):</label>
                                <input 
                                    type="number"
                                    className="admin-input"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    placeholder="0"
                                />
                            </div>
                            <div className="admin-form-group">
                                <label className="admin-label">Tipo de Movimiento:</label>
                                <select 
                                    className="admin-select"
                                    value={type}
                                    onChange={(e) => setType(e.target.value as 'income' | 'expense')}
                                >
                                    <option value="income">Ingreso (+)</option>
                                    <option value="expense">Egreso (-)</option>
                                </select>
                            </div>
                        </div>

                        <div className="admin-form-group">
                            <label className="admin-label">Categoría:</label>
                            <select className="admin-select" value={category} onChange={(e) => setCategory(e.target.value)}>
                                <option value="General">General</option>
                                <option value="Ventas">Ventas</option>
                                <option value="Suministros">Suministros</option>
                                <option value="Servicios">Servicios Públicos</option>
                                <option value="Personal">Personal / Salarios</option>
                                <option value="Marketing">Marketing / Publicidad</option>
                                <option value="Otros">Otros</option>
                            </select>
                        </div>

                        <button 
                            onClick={handleGuardar}
                            disabled={isSaving}
                            className="btn-admin btn-admin-secondary"
                            style={{ marginTop: '10px', width: '100%', justifyContent: 'center' }}
                        >
                            {isSaving ? <Activity className="animate-spin" size={18} /> : <Save size={18} />}
                            {isCreando ? 'Registrar en Auditoría' : 'Actualizar Registro'}
                        </button>
                    </div>
                </div>
            </div>
        )}
      </main>
    </AdminLayout>
  )
}

export default ManejoPresupuesto