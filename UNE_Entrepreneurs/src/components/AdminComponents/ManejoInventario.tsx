import { useState, useEffect } from 'react'
import '../../styles/AdminDashboard.css'
import { toast } from 'sonner'
import { Package, Download, PlusCircle, PackageSearch, Activity, TrendingDown, TrendingUp } from 'lucide-react'
import { getInventoryItems } from '../../services/BusinessService'
import type { InventoryItem } from '../../types/business'
import AdminLayout from './AdminLayout'

function ManejoInventario() {
  const [inventario, setInventario] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarInventario();
  }, []);

  const cargarInventario = async () => {
    setLoading(true);
    try {
      const data = await getInventoryItems();
      setInventario(data || []);
    } catch (error) {
      console.error('Error al cargar inventario:', error);
      toast.error('No se pudo conectar con el catálogo de inventario');
    } finally {
      setLoading(false);
    }
  };

  const getStockStatus = (quantity: number, minQuantity: number = 5) => {
    if (quantity <= minQuantity) return { label: 'CRÍTICO', class: 'pending', icon: TrendingDown };
    if (quantity <= minQuantity * 2) return { label: 'BAJO', class: 'warning', icon: Activity };
    return { label: 'SALUDABLE', class: 'success', icon: TrendingUp };
  }

  return (
    <AdminLayout>
        <header className="admin-top-header">
            <h1 style={{ fontSize: '2rem', fontWeight: 800 }}><Package size={28} /> Inventario Global</h1>
            <div style={{ display: 'flex', gap: '15px' }}>
                <button 
                  onClick={() => toast.info("Generando reporte Excel...")} 
                  style={{ padding: '10px 20px', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                    <Download size={18} /> Exportar
                </button>
                <button 
                  onClick={() => toast.success("Sincronización manual completada")} 
                  style={{ padding: '10px 20px', background: '#1e293b', color: '#fff', border: 'none', borderRadius: '12px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                    <PlusCircle size={18} /> Nuevo Registro
                </button>
            </div>
        </header>

        <main style={{ padding: 0 }}>
            <div className="grid-card" style={{ marginBottom: '30px' }}>
                <div className="grid-card-label">
                    <h3><PackageSearch size={20} style={{ verticalAlign: 'middle', marginRight: '10px' }} /> Monitoreo de Existencias Real-Time</h3>
                </div>
                <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Vista consolidada de todos los productos y suministros en la red de emprendedores.</p>
            </div>

            {loading ? (
                <div style={{ padding: '60px', textAlign: 'center', color: '#64748b' }}>
                    <Activity className="animate-spin" size={32} style={{ margin: '0 auto 15px' }} />
                    <p>Consultando base de datos de stock...</p>
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
                    {inventario.length > 0 ? inventario.map((item) => {
                        const status = getStockStatus(item.quantity, item.minQuantity);
                        return (
                            <div key={item.id} className="grid-card" style={{ padding: '25px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                                    <h4 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0 }}>{item.name}</h4>
                                    <span className={`status-tag ${status.class}`} style={{ fontSize: '0.65rem' }}>{status.label}</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginBottom: '20px' }}>
                                    <span style={{ fontSize: '1.5rem', fontWeight: 800 }}>{item.quantity}</span>
                                    <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600 }}>Unidades Disponibles</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', background: '#f8fafc', borderRadius: '10px', fontSize: '0.85rem' }}>
                                    <span style={{ color: '#64748b' }}>Min. Requerido:</span>
                                    <span style={{ fontWeight: 800 }}>{item.minQuantity || 5}</span>
                                </div>
                                <div style={{ marginTop: '15px', color: '#8B1A1A', fontWeight: 700, fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                                    <Activity size={12} /> Ver historial de movimientos
                                </div>
                            </div>
                        )
                    }) : (
                        <div className="grid-card" style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '60px' }}>
                            <p style={{ color: '#94a3b8' }}>No se han registrado productos en el inventario global aún.</p>
                        </div>
                    )}
                </div>
            )}
        </main>
    </AdminLayout>
  )
}

export default ManejoInventario