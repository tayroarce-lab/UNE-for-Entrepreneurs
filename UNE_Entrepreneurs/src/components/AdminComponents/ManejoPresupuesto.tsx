import { useState, useEffect } from 'react'
import '../../styles/AdminDashboard.css'
import { Wallet, TrendingUp, TrendingDown, DollarSign, History, Activity } from 'lucide-react'
import { getTransactions } from '../../services/BusinessService'
import type { Transaction } from '../../types/business'
import AdminLayout from './AdminLayout'

function ManejoPresupuesto() {
  const [transacciones, setTransacciones] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

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
    } finally {
      setLoading(false);
    }
  };

  const balanceTotal = transacciones.reduce((acc, curr) => acc + curr.amount, 0);

  const ingresosSuma = transacciones
    .filter((t) => t.amount > 0)
    .reduce((a, b) => a + b.amount, 0);
    
  const egresosSuma = Math.abs(
    transacciones
      .filter((t) => t.amount < 0)
      .reduce((a, b) => a + b.amount, 0)
  );

  return (
    <AdminLayout>
        <header className="admin-top-header" style={{ marginBottom: '30px' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: 800 }}><Wallet size={28} /> Presupuesto Global</h1>
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
                                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                    <div style={{ 
                                        width: '40px', 
                                        height: '40px', 
                                        borderRadius: '10px', 
                                        background: t.amount >= 0 ? '#f0fdf4' : '#fef2f2', 
                                        color: t.amount >= 0 ? '#16a34a' : '#dc2626',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        {t.amount >= 0 ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: 800, fontSize: '1rem' }}>{t.description}</div>
                                        <div style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 600 }}>{new Date(t.date).toLocaleDateString()}</div>
                                    </div>
                                </div>
                                <div style={{ 
                                    fontSize: '1.15rem', 
                                    fontWeight: 800, 
                                    color: t.amount >= 0 ? '#16a34a' : '#dc2626' 
                                }}>
                                    {t.amount >= 0 ? '+' : ''}₡{t.amount.toLocaleString()}
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
    </AdminLayout>
  )
}

export default ManejoPresupuesto