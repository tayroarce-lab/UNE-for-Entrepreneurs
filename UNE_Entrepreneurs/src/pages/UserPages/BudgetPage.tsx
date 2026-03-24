import { useState } from 'react';
import Navbar from '../../components/Shared/Navbar';
import Footer from '../../components/Shared/Footer';
import FinanzasPanel from '../../components/IngresosEgresos/FinanzasPanel';
import InventoryPanel from '../../components/Inventario/InventoryPanel';
import { Wallet, Package, Info } from 'lucide-react';
import '../../styles/BudgetPage.css';

/**
 * BudgetPage: Panel de Control del Emprendedor.
 * Integra la gestión de finanzas (Ingresos/Egresos) y el control de inventarios.
 */
export default function BudgetPage() {
  const [activeTab, setActiveTab] = useState<'finances' | 'inventory'>('finances');

  return (
    <div className="budget-page">
      <Navbar />

      <main className="budget-main">
        {/* Page Header */}
        <header className="budget-header">
          <div className="title-area">
            <h1 style={{ fontSize: '2.25rem', fontWeight: 900, color: 'var(--color-dark)', letterSpacing: '-0.025em' }}>
              Panel de Control <span style={{ color: 'var(--color-primary)' }}>UNE</span>
            </h1>
            <p style={{ color: '#64748b', fontSize: '1.1rem', marginTop: '0.25rem' }}>
              Gestione su presupuesto e inventario en un solo lugar.
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="tab-nav-premium">
            <button
              className={`tab-btn ${activeTab === 'finances' ? 'active' : ''}`}
              onClick={() => setActiveTab('finances')}
            >
              <Wallet size={18} /> Finanzas &amp; Presupuesto
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
        <div className="panel-content-area">
          {activeTab === 'finances' ? <FinanzasPanel /> : <InventoryPanel />}
        </div>

        {/* Info Tip */}
        <footer className="panel-tip">
          <div className="panel-tip-icon">
            <Info size={24} />
          </div>
          <div>
            <h4>Consejo UNE:</h4>
            <p>
              Mantener el inventario al día le permite proyectar sus necesidades de inversión
              de forma más precisa. Recuerde registrar cada venta para ver reflejado su margen
              de utilidad real en tiempo real.
            </p>
          </div>
        </footer>
      </main>

      <Footer />
    </div>
  );
}
