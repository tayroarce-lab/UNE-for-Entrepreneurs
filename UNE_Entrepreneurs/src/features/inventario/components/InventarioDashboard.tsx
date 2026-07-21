import { useState } from 'react';
import { Package, PlusCircle, Search, Edit2, Trash2, AlertTriangle, ArrowLeft, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useInventario } from '../hooks/useInventario';
import { InventarioModal } from './InventarioModal';
import type { ProductoInventario } from '../../../services/InventarioService';
import styles from './InventarioDashboard.module.css';

export const InventarioDashboard = () => {
  const navigate = useNavigate();
  const {
    loading,
    searchTerm,
    setSearchTerm,
    selectedCategoria,
    setSelectedCategoria,
    isSaving,
    categoriasU,
    filtrados,
    valorTotalInventario,
    itemsBajos,
    saveProducto,
    deleteProductoAction
  } = useInventario();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productoAEditar, setProductoAEditar] = useState<ProductoInventario | null>(null);

  const abrirModal = (producto?: ProductoInventario) => {
    setProductoAEditar(producto || null);
    setIsModalOpen(true);
  };

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
            <span className={styles.statValue}>{filtrados.length}</span>
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
                            <button className={`${styles.btnIcon} ${styles.btnIconDanger}`} onClick={() => deleteProductoAction(p.id, p.nombre)} title="Eliminar"><Trash2 size={16} /></button>
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

      <InventarioModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={saveProducto}
        categoriasU={categoriasU}
        productoAEditar={productoAEditar}
        isSaving={isSaving}
      />
    </main>
  );
};
