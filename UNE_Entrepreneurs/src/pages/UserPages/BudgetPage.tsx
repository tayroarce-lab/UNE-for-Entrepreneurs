import { useState } from 'react';
import FinancingNavbar from '../../components/Financing/FinancingNavbar'
import FinancingFooter from '../../components/Financing/FinancingFooter'
import FinanzasPanel from '../../components/IngresosEgresos/FinanzasPanel';
import InventoryPanel from '../../components/Inventario/InventoryPanel';
import { Wallet, Package, Info } from 'lucide-react';

/**
 * BudgetPage: Panel de Control del Emprendedor.
 * Integra la gestión de finanzas (Ingresos/Egresos) y el control de inventarios.
 */
export default function BudgetPage() {
  const [activeTab, setActiveTab] = useState<'finances' | 'inventory'>('finances');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#f8fafc' }}>
      <FinancingNavbar />
      
      <main style={{ flex: 1, padding: '2rem 4rem' }}>
        {/* Page Header */}
        <header className="page-header" style={{ marginBottom: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div className="title-area">
            <h1 style={{ fontSize: '2.25rem', fontWeight: 900, color: 'var(--color-dark)', letterSpacing: '-0.025em' }}>
              Panel de Control <span style={{ color: 'var(--color-primary)' }}>UNE</span>
            </h1>
            <p style={{ color: '#64748b', fontSize: '1.1rem', marginTop: '0.25rem' }}>
              Gestione su presupuesto e inventario en un solo lugar.
            </p>
          </div>
          
          {/* Tab Navigation */}
          <div className="tab-nav-premium" style={{ display: 'flex', background: '#e2e8f0', padding: '4px', borderRadius: '12px', gap: '4px' }}>
            <button 
              className={`tab-btn ${activeTab === 'finances' ? 'active' : ''}`}
              onClick={() => setActiveTab('finances')}
            >
              <Wallet size={18} /> Finanzas & Presupuesto
            </button>
            <button 
              className={`tab-btn ${activeTab === 'inventory' ? 'active' : ''}`}
              onClick={() => setActiveTab('inventory')}
            >
              <Package size={18} /> Control de Inventarios
            </button>
          </div>
        </header>

        {/* Dynamic Content */}
        <div className="panel-content-area" style={{ animation: 'fadeIn 0.4s ease-out' }}>
          {activeTab === 'finances' ? (
            <FinanzasPanel />
          ) : (
            <InventoryPanel />
          )}
        </div>

        {/* Tip/Info Footer */}
        <footer className="panel-tip" style={{ marginTop: '3rem', padding: '1.5rem', background: 'var(--color-bg-warm)', borderRadius: '16px', display: 'flex', gap: '1rem', alignItems: 'center', border: '1px solid rgba(123, 45, 59, 0.1)' }}>
          <div style={{ background: 'var(--color-primary)', color: '#fff', padding: '8px', borderRadius: '10px' }}>
            <Info size={24} />
          </div>
          <div>
            <h4 style={{ color: 'var(--color-primary)', fontWeight: 800 }}>Consejo UNE:</h4>
            <p style={{ color: '#666', fontSize: '0.9rem' }}>
              Mantener el inventario al día le permite proyectar sus necesidades de inversión de forma más precisa. 
              Recuerde registrar cada venta para ver reflejado su margen de utilidad real en tiempo real.
            </p>
          </div>
        </footer>
      </main>

      <FinancingFooter />

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .tab-btn {
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 9px;
          font-weight: 700;
          font-size: 0.9rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          color: #64748b;
          background: transparent;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .tab-btn.active {
          background: #fff;
          color: var(--color-primary);
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
          transform: translateY(-1px);
        }
        
        .tab-btn:hover:not(.active) {
          color: var(--color-dark);
          background: rgba(255,255,255,0.4);
        }
      `}</style>
    </div>
  )
}
