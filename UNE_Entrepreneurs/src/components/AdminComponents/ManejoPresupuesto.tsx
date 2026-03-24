import { useState, useEffect } from 'react';
import '../../styles/AdminDashboard.css'

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
        <header className="admin-top-header" style={{ marginBottom: '30px' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: 800 }}><Wallet size={28} /> Presupuesto Global</h1>
            <button 
                onClick={abrirModalCrear}
                style={{ padding: '10px 20px', background: '#1e293b', color: '#fff', border: 'none', borderRadius: '12px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
            >
                <PlusCircle size={18} /> Nueva Transacción
            </button>
        </header>

        <main style={{ padding: 0 }}>
            {/* BUDGET SUMMARY CARD */}
            <div className="grid-card" style={{ 
                background: 'linear-gradient(135deg, #40102b 0%, #1e293b 100%)', 
                color: '#fff',
                marginBottom: '30px',
                padding: '40px'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                        <span style={{ fontSize: '0.9rem', opacity: 0.8, fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <DollarSign size={16} /> BALANCE GENERAL - RED UNE
                        </span>
                        <h1 style={{ fontSize: '3.5rem', fontWeight: 800, margin: '15px 0', color: '#fff' }}>
                           ₡{balanceTotal.toLocaleString()}
                        </h1>
                    </div>
                    <div style={{ background: 'rgba(255,255,255,0.1)', padding: '15px', borderRadius: '16px', backdropFilter: 'blur(10px)' }}>
                        <Wallet size={32} />
                    </div>
                </div>
                
                <div style={{ display: 'flex', gap: '40px', marginTop: '10px' }}>
                    <div>
                        <p style={{ margin: 0, fontSize: '0.85rem', opacity: 0.7, fontWeight: 600 }}>Total Ingresos</p>
                        <p style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: '#4ade80', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <TrendingUp size={18} /> +₡{ingresosSuma.toLocaleString()}
                        </p>
                    </div>
                    <div style={{ height: '50px', width: '1px', background: 'rgba(255,255,255,0.1)' }}></div>
                    <div>
                        <p style={{ margin: 0, fontSize: '0.85rem', opacity: 0.7, fontWeight: 600 }}>Total Egresos</p>
                        <p style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: '#f87171', display: 'flex', alignItems: 'center', gap: '6px' }}>
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
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        {transacciones.length > 0 ? transacciones.map((t) => (
                            <div key={t.id} style={{ 
                                display: 'flex', 
                                justifyContent: 'space-between', 
                                alignItems: 'center', 
                                padding: '20px', 
                                background: '#f8fafc', 
                                borderRadius: '16px',
                                border: '1px solid #f1f5f9',
                                transition: 'all 0.2s'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', flex: 1 }}>
                                    <div style={{ 
                                        width: '40px', 
                                        height: '40px', 
                                        borderRadius: '10px', 
                                        background: t.type === 'income' ? '#f0fdf4' : '#fef2f2', 
                                        color: t.type === 'income' ? '#16a34a' : '#dc2626',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        {t.type === 'income' ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: 800, fontSize: '1rem' }}>{t.description} <span style={{fontSize: '0.7rem', color: '#94a3b8', background: '#e2e8f0', padding: '2px 6px', borderRadius: '4px', marginLeft: '8px'}}>{t.category}</span></div>
                                        <div style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 600 }}>{new Date(t.date).toLocaleDateString()}</div>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                    <div style={{ 
                                        fontSize: '1.15rem', 
                                        fontWeight: 800, 
                                        color: t.type === 'income' ? '#16a34a' : '#dc2626' 
                                    }}>
                                        {t.type === 'income' ? '+' : '-'}₡{Number(t.amount).toLocaleString()}
                                    </div>
                                    
                                    <div style={{ display: 'flex', gap: '10px', marginLeft: '15px' }}>
                                        <button 
                                            onClick={() => abrirModalEditar(t)}
                                            style={{ padding: '8px', background: 'none', border: '1px solid #e2e8f0', borderRadius: '8px', cursor: 'pointer', color: '#D4A853', display: 'flex', alignItems: 'center' }}
                                            title="Editar"
                                        >
                                            <Edit size={16} />
                                        </button>
                                        <button 
                                            onClick={() => handleEliminar(t.id)}
                                            style={{ padding: '8px', background: '#fee2e2', border: 'none', borderRadius: '8px', cursor: 'pointer', color: '#dc2626', display: 'flex', alignItems: 'center' }}
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