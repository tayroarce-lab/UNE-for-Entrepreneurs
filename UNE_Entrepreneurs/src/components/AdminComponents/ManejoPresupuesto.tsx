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
  const [category, setCategory] = useState('');
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
          text: "El balance general será afectado",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#dc2626',
          cancelButtonColor: '#64748b',
          confirmButtonText: 'Sí, eliminar'
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

      <main style={{ padding: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}>
          <div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#3A0D23', margin: 0 }}>Presupuesto Global</h1>
            <p style={{ color: '#64748B', margin: 0, marginTop: '4px', fontSize: '1.1rem' }}>Control y auditoría de los flujos de capital de la red de emprendedores UNE.</p>
          </div>
          <button 
            onClick={abrirModalCrear}
            style={{ padding: '12px 24px', background: '#E55B4B', color: '#fff', border: 'none', borderRadius: '12px', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}
          >
            <PlusCircle size={20} /> Nueva Transacción
          </button>
        </div>
            {/* BUDGET SUMMARY CARD */}
            <div className="grid-card budget-summary-card">
                <div className="summary-header">
                    <div>
                        <span className="summary-label">
                            <DollarSign size={16} /> BALANCE GENERAL - RED UNE
                        </span>
                        <h1 className="summary-total">
                           ₡{balanceTotal.toLocaleString()}
                        </h1>
                    </div>
                    <div className="summary-icon">
                        <Wallet size={32} />
                    </div>
                </div>
                
                <div className="summary-stats">
                    <div className="stat-item">
                        <p className="stat-label">Total Ingresos</p>
                        <p className="stat-value income">
                            <TrendingUp size={18} /> +₡{ingresosSuma.toLocaleString()}
                        </p>
                    </div>
                    <div className="stat-divider"></div>
                    <div className="stat-item">
                        <p className="stat-label">Total Egresos</p>
                        <p className="stat-value expense">
                            <TrendingDown size={18} /> -₡{egresosSuma.toLocaleString()}
                        </p>
                    </div>
                </div>
            </div>

            {/* AUDIT LIST */}
            <div className="grid-card">
                <div className="grid-card-label">
                    <h3><History size={20} style={{ verticalAlign: 'middle', marginRight: '10px' }} /> Auditoría de Movimientos</h3>
                </div>

                {loading ? (
                    <div style={{ padding: '60px', textAlign: 'center', color: '#64748b' }}>
                        <Activity className="animate-spin" size={32} style={{ marginBottom: '15px' }} />
                        <p>Analizando registros financieros...</p>
                    </div>
                ) : (
                    <div className="transaction-list">
                        {transacciones.length > 0 ? transacciones.map((t) => (
                            <div key={t.id} className="transaction-item">
                                <div className="transaction-main">
                                    <div className={`transaction-icon-box ${t.type}`}>
                                        {t.type === 'income' ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
                                    </div>
                                    <div className="transaction-info">
                                        <div className="transaction-title">
                                            {t.description} 
                                            <span className="transaction-category">{t.category}</span>
                                        </div>
                                        <div className="transaction-date">{new Date(t.date).toLocaleDateString()}</div>
                                    </div>
                                </div>
                                <div className="transaction-side">
                                    <div className={`transaction-amount ${t.type}`}>
                                        {t.type === 'income' ? '+' : '-'}₡{Number(t.amount).toLocaleString()}
                                    </div>
                                    
                                    <div className="transaction-actions">
                                        <button 
                                            onClick={() => abrirModalEditar(t)}
                                            className="action-btn edit"
                                            title="Editar"
                                        >
                                            <Edit size={16} />
                                        </button>
                                        <button 
                                            onClick={() => handleEliminar(t.id)}
                                            className="action-btn delete"
                                            title="Eliminar"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )) : (
                            <div style={{ padding: '60px', textAlign: 'center', color: '#94a3b8' }}>
                                <p>No hay movimientos financieros registrados.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </main>

        {modalAbierto && (
            <div className="modal-overlay-admin" style={{ position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.75)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000 }}>
                <div className="grid-card" style={{ width: '90%', maxWidth: '500px', padding: '30px', maxHeight: '90vh', overflowY: 'auto' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                        <h2 style={{ fontSize: '1.5rem', margin: 0 }}>
                            <Wallet size={24} style={{ color: '#D4A853', verticalAlign: 'middle', marginRight: '10px' }} /> 
                            {isCreando ? 'Registrar Transacción' : 'Editar Transacción'}
                        </h2>
                        <button onClick={() => setModalAbierto(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}><X size={24} /></button>
                    </div>

                    <div style={{ display: 'grid', gap: '15px' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 600, color: '#475569' }}>Descripción:</label>
                            <input 
                                type="text"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Ej. Pago de Alquiler"
                                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0', outline: 'none' }}
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 600, color: '#475569' }}>Monto (₡):</label>
                            <input 
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="0"
                                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0', outline: 'none' }}
                            />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 600, color: '#475569' }}>Tipo:</label>
                                <select 
                                    value={type}
                                    onChange={(e) => setType(e.target.value as 'income' | 'expense')}
                                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0', background: '#fff', outline: 'none' }}
                                >
                                    <option value="income">Ingreso (+)</option>
                                    <option value="expense">Egreso (-)</option>
                                </select>
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 600, color: '#475569' }}>Categoría:</label>
                                <input 
                                    type="text"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    placeholder="Ej. Operación"
                                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0', outline: 'none' }}
                                />
                            </div>
                        </div>

                        <button 
                            onClick={handleGuardar}
                            disabled={isSaving}
                            style={{ 
                                padding: '12px', 
                                background: '#1e293b', 
                                color: '#fff', 
                                border: 'none', 
                                borderRadius: '8px', 
                                fontWeight: 700, 
                                cursor: isSaving ? 'not-allowed' : 'pointer',
                                display: 'flex',
                                justifyContent: 'center',
                                gap: '8px',
                                marginTop: '10px'
                            }}
                        >
                            <Save size={18} /> {isCreando ? 'Guardar Registro' : 'Actualizar Registro'}
                        </button>
                    </div>
                </div>
            </div>
        )}
    </AdminLayout>
  )
}

export default ManejoPresupuesto