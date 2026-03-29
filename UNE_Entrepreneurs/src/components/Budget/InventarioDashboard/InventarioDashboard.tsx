import React, { useState, useEffect } from 'react';
import { Package, PlusCircle, Search, Edit2, Trash2, AlertTriangle, ArrowLeft, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { toast } from 'sonner';
import { useAuth } from '../../../context/AuthContext';
import {
  getInventario,
  createProducto,
  updateProducto,
  deleteProducto,
  type ProductoInventario
} from '../../../services/InventarioService';
import styles from './InventarioDashboard.module.css';

const InventarioDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [productos, setProductos] = useState<ProductoInventario[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategoria, setSelectedCategoria] = useState('Todas');
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // Form State
  const [nombre, setNombre] = useState('');
  const [categoria, setCategoria] = useState('');
  const [precio, setPrecio] = useState<string | number>('');
  const [stock, setStock] = useState<string | number>('');
  const [stockMinimo, setStockMinimo] = useState<string | number>('');
  const [unidad, setUnidad] = useState('Unidades');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (user) {
      cargarInventario();
    }
  }, [user]);

  const cargarInventario = async () => {
    try {
      setLoading(true);
      const data = await getInventario(user!.id);
      setProductos(data || []);
    } catch {
      toast.error('Grave: No se pudo conectar con el inventario.');
    } finally {
      setLoading(false);
    }
  };

  const abrirModal = (producto?: ProductoInventario) => {
    if (producto) {
      setEditingId(producto.id);
      setNombre(producto.nombre);
      setCategoria(producto.categoria);
      setPrecio(producto.precio);
      setStock(producto.stock);
      setStockMinimo(producto.stockMinimo);
      setUnidad(producto.unidad);
    } else {
      setEditingId(null);
      setNombre('');
      setCategoria('');
      setPrecio('');
      setStock('');
      setStockMinimo('');
      setUnidad('Unidades');
    }
    setIsModalOpen(true);
  };

  const handleGuardar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre || !categoria || precio === '' || stock === '' || stockMinimo === '') {
      toast.error('Por favor completa todos los campos requeridos');
      return;
    }

    setIsSaving(true);
    try {
      const payload = {
        userId: user!.id,
        nombre,
        categoria,
        precio: Number(precio),
        stock: Number(stock),
        stockMinimo: Number(stockMinimo),
        unidad
      };

      if (editingId) {
        await updateProducto(editingId, payload);
        toast.success('Producto actualizado exitosamente');
      } else {
        await createProducto(payload);
        toast.success('Producto agregado al inventario');
      }
      setIsModalOpen(false);
      cargarInventario();
    } catch {
      toast.error('Ocurrió un error al guardar el producto');
    } finally {
      setIsSaving(false);
    }
  };

  const confirmarEliminar = (id: string, nombreProd: string) => {
    Swal.fire({
      title: '¿Eliminar producto?',
      html: `Estás a punto de borrar <strong>${nombreProd}</strong>. Esta acción no se puede deshacer.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'var(--suria-crimson)',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteProducto(id);
          toast.success('Producto eliminado');
          setProductos(prev => prev.filter(p => p.id !== id));
        } catch {
          toast.error('Error al intentar eliminar');
        }
      }
    });
  };

  // Filtrado
  const categoriasU = Array.from(new Set(productos.map(p => p.categoria)));
  
  const filtrados = productos.filter(p => {
    const matchCat = selectedCategoria === 'Todas' || p.categoria === selectedCategoria;
    const matchSearch = p.nombre.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCat && matchSearch;
  });

  // Estadísticas
  const valorTotalInventario = productos.reduce((acc, curr) => acc + (curr.precio * curr.stock), 0);
  const itemsBajos = productos.filter(p => p.stock <= p.stockMinimo).length;

  return (
    <main className={styles.inventarioDashboard}>
      {/* HEADER */}
      <header className={styles.header}>
        <div className={styles.titleArea}>
          <button onClick={() => navigate('/presupuesto')} className={styles.backBtn} title="Volver al Presupuesto">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1>Gestión de <span className={styles.titleAccent}>Inventario</span></h1>
            <p className={styles.titleDesc}>Control detallado de existencias, reposiciones y valorización comercial.</p>
          </div>
        </div>
        
        <button className={styles.primaryBtn} onClick={() => abrirModal()}>
          <PlusCircle size={18} /><span>Nuevo Producto</span>
        </button>
      </header>

      {/* STATS */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ background: 'rgba(212, 168, 83, 0.15)', color: 'var(--suria-gold)' }}>
            <Package size={24} />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statLabel}>Productos Registrados</span>
            <span className={styles.statValue}>{productos.length}</span>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ background: 'rgba(74, 222, 128, 0.15)', color: '#166534' }}>
            <TrendingUp size={24} />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statLabel}>Valor del Inventario</span>
            <span className={styles.statValue}>₡{valorTotalInventario.toLocaleString()}</span>
          </div>
        </div>
        <div className={styles.statCard} style={{ borderColor: itemsBajos > 0 ? '#fca5a5' : 'transparent', background: itemsBajos > 0 ? '#fef2f2' : 'white' }}>
          <div className={styles.statIcon} style={{ background: itemsBajos > 0 ? 'rgba(239, 68, 68, 0.15)' : '#f1f5f9', color: itemsBajos > 0 ? '#ef4444' : '#64748b' }}>
            <AlertTriangle size={24} />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statLabel}>Alertas de Reposición</span>
            <span className={styles.statValue} style={{ color: itemsBajos > 0 ? '#991b1b' : 'inherit' }}>
              {itemsBajos} <span style={{ fontSize: '0.8rem', fontWeight: 500 }}>ítems críticos</span>
            </span>
          </div>
        </div>
      </div>

      {/* TOOLBAR */}
      <div className={styles.toolbar}>
        <div className={styles.searchBox}>
          <Search size={18} className={styles.searchIcon} />
          <input 
            type="text" 
            placeholder="Buscar por nombre de producto..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select 
          className={styles.filterSelect}
          value={selectedCategoria}
          onChange={(e) => setSelectedCategoria(e.target.value)}
        >
          <option value="Todas">Todas las categorías</option>
          {categoriasU.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      {/* INVENTORY LIST */}
      <div className={styles.card}>
        {loading ? (
           <div className={styles.emptyState}>Cargando inventario...</div>
        ) : filtrados.length === 0 ? (
           <div className={styles.emptyState}>
              <Package size={48} />
              <p>No se encontraron productos.</p>
           </div>
        ) : (
          <div className={styles.tableResponsive}>
            <table className={styles.modernTable}>
              <thead>
                <tr>
                  <th>PRODUCTO / CATEGORÍA</th>
                  <th style={{ textAlign: 'right' }}>PRECIO VENTA</th>
                  <th style={{ textAlign: 'center' }}>EXISTENCIAS</th>
                  <th style={{ textAlign: 'right' }}>VALOR TOTAL</th>
                  <th style={{ textAlign: 'center' }}>ACCIONES</th>
                </tr>
              </thead>
              <tbody>
                {filtrados.map(p => {
                  const isLow = p.stock <= p.stockMinimo;
                  return (
                    <tr key={p.id} className={isLow ? styles.rowWarning : ''}>
                      <td>
                        <div className={styles.prodName}>{p.nombre}</div>
                        <div className={styles.prodCat}>{p.categoria}</div>
                      </td>
                      <td style={{ textAlign: 'right', fontWeight: 600 }}>₡{Number(p.precio).toLocaleString()}</td>
                      <td>
                        <div className={styles.stockCol}>
                           <span className={`${styles.stockBadge} ${isLow ? styles.badgeDanger : styles.badgeSuccess}`}>
                              {p.stock} <span className={styles.unit}>{p.unidad}</span>
                           </span>
                           {isLow && <span className={styles.lowStockTooltip}>⚠ Nivel crítico (Mín {p.stockMinimo})</span>}
                        </div>
                      </td>
                      <td style={{ textAlign: 'right', color: 'var(--suria-plum)', fontWeight: 700 }}>
                         ₡{(p.stock * p.precio).toLocaleString()}
                      </td>
                      <td style={{ textAlign: 'center' }}>
                         <div className={styles.actions}>
                            <button className={styles.btnIcon} onClick={() => abrirModal(p)} title="Editar"><Edit2 size={16} /></button>
                            <button className={`${styles.btnIcon} ${styles.btnIconDanger}`} onClick={() => confirmarEliminar(p.id, p.nombre)} title="Eliminar"><Trash2 size={16} /></button>
                         </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* CREATE/EDIT MODAL */}
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>
                {editingId ? 'Editar Producto' : 'Agregar Nuevo Producto'}
              </h2>
            </div>
            <form onSubmit={handleGuardar} className={styles.modalForm}>
              <div className={styles.formGroup}>
                <label>Nombre del Producto *</label>
                <input type="text" required value={nombre} onChange={e => setNombre(e.target.value)} placeholder="Ej. Empaques Biodegradables" />
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Categoría *</label>
                  <input type="text" list="categorias-existentes" required value={categoria} onChange={e => setCategoria(e.target.value)} placeholder="Ej. Materia Prima" />
                  <datalist id="categorias-existentes">
                    {categoriasU.map(c => <option key={c} value={c} />)}
                  </datalist>
                </div>
                <div className={styles.formGroup}>
                  <label>Unidad de Medida</label>
                  <select value={unidad} onChange={e => setUnidad(e.target.value)}>
                    <option value="Unidades">Unidades (uds)</option>
                    <option value="Kg">Kilogramos (kg)</option>
                    <option value="Litros">Litros (L)</option>
                    <option value="Cajas">Cajas</option>
                    <option value="Metros">Metros (m)</option>
                  </select>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label>Precio Unitario de Venta (₡) *</label>
                <input type="number" required min="0" step="0.01" value={precio} onChange={e => setPrecio(e.target.value)} placeholder="0.00" />
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Stock Actual *</label>
                  <input type="number" required min="0" value={stock} onChange={e => setStock(e.target.value)} placeholder="0" />
                </div>
                <div className={styles.formGroup}>
                  <label>Stock Mínimo (Alerta) *</label>
                  <input type="number" required min="0" value={stockMinimo} onChange={e => setStockMinimo(e.target.value)} placeholder="0" />
                </div>
              </div>

              <div className={styles.modalActions}>
                <button type="button" className={styles.btnCancel} onClick={() => setIsModalOpen(false)}>Cancelar</button>
                <button type="submit" className={styles.btnSubmit} disabled={isSaving}>
                  {isSaving ? 'Guardando...' : 'Guardar Producto'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
};

export default InventarioDashboard;
