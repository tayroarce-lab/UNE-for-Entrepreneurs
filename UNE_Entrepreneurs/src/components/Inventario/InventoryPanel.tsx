import { useState, useMemo, useEffect, useRef } from 'react';
import {
  Package,
  AlertTriangle,
  Plus,
  Trash2,
  TrendingDown,
  BarChart2,
  Edit2,
  Search,
  Check
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import type { InventoryItem } from '../../types/business';
import Swal from 'sweetalert2';

export default function InventoryPanel() {
  const { user } = useAuth();
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [name, setName] = useState('');
  const [qty, setQty] = useState<number | string>('');
  const [minQty, setMinQty] = useState<number | string>('');
  const [cost, setCost] = useState<number | string>('');
  const [sale, setSale] = useState<number | string>('');
  const [category, setCategory] = useState('General');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [initialLoadDone, setInitialLoadDone] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  // Load from LocalStorage
  useEffect(() => {
    if (user) {
      const stored = localStorage.getItem(`une_inventory_${user.id}`);
      if (stored) {
        setItems(JSON.parse(stored));
      }
      setInitialLoadDone(true);
    }
  }, [user]);

  // Save to LocalStorage
  useEffect(() => {
    if (user && initialLoadDone) {
      localStorage.setItem(`une_inventory_${user.id}`, JSON.stringify(items));
    }
  }, [user, items, initialLoadDone]);

  const stats = useMemo(() => {
    const totalItems = items.reduce((acc, i) => acc + Number(i.quantity), 0);
    const lowStock = items.filter(i => Number(i.quantity) <= Number(i.minQuantity)).length;
    const inventoryValue = items.reduce((acc, i) => acc + (Number(i.quantity) * Number(i.costPrice)), 0);
    const potentialProfit = items.reduce((acc, i) => acc + (Number(i.quantity) * (Number(i.salePrice) - Number(i.costPrice))), 0);
    
    return { totalItems, lowStock, inventoryValue, potentialProfit };
  }, [items]);

  const handleAddItem = () => {
    if (!name || !qty || Number(qty) < 0) return;

    if (editingId) {
      setItems(items.map(i => i.id === editingId ? {
        ...i,
        name,
        quantity: Number(qty),
        minQuantity: Number(minQty) || 5,
        costPrice: Number(cost) || 0,
        salePrice: Number(sale) || 0,
        category,
      } : i));
      setEditingId(null);
      Swal.fire({
        title: 'Actualizado',
        text: 'Producto actualizado correctamente',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false
      });
    } else {
      const newItem: InventoryItem = {
        id: crypto.randomUUID(),
        userId: user?.id || 'guest',
        name,
        quantity: Number(qty),
        minQuantity: Number(minQty) || 5,
        costPrice: Number(cost) || 0,
        salePrice: Number(sale) || 0,
        category,
        lastRestock: new Date().toISOString()
      };
      setItems([...items, newItem]);
    }

    setName('');
    setQty('');
    setMinQty('');
    setCost('');
    setSale('');
    setCategory('General');
  };

  const handleEdit = (item: InventoryItem) => {
    setEditingId(item.id);
    setName(item.name);
    setQty(item.quantity);
    setMinQty(item.minQuantity);
    setCost(item.costPrice);
    setSale(item.salePrice);
    setCategory(item.category);
    
    // Redirect to form area orderly
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Optional: Add a brief focus effect to the first input
    const firstInput = formRef.current?.querySelector('input');
    if (firstInput instanceof HTMLInputElement) {
      setTimeout(() => firstInput.focus(), 600);
    }
  };

  const deleteItem = (id: string) => {
    Swal.fire({
      title: '¿Está seguro?',
      text: "¿Desea eliminar este producto? Esta acción no se puede deshacer.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#8B1A1A',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Sí, eliminarlo',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        setItems(items.filter(i => i.id !== id));
        Swal.fire({
          title: 'Eliminado',
          text: 'El producto ha sido borrado correctamente',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false
        });
      }
    });
  };

  const filteredItems = items.filter(i => i.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="inventory-panel">
      {/* Summary Cards */}
      <div className="inventory-stats" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.25rem', marginBottom: '2rem' }}>
        <div className="stat-card premium-card inventory-main-card">
          <div className="header">
            <Package size={18} /> <span>Total Stock</span>
          </div>
          <div className="value">{stats.totalItems} <small>unidades</small></div>
        </div>
        <div className="stat-card premium-card warning-card">
          <div className="header" style={{ color: stats.lowStock > 0 ? '#b91c1c' : '#166534' }}>
            <AlertTriangle size={18} /> <span>Bajo Stock</span>
          </div>
          <div className="value" style={{ color: stats.lowStock > 0 ? '#ef4444' : '#22c55e' }}>{stats.lowStock}</div>
          <div className="footer-label">{stats.lowStock > 0 ? '¡Necesitas Re-stock!' : 'Todo en orden'}</div>
        </div>
        <div className="stat-card premium-card inv-value-card">
          <div className="header">
            <TrendingDown size={18} /> <span>Inversión Total</span>
          </div>
          <div className="value">₡{stats.inventoryValue.toLocaleString()}</div>
          <div className="footer-label">Costos acumulados</div>
        </div>
        <div className="stat-card premium-card profit-card">
          <div className="header">
            <BarChart2 size={18} /> <span>Utilidad Potencial</span>
          </div>
          <div className="value" style={{ color: 'var(--color-primary)' }}>₡{stats.potentialProfit.toLocaleString()}</div>
          <div className="footer-label">Proyección de ganancias</div>
        </div>
      </div>

      <div className="inventory-grid" style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '2rem' }}>
        {/* Form Panel */}
        <aside className={`premium-card section-card ${editingId ? 'edit-highlight' : ''}`} ref={formRef}>
          <div className="section-header">
            <h3>{editingId ? 'Editar Producto' : 'Registrar Producto'}</h3>
            <p className="dim">{editingId ? 'Modifica los datos del artículo' : 'Gestiona tus existencias'}</p>
          </div>
          <div className="inventory-form" style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="form-group">
              <label>Nombre del Producto</label>
              <input type="text" placeholder="Ej. Camiseta Algodón S" className="premium-input" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <div className="form-group">
                <label>Stock Inicial</label>
                <input type="number" placeholder="Cant." className="premium-input" value={qty} onChange={(e) => setQty(e.target.value)} />
              </div>
              <div className="form-group">
                <label>Alerta Min.</label>
                <input type="number" placeholder="Alerta" className="premium-input" value={minQty} onChange={(e) => setMinQty(e.target.value)} />
              </div>
            </div>
            <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <div className="form-group">
                <label>Precio Costo</label>
                <input type="number" placeholder="₡ Costo" className="premium-input" value={cost} onChange={(e) => setCost(e.target.value)} />
              </div>
              <div className="form-group">
                <label>Precio Venta</label>
                <input type="number" placeholder="₡ Venta" className="premium-input" value={sale} onChange={(e) => setSale(e.target.value)} />
              </div>
            </div>
            <div className="form-group">
              <label>Categoría</label>
              <select className="premium-select" value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="General">General</option>
                <option value="Ropa">Ropa / Textil</option>
                <option value="Servicios">Servicios</option>
                <option value="Alimentos">Alimentos</option>
                <option value="Tecnologia">Tecnología</option>
              </select>
            </div>
            <button className={`btn-add-item primary-action-btn ${editingId ? 'edit-mode' : ''}`} onClick={handleAddItem}>
              {editingId ? <><Check size={18} /> Guardar Cambios</> : <><Plus size={18} /> Agregar al Catálogo</>}
            </button>
            {editingId && (
              <button 
                className="btn-cancel-edit" 
                onClick={() => {
                  setEditingId(null);
                  setName('');
                  setQty('');
                  setMinQty('');
                  setCost('');
                  setSale('');
                }}
                style={{ background: 'none', border: 'none', color: '#64748b', fontSize: '0.85rem', marginTop: '0.5rem', cursor: 'pointer', fontWeight: 600 }}
              >
                Cancelar Edición
              </button>
            )}
          </div>
        </aside>

        {/* List Panel */}
        <main className="premium-card section-card main-inv-list">
          <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <div>
              <h3>Lista de Inventario</h3>
              <p className="dim">Monitoreo de productos activos</p>
            </div>
            <div className="search-box-wrap">
              <Search className="search-icn" size={16} />
              <input 
                type="text" 
                placeholder="Buscar por nombre..." 
                className="search-input-premium"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="inv-table-wrap">
            <table className="inv-table">
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Categoría</th>
                  <th>Existencias</th>
                  <th>P. Venta</th>
                  <th>Estado</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.length === 0 ? (
                  <tr>
                    <td colSpan={6} style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8' }}>
                      No hay productos que coincidan con la búsqueda.
                    </td>
                  </tr>
                ) : (
                  filteredItems.map(item => (
                    <tr key={item.id}>
                      <td className="item-name-cell">
                        <div className="name-bold">{item.name}</div>
                        <div className="cost-small">Costo: ₡{item.costPrice.toLocaleString()}</div>
                      </td>
                      <td><span className="cat-badge">{item.category}</span></td>
                      <td className="qty-cell">
                        <span className={`qty-val ${item.quantity <= item.minQuantity ? 'critical' : ''}`}>
                          {item.quantity}
                        </span>
                        <span className="min-label">/ {item.minQuantity} min</span>
                      </td>
                      <td><span className="price-bold">₡{item.salePrice.toLocaleString()}</span></td>
                      <td>
                        {item.quantity <= item.minQuantity ? (
                          <div className="status-label critical">Re-invertir</div>
                        ) : (
                          <div className="status-label stable">Estable</div>
                        )}
                      </td>
                      <td>
                        <div className="actions-cell">
                          <button className="btn-icn-action edit" onClick={() => handleEdit(item)}><Edit2 size={16} /></button>
                          <button className="btn-icn-action del" onClick={() => deleteItem(item.id)}><Trash2 size={16} /></button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>

      <style>{`
        .inventory-panel { padding: 1rem 0; }
        .stat-card.premium-card {
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .stat-card .header {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #64748b;
          font-size: 0.8rem;
          font-weight: 600;
          text-transform: uppercase;
        }
        .stat-card .value { font-size: 1.6rem; font-weight: 850; color: #1e293b; color: var(--color-dark); }
        .stat-card .value small { font-size: 0.85rem; font-weight: 500; opacity: 0.6; }
        .stat-card .footer-label { font-size: 0.75rem; color: #94a3b8; }

        .section-header h3 { font-size: 1.2rem; font-weight: 800; color: var(--color-dark); }
        .section-header .dim { font-size: 0.8rem; color: #94a3b8; }

        .premium-input, .premium-select {
          width: 100%;
          padding: 0.7rem 1rem;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          background: #f8fafc;
          font-size: 0.9rem;
          outline: none;
          transition: all 0.2s;
        }
        .premium-input:focus { background: #fff; border-color: var(--color-primary); box-shadow: 0 0 0 4px rgba(123, 45, 59, 0.05); }

        .form-group label {
          display: block;
          font-size: 0.75rem;
          font-weight: 600;
          color: #64748b;
          margin-bottom: 0.4rem;
          padding-left: 2px;
        }

        .primary-action-btn {
          margin-top: 1rem;
          background: var(--color-primary);
          color: #fff;
          border: none;
          padding: 0.85rem;
          border-radius: 10px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .primary-action-btn:hover { background: var(--color-primary-dark); transform: translateY(-2px); box-shadow: 0 4px 12px rgba(123, 45, 59, 0.2); }

        .search-box-wrap {
          position: relative;
          width: 280px;
        }
        .search-icn {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: #94a3b8;
        }
        .search-input-premium {
          width: 100%;
          padding: 0.6rem 1rem 0.6rem 2.4rem;
          border-radius: 50px;
          border: 1px solid #e2e8f0;
          outline: none;
          font-size: 0.85rem;
        }

        .inv-table-wrap {
          margin-top: 1rem;
          overflow-x: auto;
        }
        .inv-table {
          width: 100%;
          border-collapse: collapse;
        }
        .inv-table th {
          text-align: left;
          padding: 1rem;
          color: #64748b;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          border-bottom: 2px solid #f1f5f9;
        }
        .inv-table td {
          padding: 1rem;
          border-bottom: 1px solid #f1f5f9;
        }
        .inv-table tr:hover { background: #fcfcfc; }

        .item-name-cell .name-bold { font-weight: 700; color: #1e293b; }
        .item-name-cell .cost-small { font-size: 0.75rem; color: #94a3b8; }
        
        .cat-badge {
          font-size: 0.7rem;
          font-weight: 700;
          background: #f1f5f9;
          color: #475569;
          padding: 4px 10px;
          border-radius: 50px;
        }

        .qty-cell { display: flex; align-items: baseline; gap: 4px; }
        .qty-cell .qty-val { font-weight: 850; color: #1e293b; font-size: 1.1rem; }
        .qty-cell .qty-val.critical { color: #ef4444; }
        .qty-cell .min-label { font-size: 0.7rem; color: #94a3b8; }

        .price-bold { font-weight: 750; color: var(--color-primary); }
        
        .status-label {
          display: inline-block;
          font-size: 0.7rem;
          font-weight: 800;
          padding: 4px 10px;
          border-radius: 4px;
        }
        .status-label.critical { background: #fef2f2; color: #ef4444; }
        .status-label.stable { background: #f0fdf4; color: #22c55e; }

        .actions-cell { display: flex; gap: 4px; }
        .btn-icn-action {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          border: 1px solid #e2e8f0;
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #94a3b8;
          transition: all 0.2s;
        }
        .btn-icn-action:hover { border-color: var(--color-primary); color: var(--color-primary); }
        .btn-icn-action.del:hover { background: #fef2f2; border-color: #fecaca; color: #ef4444; }

        .edit-highlight {
          border: 2px solid var(--color-primary) !important;
          animation: pulse-border 2s infinite;
        }

        @keyframes pulse-border {
          0% { box-shadow: 0 0 0 0 rgba(123, 45, 59, 0.4); }
          70% { box-shadow: 0 0 0 10px rgba(123, 45, 59, 0); }
          100% { box-shadow: 0 0 0 0 rgba(123, 45, 59, 0); }
        }
      `}</style>
    </div>
  );
}
