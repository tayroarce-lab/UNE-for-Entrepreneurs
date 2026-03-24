import React, { useState } from 'react';
import { Wallet, Package, Info } from 'lucide-react';
import FinanzasPanel from '../../IngresosEgresos/FinanzasPanel';
import InventoryPanel from '../../Inventario/InventoryPanel';
import styles from './BudgetDashboard.module.css';

const BudgetDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'finances' | 'inventory'>('finances');

  return (
    <main className={styles.budgetDashboard}>
      <header className={styles.budgetHeader}>
        <div className={styles.titleArea}>
          <h1>
            Panel de Control <span className={styles.titleAccent}>UNE</span>
          </h1>
          <p className={styles.titleDesc}>
            Gestione su presupuesto e inventario en un solo lugar.
          </p>
        </div>

        <div className={styles.tabNavPremium}>
          <button
            className={`${styles.tabBtn} ${activeTab === 'finances' ? styles.tabBtnActive : ''}`}
            onClick={() => setActiveTab('finances')}
          >
            <Wallet size={18} /> Finanzas &amp; Presupuesto
          </button>
          <button
            className={`${styles.tabBtn} ${activeTab === 'inventory' ? styles.tabBtnActive : ''}`}
            onClick={() => setActiveTab('inventory')}
          >
            <Package size={18} /> Control de Inventarios
          </button>
        </div>
      </header>

      <div className={styles.panelContentArea}>
        {activeTab === 'finances' ? <FinanzasPanel /> : <InventoryPanel />}
      </div>

      <footer className={styles.panelTip}>
        <div className={styles.panelTipIcon}>
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
  );
};

export default BudgetDashboard;
