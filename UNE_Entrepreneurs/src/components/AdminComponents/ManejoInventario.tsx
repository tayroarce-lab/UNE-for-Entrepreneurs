import { useState, useEffect } from 'react'
import '../../styles/AdminDashboard.css'
import { toast } from 'sonner'
import Swal from 'sweetalert2'
import { 
  Package, 
  Download, 
  PlusCircle, 
  PackageSearch, 
  Activity, 
  TrendingDown, 
  TrendingUp,
  Edit,
  Trash2,
  X,
  Save
} from 'lucide-react'
import { getInventoryItems, createInventoryItem, updateInventoryItem, deleteInventoryItem } from '../../services/BusinessService'
import type { InventoryItem } from '../../types/business'
import AdminLayout from './AdminLayout'

function ManejoInventario() {
  const [inventario, setInventario] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalAbierto, setModalAbierto] = useState(false);
  
  // Form State
  const [isCreando, setIsCreando] = useState(false);
  const [itemSeleccionado, setItemSeleccionado] = useState<InventoryItem | null>(null);
  
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [minQuantity, setMinQuantity] = useState(5);
  const [costPrice, setCostPrice] = useState(0);
  const [salePrice, setSalePrice] = useState(0);
  const [category, setCategory] = useState('');
  const [isSaving, setIsSaving] = useState(false);

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

  const abrirModalCrear = () => {
      setIsCreando(true);
      setItemSeleccionado(null);
      setName('');
      setQuantity(0);
      setMinQuantity(5);
      setCostPrice(0);
      setSalePrice(0);
      setCategory('General');
      setModalAbierto(true);
  }

  const abrirModalEditar = (item: InventoryItem) => {
      setIsCreando(false);
      setItemSeleccionado(item);
      setName(item.name);
      setQuantity(item.quantity);
      setMinQuantity(item.minQuantity || 5);
      setCostPrice(item.costPrice || 0);
      setSalePrice(item.salePrice || 0);
      setCategory(item.category || 'General');
      setModalAbierto(true);
  }

  const handleGuardar = async () => {
      if (!name.trim()) {
          toast.error("El nombre del producto es requerido.");
          return;
      }
      setIsSaving(true);
      try {
          if (isCreando) {
              await createInventoryItem({
                  userId: 'admin',
                  name,
                  quantity: Number(quantity),
                  minQuantity: Number(minQuantity),
                  costPrice: Number(costPrice),
                  salePrice: Number(salePrice),
                  category,
                  lastRestock: new Date().toISOString()
              });
              toast.success("Producto creado exitosamente");
          } else if (itemSeleccionado?.id) {
              await updateInventoryItem(itemSeleccionado.id, {
                  name,
                  quantity: Number(quantity),
                  minQuantity: Number(minQuantity),
                  costPrice: Number(costPrice),
                  salePrice: Number(salePrice),
                  category
              });
              toast.success("Producto actualizado");
          }
          setModalAbierto(false);
          cargarInventario();
      } catch (error) {
          toast.error("Error al guardar el producto");
      } finally {
          setIsSaving(false);
      }
  }

  const handleEliminar = (id: string | number | undefined) => {
      if (!id) return;
      Swal.fire({
          title: '¿Eliminar producto?',
          text: "Se eliminará permanentemente de la base de datos",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#dc2626',
          cancelButtonColor: '#64748b',
          confirmButtonText: 'Sí, eliminar'
      }).then(async (result) => {
          if (result.isConfirmed) {
              try {
                  await deleteInventoryItem(id);
                  toast.success("Producto eliminado");
                  cargarInventario();
              } catch {
                  toast.error("Error al eliminar");
              }
          }
      })
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
                  onClick={abrirModalCrear} 
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
                            <div key={item.id} className="grid-card" style={{ padding: '25px', position: 'relative' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                                    <h4 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0, paddingRight: '15px' }}>{item.name}</h4>
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
                                <div style={{ marginTop: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f1f5f9', paddingTop: '15px' }}>
                                    <button 
                                        onClick={() => abrirModalEditar(item)}
                                        style={{ color: '#D4A853', fontWeight: 700, fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', background: 'none', border: 'none' }}
                                    >
                                        <Edit size={14} /> Editar
                                    </button>
                                    <button 
                                        onClick={() => handleEliminar(item.id)}
                                        style={{ color: '#dc2626', fontWeight: 700, fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', background: 'none', border: 'none' }}
                                    >
                                        <Trash2 size={14} /> Borrar
                                    </button>
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

        {modalAbierto && (
            <div className="modal-overlay-admin" style={{ position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.75)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000 }}>
                <div className="grid-card" style={{ width: '90%', maxWidth: '500px', padding: '30px', maxHeight: '90vh', overflowY: 'auto' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                        <h2 style={{ fontSize: '1.5rem', margin: 0 }}>
                            <Package size={24} style={{ color: '#D4A853', verticalAlign: 'middle', marginRight: '10px' }} /> 
                            {isCreando ? 'Nuevo Producto' : 'Editar Producto'}
                        </h2>
                        <button onClick={() => setModalAbierto(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}><X size={24} /></button>
                    </div>

                    <div style={{ display: 'grid', gap: '15px' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 600, color: '#475569' }}>Nombre del Producto:</label>
                            <input 
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                            />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 600, color: '#475569' }}>Cantidad Actual:</label>
                                <input 
                                    type="number"
                                    value={quantity}
                                    onChange={(e) => setQuantity(Number(e.target.value))}
                                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 600, color: '#475569' }}>Mínimo Requerido:</label>
                                <input 
                                    type="number"
                                    value={minQuantity}
                                    onChange={(e) => setMinQuantity(Number(e.target.value))}
                                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                                />
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 600, color: '#475569' }}>Costo (₡):</label>
                                <input 
                                    type="number"
                                    value={costPrice}
                                    onChange={(e) => setCostPrice(Number(e.target.value))}
                                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 600, color: '#475569' }}>Venta (₡):</label>
                                <input 
                                    type="number"
                                    value={salePrice}
                                    onChange={(e) => setSalePrice(Number(e.target.value))}
                                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                                />
                            </div>
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 600, color: '#475569' }}>Categoría:</label>
                            <input 
                                type="text"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                            />
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
                            <Save size={18} /> {isCreando ? 'Crear Producto' : 'Guardar Cambios'}
                        </button>
                    </div>
                </div>
            </div>
        )}
    </AdminLayout>
  )
}

export default ManejoInventario